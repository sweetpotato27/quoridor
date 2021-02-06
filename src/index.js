import _, { throttle } from 'lodash';
import './style.css';
import Icon from './icon.png';

const columns = ["a","b","c","d","e","f","g","h","i"];

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
    setupBoard();
    document.addEventListener("keyup", (event) => {
        let dir = event.key.split("Arrow")[1];
        let player = document.getElementsByClassName('player')[0];
        let dest = player.id;
        let newPlayer;
        let newDest;
        if(dir === "Up" || dir === "Down"
        || dir === "Right" || dir === "Left") {

            newDest = validMove(dest, dir.toLowerCase());
            newPlayer = document.getElementById(newDest);
            player.innerHTML = "";
            player.classList.remove("player");
            newPlayer.innerHTML = "X";
            newPlayer.classList.add("player");

        }
    });
    let squares = document.getElementsByTagName("td");
    let wallPlacement = "";
    let startEvent;
    let startPos = [-1, -1];
    let endPos;
    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener("mousedown", (event) => {
            event.preventDefault();
            startEvent =  event;
            startPos = [event.x, event.y];
            if (event.offsetX < 25) {
                wallPlacement = "left";
            } else if (event.offsetX > 50) {
                wallPlacement = "right";
            } else if (event.offsetY < 32) {
                wallPlacement = "top";
            } else if (event.offsetY >= 32) {
                wallPlacement = "bottom";
            }
        })
    }
    document.addEventListener("mouseup", (event) =>{
        endPos = [event.x, event.y];
        if (startPos[0] !== -1) {
            placeWall(startEvent, startPos, endPos, wallPlacement);
        }
    });
});

function setupBoard() {
    let board = document.getElementById("table");
    for(let i = 0; i < 10; i++) {
        let tr = document.createElement("tr");
        for(let j = 0; j < 10; j++) {
            let th = document.createElement("th");
            let td = document.createElement("td");
            if(i === 0 && j === 0) {
                th.innerHTML = ""
                tr.appendChild(th);
            } else if (i === 0) {
                th.innerHTML = columns[j - 1]
                tr.appendChild(th);
            } else if (i > 0 && j === 0) {
                th.innerHTML = i
                tr.appendChild(th);
            } else {
                td.id = `${columns[j - 1]}${i}`;
                td.classList.add("floor", "hall");
                tr.appendChild(td);
                if(i === 9 && j === 5) {
                    td.classList.add("player");
                    td.innerHTML = "X";
                }
            }
        }
        board.appendChild(tr);
    }
}

function placeWall(event, start, end, wallPlacement) {
    // console.log("_________________");
    // console.log(target);
    // console.log(start);
    // console.log(end);
    console.log(wallPlacement);
    // console.log("-----------------");
    //vertical or horizonal?
    // |start.x - end.x| > |start.y - end.y| = horizonal
    // |start.x - end.x| < |start.y - end.y| = vertical
    if (Math.abs(start[0] - end[0]) > Math.abs(start[1] - end[1])) {
        if (wallPlacement !== "bottom" || wallPlacement !== "top") {
            console.log("--------------");
            console.log(wallPlacement)
            event.offsetY >= 32 ? wallPlacement = "bottom" : wallPlacement = "top";
            console.log(wallPlacement);
            console.log("-------------");
        }
        // horizontal
        if(wallPlacement === "top") {
            if (start[0] > end[0]) {
                let next = event.target.id.split("");
                //wall goes to the left
                // finds the index of letter in 'columns' then indexes one more
                let index = findColumnIndex(columns, next[0]);
                next[0] = columns[index - 1];
                next = next.join("");
                next = document.getElementById(next);
                if (next !== null) {
                    event.target.classList.add("wall-top");
                    event.target.classList.remove("hall");
                    next.classList.add("wall-top");
                    next.classList.remove("hall");
                }
                
            } else {
                //wall goes to the right
                let next = event.target.id.split("");
                //wall goes to the left
                // finds the index of letter in 'columns' then indexes one more
                let index = findColumnIndex(columns, next[0]);
                next[0] = columns[index + 1];
                next = next.join("");
                next = document.getElementById(next);
                if (next !== null) {
                    event.target.classList.add("wall-top");
                    event.target.classList.remove("hall");
                    next.classList.add("wall-top");
                    next.classList.remove("hall");
                }
            }
        } else if(wallPlacement === "bottom") {
            if (start[0] > end[0]) {
                //wall goes to the left
                let next = event.target.id.split("");
                // finds the index of letter in 'columns' then indexes one more
                let index = findColumnIndex(columns, next[0]);
                next[0] = columns[index - 1];
                next = next.join("");
                next = document.getElementById(next);
                if (next !== null) {
                    event.target.classList.add("wall-bottom");
                    event.target.classList.remove("hall");
                    next.classList.add("wall-bottom");
                    next.classList.remove("hall");
                }
            } else {
                //wall goes to the right
                let next = event.target.id.split("");
                // finds the index of letter in 'columns' then indexes one more
                let index = findColumnIndex(columns, next[0]);
                next[0] = columns[index + 1];
                next = next.join("");
                next = document.getElementById(next);
                if (next !== null) {
                    event.target.classList.add("wall-bottom");
                    event.target.classList.remove("hall");
                    next.classList.add("wall-bottom");
                    next.classList.remove("hall");
                }
            }
        }
    } else if (Math.abs(start[0] - end[0]) < Math.abs(start[1] - end[1])) {
        if (wallPlacement !== "right" || wallPlacement !== "left") {
            event.offsetX >= 30 ? wallPlacement = "right" : wallPlacement = "left";
        }
        // vertical
        if(wallPlacement === "right") {
            if (start[1] > end[1]) {
                let next = event.target.id.split("");
                // finds the index of letter in 'columns' then indexes one more
                next[1] = parseInt(next[1]) - 1;
                next = next.join("");
                next = document.getElementById(next);
                if (next !== null) {
                    event.target.classList.add("wall-right");
                    event.target.classList.remove("hall");
                    next.classList.add("wall-right");
                    next.classList.remove("hall");
                }
            } else {
                let next = event.target.id.split("");
                // finds the index of letter in 'columns' then indexes one more
                next[1] = parseInt(next[1]) + 1;
                next = next.join("");
                next = document.getElementById(next);
                if (next !== null) {
                    event.target.classList.add("wall-right");
                    event.target.classList.remove("hall");
                    next.classList.add("wall-right");
                    next.classList.remove("hall");
                }
            }
        } else if(wallPlacement === "left") {
            if (start[1] > end[1]) {
                let next = event.target.id.split("");
                // finds the index of letter in 'columns' then indexes one more
                next[1] = parseInt(next[1]) - 1;
                next = next.join("");
                next = document.getElementById(next);
                if (next !== null) {
                    event.target.classList.add("wall-left");
                    event.target.classList.remove("hall");
                    next.classList.add("wall-left");
                    next.classList.remove("hall");
                }
            } else {
                let next = event.target.id.split("");
                // finds the index of letter in 'columns' then indexes one more
                next[1] = parseInt(next[1]) + 1;
                next = next.join("");
                next = document.getElementById(next);
                if (next !== null) {
                    event.target.classList.add("wall-left");
                    event.target.classList.remove("hall");
                    next.classList.add("wall-left");
                    next.classList.remove("hall");
                }
            }
        }
    }
}


function validMove(dest, dir) {
    let newDest = "xx";
    if(dir === "up") {
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

    } else if(dir === "down") {
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

    } else if(dir === "right") {
        //if valid move move up
        // turn into an array for easy change
        newDest = newDest.split("");
        dest = dest.split("");
        // finds the index of letter in 'columns' then indexes one more
        let index = findColumnIndex(columns, dest[0]);
        newDest[0] = columns[index + 1];
        newDest[1] = dest[1];
        if (index > 7) {
            return dest.join("");
        } else {
            newDest = newDest.join("");
            return newDest;
        };

    } else if (dir === "left") {
        //if valid move move up
        // turn into an array for easy change
        newDest = newDest.split("");
        dest = dest.split("");
        // finds the index of letter in 'columns' then indexes one more
        let index = findColumnIndex(columns, dest[0]);
        newDest[0] = columns[index - 1];
        newDest[1] = dest[1];
        if (index < 1) {
            return dest.join("");
        } else {
            newDest = newDest.join("");
            return newDest;
        }
    }

}

function findColumnIndex(arr, target) {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] === target) {
            return i;
        }
    }
}



