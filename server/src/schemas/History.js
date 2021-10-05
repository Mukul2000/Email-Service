const mongoose = require('mongoose');

const historySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    email: {
        subject: String,
        body: String,
    },
    sent_at: Date,
});

const History = mongoose.model('history', historySchema);
module.exports = History;