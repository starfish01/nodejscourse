const mongoose = require('mongoose');
const User = require('./models/User');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


mongoose.Promise = global.Promise;


mongoose.connect('mongodb://localhost:27017/mongoose');
mongoose.connection
.once('open', ()=>console.log('connected'))
.on('error', (err)=> {
    console.log(`Could not connect`, err)
});


app.get('/', (req, res)=>{
    res.send('Root');
});


app.post('/users', (req,res)=>{
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        isActive: req.body.isActive
    }); 
    
    newUser.save().then(savedUser =>{
        console.log('Saved User');
    }).catch(err=>{
        res.status(404).send(`User Not Saved ... ${err}`)
    });
    res.send(newUser);
});


app.get('/users', (req,res)=>{
    User.find({}).then(users =>{
        res.status(200).send(users);
    }).catch(err=>{
        res.status(404).send(`Data Not Found ... ${err}`)
    });
});


app.patch('/users/:id',(req, res)=>{
    
    const id = req.params.id;
    const firstName = req.body.firstName;

    User.findByIdAndUpdate(id, {$set: {firstName: firstName}}, {new: true})
    .then(savedUser=>{
        res.status(200).send('Saved by patch');
        console.log('Saved Via Patch');
    });

});

//patch or put



const port = 4444 || process.env.PORT;

app.listen(port, ()=>{
    console.log(`listening on ${port}`);
});
