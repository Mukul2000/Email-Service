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
        ref: 'User'
    },
    total_emails_sent: Number,
    successful_emails_sent: Number,
    key: Number,
    is_verified: Boolean,
    subscribed_on: Date, 
});

const Subscriber = mongoose.model('subscribers', subscriberSchema);
module.exports = Subscriber;