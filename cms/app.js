const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const upload = require('express-fileupload');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/cms').then((db)=>{
    console.log('mongo connected');
}).catch(err =>{
    console.log(err);
});



app.use(express.static(path.join(__dirname,'public')));

//set view engine

const {select} = require('./helpers/handlebars-helpers');


app.engine('handlebars', exphbs({defaultLayout: 'home', helpers: {select: select}}));
app.set('view engine', 'handlebars');

//fileupload
app.use(upload());

//body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//method override
app.use(methodOverride('_method'));


//load routes
const home = require('./routes/home/index');
const admin = require('./routes/admin/index');
const posts = require('./routes/admin/posts');


//use routes
app.use('/', home);
app.use('/admin', admin);
app.use('/admin/posts', posts);



app.listen(4500, ()=>{
    console.log(`Listening to port 4500`);
});