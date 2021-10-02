const mongoose = require('mongoose');

const templateSchema = mongoose.Schema({
    email: {
        required: true,
        subject: String,
        body: String, 
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created_at: new Date()
});

const User = mongoose.model("User", templateSchema);
module.exports = User;