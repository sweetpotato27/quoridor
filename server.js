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
    console.log('A USER CONNECTED: ', socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected');
    })

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

httpServer.listen(3000, () => {
    console.log('Example app listening on port 3000!!!!\n');
});
