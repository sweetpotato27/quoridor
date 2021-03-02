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
            socket.emit('room select', roomInput.value);
            roomInput.value = '';
        }
    });

    socket.on('room join', (roomID) => {
        console.log(socket.id, " joined room: ", roomID);
    });

});



