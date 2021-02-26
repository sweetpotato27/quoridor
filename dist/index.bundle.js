/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\r\n\r\n/* http://meyerweb.com/eric/tools/css/reset/ \r\n   v2.0 | 20110126\r\n   License: none (public domain)\r\n*/\r\n\r\nhtml, body, div, span, applet, object, iframe,\r\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\r\na, abbr, acronym, address, big, cite, code,\r\ndel, dfn, em, img, ins, kbd, q, s, samp,\r\nsmall, strike, strong, sub, sup, tt, var,\r\nb, u, i, center,\r\ndl, dt, dd, ol, ul, li,\r\nfieldset, form, label, legend,\r\ntable, caption, tbody, tfoot, thead, tr, th, td,\r\narticle, aside, canvas, details, embed, \r\nfigure, figcaption, footer, header, hgroup, \r\nmenu, nav, output, ruby, section, summary,\r\ntime, mark, audio, video {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n\tborder: 0;\r\n\tfont-size: 100%;\r\n\tfont: inherit;\r\n\tvertical-align: baseline;\r\n}\r\n/* HTML5 display-role reset for older browsers */\r\narticle, aside, details, figcaption, figure, \r\nfooter, header, hgroup, menu, nav, section {\r\n\tdisplay: block;\r\n}\r\n\r\nhtml {\r\n\tbackground: #4D618B;\r\n}\r\n\r\nbody {\r\n\tline-height: 1;\r\n\tdisplay: flex;\r\n\tjustify-content: center;\r\n}\r\nol, ul {\r\n\tlist-style: none;\r\n}\r\nblockquote, q {\r\n\tquotes: none;\r\n}\r\nblockquote:before, blockquote:after,\r\nq:before, q:after {\r\n\tcontent: '';\r\n\tcontent: none;\r\n}\r\n\r\n/*\r\n*/\r\n\r\ntable {\r\n\tmargin-top: 20px;\r\n}\r\n\r\n.hide {\r\n\tdisplay: none;\r\n}\r\n\r\n\r\ntable {\r\n\t/* border-collapse: collapse; */\r\n\t/* background: brown;  */\r\n\tborder-spacing: 1;\r\n}\r\n.wall-top {\r\n\tborder-top: 5px solid #FFB000;\r\n\tz-index: 9;\r\n}\r\n\r\n.wall-bottom {\r\n\tborder-bottom: 5px solid #FFB000;\r\n\tz-index: 9;\r\n}\r\n\r\n.wall-right {\r\n\tborder-right: 5px solid #FFB000;\r\n\tz-index: 9;\r\n}\r\n\r\n.wall-left {\r\n\tborder-left: 5px solid #FFB000;\r\n\tz-index: 9;\r\n}\r\n\r\n.table { \r\n\tborder-spacing: 0; \r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\t/* border-collapse: collapse;  */\r\n}\r\n.table th { padding: .5em; }\r\n.hall { \r\n\t/* border: 5px solid #3A638E;  */\r\n\t/* width: 4em; height: 4em;  */\r\n\tz-index: 5;\r\n}\r\n.table .floor { \r\n\t/* background: brown;  */\r\n\tmargin: 1px;\r\n}\r\n\r\n\r\ntd {\r\n\twidth: 74px;\r\n\theight: 74px;\r\n\tborder: 5px solid #4D618B;\r\n\tbackground: #7686A8; \r\n}\r\n\r\n.button {\r\n\t/* margin: 20px auto; */\r\n\tpadding: 5px 7px;\r\n}\r\n.controller-div {\r\n\tmargin: auto;\r\n\tpadding: 5px 7px;\r\n}\r\n\r\n\r\n.player {\r\n\tfont-size: 2.5em;\r\n\tline-height: 70px;\r\n\ttext-align: center;\r\n}\r\n\r\n.highlight {\r\n\tbackground: #8DBB5E;\r\n}\r\n.highlight:hover{\r\n\tbackground: #BDE297;\r\n}\r\n\r\n.player-turn {\r\n\tmargin: 20px auto;\r\n}\r\n\r\n.wall-counter-div {\r\n\tmargin-top: 30px;\r\n\tdisplay: flex;\r\n}\r\n.wall-counter {\r\n\tmargin: auto;\r\n}\r\n\r\n#restart-div {\r\n\tposition: fixed;\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\tfont-size: 2em;\r\n\tpadding: 15px;\r\n\tmargin: 200px;\r\n\tbackground-color: white;\r\n\twidth: 400px;\r\n\theight: 200px;\r\n}\r\n\r\n#restart-div h1 {\r\n\tmargin: 10px auto;\r\n}\r\n\r\n#restart-div button {\r\n\tmargin: auto;\r\n\twidth: 30%;\r\n\theight: 15%;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":";;AAEA;;;CAGC;;AAED;;;;;;;;;;;;;CAaC,SAAS;CACT,UAAU;CACV,SAAS;CACT,eAAe;CACf,aAAa;CACb,wBAAwB;AACzB;AACA,gDAAgD;AAChD;;CAEC,cAAc;AACf;;AAEA;CACC,mBAAmB;AACpB;;AAEA;CACC,cAAc;CACd,aAAa;CACb,uBAAuB;AACxB;AACA;CACC,gBAAgB;AACjB;AACA;CACC,YAAY;AACb;AACA;;CAEC,WAAW;CACX,aAAa;AACd;;AAEA;CACC;;AAED;CACC,gBAAgB;AACjB;;AAEA;CACC,aAAa;AACd;;;AAGA;CACC,+BAA+B;CAC/B,wBAAwB;CACxB,iBAAiB;AAClB;AACA;CACC,6BAA6B;CAC7B,UAAU;AACX;;AAEA;CACC,gCAAgC;CAChC,UAAU;AACX;;AAEA;CACC,+BAA+B;CAC/B,UAAU;AACX;;AAEA;CACC,8BAA8B;CAC9B,UAAU;AACX;;AAEA;CACC,iBAAiB;CACjB,aAAa;CACb,sBAAsB;CACtB,gCAAgC;AACjC;AACA,YAAY,aAAa,EAAE;AAC3B;CACC,gCAAgC;CAChC,8BAA8B;CAC9B,UAAU;AACX;AACA;CACC,wBAAwB;CACxB,WAAW;AACZ;;;AAGA;CACC,WAAW;CACX,YAAY;CACZ,yBAAyB;CACzB,mBAAmB;AACpB;;AAEA;CACC,uBAAuB;CACvB,gBAAgB;AACjB;AACA;CACC,YAAY;CACZ,gBAAgB;AACjB;;;AAGA;CACC,gBAAgB;CAChB,iBAAiB;CACjB,kBAAkB;AACnB;;AAEA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;;AAEA;CACC,iBAAiB;AAClB;;AAEA;CACC,gBAAgB;CAChB,aAAa;AACd;AACA;CACC,YAAY;AACb;;AAEA;CACC,eAAe;CACf,aAAa;CACb,sBAAsB;CACtB,cAAc;CACd,aAAa;CACb,aAAa;CACb,uBAAuB;CACvB,YAAY;CACZ,aAAa;AACd;;AAEA;CACC,iBAAiB;AAClB;;AAEA;CACC,YAAY;CACZ,UAAU;CACV,WAAW;AACZ","sourcesContent":["\r\n\r\n/* http://meyerweb.com/eric/tools/css/reset/ \r\n   v2.0 | 20110126\r\n   License: none (public domain)\r\n*/\r\n\r\nhtml, body, div, span, applet, object, iframe,\r\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\r\na, abbr, acronym, address, big, cite, code,\r\ndel, dfn, em, img, ins, kbd, q, s, samp,\r\nsmall, strike, strong, sub, sup, tt, var,\r\nb, u, i, center,\r\ndl, dt, dd, ol, ul, li,\r\nfieldset, form, label, legend,\r\ntable, caption, tbody, tfoot, thead, tr, th, td,\r\narticle, aside, canvas, details, embed, \r\nfigure, figcaption, footer, header, hgroup, \r\nmenu, nav, output, ruby, section, summary,\r\ntime, mark, audio, video {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n\tborder: 0;\r\n\tfont-size: 100%;\r\n\tfont: inherit;\r\n\tvertical-align: baseline;\r\n}\r\n/* HTML5 display-role reset for older browsers */\r\narticle, aside, details, figcaption, figure, \r\nfooter, header, hgroup, menu, nav, section {\r\n\tdisplay: block;\r\n}\r\n\r\nhtml {\r\n\tbackground: #4D618B;\r\n}\r\n\r\nbody {\r\n\tline-height: 1;\r\n\tdisplay: flex;\r\n\tjustify-content: center;\r\n}\r\nol, ul {\r\n\tlist-style: none;\r\n}\r\nblockquote, q {\r\n\tquotes: none;\r\n}\r\nblockquote:before, blockquote:after,\r\nq:before, q:after {\r\n\tcontent: '';\r\n\tcontent: none;\r\n}\r\n\r\n/*\r\n*/\r\n\r\ntable {\r\n\tmargin-top: 20px;\r\n}\r\n\r\n.hide {\r\n\tdisplay: none;\r\n}\r\n\r\n\r\ntable {\r\n\t/* border-collapse: collapse; */\r\n\t/* background: brown;  */\r\n\tborder-spacing: 1;\r\n}\r\n.wall-top {\r\n\tborder-top: 5px solid #FFB000;\r\n\tz-index: 9;\r\n}\r\n\r\n.wall-bottom {\r\n\tborder-bottom: 5px solid #FFB000;\r\n\tz-index: 9;\r\n}\r\n\r\n.wall-right {\r\n\tborder-right: 5px solid #FFB000;\r\n\tz-index: 9;\r\n}\r\n\r\n.wall-left {\r\n\tborder-left: 5px solid #FFB000;\r\n\tz-index: 9;\r\n}\r\n\r\n.table { \r\n\tborder-spacing: 0; \r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\t/* border-collapse: collapse;  */\r\n}\r\n.table th { padding: .5em; }\r\n.hall { \r\n\t/* border: 5px solid #3A638E;  */\r\n\t/* width: 4em; height: 4em;  */\r\n\tz-index: 5;\r\n}\r\n.table .floor { \r\n\t/* background: brown;  */\r\n\tmargin: 1px;\r\n}\r\n\r\n\r\ntd {\r\n\twidth: 74px;\r\n\theight: 74px;\r\n\tborder: 5px solid #4D618B;\r\n\tbackground: #7686A8; \r\n}\r\n\r\n.button {\r\n\t/* margin: 20px auto; */\r\n\tpadding: 5px 7px;\r\n}\r\n.controller-div {\r\n\tmargin: auto;\r\n\tpadding: 5px 7px;\r\n}\r\n\r\n\r\n.player {\r\n\tfont-size: 2.5em;\r\n\tline-height: 70px;\r\n\ttext-align: center;\r\n}\r\n\r\n.highlight {\r\n\tbackground: #8DBB5E;\r\n}\r\n.highlight:hover{\r\n\tbackground: #BDE297;\r\n}\r\n\r\n.player-turn {\r\n\tmargin: 20px auto;\r\n}\r\n\r\n.wall-counter-div {\r\n\tmargin-top: 30px;\r\n\tdisplay: flex;\r\n}\r\n.wall-counter {\r\n\tmargin: auto;\r\n}\r\n\r\n#restart-div {\r\n\tposition: fixed;\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\tfont-size: 2em;\r\n\tpadding: 15px;\r\n\tmargin: 200px;\r\n\tbackground-color: white;\r\n\twidth: 400px;\r\n\theight: 200px;\r\n}\r\n\r\n#restart-div h1 {\r\n\tmargin: 10px auto;\r\n}\r\n\r\n#restart-div button {\r\n\tmargin: auto;\r\n\twidth: 30%;\r\n\theight: 15%;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \************************************************************************/
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === 'function') {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

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

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ "./src/board.js");


class Game {
    constructor() {
        this.board = new _board__WEBPACK_IMPORTED_MODULE_0__.default();
        this.grid = this.board.grid;
        this.currentPlayer = "noone";
        /* this.player = [rowIdx, colIdx] */
        this.player1 = [8, 4];
        this.player2 = [0, 4];
        this.player1Walls = 10;
        this.player2Walls = 10;
        this.state = "not doing anything";

        this.movePlayer = this.movePlayer.bind(this);
    }

    isOver() {
        if (this.winner() !== null) {
            return true;
        } else {
            return false;
        }
    }

    computerAiTurn() {
        if(this.currentPlayer === "player2") {
            let p2Path = this.board.bfs(this.player2, ["80","81","82","83","84","85","86","87","88"])
            let p1Path = this.board.bfs(this.player1);
            let random = Math.floor(Math.random() * 2);
            console.log(random);
            if ((p1Path[1].length <= p2Path[1].length) && (this.player2Walls > 0)) {
                console.log("placing wall");
                console.log("path => ", p1Path);
                /* place wall if player1 is closer to goal */
                for(let i = 0; i < p1Path[1].length; i++) {
                    let rowIdx = p1Path[1][i].split("")[0];
                    let colIdx = p1Path[1][i].split("")[1];   
                    let nextRowIdx = p1Path[1][i + 1].split("")[0];
                    let nextColIdx = p1Path[1][i + 1].split("")[1];
                    let placedWall = false;
                    let squareA = [parseInt(nextRowIdx), parseInt(nextColIdx)];
                    let squareNeighbors = this.board.checkNeighbors(squareA);
                    console.log("neighbors => ", squareNeighbors);
                    let squareB;
                    /* 
                    left and up 
                    placeWall(dir, event, squareA, squareB)
                    dir = North, South, East, West
                    event = null
                    squareA = [rowIdx, colIdx]
                    squareB = [rowIdx, colIdx]
                    */
                    console.log("row => ", rowIdx, nextRowIdx);
                    console.log("col => ", colIdx, nextColIdx);
                    if(colIdx === nextColIdx) {
                        /*
                        path is moving up or down
                        check neighbors and set squareB to a valid one
                        neighbors = [north, south, west, east]
                        use random if you want
                        squareA = next best pos of player1 (opponent)
                        squareB = square to the west of squareA
                         */
                        if(random === 0) {
                            if (squareNeighbors[2][0] !== -1) {
                                squareB = squareNeighbors[2];
                            } else {
                                squareB = squareNeighbors[3];
                            }
                        } else {
                            if (squareNeighbors[3][0] !== -1) {
                                squareB = squareNeighbors[3];
                            } else {
                                squareB = squareNeighbors[2];
                            }
                        }
                        console.log("squares => ", squareA, squareB);
                        placedWall = this.placeWall("South", null, squareA, squareB);
                        console.log("placedwall => ", placedWall);
                        if (placedWall === true) {
                            console.log("breaking");
                            break;
                        } else {
                            // placedWall = this.placeWall("North", null, squareA, squareB);
                            // console.log("placedwall => ", placedWall);
                            // if (placedWall === true) {
                            //     console.log("breaking");
                            //     break;
                            // } else {
                            //     console.log("how did i end up here");
                            // }
                        }
                    }
                    if (rowIdx === nextRowIdx) {

                        if(random === 0) {
                            if (squareNeighbors[0][0] !== -1) {
                                squareB = squareNeighbors[0];
                            } else {
                                squareB = squareNeighbors[1];
                            }
                        } else {
                            if (squareNeighbors[1][0] !== -1) {
                                squareB = squareNeighbors[1];
                            } else {
                                squareB = squareNeighbors[0];
                            }
                        }

                        if (colIdx > nextColIdx) {
                            console.log(squareA, squareB);
                            placedWall = this.placeWall("East", null, squareA, squareB);
                            console.log("placedwall => ", placedWall);
                            if (placedWall === true) {
                                console.log("breaking")
                                break;
                            }
                        } else {
                            console.log(squareA, squareB);
                            placedWall = this.placeWall("West", null, squareA, squareB);
                            console.log("placedwall => ", placedWall);
                            if (placedWall === true) {
                                console.log("breaking")
                                break;
                            }
                        }
                    }
                }

            } else {
                /* move player2 towards goal */
                let currRow = p2Path[1][0].split("")[0];
                let currCol = p2Path[1][0].split("")[1];
                let rowIdx = p2Path[1][1].split("")[0];
                let colIdx = p2Path[1][1].split("")[1];
                let nextMove = [rowIdx, colIdx];
                let moves = this.getAvailableMoves([parseInt(currRow), parseInt(currCol)]);
                for (let i = 0; i < moves.length; i++) {
                    let move = moves[i].join("");
                    if (p2Path[1].includes(move)){
                        this.movePlayer(moves[i]);
                    }
                }
            }
        }
        console.log("END OF AI TURN");
    }

    winner() {
        let winner = null;
        for(let i = 0; i < this.grid[0].length; i++) {
            // document.getElementById(`${i + 1}1`).style.backgroundColor = "green";
            if(this.grid[0][i].player === "player1") {
                winner = "player1"
            }
            if(this.grid[8][i].player === "player2") {
                winner = "player2"
            }
        }
        return winner;
    }

    takeTurn(action, dir = null, event, squareA = null, squareB = null) {
        // movement or wall placement?

        if (action === "move") {
            if((dir === "up") || (dir === "right") || (dir === "down") || (dir === "left")) {
                this.movePlayer(dir);
            }
            if(dir === null) {
                this.movePlayer(event.target.id.split(""));
            }
        }

        if (action === "placeWall") {
            // calls this.placeWall()
            this.placeWall(dir, event, squareA, squareB);
            //    the previous solution to placing walls seems bloated but once its implemented its fluid...
            //    I am thinking of having the place wall button morph into a north east south west button...
            //       might be better if client selects the cells they wish to place a wall before button morphs
            //       that way only north south or east west buttons will spawn
            //    selecting cells will be fluid with mouse click or less fluid with key pressing coordinates
        }

    }

    placeWall(dir, event, squareA, squareB) {
        /*
        squareA & squareB = [rowIdx, colIdx]
        get Square and set the specific walls to true 
        get neighbors and sset specific walls to true... opposite wall
        squarePos = this.grid[rowIdx, colIdx]
        */


        if(squareA[0] > 8 || squareA[0] < 0 || squareB[0] > 8 || squareB[0] < 0
            || squareA[1] > 8 || squareA[1] < 0 || squareB[1] > 8 || squareB[1] < 0) {
                return false;
        }
        let sqrA = this.grid[squareA[0]][squareA[1]];
        let sqrB = this.grid[squareB[0]][squareB[1]];
        let neighborsA = this.board.checkNeighbors([sqrA.rowIdx, sqrA.colIdx]);
        let neighborsB = this.board.checkNeighbors([sqrB.rowIdx, sqrB.colIdx]);
        let isValidWall;
        let playerWalls;
        this.currentPlayer === "player1" ? playerWalls = this.player1Walls : playerWalls = this.player2Walls
        if (playerWalls > 0) {

            if(dir === "North" && (!sqrA.walls.North && !sqrB.walls.North)){
                sqrA.walls.North = true;
                sqrB.walls.North = true;
                /* sets the north neighbors south wall to true */
                this.grid[neighborsA[0][0]][neighborsA[0][1]].walls.South = true;
                this.grid[neighborsB[0][0]][neighborsB[0][1]].walls.South = true;
                isValidWall = this.findPath();
                if(isValidWall) {
                    if (this.currentPlayer === "player1") this.player1Walls = this.player1Walls - 1;
                    if (this.currentPlayer === "player2") this.player2Walls = this.player2Walls - 1;
                    this.swapTurn();
                    return true;
                } else {
                    sqrA.walls.North = false;
                    sqrB.walls.North = false;
                    this.grid[neighborsA[0][0]][neighborsA[0][1]].walls.South = false;
                    this.grid[neighborsB[0][0]][neighborsB[0][1]].walls.South = false;
                    
                }
            }
            if(dir === "East" && (!sqrA.walls.East && !sqrB.walls.East)){
                sqrA.walls.East = true;
                sqrB.walls.East = true;
                /* sets the East neighbors West wall to true */
                this.grid[neighborsA[3][0]][neighborsA[3][1]].walls.West = true;
                this.grid[neighborsB[3][0]][neighborsB[3][1]].walls.West = true;
                isValidWall = this.findPath();
                if(isValidWall) {
                    if (this.currentPlayer === "player1") this.player1Walls = this.player1Walls - 1;
                    if (this.currentPlayer === "player2") this.player2Walls = this.player2Walls - 1;
                    this.swapTurn();
                    return true;
                } else {
                    sqrA.walls.East = false;
                    sqrB.walls.East = false;
                    this.grid[neighborsA[3][0]][neighborsA[3][1]].walls.West = false;
                    this.grid[neighborsB[3][0]][neighborsB[3][1]].walls.West = false;
                    
                }
            }
            if(dir === "South" && (!sqrA.walls.South && !sqrB.walls.South)){
                sqrA.walls.South = true;
                sqrB.walls.South = true;
                /* sets the South neighbors North wall to true */
                this.grid[neighborsA[1][0]][neighborsA[1][1]].walls.North = true;
                this.grid[neighborsB[1][0]][neighborsB[1][1]].walls.North = true;
                isValidWall = this.findPath();
                if(isValidWall) {
                    if (this.currentPlayer === "player1") this.player1Walls = this.player1Walls - 1;
                    if (this.currentPlayer === "player2") this.player2Walls = this.player2Walls - 1;
                    this.swapTurn();
                    return true;
                } else {
                    sqrA.walls.South = false;
                    sqrB.walls.South = false;
                    this.grid[neighborsA[1][0]][neighborsA[1][1]].walls.North = false;
                    this.grid[neighborsB[1][0]][neighborsB[1][1]].walls.North = false;
                    
                }
            }
            if(dir === "West" && (!sqrA.walls.West && !sqrB.walls.West)){
                sqrA.walls.West = true;
                sqrB.walls.West = true;
                /* sets the West neighbors East wall to true */
                this.grid[neighborsA[2][0]][neighborsA[2][1]].walls.East = true;
                this.grid[neighborsB[2][0]][neighborsB[2][1]].walls.East = true;
                isValidWall = this.findPath();
                if(isValidWall) {
                    if (this.currentPlayer === "player1") this.player1Walls = this.player1Walls - 1;
                    if (this.currentPlayer === "player2") this.player2Walls = this.player2Walls - 1;
                    this.swapTurn();
                    return true;
                } else {
                    sqrA.walls.West = false;
                    sqrB.walls.West = false;
                    this.grid[neighborsA[2][0]][neighborsA[2][1]].walls.East = false;
                    this.grid[neighborsB[2][0]][neighborsB[2][1]].walls.East = false;
                    
                }
            }
        }
        return false;
    }

    movePlayer(dir) {
        // takes current player current pos
        // calculates future pos with dir
        let player;
        this.currentPlayer === "player1" ? player = this.player1 : player = this.player2
        let newColIdx;
        let newRowIdx;
        let isWalled;
        let isValid;
        if (dir === "up") {
            newColIdx = player[1];
            newRowIdx = player[0] - 1;
        } else if (dir === "right") {
            newColIdx = player[1] + 1;
            newRowIdx = player[0];
        } else if (dir === "down") {
            newColIdx = player[1];
            newRowIdx = player[0] + 1;
        } else if (dir === "left") {
            newColIdx = player[1] - 1;
            newRowIdx = player[0];
        } else {
            newRowIdx = parseInt(dir[0]);
            newColIdx = parseInt(dir[1]);
        }

        /*
        The below validation no longer works for clicking movement.  
        check for walls
         */
        isWalled = this.board.isWalled(dir, player[0], player[1]);
        // gives to this.board to validate
        isValid = _board__WEBPACK_IMPORTED_MODULE_0__.default.isValidPos(newColIdx, newRowIdx);
        
        // if valid then sets player new x and y
        //    swaps turns
        if (isValid && !isWalled) {

            let oldSquare = this.board.grid[player[0]][player[1]];
            let newSquare = this.board.grid[newRowIdx][newColIdx];

            //validation to check for player collision         
            if (newSquare.player !== "empty") {
            } else {
                oldSquare.player = "empty";
                this.setPlayerPos(this.currentPlayer, [newRowIdx, newColIdx]);
                newSquare.player = this.currentPlayer;
                this.swapTurn();
            }


        } else {
            // else then does nothing or sends error message
            //    does not swap turns

        }
    }

    getAvailableMoves(pos) {
        /* pos = [row, col] */
        console.log(pos);
        let player = this.currentPlayer === "player1" ? this.player1 : this.player2;
        let opponent = this.currentPlayer === "player1" ? this.player2 : this.player1;
        let moves = [];
        let currentSquare = this.grid[pos[0]][pos[1]];
        let square;
        let colIdx = pos[1];
        let rowIdx  = pos[0];
        /* check for player */
        if ((rowIdx - 1 >= 0) && (!currentSquare.walls.North)) {
            square = this.grid[rowIdx - 1][colIdx];
            if (square.player === "empty") {
                moves.push([rowIdx - 1, colIdx]);  // north
            } else if (["player1", "player2"].includes(square.player)){
                if ((rowIdx - 2 >= 0) && (!square.walls.North)) {
                    moves.push([rowIdx - 2, colIdx]);
                } else {
                    let tempSquare = rowIdx - 2 >= 0 ? this.grid[rowIdx - 2][colIdx] : undefined;
                    if (square.walls.North) {
                        if (!square.walls.East) moves.push([rowIdx - 1, colIdx + 1]);
                        if (!square.walls.West) moves.push([rowIdx - 1, colIdx - 1]);
                    } else {
                        if (!tempSquare) {
                            if (!square.walls.East) moves.push([rowIdx - 1, colIdx + 1]);
                            if (!square.walls.West) moves.push([rowIdx - 1, colIdx - 1]);
                        }
                    }
                }
            }
        }
        if ((colIdx + 1 <= 8) && (!currentSquare.walls.East)) {
            square = this.grid[rowIdx][colIdx + 1];
            if (square.player === "empty") {
                moves.push([rowIdx, colIdx + 1]);  // east
            } else if (["player1", "player2"].includes(square.player)){
                if ((colIdx + 2 <= 8) && (!square.walls.East)) {
                    moves.push([rowIdx, colIdx + 2]);
                } else {
                    let tempSquare = colIdx + 2 <= 8 ? this.grid[rowIdx][colIdx + 2] : undefined;
                    if (square.walls.East) {
                        if (!square.walls.North) moves.push([rowIdx - 1, colIdx + 1]);
                        if (!square.walls.South) moves.push([rowIdx + 1, colIdx + 1]);
                    } else {
                        if (!tempSquare) {
                            if (!square.walls.North) moves.push([rowIdx - 1, colIdx + 1]);
                            if (!square.walls.South) moves.push([rowIdx + 1, colIdx + 1]);
                        }
                    }
                }
            }
        }
        if ((rowIdx + 1 <= 8) && (!currentSquare.walls.South)) {
            square = this.grid[rowIdx + 1][colIdx];
            if (square.player === "empty") {
                moves.push([rowIdx + 1, colIdx]);  // south
            } else if (["player1", "player2"].includes(square.player)){
                if ((rowIdx + 2 <= 8) && (!square.walls.South)) {
                    moves.push([rowIdx + 2, colIdx]);
                } else {
                    let tempSquare = rowIdx + 2 <= 8 ? this.grid[rowIdx + 2][colIdx] : undefined;
                    if (square.walls.South) {
                        if (!square.walls.East) moves.push([rowIdx + 1, colIdx + 1]);
                        if (!square.walls.West) moves.push([rowIdx + 1, colIdx - 1]);
                    } else {
                        if (!tempSquare) {
                            if (!square.walls.East) moves.push([rowIdx + 1, colIdx + 1]);
                            if (!square.walls.West) moves.push([rowIdx + 1, colIdx - 1]);
                        }
                    }
                }
            }
        }
        if ((colIdx - 1 >= 0) && (!currentSquare.walls.West)) {
            square = this.grid[rowIdx][colIdx - 1];
            if (square.player === "empty") {
                moves.push([rowIdx, colIdx - 1]);  // west
            } else if (["player1", "player2"].includes(square.player)){
                if ((colIdx - 2 >= 0) && (!square.walls.West)) {
                    moves.push([rowIdx, colIdx - 2]);
                } else {
                    let tempSquare = colIdx - 2 >= 0 ? this.grid[rowIdx][colIdx - 2] : undefined;
                    if (square.walls.West) {
                        if (!square.walls.North) moves.push([rowIdx - 1, colIdx - 1]);
                        if (!square.walls.South) moves.push([rowIdx + 1, colIdx - 1]);
                    } else {
                        if (!tempSquare) {
                            if (!square.walls.North) moves.push([rowIdx - 1, colIdx - 1]);
                            if (!square.walls.South) moves.push([rowIdx + 1, colIdx - 1]);
                        }
                    }
                }
            }
        }
        /* 
        checkNeighbors returns an array of 
        [north, east, south, west] positions
        should now check to see if any of those positions collide 
        with a wall or player and adjust moves
         */
        for (let i = 0; i < moves.length; i++) {
            square = this.grid[moves[i][0]][moves[i][1]];
        }

        return moves;
    }


    setPlayerPos(player, pos) {
        if (player === "player1") {
            this.player1 = pos;
        } else if (player === "player2") {
            this.player2 = pos;
        }
    }

    start() {
        this.board.setPlayers(true, this.player1, false, this.player2);
        this.currentPlayer = "player1";
    }

    swapTurn() {
        if( this.currentPlayer === "player1" ) {
            this.currentPlayer = "player2";
        } else if( this.currentPlayer === "player2" ) {
            this.currentPlayer = "player1";
        }
    }

    findPath() {
        /* 
        run the bfs
         */
        return !!this.board.bfs(this.player1);
    }

}


/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameView)
/* harmony export */ });
class GameView {
    constructor(game) {
        this.body = document.querySelector("body");
        this.game = game;
        this.board = this.game.board;
        this.grid = this.board.grid;
        this.squareA = null;
        this.squareB = null;
        this.neighbors = null;  
        this.availableMoves = [];

        this.setupBoard();
        this.setupEventListeners();
    }

    show() {
        this.game.computerAiTurn();
        this.showBoard();
        if (this.game.isOver()) {
            let winner = "";
            if (this.game.currentPlayer === "player2") winner = "Player 1";
            if (this.game.currentPlayer === "player1") winner = "Player 2";
            let table = document.getElementsByClassName("table")[0];
            this.createRestartDiv(table, winner);
            this.game.currentPlayer = "noone";
            this.showBoard();
            // table.remove();
            let restart = document.createElement("div");

            // location.reload();
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
                    ele.innerHTML = "&#x265F";
                } else if(square.player === "player2") {
                    ele.classList.add("player");
                    ele.innerHTML = "&#x2659";
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
        let wallCounters = document.getElementsByClassName("wall-counter");
        let btn = document.getElementById("place");
        wallCounters[0].innerHTML = `player 1 has ${this.game.player1Walls} walls left`
        wallCounters[1].innerHTML = `player 2 has ${this.game.player2Walls} walls left`
        if ((this.game.currentPlayer === "player1") && (this.game.player1Walls === 0)) {
            btn.classList.add("hide");
        } else if ((this.game.currentPlayer === "player2") && (this.game.player2Walls === 0)){
            btn.classList.add("hide");
        } else {
            if (this.game.state === "not doing anything") {
                if (btn.classList.contains("hide")) btn.classList.remove("hide");
            }
        }
        document.getElementById("player-turn").innerHTML = `${this.game.currentPlayer}'s turn`;
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
[p1 not doing anything] == clicks Place a wall >> [selecting squares] => [selecting wall type] => [p1 not doing anything]
                                                                            ||
                                                                            \/
                                                                        {wall is created} => [p2 not doing anything]
!! undeveloped !!
Player movement will be integrated into the state machine as well
*** maybe change [not doing anything] to [not doing anything]

[p1 not doing anything] == clicks Move character >> [selecting desired move] => [p1 not doing anything]
                                                                ||
                                                                \/
                                                            {move player} => [p2 not doing anything]

            */ 

            let state = this.game.state;
            let classList = event.target.classList;
            let innerHTML = event.target.innerHTML;
            if (state === "not doing anything") {
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
            if (state === "selecting desired move") {
                if (this.availableMoves.includes(event.target)) {
                    this.game.takeTurn("move", null, event)
                    document.getElementById("back").classList.add("hide");
                    for (let i = 0; i < this.availableMoves.length; i++) {
                        this.availableMoves[i].classList.remove("highlight");
                    }
                    this.game.state = "not doing anything";
                    this.availableMoves = [];
                    this.show();
                } else {
                }
            }
            if (state !== "not doing anything") {
                if (classList.contains("button")) {
                    if (innerHTML === "back") {
                        this.handleBackButton();
                    }
                }
            }
            if (innerHTML === "Restart") {
                location.reload();
            }

        }, false);
    } 

    handlePlaceWallButton(event) {
        // delete btn element and replace with instructions to
        // click two distinct squares
        if (this.game.currentPlayer !== "noone") {
            this.game.state = "selecting squares";
            let btn = event.target;
            document.getElementById("back").classList.remove("hide");
            this.body.getElementsByClassName("clickInstruct")[0].classList.remove("hide");
            document.getElementById("move").classList.add("hide");
            btn.classList.add("hide");
        }
    }

    handleSquareClick(event) {
        if (this.game.currentPlayer !== "noone") {
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
                // for(let i = 0; i < this.neighbors.length; i++) {
                //     document.getElementById(this.neighbors[i].join("")).classList.add("highlight");
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
                    if(this.squareA.split("")[0] > 0) {
                        this.body.getElementsByClassName("north")[0].classList.remove("hide");
                    }
                    if(this.squareA.split("")[0] < 8) {
                        this.body.getElementsByClassName("south")[0].classList.remove("hide");
                    }
                }
                if(this.squareA.split("")[1] === this.squareB.split("")[1]) {
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
    }

    handleWallTypeButton(dir, event) {
        /* 
        calls this.game.takeTurn(action, dir, event);
        should remove wall type buttons and add place a wall button
        switch state back to not doing anything here???
        or in this.game
        WHERE DOES WALL PLACEMENT VALIDATION HAPPEN??????????????????????
        */
        this.game.takeTurn("placeWall", dir, event, this.squareA, this.squareB);
        this.body.getElementsByClassName("north")[0].classList.add("hide");
        this.body.getElementsByClassName("east")[0].classList.add("hide");
        this.body.getElementsByClassName("south")[0].classList.add("hide");
        this.body.getElementsByClassName("west")[0].classList.add("hide");
        this.body.getElementsByClassName("button")[0].classList.remove("hide");
        document.getElementById("back").classList.add("hide");
        document.getElementById("move").classList.remove("hide");
        this.squareA = null;
        this.squareB = null;
        this.game.state = "not doing anything";
        this.show();
    }

    handleMovementButton(event) {
        if(this.game.currentPlayer !== "noone") {
            document.getElementById("back").classList.remove("hide");
            document.getElementById("place").classList.add("hide");
            let availableMoves;
            let player = this.game.currentPlayer === "player1" ? this.game.player1 : this.game.player2;
            let rowIdx = parseInt(player[0]);
            let colIdx = parseInt(player[1]);
            availableMoves = this.game.getAvailableMoves([rowIdx, colIdx]);
            for (let i = 0; i < availableMoves.length; i++) {
                let ele = document.getElementById(availableMoves[i].join(""));
                ele.classList.add("highlight");
                this.availableMoves.push(ele);
            }
            /* set the state to check if an available move square is clicked. */
            this.game.state = "selecting desired move";
        }
    }

    handleBackButton() {
        this.game.state = "not doing anything";
        /* resets state */
        let instructions = document.getElementsByClassName("controller-div")[0].childNodes;
        for (let i = 0; i < instructions.length; i++) {
            if (instructions[i].id === "place" || instructions[i].id === "move") {
                instructions[i].classList.remove("hide");
            } else {
                instructions[i].classList.add("hide");
            }
        }
        this.squareA = null;
        this.squareB = null;
        this.neighbors = null;  
        for (let i = 0; i < this.availableMoves.length; i++){
            this.availableMoves[i].classList.remove("highlight");
        }
        this.availableMoves = [];
        this.show();
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
        if (innerText === "Place a wall") {
            btn.setAttribute("id", "place");
        } else if (innerText === "Move character") {
            btn.setAttribute("id", "move");
        } else {
            btn.setAttribute("id", innerText);
        }
        this.body.getElementsByClassName("controller-div")[0].appendChild(btn);
        return btn;
    }

    createRestartDiv(board, winner) {
        let div = document.createElement("div");
        let congrats = document.createElement("h1");
        // let instruct = document.createElement("span");
        let btn = document.createElement("button");
        div.setAttribute("id", "restart-div");
        btn.setAttribute("id", "restart");
        congrats.innerHTML = `Congrats to ${winner}!!!!`;
        // instruct.innerHTML = "Click button to restart the game."
        btn.innerHTML = "Restart"

        div.appendChild(congrats);
        // div.appendChild(instruct);
        div.appendChild(btn);
        board.appendChild(div);
    }

    setupBoard() {
        let div = document.createElement("div");
        this.body.appendChild(div);
        let board = document.createElement("table");
        div.appendChild(board);
        div.classList.add("table");
        board.setAttribute("id" , "board");
        let whosTurn = document.createElement("div");
        whosTurn.classList.add("player-turn");
        whosTurn.setAttribute("id", "player-turn");
        whosTurn.innerHTML = "Player 1's Turn";
        div.appendChild(whosTurn);
        let cntrlDiv = document.createElement("div");
        cntrlDiv.classList.add("controller-div");
        div.appendChild(cntrlDiv);
        let wallCounterDiv = document.createElement("div");
        wallCounterDiv.classList.add("wall-counter-div");
        wallCounterDiv.setAttribute("id", "wall-counter");
        let player1Walls = document.createElement("div");
        let player2Walls = document.createElement("div");
        player1Walls.classList.add("wall-counter");
        player2Walls.classList.add("wall-counter");
        player1Walls.innerHTML = "player 1 has 10 walls left";
        player2Walls.innerHTML = "player 2 has 10 walls left";
        wallCounterDiv.appendChild(player1Walls);
        wallCounterDiv.appendChild(player2Walls);
        div.appendChild(wallCounterDiv);

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

        /* back button */
        let back = this.createButton("back");
        back.classList.add("hide");
        cntrlDiv.appendChild(back);

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

/***/ }),

/***/ "./src/icon.png":
/*!**********************!*\
  !*** ./src/icon.png ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "932e694c1134fb7b39f9.png";

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _icon_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./icon.png */ "./src/icon.png");
/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game_view */ "./src/game_view.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game */ "./src/game.js");
// import _, { throttle } from 'lodash';




// const app = require('express')();
// const http = require('http').createServer(app);

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/dist/index.html');
// });

// http.listen(8080, () => {
//     console.log('listening on *:8080');
// })

function iconComponent() {
    
    // Add the image to our existing div.
    const element = document.createElement('link');
    element.rel = "icon";
    element.href = _icon_png__WEBPACK_IMPORTED_MODULE_1__;
    element.type = 'image/png';

    return element;
}

document.head.appendChild(iconComponent());



document.addEventListener("DOMContentLoaded", function () {
    let game = new _game__WEBPACK_IMPORTED_MODULE_3__.default();
    // setupBoard();
    let gameView = new _game_view__WEBPACK_IMPORTED_MODULE_2__.default(game);
    game.start();
    gameView.show();
});





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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9xdW9yaWRvci8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vcXVvcmlkb3IvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3F1b3JpZG9yLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vcXVvcmlkb3IvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vcXVvcmlkb3IvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vcXVvcmlkb3IvLi9zcmMvYm9hcmQuanMiLCJ3ZWJwYWNrOi8vcXVvcmlkb3IvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9xdW9yaWRvci8uL3NyYy9nYW1lX3ZpZXcuanMiLCJ3ZWJwYWNrOi8vcXVvcmlkb3IvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcXVvcmlkb3IvLi9zcmMvc3F1YXJlLmpzIiwid2VicGFjazovL3F1b3JpZG9yL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3F1b3JpZG9yL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3F1b3JpZG9yL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9xdW9yaWRvci93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3F1b3JpZG9yL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcXVvcmlkb3Ivd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9xdW9yaWRvci93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9xdW9yaWRvci93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDc0g7QUFDN0I7QUFDekYsOEJBQThCLG1GQUEyQixDQUFDLHdHQUFxQztBQUMvRjtBQUNBLHlyQkFBeXJCLGdCQUFnQixpQkFBaUIsZ0JBQWdCLHNCQUFzQixvQkFBb0IsK0JBQStCLEtBQUssc0pBQXNKLHFCQUFxQixLQUFLLGNBQWMsMEJBQTBCLEtBQUssY0FBYyxxQkFBcUIsb0JBQW9CLDhCQUE4QixLQUFLLFlBQVksdUJBQXVCLEtBQUssbUJBQW1CLG1CQUFtQixLQUFLLCtEQUErRCxrQkFBa0Isb0JBQW9CLEtBQUssK0JBQStCLHVCQUF1QixLQUFLLGVBQWUsb0JBQW9CLEtBQUssbUJBQW1CLG1DQUFtQyw4QkFBOEIsNEJBQTRCLEtBQUssZUFBZSxvQ0FBb0MsaUJBQWlCLEtBQUssc0JBQXNCLHVDQUF1QyxpQkFBaUIsS0FBSyxxQkFBcUIsc0NBQXNDLGlCQUFpQixLQUFLLG9CQUFvQixxQ0FBcUMsaUJBQWlCLEtBQUssZ0JBQWdCLHlCQUF5QixxQkFBcUIsNkJBQTZCLG1DQUFtQyxTQUFTLGVBQWUsZUFBZSxFQUFFLFdBQVcsb0NBQW9DLHdCQUF3QixhQUFhLHFCQUFxQixLQUFLLG1CQUFtQiw0QkFBNEIsc0JBQXNCLEtBQUssZ0JBQWdCLGtCQUFrQixtQkFBbUIsZ0NBQWdDLDBCQUEwQixNQUFNLGlCQUFpQiwyQkFBMkIsMEJBQTBCLEtBQUsscUJBQXFCLG1CQUFtQix1QkFBdUIsS0FBSyxxQkFBcUIsdUJBQXVCLHdCQUF3Qix5QkFBeUIsS0FBSyxvQkFBb0IsMEJBQTBCLEtBQUsscUJBQXFCLDBCQUEwQixLQUFLLHNCQUFzQix3QkFBd0IsS0FBSywyQkFBMkIsdUJBQXVCLG9CQUFvQixLQUFLLG1CQUFtQixtQkFBbUIsS0FBSyxzQkFBc0Isc0JBQXNCLG9CQUFvQiw2QkFBNkIscUJBQXFCLG9CQUFvQixvQkFBb0IsOEJBQThCLG1CQUFtQixvQkFBb0IsS0FBSyx5QkFBeUIsd0JBQXdCLEtBQUssNkJBQTZCLG1CQUFtQixpQkFBaUIsa0JBQWtCLEtBQUssV0FBVyw2RUFBNkUsT0FBTyxNQUFNLGlCQUFpQixVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxNQUFNLFlBQVksT0FBTyxVQUFVLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssVUFBVSxLQUFLLE1BQU0sVUFBVSxVQUFVLE1BQU0sS0FBSyxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksV0FBVyxNQUFNLEtBQUssWUFBWSxXQUFXLE1BQU0sS0FBSyxZQUFZLFdBQVcsTUFBTSxLQUFLLFlBQVksV0FBVyxNQUFNLEtBQUssWUFBWSxXQUFXLFlBQVksYUFBYSxNQUFNLG9CQUFvQixNQUFNLFlBQVksYUFBYSxXQUFXLEtBQUssS0FBSyxZQUFZLFdBQVcsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxNQUFNLEtBQUssVUFBVSxZQUFZLFFBQVEsS0FBSyxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLEtBQUssS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsWUFBWSxXQUFXLFVBQVUsVUFBVSxZQUFZLFdBQVcsVUFBVSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsd3FCQUF3cUIsZ0JBQWdCLGlCQUFpQixnQkFBZ0Isc0JBQXNCLG9CQUFvQiwrQkFBK0IsS0FBSyxzSkFBc0oscUJBQXFCLEtBQUssY0FBYywwQkFBMEIsS0FBSyxjQUFjLHFCQUFxQixvQkFBb0IsOEJBQThCLEtBQUssWUFBWSx1QkFBdUIsS0FBSyxtQkFBbUIsbUJBQW1CLEtBQUssK0RBQStELGtCQUFrQixvQkFBb0IsS0FBSywrQkFBK0IsdUJBQXVCLEtBQUssZUFBZSxvQkFBb0IsS0FBSyxtQkFBbUIsbUNBQW1DLDhCQUE4Qiw0QkFBNEIsS0FBSyxlQUFlLG9DQUFvQyxpQkFBaUIsS0FBSyxzQkFBc0IsdUNBQXVDLGlCQUFpQixLQUFLLHFCQUFxQixzQ0FBc0MsaUJBQWlCLEtBQUssb0JBQW9CLHFDQUFxQyxpQkFBaUIsS0FBSyxnQkFBZ0IseUJBQXlCLHFCQUFxQiw2QkFBNkIsbUNBQW1DLFNBQVMsZUFBZSxlQUFlLEVBQUUsV0FBVyxvQ0FBb0Msd0JBQXdCLGFBQWEscUJBQXFCLEtBQUssbUJBQW1CLDRCQUE0QixzQkFBc0IsS0FBSyxnQkFBZ0Isa0JBQWtCLG1CQUFtQixnQ0FBZ0MsMEJBQTBCLE1BQU0saUJBQWlCLDJCQUEyQiwwQkFBMEIsS0FBSyxxQkFBcUIsbUJBQW1CLHVCQUF1QixLQUFLLHFCQUFxQix1QkFBdUIsd0JBQXdCLHlCQUF5QixLQUFLLG9CQUFvQiwwQkFBMEIsS0FBSyxxQkFBcUIsMEJBQTBCLEtBQUssc0JBQXNCLHdCQUF3QixLQUFLLDJCQUEyQix1QkFBdUIsb0JBQW9CLEtBQUssbUJBQW1CLG1CQUFtQixLQUFLLHNCQUFzQixzQkFBc0Isb0JBQW9CLDZCQUE2QixxQkFBcUIsb0JBQW9CLG9CQUFvQiw4QkFBOEIsbUJBQW1CLG9CQUFvQixLQUFLLHlCQUF5Qix3QkFBd0IsS0FBSyw2QkFBNkIsbUJBQW1CLGlCQUFpQixrQkFBa0IsS0FBSyx1QkFBdUI7QUFDditPO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7O0FDUDFCOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCOztBQUVoQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0Q0FBNEMscUJBQXFCO0FBQ2pFOztBQUVBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHFCQUFxQixpQkFBaUI7QUFDdEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQixxQkFBcUI7QUFDekM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFOzs7Ozs7Ozs7O0FDakVhOztBQUViLGlDQUFpQywySEFBMkg7O0FBRTVKLDZCQUE2QixrS0FBa0s7O0FBRS9MLGlEQUFpRCxnQkFBZ0IsZ0VBQWdFLHdEQUF3RCw2REFBNkQsc0RBQXNELGtIQUFrSDs7QUFFOVosc0NBQXNDLHVEQUF1RCx1Q0FBdUMsU0FBUyxPQUFPLGtCQUFrQixFQUFFLGFBQWE7O0FBRXJMLHdDQUF3QyxnRkFBZ0YsZUFBZSxlQUFlLGdCQUFnQixvQkFBb0IsTUFBTSwwQ0FBMEMsK0JBQStCLGFBQWEscUJBQXFCLG1DQUFtQyxFQUFFLEVBQUUsY0FBYyxXQUFXLFVBQVUsRUFBRSxVQUFVLE1BQU0saURBQWlELEVBQUUsVUFBVSxrQkFBa0IsRUFBRSxFQUFFLGFBQWE7O0FBRXZlLCtCQUErQixvQ0FBb0M7O0FBRW5FO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxjQUFjO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0EsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQnlGO0FBQ3pGLFlBQXVGOztBQUV2Rjs7QUFFQTtBQUNBOztBQUVBLGFBQWEsMEdBQUcsQ0FBQyxtRkFBTzs7OztBQUl4QixpRUFBZSwwRkFBYyxNQUFNLEU7Ozs7Ozs7Ozs7QUNadEI7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RDs7QUFFdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLHdCQUF3QjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixpQkFBaUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQixLQUF3QyxHQUFHLHNCQUFpQixHQUFHLENBQUk7O0FBRW5GO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLHFFQUFxRSxxQkFBcUIsYUFBYTs7QUFFdkc7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBLHlEQUF5RDtBQUN6RCxHQUFHOztBQUVIOzs7QUFHQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCO0FBQzFCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLDRCQUE0QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxvQkFBb0IsNkJBQTZCO0FBQ2pEOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7Ozs7Ozs7QUM1UThCOztBQUVmO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0RkFBNEY7QUFDNUYsNEZBQTRGO0FBQzVGLDRGQUE0RjtBQUM1Riw0RkFBNEY7QUFDNUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBLGdDO0FBQ0EsbUJBQW1CO0FBQ25CLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUEsNEJBQTRCLGlCQUFpQjtBQUM3QztBQUNBLGdDQUFnQyxnQkFBZ0I7QUFDaEQsaUNBQWlDLDRDQUFNO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLFVBQVUsS0FBSyxFQUFFLEVBQ2pCO0FBQ1Q7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FDakw0Qjs7QUFFYjtBQUNmO0FBQ0EseUJBQXlCLDJDQUFLO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLHNCQUFzQjtBQUNwRDtBQUNBLDJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixrQkFBa0I7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQkFBc0IseUJBQXlCO0FBQy9DLDBDQUEwQyxNQUFNO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isc0RBQWdCOztBQUVsQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRCxhQUFhO0FBQ2I7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pELGFBQWE7QUFDYjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQsYUFBYTtBQUNiO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRCxhQUFhO0FBQ2I7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGtCQUFrQjtBQUN6QztBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7OztBQ3hlZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCLDRCQUE0QjtBQUN2RCxnQ0FBZ0MsbUNBQW1DO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELHVCQUF1QjtBQUMzRSxvREFBb0QsdUJBQXVCO0FBQzNFO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBOEQsd0JBQXdCO0FBQ3RGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RUFBeUUsZ0JBQWdCO0FBQ3pGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsWUFBWTs7QUFFekU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGdDQUFnQztBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1QsSzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsMkJBQTJCO0FBQzVEO0FBQ0E7QUFDQSxpQ0FBaUMsMkJBQTJCO0FBQzVEO0FBQ0E7QUFDQSwrQ0FBK0M7O0FBRS9DLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQiwyQkFBMkI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix5QkFBeUI7QUFDaEQ7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEI7QUFDQSx1QkFBdUIsZ0NBQWdDO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QixrQkFBa0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsR0FBRztBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLE9BQU87QUFDbkQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCLGFBQWE7QUFDeEM7QUFDQSwrQkFBK0IsYUFBYTtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQiwrQkFBK0IsV0FBVyxFQUFFLFdBQVc7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbmJBLGNBQWMsV0FBVztBQUNKO0FBQ1M7QUFDSztBQUNUO0FBQzFCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBLElBQUk7O0FBRUo7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHNDQUFJO0FBQ3ZCOztBQUVBO0FBQ0E7O0FBRUE7Ozs7QUFJQTtBQUNBLG1CQUFtQiwwQ0FBSTtBQUN2QjtBQUNBLHVCQUF1QiwrQ0FBUTtBQUMvQjtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckNjO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7VUN2Q0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxnQ0FBZ0MsWUFBWTtXQUM1QztXQUNBLEU7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRUFBRTtXQUNGO1dBQ0E7V0FDQSxDQUFDLEk7Ozs7O1dDUEQsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esa0M7Ozs7VUNmQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJpbmRleC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIlxcclxcblxcclxcbi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcclxcbiAgIHYyLjAgfCAyMDExMDEyNlxcclxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxyXFxuKi9cXHJcXG5cXHJcXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxyXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcclxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXHJcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxyXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXHJcXG5iLCB1LCBpLCBjZW50ZXIsXFxyXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXHJcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXHJcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXHJcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCwgXFxyXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLCBcXHJcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXHJcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcclxcblxcdG1hcmdpbjogMDtcXHJcXG5cXHRwYWRkaW5nOiAwO1xcclxcblxcdGJvcmRlcjogMDtcXHJcXG5cXHRmb250LXNpemU6IDEwMCU7XFxyXFxuXFx0Zm9udDogaW5oZXJpdDtcXHJcXG5cXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxyXFxufVxcclxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXHJcXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBcXHJcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcclxcblxcdGRpc3BsYXk6IGJsb2NrO1xcclxcbn1cXHJcXG5cXHJcXG5odG1sIHtcXHJcXG5cXHRiYWNrZ3JvdW5kOiAjNEQ2MThCO1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG5cXHRsaW5lLWhlaWdodDogMTtcXHJcXG5cXHRkaXNwbGF5OiBmbGV4O1xcclxcblxcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbn1cXHJcXG5vbCwgdWwge1xcclxcblxcdGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxufVxcclxcbmJsb2NrcXVvdGUsIHEge1xcclxcblxcdHF1b3Rlczogbm9uZTtcXHJcXG59XFxyXFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxyXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcclxcblxcdGNvbnRlbnQ6ICcnO1xcclxcblxcdGNvbnRlbnQ6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi8qXFxyXFxuKi9cXHJcXG5cXHJcXG50YWJsZSB7XFxyXFxuXFx0bWFyZ2luLXRvcDogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmhpZGUge1xcclxcblxcdGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblxcclxcblxcclxcbnRhYmxlIHtcXHJcXG5cXHQvKiBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlOyAqL1xcclxcblxcdC8qIGJhY2tncm91bmQ6IGJyb3duOyAgKi9cXHJcXG5cXHRib3JkZXItc3BhY2luZzogMTtcXHJcXG59XFxyXFxuLndhbGwtdG9wIHtcXHJcXG5cXHRib3JkZXItdG9wOiA1cHggc29saWQgI0ZGQjAwMDtcXHJcXG5cXHR6LWluZGV4OiA5O1xcclxcbn1cXHJcXG5cXHJcXG4ud2FsbC1ib3R0b20ge1xcclxcblxcdGJvcmRlci1ib3R0b206IDVweCBzb2xpZCAjRkZCMDAwO1xcclxcblxcdHotaW5kZXg6IDk7XFxyXFxufVxcclxcblxcclxcbi53YWxsLXJpZ2h0IHtcXHJcXG5cXHRib3JkZXItcmlnaHQ6IDVweCBzb2xpZCAjRkZCMDAwO1xcclxcblxcdHotaW5kZXg6IDk7XFxyXFxufVxcclxcblxcclxcbi53YWxsLWxlZnQge1xcclxcblxcdGJvcmRlci1sZWZ0OiA1cHggc29saWQgI0ZGQjAwMDtcXHJcXG5cXHR6LWluZGV4OiA5O1xcclxcbn1cXHJcXG5cXHJcXG4udGFibGUgeyBcXHJcXG5cXHRib3JkZXItc3BhY2luZzogMDsgXFxyXFxuXFx0ZGlzcGxheTogZmxleDtcXHJcXG5cXHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcblxcdC8qIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7ICAqL1xcclxcbn1cXHJcXG4udGFibGUgdGggeyBwYWRkaW5nOiAuNWVtOyB9XFxyXFxuLmhhbGwgeyBcXHJcXG5cXHQvKiBib3JkZXI6IDVweCBzb2xpZCAjM0E2MzhFOyAgKi9cXHJcXG5cXHQvKiB3aWR0aDogNGVtOyBoZWlnaHQ6IDRlbTsgICovXFxyXFxuXFx0ei1pbmRleDogNTtcXHJcXG59XFxyXFxuLnRhYmxlIC5mbG9vciB7IFxcclxcblxcdC8qIGJhY2tncm91bmQ6IGJyb3duOyAgKi9cXHJcXG5cXHRtYXJnaW46IDFweDtcXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxudGQge1xcclxcblxcdHdpZHRoOiA3NHB4O1xcclxcblxcdGhlaWdodDogNzRweDtcXHJcXG5cXHRib3JkZXI6IDVweCBzb2xpZCAjNEQ2MThCO1xcclxcblxcdGJhY2tncm91bmQ6ICM3Njg2QTg7IFxcclxcbn1cXHJcXG5cXHJcXG4uYnV0dG9uIHtcXHJcXG5cXHQvKiBtYXJnaW46IDIwcHggYXV0bzsgKi9cXHJcXG5cXHRwYWRkaW5nOiA1cHggN3B4O1xcclxcbn1cXHJcXG4uY29udHJvbGxlci1kaXYge1xcclxcblxcdG1hcmdpbjogYXV0bztcXHJcXG5cXHRwYWRkaW5nOiA1cHggN3B4O1xcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG4ucGxheWVyIHtcXHJcXG5cXHRmb250LXNpemU6IDIuNWVtO1xcclxcblxcdGxpbmUtaGVpZ2h0OiA3MHB4O1xcclxcblxcdHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmhpZ2hsaWdodCB7XFxyXFxuXFx0YmFja2dyb3VuZDogIzhEQkI1RTtcXHJcXG59XFxyXFxuLmhpZ2hsaWdodDpob3ZlcntcXHJcXG5cXHRiYWNrZ3JvdW5kOiAjQkRFMjk3O1xcclxcbn1cXHJcXG5cXHJcXG4ucGxheWVyLXR1cm4ge1xcclxcblxcdG1hcmdpbjogMjBweCBhdXRvO1xcclxcbn1cXHJcXG5cXHJcXG4ud2FsbC1jb3VudGVyLWRpdiB7XFxyXFxuXFx0bWFyZ2luLXRvcDogMzBweDtcXHJcXG5cXHRkaXNwbGF5OiBmbGV4O1xcclxcbn1cXHJcXG4ud2FsbC1jb3VudGVyIHtcXHJcXG5cXHRtYXJnaW46IGF1dG87XFxyXFxufVxcclxcblxcclxcbiNyZXN0YXJ0LWRpdiB7XFxyXFxuXFx0cG9zaXRpb246IGZpeGVkO1xcclxcblxcdGRpc3BsYXk6IGZsZXg7XFxyXFxuXFx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG5cXHRmb250LXNpemU6IDJlbTtcXHJcXG5cXHRwYWRkaW5nOiAxNXB4O1xcclxcblxcdG1hcmdpbjogMjAwcHg7XFxyXFxuXFx0YmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxyXFxuXFx0d2lkdGg6IDQwMHB4O1xcclxcblxcdGhlaWdodDogMjAwcHg7XFxyXFxufVxcclxcblxcclxcbiNyZXN0YXJ0LWRpdiBoMSB7XFxyXFxuXFx0bWFyZ2luOiAxMHB4IGF1dG87XFxyXFxufVxcclxcblxcclxcbiNyZXN0YXJ0LWRpdiBidXR0b24ge1xcclxcblxcdG1hcmdpbjogYXV0bztcXHJcXG5cXHR3aWR0aDogMzAlO1xcclxcblxcdGhlaWdodDogMTUlO1xcclxcbn1cXHJcXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCI7O0FBRUE7OztDQUdDOztBQUVEOzs7Ozs7Ozs7Ozs7O0NBYUMsU0FBUztDQUNULFVBQVU7Q0FDVixTQUFTO0NBQ1QsZUFBZTtDQUNmLGFBQWE7Q0FDYix3QkFBd0I7QUFDekI7QUFDQSxnREFBZ0Q7QUFDaEQ7O0NBRUMsY0FBYztBQUNmOztBQUVBO0NBQ0MsbUJBQW1CO0FBQ3BCOztBQUVBO0NBQ0MsY0FBYztDQUNkLGFBQWE7Q0FDYix1QkFBdUI7QUFDeEI7QUFDQTtDQUNDLGdCQUFnQjtBQUNqQjtBQUNBO0NBQ0MsWUFBWTtBQUNiO0FBQ0E7O0NBRUMsV0FBVztDQUNYLGFBQWE7QUFDZDs7QUFFQTtDQUNDOztBQUVEO0NBQ0MsZ0JBQWdCO0FBQ2pCOztBQUVBO0NBQ0MsYUFBYTtBQUNkOzs7QUFHQTtDQUNDLCtCQUErQjtDQUMvQix3QkFBd0I7Q0FDeEIsaUJBQWlCO0FBQ2xCO0FBQ0E7Q0FDQyw2QkFBNkI7Q0FDN0IsVUFBVTtBQUNYOztBQUVBO0NBQ0MsZ0NBQWdDO0NBQ2hDLFVBQVU7QUFDWDs7QUFFQTtDQUNDLCtCQUErQjtDQUMvQixVQUFVO0FBQ1g7O0FBRUE7Q0FDQyw4QkFBOEI7Q0FDOUIsVUFBVTtBQUNYOztBQUVBO0NBQ0MsaUJBQWlCO0NBQ2pCLGFBQWE7Q0FDYixzQkFBc0I7Q0FDdEIsZ0NBQWdDO0FBQ2pDO0FBQ0EsWUFBWSxhQUFhLEVBQUU7QUFDM0I7Q0FDQyxnQ0FBZ0M7Q0FDaEMsOEJBQThCO0NBQzlCLFVBQVU7QUFDWDtBQUNBO0NBQ0Msd0JBQXdCO0NBQ3hCLFdBQVc7QUFDWjs7O0FBR0E7Q0FDQyxXQUFXO0NBQ1gsWUFBWTtDQUNaLHlCQUF5QjtDQUN6QixtQkFBbUI7QUFDcEI7O0FBRUE7Q0FDQyx1QkFBdUI7Q0FDdkIsZ0JBQWdCO0FBQ2pCO0FBQ0E7Q0FDQyxZQUFZO0NBQ1osZ0JBQWdCO0FBQ2pCOzs7QUFHQTtDQUNDLGdCQUFnQjtDQUNoQixpQkFBaUI7Q0FDakIsa0JBQWtCO0FBQ25COztBQUVBO0NBQ0MsbUJBQW1CO0FBQ3BCO0FBQ0E7Q0FDQyxtQkFBbUI7QUFDcEI7O0FBRUE7Q0FDQyxpQkFBaUI7QUFDbEI7O0FBRUE7Q0FDQyxnQkFBZ0I7Q0FDaEIsYUFBYTtBQUNkO0FBQ0E7Q0FDQyxZQUFZO0FBQ2I7O0FBRUE7Q0FDQyxlQUFlO0NBQ2YsYUFBYTtDQUNiLHNCQUFzQjtDQUN0QixjQUFjO0NBQ2QsYUFBYTtDQUNiLGFBQWE7Q0FDYix1QkFBdUI7Q0FDdkIsWUFBWTtDQUNaLGFBQWE7QUFDZDs7QUFFQTtDQUNDLGlCQUFpQjtBQUNsQjs7QUFFQTtDQUNDLFlBQVk7Q0FDWixVQUFVO0NBQ1YsV0FBVztBQUNaXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIlxcclxcblxcclxcbi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcclxcbiAgIHYyLjAgfCAyMDExMDEyNlxcclxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxyXFxuKi9cXHJcXG5cXHJcXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxyXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcclxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXHJcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxyXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXHJcXG5iLCB1LCBpLCBjZW50ZXIsXFxyXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXHJcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXHJcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXHJcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCwgXFxyXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLCBcXHJcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXHJcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcclxcblxcdG1hcmdpbjogMDtcXHJcXG5cXHRwYWRkaW5nOiAwO1xcclxcblxcdGJvcmRlcjogMDtcXHJcXG5cXHRmb250LXNpemU6IDEwMCU7XFxyXFxuXFx0Zm9udDogaW5oZXJpdDtcXHJcXG5cXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxyXFxufVxcclxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXHJcXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBcXHJcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcclxcblxcdGRpc3BsYXk6IGJsb2NrO1xcclxcbn1cXHJcXG5cXHJcXG5odG1sIHtcXHJcXG5cXHRiYWNrZ3JvdW5kOiAjNEQ2MThCO1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG5cXHRsaW5lLWhlaWdodDogMTtcXHJcXG5cXHRkaXNwbGF5OiBmbGV4O1xcclxcblxcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbn1cXHJcXG5vbCwgdWwge1xcclxcblxcdGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxufVxcclxcbmJsb2NrcXVvdGUsIHEge1xcclxcblxcdHF1b3Rlczogbm9uZTtcXHJcXG59XFxyXFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxyXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcclxcblxcdGNvbnRlbnQ6ICcnO1xcclxcblxcdGNvbnRlbnQ6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi8qXFxyXFxuKi9cXHJcXG5cXHJcXG50YWJsZSB7XFxyXFxuXFx0bWFyZ2luLXRvcDogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmhpZGUge1xcclxcblxcdGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblxcclxcblxcclxcbnRhYmxlIHtcXHJcXG5cXHQvKiBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlOyAqL1xcclxcblxcdC8qIGJhY2tncm91bmQ6IGJyb3duOyAgKi9cXHJcXG5cXHRib3JkZXItc3BhY2luZzogMTtcXHJcXG59XFxyXFxuLndhbGwtdG9wIHtcXHJcXG5cXHRib3JkZXItdG9wOiA1cHggc29saWQgI0ZGQjAwMDtcXHJcXG5cXHR6LWluZGV4OiA5O1xcclxcbn1cXHJcXG5cXHJcXG4ud2FsbC1ib3R0b20ge1xcclxcblxcdGJvcmRlci1ib3R0b206IDVweCBzb2xpZCAjRkZCMDAwO1xcclxcblxcdHotaW5kZXg6IDk7XFxyXFxufVxcclxcblxcclxcbi53YWxsLXJpZ2h0IHtcXHJcXG5cXHRib3JkZXItcmlnaHQ6IDVweCBzb2xpZCAjRkZCMDAwO1xcclxcblxcdHotaW5kZXg6IDk7XFxyXFxufVxcclxcblxcclxcbi53YWxsLWxlZnQge1xcclxcblxcdGJvcmRlci1sZWZ0OiA1cHggc29saWQgI0ZGQjAwMDtcXHJcXG5cXHR6LWluZGV4OiA5O1xcclxcbn1cXHJcXG5cXHJcXG4udGFibGUgeyBcXHJcXG5cXHRib3JkZXItc3BhY2luZzogMDsgXFxyXFxuXFx0ZGlzcGxheTogZmxleDtcXHJcXG5cXHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcblxcdC8qIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7ICAqL1xcclxcbn1cXHJcXG4udGFibGUgdGggeyBwYWRkaW5nOiAuNWVtOyB9XFxyXFxuLmhhbGwgeyBcXHJcXG5cXHQvKiBib3JkZXI6IDVweCBzb2xpZCAjM0E2MzhFOyAgKi9cXHJcXG5cXHQvKiB3aWR0aDogNGVtOyBoZWlnaHQ6IDRlbTsgICovXFxyXFxuXFx0ei1pbmRleDogNTtcXHJcXG59XFxyXFxuLnRhYmxlIC5mbG9vciB7IFxcclxcblxcdC8qIGJhY2tncm91bmQ6IGJyb3duOyAgKi9cXHJcXG5cXHRtYXJnaW46IDFweDtcXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxudGQge1xcclxcblxcdHdpZHRoOiA3NHB4O1xcclxcblxcdGhlaWdodDogNzRweDtcXHJcXG5cXHRib3JkZXI6IDVweCBzb2xpZCAjNEQ2MThCO1xcclxcblxcdGJhY2tncm91bmQ6ICM3Njg2QTg7IFxcclxcbn1cXHJcXG5cXHJcXG4uYnV0dG9uIHtcXHJcXG5cXHQvKiBtYXJnaW46IDIwcHggYXV0bzsgKi9cXHJcXG5cXHRwYWRkaW5nOiA1cHggN3B4O1xcclxcbn1cXHJcXG4uY29udHJvbGxlci1kaXYge1xcclxcblxcdG1hcmdpbjogYXV0bztcXHJcXG5cXHRwYWRkaW5nOiA1cHggN3B4O1xcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG4ucGxheWVyIHtcXHJcXG5cXHRmb250LXNpemU6IDIuNWVtO1xcclxcblxcdGxpbmUtaGVpZ2h0OiA3MHB4O1xcclxcblxcdHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmhpZ2hsaWdodCB7XFxyXFxuXFx0YmFja2dyb3VuZDogIzhEQkI1RTtcXHJcXG59XFxyXFxuLmhpZ2hsaWdodDpob3ZlcntcXHJcXG5cXHRiYWNrZ3JvdW5kOiAjQkRFMjk3O1xcclxcbn1cXHJcXG5cXHJcXG4ucGxheWVyLXR1cm4ge1xcclxcblxcdG1hcmdpbjogMjBweCBhdXRvO1xcclxcbn1cXHJcXG5cXHJcXG4ud2FsbC1jb3VudGVyLWRpdiB7XFxyXFxuXFx0bWFyZ2luLXRvcDogMzBweDtcXHJcXG5cXHRkaXNwbGF5OiBmbGV4O1xcclxcbn1cXHJcXG4ud2FsbC1jb3VudGVyIHtcXHJcXG5cXHRtYXJnaW46IGF1dG87XFxyXFxufVxcclxcblxcclxcbiNyZXN0YXJ0LWRpdiB7XFxyXFxuXFx0cG9zaXRpb246IGZpeGVkO1xcclxcblxcdGRpc3BsYXk6IGZsZXg7XFxyXFxuXFx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG5cXHRmb250LXNpemU6IDJlbTtcXHJcXG5cXHRwYWRkaW5nOiAxNXB4O1xcclxcblxcdG1hcmdpbjogMjAwcHg7XFxyXFxuXFx0YmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxyXFxuXFx0d2lkdGg6IDQwMHB4O1xcclxcblxcdGhlaWdodDogMjAwcHg7XFxyXFxufVxcclxcblxcclxcbiNyZXN0YXJ0LWRpdiBoMSB7XFxyXFxuXFx0bWFyZ2luOiAxMHB4IGF1dG87XFxyXFxufVxcclxcblxcclxcbiNyZXN0YXJ0LWRpdiBidXR0b24ge1xcclxcblxcdG1hcmdpbjogYXV0bztcXHJcXG5cXHR3aWR0aDogMzAlO1xcclxcblxcdGhlaWdodDogMTUlO1xcclxcbn1cXHJcXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgcmV0dXJuIFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChjb250ZW50LCBcIn1cIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oJycpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gKG1vZHVsZXMsIG1lZGlhUXVlcnksIGRlZHVwZSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgJyddXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IG1vZHVsZXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19pXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udGludWVcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYVF1ZXJ5KSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMl0gPSBcIlwiLmNvbmNhdChtZWRpYVF1ZXJ5LCBcIiBhbmQgXCIpLmNvbmNhdChpdGVtWzJdKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwidW5kZWZpbmVkXCIgfHwgIShTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pIHtcbiAgdmFyIF9pdGVtID0gX3NsaWNlZFRvQXJyYXkoaXRlbSwgNCksXG4gICAgICBjb250ZW50ID0gX2l0ZW1bMV0sXG4gICAgICBjc3NNYXBwaW5nID0gX2l0ZW1bM107XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8ICcnKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59OyIsImltcG9ydCBhcGkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgICAgICAgIGltcG9ydCBjb250ZW50IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuaW5zZXJ0ID0gXCJoZWFkXCI7XG5vcHRpb25zLnNpbmdsZXRvbiA9IGZhbHNlO1xuXG52YXIgdXBkYXRlID0gYXBpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY29udGVudC5sb2NhbHMgfHwge307IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpc09sZElFID0gZnVuY3Rpb24gaXNPbGRJRSgpIHtcbiAgdmFyIG1lbW87XG4gIHJldHVybiBmdW5jdGlvbiBtZW1vcml6ZSgpIHtcbiAgICBpZiAodHlwZW9mIG1lbW8gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuICAgICAgLy8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuICAgICAgLy8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuICAgICAgLy8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG4gICAgICAvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcbiAgICAgIG1lbW8gPSBCb29sZWFuKHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWVtbztcbiAgfTtcbn0oKTtcblxudmFyIGdldFRhcmdldCA9IGZ1bmN0aW9uIGdldFRhcmdldCgpIHtcbiAgdmFyIG1lbW8gPSB7fTtcbiAgcmV0dXJuIGZ1bmN0aW9uIG1lbW9yaXplKHRhcmdldCkge1xuICAgIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgICB9XG5cbiAgICByZXR1cm4gbWVtb1t0YXJnZXRdO1xuICB9O1xufSgpO1xuXG52YXIgc3R5bGVzSW5Eb20gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRvbS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRvbVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdXG4gICAgfTtcblxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRvbVtpbmRleF0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZXNJbkRvbS5wdXNoKHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogYWRkU3R5bGUob2JqLCBvcHRpb25zKSxcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgdmFyIGF0dHJpYnV0ZXMgPSBvcHRpb25zLmF0dHJpYnV0ZXMgfHwge307XG5cbiAgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzLm5vbmNlID09PSAndW5kZWZpbmVkJykge1xuICAgIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gJ3VuZGVmaW5lZCcgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgICBpZiAobm9uY2UpIHtcbiAgICAgIGF0dHJpYnV0ZXMubm9uY2UgPSBub25jZTtcbiAgICB9XG4gIH1cblxuICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBzdHlsZS5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuICB9KTtcblxuICBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgb3B0aW9ucy5pbnNlcnQoc3R5bGUpO1xuICB9IGVsc2Uge1xuICAgIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQob3B0aW9ucy5pbnNlcnQgfHwgJ2hlYWQnKTtcblxuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICAgIH1cblxuICAgIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gIH1cblxuICByZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbnZhciByZXBsYWNlVGV4dCA9IGZ1bmN0aW9uIHJlcGxhY2VUZXh0KCkge1xuICB2YXIgdGV4dFN0b3JlID0gW107XG4gIHJldHVybiBmdW5jdGlvbiByZXBsYWNlKGluZGV4LCByZXBsYWNlbWVudCkge1xuICAgIHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcbiAgICByZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcbiAgfTtcbn0oKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyhzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG4gIHZhciBjc3MgPSByZW1vdmUgPyAnJyA6IG9iai5tZWRpYSA/IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIikuY29uY2F0KG9iai5jc3MsIFwifVwiKSA6IG9iai5jc3M7IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG4gICAgdmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG4gICAgaWYgKGNoaWxkTm9kZXNbaW5kZXhdKSB7XG4gICAgICBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG4gICAgfVxuXG4gICAgaWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICBzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZSwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBvYmouY3NzO1xuICB2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChtZWRpYSkge1xuICAgIHN0eWxlLnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBtZWRpYSk7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUucmVtb3ZlQXR0cmlidXRlKCdtZWRpYScpO1xuICB9XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlLmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyIHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xuXG5mdW5jdGlvbiBhZGRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlO1xuICB2YXIgdXBkYXRlO1xuICB2YXIgcmVtb3ZlO1xuXG4gIGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuICAgIHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuICAgIHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuICAgIHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuICAgIHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUgPSBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gICAgdXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblxuICAgIHJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG4gICAgfTtcbiAgfVxuXG4gIHVwZGF0ZShvYmopO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmUoKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307IC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuICAvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cbiAgaWYgKCFvcHRpb25zLnNpbmdsZXRvbiAmJiB0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gIT09ICdib29sZWFuJykge1xuICAgIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuICB9XG5cbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChuZXdMaXN0KSAhPT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5Eb21baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRvbVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5Eb21bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5Eb20uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJpbXBvcnQgU3F1YXJlIGZyb20gXCIuL3NxdWFyZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9hcmQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IDk7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSA5O1xyXG4gICAgICAgIHRoaXMuZ3JpZCA9IEJvYXJkLm1ha2VHcmlkKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLndpbm5lciA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBsYXllcnMocGxheWVyMSwgcDFQb3MsIHBsYXllcjIsIHAyUG9zKSB7XHJcbiAgICAgICAgLyogcDFQb3MgJiBwMlBvcyA9IFtyb3csIGNvbF0gKi9cclxuICAgICAgICBsZXQgZ3JpZFNxdWFyZTIgPSB0aGlzLmdyaWRbcDJQb3NbMF1dW3AyUG9zWzFdXTtcclxuICAgICAgICBsZXQgZ3JpZFNxdWFyZTEgPSB0aGlzLmdyaWRbcDFQb3NbMF1dW3AxUG9zWzFdXTtcclxuICAgICAgICBpZighIXBsYXllcjIpIHtcclxuICAgICAgICAgICAgZ3JpZFNxdWFyZTIubW9kZWwgPSBcInBlcnNvblwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdyaWRTcXVhcmUyLm1vZGVsID0gXCJhaVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighIXBsYXllcjEpIHtcclxuICAgICAgICAgICAgZ3JpZFNxdWFyZTEubW9kZWwgPSBcInBlcnNvblwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdyaWRTcXVhcmUxLm1vZGVsID0gXCJhaVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBncmlkU3F1YXJlMi5wbGF5ZXIgPSBcInBsYXllcjJcIjtcclxuICAgICAgICBncmlkU3F1YXJlMS5wbGF5ZXIgPSBcInBsYXllcjFcIjtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja05laWdoYm9ycyhzcXVhcmUpIHtcclxuICAgICAgICAvKiBcclxuICAgICAgICByZXF1aXJlcyBbW251bV1bbnVtXV0gXHJcbiAgICAgICAgc3F1YXJlID0gW3Jvd0lkeCwgY29sSWR4XVxyXG4gICAgICAgICovXHJcbiAgICAgICAgbGV0IG5laWdoYm9ycyA9IFtdO1xyXG4gICAgICAgIGxldCBjb2xJZHggPSBzcXVhcmVbMV07XHJcbiAgICAgICAgbGV0IHJvd0lkeCAgPSBzcXVhcmVbMF07XHJcbiAgICAgICAgKHJvd0lkeCAtIDEgPj0gMCkgPyBuZWlnaGJvcnMucHVzaChbcm93SWR4IC0gMSwgY29sSWR4XSkgOiBuZWlnaGJvcnMucHVzaChbLTEsIC0xXSk7ICAvLyBub3J0aFxyXG4gICAgICAgIChyb3dJZHggKyAxIDw9IDgpID8gbmVpZ2hib3JzLnB1c2goW3Jvd0lkeCArIDEsIGNvbElkeF0pIDogbmVpZ2hib3JzLnB1c2goWy0xLCAtMV0pOyAgLy8gc291dGhcclxuICAgICAgICAoY29sSWR4IC0gMSA+PSAwKSA/IG5laWdoYm9ycy5wdXNoKFtyb3dJZHgsIGNvbElkeCAtIDFdKSA6IG5laWdoYm9ycy5wdXNoKFstMSwgLTFdKTsgIC8vIHdlc3RcclxuICAgICAgICAoY29sSWR4ICsgMSA8PSA4KSA/IG5laWdoYm9ycy5wdXNoKFtyb3dJZHgsIGNvbElkeCArIDFdKSA6IG5laWdoYm9ycy5wdXNoKFstMSwgLTFdKTsgIC8vIGVhc3RcclxuICAgICAgICByZXR1cm4gbmVpZ2hib3JzO1xyXG4gICAgfVxyXG5cclxuICAgIGlzV2FsbGVkKGRpciwgcm93SWR4LCBjb2xJZHgpIHtcclxuICAgICAgICAvKiBcclxuICAgICAgICAgcmV0dXJucyB0cnVlIGlmIHBhdGggaXMgYmxvY2tlZCBieSB3YWxsXHJcbiAgICAgICAgIHJldHVybnMgZmFsc2UgaWYgcGF0aCBpcyBmcmVlXHJcbiAgICAgICAgKi9cclxuICAgICAgIFxyXG4gICAgICAgIGxldCBzcXVhcmUgPSB0aGlzLmdyaWRbcm93SWR4XVtjb2xJZHhdO1xyXG4gICAgICAgIGlmKGRpciA9PT0gXCJ1cFwiKSB7XHJcbiAgICAgICAgICAgIGlmKHNxdWFyZS53YWxscy5Ob3J0aCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGRpciA9PT0gXCJyaWdodFwiKSB7XHJcbiAgICAgICAgICAgIGlmKHNxdWFyZS53YWxscy5FYXN0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZGlyID09PSBcImRvd25cIikge1xyXG4gICAgICAgICAgICBpZihzcXVhcmUud2FsbHMuU291dGgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChkaXIgPT09IFwibGVmdFwiKSB7XHJcbiAgICAgICAgICAgIGlmKHNxdWFyZS53YWxscy5XZXN0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGJmcyhyb290LCBnb2FsID0gW1wiMDBcIixcIjAxXCIsXCIwMlwiLFwiMDNcIixcIjA0XCIsXCIwNVwiLFwiMDZcIixcIjA3XCIsXCIwOFwiXSkge1xyXG4gICAgICAgIC8qIFxyXG4gICAgICAgIHJvb3QgPT09IFtyb3dJZHgsIGNvbElkeF1cclxuXHJcbiAgICAgICAgdGhpcyBmdW5jdGlvbiBpcyBzbyBjcnVzdHkgXHJcbiAgICAgICAgKi9cclxuXHJcblxyXG4gICAgICAgIGxldCBoYXNobWFwID0gbmV3IE1hcCgpOyBcclxuICAgICAgICBsZXQgUSA9IFtdOyAvL2FycmF5IG9mIFtyb3csIGNvbF1cclxuICAgICAgICBsZXQgZGlzY292ZXJlZCA9IFtdOyAvL2FycmF5IG9mIGlkXHJcbiAgICAgICAgaGFzaG1hcC5zZXQocm9vdCwgbnVsbClcclxuICAgICAgICBRLnB1c2gocm9vdCk7XHJcbiAgICAgICAgZGlzY292ZXJlZC5wdXNoKHJvb3Quam9pbihcIlwiKSk7XHJcbiAgICAgICAgd2hpbGUgKFEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgdiA9IFEuc2hpZnQoKTsgLy8gcG9zXHJcbiAgICAgICAgICAgIGxldCBpZCA9IHYuam9pbihcIlwiKTtcclxuICAgICAgICAgICAgbGV0IHNxdWFyZSA9IHRoaXMuZ3JpZFt2WzBdXVt2WzFdXTsgLy9zcXVhcmVcclxuICAgICAgICAgICAgaWYgKGdvYWwuaW5jbHVkZXMoaWQpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGF0aCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgcGF0aCA9IHRoaXMudHJhdmVyc2VIYXNobWFwKGhhc2htYXAsIHYuam9pbihcIlwiKSk7XHJcbiAgICAgICAgICAgICAgICBwYXRoLnB1c2godi5qb2luKFwiXCIpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbdi5qb2luKFwiXCIpLCBwYXRoXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBmaW5kaW5nIGFsbCBwb3NzaWJsZSBkaXJlY3Rpb25zXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoKCFzcXVhcmUud2FsbHMuTm9ydGggJiYgKHBhcnNlSW50KHZbMF0pID4gMCkpKXtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdWID0gdi5qb2luKFwiXCIpLnNwbGl0KFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgbmV3VlswXSA9IHBhcnNlSW50KG5ld1ZbMF0pIC0gMTtcclxuICAgICAgICAgICAgICAgIGlkID0gbmV3Vi5qb2luKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkaXNjb3ZlcmVkLmluY2x1ZGVzKGlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2NvdmVyZWQucHVzaChpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgUS5wdXNoKG5ld1YpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc2htYXAuc2V0KG5ld1Yuam9pbihcIlwiKSwgdi5qb2luKFwiXCIpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoKCFzcXVhcmUud2FsbHMuU291dGggJiYgKHBhcnNlSW50KHZbMF0pIDwgOCkpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3ViA9IHYuam9pbihcIlwiKS5zcGxpdChcIlwiKTtcclxuICAgICAgICAgICAgICAgIG5ld1ZbMF0gPSBwYXJzZUludChuZXdWWzBdKSArIDE7XHJcbiAgICAgICAgICAgICAgICBpZCA9IG5ld1Yuam9pbihcIlwiKTtcclxuICAgICAgICAgICAgICAgIGlmICghZGlzY292ZXJlZC5pbmNsdWRlcyhpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNjb3ZlcmVkLnB1c2goaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIFEucHVzaChuZXdWKTtcclxuICAgICAgICAgICAgICAgICAgICBoYXNobWFwLnNldChuZXdWLmpvaW4oXCJcIiksIHYuam9pbihcIlwiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCghc3F1YXJlLndhbGxzLkVhc3QgJiYgKHBhcnNlSW50KHZbMV0pIDwgOCkpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3ViA9IHYuam9pbihcIlwiKS5zcGxpdChcIlwiKTtcclxuICAgICAgICAgICAgICAgIG5ld1ZbMV0gPSBwYXJzZUludChuZXdWWzFdKSArIDE7XHJcbiAgICAgICAgICAgICAgICBpZCA9IG5ld1Yuam9pbihcIlwiKTtcclxuICAgICAgICAgICAgICAgIGlmICghZGlzY292ZXJlZC5pbmNsdWRlcyhpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNjb3ZlcmVkLnB1c2goaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIFEucHVzaChuZXdWKTtcclxuICAgICAgICAgICAgICAgICAgICBoYXNobWFwLnNldChuZXdWLmpvaW4oXCJcIiksIHYuam9pbihcIlwiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCghc3F1YXJlLndhbGxzLldlc3QgJiYgKHBhcnNlSW50KHZbMV0pID4gMCkpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3ViA9IHYuam9pbihcIlwiKS5zcGxpdChcIlwiKTtcclxuICAgICAgICAgICAgICAgIG5ld1ZbMV0gPSBwYXJzZUludChuZXdWWzFdKSAtIDE7XHJcbiAgICAgICAgICAgICAgICBpZCA9IG5ld1Yuam9pbihcIlwiKTtcclxuICAgICAgICAgICAgICAgIGlmICghZGlzY292ZXJlZC5pbmNsdWRlcyhpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNjb3ZlcmVkLnB1c2goaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIFEucHVzaChuZXdWKTtcclxuICAgICAgICAgICAgICAgICAgICBoYXNobWFwLnNldChuZXdWLmpvaW4oXCJcIiksIHYuam9pbihcIlwiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHRyYXZlcnNlSGFzaG1hcChoYXNoLCBzdGFydCkge1xyXG4gICAgICAgIGxldCBub2RlID0gaGFzaC5nZXQoc3RhcnQpO1xyXG4gICAgICAgIGxldCBwYXRoID0gW107XHJcbiAgICAgICAgd2hpbGUgKG5vZGUpIHtcclxuICAgICAgICAgICAgcGF0aC5wdXNoKG5vZGUpXHJcbiAgICAgICAgICAgIG5vZGUgPSBoYXNoLmdldChub2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBhdGgucmV2ZXJzZSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzdGF0aWMgbWFrZUdyaWQod2lkdGgsIGhlaWdodCkge1xyXG4gICAgICAgIGNvbnN0IGdyaWQgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgcm93SWR4ID0gMDsgcm93SWR4IDwgaGVpZ2h0OyByb3dJZHgrKykge1xyXG4gICAgICAgICAgICBncmlkLnB1c2goW10pO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjb2xJZHggPSAwOyBjb2xJZHggPCB3aWR0aDsgY29sSWR4KyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBzcXVhcmUgPSBuZXcgU3F1YXJlKGNvbElkeCAsIHJvd0lkeClcclxuICAgICAgICAgICAgICAgIGdyaWRbcm93SWR4XS5wdXNoKHNxdWFyZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGdyaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGlzVmFsaWRQb3MoY29sSWR4LCByb3dJZHgpIHtcclxuICAgICAgICAvLyB2YWxpZGF0aW9uIHRvIGNoZWNrIHRoZSBlbmRzIG9mIHRoZSBib2FyZFxyXG4gICAgICAgIGlmICgoY29sSWR4IDwgMCB8fCByb3dJZHggPCAwKSB8fCAoY29sSWR4ID4gOCB8fCByb3dJZHggPiA4KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmIChmYWxzZSkge1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IEJvYXJkIGZyb20gXCIuL2JvYXJkXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuYm9hcmQgPSBuZXcgQm9hcmQoKTtcclxuICAgICAgICB0aGlzLmdyaWQgPSB0aGlzLmJvYXJkLmdyaWQ7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGxheWVyID0gXCJub29uZVwiO1xyXG4gICAgICAgIC8qIHRoaXMucGxheWVyID0gW3Jvd0lkeCwgY29sSWR4XSAqL1xyXG4gICAgICAgIHRoaXMucGxheWVyMSA9IFs4LCA0XTtcclxuICAgICAgICB0aGlzLnBsYXllcjIgPSBbMCwgNF07XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIxV2FsbHMgPSAxMDtcclxuICAgICAgICB0aGlzLnBsYXllcjJXYWxscyA9IDEwO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBcIm5vdCBkb2luZyBhbnl0aGluZ1wiO1xyXG5cclxuICAgICAgICB0aGlzLm1vdmVQbGF5ZXIgPSB0aGlzLm1vdmVQbGF5ZXIuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBpc092ZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMud2lubmVyKCkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlckFpVHVybigpIHtcclxuICAgICAgICBpZih0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyMlwiKSB7XHJcbiAgICAgICAgICAgIGxldCBwMlBhdGggPSB0aGlzLmJvYXJkLmJmcyh0aGlzLnBsYXllcjIsIFtcIjgwXCIsXCI4MVwiLFwiODJcIixcIjgzXCIsXCI4NFwiLFwiODVcIixcIjg2XCIsXCI4N1wiLFwiODhcIl0pXHJcbiAgICAgICAgICAgIGxldCBwMVBhdGggPSB0aGlzLmJvYXJkLmJmcyh0aGlzLnBsYXllcjEpO1xyXG4gICAgICAgICAgICBsZXQgcmFuZG9tID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJhbmRvbSk7XHJcbiAgICAgICAgICAgIGlmICgocDFQYXRoWzFdLmxlbmd0aCA8PSBwMlBhdGhbMV0ubGVuZ3RoKSAmJiAodGhpcy5wbGF5ZXIyV2FsbHMgPiAwKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwbGFjaW5nIHdhbGxcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInBhdGggPT4gXCIsIHAxUGF0aCk7XHJcbiAgICAgICAgICAgICAgICAvKiBwbGFjZSB3YWxsIGlmIHBsYXllcjEgaXMgY2xvc2VyIHRvIGdvYWwgKi9cclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwMVBhdGhbMV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93SWR4ID0gcDFQYXRoWzFdW2ldLnNwbGl0KFwiXCIpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xJZHggPSBwMVBhdGhbMV1baV0uc3BsaXQoXCJcIilbMV07ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5leHRSb3dJZHggPSBwMVBhdGhbMV1baSArIDFdLnNwbGl0KFwiXCIpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXh0Q29sSWR4ID0gcDFQYXRoWzFdW2kgKyAxXS5zcGxpdChcIlwiKVsxXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGxhY2VkV2FsbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcXVhcmVBID0gW3BhcnNlSW50KG5leHRSb3dJZHgpLCBwYXJzZUludChuZXh0Q29sSWR4KV07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNxdWFyZU5laWdoYm9ycyA9IHRoaXMuYm9hcmQuY2hlY2tOZWlnaGJvcnMoc3F1YXJlQSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJuZWlnaGJvcnMgPT4gXCIsIHNxdWFyZU5laWdoYm9ycyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNxdWFyZUI7XHJcbiAgICAgICAgICAgICAgICAgICAgLyogXHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdCBhbmQgdXAgXHJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VXYWxsKGRpciwgZXZlbnQsIHNxdWFyZUEsIHNxdWFyZUIpXHJcbiAgICAgICAgICAgICAgICAgICAgZGlyID0gTm9ydGgsIFNvdXRoLCBFYXN0LCBXZXN0XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQgPSBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgc3F1YXJlQSA9IFtyb3dJZHgsIGNvbElkeF1cclxuICAgICAgICAgICAgICAgICAgICBzcXVhcmVCID0gW3Jvd0lkeCwgY29sSWR4XVxyXG4gICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyb3cgPT4gXCIsIHJvd0lkeCwgbmV4dFJvd0lkeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb2wgPT4gXCIsIGNvbElkeCwgbmV4dENvbElkeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY29sSWR4ID09PSBuZXh0Q29sSWR4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGggaXMgbW92aW5nIHVwIG9yIGRvd25cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2sgbmVpZ2hib3JzIGFuZCBzZXQgc3F1YXJlQiB0byBhIHZhbGlkIG9uZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZWlnaGJvcnMgPSBbbm9ydGgsIHNvdXRoLCB3ZXN0LCBlYXN0XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2UgcmFuZG9tIGlmIHlvdSB3YW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNxdWFyZUEgPSBuZXh0IGJlc3QgcG9zIG9mIHBsYXllcjEgKG9wcG9uZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmVCID0gc3F1YXJlIHRvIHRoZSB3ZXN0IG9mIHNxdWFyZUFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJhbmRvbSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNxdWFyZU5laWdoYm9yc1syXVswXSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmVCID0gc3F1YXJlTmVpZ2hib3JzWzJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmVCID0gc3F1YXJlTmVpZ2hib3JzWzNdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNxdWFyZU5laWdoYm9yc1szXVswXSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmVCID0gc3F1YXJlTmVpZ2hib3JzWzNdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmVCID0gc3F1YXJlTmVpZ2hib3JzWzJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3F1YXJlcyA9PiBcIiwgc3F1YXJlQSwgc3F1YXJlQik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlZFdhbGwgPSB0aGlzLnBsYWNlV2FsbChcIlNvdXRoXCIsIG51bGwsIHNxdWFyZUEsIHNxdWFyZUIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYWNlZHdhbGwgPT4gXCIsIHBsYWNlZFdhbGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGxhY2VkV2FsbCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJicmVha2luZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcGxhY2VkV2FsbCA9IHRoaXMucGxhY2VXYWxsKFwiTm9ydGhcIiwgbnVsbCwgc3F1YXJlQSwgc3F1YXJlQik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInBsYWNlZHdhbGwgPT4gXCIsIHBsYWNlZFdhbGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHBsYWNlZFdhbGwgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcImJyZWFraW5nXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcImhvdyBkaWQgaSBlbmQgdXAgaGVyZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93SWR4ID09PSBuZXh0Um93SWR4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyYW5kb20gPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcXVhcmVOZWlnaGJvcnNbMF1bMF0gIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlQiA9IHNxdWFyZU5laWdoYm9yc1swXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlQiA9IHNxdWFyZU5laWdoYm9yc1sxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcXVhcmVOZWlnaGJvcnNbMV1bMF0gIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlQiA9IHNxdWFyZU5laWdoYm9yc1sxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlQiA9IHNxdWFyZU5laWdoYm9yc1swXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbElkeCA+IG5leHRDb2xJZHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNxdWFyZUEsIHNxdWFyZUIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VkV2FsbCA9IHRoaXMucGxhY2VXYWxsKFwiRWFzdFwiLCBudWxsLCBzcXVhcmVBLCBzcXVhcmVCKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxhY2Vkd2FsbCA9PiBcIiwgcGxhY2VkV2FsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGxhY2VkV2FsbCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYnJlYWtpbmdcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNxdWFyZUEsIHNxdWFyZUIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VkV2FsbCA9IHRoaXMucGxhY2VXYWxsKFwiV2VzdFwiLCBudWxsLCBzcXVhcmVBLCBzcXVhcmVCKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxhY2Vkd2FsbCA9PiBcIiwgcGxhY2VkV2FsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGxhY2VkV2FsbCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYnJlYWtpbmdcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvKiBtb3ZlIHBsYXllcjIgdG93YXJkcyBnb2FsICovXHJcbiAgICAgICAgICAgICAgICBsZXQgY3VyclJvdyA9IHAyUGF0aFsxXVswXS5zcGxpdChcIlwiKVswXTtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJyQ29sID0gcDJQYXRoWzFdWzBdLnNwbGl0KFwiXCIpWzFdO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJvd0lkeCA9IHAyUGF0aFsxXVsxXS5zcGxpdChcIlwiKVswXTtcclxuICAgICAgICAgICAgICAgIGxldCBjb2xJZHggPSBwMlBhdGhbMV1bMV0uc3BsaXQoXCJcIilbMV07XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV4dE1vdmUgPSBbcm93SWR4LCBjb2xJZHhdO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1vdmVzID0gdGhpcy5nZXRBdmFpbGFibGVNb3ZlcyhbcGFyc2VJbnQoY3VyclJvdyksIHBhcnNlSW50KGN1cnJDb2wpXSk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vdmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBtb3Zlc1tpXS5qb2luKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwMlBhdGhbMV0uaW5jbHVkZXMobW92ZSkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVQbGF5ZXIobW92ZXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVORCBPRiBBSSBUVVJOXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHdpbm5lcigpIHtcclxuICAgICAgICBsZXQgd2lubmVyID0gbnVsbDtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5ncmlkWzBdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2kgKyAxfTFgKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImdyZWVuXCI7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ3JpZFswXVtpXS5wbGF5ZXIgPT09IFwicGxheWVyMVwiKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5uZXIgPSBcInBsYXllcjFcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ3JpZFs4XVtpXS5wbGF5ZXIgPT09IFwicGxheWVyMlwiKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5uZXIgPSBcInBsYXllcjJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB3aW5uZXI7XHJcbiAgICB9XHJcblxyXG4gICAgdGFrZVR1cm4oYWN0aW9uLCBkaXIgPSBudWxsLCBldmVudCwgc3F1YXJlQSA9IG51bGwsIHNxdWFyZUIgPSBudWxsKSB7XHJcbiAgICAgICAgLy8gbW92ZW1lbnQgb3Igd2FsbCBwbGFjZW1lbnQ/XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24gPT09IFwibW92ZVwiKSB7XHJcbiAgICAgICAgICAgIGlmKChkaXIgPT09IFwidXBcIikgfHwgKGRpciA9PT0gXCJyaWdodFwiKSB8fCAoZGlyID09PSBcImRvd25cIikgfHwgKGRpciA9PT0gXCJsZWZ0XCIpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVQbGF5ZXIoZGlyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihkaXIgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZVBsYXllcihldmVudC50YXJnZXQuaWQuc3BsaXQoXCJcIikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uID09PSBcInBsYWNlV2FsbFwiKSB7XHJcbiAgICAgICAgICAgIC8vIGNhbGxzIHRoaXMucGxhY2VXYWxsKClcclxuICAgICAgICAgICAgdGhpcy5wbGFjZVdhbGwoZGlyLCBldmVudCwgc3F1YXJlQSwgc3F1YXJlQik7XHJcbiAgICAgICAgICAgIC8vICAgIHRoZSBwcmV2aW91cyBzb2x1dGlvbiB0byBwbGFjaW5nIHdhbGxzIHNlZW1zIGJsb2F0ZWQgYnV0IG9uY2UgaXRzIGltcGxlbWVudGVkIGl0cyBmbHVpZC4uLlxyXG4gICAgICAgICAgICAvLyAgICBJIGFtIHRoaW5raW5nIG9mIGhhdmluZyB0aGUgcGxhY2Ugd2FsbCBidXR0b24gbW9ycGggaW50byBhIG5vcnRoIGVhc3Qgc291dGggd2VzdCBidXR0b24uLi5cclxuICAgICAgICAgICAgLy8gICAgICAgbWlnaHQgYmUgYmV0dGVyIGlmIGNsaWVudCBzZWxlY3RzIHRoZSBjZWxscyB0aGV5IHdpc2ggdG8gcGxhY2UgYSB3YWxsIGJlZm9yZSBidXR0b24gbW9ycGhzXHJcbiAgICAgICAgICAgIC8vICAgICAgIHRoYXQgd2F5IG9ubHkgbm9ydGggc291dGggb3IgZWFzdCB3ZXN0IGJ1dHRvbnMgd2lsbCBzcGF3blxyXG4gICAgICAgICAgICAvLyAgICBzZWxlY3RpbmcgY2VsbHMgd2lsbCBiZSBmbHVpZCB3aXRoIG1vdXNlIGNsaWNrIG9yIGxlc3MgZmx1aWQgd2l0aCBrZXkgcHJlc3NpbmcgY29vcmRpbmF0ZXNcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHBsYWNlV2FsbChkaXIsIGV2ZW50LCBzcXVhcmVBLCBzcXVhcmVCKSB7XHJcbiAgICAgICAgLypcclxuICAgICAgICBzcXVhcmVBICYgc3F1YXJlQiA9IFtyb3dJZHgsIGNvbElkeF1cclxuICAgICAgICBnZXQgU3F1YXJlIGFuZCBzZXQgdGhlIHNwZWNpZmljIHdhbGxzIHRvIHRydWUgXHJcbiAgICAgICAgZ2V0IG5laWdoYm9ycyBhbmQgc3NldCBzcGVjaWZpYyB3YWxscyB0byB0cnVlLi4uIG9wcG9zaXRlIHdhbGxcclxuICAgICAgICBzcXVhcmVQb3MgPSB0aGlzLmdyaWRbcm93SWR4LCBjb2xJZHhdXHJcbiAgICAgICAgKi9cclxuXHJcblxyXG4gICAgICAgIGlmKHNxdWFyZUFbMF0gPiA4IHx8IHNxdWFyZUFbMF0gPCAwIHx8IHNxdWFyZUJbMF0gPiA4IHx8IHNxdWFyZUJbMF0gPCAwXHJcbiAgICAgICAgICAgIHx8IHNxdWFyZUFbMV0gPiA4IHx8IHNxdWFyZUFbMV0gPCAwIHx8IHNxdWFyZUJbMV0gPiA4IHx8IHNxdWFyZUJbMV0gPCAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzcXJBID0gdGhpcy5ncmlkW3NxdWFyZUFbMF1dW3NxdWFyZUFbMV1dO1xyXG4gICAgICAgIGxldCBzcXJCID0gdGhpcy5ncmlkW3NxdWFyZUJbMF1dW3NxdWFyZUJbMV1dO1xyXG4gICAgICAgIGxldCBuZWlnaGJvcnNBID0gdGhpcy5ib2FyZC5jaGVja05laWdoYm9ycyhbc3FyQS5yb3dJZHgsIHNxckEuY29sSWR4XSk7XHJcbiAgICAgICAgbGV0IG5laWdoYm9yc0IgPSB0aGlzLmJvYXJkLmNoZWNrTmVpZ2hib3JzKFtzcXJCLnJvd0lkeCwgc3FyQi5jb2xJZHhdKTtcclxuICAgICAgICBsZXQgaXNWYWxpZFdhbGw7XHJcbiAgICAgICAgbGV0IHBsYXllcldhbGxzO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFBsYXllciA9PT0gXCJwbGF5ZXIxXCIgPyBwbGF5ZXJXYWxscyA9IHRoaXMucGxheWVyMVdhbGxzIDogcGxheWVyV2FsbHMgPSB0aGlzLnBsYXllcjJXYWxsc1xyXG4gICAgICAgIGlmIChwbGF5ZXJXYWxscyA+IDApIHtcclxuXHJcbiAgICAgICAgICAgIGlmKGRpciA9PT0gXCJOb3J0aFwiICYmICghc3FyQS53YWxscy5Ob3J0aCAmJiAhc3FyQi53YWxscy5Ob3J0aCkpe1xyXG4gICAgICAgICAgICAgICAgc3FyQS53YWxscy5Ob3J0aCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzcXJCLndhbGxzLk5vcnRoID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8qIHNldHMgdGhlIG5vcnRoIG5laWdoYm9ycyBzb3V0aCB3YWxsIHRvIHRydWUgKi9cclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtuZWlnaGJvcnNBWzBdWzBdXVtuZWlnaGJvcnNBWzBdWzFdXS53YWxscy5Tb3V0aCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRbbmVpZ2hib3JzQlswXVswXV1bbmVpZ2hib3JzQlswXVsxXV0ud2FsbHMuU291dGggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaXNWYWxpZFdhbGwgPSB0aGlzLmZpbmRQYXRoKCk7XHJcbiAgICAgICAgICAgICAgICBpZihpc1ZhbGlkV2FsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyMVwiKSB0aGlzLnBsYXllcjFXYWxscyA9IHRoaXMucGxheWVyMVdhbGxzIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50UGxheWVyID09PSBcInBsYXllcjJcIikgdGhpcy5wbGF5ZXIyV2FsbHMgPSB0aGlzLnBsYXllcjJXYWxscyAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2FwVHVybigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzcXJBLndhbGxzLk5vcnRoID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgc3FyQi53YWxscy5Ob3J0aCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtuZWlnaGJvcnNBWzBdWzBdXVtuZWlnaGJvcnNBWzBdWzFdXS53YWxscy5Tb3V0aCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtuZWlnaGJvcnNCWzBdWzBdXVtuZWlnaGJvcnNCWzBdWzFdXS53YWxscy5Tb3V0aCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGRpciA9PT0gXCJFYXN0XCIgJiYgKCFzcXJBLndhbGxzLkVhc3QgJiYgIXNxckIud2FsbHMuRWFzdCkpe1xyXG4gICAgICAgICAgICAgICAgc3FyQS53YWxscy5FYXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNxckIud2FsbHMuRWFzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvKiBzZXRzIHRoZSBFYXN0IG5laWdoYm9ycyBXZXN0IHdhbGwgdG8gdHJ1ZSAqL1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0FbM11bMF1dW25laWdoYm9yc0FbM11bMV1dLndhbGxzLldlc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0JbM11bMF1dW25laWdoYm9yc0JbM11bMV1dLndhbGxzLldlc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaXNWYWxpZFdhbGwgPSB0aGlzLmZpbmRQYXRoKCk7XHJcbiAgICAgICAgICAgICAgICBpZihpc1ZhbGlkV2FsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyMVwiKSB0aGlzLnBsYXllcjFXYWxscyA9IHRoaXMucGxheWVyMVdhbGxzIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50UGxheWVyID09PSBcInBsYXllcjJcIikgdGhpcy5wbGF5ZXIyV2FsbHMgPSB0aGlzLnBsYXllcjJXYWxscyAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2FwVHVybigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzcXJBLndhbGxzLkVhc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBzcXJCLndhbGxzLkVhc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyaWRbbmVpZ2hib3JzQVszXVswXV1bbmVpZ2hib3JzQVszXVsxXV0ud2FsbHMuV2VzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtuZWlnaGJvcnNCWzNdWzBdXVtuZWlnaGJvcnNCWzNdWzFdXS53YWxscy5XZXN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoZGlyID09PSBcIlNvdXRoXCIgJiYgKCFzcXJBLndhbGxzLlNvdXRoICYmICFzcXJCLndhbGxzLlNvdXRoKSl7XHJcbiAgICAgICAgICAgICAgICBzcXJBLndhbGxzLlNvdXRoID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNxckIud2FsbHMuU291dGggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLyogc2V0cyB0aGUgU291dGggbmVpZ2hib3JzIE5vcnRoIHdhbGwgdG8gdHJ1ZSAqL1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0FbMV1bMF1dW25laWdoYm9yc0FbMV1bMV1dLndhbGxzLk5vcnRoID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtuZWlnaGJvcnNCWzFdWzBdXVtuZWlnaGJvcnNCWzFdWzFdXS53YWxscy5Ob3J0aCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpc1ZhbGlkV2FsbCA9IHRoaXMuZmluZFBhdGgoKTtcclxuICAgICAgICAgICAgICAgIGlmKGlzVmFsaWRXYWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFBsYXllciA9PT0gXCJwbGF5ZXIxXCIpIHRoaXMucGxheWVyMVdhbGxzID0gdGhpcy5wbGF5ZXIxV2FsbHMgLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyMlwiKSB0aGlzLnBsYXllcjJXYWxscyA9IHRoaXMucGxheWVyMldhbGxzIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3YXBUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNxckEud2FsbHMuU291dGggPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBzcXJCLndhbGxzLlNvdXRoID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0FbMV1bMF1dW25laWdoYm9yc0FbMV1bMV1dLndhbGxzLk5vcnRoID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0JbMV1bMF1dW25laWdoYm9yc0JbMV1bMV1dLndhbGxzLk5vcnRoID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoZGlyID09PSBcIldlc3RcIiAmJiAoIXNxckEud2FsbHMuV2VzdCAmJiAhc3FyQi53YWxscy5XZXN0KSl7XHJcbiAgICAgICAgICAgICAgICBzcXJBLndhbGxzLldlc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc3FyQi53YWxscy5XZXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8qIHNldHMgdGhlIFdlc3QgbmVpZ2hib3JzIEVhc3Qgd2FsbCB0byB0cnVlICovXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRbbmVpZ2hib3JzQVsyXVswXV1bbmVpZ2hib3JzQVsyXVsxXV0ud2FsbHMuRWFzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRbbmVpZ2hib3JzQlsyXVswXV1bbmVpZ2hib3JzQlsyXVsxXV0ud2FsbHMuRWFzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpc1ZhbGlkV2FsbCA9IHRoaXMuZmluZFBhdGgoKTtcclxuICAgICAgICAgICAgICAgIGlmKGlzVmFsaWRXYWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFBsYXllciA9PT0gXCJwbGF5ZXIxXCIpIHRoaXMucGxheWVyMVdhbGxzID0gdGhpcy5wbGF5ZXIxV2FsbHMgLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyMlwiKSB0aGlzLnBsYXllcjJXYWxscyA9IHRoaXMucGxheWVyMldhbGxzIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3YXBUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNxckEud2FsbHMuV2VzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNxckIud2FsbHMuV2VzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtuZWlnaGJvcnNBWzJdWzBdXVtuZWlnaGJvcnNBWzJdWzFdXS53YWxscy5FYXN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0JbMl1bMF1dW25laWdoYm9yc0JbMl1bMV1dLndhbGxzLkVhc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZVBsYXllcihkaXIpIHtcclxuICAgICAgICAvLyB0YWtlcyBjdXJyZW50IHBsYXllciBjdXJyZW50IHBvc1xyXG4gICAgICAgIC8vIGNhbGN1bGF0ZXMgZnV0dXJlIHBvcyB3aXRoIGRpclxyXG4gICAgICAgIGxldCBwbGF5ZXI7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGxheWVyID09PSBcInBsYXllcjFcIiA/IHBsYXllciA9IHRoaXMucGxheWVyMSA6IHBsYXllciA9IHRoaXMucGxheWVyMlxyXG4gICAgICAgIGxldCBuZXdDb2xJZHg7XHJcbiAgICAgICAgbGV0IG5ld1Jvd0lkeDtcclxuICAgICAgICBsZXQgaXNXYWxsZWQ7XHJcbiAgICAgICAgbGV0IGlzVmFsaWQ7XHJcbiAgICAgICAgaWYgKGRpciA9PT0gXCJ1cFwiKSB7XHJcbiAgICAgICAgICAgIG5ld0NvbElkeCA9IHBsYXllclsxXTtcclxuICAgICAgICAgICAgbmV3Um93SWR4ID0gcGxheWVyWzBdIC0gMTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRpciA9PT0gXCJyaWdodFwiKSB7XHJcbiAgICAgICAgICAgIG5ld0NvbElkeCA9IHBsYXllclsxXSArIDE7XHJcbiAgICAgICAgICAgIG5ld1Jvd0lkeCA9IHBsYXllclswXTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRpciA9PT0gXCJkb3duXCIpIHtcclxuICAgICAgICAgICAgbmV3Q29sSWR4ID0gcGxheWVyWzFdO1xyXG4gICAgICAgICAgICBuZXdSb3dJZHggPSBwbGF5ZXJbMF0gKyAxO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGlyID09PSBcImxlZnRcIikge1xyXG4gICAgICAgICAgICBuZXdDb2xJZHggPSBwbGF5ZXJbMV0gLSAxO1xyXG4gICAgICAgICAgICBuZXdSb3dJZHggPSBwbGF5ZXJbMF07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmV3Um93SWR4ID0gcGFyc2VJbnQoZGlyWzBdKTtcclxuICAgICAgICAgICAgbmV3Q29sSWR4ID0gcGFyc2VJbnQoZGlyWzFdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgVGhlIGJlbG93IHZhbGlkYXRpb24gbm8gbG9uZ2VyIHdvcmtzIGZvciBjbGlja2luZyBtb3ZlbWVudC4gIFxyXG4gICAgICAgIGNoZWNrIGZvciB3YWxsc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlzV2FsbGVkID0gdGhpcy5ib2FyZC5pc1dhbGxlZChkaXIsIHBsYXllclswXSwgcGxheWVyWzFdKTtcclxuICAgICAgICAvLyBnaXZlcyB0byB0aGlzLmJvYXJkIHRvIHZhbGlkYXRlXHJcbiAgICAgICAgaXNWYWxpZCA9IEJvYXJkLmlzVmFsaWRQb3MobmV3Q29sSWR4LCBuZXdSb3dJZHgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGlmIHZhbGlkIHRoZW4gc2V0cyBwbGF5ZXIgbmV3IHggYW5kIHlcclxuICAgICAgICAvLyAgICBzd2FwcyB0dXJuc1xyXG4gICAgICAgIGlmIChpc1ZhbGlkICYmICFpc1dhbGxlZCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IG9sZFNxdWFyZSA9IHRoaXMuYm9hcmQuZ3JpZFtwbGF5ZXJbMF1dW3BsYXllclsxXV07XHJcbiAgICAgICAgICAgIGxldCBuZXdTcXVhcmUgPSB0aGlzLmJvYXJkLmdyaWRbbmV3Um93SWR4XVtuZXdDb2xJZHhdO1xyXG5cclxuICAgICAgICAgICAgLy92YWxpZGF0aW9uIHRvIGNoZWNrIGZvciBwbGF5ZXIgY29sbGlzaW9uICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChuZXdTcXVhcmUucGxheWVyICE9PSBcImVtcHR5XCIpIHtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9sZFNxdWFyZS5wbGF5ZXIgPSBcImVtcHR5XCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBsYXllclBvcyh0aGlzLmN1cnJlbnRQbGF5ZXIsIFtuZXdSb3dJZHgsIG5ld0NvbElkeF0pO1xyXG4gICAgICAgICAgICAgICAgbmV3U3F1YXJlLnBsYXllciA9IHRoaXMuY3VycmVudFBsYXllcjtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3dhcFR1cm4oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gZWxzZSB0aGVuIGRvZXMgbm90aGluZyBvciBzZW5kcyBlcnJvciBtZXNzYWdlXHJcbiAgICAgICAgICAgIC8vICAgIGRvZXMgbm90IHN3YXAgdHVybnNcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEF2YWlsYWJsZU1vdmVzKHBvcykge1xyXG4gICAgICAgIC8qIHBvcyA9IFtyb3csIGNvbF0gKi9cclxuICAgICAgICBjb25zb2xlLmxvZyhwb3MpO1xyXG4gICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyMVwiID8gdGhpcy5wbGF5ZXIxIDogdGhpcy5wbGF5ZXIyO1xyXG4gICAgICAgIGxldCBvcHBvbmVudCA9IHRoaXMuY3VycmVudFBsYXllciA9PT0gXCJwbGF5ZXIxXCIgPyB0aGlzLnBsYXllcjIgOiB0aGlzLnBsYXllcjE7XHJcbiAgICAgICAgbGV0IG1vdmVzID0gW107XHJcbiAgICAgICAgbGV0IGN1cnJlbnRTcXVhcmUgPSB0aGlzLmdyaWRbcG9zWzBdXVtwb3NbMV1dO1xyXG4gICAgICAgIGxldCBzcXVhcmU7XHJcbiAgICAgICAgbGV0IGNvbElkeCA9IHBvc1sxXTtcclxuICAgICAgICBsZXQgcm93SWR4ICA9IHBvc1swXTtcclxuICAgICAgICAvKiBjaGVjayBmb3IgcGxheWVyICovXHJcbiAgICAgICAgaWYgKChyb3dJZHggLSAxID49IDApICYmICghY3VycmVudFNxdWFyZS53YWxscy5Ob3J0aCkpIHtcclxuICAgICAgICAgICAgc3F1YXJlID0gdGhpcy5ncmlkW3Jvd0lkeCAtIDFdW2NvbElkeF07XHJcbiAgICAgICAgICAgIGlmIChzcXVhcmUucGxheWVyID09PSBcImVtcHR5XCIpIHtcclxuICAgICAgICAgICAgICAgIG1vdmVzLnB1c2goW3Jvd0lkeCAtIDEsIGNvbElkeF0pOyAgLy8gbm9ydGhcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChbXCJwbGF5ZXIxXCIsIFwicGxheWVyMlwiXS5pbmNsdWRlcyhzcXVhcmUucGxheWVyKSl7XHJcbiAgICAgICAgICAgICAgICBpZiAoKHJvd0lkeCAtIDIgPj0gMCkgJiYgKCFzcXVhcmUud2FsbHMuTm9ydGgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZXMucHVzaChbcm93SWR4IC0gMiwgY29sSWR4XSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wU3F1YXJlID0gcm93SWR4IC0gMiA+PSAwID8gdGhpcy5ncmlkW3Jvd0lkeCAtIDJdW2NvbElkeF0gOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNxdWFyZS53YWxscy5Ob3J0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNxdWFyZS53YWxscy5FYXN0KSBtb3Zlcy5wdXNoKFtyb3dJZHggLSAxLCBjb2xJZHggKyAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3F1YXJlLndhbGxzLldlc3QpIG1vdmVzLnB1c2goW3Jvd0lkeCAtIDEsIGNvbElkeCAtIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRlbXBTcXVhcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3F1YXJlLndhbGxzLkVhc3QpIG1vdmVzLnB1c2goW3Jvd0lkeCAtIDEsIGNvbElkeCArIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3F1YXJlLndhbGxzLldlc3QpIG1vdmVzLnB1c2goW3Jvd0lkeCAtIDEsIGNvbElkeCAtIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKGNvbElkeCArIDEgPD0gOCkgJiYgKCFjdXJyZW50U3F1YXJlLndhbGxzLkVhc3QpKSB7XHJcbiAgICAgICAgICAgIHNxdWFyZSA9IHRoaXMuZ3JpZFtyb3dJZHhdW2NvbElkeCArIDFdO1xyXG4gICAgICAgICAgICBpZiAoc3F1YXJlLnBsYXllciA9PT0gXCJlbXB0eVwiKSB7XHJcbiAgICAgICAgICAgICAgICBtb3Zlcy5wdXNoKFtyb3dJZHgsIGNvbElkeCArIDFdKTsgIC8vIGVhc3RcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChbXCJwbGF5ZXIxXCIsIFwicGxheWVyMlwiXS5pbmNsdWRlcyhzcXVhcmUucGxheWVyKSl7XHJcbiAgICAgICAgICAgICAgICBpZiAoKGNvbElkeCArIDIgPD0gOCkgJiYgKCFzcXVhcmUud2FsbHMuRWFzdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3Zlcy5wdXNoKFtyb3dJZHgsIGNvbElkeCArIDJdKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBTcXVhcmUgPSBjb2xJZHggKyAyIDw9IDggPyB0aGlzLmdyaWRbcm93SWR4XVtjb2xJZHggKyAyXSA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3F1YXJlLndhbGxzLkVhc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzcXVhcmUud2FsbHMuTm9ydGgpIG1vdmVzLnB1c2goW3Jvd0lkeCAtIDEsIGNvbElkeCArIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzcXVhcmUud2FsbHMuU291dGgpIG1vdmVzLnB1c2goW3Jvd0lkeCArIDEsIGNvbElkeCArIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRlbXBTcXVhcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3F1YXJlLndhbGxzLk5vcnRoKSBtb3Zlcy5wdXNoKFtyb3dJZHggLSAxLCBjb2xJZHggKyAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNxdWFyZS53YWxscy5Tb3V0aCkgbW92ZXMucHVzaChbcm93SWR4ICsgMSwgY29sSWR4ICsgMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgocm93SWR4ICsgMSA8PSA4KSAmJiAoIWN1cnJlbnRTcXVhcmUud2FsbHMuU291dGgpKSB7XHJcbiAgICAgICAgICAgIHNxdWFyZSA9IHRoaXMuZ3JpZFtyb3dJZHggKyAxXVtjb2xJZHhdO1xyXG4gICAgICAgICAgICBpZiAoc3F1YXJlLnBsYXllciA9PT0gXCJlbXB0eVwiKSB7XHJcbiAgICAgICAgICAgICAgICBtb3Zlcy5wdXNoKFtyb3dJZHggKyAxLCBjb2xJZHhdKTsgIC8vIHNvdXRoXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoW1wicGxheWVyMVwiLCBcInBsYXllcjJcIl0uaW5jbHVkZXMoc3F1YXJlLnBsYXllcikpe1xyXG4gICAgICAgICAgICAgICAgaWYgKChyb3dJZHggKyAyIDw9IDgpICYmICghc3F1YXJlLndhbGxzLlNvdXRoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVzLnB1c2goW3Jvd0lkeCArIDIsIGNvbElkeF0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcFNxdWFyZSA9IHJvd0lkeCArIDIgPD0gOCA/IHRoaXMuZ3JpZFtyb3dJZHggKyAyXVtjb2xJZHhdIDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzcXVhcmUud2FsbHMuU291dGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzcXVhcmUud2FsbHMuRWFzdCkgbW92ZXMucHVzaChbcm93SWR4ICsgMSwgY29sSWR4ICsgMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNxdWFyZS53YWxscy5XZXN0KSBtb3Zlcy5wdXNoKFtyb3dJZHggKyAxLCBjb2xJZHggLSAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0ZW1wU3F1YXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNxdWFyZS53YWxscy5FYXN0KSBtb3Zlcy5wdXNoKFtyb3dJZHggKyAxLCBjb2xJZHggKyAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNxdWFyZS53YWxscy5XZXN0KSBtb3Zlcy5wdXNoKFtyb3dJZHggKyAxLCBjb2xJZHggLSAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKChjb2xJZHggLSAxID49IDApICYmICghY3VycmVudFNxdWFyZS53YWxscy5XZXN0KSkge1xyXG4gICAgICAgICAgICBzcXVhcmUgPSB0aGlzLmdyaWRbcm93SWR4XVtjb2xJZHggLSAxXTtcclxuICAgICAgICAgICAgaWYgKHNxdWFyZS5wbGF5ZXIgPT09IFwiZW1wdHlcIikge1xyXG4gICAgICAgICAgICAgICAgbW92ZXMucHVzaChbcm93SWR4LCBjb2xJZHggLSAxXSk7ICAvLyB3ZXN0XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoW1wicGxheWVyMVwiLCBcInBsYXllcjJcIl0uaW5jbHVkZXMoc3F1YXJlLnBsYXllcikpe1xyXG4gICAgICAgICAgICAgICAgaWYgKChjb2xJZHggLSAyID49IDApICYmICghc3F1YXJlLndhbGxzLldlc3QpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZXMucHVzaChbcm93SWR4LCBjb2xJZHggLSAyXSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wU3F1YXJlID0gY29sSWR4IC0gMiA+PSAwID8gdGhpcy5ncmlkW3Jvd0lkeF1bY29sSWR4IC0gMl0gOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNxdWFyZS53YWxscy5XZXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3F1YXJlLndhbGxzLk5vcnRoKSBtb3Zlcy5wdXNoKFtyb3dJZHggLSAxLCBjb2xJZHggLSAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3F1YXJlLndhbGxzLlNvdXRoKSBtb3Zlcy5wdXNoKFtyb3dJZHggKyAxLCBjb2xJZHggLSAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0ZW1wU3F1YXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNxdWFyZS53YWxscy5Ob3J0aCkgbW92ZXMucHVzaChbcm93SWR4IC0gMSwgY29sSWR4IC0gMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzcXVhcmUud2FsbHMuU291dGgpIG1vdmVzLnB1c2goW3Jvd0lkeCArIDEsIGNvbElkeCAtIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKiBcclxuICAgICAgICBjaGVja05laWdoYm9ycyByZXR1cm5zIGFuIGFycmF5IG9mIFxyXG4gICAgICAgIFtub3J0aCwgZWFzdCwgc291dGgsIHdlc3RdIHBvc2l0aW9uc1xyXG4gICAgICAgIHNob3VsZCBub3cgY2hlY2sgdG8gc2VlIGlmIGFueSBvZiB0aG9zZSBwb3NpdGlvbnMgY29sbGlkZSBcclxuICAgICAgICB3aXRoIGEgd2FsbCBvciBwbGF5ZXIgYW5kIGFkanVzdCBtb3Zlc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW92ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgc3F1YXJlID0gdGhpcy5ncmlkW21vdmVzW2ldWzBdXVttb3Zlc1tpXVsxXV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbW92ZXM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHNldFBsYXllclBvcyhwbGF5ZXIsIHBvcykge1xyXG4gICAgICAgIGlmIChwbGF5ZXIgPT09IFwicGxheWVyMVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyMSA9IHBvcztcclxuICAgICAgICB9IGVsc2UgaWYgKHBsYXllciA9PT0gXCJwbGF5ZXIyXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIyID0gcG9zO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLmJvYXJkLnNldFBsYXllcnModHJ1ZSwgdGhpcy5wbGF5ZXIxLCBmYWxzZSwgdGhpcy5wbGF5ZXIyKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQbGF5ZXIgPSBcInBsYXllcjFcIjtcclxuICAgIH1cclxuXHJcbiAgICBzd2FwVHVybigpIHtcclxuICAgICAgICBpZiggdGhpcy5jdXJyZW50UGxheWVyID09PSBcInBsYXllcjFcIiApIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGxheWVyID0gXCJwbGF5ZXIyXCI7XHJcbiAgICAgICAgfSBlbHNlIGlmKCB0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyMlwiICkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQbGF5ZXIgPSBcInBsYXllcjFcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZmluZFBhdGgoKSB7XHJcbiAgICAgICAgLyogXHJcbiAgICAgICAgcnVuIHRoZSBiZnNcclxuICAgICAgICAgKi9cclxuICAgICAgICByZXR1cm4gISF0aGlzLmJvYXJkLmJmcyh0aGlzLnBsYXllcjEpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lVmlldyB7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lKSB7XHJcbiAgICAgICAgdGhpcy5ib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgICAgICB0aGlzLmJvYXJkID0gdGhpcy5nYW1lLmJvYXJkO1xyXG4gICAgICAgIHRoaXMuZ3JpZCA9IHRoaXMuYm9hcmQuZ3JpZDtcclxuICAgICAgICB0aGlzLnNxdWFyZUEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc3F1YXJlQiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5uZWlnaGJvcnMgPSBudWxsOyAgXHJcbiAgICAgICAgdGhpcy5hdmFpbGFibGVNb3ZlcyA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLnNldHVwQm9hcmQoKTtcclxuICAgICAgICB0aGlzLnNldHVwRXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93KCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZS5jb21wdXRlckFpVHVybigpO1xyXG4gICAgICAgIHRoaXMuc2hvd0JvYXJkKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5pc092ZXIoKSkge1xyXG4gICAgICAgICAgICBsZXQgd2lubmVyID0gXCJcIjtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5jdXJyZW50UGxheWVyID09PSBcInBsYXllcjJcIikgd2lubmVyID0gXCJQbGF5ZXIgMVwiO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyMVwiKSB3aW5uZXIgPSBcIlBsYXllciAyXCI7XHJcbiAgICAgICAgICAgIGxldCB0YWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0YWJsZVwiKVswXTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVSZXN0YXJ0RGl2KHRhYmxlLCB3aW5uZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUuY3VycmVudFBsYXllciA9IFwibm9vbmVcIjtcclxuICAgICAgICAgICAgdGhpcy5zaG93Qm9hcmQoKTtcclxuICAgICAgICAgICAgLy8gdGFibGUucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIGxldCByZXN0YXJ0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93Qm9hcmQoKSB7XHJcbiAgICAgICAgZm9yKGxldCByb3dJZHggPSAwOyByb3dJZHggIDwgdGhpcy5ncmlkLmxlbmd0aDsgcm93SWR4KyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgY29sSWR4ID0gMDsgY29sSWR4IDwgdGhpcy5ncmlkW3Jvd0lkeF0ubGVuZ3RoOyBjb2xJZHgrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNxdWFyZSA9IHRoaXMuZ3JpZFtyb3dJZHhdW2NvbElkeF07XHJcbiAgICAgICAgICAgICAgICBsZXQgaWQgPSAocm93SWR4KS50b1N0cmluZygpICsgKGNvbElkeCkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIGxldCBlbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcbiAgICAgICAgICAgICAgICBpZihzcXVhcmUucGxheWVyID09PSBcInBsYXllcjFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QuYWRkKFwicGxheWVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5pbm5lckhUTUwgPSBcIiYjeDI2NUZcIjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihzcXVhcmUucGxheWVyID09PSBcInBsYXllcjJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QuYWRkKFwicGxheWVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5pbm5lckhUTUwgPSBcIiYjeDI2NTlcIjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlLmNsYXNzTGlzdC5yZW1vdmUoXCJwbGF5ZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlLmlubmVySFRNTCA9IFwiIFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLyogdXBkYXRlIHdhbGxzICovXHJcbiAgICAgICAgICAgICAgICBpZiAoISFzcXVhcmUud2FsbHMuTm9ydGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGUuY2xhc3NMaXN0LnJlbW92ZSgnaGFsbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QuYWRkKCd3YWxsLXRvcCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCEhc3F1YXJlLndhbGxzLkVhc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGUuY2xhc3NMaXN0LnJlbW92ZSgnaGFsbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QuYWRkKCd3YWxsLXJpZ2h0Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoISFzcXVhcmUud2FsbHMuU291dGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGUuY2xhc3NMaXN0LnJlbW92ZSgnaGFsbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QuYWRkKCd3YWxsLWJvdHRvbScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCEhc3F1YXJlLndhbGxzLldlc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGUuY2xhc3NMaXN0LnJlbW92ZSgnaGFsbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QuYWRkKCd3YWxsLWxlZnQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgd2FsbENvdW50ZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIndhbGwtY291bnRlclwiKTtcclxuICAgICAgICBsZXQgYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGFjZVwiKTtcclxuICAgICAgICB3YWxsQ291bnRlcnNbMF0uaW5uZXJIVE1MID0gYHBsYXllciAxIGhhcyAke3RoaXMuZ2FtZS5wbGF5ZXIxV2FsbHN9IHdhbGxzIGxlZnRgXHJcbiAgICAgICAgd2FsbENvdW50ZXJzWzFdLmlubmVySFRNTCA9IGBwbGF5ZXIgMiBoYXMgJHt0aGlzLmdhbWUucGxheWVyMldhbGxzfSB3YWxscyBsZWZ0YFxyXG4gICAgICAgIGlmICgodGhpcy5nYW1lLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyMVwiKSAmJiAodGhpcy5nYW1lLnBsYXllcjFXYWxscyA9PT0gMCkpIHtcclxuICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHRoaXMuZ2FtZS5jdXJyZW50UGxheWVyID09PSBcInBsYXllcjJcIikgJiYgKHRoaXMuZ2FtZS5wbGF5ZXIyV2FsbHMgPT09IDApKXtcclxuICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuc3RhdGUgPT09IFwibm90IGRvaW5nIGFueXRoaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChidG4uY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGlkZVwiKSkgYnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLXR1cm5cIikuaW5uZXJIVE1MID0gYCR7dGhpcy5nYW1lLmN1cnJlbnRQbGF5ZXJ9J3MgdHVybmA7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0dXBFdmVudExpc3RlbmVycygpIHtcclxuICAgICAgICB0aGlzLmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY29kZSA9IGV2ZW50LmNvZGU7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5nYW1lLnBsYWNpbmdXYWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKGNvZGUgPT09IFwiQXJyb3dVcFwiKSB8fCAoY29kZSA9PT0gXCJBcnJvd1JpZ2h0XCIpIHx8IChjb2RlID09PSBcIkFycm93RG93blwiKSB8fCAoY29kZSA9PT0gXCJBcnJvd0xlZnRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUudGFrZVR1cm4oXCJtb3ZlXCIsIGNvZGUuc3BsaXQoXCJBcnJvd1wiKVsxXS50b0xvd2VyQ2FzZSgpLCBldmVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihjb2RlID09PSBcIlNwYWNlXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5maW5kUGF0aCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuYm9keS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIC8qIFxyXG5UaGUgY2xpY2sgZXZlbnQgaXMgdXNlZCBmb3IgYSBzdGF0ZSBtYWNoaW5lLlxyXG5EZXBlbmRpbmcgb24gdGhlIHN0YXRlIG9mIHBsYWNpbmcgYSB3YWxsIGRpY3RhdGVzXHJcbndoYXQgd2lsbCBoYXBwZW4gd2hlbiBhIGNsaWNrIGV2ZW50IHRyaWdnZXJzLlxyXG5TdGF0ZSBpcyBzdG9yZWQgaW4gdGhpcy5nYW1lLnN0YXRlIFxyXG5TdGF0ZSBNYWNoaW5lIGlzOlxyXG5bcDEgbm90IGRvaW5nIGFueXRoaW5nXSA9PSBjbGlja3MgUGxhY2UgYSB3YWxsID4+IFtzZWxlY3Rpbmcgc3F1YXJlc10gPT4gW3NlbGVjdGluZyB3YWxsIHR5cGVdID0+IFtwMSBub3QgZG9pbmcgYW55dGhpbmddXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFwvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt3YWxsIGlzIGNyZWF0ZWR9ID0+IFtwMiBub3QgZG9pbmcgYW55dGhpbmddXHJcbiEhIHVuZGV2ZWxvcGVkICEhXHJcblBsYXllciBtb3ZlbWVudCB3aWxsIGJlIGludGVncmF0ZWQgaW50byB0aGUgc3RhdGUgbWFjaGluZSBhcyB3ZWxsXHJcbioqKiBtYXliZSBjaGFuZ2UgW25vdCBkb2luZyBhbnl0aGluZ10gdG8gW25vdCBkb2luZyBhbnl0aGluZ11cclxuXHJcbltwMSBub3QgZG9pbmcgYW55dGhpbmddID09IGNsaWNrcyBNb3ZlIGNoYXJhY3RlciA+PiBbc2VsZWN0aW5nIGRlc2lyZWQgbW92ZV0gPT4gW3AxIG5vdCBkb2luZyBhbnl0aGluZ11cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXC9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge21vdmUgcGxheWVyfSA9PiBbcDIgbm90IGRvaW5nIGFueXRoaW5nXVxyXG5cclxuICAgICAgICAgICAgKi8gXHJcblxyXG4gICAgICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLmdhbWUuc3RhdGU7XHJcbiAgICAgICAgICAgIGxldCBjbGFzc0xpc3QgPSBldmVudC50YXJnZXQuY2xhc3NMaXN0O1xyXG4gICAgICAgICAgICBsZXQgaW5uZXJIVE1MID0gZXZlbnQudGFyZ2V0LmlubmVySFRNTDtcclxuICAgICAgICAgICAgaWYgKHN0YXRlID09PSBcIm5vdCBkb2luZyBhbnl0aGluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2xhc3NMaXN0LmNvbnRhaW5zKFwiYnV0dG9uXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaW5uZXJIVE1MID09PSBcIlBsYWNlIGEgd2FsbFwiKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVBsYWNlV2FsbEJ1dHRvbihldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihpbm5lckhUTUwgPT09IFwiTW92ZSBjaGFyYWN0ZXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmVtZW50QnV0dG9uKGV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gXCJzZWxlY3Rpbmcgc3F1YXJlc1wiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2xhc3NMaXN0LmNvbnRhaW5zKFwiZmxvb3JcIikpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVTcXVhcmVDbGljayhldmVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gXCJzZWxlY3Rpbmcgd2FsbCB0eXBlXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjbGFzc0xpc3QuY29udGFpbnMoXCJidXR0b25cIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZigoaW5uZXJIVE1MID09PSBcIk5vcnRoXCIpIHx8IChpbm5lckhUTUwgPT09IFwiRWFzdFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgIHx8IChpbm5lckhUTUwgPT09IFwiU291dGhcIikgfHwgKGlubmVySFRNTCA9PT0gXCJXZXN0XCIpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVdhbGxUeXBlQnV0dG9uKGlubmVySFRNTCwgZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc3RhdGUgPT09IFwic2VsZWN0aW5nIGRlc2lyZWQgbW92ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hdmFpbGFibGVNb3Zlcy5pbmNsdWRlcyhldmVudC50YXJnZXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnRha2VUdXJuKFwibW92ZVwiLCBudWxsLCBldmVudClcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhY2tcIikuY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmF2YWlsYWJsZU1vdmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXZhaWxhYmxlTW92ZXNbaV0uY2xhc3NMaXN0LnJlbW92ZShcImhpZ2hsaWdodFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnN0YXRlID0gXCJub3QgZG9pbmcgYW55dGhpbmdcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF2YWlsYWJsZU1vdmVzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzdGF0ZSAhPT0gXCJub3QgZG9pbmcgYW55dGhpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNsYXNzTGlzdC5jb250YWlucyhcImJ1dHRvblwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbm5lckhUTUwgPT09IFwiYmFja1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQmFja0J1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaW5uZXJIVE1MID09PSBcIlJlc3RhcnRcIikge1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSwgZmFsc2UpO1xyXG4gICAgfSBcclxuXHJcbiAgICBoYW5kbGVQbGFjZVdhbGxCdXR0b24oZXZlbnQpIHtcclxuICAgICAgICAvLyBkZWxldGUgYnRuIGVsZW1lbnQgYW5kIHJlcGxhY2Ugd2l0aCBpbnN0cnVjdGlvbnMgdG9cclxuICAgICAgICAvLyBjbGljayB0d28gZGlzdGluY3Qgc3F1YXJlc1xyXG4gICAgICAgIGlmICh0aGlzLmdhbWUuY3VycmVudFBsYXllciAhPT0gXCJub29uZVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zdGF0ZSA9IFwic2VsZWN0aW5nIHNxdWFyZXNcIjtcclxuICAgICAgICAgICAgbGV0IGJ0biA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiYWNrXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNsaWNrSW5zdHJ1Y3RcIilbMF0uY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW92ZVwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcclxuICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVTcXVhcmVDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLmdhbWUuY3VycmVudFBsYXllciAhPT0gXCJub29uZVwiKSB7XHJcbiAgICAgICAgICAgIC8vd2FpdCBmb3IgY2xpZW50IHRvIGNsaWNrIHR3byB2YWxpZCBzcXVhcmVzXHJcbiAgICAgICAgICAgIGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICBcclxuICAgICAgICAgICAgaWYgKCh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZmxvb3JcIikpICYmICh0aGlzLnNxdWFyZUEgPT09IG51bGwpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNxdWFyZUEgPSB0YXJnZXQuaWQ7XHJcbiAgICAgICAgICAgICAgICAvL3BhcnNlIHNxdWFyZUFcclxuICAgICAgICAgICAgICAgIC8vIHNxdWFyZUEgPSBcIjAwXCIgYW5kIG5lZWRzIHRvIGJlIFswLCAwXVxyXG4gICAgICAgICAgICAgICAgbGV0IHNxdWFyZSA9IHRoaXMuc3F1YXJlQS5zcGxpdChcIlwiKTtcclxuICAgICAgICAgICAgICAgIHNxdWFyZVswXSA9IHBhcnNlSW50KHNxdWFyZVswXSk7XHJcbiAgICAgICAgICAgICAgICBzcXVhcmVbMV0gPSBwYXJzZUludChzcXVhcmVbMV0pO1xyXG4gICAgICAgICAgICAgICAgLy9nZXQgbmVpZ2hib3JzXHJcbiAgICAgICAgICAgICAgICAvLyByZXR1cm5zIFtbbm9ydGhdLFtlYXN0XSxbc291dGhdLFt3ZXN0XV1cclxuICAgICAgICAgICAgICAgIHRoaXMubmVpZ2hib3JzID0gdGhpcy5ib2FyZC5jaGVja05laWdoYm9ycyhzcXVhcmUpO1xyXG4gICAgICAgICAgICAgICAgLy8gZm9yKGxldCBpID0gMDsgaSA8IHRoaXMubmVpZ2hib3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5uZWlnaGJvcnNbaV0gPSB0aGlzLm5laWdoYm9yc1tpXVswXS50b1N0cmluZygpICsgdGhpcy5uZWlnaGJvcnNbaV1bMV0udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIC8vIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLm5laWdoYm9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMubmVpZ2hib3JzW2ldLmpvaW4oXCJcIikpLmNsYXNzTGlzdC5hZGQoXCJoaWdobGlnaHRcIik7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodCh0aGlzLm5laWdoYm9ycyk7ICAvLyBORUVEIFRPIENIQU5HRSAgU0hPVUxEIEJFIEEgQ0xBU1MgVE9HR0xFXHJcbiAgICBcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImZsb29yXCIpKSAmJiAodGhpcy5zcXVhcmVBICE9PSBudWxsKSAmJiAodGhpcy5zcXVhcmVCID09PSBudWxsKSkge1xyXG4gICAgICAgICAgICAgICAgaWYoISF0aGlzLm5laWdoYm9ycy5pbmNsdWRlcyh0YXJnZXQuaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcXVhcmVCID0gdGFyZ2V0LmlkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3F1YXJlQSAhPT0gbnVsbCAmJiB0aGlzLnNxdWFyZUIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vIHNob3VsZCBjcmVhdGUgdHdvIGJ1dHRvbnMgZGVwZW5kaW5nIG9uIHNxdWFyZUEgYW5kIHNxdWFyZUIgb3JpZW50YXRpb25cclxuICAgICAgICAgICAgICAgIHRoaXMuYm9keS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY2xpY2tJbnN0cnVjdFwiKVswXS5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5zcXVhcmVBLnNwbGl0KFwiXCIpWzBdID09PSB0aGlzLnNxdWFyZUIuc3BsaXQoXCJcIilbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnNxdWFyZUEuc3BsaXQoXCJcIilbMF0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYm9keS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibm9ydGhcIilbMF0uY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc3F1YXJlQS5zcGxpdChcIlwiKVswXSA8IDgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzb3V0aFwiKVswXS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNxdWFyZUEuc3BsaXQoXCJcIilbMV0gPT09IHRoaXMuc3F1YXJlQi5zcGxpdChcIlwiKVsxXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc3F1YXJlQS5zcGxpdChcIlwiKVsxXSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ3ZXN0XCIpWzBdLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnNxdWFyZUEuc3BsaXQoXCJcIilbMV0gPCA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYm9keS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZWFzdFwiKVswXS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuc3RhdGUgPSBcInNlbGVjdGluZyB3YWxsIHR5cGVcIjtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVdhbGxUeXBlQnV0dG9uKGRpciwgZXZlbnQpIHtcclxuICAgICAgICAvKiBcclxuICAgICAgICBjYWxscyB0aGlzLmdhbWUudGFrZVR1cm4oYWN0aW9uLCBkaXIsIGV2ZW50KTtcclxuICAgICAgICBzaG91bGQgcmVtb3ZlIHdhbGwgdHlwZSBidXR0b25zIGFuZCBhZGQgcGxhY2UgYSB3YWxsIGJ1dHRvblxyXG4gICAgICAgIHN3aXRjaCBzdGF0ZSBiYWNrIHRvIG5vdCBkb2luZyBhbnl0aGluZyBoZXJlPz8/XHJcbiAgICAgICAgb3IgaW4gdGhpcy5nYW1lXHJcbiAgICAgICAgV0hFUkUgRE9FUyBXQUxMIFBMQUNFTUVOVCBWQUxJREFUSU9OIEhBUFBFTj8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz9cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZ2FtZS50YWtlVHVybihcInBsYWNlV2FsbFwiLCBkaXIsIGV2ZW50LCB0aGlzLnNxdWFyZUEsIHRoaXMuc3F1YXJlQik7XHJcbiAgICAgICAgdGhpcy5ib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJub3J0aFwiKVswXS5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcclxuICAgICAgICB0aGlzLmJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImVhc3RcIilbMF0uY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XHJcbiAgICAgICAgdGhpcy5ib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzb3V0aFwiKVswXS5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcclxuICAgICAgICB0aGlzLmJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIndlc3RcIilbMF0uY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XHJcbiAgICAgICAgdGhpcy5ib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJidXR0b25cIilbMF0uY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiYWNrXCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW92ZVwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcclxuICAgICAgICB0aGlzLnNxdWFyZUEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc3F1YXJlQiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5nYW1lLnN0YXRlID0gXCJub3QgZG9pbmcgYW55dGhpbmdcIjtcclxuICAgICAgICB0aGlzLnNob3coKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVNb3ZlbWVudEJ1dHRvbihldmVudCkge1xyXG4gICAgICAgIGlmKHRoaXMuZ2FtZS5jdXJyZW50UGxheWVyICE9PSBcIm5vb25lXCIpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiYWNrXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYWNlXCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xyXG4gICAgICAgICAgICBsZXQgYXZhaWxhYmxlTW92ZXM7XHJcbiAgICAgICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLmdhbWUuY3VycmVudFBsYXllciA9PT0gXCJwbGF5ZXIxXCIgPyB0aGlzLmdhbWUucGxheWVyMSA6IHRoaXMuZ2FtZS5wbGF5ZXIyO1xyXG4gICAgICAgICAgICBsZXQgcm93SWR4ID0gcGFyc2VJbnQocGxheWVyWzBdKTtcclxuICAgICAgICAgICAgbGV0IGNvbElkeCA9IHBhcnNlSW50KHBsYXllclsxXSk7XHJcbiAgICAgICAgICAgIGF2YWlsYWJsZU1vdmVzID0gdGhpcy5nYW1lLmdldEF2YWlsYWJsZU1vdmVzKFtyb3dJZHgsIGNvbElkeF0pO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGF2YWlsYWJsZU1vdmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYXZhaWxhYmxlTW92ZXNbaV0uam9pbihcIlwiKSk7XHJcbiAgICAgICAgICAgICAgICBlbGUuY2xhc3NMaXN0LmFkZChcImhpZ2hsaWdodFwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXZhaWxhYmxlTW92ZXMucHVzaChlbGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8qIHNldCB0aGUgc3RhdGUgdG8gY2hlY2sgaWYgYW4gYXZhaWxhYmxlIG1vdmUgc3F1YXJlIGlzIGNsaWNrZWQuICovXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zdGF0ZSA9IFwic2VsZWN0aW5nIGRlc2lyZWQgbW92ZVwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVCYWNrQnV0dG9uKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZS5zdGF0ZSA9IFwibm90IGRvaW5nIGFueXRoaW5nXCI7XHJcbiAgICAgICAgLyogcmVzZXRzIHN0YXRlICovXHJcbiAgICAgICAgbGV0IGluc3RydWN0aW9ucyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjb250cm9sbGVyLWRpdlwiKVswXS5jaGlsZE5vZGVzO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5zdHJ1Y3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpbnN0cnVjdGlvbnNbaV0uaWQgPT09IFwicGxhY2VcIiB8fCBpbnN0cnVjdGlvbnNbaV0uaWQgPT09IFwibW92ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBpbnN0cnVjdGlvbnNbaV0uY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbnN0cnVjdGlvbnNbaV0uY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zcXVhcmVBID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNxdWFyZUIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubmVpZ2hib3JzID0gbnVsbDsgIFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hdmFpbGFibGVNb3Zlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIHRoaXMuYXZhaWxhYmxlTW92ZXNbaV0uY2xhc3NMaXN0LnJlbW92ZShcImhpZ2hsaWdodFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hdmFpbGFibGVNb3ZlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZ2hsaWdodChhcnJheSkge1xyXG4gICAgICAgIC8vaGlnaGxpZ2h0IGFuZCBhbHNvIGNoYW5nZXMgdGhpcy5uZWlnaGJvcnMgdG8gYmUgYWJsZSB0byBiZSByZWFkIGFzIGFuIGFycmF5IG9mIHN0cmluZ3NcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIGFycmF5W2ldWzBdID0gYXJyYXlbaV1bMF07XHJcbiAgICAgICAgICAgIC8vIGFycmF5W2ldWzFdID0gYXJyYXlbaV1bMV07XHJcbiAgICAgICAgICAgIGxldCBpZCA9IGFycmF5W2ldLmpvaW4oXCJcIikudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgdGhpcy5uZWlnaGJvcnNbaV0gPSBpZDtcclxuICAgICAgICAgICAgbGV0IGVsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2lkfWApO1xyXG4gICAgICAgICAgICBpZiAoZWxlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBlbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJncmVlblwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUJ1dHRvbihpbm5lclRleHQpIHtcclxuICAgICAgICBsZXQgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICBidG4uaW5uZXJIVE1MID0gaW5uZXJUZXh0XHJcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2J1dHRvbicpO1xyXG4gICAgICAgIGlmIChpbm5lclRleHQgPT09IFwiUGxhY2UgYSB3YWxsXCIpIHtcclxuICAgICAgICAgICAgYnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIFwicGxhY2VcIik7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpbm5lclRleHQgPT09IFwiTW92ZSBjaGFyYWN0ZXJcIikge1xyXG4gICAgICAgICAgICBidG4uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJtb3ZlXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBpbm5lclRleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNvbnRyb2xsZXItZGl2XCIpWzBdLmFwcGVuZENoaWxkKGJ0bik7XHJcbiAgICAgICAgcmV0dXJuIGJ0bjtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVSZXN0YXJ0RGl2KGJvYXJkLCB3aW5uZXIpIHtcclxuICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBsZXQgY29uZ3JhdHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XHJcbiAgICAgICAgLy8gbGV0IGluc3RydWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgbGV0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgZGl2LnNldEF0dHJpYnV0ZShcImlkXCIsIFwicmVzdGFydC1kaXZcIik7XHJcbiAgICAgICAgYnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIFwicmVzdGFydFwiKTtcclxuICAgICAgICBjb25ncmF0cy5pbm5lckhUTUwgPSBgQ29uZ3JhdHMgdG8gJHt3aW5uZXJ9ISEhIWA7XHJcbiAgICAgICAgLy8gaW5zdHJ1Y3QuaW5uZXJIVE1MID0gXCJDbGljayBidXR0b24gdG8gcmVzdGFydCB0aGUgZ2FtZS5cIlxyXG4gICAgICAgIGJ0bi5pbm5lckhUTUwgPSBcIlJlc3RhcnRcIlxyXG5cclxuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoY29uZ3JhdHMpO1xyXG4gICAgICAgIC8vIGRpdi5hcHBlbmRDaGlsZChpbnN0cnVjdCk7XHJcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKGJ0bik7XHJcbiAgICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXR1cEJvYXJkKCkge1xyXG4gICAgICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgICAgIGxldCBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcclxuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoYm9hcmQpO1xyXG4gICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKFwidGFibGVcIik7XHJcbiAgICAgICAgYm9hcmQuc2V0QXR0cmlidXRlKFwiaWRcIiAsIFwiYm9hcmRcIik7XHJcbiAgICAgICAgbGV0IHdob3NUdXJuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICB3aG9zVHVybi5jbGFzc0xpc3QuYWRkKFwicGxheWVyLXR1cm5cIik7XHJcbiAgICAgICAgd2hvc1R1cm4uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJwbGF5ZXItdHVyblwiKTtcclxuICAgICAgICB3aG9zVHVybi5pbm5lckhUTUwgPSBcIlBsYXllciAxJ3MgVHVyblwiO1xyXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZCh3aG9zVHVybik7XHJcbiAgICAgICAgbGV0IGNudHJsRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBjbnRybERpdi5jbGFzc0xpc3QuYWRkKFwiY29udHJvbGxlci1kaXZcIik7XHJcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKGNudHJsRGl2KTtcclxuICAgICAgICBsZXQgd2FsbENvdW50ZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIHdhbGxDb3VudGVyRGl2LmNsYXNzTGlzdC5hZGQoXCJ3YWxsLWNvdW50ZXItZGl2XCIpO1xyXG4gICAgICAgIHdhbGxDb3VudGVyRGl2LnNldEF0dHJpYnV0ZShcImlkXCIsIFwid2FsbC1jb3VudGVyXCIpO1xyXG4gICAgICAgIGxldCBwbGF5ZXIxV2FsbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGxldCBwbGF5ZXIyV2FsbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIHBsYXllcjFXYWxscy5jbGFzc0xpc3QuYWRkKFwid2FsbC1jb3VudGVyXCIpO1xyXG4gICAgICAgIHBsYXllcjJXYWxscy5jbGFzc0xpc3QuYWRkKFwid2FsbC1jb3VudGVyXCIpO1xyXG4gICAgICAgIHBsYXllcjFXYWxscy5pbm5lckhUTUwgPSBcInBsYXllciAxIGhhcyAxMCB3YWxscyBsZWZ0XCI7XHJcbiAgICAgICAgcGxheWVyMldhbGxzLmlubmVySFRNTCA9IFwicGxheWVyIDIgaGFzIDEwIHdhbGxzIGxlZnRcIjtcclxuICAgICAgICB3YWxsQ291bnRlckRpdi5hcHBlbmRDaGlsZChwbGF5ZXIxV2FsbHMpO1xyXG4gICAgICAgIHdhbGxDb3VudGVyRGl2LmFwcGVuZENoaWxkKHBsYXllcjJXYWxscyk7XHJcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKHdhbGxDb3VudGVyRGl2KTtcclxuXHJcbiAgICAgICAgLy9idWlsZCB3YWxscyBidXR0b25cclxuICAgICAgICB0aGlzLmNyZWF0ZUJ1dHRvbihcIlBsYWNlIGEgd2FsbFwiKTtcclxuICAgICAgICAvL21vdmVtZW50IGJ1dHRvblxyXG4gICAgICAgIHRoaXMuY3JlYXRlQnV0dG9uKFwiTW92ZSBjaGFyYWN0ZXJcIik7XHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAvKiBpbnN0cnVjdGlvbiBmb3IgY2xpY2tpbmcgc3F1YXJlcyAqL1xyXG4gICAgICAgIGxldCBjbGlja0luc3RydWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICAgICAgY2xpY2tJbnN0cnVjdC5jbGFzc0xpc3QuYWRkKFwiY2xpY2tJbnN0cnVjdFwiKTtcclxuICAgICAgICBjbGlja0luc3RydWN0LmlubmVySFRNTCA9IFwiQ2xpY2sgdHdvIGRpc3RpbmN0IHNxdWFyZXMuLi5cIlxyXG4gICAgICAgIGNsaWNrSW5zdHJ1Y3QuY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XHJcbiAgICAgICAgY250cmxEaXYuYXBwZW5kQ2hpbGQoY2xpY2tJbnN0cnVjdCk7XHJcbiAgICAgICAgLyogd2FsbCB0eXBlIGJ1dHRvbnMgKi9cclxuICAgICAgICBsZXQgbm9ydGggPSB0aGlzLmNyZWF0ZUJ1dHRvbihcIk5vcnRoXCIpO1xyXG4gICAgICAgIGxldCBlYXN0ID0gdGhpcy5jcmVhdGVCdXR0b24oXCJFYXN0XCIpO1xyXG4gICAgICAgIGxldCBzb3V0aCA9IHRoaXMuY3JlYXRlQnV0dG9uKFwiU291dGhcIik7XHJcbiAgICAgICAgbGV0IHdlc3QgPSB0aGlzLmNyZWF0ZUJ1dHRvbihcIldlc3RcIik7XHJcbiAgICAgICAgbm9ydGguY2xhc3NMaXN0LmFkZChcImhpZGVcIiwgXCJub3J0aFwiKTtcclxuICAgICAgICBlYXN0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIsIFwiZWFzdFwiKTtcclxuICAgICAgICBzb3V0aC5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiLCBcInNvdXRoXCIpO1xyXG4gICAgICAgIHdlc3QuY2xhc3NMaXN0LmFkZChcImhpZGVcIiwgXCJ3ZXN0XCIpO1xyXG4gICAgICAgIGNudHJsRGl2LmFwcGVuZENoaWxkKG5vcnRoKTtcclxuICAgICAgICBjbnRybERpdi5hcHBlbmRDaGlsZChzb3V0aCk7XHJcbiAgICAgICAgY250cmxEaXYuYXBwZW5kQ2hpbGQod2VzdCk7XHJcbiAgICAgICAgY250cmxEaXYuYXBwZW5kQ2hpbGQoZWFzdCk7XHJcblxyXG4gICAgICAgIC8qIGJhY2sgYnV0dG9uICovXHJcbiAgICAgICAgbGV0IGJhY2sgPSB0aGlzLmNyZWF0ZUJ1dHRvbihcImJhY2tcIik7XHJcbiAgICAgICAgYmFjay5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcclxuICAgICAgICBjbnRybERpdi5hcHBlbmRDaGlsZChiYWNrKTtcclxuXHJcbiAgICAgICAgZm9yKGxldCByb3dJZHggPSAwOyByb3dJZHggPCAxMDsgcm93SWR4KyspIHtcclxuICAgICAgICAgICAgbGV0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGNvbElkeCA9IDA7IGNvbElkeCA8IDEwOyBjb2xJZHgrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYocm93SWR4ID09PSAwICYmIGNvbElkeCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoLmlubmVySFRNTCA9IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICB0ci5hcHBlbmRDaGlsZCh0aCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJvd0lkeCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoLmlubmVySFRNTCA9IGNvbElkeCAtIDFcclxuICAgICAgICAgICAgICAgICAgICB0ci5hcHBlbmRDaGlsZCh0aCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJvd0lkeCA+IDAgJiYgY29sSWR4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGguaW5uZXJIVE1MID0gcm93SWR4IC0gMVxyXG4gICAgICAgICAgICAgICAgICAgIHRyLmFwcGVuZENoaWxkKHRoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGQuaWQgPSBgJHtyb3dJZHggLSAxfSR7Y29sSWR4IC0gMX1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHRkLmNsYXNzTGlzdC5hZGQoXCJmbG9vclwiLCBcImhhbGxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKHRyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIvLyBpbXBvcnQgXywgeyB0aHJvdHRsZSB9IGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xyXG5pbXBvcnQgSWNvbiBmcm9tICcuL2ljb24ucG5nJztcclxuaW1wb3J0IEdhbWVWaWV3IGZyb20gXCIuL2dhbWVfdmlld1wiO1xyXG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9nYW1lXCI7XHJcbi8vIGNvbnN0IGFwcCA9IHJlcXVpcmUoJ2V4cHJlc3MnKSgpO1xyXG4vLyBjb25zdCBodHRwID0gcmVxdWlyZSgnaHR0cCcpLmNyZWF0ZVNlcnZlcihhcHApO1xyXG5cclxuLy8gYXBwLmdldCgnLycsIChyZXEsIHJlcykgPT4ge1xyXG4vLyAgICAgcmVzLnNlbmRGaWxlKF9fZGlybmFtZSArICcvZGlzdC9pbmRleC5odG1sJyk7XHJcbi8vIH0pO1xyXG5cclxuLy8gaHR0cC5saXN0ZW4oODA4MCwgKCkgPT4ge1xyXG4vLyAgICAgY29uc29sZS5sb2coJ2xpc3RlbmluZyBvbiAqOjgwODAnKTtcclxuLy8gfSlcclxuXHJcbmZ1bmN0aW9uIGljb25Db21wb25lbnQoKSB7XHJcbiAgICBcclxuICAgIC8vIEFkZCB0aGUgaW1hZ2UgdG8gb3VyIGV4aXN0aW5nIGRpdi5cclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XHJcbiAgICBlbGVtZW50LnJlbCA9IFwiaWNvblwiO1xyXG4gICAgZWxlbWVudC5ocmVmID0gSWNvbjtcclxuICAgIGVsZW1lbnQudHlwZSA9ICdpbWFnZS9wbmcnO1xyXG5cclxuICAgIHJldHVybiBlbGVtZW50O1xyXG59XHJcblxyXG5kb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGljb25Db21wb25lbnQoKSk7XHJcblxyXG5cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBnYW1lID0gbmV3IEdhbWUoKTtcclxuICAgIC8vIHNldHVwQm9hcmQoKTtcclxuICAgIGxldCBnYW1lVmlldyA9IG5ldyBHYW1lVmlldyhnYW1lKTtcclxuICAgIGdhbWUuc3RhcnQoKTtcclxuICAgIGdhbWVWaWV3LnNob3coKTtcclxufSk7XHJcblxyXG5cclxuXHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNxdWFyZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb2xJZHgsIHJvd0lkeCkge1xyXG4gICAgICAgIHRoaXMud2FsbHMgPSB7XHJcbiAgICAgICAgICAgIE5vcnRoOiBmYWxzZSxcclxuICAgICAgICAgICAgRWFzdDogZmFsc2UsXHJcbiAgICAgICAgICAgIFNvdXRoOiBmYWxzZSxcclxuICAgICAgICAgICAgV2VzdDogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb2xJZHggPSBjb2xJZHg7XHJcbiAgICAgICAgdGhpcy5yb3dJZHggPSByb3dJZHg7IFxyXG4gICAgICAgIHRoaXMucGxheWVyID0gXCJlbXB0eVwiO1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSBcIm5vb25lXCJcclxuICAgIH1cclxuXHJcbiAgICAvLyBnZXROb3J0aCgpIHtcclxuICAgIC8vICAgICByZXR1cm4gdGhpcy53YWxscy5Ob3J0aDtcclxuICAgIC8vIH1cclxuICAgIC8vIGdldEVhc3QoKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMud2FsbHMuRWFzdDtcclxuICAgIC8vIH1cclxuICAgIC8vIGdldFNvdXRoKCkge1xyXG4gICAgLy8gICAgIHJldHVybiB0aGlzLndhbGxzLlNvdXRoO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gZ2V0V2VzdCgpIHtcclxuICAgIC8vICAgICByZXR1cm4gdGhpcy53YWxscy5XZXN0O1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHNldE5vcnRoKGJvb2wpIHtcclxuICAgIC8vICAgICBib29sID8gdGhpcy53YWxscy5Ob3J0aCA9IGJvb2wgOiB0aGlzLndhbGxzLk5vcnRoID0gIWJvb2w7XHJcbiAgICAvLyB9XHJcbiAgICAvLyBzZXRFYXN0KGJvb2wpIHtcclxuICAgIC8vICAgICBib29sID8gdGhpcy53YWxscy5FYXN0ID0gYm9vbCA6IHRoaXMud2FsbHMuRWFzdCA9ICFib29sO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gc2V0U291dGgoYm9vbCkge1xyXG4gICAgLy8gICAgIGJvb2wgPyB0aGlzLndhbGxzLlNvdXRoID0gYm9vbCA6IHRoaXMud2FsbHMuU291dGggPSAhYm9vbDtcclxuICAgIC8vIH1cclxuICAgIC8vIHNldFdlc3QoYm9vbCkge1xyXG4gICAgLy8gICAgIGJvb2wgPyB0aGlzLndhbGxzLldlc3QgPSBib29sIDogdGhpcy53YWxscy5XZXN0ID0gIWJvb2w7XHJcbiAgICAvLyB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnZXhwb3J0cycgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==