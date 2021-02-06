import _ from 'lodash';
import './style.css';
import Icon from './icon.png';

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


document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("keyup", (event) => {
        const columns = ["a","b","c","d","e","f","g","h","i"]
        let player = document.getElementsByClassName('player')[0];
        let newPlayer;
        let newDest = "";
        if(event.key === "ArrowUp" || event.key === "ArrowDown"
            || event.key === "ArrowRight" || event.key === "ArrowLeft") {
            if(event.key === "ArrowUp") {
                let dest = player.id;
                //if valid move move up
                if(true) {
                    // turn into an array for easy change
                    newDest = newDest.split("");
                    dest = dest.split("");
                    newDest[0] = dest[0];
                    newDest[1] = parseInt(dest[1]) - 1;
                    newDest = newDest.join("");
                }
                console.log(newDest);
            } else if(event.key === "ArrowDown") {
                let dest = player.id;
                //if valid move move up
                if(true) {
                    // turn into an array for easy change
                    newDest = newDest.split("");
                    dest = dest.split("");
                    newDest[0] = dest[0];
                    newDest[1] = parseInt(dest[1]) + 1;
                    newDest = newDest.join("");
                }
                console.log(newDest);
            } else if(event.key === "ArrowRight") {
                let dest = player.id;
                //if valid move move up
                if(true) {
                    // turn into an array for easy change
                    newDest = newDest.split("");
                    dest = dest.split("");
                    // finds the index of letter in 'columns' then indexes one more
                    newDest[0] = columns[findColumnIndex(columns, dest[0]) + 1];
                    newDest[1] = dest[1];
                    newDest = newDest.join("");
                }
                console.log(newDest);
            } else if (event.key === "ArrowLeft") {
                let dest = player.id;
                //if valid move move up
                if(true) {
                    // turn into an array for easy change
                    newDest = newDest.split("");
                    dest = dest.split("");
                    // finds the index of letter in 'columns' then indexes one more
                    newDest[0] = columns[findColumnIndex(columns, dest[0]) - 1];
                    newDest[1] = dest[1];
                    newDest = newDest.join("");
                }
                console.log(newDest);
            }
            newPlayer = document.getElementById(newDest);
            player.innerHTML = "";
            player.classList.remove("player");
            newPlayer.innerHTML = "X";
            newPlayer.classList.add("player");
        }
    });
});

function findColumnIndex(arr, target) {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] === target) {
            return i;
        }
    }
}

function validMove(dest) {

}




