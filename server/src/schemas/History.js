const mongoose = require('mongoose');

const historySchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    email: {
        required: true,
        subject: String,
        body: String,
    },
    sent_at: new Date()
});

const History = mongoose.model("History", historySchema);
module.exports = History;