const moment = require('moment');
const Post = require('../models/Post');
const Categories = require('../models/Categories');


module.exports = {

    select: function(selected, options){

        return options.fn(this).replace(new RegExp(' value=\"'+ selected +'\"'), '$&selected="selected"');
        
    },

    GenerateTime: function(date, format){
        return moment(date).format(format)
    },

    getCategoryName: function(id){

        Categories.findById(id).then(category=>{
            console.log(category.name);
            return category.name;
        }).catch(err =>{
           
            return;
        });

    }



};