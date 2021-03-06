const mongoose = require('mongoose');

const subscriberSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'
    },
    total_emails_sent: Number,
    successful_emails_sent: Number,
    key: String,
    is_verified: Boolean,
    subscribed_on: Date, 
});

const Subscriber = mongoose.model('subscribers', subscriberSchema);
module.exports = Subscriber;