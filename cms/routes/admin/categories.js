const express = require('express');
const router = express.Router();
const Category = require('../../models/Categories');
const {userAuthenticated} = require('../../helpers/authentication');

router.all('/*', userAuthenticated,(req, res, next)=>{
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


router.get('/edit/:id',(req,res)=>{

    Category.findOne({_id: req.params.id}).then(category=>{
        res.render('admin/categories/edit', {category:category});

    }).catch(err=>{
        req.flash('success_message', `Something broke...`);
        res.redirect('/admin/categories/');
    });

});

router.put('/edit/:id', (req, res)=>{



    Category.findById(req.params.id).then(category=>{

        category.name = req.body.name;
        

        category.save().then(updaterCategory=>{
            req.flash('success_message', `Category '${updaterCategory.name}' was updated successfully`);
            res.redirect('/admin/categories/');

        });

    }).catch(err=>{
        console.log(`Could not find Post in DB ${err}`)
        res.render('admin/posts/');
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