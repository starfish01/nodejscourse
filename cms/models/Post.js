const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    

    title:{
        type: String,
        trim: true,
        required: true
    },

    status:{
        type:String,
        required: true,
        default: 'public'
    },

    allowComments:{
        required: true,
        type:Boolean
    },

    body:{
        required:true,
        type:String
    },

    file:{
        type:String
    },

    date:{
        type:Date,
        default:Date.now()
    }

});

module.exports = mongoose.model('Post', PostSchema);

