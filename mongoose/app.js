const mongoose = require('mongoose');
const User = require('./model/User')


mongoose.connect('mongodb://localhost:27017/mongoose');
mongoose.connection
.once('open', ()=>console.log('connected'))
.on('error', (err)=> {
    console.log(`Could not connect`, err)
});





