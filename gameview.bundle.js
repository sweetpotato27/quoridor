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
        if (this.game.currentPlayer !== "noone") {
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
        document.getElementById("back").classList.add("hide");
        document.getElementById("move").classList.remove("hide");
        this.squareA = null;
        this.squareB = null;
        this.game.state = "not doing anything";
        this.show();
    }

    handleMovementButton(event) {
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
        this.availableMoves = [];
        this.show();
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
        let div = document.createElement("div");
        let congrats = document.createElement("h1");
        // let instruct = document.createElement("span");
        let btn = document.createElement("button");
        div.setAttribute("id", "restart-div");
        btn.setAttribute("id", "restart");
        congrats.innerHTML = `Congrats to ${winner}!!!!`;
        // instruct.innerHTML = "Click button to restart the game."
        btn.innerHTML = "Restart"

        div.appendChild(congrats);
        // div.appendChild(instruct);
        div.appendChild(btn);
        board.appendChild(div);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9xdW9yaWRvci8uL3NyYy9nYW1lX3ZpZXcuanMiLCJ3ZWJwYWNrOi8vcXVvcmlkb3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcXVvcmlkb3Ivd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCLDRCQUE0QjtBQUN2RCxnQ0FBZ0MsbUNBQW1DO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELHVCQUF1QjtBQUMzRSxvREFBb0QsdUJBQXVCO0FBQzNFO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBOEQsd0JBQXdCO0FBQ3RGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RUFBeUUsZ0JBQWdCO0FBQ3pGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsWUFBWTs7QUFFekU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7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QUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7VUNyQkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiZ2FtZXZpZXcuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNsYXNzIEdhbWVWaWV3IHtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWUpIHtcclxuICAgICAgICB0aGlzLmJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcclxuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgICAgIHRoaXMuYm9hcmQgPSB0aGlzLmdhbWUuYm9hcmQ7XHJcbiAgICAgICAgdGhpcy5ncmlkID0gdGhpcy5ib2FyZC5ncmlkO1xyXG4gICAgICAgIHRoaXMuc3F1YXJlQSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zcXVhcmVCID0gbnVsbDtcclxuICAgICAgICB0aGlzLm5laWdoYm9ycyA9IG51bGw7ICBcclxuICAgICAgICB0aGlzLmF2YWlsYWJsZU1vdmVzID0gW107XHJcblxyXG4gICAgICAgIHRoaXMuc2V0dXBCb2FyZCgpO1xyXG4gICAgICAgIHRoaXMuc2V0dXBFdmVudExpc3RlbmVycygpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3coKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lLmNvbXB1dGVyQWlUdXJuKCk7XHJcbiAgICAgICAgdGhpcy5zaG93Qm9hcmQoKTtcclxuICAgICAgICBpZiAodGhpcy5nYW1lLmlzT3ZlcigpKSB7XHJcbiAgICAgICAgICAgIGxldCB3aW5uZXIgPSBcIlwiO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyMlwiKSB3aW5uZXIgPSBcIlBsYXllciAxXCI7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuY3VycmVudFBsYXllciA9PT0gXCJwbGF5ZXIxXCIpIHdpbm5lciA9IFwiUGxheWVyIDJcIjtcclxuICAgICAgICAgICAgbGV0IHRhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInRhYmxlXCIpWzBdO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVJlc3RhcnREaXYodGFibGUsIHdpbm5lcik7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5jdXJyZW50UGxheWVyID0gXCJub29uZVwiO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dCb2FyZCgpO1xyXG4gICAgICAgICAgICAvLyB0YWJsZS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgbGV0IHJlc3RhcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgICAgICAgICAgLy8gbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dCb2FyZCgpIHtcclxuICAgICAgICBmb3IobGV0IHJvd0lkeCA9IDA7IHJvd0lkeCAgPCB0aGlzLmdyaWQubGVuZ3RoOyByb3dJZHgrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjb2xJZHggPSAwOyBjb2xJZHggPCB0aGlzLmdyaWRbcm93SWR4XS5sZW5ndGg7IGNvbElkeCsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3F1YXJlID0gdGhpcy5ncmlkW3Jvd0lkeF1bY29sSWR4XTtcclxuICAgICAgICAgICAgICAgIGxldCBpZCA9IChyb3dJZHgpLnRvU3RyaW5nKCkgKyAoY29sSWR4KS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGVsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuICAgICAgICAgICAgICAgIGlmKHNxdWFyZS5wbGF5ZXIgPT09IFwicGxheWVyMVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlLmNsYXNzTGlzdC5hZGQoXCJwbGF5ZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlLmlubmVySFRNTCA9IFwiJiN4MjY1RlwiO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKHNxdWFyZS5wbGF5ZXIgPT09IFwicGxheWVyMlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlLmNsYXNzTGlzdC5hZGQoXCJwbGF5ZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlLmlubmVySFRNTCA9IFwiJiN4MjY1OVwiO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGUuY2xhc3NMaXN0LnJlbW92ZShcInBsYXllclwiKTtcclxuICAgICAgICAgICAgICAgICAgICBlbGUuaW5uZXJIVE1MID0gXCIgXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvKiB1cGRhdGUgd2FsbHMgKi9cclxuICAgICAgICAgICAgICAgIGlmICghIXNxdWFyZS53YWxscy5Ob3J0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QucmVtb3ZlKCdoYWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlLmNsYXNzTGlzdC5hZGQoJ3dhbGwtdG9wJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoISFzcXVhcmUud2FsbHMuRWFzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QucmVtb3ZlKCdoYWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlLmNsYXNzTGlzdC5hZGQoJ3dhbGwtcmlnaHQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghIXNxdWFyZS53YWxscy5Tb3V0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QucmVtb3ZlKCdoYWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlLmNsYXNzTGlzdC5hZGQoJ3dhbGwtYm90dG9tJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoISFzcXVhcmUud2FsbHMuV2VzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QucmVtb3ZlKCdoYWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlLmNsYXNzTGlzdC5hZGQoJ3dhbGwtbGVmdCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB3YWxsQ291bnRlcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwid2FsbC1jb3VudGVyXCIpO1xyXG4gICAgICAgIGxldCBidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYWNlXCIpO1xyXG4gICAgICAgIHdhbGxDb3VudGVyc1swXS5pbm5lckhUTUwgPSBgcGxheWVyIDEgaGFzICR7dGhpcy5nYW1lLnBsYXllcjFXYWxsc30gd2FsbHMgbGVmdGBcclxuICAgICAgICB3YWxsQ291bnRlcnNbMV0uaW5uZXJIVE1MID0gYHBsYXllciAyIGhhcyAke3RoaXMuZ2FtZS5wbGF5ZXIyV2FsbHN9IHdhbGxzIGxlZnRgXHJcbiAgICAgICAgaWYgKCh0aGlzLmdhbWUuY3VycmVudFBsYXllciA9PT0gXCJwbGF5ZXIxXCIpICYmICh0aGlzLmdhbWUucGxheWVyMVdhbGxzID09PSAwKSkge1xyXG4gICAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XHJcbiAgICAgICAgfSBlbHNlIGlmICgodGhpcy5nYW1lLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyMlwiKSAmJiAodGhpcy5nYW1lLnBsYXllcjJXYWxscyA9PT0gMCkpe1xyXG4gICAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5zdGF0ZSA9PT0gXCJub3QgZG9pbmcgYW55dGhpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ0bi5jbGFzc0xpc3QuY29udGFpbnMoXCJoaWRlXCIpKSBidG4uY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItdHVyblwiKS5pbm5lckhUTUwgPSBgJHt0aGlzLmdhbWUuY3VycmVudFBsYXllcn0ncyB0dXJuYDtcclxuICAgIH1cclxuXHJcbiAgICBzZXR1cEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgICAgIHRoaXMuYm9keS5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjb2RlID0gZXZlbnQuY29kZTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmdhbWUucGxhY2luZ1dhbGwpIHtcclxuICAgICAgICAgICAgICAgIGlmICgoY29kZSA9PT0gXCJBcnJvd1VwXCIpIHx8IChjb2RlID09PSBcIkFycm93UmlnaHRcIikgfHwgKGNvZGUgPT09IFwiQXJyb3dEb3duXCIpIHx8IChjb2RlID09PSBcIkFycm93TGVmdFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS50YWtlVHVybihcIm1vdmVcIiwgY29kZS5zcGxpdChcIkFycm93XCIpWzFdLnRvTG93ZXJDYXNlKCksIGV2ZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGNvZGUgPT09IFwiU3BhY2VcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmZpbmRQYXRoKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgLyogXHJcblRoZSBjbGljayBldmVudCBpcyB1c2VkIGZvciBhIHN0YXRlIG1hY2hpbmUuXHJcbkRlcGVuZGluZyBvbiB0aGUgc3RhdGUgb2YgcGxhY2luZyBhIHdhbGwgZGljdGF0ZXNcclxud2hhdCB3aWxsIGhhcHBlbiB3aGVuIGEgY2xpY2sgZXZlbnQgdHJpZ2dlcnMuXHJcblN0YXRlIGlzIHN0b3JlZCBpbiB0aGlzLmdhbWUuc3RhdGUgXHJcblN0YXRlIE1hY2hpbmUgaXM6XHJcbltwMSBub3QgZG9pbmcgYW55dGhpbmddID09IGNsaWNrcyBQbGFjZSBhIHdhbGwgPj4gW3NlbGVjdGluZyBzcXVhcmVzXSA9PiBbc2VsZWN0aW5nIHdhbGwgdHlwZV0gPT4gW3AxIG5vdCBkb2luZyBhbnl0aGluZ11cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXC9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3dhbGwgaXMgY3JlYXRlZH0gPT4gW3AyIG5vdCBkb2luZyBhbnl0aGluZ11cclxuISEgdW5kZXZlbG9wZWQgISFcclxuUGxheWVyIG1vdmVtZW50IHdpbGwgYmUgaW50ZWdyYXRlZCBpbnRvIHRoZSBzdGF0ZSBtYWNoaW5lIGFzIHdlbGxcclxuKioqIG1heWJlIGNoYW5nZSBbbm90IGRvaW5nIGFueXRoaW5nXSB0byBbbm90IGRvaW5nIGFueXRoaW5nXVxyXG5cclxuW3AxIG5vdCBkb2luZyBhbnl0aGluZ10gPT0gY2xpY2tzIE1vdmUgY2hhcmFjdGVyID4+IFtzZWxlY3RpbmcgZGVzaXJlZCBtb3ZlXSA9PiBbcDEgbm90IGRvaW5nIGFueXRoaW5nXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bW92ZSBwbGF5ZXJ9ID0+IFtwMiBub3QgZG9pbmcgYW55dGhpbmddXHJcblxyXG4gICAgICAgICAgICAqLyBcclxuXHJcbiAgICAgICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuZ2FtZS5zdGF0ZTtcclxuICAgICAgICAgICAgbGV0IGNsYXNzTGlzdCA9IGV2ZW50LnRhcmdldC5jbGFzc0xpc3Q7XHJcbiAgICAgICAgICAgIGxldCBpbm5lckhUTUwgPSBldmVudC50YXJnZXQuaW5uZXJIVE1MO1xyXG4gICAgICAgICAgICBpZiAoc3RhdGUgPT09IFwibm90IGRvaW5nIGFueXRoaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjbGFzc0xpc3QuY29udGFpbnMoXCJidXR0b25cIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihpbm5lckhUTUwgPT09IFwiUGxhY2UgYSB3YWxsXCIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlUGxhY2VXYWxsQnV0dG9uKGV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGlubmVySFRNTCA9PT0gXCJNb3ZlIGNoYXJhY3RlclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZW1lbnRCdXR0b24oZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHN0YXRlID09PSBcInNlbGVjdGluZyBzcXVhcmVzXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjbGFzc0xpc3QuY29udGFpbnMoXCJmbG9vclwiKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVNxdWFyZUNsaWNrKGV2ZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgaWYgKHN0YXRlID09PSBcInNlbGVjdGluZyB3YWxsIHR5cGVcIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNsYXNzTGlzdC5jb250YWlucyhcImJ1dHRvblwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKChpbm5lckhUTUwgPT09IFwiTm9ydGhcIikgfHwgKGlubmVySFRNTCA9PT0gXCJFYXN0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgfHwgKGlubmVySFRNTCA9PT0gXCJTb3V0aFwiKSB8fCAoaW5uZXJIVE1MID09PSBcIldlc3RcIikpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlV2FsbFR5cGVCdXR0b24oaW5uZXJIVE1MLCBldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gXCJzZWxlY3RpbmcgZGVzaXJlZCBtb3ZlXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmF2YWlsYWJsZU1vdmVzLmluY2x1ZGVzKGV2ZW50LnRhcmdldCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUudGFrZVR1cm4oXCJtb3ZlXCIsIG51bGwsIGV2ZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmFja1wiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYXZhaWxhYmxlTW92ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdmFpbGFibGVNb3Zlc1tpXS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlnaGxpZ2h0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuc3RhdGUgPSBcIm5vdCBkb2luZyBhbnl0aGluZ1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXZhaWxhYmxlTW92ZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHN0YXRlICE9PSBcIm5vdCBkb2luZyBhbnl0aGluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2xhc3NMaXN0LmNvbnRhaW5zKFwiYnV0dG9uXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlubmVySFRNTCA9PT0gXCJiYWNrXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVCYWNrQnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpbm5lckhUTUwgPT09IFwiUmVzdGFydFwiKSB7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICB9IFxyXG5cclxuICAgIGhhbmRsZVBsYWNlV2FsbEJ1dHRvbihldmVudCkge1xyXG4gICAgICAgIC8vIGRlbGV0ZSBidG4gZWxlbWVudCBhbmQgcmVwbGFjZSB3aXRoIGluc3RydWN0aW9ucyB0b1xyXG4gICAgICAgIC8vIGNsaWNrIHR3byBkaXN0aW5jdCBzcXVhcmVzXHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5jdXJyZW50UGxheWVyICE9PSBcIm5vb25lXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lLnN0YXRlID0gXCJzZWxlY3Rpbmcgc3F1YXJlc1wiO1xyXG4gICAgICAgICAgICBsZXQgYnRuID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhY2tcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY2xpY2tJbnN0cnVjdFwiKVswXS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb3ZlXCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xyXG4gICAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVNxdWFyZUNsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5jdXJyZW50UGxheWVyICE9PSBcIm5vb25lXCIpIHtcclxuICAgICAgICAgICAgLy93YWl0IGZvciBjbGllbnQgdG8gY2xpY2sgdHdvIHZhbGlkIHNxdWFyZXNcclxuICAgICAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICAgIFxyXG4gICAgICAgICAgICBpZiAoKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJmbG9vclwiKSkgJiYgKHRoaXMuc3F1YXJlQSA9PT0gbnVsbCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3F1YXJlQSA9IHRhcmdldC5pZDtcclxuICAgICAgICAgICAgICAgIC8vcGFyc2Ugc3F1YXJlQVxyXG4gICAgICAgICAgICAgICAgLy8gc3F1YXJlQSA9IFwiMDBcIiBhbmQgbmVlZHMgdG8gYmUgWzAsIDBdXHJcbiAgICAgICAgICAgICAgICBsZXQgc3F1YXJlID0gdGhpcy5zcXVhcmVBLnNwbGl0KFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgc3F1YXJlWzBdID0gcGFyc2VJbnQoc3F1YXJlWzBdKTtcclxuICAgICAgICAgICAgICAgIHNxdWFyZVsxXSA9IHBhcnNlSW50KHNxdWFyZVsxXSk7XHJcbiAgICAgICAgICAgICAgICAvL2dldCBuZWlnaGJvcnNcclxuICAgICAgICAgICAgICAgIC8vIHJldHVybnMgW1tub3J0aF0sW2Vhc3RdLFtzb3V0aF0sW3dlc3RdXVxyXG4gICAgICAgICAgICAgICAgdGhpcy5uZWlnaGJvcnMgPSB0aGlzLmJvYXJkLmNoZWNrTmVpZ2hib3JzKHNxdWFyZSk7XHJcbiAgICAgICAgICAgICAgICAvLyBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5uZWlnaGJvcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLm5laWdoYm9yc1tpXSA9IHRoaXMubmVpZ2hib3JzW2ldWzBdLnRvU3RyaW5nKCkgKyB0aGlzLm5laWdoYm9yc1tpXVsxXS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgLy8gZm9yKGxldCBpID0gMDsgaSA8IHRoaXMubmVpZ2hib3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5uZWlnaGJvcnNbaV0uam9pbihcIlwiKSkuY2xhc3NMaXN0LmFkZChcImhpZ2hsaWdodFwiKTtcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0KHRoaXMubmVpZ2hib3JzKTsgIC8vIE5FRUQgVE8gQ0hBTkdFICBTSE9VTEQgQkUgQSBDTEFTUyBUT0dHTEVcclxuICAgIFxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZmxvb3JcIikpICYmICh0aGlzLnNxdWFyZUEgIT09IG51bGwpICYmICh0aGlzLnNxdWFyZUIgPT09IG51bGwpKSB7XHJcbiAgICAgICAgICAgICAgICBpZighIXRoaXMubmVpZ2hib3JzLmluY2x1ZGVzKHRhcmdldC5pZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNxdWFyZUIgPSB0YXJnZXQuaWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICBpZiAodGhpcy5zcXVhcmVBICE9PSBudWxsICYmIHRoaXMuc3F1YXJlQiAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gc2hvdWxkIGNyZWF0ZSB0d28gYnV0dG9ucyBkZXBlbmRpbmcgb24gc3F1YXJlQSBhbmQgc3F1YXJlQiBvcmllbnRhdGlvblxyXG4gICAgICAgICAgICAgICAgdGhpcy5ib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjbGlja0luc3RydWN0XCIpWzBdLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNxdWFyZUEuc3BsaXQoXCJcIilbMF0gPT09IHRoaXMuc3F1YXJlQi5zcGxpdChcIlwiKVswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc3F1YXJlQS5zcGxpdChcIlwiKVswXSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJub3J0aFwiKVswXS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5zcXVhcmVBLnNwbGl0KFwiXCIpWzBdIDwgOCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNvdXRoXCIpWzBdLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc3F1YXJlQS5zcGxpdChcIlwiKVsxXSA9PT0gdGhpcy5zcXVhcmVCLnNwbGl0KFwiXCIpWzFdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5zcXVhcmVBLnNwbGl0KFwiXCIpWzFdID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIndlc3RcIilbMF0uY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc3F1YXJlQS5zcGxpdChcIlwiKVsxXSA8IDgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJlYXN0XCIpWzBdLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5zdGF0ZSA9IFwic2VsZWN0aW5nIHdhbGwgdHlwZVwiO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlV2FsbFR5cGVCdXR0b24oZGlyLCBldmVudCkge1xyXG4gICAgICAgIC8qIFxyXG4gICAgICAgIGNhbGxzIHRoaXMuZ2FtZS50YWtlVHVybihhY3Rpb24sIGRpciwgZXZlbnQpO1xyXG4gICAgICAgIHNob3VsZCByZW1vdmUgd2FsbCB0eXBlIGJ1dHRvbnMgYW5kIGFkZCBwbGFjZSBhIHdhbGwgYnV0dG9uXHJcbiAgICAgICAgc3dpdGNoIHN0YXRlIGJhY2sgdG8gbm90IGRvaW5nIGFueXRoaW5nIGhlcmU/Pz9cclxuICAgICAgICBvciBpbiB0aGlzLmdhbWVcclxuICAgICAgICBXSEVSRSBET0VTIFdBTEwgUExBQ0VNRU5UIFZBTElEQVRJT04gSEFQUEVOPz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/P1xyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5nYW1lLnRha2VUdXJuKFwicGxhY2VXYWxsXCIsIGRpciwgZXZlbnQsIHRoaXMuc3F1YXJlQSwgdGhpcy5zcXVhcmVCKTtcclxuICAgICAgICB0aGlzLmJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm5vcnRoXCIpWzBdLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xyXG4gICAgICAgIHRoaXMuYm9keS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZWFzdFwiKVswXS5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcclxuICAgICAgICB0aGlzLmJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNvdXRoXCIpWzBdLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xyXG4gICAgICAgIHRoaXMuYm9keS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwid2VzdFwiKVswXS5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcclxuICAgICAgICB0aGlzLmJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImJ1dHRvblwiKVswXS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhY2tcIikuY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb3ZlXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xyXG4gICAgICAgIHRoaXMuc3F1YXJlQSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zcXVhcmVCID0gbnVsbDtcclxuICAgICAgICB0aGlzLmdhbWUuc3RhdGUgPSBcIm5vdCBkb2luZyBhbnl0aGluZ1wiO1xyXG4gICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZU1vdmVtZW50QnV0dG9uKGV2ZW50KSB7XHJcbiAgICAgICAgaWYodGhpcy5nYW1lLmN1cnJlbnRQbGF5ZXIgIT09IFwibm9vbmVcIikge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhY2tcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxhY2VcIikuY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XHJcbiAgICAgICAgICAgIGxldCBhdmFpbGFibGVNb3ZlcztcclxuICAgICAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuZ2FtZS5jdXJyZW50UGxheWVyID09PSBcInBsYXllcjFcIiA/IHRoaXMuZ2FtZS5wbGF5ZXIxIDogdGhpcy5nYW1lLnBsYXllcjI7XHJcbiAgICAgICAgICAgIGxldCByb3dJZHggPSBwYXJzZUludChwbGF5ZXJbMF0pO1xyXG4gICAgICAgICAgICBsZXQgY29sSWR4ID0gcGFyc2VJbnQocGxheWVyWzFdKTtcclxuICAgICAgICAgICAgYXZhaWxhYmxlTW92ZXMgPSB0aGlzLmdhbWUuZ2V0QXZhaWxhYmxlTW92ZXMoW3Jvd0lkeCwgY29sSWR4XSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXZhaWxhYmxlTW92ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBlbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhdmFpbGFibGVNb3Zlc1tpXS5qb2luKFwiXCIpKTtcclxuICAgICAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QuYWRkKFwiaGlnaGxpZ2h0XCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdmFpbGFibGVNb3Zlcy5wdXNoKGVsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLyogc2V0IHRoZSBzdGF0ZSB0byBjaGVjayBpZiBhbiBhdmFpbGFibGUgbW92ZSBzcXVhcmUgaXMgY2xpY2tlZC4gKi9cclxuICAgICAgICAgICAgdGhpcy5nYW1lLnN0YXRlID0gXCJzZWxlY3RpbmcgZGVzaXJlZCBtb3ZlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUJhY2tCdXR0b24oKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lLnN0YXRlID0gXCJub3QgZG9pbmcgYW55dGhpbmdcIjtcclxuICAgICAgICAvKiByZXNldHMgc3RhdGUgKi9cclxuICAgICAgICBsZXQgaW5zdHJ1Y3Rpb25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNvbnRyb2xsZXItZGl2XCIpWzBdLmNoaWxkTm9kZXM7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnN0cnVjdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGluc3RydWN0aW9uc1tpXS5pZCA9PT0gXCJwbGFjZVwiIHx8IGluc3RydWN0aW9uc1tpXS5pZCA9PT0gXCJtb3ZlXCIpIHtcclxuICAgICAgICAgICAgICAgIGluc3RydWN0aW9uc1tpXS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGluc3RydWN0aW9uc1tpXS5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNxdWFyZUEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc3F1YXJlQiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5uZWlnaGJvcnMgPSBudWxsOyAgXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmF2YWlsYWJsZU1vdmVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgdGhpcy5hdmFpbGFibGVNb3Zlc1tpXS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlnaGxpZ2h0XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmF2YWlsYWJsZU1vdmVzID0gW107XHJcbiAgICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaGlnaGxpZ2h0KGFycmF5KSB7XHJcbiAgICAgICAgLy9oaWdobGlnaHQgYW5kIGFsc28gY2hhbmdlcyB0aGlzLm5laWdoYm9ycyB0byBiZSBhYmxlIHRvIGJlIHJlYWQgYXMgYW4gYXJyYXkgb2Ygc3RyaW5nc1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gYXJyYXlbaV1bMF0gPSBhcnJheVtpXVswXTtcclxuICAgICAgICAgICAgLy8gYXJyYXlbaV1bMV0gPSBhcnJheVtpXVsxXTtcclxuICAgICAgICAgICAgbGV0IGlkID0gYXJyYXlbaV0uam9pbihcIlwiKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICB0aGlzLm5laWdoYm9yc1tpXSA9IGlkO1xyXG4gICAgICAgICAgICBsZXQgZWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7aWR9YCk7XHJcbiAgICAgICAgICAgIGlmIChlbGUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vIGVsZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImdyZWVuXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlQnV0dG9uKGlubmVyVGV4dCkge1xyXG4gICAgICAgIGxldCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgIGJ0bi5pbm5lckhUTUwgPSBpbm5lclRleHRcclxuICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnYnV0dG9uJyk7XHJcbiAgICAgICAgaWYgKGlubmVyVGV4dCA9PT0gXCJQbGFjZSBhIHdhbGxcIikge1xyXG4gICAgICAgICAgICBidG4uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJwbGFjZVwiKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlubmVyVGV4dCA9PT0gXCJNb3ZlIGNoYXJhY3RlclwiKSB7XHJcbiAgICAgICAgICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIm1vdmVcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIGlubmVyVGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYm9keS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY29udHJvbGxlci1kaXZcIilbMF0uYXBwZW5kQ2hpbGQoYnRuKTtcclxuICAgICAgICByZXR1cm4gYnRuO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVJlc3RhcnREaXYoYm9hcmQsIHdpbm5lcikge1xyXG4gICAgICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGxldCBjb25ncmF0cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcclxuICAgICAgICAvLyBsZXQgaW5zdHJ1Y3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICBsZXQgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICBkaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJyZXN0YXJ0LWRpdlwiKTtcclxuICAgICAgICBidG4uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJyZXN0YXJ0XCIpO1xyXG4gICAgICAgIGNvbmdyYXRzLmlubmVySFRNTCA9IGBDb25ncmF0cyB0byAke3dpbm5lcn0hISEhYDtcclxuICAgICAgICAvLyBpbnN0cnVjdC5pbm5lckhUTUwgPSBcIkNsaWNrIGJ1dHRvbiB0byByZXN0YXJ0IHRoZSBnYW1lLlwiXHJcbiAgICAgICAgYnRuLmlubmVySFRNTCA9IFwiUmVzdGFydFwiXHJcblxyXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChjb25ncmF0cyk7XHJcbiAgICAgICAgLy8gZGl2LmFwcGVuZENoaWxkKGluc3RydWN0KTtcclxuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoYnRuKTtcclxuICAgICAgICBib2FyZC5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldHVwQm9hcmQoKSB7XHJcbiAgICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgdGhpcy5ib2R5LmFwcGVuZENoaWxkKGRpdik7XHJcbiAgICAgICAgbGV0IGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpO1xyXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChib2FyZCk7XHJcbiAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJ0YWJsZVwiKTtcclxuICAgICAgICBib2FyZC5zZXRBdHRyaWJ1dGUoXCJpZFwiICwgXCJib2FyZFwiKTtcclxuICAgICAgICBsZXQgd2hvc1R1cm4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIHdob3NUdXJuLmNsYXNzTGlzdC5hZGQoXCJwbGF5ZXItdHVyblwiKTtcclxuICAgICAgICB3aG9zVHVybi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInBsYXllci10dXJuXCIpO1xyXG4gICAgICAgIHdob3NUdXJuLmlubmVySFRNTCA9IFwiUGxheWVyIDEncyBUdXJuXCI7XHJcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKHdob3NUdXJuKTtcclxuICAgICAgICBsZXQgY250cmxEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGNudHJsRGl2LmNsYXNzTGlzdC5hZGQoXCJjb250cm9sbGVyLWRpdlwiKTtcclxuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoY250cmxEaXYpO1xyXG4gICAgICAgIGxldCB3YWxsQ291bnRlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgd2FsbENvdW50ZXJEaXYuY2xhc3NMaXN0LmFkZChcIndhbGwtY291bnRlci1kaXZcIik7XHJcbiAgICAgICAgd2FsbENvdW50ZXJEaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJ3YWxsLWNvdW50ZXJcIik7XHJcbiAgICAgICAgbGV0IHBsYXllcjFXYWxscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgbGV0IHBsYXllcjJXYWxscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgcGxheWVyMVdhbGxzLmNsYXNzTGlzdC5hZGQoXCJ3YWxsLWNvdW50ZXJcIik7XHJcbiAgICAgICAgcGxheWVyMldhbGxzLmNsYXNzTGlzdC5hZGQoXCJ3YWxsLWNvdW50ZXJcIik7XHJcbiAgICAgICAgcGxheWVyMVdhbGxzLmlubmVySFRNTCA9IFwicGxheWVyIDEgaGFzIDEwIHdhbGxzIGxlZnRcIjtcclxuICAgICAgICBwbGF5ZXIyV2FsbHMuaW5uZXJIVE1MID0gXCJwbGF5ZXIgMiBoYXMgMTAgd2FsbHMgbGVmdFwiO1xyXG4gICAgICAgIHdhbGxDb3VudGVyRGl2LmFwcGVuZENoaWxkKHBsYXllcjFXYWxscyk7XHJcbiAgICAgICAgd2FsbENvdW50ZXJEaXYuYXBwZW5kQ2hpbGQocGxheWVyMldhbGxzKTtcclxuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQod2FsbENvdW50ZXJEaXYpO1xyXG5cclxuICAgICAgICAvL2J1aWxkIHdhbGxzIGJ1dHRvblxyXG4gICAgICAgIHRoaXMuY3JlYXRlQnV0dG9uKFwiUGxhY2UgYSB3YWxsXCIpO1xyXG4gICAgICAgIC8vbW92ZW1lbnQgYnV0dG9uXHJcbiAgICAgICAgdGhpcy5jcmVhdGVCdXR0b24oXCJNb3ZlIGNoYXJhY3RlclwiKTtcclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIC8qIGluc3RydWN0aW9uIGZvciBjbGlja2luZyBzcXVhcmVzICovXHJcbiAgICAgICAgbGV0IGNsaWNrSW5zdHJ1Y3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgICAgICBjbGlja0luc3RydWN0LmNsYXNzTGlzdC5hZGQoXCJjbGlja0luc3RydWN0XCIpO1xyXG4gICAgICAgIGNsaWNrSW5zdHJ1Y3QuaW5uZXJIVE1MID0gXCJDbGljayB0d28gZGlzdGluY3Qgc3F1YXJlcy4uLlwiXHJcbiAgICAgICAgY2xpY2tJbnN0cnVjdC5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcclxuICAgICAgICBjbnRybERpdi5hcHBlbmRDaGlsZChjbGlja0luc3RydWN0KTtcclxuICAgICAgICAvKiB3YWxsIHR5cGUgYnV0dG9ucyAqL1xyXG4gICAgICAgIGxldCBub3J0aCA9IHRoaXMuY3JlYXRlQnV0dG9uKFwiTm9ydGhcIik7XHJcbiAgICAgICAgbGV0IGVhc3QgPSB0aGlzLmNyZWF0ZUJ1dHRvbihcIkVhc3RcIik7XHJcbiAgICAgICAgbGV0IHNvdXRoID0gdGhpcy5jcmVhdGVCdXR0b24oXCJTb3V0aFwiKTtcclxuICAgICAgICBsZXQgd2VzdCA9IHRoaXMuY3JlYXRlQnV0dG9uKFwiV2VzdFwiKTtcclxuICAgICAgICBub3J0aC5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiLCBcIm5vcnRoXCIpO1xyXG4gICAgICAgIGVhc3QuY2xhc3NMaXN0LmFkZChcImhpZGVcIiwgXCJlYXN0XCIpO1xyXG4gICAgICAgIHNvdXRoLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIsIFwic291dGhcIik7XHJcbiAgICAgICAgd2VzdC5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiLCBcIndlc3RcIik7XHJcbiAgICAgICAgY250cmxEaXYuYXBwZW5kQ2hpbGQobm9ydGgpO1xyXG4gICAgICAgIGNudHJsRGl2LmFwcGVuZENoaWxkKHNvdXRoKTtcclxuICAgICAgICBjbnRybERpdi5hcHBlbmRDaGlsZCh3ZXN0KTtcclxuICAgICAgICBjbnRybERpdi5hcHBlbmRDaGlsZChlYXN0KTtcclxuXHJcbiAgICAgICAgLyogYmFjayBidXR0b24gKi9cclxuICAgICAgICBsZXQgYmFjayA9IHRoaXMuY3JlYXRlQnV0dG9uKFwiYmFja1wiKTtcclxuICAgICAgICBiYWNrLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xyXG4gICAgICAgIGNudHJsRGl2LmFwcGVuZENoaWxkKGJhY2spO1xyXG5cclxuICAgICAgICBmb3IobGV0IHJvd0lkeCA9IDA7IHJvd0lkeCA8IDEwOyByb3dJZHgrKykge1xyXG4gICAgICAgICAgICBsZXQgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XHJcbiAgICAgICAgICAgIGZvcihsZXQgY29sSWR4ID0gMDsgY29sSWR4IDwgMTA7IGNvbElkeCsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhcIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgICAgICBpZihyb3dJZHggPT09IDAgJiYgY29sSWR4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGguaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIHRyLmFwcGVuZENoaWxkKHRoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm93SWR4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGguaW5uZXJIVE1MID0gY29sSWR4IC0gMVxyXG4gICAgICAgICAgICAgICAgICAgIHRyLmFwcGVuZENoaWxkKHRoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm93SWR4ID4gMCAmJiBjb2xJZHggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aC5pbm5lckhUTUwgPSByb3dJZHggLSAxXHJcbiAgICAgICAgICAgICAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZC5pZCA9IGAke3Jvd0lkeCAtIDF9JHtjb2xJZHggLSAxfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGQuY2xhc3NMaXN0LmFkZChcImZsb29yXCIsIFwiaGFsbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0ci5hcHBlbmRDaGlsZCh0ZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQodHIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHYW1lVmlldzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2dhbWVfdmlldy5qc1wiKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=