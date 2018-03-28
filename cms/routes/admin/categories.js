const express = require('express');
const router = express.Router();
const Category = require('../../models/Categories');

router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'admin';
    next();
});


router.get('/', (req, res)=>{
    res.render('admin/categories/index');
});

router.post('/create', (req, res)=>{

    

    console.log(req.body.title);

    if(!req.body.title){

        //need to fix this
        //errors.push({message:'Please add a title'});

        res.redirect('/admin/categories/');
        
        console.log(err);
    }else{

        const newCategory = new Category({
            title: req.body.title
        });
    
        newCategory.save().then(savedCategory =>{
    
            req.flash('success_message', `Post ${savedCategory.title} was created successfully`);
            res.redirect('/admin/categories/');
    
        }).catch(err =>{
    
    
            res.redirect('/admin/categories/');
            console.log(err);
        });

    }

});


module.exports = router;