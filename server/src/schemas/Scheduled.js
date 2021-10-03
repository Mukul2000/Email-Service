const mongoose = require('mongoose');

const scheduledSchema = mongoose.Schema({
    email: {
        subject: String,
        body: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    recurrence: String,
    next_send_date: Date,
    created_at: Date
});

const Scheduled = mongoose.model('scheduled', scheduledSchema);
module.exports = Scheduled;