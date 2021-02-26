import Board from "./board";

export default class Game {
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
