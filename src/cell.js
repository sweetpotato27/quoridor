class Cell {
    constructor(i, j, w) {
        this.i = i;
        this.j = j;
        this.w = w;
        this.walls = {
            TOP: false, 
            RIGHT: false, 
            BOTTOM: false, 
            LEFT: false
        };
        
        this.keyUp = false;
        this.keyRight = false;
        this.keyDown = false;
        this.keyLeft = false;
        
        this.visited = false;
    }

    

    show(ctx) {
        let x = this.i * this.w;
        let y = this.j * this.w;
        
        if (this.visited) {
            // walls of maze color
            ctx.strokeStyle = this.getRandomColor(); 
            // path of maze color
            ctx.fillStyle = "#FFFFFF";
        } else {
            ctx.strokeStyle = this.getRandomColor();
            ctx.fillStyle = "#000000";
        }
    
        ctx.fillRect(x, y, this.w, this.w);
        ctx.beginPath();
        ///////////////  TOP  /////////////////////
        if (this.walls["TOP"]) {
            ctx.moveTo(x, y);
            ctx.lineTo(x + this.w, y);
        };
        //////////////  RIGHT  ///////////////////
        if (this.walls["RIGHT"]) {
            ctx.moveTo(x + this.w, y);
            ctx.lineTo(x + this.w, y + this.w);
        }
        //////////////  BOTTOM  //////////////////
        if (this.walls["BOTTOM"]) {
            ctx.moveTo(x + this.w, y + this.w);
            ctx.lineTo(x, y + this.w);
        }
        ///////////////  LEFT  ///////////////////
        if (this.walls["LEFT"]) {
            ctx.moveTo(x, y + this.w);
            ctx.lineTo(x, y);
        }
        //////////////////////////////////////////
        ctx.stroke();
    };

    getRandomColor() {
        let letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    checkNeighbors(grid, numOfColumns) {
        let neighbors = [];
        let top = grid[this.index(this.i, this.j - 1, numOfColumns)];
        let right = grid[this.index(this.i + 1, this.j, numOfColumns)];
        let bottom = grid[this.index(this.i, this.j + 1, numOfColumns)];
        let left = grid[this.index(this.i - 1, this.j, numOfColumns)];

        
        if (top && !top.visited) {
            neighbors.push(top);
        }
        if (right && !right.visited) {
            neighbors.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbors.push(bottom);
        }
        if (left && !left.visited) {
            neighbors.push(left);
        }

        if (neighbors.length > 0) {
            let rng = Math.floor(Math.random() * neighbors.length);
            return neighbors[rng];
        } else {
            return undefined;
        }
    }

    index(i, j, numOfColumns) {
        if(i < 0 || j < 0 || i > numOfColumns - 1 || j > numOfColumns - 1) {
            return -1; //return undefined
        }
        return i + j * numOfColumns
    }
}

module.exports = Cell;