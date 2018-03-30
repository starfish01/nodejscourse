const express = require('express');
const router = express.Router();
const faker = require('faker');
const Post = require('../../models/Post');

router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'admin';
    next();
});


router.get('/', (req, res)=>{
    res.render('admin/index');
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