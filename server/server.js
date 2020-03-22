(function() {
    const path = require('path');
    const http = require('http');
    const express = require('express');
    const socketIO = require('socket.io');
    const PORT = process.env.port || 4200;
    const publicPath = path.join(__dirname , '/../public');

    let app = express();
    let server = http.createServer(app);
    let io = socketIO(server);

    const users = [];

    app.use(express.static(publicPath));


    io.on('connection', (socket) => {

        socket.on('newUser', (newUserData) => {
            users.push(newUserData.name);
            socket.broadcast.emit('newUser', newUserData);
            socket.emit('getConnectedUsers', users);
        });

        socket.on('newMessage', (msgObject) => {
            socket.broadcast.emit('newMessage', msgObject);
        });


        socket.on('disconnect', () => {
            console.log('User was Disconnected !!');
        });
    });


    server.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });

    function createMessage(msgObj) {
        this.message = msgObj.message;
        this.from = msgObj.from;
        this.createdAt = new Date().getTime();
    }

} ());