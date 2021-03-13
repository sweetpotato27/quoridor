const express = require('express');
const webpack = require('webpack');

const app = express();
const config = require('./webpack.config');
const httpServer = require('http').Server(app);
const io = require('socket.io')(httpServer);
const uuid = require('uuid');

const PORT = process.env.PORT || 3000;

const rooms = {};

/**
 * credit goes to https://hyperpad.zendesk.com/hc/en-us/articles/360031646791-Setting-up-a-Multiplayer-Game-with-Socket-io
 *  Will connect a socket to a specified room
 * @param socket A connected socket.io socket
 * @param room An object that represents a room from the 'rooms' instance variable object
 */
const joinRoom = (socket, room) => {
    if (room) {
        room.sockets.push(socket);
        socket.join(room.id);
        /** store the room id in the socket for future use */
        socket.roomId = room.id;
        if (room.player1 === '') {
            room.player1 = socket.id;
        } else if (room.player2 === '') {
            room.player2 = socket.id;
        } else {
        }
    } else {
    }
};

/**
 * Will make the socket leave any rooms that it is a part of 
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

    /** Delete all the empty rooms that we found earlier */
    for (const room of roomsToDelete) {
        delete rooms[room.id];
    }
};

if (process.env.NODE_ENV === 'production') {
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname + 'index.html'));
    });
}
// app.use(
//     webpackDevMiddleware(compiler, {
//         publicPath: config.output.publicPath,
//     })
// );

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + 'index.html');
// });

io.on('connection', (socket) => {
    /**
     * give each socket a random identifier so that we can determine who is who when 
     * we're sending messages back and forth!
     */


    /**
     * Gets fired when someone wants to get the list of rooms.  respond with the list of room names.
     */
    socket.on('getRoomNames', (callback) => {
        const roomNames = [];
        for (const id in rooms) {
            const {name} = rooms[id];
            const sockets = rooms[id].sockets.length;
            const room = {name, id, sockets};
            roomNames.push(room);
        }
        callback(roomNames);
    });

    /**
     * Gets fired when a user wants to create a new room.
     */
    socket.on('createRoom', (roomName, callback) => {
        if (Object.keys(rooms).length < 29) {
            const room = {
                /*
                 generate a unique id for the new room, that way we don't need to deal with duplicates
                 */ 
                id: uuid.v4(), 
                name: roomName, 
                sockets: [],
                player1: '',
                player2: '',
            };
            rooms[room.id] = room;
            /** have the socket join the room they've just created. */
            joinRoom(socket, room);
            callback(true);
        } else {
            callback(false);
        }
    });

    /**
     * Gets fired when a player has joined a room.
     */
    socket.on('joinRoom', (roomId, callback) => {
        const room = rooms[roomId];
        if (room.sockets.length < 2) {
            joinRoom(socket, room);
            callback();
        } else {
        }
    });

    socket.on('lobby-message', ([room, msg]) => {
        /* 
        
         */
        io.to(room).emit('lobby-message', [socket.id, msg]);
    });

    socket.on('ready', () => {
        const room = rooms[socket.roomId];
        /** when we have two players... Start the game! */
        if (room) {
            if (room.sockets.length === 2) {
                /** tell each player to start the game. */
                for (const client of room.sockets) {
                    client.emit('initGame', JSON.stringify({
                        id: room.id,
                        name: room.name,
                        player1: room.player1,
                        player2: room.player2,
                    }));
                }
            }
        } else {
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

    socket.on('winner', (roomId, id) => {
        io.to(roomId).emit('gameOver', id);
    });

    socket.on('placeWall', (data) => {
        io.to(data.roomId).emit('placeWall', data)
    });

    socket.on('playerMove', (data) => {
        io.to(data.roomId).emit('playerMove', data);
    });

    socket.on('leaveRoom', () => {
        leaveRooms(socket);
    });
   
    socket.on('disconnect', () => {
        /** should probably remove from room and delete room if empty */
        leaveRooms(socket);
    });

});

httpServer.listen(PORT, () => {
});
