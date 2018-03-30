const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const upload = require('express-fileupload');
const session = require('express-session');
const flash = require('connect-flash');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/cms').then((db)=>{
    console.log('mongo connected');
}).catch(err =>{
    console.log(err);
});






app.use(express.static(path.join(__dirname,'public')));

//set view engine

const {select, GenerateTime, getCategoryName} = require('./helpers/handlebars-helpers');


app.engine('handlebars', exphbs({defaultLayout: 'home', helpers: {select: select, GenerateTime: GenerateTime, getCategoryName: getCategoryName}}));
app.set('view engine', 'handlebars');

//fileupload
app.use(upload());

//body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//method override
app.use(methodOverride('_method'));


app.use(session({
    secret: 'patrickKey',
    resave:true,
    saveUninitialized:true
}));

app.use(flash());

//local var using middle ware

app.use((req, res, next)=>{
    res.locals.success_message = req.flash('success_message');

    next();
});


//load routes
const home = require('./routes/home/index');
const admin = require('./routes/admin/index');
const posts = require('./routes/admin/posts');
const categories = require('./routes/admin/categories');


//use routes
app.use('/', home);
app.use('/admin', admin);
app.use('/admin/posts', posts);
app.use('/admin/categories', categories);



app.listen(4500, ()=>{
    console.log(`Listening to port 4500`);
});