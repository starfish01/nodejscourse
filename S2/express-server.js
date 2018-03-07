const express = require('express');
let app = express();

const port = process.env.Port || 9999;


app.get('/', (req, res)=>{
    res.send('<h1> Hello </h1>');
});

app.get('/api', (req, res)=>{

    //res.send('<h1> API Page </h1>');

    res.json({name: 'patrick'});

});


app.listen(port);

console.log('Its working');