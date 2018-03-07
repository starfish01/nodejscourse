const express = require('express');

let app = express();

app.get('/', (req,res)=>{
    res.send('<h1>home</h1>');
});

app.get('/post/:id/category/:category_id', (req, res)=>{


    res.send(`
    
    <p> Here is ${req.params.id}</p>
    <p> Here is Cat Id ${req.params.category_id}</p>
    
    
    `)
});




app.listen(9999);

console.log("it's working");