const url = require('url');
const User = require('../schemas/User');
const Subscriber = require('../schemas/Subscriber');
const send_email = require('../utils/send_email')
const mongoose = require('mongoose');
const utils = require('../utils/utils');

async function signup_user(req, res) {
    queryObject = url.parse(req.url, true).query
    const email = queryObject.email;
    const user_id = queryObject.user_id;
    const name = queryObject.name;
    if(!email) {
        res.status(400).json({error: 'email is invalid'});
        return;
    }

    if(!user_id || !mongoose.Types.ObjectId.isValid(user_id)) {
        res.status(400).json({error: 'user_id is invalid'});
        return;
    }
    if(!name) {
        res.status(400).json({error: 'name is invalid'});
        return;
    }

    try {
       
        const user = await User.findById({"_id" : user_id})
        if(!user) throw "No such user";

        // check if this email exists for this user or not
        const exists = await Subscriber.findOne({subscribed_to: user_id, email: email});
        if(exists != null) throw "Already subscribed"; 

        // add subscriber
        const subscriber = new Subscriber({
            email: email,
            name: name,
            subscribed_to: user._id,
            total_emails_sent: 0,
            successful_emails_sent: 0,
            key: utils.generate_key(),
            is_verified: false,
            subscribed_on: null
        });

        // send OTP        
        // if email is not sent subscriber is not saved. NEAT.
        Promise.all([subscriber.save(), send_email(email)]);

        res.status(200).send("OTP has been sent");
        
    }
    catch(e) {
        res.status(400).json({error: e});
        return;
    }
    

}

async function verify_user(req,res) {
    const email = req.data.email;
    const id = req.data.user_id;
    const key = req.data.otp;

    if(!email) {
        res.status(400).json({error: "Email is invalid"});
        return;
    }

    if(!id || !mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({error:"Email is invalid"});
        return; 
    }

    const user = User.findById(id);
    if(!user) {
        res.status(404).json({error: "No such user"});
        return;
    }

    const subscriber = Subscriber.findOne({email: email});
    if(!subscriber) {
        res.status(404).json({error: "Email not in database"});
        return;
    }

    if(key === subscriber.key) {
        subscriber.is_verified = true;
        subscriber.subscribed_on = new Date();
        res.status(200).send("User verified successfully");
    }
    else res.status(403).send("Invalid OTP");
}

async function delete_user(req,res) {
    const email = req.data.email;
    const id = req.data.user_id;

    if(!email) {
        res.status(400).json({error: "Email is invalid"});
        return;
    }

    if(!id || !mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({error: "Email is invalid"});
        return; 
    }

    const user = User.findById(id);
    if(!user) {
        res.status(404).json({error: "No such user"});
        return;
    }

    const sub = Subscriber.findOne({email: email, subscribed_to: id});
    if(!sub) {
        res.status(404).json({error: "You are not subscribed"});
        return;
    }

    sub.delete();
    res.status(404).send("Successfully unsubscribed");
}

module.exports = { signup_user, verify_user, delete_user}