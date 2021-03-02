const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config');
const compiler = webpack(config);
const httpServer = require('http').Server(app);
const io = require('socket.io')(httpServer);

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
    })
);

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'index.html');
});

io.on('connection', (socket) => {
    const rooms = io.sockets.adapter.rooms;
    const sids = io.of("/").adapter.sids;
    console.log('A USER CONNECTED: ', socket.id);
    socket.on('disconnect', () => {
        console.log(socket.rooms);
    })

    socket.on('room select', (roomID) => {
        console.log("room ID => " + roomID);
        socket.join(roomID);
        if (rooms) console.log(rooms.get(roomID).size);
    });
});

httpServer.listen(3000, () => {
    console.log('Example app listening on port 3000!!!!\n');
});
