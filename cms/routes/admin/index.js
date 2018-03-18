const express = require('express');
const router = express.Router();

router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'admin';
    next();
});


router.get('/', (req, res)=>{
    res.render('admin/index');
});

router.get('/dashboard', (req, res)=>{
    res.render('admin/dashboard');
});

router.get('/oldposts', (req, res)=>{
    res.render('admin/oldposts');
});

router.get('/createposts', (req, res)=>{
    res.render('admin/createposts');
});


module.exports = router;