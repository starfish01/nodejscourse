const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const Categories = require('../../models/Categories');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


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

// app login

passport.use(new LocalStrategy({usernameField: 'email'},(email, password, done)=>{
    User.findOne({email: email}).then(user=>{
        if(!user) return done(null, false,{message: 'No user found'});

        bcrypt.compare(password, user.password, (err, match)=>{
            if(err) return err;

            if(matched){
                return done(null, user);
            }else{
                return done(null, false, {message: 'incorrect password.'});
            }
        });
    })

}));



router.post('/login', (req, res, next)=>{

    passport.authenticate('local',{

        successRedirect:'/admin',
        failureRedirect:'/login',
        failureFlash: true
    })(req, res, next);

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
        res.render('home/register',{
            errors: errors,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email

        
        });
    }else{

        User.findOne({email: req.body.email}).then(user=>{
            if(user){
                req.flash('error_message', 'That email exists please login');
                res.redirect('register');
            } else {

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
        
                        newUser.save().then(userSaved=>{
        
                            req.flash('error_message','You are registered now you can login');
        
                            res.render('home/login');
                        }).catch(error=>{
                            console.log(error);
                            res.render('home/register');
                        });
        
                        
                    })
        
                });

            }
        })

        

        

       

        
    }

    

});



module.exports = router;