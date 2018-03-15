const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const User = require('./models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



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




















const port = 4444 || process.env.PORT;
app.listen(port, ()=> {
    console.log(`Listening on Port ${port}`)
});