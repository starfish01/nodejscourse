const moment = require('moment');
const Post = require('../models/Post');
const Categories = require('../models/Categories');


module.exports = {

    select: function(selected, options){

        return options.fn(this).replace(new RegExp(' value=\"'+ selected +'\"'), '$&selected="selected"');
        
    },

    GenerateTime: function(date, format){
        return moment(date).format(format)
    }


};