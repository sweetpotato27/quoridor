const MoveError = require("./moveError");
const Board = require("./board");

class Game {
    constructor() {
        this.board = new Board();
        this.grid = this.board.grid;
        this.currentPlayer = "noone";
        this.player1 = [4, 8];
        this.player2 = [4, 0];
        this.placingWall = false;

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

    takeTurn(action, dir = null, event) {
        // movement or wall placement?

        if (action === "move") {
            if((dir === "up") || (dir === "right") || (dir === "down") || (dir === "left")) {
                this.movePlayer(dir);
            }
        }

        if (action === "placeWall") {
            this.placingWall = true;
            // calls this.placeWall()
            this.placeWall(event);
            //    the previous solution to placing walls seems bloated but once its implemented its fluid...
            //    I am thinking of having the place wall button morph into a north east south west button...
            //       might be better if client selects the cells they wish to place a wall before button morphs
            //       that way only north south or east west buttons will spawn
            //    selecting cells will be fluid with mouse click or less fluid with key pressing coordinates
        }

        
        console.log(this.currentPlayer + "'s turn.");
    }

    placeWall(event) {
        console.log(event);
        console.log("placing wall...");
    }

    movePlayer(dir) {
        console.log(dir);
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