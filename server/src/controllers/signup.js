const url = require('url');
const User = require('../schemas/User');
const Subscriber = require('../schemas/Subscriber');

async function signup_user(req, res) {
    queryObject = url.parse(req.url, true).query
    const email = queryObject.email;
    const user_id = queryObject.user_id;
    const name = queryObject.name;
    if(!email) {
        res.status(400).json({error: 'email is invalid'});
        return;
    }
    if(!user_id) {
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
        const subscriber = await Subscriber.create({
            email: email,
            name: name,
            subscribed_to: user._id,
            total_emails_sent: 0,
            successful_emails_sent: 0,
            key: null,
            is_verified: false,
            subscribed_on: null
        });

        // send OTP        
        

        res.status(200).send("OTP has been sent");
        
    }
    catch(e) {
        res.status(400).json({error: e});
        return;
    }
    

}

module.exports = { signup_user }