const mongoose = require('mongoose');

const User = mongoose.model('users', {

    firstName: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    lastName:{
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    isActive:{
        type: number,
        default: 0
    }

});

module.exports = {User};