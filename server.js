const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config');
const compiler = webpack(config);
const httpServer = require('http').Server(app);
const io = require('socket.io')(httpServer);
const uuid = require('uuid/v1');

const PORT = process.env.PORT || 3000;

const rooms = {};

/**
 * credit goes to https://hyperpad.zendesk.com/hc/en-us/articles/360031646791-Setting-up-a-Multiplayer-Game-with-Socket-io
 *  Will connect a socket to a specified room
 * @param socket A connected socket.io socket
 * @param room An object that represents a room from the 'rooms' instance variable object
 */
const joinRoom = (socket, room) => {
    room.sockets.push(socket);
    socket.join(room.id), () => {
        /** store the room id in the socket for future use */
        socket.roomId = room.id;
        console.log(socket.id, "Joined", room.id);
    };
};

/**
 * Will make the socket leave any room sthat it is a part of 
 * @param socket A connected socket.io socket
 */
const leaveRooms = (socket) => {
    const roomsToDelete = [];
    for (const id in rooms) {
        const room = rooms[id];
        /** check to see if the socket is in the current room */
        if (room.sockets.includes(socket)) {
            socket.leave(id);
            /** remove the socket from the room object */
            room.sockets = room.sockets.filter((item) => item !== socket);
        }
        /** Prepare to delete any rooms that are now empty */
        if (room.sockets.length === 0) {
            roomsToDelete.push(room);
        }
    }

    /** Delete all the empty rooms taht we found earlier */
    for (const room of roomsToDelete) {
        delete rooms[room.id];
    }
};

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
        console.log("user disconnected")
    });

    socket.on('room-select', (roomID) => {
        if(rooms.get(roomID)) {
            if (rooms.get(roomID).size < 2) {
                socket.join(roomID);
                io.to(roomID).emit('join-room', roomID);
            } else {
                console.log("room is full!");
                io.emit('room-join-error', "Room is full");
            }
        } else {
            socket.join(roomID);
            io.to(roomID).emit('join-room', roomID);
        }
    });

    /**
     * Gets fired when a user wants to create a new room.
     */
    socket.on('createRoom', (roomName, callback) => {
        const room = {
            /*
             generate a unique id for the new room, that way we don't need to deal with duplicates
             */ 
            id: uuid(), 
            name: roomName, 
            sockets: []
        };
        rooms[room.id] = room;
        /** have the socket join the room they've just created. */
        joinRoom(socket, room);
        callback();
    });

    /**
     * Gets fired when someone wants to get the list of rooms.  respond with the list of room names.
     */
    socket.on('getRoomNames', (data, callback) => {
        const roomNames = [];
        for (const id in rooms) {
            const {name} = room[id];
            const room = {name, id};
            roomNames.push(room);
        }

        callback(roomNames);
    });

    /**
     * Gets fired when a player has joined a room.
     */
    socket.on('joinRoom', (roomId, callback) => {
        const room = rooms[roomId];
        joinRoom(socket, room);
        callback();
    });

    socket.on('lobby-message', ([room, msg]) => {
        /* 
        
         */
        io.to(room).emit('lobby-message', [socket.id, msg]);
    });

    socket.on('start-game', ([socket, room]) => {
        console.log("starting game....");
        console.log(socket);
        console.log(room);
        for (let key in io.sockets.adapter.rooms.get(room).keys()) {
            console.log(key);
        }
        io.to(room).emit('start-game', [socket, room]);
    });

    socket.on('ready', () => {
        console.log(socket.id, "is ready!");
        const room = rooms[socket.roomId];
        /** when we have two players... Start the game! */
        if (room.sockets.length === 2) {
            /** tell each player to start the game. */
            for (const client of room.sockets) {
                client.emit('initGame');
            }
        }
    });

    /**
     * The game has started!  Give everyone their default values and tell each client about each player
     * @param data we don't actually use that so we can ignore it 
     * @param callback Respond back to the message with information about the game state 
     */
    socket.on('startGame', (data, callback) => {
        const room = rooms[socket.roomId];
        if (!room) {
            returnl
        }
        const others = [];
        for (const client of room.sockets) {
            /** set the players up */
            if (client === socket) {
                continue;
            }
            others.push({
                id: client.id
            });
        }
        /** tell the client who they are and who everyone else is! */
        const ack = {
            me: {
                id: socket.id
            },
            others
        };

        callback(ack);

        /** start the game in 5 seconds */
        setTimeout(() => {
            beginRound(socket, null);
        }, 5000);
    });

   

});

httpServer.listen(PORT, () => {
    console.log(`Example app listening on port *:${PORT}!!!!\n`);
});
