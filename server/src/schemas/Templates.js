const mongoose = require('mongoose');

const templateSchema = mongoose.Schema({
    email: {
        subject: String,
        body: String, 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created_at: Date
});

const Template = mongoose.model('templates', templateSchema);
module.exports = Template;