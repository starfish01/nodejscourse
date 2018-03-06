const http = require('http');
const fs = require('fs');

http.createServer((req,res)=>{

    let body ='';

    if(req.method === 'GET'){
        console.log(req.method);

    }
}).listen(4444);

console.log('its working');

//http- and post data.... Lesson 24