const express = require('express');

let app = express();


app.use('/css', express.static(__dirname + '/public'));




app.use('/',(req,res,next)=>{

    console.log('middleware');

    next();

});

app.get('/', (req,res)=>{
    res.send(`
   
    <!DOCTYPE html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="/css/style.css">
    </head>
    <body>
        <p>hidfisdhidgf igshf dfighidgf] dgfs 
            hdf i]hidfs</p>
        
    </body>
</html>

    
    
    
    `);
});


app.listen(9999);

console.log(`It's working`)