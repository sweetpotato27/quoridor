/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Board)
/* harmony export */ });
/* harmony import */ var _square__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./square */ "./src/square.js");


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
                let square = new _square__WEBPACK_IMPORTED_MODULE_0__.default(colIdx , rowIdx)
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


/***/ }),

/***/ "./src/square.js":
/*!***********************!*\
  !*** ./src/square.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Square)
/* harmony export */ });
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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/board.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9xdW9yaWRvci8uL3NyYy9ib2FyZC5qcyIsIndlYnBhY2s6Ly9xdW9yaWRvci8uL3NyYy9zcXVhcmUuanMiLCJ3ZWJwYWNrOi8vcXVvcmlkb3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcXVvcmlkb3Ivd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3F1b3JpZG9yL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcXVvcmlkb3Ivd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9xdW9yaWRvci93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQThCOztBQUVmO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0RkFBNEY7QUFDNUYsNEZBQTRGO0FBQzVGLDRGQUE0RjtBQUM1Riw0RkFBNEY7QUFDNUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBLGdDO0FBQ0EsbUJBQW1CO0FBQ25CLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUEsNEJBQTRCLGlCQUFpQjtBQUM3QztBQUNBLGdDQUFnQyxnQkFBZ0I7QUFDaEQsaUNBQWlDLDRDQUFNO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLFVBQVUsS0FBSyxFQUFFLEVBQ2pCO0FBQ1Q7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7QUNqTGU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7OztVQ3ZDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7O1VDTkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiYm9hcmQuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNxdWFyZSBmcm9tIFwiLi9zcXVhcmVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXJkIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMud2lkdGggPSA5O1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gOTtcclxuICAgICAgICB0aGlzLmdyaWQgPSBCb2FyZC5tYWtlR3JpZCh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICAgICAgdGhpcy53aW5uZXIgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQbGF5ZXJzKHBsYXllcjEsIHAxUG9zLCBwbGF5ZXIyLCBwMlBvcykge1xyXG4gICAgICAgIC8qIHAxUG9zICYgcDJQb3MgPSBbcm93LCBjb2xdICovXHJcbiAgICAgICAgbGV0IGdyaWRTcXVhcmUyID0gdGhpcy5ncmlkW3AyUG9zWzBdXVtwMlBvc1sxXV07XHJcbiAgICAgICAgbGV0IGdyaWRTcXVhcmUxID0gdGhpcy5ncmlkW3AxUG9zWzBdXVtwMVBvc1sxXV07XHJcbiAgICAgICAgaWYoISFwbGF5ZXIyKSB7XHJcbiAgICAgICAgICAgIGdyaWRTcXVhcmUyLm1vZGVsID0gXCJwZXJzb25cIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBncmlkU3F1YXJlMi5tb2RlbCA9IFwiYWlcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoISFwbGF5ZXIxKSB7XHJcbiAgICAgICAgICAgIGdyaWRTcXVhcmUxLm1vZGVsID0gXCJwZXJzb25cIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBncmlkU3F1YXJlMS5tb2RlbCA9IFwiYWlcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ3JpZFNxdWFyZTIucGxheWVyID0gXCJwbGF5ZXIyXCI7XHJcbiAgICAgICAgZ3JpZFNxdWFyZTEucGxheWVyID0gXCJwbGF5ZXIxXCI7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tOZWlnaGJvcnMoc3F1YXJlKSB7XHJcbiAgICAgICAgLyogXHJcbiAgICAgICAgcmVxdWlyZXMgW1tudW1dW251bV1dIFxyXG4gICAgICAgIHNxdWFyZSA9IFtyb3dJZHgsIGNvbElkeF1cclxuICAgICAgICAqL1xyXG4gICAgICAgIGxldCBuZWlnaGJvcnMgPSBbXTtcclxuICAgICAgICBsZXQgY29sSWR4ID0gc3F1YXJlWzFdO1xyXG4gICAgICAgIGxldCByb3dJZHggID0gc3F1YXJlWzBdO1xyXG4gICAgICAgIChyb3dJZHggLSAxID49IDApID8gbmVpZ2hib3JzLnB1c2goW3Jvd0lkeCAtIDEsIGNvbElkeF0pIDogbmVpZ2hib3JzLnB1c2goWy0xLCAtMV0pOyAgLy8gbm9ydGhcclxuICAgICAgICAocm93SWR4ICsgMSA8PSA4KSA/IG5laWdoYm9ycy5wdXNoKFtyb3dJZHggKyAxLCBjb2xJZHhdKSA6IG5laWdoYm9ycy5wdXNoKFstMSwgLTFdKTsgIC8vIHNvdXRoXHJcbiAgICAgICAgKGNvbElkeCAtIDEgPj0gMCkgPyBuZWlnaGJvcnMucHVzaChbcm93SWR4LCBjb2xJZHggLSAxXSkgOiBuZWlnaGJvcnMucHVzaChbLTEsIC0xXSk7ICAvLyB3ZXN0XHJcbiAgICAgICAgKGNvbElkeCArIDEgPD0gOCkgPyBuZWlnaGJvcnMucHVzaChbcm93SWR4LCBjb2xJZHggKyAxXSkgOiBuZWlnaGJvcnMucHVzaChbLTEsIC0xXSk7ICAvLyBlYXN0XHJcbiAgICAgICAgcmV0dXJuIG5laWdoYm9ycztcclxuICAgIH1cclxuXHJcbiAgICBpc1dhbGxlZChkaXIsIHJvd0lkeCwgY29sSWR4KSB7XHJcbiAgICAgICAgLyogXHJcbiAgICAgICAgIHJldHVybnMgdHJ1ZSBpZiBwYXRoIGlzIGJsb2NrZWQgYnkgd2FsbFxyXG4gICAgICAgICByZXR1cm5zIGZhbHNlIGlmIHBhdGggaXMgZnJlZVxyXG4gICAgICAgICovXHJcbiAgICAgICBcclxuICAgICAgICBsZXQgc3F1YXJlID0gdGhpcy5ncmlkW3Jvd0lkeF1bY29sSWR4XTtcclxuICAgICAgICBpZihkaXIgPT09IFwidXBcIikge1xyXG4gICAgICAgICAgICBpZihzcXVhcmUud2FsbHMuTm9ydGgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChkaXIgPT09IFwicmlnaHRcIikge1xyXG4gICAgICAgICAgICBpZihzcXVhcmUud2FsbHMuRWFzdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGRpciA9PT0gXCJkb3duXCIpIHtcclxuICAgICAgICAgICAgaWYoc3F1YXJlLndhbGxzLlNvdXRoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZGlyID09PSBcImxlZnRcIikge1xyXG4gICAgICAgICAgICBpZihzcXVhcmUud2FsbHMuV2VzdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBiZnMocm9vdCwgZ29hbCA9IFtcIjAwXCIsXCIwMVwiLFwiMDJcIixcIjAzXCIsXCIwNFwiLFwiMDVcIixcIjA2XCIsXCIwN1wiLFwiMDhcIl0pIHtcclxuICAgICAgICAvKiBcclxuICAgICAgICByb290ID09PSBbcm93SWR4LCBjb2xJZHhdXHJcblxyXG4gICAgICAgIHRoaXMgZnVuY3Rpb24gaXMgc28gY3J1c3R5IFxyXG4gICAgICAgICovXHJcblxyXG5cclxuICAgICAgICBsZXQgaGFzaG1hcCA9IG5ldyBNYXAoKTsgXHJcbiAgICAgICAgbGV0IFEgPSBbXTsgLy9hcnJheSBvZiBbcm93LCBjb2xdXHJcbiAgICAgICAgbGV0IGRpc2NvdmVyZWQgPSBbXTsgLy9hcnJheSBvZiBpZFxyXG4gICAgICAgIGhhc2htYXAuc2V0KHJvb3QsIG51bGwpXHJcbiAgICAgICAgUS5wdXNoKHJvb3QpO1xyXG4gICAgICAgIGRpc2NvdmVyZWQucHVzaChyb290LmpvaW4oXCJcIikpO1xyXG4gICAgICAgIHdoaWxlIChRLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IHYgPSBRLnNoaWZ0KCk7IC8vIHBvc1xyXG4gICAgICAgICAgICBsZXQgaWQgPSB2LmpvaW4oXCJcIik7XHJcbiAgICAgICAgICAgIGxldCBzcXVhcmUgPSB0aGlzLmdyaWRbdlswXV1bdlsxXV07IC8vc3F1YXJlXHJcbiAgICAgICAgICAgIGlmIChnb2FsLmluY2x1ZGVzKGlkKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhdGggPSBbXTtcclxuICAgICAgICAgICAgICAgIHBhdGggPSB0aGlzLnRyYXZlcnNlSGFzaG1hcChoYXNobWFwLCB2LmpvaW4oXCJcIikpO1xyXG4gICAgICAgICAgICAgICAgcGF0aC5wdXNoKHYuam9pbihcIlwiKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW3Yuam9pbihcIlwiKSwgcGF0aF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gZmluZGluZyBhbGwgcG9zc2libGUgZGlyZWN0aW9uc1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKCghc3F1YXJlLndhbGxzLk5vcnRoICYmIChwYXJzZUludCh2WzBdKSA+IDApKSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3ViA9IHYuam9pbihcIlwiKS5zcGxpdChcIlwiKTtcclxuICAgICAgICAgICAgICAgIG5ld1ZbMF0gPSBwYXJzZUludChuZXdWWzBdKSAtIDE7XHJcbiAgICAgICAgICAgICAgICBpZCA9IG5ld1Yuam9pbihcIlwiKTtcclxuICAgICAgICAgICAgICAgIGlmICghZGlzY292ZXJlZC5pbmNsdWRlcyhpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNjb3ZlcmVkLnB1c2goaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIFEucHVzaChuZXdWKTtcclxuICAgICAgICAgICAgICAgICAgICBoYXNobWFwLnNldChuZXdWLmpvaW4oXCJcIiksIHYuam9pbihcIlwiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCghc3F1YXJlLndhbGxzLlNvdXRoICYmIChwYXJzZUludCh2WzBdKSA8IDgpKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1YgPSB2LmpvaW4oXCJcIikuc3BsaXQoXCJcIik7XHJcbiAgICAgICAgICAgICAgICBuZXdWWzBdID0gcGFyc2VJbnQobmV3VlswXSkgKyAxO1xyXG4gICAgICAgICAgICAgICAgaWQgPSBuZXdWLmpvaW4oXCJcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRpc2NvdmVyZWQuaW5jbHVkZXMoaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzY292ZXJlZC5wdXNoKGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBRLnB1c2gobmV3Vik7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzaG1hcC5zZXQobmV3Vi5qb2luKFwiXCIpLCB2LmpvaW4oXCJcIikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgoIXNxdWFyZS53YWxscy5FYXN0ICYmIChwYXJzZUludCh2WzFdKSA8IDgpKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1YgPSB2LmpvaW4oXCJcIikuc3BsaXQoXCJcIik7XHJcbiAgICAgICAgICAgICAgICBuZXdWWzFdID0gcGFyc2VJbnQobmV3VlsxXSkgKyAxO1xyXG4gICAgICAgICAgICAgICAgaWQgPSBuZXdWLmpvaW4oXCJcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRpc2NvdmVyZWQuaW5jbHVkZXMoaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzY292ZXJlZC5wdXNoKGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBRLnB1c2gobmV3Vik7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzaG1hcC5zZXQobmV3Vi5qb2luKFwiXCIpLCB2LmpvaW4oXCJcIikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgoIXNxdWFyZS53YWxscy5XZXN0ICYmIChwYXJzZUludCh2WzFdKSA+IDApKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1YgPSB2LmpvaW4oXCJcIikuc3BsaXQoXCJcIik7XHJcbiAgICAgICAgICAgICAgICBuZXdWWzFdID0gcGFyc2VJbnQobmV3VlsxXSkgLSAxO1xyXG4gICAgICAgICAgICAgICAgaWQgPSBuZXdWLmpvaW4oXCJcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRpc2NvdmVyZWQuaW5jbHVkZXMoaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzY292ZXJlZC5wdXNoKGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBRLnB1c2gobmV3Vik7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzaG1hcC5zZXQobmV3Vi5qb2luKFwiXCIpLCB2LmpvaW4oXCJcIikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB0cmF2ZXJzZUhhc2htYXAoaGFzaCwgc3RhcnQpIHtcclxuICAgICAgICBsZXQgbm9kZSA9IGhhc2guZ2V0KHN0YXJ0KTtcclxuICAgICAgICBsZXQgcGF0aCA9IFtdO1xyXG4gICAgICAgIHdoaWxlIChub2RlKSB7XHJcbiAgICAgICAgICAgIHBhdGgucHVzaChub2RlKVxyXG4gICAgICAgICAgICBub2RlID0gaGFzaC5nZXQobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwYXRoLnJldmVyc2UoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgc3RhdGljIG1ha2VHcmlkKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICBjb25zdCBncmlkID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IHJvd0lkeCA9IDA7IHJvd0lkeCA8IGhlaWdodDsgcm93SWR4KyspIHtcclxuICAgICAgICAgICAgZ3JpZC5wdXNoKFtdKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgY29sSWR4ID0gMDsgY29sSWR4IDwgd2lkdGg7IGNvbElkeCsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3F1YXJlID0gbmV3IFNxdWFyZShjb2xJZHggLCByb3dJZHgpXHJcbiAgICAgICAgICAgICAgICBncmlkW3Jvd0lkeF0ucHVzaChzcXVhcmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBncmlkO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBpc1ZhbGlkUG9zKGNvbElkeCwgcm93SWR4KSB7XHJcbiAgICAgICAgLy8gdmFsaWRhdGlvbiB0byBjaGVjayB0aGUgZW5kcyBvZiB0aGUgYm9hcmRcclxuICAgICAgICBpZiAoKGNvbElkeCA8IDAgfHwgcm93SWR4IDwgMCkgfHwgKGNvbElkeCA+IDggfHwgcm93SWR4ID4gOCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZmFsc2UpIHtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNxdWFyZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb2xJZHgsIHJvd0lkeCkge1xyXG4gICAgICAgIHRoaXMud2FsbHMgPSB7XHJcbiAgICAgICAgICAgIE5vcnRoOiBmYWxzZSxcclxuICAgICAgICAgICAgRWFzdDogZmFsc2UsXHJcbiAgICAgICAgICAgIFNvdXRoOiBmYWxzZSxcclxuICAgICAgICAgICAgV2VzdDogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb2xJZHggPSBjb2xJZHg7XHJcbiAgICAgICAgdGhpcy5yb3dJZHggPSByb3dJZHg7IFxyXG4gICAgICAgIHRoaXMucGxheWVyID0gXCJlbXB0eVwiO1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSBcIm5vb25lXCJcclxuICAgIH1cclxuXHJcbiAgICAvLyBnZXROb3J0aCgpIHtcclxuICAgIC8vICAgICByZXR1cm4gdGhpcy53YWxscy5Ob3J0aDtcclxuICAgIC8vIH1cclxuICAgIC8vIGdldEVhc3QoKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMud2FsbHMuRWFzdDtcclxuICAgIC8vIH1cclxuICAgIC8vIGdldFNvdXRoKCkge1xyXG4gICAgLy8gICAgIHJldHVybiB0aGlzLndhbGxzLlNvdXRoO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gZ2V0V2VzdCgpIHtcclxuICAgIC8vICAgICByZXR1cm4gdGhpcy53YWxscy5XZXN0O1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHNldE5vcnRoKGJvb2wpIHtcclxuICAgIC8vICAgICBib29sID8gdGhpcy53YWxscy5Ob3J0aCA9IGJvb2wgOiB0aGlzLndhbGxzLk5vcnRoID0gIWJvb2w7XHJcbiAgICAvLyB9XHJcbiAgICAvLyBzZXRFYXN0KGJvb2wpIHtcclxuICAgIC8vICAgICBib29sID8gdGhpcy53YWxscy5FYXN0ID0gYm9vbCA6IHRoaXMud2FsbHMuRWFzdCA9ICFib29sO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gc2V0U291dGgoYm9vbCkge1xyXG4gICAgLy8gICAgIGJvb2wgPyB0aGlzLndhbGxzLlNvdXRoID0gYm9vbCA6IHRoaXMud2FsbHMuU291dGggPSAhYm9vbDtcclxuICAgIC8vIH1cclxuICAgIC8vIHNldFdlc3QoYm9vbCkge1xyXG4gICAgLy8gICAgIGJvb2wgPyB0aGlzLndhbGxzLldlc3QgPSBib29sIDogdGhpcy53YWxscy5XZXN0ID0gIWJvb2w7XHJcbiAgICAvLyB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2JvYXJkLmpzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnZXhwb3J0cycgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==