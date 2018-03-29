const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
    
    name:{
        type: String,
        trim: true,
        required: true
    },

    date:{
        type:Date,
        default:Date.now()
    }

});

module.exports = mongoose.model('Categories', CategoriesSchema);