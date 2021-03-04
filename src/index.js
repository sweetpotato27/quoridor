// import _, { throttle } from 'lodash';
import './style.css';
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
    joinRoom.setAttribute('id', 'join-room-button');
    joinRoom.innerHTML = "Join A Room";
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
            for (let i = 0; i < roomNames.length; i++) {
                console.log(roomNames[i]);
            }
        };
        socket.emit('getRoomNames', callback);
    });

    document.getElementsByTagName('body')[0].appendChild(div);
}

function createRoomForm(socket) {

    const roomForm = document.createElement("form");
    const formDiv = document.createElement("div");
    const roomInput = document.createElement("input");
    const roomButton = document.createElement("button");
    roomForm.setAttribute("id", "roomForm");
    formDiv.setAttribute("id", "formDiv");
    roomInput.setAttribute("id", "roomInput");
    roomInput.setAttribute("placeholder", "Enter room name...");
    roomButton.setAttribute("id", "roomButton");
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
            };
            socket.emit('createRoom', roomInput.value, callback);
            roomInput.value = '';
        }
    });

    socket.on('join-room', (roomID) => {
        console.log("joining room");
        formDiv.classList.add("hide");
        console.log(socket);
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
        console.log(socket);
        console.log(room);
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
        console.log(socket.id);
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (input.value) {
                socket.emit('lobby-message', [room, input.value]);
                input.value = '';
            }
        });
        startGame.addEventListener('click', (e) => {
            console.log(e);
            socket.emit('start-game', [socket.id, room]);
        })
    }
}

function gameTable(socket, room) {
    console.log(socket);
    console.log(room);
    let players;
    let game = new Game('','');
    // setupBoard();
    let gameView = new GameView(game);
    game.start();
    gameView.show();
}

document.head.appendChild(iconComponent());



document.addEventListener("DOMContentLoaded", function () {
    // let game = new Game();
    // // setupBoard();
    // let gameView = new GameView(game);
    // game.start();
    // gameView.show();

    const socket = io();

    lobbySplash(socket);

});



