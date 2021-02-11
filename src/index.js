import _, { throttle } from 'lodash';
import './style.css';
import Icon from './icon.png';
const Game = require("./game");

const readline = require('readline');

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



const columns = ["a","b","c","d","e","f","g","h","i"];

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
    
    let game = new Game();
    console.log(game);
    game.start(reader, completion);
    game.printBoard();

    document.addEventListener("keyup", (event) => {
        let dir = event.key.split("Arrow")[1];
        let player = document.getElementsByClassName('player')[0];
        let dest = player;
        let result;
        let newPlayer;
        let newDest;
        if(dir === "Up" || dir === "Down"
        || dir === "Right" || dir === "Left") {

            result = validMove(dest, dir.toLowerCase());
            newDest = result[0];
            // WIN CONDITION FOR BOTTOM STARTING PLAYER
            if (newDest.split("")[1] === "1") {
                console.log("YOU WIN");
                setTimeout(() => {
                    location.reload();
                }, 1000);
            }
            newPlayer = document.getElementById(newDest);
            player.innerHTML = "";
            player.classList.remove("player");
            newPlayer.innerHTML = "X";
            newPlayer.classList.add("player");

        }

        if (event.key === " ") {
            findNextMove(player.id);
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
            if((Math.abs(startPos[0] - endPos[0]) > 74) || 
                (Math.abs(startPos[1] - endPos[1]) > 74)) {

                placeWall(startEvent, startPos, endPos, wallPlacement);

            }
        }
        endPos = [-1, -1];
        startPos = [-1, -1];
    });
});

function completion() {
  reader.question("Play again? y or n: ", restartGame => {
    if (restartGame === "y") {
      g = new Game();
      g.run(reader, completion);
    } else {
      reader.close();
    }
  });
};


function setupBoard() {

    let body = document.getElementsByTagName("body")[0];
    let div = document.createElement("div");
    let table = document.createElement("table");
    div.classList.add("board");
    table.setAttribute("id" , "table");
    div.appendChild(table);
    body.appendChild(div);

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
                if (i === 1 && j === 5) {
                    td.classList.add("boss");
                    td.innerHTML = "O";
                }
            }
        }
        table.appendChild(tr);
    }

}

function placeWall(event, start, end, wallPlacement) {
    let player = document.getElementsByClassName("player")[0].id;
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
                let index = findIndex(columns, wallOne[0]);
                //wall one = e2
                wallOne[0] = columns[index - 1];
                wallOne = wallOne.join("");
                wallOne = document.getElementById(wallOne);
                //wall two = d1
                wallTwo[1] = parseInt(wallTwo[1]) - 1;
                wallTwo = wallTwo.join("");
                wallTwo = document.getElementById(wallTwo);
                //wall three = e1
                index = findIndex(columns, wallThree[0]);
                wallThree[0] = columns[index - 1];
                wallThree[1] = parseInt(wallThree[1]) - 1;
                wallThree = wallThree.join("");
                wallThree = document.getElementById(wallThree);

                if ((wallOne !== null && wallTwo !== null && wallThree !== null) &&
                    (!wallOne.classList.contains("wall-top") && !wallTwo.classList.contains("wall-bottom") 
                    && !wallThree.classList.contains("wall-bottom"))) {
                        event.target.classList.remove("hall");
                        event.target.classList.add("wall-top", "wall");
                        wallOne.classList.remove("hall");
                        wallOne.classList.add("wall-top", "wall");
                        wallTwo.classList.remove("hall");
                        wallTwo.classList.add("wall-bottom", "wall");
                        wallThree.classList.remove("hall");
                        wallThree.classList.add("wall-bottom", "wall");
                    let isValid = bfs(player, ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1", "i1"]);
                    if (isValid === undefined) {
                        if(!event.target.classList.contains("hall")&&(!event.target.classList.contains("wall"))){
                            event.target.classList.add("hall");
                            event.target.classList.remove("hall");
                        }
                        event.target.classList.remove("wall-top");
                        if(!wallOne.classList.contains("hall")&&(!wallOne.classList.contains("wall"))){
                            wallOne.classList.add("hall");
                            wallOne.classList.remove("hall");
                        }
                        wallOne.classList.remove("wall-top");
                        if(!wallTwo.classList.contains("hall")&&(!wallTwo.classList.contains("wall"))){
                            wallTwo.classList.add("hall");
                            wallTwo.classList.remove("hall");
                        }
                        wallTwo.classList.remove("wall-bottom");
                        if(!wallThree.classList.contains("hall")&&(!wallThree.classList.contains("wall"))){
                            wallThree.classList.add("hall");
                            wallThree.classList.remove("hall");
                        }
                        wallThree.classList.remove("wall-bottom");
                        console.log("wall placement canceled")
                        
                    } else {
                        console.log("WALL PLACED")
                    }
                }
                
            } else {
                //wall goes to the right
                let wallOne = event.target.id.split("");
                let wallTwo = event.target.id.split("");
                let wallThree = event.target.id.split("");
                // finds the index of letter in 'columns' then indexes one more
                let index = findIndex(columns, wallOne[0]);
                wallOne[0] = columns[index + 1];
                wallOne = wallOne.join("");
                wallOne = document.getElementById(wallOne);
                //wall two 
                wallTwo[1] = parseInt(wallTwo[1]) - 1;
                wallTwo = wallTwo.join("");
                wallTwo = document.getElementById(wallTwo);
                //wall three 
                index = findIndex(columns, wallThree[0]);
                wallThree[0] = columns[index + 1];
                wallThree[1] = parseInt(wallThree[1]) - 1;
                wallThree = wallThree.join("");
                wallThree = document.getElementById(wallThree);
                if ((wallOne !== null && wallTwo !== null && wallThree !== null) &&
                    (!wallOne.classList.contains("wall-top") && !wallTwo.classList.contains("wall-bottom") 
                    && !wallThree.classList.contains("wall-bottom"))) {
                    event.target.classList.remove("hall");
                    event.target.classList.add("wall-top", "wall");
                    wallOne.classList.remove("hall");
                    wallOne.classList.add("wall-top", "wall");
                    wallTwo.classList.remove("hall");
                    wallTwo.classList.add("wall-bottom", "wall");
                    wallThree.classList.remove("hall");
                    wallThree.classList.add("wall-bottom", "wall");
                    let isValid = bfs(player, ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1", "i1"]);
                    if (isValid === undefined) {
                        if(!event.target.classList.contains("hall")&&(!event.target.classList.contains("wall"))){
                            event.target.classList.add("hall");
                            event.target.classList.remove("hall");
                        }
                        event.target.classList.remove("wall-top");
                        if(!wallOne.classList.contains("hall")&&(!wallOne.classList.contains("wall"))){
                            wallOne.classList.add("hall");
                            wallOne.classList.remove("hall");
                        }
                        wallOne.classList.remove("wall-top");
                        if(!wallTwo.classList.contains("hall")&&(!wallTwo.classList.contains("wall"))){
                            wallTwo.classList.add("hall");
                            wallTwo.classList.remove("hall");
                        }
                        wallTwo.classList.remove("wall-bottom");
                        if(!wallThree.classList.contains("hall")&&(!wallThree.classList.contains("wall"))){
                            wallThree.classList.add("hall");
                            wallThree.classList.remove("hall");
                        }
                        wallThree.classList.remove("wall-bottom");
                        console.log("wall placement canceled")
                        
                    } else {
                        console.log("WALL PLACED")
                    }
                }
            }
        } else if(wallPlacement === "bottom") {
            if (start[0] > end[0]) {
                //wall goes to the left
                let wallOne = event.target.id.split("");
                let wallTwo = event.target.id.split("");
                let wallThree = event.target.id.split("");
                // finds the index of letter in 'columns' then indexes one more
                let index = findIndex(columns, wallOne[0]);
                wallOne[0] = columns[index - 1];
                wallOne = wallOne.join("");
                wallOne = document.getElementById(wallOne);
                 //wall two 
                wallTwo[1] = parseInt(wallTwo[1]) + 1;
                wallTwo = wallTwo.join("");
                wallTwo = document.getElementById(wallTwo);
                //wall three 
                index = findIndex(columns, wallThree[0]);
                wallThree[0] = columns[index - 1];
                wallThree[1] = parseInt(wallThree[1]) + 1;
                wallThree = wallThree.join("");
                wallThree = document.getElementById(wallThree);
                if ((wallOne !== null && wallTwo !== null && wallThree !== null) &&
                    (!wallOne.classList.contains("wall-bottom") && !wallTwo.classList.contains("wall-top") 
                    && !wallThree.classList.contains("wall-top"))) {
                        event.target.classList.remove("hall");
                        event.target.classList.add("wall-bottom", "wall");
                        wallOne.classList.remove("hall");
                        wallOne.classList.add("wall-bottom", "wall");
                        wallTwo.classList.remove("hall");
                        wallTwo.classList.add("wall-top", "wall");
                        wallThree.classList.remove("hall");
                        wallThree.classList.add("wall-top", "wall");
                    let isValid = bfs(player, ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1", "i1"]);
                    if (isValid === undefined) {
                        if(!event.target.classList.contains("hall")&&(!event.target.classList.contains("wall"))){
                            event.target.classList.add("hall");
                            event.target.classList.remove("hall");
                        }
                        event.target.classList.remove("wall-bottom");
                        if(!wallOne.classList.contains("hall")&&(!wallOne.classList.contains("wall"))){
                            wallOne.classList.add("hall");
                            wallOne.classList.remove("hall");
                        }
                        wallOne.classList.remove("wall-bottom");
                        if(!wallTwo.classList.contains("hall")&&(!wallTwo.classList.contains("wall"))){
                            wallTwo.classList.add("hall");
                            wallTwo.classList.remove("hall");
                        }
                        wallTwo.classList.remove("wall-top");
                        if(!wallThree.classList.contains("hall")&&(!wallThree.classList.contains("wall"))){
                            wallThree.classList.add("hall");
                            wallThree.classList.remove("hall");
                        }
                        wallThree.classList.remove("wall-top");
                        console.log("wall placement canceled")
                        
                    } else {
                        console.log("WALL PLACED")
                    }
                }
            } else {
                //wall goes to the right
                let wallOne = event.target.id.split("");
                let wallTwo = event.target.id.split("");
                let wallThree = event.target.id.split("");
                // finds the index of letter in 'columns' then indexes one more
                let index = findIndex(columns, wallOne[0]);
                wallOne[0] = columns[index + 1];
                wallOne = wallOne.join("");
                wallOne = document.getElementById(wallOne);
                //wall two 
                wallTwo[1] = parseInt(wallTwo[1]) + 1;
                wallTwo = wallTwo.join("");
                wallTwo = document.getElementById(wallTwo);
                //wall three 
                index = findIndex(columns, wallThree[0]);
                wallThree[0] = columns[index + 1];
                wallThree[1] = parseInt(wallThree[1]) + 1;
                wallThree = wallThree.join("");
                wallThree = document.getElementById(wallThree);
                if ((wallOne !== null && wallTwo !== null && wallThree !== null) &&
                    (!wallOne.classList.contains("wall-bottom") && !wallTwo.classList.contains("wall-top") 
                    && !wallThree.classList.contains("wall-top"))) {
                        event.target.classList.remove("hall");
                        event.target.classList.add("wall-bottom", "wall");
                        wallOne.classList.remove("hall");
                        wallOne.classList.add("wall-bottom", "wall");
                        wallTwo.classList.remove("hall");
                        wallTwo.classList.add("wall-top", "wall");
                        wallThree.classList.remove("hall");
                        wallThree.classList.add("wall-top", "wall");
                    let isValid = bfs(player, ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1", "i1"]);
                    if (isValid === undefined) {
                        if(!event.target.classList.contains("hall")&&(!event.target.classList.contains("wall"))){
                            event.target.classList.add("hall");
                            event.target.classList.remove("hall");
                        }
                        event.target.classList.remove("wall-bottom");
                        if(!wallOne.classList.contains("hall")&&(!wallOne.classList.contains("wall"))){
                            wallOne.classList.add("hall");
                            wallOne.classList.remove("hall");
                        }
                        wallOne.classList.remove("wall-bottom");
                        if(!wallTwo.classList.contains("hall")&&(!wallTwo.classList.contains("wall"))){
                            wallTwo.classList.add("hall");
                            wallTwo.classList.remove("hall");
                        }
                        wallTwo.classList.remove("wall-top");
                        if(!wallThree.classList.contains("hall")&&(!wallThree.classList.contains("wall"))){
                            wallThree.classList.add("hall");
                            wallThree.classList.remove("hall");
                        }
                        wallThree.classList.remove("wall-top");
                        console.log("wall placement canceled")
                        
                    } else {
                        console.log("WALL PLACED")
                    }
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
                index = findIndex(columns, wallTwo[0]);
                wallTwo[0] = columns[index + 1];
                wallTwo = wallTwo.join("");
                wallTwo = document.getElementById(wallTwo);
                //wall three 
                index = findIndex(columns, wallThree[0]);
                wallThree[0] = columns[index + 1];
                wallThree[1] = parseInt(wallThree[1]) - 1;
                wallThree = wallThree.join("");
                wallThree = document.getElementById(wallThree);
                if ((wallOne !== null && wallTwo !== null && wallThree !== null) &&
                    (!wallOne.classList.contains("wall-right") && !wallTwo.classList.contains("wall-left") 
                    && !wallThree.classList.contains("wall-left"))) {
                        event.target.classList.remove("hall");
                        event.target.classList.add("wall-right", "wall");
                        wallOne.classList.remove("hall");
                        wallOne.classList.add("wall-right", "wall");
                        wallTwo.classList.remove("hall");
                        wallTwo.classList.add("wall-left", "wall");
                        wallThree.classList.remove("hall");
                        wallThree.classList.add("wall-left", "wall");
                    let isValid = bfs(player, ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1", "i1"]);
                    if (isValid === undefined) {
                        if(!event.target.classList.contains("hall")&&(!event.target.classList.contains("wall"))){
                            event.target.classList.add("hall");
                            event.target.classList.remove("hall");
                        }
                        event.target.classList.remove("wall-right");
                        if(!wallOne.classList.contains("hall")&&(!wallOne.classList.contains("wall"))){
                            wallOne.classList.add("hall");
                            wallOne.classList.remove("hall");
                        }
                        wallOne.classList.remove("wall-right");
                        if(!wallTwo.classList.contains("hall")&&(!wallTwo.classList.contains("wall"))){
                            wallTwo.classList.add("hall");
                            wallTwo.classList.remove("hall");
                        }
                        wallTwo.classList.remove("wall-left");
                        if(!wallThree.classList.contains("hall")&&(!wallThree.classList.contains("wall"))){
                            wallThree.classList.add("hall");
                            wallThree.classList.remove("hall");
                        }
                        wallThree.classList.remove("wall-left");
                        console.log("wall placement canceled")
                        
                    } else {
                        console.log("WALL PLACED")
                    }
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
                index = findIndex(columns, wallTwo[0]);
                wallTwo[0] = columns[index + 1];
                wallTwo = wallTwo.join("");
                wallTwo = document.getElementById(wallTwo);
                //wall three 
                index = findIndex(columns, wallThree[0]);
                wallThree[0] = columns[index + 1];
                wallThree[1] = parseInt(wallThree[1]) + 1;
                wallThree = wallThree.join("");
                wallThree = document.getElementById(wallThree);
                if ((wallOne !== null && wallTwo !== null && wallThree !== null) &&
                    (!wallOne.classList.contains("wall-right") && !wallTwo.classList.contains("wall-left") 
                    && !wallThree.classList.contains("wall-left"))) {

                    event.target.classList.remove("hall");
                    event.target.classList.add("wall-right", "wall");
                    wallOne.classList.remove("hall");
                    wallOne.classList.add("wall-right", "wall");
                    wallTwo.classList.remove("hall");
                    wallTwo.classList.add("wall-left", "wall");
                    wallThree.classList.remove("hall");
                    wallThree.classList.add("wall-left", "wall");

                    let isValid = bfs(player, ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1", "i1"]);
                    if (isValid === undefined) {
                        if(!event.target.classList.contains("hall")&&(!event.target.classList.contains("wall"))){
                            event.target.classList.add("hall");
                            event.target.classList.remove("hall");
                        }
                        event.target.classList.remove("wall-right");
                        if(!wallOne.classList.contains("hall")&&(!wallOne.classList.contains("wall"))){
                            wallOne.classList.add("hall");
                            wallOne.classList.remove("hall");
                        }
                        wallOne.classList.remove("wall-right");
                        if(!wallTwo.classList.contains("hall")&&(!wallTwo.classList.contains("wall"))){
                            wallTwo.classList.add("hall");
                            wallTwo.classList.remove("hall");
                        }
                        wallTwo.classList.remove("wall-left");
                        if(!wallThree.classList.contains("hall")&&(!wallThree.classList.contains("wall"))){
                            wallThree.classList.add("hall");
                            wallThree.classList.remove("hall");
                        }
                        wallThree.classList.remove("wall-left");
                        console.log("wall placement canceled")
                        
                    } else {
                        console.log("WALL PLACED")
                    }
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
                index = findIndex(columns, wallTwo[0]);
                wallTwo[0] = columns[index - 1];
                wallTwo = wallTwo.join("");
                wallTwo = document.getElementById(wallTwo);
                //wall three 
                index = findIndex(columns, wallThree[0]);
                wallThree[0] = columns[index - 1];
                wallThree[1] = parseInt(wallThree[1]) - 1;
                wallThree = wallThree.join("");
                wallThree = document.getElementById(wallThree);
                if ((wallOne !== null && wallTwo !== null && wallThree !== null) &&
                    (!wallOne.classList.contains("wall-left") && !wallTwo.classList.contains("wall-right") 
                    && !wallThree.classList.contains("wall-right"))) {
                        event.target.classList.remove("hall");
                        event.target.classList.add("wall-left", "wall");
                        wallOne.classList.remove("hall");
                        wallOne.classList.add("wall-left", "wall");
                        wallTwo.classList.remove("hall");
                        wallTwo.classList.add("wall-right", "wall");
                        wallThree.classList.remove("hall");
                        wallThree.classList.add("wall-right", "wall");
                    let isValid = bfs(player, ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1", "i1"]);
                    if (isValid === undefined) {
                        if(!event.target.classList.contains("hall")&&(!event.target.classList.contains("wall"))){
                            event.target.classList.add("hall");
                            event.target.classList.remove("hall");
                        }
                        event.target.classList.remove("wall-left");
                        if(!wallOne.classList.contains("hall")&&(!wallOne.classList.contains("wall"))){
                            wallOne.classList.add("hall");
                            wallOne.classList.remove("hall");
                        }
                        wallOne.classList.remove("wall-left");
                        if(!wallTwo.classList.contains("hall")&&(!wallTwo.classList.contains("wall"))){
                            wallTwo.classList.add("hall");
                            wallTwo.classList.remove("hall");
                        }
                        wallTwo.classList.remove("wall-right");
                        if(!wallThree.classList.contains("hall")&&(!wallThree.classList.contains("wall"))){
                            wallThree.classList.add("hall");
                            wallThree.classList.remove("hall");
                        }
                        wallThree.classList.remove("wall-right");
                        console.log("wall placement canceled")
                        
                    } else {
                        console.log("WALL PLACED")
                    }
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
                index = findIndex(columns, wallTwo[0]);
                wallTwo[0] = columns[index - 1];
                wallTwo = wallTwo.join("");
                wallTwo = document.getElementById(wallTwo);
                //wall three 
                index = findIndex(columns, wallThree[0]);
                wallThree[0] = columns[index - 1];
                wallThree[1] = parseInt(wallThree[1]) + 1;
                wallThree = wallThree.join("");
                wallThree = document.getElementById(wallThree);
                if ((wallOne !== null && wallTwo !== null && wallThree !== null) &&
                    (!wallOne.classList.contains("wall-left") && !wallTwo.classList.contains("wall-right") 
                    && !wallThree.classList.contains("wall-right"))) {
                    event.target.classList.add("wall-left", "wall");
                    event.target.classList.remove("hall");
                    wallOne.classList.add("wall-left", "wall");
                    wallOne.classList.remove("hall");
                    wallTwo.classList.add("wall-right", "wall");
                    wallTwo.classList.remove("hall");
                    wallThree.classList.add("wall-right", "wall");
                    wallThree.classList.remove("hall");
                    let isValid = bfs(player, ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1", "i1"]);
                    if (isValid === undefined) {
                        if(!event.target.classList.contains("hall")&&(!event.target.classList.contains("wall"))){
                            event.target.classList.add("hall");
                            event.target.classList.remove("hall");
                        }
                        event.target.classList.remove("wall-left");
                        if(!wallOne.classList.contains("hall")&&(!wallOne.classList.contains("wall"))){
                            wallOne.classList.add("hall");
                            wallOne.classList.remove("hall");
                        }
                        wallOne.classList.remove("wall-left");
                        if(!wallTwo.classList.contains("hall")&&(!wallTwo.classList.contains("wall"))){
                            wallTwo.classList.add("hall");
                            wallTwo.classList.remove("hall");
                        }
                        wallTwo.classList.remove("wall-right");
                        if(!wallThree.classList.contains("hall")&&(!wallThree.classList.contains("wall"))){
                            wallThree.classList.add("hall");
                            wallThree.classList.remove("hall");
                        }
                        wallThree.classList.remove("wall-right");
                        console.log("wall placement canceled")
                        
                    } else {
                        console.log("WALL PLACED")
                    }
                }
            }
        }
    }
}


function validMove(dest, dir) {
    //takes a current destination and a desired direction
    //returns a new destination and true or the same that it received and false.
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
            return [dest.join(""), false];
        } else {
            newDest = newDest.join("");
            return [newDest, true];
        }

    } else if(dir === "down" && !dest.classList.contains("wall-bottom")) {
        dest = dest.id;
        //if valid move move up
        newDest = newDest.split("");
        dest = dest.split("");
        newDest[0] = dest[0];
        newDest[1] = parseInt(dest[1]) + 1;
        if (newDest[1] > 9) {
            return [dest.join(""), false];
        } else {
            newDest = newDest.join("");
            return [newDest, true];
        }

    } else if(dir === "right" && !dest.classList.contains("wall-right")) {
        dest = dest.id;
        //if valid move move up
        // turn into an array for easy change
        newDest = newDest.split("");
        dest = dest.split("");
        // finds the index of letter in 'columns' then indexes one more
        let index = findIndex(columns, dest[0]);
        newDest[0] = columns[index + 1];
        newDest[1] = dest[1];
        if (index > 7) {
            return [dest.join(""), false];
        } else {
            newDest = newDest.join("");
            return [newDest, true];
        };

    } else if (dir === "left" && !dest.classList.contains("wall-left")) {
        dest = dest.id;
        //if valid move move up
        // turn into an array for easy change
        newDest = newDest.split("");
        dest = dest.split("");
        // finds the index of letter in 'columns' then indexes one more
        let index = findIndex(columns, dest[0]);
        newDest[0] = columns[index - 1];
        newDest[1] = dest[1];
        if (index < 1) {
            return [dest.join(""), false];
        } else {
            newDest = newDest.join("");
            return [newDest, true];
        }
    }
    return [dest.id, false];

}


function bfs(root, goal) {
    //should return a list of shortest paths to each value in goal[]
    //  index =  0     1     2     3     4     5     6     7     8
    //should only use id's in the format above ... "a1"
    let hashmap = new Map(); 
    let Q = []; //array of id
    let discovered = []; //array of id
    hashmap.set(root, null)
    Q.push(root);
    discovered.push(root);
    while (Q.length > 0) {
        let v = Q.shift(); // id
        let ele = document.getElementById(v); // ele
        if (goal.includes(v)) {
            let path = [];
            path = traverseHashmap(hashmap, v);
            return [v, path];
        }
        // finding all possible directions
        if ((!ele.classList.contains("wall-top") && (v.split("")[1] > 1))){
            let id = v.split("");
            id[1] = parseInt(id[1]) - 1;
            id = id.join("");
            if (!discovered.includes(id)) {
                discovered.push(id);
                Q.push(id);
                hashmap.set(id, v)
            }
        }
        if ((!ele.classList.contains("wall-bottom") && (v.split("")[1] < 9))) {
            let id = v.split("");
            id[1] = parseInt(id[1]) + 1;
            id = id.join("");
            if (!discovered.includes(id)) {
                discovered.push(id);
                Q.push(id);
                hashmap.set(id, v)
            }
        }
        if ((!ele.classList.contains("wall-right") && (v.split("")[0] !== "i"))) {
            let id = v.split("");
            let idx = findIndex(columns, id[0]);
            id[0] = columns[idx + 1];
            id = id.join("");
            if (!discovered.includes(id)) {
                discovered.push(id);
                Q.push(id);
                hashmap.set(id, v)
            }
        }
        if ((!ele.classList.contains("wall-left") && (v.split("")[0] !== "a"))) {
            let id = v.split("");
            let idx = findIndex(columns, id[0]);
            id[0] = columns[idx - 1];
            id = id.join("");
            if (!discovered.includes(id)) {
                discovered.push(id);
                Q.push(id);
                hashmap.set(id, v)
            }
        }
    }
}


function findNextMove(player, goal) {
    let targetGoal = [];
    let path = [];
    let nextMove = "";
    let bfsResult = bfs(player, ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1", "i1"]);
    targetGoal = bfsResult[0];
    path = bfsResult[1];
    console.log(targetGoal);
    console.log(path);
    nextMove = path[1];
    console.log(nextMove);
}


function findIndex(arr, target) {
    //find index given target value
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] === target) {
            return i;
        }
    }
}

function traverseHashmap(hash, start) {
    let node = hash.get(start);
    let path = [];
    while (node) {
        path.push(node)
        node = hash.get(node);
    }
    return path.reverse();
}



