const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    

    title:{
        type: String,
        trim: true,
        required: true
    },

    slug:{
        type: String
       
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

    category:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:'Categories'
    },

    file:{
        type:String
    },

    date:{
        type:Date,
        default:Date.now()
    },

    comments:[{
      type:Schema.Types.ObjectId,
      ref:'comments'  
    }],

    user:{
        type:Schema.Types.ObjectId,
        ref:'users'  
    }



}, {usePushEach: true});


PostSchema.plugin(URLSlugs('title', {field: 'slug'}));

module.exports = mongoose.model('Post', PostSchema);



