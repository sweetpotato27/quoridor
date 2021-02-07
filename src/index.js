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
        let dest = player;
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
    //vertical or horizonal?
    // |start.x - end.x| > |start.y - end.y| = horizonal
    // |start.x - end.x| < |start.y - end.y| = vertical
    if (Math.abs(start[0] - end[0]) > Math.abs(start[1] - end[1])) {
        if (wallPlacement !== "bottom" || wallPlacement !== "top") {
            event.offsetY >= 32 ? wallPlacement = "bottom" : wallPlacement = "top";
        }
        // horizontal
        if(wallPlacement === "top") {
            if (start[0] > end[0]) {
                //wall goes to the left
                //three walls are needed to be made in addition to the initially
                // selected wall.  4 in total.
                // ex. if d2 is selected and dragged to the right on top then...
                //     top walls will be built on d2 and e2 and,
                //     bottom walls will be build on d1 and e1.
                let wallOne = event.target.id.split("");
                let wallTwo = event.target.id.split("");
                let wallThree = event.target.id.split("");
                // finds the index of letter in 'columns' then indexes one more
                let index = findColumnIndex(columns, wallOne[0]);
                //wall one = e2
                wallOne[0] = columns[index - 1];
                wallOne = wallOne.join("");
                wallOne = document.getElementById(wallOne);
                //wall two = d1
                wallTwo[1] = parseInt(wallTwo[1]) - 1;
                wallTwo = wallTwo.join("");
                wallTwo = document.getElementById(wallTwo);
                //wall three = e1
                index = findColumnIndex(columns, wallThree[0]);
                wallThree[0] = columns[index - 1];
                wallThree[1] = parseInt(wallThree[1]) - 1;
                wallThree = wallThree.join("");
                wallThree = document.getElementById(wallThree);

                if ((wallOne !== null && wallTwo !== null && wallThree !== null) &&
                    (!wallOne.classList.contains("wall-top") && !wallTwo.classList.contains("wall-bottom") 
                    && !wallThree.classList.contains("wall-bottom"))) {
                    event.target.classList.add("wall-top");
                    event.target.classList.remove("hall");
                    wallOne.classList.add("wall-top");
                    wallOne.classList.remove("hall");
                    wallTwo.classList.add("wall-bottom");
                    wallTwo.classList.remove("hall");
                    wallThree.classList.add("wall-bottom");
                    wallThree.classList.remove("hall");
                    console.log("WALL PLACED")
                }
                
            } else {
                //wall goes to the right
                let wallOne = event.target.id.split("");
                let wallTwo = event.target.id.split("");
                let wallThree = event.target.id.split("");
                // finds the index of letter in 'columns' then indexes one more
                let index = findColumnIndex(columns, wallOne[0]);
                wallOne[0] = columns[index + 1];
                wallOne = wallOne.join("");
                wallOne = document.getElementById(wallOne);
                //wall two 
                wallTwo[1] = parseInt(wallTwo[1]) - 1;
                wallTwo = wallTwo.join("");
                wallTwo = document.getElementById(wallTwo);
                //wall three 
                index = findColumnIndex(columns, wallThree[0]);
                wallThree[0] = columns[index + 1];
                wallThree[1] = parseInt(wallThree[1]) - 1;
                wallThree = wallThree.join("");
                wallThree = document.getElementById(wallThree);
                if ((wallOne !== null && wallTwo !== null && wallThree !== null) &&
                    (!wallOne.classList.contains("wall-top") && !wallTwo.classList.contains("wall-bottom") 
                    && !wallThree.classList.contains("wall-bottom"))) {
                    event.target.classList.remove("hall");
                    event.target.classList.add("wall-top");
                    wallOne.classList.remove("hall");
                    wallOne.classList.add("wall-top");
                    wallTwo.classList.add("wall-bottom");
                    wallTwo.classList.remove("hall");
                    wallThree.classList.add("wall-bottom");
                    wallThree.classList.remove("hall");
                    console.log("WALL PLACED")
                }
            }
        } else if(wallPlacement === "bottom") {
            if (start[0] > end[0]) {
                //wall goes to the left
                let wallOne = event.target.id.split("");
                let wallTwo = event.target.id.split("");
                let wallThree = event.target.id.split("");
                // finds the index of letter in 'columns' then indexes one more
                let index = findColumnIndex(columns, wallOne[0]);
                wallOne[0] = columns[index - 1];
                wallOne = wallOne.join("");
                wallOne = document.getElementById(wallOne);
                 //wall two 
                wallTwo[1] = parseInt(wallTwo[1]) + 1;
                wallTwo = wallTwo.join("");
                wallTwo = document.getElementById(wallTwo);
                //wall three 
                index = findColumnIndex(columns, wallThree[0]);
                wallThree[0] = columns[index - 1];
                wallThree[1] = parseInt(wallThree[1]) + 1;
                wallThree = wallThree.join("");
                wallThree = document.getElementById(wallThree);
                if ((wallOne !== null && wallTwo !== null && wallThree !== null) &&
                    (!wallOne.classList.contains("wall-bottom") && !wallTwo.classList.contains("wall-top") 
                    && !wallThree.classList.contains("wall-top"))) {
                    event.target.classList.add("wall-bottom");
                    event.target.classList.remove("hall");
                    wallOne.classList.add("wall-bottom");
                    wallOne.classList.remove("hall");
                    wallTwo.classList.add("wall-top");
                    wallTwo.classList.remove("hall");
                    wallThree.classList.add("wall-top");
                    wallThree.classList.remove("hall");
                    console.log("WALL PLACED")
                }
            } else {
                //wall goes to the right
                let wallOne = event.target.id.split("");
                let wallTwo = event.target.id.split("");
                let wallThree = event.target.id.split("");
                // finds the index of letter in 'columns' then indexes one more
                let index = findColumnIndex(columns, wallOne[0]);
                wallOne[0] = columns[index + 1];
                wallOne = wallOne.join("");
                wallOne = document.getElementById(wallOne);
                //wall two 
                wallTwo[1] = parseInt(wallTwo[1]) + 1;
                wallTwo = wallTwo.join("");
                wallTwo = document.getElementById(wallTwo);
                //wall three 
                index = findColumnIndex(columns, wallThree[0]);
                wallThree[0] = columns[index + 1];
                wallThree[1] = parseInt(wallThree[1]) + 1;
                wallThree = wallThree.join("");
                wallThree = document.getElementById(wallThree);
                if ((wallOne !== null && wallTwo !== null && wallThree !== null) &&
                    (!wallOne.classList.contains("wall-bottom") && !wallTwo.classList.contains("wall-top") 
                    && !wallThree.classList.contains("wall-top"))) {
                    event.target.classList.add("wall-bottom");
                    event.target.classList.remove("hall");
                    wallOne.classList.add("wall-bottom");
                    wallOne.classList.remove("hall");
                    wallTwo.classList.add("wall-top");
                    wallTwo.classList.remove("hall");
                    wallThree.classList.add("wall-top");
                    wallThree.classList.remove("hall");
                    console.log("WALL PLACED")
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
                // GOING UP
                //three walls are needed to be made in addition to the initially
                // selected wall.  4 in total.
                // ex. if d2 is selected and dragged up on the right side then...
                //     right walls will be built on d2 and d1 and,
                //     walls walls will be build on e2 and e1.
                let wallOne = event.target.id.split("");
                let wallTwo = event.target.id.split("");
                let wallThree = event.target.id.split("");
                let index;
                // finds the index of letter in 'columns' then indexes one more
                wallOne[1] = parseInt(wallOne[1]) - 1;
                wallOne = wallOne.join("");
                wallOne = document.getElementById(wallOne);
                //wall two 
                index = findColumnIndex(columns, wallTwo[0]);
                wallTwo[0] = columns[index + 1];
                wallTwo = wallTwo.join("");
                wallTwo = document.getElementById(wallTwo);
                //wall three 
                index = findColumnIndex(columns, wallThree[0]);
                wallThree[0] = columns[index + 1];
                wallThree[1] = parseInt(wallThree[1]) - 1;
                wallThree = wallThree.join("");
                wallThree = document.getElementById(wallThree);
                if ((wallOne !== null && wallTwo !== null && wallThree !== null) &&
                    (!wallOne.classList.contains("wall-right") && !wallTwo.classList.contains("wall-left") 
                    && !wallThree.classList.contains("wall-left"))) {
                    event.target.classList.add("wall-right");
                    event.target.classList.remove("hall");
                    wallOne.classList.add("wall-right");
                    wallOne.classList.remove("hall");
                    wallTwo.classList.add("wall-left");
                    wallTwo.classList.remove("hall");
                    wallThree.classList.add("wall-left");
                    wallThree.classList.remove("hall");
                    console.log("WALL PLACED")
                }
            } else {
                let wallOne = event.target.id.split("");
                let wallTwo = event.target.id.split("");
                let wallThree = event.target.id.split("");
                let index;
                // finds the index of letter in 'columns' then indexes one more
                wallOne[1] = parseInt(wallOne[1]) + 1;
                wallOne = wallOne.join("");
                wallOne = document.getElementById(wallOne);
                //wall two 
                index = findColumnIndex(columns, wallTwo[0]);
                wallTwo[0] = columns[index + 1];
                wallTwo = wallTwo.join("");
                wallTwo = document.getElementById(wallTwo);
                //wall three 
                index = findColumnIndex(columns, wallThree[0]);
                wallThree[0] = columns[index + 1];
                wallThree[1] = parseInt(wallThree[1]) + 1;
                wallThree = wallThree.join("");
                wallThree = document.getElementById(wallThree);
                if ((wallOne !== null && wallTwo !== null && wallThree !== null) &&
                    (!wallOne.classList.contains("wall-right") && !wallTwo.classList.contains("wall-left") 
                    && !wallThree.classList.contains("wall-left"))) {
                    event.target.classList.add("wall-right");
                    event.target.classList.remove("hall");
                    wallOne.classList.add("wall-right");
                    wallOne.classList.remove("hall");
                    wallTwo.classList.add("wall-left");
                    wallTwo.classList.remove("hall");
                    wallThree.classList.add("wall-left");
                    wallThree.classList.remove("hall");
                    console.log("WALL PLACED")
                }
            }
        } else if(wallPlacement === "left") {
            if (start[1] > end[1]) {
                let wallOne = event.target.id.split("");
                let wallTwo = event.target.id.split("");
                let wallThree = event.target.id.split("");
                let index;
                // finds the index of letter in 'columns' then indexes one more
                wallOne[1] = parseInt(wallOne[1]) - 1;
                wallOne = wallOne.join("");
                wallOne = document.getElementById(wallOne);
                //wall two 
                index = findColumnIndex(columns, wallTwo[0]);
                wallTwo[0] = columns[index - 1];
                wallTwo = wallTwo.join("");
                wallTwo = document.getElementById(wallTwo);
                //wall three 
                index = findColumnIndex(columns, wallThree[0]);
                wallThree[0] = columns[index - 1];
                wallThree[1] = parseInt(wallThree[1]) - 1;
                wallThree = wallThree.join("");
                wallThree = document.getElementById(wallThree);
                if ((wallOne !== null && wallTwo !== null && wallThree !== null) &&
                    (!wallOne.classList.contains("wall-left") && !wallTwo.classList.contains("wall-right") 
                    && !wallThree.classList.contains("wall-right"))) {
                    event.target.classList.add("wall-left");
                    event.target.classList.remove("hall");
                    wallOne.classList.add("wall-left");
                    wallOne.classList.remove("hall");
                    wallTwo.classList.add("wall-right");
                    wallTwo.classList.remove("hall");
                    wallThree.classList.add("wall-right");
                    wallThree.classList.remove("hall");
                    console.log("WALL PLACED")
                }
            } else {
                let wallOne = event.target.id.split("");
                let wallTwo = event.target.id.split("");
                let wallThree = event.target.id.split("");
                let index;
                // finds the index of letter in 'columns' then indexes one more
                wallOne[1] = parseInt(wallOne[1]) + 1;
                wallOne = wallOne.join("");
                wallOne = document.getElementById(wallOne);
                //wall two 
                index = findColumnIndex(columns, wallTwo[0]);
                wallTwo[0] = columns[index - 1];
                wallTwo = wallTwo.join("");
                wallTwo = document.getElementById(wallTwo);
                //wall three 
                index = findColumnIndex(columns, wallThree[0]);
                wallThree[0] = columns[index - 1];
                wallThree[1] = parseInt(wallThree[1]) + 1;
                wallThree = wallThree.join("");
                wallThree = document.getElementById(wallThree);
                if ((wallOne !== null && wallTwo !== null && wallThree !== null) &&
                    (!wallOne.classList.contains("wall-left") && !wallTwo.classList.contains("wall-right") 
                    && !wallThree.classList.contains("wall-right"))) {
                    event.target.classList.add("wall-left");
                    event.target.classList.remove("hall");
                    wallOne.classList.add("wall-left");
                    wallOne.classList.remove("hall");
                    wallTwo.classList.add("wall-right");
                    wallTwo.classList.remove("hall");
                    wallThree.classList.add("wall-right");
                    wallThree.classList.remove("hall");
                    console.log("WALL PLACED")
                }
            }
        }
    }
}


function validMove(dest, dir) {
    console.log(dest, dir);
    let newDest = "xx";
    if(dir === "up" && !dest.classList.contains("wall-top")) {
        dest = dest.id;
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

    } else if(dir === "down" && !dest.classList.contains("wall-bottom")) {
        dest = dest.id;
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

    } else if(dir === "right" && !dest.classList.contains("wall-right")) {
        dest = dest.id;
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

    } else if (dir === "left" && !dest.classList.contains("wall-left")) {
        dest = dest.id;
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
    return dest.id;

}

function findColumnIndex(arr, target) {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] === target) {
            return i;
        }
    }
}



