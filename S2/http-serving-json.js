const https = require('https');
const http = require('http');
const fs = require('fs');

const url = 'https://jsonplaceholder.typicode.com/posts';

http.createServer((req, res)=>{
    if( req.method === 'GET' && req.url === '/posts'){
        https.get(url, (httpRes)=>{
            httpRes.on('data',data => {
                httpRes.setEncoding('utf8');
                res.write(data);
            });
            httpRes.on('end', ()=>{
                res.end();
                console.log('its over');
            });
        });
    } else {
        res.writeHead(404, {'Content-Type':'text/plain'});
        res.end('404 ERROR, could not find what you were looking for');
    }

}).listen(4444);
console.log('Server is running');