const WebSocketServer = require('ws').Server;
const WSS = new WebSocketServer({port: 3232});


WSS.on('connection',(ws)=>{

    ws.on('message', (message)=>{

        // for (i = 0; i < 5; i++) { 
        //     message += ` ${i}`;
        // }

        // setTimeout(function() {
        //     console.log(message);
        // }, 500);

        WSS.clients.forEach((client)=>{

            client.send(message);

        });

        console.log(message);

        
        



    });

    

    console.log('we are connected');

});

