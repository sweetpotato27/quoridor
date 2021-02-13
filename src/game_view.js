

class GameView {
    constructor(game) {
        this.body = document.querySelector("body");
        this.game = game;
        this.board = this.game.board;
        this.grid = this.board.grid;
        this.squareA = null;
        this.squareB = null;
        this.neighbors = null;

        this.setupBoard();
        this.setupEventListeners();
    }

    show() {
        this.showBoard();
        if (this.game.isOver()) {
            console.log("WINNER");
        }
    }

    showBoard() {
        for(let i = 0; i  < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++)
            {
                let square = this.grid[j][i];
                let id = (j + 1).toString() + (i + 1).toString();
                if(square.player === "player1") {
                    document.getElementById(`${id}`).innerHTML = "X";
                } else if(square.player === "player2") {
                    document.getElementById(`${id}`).innerHTML = "O";
                } else {
                    document.getElementById(`${id}`).innerHTML = "";
                }
            }
        }
    }

    setupEventListeners() {
        this.body.addEventListener("keyup", (event) => {
            let code = event.code;
            console.log(code);
            if (!this.game.placingWall) {
                if ((code === "ArrowUp") || (code === "ArrowRight") || (code === "ArrowDown") || (code === "ArrowLeft")) {
                    this.game.takeTurn("move", code.split("Arrow")[1].toLowerCase(), event);
                }
                this.show();
            }
        });

        this.body.addEventListener("click", (event) => {
            //if in the placing wall state this capture square clicks
            if (!!this.game.placingWall) {
                let count = 0;
                let container = [];
                if (event.target.classList.contains("floor")) {
                    count = count + 1;
                    console.log("square clicked");
                    container = this.handleSquareClick(event);
                }
            } else {
                if (event.target.classList.contains("button")) {
                    // else listen for the place wall button
                    if(event.target.innerHTML === "Place a wall") {
                        this.handlePlaceWallButton(event);
                        console.log("wall button clicked");
                    }
                    if((event.target.innerHTML === "North") || (event.target.innerHTML === "East")
                       || (event.target.innerHTML === "South") || (event.target.innerHTML === "West")) {
                        console.log(event.target.innerHTML);
                    }
                } 
            }
        }, false);
    } 

    handlePlaceWallButton(event) {
        // delete btn element and replace with instructions to
        // click two distinct squares
        let btn = event.target;
        let parent = btn.parentElement;
        let clickInstruct = document.createElement("p");
        clickInstruct.classList.add("clickInstruct");
        clickInstruct.innerHTML = "Click two distinct squares..."
        btn.remove();
        parent.appendChild(clickInstruct);

        this.game.placingWall = true;
    }

    handleSquareClick(event) {
        //wait for client to click two valid squares
        let target = event.target;
        console.log(target);
        console.log(target.id);
        console.log(this.neighbors);

        if ((target.classList.contains("floor")) && (this.squareA === null)) {
            this.squareA = target.id;
            //parse squareA
            // squareA = "11" and needs to be [0, 0]
            let square = this.squareA.split("");
            square[0] = parseInt(square[0]) - 1;
            square[1] = parseInt(square[1]) - 1;
            //get neighbors
            // returns [[north],[east],[south],[west]]
            this.neighbors = this.board.checkNeighbors(square);
            // for(let i = 0; i < this.neighbors.length; i++) {
            //     this.neighbors[i] = this.neighbors[i][0].toString() + this.neighbors[i][1].toString();
            // }
            this.highlight(this.neighbors);

        } else if ((target.classList.contains("floor")) && (this.squareA !== null) && (this.squareB === null)) {
            console.log(!!this.neighbors.includes(target.id));
            if(!this.neighbors.includes(target.id)) {
                this.squareB = target.id;
            }
        }

        if (this.squareA !== null && this.squareB !== null) {
            console.log(this.squareA, this.squareB);
            // should create two buttons depending on squareA and squareB orientation
            this.body.getElementsByClassName("clickInstruct")[0].remove();
            // check here if squareA and squareB are neighbors and if they are horizontal or vertical
            // squareA = "11" and needs to be [0, 0]
            let squareA = this.squareA.split("");
            squareA[0] = parseInt(squareA[0]) - 1;
            squareA[1] = parseInt(squareA[1]) - 1;
            this.board.checkNeighbors(squareA);
            this.createButton("North");
            this.createButton("East");
            this.createButton("South");
            this.createButton("West");
        }
    }

    highlight(array) {
        //highlight and also changes this.neighbors to be able to be read as an array of strings
        for (let i = 0; i < array.length; i++) {
            array[i][0] = array[i][0] + 1;
            array[i][1] = array[i][1] + 1;
            let id = array[i].join("").toString();
            this.neighbors[i] = id;
            let ele = document.getElementById(`${id}`);
            console.log(ele);
            ele.style.backgroundColor = "green";
        }
    }

    createButton(innerText) {
        let btn = document.createElement("button");
        btn.innerHTML = innerText
        btn.classList.add('button');
        this.body.getElementsByClassName("controller-div")[0].appendChild(btn);
        return btn;
    }

    setupBoard() {
        let div = document.createElement("div");
        this.body.appendChild(div);
        let board = document.createElement("table");
        div.appendChild(board);
        div.classList.add("table");
        board.setAttribute("id" , "board");

        //build walls button
        let cntrlDiv = document.createElement("div");
        cntrlDiv.classList.add("controller-div");
        div.appendChild(cntrlDiv);
        this.createButton("Place a wall");
        ////////////////////

        for(let i = 0; i < 10; i++) {
            let tr = document.createElement("tr");
            for(let j = 0; j < 10; j++) {
                let th = document.createElement("th");
                let td = document.createElement("td");
                if(i === 0 && j === 0) {
                    th.innerHTML = ""
                    tr.appendChild(th);
                } else if (i === 0) {
                    th.innerHTML = j
                    tr.appendChild(th);
                } else if (i > 0 && j === 0) {
                    th.innerHTML = i
                    tr.appendChild(th);
                } else {
                    td.id = `${j}${i}`;
                    td.classList.add("floor", "hall");
                    tr.appendChild(td);
                    let square = this.game.board.grid[j-1][i-1];
                    if (square.player === "player1") {
                        td.style.backgroundColor = "white";
                    }
                    if (square.player === "player2") {
                        td.style.backgroundColor = "black";
                    }
                }
            }
            board.appendChild(tr);
        }
    }
}

module.exports = GameView;