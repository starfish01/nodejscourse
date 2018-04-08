const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
const {userAuthenticated} = require('../../helpers/authentication');
const User = require('../../models/User');




router.all('/*', userAuthenticated, (req, res, next)=>{
    req.app.locals.layout = 'admin';
    next();
});


router.get('/', (req, res)=>{

    Comment.find({user: req.user.id})
    .populate('user')
    .then(comments=>{

        res.render('admin/comments/index', {comments: comments});
    });
});


router.delete('/:id',(req,res)=>{
    
    Comment.findByIdAndRemove(req.params.id).then(filedeleted=>{
      
        Post.findOneAndUpdate({comments: req.params.id}, {$pull: {comments: req.params.id}}, (err, data)=>{

            if(err) console.log(err);

            req.flash('success_message', `Comment was deleted`);
            res.redirect('/admin/comments');

        });

        
    });
    
});


router.post('/', (req,res)=>{

    Post.findOne({_id: req.body.id}).then(post=>{

        const newComment = new Comment({
            user: req.user.id,
            body: req.body.body
        });

        post.comments.push(newComment);

        post.save().then(savedPost=>{
            newComment.save().then(savedComment=>{
                res.redirect(`/post/${post.id}`);
            });
        });

    });

    //res.send('we got here');
});





module.exports = router;