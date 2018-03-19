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
        default: 'public'
    },

    allowComments:{
        default: false,
        type:boolean
    },

    body:{
        required:true,
        type:String
    }

});

module.exports = mongoose.model('Post', PostSchema);

