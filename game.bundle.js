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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9xdW9yaWRvci8uL3NyYy9ib2FyZC5qcyIsIndlYnBhY2s6Ly9xdW9yaWRvci8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL3F1b3JpZG9yLy4vc3JjL21vdmVFcnJvci5qcyIsIndlYnBhY2s6Ly9xdW9yaWRvci8uL3NyYy9zcXVhcmUuanMiLCJ3ZWJwYWNrOi8vcXVvcmlkb3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcXVvcmlkb3Ivd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGtCQUFrQixtQkFBTyxDQUFDLHVDQUFhO0FBQ3ZDLGVBQWUsbUJBQU8sQ0FBQyxpQ0FBVTs7QUFFakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRGQUE0RjtBQUM1Riw0RkFBNEY7QUFDNUYsNEZBQTRGO0FBQzVGLDRGQUE0RjtBQUM1RjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0EsZ0M7QUFDQSxtQkFBbUI7QUFDbkIsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0EsK0NBQStDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQSw0QkFBNEIsaUJBQWlCO0FBQzdDO0FBQ0EsZ0NBQWdDLGdCQUFnQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLFVBQVUsS0FBSyxFQUFFLEVBQ2pCO0FBQ1Q7QUFDQTtBQUNBOztBQUVBOztBQUVBLHVCOzs7Ozs7Ozs7O0FDcExBLGtCQUFrQixtQkFBTyxDQUFDLHVDQUFhO0FBQ3ZDLGNBQWMsbUJBQU8sQ0FBQywrQkFBUzs7QUFFL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsc0JBQXNCO0FBQ3BEO0FBQ0EsMkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLGtCQUFrQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFzQix5QkFBeUI7QUFDL0MsMENBQTBDLE1BQU07QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pELGFBQWE7QUFDYjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQsYUFBYTtBQUNiO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRCxhQUFhO0FBQ2I7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pELGFBQWE7QUFDYjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxzQjs7Ozs7Ozs7OztBQzNlQSxrQ0FBa0MsZ0JBQWdCOztBQUVsRDtBQUNBO0FBQ0E7O0FBRUEsMkI7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0I7Ozs7OztVQ3pDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7O1VDckJBO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImdhbWUuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgTW92ZUVycm9yID0gcmVxdWlyZShcIi4vbW92ZUVycm9yXCIpO1xyXG5jb25zdCBTcXVhcmUgPSByZXF1aXJlKFwiLi9zcXVhcmVcIik7XHJcblxyXG5jbGFzcyBCb2FyZCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLndpZHRoID0gOTtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IDk7XHJcbiAgICAgICAgdGhpcy5ncmlkID0gQm9hcmQubWFrZUdyaWQodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgICAgIHRoaXMud2lubmVyID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGxheWVycyhwbGF5ZXIxLCBwMVBvcywgcGxheWVyMiwgcDJQb3MpIHtcclxuICAgICAgICAvKiBwMVBvcyAmIHAyUG9zID0gW3JvdywgY29sXSAqL1xyXG4gICAgICAgIGxldCBncmlkU3F1YXJlMiA9IHRoaXMuZ3JpZFtwMlBvc1swXV1bcDJQb3NbMV1dO1xyXG4gICAgICAgIGxldCBncmlkU3F1YXJlMSA9IHRoaXMuZ3JpZFtwMVBvc1swXV1bcDFQb3NbMV1dO1xyXG4gICAgICAgIGlmKCEhcGxheWVyMikge1xyXG4gICAgICAgICAgICBncmlkU3F1YXJlMi5tb2RlbCA9IFwicGVyc29uXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ3JpZFNxdWFyZTIubW9kZWwgPSBcImFpXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCEhcGxheWVyMSkge1xyXG4gICAgICAgICAgICBncmlkU3F1YXJlMS5tb2RlbCA9IFwicGVyc29uXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ3JpZFNxdWFyZTEubW9kZWwgPSBcImFpXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdyaWRTcXVhcmUyLnBsYXllciA9IFwicGxheWVyMlwiO1xyXG4gICAgICAgIGdyaWRTcXVhcmUxLnBsYXllciA9IFwicGxheWVyMVwiO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrTmVpZ2hib3JzKHNxdWFyZSkge1xyXG4gICAgICAgIC8qIFxyXG4gICAgICAgIHJlcXVpcmVzIFtbbnVtXVtudW1dXSBcclxuICAgICAgICBzcXVhcmUgPSBbcm93SWR4LCBjb2xJZHhdXHJcbiAgICAgICAgKi9cclxuICAgICAgICBsZXQgbmVpZ2hib3JzID0gW107XHJcbiAgICAgICAgbGV0IGNvbElkeCA9IHNxdWFyZVsxXTtcclxuICAgICAgICBsZXQgcm93SWR4ICA9IHNxdWFyZVswXTtcclxuICAgICAgICAocm93SWR4IC0gMSA+PSAwKSA/IG5laWdoYm9ycy5wdXNoKFtyb3dJZHggLSAxLCBjb2xJZHhdKSA6IG5laWdoYm9ycy5wdXNoKFstMSwgLTFdKTsgIC8vIG5vcnRoXHJcbiAgICAgICAgKHJvd0lkeCArIDEgPD0gOCkgPyBuZWlnaGJvcnMucHVzaChbcm93SWR4ICsgMSwgY29sSWR4XSkgOiBuZWlnaGJvcnMucHVzaChbLTEsIC0xXSk7ICAvLyBzb3V0aFxyXG4gICAgICAgIChjb2xJZHggLSAxID49IDApID8gbmVpZ2hib3JzLnB1c2goW3Jvd0lkeCwgY29sSWR4IC0gMV0pIDogbmVpZ2hib3JzLnB1c2goWy0xLCAtMV0pOyAgLy8gd2VzdFxyXG4gICAgICAgIChjb2xJZHggKyAxIDw9IDgpID8gbmVpZ2hib3JzLnB1c2goW3Jvd0lkeCwgY29sSWR4ICsgMV0pIDogbmVpZ2hib3JzLnB1c2goWy0xLCAtMV0pOyAgLy8gZWFzdFxyXG4gICAgICAgIHJldHVybiBuZWlnaGJvcnM7XHJcbiAgICB9XHJcblxyXG4gICAgaXNXYWxsZWQoZGlyLCByb3dJZHgsIGNvbElkeCkge1xyXG4gICAgICAgIC8qIFxyXG4gICAgICAgICByZXR1cm5zIHRydWUgaWYgcGF0aCBpcyBibG9ja2VkIGJ5IHdhbGxcclxuICAgICAgICAgcmV0dXJucyBmYWxzZSBpZiBwYXRoIGlzIGZyZWVcclxuICAgICAgICAqL1xyXG4gICAgICAgXHJcbiAgICAgICAgbGV0IHNxdWFyZSA9IHRoaXMuZ3JpZFtyb3dJZHhdW2NvbElkeF07XHJcbiAgICAgICAgaWYoZGlyID09PSBcInVwXCIpIHtcclxuICAgICAgICAgICAgaWYoc3F1YXJlLndhbGxzLk5vcnRoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZGlyID09PSBcInJpZ2h0XCIpIHtcclxuICAgICAgICAgICAgaWYoc3F1YXJlLndhbGxzLkVhc3QpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChkaXIgPT09IFwiZG93blwiKSB7XHJcbiAgICAgICAgICAgIGlmKHNxdWFyZS53YWxscy5Tb3V0aCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGRpciA9PT0gXCJsZWZ0XCIpIHtcclxuICAgICAgICAgICAgaWYoc3F1YXJlLndhbGxzLldlc3QpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgYmZzKHJvb3QsIGdvYWwgPSBbXCIwMFwiLFwiMDFcIixcIjAyXCIsXCIwM1wiLFwiMDRcIixcIjA1XCIsXCIwNlwiLFwiMDdcIixcIjA4XCJdKSB7XHJcbiAgICAgICAgLyogXHJcbiAgICAgICAgcm9vdCA9PT0gW3Jvd0lkeCwgY29sSWR4XVxyXG5cclxuICAgICAgICB0aGlzIGZ1bmN0aW9uIGlzIHNvIGNydXN0eSBcclxuICAgICAgICAqL1xyXG5cclxuXHJcbiAgICAgICAgbGV0IGhhc2htYXAgPSBuZXcgTWFwKCk7IFxyXG4gICAgICAgIGxldCBRID0gW107IC8vYXJyYXkgb2YgW3JvdywgY29sXVxyXG4gICAgICAgIGxldCBkaXNjb3ZlcmVkID0gW107IC8vYXJyYXkgb2YgaWRcclxuICAgICAgICBoYXNobWFwLnNldChyb290LCBudWxsKVxyXG4gICAgICAgIFEucHVzaChyb290KTtcclxuICAgICAgICBkaXNjb3ZlcmVkLnB1c2gocm9vdC5qb2luKFwiXCIpKTtcclxuICAgICAgICB3aGlsZSAoUS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCB2ID0gUS5zaGlmdCgpOyAvLyBwb3NcclxuICAgICAgICAgICAgbGV0IGlkID0gdi5qb2luKFwiXCIpO1xyXG4gICAgICAgICAgICBsZXQgc3F1YXJlID0gdGhpcy5ncmlkW3ZbMF1dW3ZbMV1dOyAvL3NxdWFyZVxyXG4gICAgICAgICAgICBpZiAoZ29hbC5pbmNsdWRlcyhpZCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwYXRoID0gW107XHJcbiAgICAgICAgICAgICAgICBwYXRoID0gdGhpcy50cmF2ZXJzZUhhc2htYXAoaGFzaG1hcCwgdi5qb2luKFwiXCIpKTtcclxuICAgICAgICAgICAgICAgIHBhdGgucHVzaCh2LmpvaW4oXCJcIikpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFt2LmpvaW4oXCJcIiksIHBhdGhdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGZpbmRpbmcgYWxsIHBvc3NpYmxlIGRpcmVjdGlvbnNcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICgoIXNxdWFyZS53YWxscy5Ob3J0aCAmJiAocGFyc2VJbnQodlswXSkgPiAwKSkpe1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1YgPSB2LmpvaW4oXCJcIikuc3BsaXQoXCJcIik7XHJcbiAgICAgICAgICAgICAgICBuZXdWWzBdID0gcGFyc2VJbnQobmV3VlswXSkgLSAxO1xyXG4gICAgICAgICAgICAgICAgaWQgPSBuZXdWLmpvaW4oXCJcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRpc2NvdmVyZWQuaW5jbHVkZXMoaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzY292ZXJlZC5wdXNoKGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBRLnB1c2gobmV3Vik7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzaG1hcC5zZXQobmV3Vi5qb2luKFwiXCIpLCB2LmpvaW4oXCJcIikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgoIXNxdWFyZS53YWxscy5Tb3V0aCAmJiAocGFyc2VJbnQodlswXSkgPCA4KSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdWID0gdi5qb2luKFwiXCIpLnNwbGl0KFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgbmV3VlswXSA9IHBhcnNlSW50KG5ld1ZbMF0pICsgMTtcclxuICAgICAgICAgICAgICAgIGlkID0gbmV3Vi5qb2luKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkaXNjb3ZlcmVkLmluY2x1ZGVzKGlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2NvdmVyZWQucHVzaChpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgUS5wdXNoKG5ld1YpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc2htYXAuc2V0KG5ld1Yuam9pbihcIlwiKSwgdi5qb2luKFwiXCIpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoKCFzcXVhcmUud2FsbHMuRWFzdCAmJiAocGFyc2VJbnQodlsxXSkgPCA4KSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdWID0gdi5qb2luKFwiXCIpLnNwbGl0KFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgbmV3VlsxXSA9IHBhcnNlSW50KG5ld1ZbMV0pICsgMTtcclxuICAgICAgICAgICAgICAgIGlkID0gbmV3Vi5qb2luKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkaXNjb3ZlcmVkLmluY2x1ZGVzKGlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2NvdmVyZWQucHVzaChpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgUS5wdXNoKG5ld1YpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc2htYXAuc2V0KG5ld1Yuam9pbihcIlwiKSwgdi5qb2luKFwiXCIpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoKCFzcXVhcmUud2FsbHMuV2VzdCAmJiAocGFyc2VJbnQodlsxXSkgPiAwKSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdWID0gdi5qb2luKFwiXCIpLnNwbGl0KFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgbmV3VlsxXSA9IHBhcnNlSW50KG5ld1ZbMV0pIC0gMTtcclxuICAgICAgICAgICAgICAgIGlkID0gbmV3Vi5qb2luKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkaXNjb3ZlcmVkLmluY2x1ZGVzKGlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2NvdmVyZWQucHVzaChpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgUS5wdXNoKG5ld1YpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc2htYXAuc2V0KG5ld1Yuam9pbihcIlwiKSwgdi5qb2luKFwiXCIpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdHJhdmVyc2VIYXNobWFwKGhhc2gsIHN0YXJ0KSB7XHJcbiAgICAgICAgbGV0IG5vZGUgPSBoYXNoLmdldChzdGFydCk7XHJcbiAgICAgICAgbGV0IHBhdGggPSBbXTtcclxuICAgICAgICB3aGlsZSAobm9kZSkge1xyXG4gICAgICAgICAgICBwYXRoLnB1c2gobm9kZSlcclxuICAgICAgICAgICAgbm9kZSA9IGhhc2guZ2V0KG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGF0aC5yZXZlcnNlKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHN0YXRpYyBtYWtlR3JpZCh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgY29uc3QgZ3JpZCA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCByb3dJZHggPSAwOyByb3dJZHggPCBoZWlnaHQ7IHJvd0lkeCsrKSB7XHJcbiAgICAgICAgICAgIGdyaWQucHVzaChbXSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGNvbElkeCA9IDA7IGNvbElkeCA8IHdpZHRoOyBjb2xJZHgrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNxdWFyZSA9IG5ldyBTcXVhcmUoY29sSWR4ICwgcm93SWR4KVxyXG4gICAgICAgICAgICAgICAgZ3JpZFtyb3dJZHhdLnB1c2goc3F1YXJlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZ3JpZDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaXNWYWxpZFBvcyhjb2xJZHgsIHJvd0lkeCkge1xyXG4gICAgICAgIC8vIHZhbGlkYXRpb24gdG8gY2hlY2sgdGhlIGVuZHMgb2YgdGhlIGJvYXJkXHJcbiAgICAgICAgaWYgKChjb2xJZHggPCAwIHx8IHJvd0lkeCA8IDApIHx8IChjb2xJZHggPiA4IHx8IHJvd0lkeCA+IDgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGZhbHNlKSB7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCb2FyZDsiLCJjb25zdCBNb3ZlRXJyb3IgPSByZXF1aXJlKFwiLi9tb3ZlRXJyb3JcIik7XHJcbmNvbnN0IEJvYXJkID0gcmVxdWlyZShcIi4vYm9hcmRcIik7XHJcblxyXG5jbGFzcyBHYW1lIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuYm9hcmQgPSBuZXcgQm9hcmQoKTtcclxuICAgICAgICB0aGlzLmdyaWQgPSB0aGlzLmJvYXJkLmdyaWQ7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGxheWVyID0gXCJub29uZVwiO1xyXG4gICAgICAgIC8qIHRoaXMucGxheWVyID0gW3Jvd0lkeCwgY29sSWR4XSAqL1xyXG4gICAgICAgIHRoaXMucGxheWVyMSA9IFs4LCA0XTtcclxuICAgICAgICB0aGlzLnBsYXllcjIgPSBbMCwgNF07XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIxV2FsbHMgPSAxMDtcclxuICAgICAgICB0aGlzLnBsYXllcjJXYWxscyA9IDEwO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBcIm5vdCBkb2luZyBhbnl0aGluZ1wiO1xyXG5cclxuICAgICAgICB0aGlzLm1vdmVQbGF5ZXIgPSB0aGlzLm1vdmVQbGF5ZXIuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBpc092ZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMud2lubmVyKCkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlckFpVHVybigpIHtcclxuICAgICAgICBpZih0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyMlwiKSB7XHJcbiAgICAgICAgICAgIGxldCBwMlBhdGggPSB0aGlzLmJvYXJkLmJmcyh0aGlzLnBsYXllcjIsIFtcIjgwXCIsXCI4MVwiLFwiODJcIixcIjgzXCIsXCI4NFwiLFwiODVcIixcIjg2XCIsXCI4N1wiLFwiODhcIl0pXHJcbiAgICAgICAgICAgIGxldCBwMVBhdGggPSB0aGlzLmJvYXJkLmJmcyh0aGlzLnBsYXllcjEpO1xyXG4gICAgICAgICAgICBsZXQgcmFuZG9tID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJhbmRvbSk7XHJcbiAgICAgICAgICAgIGlmICgocDFQYXRoWzFdLmxlbmd0aCA8PSBwMlBhdGhbMV0ubGVuZ3RoKSAmJiAodGhpcy5wbGF5ZXIyV2FsbHMgPiAwKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwbGFjaW5nIHdhbGxcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInBhdGggPT4gXCIsIHAxUGF0aCk7XHJcbiAgICAgICAgICAgICAgICAvKiBwbGFjZSB3YWxsIGlmIHBsYXllcjEgaXMgY2xvc2VyIHRvIGdvYWwgKi9cclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwMVBhdGhbMV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93SWR4ID0gcDFQYXRoWzFdW2ldLnNwbGl0KFwiXCIpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xJZHggPSBwMVBhdGhbMV1baV0uc3BsaXQoXCJcIilbMV07ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5leHRSb3dJZHggPSBwMVBhdGhbMV1baSArIDFdLnNwbGl0KFwiXCIpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXh0Q29sSWR4ID0gcDFQYXRoWzFdW2kgKyAxXS5zcGxpdChcIlwiKVsxXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGxhY2VkV2FsbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcXVhcmVBID0gW3BhcnNlSW50KG5leHRSb3dJZHgpLCBwYXJzZUludChuZXh0Q29sSWR4KV07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNxdWFyZU5laWdoYm9ycyA9IHRoaXMuYm9hcmQuY2hlY2tOZWlnaGJvcnMoc3F1YXJlQSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJuZWlnaGJvcnMgPT4gXCIsIHNxdWFyZU5laWdoYm9ycyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNxdWFyZUI7XHJcbiAgICAgICAgICAgICAgICAgICAgLyogXHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdCBhbmQgdXAgXHJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VXYWxsKGRpciwgZXZlbnQsIHNxdWFyZUEsIHNxdWFyZUIpXHJcbiAgICAgICAgICAgICAgICAgICAgZGlyID0gTm9ydGgsIFNvdXRoLCBFYXN0LCBXZXN0XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQgPSBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgc3F1YXJlQSA9IFtyb3dJZHgsIGNvbElkeF1cclxuICAgICAgICAgICAgICAgICAgICBzcXVhcmVCID0gW3Jvd0lkeCwgY29sSWR4XVxyXG4gICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyb3cgPT4gXCIsIHJvd0lkeCwgbmV4dFJvd0lkeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb2wgPT4gXCIsIGNvbElkeCwgbmV4dENvbElkeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY29sSWR4ID09PSBuZXh0Q29sSWR4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGggaXMgbW92aW5nIHVwIG9yIGRvd25cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2sgbmVpZ2hib3JzIGFuZCBzZXQgc3F1YXJlQiB0byBhIHZhbGlkIG9uZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZWlnaGJvcnMgPSBbbm9ydGgsIHNvdXRoLCB3ZXN0LCBlYXN0XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2UgcmFuZG9tIGlmIHlvdSB3YW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNxdWFyZUEgPSBuZXh0IGJlc3QgcG9zIG9mIHBsYXllcjEgKG9wcG9uZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmVCID0gc3F1YXJlIHRvIHRoZSB3ZXN0IG9mIHNxdWFyZUFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJhbmRvbSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNxdWFyZU5laWdoYm9yc1syXVswXSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmVCID0gc3F1YXJlTmVpZ2hib3JzWzJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmVCID0gc3F1YXJlTmVpZ2hib3JzWzNdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNxdWFyZU5laWdoYm9yc1szXVswXSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmVCID0gc3F1YXJlTmVpZ2hib3JzWzNdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmVCID0gc3F1YXJlTmVpZ2hib3JzWzJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3F1YXJlcyA9PiBcIiwgc3F1YXJlQSwgc3F1YXJlQik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlZFdhbGwgPSB0aGlzLnBsYWNlV2FsbChcIlNvdXRoXCIsIG51bGwsIHNxdWFyZUEsIHNxdWFyZUIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYWNlZHdhbGwgPT4gXCIsIHBsYWNlZFdhbGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGxhY2VkV2FsbCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJicmVha2luZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcGxhY2VkV2FsbCA9IHRoaXMucGxhY2VXYWxsKFwiTm9ydGhcIiwgbnVsbCwgc3F1YXJlQSwgc3F1YXJlQik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInBsYWNlZHdhbGwgPT4gXCIsIHBsYWNlZFdhbGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHBsYWNlZFdhbGwgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcImJyZWFraW5nXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcImhvdyBkaWQgaSBlbmQgdXAgaGVyZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93SWR4ID09PSBuZXh0Um93SWR4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyYW5kb20gPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcXVhcmVOZWlnaGJvcnNbMF1bMF0gIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlQiA9IHNxdWFyZU5laWdoYm9yc1swXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlQiA9IHNxdWFyZU5laWdoYm9yc1sxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcXVhcmVOZWlnaGJvcnNbMV1bMF0gIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlQiA9IHNxdWFyZU5laWdoYm9yc1sxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlQiA9IHNxdWFyZU5laWdoYm9yc1swXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbElkeCA+IG5leHRDb2xJZHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNxdWFyZUEsIHNxdWFyZUIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VkV2FsbCA9IHRoaXMucGxhY2VXYWxsKFwiRWFzdFwiLCBudWxsLCBzcXVhcmVBLCBzcXVhcmVCKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxhY2Vkd2FsbCA9PiBcIiwgcGxhY2VkV2FsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGxhY2VkV2FsbCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYnJlYWtpbmdcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNxdWFyZUEsIHNxdWFyZUIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VkV2FsbCA9IHRoaXMucGxhY2VXYWxsKFwiV2VzdFwiLCBudWxsLCBzcXVhcmVBLCBzcXVhcmVCKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxhY2Vkd2FsbCA9PiBcIiwgcGxhY2VkV2FsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGxhY2VkV2FsbCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYnJlYWtpbmdcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvKiBtb3ZlIHBsYXllcjIgdG93YXJkcyBnb2FsICovXHJcbiAgICAgICAgICAgICAgICBsZXQgY3VyclJvdyA9IHAyUGF0aFsxXVswXS5zcGxpdChcIlwiKVswXTtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJyQ29sID0gcDJQYXRoWzFdWzBdLnNwbGl0KFwiXCIpWzFdO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJvd0lkeCA9IHAyUGF0aFsxXVsxXS5zcGxpdChcIlwiKVswXTtcclxuICAgICAgICAgICAgICAgIGxldCBjb2xJZHggPSBwMlBhdGhbMV1bMV0uc3BsaXQoXCJcIilbMV07XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV4dE1vdmUgPSBbcm93SWR4LCBjb2xJZHhdO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1vdmVzID0gdGhpcy5nZXRBdmFpbGFibGVNb3ZlcyhbcGFyc2VJbnQoY3VyclJvdyksIHBhcnNlSW50KGN1cnJDb2wpXSk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vdmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBtb3Zlc1tpXS5qb2luKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwMlBhdGhbMV0uaW5jbHVkZXMobW92ZSkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVQbGF5ZXIobW92ZXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVORCBPRiBBSSBUVVJOXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHdpbm5lcigpIHtcclxuICAgICAgICBsZXQgd2lubmVyID0gbnVsbDtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5ncmlkWzBdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2kgKyAxfTFgKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImdyZWVuXCI7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ3JpZFswXVtpXS5wbGF5ZXIgPT09IFwicGxheWVyMVwiKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5uZXIgPSBcInBsYXllcjFcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ3JpZFs4XVtpXS5wbGF5ZXIgPT09IFwicGxheWVyMlwiKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5uZXIgPSBcInBsYXllcjJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB3aW5uZXI7XHJcbiAgICB9XHJcblxyXG4gICAgdGFrZVR1cm4oYWN0aW9uLCBkaXIgPSBudWxsLCBldmVudCwgc3F1YXJlQSA9IG51bGwsIHNxdWFyZUIgPSBudWxsKSB7XHJcbiAgICAgICAgLy8gbW92ZW1lbnQgb3Igd2FsbCBwbGFjZW1lbnQ/XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24gPT09IFwibW92ZVwiKSB7XHJcbiAgICAgICAgICAgIGlmKChkaXIgPT09IFwidXBcIikgfHwgKGRpciA9PT0gXCJyaWdodFwiKSB8fCAoZGlyID09PSBcImRvd25cIikgfHwgKGRpciA9PT0gXCJsZWZ0XCIpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVQbGF5ZXIoZGlyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihkaXIgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZVBsYXllcihldmVudC50YXJnZXQuaWQuc3BsaXQoXCJcIikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uID09PSBcInBsYWNlV2FsbFwiKSB7XHJcbiAgICAgICAgICAgIC8vIGNhbGxzIHRoaXMucGxhY2VXYWxsKClcclxuICAgICAgICAgICAgdGhpcy5wbGFjZVdhbGwoZGlyLCBldmVudCwgc3F1YXJlQSwgc3F1YXJlQik7XHJcbiAgICAgICAgICAgIC8vICAgIHRoZSBwcmV2aW91cyBzb2x1dGlvbiB0byBwbGFjaW5nIHdhbGxzIHNlZW1zIGJsb2F0ZWQgYnV0IG9uY2UgaXRzIGltcGxlbWVudGVkIGl0cyBmbHVpZC4uLlxyXG4gICAgICAgICAgICAvLyAgICBJIGFtIHRoaW5raW5nIG9mIGhhdmluZyB0aGUgcGxhY2Ugd2FsbCBidXR0b24gbW9ycGggaW50byBhIG5vcnRoIGVhc3Qgc291dGggd2VzdCBidXR0b24uLi5cclxuICAgICAgICAgICAgLy8gICAgICAgbWlnaHQgYmUgYmV0dGVyIGlmIGNsaWVudCBzZWxlY3RzIHRoZSBjZWxscyB0aGV5IHdpc2ggdG8gcGxhY2UgYSB3YWxsIGJlZm9yZSBidXR0b24gbW9ycGhzXHJcbiAgICAgICAgICAgIC8vICAgICAgIHRoYXQgd2F5IG9ubHkgbm9ydGggc291dGggb3IgZWFzdCB3ZXN0IGJ1dHRvbnMgd2lsbCBzcGF3blxyXG4gICAgICAgICAgICAvLyAgICBzZWxlY3RpbmcgY2VsbHMgd2lsbCBiZSBmbHVpZCB3aXRoIG1vdXNlIGNsaWNrIG9yIGxlc3MgZmx1aWQgd2l0aCBrZXkgcHJlc3NpbmcgY29vcmRpbmF0ZXNcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHBsYWNlV2FsbChkaXIsIGV2ZW50LCBzcXVhcmVBLCBzcXVhcmVCKSB7XHJcbiAgICAgICAgLypcclxuICAgICAgICBzcXVhcmVBICYgc3F1YXJlQiA9IFtyb3dJZHgsIGNvbElkeF1cclxuICAgICAgICBnZXQgU3F1YXJlIGFuZCBzZXQgdGhlIHNwZWNpZmljIHdhbGxzIHRvIHRydWUgXHJcbiAgICAgICAgZ2V0IG5laWdoYm9ycyBhbmQgc3NldCBzcGVjaWZpYyB3YWxscyB0byB0cnVlLi4uIG9wcG9zaXRlIHdhbGxcclxuICAgICAgICBzcXVhcmVQb3MgPSB0aGlzLmdyaWRbcm93SWR4LCBjb2xJZHhdXHJcbiAgICAgICAgKi9cclxuXHJcblxyXG4gICAgICAgIGlmKHNxdWFyZUFbMF0gPiA4IHx8IHNxdWFyZUFbMF0gPCAwIHx8IHNxdWFyZUJbMF0gPiA4IHx8IHNxdWFyZUJbMF0gPCAwXHJcbiAgICAgICAgICAgIHx8IHNxdWFyZUFbMV0gPiA4IHx8IHNxdWFyZUFbMV0gPCAwIHx8IHNxdWFyZUJbMV0gPiA4IHx8IHNxdWFyZUJbMV0gPCAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzcXJBID0gdGhpcy5ncmlkW3NxdWFyZUFbMF1dW3NxdWFyZUFbMV1dO1xyXG4gICAgICAgIGxldCBzcXJCID0gdGhpcy5ncmlkW3NxdWFyZUJbMF1dW3NxdWFyZUJbMV1dO1xyXG4gICAgICAgIGxldCBuZWlnaGJvcnNBID0gdGhpcy5ib2FyZC5jaGVja05laWdoYm9ycyhbc3FyQS5yb3dJZHgsIHNxckEuY29sSWR4XSk7XHJcbiAgICAgICAgbGV0IG5laWdoYm9yc0IgPSB0aGlzLmJvYXJkLmNoZWNrTmVpZ2hib3JzKFtzcXJCLnJvd0lkeCwgc3FyQi5jb2xJZHhdKTtcclxuICAgICAgICBsZXQgaXNWYWxpZFdhbGw7XHJcbiAgICAgICAgbGV0IHBsYXllcldhbGxzO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFBsYXllciA9PT0gXCJwbGF5ZXIxXCIgPyBwbGF5ZXJXYWxscyA9IHRoaXMucGxheWVyMVdhbGxzIDogcGxheWVyV2FsbHMgPSB0aGlzLnBsYXllcjJXYWxsc1xyXG4gICAgICAgIGlmIChwbGF5ZXJXYWxscyA+IDApIHtcclxuXHJcbiAgICAgICAgICAgIGlmKGRpciA9PT0gXCJOb3J0aFwiICYmICghc3FyQS53YWxscy5Ob3J0aCAmJiAhc3FyQi53YWxscy5Ob3J0aCkpe1xyXG4gICAgICAgICAgICAgICAgc3FyQS53YWxscy5Ob3J0aCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzcXJCLndhbGxzLk5vcnRoID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8qIHNldHMgdGhlIG5vcnRoIG5laWdoYm9ycyBzb3V0aCB3YWxsIHRvIHRydWUgKi9cclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtuZWlnaGJvcnNBWzBdWzBdXVtuZWlnaGJvcnNBWzBdWzFdXS53YWxscy5Tb3V0aCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRbbmVpZ2hib3JzQlswXVswXV1bbmVpZ2hib3JzQlswXVsxXV0ud2FsbHMuU291dGggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaXNWYWxpZFdhbGwgPSB0aGlzLmZpbmRQYXRoKCk7XHJcbiAgICAgICAgICAgICAgICBpZihpc1ZhbGlkV2FsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyMVwiKSB0aGlzLnBsYXllcjFXYWxscyA9IHRoaXMucGxheWVyMVdhbGxzIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50UGxheWVyID09PSBcInBsYXllcjJcIikgdGhpcy5wbGF5ZXIyV2FsbHMgPSB0aGlzLnBsYXllcjJXYWxscyAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2FwVHVybigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzcXJBLndhbGxzLk5vcnRoID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgc3FyQi53YWxscy5Ob3J0aCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtuZWlnaGJvcnNBWzBdWzBdXVtuZWlnaGJvcnNBWzBdWzFdXS53YWxscy5Tb3V0aCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtuZWlnaGJvcnNCWzBdWzBdXVtuZWlnaGJvcnNCWzBdWzFdXS53YWxscy5Tb3V0aCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGRpciA9PT0gXCJFYXN0XCIgJiYgKCFzcXJBLndhbGxzLkVhc3QgJiYgIXNxckIud2FsbHMuRWFzdCkpe1xyXG4gICAgICAgICAgICAgICAgc3FyQS53YWxscy5FYXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNxckIud2FsbHMuRWFzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvKiBzZXRzIHRoZSBFYXN0IG5laWdoYm9ycyBXZXN0IHdhbGwgdG8gdHJ1ZSAqL1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0FbM11bMF1dW25laWdoYm9yc0FbM11bMV1dLndhbGxzLldlc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0JbM11bMF1dW25laWdoYm9yc0JbM11bMV1dLndhbGxzLldlc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaXNWYWxpZFdhbGwgPSB0aGlzLmZpbmRQYXRoKCk7XHJcbiAgICAgICAgICAgICAgICBpZihpc1ZhbGlkV2FsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyMVwiKSB0aGlzLnBsYXllcjFXYWxscyA9IHRoaXMucGxheWVyMVdhbGxzIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50UGxheWVyID09PSBcInBsYXllcjJcIikgdGhpcy5wbGF5ZXIyV2FsbHMgPSB0aGlzLnBsYXllcjJXYWxscyAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2FwVHVybigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzcXJBLndhbGxzLkVhc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBzcXJCLndhbGxzLkVhc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyaWRbbmVpZ2hib3JzQVszXVswXV1bbmVpZ2hib3JzQVszXVsxXV0ud2FsbHMuV2VzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtuZWlnaGJvcnNCWzNdWzBdXVtuZWlnaGJvcnNCWzNdWzFdXS53YWxscy5XZXN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoZGlyID09PSBcIlNvdXRoXCIgJiYgKCFzcXJBLndhbGxzLlNvdXRoICYmICFzcXJCLndhbGxzLlNvdXRoKSl7XHJcbiAgICAgICAgICAgICAgICBzcXJBLndhbGxzLlNvdXRoID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNxckIud2FsbHMuU291dGggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLyogc2V0cyB0aGUgU291dGggbmVpZ2hib3JzIE5vcnRoIHdhbGwgdG8gdHJ1ZSAqL1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0FbMV1bMF1dW25laWdoYm9yc0FbMV1bMV1dLndhbGxzLk5vcnRoID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtuZWlnaGJvcnNCWzFdWzBdXVtuZWlnaGJvcnNCWzFdWzFdXS53YWxscy5Ob3J0aCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpc1ZhbGlkV2FsbCA9IHRoaXMuZmluZFBhdGgoKTtcclxuICAgICAgICAgICAgICAgIGlmKGlzVmFsaWRXYWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFBsYXllciA9PT0gXCJwbGF5ZXIxXCIpIHRoaXMucGxheWVyMVdhbGxzID0gdGhpcy5wbGF5ZXIxV2FsbHMgLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyMlwiKSB0aGlzLnBsYXllcjJXYWxscyA9IHRoaXMucGxheWVyMldhbGxzIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3YXBUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNxckEud2FsbHMuU291dGggPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBzcXJCLndhbGxzLlNvdXRoID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0FbMV1bMF1dW25laWdoYm9yc0FbMV1bMV1dLndhbGxzLk5vcnRoID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0JbMV1bMF1dW25laWdoYm9yc0JbMV1bMV1dLndhbGxzLk5vcnRoID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoZGlyID09PSBcIldlc3RcIiAmJiAoIXNxckEud2FsbHMuV2VzdCAmJiAhc3FyQi53YWxscy5XZXN0KSl7XHJcbiAgICAgICAgICAgICAgICBzcXJBLndhbGxzLldlc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc3FyQi53YWxscy5XZXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8qIHNldHMgdGhlIFdlc3QgbmVpZ2hib3JzIEVhc3Qgd2FsbCB0byB0cnVlICovXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRbbmVpZ2hib3JzQVsyXVswXV1bbmVpZ2hib3JzQVsyXVsxXV0ud2FsbHMuRWFzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRbbmVpZ2hib3JzQlsyXVswXV1bbmVpZ2hib3JzQlsyXVsxXV0ud2FsbHMuRWFzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpc1ZhbGlkV2FsbCA9IHRoaXMuZmluZFBhdGgoKTtcclxuICAgICAgICAgICAgICAgIGlmKGlzVmFsaWRXYWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFBsYXllciA9PT0gXCJwbGF5ZXIxXCIpIHRoaXMucGxheWVyMVdhbGxzID0gdGhpcy5wbGF5ZXIxV2FsbHMgLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyMlwiKSB0aGlzLnBsYXllcjJXYWxscyA9IHRoaXMucGxheWVyMldhbGxzIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3YXBUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNxckEud2FsbHMuV2VzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNxckIud2FsbHMuV2VzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtuZWlnaGJvcnNBWzJdWzBdXVtuZWlnaGJvcnNBWzJdWzFdXS53YWxscy5FYXN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0JbMl1bMF1dW25laWdoYm9yc0JbMl1bMV1dLndhbGxzLkVhc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZVBsYXllcihkaXIpIHtcclxuICAgICAgICAvLyB0YWtlcyBjdXJyZW50IHBsYXllciBjdXJyZW50IHBvc1xyXG4gICAgICAgIC8vIGNhbGN1bGF0ZXMgZnV0dXJlIHBvcyB3aXRoIGRpclxyXG4gICAgICAgIGxldCBwbGF5ZXI7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGxheWVyID09PSBcInBsYXllcjFcIiA/IHBsYXllciA9IHRoaXMucGxheWVyMSA6IHBsYXllciA9IHRoaXMucGxheWVyMlxyXG4gICAgICAgIGxldCBuZXdDb2xJZHg7XHJcbiAgICAgICAgbGV0IG5ld1Jvd0lkeDtcclxuICAgICAgICBsZXQgaXNXYWxsZWQ7XHJcbiAgICAgICAgbGV0IGlzVmFsaWQ7XHJcbiAgICAgICAgaWYgKGRpciA9PT0gXCJ1cFwiKSB7XHJcbiAgICAgICAgICAgIG5ld0NvbElkeCA9IHBsYXllclsxXTtcclxuICAgICAgICAgICAgbmV3Um93SWR4ID0gcGxheWVyWzBdIC0gMTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRpciA9PT0gXCJyaWdodFwiKSB7XHJcbiAgICAgICAgICAgIG5ld0NvbElkeCA9IHBsYXllclsxXSArIDE7XHJcbiAgICAgICAgICAgIG5ld1Jvd0lkeCA9IHBsYXllclswXTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRpciA9PT0gXCJkb3duXCIpIHtcclxuICAgICAgICAgICAgbmV3Q29sSWR4ID0gcGxheWVyWzFdO1xyXG4gICAgICAgICAgICBuZXdSb3dJZHggPSBwbGF5ZXJbMF0gKyAxO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGlyID09PSBcImxlZnRcIikge1xyXG4gICAgICAgICAgICBuZXdDb2xJZHggPSBwbGF5ZXJbMV0gLSAxO1xyXG4gICAgICAgICAgICBuZXdSb3dJZHggPSBwbGF5ZXJbMF07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmV3Um93SWR4ID0gcGFyc2VJbnQoZGlyWzBdKTtcclxuICAgICAgICAgICAgbmV3Q29sSWR4ID0gcGFyc2VJbnQoZGlyWzFdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgVGhlIGJlbG93IHZhbGlkYXRpb24gbm8gbG9uZ2VyIHdvcmtzIGZvciBjbGlja2luZyBtb3ZlbWVudC4gIFxyXG4gICAgICAgIGNoZWNrIGZvciB3YWxsc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlzV2FsbGVkID0gdGhpcy5ib2FyZC5pc1dhbGxlZChkaXIsIHBsYXllclswXSwgcGxheWVyWzFdKTtcclxuICAgICAgICAvLyBnaXZlcyB0byB0aGlzLmJvYXJkIHRvIHZhbGlkYXRlXHJcbiAgICAgICAgaXNWYWxpZCA9IEJvYXJkLmlzVmFsaWRQb3MobmV3Q29sSWR4LCBuZXdSb3dJZHgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGlmIHZhbGlkIHRoZW4gc2V0cyBwbGF5ZXIgbmV3IHggYW5kIHlcclxuICAgICAgICAvLyAgICBzd2FwcyB0dXJuc1xyXG4gICAgICAgIGlmIChpc1ZhbGlkICYmICFpc1dhbGxlZCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IG9sZFNxdWFyZSA9IHRoaXMuYm9hcmQuZ3JpZFtwbGF5ZXJbMF1dW3BsYXllclsxXV07XHJcbiAgICAgICAgICAgIGxldCBuZXdTcXVhcmUgPSB0aGlzLmJvYXJkLmdyaWRbbmV3Um93SWR4XVtuZXdDb2xJZHhdO1xyXG5cclxuICAgICAgICAgICAgLy92YWxpZGF0aW9uIHRvIGNoZWNrIGZvciBwbGF5ZXIgY29sbGlzaW9uICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChuZXdTcXVhcmUucGxheWVyICE9PSBcImVtcHR5XCIpIHtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9sZFNxdWFyZS5wbGF5ZXIgPSBcImVtcHR5XCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBsYXllclBvcyh0aGlzLmN1cnJlbnRQbGF5ZXIsIFtuZXdSb3dJZHgsIG5ld0NvbElkeF0pO1xyXG4gICAgICAgICAgICAgICAgbmV3U3F1YXJlLnBsYXllciA9IHRoaXMuY3VycmVudFBsYXllcjtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3dhcFR1cm4oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gZWxzZSB0aGVuIGRvZXMgbm90aGluZyBvciBzZW5kcyBlcnJvciBtZXNzYWdlXHJcbiAgICAgICAgICAgIC8vICAgIGRvZXMgbm90IHN3YXAgdHVybnNcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEF2YWlsYWJsZU1vdmVzKHBvcykge1xyXG4gICAgICAgIC8qIHBvcyA9IFtyb3csIGNvbF0gKi9cclxuICAgICAgICBjb25zb2xlLmxvZyhwb3MpO1xyXG4gICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyMVwiID8gdGhpcy5wbGF5ZXIxIDogdGhpcy5wbGF5ZXIyO1xyXG4gICAgICAgIGxldCBvcHBvbmVudCA9IHRoaXMuY3VycmVudFBsYXllciA9PT0gXCJwbGF5ZXIxXCIgPyB0aGlzLnBsYXllcjIgOiB0aGlzLnBsYXllcjE7XHJcbiAgICAgICAgbGV0IG1vdmVzID0gW107XHJcbiAgICAgICAgbGV0IGN1cnJlbnRTcXVhcmUgPSB0aGlzLmdyaWRbcG9zWzBdXVtwb3NbMV1dO1xyXG4gICAgICAgIGxldCBzcXVhcmU7XHJcbiAgICAgICAgbGV0IGNvbElkeCA9IHBvc1sxXTtcclxuICAgICAgICBsZXQgcm93SWR4ICA9IHBvc1swXTtcclxuICAgICAgICAvKiBjaGVjayBmb3IgcGxheWVyICovXHJcbiAgICAgICAgaWYgKChyb3dJZHggLSAxID49IDApICYmICghY3VycmVudFNxdWFyZS53YWxscy5Ob3J0aCkpIHtcclxuICAgICAgICAgICAgc3F1YXJlID0gdGhpcy5ncmlkW3Jvd0lkeCAtIDFdW2NvbElkeF07XHJcbiAgICAgICAgICAgIGlmIChzcXVhcmUucGxheWVyID09PSBcImVtcHR5XCIpIHtcclxuICAgICAgICAgICAgICAgIG1vdmVzLnB1c2goW3Jvd0lkeCAtIDEsIGNvbElkeF0pOyAgLy8gbm9ydGhcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChbXCJwbGF5ZXIxXCIsIFwicGxheWVyMlwiXS5pbmNsdWRlcyhzcXVhcmUucGxheWVyKSl7XHJcbiAgICAgICAgICAgICAgICBpZiAoKHJvd0lkeCAtIDIgPj0gMCkgJiYgKCFzcXVhcmUud2FsbHMuTm9ydGgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZXMucHVzaChbcm93SWR4IC0gMiwgY29sSWR4XSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wU3F1YXJlID0gcm93SWR4IC0gMiA+PSAwID8gdGhpcy5ncmlkW3Jvd0lkeCAtIDJdW2NvbElkeF0gOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNxdWFyZS53YWxscy5Ob3J0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNxdWFyZS53YWxscy5FYXN0KSBtb3Zlcy5wdXNoKFtyb3dJZHggLSAxLCBjb2xJZHggKyAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3F1YXJlLndhbGxzLldlc3QpIG1vdmVzLnB1c2goW3Jvd0lkeCAtIDEsIGNvbElkeCAtIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRlbXBTcXVhcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3F1YXJlLndhbGxzLkVhc3QpIG1vdmVzLnB1c2goW3Jvd0lkeCAtIDEsIGNvbElkeCArIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3F1YXJlLndhbGxzLldlc3QpIG1vdmVzLnB1c2goW3Jvd0lkeCAtIDEsIGNvbElkeCAtIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKGNvbElkeCArIDEgPD0gOCkgJiYgKCFjdXJyZW50U3F1YXJlLndhbGxzLkVhc3QpKSB7XHJcbiAgICAgICAgICAgIHNxdWFyZSA9IHRoaXMuZ3JpZFtyb3dJZHhdW2NvbElkeCArIDFdO1xyXG4gICAgICAgICAgICBpZiAoc3F1YXJlLnBsYXllciA9PT0gXCJlbXB0eVwiKSB7XHJcbiAgICAgICAgICAgICAgICBtb3Zlcy5wdXNoKFtyb3dJZHgsIGNvbElkeCArIDFdKTsgIC8vIGVhc3RcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChbXCJwbGF5ZXIxXCIsIFwicGxheWVyMlwiXS5pbmNsdWRlcyhzcXVhcmUucGxheWVyKSl7XHJcbiAgICAgICAgICAgICAgICBpZiAoKGNvbElkeCArIDIgPD0gOCkgJiYgKCFzcXVhcmUud2FsbHMuRWFzdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3Zlcy5wdXNoKFtyb3dJZHgsIGNvbElkeCArIDJdKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBTcXVhcmUgPSBjb2xJZHggKyAyIDw9IDggPyB0aGlzLmdyaWRbcm93SWR4XVtjb2xJZHggKyAyXSA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3F1YXJlLndhbGxzLkVhc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzcXVhcmUud2FsbHMuTm9ydGgpIG1vdmVzLnB1c2goW3Jvd0lkeCAtIDEsIGNvbElkeCArIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzcXVhcmUud2FsbHMuU291dGgpIG1vdmVzLnB1c2goW3Jvd0lkeCArIDEsIGNvbElkeCArIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRlbXBTcXVhcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3F1YXJlLndhbGxzLk5vcnRoKSBtb3Zlcy5wdXNoKFtyb3dJZHggLSAxLCBjb2xJZHggKyAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNxdWFyZS53YWxscy5Tb3V0aCkgbW92ZXMucHVzaChbcm93SWR4ICsgMSwgY29sSWR4ICsgMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgocm93SWR4ICsgMSA8PSA4KSAmJiAoIWN1cnJlbnRTcXVhcmUud2FsbHMuU291dGgpKSB7XHJcbiAgICAgICAgICAgIHNxdWFyZSA9IHRoaXMuZ3JpZFtyb3dJZHggKyAxXVtjb2xJZHhdO1xyXG4gICAgICAgICAgICBpZiAoc3F1YXJlLnBsYXllciA9PT0gXCJlbXB0eVwiKSB7XHJcbiAgICAgICAgICAgICAgICBtb3Zlcy5wdXNoKFtyb3dJZHggKyAxLCBjb2xJZHhdKTsgIC8vIHNvdXRoXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoW1wicGxheWVyMVwiLCBcInBsYXllcjJcIl0uaW5jbHVkZXMoc3F1YXJlLnBsYXllcikpe1xyXG4gICAgICAgICAgICAgICAgaWYgKChyb3dJZHggKyAyIDw9IDgpICYmICghc3F1YXJlLndhbGxzLlNvdXRoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVzLnB1c2goW3Jvd0lkeCArIDIsIGNvbElkeF0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcFNxdWFyZSA9IHJvd0lkeCArIDIgPD0gOCA/IHRoaXMuZ3JpZFtyb3dJZHggKyAyXVtjb2xJZHhdIDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzcXVhcmUud2FsbHMuU291dGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzcXVhcmUud2FsbHMuRWFzdCkgbW92ZXMucHVzaChbcm93SWR4ICsgMSwgY29sSWR4ICsgMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNxdWFyZS53YWxscy5XZXN0KSBtb3Zlcy5wdXNoKFtyb3dJZHggKyAxLCBjb2xJZHggLSAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0ZW1wU3F1YXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNxdWFyZS53YWxscy5FYXN0KSBtb3Zlcy5wdXNoKFtyb3dJZHggKyAxLCBjb2xJZHggKyAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNxdWFyZS53YWxscy5XZXN0KSBtb3Zlcy5wdXNoKFtyb3dJZHggKyAxLCBjb2xJZHggLSAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKChjb2xJZHggLSAxID49IDApICYmICghY3VycmVudFNxdWFyZS53YWxscy5XZXN0KSkge1xyXG4gICAgICAgICAgICBzcXVhcmUgPSB0aGlzLmdyaWRbcm93SWR4XVtjb2xJZHggLSAxXTtcclxuICAgICAgICAgICAgaWYgKHNxdWFyZS5wbGF5ZXIgPT09IFwiZW1wdHlcIikge1xyXG4gICAgICAgICAgICAgICAgbW92ZXMucHVzaChbcm93SWR4LCBjb2xJZHggLSAxXSk7ICAvLyB3ZXN0XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoW1wicGxheWVyMVwiLCBcInBsYXllcjJcIl0uaW5jbHVkZXMoc3F1YXJlLnBsYXllcikpe1xyXG4gICAgICAgICAgICAgICAgaWYgKChjb2xJZHggLSAyID49IDApICYmICghc3F1YXJlLndhbGxzLldlc3QpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZXMucHVzaChbcm93SWR4LCBjb2xJZHggLSAyXSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wU3F1YXJlID0gY29sSWR4IC0gMiA+PSAwID8gdGhpcy5ncmlkW3Jvd0lkeF1bY29sSWR4IC0gMl0gOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNxdWFyZS53YWxscy5XZXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3F1YXJlLndhbGxzLk5vcnRoKSBtb3Zlcy5wdXNoKFtyb3dJZHggLSAxLCBjb2xJZHggLSAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3F1YXJlLndhbGxzLlNvdXRoKSBtb3Zlcy5wdXNoKFtyb3dJZHggKyAxLCBjb2xJZHggLSAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0ZW1wU3F1YXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNxdWFyZS53YWxscy5Ob3J0aCkgbW92ZXMucHVzaChbcm93SWR4IC0gMSwgY29sSWR4IC0gMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzcXVhcmUud2FsbHMuU291dGgpIG1vdmVzLnB1c2goW3Jvd0lkeCArIDEsIGNvbElkeCAtIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKiBcclxuICAgICAgICBjaGVja05laWdoYm9ycyByZXR1cm5zIGFuIGFycmF5IG9mIFxyXG4gICAgICAgIFtub3J0aCwgZWFzdCwgc291dGgsIHdlc3RdIHBvc2l0aW9uc1xyXG4gICAgICAgIHNob3VsZCBub3cgY2hlY2sgdG8gc2VlIGlmIGFueSBvZiB0aG9zZSBwb3NpdGlvbnMgY29sbGlkZSBcclxuICAgICAgICB3aXRoIGEgd2FsbCBvciBwbGF5ZXIgYW5kIGFkanVzdCBtb3Zlc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW92ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgc3F1YXJlID0gdGhpcy5ncmlkW21vdmVzW2ldWzBdXVttb3Zlc1tpXVsxXV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbW92ZXM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHNldFBsYXllclBvcyhwbGF5ZXIsIHBvcykge1xyXG4gICAgICAgIGlmIChwbGF5ZXIgPT09IFwicGxheWVyMVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyMSA9IHBvcztcclxuICAgICAgICB9IGVsc2UgaWYgKHBsYXllciA9PT0gXCJwbGF5ZXIyXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIyID0gcG9zO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLmJvYXJkLnNldFBsYXllcnModHJ1ZSwgdGhpcy5wbGF5ZXIxLCBmYWxzZSwgdGhpcy5wbGF5ZXIyKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQbGF5ZXIgPSBcInBsYXllcjFcIjtcclxuICAgIH1cclxuXHJcbiAgICBzd2FwVHVybigpIHtcclxuICAgICAgICBpZiggdGhpcy5jdXJyZW50UGxheWVyID09PSBcInBsYXllcjFcIiApIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGxheWVyID0gXCJwbGF5ZXIyXCI7XHJcbiAgICAgICAgfSBlbHNlIGlmKCB0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyMlwiICkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQbGF5ZXIgPSBcInBsYXllcjFcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZmluZFBhdGgoKSB7XHJcbiAgICAgICAgLyogXHJcbiAgICAgICAgcnVuIHRoZSBiZnNcclxuICAgICAgICAgKi9cclxuICAgICAgICByZXR1cm4gISF0aGlzLmJvYXJkLmJmcyh0aGlzLnBsYXllcjEpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHYW1lOyIsImNvbnN0IE1vdmVFcnJvciA9IGZ1bmN0aW9uIChtc2cpIHsgdGhpcy5tc2cgPSBtc2c7IH07XHJcblxyXG4vLyBNb3ZlRXJyb3IgcmVhbGx5IHNob3VsZCBiZSBhIGNoaWxkIGNsYXNzIG9mIHRoZSBidWlsdCBpbiBFcnJvciBvYmplY3QgcHJvdmlkZWRcclxuLy8gYnkgSmF2YXNjcmlwdCwgYnV0IHNpbmNlIHdlIGhhdmVuJ3QgY292ZXJlZCBpbmhlcml0YW5jZSB5ZXQsIHdlJ2xsIGp1c3RcclxuLy8gbGV0IGl0IGJlIGEgdmFuaWxsYSBPYmplY3QgZm9yIG5vdyFcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTW92ZUVycm9yOyIsImNsYXNzIFNxdWFyZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb2xJZHgsIHJvd0lkeCkge1xyXG4gICAgICAgIHRoaXMud2FsbHMgPSB7XHJcbiAgICAgICAgICAgIE5vcnRoOiBmYWxzZSxcclxuICAgICAgICAgICAgRWFzdDogZmFsc2UsXHJcbiAgICAgICAgICAgIFNvdXRoOiBmYWxzZSxcclxuICAgICAgICAgICAgV2VzdDogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb2xJZHggPSBjb2xJZHg7XHJcbiAgICAgICAgdGhpcy5yb3dJZHggPSByb3dJZHg7IFxyXG4gICAgICAgIHRoaXMucGxheWVyID0gXCJlbXB0eVwiO1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSBcIm5vb25lXCJcclxuICAgIH1cclxuXHJcbiAgICAvLyBnZXROb3J0aCgpIHtcclxuICAgIC8vICAgICByZXR1cm4gdGhpcy53YWxscy5Ob3J0aDtcclxuICAgIC8vIH1cclxuICAgIC8vIGdldEVhc3QoKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMud2FsbHMuRWFzdDtcclxuICAgIC8vIH1cclxuICAgIC8vIGdldFNvdXRoKCkge1xyXG4gICAgLy8gICAgIHJldHVybiB0aGlzLndhbGxzLlNvdXRoO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gZ2V0V2VzdCgpIHtcclxuICAgIC8vICAgICByZXR1cm4gdGhpcy53YWxscy5XZXN0O1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHNldE5vcnRoKGJvb2wpIHtcclxuICAgIC8vICAgICBib29sID8gdGhpcy53YWxscy5Ob3J0aCA9IGJvb2wgOiB0aGlzLndhbGxzLk5vcnRoID0gIWJvb2w7XHJcbiAgICAvLyB9XHJcbiAgICAvLyBzZXRFYXN0KGJvb2wpIHtcclxuICAgIC8vICAgICBib29sID8gdGhpcy53YWxscy5FYXN0ID0gYm9vbCA6IHRoaXMud2FsbHMuRWFzdCA9ICFib29sO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gc2V0U291dGgoYm9vbCkge1xyXG4gICAgLy8gICAgIGJvb2wgPyB0aGlzLndhbGxzLlNvdXRoID0gYm9vbCA6IHRoaXMud2FsbHMuU291dGggPSAhYm9vbDtcclxuICAgIC8vIH1cclxuICAgIC8vIHNldFdlc3QoYm9vbCkge1xyXG4gICAgLy8gICAgIGJvb2wgPyB0aGlzLndhbGxzLldlc3QgPSBib29sIDogdGhpcy53YWxscy5XZXN0ID0gIWJvb2w7XHJcbiAgICAvLyB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU3F1YXJlOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvZ2FtZS5qc1wiKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=