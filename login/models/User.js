const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({

    email:{
        type:String,
        unique:true,
        trim:true,
        minlength:3,
        required: true
    },

    password:{
        type:String,
        required:true,
        minlength:5
    }
});

module.exports = mongoose.model('users', UserSchema);