const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const Categories = require('../../models/Categories');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');


router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'home';
    next();
});


router.get('/', (req, res)=>{

    Post.find({})
        .populate('category')
        .then(posts=>{
            res.render('home/index', {posts: posts});
    });
});

router.get('/post/:id', (req, res)=>{

    Post.findOne({_id: req.params.id}).then(post =>{
        res.render('home/post',{post:post});
    });

});

router.get('/about', (req, res)=>{
    res.render('home/about');
});

router.get('/login', (req, res)=>{
    res.render('home/login');
});

router.get('/register', (req, res)=>{
    res.render('home/register');
});

router.post('/register', (req, res)=>{
   
    let errors = [];

    if(!req.body.firstName || !req.body.lastName || !req.body.email){
        errors.push({message:'Something went wrong!'})
    }

    if(req.body.password.length <= 5 ){
        errors.push({message:`Passwords must be at least 6 characters`})
    }

    if(req.body.password !== req.body.passwordConfirm){
        errors.push({message: "Password fields don't match"})
    }

    if(errors.length > 0){
        res.render('home/register',{errors: errors});
    }else{

        const newUser = new User({

            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password

        });

        bcrypt.genSalt(10, (err, salt)=>{

            bcrypt.hash(newUser.password, salt, (err, hash)=>{
                if(err) return;
                console.log(hash)
                
                newUser.password = hash;

                console.log(newUser);
            })

        });

        console.log(newUser);

        newUser.save().then(userSaved=>{
            res.render('home/login');
        }).catch(error=>{
            console.log(error);
            res.render('home/register');
        });

        
    }

    

});



module.exports = router;