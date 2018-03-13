const mongoose = require('mongoose');
const User = require('./models/User');
const express = require('express');
const app = express();


mongoose.connect('mongodb://localhost:27017/mongoose');
mongoose.connection
.once('open', ()=>console.log('connected'))
.on('error', (err)=> {
    console.log(`Could not connect`, err)
});


app.post('/users');


// const newUser = new User({
//     firstName: 'Jack',
//     lastName: 'Mal',
//     isActive: 1
// });

// newUser.save(function(err, dataSaved){
//     if(err) return err;
//     console.log(dataSaved)
// });

const port = 4444 || process.env.PORT;

app.listen(port, ()=>{
    console.log(`listening on ${port}`);
});
