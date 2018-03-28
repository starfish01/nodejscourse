const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
    
    title:{
        type: String,
        trim: true,
        required: true
    },

});

module.exports = mongoose.model('Categories', CategoriesSchema);