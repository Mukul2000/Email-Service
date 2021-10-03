const mongoose = require('mongoose');

const historySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    email: {
        subject: String,
        body: String,
    },
    sent_at: Date,
});

const History = mongoose.model('history', historySchema);
module.exports = History;