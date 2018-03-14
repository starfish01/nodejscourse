const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

mongoose.connect('mongodb://localhost:27017/login', ()=>{
    console.log('Connected to DB');
});






















const port = 4444 || process.env.PORT;
app.listen(port, ()=> {
    console.log(`Listening on Port ${port}`)
});