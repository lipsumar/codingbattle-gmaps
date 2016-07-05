var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    bodyParser = require('body-parser'),
    //io = require('socket.io')(http),
    path = require('path'),
    fs = require('fs'),

    SERVER_PORT = 3000;


 // parse json
 app.use(bodyParser.json());

// Define route: static
app.use(express.static(path.join(__dirname, '.')));



// start listening
http.on('error', function(err){
    if(err.code === 'EADDRINUSE'){
        console.log('Port '+SERVER_PORT+' already in use, trying '+(SERVER_PORT+1)+'...');
        SERVER_SERVER_PORT++;
        http.listen(SERVER_PORT);
    }
});

http.on('listening', function(){
    console.log('Server ready at http://localhost:'+SERVER_PORT);
})

http.listen(SERVER_PORT);