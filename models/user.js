// packages
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    created_chinpokomons: {
        type: Array
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;