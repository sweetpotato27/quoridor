/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Util)
/* harmony export */ });
class Util {
    constructor() {
        this.map = new Map();
    }

    trackFunctions(key) {
        if(this.map[key] === undefined) {
            this.map.set(key, 1);
            return;
        }
        if (this.map[key] === 0) {
            this.map.set(key, 1);
            return;
        }
        return;
    }

}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameView)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.js");


class GameView {
    constructor(socket, room, game) {
        this.socket = socket;
        this.room = room;
        this.body = document.querySelector("body");
        this.game = game;
        this.board = this.game.board;
        this.grid = this.board.grid;
        this.squareA = null;
        this.squareB = null;
        this.neighbors = null;  
        this.availableMoves = [];

        this.winner = null;

        this.util = new _util__WEBPACK_IMPORTED_MODULE_0__.default();
        this.game.util = this.util;
        this.game.board.util = this.util;
        this.setupBoard();
        this.setupEventListeners();
    }

    show() {
        this.util.trackFunctions("show");
        // this.game.computerAiTurn();
        this.showBoard();
        if (this.game.isOver()) {
            if(this.game.currentPlayer !== "noone") {
                if (!this.winner) {
                    if (this.game.currentPlayer === this.game.player2ID) this.winner = this.room.player1;
                    if (this.game.currentPlayer === this.game.player1ID) this.winner = this.room.player2;
                    this.socket.emit('winner', this.room.id, this.winner);
                    // let table = document.getElementsByClassName("table")[0];
                    // this.createRestartDiv(table, winner);
                    // this.game.currentPlayer = "noone";
                    // this.showBoard();
                    // table.remove();
                    // let restart = document.createElement("div");
        
                    // location.reload();
                }
            }
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
                if(square.player === this.game.player1ID) {
                    ele.classList.add("player");
                    ele.innerHTML = "&#x265F";
                } else if(square.player === this.game.player2ID) {
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
        if ((this.game.currentPlayer === this.game.player1ID) && (this.game.player1Walls === 0)) {
            btn.classList.add("hide");
        } else if ((this.game.currentPlayer === this.game.player2ID) && (this.game.player2Walls === 0)){
            btn.classList.add("hide");
        } else {
            if (this.game.state === "not doing anything") {
                if (btn.classList.contains("hide")) btn.classList.remove("hide");
            }
        }
        const playersTurn = this.game.currentPlayer === this.socket.id ? 'Your' : "Opponent's";
        document.getElementById("player-turn").innerHTML = `${playersTurn} turn`;
    }

    setupEventListeners() {
        this.util.trackFunctions("setupEventListeners");

        this.body.addEventListener("click", (event) => {
            if (this.socket.id === this.game.currentPlayer) {
            // if (true) { // testing purposes
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
            } else {
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

                const A = this.grid[this.squareA.split("")[0]][this.squareA.split("")[1]];
                const B = this.grid[this.squareB.split("")[0]][this.squareB.split("")[1]];
                
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
            let player = this.game.currentPlayer === this.game.player1ID ? this.game.player1 : this.game.player2;
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
        btn.classList.add('controller-btn');
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
        let boardDiv = document.createElement("div");
        this.body.appendChild(div);
        let board = document.createElement("table");
        boardDiv.appendChild(board);
        div.appendChild(boardDiv);
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

        for(let rowIdx = 0; rowIdx < 9; rowIdx++) {
            let tr = document.createElement("tr");
            for(let colIdx = 0; colIdx < 9; colIdx++) {
                let td = document.createElement("td");
                td.id = `${rowIdx}${colIdx}`;
                td.classList.add("floor", "hall");
                tr.appendChild(td);
            }
            board.appendChild(tr);
        }
    }
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9xdW9yaWRvci8uL3NyYy91dGlsLmpzIiwid2VicGFjazovL3F1b3JpZG9yL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3F1b3JpZG9yL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9xdW9yaWRvci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3F1b3JpZG9yL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcXVvcmlkb3IvLi9zcmMvZ2FtZV92aWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDOzs7Ozs7VUNqQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7Ozs7QUNOMEI7O0FBRVg7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QjtBQUNBOztBQUVBOztBQUVBLHdCQUF3QiwwQ0FBSTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Q0E7QUFDQSxpREFBaUQsR0FBRztBQUNwRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxPQUFPO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkIsWUFBWTtBQUN2QztBQUNBLCtCQUErQixZQUFZO0FBQzNDO0FBQ0EsMkJBQTJCLE9BQU8sRUFBRSxPQUFPO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJmaWxlIjoiZ2FtZXZpZXcuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXRpbCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLm1hcCA9IG5ldyBNYXAoKTtcclxuICAgIH1cclxuXHJcbiAgICB0cmFja0Z1bmN0aW9ucyhrZXkpIHtcclxuICAgICAgICBpZih0aGlzLm1hcFtrZXldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5tYXAuc2V0KGtleSwgMSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubWFwW2tleV0gPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5tYXAuc2V0KGtleSwgMSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFV0aWwgZnJvbSAnLi91dGlsJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVWaWV3IHtcclxuICAgIGNvbnN0cnVjdG9yKHNvY2tldCwgcm9vbSwgZ2FtZSkge1xyXG4gICAgICAgIHRoaXMuc29ja2V0ID0gc29ja2V0O1xyXG4gICAgICAgIHRoaXMucm9vbSA9IHJvb207XHJcbiAgICAgICAgdGhpcy5ib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgICAgICB0aGlzLmJvYXJkID0gdGhpcy5nYW1lLmJvYXJkO1xyXG4gICAgICAgIHRoaXMuZ3JpZCA9IHRoaXMuYm9hcmQuZ3JpZDtcclxuICAgICAgICB0aGlzLnNxdWFyZUEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc3F1YXJlQiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5uZWlnaGJvcnMgPSBudWxsOyAgXHJcbiAgICAgICAgdGhpcy5hdmFpbGFibGVNb3ZlcyA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLndpbm5lciA9IG51bGw7XHJcblxyXG4gICAgICAgIHRoaXMudXRpbCA9IG5ldyBVdGlsKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnV0aWwgPSB0aGlzLnV0aWw7XHJcbiAgICAgICAgdGhpcy5nYW1lLmJvYXJkLnV0aWwgPSB0aGlzLnV0aWw7XHJcbiAgICAgICAgdGhpcy5zZXR1cEJvYXJkKCk7XHJcbiAgICAgICAgdGhpcy5zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvdygpIHtcclxuICAgICAgICB0aGlzLnV0aWwudHJhY2tGdW5jdGlvbnMoXCJzaG93XCIpO1xyXG4gICAgICAgIC8vIHRoaXMuZ2FtZS5jb21wdXRlckFpVHVybigpO1xyXG4gICAgICAgIHRoaXMuc2hvd0JvYXJkKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5pc092ZXIoKSkge1xyXG4gICAgICAgICAgICBpZih0aGlzLmdhbWUuY3VycmVudFBsYXllciAhPT0gXCJub29uZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMud2lubmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5jdXJyZW50UGxheWVyID09PSB0aGlzLmdhbWUucGxheWVyMklEKSB0aGlzLndpbm5lciA9IHRoaXMucm9vbS5wbGF5ZXIxO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuY3VycmVudFBsYXllciA9PT0gdGhpcy5nYW1lLnBsYXllcjFJRCkgdGhpcy53aW5uZXIgPSB0aGlzLnJvb20ucGxheWVyMjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvY2tldC5lbWl0KCd3aW5uZXInLCB0aGlzLnJvb20uaWQsIHRoaXMud2lubmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgdGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidGFibGVcIilbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5jcmVhdGVSZXN0YXJ0RGl2KHRhYmxlLCB3aW5uZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuZ2FtZS5jdXJyZW50UGxheWVyID0gXCJub29uZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc2hvd0JvYXJkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGFibGUucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IHJlc3RhcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dCb2FyZCgpIHtcclxuICAgICAgICB0aGlzLnV0aWwudHJhY2tGdW5jdGlvbnMoXCJzaG93Qm9hcmRcIik7XHJcbiAgICAgICAgZm9yKGxldCByb3dJZHggPSAwOyByb3dJZHggIDwgdGhpcy5ncmlkLmxlbmd0aDsgcm93SWR4KyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgY29sSWR4ID0gMDsgY29sSWR4IDwgdGhpcy5ncmlkW3Jvd0lkeF0ubGVuZ3RoOyBjb2xJZHgrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNxdWFyZSA9IHRoaXMuZ3JpZFtyb3dJZHhdW2NvbElkeF07XHJcbiAgICAgICAgICAgICAgICBsZXQgaWQgPSAocm93SWR4KS50b1N0cmluZygpICsgKGNvbElkeCkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIGxldCBlbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcbiAgICAgICAgICAgICAgICBpZihzcXVhcmUucGxheWVyID09PSB0aGlzLmdhbWUucGxheWVyMUlEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlLmNsYXNzTGlzdC5hZGQoXCJwbGF5ZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlLmlubmVySFRNTCA9IFwiJiN4MjY1RlwiO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKHNxdWFyZS5wbGF5ZXIgPT09IHRoaXMuZ2FtZS5wbGF5ZXIySUQpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGUuY2xhc3NMaXN0LmFkZChcInBsYXllclwiKTtcclxuICAgICAgICAgICAgICAgICAgICBlbGUuaW5uZXJIVE1MID0gXCImI3gyNjU5XCI7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QucmVtb3ZlKFwicGxheWVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5pbm5lckhUTUwgPSBcIiBcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8qIHVwZGF0ZSB3YWxscyAqL1xyXG4gICAgICAgICAgICAgICAgaWYgKCEhc3F1YXJlLndhbGxzLk5vcnRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlLmNsYXNzTGlzdC5yZW1vdmUoJ2hhbGwnKTtcclxuICAgICAgICAgICAgICAgICAgICBlbGUuY2xhc3NMaXN0LmFkZCgnd2FsbC10b3AnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghIXNxdWFyZS53YWxscy5FYXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlLmNsYXNzTGlzdC5yZW1vdmUoJ2hhbGwnKTtcclxuICAgICAgICAgICAgICAgICAgICBlbGUuY2xhc3NMaXN0LmFkZCgnd2FsbC1yaWdodCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCEhc3F1YXJlLndhbGxzLlNvdXRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlLmNsYXNzTGlzdC5yZW1vdmUoJ2hhbGwnKTtcclxuICAgICAgICAgICAgICAgICAgICBlbGUuY2xhc3NMaXN0LmFkZCgnd2FsbC1ib3R0b20nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghIXNxdWFyZS53YWxscy5XZXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlLmNsYXNzTGlzdC5yZW1vdmUoJ2hhbGwnKTtcclxuICAgICAgICAgICAgICAgICAgICBlbGUuY2xhc3NMaXN0LmFkZCgnd2FsbC1sZWZ0Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHdhbGxDb3VudGVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ3YWxsLWNvdW50ZXJcIik7XHJcbiAgICAgICAgbGV0IGJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxhY2VcIik7XHJcbiAgICAgICAgd2FsbENvdW50ZXJzWzBdLmlubmVySFRNTCA9IGBwbGF5ZXIgMSBoYXMgJHt0aGlzLmdhbWUucGxheWVyMVdhbGxzfSB3YWxscyBsZWZ0YFxyXG4gICAgICAgIHdhbGxDb3VudGVyc1sxXS5pbm5lckhUTUwgPSBgcGxheWVyIDIgaGFzICR7dGhpcy5nYW1lLnBsYXllcjJXYWxsc30gd2FsbHMgbGVmdGBcclxuICAgICAgICBpZiAoKHRoaXMuZ2FtZS5jdXJyZW50UGxheWVyID09PSB0aGlzLmdhbWUucGxheWVyMUlEKSAmJiAodGhpcy5nYW1lLnBsYXllcjFXYWxscyA9PT0gMCkpIHtcclxuICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHRoaXMuZ2FtZS5jdXJyZW50UGxheWVyID09PSB0aGlzLmdhbWUucGxheWVyMklEKSAmJiAodGhpcy5nYW1lLnBsYXllcjJXYWxscyA9PT0gMCkpe1xyXG4gICAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5zdGF0ZSA9PT0gXCJub3QgZG9pbmcgYW55dGhpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ0bi5jbGFzc0xpc3QuY29udGFpbnMoXCJoaWRlXCIpKSBidG4uY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcGxheWVyc1R1cm4gPSB0aGlzLmdhbWUuY3VycmVudFBsYXllciA9PT0gdGhpcy5zb2NrZXQuaWQgPyAnWW91cicgOiBcIk9wcG9uZW50J3NcIjtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci10dXJuXCIpLmlubmVySFRNTCA9IGAke3BsYXllcnNUdXJufSB0dXJuYDtcclxuICAgIH1cclxuXHJcbiAgICBzZXR1cEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgICAgIHRoaXMudXRpbC50cmFja0Z1bmN0aW9ucyhcInNldHVwRXZlbnRMaXN0ZW5lcnNcIik7XHJcblxyXG4gICAgICAgIHRoaXMuYm9keS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNvY2tldC5pZCA9PT0gdGhpcy5nYW1lLmN1cnJlbnRQbGF5ZXIpIHtcclxuICAgICAgICAgICAgLy8gaWYgKHRydWUpIHsgLy8gdGVzdGluZyBwdXJwb3Nlc1xyXG4gICAgICAgICAgICAgICAgLyogXHJcbiAgICBUaGUgY2xpY2sgZXZlbnQgaXMgdXNlZCBmb3IgYSBzdGF0ZSBtYWNoaW5lLlxyXG4gICAgRGVwZW5kaW5nIG9uIHRoZSBzdGF0ZSBvZiBwbGFjaW5nIGEgd2FsbCBkaWN0YXRlc1xyXG4gICAgd2hhdCB3aWxsIGhhcHBlbiB3aGVuIGEgY2xpY2sgZXZlbnQgdHJpZ2dlcnMuXHJcbiAgICBTdGF0ZSBpcyBzdG9yZWQgaW4gdGhpcy5nYW1lLnN0YXRlIFxyXG4gICAgU3RhdGUgTWFjaGluZSBpczpcclxuICAgIFtwMSBub3QgZG9pbmcgYW55dGhpbmddID09IGNsaWNrcyBQbGFjZSBhIHdhbGwgPj4gW3NlbGVjdGluZyBzcXVhcmVzXSA9PiBbc2VsZWN0aW5nIHdhbGwgdHlwZV0gPT4gW3AxIG5vdCBkb2luZyBhbnl0aGluZ11cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3dhbGwgaXMgY3JlYXRlZH0gPT4gW3AyIG5vdCBkb2luZyBhbnl0aGluZ11cclxuICAgICEhIHVuZGV2ZWxvcGVkICEhXHJcbiAgICBQbGF5ZXIgbW92ZW1lbnQgd2lsbCBiZSBpbnRlZ3JhdGVkIGludG8gdGhlIHN0YXRlIG1hY2hpbmUgYXMgd2VsbFxyXG4gICAgKioqIG1heWJlIGNoYW5nZSBbbm90IGRvaW5nIGFueXRoaW5nXSB0byBbbm90IGRvaW5nIGFueXRoaW5nXVxyXG4gICAgXHJcbiAgICBbcDEgbm90IGRvaW5nIGFueXRoaW5nXSA9PSBjbGlja3MgTW92ZSBjaGFyYWN0ZXIgPj4gW3NlbGVjdGluZyBkZXNpcmVkIG1vdmVdID0+IFtwMSBub3QgZG9pbmcgYW55dGhpbmddXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXC9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHttb3ZlIHBsYXllcn0gPT4gW3AyIG5vdCBkb2luZyBhbnl0aGluZ11cclxuICAgIFxyXG4gICAgICAgICAgICAgICAgKi8gXHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuZ2FtZS5zdGF0ZTtcclxuICAgICAgICAgICAgICAgIGxldCBjbGFzc0xpc3QgPSBldmVudC50YXJnZXQuY2xhc3NMaXN0O1xyXG4gICAgICAgICAgICAgICAgbGV0IGlubmVySFRNTCA9IGV2ZW50LnRhcmdldC5pbm5lckhUTUw7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUgPT09IFwibm90IGRvaW5nIGFueXRoaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2xhc3NMaXN0LmNvbnRhaW5zKFwiYnV0dG9uXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGlubmVySFRNTCA9PT0gXCJQbGFjZSBhIHdhbGxcIikge1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVBsYWNlV2FsbEJ1dHRvbihldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpbm5lckhUTUwgPT09IFwiTW92ZSBjaGFyYWN0ZXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlbWVudEJ1dHRvbihldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlID09PSBcInNlbGVjdGluZyBzcXVhcmVzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2xhc3NMaXN0LmNvbnRhaW5zKFwiZmxvb3JcIikpIHtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVNxdWFyZUNsaWNrKGV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlID09PSBcInNlbGVjdGluZyB3YWxsIHR5cGVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjbGFzc0xpc3QuY29udGFpbnMoXCJidXR0b25cIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoKGlubmVySFRNTCA9PT0gXCJOb3J0aFwiKSB8fCAoaW5uZXJIVE1MID09PSBcIkVhc3RcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgKGlubmVySFRNTCA9PT0gXCJTb3V0aFwiKSB8fCAoaW5uZXJIVE1MID09PSBcIldlc3RcIikpIHtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVXYWxsVHlwZUJ1dHRvbihpbm5lckhUTUwsIGV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gXCJzZWxlY3RpbmcgZGVzaXJlZCBtb3ZlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hdmFpbGFibGVNb3Zlcy5pbmNsdWRlcyhldmVudC50YXJnZXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS50YWtlVHVybihcIm1vdmVcIiwgbnVsbCwgZXZlbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmFja1wiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmF2YWlsYWJsZU1vdmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF2YWlsYWJsZU1vdmVzW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWdobGlnaHRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnN0YXRlID0gXCJub3QgZG9pbmcgYW55dGhpbmdcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdmFpbGFibGVNb3ZlcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChzdGF0ZSAhPT0gXCJub3QgZG9pbmcgYW55dGhpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjbGFzc0xpc3QuY29udGFpbnMoXCJidXR0b25cIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlubmVySFRNTCA9PT0gXCJiYWNrXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQmFja0J1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGlubmVySFRNTCA9PT0gXCJSZXN0YXJ0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIGZhbHNlKTtcclxuICAgIH0gXHJcblxyXG4gICAgaGFuZGxlUGxhY2VXYWxsQnV0dG9uKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy51dGlsLnRyYWNrRnVuY3Rpb25zKFwiaGFuZGxlUGxhY2VXYWxsQnV0dG9uXCIpO1xyXG4gICAgICAgIC8vIGRlbGV0ZSBidG4gZWxlbWVudCBhbmQgcmVwbGFjZSB3aXRoIGluc3RydWN0aW9ucyB0b1xyXG4gICAgICAgIC8vIGNsaWNrIHR3byBkaXN0aW5jdCBzcXVhcmVzXHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5jdXJyZW50UGxheWVyICE9PSBcIm5vb25lXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lLnN0YXRlID0gXCJzZWxlY3Rpbmcgc3F1YXJlc1wiO1xyXG4gICAgICAgICAgICBsZXQgYnRuID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhY2tcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY2xpY2tJbnN0cnVjdFwiKVswXS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb3ZlXCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xyXG4gICAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVNxdWFyZUNsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy51dGlsLnRyYWNrRnVuY3Rpb25zKFwiaGFuZGxlU3F1YXJlQ2xpY2tcIik7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5jdXJyZW50UGxheWVyICE9PSBcIm5vb25lXCIpIHtcclxuICAgICAgICAgICAgLy93YWl0IGZvciBjbGllbnQgdG8gY2xpY2sgdHdvIHZhbGlkIHNxdWFyZXNcclxuICAgICAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICgodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImZsb29yXCIpKSAmJiAodGhpcy5zcXVhcmVBID09PSBudWxsKSkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFdhbGxcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNxdWFyZUEgPSB0YXJnZXQuaWQ7XHJcbiAgICAgICAgICAgICAgICAvL3BhcnNlIHNxdWFyZUFcclxuICAgICAgICAgICAgICAgIC8vIHNxdWFyZUEgPSBcIjAwXCIgYW5kIG5lZWRzIHRvIGJlIFswLCAwXVxyXG4gICAgICAgICAgICAgICAgbGV0IHNxdWFyZSA9IHRoaXMuc3F1YXJlQS5zcGxpdChcIlwiKTtcclxuICAgICAgICAgICAgICAgIHNxdWFyZVswXSA9IHBhcnNlSW50KHNxdWFyZVswXSk7XHJcbiAgICAgICAgICAgICAgICBzcXVhcmVbMV0gPSBwYXJzZUludChzcXVhcmVbMV0pO1xyXG4gICAgICAgICAgICAgICAgLy9nZXQgbmVpZ2hib3JzXHJcbiAgICAgICAgICAgICAgICAvLyByZXR1cm5zIFtbbm9ydGhdLFtlYXN0XSxbc291dGhdLFt3ZXN0XV1cclxuICAgICAgICAgICAgICAgIHRoaXMubmVpZ2hib3JzID0gdGhpcy5ib2FyZC5jaGVja05laWdoYm9ycyhzcXVhcmUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLm5laWdoYm9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMubmVpZ2hib3JzW2ldWzBdICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaWQgPSB0aGlzLm5laWdoYm9yc1tpXS5qb2luKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkuY2xhc3NMaXN0LmFkZChcImhpZ2hsaWdodFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZU5laWdoYm9yc0FycmF5VG9TdHJpbmcodGhpcy5uZWlnaGJvcnMpOyAgXHJcbiAgICBcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImZsb29yXCIpKSAmJiAodGhpcy5zcXVhcmVBICE9PSBudWxsKSAmJiAodGhpcy5zcXVhcmVCID09PSBudWxsKSkge1xyXG4gICAgICAgICAgICAgICAgaWYoISF0aGlzLm5laWdoYm9ycy5pbmNsdWRlcyh0YXJnZXQuaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcXVhcmVCID0gdGFyZ2V0LmlkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3F1YXJlQSAhPT0gbnVsbCAmJiB0aGlzLnNxdWFyZUIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vIHNob3VsZCBjcmVhdGUgdHdvIGJ1dHRvbnMgZGVwZW5kaW5nIG9uIHNxdWFyZUEgYW5kIHNxdWFyZUIgb3JpZW50YXRpb25cclxuICAgICAgICAgICAgICAgIHRoaXMuYm9keS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY2xpY2tJbnN0cnVjdFwiKVswXS5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBBID0gdGhpcy5ncmlkW3RoaXMuc3F1YXJlQS5zcGxpdChcIlwiKVswXV1bdGhpcy5zcXVhcmVBLnNwbGl0KFwiXCIpWzFdXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IEIgPSB0aGlzLmdyaWRbdGhpcy5zcXVhcmVCLnNwbGl0KFwiXCIpWzBdXVt0aGlzLnNxdWFyZUIuc3BsaXQoXCJcIilbMV1dO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNxdWFyZUEuc3BsaXQoXCJcIilbMF0gPT09IHRoaXMuc3F1YXJlQi5zcGxpdChcIlwiKVswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc3F1YXJlQS5zcGxpdChcIlwiKVswXSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJub3J0aFwiKVswXS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5zcXVhcmVBLnNwbGl0KFwiXCIpWzBdIDwgOCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNvdXRoXCIpWzBdLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc3F1YXJlQS5zcGxpdChcIlwiKVsxXSA9PT0gdGhpcy5zcXVhcmVCLnNwbGl0KFwiXCIpWzFdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5zcXVhcmVBLnNwbGl0KFwiXCIpWzFdID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIndlc3RcIilbMF0uY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc3F1YXJlQS5zcGxpdChcIlwiKVsxXSA8IDgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJlYXN0XCIpWzBdLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMubmVpZ2hib3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIXRoaXMubmVpZ2hib3JzW2ldLmluY2x1ZGVzKFwiLVwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaWQgPSB0aGlzLm5laWdoYm9yc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWdobGlnaHRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5uZWlnaGJvcnMgPSBbXTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRXYWxsXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnN0YXRlID0gXCJzZWxlY3Rpbmcgd2FsbCB0eXBlXCI7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVXYWxsVHlwZUJ1dHRvbihkaXIsIGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy51dGlsLnRyYWNrRnVuY3Rpb25zKFwiaGFuZGxlV2FsbFR5cGVCdXR0b25cIik7XHJcblxyXG4gICAgICAgIGxldCBzZWxlY3RlZFdhbGxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNlbGVjdGVkV2FsbFwiKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdGVkV2FsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHdhbGwgPSBzZWxlY3RlZFdhbGxzW2ldO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHdhbGwuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkV2FsbFwiKTtcclxuICAgICAgICAgICAgfSwwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIGdhbWUgbG9naWMgKi9cclxuICAgICAgICB0aGlzLmdhbWUudGFrZVR1cm4oXCJwbGFjZVdhbGxcIiwgZGlyLCBldmVudCwgdGhpcy5zcXVhcmVBLCB0aGlzLnNxdWFyZUIpO1xyXG5cclxuICAgICAgICAvKiBzdHlsaXplICovXHJcbiAgICAgICAgdGhpcy5ib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJub3J0aFwiKVswXS5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcclxuICAgICAgICB0aGlzLmJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImVhc3RcIilbMF0uY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XHJcbiAgICAgICAgdGhpcy5ib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzb3V0aFwiKVswXS5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcclxuICAgICAgICB0aGlzLmJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIndlc3RcIilbMF0uY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XHJcbiAgICAgICAgdGhpcy5ib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJidXR0b25cIilbMF0uY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiYWNrXCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW92ZVwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcclxuXHJcbiAgICAgICAgLyogcmVzZXR0aW5nIHVzZWZ1bCB2YXJpYWJsZXMgKi9cclxuICAgICAgICB0aGlzLnNxdWFyZUEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc3F1YXJlQiA9IG51bGw7XHJcblxyXG4gICAgICAgIC8qIHN0YXRlIGNoYW5nZSAqL1xyXG4gICAgICAgIHRoaXMuZ2FtZS5zdGF0ZSA9IFwibm90IGRvaW5nIGFueXRoaW5nXCI7XHJcblxyXG4gICAgICAgIC8qIHJlbmRlcnMgKi9cclxuICAgICAgICB0aGlzLnNob3coKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVNb3ZlbWVudEJ1dHRvbihldmVudCkge1xyXG4gICAgICAgIHRoaXMudXRpbC50cmFja0Z1bmN0aW9ucyhcImhhbmRsZU1vdmVtZW50QnV0dG9uXCIpO1xyXG4gICAgICAgIGlmKHRoaXMuZ2FtZS5jdXJyZW50UGxheWVyICE9PSBcIm5vb25lXCIpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiYWNrXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYWNlXCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xyXG4gICAgICAgICAgICBsZXQgYXZhaWxhYmxlTW92ZXM7XHJcbiAgICAgICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLmdhbWUuY3VycmVudFBsYXllciA9PT0gdGhpcy5nYW1lLnBsYXllcjFJRCA/IHRoaXMuZ2FtZS5wbGF5ZXIxIDogdGhpcy5nYW1lLnBsYXllcjI7XHJcbiAgICAgICAgICAgIGxldCByb3dJZHggPSBwYXJzZUludChwbGF5ZXJbMF0pO1xyXG4gICAgICAgICAgICBsZXQgY29sSWR4ID0gcGFyc2VJbnQocGxheWVyWzFdKTtcclxuICAgICAgICAgICAgYXZhaWxhYmxlTW92ZXMgPSB0aGlzLmdhbWUuZ2V0QXZhaWxhYmxlTW92ZXMoW3Jvd0lkeCwgY29sSWR4XSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXZhaWxhYmxlTW92ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBlbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhdmFpbGFibGVNb3Zlc1tpXS5qb2luKFwiXCIpKTtcclxuICAgICAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QuYWRkKFwiaGlnaGxpZ2h0XCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdmFpbGFibGVNb3Zlcy5wdXNoKGVsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLyogc2V0IHRoZSBzdGF0ZSB0byBjaGVjayBpZiBhbiBhdmFpbGFibGUgbW92ZSBzcXVhcmUgaXMgY2xpY2tlZC4gKi9cclxuICAgICAgICAgICAgdGhpcy5nYW1lLnN0YXRlID0gXCJzZWxlY3RpbmcgZGVzaXJlZCBtb3ZlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUJhY2tCdXR0b24oKSB7XHJcbiAgICAgICAgdGhpcy51dGlsLnRyYWNrRnVuY3Rpb25zKFwiaGFuZGxlQmFja0J1dHRvblwiKTtcclxuICAgICAgICB0aGlzLmdhbWUuc3RhdGUgPSBcIm5vdCBkb2luZyBhbnl0aGluZ1wiO1xyXG4gICAgICAgIC8qIHJlc2V0cyBzdGF0ZSAqL1xyXG4gICAgICAgIGxldCBpbnN0cnVjdGlvbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY29udHJvbGxlci1kaXZcIilbMF0uY2hpbGROb2RlcztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluc3RydWN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaW5zdHJ1Y3Rpb25zW2ldLmlkID09PSBcInBsYWNlXCIgfHwgaW5zdHJ1Y3Rpb25zW2ldLmlkID09PSBcIm1vdmVcIikge1xyXG4gICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zW2ldLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3F1YXJlQSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zcXVhcmVCID0gbnVsbDtcclxuICAgICAgICB0aGlzLm5laWdoYm9ycyA9IG51bGw7ICBcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYXZhaWxhYmxlTW92ZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICB0aGlzLmF2YWlsYWJsZU1vdmVzW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWdobGlnaHRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzZWxlY3RlZFdhbGxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNlbGVjdGVkV2FsbFwiKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdGVkV2FsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHdhbGwgPSBzZWxlY3RlZFdhbGxzW2ldO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHdhbGwuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkV2FsbFwiKTtcclxuICAgICAgICAgICAgfSwwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hdmFpbGFibGVNb3ZlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZU5laWdoYm9yc0FycmF5VG9TdHJpbmcoYXJyYXkpIHtcclxuICAgICAgICB0aGlzLnV0aWwudHJhY2tGdW5jdGlvbnMoXCJjaGFuZ2VOZWlnaGJvcnNBcnJheVRvU3RyaW5nXCIpO1xyXG4gICAgICAgIC8vY2hhbmdlcyB0aGlzLm5laWdoYm9ycyB0byBiZSBhYmxlIHRvIGJlIHJlYWQgYXMgYW4gYXJyYXkgb2Ygc3RyaW5nc1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGlkID0gYXJyYXlbaV0uam9pbihcIlwiKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICB0aGlzLm5laWdoYm9yc1tpXSA9IGlkO1xyXG4gICAgICAgICAgICBsZXQgZWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7aWR9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUJ1dHRvbihpbm5lclRleHQpIHtcclxuICAgICAgICB0aGlzLnV0aWwudHJhY2tGdW5jdGlvbnMoXCJjcmVhdGVCdXR0b25cIik7XHJcbiAgICAgICAgbGV0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgYnRuLmlubmVySFRNTCA9IGlubmVyVGV4dFxyXG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdidXR0b24nKTtcclxuICAgICAgICBpZiAoaW5uZXJUZXh0ID09PSBcIlBsYWNlIGEgd2FsbFwiKSB7XHJcbiAgICAgICAgICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInBsYWNlXCIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaW5uZXJUZXh0ID09PSBcIk1vdmUgY2hhcmFjdGVyXCIpIHtcclxuICAgICAgICAgICAgYnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIFwibW92ZVwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBidG4uc2V0QXR0cmlidXRlKFwiaWRcIiwgaW5uZXJUZXh0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2NvbnRyb2xsZXItYnRuJyk7XHJcbiAgICAgICAgdGhpcy5ib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjb250cm9sbGVyLWRpdlwiKVswXS5hcHBlbmRDaGlsZChidG4pO1xyXG4gICAgICAgIHJldHVybiBidG47XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlUmVzdGFydERpdihib2FyZCwgd2lubmVyKSB7XHJcbiAgICAgICAgdGhpcy51dGlsLnRyYWNrRnVuY3Rpb25zKFwiY3JlYXRlUmVzdGFydERpdlwiKTtcclxuICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBsZXQgY29uZ3JhdHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XHJcbiAgICAgICAgbGV0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgZGl2LnNldEF0dHJpYnV0ZShcImlkXCIsIFwicmVzdGFydC1kaXZcIik7XHJcbiAgICAgICAgYnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIFwicmVzdGFydFwiKTtcclxuICAgICAgICBjb25ncmF0cy5pbm5lckhUTUwgPSBgQ29uZ3JhdHMgdG8gJHt3aW5uZXJ9ISEhIWA7XHJcbiAgICAgICAgYnRuLmlubmVySFRNTCA9IFwiUmVzdGFydFwiXHJcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKGNvbmdyYXRzKTtcclxuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoYnRuKTtcclxuICAgICAgICBib2FyZC5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldHVwQm9hcmQoKSB7XHJcbiAgICAgICAgdGhpcy51dGlsLnRyYWNrRnVuY3Rpb25zKFwic2V0dXBCb2FyZFwiKTtcclxuICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBsZXQgYm9hcmREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgICAgIGxldCBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcclxuICAgICAgICBib2FyZERpdi5hcHBlbmRDaGlsZChib2FyZCk7XHJcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKGJvYXJkRGl2KTtcclxuICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZChcInRhYmxlXCIpO1xyXG4gICAgICAgIGJvYXJkLnNldEF0dHJpYnV0ZShcImlkXCIgLCBcImJvYXJkXCIpO1xyXG4gICAgICAgIGxldCB3aG9zVHVybiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgd2hvc1R1cm4uY2xhc3NMaXN0LmFkZChcInBsYXllci10dXJuXCIpO1xyXG4gICAgICAgIHdob3NUdXJuLnNldEF0dHJpYnV0ZShcImlkXCIsIFwicGxheWVyLXR1cm5cIik7XHJcbiAgICAgICAgd2hvc1R1cm4uaW5uZXJIVE1MID0gXCJQbGF5ZXIgMSdzIFR1cm5cIjtcclxuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQod2hvc1R1cm4pO1xyXG4gICAgICAgIGxldCBjbnRybERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgY250cmxEaXYuY2xhc3NMaXN0LmFkZChcImNvbnRyb2xsZXItZGl2XCIpO1xyXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChjbnRybERpdik7XHJcbiAgICAgICAgbGV0IHdhbGxDb3VudGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICB3YWxsQ291bnRlckRpdi5jbGFzc0xpc3QuYWRkKFwid2FsbC1jb3VudGVyLWRpdlwiKTtcclxuICAgICAgICB3YWxsQ291bnRlckRpdi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIndhbGwtY291bnRlclwiKTtcclxuICAgICAgICBsZXQgcGxheWVyMVdhbGxzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBsZXQgcGxheWVyMldhbGxzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBwbGF5ZXIxV2FsbHMuY2xhc3NMaXN0LmFkZChcIndhbGwtY291bnRlclwiKTtcclxuICAgICAgICBwbGF5ZXIyV2FsbHMuY2xhc3NMaXN0LmFkZChcIndhbGwtY291bnRlclwiKTtcclxuICAgICAgICBwbGF5ZXIxV2FsbHMuaW5uZXJIVE1MID0gXCJwbGF5ZXIgMSBoYXMgMTAgd2FsbHMgbGVmdFwiO1xyXG4gICAgICAgIHBsYXllcjJXYWxscy5pbm5lckhUTUwgPSBcInBsYXllciAyIGhhcyAxMCB3YWxscyBsZWZ0XCI7XHJcbiAgICAgICAgd2FsbENvdW50ZXJEaXYuYXBwZW5kQ2hpbGQocGxheWVyMVdhbGxzKTtcclxuICAgICAgICB3YWxsQ291bnRlckRpdi5hcHBlbmRDaGlsZChwbGF5ZXIyV2FsbHMpO1xyXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZCh3YWxsQ291bnRlckRpdik7XHJcblxyXG4gICAgICAgIC8vYnVpbGQgd2FsbHMgYnV0dG9uXHJcbiAgICAgICAgdGhpcy5jcmVhdGVCdXR0b24oXCJQbGFjZSBhIHdhbGxcIik7XHJcbiAgICAgICAgLy9tb3ZlbWVudCBidXR0b25cclxuICAgICAgICB0aGlzLmNyZWF0ZUJ1dHRvbihcIk1vdmUgY2hhcmFjdGVyXCIpO1xyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgLyogaW5zdHJ1Y3Rpb24gZm9yIGNsaWNraW5nIHNxdWFyZXMgKi9cclxuICAgICAgICBsZXQgY2xpY2tJbnN0cnVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgICAgIGNsaWNrSW5zdHJ1Y3QuY2xhc3NMaXN0LmFkZChcImNsaWNrSW5zdHJ1Y3RcIik7XHJcbiAgICAgICAgY2xpY2tJbnN0cnVjdC5pbm5lckhUTUwgPSBcIkNsaWNrIHR3byBkaXN0aW5jdCBzcXVhcmVzLi4uXCJcclxuICAgICAgICBjbGlja0luc3RydWN0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xyXG4gICAgICAgIGNudHJsRGl2LmFwcGVuZENoaWxkKGNsaWNrSW5zdHJ1Y3QpO1xyXG4gICAgICAgIC8qIHdhbGwgdHlwZSBidXR0b25zICovXHJcbiAgICAgICAgbGV0IG5vcnRoID0gdGhpcy5jcmVhdGVCdXR0b24oXCJOb3J0aFwiKTtcclxuICAgICAgICBsZXQgZWFzdCA9IHRoaXMuY3JlYXRlQnV0dG9uKFwiRWFzdFwiKTtcclxuICAgICAgICBsZXQgc291dGggPSB0aGlzLmNyZWF0ZUJ1dHRvbihcIlNvdXRoXCIpO1xyXG4gICAgICAgIGxldCB3ZXN0ID0gdGhpcy5jcmVhdGVCdXR0b24oXCJXZXN0XCIpO1xyXG4gICAgICAgIG5vcnRoLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIsIFwibm9ydGhcIik7XHJcbiAgICAgICAgZWFzdC5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiLCBcImVhc3RcIik7XHJcbiAgICAgICAgc291dGguY2xhc3NMaXN0LmFkZChcImhpZGVcIiwgXCJzb3V0aFwiKTtcclxuICAgICAgICB3ZXN0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIsIFwid2VzdFwiKTtcclxuICAgICAgICBjbnRybERpdi5hcHBlbmRDaGlsZChub3J0aCk7XHJcbiAgICAgICAgY250cmxEaXYuYXBwZW5kQ2hpbGQoc291dGgpO1xyXG4gICAgICAgIGNudHJsRGl2LmFwcGVuZENoaWxkKHdlc3QpO1xyXG4gICAgICAgIGNudHJsRGl2LmFwcGVuZENoaWxkKGVhc3QpO1xyXG5cclxuICAgICAgICAvKiBiYWNrIGJ1dHRvbiAqL1xyXG4gICAgICAgIGxldCBiYWNrID0gdGhpcy5jcmVhdGVCdXR0b24oXCJiYWNrXCIpO1xyXG4gICAgICAgIGJhY2suY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XHJcbiAgICAgICAgY250cmxEaXYuYXBwZW5kQ2hpbGQoYmFjayk7XHJcblxyXG4gICAgICAgIGZvcihsZXQgcm93SWR4ID0gMDsgcm93SWR4IDwgOTsgcm93SWR4KyspIHtcclxuICAgICAgICAgICAgbGV0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGNvbElkeCA9IDA7IGNvbElkeCA8IDk7IGNvbElkeCsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgICAgICB0ZC5pZCA9IGAke3Jvd0lkeH0ke2NvbElkeH1gO1xyXG4gICAgICAgICAgICAgICAgdGQuY2xhc3NMaXN0LmFkZChcImZsb29yXCIsIFwiaGFsbFwiKTtcclxuICAgICAgICAgICAgICAgIHRyLmFwcGVuZENoaWxkKHRkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBib2FyZC5hcHBlbmRDaGlsZCh0cik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==