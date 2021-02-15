const MoveError = require("./moveError");
const Board = require("./board");

class Game {
    constructor() {
        this.board = new Board();
        this.grid = this.board.grid;
        this.currentPlayer = "noone";
        this.player1 = [4, 8];
        this.player2 = [4, 0];
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
            if(this.grid[i][0].player === "player1") {
                winner = "player1"
            }
        }
        for(let i = 0; i < this.grid[8].length; i++) {
            if(this.grid[i][8].player === "player2") {
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
        get Square and set the specific walls to true 
        get neighbors and sset specific walls to true... opposite wall
        */
        let sqrA = this.grid[squareA[1]][squareA[0]];
        let sqrB = this.grid[squareB[1]][squareB[0]];
        let neighborsA = this.board.checkNeighbors([sqrA.x, sqrA.y]);
        let neighborsB = this.board.checkNeighbors([sqrB.x, sqrB.y]);

        if(dir === "North"){
            console.log(sqrA, sqrB);
            sqrA.walls.North = true;
            sqrB.walls.North = true;
            /* sets the north neighbors south wall to true */
            // this.grid[neighborsA[0][1]][neighborsA[0][0]].walls.South = true;
            // this.grid[neighborsB[0][1]][neighborsB[0][0]].walls.South = true;
        }
        if(dir === "East"){
            sqrA.walls.East = true;
            sqrB.walls.East = true;
            /* sets the East neighbors West wall to true */
            // this.grid[neighborsA[0][1]][neighborsA[0][0]].walls.West = true;
            // this.grid[neighborsB[0][1]][neighborsB[0][0]].walls.West = true;
        }
        if(dir === "South"){
            sqrA.walls.South = true;
            sqrB.walls.South = true;
            /* sets the South neighbors North wall to true */
            // this.grid[neighborsA[0][1]][neighborsA[0][0]].walls.North = true;
            // this.grid[neighborsB[0][1]][neighborsB[0][0]].walls.North = true;
        }
        if(dir === "West"){
            sqrA.walls.West = true;
            sqrB.walls.West = true;
            /* sets the West neighbors East wall to true */
            // this.grid[neighborsA[0][1]][neighborsA[0][0]].walls.East = true;
            // this.grid[neighborsB[0][1]][neighborsB[0][0]].walls.East = true;
        }
    }

    movePlayer(dir) {
        // takes current player current pos
        // calculates future pos with dir
        let player;
        this.currentPlayer === "player1" ? player = this.player1 : player = this.player2
        let newX;
        let newY;
        let valid;
        if (dir === "up") {
            newX = player[0];
            newY = player[1] - 1;
        } else if (dir === "right") {
            newX = player[0] + 1;
            newY = player[1];
        } else if (dir === "down") {
            newX = player[0];
            newY = player[1] + 1;
        } else if (dir === "left") {
            newX = player[0] - 1;
            newY = player[1];
        }


        // gives to this.board to validate
        valid = Board.validPos(newX, newY);
        
        // if valid then sets player new x and y
        //    swaps turns
        if (valid) {

            let oldSquare = this.board.grid[player[0]][player[1]];
            let newSquare = this.board.grid[newX][newY];

            //validation to check for player collision         
            if (newSquare.player !== "empty") {
                console.log("COLLSION");
            } else {
                oldSquare.player = "empty";
                this.setPlayerPos(this.currentPlayer, [newX, newY]);
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

}

module.exports = Game;