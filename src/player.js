class Player {
    constructor(w, grid) {
        this.i = 0;
        this.j = 0;
        this.w = w;
        this.grid = grid;
        
        this.keyUp = false;
        this.keyRight = false;
        this.keyDown = false;
        this.keyLeft = false;
        
        this.canMove = false;

        this.next = null;
    }
      
    show(ctx) {
        let i = this.i * this.w;
        let j = this.j * this.w;
        ctx.fillStyle = "#9775AA";
        ctx.fillRect(i + 5, j + 5, this.w - 10, this.w - 10);
    };

    getRandomColor() {
        let letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
      
    movement(ctx) {
        if (this.canMove) {
            this._movement(ctx);
        }
        if (this.grid.stack && this.grid.stack.length) {
            this.canMove = false;
        } else {
            if (!this.keyUp && !this.keyRight && !this.keyDown && !this.keyLeft) {
                this.canMove = true;
            }
        }
    }
    _movement(ctx) {
        let cols = Math.floor(ctx.canvas.width / this.w);
        let current = this.grid[this.index(this.i, this.j, cols)]
        let walls = {
            TOP: current.walls["TOP"],
            RIGHT: current.walls["RIGHT"],
            BOTTOM: current.walls["BOTTOM"],
            LEFT: current.walls["LEFT"]
        };
        if (this.keyUp) {
            this.canMove = false;
            this.next = this.grid[this.index(this.i, this.j - 1, cols)]; //next is the cell above player
            if (this.next && !walls["TOP"]) {
                this.i = this.next.i;
                this.j = this.next.j;
            }
        } else if (this.keyRight && !walls["RIGHT"]) {
            this.next = this.grid[this.index(this.i + 1, this.j, cols)]; //this.next is the cell above player
            this.canMove = false;
            if (this.next) {
                this.i = this.next.i;
                this.j = this.next.j;
            }
        } else if (this.keyDown && !walls["BOTTOM"]) {
            this.next = this.grid[this.index(this.i, this.j + 1, cols)]; //this.next is the cell above player
            this.canMove = false;
            if (this.next) {
                this.i = this.next.i;
                this.j = this.next.j;
            }
        } else if (this.keyLeft && !walls["LEFT"]) {
            this.next = this.grid[this.index(this.i - 1, this.j, cols)]; //this.next is the cell above player
            this.canMove = false;
            if (this.next) {
                this.i = this.next.i;
                this.j = this.next.j;
            }
        }
    }

    index(i, j, numOfColumns) {
        if (i < 0 || j < 0 || i > numOfColumns - 1 || j > numOfColumns - 1) {
            return -1; //return undefined
        }
        return i + j * numOfColumns
    }

}

module.exports = Player;