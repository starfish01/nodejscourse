const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');


router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', (req, res)=>{

    Post.find({}).then(posts=>{
        res.render('admin/posts/index', {posts: posts})
    }).catch(err=>{
        console.log(err);
        res.render('admin/posts/index');
    });
});

router.get('/edit/:id', (req,res)=>{

    Post.findById(req.params.id).then(post=>{
        res.render('admin/posts/edit', {post: post});
    }).catch(err=>{
        console.log(`Could not find Post in DB ${err}`)
        res.render('admin/posts/');
    });

    
});

router.get('/create', (req, res)=>{
    res.render('admin/posts/create');
});

router.post('/create', (req, res)=>{

    var allowComments;

    if(req.body.allowComments){
        allowComments = true;
    }else{
        allowComments = false;
    }

    console.log(allowComments);

    const newPost = new Post({
        title: req.body.title,
        status: req.body.status,
        allowComments: allowComments,
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