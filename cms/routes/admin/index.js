const express = require('express');
const router = express.Router();
const faker = require('faker');
const Post = require('../../models/Post');
const User = require('../../models/User');
const Comment = require('../../models/Comment');
const {userAuthenticated} = require('../../helpers/authentication');

router.all('/*', userAuthenticated, (req, res, next)=>{
    req.app.locals.layout = 'admin';
    next();
});


router.get('/', (req, res)=>{

    Post.count({}).then(postCount=>{
        User.count({}).then(userCount=>{
            Comment.count({}).then(commentCount=>{
                res.render('admin/index',{postCount: postCount, userCount:userCount, commentCount:commentCount});
            })
        })

    })

});


router.post('/generate-fake-posts', (req, res)=>{

    for (let index = 0; index < req.body.numberOfLoops; index++) {
        console.log(req.body.numberOfLoops);

    const newPost = new Post({
        title: faker.name.title(),
        status: faker.random.arrayElement(["public","private","draft"]),
        allowComments: faker.random.boolean(),
        body: faker.lorem.paragraph()

    });

    console.log(newPost);

    newPost.save().then(savedPost =>{
        console.log(savedPost);
        res.redirect('/admin');
    }).catch(err =>{
        res.redirect('/admin');
        console.log(err);
    });
    }

});




module.exports = router;