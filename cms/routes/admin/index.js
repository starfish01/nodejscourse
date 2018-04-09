const express = require('express');
const router = express.Router();
const faker = require('faker');
const Post = require('../../models/Post');
const User = require('../../models/User');
const Comment = require('../../models/Comment');
const {userAuthenticated} = require('../../helpers/authentication');
const Categories = require('../../models/Categories');

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

    let cat =[];

    Categories.find({}).then(cats=>{
        cats.forEach(item=>{
            cat.push(item.id);

            for (let index = 0; index < req.body.numberOfLoops; index++) {

                let newPost = new Post();
                newPost.title= faker.name.title(),
                newPost.status= faker.random.arrayElement(["public","private","draft"]),
                newPost.allowComments= faker.random.boolean(),
                newPost.body= faker.lorem.paragraph(),
                newPost.category= faker.random.arrayElement(cat),
                newPost.user=req.user.id
                newPost.slug = faker.name.title();
        
                newPost.save(function(err){
                    if(err) throw err;

                    
                })
        
            }
        })
    })

   

    res.redirect('/admin');
    


        // let newPost = new Post({
        //     title: faker.name.title(),
        //     status: faker.random.arrayElement(["public","private","draft"]),
        //     allowComments: faker.random.boolean(),
        //     body: faker.lorem.paragraph(),
        //     category: "5abd702793abac3866a2ee28",
        //     user: req.user.id

        // });

        // newPost.save().then(savedPost =>{

        //     res.redirect('/admin');
        // }).catch(err =>{
        //     res.redirect('/admin');
        //     console.log(err);
        // });
    

});




module.exports = router;