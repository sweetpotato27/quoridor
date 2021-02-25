/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const MoveError = __webpack_require__(/*! ./moveError */ "./src/moveError.js");
const Square = __webpack_require__(/*! ./square */ "./src/square.js");

class Board {
    constructor() {
        this.width = 9;
        this.height = 9;
        this.grid = Board.makeGrid(this.width, this.height);
        this.winner = false;
    }

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
        square = [rowIdx, colIdx]
        */
        let neighbors = [];
        let colIdx = square[1];
        let rowIdx  = square[0];
        (rowIdx - 1 >= 0) ? neighbors.push([rowIdx - 1, colIdx]) : neighbors.push([-1, -1]);  // north
        (rowIdx + 1 <= 8) ? neighbors.push([rowIdx + 1, colIdx]) : neighbors.push([-1, -1]);  // south
        (colIdx - 1 >= 0) ? neighbors.push([rowIdx, colIdx - 1]) : neighbors.push([-1, -1]);  // west
        (colIdx + 1 <= 8) ? neighbors.push([rowIdx, colIdx + 1]) : neighbors.push([-1, -1]);  // east
        return neighbors;
    }

    isWalled(dir, rowIdx, colIdx) {
        /* 
         returns true if path is blocked by wall
         returns false if path is free
        */
       
        let square = this.grid[rowIdx][colIdx];
        if(dir === "up") {
            if(square.walls.North) {
                return true;
            }
        } else if (dir === "right") {
            if(square.walls.East) {
                return true;
            }
        } else if (dir === "down") {
            if(square.walls.South) {
                return true;
            }
        } else if (dir === "left") {
            if(square.walls.West) {
                return true;
            }
        } else {

        }
        return false;
    }


    bfs(root, goal = ["00","01","02","03","04","05","06","07","08"]) {
        /* 
        root === [rowIdx, colIdx]

        this function is so crusty 
        */


        let hashmap = new Map(); 
        let Q = []; //array of [row, col]
        let discovered = []; //array of id
        hashmap.set(root, null)
        Q.push(root);
        discovered.push(root.join(""));
        while (Q.length > 0) {
            let v = Q.shift(); // pos
            let id = v.join("");
            let square = this.grid[v[0]][v[1]]; //square
            if (goal.includes(id)) {
                let path = [];
                path = this.traverseHashmap(hashmap, v.join(""));
                path.push(v.join(""));
                return [v.join(""), path];
            }
            // finding all possible directions
            
            if ((!square.walls.North && (parseInt(v[0]) > 0))){
                let newV = v.join("").split("");
                newV[0] = parseInt(newV[0]) - 1;
                id = newV.join("");
                if (!discovered.includes(id)) {
                    discovered.push(id);
                    Q.push(newV);
                    hashmap.set(newV.join(""), v.join(""));
                }
            }
            if ((!square.walls.South && (parseInt(v[0]) < 8))) {
                let newV = v.join("").split("");
                newV[0] = parseInt(newV[0]) + 1;
                id = newV.join("");
                if (!discovered.includes(id)) {
                    discovered.push(id);
                    Q.push(newV);
                    hashmap.set(newV.join(""), v.join(""));
                }
            }
            if ((!square.walls.East && (parseInt(v[1]) < 8))) {
                let newV = v.join("").split("");
                newV[1] = parseInt(newV[1]) + 1;
                id = newV.join("");
                if (!discovered.includes(id)) {
                    discovered.push(id);
                    Q.push(newV);
                    hashmap.set(newV.join(""), v.join(""));
                }
            }
            if ((!square.walls.West && (parseInt(v[1]) > 0))) {
                let newV = v.join("").split("");
                newV[1] = parseInt(newV[1]) - 1;
                id = newV.join("");
                if (!discovered.includes(id)) {
                    discovered.push(id);
                    Q.push(newV);
                    hashmap.set(newV.join(""), v.join(""));
                }
            }
        }
        return false;
    }

    traverseHashmap(hash, start) {
        let node = hash.get(start);
        let path = [];
        while (node) {
            path.push(node)
            node = hash.get(node);
        }
        return path.reverse();
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

    static isValidPos(colIdx, rowIdx) {
        // validation to check the ends of the board
        if ((colIdx < 0 || rowIdx < 0) || (colIdx > 8 || rowIdx > 8)) {
            return false;
        } else if (false) {} else {
            return true;
        }
    }

}

module.exports = Board;

/***/ }),

/***/ "./src/moveError.js":
/*!**************************!*\
  !*** ./src/moveError.js ***!
  \**************************/
/***/ ((module) => {

const MoveError = function (msg) { this.msg = msg; };

// MoveError really should be a child class of the built in Error object provided
// by Javascript, but since we haven't covered inheritance yet, we'll just
// let it be a vanilla Object for now!

module.exports = MoveError;

/***/ }),

/***/ "./src/square.js":
/*!***********************!*\
  !*** ./src/square.js ***!
  \***********************/
/***/ ((module) => {

class Square {
    constructor(colIdx, rowIdx) {
        this.walls = {
            North: false,
            East: false,
            South: false,
            West: false
        }
        this.colIdx = colIdx;
        this.rowIdx = rowIdx; 
        this.player = "empty";
        this.model = "noone"
    }

    // getNorth() {
    //     return this.walls.North;
    // }
    // getEast() {
    //     return this.walls.East;
    // }
    // getSouth() {
    //     return this.walls.South;
    // }
    // getWest() {
    //     return this.walls.West;
    // }

    // setNorth(bool) {
    //     bool ? this.walls.North = bool : this.walls.North = !bool;
    // }
    // setEast(bool) {
    //     bool ? this.walls.East = bool : this.walls.East = !bool;
    // }
    // setSouth(bool) {
    //     bool ? this.walls.South = bool : this.walls.South = !bool;
    // }
    // setWest(bool) {
    //     bool ? this.walls.West = bool : this.walls.West = !bool;
    // }
}

module.exports = Square;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/board.js");
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9xdW9yaWRvci8uL3NyYy9ib2FyZC5qcyIsIndlYnBhY2s6Ly9xdW9yaWRvci8uL3NyYy9tb3ZlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vcXVvcmlkb3IvLi9zcmMvc3F1YXJlLmpzIiwid2VicGFjazovL3F1b3JpZG9yL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3F1b3JpZG9yL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxrQkFBa0IsbUJBQU8sQ0FBQyx1Q0FBYTtBQUN2QyxlQUFlLG1CQUFPLENBQUMsaUNBQVU7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0RkFBNEY7QUFDNUYsNEZBQTRGO0FBQzVGLDRGQUE0RjtBQUM1Riw0RkFBNEY7QUFDNUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBLGdDO0FBQ0EsbUJBQW1CO0FBQ25CLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUEsNEJBQTRCLGlCQUFpQjtBQUM3QztBQUNBLGdDQUFnQyxnQkFBZ0I7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxVQUFVLEtBQUssRUFBRSxFQUNqQjtBQUNUO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSx1Qjs7Ozs7Ozs7OztBQ3BMQSxrQ0FBa0MsZ0JBQWdCOztBQUVsRDtBQUNBO0FBQ0E7O0FBRUEsMkI7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0I7Ozs7OztVQ3pDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7O1VDckJBO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImJvYXJkLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IE1vdmVFcnJvciA9IHJlcXVpcmUoXCIuL21vdmVFcnJvclwiKTtcclxuY29uc3QgU3F1YXJlID0gcmVxdWlyZShcIi4vc3F1YXJlXCIpO1xyXG5cclxuY2xhc3MgQm9hcmQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IDk7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSA5O1xyXG4gICAgICAgIHRoaXMuZ3JpZCA9IEJvYXJkLm1ha2VHcmlkKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLndpbm5lciA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBsYXllcnMocGxheWVyMSwgcDFQb3MsIHBsYXllcjIsIHAyUG9zKSB7XHJcbiAgICAgICAgLyogcDFQb3MgJiBwMlBvcyA9IFtyb3csIGNvbF0gKi9cclxuICAgICAgICBsZXQgZ3JpZFNxdWFyZTIgPSB0aGlzLmdyaWRbcDJQb3NbMF1dW3AyUG9zWzFdXTtcclxuICAgICAgICBsZXQgZ3JpZFNxdWFyZTEgPSB0aGlzLmdyaWRbcDFQb3NbMF1dW3AxUG9zWzFdXTtcclxuICAgICAgICBpZighIXBsYXllcjIpIHtcclxuICAgICAgICAgICAgZ3JpZFNxdWFyZTIubW9kZWwgPSBcInBlcnNvblwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdyaWRTcXVhcmUyLm1vZGVsID0gXCJhaVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighIXBsYXllcjEpIHtcclxuICAgICAgICAgICAgZ3JpZFNxdWFyZTEubW9kZWwgPSBcInBlcnNvblwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdyaWRTcXVhcmUxLm1vZGVsID0gXCJhaVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBncmlkU3F1YXJlMi5wbGF5ZXIgPSBcInBsYXllcjJcIjtcclxuICAgICAgICBncmlkU3F1YXJlMS5wbGF5ZXIgPSBcInBsYXllcjFcIjtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja05laWdoYm9ycyhzcXVhcmUpIHtcclxuICAgICAgICAvKiBcclxuICAgICAgICByZXF1aXJlcyBbW251bV1bbnVtXV0gXHJcbiAgICAgICAgc3F1YXJlID0gW3Jvd0lkeCwgY29sSWR4XVxyXG4gICAgICAgICovXHJcbiAgICAgICAgbGV0IG5laWdoYm9ycyA9IFtdO1xyXG4gICAgICAgIGxldCBjb2xJZHggPSBzcXVhcmVbMV07XHJcbiAgICAgICAgbGV0IHJvd0lkeCAgPSBzcXVhcmVbMF07XHJcbiAgICAgICAgKHJvd0lkeCAtIDEgPj0gMCkgPyBuZWlnaGJvcnMucHVzaChbcm93SWR4IC0gMSwgY29sSWR4XSkgOiBuZWlnaGJvcnMucHVzaChbLTEsIC0xXSk7ICAvLyBub3J0aFxyXG4gICAgICAgIChyb3dJZHggKyAxIDw9IDgpID8gbmVpZ2hib3JzLnB1c2goW3Jvd0lkeCArIDEsIGNvbElkeF0pIDogbmVpZ2hib3JzLnB1c2goWy0xLCAtMV0pOyAgLy8gc291dGhcclxuICAgICAgICAoY29sSWR4IC0gMSA+PSAwKSA/IG5laWdoYm9ycy5wdXNoKFtyb3dJZHgsIGNvbElkeCAtIDFdKSA6IG5laWdoYm9ycy5wdXNoKFstMSwgLTFdKTsgIC8vIHdlc3RcclxuICAgICAgICAoY29sSWR4ICsgMSA8PSA4KSA/IG5laWdoYm9ycy5wdXNoKFtyb3dJZHgsIGNvbElkeCArIDFdKSA6IG5laWdoYm9ycy5wdXNoKFstMSwgLTFdKTsgIC8vIGVhc3RcclxuICAgICAgICByZXR1cm4gbmVpZ2hib3JzO1xyXG4gICAgfVxyXG5cclxuICAgIGlzV2FsbGVkKGRpciwgcm93SWR4LCBjb2xJZHgpIHtcclxuICAgICAgICAvKiBcclxuICAgICAgICAgcmV0dXJucyB0cnVlIGlmIHBhdGggaXMgYmxvY2tlZCBieSB3YWxsXHJcbiAgICAgICAgIHJldHVybnMgZmFsc2UgaWYgcGF0aCBpcyBmcmVlXHJcbiAgICAgICAgKi9cclxuICAgICAgIFxyXG4gICAgICAgIGxldCBzcXVhcmUgPSB0aGlzLmdyaWRbcm93SWR4XVtjb2xJZHhdO1xyXG4gICAgICAgIGlmKGRpciA9PT0gXCJ1cFwiKSB7XHJcbiAgICAgICAgICAgIGlmKHNxdWFyZS53YWxscy5Ob3J0aCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGRpciA9PT0gXCJyaWdodFwiKSB7XHJcbiAgICAgICAgICAgIGlmKHNxdWFyZS53YWxscy5FYXN0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZGlyID09PSBcImRvd25cIikge1xyXG4gICAgICAgICAgICBpZihzcXVhcmUud2FsbHMuU291dGgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChkaXIgPT09IFwibGVmdFwiKSB7XHJcbiAgICAgICAgICAgIGlmKHNxdWFyZS53YWxscy5XZXN0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGJmcyhyb290LCBnb2FsID0gW1wiMDBcIixcIjAxXCIsXCIwMlwiLFwiMDNcIixcIjA0XCIsXCIwNVwiLFwiMDZcIixcIjA3XCIsXCIwOFwiXSkge1xyXG4gICAgICAgIC8qIFxyXG4gICAgICAgIHJvb3QgPT09IFtyb3dJZHgsIGNvbElkeF1cclxuXHJcbiAgICAgICAgdGhpcyBmdW5jdGlvbiBpcyBzbyBjcnVzdHkgXHJcbiAgICAgICAgKi9cclxuXHJcblxyXG4gICAgICAgIGxldCBoYXNobWFwID0gbmV3IE1hcCgpOyBcclxuICAgICAgICBsZXQgUSA9IFtdOyAvL2FycmF5IG9mIFtyb3csIGNvbF1cclxuICAgICAgICBsZXQgZGlzY292ZXJlZCA9IFtdOyAvL2FycmF5IG9mIGlkXHJcbiAgICAgICAgaGFzaG1hcC5zZXQocm9vdCwgbnVsbClcclxuICAgICAgICBRLnB1c2gocm9vdCk7XHJcbiAgICAgICAgZGlzY292ZXJlZC5wdXNoKHJvb3Quam9pbihcIlwiKSk7XHJcbiAgICAgICAgd2hpbGUgKFEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgdiA9IFEuc2hpZnQoKTsgLy8gcG9zXHJcbiAgICAgICAgICAgIGxldCBpZCA9IHYuam9pbihcIlwiKTtcclxuICAgICAgICAgICAgbGV0IHNxdWFyZSA9IHRoaXMuZ3JpZFt2WzBdXVt2WzFdXTsgLy9zcXVhcmVcclxuICAgICAgICAgICAgaWYgKGdvYWwuaW5jbHVkZXMoaWQpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGF0aCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgcGF0aCA9IHRoaXMudHJhdmVyc2VIYXNobWFwKGhhc2htYXAsIHYuam9pbihcIlwiKSk7XHJcbiAgICAgICAgICAgICAgICBwYXRoLnB1c2godi5qb2luKFwiXCIpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbdi5qb2luKFwiXCIpLCBwYXRoXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBmaW5kaW5nIGFsbCBwb3NzaWJsZSBkaXJlY3Rpb25zXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoKCFzcXVhcmUud2FsbHMuTm9ydGggJiYgKHBhcnNlSW50KHZbMF0pID4gMCkpKXtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdWID0gdi5qb2luKFwiXCIpLnNwbGl0KFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgbmV3VlswXSA9IHBhcnNlSW50KG5ld1ZbMF0pIC0gMTtcclxuICAgICAgICAgICAgICAgIGlkID0gbmV3Vi5qb2luKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkaXNjb3ZlcmVkLmluY2x1ZGVzKGlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2NvdmVyZWQucHVzaChpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgUS5wdXNoKG5ld1YpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc2htYXAuc2V0KG5ld1Yuam9pbihcIlwiKSwgdi5qb2luKFwiXCIpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoKCFzcXVhcmUud2FsbHMuU291dGggJiYgKHBhcnNlSW50KHZbMF0pIDwgOCkpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3ViA9IHYuam9pbihcIlwiKS5zcGxpdChcIlwiKTtcclxuICAgICAgICAgICAgICAgIG5ld1ZbMF0gPSBwYXJzZUludChuZXdWWzBdKSArIDE7XHJcbiAgICAgICAgICAgICAgICBpZCA9IG5ld1Yuam9pbihcIlwiKTtcclxuICAgICAgICAgICAgICAgIGlmICghZGlzY292ZXJlZC5pbmNsdWRlcyhpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNjb3ZlcmVkLnB1c2goaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIFEucHVzaChuZXdWKTtcclxuICAgICAgICAgICAgICAgICAgICBoYXNobWFwLnNldChuZXdWLmpvaW4oXCJcIiksIHYuam9pbihcIlwiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCghc3F1YXJlLndhbGxzLkVhc3QgJiYgKHBhcnNlSW50KHZbMV0pIDwgOCkpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3ViA9IHYuam9pbihcIlwiKS5zcGxpdChcIlwiKTtcclxuICAgICAgICAgICAgICAgIG5ld1ZbMV0gPSBwYXJzZUludChuZXdWWzFdKSArIDE7XHJcbiAgICAgICAgICAgICAgICBpZCA9IG5ld1Yuam9pbihcIlwiKTtcclxuICAgICAgICAgICAgICAgIGlmICghZGlzY292ZXJlZC5pbmNsdWRlcyhpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNjb3ZlcmVkLnB1c2goaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIFEucHVzaChuZXdWKTtcclxuICAgICAgICAgICAgICAgICAgICBoYXNobWFwLnNldChuZXdWLmpvaW4oXCJcIiksIHYuam9pbihcIlwiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCghc3F1YXJlLndhbGxzLldlc3QgJiYgKHBhcnNlSW50KHZbMV0pID4gMCkpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3ViA9IHYuam9pbihcIlwiKS5zcGxpdChcIlwiKTtcclxuICAgICAgICAgICAgICAgIG5ld1ZbMV0gPSBwYXJzZUludChuZXdWWzFdKSAtIDE7XHJcbiAgICAgICAgICAgICAgICBpZCA9IG5ld1Yuam9pbihcIlwiKTtcclxuICAgICAgICAgICAgICAgIGlmICghZGlzY292ZXJlZC5pbmNsdWRlcyhpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNjb3ZlcmVkLnB1c2goaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIFEucHVzaChuZXdWKTtcclxuICAgICAgICAgICAgICAgICAgICBoYXNobWFwLnNldChuZXdWLmpvaW4oXCJcIiksIHYuam9pbihcIlwiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHRyYXZlcnNlSGFzaG1hcChoYXNoLCBzdGFydCkge1xyXG4gICAgICAgIGxldCBub2RlID0gaGFzaC5nZXQoc3RhcnQpO1xyXG4gICAgICAgIGxldCBwYXRoID0gW107XHJcbiAgICAgICAgd2hpbGUgKG5vZGUpIHtcclxuICAgICAgICAgICAgcGF0aC5wdXNoKG5vZGUpXHJcbiAgICAgICAgICAgIG5vZGUgPSBoYXNoLmdldChub2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBhdGgucmV2ZXJzZSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzdGF0aWMgbWFrZUdyaWQod2lkdGgsIGhlaWdodCkge1xyXG4gICAgICAgIGNvbnN0IGdyaWQgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgcm93SWR4ID0gMDsgcm93SWR4IDwgaGVpZ2h0OyByb3dJZHgrKykge1xyXG4gICAgICAgICAgICBncmlkLnB1c2goW10pO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjb2xJZHggPSAwOyBjb2xJZHggPCB3aWR0aDsgY29sSWR4KyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBzcXVhcmUgPSBuZXcgU3F1YXJlKGNvbElkeCAsIHJvd0lkeClcclxuICAgICAgICAgICAgICAgIGdyaWRbcm93SWR4XS5wdXNoKHNxdWFyZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGdyaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGlzVmFsaWRQb3MoY29sSWR4LCByb3dJZHgpIHtcclxuICAgICAgICAvLyB2YWxpZGF0aW9uIHRvIGNoZWNrIHRoZSBlbmRzIG9mIHRoZSBib2FyZFxyXG4gICAgICAgIGlmICgoY29sSWR4IDwgMCB8fCByb3dJZHggPCAwKSB8fCAoY29sSWR4ID4gOCB8fCByb3dJZHggPiA4KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmIChmYWxzZSkge1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQm9hcmQ7IiwiY29uc3QgTW92ZUVycm9yID0gZnVuY3Rpb24gKG1zZykgeyB0aGlzLm1zZyA9IG1zZzsgfTtcclxuXHJcbi8vIE1vdmVFcnJvciByZWFsbHkgc2hvdWxkIGJlIGEgY2hpbGQgY2xhc3Mgb2YgdGhlIGJ1aWx0IGluIEVycm9yIG9iamVjdCBwcm92aWRlZFxyXG4vLyBieSBKYXZhc2NyaXB0LCBidXQgc2luY2Ugd2UgaGF2ZW4ndCBjb3ZlcmVkIGluaGVyaXRhbmNlIHlldCwgd2UnbGwganVzdFxyXG4vLyBsZXQgaXQgYmUgYSB2YW5pbGxhIE9iamVjdCBmb3Igbm93IVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNb3ZlRXJyb3I7IiwiY2xhc3MgU3F1YXJlIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbElkeCwgcm93SWR4KSB7XHJcbiAgICAgICAgdGhpcy53YWxscyA9IHtcclxuICAgICAgICAgICAgTm9ydGg6IGZhbHNlLFxyXG4gICAgICAgICAgICBFYXN0OiBmYWxzZSxcclxuICAgICAgICAgICAgU291dGg6IGZhbHNlLFxyXG4gICAgICAgICAgICBXZXN0OiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbElkeCA9IGNvbElkeDtcclxuICAgICAgICB0aGlzLnJvd0lkeCA9IHJvd0lkeDsgXHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBcImVtcHR5XCI7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IFwibm9vbmVcIlxyXG4gICAgfVxyXG5cclxuICAgIC8vIGdldE5vcnRoKCkge1xyXG4gICAgLy8gICAgIHJldHVybiB0aGlzLndhbGxzLk5vcnRoO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gZ2V0RWFzdCgpIHtcclxuICAgIC8vICAgICByZXR1cm4gdGhpcy53YWxscy5FYXN0O1xyXG4gICAgLy8gfVxyXG4gICAgLy8gZ2V0U291dGgoKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMud2FsbHMuU291dGg7XHJcbiAgICAvLyB9XHJcbiAgICAvLyBnZXRXZXN0KCkge1xyXG4gICAgLy8gICAgIHJldHVybiB0aGlzLndhbGxzLldlc3Q7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc2V0Tm9ydGgoYm9vbCkge1xyXG4gICAgLy8gICAgIGJvb2wgPyB0aGlzLndhbGxzLk5vcnRoID0gYm9vbCA6IHRoaXMud2FsbHMuTm9ydGggPSAhYm9vbDtcclxuICAgIC8vIH1cclxuICAgIC8vIHNldEVhc3QoYm9vbCkge1xyXG4gICAgLy8gICAgIGJvb2wgPyB0aGlzLndhbGxzLkVhc3QgPSBib29sIDogdGhpcy53YWxscy5FYXN0ID0gIWJvb2w7XHJcbiAgICAvLyB9XHJcbiAgICAvLyBzZXRTb3V0aChib29sKSB7XHJcbiAgICAvLyAgICAgYm9vbCA/IHRoaXMud2FsbHMuU291dGggPSBib29sIDogdGhpcy53YWxscy5Tb3V0aCA9ICFib29sO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gc2V0V2VzdChib29sKSB7XHJcbiAgICAvLyAgICAgYm9vbCA/IHRoaXMud2FsbHMuV2VzdCA9IGJvb2wgOiB0aGlzLndhbGxzLldlc3QgPSAhYm9vbDtcclxuICAgIC8vIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTcXVhcmU7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9ib2FyZC5qc1wiKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=