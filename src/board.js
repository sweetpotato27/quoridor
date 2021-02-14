const MoveError = require("./moveError");
const Square = require("./square");

class Board {
    constructor() {
        this.width = 9;
        this.height = 9;
        this.grid = Board.makeGrid(this.width, this.height);
        this.winner = false;
    }

    getPlayers() {
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

    setPlayers(player1, p1Pos, player2, p2Pos) {
        let gridSquare2 = this.grid[p2Pos[0]] [p2Pos[1]];
        let gridSquare1 = this.grid[p1Pos[0]] [p1Pos[1]];
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
        /* requires [[num][num]] */
        console.log(`checking ${square}'s neighbors...`);
        let neighbors = [];
        let x = square[0];
        let y  = square[1];
        neighbors.push([x, y - 1]);  // north
        neighbors.push([x + 1, y]);  // east
        neighbors.push([x, y + 1]);  // south
        neighbors.push([x - 1, y]);  // west
        console.log(neighbors);
        return neighbors;
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

    static validPos(x, y) {
        // validation to check the ends of the board
        if ((x < 0 || y < 0) || (x > 8 || y > 8)) {
            return false;
        } else {
            return true;
        }
    }
}

module.exports = Board;