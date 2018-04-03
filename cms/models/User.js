const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    
    firstName:{
        type: String,
        trim: true,
        required: true
    },

    lastName:{
        type: String,
        trim: true,
        required: true
    },

    email:{
        type: String,
        trim: true,
        required: true
    },

    password:{
        type: String,
        trim: true,
        required: true
    }
});

UserSchema.methods.test = function(){
    console.log('Using schema method');
};

module.exports = mongoose.model('users', UserSchema);