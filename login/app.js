const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const User = require('./models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.Promise = global.Promise;



mongoose.connect('mongodb://localhost:27017/login', ()=>{
    console.log('Connected to DB');
});


app.post('/register',(req,res)=>{
    const newUser = new User();
    newUser.email = req.body.email;
    newUser.password = req.body.password;

    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password, salt, (err,hash)=>{
            if(err) return err;
            newUser.password = hash;

            newUser.save().then(userSaved =>{
                console.log('saved')
                res.send(`user saved`)
            }).catch(err => {
                console.log(`failed to save ${err}`)
                res.send('Failed to save' + err)
            });
            
        })
    });
    
});


app.post('/login', (req, res)=>{
    User.findOne({email: req.body.email}).then(user=>{
        
        if(user){
            bcrypt.compare(req.body.password, user.password, (err, matched)=>{
                console.log(req.body.password);
                console.log(user.password)
                console.log(matched)
                console.log(err)


                if(err) return err;

                if(matched){
                    console.log('User was able to login');
                    res.send('User was able to login')
                }else{
                   console.log('user was unable to login')
                    res.send('user was not able to login')
                }

            });
        }
    });
});

















const port = 4444 || process.env.PORT;
app.listen(port, ()=> {
    console.log(`Listening on Port ${port}`)
});