/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/***/ ((module) => {



class GameView {
    constructor(game) {
        this.body = document.querySelector("body");
        this.game = game;
        this.board = this.game.board;
        this.grid = this.board.grid;
        this.squareA = null;
        this.squareB = null;
        this.neighbors = null;  
        this.availableMoves = [];

        this.setupBoard();
        this.setupEventListeners();
    }

    show() {
        this.showBoard();
        if (this.game.isOver()) {
            if (this.game.currentPlayer === "player2") console.log("PLAYER 1 IS THE WINNER");
            if (this.game.currentPlayer === "player1") console.log("PLAYER 2 IS THE WINNER");
        }
    }

    showBoard() {
        for(let rowIdx = 0; rowIdx  < this.grid.length; rowIdx++) {
            for (let colIdx = 0; colIdx < this.grid[rowIdx].length; colIdx++)
            {
                let square = this.grid[rowIdx][colIdx];
                let id = (rowIdx).toString() + (colIdx).toString();
                let ele = document.getElementById(id);
                if(square.player === "player1") {
                    ele.classList.add("player");
                    ele.innerHTML = "&#9823";
                } else if(square.player === "player2") {
                    ele.classList.add("player");
                    ele.innerHTML = "&#9817";
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
        let btn = document.getElementById("Place a wall");
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
        this.body.addEventListener("keyup", (event) => {
            let code = event.code;
            if (!this.game.placingWall) {
                if ((code === "ArrowUp") || (code === "ArrowRight") || (code === "ArrowDown") || (code === "ArrowLeft")) {
                    this.game.takeTurn("move", code.split("Arrow")[1].toLowerCase(), event);
                }
                this.show();
            }
            if(code === "Space") {
                this.game.findPath();
            }
        });

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
                    for (let i = 0; i < this.availableMoves.length; i++) {
                        this.availableMoves[i].classList.remove("highlight");
                    }
                    this.game.state = "not doing anything";
                    this.availableMoves = [];
                    this.show();
                } else {
                }
            }
        }, false);
    } 

    handlePlaceWallButton(event) {
        // delete btn element and replace with instructions to
        // click two distinct squares
        this.game.state = "selecting squares";
        let btn = event.target;
        this.body.getElementsByClassName("clickInstruct")[0].classList.remove("hide");
        document.getElementById("Move character").classList.add("hide");
        btn.classList.add("hide");
    }

    handleSquareClick(event) {
        //wait for client to click two valid squares
        let target = event.target;

        if ((target.classList.contains("floor")) && (this.squareA === null)) {
            this.squareA = target.id;
            //parse squareA
            // squareA = "00" and needs to be [0, 0]
            let square = this.squareA.split("");
            square[0] = parseInt(square[0]);
            square[1] = parseInt(square[1]);
            //get neighbors
            // returns [[north],[east],[south],[west]]
            this.neighbors = this.board.checkNeighbors(square);
            // for(let i = 0; i < this.neighbors.length; i++) {
            //     this.neighbors[i] = this.neighbors[i][0].toString() + this.neighbors[i][1].toString();
            // }
            this.highlight(this.neighbors);  // NEED TO CHANGE  SHOULD BE A CLASS TOGGLE

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
            this.game.state = "selecting wall type";
            
        }
    }

    handleWallTypeButton(dir, event) {
        /* 
        calls this.game.takeTurn(action, dir, event);
        should remove wall type buttons and add place a wall button
        switch state back to not doing anything here???
        or in this.game
        WHERE DOES WALL PLACEMENT VALIDATION HAPPEN??????????????????????
        */
        this.game.takeTurn("placeWall", dir, event, this.squareA, this.squareB);
        this.body.getElementsByClassName("north")[0].classList.add("hide");
        this.body.getElementsByClassName("east")[0].classList.add("hide");
        this.body.getElementsByClassName("south")[0].classList.add("hide");
        this.body.getElementsByClassName("west")[0].classList.add("hide");
        this.body.getElementsByClassName("button")[0].classList.remove("hide");
        document.getElementById("Move character").classList.remove("hide");
        this.squareA = null;
        this.squareB = null;
        this.game.state = "not doing anything";
        this.show();
    }

    handleMovementButton(event) {
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

    highlight(array) {
        //highlight and also changes this.neighbors to be able to be read as an array of strings
        for (let i = 0; i < array.length; i++) {
            // array[i][0] = array[i][0];
            // array[i][1] = array[i][1];
            let id = array[i].join("").toString();
            this.neighbors[i] = id;
            let ele = document.getElementById(`${id}`);
            if (ele !== null) {
                // ele.style.backgroundColor = "green";
            }
        }
    }

    createButton(innerText) {
        let btn = document.createElement("button");
        btn.innerHTML = innerText
        btn.classList.add('button');
        btn.setAttribute("id", innerText);
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

module.exports = GameView;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/game_view.js");
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9xdW9yaWRvci8uL3NyYy9nYW1lX3ZpZXcuanMiLCJ3ZWJwYWNrOi8vcXVvcmlkb3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcXVvcmlkb3Ivd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCLDRCQUE0QjtBQUN2RCxnQ0FBZ0MsbUNBQW1DO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELHVCQUF1QjtBQUMzRSxvREFBb0QsdUJBQXVCO0FBQzNFO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBOEQsd0JBQXdCO0FBQ3RGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RUFBeUUsZ0JBQWdCO0FBQ3pGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsWUFBWTs7QUFFekU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxnQ0FBZ0M7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsU0FBUztBQUNULEs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QiwyQkFBMkI7QUFDeEQ7QUFDQTtBQUNBLDJDQUEyQzs7QUFFM0MsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsMkJBQTJCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELEdBQUc7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCLGFBQWE7QUFDeEM7QUFDQSwrQkFBK0IsYUFBYTtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQiwrQkFBK0IsV0FBVyxFQUFFLFdBQVc7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwQjs7Ozs7O1VDbldBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7VUNyQkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiZ2FtZXZpZXcuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5jbGFzcyBHYW1lVmlldyB7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lKSB7XHJcbiAgICAgICAgdGhpcy5ib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgICAgICB0aGlzLmJvYXJkID0gdGhpcy5nYW1lLmJvYXJkO1xyXG4gICAgICAgIHRoaXMuZ3JpZCA9IHRoaXMuYm9hcmQuZ3JpZDtcclxuICAgICAgICB0aGlzLnNxdWFyZUEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc3F1YXJlQiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5uZWlnaGJvcnMgPSBudWxsOyAgXHJcbiAgICAgICAgdGhpcy5hdmFpbGFibGVNb3ZlcyA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLnNldHVwQm9hcmQoKTtcclxuICAgICAgICB0aGlzLnNldHVwRXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93KCkge1xyXG4gICAgICAgIHRoaXMuc2hvd0JvYXJkKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5pc092ZXIoKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyMlwiKSBjb25zb2xlLmxvZyhcIlBMQVlFUiAxIElTIFRIRSBXSU5ORVJcIik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuY3VycmVudFBsYXllciA9PT0gXCJwbGF5ZXIxXCIpIGNvbnNvbGUubG9nKFwiUExBWUVSIDIgSVMgVEhFIFdJTk5FUlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0JvYXJkKCkge1xyXG4gICAgICAgIGZvcihsZXQgcm93SWR4ID0gMDsgcm93SWR4ICA8IHRoaXMuZ3JpZC5sZW5ndGg7IHJvd0lkeCsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGNvbElkeCA9IDA7IGNvbElkeCA8IHRoaXMuZ3JpZFtyb3dJZHhdLmxlbmd0aDsgY29sSWR4KyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBzcXVhcmUgPSB0aGlzLmdyaWRbcm93SWR4XVtjb2xJZHhdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGlkID0gKHJvd0lkeCkudG9TdHJpbmcoKSArIChjb2xJZHgpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG4gICAgICAgICAgICAgICAgaWYoc3F1YXJlLnBsYXllciA9PT0gXCJwbGF5ZXIxXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGUuY2xhc3NMaXN0LmFkZChcInBsYXllclwiKTtcclxuICAgICAgICAgICAgICAgICAgICBlbGUuaW5uZXJIVE1MID0gXCImIzk4MjNcIjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihzcXVhcmUucGxheWVyID09PSBcInBsYXllcjJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QuYWRkKFwicGxheWVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5pbm5lckhUTUwgPSBcIiYjOTgxN1wiO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGUuY2xhc3NMaXN0LnJlbW92ZShcInBsYXllclwiKTtcclxuICAgICAgICAgICAgICAgICAgICBlbGUuaW5uZXJIVE1MID0gXCIgXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvKiB1cGRhdGUgd2FsbHMgKi9cclxuICAgICAgICAgICAgICAgIGlmICghIXNxdWFyZS53YWxscy5Ob3J0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QucmVtb3ZlKCdoYWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlLmNsYXNzTGlzdC5hZGQoJ3dhbGwtdG9wJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoISFzcXVhcmUud2FsbHMuRWFzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QucmVtb3ZlKCdoYWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlLmNsYXNzTGlzdC5hZGQoJ3dhbGwtcmlnaHQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghIXNxdWFyZS53YWxscy5Tb3V0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QucmVtb3ZlKCdoYWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlLmNsYXNzTGlzdC5hZGQoJ3dhbGwtYm90dG9tJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoISFzcXVhcmUud2FsbHMuV2VzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QucmVtb3ZlKCdoYWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlLmNsYXNzTGlzdC5hZGQoJ3dhbGwtbGVmdCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB3YWxsQ291bnRlcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwid2FsbC1jb3VudGVyXCIpO1xyXG4gICAgICAgIGxldCBidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlBsYWNlIGEgd2FsbFwiKTtcclxuICAgICAgICB3YWxsQ291bnRlcnNbMF0uaW5uZXJIVE1MID0gYHBsYXllciAxIGhhcyAke3RoaXMuZ2FtZS5wbGF5ZXIxV2FsbHN9IHdhbGxzIGxlZnRgXHJcbiAgICAgICAgd2FsbENvdW50ZXJzWzFdLmlubmVySFRNTCA9IGBwbGF5ZXIgMiBoYXMgJHt0aGlzLmdhbWUucGxheWVyMldhbGxzfSB3YWxscyBsZWZ0YFxyXG4gICAgICAgIGlmICgodGhpcy5nYW1lLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyMVwiKSAmJiAodGhpcy5nYW1lLnBsYXllcjFXYWxscyA9PT0gMCkpIHtcclxuICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHRoaXMuZ2FtZS5jdXJyZW50UGxheWVyID09PSBcInBsYXllcjJcIikgJiYgKHRoaXMuZ2FtZS5wbGF5ZXIyV2FsbHMgPT09IDApKXtcclxuICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuc3RhdGUgPT09IFwibm90IGRvaW5nIGFueXRoaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChidG4uY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGlkZVwiKSkgYnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLXR1cm5cIikuaW5uZXJIVE1MID0gYCR7dGhpcy5nYW1lLmN1cnJlbnRQbGF5ZXJ9J3MgdHVybmA7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0dXBFdmVudExpc3RlbmVycygpIHtcclxuICAgICAgICB0aGlzLmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY29kZSA9IGV2ZW50LmNvZGU7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5nYW1lLnBsYWNpbmdXYWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKGNvZGUgPT09IFwiQXJyb3dVcFwiKSB8fCAoY29kZSA9PT0gXCJBcnJvd1JpZ2h0XCIpIHx8IChjb2RlID09PSBcIkFycm93RG93blwiKSB8fCAoY29kZSA9PT0gXCJBcnJvd0xlZnRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUudGFrZVR1cm4oXCJtb3ZlXCIsIGNvZGUuc3BsaXQoXCJBcnJvd1wiKVsxXS50b0xvd2VyQ2FzZSgpLCBldmVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihjb2RlID09PSBcIlNwYWNlXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5maW5kUGF0aCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuYm9keS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIC8qIFxyXG5UaGUgY2xpY2sgZXZlbnQgaXMgdXNlZCBmb3IgYSBzdGF0ZSBtYWNoaW5lLlxyXG5EZXBlbmRpbmcgb24gdGhlIHN0YXRlIG9mIHBsYWNpbmcgYSB3YWxsIGRpY3RhdGVzXHJcbndoYXQgd2lsbCBoYXBwZW4gd2hlbiBhIGNsaWNrIGV2ZW50IHRyaWdnZXJzLlxyXG5TdGF0ZSBpcyBzdG9yZWQgaW4gdGhpcy5nYW1lLnN0YXRlIFxyXG5TdGF0ZSBNYWNoaW5lIGlzOlxyXG5bcDEgbm90IGRvaW5nIGFueXRoaW5nXSA9PSBjbGlja3MgUGxhY2UgYSB3YWxsID4+IFtzZWxlY3Rpbmcgc3F1YXJlc10gPT4gW3NlbGVjdGluZyB3YWxsIHR5cGVdID0+IFtwMSBub3QgZG9pbmcgYW55dGhpbmddXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFwvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt3YWxsIGlzIGNyZWF0ZWR9ID0+IFtwMiBub3QgZG9pbmcgYW55dGhpbmddXHJcbiEhIHVuZGV2ZWxvcGVkICEhXHJcblBsYXllciBtb3ZlbWVudCB3aWxsIGJlIGludGVncmF0ZWQgaW50byB0aGUgc3RhdGUgbWFjaGluZSBhcyB3ZWxsXHJcbioqKiBtYXliZSBjaGFuZ2UgW25vdCBkb2luZyBhbnl0aGluZ10gdG8gW25vdCBkb2luZyBhbnl0aGluZ11cclxuXHJcbltwMSBub3QgZG9pbmcgYW55dGhpbmddID09IGNsaWNrcyBNb3ZlIGNoYXJhY3RlciA+PiBbc2VsZWN0aW5nIGRlc2lyZWQgbW92ZV0gPT4gW3AxIG5vdCBkb2luZyBhbnl0aGluZ11cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXC9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge21vdmUgcGxheWVyfSA9PiBbcDIgbm90IGRvaW5nIGFueXRoaW5nXVxyXG5cclxuICAgICAgICAgICAgKi8gXHJcblxyXG4gICAgICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLmdhbWUuc3RhdGU7XHJcbiAgICAgICAgICAgIGxldCBjbGFzc0xpc3QgPSBldmVudC50YXJnZXQuY2xhc3NMaXN0O1xyXG4gICAgICAgICAgICBsZXQgaW5uZXJIVE1MID0gZXZlbnQudGFyZ2V0LmlubmVySFRNTDtcclxuICAgICAgICAgICAgaWYgKHN0YXRlID09PSBcIm5vdCBkb2luZyBhbnl0aGluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2xhc3NMaXN0LmNvbnRhaW5zKFwiYnV0dG9uXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaW5uZXJIVE1MID09PSBcIlBsYWNlIGEgd2FsbFwiKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVBsYWNlV2FsbEJ1dHRvbihldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihpbm5lckhUTUwgPT09IFwiTW92ZSBjaGFyYWN0ZXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmVtZW50QnV0dG9uKGV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gXCJzZWxlY3Rpbmcgc3F1YXJlc1wiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2xhc3NMaXN0LmNvbnRhaW5zKFwiZmxvb3JcIikpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVTcXVhcmVDbGljayhldmVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gXCJzZWxlY3Rpbmcgd2FsbCB0eXBlXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjbGFzc0xpc3QuY29udGFpbnMoXCJidXR0b25cIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZigoaW5uZXJIVE1MID09PSBcIk5vcnRoXCIpIHx8IChpbm5lckhUTUwgPT09IFwiRWFzdFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgIHx8IChpbm5lckhUTUwgPT09IFwiU291dGhcIikgfHwgKGlubmVySFRNTCA9PT0gXCJXZXN0XCIpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVdhbGxUeXBlQnV0dG9uKGlubmVySFRNTCwgZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc3RhdGUgPT09IFwic2VsZWN0aW5nIGRlc2lyZWQgbW92ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hdmFpbGFibGVNb3Zlcy5pbmNsdWRlcyhldmVudC50YXJnZXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnRha2VUdXJuKFwibW92ZVwiLCBudWxsLCBldmVudClcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYXZhaWxhYmxlTW92ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdmFpbGFibGVNb3Zlc1tpXS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlnaGxpZ2h0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuc3RhdGUgPSBcIm5vdCBkb2luZyBhbnl0aGluZ1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXZhaWxhYmxlTW92ZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICB9IFxyXG5cclxuICAgIGhhbmRsZVBsYWNlV2FsbEJ1dHRvbihldmVudCkge1xyXG4gICAgICAgIC8vIGRlbGV0ZSBidG4gZWxlbWVudCBhbmQgcmVwbGFjZSB3aXRoIGluc3RydWN0aW9ucyB0b1xyXG4gICAgICAgIC8vIGNsaWNrIHR3byBkaXN0aW5jdCBzcXVhcmVzXHJcbiAgICAgICAgdGhpcy5nYW1lLnN0YXRlID0gXCJzZWxlY3Rpbmcgc3F1YXJlc1wiO1xyXG4gICAgICAgIGxldCBidG4gPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgdGhpcy5ib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjbGlja0luc3RydWN0XCIpWzBdLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiTW92ZSBjaGFyYWN0ZXJcIikuY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XHJcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVNxdWFyZUNsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgLy93YWl0IGZvciBjbGllbnQgdG8gY2xpY2sgdHdvIHZhbGlkIHNxdWFyZXNcclxuICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xyXG5cclxuICAgICAgICBpZiAoKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJmbG9vclwiKSkgJiYgKHRoaXMuc3F1YXJlQSA9PT0gbnVsbCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zcXVhcmVBID0gdGFyZ2V0LmlkO1xyXG4gICAgICAgICAgICAvL3BhcnNlIHNxdWFyZUFcclxuICAgICAgICAgICAgLy8gc3F1YXJlQSA9IFwiMDBcIiBhbmQgbmVlZHMgdG8gYmUgWzAsIDBdXHJcbiAgICAgICAgICAgIGxldCBzcXVhcmUgPSB0aGlzLnNxdWFyZUEuc3BsaXQoXCJcIik7XHJcbiAgICAgICAgICAgIHNxdWFyZVswXSA9IHBhcnNlSW50KHNxdWFyZVswXSk7XHJcbiAgICAgICAgICAgIHNxdWFyZVsxXSA9IHBhcnNlSW50KHNxdWFyZVsxXSk7XHJcbiAgICAgICAgICAgIC8vZ2V0IG5laWdoYm9yc1xyXG4gICAgICAgICAgICAvLyByZXR1cm5zIFtbbm9ydGhdLFtlYXN0XSxbc291dGhdLFt3ZXN0XV1cclxuICAgICAgICAgICAgdGhpcy5uZWlnaGJvcnMgPSB0aGlzLmJvYXJkLmNoZWNrTmVpZ2hib3JzKHNxdWFyZSk7XHJcbiAgICAgICAgICAgIC8vIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLm5laWdoYm9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5uZWlnaGJvcnNbaV0gPSB0aGlzLm5laWdoYm9yc1tpXVswXS50b1N0cmluZygpICsgdGhpcy5uZWlnaGJvcnNbaV1bMV0udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodCh0aGlzLm5laWdoYm9ycyk7ICAvLyBORUVEIFRPIENIQU5HRSAgU0hPVUxEIEJFIEEgQ0xBU1MgVE9HR0xFXHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJmbG9vclwiKSkgJiYgKHRoaXMuc3F1YXJlQSAhPT0gbnVsbCkgJiYgKHRoaXMuc3F1YXJlQiA9PT0gbnVsbCkpIHtcclxuICAgICAgICAgICAgaWYoISF0aGlzLm5laWdoYm9ycy5pbmNsdWRlcyh0YXJnZXQuaWQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNxdWFyZUIgPSB0YXJnZXQuaWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNxdWFyZUEgIT09IG51bGwgJiYgdGhpcy5zcXVhcmVCICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIC8vIHNob3VsZCBjcmVhdGUgdHdvIGJ1dHRvbnMgZGVwZW5kaW5nIG9uIHNxdWFyZUEgYW5kIHNxdWFyZUIgb3JpZW50YXRpb25cclxuICAgICAgICAgICAgdGhpcy5ib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjbGlja0luc3RydWN0XCIpWzBdLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYodGhpcy5zcXVhcmVBLnNwbGl0KFwiXCIpWzBdID09PSB0aGlzLnNxdWFyZUIuc3BsaXQoXCJcIilbMF0pIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc3F1YXJlQS5zcGxpdChcIlwiKVswXSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm5vcnRoXCIpWzBdLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5zcXVhcmVBLnNwbGl0KFwiXCIpWzBdIDwgOCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm9keS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic291dGhcIilbMF0uY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5zcXVhcmVBLnNwbGl0KFwiXCIpWzFdID09PSB0aGlzLnNxdWFyZUIuc3BsaXQoXCJcIilbMV0pIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc3F1YXJlQS5zcGxpdChcIlwiKVsxXSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIndlc3RcIilbMF0uY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNxdWFyZUEuc3BsaXQoXCJcIilbMV0gPCA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJlYXN0XCIpWzBdLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zdGF0ZSA9IFwic2VsZWN0aW5nIHdhbGwgdHlwZVwiO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlV2FsbFR5cGVCdXR0b24oZGlyLCBldmVudCkge1xyXG4gICAgICAgIC8qIFxyXG4gICAgICAgIGNhbGxzIHRoaXMuZ2FtZS50YWtlVHVybihhY3Rpb24sIGRpciwgZXZlbnQpO1xyXG4gICAgICAgIHNob3VsZCByZW1vdmUgd2FsbCB0eXBlIGJ1dHRvbnMgYW5kIGFkZCBwbGFjZSBhIHdhbGwgYnV0dG9uXHJcbiAgICAgICAgc3dpdGNoIHN0YXRlIGJhY2sgdG8gbm90IGRvaW5nIGFueXRoaW5nIGhlcmU/Pz9cclxuICAgICAgICBvciBpbiB0aGlzLmdhbWVcclxuICAgICAgICBXSEVSRSBET0VTIFdBTEwgUExBQ0VNRU5UIFZBTElEQVRJT04gSEFQUEVOPz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/P1xyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5nYW1lLnRha2VUdXJuKFwicGxhY2VXYWxsXCIsIGRpciwgZXZlbnQsIHRoaXMuc3F1YXJlQSwgdGhpcy5zcXVhcmVCKTtcclxuICAgICAgICB0aGlzLmJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm5vcnRoXCIpWzBdLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xyXG4gICAgICAgIHRoaXMuYm9keS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZWFzdFwiKVswXS5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcclxuICAgICAgICB0aGlzLmJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNvdXRoXCIpWzBdLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xyXG4gICAgICAgIHRoaXMuYm9keS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwid2VzdFwiKVswXS5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcclxuICAgICAgICB0aGlzLmJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImJ1dHRvblwiKVswXS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIk1vdmUgY2hhcmFjdGVyXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xyXG4gICAgICAgIHRoaXMuc3F1YXJlQSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zcXVhcmVCID0gbnVsbDtcclxuICAgICAgICB0aGlzLmdhbWUuc3RhdGUgPSBcIm5vdCBkb2luZyBhbnl0aGluZ1wiO1xyXG4gICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZU1vdmVtZW50QnV0dG9uKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IGF2YWlsYWJsZU1vdmVzO1xyXG4gICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLmdhbWUuY3VycmVudFBsYXllciA9PT0gXCJwbGF5ZXIxXCIgPyB0aGlzLmdhbWUucGxheWVyMSA6IHRoaXMuZ2FtZS5wbGF5ZXIyO1xyXG4gICAgICAgIGxldCByb3dJZHggPSBwYXJzZUludChwbGF5ZXJbMF0pO1xyXG4gICAgICAgIGxldCBjb2xJZHggPSBwYXJzZUludChwbGF5ZXJbMV0pO1xyXG4gICAgICAgIGF2YWlsYWJsZU1vdmVzID0gdGhpcy5nYW1lLmdldEF2YWlsYWJsZU1vdmVzKFtyb3dJZHgsIGNvbElkeF0pO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXZhaWxhYmxlTW92ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGVsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGF2YWlsYWJsZU1vdmVzW2ldLmpvaW4oXCJcIikpO1xyXG4gICAgICAgICAgICBlbGUuY2xhc3NMaXN0LmFkZChcImhpZ2hsaWdodFwiKTtcclxuICAgICAgICAgICAgdGhpcy5hdmFpbGFibGVNb3Zlcy5wdXNoKGVsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIHNldCB0aGUgc3RhdGUgdG8gY2hlY2sgaWYgYW4gYXZhaWxhYmxlIG1vdmUgc3F1YXJlIGlzIGNsaWNrZWQuICovXHJcbiAgICAgICAgdGhpcy5nYW1lLnN0YXRlID0gXCJzZWxlY3RpbmcgZGVzaXJlZCBtb3ZlXCI7XHJcbiAgICB9XHJcblxyXG4gICAgaGlnaGxpZ2h0KGFycmF5KSB7XHJcbiAgICAgICAgLy9oaWdobGlnaHQgYW5kIGFsc28gY2hhbmdlcyB0aGlzLm5laWdoYm9ycyB0byBiZSBhYmxlIHRvIGJlIHJlYWQgYXMgYW4gYXJyYXkgb2Ygc3RyaW5nc1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gYXJyYXlbaV1bMF0gPSBhcnJheVtpXVswXTtcclxuICAgICAgICAgICAgLy8gYXJyYXlbaV1bMV0gPSBhcnJheVtpXVsxXTtcclxuICAgICAgICAgICAgbGV0IGlkID0gYXJyYXlbaV0uam9pbihcIlwiKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICB0aGlzLm5laWdoYm9yc1tpXSA9IGlkO1xyXG4gICAgICAgICAgICBsZXQgZWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7aWR9YCk7XHJcbiAgICAgICAgICAgIGlmIChlbGUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vIGVsZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImdyZWVuXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlQnV0dG9uKGlubmVyVGV4dCkge1xyXG4gICAgICAgIGxldCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgIGJ0bi5pbm5lckhUTUwgPSBpbm5lclRleHRcclxuICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnYnV0dG9uJyk7XHJcbiAgICAgICAgYnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIGlubmVyVGV4dCk7XHJcbiAgICAgICAgdGhpcy5ib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjb250cm9sbGVyLWRpdlwiKVswXS5hcHBlbmRDaGlsZChidG4pO1xyXG4gICAgICAgIHJldHVybiBidG47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0dXBCb2FyZCgpIHtcclxuICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICB0aGlzLmJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgICAgICBsZXQgYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIik7XHJcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKGJvYXJkKTtcclxuICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZChcInRhYmxlXCIpO1xyXG4gICAgICAgIGJvYXJkLnNldEF0dHJpYnV0ZShcImlkXCIgLCBcImJvYXJkXCIpO1xyXG4gICAgICAgIGxldCB3aG9zVHVybiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgd2hvc1R1cm4uY2xhc3NMaXN0LmFkZChcInBsYXllci10dXJuXCIpO1xyXG4gICAgICAgIHdob3NUdXJuLnNldEF0dHJpYnV0ZShcImlkXCIsIFwicGxheWVyLXR1cm5cIik7XHJcbiAgICAgICAgd2hvc1R1cm4uaW5uZXJIVE1MID0gXCJQbGF5ZXIgMSdzIFR1cm5cIjtcclxuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQod2hvc1R1cm4pO1xyXG4gICAgICAgIGxldCBjbnRybERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgY250cmxEaXYuY2xhc3NMaXN0LmFkZChcImNvbnRyb2xsZXItZGl2XCIpO1xyXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChjbnRybERpdik7XHJcbiAgICAgICAgbGV0IHdhbGxDb3VudGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICB3YWxsQ291bnRlckRpdi5jbGFzc0xpc3QuYWRkKFwid2FsbC1jb3VudGVyLWRpdlwiKTtcclxuICAgICAgICB3YWxsQ291bnRlckRpdi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIndhbGwtY291bnRlclwiKTtcclxuICAgICAgICBsZXQgcGxheWVyMVdhbGxzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBsZXQgcGxheWVyMldhbGxzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBwbGF5ZXIxV2FsbHMuY2xhc3NMaXN0LmFkZChcIndhbGwtY291bnRlclwiKTtcclxuICAgICAgICBwbGF5ZXIyV2FsbHMuY2xhc3NMaXN0LmFkZChcIndhbGwtY291bnRlclwiKTtcclxuICAgICAgICBwbGF5ZXIxV2FsbHMuaW5uZXJIVE1MID0gXCJwbGF5ZXIgMSBoYXMgMTAgd2FsbHMgbGVmdFwiO1xyXG4gICAgICAgIHBsYXllcjJXYWxscy5pbm5lckhUTUwgPSBcInBsYXllciAyIGhhcyAxMCB3YWxscyBsZWZ0XCI7XHJcbiAgICAgICAgd2FsbENvdW50ZXJEaXYuYXBwZW5kQ2hpbGQocGxheWVyMVdhbGxzKTtcclxuICAgICAgICB3YWxsQ291bnRlckRpdi5hcHBlbmRDaGlsZChwbGF5ZXIyV2FsbHMpO1xyXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZCh3YWxsQ291bnRlckRpdik7XHJcblxyXG4gICAgICAgIC8vYnVpbGQgd2FsbHMgYnV0dG9uXHJcbiAgICAgICAgdGhpcy5jcmVhdGVCdXR0b24oXCJQbGFjZSBhIHdhbGxcIik7XHJcbiAgICAgICAgLy9tb3ZlbWVudCBidXR0b25cclxuICAgICAgICB0aGlzLmNyZWF0ZUJ1dHRvbihcIk1vdmUgY2hhcmFjdGVyXCIpO1xyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgLyogaW5zdHJ1Y3Rpb24gZm9yIGNsaWNraW5nIHNxdWFyZXMgKi9cclxuICAgICAgICBsZXQgY2xpY2tJbnN0cnVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgICAgIGNsaWNrSW5zdHJ1Y3QuY2xhc3NMaXN0LmFkZChcImNsaWNrSW5zdHJ1Y3RcIik7XHJcbiAgICAgICAgY2xpY2tJbnN0cnVjdC5pbm5lckhUTUwgPSBcIkNsaWNrIHR3byBkaXN0aW5jdCBzcXVhcmVzLi4uXCJcclxuICAgICAgICBjbGlja0luc3RydWN0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xyXG4gICAgICAgIGNudHJsRGl2LmFwcGVuZENoaWxkKGNsaWNrSW5zdHJ1Y3QpO1xyXG4gICAgICAgIC8qIHdhbGwgdHlwZSBidXR0b25zICovXHJcbiAgICAgICAgbGV0IG5vcnRoID0gdGhpcy5jcmVhdGVCdXR0b24oXCJOb3J0aFwiKTtcclxuICAgICAgICBsZXQgZWFzdCA9IHRoaXMuY3JlYXRlQnV0dG9uKFwiRWFzdFwiKTtcclxuICAgICAgICBsZXQgc291dGggPSB0aGlzLmNyZWF0ZUJ1dHRvbihcIlNvdXRoXCIpO1xyXG4gICAgICAgIGxldCB3ZXN0ID0gdGhpcy5jcmVhdGVCdXR0b24oXCJXZXN0XCIpO1xyXG4gICAgICAgIG5vcnRoLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIsIFwibm9ydGhcIik7XHJcbiAgICAgICAgZWFzdC5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiLCBcImVhc3RcIik7XHJcbiAgICAgICAgc291dGguY2xhc3NMaXN0LmFkZChcImhpZGVcIiwgXCJzb3V0aFwiKTtcclxuICAgICAgICB3ZXN0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIsIFwid2VzdFwiKTtcclxuICAgICAgICBjbnRybERpdi5hcHBlbmRDaGlsZChub3J0aCk7XHJcbiAgICAgICAgY250cmxEaXYuYXBwZW5kQ2hpbGQoc291dGgpO1xyXG4gICAgICAgIGNudHJsRGl2LmFwcGVuZENoaWxkKHdlc3QpO1xyXG4gICAgICAgIGNudHJsRGl2LmFwcGVuZENoaWxkKGVhc3QpO1xyXG5cclxuICAgICAgICBmb3IobGV0IHJvd0lkeCA9IDA7IHJvd0lkeCA8IDEwOyByb3dJZHgrKykge1xyXG4gICAgICAgICAgICBsZXQgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XHJcbiAgICAgICAgICAgIGZvcihsZXQgY29sSWR4ID0gMDsgY29sSWR4IDwgMTA7IGNvbElkeCsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhcIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgICAgICBpZihyb3dJZHggPT09IDAgJiYgY29sSWR4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGguaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIHRyLmFwcGVuZENoaWxkKHRoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm93SWR4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGguaW5uZXJIVE1MID0gY29sSWR4IC0gMVxyXG4gICAgICAgICAgICAgICAgICAgIHRyLmFwcGVuZENoaWxkKHRoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm93SWR4ID4gMCAmJiBjb2xJZHggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aC5pbm5lckhUTUwgPSByb3dJZHggLSAxXHJcbiAgICAgICAgICAgICAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZC5pZCA9IGAke3Jvd0lkeCAtIDF9JHtjb2xJZHggLSAxfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGQuY2xhc3NMaXN0LmFkZChcImZsb29yXCIsIFwiaGFsbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0ci5hcHBlbmRDaGlsZCh0ZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQodHIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHYW1lVmlldzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2dhbWVfdmlldy5qc1wiKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=