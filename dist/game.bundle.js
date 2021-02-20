/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const MoveError = __webpack_require__(/*! ./moveError */ "./src/moveError.js");
const Square = __webpack_require__(/*! ./square */ "./src/square.js");

class Board {
    constructor() {
        this.width = 9;
        this.height = 9;
        this.grid = Board.makeGrid(this.width, this.height);
        this.winner = false;
    }

    setPlayers(player1, p1Pos, player2, p2Pos) {
        /* p1Pos & p2Pos = [row, col] */
        let gridSquare2 = this.grid[p2Pos[0]][p2Pos[1]];
        let gridSquare1 = this.grid[p1Pos[0]][p1Pos[1]];
        if(!!player2) {
            gridSquare2.model = "person";
        } else {
            gridSquare2.model = "ai";
        }
        if(!!player1) {
            gridSquare1.model = "person";
        } else {
            gridSquare1.model = "ai";
        }
        gridSquare2.player = "player2";
        gridSquare1.player = "player1";
    }

    checkNeighbors(square) {
        /* 
        requires [[num][num]] 
        square = [rowIdx, colIdx]
        */
        let neighbors = [];
        let colIdx = square[1];
        let rowIdx  = square[0];
        (rowIdx - 1 >= 0) ? neighbors.push([rowIdx - 1, colIdx]) : neighbors.push([-1, -1]);  // north
        (rowIdx + 1 <= 8) ? neighbors.push([rowIdx + 1, colIdx]) : neighbors.push([-1, -1]);  // south
        (colIdx - 1 >= 0) ? neighbors.push([rowIdx, colIdx - 1]) : neighbors.push([-1, -1]);  // west
        (colIdx + 1 <= 8) ? neighbors.push([rowIdx, colIdx + 1]) : neighbors.push([-1, -1]);  // east
        return neighbors;
    }

    isWalled(dir, rowIdx, colIdx) {
        /* 
         returns true if path is blocked by wall
         returns false if path is free
        */
       
        let square = this.grid[rowIdx][colIdx];
        if(dir === "up") {
            if(square.walls.North) {
                return true;
            }
        } else if (dir === "right") {
            if(square.walls.East) {
                return true;
            }
        } else if (dir === "down") {
            if(square.walls.South) {
                return true;
            }
        } else if (dir === "left") {
            if(square.walls.West) {
                return true;
            }
        } else {

        }
        return false;
    }


    bfs(root, goal = ["00","01","02","03","04","05","06","07","08"]) {
        /* 
        root === [rowIdx, colIdx]

        this function is so crusty 
        */


        let hashmap = new Map(); 
        let Q = []; //array of [row, col]
        let discovered = []; //array of id
        hashmap.set(root, null)
        Q.push(root);
        discovered.push(root.join(""));
        while (Q.length > 0) {
            let v = Q.shift(); // pos
            let id = v.join("");
            let square = this.grid[v[0]][v[1]]; //square
            if (goal.includes(id)) {
                let path = [];
                path = this.traverseHashmap(hashmap, v.join(""));
                return [v.join(""), path];
            }
            // finding all possible directions
            
            if ((!square.walls.North && (parseInt(v[0]) > 0))){
                let newV = v.join("").split("");
                newV[0] = parseInt(newV[0]) - 1;
                id = newV.join("");
                if (!discovered.includes(id)) {
                    discovered.push(id);
                    Q.push(newV);
                    hashmap.set(newV.join(""), v.join(""));
                }
            }
            if ((!square.walls.South && (parseInt(v[0]) < 8))) {
                let newV = v.join("").split("");
                newV[0] = parseInt(newV[0]) + 1;
                id = newV.join("");
                if (!discovered.includes(id)) {
                    discovered.push(id);
                    Q.push(newV);
                    hashmap.set(newV.join(""), v.join(""));
                }
            }
            if ((!square.walls.East && (parseInt(v[1]) < 8))) {
                let newV = v.join("").split("");
                newV[1] = parseInt(newV[1]) + 1;
                id = newV.join("");
                if (!discovered.includes(id)) {
                    discovered.push(id);
                    Q.push(newV);
                    hashmap.set(newV.join(""), v.join(""));
                }
            }
            if ((!square.walls.West && (parseInt(v[1]) > 0))) {
                let newV = v.join("").split("");
                newV[1] = parseInt(newV[1]) - 1;
                id = newV.join("");
                if (!discovered.includes(id)) {
                    discovered.push(id);
                    Q.push(newV);
                    hashmap.set(newV.join(""), v.join(""));
                }
            }
        }
        return false;
    }

    traverseHashmap(hash, start) {
        let node = hash.get(start);
        let path = [];
        while (node) {
            path.push(node)
            node = hash.get(node);
        }
        return path.reverse();
    }


    static makeGrid(width, height) {
        const grid = [];

        for (let rowIdx = 0; rowIdx < height; rowIdx++) {
            grid.push([]);
            for (let colIdx = 0; colIdx < width; colIdx++) {
                let square = new Square(colIdx , rowIdx)
                grid[rowIdx].push(square);
            }
        }
        return grid;
    }

    static isValidPos(colIdx, rowIdx) {
        // validation to check the ends of the board
        if ((colIdx < 0 || rowIdx < 0) || (colIdx > 8 || rowIdx > 8)) {
            return false;
        } else if (false) {} else {
            return true;
        }
    }

}

module.exports = Board;

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const MoveError = __webpack_require__(/*! ./moveError */ "./src/moveError.js");
const Board = __webpack_require__(/*! ./board */ "./src/board.js");

class Game {
    constructor() {
        this.board = new Board();
        this.grid = this.board.grid;
        this.currentPlayer = "noone";
        /* this.player = [rowIdx, colIdx] */
        this.player1 = [8, 4];
        this.player2 = [0, 4];
        this.player1Walls = 10;
        this.player2Walls = 10;
        this.state = "not doing anything";

        this.movePlayer = this.movePlayer.bind(this);
    }

    isOver() {
        if (this.winner() !== null) {
            return true;
        } else {
            return false;
        }
    }

    winner() {
        let winner = null;
        for(let i = 0; i < this.grid[0].length; i++) {
            // document.getElementById(`${i + 1}1`).style.backgroundColor = "green";
            if(this.grid[0][i].player === "player1") {
                winner = "player1"
            }
            if(this.grid[8][i].player === "player2") {
                winner = "player2"
            }
        }
        return winner;
    }

    takeTurn(action, dir = null, event, squareA = null, squareB = null) {
        // movement or wall placement?

        if (action === "move") {
            if((dir === "up") || (dir === "right") || (dir === "down") || (dir === "left")) {
                this.movePlayer(dir);
            }
            if(dir === null) {
                this.movePlayer(event.target.id.split(""));
            }
        }

        if (action === "placeWall") {
            // calls this.placeWall()
            this.placeWall(dir, event, squareA, squareB);
            //    the previous solution to placing walls seems bloated but once its implemented its fluid...
            //    I am thinking of having the place wall button morph into a north east south west button...
            //       might be better if client selects the cells they wish to place a wall before button morphs
            //       that way only north south or east west buttons will spawn
            //    selecting cells will be fluid with mouse click or less fluid with key pressing coordinates
        }

    }

    placeWall(dir, event, squareA, squareB) {
        /*
        squareA & squareB = [rowIdx, colIdx]
        get Square and set the specific walls to true 
        get neighbors and sset specific walls to true... opposite wall
        squarePos = this.grid[rowIdx, colIdx]
        */
        let sqrA = this.grid[squareA[0]][squareA[1]];
        let sqrB = this.grid[squareB[0]][squareB[1]];
        let neighborsA = this.board.checkNeighbors([sqrA.rowIdx, sqrA.colIdx]);
        let neighborsB = this.board.checkNeighbors([sqrB.rowIdx, sqrB.colIdx]);
        let isValidWall;
        let playerWalls;
        this.currentPlayer === "player1" ? playerWalls = this.player1Walls : playerWalls = this.player2Walls
        if (playerWalls > 0) {

            if(dir === "North" && (!sqrA.walls.North && !sqrB.walls.North)){
                sqrA.walls.North = true;
                sqrB.walls.North = true;
                /* sets the north neighbors south wall to true */
                this.grid[neighborsA[0][0]][neighborsA[0][1]].walls.South = true;
                this.grid[neighborsB[0][0]][neighborsB[0][1]].walls.South = true;
                isValidWall = this.findPath();
                if(isValidWall) {
                    if (this.currentPlayer === "player1") this.player1Walls = this.player1Walls - 1;
                    if (this.currentPlayer === "player2") this.player2Walls = this.player2Walls - 1;
                    this.swapTurn();
                } else {
                    sqrA.walls.North = false;
                    sqrB.walls.North = false;
                    this.grid[neighborsA[0][0]][neighborsA[0][1]].walls.South = false;
                    this.grid[neighborsB[0][0]][neighborsB[0][1]].walls.South = false;
                }
            }
            if(dir === "East" && (!sqrA.walls.East && !sqrB.walls.East)){
                sqrA.walls.East = true;
                sqrB.walls.East = true;
                /* sets the East neighbors West wall to true */
                this.grid[neighborsA[3][0]][neighborsA[3][1]].walls.West = true;
                this.grid[neighborsB[3][0]][neighborsB[3][1]].walls.West = true;
                isValidWall = this.findPath();
                if(isValidWall) {
                    if (this.currentPlayer === "player1") this.player1Walls = this.player1Walls - 1;
                    if (this.currentPlayer === "player2") this.player2Walls = this.player2Walls - 1;
                    this.swapTurn();
                } else {
                    sqrA.walls.East = false;
                    sqrB.walls.East = false;
                    this.grid[neighborsA[3][0]][neighborsA[3][1]].walls.West = false;
                    this.grid[neighborsB[3][0]][neighborsB[3][1]].walls.West = false;
                }
            }
            if(dir === "South" && (!sqrA.walls.South && !sqrB.walls.South)){
                sqrA.walls.South = true;
                sqrB.walls.South = true;
                /* sets the South neighbors North wall to true */
                this.grid[neighborsA[1][0]][neighborsA[1][1]].walls.North = true;
                this.grid[neighborsB[1][0]][neighborsB[1][1]].walls.North = true;
                isValidWall = this.findPath();
                if(isValidWall) {
                    if (this.currentPlayer === "player1") this.player1Walls = this.player1Walls - 1;
                    if (this.currentPlayer === "player2") this.player2Walls = this.player2Walls - 1;
                    this.swapTurn();
                } else {
                    sqrA.walls.South = false;
                    sqrB.walls.South = false;
                    this.grid[neighborsA[1][0]][neighborsA[1][1]].walls.North = false;
                    this.grid[neighborsB[1][0]][neighborsB[1][1]].walls.North = false;
                }
            }
            if(dir === "West" && (!sqrA.walls.West && !sqrB.walls.West)){
                sqrA.walls.West = true;
                sqrB.walls.West = true;
                /* sets the West neighbors East wall to true */
                this.grid[neighborsA[2][0]][neighborsA[2][1]].walls.East = true;
                this.grid[neighborsB[2][0]][neighborsB[2][1]].walls.East = true;
                isValidWall = this.findPath();
                if(isValidWall) {
                    if (this.currentPlayer === "player1") this.player1Walls = this.player1Walls - 1;
                    if (this.currentPlayer === "player2") this.player2Walls = this.player2Walls - 1;
                    this.swapTurn();
                } else {
                    sqrA.walls.West = false;
                    sqrB.walls.West = false;
                    this.grid[neighborsA[2][0]][neighborsA[2][1]].walls.East = false;
                    this.grid[neighborsB[2][0]][neighborsB[2][1]].walls.East = false;
                }
            }
        }
    }

    movePlayer(dir) {
        // takes current player current pos
        // calculates future pos with dir
        let player;
        this.currentPlayer === "player1" ? player = this.player1 : player = this.player2
        let newColIdx;
        let newRowIdx;
        let isWalled;
        let isValid;
        if (dir === "up") {
            newColIdx = player[1];
            newRowIdx = player[0] - 1;
        } else if (dir === "right") {
            newColIdx = player[1] + 1;
            newRowIdx = player[0];
        } else if (dir === "down") {
            newColIdx = player[1];
            newRowIdx = player[0] + 1;
        } else if (dir === "left") {
            newColIdx = player[1] - 1;
            newRowIdx = player[0];
        } else {
            newRowIdx = parseInt(dir[0]);
            newColIdx = parseInt(dir[1]);
        }

        /*
        The below validation no longer works for clicking movement.  
        check for walls
         */
        isWalled = this.board.isWalled(dir, player[0], player[1]);
        // gives to this.board to validate
        isValid = Board.isValidPos(newColIdx, newRowIdx);
        
        // if valid then sets player new x and y
        //    swaps turns
        if (isValid && !isWalled) {

            let oldSquare = this.board.grid[player[0]][player[1]];
            let newSquare = this.board.grid[newRowIdx][newColIdx];

            //validation to check for player collision         
            if (newSquare.player !== "empty") {
            } else {
                oldSquare.player = "empty";
                this.setPlayerPos(this.currentPlayer, [newRowIdx, newColIdx]);
                newSquare.player = this.currentPlayer;
                this.swapTurn();
            }


        } else {
            // else then does nothing or sends error message
            //    does not swap turns

        }
    }

    getAvailableMoves(pos) {
        let player = this.currentPlayer === "player1" ? this.player1 : this.player2;
        let opponent = this.currentPlayer === "player1" ? this.player2 : this.player1;
        let moves = [];
        let currentSquare = this.grid[pos[0]][pos[1]];
        let square;
        let colIdx = pos[1];
        let rowIdx  = pos[0];
        /* check for player */
        if ((rowIdx - 1 >= 0) && (!currentSquare.walls.North)) {
            square = this.grid[rowIdx - 1][colIdx];
            if (square.player === "empty") {
                moves.push([rowIdx - 1, colIdx]);  // north
            } else if (["player1", "player2"].includes(square.player)){
                if ((rowIdx - 2 >= 0) && (!square.walls.North)) {
                    moves.push([rowIdx - 2, colIdx]);
                } else {
                    let tempSquare = rowIdx - 2 >= 0 ? this.grid[rowIdx - 2][colIdx] : undefined;
                    if (square.walls.North) {
                        if (!square.walls.East) moves.push([rowIdx - 1, colIdx + 1]);
                        if (!square.walls.West) moves.push([rowIdx - 1, colIdx - 1]);
                    } else {
                        if (!tempSquare) {
                            if (!square.walls.East) moves.push([rowIdx - 1, colIdx + 1]);
                            if (!square.walls.West) moves.push([rowIdx - 1, colIdx - 1]);
                        }
                    }
                }
            }
        }
        if ((colIdx + 1 <= 8) && (!currentSquare.walls.East)) {
            square = this.grid[rowIdx][colIdx + 1];
            if (square.player === "empty") {
                moves.push([rowIdx, colIdx + 1]);  // east
            } else if (["player1", "player2"].includes(square.player)){
                if ((colIdx + 2 <= 8) && (!square.walls.East)) {
                    moves.push([rowIdx, colIdx + 2]);
                } else {
                    let tempSquare = colIdx + 2 <= 8 ? this.grid[rowIdx][colIdx + 2] : undefined;
                    if (square.walls.East) {
                        if (!square.walls.North) moves.push([rowIdx - 1, colIdx + 1]);
                        if (!square.walls.South) moves.push([rowIdx + 1, colIdx + 1]);
                    } else {
                        if (!tempSquare) {
                            if (!square.walls.North) moves.push([rowIdx - 1, colIdx + 1]);
                            if (!square.walls.South) moves.push([rowIdx + 1, colIdx + 1]);
                        }
                    }
                }
            }
        }
        if ((rowIdx + 1 <= 8) && (!currentSquare.walls.South)) {
            square = this.grid[rowIdx + 1][colIdx];
            if (square.player === "empty") {
                moves.push([rowIdx + 1, colIdx]);  // south
            } else if (["player1", "player2"].includes(square.player)){
                if ((rowIdx + 2 <= 8) && (!square.walls.South)) {
                    moves.push([rowIdx + 2, colIdx]);
                } else {
                    let tempSquare = rowIdx + 2 <= 8 ? this.grid[rowIdx + 2][colIdx] : undefined;
                    if (square.walls.South) {
                        if (!square.walls.East) moves.push([rowIdx + 1, colIdx + 1]);
                        if (!square.walls.West) moves.push([rowIdx + 1, colIdx - 1]);
                    } else {
                        if (!tempSquare) {
                            if (!square.walls.East) moves.push([rowIdx + 1, colIdx + 1]);
                            if (!square.walls.West) moves.push([rowIdx + 1, colIdx - 1]);
                        }
                    }
                }
            }
        }
        if ((colIdx - 1 >= 0) && (!currentSquare.walls.West)) {
            square = this.grid[rowIdx][colIdx - 1];
            if (square.player === "empty") {
                moves.push([rowIdx, colIdx - 1]);  // west
            } else if (["player1", "player2"].includes(square.player)){
                if ((colIdx - 2 >= 0) && (!square.walls.West)) {
                    moves.push([rowIdx, colIdx - 2]);
                } else {
                    let tempSquare = colIdx - 2 >= 0 ? this.grid[rowIdx][colIdx - 2] : undefined;
                    if (square.walls.West) {
                        if (!square.walls.North) moves.push([rowIdx - 1, colIdx - 1]);
                        if (!square.walls.South) moves.push([rowIdx + 1, colIdx - 1]);
                    } else {
                        if (!tempSquare) {
                            if (!square.walls.North) moves.push([rowIdx - 1, colIdx - 1]);
                            if (!square.walls.South) moves.push([rowIdx + 1, colIdx - 1]);
                        }
                    }
                }
            }
        }
        /* 
        checkNeighbors returns an array of 
        [north, east, south, west] positions
        should now check to see if any of those positions collide 
        with a wall or player and adjust moves
         */
        for (let i = 0; i < moves.length; i++) {
            square = this.grid[moves[i][0]][moves[i][1]];
        }

        return moves;
    }


    setPlayerPos(player, pos) {
        if (player === "player1") {
            this.player1 = pos;
        } else if (player === "player2") {
            this.player2 = pos;
        }
    }

    start() {
        this.board.setPlayers(true, this.player1, false, this.player2);
        this.currentPlayer = "player1";
    }

    swapTurn() {
        if( this.currentPlayer === "player1" ) {
            this.currentPlayer = "player2";
        } else if( this.currentPlayer === "player2" ) {
            this.currentPlayer = "player1";
        }
    }

    findPath() {
        /* 
        run the bfs
         */
        return !!this.board.bfs(this.player1);
    }

}

module.exports = Game;

/***/ }),

/***/ "./src/moveError.js":
/*!**************************!*\
  !*** ./src/moveError.js ***!
  \**************************/
/***/ ((module) => {

const MoveError = function (msg) { this.msg = msg; };

// MoveError really should be a child class of the built in Error object provided
// by Javascript, but since we haven't covered inheritance yet, we'll just
// let it be a vanilla Object for now!

module.exports = MoveError;

/***/ }),

/***/ "./src/square.js":
/*!***********************!*\
  !*** ./src/square.js ***!
  \***********************/
/***/ ((module) => {

class Square {
    constructor(colIdx, rowIdx) {
        this.walls = {
            North: false,
            East: false,
            South: false,
            West: false
        }
        this.colIdx = colIdx;
        this.rowIdx = rowIdx; 
        this.player = "empty";
        this.model = "noone"
    }

    // getNorth() {
    //     return this.walls.North;
    // }
    // getEast() {
    //     return this.walls.East;
    // }
    // getSouth() {
    //     return this.walls.South;
    // }
    // getWest() {
    //     return this.walls.West;
    // }

    // setNorth(bool) {
    //     bool ? this.walls.North = bool : this.walls.North = !bool;
    // }
    // setEast(bool) {
    //     bool ? this.walls.East = bool : this.walls.East = !bool;
    // }
    // setSouth(bool) {
    //     bool ? this.walls.South = bool : this.walls.South = !bool;
    // }
    // setWest(bool) {
    //     bool ? this.walls.West = bool : this.walls.West = !bool;
    // }
}

module.exports = Square;

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
/******/ 	__webpack_require__("./src/game.js");
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9xdW9yaWRvci8uL3NyYy9ib2FyZC5qcyIsIndlYnBhY2s6Ly9xdW9yaWRvci8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL3F1b3JpZG9yLy4vc3JjL21vdmVFcnJvci5qcyIsIndlYnBhY2s6Ly9xdW9yaWRvci8uL3NyYy9zcXVhcmUuanMiLCJ3ZWJwYWNrOi8vcXVvcmlkb3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcXVvcmlkb3Ivd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGtCQUFrQixtQkFBTyxDQUFDLHVDQUFhO0FBQ3ZDLGVBQWUsbUJBQU8sQ0FBQyxpQ0FBVTs7QUFFakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRGQUE0RjtBQUM1Riw0RkFBNEY7QUFDNUYsNEZBQTRGO0FBQzVGLDRGQUE0RjtBQUM1RjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0EsZ0M7QUFDQSxtQkFBbUI7QUFDbkIsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0EsK0NBQStDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUEsNEJBQTRCLGlCQUFpQjtBQUM3QztBQUNBLGdDQUFnQyxnQkFBZ0I7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxVQUFVLEtBQUssRUFBRSxFQUNqQjtBQUNUO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSx1Qjs7Ozs7Ozs7OztBQ25MQSxrQkFBa0IsbUJBQU8sQ0FBQyx1Q0FBYTtBQUN2QyxjQUFjLG1CQUFPLENBQUMsK0JBQVM7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQkFBc0IseUJBQXlCO0FBQy9DLDBDQUEwQyxNQUFNO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pELGFBQWE7QUFDYjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQsYUFBYTtBQUNiO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRCxhQUFhO0FBQ2I7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pELGFBQWE7QUFDYjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxzQjs7Ozs7Ozs7OztBQzlWQSxrQ0FBa0MsZ0JBQWdCOztBQUVsRDtBQUNBO0FBQ0E7O0FBRUEsMkI7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0I7Ozs7OztVQ3pDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7O1VDckJBO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImdhbWUuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgTW92ZUVycm9yID0gcmVxdWlyZShcIi4vbW92ZUVycm9yXCIpO1xyXG5jb25zdCBTcXVhcmUgPSByZXF1aXJlKFwiLi9zcXVhcmVcIik7XHJcblxyXG5jbGFzcyBCb2FyZCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLndpZHRoID0gOTtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IDk7XHJcbiAgICAgICAgdGhpcy5ncmlkID0gQm9hcmQubWFrZUdyaWQodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgICAgIHRoaXMud2lubmVyID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGxheWVycyhwbGF5ZXIxLCBwMVBvcywgcGxheWVyMiwgcDJQb3MpIHtcclxuICAgICAgICAvKiBwMVBvcyAmIHAyUG9zID0gW3JvdywgY29sXSAqL1xyXG4gICAgICAgIGxldCBncmlkU3F1YXJlMiA9IHRoaXMuZ3JpZFtwMlBvc1swXV1bcDJQb3NbMV1dO1xyXG4gICAgICAgIGxldCBncmlkU3F1YXJlMSA9IHRoaXMuZ3JpZFtwMVBvc1swXV1bcDFQb3NbMV1dO1xyXG4gICAgICAgIGlmKCEhcGxheWVyMikge1xyXG4gICAgICAgICAgICBncmlkU3F1YXJlMi5tb2RlbCA9IFwicGVyc29uXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ3JpZFNxdWFyZTIubW9kZWwgPSBcImFpXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCEhcGxheWVyMSkge1xyXG4gICAgICAgICAgICBncmlkU3F1YXJlMS5tb2RlbCA9IFwicGVyc29uXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ3JpZFNxdWFyZTEubW9kZWwgPSBcImFpXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdyaWRTcXVhcmUyLnBsYXllciA9IFwicGxheWVyMlwiO1xyXG4gICAgICAgIGdyaWRTcXVhcmUxLnBsYXllciA9IFwicGxheWVyMVwiO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrTmVpZ2hib3JzKHNxdWFyZSkge1xyXG4gICAgICAgIC8qIFxyXG4gICAgICAgIHJlcXVpcmVzIFtbbnVtXVtudW1dXSBcclxuICAgICAgICBzcXVhcmUgPSBbcm93SWR4LCBjb2xJZHhdXHJcbiAgICAgICAgKi9cclxuICAgICAgICBsZXQgbmVpZ2hib3JzID0gW107XHJcbiAgICAgICAgbGV0IGNvbElkeCA9IHNxdWFyZVsxXTtcclxuICAgICAgICBsZXQgcm93SWR4ICA9IHNxdWFyZVswXTtcclxuICAgICAgICAocm93SWR4IC0gMSA+PSAwKSA/IG5laWdoYm9ycy5wdXNoKFtyb3dJZHggLSAxLCBjb2xJZHhdKSA6IG5laWdoYm9ycy5wdXNoKFstMSwgLTFdKTsgIC8vIG5vcnRoXHJcbiAgICAgICAgKHJvd0lkeCArIDEgPD0gOCkgPyBuZWlnaGJvcnMucHVzaChbcm93SWR4ICsgMSwgY29sSWR4XSkgOiBuZWlnaGJvcnMucHVzaChbLTEsIC0xXSk7ICAvLyBzb3V0aFxyXG4gICAgICAgIChjb2xJZHggLSAxID49IDApID8gbmVpZ2hib3JzLnB1c2goW3Jvd0lkeCwgY29sSWR4IC0gMV0pIDogbmVpZ2hib3JzLnB1c2goWy0xLCAtMV0pOyAgLy8gd2VzdFxyXG4gICAgICAgIChjb2xJZHggKyAxIDw9IDgpID8gbmVpZ2hib3JzLnB1c2goW3Jvd0lkeCwgY29sSWR4ICsgMV0pIDogbmVpZ2hib3JzLnB1c2goWy0xLCAtMV0pOyAgLy8gZWFzdFxyXG4gICAgICAgIHJldHVybiBuZWlnaGJvcnM7XHJcbiAgICB9XHJcblxyXG4gICAgaXNXYWxsZWQoZGlyLCByb3dJZHgsIGNvbElkeCkge1xyXG4gICAgICAgIC8qIFxyXG4gICAgICAgICByZXR1cm5zIHRydWUgaWYgcGF0aCBpcyBibG9ja2VkIGJ5IHdhbGxcclxuICAgICAgICAgcmV0dXJucyBmYWxzZSBpZiBwYXRoIGlzIGZyZWVcclxuICAgICAgICAqL1xyXG4gICAgICAgXHJcbiAgICAgICAgbGV0IHNxdWFyZSA9IHRoaXMuZ3JpZFtyb3dJZHhdW2NvbElkeF07XHJcbiAgICAgICAgaWYoZGlyID09PSBcInVwXCIpIHtcclxuICAgICAgICAgICAgaWYoc3F1YXJlLndhbGxzLk5vcnRoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZGlyID09PSBcInJpZ2h0XCIpIHtcclxuICAgICAgICAgICAgaWYoc3F1YXJlLndhbGxzLkVhc3QpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChkaXIgPT09IFwiZG93blwiKSB7XHJcbiAgICAgICAgICAgIGlmKHNxdWFyZS53YWxscy5Tb3V0aCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGRpciA9PT0gXCJsZWZ0XCIpIHtcclxuICAgICAgICAgICAgaWYoc3F1YXJlLndhbGxzLldlc3QpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgYmZzKHJvb3QsIGdvYWwgPSBbXCIwMFwiLFwiMDFcIixcIjAyXCIsXCIwM1wiLFwiMDRcIixcIjA1XCIsXCIwNlwiLFwiMDdcIixcIjA4XCJdKSB7XHJcbiAgICAgICAgLyogXHJcbiAgICAgICAgcm9vdCA9PT0gW3Jvd0lkeCwgY29sSWR4XVxyXG5cclxuICAgICAgICB0aGlzIGZ1bmN0aW9uIGlzIHNvIGNydXN0eSBcclxuICAgICAgICAqL1xyXG5cclxuXHJcbiAgICAgICAgbGV0IGhhc2htYXAgPSBuZXcgTWFwKCk7IFxyXG4gICAgICAgIGxldCBRID0gW107IC8vYXJyYXkgb2YgW3JvdywgY29sXVxyXG4gICAgICAgIGxldCBkaXNjb3ZlcmVkID0gW107IC8vYXJyYXkgb2YgaWRcclxuICAgICAgICBoYXNobWFwLnNldChyb290LCBudWxsKVxyXG4gICAgICAgIFEucHVzaChyb290KTtcclxuICAgICAgICBkaXNjb3ZlcmVkLnB1c2gocm9vdC5qb2luKFwiXCIpKTtcclxuICAgICAgICB3aGlsZSAoUS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCB2ID0gUS5zaGlmdCgpOyAvLyBwb3NcclxuICAgICAgICAgICAgbGV0IGlkID0gdi5qb2luKFwiXCIpO1xyXG4gICAgICAgICAgICBsZXQgc3F1YXJlID0gdGhpcy5ncmlkW3ZbMF1dW3ZbMV1dOyAvL3NxdWFyZVxyXG4gICAgICAgICAgICBpZiAoZ29hbC5pbmNsdWRlcyhpZCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwYXRoID0gW107XHJcbiAgICAgICAgICAgICAgICBwYXRoID0gdGhpcy50cmF2ZXJzZUhhc2htYXAoaGFzaG1hcCwgdi5qb2luKFwiXCIpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbdi5qb2luKFwiXCIpLCBwYXRoXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBmaW5kaW5nIGFsbCBwb3NzaWJsZSBkaXJlY3Rpb25zXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoKCFzcXVhcmUud2FsbHMuTm9ydGggJiYgKHBhcnNlSW50KHZbMF0pID4gMCkpKXtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdWID0gdi5qb2luKFwiXCIpLnNwbGl0KFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgbmV3VlswXSA9IHBhcnNlSW50KG5ld1ZbMF0pIC0gMTtcclxuICAgICAgICAgICAgICAgIGlkID0gbmV3Vi5qb2luKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkaXNjb3ZlcmVkLmluY2x1ZGVzKGlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2NvdmVyZWQucHVzaChpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgUS5wdXNoKG5ld1YpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc2htYXAuc2V0KG5ld1Yuam9pbihcIlwiKSwgdi5qb2luKFwiXCIpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoKCFzcXVhcmUud2FsbHMuU291dGggJiYgKHBhcnNlSW50KHZbMF0pIDwgOCkpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3ViA9IHYuam9pbihcIlwiKS5zcGxpdChcIlwiKTtcclxuICAgICAgICAgICAgICAgIG5ld1ZbMF0gPSBwYXJzZUludChuZXdWWzBdKSArIDE7XHJcbiAgICAgICAgICAgICAgICBpZCA9IG5ld1Yuam9pbihcIlwiKTtcclxuICAgICAgICAgICAgICAgIGlmICghZGlzY292ZXJlZC5pbmNsdWRlcyhpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNjb3ZlcmVkLnB1c2goaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIFEucHVzaChuZXdWKTtcclxuICAgICAgICAgICAgICAgICAgICBoYXNobWFwLnNldChuZXdWLmpvaW4oXCJcIiksIHYuam9pbihcIlwiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCghc3F1YXJlLndhbGxzLkVhc3QgJiYgKHBhcnNlSW50KHZbMV0pIDwgOCkpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3ViA9IHYuam9pbihcIlwiKS5zcGxpdChcIlwiKTtcclxuICAgICAgICAgICAgICAgIG5ld1ZbMV0gPSBwYXJzZUludChuZXdWWzFdKSArIDE7XHJcbiAgICAgICAgICAgICAgICBpZCA9IG5ld1Yuam9pbihcIlwiKTtcclxuICAgICAgICAgICAgICAgIGlmICghZGlzY292ZXJlZC5pbmNsdWRlcyhpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNjb3ZlcmVkLnB1c2goaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIFEucHVzaChuZXdWKTtcclxuICAgICAgICAgICAgICAgICAgICBoYXNobWFwLnNldChuZXdWLmpvaW4oXCJcIiksIHYuam9pbihcIlwiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCghc3F1YXJlLndhbGxzLldlc3QgJiYgKHBhcnNlSW50KHZbMV0pID4gMCkpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3ViA9IHYuam9pbihcIlwiKS5zcGxpdChcIlwiKTtcclxuICAgICAgICAgICAgICAgIG5ld1ZbMV0gPSBwYXJzZUludChuZXdWWzFdKSAtIDE7XHJcbiAgICAgICAgICAgICAgICBpZCA9IG5ld1Yuam9pbihcIlwiKTtcclxuICAgICAgICAgICAgICAgIGlmICghZGlzY292ZXJlZC5pbmNsdWRlcyhpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNjb3ZlcmVkLnB1c2goaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIFEucHVzaChuZXdWKTtcclxuICAgICAgICAgICAgICAgICAgICBoYXNobWFwLnNldChuZXdWLmpvaW4oXCJcIiksIHYuam9pbihcIlwiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHRyYXZlcnNlSGFzaG1hcChoYXNoLCBzdGFydCkge1xyXG4gICAgICAgIGxldCBub2RlID0gaGFzaC5nZXQoc3RhcnQpO1xyXG4gICAgICAgIGxldCBwYXRoID0gW107XHJcbiAgICAgICAgd2hpbGUgKG5vZGUpIHtcclxuICAgICAgICAgICAgcGF0aC5wdXNoKG5vZGUpXHJcbiAgICAgICAgICAgIG5vZGUgPSBoYXNoLmdldChub2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBhdGgucmV2ZXJzZSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzdGF0aWMgbWFrZUdyaWQod2lkdGgsIGhlaWdodCkge1xyXG4gICAgICAgIGNvbnN0IGdyaWQgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgcm93SWR4ID0gMDsgcm93SWR4IDwgaGVpZ2h0OyByb3dJZHgrKykge1xyXG4gICAgICAgICAgICBncmlkLnB1c2goW10pO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjb2xJZHggPSAwOyBjb2xJZHggPCB3aWR0aDsgY29sSWR4KyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBzcXVhcmUgPSBuZXcgU3F1YXJlKGNvbElkeCAsIHJvd0lkeClcclxuICAgICAgICAgICAgICAgIGdyaWRbcm93SWR4XS5wdXNoKHNxdWFyZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGdyaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGlzVmFsaWRQb3MoY29sSWR4LCByb3dJZHgpIHtcclxuICAgICAgICAvLyB2YWxpZGF0aW9uIHRvIGNoZWNrIHRoZSBlbmRzIG9mIHRoZSBib2FyZFxyXG4gICAgICAgIGlmICgoY29sSWR4IDwgMCB8fCByb3dJZHggPCAwKSB8fCAoY29sSWR4ID4gOCB8fCByb3dJZHggPiA4KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmIChmYWxzZSkge1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQm9hcmQ7IiwiY29uc3QgTW92ZUVycm9yID0gcmVxdWlyZShcIi4vbW92ZUVycm9yXCIpO1xyXG5jb25zdCBCb2FyZCA9IHJlcXVpcmUoXCIuL2JvYXJkXCIpO1xyXG5cclxuY2xhc3MgR2FtZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmJvYXJkID0gbmV3IEJvYXJkKCk7XHJcbiAgICAgICAgdGhpcy5ncmlkID0gdGhpcy5ib2FyZC5ncmlkO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFBsYXllciA9IFwibm9vbmVcIjtcclxuICAgICAgICAvKiB0aGlzLnBsYXllciA9IFtyb3dJZHgsIGNvbElkeF0gKi9cclxuICAgICAgICB0aGlzLnBsYXllcjEgPSBbOCwgNF07XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIyID0gWzAsIDRdO1xyXG4gICAgICAgIHRoaXMucGxheWVyMVdhbGxzID0gMTA7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIyV2FsbHMgPSAxMDtcclxuICAgICAgICB0aGlzLnN0YXRlID0gXCJub3QgZG9pbmcgYW55dGhpbmdcIjtcclxuXHJcbiAgICAgICAgdGhpcy5tb3ZlUGxheWVyID0gdGhpcy5tb3ZlUGxheWVyLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNPdmVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLndpbm5lcigpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgd2lubmVyKCkge1xyXG4gICAgICAgIGxldCB3aW5uZXIgPSBudWxsO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmdyaWRbMF0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7aSArIDF9MWApLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiZ3JlZW5cIjtcclxuICAgICAgICAgICAgaWYodGhpcy5ncmlkWzBdW2ldLnBsYXllciA9PT0gXCJwbGF5ZXIxXCIpIHtcclxuICAgICAgICAgICAgICAgIHdpbm5lciA9IFwicGxheWVyMVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5ncmlkWzhdW2ldLnBsYXllciA9PT0gXCJwbGF5ZXIyXCIpIHtcclxuICAgICAgICAgICAgICAgIHdpbm5lciA9IFwicGxheWVyMlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHdpbm5lcjtcclxuICAgIH1cclxuXHJcbiAgICB0YWtlVHVybihhY3Rpb24sIGRpciA9IG51bGwsIGV2ZW50LCBzcXVhcmVBID0gbnVsbCwgc3F1YXJlQiA9IG51bGwpIHtcclxuICAgICAgICAvLyBtb3ZlbWVudCBvciB3YWxsIHBsYWNlbWVudD9cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gXCJtb3ZlXCIpIHtcclxuICAgICAgICAgICAgaWYoKGRpciA9PT0gXCJ1cFwiKSB8fCAoZGlyID09PSBcInJpZ2h0XCIpIHx8IChkaXIgPT09IFwiZG93blwiKSB8fCAoZGlyID09PSBcImxlZnRcIikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZVBsYXllcihkaXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGRpciA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlUGxheWVyKGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIlwiKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24gPT09IFwicGxhY2VXYWxsXCIpIHtcclxuICAgICAgICAgICAgLy8gY2FsbHMgdGhpcy5wbGFjZVdhbGwoKVxyXG4gICAgICAgICAgICB0aGlzLnBsYWNlV2FsbChkaXIsIGV2ZW50LCBzcXVhcmVBLCBzcXVhcmVCKTtcclxuICAgICAgICAgICAgLy8gICAgdGhlIHByZXZpb3VzIHNvbHV0aW9uIHRvIHBsYWNpbmcgd2FsbHMgc2VlbXMgYmxvYXRlZCBidXQgb25jZSBpdHMgaW1wbGVtZW50ZWQgaXRzIGZsdWlkLi4uXHJcbiAgICAgICAgICAgIC8vICAgIEkgYW0gdGhpbmtpbmcgb2YgaGF2aW5nIHRoZSBwbGFjZSB3YWxsIGJ1dHRvbiBtb3JwaCBpbnRvIGEgbm9ydGggZWFzdCBzb3V0aCB3ZXN0IGJ1dHRvbi4uLlxyXG4gICAgICAgICAgICAvLyAgICAgICBtaWdodCBiZSBiZXR0ZXIgaWYgY2xpZW50IHNlbGVjdHMgdGhlIGNlbGxzIHRoZXkgd2lzaCB0byBwbGFjZSBhIHdhbGwgYmVmb3JlIGJ1dHRvbiBtb3JwaHNcclxuICAgICAgICAgICAgLy8gICAgICAgdGhhdCB3YXkgb25seSBub3J0aCBzb3V0aCBvciBlYXN0IHdlc3QgYnV0dG9ucyB3aWxsIHNwYXduXHJcbiAgICAgICAgICAgIC8vICAgIHNlbGVjdGluZyBjZWxscyB3aWxsIGJlIGZsdWlkIHdpdGggbW91c2UgY2xpY2sgb3IgbGVzcyBmbHVpZCB3aXRoIGtleSBwcmVzc2luZyBjb29yZGluYXRlc1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcGxhY2VXYWxsKGRpciwgZXZlbnQsIHNxdWFyZUEsIHNxdWFyZUIpIHtcclxuICAgICAgICAvKlxyXG4gICAgICAgIHNxdWFyZUEgJiBzcXVhcmVCID0gW3Jvd0lkeCwgY29sSWR4XVxyXG4gICAgICAgIGdldCBTcXVhcmUgYW5kIHNldCB0aGUgc3BlY2lmaWMgd2FsbHMgdG8gdHJ1ZSBcclxuICAgICAgICBnZXQgbmVpZ2hib3JzIGFuZCBzc2V0IHNwZWNpZmljIHdhbGxzIHRvIHRydWUuLi4gb3Bwb3NpdGUgd2FsbFxyXG4gICAgICAgIHNxdWFyZVBvcyA9IHRoaXMuZ3JpZFtyb3dJZHgsIGNvbElkeF1cclxuICAgICAgICAqL1xyXG4gICAgICAgIGxldCBzcXJBID0gdGhpcy5ncmlkW3NxdWFyZUFbMF1dW3NxdWFyZUFbMV1dO1xyXG4gICAgICAgIGxldCBzcXJCID0gdGhpcy5ncmlkW3NxdWFyZUJbMF1dW3NxdWFyZUJbMV1dO1xyXG4gICAgICAgIGxldCBuZWlnaGJvcnNBID0gdGhpcy5ib2FyZC5jaGVja05laWdoYm9ycyhbc3FyQS5yb3dJZHgsIHNxckEuY29sSWR4XSk7XHJcbiAgICAgICAgbGV0IG5laWdoYm9yc0IgPSB0aGlzLmJvYXJkLmNoZWNrTmVpZ2hib3JzKFtzcXJCLnJvd0lkeCwgc3FyQi5jb2xJZHhdKTtcclxuICAgICAgICBsZXQgaXNWYWxpZFdhbGw7XHJcbiAgICAgICAgbGV0IHBsYXllcldhbGxzO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFBsYXllciA9PT0gXCJwbGF5ZXIxXCIgPyBwbGF5ZXJXYWxscyA9IHRoaXMucGxheWVyMVdhbGxzIDogcGxheWVyV2FsbHMgPSB0aGlzLnBsYXllcjJXYWxsc1xyXG4gICAgICAgIGlmIChwbGF5ZXJXYWxscyA+IDApIHtcclxuXHJcbiAgICAgICAgICAgIGlmKGRpciA9PT0gXCJOb3J0aFwiICYmICghc3FyQS53YWxscy5Ob3J0aCAmJiAhc3FyQi53YWxscy5Ob3J0aCkpe1xyXG4gICAgICAgICAgICAgICAgc3FyQS53YWxscy5Ob3J0aCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzcXJCLndhbGxzLk5vcnRoID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8qIHNldHMgdGhlIG5vcnRoIG5laWdoYm9ycyBzb3V0aCB3YWxsIHRvIHRydWUgKi9cclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtuZWlnaGJvcnNBWzBdWzBdXVtuZWlnaGJvcnNBWzBdWzFdXS53YWxscy5Tb3V0aCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRbbmVpZ2hib3JzQlswXVswXV1bbmVpZ2hib3JzQlswXVsxXV0ud2FsbHMuU291dGggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaXNWYWxpZFdhbGwgPSB0aGlzLmZpbmRQYXRoKCk7XHJcbiAgICAgICAgICAgICAgICBpZihpc1ZhbGlkV2FsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyMVwiKSB0aGlzLnBsYXllcjFXYWxscyA9IHRoaXMucGxheWVyMVdhbGxzIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50UGxheWVyID09PSBcInBsYXllcjJcIikgdGhpcy5wbGF5ZXIyV2FsbHMgPSB0aGlzLnBsYXllcjJXYWxscyAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2FwVHVybigpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzcXJBLndhbGxzLk5vcnRoID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgc3FyQi53YWxscy5Ob3J0aCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtuZWlnaGJvcnNBWzBdWzBdXVtuZWlnaGJvcnNBWzBdWzFdXS53YWxscy5Tb3V0aCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtuZWlnaGJvcnNCWzBdWzBdXVtuZWlnaGJvcnNCWzBdWzFdXS53YWxscy5Tb3V0aCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGRpciA9PT0gXCJFYXN0XCIgJiYgKCFzcXJBLndhbGxzLkVhc3QgJiYgIXNxckIud2FsbHMuRWFzdCkpe1xyXG4gICAgICAgICAgICAgICAgc3FyQS53YWxscy5FYXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNxckIud2FsbHMuRWFzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvKiBzZXRzIHRoZSBFYXN0IG5laWdoYm9ycyBXZXN0IHdhbGwgdG8gdHJ1ZSAqL1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0FbM11bMF1dW25laWdoYm9yc0FbM11bMV1dLndhbGxzLldlc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0JbM11bMF1dW25laWdoYm9yc0JbM11bMV1dLndhbGxzLldlc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaXNWYWxpZFdhbGwgPSB0aGlzLmZpbmRQYXRoKCk7XHJcbiAgICAgICAgICAgICAgICBpZihpc1ZhbGlkV2FsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyMVwiKSB0aGlzLnBsYXllcjFXYWxscyA9IHRoaXMucGxheWVyMVdhbGxzIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50UGxheWVyID09PSBcInBsYXllcjJcIikgdGhpcy5wbGF5ZXIyV2FsbHMgPSB0aGlzLnBsYXllcjJXYWxscyAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2FwVHVybigpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzcXJBLndhbGxzLkVhc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBzcXJCLndhbGxzLkVhc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyaWRbbmVpZ2hib3JzQVszXVswXV1bbmVpZ2hib3JzQVszXVsxXV0ud2FsbHMuV2VzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtuZWlnaGJvcnNCWzNdWzBdXVtuZWlnaGJvcnNCWzNdWzFdXS53YWxscy5XZXN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoZGlyID09PSBcIlNvdXRoXCIgJiYgKCFzcXJBLndhbGxzLlNvdXRoICYmICFzcXJCLndhbGxzLlNvdXRoKSl7XHJcbiAgICAgICAgICAgICAgICBzcXJBLndhbGxzLlNvdXRoID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNxckIud2FsbHMuU291dGggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLyogc2V0cyB0aGUgU291dGggbmVpZ2hib3JzIE5vcnRoIHdhbGwgdG8gdHJ1ZSAqL1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0FbMV1bMF1dW25laWdoYm9yc0FbMV1bMV1dLndhbGxzLk5vcnRoID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtuZWlnaGJvcnNCWzFdWzBdXVtuZWlnaGJvcnNCWzFdWzFdXS53YWxscy5Ob3J0aCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpc1ZhbGlkV2FsbCA9IHRoaXMuZmluZFBhdGgoKTtcclxuICAgICAgICAgICAgICAgIGlmKGlzVmFsaWRXYWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFBsYXllciA9PT0gXCJwbGF5ZXIxXCIpIHRoaXMucGxheWVyMVdhbGxzID0gdGhpcy5wbGF5ZXIxV2FsbHMgLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyMlwiKSB0aGlzLnBsYXllcjJXYWxscyA9IHRoaXMucGxheWVyMldhbGxzIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3YXBUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNxckEud2FsbHMuU291dGggPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBzcXJCLndhbGxzLlNvdXRoID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0FbMV1bMF1dW25laWdoYm9yc0FbMV1bMV1dLndhbGxzLk5vcnRoID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0JbMV1bMF1dW25laWdoYm9yc0JbMV1bMV1dLndhbGxzLk5vcnRoID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoZGlyID09PSBcIldlc3RcIiAmJiAoIXNxckEud2FsbHMuV2VzdCAmJiAhc3FyQi53YWxscy5XZXN0KSl7XHJcbiAgICAgICAgICAgICAgICBzcXJBLndhbGxzLldlc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc3FyQi53YWxscy5XZXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8qIHNldHMgdGhlIFdlc3QgbmVpZ2hib3JzIEVhc3Qgd2FsbCB0byB0cnVlICovXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRbbmVpZ2hib3JzQVsyXVswXV1bbmVpZ2hib3JzQVsyXVsxXV0ud2FsbHMuRWFzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRbbmVpZ2hib3JzQlsyXVswXV1bbmVpZ2hib3JzQlsyXVsxXV0ud2FsbHMuRWFzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpc1ZhbGlkV2FsbCA9IHRoaXMuZmluZFBhdGgoKTtcclxuICAgICAgICAgICAgICAgIGlmKGlzVmFsaWRXYWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFBsYXllciA9PT0gXCJwbGF5ZXIxXCIpIHRoaXMucGxheWVyMVdhbGxzID0gdGhpcy5wbGF5ZXIxV2FsbHMgLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyMlwiKSB0aGlzLnBsYXllcjJXYWxscyA9IHRoaXMucGxheWVyMldhbGxzIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3YXBUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNxckEud2FsbHMuV2VzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNxckIud2FsbHMuV2VzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtuZWlnaGJvcnNBWzJdWzBdXVtuZWlnaGJvcnNBWzJdWzFdXS53YWxscy5FYXN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0JbMl1bMF1dW25laWdoYm9yc0JbMl1bMV1dLndhbGxzLkVhc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb3ZlUGxheWVyKGRpcikge1xyXG4gICAgICAgIC8vIHRha2VzIGN1cnJlbnQgcGxheWVyIGN1cnJlbnQgcG9zXHJcbiAgICAgICAgLy8gY2FsY3VsYXRlcyBmdXR1cmUgcG9zIHdpdGggZGlyXHJcbiAgICAgICAgbGV0IHBsYXllcjtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyMVwiID8gcGxheWVyID0gdGhpcy5wbGF5ZXIxIDogcGxheWVyID0gdGhpcy5wbGF5ZXIyXHJcbiAgICAgICAgbGV0IG5ld0NvbElkeDtcclxuICAgICAgICBsZXQgbmV3Um93SWR4O1xyXG4gICAgICAgIGxldCBpc1dhbGxlZDtcclxuICAgICAgICBsZXQgaXNWYWxpZDtcclxuICAgICAgICBpZiAoZGlyID09PSBcInVwXCIpIHtcclxuICAgICAgICAgICAgbmV3Q29sSWR4ID0gcGxheWVyWzFdO1xyXG4gICAgICAgICAgICBuZXdSb3dJZHggPSBwbGF5ZXJbMF0gLSAxO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGlyID09PSBcInJpZ2h0XCIpIHtcclxuICAgICAgICAgICAgbmV3Q29sSWR4ID0gcGxheWVyWzFdICsgMTtcclxuICAgICAgICAgICAgbmV3Um93SWR4ID0gcGxheWVyWzBdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGlyID09PSBcImRvd25cIikge1xyXG4gICAgICAgICAgICBuZXdDb2xJZHggPSBwbGF5ZXJbMV07XHJcbiAgICAgICAgICAgIG5ld1Jvd0lkeCA9IHBsYXllclswXSArIDE7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkaXIgPT09IFwibGVmdFwiKSB7XHJcbiAgICAgICAgICAgIG5ld0NvbElkeCA9IHBsYXllclsxXSAtIDE7XHJcbiAgICAgICAgICAgIG5ld1Jvd0lkeCA9IHBsYXllclswXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBuZXdSb3dJZHggPSBwYXJzZUludChkaXJbMF0pO1xyXG4gICAgICAgICAgICBuZXdDb2xJZHggPSBwYXJzZUludChkaXJbMV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICBUaGUgYmVsb3cgdmFsaWRhdGlvbiBubyBsb25nZXIgd29ya3MgZm9yIGNsaWNraW5nIG1vdmVtZW50LiAgXHJcbiAgICAgICAgY2hlY2sgZm9yIHdhbGxzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaXNXYWxsZWQgPSB0aGlzLmJvYXJkLmlzV2FsbGVkKGRpciwgcGxheWVyWzBdLCBwbGF5ZXJbMV0pO1xyXG4gICAgICAgIC8vIGdpdmVzIHRvIHRoaXMuYm9hcmQgdG8gdmFsaWRhdGVcclxuICAgICAgICBpc1ZhbGlkID0gQm9hcmQuaXNWYWxpZFBvcyhuZXdDb2xJZHgsIG5ld1Jvd0lkeCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gaWYgdmFsaWQgdGhlbiBzZXRzIHBsYXllciBuZXcgeCBhbmQgeVxyXG4gICAgICAgIC8vICAgIHN3YXBzIHR1cm5zXHJcbiAgICAgICAgaWYgKGlzVmFsaWQgJiYgIWlzV2FsbGVkKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgb2xkU3F1YXJlID0gdGhpcy5ib2FyZC5ncmlkW3BsYXllclswXV1bcGxheWVyWzFdXTtcclxuICAgICAgICAgICAgbGV0IG5ld1NxdWFyZSA9IHRoaXMuYm9hcmQuZ3JpZFtuZXdSb3dJZHhdW25ld0NvbElkeF07XHJcblxyXG4gICAgICAgICAgICAvL3ZhbGlkYXRpb24gdG8gY2hlY2sgZm9yIHBsYXllciBjb2xsaXNpb24gICAgICAgICBcclxuICAgICAgICAgICAgaWYgKG5ld1NxdWFyZS5wbGF5ZXIgIT09IFwiZW1wdHlcIikge1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb2xkU3F1YXJlLnBsYXllciA9IFwiZW1wdHlcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0UGxheWVyUG9zKHRoaXMuY3VycmVudFBsYXllciwgW25ld1Jvd0lkeCwgbmV3Q29sSWR4XSk7XHJcbiAgICAgICAgICAgICAgICBuZXdTcXVhcmUucGxheWVyID0gdGhpcy5jdXJyZW50UGxheWVyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zd2FwVHVybigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBlbHNlIHRoZW4gZG9lcyBub3RoaW5nIG9yIHNlbmRzIGVycm9yIG1lc3NhZ2VcclxuICAgICAgICAgICAgLy8gICAgZG9lcyBub3Qgc3dhcCB0dXJuc1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QXZhaWxhYmxlTW92ZXMocG9zKSB7XHJcbiAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuY3VycmVudFBsYXllciA9PT0gXCJwbGF5ZXIxXCIgPyB0aGlzLnBsYXllcjEgOiB0aGlzLnBsYXllcjI7XHJcbiAgICAgICAgbGV0IG9wcG9uZW50ID0gdGhpcy5jdXJyZW50UGxheWVyID09PSBcInBsYXllcjFcIiA/IHRoaXMucGxheWVyMiA6IHRoaXMucGxheWVyMTtcclxuICAgICAgICBsZXQgbW92ZXMgPSBbXTtcclxuICAgICAgICBsZXQgY3VycmVudFNxdWFyZSA9IHRoaXMuZ3JpZFtwb3NbMF1dW3Bvc1sxXV07XHJcbiAgICAgICAgbGV0IHNxdWFyZTtcclxuICAgICAgICBsZXQgY29sSWR4ID0gcG9zWzFdO1xyXG4gICAgICAgIGxldCByb3dJZHggID0gcG9zWzBdO1xyXG4gICAgICAgIC8qIGNoZWNrIGZvciBwbGF5ZXIgKi9cclxuICAgICAgICBpZiAoKHJvd0lkeCAtIDEgPj0gMCkgJiYgKCFjdXJyZW50U3F1YXJlLndhbGxzLk5vcnRoKSkge1xyXG4gICAgICAgICAgICBzcXVhcmUgPSB0aGlzLmdyaWRbcm93SWR4IC0gMV1bY29sSWR4XTtcclxuICAgICAgICAgICAgaWYgKHNxdWFyZS5wbGF5ZXIgPT09IFwiZW1wdHlcIikge1xyXG4gICAgICAgICAgICAgICAgbW92ZXMucHVzaChbcm93SWR4IC0gMSwgY29sSWR4XSk7ICAvLyBub3J0aFxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFtcInBsYXllcjFcIiwgXCJwbGF5ZXIyXCJdLmluY2x1ZGVzKHNxdWFyZS5wbGF5ZXIpKXtcclxuICAgICAgICAgICAgICAgIGlmICgocm93SWR4IC0gMiA+PSAwKSAmJiAoIXNxdWFyZS53YWxscy5Ob3J0aCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3Zlcy5wdXNoKFtyb3dJZHggLSAyLCBjb2xJZHhdKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBTcXVhcmUgPSByb3dJZHggLSAyID49IDAgPyB0aGlzLmdyaWRbcm93SWR4IC0gMl1bY29sSWR4XSA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3F1YXJlLndhbGxzLk5vcnRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3F1YXJlLndhbGxzLkVhc3QpIG1vdmVzLnB1c2goW3Jvd0lkeCAtIDEsIGNvbElkeCArIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzcXVhcmUud2FsbHMuV2VzdCkgbW92ZXMucHVzaChbcm93SWR4IC0gMSwgY29sSWR4IC0gMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGVtcFNxdWFyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzcXVhcmUud2FsbHMuRWFzdCkgbW92ZXMucHVzaChbcm93SWR4IC0gMSwgY29sSWR4ICsgMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzcXVhcmUud2FsbHMuV2VzdCkgbW92ZXMucHVzaChbcm93SWR4IC0gMSwgY29sSWR4IC0gMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgoY29sSWR4ICsgMSA8PSA4KSAmJiAoIWN1cnJlbnRTcXVhcmUud2FsbHMuRWFzdCkpIHtcclxuICAgICAgICAgICAgc3F1YXJlID0gdGhpcy5ncmlkW3Jvd0lkeF1bY29sSWR4ICsgMV07XHJcbiAgICAgICAgICAgIGlmIChzcXVhcmUucGxheWVyID09PSBcImVtcHR5XCIpIHtcclxuICAgICAgICAgICAgICAgIG1vdmVzLnB1c2goW3Jvd0lkeCwgY29sSWR4ICsgMV0pOyAgLy8gZWFzdFxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFtcInBsYXllcjFcIiwgXCJwbGF5ZXIyXCJdLmluY2x1ZGVzKHNxdWFyZS5wbGF5ZXIpKXtcclxuICAgICAgICAgICAgICAgIGlmICgoY29sSWR4ICsgMiA8PSA4KSAmJiAoIXNxdWFyZS53YWxscy5FYXN0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVzLnB1c2goW3Jvd0lkeCwgY29sSWR4ICsgMl0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcFNxdWFyZSA9IGNvbElkeCArIDIgPD0gOCA/IHRoaXMuZ3JpZFtyb3dJZHhdW2NvbElkeCArIDJdIDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzcXVhcmUud2FsbHMuRWFzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNxdWFyZS53YWxscy5Ob3J0aCkgbW92ZXMucHVzaChbcm93SWR4IC0gMSwgY29sSWR4ICsgMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNxdWFyZS53YWxscy5Tb3V0aCkgbW92ZXMucHVzaChbcm93SWR4ICsgMSwgY29sSWR4ICsgMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGVtcFNxdWFyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzcXVhcmUud2FsbHMuTm9ydGgpIG1vdmVzLnB1c2goW3Jvd0lkeCAtIDEsIGNvbElkeCArIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3F1YXJlLndhbGxzLlNvdXRoKSBtb3Zlcy5wdXNoKFtyb3dJZHggKyAxLCBjb2xJZHggKyAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKChyb3dJZHggKyAxIDw9IDgpICYmICghY3VycmVudFNxdWFyZS53YWxscy5Tb3V0aCkpIHtcclxuICAgICAgICAgICAgc3F1YXJlID0gdGhpcy5ncmlkW3Jvd0lkeCArIDFdW2NvbElkeF07XHJcbiAgICAgICAgICAgIGlmIChzcXVhcmUucGxheWVyID09PSBcImVtcHR5XCIpIHtcclxuICAgICAgICAgICAgICAgIG1vdmVzLnB1c2goW3Jvd0lkeCArIDEsIGNvbElkeF0pOyAgLy8gc291dGhcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChbXCJwbGF5ZXIxXCIsIFwicGxheWVyMlwiXS5pbmNsdWRlcyhzcXVhcmUucGxheWVyKSl7XHJcbiAgICAgICAgICAgICAgICBpZiAoKHJvd0lkeCArIDIgPD0gOCkgJiYgKCFzcXVhcmUud2FsbHMuU291dGgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZXMucHVzaChbcm93SWR4ICsgMiwgY29sSWR4XSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wU3F1YXJlID0gcm93SWR4ICsgMiA8PSA4ID8gdGhpcy5ncmlkW3Jvd0lkeCArIDJdW2NvbElkeF0gOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNxdWFyZS53YWxscy5Tb3V0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNxdWFyZS53YWxscy5FYXN0KSBtb3Zlcy5wdXNoKFtyb3dJZHggKyAxLCBjb2xJZHggKyAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3F1YXJlLndhbGxzLldlc3QpIG1vdmVzLnB1c2goW3Jvd0lkeCArIDEsIGNvbElkeCAtIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRlbXBTcXVhcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3F1YXJlLndhbGxzLkVhc3QpIG1vdmVzLnB1c2goW3Jvd0lkeCArIDEsIGNvbElkeCArIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3F1YXJlLndhbGxzLldlc3QpIG1vdmVzLnB1c2goW3Jvd0lkeCArIDEsIGNvbElkeCAtIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKGNvbElkeCAtIDEgPj0gMCkgJiYgKCFjdXJyZW50U3F1YXJlLndhbGxzLldlc3QpKSB7XHJcbiAgICAgICAgICAgIHNxdWFyZSA9IHRoaXMuZ3JpZFtyb3dJZHhdW2NvbElkeCAtIDFdO1xyXG4gICAgICAgICAgICBpZiAoc3F1YXJlLnBsYXllciA9PT0gXCJlbXB0eVwiKSB7XHJcbiAgICAgICAgICAgICAgICBtb3Zlcy5wdXNoKFtyb3dJZHgsIGNvbElkeCAtIDFdKTsgIC8vIHdlc3RcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChbXCJwbGF5ZXIxXCIsIFwicGxheWVyMlwiXS5pbmNsdWRlcyhzcXVhcmUucGxheWVyKSl7XHJcbiAgICAgICAgICAgICAgICBpZiAoKGNvbElkeCAtIDIgPj0gMCkgJiYgKCFzcXVhcmUud2FsbHMuV2VzdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3Zlcy5wdXNoKFtyb3dJZHgsIGNvbElkeCAtIDJdKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBTcXVhcmUgPSBjb2xJZHggLSAyID49IDAgPyB0aGlzLmdyaWRbcm93SWR4XVtjb2xJZHggLSAyXSA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3F1YXJlLndhbGxzLldlc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzcXVhcmUud2FsbHMuTm9ydGgpIG1vdmVzLnB1c2goW3Jvd0lkeCAtIDEsIGNvbElkeCAtIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzcXVhcmUud2FsbHMuU291dGgpIG1vdmVzLnB1c2goW3Jvd0lkeCArIDEsIGNvbElkeCAtIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRlbXBTcXVhcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3F1YXJlLndhbGxzLk5vcnRoKSBtb3Zlcy5wdXNoKFtyb3dJZHggLSAxLCBjb2xJZHggLSAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNxdWFyZS53YWxscy5Tb3V0aCkgbW92ZXMucHVzaChbcm93SWR4ICsgMSwgY29sSWR4IC0gMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIFxyXG4gICAgICAgIGNoZWNrTmVpZ2hib3JzIHJldHVybnMgYW4gYXJyYXkgb2YgXHJcbiAgICAgICAgW25vcnRoLCBlYXN0LCBzb3V0aCwgd2VzdF0gcG9zaXRpb25zXHJcbiAgICAgICAgc2hvdWxkIG5vdyBjaGVjayB0byBzZWUgaWYgYW55IG9mIHRob3NlIHBvc2l0aW9ucyBjb2xsaWRlIFxyXG4gICAgICAgIHdpdGggYSB3YWxsIG9yIHBsYXllciBhbmQgYWRqdXN0IG1vdmVzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb3Zlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBzcXVhcmUgPSB0aGlzLmdyaWRbbW92ZXNbaV1bMF1dW21vdmVzW2ldWzFdXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtb3ZlcztcclxuICAgIH1cclxuXHJcblxyXG4gICAgc2V0UGxheWVyUG9zKHBsYXllciwgcG9zKSB7XHJcbiAgICAgICAgaWYgKHBsYXllciA9PT0gXCJwbGF5ZXIxXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIxID0gcG9zO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGxheWVyID09PSBcInBsYXllcjJcIikge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllcjIgPSBwb3M7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMuYm9hcmQuc2V0UGxheWVycyh0cnVlLCB0aGlzLnBsYXllcjEsIGZhbHNlLCB0aGlzLnBsYXllcjIpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFBsYXllciA9IFwicGxheWVyMVwiO1xyXG4gICAgfVxyXG5cclxuICAgIHN3YXBUdXJuKCkge1xyXG4gICAgICAgIGlmKCB0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyMVwiICkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQbGF5ZXIgPSBcInBsYXllcjJcIjtcclxuICAgICAgICB9IGVsc2UgaWYoIHRoaXMuY3VycmVudFBsYXllciA9PT0gXCJwbGF5ZXIyXCIgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBsYXllciA9IFwicGxheWVyMVwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmaW5kUGF0aCgpIHtcclxuICAgICAgICAvKiBcclxuICAgICAgICBydW4gdGhlIGJmc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHJldHVybiAhIXRoaXMuYm9hcmQuYmZzKHRoaXMucGxheWVyMSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWU7IiwiY29uc3QgTW92ZUVycm9yID0gZnVuY3Rpb24gKG1zZykgeyB0aGlzLm1zZyA9IG1zZzsgfTtcclxuXHJcbi8vIE1vdmVFcnJvciByZWFsbHkgc2hvdWxkIGJlIGEgY2hpbGQgY2xhc3Mgb2YgdGhlIGJ1aWx0IGluIEVycm9yIG9iamVjdCBwcm92aWRlZFxyXG4vLyBieSBKYXZhc2NyaXB0LCBidXQgc2luY2Ugd2UgaGF2ZW4ndCBjb3ZlcmVkIGluaGVyaXRhbmNlIHlldCwgd2UnbGwganVzdFxyXG4vLyBsZXQgaXQgYmUgYSB2YW5pbGxhIE9iamVjdCBmb3Igbm93IVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNb3ZlRXJyb3I7IiwiY2xhc3MgU3F1YXJlIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbElkeCwgcm93SWR4KSB7XHJcbiAgICAgICAgdGhpcy53YWxscyA9IHtcclxuICAgICAgICAgICAgTm9ydGg6IGZhbHNlLFxyXG4gICAgICAgICAgICBFYXN0OiBmYWxzZSxcclxuICAgICAgICAgICAgU291dGg6IGZhbHNlLFxyXG4gICAgICAgICAgICBXZXN0OiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbElkeCA9IGNvbElkeDtcclxuICAgICAgICB0aGlzLnJvd0lkeCA9IHJvd0lkeDsgXHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBcImVtcHR5XCI7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IFwibm9vbmVcIlxyXG4gICAgfVxyXG5cclxuICAgIC8vIGdldE5vcnRoKCkge1xyXG4gICAgLy8gICAgIHJldHVybiB0aGlzLndhbGxzLk5vcnRoO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gZ2V0RWFzdCgpIHtcclxuICAgIC8vICAgICByZXR1cm4gdGhpcy53YWxscy5FYXN0O1xyXG4gICAgLy8gfVxyXG4gICAgLy8gZ2V0U291dGgoKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMud2FsbHMuU291dGg7XHJcbiAgICAvLyB9XHJcbiAgICAvLyBnZXRXZXN0KCkge1xyXG4gICAgLy8gICAgIHJldHVybiB0aGlzLndhbGxzLldlc3Q7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc2V0Tm9ydGgoYm9vbCkge1xyXG4gICAgLy8gICAgIGJvb2wgPyB0aGlzLndhbGxzLk5vcnRoID0gYm9vbCA6IHRoaXMud2FsbHMuTm9ydGggPSAhYm9vbDtcclxuICAgIC8vIH1cclxuICAgIC8vIHNldEVhc3QoYm9vbCkge1xyXG4gICAgLy8gICAgIGJvb2wgPyB0aGlzLndhbGxzLkVhc3QgPSBib29sIDogdGhpcy53YWxscy5FYXN0ID0gIWJvb2w7XHJcbiAgICAvLyB9XHJcbiAgICAvLyBzZXRTb3V0aChib29sKSB7XHJcbiAgICAvLyAgICAgYm9vbCA/IHRoaXMud2FsbHMuU291dGggPSBib29sIDogdGhpcy53YWxscy5Tb3V0aCA9ICFib29sO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gc2V0V2VzdChib29sKSB7XHJcbiAgICAvLyAgICAgYm9vbCA/IHRoaXMud2FsbHMuV2VzdCA9IGJvb2wgOiB0aGlzLndhbGxzLldlc3QgPSAhYm9vbDtcclxuICAgIC8vIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTcXVhcmU7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9nYW1lLmpzXCIpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==