const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const Categories = require('../../models/Categories');
const{isEmpty, uploadDir} = require('../../helpers/upload-helper');
const fs = require('fs');
const path = require('path');
const {userAuthenticated} = require('../../helpers/authentication');

router.all('/*', userAuthenticated, (req, res, next)=>{
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', (req, res)=>{

    Post.find({})

    .populate('category')
    
    .then(posts=>{
        res.render('admin/posts/index', {posts: posts})
    }).catch(err=>{
        console.log(err);
        res.render('admin/posts/index');
    });
});

router.get('/edit/:id', (req,res)=>{

    Categories.find({}).then(categories =>{

        Post.findById(req.params.id).then(post=>{
            res.render('admin/posts/edit', {post: post, categories:categories});
        }).catch(err=>{
            console.log(`Could not find Post in DB ${err}`)
            res.render('admin/posts/');
        });

    });

    
});

router.get('/create', (req, res)=>{

    Categories.find({}).then(categories =>{
        res.render('admin/posts/create', {categories: categories});
    });


});

router.post('/create', (req, res)=>{

    let errors = [];


    if(!req.body.title){
        errors.push({message:'Please add a title'})
    }
    if(!req.body.body){
        errors.push({message:'Please add a body'})
    }


    if(errors.length > 0){
        res.render('admin/posts/create',{
            errors: errors
        })
    }else{

    


    let filename ='';

    if(!isEmpty(req.files)){

        let file = req.files.file;
        filename = Date.now() + '-' +file.name;

        file.mv('./public/uploads/' + filename, (err)=>{
            if(err) throw err;
        });
    }


    var allowComments;

    if(req.body.allowComments){
        allowComments = true;
    }else{
        allowComments = false;
    }



    const newPost = new Post({
        title: req.body.title,
        status: req.body.status,
        allowComments: allowComments,
        body: req.body.body,
        category: req.body.category,
        file: filename

    });

    newPost.save().then(savedPost =>{

        req.flash('success_message', `Post ${savedPost.title} was created successfully`);

        res.redirect('/admin/posts');
    }).catch(err =>{


        res.redirect('/admin/posts/create');
        console.log(err);
    });

}

});

router.put('/edit/:id', (req, res)=>{

    var allowComments;

    if(req.body.allowComments){
        allowComments = true;
    }else{
        allowComments = false;
    }



    Post.findById(req.params.id).then(post=>{

        post.title = req.body.title;
        post.allowComments = allowComments;
        post.status = req.body.status;
        post.category = req.body.category,
        post.body = req.body.body;


        if(!isEmpty(req.files)){

            let file = req.files.file;
            filename = Date.now() + '-' +file.name;
            post.file = filename;
    
            file.mv('./public/uploads/' + filename, (err)=>{
                if(err) throw err;
            });
        }


        post.save().then(updaterPost=>{
            req.flash('success_message', `Post '${updaterPost.title}' was updated successfully`);
            res.redirect('/admin/posts');

        });

    }).catch(err=>{
        console.log(`Could not find Post in DB ${err}`)
        res.render('admin/posts/');
    });

});


router.delete('/:id',(req,res)=>{

    // Post.findByIdAndRemove(req.params.id, (err, document)=>{
    //     if(err) return err;
    //     res.redirect('/admin/posts/create');

    // });

    Post.findOne({_id:req.params.id}).then(post=>{
        
        fs.unlink(uploadDir + post.file, (err)=>{
            post.remove();
        });

        req.flash('success_message', `Post was deleted successfully`);
        res.redirect('/admin/posts');

    }).catch(err =>{
        console.log(`Something went wrong while deleting ${err}`)
        res.render('admin/posts/');
    });

});


module.exports = router;