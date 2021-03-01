// import _, { throttle } from 'lodash';
import './style.css';
import Icon from './icon.png';
import GameView from "./game_view";
import Game from "./game";


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
    let game = new Game();
    // setupBoard();
    let gameView = new GameView(game);
    game.start();
    gameView.show();
});



