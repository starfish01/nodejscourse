const express = require('express');
const router = express.Router();
const Category = require('../../models/Categories');

router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'admin';
    next();
});


router.get('/', (req, res)=>{


    Category.find({}).then(categories =>{

        res.render('admin/categories/index', {categories: categories});
    }).catch(err=>{
        req.flash('success_message', `There are no Categories`);
        res.render('admin/categories/index');
    });

    
});

router.post('/create', (req, res)=>{

    if(!req.body.name){

        res.redirect('/admin/categories/');
        
        console.log(err);
    }else{

        const newCategory = new Category({
            name: req.body.name
        });
    
        newCategory.save().then(savedCategory =>{

            req.flash('success_message', `${savedCategory.name} was created successfully`);
            res.redirect('/admin/categories/');
        }).catch(err =>{

            res.redirect('/admin/categories/');
            console.log(err);
        });

    }

});

router.delete('/:id',(req,res)=>{

    Category.findById(req.params.id).then(category=>{
        
        res.redirect('/admin/categories/edit/', {category:category});

    }).catch(err=>{
        req.flash('success_message', `Something broke...`);
        res.redirect('/admin/categories/');
    });

});

router.delete('/:id',(req,res)=>{

    Category.findById(req.params.id).then(category=>{
        category.remove();
        req.flash('success_message', `Category was deleted`);
        res.redirect('/admin/categories/');

    }).catch(err=>{
        req.flash('success_message', `Category was not deleted ${err}`);
        res.redirect('/admin/categories/');
    });

});


module.exports = router;