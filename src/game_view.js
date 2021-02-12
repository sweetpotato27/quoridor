

class GameView {
    constructor(game) {
        this.game = game;
        this.board = this.game.board;
        this.grid = this.board.grid;
        this.body = document.querySelector("body");

        this.setupBoard();

        this.body.addEventListener("keyup", (event) => {
            let code = event.code;
            console.log(code);
            if ((code === "ArrowUp") || (code === "ArrowRight") || (code === "ArrowDown") || (code === "ArrowLeft")) {
                this.game.takeTurn("move", code.split("Arrow")[1].toLowerCase());
            }
            this.show();
        });
    }

    show() {
        this.showBoard();
        if (this.game.isOver()) {
            console.log("WINNER");
        }
    }

    showBoard() {
        for(let i = 0; i  < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++)
            {
                let square = this.grid[j][i];
                let id = (j + 1).toString() + (i + 1).toString();
                if(square.player === "player1") {
                    document.getElementById(`${id}`).innerHTML = "X";
                } else if(square.player === "player2") {
                    document.getElementById(`${id}`).innerHTML = "O";
                } else {
                    document.getElementById(`${id}`).innerHTML = "";
                }
            }
        }
    }

    setupBoard() {
        let div = document.createElement("div");
        this.body.appendChild(div);
        let board = document.createElement("table");
        div.appendChild(board);
        div.classList.add("table");
        board.setAttribute("id" , "board");

        for(let i = 0; i < 10; i++) {
            let tr = document.createElement("tr");
            for(let j = 0; j < 10; j++) {
                let th = document.createElement("th");
                let td = document.createElement("td");
                if(i === 0 && j === 0) {
                    th.innerHTML = ""
                    tr.appendChild(th);
                } else if (i === 0) {
                    th.innerHTML = j
                    tr.appendChild(th);
                } else if (i > 0 && j === 0) {
                    th.innerHTML = i
                    tr.appendChild(th);
                } else {
                    td.id = `${j}${i}`;
                    td.classList.add("floor", "hall");
                    tr.appendChild(td);
                    let square = this.game.board.grid[j-1][i-1];
                    if (square.player === "player1") {
                        td.style.backgroundColor = "white";
                    }
                    if (square.player === "player2") {
                        td.style.backgroundColor = "black";
                    }
                }
            }
            board.appendChild(tr);
        }
    }
}

module.exports = GameView;