import _ from 'lodash';
import './style.css';
import Icon from './icon.png';

const Grid = require("./grid");
const GameLoop = require("./game_loop");

function component() {
    const element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'Quoridor'], ' ');
    element.classList.add('hello');

    return element;
}

function headComponent() {
    
    // Add the image to our existing div.
    const element = document.createElement('link');
    element.rel = "icon";
    element.href = Icon;
    element.type = 'image/png';

    return element;
}

document.head.appendChild(headComponent());
document.body.appendChild(component());




document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("canvas");
    const generate = document.getElementById("generate");
    const reset = document.getElementById("reset");
    
    canvas.width = 500;
    canvas.height = 500;
    // canvas.style.zIndex = 1;

    const ctx = canvas.getContext("2d");
    const grid = new Grid();
    const game = new GameLoop(grid, ctx);
    grid.setup(ctx);
    game.start();

    generate.onclick = function gen() {
        grid.generate = !grid.generate;
    }

    reset.onclick = function res() {
        grid.reset();
    }

});



