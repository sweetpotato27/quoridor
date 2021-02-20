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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9xdW9yaWRvci8uL3NyYy9ib2FyZC5qcyIsIndlYnBhY2s6Ly9xdW9yaWRvci8uL3NyYy9tb3ZlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vcXVvcmlkb3IvLi9zcmMvc3F1YXJlLmpzIiwid2VicGFjazovL3F1b3JpZG9yL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3F1b3JpZG9yL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxrQkFBa0IsbUJBQU8sQ0FBQyx1Q0FBYTtBQUN2QyxlQUFlLG1CQUFPLENBQUMsaUNBQVU7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0RkFBNEY7QUFDNUYsNEZBQTRGO0FBQzVGLDRGQUE0RjtBQUM1Riw0RkFBNEY7QUFDNUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBLGdDO0FBQ0EsbUJBQW1CO0FBQ25CLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBLDRCQUE0QixpQkFBaUI7QUFDN0M7QUFDQSxnQ0FBZ0MsZ0JBQWdCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsVUFBVSxLQUFLLEVBQUUsRUFDakI7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsdUI7Ozs7Ozs7Ozs7QUNuTEEsa0NBQWtDLGdCQUFnQjs7QUFFbEQ7QUFDQTtBQUNBOztBQUVBLDJCOzs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdCOzs7Ozs7VUN6Q0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7OztVQ3JCQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJib2FyZC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBNb3ZlRXJyb3IgPSByZXF1aXJlKFwiLi9tb3ZlRXJyb3JcIik7XHJcbmNvbnN0IFNxdWFyZSA9IHJlcXVpcmUoXCIuL3NxdWFyZVwiKTtcclxuXHJcbmNsYXNzIEJvYXJkIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMud2lkdGggPSA5O1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gOTtcclxuICAgICAgICB0aGlzLmdyaWQgPSBCb2FyZC5tYWtlR3JpZCh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICAgICAgdGhpcy53aW5uZXIgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQbGF5ZXJzKHBsYXllcjEsIHAxUG9zLCBwbGF5ZXIyLCBwMlBvcykge1xyXG4gICAgICAgIC8qIHAxUG9zICYgcDJQb3MgPSBbcm93LCBjb2xdICovXHJcbiAgICAgICAgbGV0IGdyaWRTcXVhcmUyID0gdGhpcy5ncmlkW3AyUG9zWzBdXVtwMlBvc1sxXV07XHJcbiAgICAgICAgbGV0IGdyaWRTcXVhcmUxID0gdGhpcy5ncmlkW3AxUG9zWzBdXVtwMVBvc1sxXV07XHJcbiAgICAgICAgaWYoISFwbGF5ZXIyKSB7XHJcbiAgICAgICAgICAgIGdyaWRTcXVhcmUyLm1vZGVsID0gXCJwZXJzb25cIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBncmlkU3F1YXJlMi5tb2RlbCA9IFwiYWlcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoISFwbGF5ZXIxKSB7XHJcbiAgICAgICAgICAgIGdyaWRTcXVhcmUxLm1vZGVsID0gXCJwZXJzb25cIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBncmlkU3F1YXJlMS5tb2RlbCA9IFwiYWlcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ3JpZFNxdWFyZTIucGxheWVyID0gXCJwbGF5ZXIyXCI7XHJcbiAgICAgICAgZ3JpZFNxdWFyZTEucGxheWVyID0gXCJwbGF5ZXIxXCI7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tOZWlnaGJvcnMoc3F1YXJlKSB7XHJcbiAgICAgICAgLyogXHJcbiAgICAgICAgcmVxdWlyZXMgW1tudW1dW251bV1dIFxyXG4gICAgICAgIHNxdWFyZSA9IFtyb3dJZHgsIGNvbElkeF1cclxuICAgICAgICAqL1xyXG4gICAgICAgIGxldCBuZWlnaGJvcnMgPSBbXTtcclxuICAgICAgICBsZXQgY29sSWR4ID0gc3F1YXJlWzFdO1xyXG4gICAgICAgIGxldCByb3dJZHggID0gc3F1YXJlWzBdO1xyXG4gICAgICAgIChyb3dJZHggLSAxID49IDApID8gbmVpZ2hib3JzLnB1c2goW3Jvd0lkeCAtIDEsIGNvbElkeF0pIDogbmVpZ2hib3JzLnB1c2goWy0xLCAtMV0pOyAgLy8gbm9ydGhcclxuICAgICAgICAocm93SWR4ICsgMSA8PSA4KSA/IG5laWdoYm9ycy5wdXNoKFtyb3dJZHggKyAxLCBjb2xJZHhdKSA6IG5laWdoYm9ycy5wdXNoKFstMSwgLTFdKTsgIC8vIHNvdXRoXHJcbiAgICAgICAgKGNvbElkeCAtIDEgPj0gMCkgPyBuZWlnaGJvcnMucHVzaChbcm93SWR4LCBjb2xJZHggLSAxXSkgOiBuZWlnaGJvcnMucHVzaChbLTEsIC0xXSk7ICAvLyB3ZXN0XHJcbiAgICAgICAgKGNvbElkeCArIDEgPD0gOCkgPyBuZWlnaGJvcnMucHVzaChbcm93SWR4LCBjb2xJZHggKyAxXSkgOiBuZWlnaGJvcnMucHVzaChbLTEsIC0xXSk7ICAvLyBlYXN0XHJcbiAgICAgICAgcmV0dXJuIG5laWdoYm9ycztcclxuICAgIH1cclxuXHJcbiAgICBpc1dhbGxlZChkaXIsIHJvd0lkeCwgY29sSWR4KSB7XHJcbiAgICAgICAgLyogXHJcbiAgICAgICAgIHJldHVybnMgdHJ1ZSBpZiBwYXRoIGlzIGJsb2NrZWQgYnkgd2FsbFxyXG4gICAgICAgICByZXR1cm5zIGZhbHNlIGlmIHBhdGggaXMgZnJlZVxyXG4gICAgICAgICovXHJcbiAgICAgICBcclxuICAgICAgICBsZXQgc3F1YXJlID0gdGhpcy5ncmlkW3Jvd0lkeF1bY29sSWR4XTtcclxuICAgICAgICBpZihkaXIgPT09IFwidXBcIikge1xyXG4gICAgICAgICAgICBpZihzcXVhcmUud2FsbHMuTm9ydGgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChkaXIgPT09IFwicmlnaHRcIikge1xyXG4gICAgICAgICAgICBpZihzcXVhcmUud2FsbHMuRWFzdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGRpciA9PT0gXCJkb3duXCIpIHtcclxuICAgICAgICAgICAgaWYoc3F1YXJlLndhbGxzLlNvdXRoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZGlyID09PSBcImxlZnRcIikge1xyXG4gICAgICAgICAgICBpZihzcXVhcmUud2FsbHMuV2VzdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBiZnMocm9vdCwgZ29hbCA9IFtcIjAwXCIsXCIwMVwiLFwiMDJcIixcIjAzXCIsXCIwNFwiLFwiMDVcIixcIjA2XCIsXCIwN1wiLFwiMDhcIl0pIHtcclxuICAgICAgICAvKiBcclxuICAgICAgICByb290ID09PSBbcm93SWR4LCBjb2xJZHhdXHJcblxyXG4gICAgICAgIHRoaXMgZnVuY3Rpb24gaXMgc28gY3J1c3R5IFxyXG4gICAgICAgICovXHJcblxyXG5cclxuICAgICAgICBsZXQgaGFzaG1hcCA9IG5ldyBNYXAoKTsgXHJcbiAgICAgICAgbGV0IFEgPSBbXTsgLy9hcnJheSBvZiBbcm93LCBjb2xdXHJcbiAgICAgICAgbGV0IGRpc2NvdmVyZWQgPSBbXTsgLy9hcnJheSBvZiBpZFxyXG4gICAgICAgIGhhc2htYXAuc2V0KHJvb3QsIG51bGwpXHJcbiAgICAgICAgUS5wdXNoKHJvb3QpO1xyXG4gICAgICAgIGRpc2NvdmVyZWQucHVzaChyb290LmpvaW4oXCJcIikpO1xyXG4gICAgICAgIHdoaWxlIChRLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IHYgPSBRLnNoaWZ0KCk7IC8vIHBvc1xyXG4gICAgICAgICAgICBsZXQgaWQgPSB2LmpvaW4oXCJcIik7XHJcbiAgICAgICAgICAgIGxldCBzcXVhcmUgPSB0aGlzLmdyaWRbdlswXV1bdlsxXV07IC8vc3F1YXJlXHJcbiAgICAgICAgICAgIGlmIChnb2FsLmluY2x1ZGVzKGlkKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhdGggPSBbXTtcclxuICAgICAgICAgICAgICAgIHBhdGggPSB0aGlzLnRyYXZlcnNlSGFzaG1hcChoYXNobWFwLCB2LmpvaW4oXCJcIikpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFt2LmpvaW4oXCJcIiksIHBhdGhdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGZpbmRpbmcgYWxsIHBvc3NpYmxlIGRpcmVjdGlvbnNcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICgoIXNxdWFyZS53YWxscy5Ob3J0aCAmJiAocGFyc2VJbnQodlswXSkgPiAwKSkpe1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1YgPSB2LmpvaW4oXCJcIikuc3BsaXQoXCJcIik7XHJcbiAgICAgICAgICAgICAgICBuZXdWWzBdID0gcGFyc2VJbnQobmV3VlswXSkgLSAxO1xyXG4gICAgICAgICAgICAgICAgaWQgPSBuZXdWLmpvaW4oXCJcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRpc2NvdmVyZWQuaW5jbHVkZXMoaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzY292ZXJlZC5wdXNoKGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBRLnB1c2gobmV3Vik7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzaG1hcC5zZXQobmV3Vi5qb2luKFwiXCIpLCB2LmpvaW4oXCJcIikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgoIXNxdWFyZS53YWxscy5Tb3V0aCAmJiAocGFyc2VJbnQodlswXSkgPCA4KSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdWID0gdi5qb2luKFwiXCIpLnNwbGl0KFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgbmV3VlswXSA9IHBhcnNlSW50KG5ld1ZbMF0pICsgMTtcclxuICAgICAgICAgICAgICAgIGlkID0gbmV3Vi5qb2luKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkaXNjb3ZlcmVkLmluY2x1ZGVzKGlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2NvdmVyZWQucHVzaChpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgUS5wdXNoKG5ld1YpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc2htYXAuc2V0KG5ld1Yuam9pbihcIlwiKSwgdi5qb2luKFwiXCIpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoKCFzcXVhcmUud2FsbHMuRWFzdCAmJiAocGFyc2VJbnQodlsxXSkgPCA4KSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdWID0gdi5qb2luKFwiXCIpLnNwbGl0KFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgbmV3VlsxXSA9IHBhcnNlSW50KG5ld1ZbMV0pICsgMTtcclxuICAgICAgICAgICAgICAgIGlkID0gbmV3Vi5qb2luKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkaXNjb3ZlcmVkLmluY2x1ZGVzKGlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2NvdmVyZWQucHVzaChpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgUS5wdXNoKG5ld1YpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc2htYXAuc2V0KG5ld1Yuam9pbihcIlwiKSwgdi5qb2luKFwiXCIpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoKCFzcXVhcmUud2FsbHMuV2VzdCAmJiAocGFyc2VJbnQodlsxXSkgPiAwKSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdWID0gdi5qb2luKFwiXCIpLnNwbGl0KFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgbmV3VlsxXSA9IHBhcnNlSW50KG5ld1ZbMV0pIC0gMTtcclxuICAgICAgICAgICAgICAgIGlkID0gbmV3Vi5qb2luKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkaXNjb3ZlcmVkLmluY2x1ZGVzKGlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2NvdmVyZWQucHVzaChpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgUS5wdXNoKG5ld1YpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc2htYXAuc2V0KG5ld1Yuam9pbihcIlwiKSwgdi5qb2luKFwiXCIpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdHJhdmVyc2VIYXNobWFwKGhhc2gsIHN0YXJ0KSB7XHJcbiAgICAgICAgbGV0IG5vZGUgPSBoYXNoLmdldChzdGFydCk7XHJcbiAgICAgICAgbGV0IHBhdGggPSBbXTtcclxuICAgICAgICB3aGlsZSAobm9kZSkge1xyXG4gICAgICAgICAgICBwYXRoLnB1c2gobm9kZSlcclxuICAgICAgICAgICAgbm9kZSA9IGhhc2guZ2V0KG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGF0aC5yZXZlcnNlKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHN0YXRpYyBtYWtlR3JpZCh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgY29uc3QgZ3JpZCA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCByb3dJZHggPSAwOyByb3dJZHggPCBoZWlnaHQ7IHJvd0lkeCsrKSB7XHJcbiAgICAgICAgICAgIGdyaWQucHVzaChbXSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGNvbElkeCA9IDA7IGNvbElkeCA8IHdpZHRoOyBjb2xJZHgrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNxdWFyZSA9IG5ldyBTcXVhcmUoY29sSWR4ICwgcm93SWR4KVxyXG4gICAgICAgICAgICAgICAgZ3JpZFtyb3dJZHhdLnB1c2goc3F1YXJlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZ3JpZDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaXNWYWxpZFBvcyhjb2xJZHgsIHJvd0lkeCkge1xyXG4gICAgICAgIC8vIHZhbGlkYXRpb24gdG8gY2hlY2sgdGhlIGVuZHMgb2YgdGhlIGJvYXJkXHJcbiAgICAgICAgaWYgKChjb2xJZHggPCAwIHx8IHJvd0lkeCA8IDApIHx8IChjb2xJZHggPiA4IHx8IHJvd0lkeCA+IDgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGZhbHNlKSB7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCb2FyZDsiLCJjb25zdCBNb3ZlRXJyb3IgPSBmdW5jdGlvbiAobXNnKSB7IHRoaXMubXNnID0gbXNnOyB9O1xyXG5cclxuLy8gTW92ZUVycm9yIHJlYWxseSBzaG91bGQgYmUgYSBjaGlsZCBjbGFzcyBvZiB0aGUgYnVpbHQgaW4gRXJyb3Igb2JqZWN0IHByb3ZpZGVkXHJcbi8vIGJ5IEphdmFzY3JpcHQsIGJ1dCBzaW5jZSB3ZSBoYXZlbid0IGNvdmVyZWQgaW5oZXJpdGFuY2UgeWV0LCB3ZSdsbCBqdXN0XHJcbi8vIGxldCBpdCBiZSBhIHZhbmlsbGEgT2JqZWN0IGZvciBub3chXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1vdmVFcnJvcjsiLCJjbGFzcyBTcXVhcmUge1xyXG4gICAgY29uc3RydWN0b3IoY29sSWR4LCByb3dJZHgpIHtcclxuICAgICAgICB0aGlzLndhbGxzID0ge1xyXG4gICAgICAgICAgICBOb3J0aDogZmFsc2UsXHJcbiAgICAgICAgICAgIEVhc3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICBTb3V0aDogZmFsc2UsXHJcbiAgICAgICAgICAgIFdlc3Q6IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29sSWR4ID0gY29sSWR4O1xyXG4gICAgICAgIHRoaXMucm93SWR4ID0gcm93SWR4OyBcclxuICAgICAgICB0aGlzLnBsYXllciA9IFwiZW1wdHlcIjtcclxuICAgICAgICB0aGlzLm1vZGVsID0gXCJub29uZVwiXHJcbiAgICB9XHJcblxyXG4gICAgLy8gZ2V0Tm9ydGgoKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMud2FsbHMuTm9ydGg7XHJcbiAgICAvLyB9XHJcbiAgICAvLyBnZXRFYXN0KCkge1xyXG4gICAgLy8gICAgIHJldHVybiB0aGlzLndhbGxzLkVhc3Q7XHJcbiAgICAvLyB9XHJcbiAgICAvLyBnZXRTb3V0aCgpIHtcclxuICAgIC8vICAgICByZXR1cm4gdGhpcy53YWxscy5Tb3V0aDtcclxuICAgIC8vIH1cclxuICAgIC8vIGdldFdlc3QoKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMud2FsbHMuV2VzdDtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBzZXROb3J0aChib29sKSB7XHJcbiAgICAvLyAgICAgYm9vbCA/IHRoaXMud2FsbHMuTm9ydGggPSBib29sIDogdGhpcy53YWxscy5Ob3J0aCA9ICFib29sO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gc2V0RWFzdChib29sKSB7XHJcbiAgICAvLyAgICAgYm9vbCA/IHRoaXMud2FsbHMuRWFzdCA9IGJvb2wgOiB0aGlzLndhbGxzLkVhc3QgPSAhYm9vbDtcclxuICAgIC8vIH1cclxuICAgIC8vIHNldFNvdXRoKGJvb2wpIHtcclxuICAgIC8vICAgICBib29sID8gdGhpcy53YWxscy5Tb3V0aCA9IGJvb2wgOiB0aGlzLndhbGxzLlNvdXRoID0gIWJvb2w7XHJcbiAgICAvLyB9XHJcbiAgICAvLyBzZXRXZXN0KGJvb2wpIHtcclxuICAgIC8vICAgICBib29sID8gdGhpcy53YWxscy5XZXN0ID0gYm9vbCA6IHRoaXMud2FsbHMuV2VzdCA9ICFib29sO1xyXG4gICAgLy8gfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNxdWFyZTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2JvYXJkLmpzXCIpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==