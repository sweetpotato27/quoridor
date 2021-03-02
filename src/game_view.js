import Util from './util';

export default class GameView {
    constructor(game) {
        this.body = document.querySelector("body");
        this.game = game;
        this.board = this.game.board;
        this.grid = this.board.grid;
        this.squareA = null;
        this.squareB = null;
        this.neighbors = null;  
        this.availableMoves = [];

        this.util = new Util();
        this.game.util = this.util;
        this.game.board.util = this.util;
        this.setupBoard();
        this.setupEventListeners();
    }

    show() {
        this.util.trackFunctions("show");
        this.game.computerAiTurn();
        this.showBoard();
        if (this.game.isOver()) {
            let winner = "";
            if (this.game.currentPlayer === "player2") winner = "Player 1";
            if (this.game.currentPlayer === "player1") winner = "Player 2";
            let table = document.getElementsByClassName("table")[0];
            this.createRestartDiv(table, winner);
            this.game.currentPlayer = "noone";
            this.showBoard();
            // table.remove();
            let restart = document.createElement("div");

            // location.reload();
        }
    }

    showBoard() {
        this.util.trackFunctions("showBoard");
        for(let rowIdx = 0; rowIdx  < this.grid.length; rowIdx++) {
            for (let colIdx = 0; colIdx < this.grid[rowIdx].length; colIdx++)
            {
                let square = this.grid[rowIdx][colIdx];
                let id = (rowIdx).toString() + (colIdx).toString();
                let ele = document.getElementById(id);
                if(square.player === "player1") {
                    ele.classList.add("player");
                    ele.innerHTML = "&#x265F";
                } else if(square.player === "player2") {
                    ele.classList.add("player");
                    ele.innerHTML = "&#x2659";
                } else {
                    ele.classList.remove("player");
                    ele.innerHTML = " ";
                }
                /* update walls */
                if (!!square.walls.North) {
                    ele.classList.remove('hall');
                    ele.classList.add('wall-top');
                }
                if (!!square.walls.East) {
                    ele.classList.remove('hall');
                    ele.classList.add('wall-right');
                }
                if (!!square.walls.South) {
                    ele.classList.remove('hall');
                    ele.classList.add('wall-bottom');
                }
                if (!!square.walls.West) {
                    ele.classList.remove('hall');
                    ele.classList.add('wall-left');
                }
            }
        }
        let wallCounters = document.getElementsByClassName("wall-counter");
        let btn = document.getElementById("place");
        wallCounters[0].innerHTML = `player 1 has ${this.game.player1Walls} walls left`
        wallCounters[1].innerHTML = `player 2 has ${this.game.player2Walls} walls left`
        if ((this.game.currentPlayer === "player1") && (this.game.player1Walls === 0)) {
            btn.classList.add("hide");
        } else if ((this.game.currentPlayer === "player2") && (this.game.player2Walls === 0)){
            btn.classList.add("hide");
        } else {
            if (this.game.state === "not doing anything") {
                if (btn.classList.contains("hide")) btn.classList.remove("hide");
            }
        }
        document.getElementById("player-turn").innerHTML = `${this.game.currentPlayer}'s turn`;
    }

    setupEventListeners() {
        this.util.trackFunctions("setupEventListeners");

        this.body.addEventListener("click", (event) => {
            /* 
The click event is used for a state machine.
Depending on the state of placing a wall dictates
what will happen when a click event triggers.
State is stored in this.game.state 
State Machine is:
[p1 not doing anything] == clicks Place a wall >> [selecting squares] => [selecting wall type] => [p1 not doing anything]
                                                                            ||
                                                                            \/
                                                                        {wall is created} => [p2 not doing anything]
!! undeveloped !!
Player movement will be integrated into the state machine as well
*** maybe change [not doing anything] to [not doing anything]

[p1 not doing anything] == clicks Move character >> [selecting desired move] => [p1 not doing anything]
                                                                ||
                                                                \/
                                                            {move player} => [p2 not doing anything]

            */ 

            let state = this.game.state;
            let classList = event.target.classList;
            let innerHTML = event.target.innerHTML;
            if (state === "not doing anything") {
                if (classList.contains("button")) {
                    if(innerHTML === "Place a wall") {

                        this.handlePlaceWallButton(event);
                    }

                    if(innerHTML === "Move character") {
                        this.handleMovementButton(event);
                    }
                } 
            }
            if (state === "selecting squares") {
                if (classList.contains("floor")) {

                    this.handleSquareClick(event);
                }
            } 
            if (state === "selecting wall type") {
                if (classList.contains("button")) {
                    if((innerHTML === "North") || (innerHTML === "East")
                       || (innerHTML === "South") || (innerHTML === "West")) {

                        this.handleWallTypeButton(innerHTML, event);
                    }
                }
            }
            if (state === "selecting desired move") {
                if (this.availableMoves.includes(event.target)) {
                    this.game.takeTurn("move", null, event)
                    document.getElementById("back").classList.add("hide");
                    for (let i = 0; i < this.availableMoves.length; i++) {
                        this.availableMoves[i].classList.remove("highlight");
                    }
                    this.game.state = "not doing anything";
                    this.availableMoves = [];
                    this.show();
                } else {
                }
            }
            if (state !== "not doing anything") {
                if (classList.contains("button")) {
                    if (innerHTML === "back") {
                        this.handleBackButton();
                    }
                }
            }
            if (innerHTML === "Restart") {
                location.reload();
            }

        }, false);
    } 

    handlePlaceWallButton(event) {
        this.util.trackFunctions("handlePlaceWallButton");
        // delete btn element and replace with instructions to
        // click two distinct squares
        if (this.game.currentPlayer !== "noone") {
            this.game.state = "selecting squares";
            let btn = event.target;
            document.getElementById("back").classList.remove("hide");
            this.body.getElementsByClassName("clickInstruct")[0].classList.remove("hide");
            document.getElementById("move").classList.add("hide");
            btn.classList.add("hide");
        }
    }

    handleSquareClick(event) {
        this.util.trackFunctions("handleSquareClick");
        console.log(event);
        if (this.game.currentPlayer !== "noone") {
            //wait for client to click two valid squares
            let target = event.target;
            
            if ((target.classList.contains("floor")) && (this.squareA === null)) {
                event.target.classList.add("selectedWall");
                this.squareA = target.id;
                //parse squareA
                // squareA = "00" and needs to be [0, 0]
                let square = this.squareA.split("");
                square[0] = parseInt(square[0]);
                square[1] = parseInt(square[1]);
                //get neighbors
                // returns [[north],[east],[south],[west]]
                this.neighbors = this.board.checkNeighbors(square);

                for(let i = 0; i < this.neighbors.length; i++) {
                    if(this.neighbors[i][0] !== -1) {
                        let id = this.neighbors[i].join("");
                        console.log(id);
                        document.getElementById(id).classList.add("highlight");
                    }
                }
                this.changeNeighborsArrayToString(this.neighbors);  
    
            } else if ((target.classList.contains("floor")) && (this.squareA !== null) && (this.squareB === null)) {
                if(!!this.neighbors.includes(target.id)) {
                    this.squareB = target.id;
                }
            }
    
            if (this.squareA !== null && this.squareB !== null) {
                // should create two buttons depending on squareA and squareB orientation
                this.body.getElementsByClassName("clickInstruct")[0].classList.add("hide");
                
                if(this.squareA.split("")[0] === this.squareB.split("")[0]) {
                    if(this.squareA.split("")[0] > 0) {
                        this.body.getElementsByClassName("north")[0].classList.remove("hide");
                    }
                    if(this.squareA.split("")[0] < 8) {
                        this.body.getElementsByClassName("south")[0].classList.remove("hide");
                    }
                }
                if(this.squareA.split("")[1] === this.squareB.split("")[1]) {
                    if(this.squareA.split("")[1] > 0) {
                        this.body.getElementsByClassName("west")[0].classList.remove("hide");
                    }
                    if(this.squareA.split("")[1] < 8) {
                        this.body.getElementsByClassName("east")[0].classList.remove("hide");
                    }
                }
                
                for(let i = 0; i < this.neighbors.length; i++) {
                    if(!this.neighbors[i].includes("-")) {
                        let id = this.neighbors[i];
                        console.log(id);
                        document.getElementById(id).classList.remove("highlight");
                    }
                }
                this.neighbors = [];
                event.target.classList.add("selectedWall");
                this.game.state = "selecting wall type";
                
            }
        }
    }

    handleWallTypeButton(dir, event) {
        this.util.trackFunctions("handleWallTypeButton");

        let selectedWalls = document.getElementsByClassName("selectedWall");
        for (let i = 0; i < selectedWalls.length; i++) {
            let wall = selectedWalls[i];
            setTimeout(() => {
                wall.classList.remove("selectedWall");
            },0);
        }

        /* game logic */
        this.game.takeTurn("placeWall", dir, event, this.squareA, this.squareB);

        /* stylize */
        this.body.getElementsByClassName("north")[0].classList.add("hide");
        this.body.getElementsByClassName("east")[0].classList.add("hide");
        this.body.getElementsByClassName("south")[0].classList.add("hide");
        this.body.getElementsByClassName("west")[0].classList.add("hide");
        this.body.getElementsByClassName("button")[0].classList.remove("hide");
        document.getElementById("back").classList.add("hide");
        document.getElementById("move").classList.remove("hide");

        /* resetting useful variables */
        this.squareA = null;
        this.squareB = null;

        /* state change */
        this.game.state = "not doing anything";

        /* renders */
        this.show();
    }

    handleMovementButton(event) {
        this.util.trackFunctions("handleMovementButton");
        if(this.game.currentPlayer !== "noone") {
            document.getElementById("back").classList.remove("hide");
            document.getElementById("place").classList.add("hide");
            let availableMoves;
            let player = this.game.currentPlayer === "player1" ? this.game.player1 : this.game.player2;
            let rowIdx = parseInt(player[0]);
            let colIdx = parseInt(player[1]);
            availableMoves = this.game.getAvailableMoves([rowIdx, colIdx]);
            for (let i = 0; i < availableMoves.length; i++) {
                let ele = document.getElementById(availableMoves[i].join(""));
                ele.classList.add("highlight");
                this.availableMoves.push(ele);
            }
            /* set the state to check if an available move square is clicked. */
            this.game.state = "selecting desired move";
        }
    }

    handleBackButton() {
        this.util.trackFunctions("handleBackButton");
        this.game.state = "not doing anything";
        /* resets state */
        let instructions = document.getElementsByClassName("controller-div")[0].childNodes;
        for (let i = 0; i < instructions.length; i++) {
            if (instructions[i].id === "place" || instructions[i].id === "move") {
                instructions[i].classList.remove("hide");
            } else {
                instructions[i].classList.add("hide");
            }
        }
        this.squareA = null;
        this.squareB = null;
        this.neighbors = null;  
        for (let i = 0; i < this.availableMoves.length; i++){
            this.availableMoves[i].classList.remove("highlight");
        }
        let selectedWalls = document.getElementsByClassName("selectedWall");
        for (let i = 0; i < selectedWalls.length; i++) {
            let wall = selectedWalls[i];
            setTimeout(() => {
                wall.classList.remove("selectedWall");
            },0);
        }
        this.availableMoves = [];
        this.show();
    }

    changeNeighborsArrayToString(array) {
        this.util.trackFunctions("changeNeighborsArrayToString");
        //changes this.neighbors to be able to be read as an array of strings
        for (let i = 0; i < array.length; i++) {
            let id = array[i].join("").toString();
            this.neighbors[i] = id;
            let ele = document.getElementById(`${id}`);
        }
    }

    createButton(innerText) {
        this.util.trackFunctions("createButton");
        let btn = document.createElement("button");
        btn.innerHTML = innerText
        btn.classList.add('button');
        if (innerText === "Place a wall") {
            btn.setAttribute("id", "place");
        } else if (innerText === "Move character") {
            btn.setAttribute("id", "move");
        } else {
            btn.setAttribute("id", innerText);
        }
        this.body.getElementsByClassName("controller-div")[0].appendChild(btn);
        return btn;
    }

    createRestartDiv(board, winner) {
        this.util.trackFunctions("createRestartDiv");
        let div = document.createElement("div");
        let congrats = document.createElement("h1");
        let btn = document.createElement("button");
        div.setAttribute("id", "restart-div");
        btn.setAttribute("id", "restart");
        congrats.innerHTML = `Congrats to ${winner}!!!!`;
        btn.innerHTML = "Restart"
        div.appendChild(congrats);
        div.appendChild(btn);
        board.appendChild(div);
    }

    setupBoard() {
        this.util.trackFunctions("setupBoard");
        let div = document.createElement("div");
        this.body.appendChild(div);
        let board = document.createElement("table");
        div.appendChild(board);
        div.classList.add("table");
        board.setAttribute("id" , "board");
        let whosTurn = document.createElement("div");
        whosTurn.classList.add("player-turn");
        whosTurn.setAttribute("id", "player-turn");
        whosTurn.innerHTML = "Player 1's Turn";
        div.appendChild(whosTurn);
        let cntrlDiv = document.createElement("div");
        cntrlDiv.classList.add("controller-div");
        div.appendChild(cntrlDiv);
        let wallCounterDiv = document.createElement("div");
        wallCounterDiv.classList.add("wall-counter-div");
        wallCounterDiv.setAttribute("id", "wall-counter");
        let player1Walls = document.createElement("div");
        let player2Walls = document.createElement("div");
        player1Walls.classList.add("wall-counter");
        player2Walls.classList.add("wall-counter");
        player1Walls.innerHTML = "player 1 has 10 walls left";
        player2Walls.innerHTML = "player 2 has 10 walls left";
        wallCounterDiv.appendChild(player1Walls);
        wallCounterDiv.appendChild(player2Walls);
        div.appendChild(wallCounterDiv);

        //build walls button
        this.createButton("Place a wall");
        //movement button
        this.createButton("Move character");
        ////////////////////
        /* instruction for clicking squares */
        let clickInstruct = document.createElement("p");
        clickInstruct.classList.add("clickInstruct");
        clickInstruct.innerHTML = "Click two distinct squares..."
        clickInstruct.classList.add("hide");
        cntrlDiv.appendChild(clickInstruct);
        /* wall type buttons */
        let north = this.createButton("North");
        let east = this.createButton("East");
        let south = this.createButton("South");
        let west = this.createButton("West");
        north.classList.add("hide", "north");
        east.classList.add("hide", "east");
        south.classList.add("hide", "south");
        west.classList.add("hide", "west");
        cntrlDiv.appendChild(north);
        cntrlDiv.appendChild(south);
        cntrlDiv.appendChild(west);
        cntrlDiv.appendChild(east);

        /* back button */
        let back = this.createButton("back");
        back.classList.add("hide");
        cntrlDiv.appendChild(back);

        for(let rowIdx = 0; rowIdx < 10; rowIdx++) {
            let tr = document.createElement("tr");
            for(let colIdx = 0; colIdx < 10; colIdx++) {
                let th = document.createElement("th");
                let td = document.createElement("td");
                if(rowIdx === 0 && colIdx === 0) {
                    th.innerHTML = ""
                    tr.appendChild(th);
                } else if (rowIdx === 0) {
                    th.innerHTML = colIdx - 1
                    tr.appendChild(th);
                } else if (rowIdx > 0 && colIdx === 0) {
                    th.innerHTML = rowIdx - 1
                    tr.appendChild(th);
                } else {
                    td.id = `${rowIdx - 1}${colIdx - 1}`;
                    td.classList.add("floor", "hall");
                    tr.appendChild(td);
                }
            }
            board.appendChild(tr);
        }
    }
}