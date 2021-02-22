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
        this.game.computerAiTurn();
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
            // for(let i = 0; i < this.neighbors.length; i++) {
            //     document.getElementById(this.neighbors[i].join("")).classList.add("highlight");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9xdW9yaWRvci8uL3NyYy9nYW1lX3ZpZXcuanMiLCJ3ZWJwYWNrOi8vcXVvcmlkb3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcXVvcmlkb3Ivd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBMkIsNEJBQTRCO0FBQ3ZELGdDQUFnQyxtQ0FBbUM7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsdUJBQXVCO0FBQzNFLG9EQUFvRCx1QkFBdUI7QUFDM0U7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUE4RCx3QkFBd0I7QUFDdEY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlFQUF5RSxnQkFBZ0I7QUFDekY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCxZQUFZOztBQUV6RTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGdDQUFnQztBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsSzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLDJCQUEyQjtBQUN4RDtBQUNBO0FBQ0EsNkJBQTZCLDJCQUEyQjtBQUN4RDtBQUNBO0FBQ0EsMkNBQTJDOztBQUUzQyxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QiwyQkFBMkI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QixrQkFBa0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsR0FBRztBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkIsYUFBYTtBQUN4QztBQUNBLCtCQUErQixhQUFhO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLCtCQUErQixXQUFXLEVBQUUsV0FBVztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBCOzs7Ozs7VUN2V0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7OztVQ3JCQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJnYW1ldmlldy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmNsYXNzIEdhbWVWaWV3IHtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWUpIHtcclxuICAgICAgICB0aGlzLmJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcclxuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgICAgIHRoaXMuYm9hcmQgPSB0aGlzLmdhbWUuYm9hcmQ7XHJcbiAgICAgICAgdGhpcy5ncmlkID0gdGhpcy5ib2FyZC5ncmlkO1xyXG4gICAgICAgIHRoaXMuc3F1YXJlQSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zcXVhcmVCID0gbnVsbDtcclxuICAgICAgICB0aGlzLm5laWdoYm9ycyA9IG51bGw7ICBcclxuICAgICAgICB0aGlzLmF2YWlsYWJsZU1vdmVzID0gW107XHJcblxyXG4gICAgICAgIHRoaXMuc2V0dXBCb2FyZCgpO1xyXG4gICAgICAgIHRoaXMuc2V0dXBFdmVudExpc3RlbmVycygpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3coKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lLmNvbXB1dGVyQWlUdXJuKCk7XHJcbiAgICAgICAgdGhpcy5zaG93Qm9hcmQoKTtcclxuICAgICAgICBpZiAodGhpcy5nYW1lLmlzT3ZlcigpKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuY3VycmVudFBsYXllciA9PT0gXCJwbGF5ZXIyXCIpIGNvbnNvbGUubG9nKFwiUExBWUVSIDEgSVMgVEhFIFdJTk5FUlwiKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5jdXJyZW50UGxheWVyID09PSBcInBsYXllcjFcIikgY29uc29sZS5sb2coXCJQTEFZRVIgMiBJUyBUSEUgV0lOTkVSXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93Qm9hcmQoKSB7XHJcbiAgICAgICAgZm9yKGxldCByb3dJZHggPSAwOyByb3dJZHggIDwgdGhpcy5ncmlkLmxlbmd0aDsgcm93SWR4KyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgY29sSWR4ID0gMDsgY29sSWR4IDwgdGhpcy5ncmlkW3Jvd0lkeF0ubGVuZ3RoOyBjb2xJZHgrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNxdWFyZSA9IHRoaXMuZ3JpZFtyb3dJZHhdW2NvbElkeF07XHJcbiAgICAgICAgICAgICAgICBsZXQgaWQgPSAocm93SWR4KS50b1N0cmluZygpICsgKGNvbElkeCkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIGxldCBlbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcbiAgICAgICAgICAgICAgICBpZihzcXVhcmUucGxheWVyID09PSBcInBsYXllcjFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QuYWRkKFwicGxheWVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5pbm5lckhUTUwgPSBcIiYjeDI2NUZcIjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihzcXVhcmUucGxheWVyID09PSBcInBsYXllcjJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QuYWRkKFwicGxheWVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5pbm5lckhUTUwgPSBcIiYjeDI2NTlcIjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlLmNsYXNzTGlzdC5yZW1vdmUoXCJwbGF5ZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlLmlubmVySFRNTCA9IFwiIFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLyogdXBkYXRlIHdhbGxzICovXHJcbiAgICAgICAgICAgICAgICBpZiAoISFzcXVhcmUud2FsbHMuTm9ydGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGUuY2xhc3NMaXN0LnJlbW92ZSgnaGFsbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QuYWRkKCd3YWxsLXRvcCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCEhc3F1YXJlLndhbGxzLkVhc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGUuY2xhc3NMaXN0LnJlbW92ZSgnaGFsbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QuYWRkKCd3YWxsLXJpZ2h0Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoISFzcXVhcmUud2FsbHMuU291dGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGUuY2xhc3NMaXN0LnJlbW92ZSgnaGFsbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QuYWRkKCd3YWxsLWJvdHRvbScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCEhc3F1YXJlLndhbGxzLldlc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGUuY2xhc3NMaXN0LnJlbW92ZSgnaGFsbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QuYWRkKCd3YWxsLWxlZnQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgd2FsbENvdW50ZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIndhbGwtY291bnRlclwiKTtcclxuICAgICAgICBsZXQgYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJQbGFjZSBhIHdhbGxcIik7XHJcbiAgICAgICAgd2FsbENvdW50ZXJzWzBdLmlubmVySFRNTCA9IGBwbGF5ZXIgMSBoYXMgJHt0aGlzLmdhbWUucGxheWVyMVdhbGxzfSB3YWxscyBsZWZ0YFxyXG4gICAgICAgIHdhbGxDb3VudGVyc1sxXS5pbm5lckhUTUwgPSBgcGxheWVyIDIgaGFzICR7dGhpcy5nYW1lLnBsYXllcjJXYWxsc30gd2FsbHMgbGVmdGBcclxuICAgICAgICBpZiAoKHRoaXMuZ2FtZS5jdXJyZW50UGxheWVyID09PSBcInBsYXllcjFcIikgJiYgKHRoaXMuZ2FtZS5wbGF5ZXIxV2FsbHMgPT09IDApKSB7XHJcbiAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCh0aGlzLmdhbWUuY3VycmVudFBsYXllciA9PT0gXCJwbGF5ZXIyXCIpICYmICh0aGlzLmdhbWUucGxheWVyMldhbGxzID09PSAwKSl7XHJcbiAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lLnN0YXRlID09PSBcIm5vdCBkb2luZyBhbnl0aGluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYnRuLmNsYXNzTGlzdC5jb250YWlucyhcImhpZGVcIikpIGJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci10dXJuXCIpLmlubmVySFRNTCA9IGAke3RoaXMuZ2FtZS5jdXJyZW50UGxheWVyfSdzIHR1cm5gO1xyXG4gICAgfVxyXG5cclxuICAgIHNldHVwRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICAgICAgdGhpcy5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgbGV0IGNvZGUgPSBldmVudC5jb2RlO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZ2FtZS5wbGFjaW5nV2FsbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKChjb2RlID09PSBcIkFycm93VXBcIikgfHwgKGNvZGUgPT09IFwiQXJyb3dSaWdodFwiKSB8fCAoY29kZSA9PT0gXCJBcnJvd0Rvd25cIikgfHwgKGNvZGUgPT09IFwiQXJyb3dMZWZ0XCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnRha2VUdXJuKFwibW92ZVwiLCBjb2RlLnNwbGl0KFwiQXJyb3dcIilbMV0udG9Mb3dlckNhc2UoKSwgZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoY29kZSA9PT0gXCJTcGFjZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuZmluZFBhdGgoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAvKiBcclxuVGhlIGNsaWNrIGV2ZW50IGlzIHVzZWQgZm9yIGEgc3RhdGUgbWFjaGluZS5cclxuRGVwZW5kaW5nIG9uIHRoZSBzdGF0ZSBvZiBwbGFjaW5nIGEgd2FsbCBkaWN0YXRlc1xyXG53aGF0IHdpbGwgaGFwcGVuIHdoZW4gYSBjbGljayBldmVudCB0cmlnZ2Vycy5cclxuU3RhdGUgaXMgc3RvcmVkIGluIHRoaXMuZ2FtZS5zdGF0ZSBcclxuU3RhdGUgTWFjaGluZSBpczpcclxuW3AxIG5vdCBkb2luZyBhbnl0aGluZ10gPT0gY2xpY2tzIFBsYWNlIGEgd2FsbCA+PiBbc2VsZWN0aW5nIHNxdWFyZXNdID0+IFtzZWxlY3Rpbmcgd2FsbCB0eXBlXSA9PiBbcDEgbm90IGRvaW5nIGFueXRoaW5nXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7d2FsbCBpcyBjcmVhdGVkfSA9PiBbcDIgbm90IGRvaW5nIGFueXRoaW5nXVxyXG4hISB1bmRldmVsb3BlZCAhIVxyXG5QbGF5ZXIgbW92ZW1lbnQgd2lsbCBiZSBpbnRlZ3JhdGVkIGludG8gdGhlIHN0YXRlIG1hY2hpbmUgYXMgd2VsbFxyXG4qKiogbWF5YmUgY2hhbmdlIFtub3QgZG9pbmcgYW55dGhpbmddIHRvIFtub3QgZG9pbmcgYW55dGhpbmddXHJcblxyXG5bcDEgbm90IGRvaW5nIGFueXRoaW5nXSA9PSBjbGlja3MgTW92ZSBjaGFyYWN0ZXIgPj4gW3NlbGVjdGluZyBkZXNpcmVkIG1vdmVdID0+IFtwMSBub3QgZG9pbmcgYW55dGhpbmddXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFwvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHttb3ZlIHBsYXllcn0gPT4gW3AyIG5vdCBkb2luZyBhbnl0aGluZ11cclxuXHJcbiAgICAgICAgICAgICovIFxyXG5cclxuICAgICAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5nYW1lLnN0YXRlO1xyXG4gICAgICAgICAgICBsZXQgY2xhc3NMaXN0ID0gZXZlbnQudGFyZ2V0LmNsYXNzTGlzdDtcclxuICAgICAgICAgICAgbGV0IGlubmVySFRNTCA9IGV2ZW50LnRhcmdldC5pbm5lckhUTUw7XHJcbiAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gXCJub3QgZG9pbmcgYW55dGhpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNsYXNzTGlzdC5jb250YWlucyhcImJ1dHRvblwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGlubmVySFRNTCA9PT0gXCJQbGFjZSBhIHdhbGxcIikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVQbGFjZVdhbGxCdXR0b24oZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaW5uZXJIVE1MID09PSBcIk1vdmUgY2hhcmFjdGVyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlbWVudEJ1dHRvbihldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc3RhdGUgPT09IFwic2VsZWN0aW5nIHNxdWFyZXNcIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNsYXNzTGlzdC5jb250YWlucyhcImZsb29yXCIpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlU3F1YXJlQ2xpY2soZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBpZiAoc3RhdGUgPT09IFwic2VsZWN0aW5nIHdhbGwgdHlwZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2xhc3NMaXN0LmNvbnRhaW5zKFwiYnV0dG9uXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoKGlubmVySFRNTCA9PT0gXCJOb3J0aFwiKSB8fCAoaW5uZXJIVE1MID09PSBcIkVhc3RcIilcclxuICAgICAgICAgICAgICAgICAgICAgICB8fCAoaW5uZXJIVE1MID09PSBcIlNvdXRoXCIpIHx8IChpbm5lckhUTUwgPT09IFwiV2VzdFwiKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVXYWxsVHlwZUJ1dHRvbihpbm5lckhUTUwsIGV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHN0YXRlID09PSBcInNlbGVjdGluZyBkZXNpcmVkIG1vdmVcIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXZhaWxhYmxlTW92ZXMuaW5jbHVkZXMoZXZlbnQudGFyZ2V0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS50YWtlVHVybihcIm1vdmVcIiwgbnVsbCwgZXZlbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmF2YWlsYWJsZU1vdmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXZhaWxhYmxlTW92ZXNbaV0uY2xhc3NMaXN0LnJlbW92ZShcImhpZ2hsaWdodFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnN0YXRlID0gXCJub3QgZG9pbmcgYW55dGhpbmdcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF2YWlsYWJsZU1vdmVzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgZmFsc2UpO1xyXG4gICAgfSBcclxuXHJcbiAgICBoYW5kbGVQbGFjZVdhbGxCdXR0b24oZXZlbnQpIHtcclxuICAgICAgICAvLyBkZWxldGUgYnRuIGVsZW1lbnQgYW5kIHJlcGxhY2Ugd2l0aCBpbnN0cnVjdGlvbnMgdG9cclxuICAgICAgICAvLyBjbGljayB0d28gZGlzdGluY3Qgc3F1YXJlc1xyXG4gICAgICAgIHRoaXMuZ2FtZS5zdGF0ZSA9IFwic2VsZWN0aW5nIHNxdWFyZXNcIjtcclxuICAgICAgICBsZXQgYnRuID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgIHRoaXMuYm9keS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY2xpY2tJbnN0cnVjdFwiKVswXS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIk1vdmUgY2hhcmFjdGVyXCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xyXG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVTcXVhcmVDbGljayhldmVudCkge1xyXG4gICAgICAgIC8vd2FpdCBmb3IgY2xpZW50IHRvIGNsaWNrIHR3byB2YWxpZCBzcXVhcmVzXHJcbiAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuXHJcbiAgICAgICAgaWYgKCh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZmxvb3JcIikpICYmICh0aGlzLnNxdWFyZUEgPT09IG51bGwpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3F1YXJlQSA9IHRhcmdldC5pZDtcclxuICAgICAgICAgICAgLy9wYXJzZSBzcXVhcmVBXHJcbiAgICAgICAgICAgIC8vIHNxdWFyZUEgPSBcIjAwXCIgYW5kIG5lZWRzIHRvIGJlIFswLCAwXVxyXG4gICAgICAgICAgICBsZXQgc3F1YXJlID0gdGhpcy5zcXVhcmVBLnNwbGl0KFwiXCIpO1xyXG4gICAgICAgICAgICBzcXVhcmVbMF0gPSBwYXJzZUludChzcXVhcmVbMF0pO1xyXG4gICAgICAgICAgICBzcXVhcmVbMV0gPSBwYXJzZUludChzcXVhcmVbMV0pO1xyXG4gICAgICAgICAgICAvL2dldCBuZWlnaGJvcnNcclxuICAgICAgICAgICAgLy8gcmV0dXJucyBbW25vcnRoXSxbZWFzdF0sW3NvdXRoXSxbd2VzdF1dXHJcbiAgICAgICAgICAgIHRoaXMubmVpZ2hib3JzID0gdGhpcy5ib2FyZC5jaGVja05laWdoYm9ycyhzcXVhcmUpO1xyXG4gICAgICAgICAgICAvLyBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5uZWlnaGJvcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMubmVpZ2hib3JzW2ldID0gdGhpcy5uZWlnaGJvcnNbaV1bMF0udG9TdHJpbmcoKSArIHRoaXMubmVpZ2hib3JzW2ldWzFdLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgLy8gZm9yKGxldCBpID0gMDsgaSA8IHRoaXMubmVpZ2hib3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLm5laWdoYm9yc1tpXS5qb2luKFwiXCIpKS5jbGFzc0xpc3QuYWRkKFwiaGlnaGxpZ2h0XCIpO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0KHRoaXMubmVpZ2hib3JzKTsgIC8vIE5FRUQgVE8gQ0hBTkdFICBTSE9VTEQgQkUgQSBDTEFTUyBUT0dHTEVcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmICgodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImZsb29yXCIpKSAmJiAodGhpcy5zcXVhcmVBICE9PSBudWxsKSAmJiAodGhpcy5zcXVhcmVCID09PSBudWxsKSkge1xyXG4gICAgICAgICAgICBpZighIXRoaXMubmVpZ2hib3JzLmluY2x1ZGVzKHRhcmdldC5pZCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3F1YXJlQiA9IHRhcmdldC5pZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3F1YXJlQSAhPT0gbnVsbCAmJiB0aGlzLnNxdWFyZUIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgLy8gc2hvdWxkIGNyZWF0ZSB0d28gYnV0dG9ucyBkZXBlbmRpbmcgb24gc3F1YXJlQSBhbmQgc3F1YXJlQiBvcmllbnRhdGlvblxyXG4gICAgICAgICAgICB0aGlzLmJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNsaWNrSW5zdHJ1Y3RcIilbMF0uY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZih0aGlzLnNxdWFyZUEuc3BsaXQoXCJcIilbMF0gPT09IHRoaXMuc3F1YXJlQi5zcGxpdChcIlwiKVswXSkge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5zcXVhcmVBLnNwbGl0KFwiXCIpWzBdID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm9keS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibm9ydGhcIilbMF0uY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNxdWFyZUEuc3BsaXQoXCJcIilbMF0gPCA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzb3V0aFwiKVswXS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLnNxdWFyZUEuc3BsaXQoXCJcIilbMV0gPT09IHRoaXMuc3F1YXJlQi5zcGxpdChcIlwiKVsxXSkge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5zcXVhcmVBLnNwbGl0KFwiXCIpWzFdID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm9keS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwid2VzdFwiKVswXS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc3F1YXJlQS5zcGxpdChcIlwiKVsxXSA8IDgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImVhc3RcIilbMF0uY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5nYW1lLnN0YXRlID0gXCJzZWxlY3Rpbmcgd2FsbCB0eXBlXCI7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVXYWxsVHlwZUJ1dHRvbihkaXIsIGV2ZW50KSB7XHJcbiAgICAgICAgLyogXHJcbiAgICAgICAgY2FsbHMgdGhpcy5nYW1lLnRha2VUdXJuKGFjdGlvbiwgZGlyLCBldmVudCk7XHJcbiAgICAgICAgc2hvdWxkIHJlbW92ZSB3YWxsIHR5cGUgYnV0dG9ucyBhbmQgYWRkIHBsYWNlIGEgd2FsbCBidXR0b25cclxuICAgICAgICBzd2l0Y2ggc3RhdGUgYmFjayB0byBub3QgZG9pbmcgYW55dGhpbmcgaGVyZT8/P1xyXG4gICAgICAgIG9yIGluIHRoaXMuZ2FtZVxyXG4gICAgICAgIFdIRVJFIERPRVMgV0FMTCBQTEFDRU1FTlQgVkFMSURBVElPTiBIQVBQRU4/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/XHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmdhbWUudGFrZVR1cm4oXCJwbGFjZVdhbGxcIiwgZGlyLCBldmVudCwgdGhpcy5zcXVhcmVBLCB0aGlzLnNxdWFyZUIpO1xyXG4gICAgICAgIHRoaXMuYm9keS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibm9ydGhcIilbMF0uY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XHJcbiAgICAgICAgdGhpcy5ib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJlYXN0XCIpWzBdLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xyXG4gICAgICAgIHRoaXMuYm9keS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic291dGhcIilbMF0uY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XHJcbiAgICAgICAgdGhpcy5ib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ3ZXN0XCIpWzBdLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xyXG4gICAgICAgIHRoaXMuYm9keS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYnV0dG9uXCIpWzBdLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiTW92ZSBjaGFyYWN0ZXJcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XHJcbiAgICAgICAgdGhpcy5zcXVhcmVBID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNxdWFyZUIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5zdGF0ZSA9IFwibm90IGRvaW5nIGFueXRoaW5nXCI7XHJcbiAgICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlTW92ZW1lbnRCdXR0b24oZXZlbnQpIHtcclxuICAgICAgICBsZXQgYXZhaWxhYmxlTW92ZXM7XHJcbiAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuZ2FtZS5jdXJyZW50UGxheWVyID09PSBcInBsYXllcjFcIiA/IHRoaXMuZ2FtZS5wbGF5ZXIxIDogdGhpcy5nYW1lLnBsYXllcjI7XHJcbiAgICAgICAgbGV0IHJvd0lkeCA9IHBhcnNlSW50KHBsYXllclswXSk7XHJcbiAgICAgICAgbGV0IGNvbElkeCA9IHBhcnNlSW50KHBsYXllclsxXSk7XHJcbiAgICAgICAgYXZhaWxhYmxlTW92ZXMgPSB0aGlzLmdhbWUuZ2V0QXZhaWxhYmxlTW92ZXMoW3Jvd0lkeCwgY29sSWR4XSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdmFpbGFibGVNb3Zlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYXZhaWxhYmxlTW92ZXNbaV0uam9pbihcIlwiKSk7XHJcbiAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QuYWRkKFwiaGlnaGxpZ2h0XCIpO1xyXG4gICAgICAgICAgICB0aGlzLmF2YWlsYWJsZU1vdmVzLnB1c2goZWxlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyogc2V0IHRoZSBzdGF0ZSB0byBjaGVjayBpZiBhbiBhdmFpbGFibGUgbW92ZSBzcXVhcmUgaXMgY2xpY2tlZC4gKi9cclxuICAgICAgICB0aGlzLmdhbWUuc3RhdGUgPSBcInNlbGVjdGluZyBkZXNpcmVkIG1vdmVcIjtcclxuICAgIH1cclxuXHJcbiAgICBoaWdobGlnaHQoYXJyYXkpIHtcclxuICAgICAgICAvL2hpZ2hsaWdodCBhbmQgYWxzbyBjaGFuZ2VzIHRoaXMubmVpZ2hib3JzIHRvIGJlIGFibGUgdG8gYmUgcmVhZCBhcyBhbiBhcnJheSBvZiBzdHJpbmdzXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvLyBhcnJheVtpXVswXSA9IGFycmF5W2ldWzBdO1xyXG4gICAgICAgICAgICAvLyBhcnJheVtpXVsxXSA9IGFycmF5W2ldWzFdO1xyXG4gICAgICAgICAgICBsZXQgaWQgPSBhcnJheVtpXS5qb2luKFwiXCIpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHRoaXMubmVpZ2hib3JzW2ldID0gaWQ7XHJcbiAgICAgICAgICAgIGxldCBlbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtpZH1gKTtcclxuICAgICAgICAgICAgaWYgKGVsZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gZWxlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiZ3JlZW5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVCdXR0b24oaW5uZXJUZXh0KSB7XHJcbiAgICAgICAgbGV0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgYnRuLmlubmVySFRNTCA9IGlubmVyVGV4dFxyXG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdidXR0b24nKTtcclxuICAgICAgICBidG4uc2V0QXR0cmlidXRlKFwiaWRcIiwgaW5uZXJUZXh0KTtcclxuICAgICAgICB0aGlzLmJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNvbnRyb2xsZXItZGl2XCIpWzBdLmFwcGVuZENoaWxkKGJ0bik7XHJcbiAgICAgICAgcmV0dXJuIGJ0bjtcclxuICAgIH1cclxuXHJcbiAgICBzZXR1cEJvYXJkKCkge1xyXG4gICAgICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgICAgIGxldCBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcclxuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoYm9hcmQpO1xyXG4gICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKFwidGFibGVcIik7XHJcbiAgICAgICAgYm9hcmQuc2V0QXR0cmlidXRlKFwiaWRcIiAsIFwiYm9hcmRcIik7XHJcbiAgICAgICAgbGV0IHdob3NUdXJuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICB3aG9zVHVybi5jbGFzc0xpc3QuYWRkKFwicGxheWVyLXR1cm5cIik7XHJcbiAgICAgICAgd2hvc1R1cm4uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJwbGF5ZXItdHVyblwiKTtcclxuICAgICAgICB3aG9zVHVybi5pbm5lckhUTUwgPSBcIlBsYXllciAxJ3MgVHVyblwiO1xyXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZCh3aG9zVHVybik7XHJcbiAgICAgICAgbGV0IGNudHJsRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBjbnRybERpdi5jbGFzc0xpc3QuYWRkKFwiY29udHJvbGxlci1kaXZcIik7XHJcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKGNudHJsRGl2KTtcclxuICAgICAgICBsZXQgd2FsbENvdW50ZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIHdhbGxDb3VudGVyRGl2LmNsYXNzTGlzdC5hZGQoXCJ3YWxsLWNvdW50ZXItZGl2XCIpO1xyXG4gICAgICAgIHdhbGxDb3VudGVyRGl2LnNldEF0dHJpYnV0ZShcImlkXCIsIFwid2FsbC1jb3VudGVyXCIpO1xyXG4gICAgICAgIGxldCBwbGF5ZXIxV2FsbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGxldCBwbGF5ZXIyV2FsbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIHBsYXllcjFXYWxscy5jbGFzc0xpc3QuYWRkKFwid2FsbC1jb3VudGVyXCIpO1xyXG4gICAgICAgIHBsYXllcjJXYWxscy5jbGFzc0xpc3QuYWRkKFwid2FsbC1jb3VudGVyXCIpO1xyXG4gICAgICAgIHBsYXllcjFXYWxscy5pbm5lckhUTUwgPSBcInBsYXllciAxIGhhcyAxMCB3YWxscyBsZWZ0XCI7XHJcbiAgICAgICAgcGxheWVyMldhbGxzLmlubmVySFRNTCA9IFwicGxheWVyIDIgaGFzIDEwIHdhbGxzIGxlZnRcIjtcclxuICAgICAgICB3YWxsQ291bnRlckRpdi5hcHBlbmRDaGlsZChwbGF5ZXIxV2FsbHMpO1xyXG4gICAgICAgIHdhbGxDb3VudGVyRGl2LmFwcGVuZENoaWxkKHBsYXllcjJXYWxscyk7XHJcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKHdhbGxDb3VudGVyRGl2KTtcclxuXHJcbiAgICAgICAgLy9idWlsZCB3YWxscyBidXR0b25cclxuICAgICAgICB0aGlzLmNyZWF0ZUJ1dHRvbihcIlBsYWNlIGEgd2FsbFwiKTtcclxuICAgICAgICAvL21vdmVtZW50IGJ1dHRvblxyXG4gICAgICAgIHRoaXMuY3JlYXRlQnV0dG9uKFwiTW92ZSBjaGFyYWN0ZXJcIik7XHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAvKiBpbnN0cnVjdGlvbiBmb3IgY2xpY2tpbmcgc3F1YXJlcyAqL1xyXG4gICAgICAgIGxldCBjbGlja0luc3RydWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICAgICAgY2xpY2tJbnN0cnVjdC5jbGFzc0xpc3QuYWRkKFwiY2xpY2tJbnN0cnVjdFwiKTtcclxuICAgICAgICBjbGlja0luc3RydWN0LmlubmVySFRNTCA9IFwiQ2xpY2sgdHdvIGRpc3RpbmN0IHNxdWFyZXMuLi5cIlxyXG4gICAgICAgIGNsaWNrSW5zdHJ1Y3QuY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XHJcbiAgICAgICAgY250cmxEaXYuYXBwZW5kQ2hpbGQoY2xpY2tJbnN0cnVjdCk7XHJcbiAgICAgICAgLyogd2FsbCB0eXBlIGJ1dHRvbnMgKi9cclxuICAgICAgICBsZXQgbm9ydGggPSB0aGlzLmNyZWF0ZUJ1dHRvbihcIk5vcnRoXCIpO1xyXG4gICAgICAgIGxldCBlYXN0ID0gdGhpcy5jcmVhdGVCdXR0b24oXCJFYXN0XCIpO1xyXG4gICAgICAgIGxldCBzb3V0aCA9IHRoaXMuY3JlYXRlQnV0dG9uKFwiU291dGhcIik7XHJcbiAgICAgICAgbGV0IHdlc3QgPSB0aGlzLmNyZWF0ZUJ1dHRvbihcIldlc3RcIik7XHJcbiAgICAgICAgbm9ydGguY2xhc3NMaXN0LmFkZChcImhpZGVcIiwgXCJub3J0aFwiKTtcclxuICAgICAgICBlYXN0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIsIFwiZWFzdFwiKTtcclxuICAgICAgICBzb3V0aC5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiLCBcInNvdXRoXCIpO1xyXG4gICAgICAgIHdlc3QuY2xhc3NMaXN0LmFkZChcImhpZGVcIiwgXCJ3ZXN0XCIpO1xyXG4gICAgICAgIGNudHJsRGl2LmFwcGVuZENoaWxkKG5vcnRoKTtcclxuICAgICAgICBjbnRybERpdi5hcHBlbmRDaGlsZChzb3V0aCk7XHJcbiAgICAgICAgY250cmxEaXYuYXBwZW5kQ2hpbGQod2VzdCk7XHJcbiAgICAgICAgY250cmxEaXYuYXBwZW5kQ2hpbGQoZWFzdCk7XHJcblxyXG4gICAgICAgIGZvcihsZXQgcm93SWR4ID0gMDsgcm93SWR4IDwgMTA7IHJvd0lkeCsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcclxuICAgICAgICAgICAgZm9yKGxldCBjb2xJZHggPSAwOyBjb2xJZHggPCAxMDsgY29sSWR4KyspIHtcclxuICAgICAgICAgICAgICAgIGxldCB0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcclxuICAgICAgICAgICAgICAgIGxldCB0ZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICAgICAgICAgIGlmKHJvd0lkeCA9PT0gMCAmJiBjb2xJZHggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aC5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJZHggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aC5pbm5lckhUTUwgPSBjb2xJZHggLSAxXHJcbiAgICAgICAgICAgICAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJZHggPiAwICYmIGNvbElkeCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoLmlubmVySFRNTCA9IHJvd0lkeCAtIDFcclxuICAgICAgICAgICAgICAgICAgICB0ci5hcHBlbmRDaGlsZCh0aCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRkLmlkID0gYCR7cm93SWR4IC0gMX0ke2NvbElkeCAtIDF9YDtcclxuICAgICAgICAgICAgICAgICAgICB0ZC5jbGFzc0xpc3QuYWRkKFwiZmxvb3JcIiwgXCJoYWxsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRyLmFwcGVuZENoaWxkKHRkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBib2FyZC5hcHBlbmRDaGlsZCh0cik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVWaWV3OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvZ2FtZV92aWV3LmpzXCIpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==