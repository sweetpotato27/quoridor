

class GameView {
    constructor(game) {
        this.body = document.querySelector("body");
        this.game = game;
        this.board = this.game.board;
        this.grid = this.board.grid;
        this.squareA = null;
        this.squareB = null;
        this.neighbors = null;

        this.setupBoard();
        this.setupEventListeners();
    }

    show() {
        this.showBoard();
        if (this.game.isOver()) {
            console.log("WINNER");
        }
    }

    showBoard() {
        for(let rowIdx = 0; rowIdx  < this.grid.length; rowIdx++) {
            for (let colIdx = 0; colIdx < this.grid[rowIdx].length; colIdx++)
            {
                let square = this.grid[rowIdx][colIdx];
                let id = (rowIdx).toString() + (colIdx).toString();
                let ele = document.getElementById(id);
                if(square.player === "player1") {
                    ele.classList.add("player");
                    ele.innerHTML = "&#9823";
                } else if(square.player === "player2") {
                    ele.classList.add("player");
                    ele.innerHTML = "&#9817";
                } else {
                    ele.classList.remove("player");
                    ele.innerHTML = " ";
                }
                /* update walls */
                if (!!square.walls.North) {
                    ele.classList.remove('hall');
                    ele.classList.add('wall-top');
                }
                if (!!square.walls.East) {
                    ele.classList.remove('hall');
                    ele.classList.add('wall-right');
                }
                if (!!square.walls.South) {
                    ele.classList.remove('hall');
                    ele.classList.add('wall-bottom');
                }
                if (!!square.walls.West) {
                    ele.classList.remove('hall');
                    ele.classList.add('wall-left');
                }
            }
        }
    }

    setupEventListeners() {
        this.body.addEventListener("keyup", (event) => {
            let code = event.code;
            if (!this.game.placingWall) {
                if ((code === "ArrowUp") || (code === "ArrowRight") || (code === "ArrowDown") || (code === "ArrowLeft")) {
                    this.game.takeTurn("move", code.split("Arrow")[1].toLowerCase(), event);
                }
                this.show();
            }
            if(code === "Space") {
                this.game.findPath();
            }
        });

        this.body.addEventListener("click", (event) => {
            /* 
                The click event is used for a state machine.
                Depending on the state of placing a wall dictates
                what will happen when a click event triggers.
                State is stored in this.game.state 
                State Machine is:
                [not placing wall] == clicks Place a wall >> [selecting squares] => [selecting wall type] => [not placing wall]
                                                                                            ||
                                                                                            \/
                                                                                        {wall is created}
                !! undeveloped !!
                Player movement will be integrated into the state machine as well
                *** maybe change [not placing wall] to [not doing anything]

                [not doing anything] == clicks Move character >> [select desired square]
                                                                    ||
                                                                    \/
                                                                {move player}

            */ 

            let state = this.game.state;
            let classList = event.target.classList;
            let innerHTML = event.target.innerHTML;
            if (state === "not placing wall") {
                if (classList.contains("button")) {
                    if(innerHTML === "Place a wall") {

                        this.handlePlaceWallButton(event);
                    }

                    if(innerHTML === "Move character") {
                        this.handleMovementButton(event);
                    }
                } 
            }
            if (state === "selecting squares") {
                if (classList.contains("floor")) {

                    this.handleSquareClick(event);
                }
            } 
            if (state === "selecting wall type") {
                if (classList.contains("button")) {
                    if((innerHTML === "North") || (innerHTML === "East")
                       || (innerHTML === "South") || (innerHTML === "West")) {

                        this.handleWallTypeButton(innerHTML, event);
                    }
                }
            }
        }, false);
    } 

    handlePlaceWallButton(event) {
        // delete btn element and replace with instructions to
        // click two distinct squares
        this.game.state = "selecting squares";
        let btn = event.target;
        this.body.getElementsByClassName("clickInstruct")[0].classList.remove("hide");
        btn.classList.add("hide");
    }

    handleSquareClick(event) {
        //wait for client to click two valid squares
        let target = event.target;

        if ((target.classList.contains("floor")) && (this.squareA === null)) {
            this.squareA = target.id;
            //parse squareA
            // squareA = "00" and needs to be [0, 0]
            let square = this.squareA.split("");
            square[0] = parseInt(square[0]);
            square[1] = parseInt(square[1]);
            //get neighbors
            // returns [[north],[east],[south],[west]]
            this.neighbors = this.board.checkNeighbors(square);
            // for(let i = 0; i < this.neighbors.length; i++) {
            //     this.neighbors[i] = this.neighbors[i][0].toString() + this.neighbors[i][1].toString();
            // }
            this.highlight(this.neighbors);  // NEED TO CHANGE  SHOULD BE A CLASS TOGGLE

        } else if ((target.classList.contains("floor")) && (this.squareA !== null) && (this.squareB === null)) {
            if(!!this.neighbors.includes(target.id)) {
                this.squareB = target.id;
            }
        }

        if (this.squareA !== null && this.squareB !== null) {
            // should create two buttons depending on squareA and squareB orientation
            this.body.getElementsByClassName("clickInstruct")[0].classList.add("hide");
            
            if(this.squareA.split("")[0] === this.squareB.split("")[0]) {
                console.log("horizontal");
                if(this.squareA.split("")[0] > 0) {
                    this.body.getElementsByClassName("north")[0].classList.remove("hide");
                }
                if(this.squareA.split("")[0] < 8) {
                    this.body.getElementsByClassName("south")[0].classList.remove("hide");
                }
            }
            if(this.squareA.split("")[1] === this.squareB.split("")[1]) {
                console.log("vertical");
                if(this.squareA.split("")[1] > 0) {
                    this.body.getElementsByClassName("west")[0].classList.remove("hide");
                }
                if(this.squareA.split("")[1] < 8) {
                    this.body.getElementsByClassName("east")[0].classList.remove("hide");
                }
            }
            this.game.state = "selecting wall type";
            
        }
    }

    handleWallTypeButton(dir, event) {
        /* 
        calls this.game.takeTurn(action, dir, event);
        should remove wall type buttons and add place a wall button
        switch state back to not placing wall here???
        or in this.game
        WHERE DOES WALL PLACEMENT VALIDATION HAPPEN??????????????????????
        */
        this.game.takeTurn("placeWall", dir, event, this.squareA, this.squareB);
        this.body.getElementsByClassName("north")[0].classList.add("hide");
        this.body.getElementsByClassName("east")[0].classList.add("hide");
        this.body.getElementsByClassName("south")[0].classList.add("hide");
        this.body.getElementsByClassName("west")[0].classList.add("hide");
        this.body.getElementsByClassName("button")[0].classList.remove("hide");
        this.squareA = null;
        this.squareB = null;
        this.game.state = "not placing wall";
        this.show();
    }

    handleMovementButton(event) {
        let availableMoves;
        let player = this.game.currentPlayer === "player1" ? this.game.player1 : this.game.player2;
        let rowIdx = parseInt(player[0]);
        let colIdx = parseInt(player[1]);
        availableMoves = this.board.checkNeighbors([rowIdx, colIdx]);
        for (let i = 0; i < availableMoves.length; i++) {
            console.log(availableMoves[i]);
            let ele = document.getElementById(availableMoves[i].join(""));
            ele.style.backgroundColor = "green";
        }
    }

    highlight(array) {
        //highlight and also changes this.neighbors to be able to be read as an array of strings
        for (let i = 0; i < array.length; i++) {
            // array[i][0] = array[i][0];
            // array[i][1] = array[i][1];
            let id = array[i].join("").toString();
            this.neighbors[i] = id;
            let ele = document.getElementById(`${id}`);
            if (ele !== null) {
                // ele.style.backgroundColor = "green";
            }
        }
    }

    createButton(innerText) {
        let btn = document.createElement("button");
        btn.innerHTML = innerText
        btn.classList.add('button');
        this.body.getElementsByClassName("controller-div")[0].appendChild(btn);
        return btn;
    }

    setupBoard() {
        let div = document.createElement("div");
        this.body.appendChild(div);
        let board = document.createElement("table");
        div.appendChild(board);
        div.classList.add("table");
        board.setAttribute("id" , "board");
        let cntrlDiv = document.createElement("div");
        cntrlDiv.classList.add("controller-div");
        div.appendChild(cntrlDiv);

        //build walls button
        this.createButton("Place a wall");
        //movement button
        this.createButton("Move character");
        ////////////////////
        /* instruction for clicking squares */
        let clickInstruct = document.createElement("p");
        clickInstruct.classList.add("clickInstruct");
        clickInstruct.innerHTML = "Click two distinct squares..."
        clickInstruct.classList.add("hide");
        cntrlDiv.appendChild(clickInstruct);
        /* wall type buttons */
        let north = this.createButton("North");
        let east = this.createButton("East");
        let south = this.createButton("South");
        let west = this.createButton("West");
        north.classList.add("hide", "north");
        east.classList.add("hide", "east");
        south.classList.add("hide", "south");
        west.classList.add("hide", "west");
        cntrlDiv.appendChild(north);
        cntrlDiv.appendChild(south);
        cntrlDiv.appendChild(west);
        cntrlDiv.appendChild(east);

        for(let rowIdx = 0; rowIdx < 10; rowIdx++) {
            let tr = document.createElement("tr");
            for(let colIdx = 0; colIdx < 10; colIdx++) {
                let th = document.createElement("th");
                let td = document.createElement("td");
                if(rowIdx === 0 && colIdx === 0) {
                    th.innerHTML = ""
                    tr.appendChild(th);
                } else if (rowIdx === 0) {
                    th.innerHTML = colIdx - 1
                    tr.appendChild(th);
                } else if (rowIdx > 0 && colIdx === 0) {
                    th.innerHTML = rowIdx - 1
                    tr.appendChild(th);
                } else {
                    td.id = `${rowIdx - 1}${colIdx - 1}`;
                    td.classList.add("floor", "hall");
                    tr.appendChild(td);
                }
            }
            board.appendChild(tr);
        }
    }
}

module.exports = GameView;