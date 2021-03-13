/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Board)
/* harmony export */ });
/* harmony import */ var _square__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./square */ "./src/square.js");


class Board {
    constructor(p1, p2) {
        this.width = 9;
        this.height = 9;
        this.p1 = p1;
        this.p2 = p2
        this.grid = Board.makeGrid(this.width, this.height);
        this.winner = false;
        this.util;
    }

    setPlayers(player1, p1Pos, player2, p2Pos) {
        this.util.trackFunctions("setPlayers");
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
        gridSquare2.player = this.p2;
        gridSquare1.player = this.p1;
    }

    checkNeighbors(square) {
        this.util.trackFunctions("checkNeighbors");
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
        return this.checkCrossWall(neighbors);
    }

    checkCrossWall(neighbors) {
        return neighbors;
    }

    isWalled(dir, rowIdx, colIdx) {
        this.util.trackFunctions("isWalled");
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
        this.util.trackFunctions("bfs");
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
        this.util.trackFunctions("traverseHashmap");
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9xdW9yaWRvci8uL3NyYy9zcXVhcmUuanMiLCJ3ZWJwYWNrOi8vcXVvcmlkb3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcXVvcmlkb3Ivd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3F1b3JpZG9yL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcXVvcmlkb3Ivd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9xdW9yaWRvci8uL3NyYy9ib2FyZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEM7Ozs7OztVQ2RBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7O0FDTjhCOztBQUVmO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEZBQTRGO0FBQzVGLDRGQUE0RjtBQUM1Riw0RkFBNEY7QUFDNUYsNEZBQTRGO0FBQzVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBLGdDO0FBQ0EsbUJBQW1CO0FBQ25CLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQSw0QkFBNEIsaUJBQWlCO0FBQzdDO0FBQ0EsZ0NBQWdDLGdCQUFnQjtBQUNoRCxpQ0FBaUMsNENBQU07QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsVUFBVSxLQUFLLEVBQUUsRUFDakI7QUFDVDtBQUNBO0FBQ0E7O0FBRUEiLCJmaWxlIjoiYm9hcmQuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3F1YXJlIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbElkeCwgcm93SWR4KSB7XHJcbiAgICAgICAgdGhpcy53YWxscyA9IHtcclxuICAgICAgICAgICAgTm9ydGg6IGZhbHNlLFxyXG4gICAgICAgICAgICBFYXN0OiBmYWxzZSxcclxuICAgICAgICAgICAgU291dGg6IGZhbHNlLFxyXG4gICAgICAgICAgICBXZXN0OiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbElkeCA9IGNvbElkeDtcclxuICAgICAgICB0aGlzLnJvd0lkeCA9IHJvd0lkeDsgXHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBcImVtcHR5XCI7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IFwibm9vbmVcIlxyXG4gICAgfVxyXG5cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFNxdWFyZSBmcm9tIFwiLi9zcXVhcmVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXJkIHtcclxuICAgIGNvbnN0cnVjdG9yKHAxLCBwMikge1xyXG4gICAgICAgIHRoaXMud2lkdGggPSA5O1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gOTtcclxuICAgICAgICB0aGlzLnAxID0gcDE7XHJcbiAgICAgICAgdGhpcy5wMiA9IHAyXHJcbiAgICAgICAgdGhpcy5ncmlkID0gQm9hcmQubWFrZUdyaWQodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgICAgIHRoaXMud2lubmVyID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy51dGlsO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBsYXllcnMocGxheWVyMSwgcDFQb3MsIHBsYXllcjIsIHAyUG9zKSB7XHJcbiAgICAgICAgdGhpcy51dGlsLnRyYWNrRnVuY3Rpb25zKFwic2V0UGxheWVyc1wiKTtcclxuICAgICAgICAvKiBwMVBvcyAmIHAyUG9zID0gW3JvdywgY29sXSAqL1xyXG4gICAgICAgIGxldCBncmlkU3F1YXJlMiA9IHRoaXMuZ3JpZFtwMlBvc1swXV1bcDJQb3NbMV1dO1xyXG4gICAgICAgIGxldCBncmlkU3F1YXJlMSA9IHRoaXMuZ3JpZFtwMVBvc1swXV1bcDFQb3NbMV1dO1xyXG4gICAgICAgIGlmKCEhcGxheWVyMikge1xyXG4gICAgICAgICAgICBncmlkU3F1YXJlMi5tb2RlbCA9IFwicGVyc29uXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ3JpZFNxdWFyZTIubW9kZWwgPSBcImFpXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCEhcGxheWVyMSkge1xyXG4gICAgICAgICAgICBncmlkU3F1YXJlMS5tb2RlbCA9IFwicGVyc29uXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ3JpZFNxdWFyZTEubW9kZWwgPSBcImFpXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdyaWRTcXVhcmUyLnBsYXllciA9IHRoaXMucDI7XHJcbiAgICAgICAgZ3JpZFNxdWFyZTEucGxheWVyID0gdGhpcy5wMTtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja05laWdoYm9ycyhzcXVhcmUpIHtcclxuICAgICAgICB0aGlzLnV0aWwudHJhY2tGdW5jdGlvbnMoXCJjaGVja05laWdoYm9yc1wiKTtcclxuICAgICAgICAvKiBcclxuICAgICAgICByZXF1aXJlcyBbW251bV1bbnVtXV0gXHJcbiAgICAgICAgc3F1YXJlID0gW3Jvd0lkeCwgY29sSWR4XVxyXG4gICAgICAgICovXHJcbiAgICAgICAgbGV0IG5laWdoYm9ycyA9IFtdO1xyXG4gICAgICAgIGxldCBjb2xJZHggPSBzcXVhcmVbMV07XHJcbiAgICAgICAgbGV0IHJvd0lkeCAgPSBzcXVhcmVbMF07XHJcbiAgICAgICAgKHJvd0lkeCAtIDEgPj0gMCkgPyBuZWlnaGJvcnMucHVzaChbcm93SWR4IC0gMSwgY29sSWR4XSkgOiBuZWlnaGJvcnMucHVzaChbLTEsIC0xXSk7ICAvLyBub3J0aFxyXG4gICAgICAgIChyb3dJZHggKyAxIDw9IDgpID8gbmVpZ2hib3JzLnB1c2goW3Jvd0lkeCArIDEsIGNvbElkeF0pIDogbmVpZ2hib3JzLnB1c2goWy0xLCAtMV0pOyAgLy8gc291dGhcclxuICAgICAgICAoY29sSWR4IC0gMSA+PSAwKSA/IG5laWdoYm9ycy5wdXNoKFtyb3dJZHgsIGNvbElkeCAtIDFdKSA6IG5laWdoYm9ycy5wdXNoKFstMSwgLTFdKTsgIC8vIHdlc3RcclxuICAgICAgICAoY29sSWR4ICsgMSA8PSA4KSA/IG5laWdoYm9ycy5wdXNoKFtyb3dJZHgsIGNvbElkeCArIDFdKSA6IG5laWdoYm9ycy5wdXNoKFstMSwgLTFdKTsgIC8vIGVhc3RcclxuICAgICAgICByZXR1cm4gdGhpcy5jaGVja0Nyb3NzV2FsbChuZWlnaGJvcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrQ3Jvc3NXYWxsKG5laWdoYm9ycykge1xyXG4gICAgICAgIHJldHVybiBuZWlnaGJvcnM7XHJcbiAgICB9XHJcblxyXG4gICAgaXNXYWxsZWQoZGlyLCByb3dJZHgsIGNvbElkeCkge1xyXG4gICAgICAgIHRoaXMudXRpbC50cmFja0Z1bmN0aW9ucyhcImlzV2FsbGVkXCIpO1xyXG4gICAgICAgIC8qIFxyXG4gICAgICAgICByZXR1cm5zIHRydWUgaWYgcGF0aCBpcyBibG9ja2VkIGJ5IHdhbGxcclxuICAgICAgICAgcmV0dXJucyBmYWxzZSBpZiBwYXRoIGlzIGZyZWVcclxuICAgICAgICAqL1xyXG4gICAgICAgXHJcbiAgICAgICAgbGV0IHNxdWFyZSA9IHRoaXMuZ3JpZFtyb3dJZHhdW2NvbElkeF07XHJcbiAgICAgICAgaWYoZGlyID09PSBcInVwXCIpIHtcclxuICAgICAgICAgICAgaWYoc3F1YXJlLndhbGxzLk5vcnRoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZGlyID09PSBcInJpZ2h0XCIpIHtcclxuICAgICAgICAgICAgaWYoc3F1YXJlLndhbGxzLkVhc3QpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChkaXIgPT09IFwiZG93blwiKSB7XHJcbiAgICAgICAgICAgIGlmKHNxdWFyZS53YWxscy5Tb3V0aCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGRpciA9PT0gXCJsZWZ0XCIpIHtcclxuICAgICAgICAgICAgaWYoc3F1YXJlLndhbGxzLldlc3QpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgYmZzKHJvb3QsIGdvYWwgPSBbXCIwMFwiLFwiMDFcIixcIjAyXCIsXCIwM1wiLFwiMDRcIixcIjA1XCIsXCIwNlwiLFwiMDdcIixcIjA4XCJdKSB7XHJcbiAgICAgICAgdGhpcy51dGlsLnRyYWNrRnVuY3Rpb25zKFwiYmZzXCIpO1xyXG4gICAgICAgIC8qIFxyXG4gICAgICAgIHJvb3QgPT09IFtyb3dJZHgsIGNvbElkeF1cclxuXHJcbiAgICAgICAgdGhpcyBmdW5jdGlvbiBpcyBzbyBjcnVzdHkgXHJcbiAgICAgICAgKi9cclxuXHJcblxyXG4gICAgICAgIGxldCBoYXNobWFwID0gbmV3IE1hcCgpOyBcclxuICAgICAgICBsZXQgUSA9IFtdOyAvL2FycmF5IG9mIFtyb3csIGNvbF1cclxuICAgICAgICBsZXQgZGlzY292ZXJlZCA9IFtdOyAvL2FycmF5IG9mIGlkXHJcbiAgICAgICAgaGFzaG1hcC5zZXQocm9vdCwgbnVsbClcclxuICAgICAgICBRLnB1c2gocm9vdCk7XHJcbiAgICAgICAgZGlzY292ZXJlZC5wdXNoKHJvb3Quam9pbihcIlwiKSk7XHJcbiAgICAgICAgd2hpbGUgKFEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgdiA9IFEuc2hpZnQoKTsgLy8gcG9zXHJcbiAgICAgICAgICAgIGxldCBpZCA9IHYuam9pbihcIlwiKTtcclxuICAgICAgICAgICAgbGV0IHNxdWFyZSA9IHRoaXMuZ3JpZFt2WzBdXVt2WzFdXTsgLy9zcXVhcmVcclxuICAgICAgICAgICAgaWYgKGdvYWwuaW5jbHVkZXMoaWQpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGF0aCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgcGF0aCA9IHRoaXMudHJhdmVyc2VIYXNobWFwKGhhc2htYXAsIHYuam9pbihcIlwiKSk7XHJcbiAgICAgICAgICAgICAgICBwYXRoLnB1c2godi5qb2luKFwiXCIpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbdi5qb2luKFwiXCIpLCBwYXRoXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBmaW5kaW5nIGFsbCBwb3NzaWJsZSBkaXJlY3Rpb25zXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoKCFzcXVhcmUud2FsbHMuTm9ydGggJiYgKHBhcnNlSW50KHZbMF0pID4gMCkpKXtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdWID0gdi5qb2luKFwiXCIpLnNwbGl0KFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgbmV3VlswXSA9IHBhcnNlSW50KG5ld1ZbMF0pIC0gMTtcclxuICAgICAgICAgICAgICAgIGlkID0gbmV3Vi5qb2luKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkaXNjb3ZlcmVkLmluY2x1ZGVzKGlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2NvdmVyZWQucHVzaChpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgUS5wdXNoKG5ld1YpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc2htYXAuc2V0KG5ld1Yuam9pbihcIlwiKSwgdi5qb2luKFwiXCIpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoKCFzcXVhcmUud2FsbHMuU291dGggJiYgKHBhcnNlSW50KHZbMF0pIDwgOCkpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3ViA9IHYuam9pbihcIlwiKS5zcGxpdChcIlwiKTtcclxuICAgICAgICAgICAgICAgIG5ld1ZbMF0gPSBwYXJzZUludChuZXdWWzBdKSArIDE7XHJcbiAgICAgICAgICAgICAgICBpZCA9IG5ld1Yuam9pbihcIlwiKTtcclxuICAgICAgICAgICAgICAgIGlmICghZGlzY292ZXJlZC5pbmNsdWRlcyhpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNjb3ZlcmVkLnB1c2goaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIFEucHVzaChuZXdWKTtcclxuICAgICAgICAgICAgICAgICAgICBoYXNobWFwLnNldChuZXdWLmpvaW4oXCJcIiksIHYuam9pbihcIlwiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCghc3F1YXJlLndhbGxzLkVhc3QgJiYgKHBhcnNlSW50KHZbMV0pIDwgOCkpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3ViA9IHYuam9pbihcIlwiKS5zcGxpdChcIlwiKTtcclxuICAgICAgICAgICAgICAgIG5ld1ZbMV0gPSBwYXJzZUludChuZXdWWzFdKSArIDE7XHJcbiAgICAgICAgICAgICAgICBpZCA9IG5ld1Yuam9pbihcIlwiKTtcclxuICAgICAgICAgICAgICAgIGlmICghZGlzY292ZXJlZC5pbmNsdWRlcyhpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNjb3ZlcmVkLnB1c2goaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIFEucHVzaChuZXdWKTtcclxuICAgICAgICAgICAgICAgICAgICBoYXNobWFwLnNldChuZXdWLmpvaW4oXCJcIiksIHYuam9pbihcIlwiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCghc3F1YXJlLndhbGxzLldlc3QgJiYgKHBhcnNlSW50KHZbMV0pID4gMCkpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3ViA9IHYuam9pbihcIlwiKS5zcGxpdChcIlwiKTtcclxuICAgICAgICAgICAgICAgIG5ld1ZbMV0gPSBwYXJzZUludChuZXdWWzFdKSAtIDE7XHJcbiAgICAgICAgICAgICAgICBpZCA9IG5ld1Yuam9pbihcIlwiKTtcclxuICAgICAgICAgICAgICAgIGlmICghZGlzY292ZXJlZC5pbmNsdWRlcyhpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNjb3ZlcmVkLnB1c2goaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIFEucHVzaChuZXdWKTtcclxuICAgICAgICAgICAgICAgICAgICBoYXNobWFwLnNldChuZXdWLmpvaW4oXCJcIiksIHYuam9pbihcIlwiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHRyYXZlcnNlSGFzaG1hcChoYXNoLCBzdGFydCkge1xyXG4gICAgICAgIHRoaXMudXRpbC50cmFja0Z1bmN0aW9ucyhcInRyYXZlcnNlSGFzaG1hcFwiKTtcclxuICAgICAgICBsZXQgbm9kZSA9IGhhc2guZ2V0KHN0YXJ0KTtcclxuICAgICAgICBsZXQgcGF0aCA9IFtdO1xyXG4gICAgICAgIHdoaWxlIChub2RlKSB7XHJcbiAgICAgICAgICAgIHBhdGgucHVzaChub2RlKVxyXG4gICAgICAgICAgICBub2RlID0gaGFzaC5nZXQobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwYXRoLnJldmVyc2UoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgc3RhdGljIG1ha2VHcmlkKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICBjb25zdCBncmlkID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IHJvd0lkeCA9IDA7IHJvd0lkeCA8IGhlaWdodDsgcm93SWR4KyspIHtcclxuICAgICAgICAgICAgZ3JpZC5wdXNoKFtdKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgY29sSWR4ID0gMDsgY29sSWR4IDwgd2lkdGg7IGNvbElkeCsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3F1YXJlID0gbmV3IFNxdWFyZShjb2xJZHggLCByb3dJZHgpXHJcbiAgICAgICAgICAgICAgICBncmlkW3Jvd0lkeF0ucHVzaChzcXVhcmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBncmlkO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBpc1ZhbGlkUG9zKGNvbElkeCwgcm93SWR4KSB7XHJcbiAgICAgICAgLy8gdmFsaWRhdGlvbiB0byBjaGVjayB0aGUgZW5kcyBvZiB0aGUgYm9hcmRcclxuICAgICAgICBpZiAoKGNvbElkeCA8IDAgfHwgcm93SWR4IDwgMCkgfHwgKGNvbElkeCA+IDggfHwgcm93SWR4ID4gOCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZmFsc2UpIHtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=