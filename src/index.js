// import _, { throttle } from 'lodash';
import './style.scss';
import Icon from './icon.png';
import GameView from './game_view';
import Game from './game';
import { io } from 'socket.io-client';


function iconComponent() {
    
    // Add the image to our existing div.
    const element = document.createElement('link');
    element.rel = "icon";
    element.href = Icon;
    element.type = 'image/png';

    return element;
}

function lobbySplash(socket) {
    const div = document.createElement('div');
    const createRoom = document.createElement('button');
    const joinRoom = document.createElement('button');
    div.setAttribute('id', 'splash-div');
    createRoom.setAttribute('id', 'create-room-button');
    createRoom.innerHTML = "Create A Room";
    createRoom.classList.add("btn");
    joinRoom.setAttribute('id', 'join-room-button');
    joinRoom.innerHTML = "Join A Room";
    joinRoom.classList.add("btn");
    div.appendChild(createRoom);
    div.appendChild(joinRoom);

    /** Event Listener for createRoom and joinRoom */
    createRoom.addEventListener('click', () => {
        /** deletes div and adds a form to create a room */
        div.remove();
        createRoomForm(socket);
    });
    joinRoom.addEventListener('click', () => {
        /** emits getRoomNames and make the room names buttons */
        const callback = (roomNames) => {
            const numberOfRooms = lobbyRoomsList(socket, roomNames);
            if (numberOfRooms > 0) div.remove();
        };
        socket.emit('getRoomNames', callback);
    });

    document.getElementsByTagName('body')[0].appendChild(div);
}

function lobbyRoomsList(socket, roomNames) {
    const div = document.createElement('div');
    div.setAttribute('id', 'lobby-rooms-list-div');
    const ul = document.createElement('ul');
    const callback = () => {
        console.log("room joined");
        socket.emit('ready');
    };
    for (let i = 0; i < roomNames.length; i++) {
        if (roomNames[i].sockets < 2) {
            const li = document.createElement('li');
            const button = document.createElement('button');
            li.appendChild(button);
            button.innerHTML = roomNames[i].name;
            button.classList.add("btn");
            button.addEventListener('click', (e) => {
                div.remove();
                socket.emit('joinRoom', roomNames[i].id, callback);
            });
            ul.appendChild(li);
        }
    }
    div.appendChild(ul);
    document.getElementsByTagName('body')[0].appendChild(div);
    return roomNames.length;
}

function createRoomForm(socket) {

    const roomForm = document.createElement("form");
    const formDiv = document.createElement("div");
    const roomInput = document.createElement("input");
    const roomButton = document.createElement("button");
    roomForm.setAttribute("id", "room-form");
    formDiv.setAttribute("id", "form-div");
    roomInput.setAttribute("id", "room-input");
    roomInput.setAttribute("placeholder", "Type room name");
    roomButton.setAttribute("id", "room-button");
    roomButton.classList.add("btn");
    roomButton.innerHTML = "Go!"

    formDiv.appendChild(roomForm);
    roomForm.appendChild(roomInput);
    roomForm.appendChild(roomButton);
    document.getElementsByTagName("body")[0].appendChild(formDiv);
    


    roomForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (roomInput.value) {
            const callback = () => {
                console.log("room created");
                formDiv.remove();
                socket.emit('ready');
            };
            socket.emit('createRoom', roomInput.value, callback);
            roomInput.value = '';
        }
    });

    socket.on('join-room', (roomID) => {
        console.log("joining room");
        formDiv.classList.add("hide");
        gameLobby(socket, roomID);
    });

    socket.on('room-join-error', (msg) => {
        console.log(msg);
    })

    socket.on('lobby-message', ([id, msg]) => {
        let item = document.createElement('li');
        item.textContent = id + " -> " + msg;
        document.getElementById('lobby-messages').appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    });

    socket.on('start-game', ([socket, room]) => {
        console.log("starting game...");
        if(!document.getElementsByClassName('table')[0]) {
            document.getElementById('lobby-div').classList.add("hide");
            gameTable(socket, room);
        }
        
    });
}

function gameLobby(socket, room) {
    if(!document.getElementById('lobby-div')) {
        const div = document.createElement("div");
        const h1 = document.createElement("h1")
        const ul = document.createElement("ul");
        const form = document.createElement("form");
        const input = document.createElement("input");
        const button = document.createElement("button");
        const startGame = document.createElement("button");
        div.setAttribute("id", "lobby-div");
        h1.innerHTML = room;
        h1.setAttribute("id", "lobby-id");
        ul.setAttribute("id", "lobby-messages");
        startGame.setAttribute("id", "lobby-start-game");
        startGame.innerHTML = "Start Game!";
        form.setAttribute("id", "lobby-form");
        form.setAttribute("action", "");
        input.setAttribute("id", "lobby-input");
        input.setAttribute("autocomplete", "off");
        button.innerHTML = "send";
        form.appendChild(input);
        form.appendChild(button);
        ul.appendChild(form);
        div.appendChild(h1);
        div.appendChild(ul);
        div.appendChild(startGame);
        document.getElementsByTagName("body")[0].appendChild(div);
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (input.value) {
                socket.emit('lobby-message', [room, input.value]);
                input.value = '';
            }
        });
        startGame.addEventListener('click', (e) => {
            socket.emit('start-game', [socket.id, room]);
        })
    }
}

function gameTable(socket, JSONroom) {
    const room = JSON.parse(JSONroom);
    const game = new Game(socket, room);
    // setupBoard();
    const gameView = new GameView(socket, room, game);
    game.start();
    gameView.show();

    socket.on('playerMove', (data) => {
        let oldRow = data.oldPos[0];
        let oldCol = data.oldPos[1];
        let newRow = data.newPos[0];
        let newCol = data.newPos[1];
        game.board.grid[oldRow][oldCol].player = "empty";
        game.board.grid[newRow][newCol].player = data.player;
        game.swapTurn();
        gameView.show();
    });

    socket.on('placeWall', (data) => {
        const posA = data.wallA;
        const posB = data.wallB;
        const posC = data.wallC;
        const posD = data.wallD;
        const sqrA = game.board.grid[posA[0]][posA[1]];
        const sqrB = game.board.grid[posB[0]][posB[1]];
        const sqrC = game.board.grid[posC[0]][posC[1]];
        const sqrD = game.board.grid[posD[0]][posD[1]];
        if ( data.dir === "north" ) {
            sqrA.walls.North = true;
            sqrB.walls.North = true;
            sqrC.walls.South = true;
            sqrD.walls.South = true;
        } else if (data.dir === "south" ) {
            sqrA.walls.South = true;
            sqrB.walls.South = true;
            sqrC.walls.North = true;
            sqrD.walls.North = true;
        } else if (data.dir === "east" ) {
            sqrA.walls.East = true;
            sqrB.walls.East = true;
            sqrC.walls.West = true;
            sqrD.walls.West = true;
        } else if (data.dir === "west" ) {
            sqrA.walls.West = true;
            sqrB.walls.West = true;
            sqrC.walls.East = true;
            sqrD.walls.East = true;
        } else {
            console.log('dir is invalid');
        }
        game.swapTurn();
        gameView.show();
    });
}

document.head.appendChild(iconComponent());



document.addEventListener("DOMContentLoaded", function () {
    
    const socket = io();
    const room = {
        id: "xxxxxxx", 
        name: "room", 
        sockets: ["test1", "test2"],
        player1: 'test1',
        player2: 'test2',
    };
    gameTable(socket, JSON.stringify(room));

    // lobbySplash(socket);

    // socket.on('initGame', (room) => {
    //     console.log(`starting the game for ${socket.id}`);
    //     console.log(`you are in room ${room}`);
    //     gameTable(socket, room);
    // });

});



