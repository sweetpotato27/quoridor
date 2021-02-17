const MoveError = require("./moveError");
const Square = require("./square");

class Board {
    constructor() {
        this.width = 9;
        this.height = 9;
        this.grid = Board.makeGrid(this.width, this.height);
        this.winner = false;
    }

    // getPlayers() {
    //     let player2;
    //     let player1;
    //     for (let i = 0; i < this.height; i++) {
    //         for (let j = 0; j < this.width; j++) {
    //             if (this.grid[j, i].getPlayer === "player2") {
    //                 player2 = [j, i];
    //             } 
    //             if (this.grid[j, i].getPlayer === "player1") {
    //                 player1 = [j, i];
    //             } 
    //         }
    //     }
    //     return player1, player2;
    // }

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
        square = [colIdx, rowIdx]
        */
        let neighbors = [];
        let colIdx = square[0];
        let rowIdx  = square[1];
        neighbors.push([colIdx, rowIdx - 1]);  // north
        neighbors.push([colIdx + 1, rowIdx]);  // east
        neighbors.push([colIdx, rowIdx + 1]);  // south
        neighbors.push([colIdx - 1, rowIdx]);  // west
        return neighbors;
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

    static validPos(colIdx, rowIdx) {
        // validation to check the ends of the board
        if ((colIdx < 0 || rowIdx < 0) || (colIdx > 8 || rowIdx > 8)) {
            return false;
        } else {
            return true;
        }
    }
}

module.exports = Board;