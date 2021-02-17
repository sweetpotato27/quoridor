const MoveError = require("./moveError");
const Board = require("./board");

class Game {
    constructor() {
        this.board = new Board();
        this.grid = this.board.grid;
        this.currentPlayer = "noone";
        /* this.player = [rowIdx, colIdx] */
        this.player1 = [8, 4];
        this.player2 = [0, 4];
        this.state = "not placing wall";

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
        }
        for(let i = 0; i < this.grid[8].length; i++) {
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

        
        console.log(this.currentPlayer + "'s turn.");
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
        if(dir === "North"){
            sqrA.walls.North = true;
            sqrB.walls.North = true;
            /* sets the north neighbors south wall to true */
            this.grid[neighborsA[0][0]][neighborsA[0][1]].walls.South = true;
            this.grid[neighborsB[0][0]][neighborsB[0][1]].walls.South = true;
            isValidWall = this.findPath();
            if(isValidWall) {
                this.swapTurn();
            } else {
                sqrA.walls.North = false;
                sqrB.walls.North = false;
                this.grid[neighborsA[0][0]][neighborsA[0][1]].walls.South = false;
                this.grid[neighborsB[0][0]][neighborsB[0][1]].walls.South = false;
            }
        }
        if(dir === "East"){
            sqrA.walls.East = true;
            sqrB.walls.East = true;
            /* sets the East neighbors West wall to true */
            this.grid[neighborsA[1][0]][neighborsA[1][1]].walls.West = true;
            this.grid[neighborsB[1][0]][neighborsB[1][1]].walls.West = true;
            isValidWall = this.findPath();
            if(isValidWall) {
                this.swapTurn();
            } else {
                sqrA.walls.East = false;
                sqrB.walls.East = false;
                this.grid[neighborsA[1][0]][neighborsA[1][1]].walls.West = false;
                this.grid[neighborsB[1][0]][neighborsB[1][1]].walls.West = false;
            }
        }
        if(dir === "South"){
            sqrA.walls.South = true;
            sqrB.walls.South = true;
            /* sets the South neighbors North wall to true */
            this.grid[neighborsA[2][0]][neighborsA[2][1]].walls.North = true;
            this.grid[neighborsB[2][0]][neighborsB[2][1]].walls.North = true;
            isValidWall = this.findPath();
            if(isValidWall) {
                this.swapTurn();
            } else {
                sqrA.walls.South = false;
                sqrB.walls.South = false;
                this.grid[neighborsA[2][0]][neighborsA[2][1]].walls.North = false;
                this.grid[neighborsB[2][0]][neighborsB[2][1]].walls.North = false;
            }
        }
        if(dir === "West"){
            sqrA.walls.West = true;
            sqrB.walls.West = true;
            /* sets the West neighbors East wall to true */
            this.grid[neighborsA[3][0]][neighborsA[3][1]].walls.East = true;
            this.grid[neighborsB[3][0]][neighborsB[3][1]].walls.East = true;
            isValidWall = this.findPath();
            if(isValidWall) {
                this.swapTurn();
            } else {
                sqrA.walls.West = false;
                sqrB.walls.West = false;
                this.grid[neighborsA[3][0]][neighborsA[3][1]].walls.East = false;
                this.grid[neighborsB[3][0]][neighborsB[3][1]].walls.East = false;
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
        }

        /*
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
                console.log("COLLSION");
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

    printBoard() {
        console.log(this.board);

    }

    findPath() {
        return !!this.board.bfs(this.player1);
    }

}

module.exports = Game;