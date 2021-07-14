var express = require('express');
var socket = require('socket.io');

// App Setup

var app = express();
var server = app.listen(1003, function() {
    console.log('Server Started');
})

// Serves static files
app.use(express.static('public'));

// Socket Setup
var io = socket(server);

io.on('connection', function(socket) {

    // Accept chat message from a user
    socket.on('chat', function(data) {
        io.sockets.emit('chat', data); 
    })

    // Accept user handle who is typing
    socket.on('typing', function(data) {
        socket.broadcast.emit('typing', data);
    })

    // Check if data is recieved
    console.log('Socket Conn is made'); 
})
