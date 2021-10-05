const url = require('url');
const User = require('../schemas/User');
const Subscriber = require('../schemas/Subscriber');
const send_email = require('../utils/send_email')
const mongoose = require('mongoose');
const generate_key = require('../utils/utils');

async function create_account(req, res) {
    const { name, email, password } = req.body;
    try {
        await User.create({
            name: name,
            email: email,
            password: password
        });
        res.status(200).json({ message: "Successful" })
    }
    catch (e) {
        res.status(500).json({ error: e });
    }
}

async function signup_user(req, res) {
    queryObject = url.parse(req.url, true).query
    const email = queryObject.email;
    const user_id = queryObject.user_id;
    const name = queryObject.name;
    if (!email) {
        res.status(400).json({ error: 'email is invalid' });
        return;
    }

    if (!user_id || !mongoose.Types.ObjectId.isValid(user_id)) {
        res.status(400).json({ error: 'user_id is invalid' });
        return;
    }
    if (!name) {
        res.status(400).json({ error: 'name is invalid' });
        return;
    }

    try {

        const user = await User.findById({ "_id": user_id })
        if (!user) throw "No such user";

        // check if this email exists for this user or not
        const exists = await Subscriber.findOne({ subscribed_to: user_id, email: email });
        if (exists != null) {
            if (exists.is_verified == true) throw 'Already subscribed';
            else {
                await Subscriber.deleteOne({ subscribed_to: user_id, email: email });
            }
        }

        // Generate key        

        try {

            const key = generate_key();
            console.log(key);
            console.log(typeof (key));

            // add subscriber
            const subscriber = await Subscriber.create({
                email: email,
                name: name,
                subscribed_to: user._id,
                total_emails_sent: 0,
                user: user._id,
                successful_emails_sent: 0,
                key: key,
                is_verified: false,
                subscribed_on: null
            });
            await send_email(email, key);
            res.status(200).json({
                "message": "OTP has been sent",
            });
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }


    }
    catch (e) {
        console.log(e);
        res.status(400).json({ error: e });
        return;
    }


}

async function verify_user(req, res) {
    console.log("III WORRKK!")
    console.log(req.body);
    const email = req.body.email;
    const id = req.body.user_id;
    const key = req.body.otp;

    if (!email) {
        res.status(400).json({ error: "Email is invalid" });
        return;
    }

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "Email is invalid" });
        return;
    }

    if (!key) {
        res.status(400).json({ error: "OTP field is invalid" });
        return;
    }

    const user = User.findById(id);
    if (!user) {
        res.status(404).json({ error: "No such user" });
        return;
    }

    const subscriber = await Subscriber.findOne({ email: email });
    if (!subscriber) {
        res.status(404).json({ error: "Email not in database" });
        return;
    }
    if (subscriber.is_verified === true) {
        res.status(403).json({ error: 'Already verified' });
        return;
    }
    if (key === subscriber.key) {
        await Subscriber.updateOne({ email: email }, { is_verified: true, subscribed_on: new Date() });
        res.status(200).json({ message: "User verified successfully" });
    }
    else res.status(403).json({ error: "Invalid OTP" });
}

async function delete_user(req, res) {
    const email = req.data.email;
    const id = req.data.user_id;

    if (!email) {
        res.status(400).json({ error: "Email is invalid" });
        return;
    }

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "Email is invalid" });
        return;
    }

    const user = User.findById(id);
    if (!user) {
        res.status(404).json({ error: "No such user" });
        return;
    }

    const sub = Subscriber.findOne({ email: email, subscribed_to: id });
    if (!sub) {
        res.status(404).json({ error: "You are not subscribed" });
        return;
    }

    sub.delete();
    res.status(404).send("Successfully unsubscribed");
}

module.exports = { signup_user, verify_user, delete_user, create_account}