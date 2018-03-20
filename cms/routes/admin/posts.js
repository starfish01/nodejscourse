const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');


router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', (req, res)=>{

    Post.find({}).then(posts=>{
        res.render('admin/posts/index', {posts: posts});
    }).catch(err=>{
        console.log(err);
        res.render('admin/posts/index');
    });

    
});

router.get('/create', (req, res)=>{
    res.render('admin/posts/create');
});

router.post('/create', (req, res)=>{

    const newPost = new Post({
        title: req.body.title,
        status: req.body.status,
        allowComments: req.body.allowComments,
        body: req.body.body

    });

    newPost.save().then(savedPost =>{
        console.log(savedPost);
        res.redirect('/admin/posts/create');
    }).catch(err =>{
        res.redirect('/admin/posts/create');
        console.log(err);
    });



});



module.exports = router;