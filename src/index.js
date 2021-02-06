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
        let dir = event.key;
        let player = document.getElementsByClassName('player')[0];
        let dest = player.id;
        let newPlayer;
        let newDest;
        if(dir === "ArrowUp" || dir === "ArrowDown"
        || dir === "ArrowRight" || dir === "ArrowLeft") {

            newDest = validMove(dest, dir);
            console.log(newDest);
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

function validMove(dest, dir) {
    const columns = ["a","b","c","d","e","f","g","h","i"];
    let newDest = "xx";
    if(dir === "ArrowUp") {
        //if valid move move up
        // turn into an array for easy change
        newDest = newDest.split("");
        dest = dest.split("");
        newDest[0] = dest[0];
        newDest[1] = parseInt(dest[1]) - 1;
        if (newDest[1] < 1) {
            return dest.join("");
        } else {
            newDest = newDest.join("");
            return newDest;
        }

    } else if(dir === "ArrowDown") {
        //if valid move move up
        newDest = newDest.split("");
        dest = dest.split("");
        newDest[0] = dest[0];
        newDest[1] = parseInt(dest[1]) + 1;
        if (newDest[1] > 9) {
            return dest.join("");
        } else {
            newDest = newDest.join("");
            return newDest;
        }

    } else if(dir === "ArrowRight") {
        //if valid move move up
        // turn into an array for easy change
        newDest = newDest.split("");
        dest = dest.split("");
        // finds the index of letter in 'columns' then indexes one more
        newDest[0] = columns[findColumnIndex(columns, dest[0]) + 1];
        newDest[1] = dest[1];
        if (newDest[1] < 0) {
            return dest.join("");
        } else {
            newDest = newDest.join("");
            return newDest;
        };

    } else if (dir === "ArrowLeft") {
        //if valid move move up
        // turn into an array for easy change
        newDest = newDest.split("");
        dest = dest.split("");
        // finds the index of letter in 'columns' then indexes one more
        newDest[0] = columns[findColumnIndex(columns, dest[0]) - 1];
        newDest[1] = dest[1];
        if (newDest[1] < 0) {
            return dest.join("");
        } else {
            newDest = newDest.join("");
            return newDest;
        }
    }

}




