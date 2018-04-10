const express = require('express');
const router = express.Router();
const faker = require('faker');
const Post = require('../../models/Post');
const User = require('../../models/User');
const Comment = require('../../models/Comment');
const { userAuthenticated } = require('../../helpers/authentication');
const Categories = require('../../models/Categories');

router.all('/*', userAuthenticated, (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});


router.get('/', (req, res) => {

    Post.count({}).then(postCount => {
        User.count({}).then(userCount => {
            Comment.count({}).then(commentCount => {
                res.render('admin/index', { postCount: postCount, userCount: userCount, commentCount: commentCount });
            })
        })

    })

});


router.post('/generate-fake-posts', (req, res) => {



    Categories.find({}).then(cats=>{

        var cat = [];

        cats.forEach(cats => {
            cat.push(cats.id)
        
        })

        return cat;
    
    }).then(cat=>{
        console.log(cat)

            for (let index = 0; index < req.body.numberOfLoops; index++) {

                let newPost = new Post();
                newPost.title = faker.name.title(),
                    newPost.status = faker.random.arrayElement(["public", "private", "draft"]),
                    newPost.allowComments = faker.random.boolean(),
                    newPost.body = faker.lorem.paragraph(),
                    newPost.category = faker.random.arrayElement(cat),
                    newPost.user = req.user.id
                newPost.slug = faker.name.title();
        
                newPost.save(function (err) {
                    if (err) throw err;
        
                })
            }
            res.redirect('/admin');

    }).catch(err=>{
        console.log(err)
    })

    
    


    



    
});




module.exports = router;