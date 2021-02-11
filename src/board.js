const MoveError = require("./moveError");
const Square = require("./square");

class Board {
    constructor() {
        this.width = 9;
        this.height = 9;
        this.grid = Board.makeGrid(this.width, this.height);
        this.winner = false;
    }

    isOver() {
        if (this.winner() != null) {
            return true;
        }

        for (let rowIdx = 0; rowIdx < this.height; rowIdx++) {
            for (let colIdx = 0; colIdx < this.width; colIdx++) {
                if (this.grid([rowIdx, colIdx])) {
                    return false;
                }
            }
        }

        return true;
  }

    setPlayers(player1, player2) {
        if(!!player2) {
            this.grid[0][4].setModel("person");
        } else {
            this.grid[0][4].setModel("ai");
        }
        if(!!player1) {
            this.grid[8][4].setModel("person");
        } else {
            this.grid[8][4].setModel("ai");
        }
        this.grid[0][4].setPlayer("player2");
        this.grid[8][4].setPlayer("player1");
    }

    get players() {
        let player2;
        let player1;
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if (this.grid[j, i].getPlayer === "player2") {
                    player2 = [j, i];
                } 
                if (this.grid[j, i].getPlayer === "player1") {
                    player1 = [j, i];
                } 
            }
        }
        return player1, player2;
    }

    static makeGrid(width, height) {
        const grid = [];

        for (let i = 0; i < height; i++) {
            grid.push([]);
            for (let j = 0; j < width; j++) {
                let square = new Square(j , i)
                grid[i].push(square);
            }
        }

        return grid;
    }
}

module.exports = Board;