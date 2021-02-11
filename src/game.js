const MoveError = require("./moveError");
const Board = require("./board");

class Game {
    constructor() {
        this.board = new Board();
        this.currentPlayer = "noone";
        this.player1 = [4, 8];
        this.player2 = [4, 0];
    }

    isOver() {
        return this.board.isOver();
    }

    playMove(pos) {
        // this.board.placeMark(pos, this.currentPlayer);
        this.swapTurn();
    }

     promptMove(reader, callback) {
        // this.board.print();
        console.log(`Current Turn: ${this.currentPlayer}`);

        reader.question('Enter rowIdx: ', rowIdxStr => {
            const rowIdx = parseInt(rowIdxStr);
            reader.question('Enter colIdx: ', colIdxStr => {
                const colIdx = parseInt(colIdxStr);
                callback([rowIdx, colIdx]);
            });
        });
    }

    start(reader, gameCompletionCallback) {
        this.board.setPlayers(true, false)
        this.currentPlayer = 1;
        
        let count = 0


        this.promptMove(reader, move => {
            try {
                this.playMove(move);
                count = count + 1;
                console.log("turn = " + count);
            } catch (e) {
                if (e instanceof MoveError) {
                console.log(e.msg);
                } else {
                throw e;
                }
            }

            if (this.isOver()) {
                this.board.print();
                if (this.winner()) {
                console.log(`${this.winner()} has won!`);
                } else {
                console.log('NO ONE WINS!');
                }
                gameCompletionCallback();
            } else {
                // continue loop
                this.run(reader, gameCompletionCallback);
            }
        });
    }

    swapTurn() {
        if( this.currentPlayer === "player1" ) {
            console.log("player1");
        } else if( this.currentPlayer === "player2" ) {
            console.log("player2")
        }
    }

    printBoard() {
        console.log(this.board);

    }

    winner() {
        return this.board.winner();
    }

}

module.exports = Game;