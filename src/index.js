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

function gameLobby(socket, room) {
    const div = document.createElement("div");
    const h1 = document.createElement("h1")
    const ul = document.createElement("ul");
    const form = document.createElement("form");
    const input = document.createElement("input");
    const button = document.createElement("button");
    div.setAttribute("id", "lobby-div");
    h1.innerHTML = room;
    ul.setAttribute("id", "lobby-messages");
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
    document.getElementsByTagName("body")[0].appendChild(div);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (input.value) {
            socket.emit('lobby-message', input.value);
            input.value = '';
        }
    });
}

document.head.appendChild(iconComponent());



document.addEventListener("DOMContentLoaded", function () {
    // let game = new Game();
    // // setupBoard();
    // let gameView = new GameView(game);
    // game.start();
    // gameView.show();

    const socket = io();

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
            socket.emit('room-select', roomInput.value);
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

    socket.on('lobby-message', (msg) => {
        let item = document.createElement('li');
        item.textContent = msg;
        document.getElementById('lobby-messages').appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    });

});



