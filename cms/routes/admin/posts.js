const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const{isEmpty} = require('../../helpers/upload-helper');


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

    let filename ='';

    if(!isEmpty(req.files)){

        console.log('not empty')

        let file = req.files.file;
        filename = file.name;

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
        file: filename

    });

    newPost.save().then(savedPost =>{
        res.redirect('/admin/posts/create');
    }).catch(err =>{
        res.redirect('/admin/posts/create');
        console.log(err);
    });

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
        post.body = req.body.body;

        post.save().then(updaterPost=>{
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

    Post.remove({_id:req.params.id}).then(result=>{
        res.redirect('/admin/posts');
    });

});


module.exports = router;