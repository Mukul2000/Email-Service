const mongoose = require('mongoose');

const scheduledSchema = mongoose.Schema({
    email: {
        required: true,
        subject: String,
        body: String
    },
    sender: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    recurrence: String,
    next_send_date: new Date(),
    created_at: new Date()
});

const Scheduled = mongoose.model("Scheduled", scheduledSchema);
module.exports = Scheduled;