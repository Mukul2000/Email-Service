const mongoose = require('mongoose');

const templateSchema = mongoose.Schema({
    name: String,
    email: {
        subject: String,
        body: String, 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    created_at: Date
});

const Template = mongoose.model('templates', templateSchema);
module.exports = Template;