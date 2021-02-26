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

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ "./src/board.js");


class Game {
    constructor() {
        this.board = new _board__WEBPACK_IMPORTED_MODULE_0__.default();
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

    computerAiTurn() {
        if(this.currentPlayer === "player2") {
            let p2Path = this.board.bfs(this.player2, ["80","81","82","83","84","85","86","87","88"])
            let p1Path = this.board.bfs(this.player1);
            let random = Math.floor(Math.random() * 2);
            console.log(random);
            if ((p1Path[1].length <= p2Path[1].length) && (this.player2Walls > 0)) {
                console.log("placing wall");
                console.log("path => ", p1Path);
                /* place wall if player1 is closer to goal */
                for(let i = 0; i < p1Path[1].length; i++) {
                    let rowIdx = p1Path[1][i].split("")[0];
                    let colIdx = p1Path[1][i].split("")[1];   
                    let nextRowIdx = p1Path[1][i + 1].split("")[0];
                    let nextColIdx = p1Path[1][i + 1].split("")[1];
                    let placedWall = false;
                    let squareA = [parseInt(nextRowIdx), parseInt(nextColIdx)];
                    let squareNeighbors = this.board.checkNeighbors(squareA);
                    console.log("neighbors => ", squareNeighbors);
                    let squareB;
                    /* 
                    left and up 
                    placeWall(dir, event, squareA, squareB)
                    dir = North, South, East, West
                    event = null
                    squareA = [rowIdx, colIdx]
                    squareB = [rowIdx, colIdx]
                    */
                    console.log("row => ", rowIdx, nextRowIdx);
                    console.log("col => ", colIdx, nextColIdx);
                    if(colIdx === nextColIdx) {
                        /*
                        path is moving up or down
                        check neighbors and set squareB to a valid one
                        neighbors = [north, south, west, east]
                        use random if you want
                        squareA = next best pos of player1 (opponent)
                        squareB = square to the west of squareA
                         */
                        if(random === 0) {
                            if (squareNeighbors[2][0] !== -1) {
                                squareB = squareNeighbors[2];
                            } else {
                                squareB = squareNeighbors[3];
                            }
                        } else {
                            if (squareNeighbors[3][0] !== -1) {
                                squareB = squareNeighbors[3];
                            } else {
                                squareB = squareNeighbors[2];
                            }
                        }
                        console.log("squares => ", squareA, squareB);
                        placedWall = this.placeWall("South", null, squareA, squareB);
                        console.log("placedwall => ", placedWall);
                        if (placedWall === true) {
                            console.log("breaking");
                            break;
                        } else {
                            // placedWall = this.placeWall("North", null, squareA, squareB);
                            // console.log("placedwall => ", placedWall);
                            // if (placedWall === true) {
                            //     console.log("breaking");
                            //     break;
                            // } else {
                            //     console.log("how did i end up here");
                            // }
                        }
                    }
                    if (rowIdx === nextRowIdx) {

                        if(random === 0) {
                            if (squareNeighbors[0][0] !== -1) {
                                squareB = squareNeighbors[0];
                            } else {
                                squareB = squareNeighbors[1];
                            }
                        } else {
                            if (squareNeighbors[1][0] !== -1) {
                                squareB = squareNeighbors[1];
                            } else {
                                squareB = squareNeighbors[0];
                            }
                        }

                        if (colIdx > nextColIdx) {
                            console.log(squareA, squareB);
                            placedWall = this.placeWall("East", null, squareA, squareB);
                            console.log("placedwall => ", placedWall);
                            if (placedWall === true) {
                                console.log("breaking")
                                break;
                            }
                        } else {
                            console.log(squareA, squareB);
                            placedWall = this.placeWall("West", null, squareA, squareB);
                            console.log("placedwall => ", placedWall);
                            if (placedWall === true) {
                                console.log("breaking")
                                break;
                            }
                        }
                    }
                }

            } else {
                /* move player2 towards goal */
                let currRow = p2Path[1][0].split("")[0];
                let currCol = p2Path[1][0].split("")[1];
                let rowIdx = p2Path[1][1].split("")[0];
                let colIdx = p2Path[1][1].split("")[1];
                let nextMove = [rowIdx, colIdx];
                let moves = this.getAvailableMoves([parseInt(currRow), parseInt(currCol)]);
                for (let i = 0; i < moves.length; i++) {
                    let move = moves[i].join("");
                    if (p2Path[1].includes(move)){
                        this.movePlayer(moves[i]);
                    }
                }
            }
        }
        console.log("END OF AI TURN");
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
                    if (this.currentPlayer === "player1") this.player1Walls = this.player1Walls - 1;
                    if (this.currentPlayer === "player2") this.player2Walls = this.player2Walls - 1;
                    this.swapTurn();
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
                    if (this.currentPlayer === "player1") this.player1Walls = this.player1Walls - 1;
                    if (this.currentPlayer === "player2") this.player2Walls = this.player2Walls - 1;
                    this.swapTurn();
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
                    if (this.currentPlayer === "player1") this.player1Walls = this.player1Walls - 1;
                    if (this.currentPlayer === "player2") this.player2Walls = this.player2Walls - 1;
                    this.swapTurn();
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
                this.swapTurn();
            }


        } else {
            // else then does nothing or sends error message
            //    does not swap turns

        }
    }

    getAvailableMoves(pos) {
        /* pos = [row, col] */
        console.log(pos);
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
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/game.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9xdW9yaWRvci8uL3NyYy9ib2FyZC5qcyIsIndlYnBhY2s6Ly9xdW9yaWRvci8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL3F1b3JpZG9yLy4vc3JjL3NxdWFyZS5qcyIsIndlYnBhY2s6Ly9xdW9yaWRvci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9xdW9yaWRvci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcXVvcmlkb3Ivd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9xdW9yaWRvci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3F1b3JpZG9yL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBOEI7O0FBRWY7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRGQUE0RjtBQUM1Riw0RkFBNEY7QUFDNUYsNEZBQTRGO0FBQzVGLDRGQUE0RjtBQUM1RjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0EsZ0M7QUFDQSxtQkFBbUI7QUFDbkIsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0EsK0NBQStDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQSw0QkFBNEIsaUJBQWlCO0FBQzdDO0FBQ0EsZ0NBQWdDLGdCQUFnQjtBQUNoRCxpQ0FBaUMsNENBQU07QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsVUFBVSxLQUFLLEVBQUUsRUFDakI7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqTDRCOztBQUViO0FBQ2Y7QUFDQSx5QkFBeUIsMkNBQUs7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsc0JBQXNCO0FBQ3BEO0FBQ0EsMkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLGtCQUFrQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFzQix5QkFBeUI7QUFDL0MsMENBQTBDLE1BQU07QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixzREFBZ0I7O0FBRWxDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pELGFBQWE7QUFDYjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQsYUFBYTtBQUNiO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRCxhQUFhO0FBQ2I7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pELGFBQWE7QUFDYjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7O0FDeGVlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7VUN2Q0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImdhbWUuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNxdWFyZSBmcm9tIFwiLi9zcXVhcmVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXJkIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMud2lkdGggPSA5O1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gOTtcclxuICAgICAgICB0aGlzLmdyaWQgPSBCb2FyZC5tYWtlR3JpZCh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICAgICAgdGhpcy53aW5uZXIgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQbGF5ZXJzKHBsYXllcjEsIHAxUG9zLCBwbGF5ZXIyLCBwMlBvcykge1xyXG4gICAgICAgIC8qIHAxUG9zICYgcDJQb3MgPSBbcm93LCBjb2xdICovXHJcbiAgICAgICAgbGV0IGdyaWRTcXVhcmUyID0gdGhpcy5ncmlkW3AyUG9zWzBdXVtwMlBvc1sxXV07XHJcbiAgICAgICAgbGV0IGdyaWRTcXVhcmUxID0gdGhpcy5ncmlkW3AxUG9zWzBdXVtwMVBvc1sxXV07XHJcbiAgICAgICAgaWYoISFwbGF5ZXIyKSB7XHJcbiAgICAgICAgICAgIGdyaWRTcXVhcmUyLm1vZGVsID0gXCJwZXJzb25cIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBncmlkU3F1YXJlMi5tb2RlbCA9IFwiYWlcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoISFwbGF5ZXIxKSB7XHJcbiAgICAgICAgICAgIGdyaWRTcXVhcmUxLm1vZGVsID0gXCJwZXJzb25cIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBncmlkU3F1YXJlMS5tb2RlbCA9IFwiYWlcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ3JpZFNxdWFyZTIucGxheWVyID0gXCJwbGF5ZXIyXCI7XHJcbiAgICAgICAgZ3JpZFNxdWFyZTEucGxheWVyID0gXCJwbGF5ZXIxXCI7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tOZWlnaGJvcnMoc3F1YXJlKSB7XHJcbiAgICAgICAgLyogXHJcbiAgICAgICAgcmVxdWlyZXMgW1tudW1dW251bV1dIFxyXG4gICAgICAgIHNxdWFyZSA9IFtyb3dJZHgsIGNvbElkeF1cclxuICAgICAgICAqL1xyXG4gICAgICAgIGxldCBuZWlnaGJvcnMgPSBbXTtcclxuICAgICAgICBsZXQgY29sSWR4ID0gc3F1YXJlWzFdO1xyXG4gICAgICAgIGxldCByb3dJZHggID0gc3F1YXJlWzBdO1xyXG4gICAgICAgIChyb3dJZHggLSAxID49IDApID8gbmVpZ2hib3JzLnB1c2goW3Jvd0lkeCAtIDEsIGNvbElkeF0pIDogbmVpZ2hib3JzLnB1c2goWy0xLCAtMV0pOyAgLy8gbm9ydGhcclxuICAgICAgICAocm93SWR4ICsgMSA8PSA4KSA/IG5laWdoYm9ycy5wdXNoKFtyb3dJZHggKyAxLCBjb2xJZHhdKSA6IG5laWdoYm9ycy5wdXNoKFstMSwgLTFdKTsgIC8vIHNvdXRoXHJcbiAgICAgICAgKGNvbElkeCAtIDEgPj0gMCkgPyBuZWlnaGJvcnMucHVzaChbcm93SWR4LCBjb2xJZHggLSAxXSkgOiBuZWlnaGJvcnMucHVzaChbLTEsIC0xXSk7ICAvLyB3ZXN0XHJcbiAgICAgICAgKGNvbElkeCArIDEgPD0gOCkgPyBuZWlnaGJvcnMucHVzaChbcm93SWR4LCBjb2xJZHggKyAxXSkgOiBuZWlnaGJvcnMucHVzaChbLTEsIC0xXSk7ICAvLyBlYXN0XHJcbiAgICAgICAgcmV0dXJuIG5laWdoYm9ycztcclxuICAgIH1cclxuXHJcbiAgICBpc1dhbGxlZChkaXIsIHJvd0lkeCwgY29sSWR4KSB7XHJcbiAgICAgICAgLyogXHJcbiAgICAgICAgIHJldHVybnMgdHJ1ZSBpZiBwYXRoIGlzIGJsb2NrZWQgYnkgd2FsbFxyXG4gICAgICAgICByZXR1cm5zIGZhbHNlIGlmIHBhdGggaXMgZnJlZVxyXG4gICAgICAgICovXHJcbiAgICAgICBcclxuICAgICAgICBsZXQgc3F1YXJlID0gdGhpcy5ncmlkW3Jvd0lkeF1bY29sSWR4XTtcclxuICAgICAgICBpZihkaXIgPT09IFwidXBcIikge1xyXG4gICAgICAgICAgICBpZihzcXVhcmUud2FsbHMuTm9ydGgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChkaXIgPT09IFwicmlnaHRcIikge1xyXG4gICAgICAgICAgICBpZihzcXVhcmUud2FsbHMuRWFzdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGRpciA9PT0gXCJkb3duXCIpIHtcclxuICAgICAgICAgICAgaWYoc3F1YXJlLndhbGxzLlNvdXRoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZGlyID09PSBcImxlZnRcIikge1xyXG4gICAgICAgICAgICBpZihzcXVhcmUud2FsbHMuV2VzdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBiZnMocm9vdCwgZ29hbCA9IFtcIjAwXCIsXCIwMVwiLFwiMDJcIixcIjAzXCIsXCIwNFwiLFwiMDVcIixcIjA2XCIsXCIwN1wiLFwiMDhcIl0pIHtcclxuICAgICAgICAvKiBcclxuICAgICAgICByb290ID09PSBbcm93SWR4LCBjb2xJZHhdXHJcblxyXG4gICAgICAgIHRoaXMgZnVuY3Rpb24gaXMgc28gY3J1c3R5IFxyXG4gICAgICAgICovXHJcblxyXG5cclxuICAgICAgICBsZXQgaGFzaG1hcCA9IG5ldyBNYXAoKTsgXHJcbiAgICAgICAgbGV0IFEgPSBbXTsgLy9hcnJheSBvZiBbcm93LCBjb2xdXHJcbiAgICAgICAgbGV0IGRpc2NvdmVyZWQgPSBbXTsgLy9hcnJheSBvZiBpZFxyXG4gICAgICAgIGhhc2htYXAuc2V0KHJvb3QsIG51bGwpXHJcbiAgICAgICAgUS5wdXNoKHJvb3QpO1xyXG4gICAgICAgIGRpc2NvdmVyZWQucHVzaChyb290LmpvaW4oXCJcIikpO1xyXG4gICAgICAgIHdoaWxlIChRLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IHYgPSBRLnNoaWZ0KCk7IC8vIHBvc1xyXG4gICAgICAgICAgICBsZXQgaWQgPSB2LmpvaW4oXCJcIik7XHJcbiAgICAgICAgICAgIGxldCBzcXVhcmUgPSB0aGlzLmdyaWRbdlswXV1bdlsxXV07IC8vc3F1YXJlXHJcbiAgICAgICAgICAgIGlmIChnb2FsLmluY2x1ZGVzKGlkKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhdGggPSBbXTtcclxuICAgICAgICAgICAgICAgIHBhdGggPSB0aGlzLnRyYXZlcnNlSGFzaG1hcChoYXNobWFwLCB2LmpvaW4oXCJcIikpO1xyXG4gICAgICAgICAgICAgICAgcGF0aC5wdXNoKHYuam9pbihcIlwiKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW3Yuam9pbihcIlwiKSwgcGF0aF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gZmluZGluZyBhbGwgcG9zc2libGUgZGlyZWN0aW9uc1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKCghc3F1YXJlLndhbGxzLk5vcnRoICYmIChwYXJzZUludCh2WzBdKSA+IDApKSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3ViA9IHYuam9pbihcIlwiKS5zcGxpdChcIlwiKTtcclxuICAgICAgICAgICAgICAgIG5ld1ZbMF0gPSBwYXJzZUludChuZXdWWzBdKSAtIDE7XHJcbiAgICAgICAgICAgICAgICBpZCA9IG5ld1Yuam9pbihcIlwiKTtcclxuICAgICAgICAgICAgICAgIGlmICghZGlzY292ZXJlZC5pbmNsdWRlcyhpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNjb3ZlcmVkLnB1c2goaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIFEucHVzaChuZXdWKTtcclxuICAgICAgICAgICAgICAgICAgICBoYXNobWFwLnNldChuZXdWLmpvaW4oXCJcIiksIHYuam9pbihcIlwiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCghc3F1YXJlLndhbGxzLlNvdXRoICYmIChwYXJzZUludCh2WzBdKSA8IDgpKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1YgPSB2LmpvaW4oXCJcIikuc3BsaXQoXCJcIik7XHJcbiAgICAgICAgICAgICAgICBuZXdWWzBdID0gcGFyc2VJbnQobmV3VlswXSkgKyAxO1xyXG4gICAgICAgICAgICAgICAgaWQgPSBuZXdWLmpvaW4oXCJcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRpc2NvdmVyZWQuaW5jbHVkZXMoaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzY292ZXJlZC5wdXNoKGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBRLnB1c2gobmV3Vik7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzaG1hcC5zZXQobmV3Vi5qb2luKFwiXCIpLCB2LmpvaW4oXCJcIikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgoIXNxdWFyZS53YWxscy5FYXN0ICYmIChwYXJzZUludCh2WzFdKSA8IDgpKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1YgPSB2LmpvaW4oXCJcIikuc3BsaXQoXCJcIik7XHJcbiAgICAgICAgICAgICAgICBuZXdWWzFdID0gcGFyc2VJbnQobmV3VlsxXSkgKyAxO1xyXG4gICAgICAgICAgICAgICAgaWQgPSBuZXdWLmpvaW4oXCJcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRpc2NvdmVyZWQuaW5jbHVkZXMoaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzY292ZXJlZC5wdXNoKGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBRLnB1c2gobmV3Vik7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzaG1hcC5zZXQobmV3Vi5qb2luKFwiXCIpLCB2LmpvaW4oXCJcIikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgoIXNxdWFyZS53YWxscy5XZXN0ICYmIChwYXJzZUludCh2WzFdKSA+IDApKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1YgPSB2LmpvaW4oXCJcIikuc3BsaXQoXCJcIik7XHJcbiAgICAgICAgICAgICAgICBuZXdWWzFdID0gcGFyc2VJbnQobmV3VlsxXSkgLSAxO1xyXG4gICAgICAgICAgICAgICAgaWQgPSBuZXdWLmpvaW4oXCJcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRpc2NvdmVyZWQuaW5jbHVkZXMoaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzY292ZXJlZC5wdXNoKGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBRLnB1c2gobmV3Vik7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzaG1hcC5zZXQobmV3Vi5qb2luKFwiXCIpLCB2LmpvaW4oXCJcIikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB0cmF2ZXJzZUhhc2htYXAoaGFzaCwgc3RhcnQpIHtcclxuICAgICAgICBsZXQgbm9kZSA9IGhhc2guZ2V0KHN0YXJ0KTtcclxuICAgICAgICBsZXQgcGF0aCA9IFtdO1xyXG4gICAgICAgIHdoaWxlIChub2RlKSB7XHJcbiAgICAgICAgICAgIHBhdGgucHVzaChub2RlKVxyXG4gICAgICAgICAgICBub2RlID0gaGFzaC5nZXQobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwYXRoLnJldmVyc2UoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgc3RhdGljIG1ha2VHcmlkKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICBjb25zdCBncmlkID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IHJvd0lkeCA9IDA7IHJvd0lkeCA8IGhlaWdodDsgcm93SWR4KyspIHtcclxuICAgICAgICAgICAgZ3JpZC5wdXNoKFtdKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgY29sSWR4ID0gMDsgY29sSWR4IDwgd2lkdGg7IGNvbElkeCsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3F1YXJlID0gbmV3IFNxdWFyZShjb2xJZHggLCByb3dJZHgpXHJcbiAgICAgICAgICAgICAgICBncmlkW3Jvd0lkeF0ucHVzaChzcXVhcmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBncmlkO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBpc1ZhbGlkUG9zKGNvbElkeCwgcm93SWR4KSB7XHJcbiAgICAgICAgLy8gdmFsaWRhdGlvbiB0byBjaGVjayB0aGUgZW5kcyBvZiB0aGUgYm9hcmRcclxuICAgICAgICBpZiAoKGNvbElkeCA8IDAgfHwgcm93SWR4IDwgMCkgfHwgKGNvbElkeCA+IDggfHwgcm93SWR4ID4gOCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZmFsc2UpIHtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiIsImltcG9ydCBCb2FyZCBmcm9tIFwiLi9ib2FyZFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmJvYXJkID0gbmV3IEJvYXJkKCk7XHJcbiAgICAgICAgdGhpcy5ncmlkID0gdGhpcy5ib2FyZC5ncmlkO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFBsYXllciA9IFwibm9vbmVcIjtcclxuICAgICAgICAvKiB0aGlzLnBsYXllciA9IFtyb3dJZHgsIGNvbElkeF0gKi9cclxuICAgICAgICB0aGlzLnBsYXllcjEgPSBbOCwgNF07XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIyID0gWzAsIDRdO1xyXG4gICAgICAgIHRoaXMucGxheWVyMVdhbGxzID0gMTA7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIyV2FsbHMgPSAxMDtcclxuICAgICAgICB0aGlzLnN0YXRlID0gXCJub3QgZG9pbmcgYW55dGhpbmdcIjtcclxuXHJcbiAgICAgICAgdGhpcy5tb3ZlUGxheWVyID0gdGhpcy5tb3ZlUGxheWVyLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNPdmVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLndpbm5lcigpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcHV0ZXJBaVR1cm4oKSB7XHJcbiAgICAgICAgaWYodGhpcy5jdXJyZW50UGxheWVyID09PSBcInBsYXllcjJcIikge1xyXG4gICAgICAgICAgICBsZXQgcDJQYXRoID0gdGhpcy5ib2FyZC5iZnModGhpcy5wbGF5ZXIyLCBbXCI4MFwiLFwiODFcIixcIjgyXCIsXCI4M1wiLFwiODRcIixcIjg1XCIsXCI4NlwiLFwiODdcIixcIjg4XCJdKVxyXG4gICAgICAgICAgICBsZXQgcDFQYXRoID0gdGhpcy5ib2FyZC5iZnModGhpcy5wbGF5ZXIxKTtcclxuICAgICAgICAgICAgbGV0IHJhbmRvbSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyYW5kb20pO1xyXG4gICAgICAgICAgICBpZiAoKHAxUGF0aFsxXS5sZW5ndGggPD0gcDJQYXRoWzFdLmxlbmd0aCkgJiYgKHRoaXMucGxheWVyMldhbGxzID4gMCkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxhY2luZyB3YWxsXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwYXRoID0+IFwiLCBwMVBhdGgpO1xyXG4gICAgICAgICAgICAgICAgLyogcGxhY2Ugd2FsbCBpZiBwbGF5ZXIxIGlzIGNsb3NlciB0byBnb2FsICovXHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcDFQYXRoWzFdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvd0lkeCA9IHAxUGF0aFsxXVtpXS5zcGxpdChcIlwiKVswXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY29sSWR4ID0gcDFQYXRoWzFdW2ldLnNwbGl0KFwiXCIpWzFdOyAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXh0Um93SWR4ID0gcDFQYXRoWzFdW2kgKyAxXS5zcGxpdChcIlwiKVswXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dENvbElkeCA9IHAxUGF0aFsxXVtpICsgMV0uc3BsaXQoXCJcIilbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBsYWNlZFdhbGwgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3F1YXJlQSA9IFtwYXJzZUludChuZXh0Um93SWR4KSwgcGFyc2VJbnQobmV4dENvbElkeCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcXVhcmVOZWlnaGJvcnMgPSB0aGlzLmJvYXJkLmNoZWNrTmVpZ2hib3JzKHNxdWFyZUEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibmVpZ2hib3JzID0+IFwiLCBzcXVhcmVOZWlnaGJvcnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcXVhcmVCO1xyXG4gICAgICAgICAgICAgICAgICAgIC8qIFxyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQgYW5kIHVwIFxyXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlV2FsbChkaXIsIGV2ZW50LCBzcXVhcmVBLCBzcXVhcmVCKVxyXG4gICAgICAgICAgICAgICAgICAgIGRpciA9IE5vcnRoLCBTb3V0aCwgRWFzdCwgV2VzdFxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50ID0gbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgIHNxdWFyZUEgPSBbcm93SWR4LCBjb2xJZHhdXHJcbiAgICAgICAgICAgICAgICAgICAgc3F1YXJlQiA9IFtyb3dJZHgsIGNvbElkeF1cclxuICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicm93ID0+IFwiLCByb3dJZHgsIG5leHRSb3dJZHgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29sID0+IFwiLCBjb2xJZHgsIG5leHRDb2xJZHgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbElkeCA9PT0gbmV4dENvbElkeCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoIGlzIG1vdmluZyB1cCBvciBkb3duXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrIG5laWdoYm9ycyBhbmQgc2V0IHNxdWFyZUIgdG8gYSB2YWxpZCBvbmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3JzID0gW25vcnRoLCBzb3V0aCwgd2VzdCwgZWFzdF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlIHJhbmRvbSBpZiB5b3Ugd2FudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmVBID0gbmV4dCBiZXN0IHBvcyBvZiBwbGF5ZXIxIChvcHBvbmVudClcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlQiA9IHNxdWFyZSB0byB0aGUgd2VzdCBvZiBzcXVhcmVBXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyYW5kb20gPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcXVhcmVOZWlnaGJvcnNbMl1bMF0gIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlQiA9IHNxdWFyZU5laWdoYm9yc1syXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlQiA9IHNxdWFyZU5laWdoYm9yc1szXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcXVhcmVOZWlnaGJvcnNbM11bMF0gIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlQiA9IHNxdWFyZU5laWdoYm9yc1szXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlQiA9IHNxdWFyZU5laWdoYm9yc1syXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNxdWFyZXMgPT4gXCIsIHNxdWFyZUEsIHNxdWFyZUIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWRXYWxsID0gdGhpcy5wbGFjZVdhbGwoXCJTb3V0aFwiLCBudWxsLCBzcXVhcmVBLCBzcXVhcmVCKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwbGFjZWR3YWxsID0+IFwiLCBwbGFjZWRXYWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBsYWNlZFdhbGwgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYnJlYWtpbmdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBsYWNlZFdhbGwgPSB0aGlzLnBsYWNlV2FsbChcIk5vcnRoXCIsIG51bGwsIHNxdWFyZUEsIHNxdWFyZUIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJwbGFjZWR3YWxsID0+IFwiLCBwbGFjZWRXYWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChwbGFjZWRXYWxsID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCJicmVha2luZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCJob3cgZGlkIGkgZW5kIHVwIGhlcmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvd0lkeCA9PT0gbmV4dFJvd0lkeCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmFuZG9tID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3F1YXJlTmVpZ2hib3JzWzBdWzBdICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNxdWFyZUIgPSBzcXVhcmVOZWlnaGJvcnNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNxdWFyZUIgPSBzcXVhcmVOZWlnaGJvcnNbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3F1YXJlTmVpZ2hib3JzWzFdWzBdICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNxdWFyZUIgPSBzcXVhcmVOZWlnaGJvcnNbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNxdWFyZUIgPSBzcXVhcmVOZWlnaGJvcnNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2xJZHggPiBuZXh0Q29sSWR4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzcXVhcmVBLCBzcXVhcmVCKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlZFdhbGwgPSB0aGlzLnBsYWNlV2FsbChcIkVhc3RcIiwgbnVsbCwgc3F1YXJlQSwgc3F1YXJlQik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYWNlZHdhbGwgPT4gXCIsIHBsYWNlZFdhbGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBsYWNlZFdhbGwgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImJyZWFraW5nXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzcXVhcmVBLCBzcXVhcmVCKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlZFdhbGwgPSB0aGlzLnBsYWNlV2FsbChcIldlc3RcIiwgbnVsbCwgc3F1YXJlQSwgc3F1YXJlQik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYWNlZHdhbGwgPT4gXCIsIHBsYWNlZFdhbGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBsYWNlZFdhbGwgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImJyZWFraW5nXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLyogbW92ZSBwbGF5ZXIyIHRvd2FyZHMgZ29hbCAqL1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1cnJSb3cgPSBwMlBhdGhbMV1bMF0uc3BsaXQoXCJcIilbMF07XHJcbiAgICAgICAgICAgICAgICBsZXQgY3VyckNvbCA9IHAyUGF0aFsxXVswXS5zcGxpdChcIlwiKVsxXTtcclxuICAgICAgICAgICAgICAgIGxldCByb3dJZHggPSBwMlBhdGhbMV1bMV0uc3BsaXQoXCJcIilbMF07XHJcbiAgICAgICAgICAgICAgICBsZXQgY29sSWR4ID0gcDJQYXRoWzFdWzFdLnNwbGl0KFwiXCIpWzFdO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5leHRNb3ZlID0gW3Jvd0lkeCwgY29sSWR4XTtcclxuICAgICAgICAgICAgICAgIGxldCBtb3ZlcyA9IHRoaXMuZ2V0QXZhaWxhYmxlTW92ZXMoW3BhcnNlSW50KGN1cnJSb3cpLCBwYXJzZUludChjdXJyQ29sKV0pO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb3Zlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gbW92ZXNbaV0uam9pbihcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocDJQYXRoWzFdLmluY2x1ZGVzKG1vdmUpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlUGxheWVyKG1vdmVzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFTkQgT0YgQUkgVFVSTlwiKTtcclxuICAgIH1cclxuXHJcbiAgICB3aW5uZXIoKSB7XHJcbiAgICAgICAgbGV0IHdpbm5lciA9IG51bGw7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZ3JpZFswXS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtpICsgMX0xYCkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJncmVlblwiO1xyXG4gICAgICAgICAgICBpZih0aGlzLmdyaWRbMF1baV0ucGxheWVyID09PSBcInBsYXllcjFcIikge1xyXG4gICAgICAgICAgICAgICAgd2lubmVyID0gXCJwbGF5ZXIxXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLmdyaWRbOF1baV0ucGxheWVyID09PSBcInBsYXllcjJcIikge1xyXG4gICAgICAgICAgICAgICAgd2lubmVyID0gXCJwbGF5ZXIyXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gd2lubmVyO1xyXG4gICAgfVxyXG5cclxuICAgIHRha2VUdXJuKGFjdGlvbiwgZGlyID0gbnVsbCwgZXZlbnQsIHNxdWFyZUEgPSBudWxsLCBzcXVhcmVCID0gbnVsbCkge1xyXG4gICAgICAgIC8vIG1vdmVtZW50IG9yIHdhbGwgcGxhY2VtZW50P1xyXG5cclxuICAgICAgICBpZiAoYWN0aW9uID09PSBcIm1vdmVcIikge1xyXG4gICAgICAgICAgICBpZigoZGlyID09PSBcInVwXCIpIHx8IChkaXIgPT09IFwicmlnaHRcIikgfHwgKGRpciA9PT0gXCJkb3duXCIpIHx8IChkaXIgPT09IFwibGVmdFwiKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlUGxheWVyKGRpcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoZGlyID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVQbGF5ZXIoZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiXCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gXCJwbGFjZVdhbGxcIikge1xyXG4gICAgICAgICAgICAvLyBjYWxscyB0aGlzLnBsYWNlV2FsbCgpXHJcbiAgICAgICAgICAgIHRoaXMucGxhY2VXYWxsKGRpciwgZXZlbnQsIHNxdWFyZUEsIHNxdWFyZUIpO1xyXG4gICAgICAgICAgICAvLyAgICB0aGUgcHJldmlvdXMgc29sdXRpb24gdG8gcGxhY2luZyB3YWxscyBzZWVtcyBibG9hdGVkIGJ1dCBvbmNlIGl0cyBpbXBsZW1lbnRlZCBpdHMgZmx1aWQuLi5cclxuICAgICAgICAgICAgLy8gICAgSSBhbSB0aGlua2luZyBvZiBoYXZpbmcgdGhlIHBsYWNlIHdhbGwgYnV0dG9uIG1vcnBoIGludG8gYSBub3J0aCBlYXN0IHNvdXRoIHdlc3QgYnV0dG9uLi4uXHJcbiAgICAgICAgICAgIC8vICAgICAgIG1pZ2h0IGJlIGJldHRlciBpZiBjbGllbnQgc2VsZWN0cyB0aGUgY2VsbHMgdGhleSB3aXNoIHRvIHBsYWNlIGEgd2FsbCBiZWZvcmUgYnV0dG9uIG1vcnBoc1xyXG4gICAgICAgICAgICAvLyAgICAgICB0aGF0IHdheSBvbmx5IG5vcnRoIHNvdXRoIG9yIGVhc3Qgd2VzdCBidXR0b25zIHdpbGwgc3Bhd25cclxuICAgICAgICAgICAgLy8gICAgc2VsZWN0aW5nIGNlbGxzIHdpbGwgYmUgZmx1aWQgd2l0aCBtb3VzZSBjbGljayBvciBsZXNzIGZsdWlkIHdpdGgga2V5IHByZXNzaW5nIGNvb3JkaW5hdGVzXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwbGFjZVdhbGwoZGlyLCBldmVudCwgc3F1YXJlQSwgc3F1YXJlQikge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgc3F1YXJlQSAmIHNxdWFyZUIgPSBbcm93SWR4LCBjb2xJZHhdXHJcbiAgICAgICAgZ2V0IFNxdWFyZSBhbmQgc2V0IHRoZSBzcGVjaWZpYyB3YWxscyB0byB0cnVlIFxyXG4gICAgICAgIGdldCBuZWlnaGJvcnMgYW5kIHNzZXQgc3BlY2lmaWMgd2FsbHMgdG8gdHJ1ZS4uLiBvcHBvc2l0ZSB3YWxsXHJcbiAgICAgICAgc3F1YXJlUG9zID0gdGhpcy5ncmlkW3Jvd0lkeCwgY29sSWR4XVxyXG4gICAgICAgICovXHJcblxyXG5cclxuICAgICAgICBpZihzcXVhcmVBWzBdID4gOCB8fCBzcXVhcmVBWzBdIDwgMCB8fCBzcXVhcmVCWzBdID4gOCB8fCBzcXVhcmVCWzBdIDwgMFxyXG4gICAgICAgICAgICB8fCBzcXVhcmVBWzFdID4gOCB8fCBzcXVhcmVBWzFdIDwgMCB8fCBzcXVhcmVCWzFdID4gOCB8fCBzcXVhcmVCWzFdIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc3FyQSA9IHRoaXMuZ3JpZFtzcXVhcmVBWzBdXVtzcXVhcmVBWzFdXTtcclxuICAgICAgICBsZXQgc3FyQiA9IHRoaXMuZ3JpZFtzcXVhcmVCWzBdXVtzcXVhcmVCWzFdXTtcclxuICAgICAgICBsZXQgbmVpZ2hib3JzQSA9IHRoaXMuYm9hcmQuY2hlY2tOZWlnaGJvcnMoW3NxckEucm93SWR4LCBzcXJBLmNvbElkeF0pO1xyXG4gICAgICAgIGxldCBuZWlnaGJvcnNCID0gdGhpcy5ib2FyZC5jaGVja05laWdoYm9ycyhbc3FyQi5yb3dJZHgsIHNxckIuY29sSWR4XSk7XHJcbiAgICAgICAgbGV0IGlzVmFsaWRXYWxsO1xyXG4gICAgICAgIGxldCBwbGF5ZXJXYWxscztcclxuICAgICAgICB0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyMVwiID8gcGxheWVyV2FsbHMgPSB0aGlzLnBsYXllcjFXYWxscyA6IHBsYXllcldhbGxzID0gdGhpcy5wbGF5ZXIyV2FsbHNcclxuICAgICAgICBpZiAocGxheWVyV2FsbHMgPiAwKSB7XHJcblxyXG4gICAgICAgICAgICBpZihkaXIgPT09IFwiTm9ydGhcIiAmJiAoIXNxckEud2FsbHMuTm9ydGggJiYgIXNxckIud2FsbHMuTm9ydGgpKXtcclxuICAgICAgICAgICAgICAgIHNxckEud2FsbHMuTm9ydGggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc3FyQi53YWxscy5Ob3J0aCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvKiBzZXRzIHRoZSBub3J0aCBuZWlnaGJvcnMgc291dGggd2FsbCB0byB0cnVlICovXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRbbmVpZ2hib3JzQVswXVswXV1bbmVpZ2hib3JzQVswXVsxXV0ud2FsbHMuU291dGggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0JbMF1bMF1dW25laWdoYm9yc0JbMF1bMV1dLndhbGxzLlNvdXRoID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlzVmFsaWRXYWxsID0gdGhpcy5maW5kUGF0aCgpO1xyXG4gICAgICAgICAgICAgICAgaWYoaXNWYWxpZFdhbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50UGxheWVyID09PSBcInBsYXllcjFcIikgdGhpcy5wbGF5ZXIxV2FsbHMgPSB0aGlzLnBsYXllcjFXYWxscyAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFBsYXllciA9PT0gXCJwbGF5ZXIyXCIpIHRoaXMucGxheWVyMldhbGxzID0gdGhpcy5wbGF5ZXIyV2FsbHMgLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dhcFR1cm4oKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3FyQS53YWxscy5Ob3J0aCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNxckIud2FsbHMuTm9ydGggPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyaWRbbmVpZ2hib3JzQVswXVswXV1bbmVpZ2hib3JzQVswXVsxXV0ud2FsbHMuU291dGggPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyaWRbbmVpZ2hib3JzQlswXVswXV1bbmVpZ2hib3JzQlswXVsxXV0ud2FsbHMuU291dGggPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihkaXIgPT09IFwiRWFzdFwiICYmICghc3FyQS53YWxscy5FYXN0ICYmICFzcXJCLndhbGxzLkVhc3QpKXtcclxuICAgICAgICAgICAgICAgIHNxckEud2FsbHMuRWFzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzcXJCLndhbGxzLkVhc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLyogc2V0cyB0aGUgRWFzdCBuZWlnaGJvcnMgV2VzdCB3YWxsIHRvIHRydWUgKi9cclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtuZWlnaGJvcnNBWzNdWzBdXVtuZWlnaGJvcnNBWzNdWzFdXS53YWxscy5XZXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtuZWlnaGJvcnNCWzNdWzBdXVtuZWlnaGJvcnNCWzNdWzFdXS53YWxscy5XZXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlzVmFsaWRXYWxsID0gdGhpcy5maW5kUGF0aCgpO1xyXG4gICAgICAgICAgICAgICAgaWYoaXNWYWxpZFdhbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50UGxheWVyID09PSBcInBsYXllcjFcIikgdGhpcy5wbGF5ZXIxV2FsbHMgPSB0aGlzLnBsYXllcjFXYWxscyAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFBsYXllciA9PT0gXCJwbGF5ZXIyXCIpIHRoaXMucGxheWVyMldhbGxzID0gdGhpcy5wbGF5ZXIyV2FsbHMgLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dhcFR1cm4oKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3FyQS53YWxscy5FYXN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgc3FyQi53YWxscy5FYXN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0FbM11bMF1dW25laWdoYm9yc0FbM11bMV1dLndhbGxzLldlc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyaWRbbmVpZ2hib3JzQlszXVswXV1bbmVpZ2hib3JzQlszXVsxXV0ud2FsbHMuV2VzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGRpciA9PT0gXCJTb3V0aFwiICYmICghc3FyQS53YWxscy5Tb3V0aCAmJiAhc3FyQi53YWxscy5Tb3V0aCkpe1xyXG4gICAgICAgICAgICAgICAgc3FyQS53YWxscy5Tb3V0aCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzcXJCLndhbGxzLlNvdXRoID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8qIHNldHMgdGhlIFNvdXRoIG5laWdoYm9ycyBOb3J0aCB3YWxsIHRvIHRydWUgKi9cclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtuZWlnaGJvcnNBWzFdWzBdXVtuZWlnaGJvcnNBWzFdWzFdXS53YWxscy5Ob3J0aCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRbbmVpZ2hib3JzQlsxXVswXV1bbmVpZ2hib3JzQlsxXVsxXV0ud2FsbHMuTm9ydGggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaXNWYWxpZFdhbGwgPSB0aGlzLmZpbmRQYXRoKCk7XHJcbiAgICAgICAgICAgICAgICBpZihpc1ZhbGlkV2FsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyMVwiKSB0aGlzLnBsYXllcjFXYWxscyA9IHRoaXMucGxheWVyMVdhbGxzIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50UGxheWVyID09PSBcInBsYXllcjJcIikgdGhpcy5wbGF5ZXIyV2FsbHMgPSB0aGlzLnBsYXllcjJXYWxscyAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2FwVHVybigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzcXJBLndhbGxzLlNvdXRoID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgc3FyQi53YWxscy5Tb3V0aCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtuZWlnaGJvcnNBWzFdWzBdXVtuZWlnaGJvcnNBWzFdWzFdXS53YWxscy5Ob3J0aCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtuZWlnaGJvcnNCWzFdWzBdXVtuZWlnaGJvcnNCWzFdWzFdXS53YWxscy5Ob3J0aCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGRpciA9PT0gXCJXZXN0XCIgJiYgKCFzcXJBLndhbGxzLldlc3QgJiYgIXNxckIud2FsbHMuV2VzdCkpe1xyXG4gICAgICAgICAgICAgICAgc3FyQS53YWxscy5XZXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNxckIud2FsbHMuV2VzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvKiBzZXRzIHRoZSBXZXN0IG5laWdoYm9ycyBFYXN0IHdhbGwgdG8gdHJ1ZSAqL1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0FbMl1bMF1dW25laWdoYm9yc0FbMl1bMV1dLndhbGxzLkVhc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0JbMl1bMF1dW25laWdoYm9yc0JbMl1bMV1dLndhbGxzLkVhc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaXNWYWxpZFdhbGwgPSB0aGlzLmZpbmRQYXRoKCk7XHJcbiAgICAgICAgICAgICAgICBpZihpc1ZhbGlkV2FsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyMVwiKSB0aGlzLnBsYXllcjFXYWxscyA9IHRoaXMucGxheWVyMVdhbGxzIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50UGxheWVyID09PSBcInBsYXllcjJcIikgdGhpcy5wbGF5ZXIyV2FsbHMgPSB0aGlzLnBsYXllcjJXYWxscyAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2FwVHVybigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzcXJBLndhbGxzLldlc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBzcXJCLndhbGxzLldlc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyaWRbbmVpZ2hib3JzQVsyXVswXV1bbmVpZ2hib3JzQVsyXVsxXV0ud2FsbHMuRWFzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtuZWlnaGJvcnNCWzJdWzBdXVtuZWlnaGJvcnNCWzJdWzFdXS53YWxscy5FYXN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmVQbGF5ZXIoZGlyKSB7XHJcbiAgICAgICAgLy8gdGFrZXMgY3VycmVudCBwbGF5ZXIgY3VycmVudCBwb3NcclxuICAgICAgICAvLyBjYWxjdWxhdGVzIGZ1dHVyZSBwb3Mgd2l0aCBkaXJcclxuICAgICAgICBsZXQgcGxheWVyO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFBsYXllciA9PT0gXCJwbGF5ZXIxXCIgPyBwbGF5ZXIgPSB0aGlzLnBsYXllcjEgOiBwbGF5ZXIgPSB0aGlzLnBsYXllcjJcclxuICAgICAgICBsZXQgbmV3Q29sSWR4O1xyXG4gICAgICAgIGxldCBuZXdSb3dJZHg7XHJcbiAgICAgICAgbGV0IGlzV2FsbGVkO1xyXG4gICAgICAgIGxldCBpc1ZhbGlkO1xyXG4gICAgICAgIGlmIChkaXIgPT09IFwidXBcIikge1xyXG4gICAgICAgICAgICBuZXdDb2xJZHggPSBwbGF5ZXJbMV07XHJcbiAgICAgICAgICAgIG5ld1Jvd0lkeCA9IHBsYXllclswXSAtIDE7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkaXIgPT09IFwicmlnaHRcIikge1xyXG4gICAgICAgICAgICBuZXdDb2xJZHggPSBwbGF5ZXJbMV0gKyAxO1xyXG4gICAgICAgICAgICBuZXdSb3dJZHggPSBwbGF5ZXJbMF07XHJcbiAgICAgICAgfSBlbHNlIGlmIChkaXIgPT09IFwiZG93blwiKSB7XHJcbiAgICAgICAgICAgIG5ld0NvbElkeCA9IHBsYXllclsxXTtcclxuICAgICAgICAgICAgbmV3Um93SWR4ID0gcGxheWVyWzBdICsgMTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRpciA9PT0gXCJsZWZ0XCIpIHtcclxuICAgICAgICAgICAgbmV3Q29sSWR4ID0gcGxheWVyWzFdIC0gMTtcclxuICAgICAgICAgICAgbmV3Um93SWR4ID0gcGxheWVyWzBdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5ld1Jvd0lkeCA9IHBhcnNlSW50KGRpclswXSk7XHJcbiAgICAgICAgICAgIG5ld0NvbElkeCA9IHBhcnNlSW50KGRpclsxXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgIFRoZSBiZWxvdyB2YWxpZGF0aW9uIG5vIGxvbmdlciB3b3JrcyBmb3IgY2xpY2tpbmcgbW92ZW1lbnQuICBcclxuICAgICAgICBjaGVjayBmb3Igd2FsbHNcclxuICAgICAgICAgKi9cclxuICAgICAgICBpc1dhbGxlZCA9IHRoaXMuYm9hcmQuaXNXYWxsZWQoZGlyLCBwbGF5ZXJbMF0sIHBsYXllclsxXSk7XHJcbiAgICAgICAgLy8gZ2l2ZXMgdG8gdGhpcy5ib2FyZCB0byB2YWxpZGF0ZVxyXG4gICAgICAgIGlzVmFsaWQgPSBCb2FyZC5pc1ZhbGlkUG9zKG5ld0NvbElkeCwgbmV3Um93SWR4KTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBpZiB2YWxpZCB0aGVuIHNldHMgcGxheWVyIG5ldyB4IGFuZCB5XHJcbiAgICAgICAgLy8gICAgc3dhcHMgdHVybnNcclxuICAgICAgICBpZiAoaXNWYWxpZCAmJiAhaXNXYWxsZWQpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBvbGRTcXVhcmUgPSB0aGlzLmJvYXJkLmdyaWRbcGxheWVyWzBdXVtwbGF5ZXJbMV1dO1xyXG4gICAgICAgICAgICBsZXQgbmV3U3F1YXJlID0gdGhpcy5ib2FyZC5ncmlkW25ld1Jvd0lkeF1bbmV3Q29sSWR4XTtcclxuXHJcbiAgICAgICAgICAgIC8vdmFsaWRhdGlvbiB0byBjaGVjayBmb3IgcGxheWVyIGNvbGxpc2lvbiAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAobmV3U3F1YXJlLnBsYXllciAhPT0gXCJlbXB0eVwiKSB7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvbGRTcXVhcmUucGxheWVyID0gXCJlbXB0eVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQbGF5ZXJQb3ModGhpcy5jdXJyZW50UGxheWVyLCBbbmV3Um93SWR4LCBuZXdDb2xJZHhdKTtcclxuICAgICAgICAgICAgICAgIG5ld1NxdWFyZS5wbGF5ZXIgPSB0aGlzLmN1cnJlbnRQbGF5ZXI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN3YXBUdXJuKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGVsc2UgdGhlbiBkb2VzIG5vdGhpbmcgb3Igc2VuZHMgZXJyb3IgbWVzc2FnZVxyXG4gICAgICAgICAgICAvLyAgICBkb2VzIG5vdCBzd2FwIHR1cm5zXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRBdmFpbGFibGVNb3Zlcyhwb3MpIHtcclxuICAgICAgICAvKiBwb3MgPSBbcm93LCBjb2xdICovXHJcbiAgICAgICAgY29uc29sZS5sb2cocG9zKTtcclxuICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5jdXJyZW50UGxheWVyID09PSBcInBsYXllcjFcIiA/IHRoaXMucGxheWVyMSA6IHRoaXMucGxheWVyMjtcclxuICAgICAgICBsZXQgb3Bwb25lbnQgPSB0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyMVwiID8gdGhpcy5wbGF5ZXIyIDogdGhpcy5wbGF5ZXIxO1xyXG4gICAgICAgIGxldCBtb3ZlcyA9IFtdO1xyXG4gICAgICAgIGxldCBjdXJyZW50U3F1YXJlID0gdGhpcy5ncmlkW3Bvc1swXV1bcG9zWzFdXTtcclxuICAgICAgICBsZXQgc3F1YXJlO1xyXG4gICAgICAgIGxldCBjb2xJZHggPSBwb3NbMV07XHJcbiAgICAgICAgbGV0IHJvd0lkeCAgPSBwb3NbMF07XHJcbiAgICAgICAgLyogY2hlY2sgZm9yIHBsYXllciAqL1xyXG4gICAgICAgIGlmICgocm93SWR4IC0gMSA+PSAwKSAmJiAoIWN1cnJlbnRTcXVhcmUud2FsbHMuTm9ydGgpKSB7XHJcbiAgICAgICAgICAgIHNxdWFyZSA9IHRoaXMuZ3JpZFtyb3dJZHggLSAxXVtjb2xJZHhdO1xyXG4gICAgICAgICAgICBpZiAoc3F1YXJlLnBsYXllciA9PT0gXCJlbXB0eVwiKSB7XHJcbiAgICAgICAgICAgICAgICBtb3Zlcy5wdXNoKFtyb3dJZHggLSAxLCBjb2xJZHhdKTsgIC8vIG5vcnRoXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoW1wicGxheWVyMVwiLCBcInBsYXllcjJcIl0uaW5jbHVkZXMoc3F1YXJlLnBsYXllcikpe1xyXG4gICAgICAgICAgICAgICAgaWYgKChyb3dJZHggLSAyID49IDApICYmICghc3F1YXJlLndhbGxzLk5vcnRoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVzLnB1c2goW3Jvd0lkeCAtIDIsIGNvbElkeF0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcFNxdWFyZSA9IHJvd0lkeCAtIDIgPj0gMCA/IHRoaXMuZ3JpZFtyb3dJZHggLSAyXVtjb2xJZHhdIDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzcXVhcmUud2FsbHMuTm9ydGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzcXVhcmUud2FsbHMuRWFzdCkgbW92ZXMucHVzaChbcm93SWR4IC0gMSwgY29sSWR4ICsgMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNxdWFyZS53YWxscy5XZXN0KSBtb3Zlcy5wdXNoKFtyb3dJZHggLSAxLCBjb2xJZHggLSAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0ZW1wU3F1YXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNxdWFyZS53YWxscy5FYXN0KSBtb3Zlcy5wdXNoKFtyb3dJZHggLSAxLCBjb2xJZHggKyAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNxdWFyZS53YWxscy5XZXN0KSBtb3Zlcy5wdXNoKFtyb3dJZHggLSAxLCBjb2xJZHggLSAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKChjb2xJZHggKyAxIDw9IDgpICYmICghY3VycmVudFNxdWFyZS53YWxscy5FYXN0KSkge1xyXG4gICAgICAgICAgICBzcXVhcmUgPSB0aGlzLmdyaWRbcm93SWR4XVtjb2xJZHggKyAxXTtcclxuICAgICAgICAgICAgaWYgKHNxdWFyZS5wbGF5ZXIgPT09IFwiZW1wdHlcIikge1xyXG4gICAgICAgICAgICAgICAgbW92ZXMucHVzaChbcm93SWR4LCBjb2xJZHggKyAxXSk7ICAvLyBlYXN0XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoW1wicGxheWVyMVwiLCBcInBsYXllcjJcIl0uaW5jbHVkZXMoc3F1YXJlLnBsYXllcikpe1xyXG4gICAgICAgICAgICAgICAgaWYgKChjb2xJZHggKyAyIDw9IDgpICYmICghc3F1YXJlLndhbGxzLkVhc3QpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZXMucHVzaChbcm93SWR4LCBjb2xJZHggKyAyXSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wU3F1YXJlID0gY29sSWR4ICsgMiA8PSA4ID8gdGhpcy5ncmlkW3Jvd0lkeF1bY29sSWR4ICsgMl0gOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNxdWFyZS53YWxscy5FYXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3F1YXJlLndhbGxzLk5vcnRoKSBtb3Zlcy5wdXNoKFtyb3dJZHggLSAxLCBjb2xJZHggKyAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3F1YXJlLndhbGxzLlNvdXRoKSBtb3Zlcy5wdXNoKFtyb3dJZHggKyAxLCBjb2xJZHggKyAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0ZW1wU3F1YXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNxdWFyZS53YWxscy5Ob3J0aCkgbW92ZXMucHVzaChbcm93SWR4IC0gMSwgY29sSWR4ICsgMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzcXVhcmUud2FsbHMuU291dGgpIG1vdmVzLnB1c2goW3Jvd0lkeCArIDEsIGNvbElkeCArIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKHJvd0lkeCArIDEgPD0gOCkgJiYgKCFjdXJyZW50U3F1YXJlLndhbGxzLlNvdXRoKSkge1xyXG4gICAgICAgICAgICBzcXVhcmUgPSB0aGlzLmdyaWRbcm93SWR4ICsgMV1bY29sSWR4XTtcclxuICAgICAgICAgICAgaWYgKHNxdWFyZS5wbGF5ZXIgPT09IFwiZW1wdHlcIikge1xyXG4gICAgICAgICAgICAgICAgbW92ZXMucHVzaChbcm93SWR4ICsgMSwgY29sSWR4XSk7ICAvLyBzb3V0aFxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFtcInBsYXllcjFcIiwgXCJwbGF5ZXIyXCJdLmluY2x1ZGVzKHNxdWFyZS5wbGF5ZXIpKXtcclxuICAgICAgICAgICAgICAgIGlmICgocm93SWR4ICsgMiA8PSA4KSAmJiAoIXNxdWFyZS53YWxscy5Tb3V0aCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3Zlcy5wdXNoKFtyb3dJZHggKyAyLCBjb2xJZHhdKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBTcXVhcmUgPSByb3dJZHggKyAyIDw9IDggPyB0aGlzLmdyaWRbcm93SWR4ICsgMl1bY29sSWR4XSA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3F1YXJlLndhbGxzLlNvdXRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3F1YXJlLndhbGxzLkVhc3QpIG1vdmVzLnB1c2goW3Jvd0lkeCArIDEsIGNvbElkeCArIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzcXVhcmUud2FsbHMuV2VzdCkgbW92ZXMucHVzaChbcm93SWR4ICsgMSwgY29sSWR4IC0gMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGVtcFNxdWFyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzcXVhcmUud2FsbHMuRWFzdCkgbW92ZXMucHVzaChbcm93SWR4ICsgMSwgY29sSWR4ICsgMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzcXVhcmUud2FsbHMuV2VzdCkgbW92ZXMucHVzaChbcm93SWR4ICsgMSwgY29sSWR4IC0gMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgoY29sSWR4IC0gMSA+PSAwKSAmJiAoIWN1cnJlbnRTcXVhcmUud2FsbHMuV2VzdCkpIHtcclxuICAgICAgICAgICAgc3F1YXJlID0gdGhpcy5ncmlkW3Jvd0lkeF1bY29sSWR4IC0gMV07XHJcbiAgICAgICAgICAgIGlmIChzcXVhcmUucGxheWVyID09PSBcImVtcHR5XCIpIHtcclxuICAgICAgICAgICAgICAgIG1vdmVzLnB1c2goW3Jvd0lkeCwgY29sSWR4IC0gMV0pOyAgLy8gd2VzdFxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFtcInBsYXllcjFcIiwgXCJwbGF5ZXIyXCJdLmluY2x1ZGVzKHNxdWFyZS5wbGF5ZXIpKXtcclxuICAgICAgICAgICAgICAgIGlmICgoY29sSWR4IC0gMiA+PSAwKSAmJiAoIXNxdWFyZS53YWxscy5XZXN0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVzLnB1c2goW3Jvd0lkeCwgY29sSWR4IC0gMl0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcFNxdWFyZSA9IGNvbElkeCAtIDIgPj0gMCA/IHRoaXMuZ3JpZFtyb3dJZHhdW2NvbElkeCAtIDJdIDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzcXVhcmUud2FsbHMuV2VzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNxdWFyZS53YWxscy5Ob3J0aCkgbW92ZXMucHVzaChbcm93SWR4IC0gMSwgY29sSWR4IC0gMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNxdWFyZS53YWxscy5Tb3V0aCkgbW92ZXMucHVzaChbcm93SWR4ICsgMSwgY29sSWR4IC0gMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGVtcFNxdWFyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzcXVhcmUud2FsbHMuTm9ydGgpIG1vdmVzLnB1c2goW3Jvd0lkeCAtIDEsIGNvbElkeCAtIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3F1YXJlLndhbGxzLlNvdXRoKSBtb3Zlcy5wdXNoKFtyb3dJZHggKyAxLCBjb2xJZHggLSAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLyogXHJcbiAgICAgICAgY2hlY2tOZWlnaGJvcnMgcmV0dXJucyBhbiBhcnJheSBvZiBcclxuICAgICAgICBbbm9ydGgsIGVhc3QsIHNvdXRoLCB3ZXN0XSBwb3NpdGlvbnNcclxuICAgICAgICBzaG91bGQgbm93IGNoZWNrIHRvIHNlZSBpZiBhbnkgb2YgdGhvc2UgcG9zaXRpb25zIGNvbGxpZGUgXHJcbiAgICAgICAgd2l0aCBhIHdhbGwgb3IgcGxheWVyIGFuZCBhZGp1c3QgbW92ZXNcclxuICAgICAgICAgKi9cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vdmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHNxdWFyZSA9IHRoaXMuZ3JpZFttb3Zlc1tpXVswXV1bbW92ZXNbaV1bMV1dO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1vdmVzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzZXRQbGF5ZXJQb3MocGxheWVyLCBwb3MpIHtcclxuICAgICAgICBpZiAocGxheWVyID09PSBcInBsYXllcjFcIikge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllcjEgPSBwb3M7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwbGF5ZXIgPT09IFwicGxheWVyMlwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyMiA9IHBvcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5ib2FyZC5zZXRQbGF5ZXJzKHRydWUsIHRoaXMucGxheWVyMSwgZmFsc2UsIHRoaXMucGxheWVyMik7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGxheWVyID0gXCJwbGF5ZXIxXCI7XHJcbiAgICB9XHJcblxyXG4gICAgc3dhcFR1cm4oKSB7XHJcbiAgICAgICAgaWYoIHRoaXMuY3VycmVudFBsYXllciA9PT0gXCJwbGF5ZXIxXCIgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBsYXllciA9IFwicGxheWVyMlwiO1xyXG4gICAgICAgIH0gZWxzZSBpZiggdGhpcy5jdXJyZW50UGxheWVyID09PSBcInBsYXllcjJcIiApIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGxheWVyID0gXCJwbGF5ZXIxXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZpbmRQYXRoKCkge1xyXG4gICAgICAgIC8qIFxyXG4gICAgICAgIHJ1biB0aGUgYmZzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcmV0dXJuICEhdGhpcy5ib2FyZC5iZnModGhpcy5wbGF5ZXIxKTtcclxuICAgIH1cclxuXHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3F1YXJlIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbElkeCwgcm93SWR4KSB7XHJcbiAgICAgICAgdGhpcy53YWxscyA9IHtcclxuICAgICAgICAgICAgTm9ydGg6IGZhbHNlLFxyXG4gICAgICAgICAgICBFYXN0OiBmYWxzZSxcclxuICAgICAgICAgICAgU291dGg6IGZhbHNlLFxyXG4gICAgICAgICAgICBXZXN0OiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbElkeCA9IGNvbElkeDtcclxuICAgICAgICB0aGlzLnJvd0lkeCA9IHJvd0lkeDsgXHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBcImVtcHR5XCI7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IFwibm9vbmVcIlxyXG4gICAgfVxyXG5cclxuICAgIC8vIGdldE5vcnRoKCkge1xyXG4gICAgLy8gICAgIHJldHVybiB0aGlzLndhbGxzLk5vcnRoO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gZ2V0RWFzdCgpIHtcclxuICAgIC8vICAgICByZXR1cm4gdGhpcy53YWxscy5FYXN0O1xyXG4gICAgLy8gfVxyXG4gICAgLy8gZ2V0U291dGgoKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMud2FsbHMuU291dGg7XHJcbiAgICAvLyB9XHJcbiAgICAvLyBnZXRXZXN0KCkge1xyXG4gICAgLy8gICAgIHJldHVybiB0aGlzLndhbGxzLldlc3Q7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc2V0Tm9ydGgoYm9vbCkge1xyXG4gICAgLy8gICAgIGJvb2wgPyB0aGlzLndhbGxzLk5vcnRoID0gYm9vbCA6IHRoaXMud2FsbHMuTm9ydGggPSAhYm9vbDtcclxuICAgIC8vIH1cclxuICAgIC8vIHNldEVhc3QoYm9vbCkge1xyXG4gICAgLy8gICAgIGJvb2wgPyB0aGlzLndhbGxzLkVhc3QgPSBib29sIDogdGhpcy53YWxscy5FYXN0ID0gIWJvb2w7XHJcbiAgICAvLyB9XHJcbiAgICAvLyBzZXRTb3V0aChib29sKSB7XHJcbiAgICAvLyAgICAgYm9vbCA/IHRoaXMud2FsbHMuU291dGggPSBib29sIDogdGhpcy53YWxscy5Tb3V0aCA9ICFib29sO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gc2V0V2VzdChib29sKSB7XHJcbiAgICAvLyAgICAgYm9vbCA/IHRoaXMud2FsbHMuV2VzdCA9IGJvb2wgOiB0aGlzLndhbGxzLldlc3QgPSAhYm9vbDtcclxuICAgIC8vIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvZ2FtZS5qc1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=