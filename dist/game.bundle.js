/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Board)
/* harmony export */ });
/* harmony import */ var _square__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./square */ "./src/square.js");


class Board {
    constructor(p1, p2) {
        this.width = 9;
        this.height = 9;
        this.p1 = p1;
        this.p2 = p2
        this.grid = Board.makeGrid(this.width, this.height);
        this.winner = false;
        this.util;
    }

    setPlayers(player1, p1Pos, player2, p2Pos) {
        this.util.trackFunctions("setPlayers");
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
        gridSquare2.player = this.p2;
        gridSquare1.player = this.p1;
    }

    checkNeighbors(square) {
        this.util.trackFunctions("checkNeighbors");
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
        return this.checkCrossWall(neighbors);
    }

    checkCrossWall(neighbors) {
        return neighbors;
    }

    isWalled(dir, rowIdx, colIdx) {
        this.util.trackFunctions("isWalled");
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
        this.util.trackFunctions("bfs");
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
                path.push(v.join(""));
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
        this.util.trackFunctions("traverseHashmap");
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
                let square = new _square__WEBPACK_IMPORTED_MODULE_0__.default(colIdx , rowIdx)
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


/***/ }),

/***/ "./src/square.js":
/*!***********************!*\
  !*** ./src/square.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Square)
/* harmony export */ });
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
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ "./src/board.js");


class Game {
    constructor(socket, room) {
        this.socket = socket;
        this.room = room;
        /* this.player = [rowIdx, colIdx] */
        this.player1ID = room.player1;
        this.player2ID = room.player2;
        this.board = new _board__WEBPACK_IMPORTED_MODULE_0__.default(this.player1ID, this.player2ID);
        this.grid = this.board.grid;
        this.currentPlayer = "noone";
        this.player1 = [8, 4];
        this.player2 = [0, 4];
        this.player1Walls = 10;
        this.player2Walls = 10;
        this.state = "not doing anything";
        this.util;
        

        this.movePlayer = this.movePlayer.bind(this);
    }

    isOver() {
        this.util.trackFunctions("isOver");
        if (this.winner() !== null) {
            return true;
        } else {
            return false;
        }
    }

    // computerAiTurn() {
    //     this.util.trackFunctions("computerAiTurn");
    //     if(this.currentPlayer === "player2") {
    //         let p2Path = this.board.bfs(this.player2, ["80","81","82","83","84","85","86","87","88"])
    //         let p1Path = this.board.bfs(this.player1);
    //         let random = Math.floor(Math.random() * 2);
    //         if ((p1Path[1].length <= p2Path[1].length) && (this.player2Walls > 0)) {
    //             /* place wall if player1 is closer to goal */
    //             for(let i = 0; i < p1Path[1].length; i++) {
    //                 let rowIdx = p1Path[1][i].split("")[0];
    //                 let colIdx = p1Path[1][i].split("")[1];   
    //                 let nextRowIdx = p1Path[1][i + 1].split("")[0];
    //                 let nextColIdx = p1Path[1][i + 1].split("")[1];
    //                 let placedWall = false;
    //                 let squareA = [parseInt(nextRowIdx), parseInt(nextColIdx)];
    //                 let squareNeighbors = this.board.checkNeighbors(squareA);
    //                 let squareB;
    //                 /* 
    //                 left and up 
    //                 placeWall(dir, event, squareA, squareB)
    //                 dir = North, South, East, West
    //                 event = null
    //                 squareA = [rowIdx, colIdx]
    //                 squareB = [rowIdx, colIdx]
    //                 */
    //                 if(colIdx === nextColIdx) {
    //                     /*
    //                     path is moving up or down
    //                     check neighbors and set squareB to a valid one
    //                     neighbors = [north, south, west, east]
    //                     use random if you want
    //                     squareA = next best pos of player1 (opponent)
    //                     squareB = square to the west of squareA
    //                      */
    //                     if(random === 0) {
    //                         if (squareNeighbors[2][0] !== -1) {
    //                             squareB = squareNeighbors[2];
    //                         } else {
    //                             squareB = squareNeighbors[3];
    //                         }
    //                     } else {
    //                         if (squareNeighbors[3][0] !== -1) {
    //                             squareB = squareNeighbors[3];
    //                         } else {
    //                             squareB = squareNeighbors[2];
    //                         }
    //                     }
    //                     placedWall = this.placeWall("South", squareA, squareB);
    //                     if (placedWall === true) {
    //                         break;
    //                     } else {
    //                     }
    //                 }
    //                 if (rowIdx === nextRowIdx) {

    //                     if(random === 0) {
    //                         if (squareNeighbors[0][0] !== -1) {
    //                             squareB = squareNeighbors[0];
    //                         } else {
    //                             squareB = squareNeighbors[1];
    //                         }
    //                     } else {
    //                         if (squareNeighbors[1][0] !== -1) {
    //                             squareB = squareNeighbors[1];
    //                         } else {
    //                             squareB = squareNeighbors[0];
    //                         }
    //                     }

    //                     if (colIdx > nextColIdx) {
    //                         placedWall = this.placeWall("East", squareA, squareB);
    //                         if (placedWall === true) {
    //                             break;
    //                         }
    //                     } else {
    //                         placedWall = this.placeWall("West", squareA, squareB);
    //                         if (placedWall === true) {
    //                             break;
    //                         }
    //                     }
    //                 }
    //             }

    //         } else {
    //             /* move player2 towards goal */
    //             let currRow = p2Path[1][0].split("")[0];
    //             let currCol = p2Path[1][0].split("")[1];
    //             let moves = this.getAvailableMoves([parseInt(currRow), parseInt(currCol)]);
    //             for (let i = 0; i < moves.length; i++) {
    //                 let move = moves[i].join("");
    //                 if (p2Path[1].includes(move)){
    //                     this.movePlayer(moves[i]);
    //                 }
    //             }
    //         }
    //     }
    // }

    winner() {
        this.util.trackFunctions("winner");
        let winner = null;
        for(let i = 0; i < this.grid[0].length; i++) {
            if(this.grid[0][i].player === this.player1ID) {
                winner = this.player1ID;
            }
            if(this.grid[8][i].player === this.player2ID) {
                winner = this.player2ID;
            }
        }
        return winner;
    }

    takeTurn(action, dir = null, event, squareA = null, squareB = null) {
        this.util.trackFunctions("takeTurn");
        // movement or wall placement?

        if (action === "move") {
            if(dir === null) {
                this.movePlayer(event.target.id.split(""));
            }
        }

        if (action === "placeWall") {
            this.placeWall(dir, squareA, squareB);
        }

    }

    placeWall(dir, squareA, squareB) {
        this.util.trackFunctions("placeWall");
        /*
        squareA & squareB = [rowIdx, colIdx]
        get Square and set the specific walls to true 
        get neighbors and sset specific walls to true... opposite wall
        squarePos = this.grid[rowIdx, colIdx]
        */


        if(squareA[0] > 8 || squareA[0] < 0 || squareB[0] > 8 || squareB[0] < 0
            || squareA[1] > 8 || squareA[1] < 0 || squareB[1] > 8 || squareB[1] < 0) {
                return false;
        }
        let sqrA = this.grid[squareA[0]][squareA[1]];
        let sqrB = this.grid[squareB[0]][squareB[1]];
        let neighborsA = this.board.checkNeighbors([sqrA.rowIdx, sqrA.colIdx]);
        let neighborsB = this.board.checkNeighbors([sqrB.rowIdx, sqrB.colIdx]);
        let isValidWall;
        let playerWalls;
        this.currentPlayer === this.player1ID ? playerWalls = this.player1Walls : playerWalls = this.player2Walls
        if (playerWalls > 0) {

            if(dir === "North" && (!sqrA.walls.North && !sqrB.walls.North)){
                sqrA.walls.North = true;
                sqrB.walls.North = true;
                /* sets the north neighbors south wall to true */
                this.grid[neighborsA[0][0]][neighborsA[0][1]].walls.South = true;
                this.grid[neighborsB[0][0]][neighborsB[0][1]].walls.South = true;
                isValidWall = this.findPath();
                if(isValidWall) {
                    if (this.currentPlayer === this.player1ID) this.player1Walls = this.player1Walls - 1;
                    if (this.currentPlayer === this.player2ID) this.player2Walls = this.player2Walls - 1;
                    this.socket.emit('placeWall', { roomId: this.room.id, 
                                                    dir: "north",
                                                    wallA: [sqrA.rowIdx, sqrA.colIdx],
                                                    wallB: [sqrB.rowIdx, sqrB.colIdx],
                                                    wallC: [neighborsA[0][0], neighborsA[0][1]], 
                                                    wallD: [neighborsB[0][0], neighborsB[0][1]], 
                                                    player: this.currentPlayer});
                    // this.swapTurn();
                    return true;
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
                    if (this.currentPlayer === this.player1ID) this.player1Walls = this.player1Walls - 1;
                    if (this.currentPlayer === this.player2ID) this.player2Walls = this.player2Walls - 1;
                    this.socket.emit('placeWall', { roomId: this.room.id, 
                                                    dir: "east",
                                                    wallA: [sqrA.rowIdx, sqrA.colIdx],
                                                    wallB: [sqrB.rowIdx, sqrB.colIdx],
                                                    wallC: [neighborsA[3][0], neighborsA[3][1]], 
                                                    wallD: [neighborsB[3][0], neighborsB[3][1]], 
                                                    player: this.currentPlayer});
                    // this.swapTurn();
                    return true;
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
                    if (this.currentPlayer === this.player1ID) this.player1Walls = this.player1Walls - 1;
                    if (this.currentPlayer === this.player2ID) this.player2Walls = this.player2Walls - 1;
                    this.socket.emit('placeWall', { roomId: this.room.id, 
                                                    dir: "south",
                                                    wallA: [sqrA.rowIdx, sqrA.colIdx],
                                                    wallB: [sqrB.rowIdx, sqrB.colIdx],
                                                    wallC: [neighborsA[1][0], neighborsA[1][1]], 
                                                    wallD: [neighborsB[1][0], neighborsB[1][1]], 
                                                    player: this.currentPlayer});
                    // this.swapTurn();
                    return true;
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
                    if (this.currentPlayer === this.player1ID) this.player1Walls = this.player1Walls - 1;
                    if (this.currentPlayer === this.player2ID) this.player2Walls = this.player2Walls - 1;
                    this.socket.emit('placeWall', { roomId: this.room.id, 
                                                    dir: "west",
                                                    wallA: [sqrA.rowIdx, sqrA.colIdx],
                                                    wallB: [sqrB.rowIdx, sqrB.colIdx],
                                                    wallC: [neighborsA[2][0], neighborsA[2][1]], 
                                                    wallD: [neighborsB[2][0], neighborsB[2][1]], 
                                                    player: this.currentPlayer});
                    // this.swapTurn();
                    return true;
                } else {
                    sqrA.walls.West = false;
                    sqrB.walls.West = false;
                    this.grid[neighborsA[2][0]][neighborsA[2][1]].walls.East = false;
                    this.grid[neighborsB[2][0]][neighborsB[2][1]].walls.East = false;
                    
                }
            }
        }
        return false;
    }

    movePlayer(dir) {
        this.util.trackFunctions("movePlayer");
        // takes current player current pos
        // calculates future pos with dir
        let player;
        this.currentPlayer === this.player1ID ? player = this.player1 : player = this.player2
        let newColIdx;
        let newRowIdx;
        let isWalled;
        let isValid;
    
        newRowIdx = parseInt(dir[0]);
        newColIdx = parseInt(dir[1]);

        /*
        The below validation no longer works for clicking movement.  
        check for walls
         */
        isWalled = this.board.isWalled(dir, player[0], player[1]);
        // gives to this.board to validate
        isValid = _board__WEBPACK_IMPORTED_MODULE_0__.default.isValidPos(newColIdx, newRowIdx);
        
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
                this.socket.emit('playerMove', {roomId: this.room.id, 
                                                oldPos: [oldSquare.rowIdx, oldSquare.colIdx], 
                                                newPos: [newSquare.rowIdx, newSquare.colIdx], 
                                                player: this.currentPlayer})
                // this.swapTurn();
            }


        } else {
            // else then does nothing or sends error message
            //    does not swap turns

        }
    }

    getAvailableMoves(pos) {
        this.util.trackFunctions("getAvailableMoves");
        /* pos = [row, col] */
        let moves = [];
        let currentSquare = this.grid[pos[0]][pos[1]];
        let square;
        let colIdx = pos[1];
        let rowIdx  = pos[0];

        /* 
        pattern for these next four if statement blocks

        if position is on the board and there is not wall
            if position has no player on it
            else if position has a player on it
            *** getting the available move that hops the opponent ***
                if no obstructions for a straight hop => add that move
                else 
                    tempsquare is destination of a staight hop
                    if wall is an obstruction for a straight hop
                        add a diagonal hop if not obstructed by a wall
                    else if tempsquare is off the board
                        add a diagonal hop if not obstructed by a wall

         */

        if ((rowIdx - 1 >= 0) && (!currentSquare.walls.North)) {
            square = this.grid[rowIdx - 1][colIdx];
            if (square.player === "empty") {
                moves.push([rowIdx - 1, colIdx]);  // north
            } else if ([this.player1ID, this.player2ID].includes(square.player)){
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
            } else if ([this.player1ID, this.player2ID].includes(square.player)){
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
            } else if ([this.player1ID, this.player2ID].includes(square.player)){
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
            } else if ([this.player1ID, this.player2ID].includes(square.player)){
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
        
        return moves;
    }


    setPlayerPos(player, pos) {
        this.util.trackFunctions("setPlayerPos");
        if (player === this.player1ID) {
            this.player1 = pos;
        } else if (player === this.player2ID) {
            this.player2 = pos;
        }
    }

    start() {
        this.util.trackFunctions("start");
        this.board.setPlayers(true, this.player1, true, this.player2);
        this.currentPlayer = this.player1ID;
    }

    swapTurn() {
        this.util.trackFunctions("swapTurn");
        if( this.currentPlayer === this.player1ID ) {
            this.currentPlayer = this.player2ID;
        } else if( this.currentPlayer === this.player2ID ) {
            this.currentPlayer = this.player1ID;
        }
    }

    findPath() {
        this.util.trackFunctions("findPath");
        /* 
        run the bfs
         */
        return !!this.board.bfs(this.player1);
    }

}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9xdW9yaWRvci8uL3NyYy9ib2FyZC5qcyIsIndlYnBhY2s6Ly9xdW9yaWRvci8uL3NyYy9zcXVhcmUuanMiLCJ3ZWJwYWNrOi8vcXVvcmlkb3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcXVvcmlkb3Ivd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3F1b3JpZG9yL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcXVvcmlkb3Ivd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9xdW9yaWRvci8uL3NyYy9nYW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUE4Qjs7QUFFZjtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRGQUE0RjtBQUM1Riw0RkFBNEY7QUFDNUYsNEZBQTRGO0FBQzVGLDRGQUE0RjtBQUM1RjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQSxnQztBQUNBLG1CQUFtQjtBQUNuQiw0QkFBNEI7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dW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3F1YXJlIGZyb20gXCIuL3NxdWFyZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9hcmQge1xyXG4gICAgY29uc3RydWN0b3IocDEsIHAyKSB7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IDk7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSA5O1xyXG4gICAgICAgIHRoaXMucDEgPSBwMTtcclxuICAgICAgICB0aGlzLnAyID0gcDJcclxuICAgICAgICB0aGlzLmdyaWQgPSBCb2FyZC5tYWtlR3JpZCh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICAgICAgdGhpcy53aW5uZXIgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnV0aWw7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGxheWVycyhwbGF5ZXIxLCBwMVBvcywgcGxheWVyMiwgcDJQb3MpIHtcclxuICAgICAgICB0aGlzLnV0aWwudHJhY2tGdW5jdGlvbnMoXCJzZXRQbGF5ZXJzXCIpO1xyXG4gICAgICAgIC8qIHAxUG9zICYgcDJQb3MgPSBbcm93LCBjb2xdICovXHJcbiAgICAgICAgbGV0IGdyaWRTcXVhcmUyID0gdGhpcy5ncmlkW3AyUG9zWzBdXVtwMlBvc1sxXV07XHJcbiAgICAgICAgbGV0IGdyaWRTcXVhcmUxID0gdGhpcy5ncmlkW3AxUG9zWzBdXVtwMVBvc1sxXV07XHJcbiAgICAgICAgaWYoISFwbGF5ZXIyKSB7XHJcbiAgICAgICAgICAgIGdyaWRTcXVhcmUyLm1vZGVsID0gXCJwZXJzb25cIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBncmlkU3F1YXJlMi5tb2RlbCA9IFwiYWlcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoISFwbGF5ZXIxKSB7XHJcbiAgICAgICAgICAgIGdyaWRTcXVhcmUxLm1vZGVsID0gXCJwZXJzb25cIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBncmlkU3F1YXJlMS5tb2RlbCA9IFwiYWlcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ3JpZFNxdWFyZTIucGxheWVyID0gdGhpcy5wMjtcclxuICAgICAgICBncmlkU3F1YXJlMS5wbGF5ZXIgPSB0aGlzLnAxO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrTmVpZ2hib3JzKHNxdWFyZSkge1xyXG4gICAgICAgIHRoaXMudXRpbC50cmFja0Z1bmN0aW9ucyhcImNoZWNrTmVpZ2hib3JzXCIpO1xyXG4gICAgICAgIC8qIFxyXG4gICAgICAgIHJlcXVpcmVzIFtbbnVtXVtudW1dXSBcclxuICAgICAgICBzcXVhcmUgPSBbcm93SWR4LCBjb2xJZHhdXHJcbiAgICAgICAgKi9cclxuICAgICAgICBsZXQgbmVpZ2hib3JzID0gW107XHJcbiAgICAgICAgbGV0IGNvbElkeCA9IHNxdWFyZVsxXTtcclxuICAgICAgICBsZXQgcm93SWR4ICA9IHNxdWFyZVswXTtcclxuICAgICAgICAocm93SWR4IC0gMSA+PSAwKSA/IG5laWdoYm9ycy5wdXNoKFtyb3dJZHggLSAxLCBjb2xJZHhdKSA6IG5laWdoYm9ycy5wdXNoKFstMSwgLTFdKTsgIC8vIG5vcnRoXHJcbiAgICAgICAgKHJvd0lkeCArIDEgPD0gOCkgPyBuZWlnaGJvcnMucHVzaChbcm93SWR4ICsgMSwgY29sSWR4XSkgOiBuZWlnaGJvcnMucHVzaChbLTEsIC0xXSk7ICAvLyBzb3V0aFxyXG4gICAgICAgIChjb2xJZHggLSAxID49IDApID8gbmVpZ2hib3JzLnB1c2goW3Jvd0lkeCwgY29sSWR4IC0gMV0pIDogbmVpZ2hib3JzLnB1c2goWy0xLCAtMV0pOyAgLy8gd2VzdFxyXG4gICAgICAgIChjb2xJZHggKyAxIDw9IDgpID8gbmVpZ2hib3JzLnB1c2goW3Jvd0lkeCwgY29sSWR4ICsgMV0pIDogbmVpZ2hib3JzLnB1c2goWy0xLCAtMV0pOyAgLy8gZWFzdFxyXG4gICAgICAgIHJldHVybiB0aGlzLmNoZWNrQ3Jvc3NXYWxsKG5laWdoYm9ycyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tDcm9zc1dhbGwobmVpZ2hib3JzKSB7XHJcbiAgICAgICAgcmV0dXJuIG5laWdoYm9ycztcclxuICAgIH1cclxuXHJcbiAgICBpc1dhbGxlZChkaXIsIHJvd0lkeCwgY29sSWR4KSB7XHJcbiAgICAgICAgdGhpcy51dGlsLnRyYWNrRnVuY3Rpb25zKFwiaXNXYWxsZWRcIik7XHJcbiAgICAgICAgLyogXHJcbiAgICAgICAgIHJldHVybnMgdHJ1ZSBpZiBwYXRoIGlzIGJsb2NrZWQgYnkgd2FsbFxyXG4gICAgICAgICByZXR1cm5zIGZhbHNlIGlmIHBhdGggaXMgZnJlZVxyXG4gICAgICAgICovXHJcbiAgICAgICBcclxuICAgICAgICBsZXQgc3F1YXJlID0gdGhpcy5ncmlkW3Jvd0lkeF1bY29sSWR4XTtcclxuICAgICAgICBpZihkaXIgPT09IFwidXBcIikge1xyXG4gICAgICAgICAgICBpZihzcXVhcmUud2FsbHMuTm9ydGgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChkaXIgPT09IFwicmlnaHRcIikge1xyXG4gICAgICAgICAgICBpZihzcXVhcmUud2FsbHMuRWFzdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGRpciA9PT0gXCJkb3duXCIpIHtcclxuICAgICAgICAgICAgaWYoc3F1YXJlLndhbGxzLlNvdXRoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZGlyID09PSBcImxlZnRcIikge1xyXG4gICAgICAgICAgICBpZihzcXVhcmUud2FsbHMuV2VzdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBiZnMocm9vdCwgZ29hbCA9IFtcIjAwXCIsXCIwMVwiLFwiMDJcIixcIjAzXCIsXCIwNFwiLFwiMDVcIixcIjA2XCIsXCIwN1wiLFwiMDhcIl0pIHtcclxuICAgICAgICB0aGlzLnV0aWwudHJhY2tGdW5jdGlvbnMoXCJiZnNcIik7XHJcbiAgICAgICAgLyogXHJcbiAgICAgICAgcm9vdCA9PT0gW3Jvd0lkeCwgY29sSWR4XVxyXG5cclxuICAgICAgICB0aGlzIGZ1bmN0aW9uIGlzIHNvIGNydXN0eSBcclxuICAgICAgICAqL1xyXG5cclxuXHJcbiAgICAgICAgbGV0IGhhc2htYXAgPSBuZXcgTWFwKCk7IFxyXG4gICAgICAgIGxldCBRID0gW107IC8vYXJyYXkgb2YgW3JvdywgY29sXVxyXG4gICAgICAgIGxldCBkaXNjb3ZlcmVkID0gW107IC8vYXJyYXkgb2YgaWRcclxuICAgICAgICBoYXNobWFwLnNldChyb290LCBudWxsKVxyXG4gICAgICAgIFEucHVzaChyb290KTtcclxuICAgICAgICBkaXNjb3ZlcmVkLnB1c2gocm9vdC5qb2luKFwiXCIpKTtcclxuICAgICAgICB3aGlsZSAoUS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCB2ID0gUS5zaGlmdCgpOyAvLyBwb3NcclxuICAgICAgICAgICAgbGV0IGlkID0gdi5qb2luKFwiXCIpO1xyXG4gICAgICAgICAgICBsZXQgc3F1YXJlID0gdGhpcy5ncmlkW3ZbMF1dW3ZbMV1dOyAvL3NxdWFyZVxyXG4gICAgICAgICAgICBpZiAoZ29hbC5pbmNsdWRlcyhpZCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwYXRoID0gW107XHJcbiAgICAgICAgICAgICAgICBwYXRoID0gdGhpcy50cmF2ZXJzZUhhc2htYXAoaGFzaG1hcCwgdi5qb2luKFwiXCIpKTtcclxuICAgICAgICAgICAgICAgIHBhdGgucHVzaCh2LmpvaW4oXCJcIikpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFt2LmpvaW4oXCJcIiksIHBhdGhdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGZpbmRpbmcgYWxsIHBvc3NpYmxlIGRpcmVjdGlvbnNcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICgoIXNxdWFyZS53YWxscy5Ob3J0aCAmJiAocGFyc2VJbnQodlswXSkgPiAwKSkpe1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1YgPSB2LmpvaW4oXCJcIikuc3BsaXQoXCJcIik7XHJcbiAgICAgICAgICAgICAgICBuZXdWWzBdID0gcGFyc2VJbnQobmV3VlswXSkgLSAxO1xyXG4gICAgICAgICAgICAgICAgaWQgPSBuZXdWLmpvaW4oXCJcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRpc2NvdmVyZWQuaW5jbHVkZXMoaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzY292ZXJlZC5wdXNoKGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBRLnB1c2gobmV3Vik7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzaG1hcC5zZXQobmV3Vi5qb2luKFwiXCIpLCB2LmpvaW4oXCJcIikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgoIXNxdWFyZS53YWxscy5Tb3V0aCAmJiAocGFyc2VJbnQodlswXSkgPCA4KSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdWID0gdi5qb2luKFwiXCIpLnNwbGl0KFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgbmV3VlswXSA9IHBhcnNlSW50KG5ld1ZbMF0pICsgMTtcclxuICAgICAgICAgICAgICAgIGlkID0gbmV3Vi5qb2luKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkaXNjb3ZlcmVkLmluY2x1ZGVzKGlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2NvdmVyZWQucHVzaChpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgUS5wdXNoKG5ld1YpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc2htYXAuc2V0KG5ld1Yuam9pbihcIlwiKSwgdi5qb2luKFwiXCIpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoKCFzcXVhcmUud2FsbHMuRWFzdCAmJiAocGFyc2VJbnQodlsxXSkgPCA4KSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdWID0gdi5qb2luKFwiXCIpLnNwbGl0KFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgbmV3VlsxXSA9IHBhcnNlSW50KG5ld1ZbMV0pICsgMTtcclxuICAgICAgICAgICAgICAgIGlkID0gbmV3Vi5qb2luKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkaXNjb3ZlcmVkLmluY2x1ZGVzKGlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2NvdmVyZWQucHVzaChpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgUS5wdXNoKG5ld1YpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc2htYXAuc2V0KG5ld1Yuam9pbihcIlwiKSwgdi5qb2luKFwiXCIpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoKCFzcXVhcmUud2FsbHMuV2VzdCAmJiAocGFyc2VJbnQodlsxXSkgPiAwKSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdWID0gdi5qb2luKFwiXCIpLnNwbGl0KFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgbmV3VlsxXSA9IHBhcnNlSW50KG5ld1ZbMV0pIC0gMTtcclxuICAgICAgICAgICAgICAgIGlkID0gbmV3Vi5qb2luKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkaXNjb3ZlcmVkLmluY2x1ZGVzKGlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2NvdmVyZWQucHVzaChpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgUS5wdXNoKG5ld1YpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc2htYXAuc2V0KG5ld1Yuam9pbihcIlwiKSwgdi5qb2luKFwiXCIpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdHJhdmVyc2VIYXNobWFwKGhhc2gsIHN0YXJ0KSB7XHJcbiAgICAgICAgdGhpcy51dGlsLnRyYWNrRnVuY3Rpb25zKFwidHJhdmVyc2VIYXNobWFwXCIpO1xyXG4gICAgICAgIGxldCBub2RlID0gaGFzaC5nZXQoc3RhcnQpO1xyXG4gICAgICAgIGxldCBwYXRoID0gW107XHJcbiAgICAgICAgd2hpbGUgKG5vZGUpIHtcclxuICAgICAgICAgICAgcGF0aC5wdXNoKG5vZGUpXHJcbiAgICAgICAgICAgIG5vZGUgPSBoYXNoLmdldChub2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBhdGgucmV2ZXJzZSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzdGF0aWMgbWFrZUdyaWQod2lkdGgsIGhlaWdodCkge1xyXG4gICAgICAgIGNvbnN0IGdyaWQgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgcm93SWR4ID0gMDsgcm93SWR4IDwgaGVpZ2h0OyByb3dJZHgrKykge1xyXG4gICAgICAgICAgICBncmlkLnB1c2goW10pO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjb2xJZHggPSAwOyBjb2xJZHggPCB3aWR0aDsgY29sSWR4KyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBzcXVhcmUgPSBuZXcgU3F1YXJlKGNvbElkeCAsIHJvd0lkeClcclxuICAgICAgICAgICAgICAgIGdyaWRbcm93SWR4XS5wdXNoKHNxdWFyZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGdyaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGlzVmFsaWRQb3MoY29sSWR4LCByb3dJZHgpIHtcclxuICAgICAgICAvLyB2YWxpZGF0aW9uIHRvIGNoZWNrIHRoZSBlbmRzIG9mIHRoZSBib2FyZFxyXG4gICAgICAgIGlmICgoY29sSWR4IDwgMCB8fCByb3dJZHggPCAwKSB8fCAoY29sSWR4ID4gOCB8fCByb3dJZHggPiA4KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmIChmYWxzZSkge1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3F1YXJlIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbElkeCwgcm93SWR4KSB7XHJcbiAgICAgICAgdGhpcy53YWxscyA9IHtcclxuICAgICAgICAgICAgTm9ydGg6IGZhbHNlLFxyXG4gICAgICAgICAgICBFYXN0OiBmYWxzZSxcclxuICAgICAgICAgICAgU291dGg6IGZhbHNlLFxyXG4gICAgICAgICAgICBXZXN0OiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbElkeCA9IGNvbElkeDtcclxuICAgICAgICB0aGlzLnJvd0lkeCA9IHJvd0lkeDsgXHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBcImVtcHR5XCI7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IFwibm9vbmVcIlxyXG4gICAgfVxyXG5cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IEJvYXJkIGZyb20gXCIuL2JvYXJkXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcclxuICAgIGNvbnN0cnVjdG9yKHNvY2tldCwgcm9vbSkge1xyXG4gICAgICAgIHRoaXMuc29ja2V0ID0gc29ja2V0O1xyXG4gICAgICAgIHRoaXMucm9vbSA9IHJvb207XHJcbiAgICAgICAgLyogdGhpcy5wbGF5ZXIgPSBbcm93SWR4LCBjb2xJZHhdICovXHJcbiAgICAgICAgdGhpcy5wbGF5ZXIxSUQgPSByb29tLnBsYXllcjE7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIySUQgPSByb29tLnBsYXllcjI7XHJcbiAgICAgICAgdGhpcy5ib2FyZCA9IG5ldyBCb2FyZCh0aGlzLnBsYXllcjFJRCwgdGhpcy5wbGF5ZXIySUQpO1xyXG4gICAgICAgIHRoaXMuZ3JpZCA9IHRoaXMuYm9hcmQuZ3JpZDtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQbGF5ZXIgPSBcIm5vb25lXCI7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIxID0gWzgsIDRdO1xyXG4gICAgICAgIHRoaXMucGxheWVyMiA9IFswLCA0XTtcclxuICAgICAgICB0aGlzLnBsYXllcjFXYWxscyA9IDEwO1xyXG4gICAgICAgIHRoaXMucGxheWVyMldhbGxzID0gMTA7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFwibm90IGRvaW5nIGFueXRoaW5nXCI7XHJcbiAgICAgICAgdGhpcy51dGlsO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICB0aGlzLm1vdmVQbGF5ZXIgPSB0aGlzLm1vdmVQbGF5ZXIuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBpc092ZXIoKSB7XHJcbiAgICAgICAgdGhpcy51dGlsLnRyYWNrRnVuY3Rpb25zKFwiaXNPdmVyXCIpO1xyXG4gICAgICAgIGlmICh0aGlzLndpbm5lcigpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY29tcHV0ZXJBaVR1cm4oKSB7XHJcbiAgICAvLyAgICAgdGhpcy51dGlsLnRyYWNrRnVuY3Rpb25zKFwiY29tcHV0ZXJBaVR1cm5cIik7XHJcbiAgICAvLyAgICAgaWYodGhpcy5jdXJyZW50UGxheWVyID09PSBcInBsYXllcjJcIikge1xyXG4gICAgLy8gICAgICAgICBsZXQgcDJQYXRoID0gdGhpcy5ib2FyZC5iZnModGhpcy5wbGF5ZXIyLCBbXCI4MFwiLFwiODFcIixcIjgyXCIsXCI4M1wiLFwiODRcIixcIjg1XCIsXCI4NlwiLFwiODdcIixcIjg4XCJdKVxyXG4gICAgLy8gICAgICAgICBsZXQgcDFQYXRoID0gdGhpcy5ib2FyZC5iZnModGhpcy5wbGF5ZXIxKTtcclxuICAgIC8vICAgICAgICAgbGV0IHJhbmRvbSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpO1xyXG4gICAgLy8gICAgICAgICBpZiAoKHAxUGF0aFsxXS5sZW5ndGggPD0gcDJQYXRoWzFdLmxlbmd0aCkgJiYgKHRoaXMucGxheWVyMldhbGxzID4gMCkpIHtcclxuICAgIC8vICAgICAgICAgICAgIC8qIHBsYWNlIHdhbGwgaWYgcGxheWVyMSBpcyBjbG9zZXIgdG8gZ29hbCAqL1xyXG4gICAgLy8gICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHAxUGF0aFsxXS5sZW5ndGg7IGkrKykge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGxldCByb3dJZHggPSBwMVBhdGhbMV1baV0uc3BsaXQoXCJcIilbMF07XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbGV0IGNvbElkeCA9IHAxUGF0aFsxXVtpXS5zcGxpdChcIlwiKVsxXTsgICBcclxuICAgIC8vICAgICAgICAgICAgICAgICBsZXQgbmV4dFJvd0lkeCA9IHAxUGF0aFsxXVtpICsgMV0uc3BsaXQoXCJcIilbMF07XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbGV0IG5leHRDb2xJZHggPSBwMVBhdGhbMV1baSArIDFdLnNwbGl0KFwiXCIpWzFdO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGxldCBwbGFjZWRXYWxsID0gZmFsc2U7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbGV0IHNxdWFyZUEgPSBbcGFyc2VJbnQobmV4dFJvd0lkeCksIHBhcnNlSW50KG5leHRDb2xJZHgpXTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBsZXQgc3F1YXJlTmVpZ2hib3JzID0gdGhpcy5ib2FyZC5jaGVja05laWdoYm9ycyhzcXVhcmVBKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBsZXQgc3F1YXJlQjtcclxuICAgIC8vICAgICAgICAgICAgICAgICAvKiBcclxuICAgIC8vICAgICAgICAgICAgICAgICBsZWZ0IGFuZCB1cCBcclxuICAgIC8vICAgICAgICAgICAgICAgICBwbGFjZVdhbGwoZGlyLCBldmVudCwgc3F1YXJlQSwgc3F1YXJlQilcclxuICAgIC8vICAgICAgICAgICAgICAgICBkaXIgPSBOb3J0aCwgU291dGgsIEVhc3QsIFdlc3RcclxuICAgIC8vICAgICAgICAgICAgICAgICBldmVudCA9IG51bGxcclxuICAgIC8vICAgICAgICAgICAgICAgICBzcXVhcmVBID0gW3Jvd0lkeCwgY29sSWR4XVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIHNxdWFyZUIgPSBbcm93SWR4LCBjb2xJZHhdXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgKi9cclxuICAgIC8vICAgICAgICAgICAgICAgICBpZihjb2xJZHggPT09IG5leHRDb2xJZHgpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgLypcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgcGF0aCBpcyBtb3ZpbmcgdXAgb3IgZG93blxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBjaGVjayBuZWlnaGJvcnMgYW5kIHNldCBzcXVhcmVCIHRvIGEgdmFsaWQgb25lXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIG5laWdoYm9ycyA9IFtub3J0aCwgc291dGgsIHdlc3QsIGVhc3RdXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHVzZSByYW5kb20gaWYgeW91IHdhbnRcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgc3F1YXJlQSA9IG5leHQgYmVzdCBwb3Mgb2YgcGxheWVyMSAob3Bwb25lbnQpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHNxdWFyZUIgPSBzcXVhcmUgdG8gdGhlIHdlc3Qgb2Ygc3F1YXJlQVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgaWYocmFuZG9tID09PSAwKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3F1YXJlTmVpZ2hib3JzWzJdWzBdICE9PSAtMSkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNxdWFyZUIgPSBzcXVhcmVOZWlnaGJvcnNbMl07XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNxdWFyZUIgPSBzcXVhcmVOZWlnaGJvcnNbM107XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3F1YXJlTmVpZ2hib3JzWzNdWzBdICE9PSAtMSkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNxdWFyZUIgPSBzcXVhcmVOZWlnaGJvcnNbM107XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNxdWFyZUIgPSBzcXVhcmVOZWlnaGJvcnNbMl07XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgcGxhY2VkV2FsbCA9IHRoaXMucGxhY2VXYWxsKFwiU291dGhcIiwgc3F1YXJlQSwgc3F1YXJlQik7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGlmIChwbGFjZWRXYWxsID09PSB0cnVlKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICBpZiAocm93SWR4ID09PSBuZXh0Um93SWR4KSB7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBpZihyYW5kb20gPT09IDApIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcXVhcmVOZWlnaGJvcnNbMF1bMF0gIT09IC0xKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlQiA9IHNxdWFyZU5laWdoYm9yc1swXTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlQiA9IHNxdWFyZU5laWdoYm9yc1sxXTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcXVhcmVOZWlnaGJvcnNbMV1bMF0gIT09IC0xKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlQiA9IHNxdWFyZU5laWdoYm9yc1sxXTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlQiA9IHNxdWFyZU5laWdoYm9yc1swXTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbElkeCA+IG5leHRDb2xJZHgpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlZFdhbGwgPSB0aGlzLnBsYWNlV2FsbChcIkVhc3RcIiwgc3F1YXJlQSwgc3F1YXJlQik7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGxhY2VkV2FsbCA9PT0gdHJ1ZSkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VkV2FsbCA9IHRoaXMucGxhY2VXYWxsKFwiV2VzdFwiLCBzcXVhcmVBLCBzcXVhcmVCKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwbGFjZWRXYWxsID09PSB0cnVlKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcblxyXG4gICAgLy8gICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgLyogbW92ZSBwbGF5ZXIyIHRvd2FyZHMgZ29hbCAqL1xyXG4gICAgLy8gICAgICAgICAgICAgbGV0IGN1cnJSb3cgPSBwMlBhdGhbMV1bMF0uc3BsaXQoXCJcIilbMF07XHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgY3VyckNvbCA9IHAyUGF0aFsxXVswXS5zcGxpdChcIlwiKVsxXTtcclxuICAgIC8vICAgICAgICAgICAgIGxldCBtb3ZlcyA9IHRoaXMuZ2V0QXZhaWxhYmxlTW92ZXMoW3BhcnNlSW50KGN1cnJSb3cpLCBwYXJzZUludChjdXJyQ29sKV0pO1xyXG4gICAgLy8gICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb3Zlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gbW92ZXNbaV0uam9pbihcIlwiKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBpZiAocDJQYXRoWzFdLmluY2x1ZGVzKG1vdmUpKXtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlUGxheWVyKG1vdmVzW2ldKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgd2lubmVyKCkge1xyXG4gICAgICAgIHRoaXMudXRpbC50cmFja0Z1bmN0aW9ucyhcIndpbm5lclwiKTtcclxuICAgICAgICBsZXQgd2lubmVyID0gbnVsbDtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5ncmlkWzBdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ3JpZFswXVtpXS5wbGF5ZXIgPT09IHRoaXMucGxheWVyMUlEKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5uZXIgPSB0aGlzLnBsYXllcjFJRDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLmdyaWRbOF1baV0ucGxheWVyID09PSB0aGlzLnBsYXllcjJJRCkge1xyXG4gICAgICAgICAgICAgICAgd2lubmVyID0gdGhpcy5wbGF5ZXIySUQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHdpbm5lcjtcclxuICAgIH1cclxuXHJcbiAgICB0YWtlVHVybihhY3Rpb24sIGRpciA9IG51bGwsIGV2ZW50LCBzcXVhcmVBID0gbnVsbCwgc3F1YXJlQiA9IG51bGwpIHtcclxuICAgICAgICB0aGlzLnV0aWwudHJhY2tGdW5jdGlvbnMoXCJ0YWtlVHVyblwiKTtcclxuICAgICAgICAvLyBtb3ZlbWVudCBvciB3YWxsIHBsYWNlbWVudD9cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gXCJtb3ZlXCIpIHtcclxuICAgICAgICAgICAgaWYoZGlyID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVQbGF5ZXIoZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiXCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gXCJwbGFjZVdhbGxcIikge1xyXG4gICAgICAgICAgICB0aGlzLnBsYWNlV2FsbChkaXIsIHNxdWFyZUEsIHNxdWFyZUIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcGxhY2VXYWxsKGRpciwgc3F1YXJlQSwgc3F1YXJlQikge1xyXG4gICAgICAgIHRoaXMudXRpbC50cmFja0Z1bmN0aW9ucyhcInBsYWNlV2FsbFwiKTtcclxuICAgICAgICAvKlxyXG4gICAgICAgIHNxdWFyZUEgJiBzcXVhcmVCID0gW3Jvd0lkeCwgY29sSWR4XVxyXG4gICAgICAgIGdldCBTcXVhcmUgYW5kIHNldCB0aGUgc3BlY2lmaWMgd2FsbHMgdG8gdHJ1ZSBcclxuICAgICAgICBnZXQgbmVpZ2hib3JzIGFuZCBzc2V0IHNwZWNpZmljIHdhbGxzIHRvIHRydWUuLi4gb3Bwb3NpdGUgd2FsbFxyXG4gICAgICAgIHNxdWFyZVBvcyA9IHRoaXMuZ3JpZFtyb3dJZHgsIGNvbElkeF1cclxuICAgICAgICAqL1xyXG5cclxuXHJcbiAgICAgICAgaWYoc3F1YXJlQVswXSA+IDggfHwgc3F1YXJlQVswXSA8IDAgfHwgc3F1YXJlQlswXSA+IDggfHwgc3F1YXJlQlswXSA8IDBcclxuICAgICAgICAgICAgfHwgc3F1YXJlQVsxXSA+IDggfHwgc3F1YXJlQVsxXSA8IDAgfHwgc3F1YXJlQlsxXSA+IDggfHwgc3F1YXJlQlsxXSA8IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNxckEgPSB0aGlzLmdyaWRbc3F1YXJlQVswXV1bc3F1YXJlQVsxXV07XHJcbiAgICAgICAgbGV0IHNxckIgPSB0aGlzLmdyaWRbc3F1YXJlQlswXV1bc3F1YXJlQlsxXV07XHJcbiAgICAgICAgbGV0IG5laWdoYm9yc0EgPSB0aGlzLmJvYXJkLmNoZWNrTmVpZ2hib3JzKFtzcXJBLnJvd0lkeCwgc3FyQS5jb2xJZHhdKTtcclxuICAgICAgICBsZXQgbmVpZ2hib3JzQiA9IHRoaXMuYm9hcmQuY2hlY2tOZWlnaGJvcnMoW3NxckIucm93SWR4LCBzcXJCLmNvbElkeF0pO1xyXG4gICAgICAgIGxldCBpc1ZhbGlkV2FsbDtcclxuICAgICAgICBsZXQgcGxheWVyV2FsbHM7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGxheWVyID09PSB0aGlzLnBsYXllcjFJRCA/IHBsYXllcldhbGxzID0gdGhpcy5wbGF5ZXIxV2FsbHMgOiBwbGF5ZXJXYWxscyA9IHRoaXMucGxheWVyMldhbGxzXHJcbiAgICAgICAgaWYgKHBsYXllcldhbGxzID4gMCkge1xyXG5cclxuICAgICAgICAgICAgaWYoZGlyID09PSBcIk5vcnRoXCIgJiYgKCFzcXJBLndhbGxzLk5vcnRoICYmICFzcXJCLndhbGxzLk5vcnRoKSl7XHJcbiAgICAgICAgICAgICAgICBzcXJBLndhbGxzLk5vcnRoID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNxckIud2FsbHMuTm9ydGggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLyogc2V0cyB0aGUgbm9ydGggbmVpZ2hib3JzIHNvdXRoIHdhbGwgdG8gdHJ1ZSAqL1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0FbMF1bMF1dW25laWdoYm9yc0FbMF1bMV1dLndhbGxzLlNvdXRoID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtuZWlnaGJvcnNCWzBdWzBdXVtuZWlnaGJvcnNCWzBdWzFdXS53YWxscy5Tb3V0aCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpc1ZhbGlkV2FsbCA9IHRoaXMuZmluZFBhdGgoKTtcclxuICAgICAgICAgICAgICAgIGlmKGlzVmFsaWRXYWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFBsYXllciA9PT0gdGhpcy5wbGF5ZXIxSUQpIHRoaXMucGxheWVyMVdhbGxzID0gdGhpcy5wbGF5ZXIxV2FsbHMgLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IHRoaXMucGxheWVyMklEKSB0aGlzLnBsYXllcjJXYWxscyA9IHRoaXMucGxheWVyMldhbGxzIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvY2tldC5lbWl0KCdwbGFjZVdhbGwnLCB7IHJvb21JZDogdGhpcy5yb29tLmlkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcjogXCJub3J0aFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FsbEE6IFtzcXJBLnJvd0lkeCwgc3FyQS5jb2xJZHhdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FsbEI6IFtzcXJCLnJvd0lkeCwgc3FyQi5jb2xJZHhdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FsbEM6IFtuZWlnaGJvcnNBWzBdWzBdLCBuZWlnaGJvcnNBWzBdWzFdXSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YWxsRDogW25laWdoYm9yc0JbMF1bMF0sIG5laWdoYm9yc0JbMF1bMV1dLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcjogdGhpcy5jdXJyZW50UGxheWVyfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zd2FwVHVybigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzcXJBLndhbGxzLk5vcnRoID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgc3FyQi53YWxscy5Ob3J0aCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtuZWlnaGJvcnNBWzBdWzBdXVtuZWlnaGJvcnNBWzBdWzFdXS53YWxscy5Tb3V0aCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtuZWlnaGJvcnNCWzBdWzBdXVtuZWlnaGJvcnNCWzBdWzFdXS53YWxscy5Tb3V0aCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGRpciA9PT0gXCJFYXN0XCIgJiYgKCFzcXJBLndhbGxzLkVhc3QgJiYgIXNxckIud2FsbHMuRWFzdCkpe1xyXG4gICAgICAgICAgICAgICAgc3FyQS53YWxscy5FYXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNxckIud2FsbHMuRWFzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvKiBzZXRzIHRoZSBFYXN0IG5laWdoYm9ycyBXZXN0IHdhbGwgdG8gdHJ1ZSAqL1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0FbM11bMF1dW25laWdoYm9yc0FbM11bMV1dLndhbGxzLldlc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0JbM11bMF1dW25laWdoYm9yc0JbM11bMV1dLndhbGxzLldlc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaXNWYWxpZFdhbGwgPSB0aGlzLmZpbmRQYXRoKCk7XHJcbiAgICAgICAgICAgICAgICBpZihpc1ZhbGlkV2FsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IHRoaXMucGxheWVyMUlEKSB0aGlzLnBsYXllcjFXYWxscyA9IHRoaXMucGxheWVyMVdhbGxzIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50UGxheWVyID09PSB0aGlzLnBsYXllcjJJRCkgdGhpcy5wbGF5ZXIyV2FsbHMgPSB0aGlzLnBsYXllcjJXYWxscyAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgncGxhY2VXYWxsJywgeyByb29tSWQ6IHRoaXMucm9vbS5pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXI6IFwiZWFzdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FsbEE6IFtzcXJBLnJvd0lkeCwgc3FyQS5jb2xJZHhdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FsbEI6IFtzcXJCLnJvd0lkeCwgc3FyQi5jb2xJZHhdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FsbEM6IFtuZWlnaGJvcnNBWzNdWzBdLCBuZWlnaGJvcnNBWzNdWzFdXSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YWxsRDogW25laWdoYm9yc0JbM11bMF0sIG5laWdoYm9yc0JbM11bMV1dLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcjogdGhpcy5jdXJyZW50UGxheWVyfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zd2FwVHVybigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzcXJBLndhbGxzLkVhc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBzcXJCLndhbGxzLkVhc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyaWRbbmVpZ2hib3JzQVszXVswXV1bbmVpZ2hib3JzQVszXVsxXV0ud2FsbHMuV2VzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtuZWlnaGJvcnNCWzNdWzBdXVtuZWlnaGJvcnNCWzNdWzFdXS53YWxscy5XZXN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoZGlyID09PSBcIlNvdXRoXCIgJiYgKCFzcXJBLndhbGxzLlNvdXRoICYmICFzcXJCLndhbGxzLlNvdXRoKSl7XHJcbiAgICAgICAgICAgICAgICBzcXJBLndhbGxzLlNvdXRoID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNxckIud2FsbHMuU291dGggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLyogc2V0cyB0aGUgU291dGggbmVpZ2hib3JzIE5vcnRoIHdhbGwgdG8gdHJ1ZSAqL1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0FbMV1bMF1dW25laWdoYm9yc0FbMV1bMV1dLndhbGxzLk5vcnRoID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtuZWlnaGJvcnNCWzFdWzBdXVtuZWlnaGJvcnNCWzFdWzFdXS53YWxscy5Ob3J0aCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpc1ZhbGlkV2FsbCA9IHRoaXMuZmluZFBhdGgoKTtcclxuICAgICAgICAgICAgICAgIGlmKGlzVmFsaWRXYWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFBsYXllciA9PT0gdGhpcy5wbGF5ZXIxSUQpIHRoaXMucGxheWVyMVdhbGxzID0gdGhpcy5wbGF5ZXIxV2FsbHMgLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IHRoaXMucGxheWVyMklEKSB0aGlzLnBsYXllcjJXYWxscyA9IHRoaXMucGxheWVyMldhbGxzIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvY2tldC5lbWl0KCdwbGFjZVdhbGwnLCB7IHJvb21JZDogdGhpcy5yb29tLmlkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcjogXCJzb3V0aFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FsbEE6IFtzcXJBLnJvd0lkeCwgc3FyQS5jb2xJZHhdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FsbEI6IFtzcXJCLnJvd0lkeCwgc3FyQi5jb2xJZHhdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FsbEM6IFtuZWlnaGJvcnNBWzFdWzBdLCBuZWlnaGJvcnNBWzFdWzFdXSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YWxsRDogW25laWdoYm9yc0JbMV1bMF0sIG5laWdoYm9yc0JbMV1bMV1dLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcjogdGhpcy5jdXJyZW50UGxheWVyfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zd2FwVHVybigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzcXJBLndhbGxzLlNvdXRoID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgc3FyQi53YWxscy5Tb3V0aCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtuZWlnaGJvcnNBWzFdWzBdXVtuZWlnaGJvcnNBWzFdWzFdXS53YWxscy5Ob3J0aCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtuZWlnaGJvcnNCWzFdWzBdXVtuZWlnaGJvcnNCWzFdWzFdXS53YWxscy5Ob3J0aCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGRpciA9PT0gXCJXZXN0XCIgJiYgKCFzcXJBLndhbGxzLldlc3QgJiYgIXNxckIud2FsbHMuV2VzdCkpe1xyXG4gICAgICAgICAgICAgICAgc3FyQS53YWxscy5XZXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNxckIud2FsbHMuV2VzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvKiBzZXRzIHRoZSBXZXN0IG5laWdoYm9ycyBFYXN0IHdhbGwgdG8gdHJ1ZSAqL1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0FbMl1bMF1dW25laWdoYm9yc0FbMl1bMV1dLndhbGxzLkVhc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0JbMl1bMF1dW25laWdoYm9yc0JbMl1bMV1dLndhbGxzLkVhc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaXNWYWxpZFdhbGwgPSB0aGlzLmZpbmRQYXRoKCk7XHJcbiAgICAgICAgICAgICAgICBpZihpc1ZhbGlkV2FsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IHRoaXMucGxheWVyMUlEKSB0aGlzLnBsYXllcjFXYWxscyA9IHRoaXMucGxheWVyMVdhbGxzIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50UGxheWVyID09PSB0aGlzLnBsYXllcjJJRCkgdGhpcy5wbGF5ZXIyV2FsbHMgPSB0aGlzLnBsYXllcjJXYWxscyAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgncGxhY2VXYWxsJywgeyByb29tSWQ6IHRoaXMucm9vbS5pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXI6IFwid2VzdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FsbEE6IFtzcXJBLnJvd0lkeCwgc3FyQS5jb2xJZHhdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FsbEI6IFtzcXJCLnJvd0lkeCwgc3FyQi5jb2xJZHhdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FsbEM6IFtuZWlnaGJvcnNBWzJdWzBdLCBuZWlnaGJvcnNBWzJdWzFdXSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YWxsRDogW25laWdoYm9yc0JbMl1bMF0sIG5laWdoYm9yc0JbMl1bMV1dLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcjogdGhpcy5jdXJyZW50UGxheWVyfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zd2FwVHVybigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzcXJBLndhbGxzLldlc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBzcXJCLndhbGxzLldlc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyaWRbbmVpZ2hib3JzQVsyXVswXV1bbmVpZ2hib3JzQVsyXVsxXV0ud2FsbHMuRWFzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtuZWlnaGJvcnNCWzJdWzBdXVtuZWlnaGJvcnNCWzJdWzFdXS53YWxscy5FYXN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmVQbGF5ZXIoZGlyKSB7XHJcbiAgICAgICAgdGhpcy51dGlsLnRyYWNrRnVuY3Rpb25zKFwibW92ZVBsYXllclwiKTtcclxuICAgICAgICAvLyB0YWtlcyBjdXJyZW50IHBsYXllciBjdXJyZW50IHBvc1xyXG4gICAgICAgIC8vIGNhbGN1bGF0ZXMgZnV0dXJlIHBvcyB3aXRoIGRpclxyXG4gICAgICAgIGxldCBwbGF5ZXI7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGxheWVyID09PSB0aGlzLnBsYXllcjFJRCA/IHBsYXllciA9IHRoaXMucGxheWVyMSA6IHBsYXllciA9IHRoaXMucGxheWVyMlxyXG4gICAgICAgIGxldCBuZXdDb2xJZHg7XHJcbiAgICAgICAgbGV0IG5ld1Jvd0lkeDtcclxuICAgICAgICBsZXQgaXNXYWxsZWQ7XHJcbiAgICAgICAgbGV0IGlzVmFsaWQ7XHJcbiAgICBcclxuICAgICAgICBuZXdSb3dJZHggPSBwYXJzZUludChkaXJbMF0pO1xyXG4gICAgICAgIG5ld0NvbElkeCA9IHBhcnNlSW50KGRpclsxXSk7XHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgVGhlIGJlbG93IHZhbGlkYXRpb24gbm8gbG9uZ2VyIHdvcmtzIGZvciBjbGlja2luZyBtb3ZlbWVudC4gIFxyXG4gICAgICAgIGNoZWNrIGZvciB3YWxsc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlzV2FsbGVkID0gdGhpcy5ib2FyZC5pc1dhbGxlZChkaXIsIHBsYXllclswXSwgcGxheWVyWzFdKTtcclxuICAgICAgICAvLyBnaXZlcyB0byB0aGlzLmJvYXJkIHRvIHZhbGlkYXRlXHJcbiAgICAgICAgaXNWYWxpZCA9IEJvYXJkLmlzVmFsaWRQb3MobmV3Q29sSWR4LCBuZXdSb3dJZHgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGlmIHZhbGlkIHRoZW4gc2V0cyBwbGF5ZXIgbmV3IHggYW5kIHlcclxuICAgICAgICAvLyAgICBzd2FwcyB0dXJuc1xyXG4gICAgICAgIGlmIChpc1ZhbGlkICYmICFpc1dhbGxlZCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IG9sZFNxdWFyZSA9IHRoaXMuYm9hcmQuZ3JpZFtwbGF5ZXJbMF1dW3BsYXllclsxXV07XHJcbiAgICAgICAgICAgIGxldCBuZXdTcXVhcmUgPSB0aGlzLmJvYXJkLmdyaWRbbmV3Um93SWR4XVtuZXdDb2xJZHhdO1xyXG5cclxuICAgICAgICAgICAgLy92YWxpZGF0aW9uIHRvIGNoZWNrIGZvciBwbGF5ZXIgY29sbGlzaW9uICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChuZXdTcXVhcmUucGxheWVyICE9PSBcImVtcHR5XCIpIHtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9sZFNxdWFyZS5wbGF5ZXIgPSBcImVtcHR5XCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBsYXllclBvcyh0aGlzLmN1cnJlbnRQbGF5ZXIsIFtuZXdSb3dJZHgsIG5ld0NvbElkeF0pO1xyXG4gICAgICAgICAgICAgICAgbmV3U3F1YXJlLnBsYXllciA9IHRoaXMuY3VycmVudFBsYXllcjtcclxuICAgICAgICAgICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ3BsYXllck1vdmUnLCB7cm9vbUlkOiB0aGlzLnJvb20uaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRQb3M6IFtvbGRTcXVhcmUucm93SWR4LCBvbGRTcXVhcmUuY29sSWR4XSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1BvczogW25ld1NxdWFyZS5yb3dJZHgsIG5ld1NxdWFyZS5jb2xJZHhdLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyOiB0aGlzLmN1cnJlbnRQbGF5ZXJ9KVxyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5zd2FwVHVybigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBlbHNlIHRoZW4gZG9lcyBub3RoaW5nIG9yIHNlbmRzIGVycm9yIG1lc3NhZ2VcclxuICAgICAgICAgICAgLy8gICAgZG9lcyBub3Qgc3dhcCB0dXJuc1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QXZhaWxhYmxlTW92ZXMocG9zKSB7XHJcbiAgICAgICAgdGhpcy51dGlsLnRyYWNrRnVuY3Rpb25zKFwiZ2V0QXZhaWxhYmxlTW92ZXNcIik7XHJcbiAgICAgICAgLyogcG9zID0gW3JvdywgY29sXSAqL1xyXG4gICAgICAgIGxldCBtb3ZlcyA9IFtdO1xyXG4gICAgICAgIGxldCBjdXJyZW50U3F1YXJlID0gdGhpcy5ncmlkW3Bvc1swXV1bcG9zWzFdXTtcclxuICAgICAgICBsZXQgc3F1YXJlO1xyXG4gICAgICAgIGxldCBjb2xJZHggPSBwb3NbMV07XHJcbiAgICAgICAgbGV0IHJvd0lkeCAgPSBwb3NbMF07XHJcblxyXG4gICAgICAgIC8qIFxyXG4gICAgICAgIHBhdHRlcm4gZm9yIHRoZXNlIG5leHQgZm91ciBpZiBzdGF0ZW1lbnQgYmxvY2tzXHJcblxyXG4gICAgICAgIGlmIHBvc2l0aW9uIGlzIG9uIHRoZSBib2FyZCBhbmQgdGhlcmUgaXMgbm90IHdhbGxcclxuICAgICAgICAgICAgaWYgcG9zaXRpb24gaGFzIG5vIHBsYXllciBvbiBpdFxyXG4gICAgICAgICAgICBlbHNlIGlmIHBvc2l0aW9uIGhhcyBhIHBsYXllciBvbiBpdFxyXG4gICAgICAgICAgICAqKiogZ2V0dGluZyB0aGUgYXZhaWxhYmxlIG1vdmUgdGhhdCBob3BzIHRoZSBvcHBvbmVudCAqKipcclxuICAgICAgICAgICAgICAgIGlmIG5vIG9ic3RydWN0aW9ucyBmb3IgYSBzdHJhaWdodCBob3AgPT4gYWRkIHRoYXQgbW92ZVxyXG4gICAgICAgICAgICAgICAgZWxzZSBcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wc3F1YXJlIGlzIGRlc3RpbmF0aW9uIG9mIGEgc3RhaWdodCBob3BcclxuICAgICAgICAgICAgICAgICAgICBpZiB3YWxsIGlzIGFuIG9ic3RydWN0aW9uIGZvciBhIHN0cmFpZ2h0IGhvcFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGQgYSBkaWFnb25hbCBob3AgaWYgbm90IG9ic3RydWN0ZWQgYnkgYSB3YWxsXHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiB0ZW1wc3F1YXJlIGlzIG9mZiB0aGUgYm9hcmRcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkIGEgZGlhZ29uYWwgaG9wIGlmIG5vdCBvYnN0cnVjdGVkIGJ5IGEgd2FsbFxyXG5cclxuICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgaWYgKChyb3dJZHggLSAxID49IDApICYmICghY3VycmVudFNxdWFyZS53YWxscy5Ob3J0aCkpIHtcclxuICAgICAgICAgICAgc3F1YXJlID0gdGhpcy5ncmlkW3Jvd0lkeCAtIDFdW2NvbElkeF07XHJcbiAgICAgICAgICAgIGlmIChzcXVhcmUucGxheWVyID09PSBcImVtcHR5XCIpIHtcclxuICAgICAgICAgICAgICAgIG1vdmVzLnB1c2goW3Jvd0lkeCAtIDEsIGNvbElkeF0pOyAgLy8gbm9ydGhcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChbdGhpcy5wbGF5ZXIxSUQsIHRoaXMucGxheWVyMklEXS5pbmNsdWRlcyhzcXVhcmUucGxheWVyKSl7XHJcbiAgICAgICAgICAgICAgICBpZiAoKHJvd0lkeCAtIDIgPj0gMCkgJiYgKCFzcXVhcmUud2FsbHMuTm9ydGgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZXMucHVzaChbcm93SWR4IC0gMiwgY29sSWR4XSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wU3F1YXJlID0gcm93SWR4IC0gMiA+PSAwID8gdGhpcy5ncmlkW3Jvd0lkeCAtIDJdW2NvbElkeF0gOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNxdWFyZS53YWxscy5Ob3J0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNxdWFyZS53YWxscy5FYXN0KSBtb3Zlcy5wdXNoKFtyb3dJZHggLSAxLCBjb2xJZHggKyAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3F1YXJlLndhbGxzLldlc3QpIG1vdmVzLnB1c2goW3Jvd0lkeCAtIDEsIGNvbElkeCAtIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRlbXBTcXVhcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3F1YXJlLndhbGxzLkVhc3QpIG1vdmVzLnB1c2goW3Jvd0lkeCAtIDEsIGNvbElkeCArIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3F1YXJlLndhbGxzLldlc3QpIG1vdmVzLnB1c2goW3Jvd0lkeCAtIDEsIGNvbElkeCAtIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKGNvbElkeCArIDEgPD0gOCkgJiYgKCFjdXJyZW50U3F1YXJlLndhbGxzLkVhc3QpKSB7XHJcbiAgICAgICAgICAgIHNxdWFyZSA9IHRoaXMuZ3JpZFtyb3dJZHhdW2NvbElkeCArIDFdO1xyXG4gICAgICAgICAgICBpZiAoc3F1YXJlLnBsYXllciA9PT0gXCJlbXB0eVwiKSB7XHJcbiAgICAgICAgICAgICAgICBtb3Zlcy5wdXNoKFtyb3dJZHgsIGNvbElkeCArIDFdKTsgIC8vIGVhc3RcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChbdGhpcy5wbGF5ZXIxSUQsIHRoaXMucGxheWVyMklEXS5pbmNsdWRlcyhzcXVhcmUucGxheWVyKSl7XHJcbiAgICAgICAgICAgICAgICBpZiAoKGNvbElkeCArIDIgPD0gOCkgJiYgKCFzcXVhcmUud2FsbHMuRWFzdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3Zlcy5wdXNoKFtyb3dJZHgsIGNvbElkeCArIDJdKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBTcXVhcmUgPSBjb2xJZHggKyAyIDw9IDggPyB0aGlzLmdyaWRbcm93SWR4XVtjb2xJZHggKyAyXSA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3F1YXJlLndhbGxzLkVhc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzcXVhcmUud2FsbHMuTm9ydGgpIG1vdmVzLnB1c2goW3Jvd0lkeCAtIDEsIGNvbElkeCArIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzcXVhcmUud2FsbHMuU291dGgpIG1vdmVzLnB1c2goW3Jvd0lkeCArIDEsIGNvbElkeCArIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRlbXBTcXVhcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3F1YXJlLndhbGxzLk5vcnRoKSBtb3Zlcy5wdXNoKFtyb3dJZHggLSAxLCBjb2xJZHggKyAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNxdWFyZS53YWxscy5Tb3V0aCkgbW92ZXMucHVzaChbcm93SWR4ICsgMSwgY29sSWR4ICsgMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgocm93SWR4ICsgMSA8PSA4KSAmJiAoIWN1cnJlbnRTcXVhcmUud2FsbHMuU291dGgpKSB7XHJcbiAgICAgICAgICAgIHNxdWFyZSA9IHRoaXMuZ3JpZFtyb3dJZHggKyAxXVtjb2xJZHhdO1xyXG4gICAgICAgICAgICBpZiAoc3F1YXJlLnBsYXllciA9PT0gXCJlbXB0eVwiKSB7XHJcbiAgICAgICAgICAgICAgICBtb3Zlcy5wdXNoKFtyb3dJZHggKyAxLCBjb2xJZHhdKTsgIC8vIHNvdXRoXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoW3RoaXMucGxheWVyMUlELCB0aGlzLnBsYXllcjJJRF0uaW5jbHVkZXMoc3F1YXJlLnBsYXllcikpe1xyXG4gICAgICAgICAgICAgICAgaWYgKChyb3dJZHggKyAyIDw9IDgpICYmICghc3F1YXJlLndhbGxzLlNvdXRoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVzLnB1c2goW3Jvd0lkeCArIDIsIGNvbElkeF0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcFNxdWFyZSA9IHJvd0lkeCArIDIgPD0gOCA/IHRoaXMuZ3JpZFtyb3dJZHggKyAyXVtjb2xJZHhdIDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzcXVhcmUud2FsbHMuU291dGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzcXVhcmUud2FsbHMuRWFzdCkgbW92ZXMucHVzaChbcm93SWR4ICsgMSwgY29sSWR4ICsgMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNxdWFyZS53YWxscy5XZXN0KSBtb3Zlcy5wdXNoKFtyb3dJZHggKyAxLCBjb2xJZHggLSAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0ZW1wU3F1YXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNxdWFyZS53YWxscy5FYXN0KSBtb3Zlcy5wdXNoKFtyb3dJZHggKyAxLCBjb2xJZHggKyAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNxdWFyZS53YWxscy5XZXN0KSBtb3Zlcy5wdXNoKFtyb3dJZHggKyAxLCBjb2xJZHggLSAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKChjb2xJZHggLSAxID49IDApICYmICghY3VycmVudFNxdWFyZS53YWxscy5XZXN0KSkge1xyXG4gICAgICAgICAgICBzcXVhcmUgPSB0aGlzLmdyaWRbcm93SWR4XVtjb2xJZHggLSAxXTtcclxuICAgICAgICAgICAgaWYgKHNxdWFyZS5wbGF5ZXIgPT09IFwiZW1wdHlcIikge1xyXG4gICAgICAgICAgICAgICAgbW92ZXMucHVzaChbcm93SWR4LCBjb2xJZHggLSAxXSk7ICAvLyB3ZXN0XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoW3RoaXMucGxheWVyMUlELCB0aGlzLnBsYXllcjJJRF0uaW5jbHVkZXMoc3F1YXJlLnBsYXllcikpe1xyXG4gICAgICAgICAgICAgICAgaWYgKChjb2xJZHggLSAyID49IDApICYmICghc3F1YXJlLndhbGxzLldlc3QpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZXMucHVzaChbcm93SWR4LCBjb2xJZHggLSAyXSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wU3F1YXJlID0gY29sSWR4IC0gMiA+PSAwID8gdGhpcy5ncmlkW3Jvd0lkeF1bY29sSWR4IC0gMl0gOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNxdWFyZS53YWxscy5XZXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3F1YXJlLndhbGxzLk5vcnRoKSBtb3Zlcy5wdXNoKFtyb3dJZHggLSAxLCBjb2xJZHggLSAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3F1YXJlLndhbGxzLlNvdXRoKSBtb3Zlcy5wdXNoKFtyb3dJZHggKyAxLCBjb2xJZHggLSAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0ZW1wU3F1YXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNxdWFyZS53YWxscy5Ob3J0aCkgbW92ZXMucHVzaChbcm93SWR4IC0gMSwgY29sSWR4IC0gMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzcXVhcmUud2FsbHMuU291dGgpIG1vdmVzLnB1c2goW3Jvd0lkeCArIDEsIGNvbElkeCAtIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gbW92ZXM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHNldFBsYXllclBvcyhwbGF5ZXIsIHBvcykge1xyXG4gICAgICAgIHRoaXMudXRpbC50cmFja0Z1bmN0aW9ucyhcInNldFBsYXllclBvc1wiKTtcclxuICAgICAgICBpZiAocGxheWVyID09PSB0aGlzLnBsYXllcjFJRCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllcjEgPSBwb3M7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwbGF5ZXIgPT09IHRoaXMucGxheWVyMklEKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyMiA9IHBvcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy51dGlsLnRyYWNrRnVuY3Rpb25zKFwic3RhcnRcIik7XHJcbiAgICAgICAgdGhpcy5ib2FyZC5zZXRQbGF5ZXJzKHRydWUsIHRoaXMucGxheWVyMSwgdHJ1ZSwgdGhpcy5wbGF5ZXIyKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQbGF5ZXIgPSB0aGlzLnBsYXllcjFJRDtcclxuICAgIH1cclxuXHJcbiAgICBzd2FwVHVybigpIHtcclxuICAgICAgICB0aGlzLnV0aWwudHJhY2tGdW5jdGlvbnMoXCJzd2FwVHVyblwiKTtcclxuICAgICAgICBpZiggdGhpcy5jdXJyZW50UGxheWVyID09PSB0aGlzLnBsYXllcjFJRCApIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGxheWVyID0gdGhpcy5wbGF5ZXIySUQ7XHJcbiAgICAgICAgfSBlbHNlIGlmKCB0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IHRoaXMucGxheWVyMklEICkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQbGF5ZXIgPSB0aGlzLnBsYXllcjFJRDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZmluZFBhdGgoKSB7XHJcbiAgICAgICAgdGhpcy51dGlsLnRyYWNrRnVuY3Rpb25zKFwiZmluZFBhdGhcIik7XHJcbiAgICAgICAgLyogXHJcbiAgICAgICAgcnVuIHRoZSBiZnNcclxuICAgICAgICAgKi9cclxuICAgICAgICByZXR1cm4gISF0aGlzLmJvYXJkLmJmcyh0aGlzLnBsYXllcjEpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9