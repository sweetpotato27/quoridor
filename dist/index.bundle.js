/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/backo2/index.js":
/*!**************************************!*\
  !*** ./node_modules/backo2/index.js ***!
  \**************************************/
/***/ ((module) => {


/**
 * Expose `Backoff`.
 */

module.exports = Backoff;

/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */

function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 10000;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}

/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */

Backoff.prototype.duration = function(){
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand =  Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0  ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};

/**
 * Reset the number of attempts.
 *
 * @api public
 */

Backoff.prototype.reset = function(){
  this.attempts = 0;
};

/**
 * Set the minimum duration
 *
 * @api public
 */

Backoff.prototype.setMin = function(min){
  this.ms = min;
};

/**
 * Set the maximum duration
 *
 * @api public
 */

Backoff.prototype.setMax = function(max){
  this.max = max;
};

/**
 * Set the jitter
 *
 * @api public
 */

Backoff.prototype.setJitter = function(jitter){
  this.jitter = jitter;
};



/***/ }),

/***/ "./node_modules/base64-arraybuffer/lib/base64-arraybuffer.js":
/*!*******************************************************************!*\
  !*** ./node_modules/base64-arraybuffer/lib/base64-arraybuffer.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports) => {

/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */
(function(chars){
  "use strict";

  exports.encode = function(arraybuffer) {
    var bytes = new Uint8Array(arraybuffer),
    i, len = bytes.length, base64 = "";

    for (i = 0; i < len; i+=3) {
      base64 += chars[bytes[i] >> 2];
      base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
      base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
      base64 += chars[bytes[i + 2] & 63];
    }

    if ((len % 3) === 2) {
      base64 = base64.substring(0, base64.length - 1) + "=";
    } else if (len % 3 === 1) {
      base64 = base64.substring(0, base64.length - 2) + "==";
    }

    return base64;
  };

  exports.decode =  function(base64) {
    var bufferLength = base64.length * 0.75,
    len = base64.length, i, p = 0,
    encoded1, encoded2, encoded3, encoded4;

    if (base64[base64.length - 1] === "=") {
      bufferLength--;
      if (base64[base64.length - 2] === "=") {
        bufferLength--;
      }
    }

    var arraybuffer = new ArrayBuffer(bufferLength),
    bytes = new Uint8Array(arraybuffer);

    for (i = 0; i < len; i+=4) {
      encoded1 = chars.indexOf(base64[i]);
      encoded2 = chars.indexOf(base64[i+1]);
      encoded3 = chars.indexOf(base64[i+2]);
      encoded4 = chars.indexOf(base64[i+3]);

      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }

    return arraybuffer;
  };
})("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");


/***/ }),

/***/ "./node_modules/component-emitter/index.js":
/*!*************************************************!*\
  !*** ./node_modules/component-emitter/index.js ***!
  \*************************************************/
/***/ ((module) => {


/**
 * Expose `Emitter`.
 */

if (true) {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }

  // Remove event specific arrays for event types that no
  // one is subscribed for to avoid memory leak.
  if (callbacks.length === 0) {
    delete this._callbacks['$' + event];
  }

  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};

  var args = new Array(arguments.length - 1)
    , callbacks = this._callbacks['$' + event];

  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss ***!
  \*****************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Quantico:wght@400;700&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\n\nhtml {\n  background: #4D618B;\n}\n\nbody {\n  line-height: 1;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n}\n\nol, ul {\n  list-style: none;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: \"\";\n  content: none;\n}\n\n/*\n\tmedia queries\n*/\n/* small phone */\n@media only screen and (max-width: 321px) {\n  table {\n    font-size: 1em;\n  }\n\n  .hide {\n    display: none;\n  }\n\n  #board {\n    width: 95%;\n    min-height: 304px;\n    margin-top: 2em;\n    margin-left: auto;\n    margin-right: auto;\n  }\n\n  .wall-top {\n    border-top: 2px solid #FFB000;\n    z-index: 9;\n  }\n\n  .wall-bottom {\n    border-bottom: 2px solid #FFB000;\n    z-index: 9;\n  }\n\n  .wall-right {\n    border-right: 2px solid #FFB000;\n    z-index: 9;\n  }\n\n  .wall-left {\n    border-left: 2px solid #FFB000;\n    z-index: 9;\n  }\n\n  .table {\n    width: 100vw;\n    border-spacing: 0;\n    display: flex;\n    flex-direction: column;\n  }\n\n  .hall {\n    /* border: 5px solid #3A638E;  */\n    /* width: 4em; height: 4em;  */\n    z-index: 5;\n  }\n\n  td {\n    width: 33px;\n    height: 33px;\n    border: 2px solid #4D618B;\n    background: #7686A8;\n  }\n\n  tr {\n    height: 33px;\n  }\n\n  .button {\n    /* margin: 20px auto; */\n    padding: 5px 7px;\n  }\n\n  .controller-div {\n    margin: 1em auto;\n    width: 80%;\n    padding: 5px 7px;\n    display: flex;\n    justify-content: space-between;\n  }\n\n  .controller-btn {\n    background: #B8C3D9;\n    font-family: \"Quantico\", sans-serif;\n    cursor: pointer;\n    border: none;\n    margin: auto;\n    height: 45px;\n    width: 100px;\n    transition: transform 0.3s ease-in-out;\n    box-shadow: 0 1.4px 1.1px rgba(0, 0, 0, 0.034), 0 3.4px 2.6px rgba(0, 0, 0, 0.048), 0 7.7px 5px rgba(0, 0, 0, 0.06), 0 11.15px 8.5px rgba(0, 0, 0, 0.086), 0 50px 40px rgba(0, 0, 0, 0.12);\n  }\n\n  .controller-btn:hover {\n    transition: 0.3s ease-in-out;\n    background: #7383A6;\n    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 15.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);\n  }\n\n  .player {\n    font-size: 1.3em;\n    line-height: 36px;\n    text-align: center;\n  }\n\n  .highlight {\n    background: #8DBB5E;\n  }\n\n  .highlight:hover {\n    background: #BDE297;\n  }\n\n  .selectedWall {\n    background: #B02D1F;\n  }\n\n  .player-turn {\n    font-family: \"Quantico\", sans-serif;\n    padding: 10px;\n    text-align: center;\n  }\n\n  .wall-counter-div {\n    margin: 2em auto;\n    display: flex;\n  }\n\n  .wall-counter {\n    font-family: \"Quantico\", sans-serif;\n    font-size: 1em;\n    max-width: 75px;\n    margin-left: 20px;\n    margin-right: 20px;\n  }\n}\n/* medium phone */\n@media only screen and (max-width: 376px) and (min-width: 322px) {\n  table {\n    font-size: 1em;\n  }\n\n  .hide {\n    display: none;\n  }\n\n  #board {\n    width: 95%;\n    max-height: 3360px;\n    margin-top: 2em;\n    margin-left: auto;\n    margin-right: auto;\n  }\n\n  .wall-top {\n    border-top: 2px solid #FFB000;\n    z-index: 9;\n  }\n\n  .wall-bottom {\n    border-bottom: 2px solid #FFB000;\n    z-index: 9;\n  }\n\n  .wall-right {\n    border-right: 2px solid #FFB000;\n    z-index: 9;\n  }\n\n  .wall-left {\n    border-left: 2px solid #FFB000;\n    z-index: 9;\n  }\n\n  .table {\n    width: 100vw;\n    border-spacing: 0;\n    display: flex;\n    flex-direction: column;\n  }\n\n  .hall {\n    /* border: 5px solid #3A638E;  */\n    /* width: 4em; height: 4em;  */\n    z-index: 5;\n  }\n\n  .table .floor {\n    /* background: brown;  */\n  }\n\n  td {\n    width: 36px;\n    height: 36px;\n    border: 2px solid #4D618B;\n    background: #7686A8;\n  }\n\n  tr {\n    height: 43px;\n  }\n\n  .button {\n    /* margin: 20px auto; */\n    padding: 5px 7px;\n  }\n\n  .controller-div {\n    margin: 1em auto;\n    width: 80%;\n    padding: 5px 7px;\n    display: flex;\n    justify-content: space-between;\n  }\n\n  .controller-btn {\n    background: #B8C3D9;\n    font-family: \"Quantico\", sans-serif;\n    cursor: pointer;\n    border: none;\n    margin: auto;\n    height: 45px;\n    width: 100px;\n    transition: transform 0.3s ease-in-out;\n    box-shadow: 0 1.4px 1.1px rgba(0, 0, 0, 0.034), 0 3.4px 2.6px rgba(0, 0, 0, 0.048), 0 7.7px 5px rgba(0, 0, 0, 0.06), 0 11.15px 8.5px rgba(0, 0, 0, 0.086), 0 50px 40px rgba(0, 0, 0, 0.12);\n  }\n\n  .controller-btn:hover {\n    transition: 0.3s ease-in-out;\n    background: #7383A6;\n    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 15.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);\n  }\n\n  .player {\n    font-size: 1.7em;\n    line-height: 36px;\n    text-align: center;\n  }\n\n  .highlight {\n    background: #8DBB5E;\n  }\n\n  .highlight:hover {\n    background: #BDE297;\n  }\n\n  .selectedWall {\n    background: #B02D1F;\n  }\n\n  .player-turn {\n    font-family: \"Quantico\", sans-serif;\n    padding: 10px;\n    text-align: center;\n  }\n\n  .wall-counter-div {\n    margin: 2em auto;\n    display: flex;\n  }\n\n  .wall-counter {\n    font-family: \"Quantico\", sans-serif;\n    font-size: 1em;\n    max-width: 75px;\n    margin-left: 20px;\n    margin-right: 20px;\n  }\n}\n/* large phone */\n@media only screen and (max-width: 640px) and (min-width: 377px) {\n  table {\n    font-size: 1em;\n  }\n\n  .hide {\n    display: none;\n  }\n\n  #board {\n    width: 387px;\n    max-height: 387px;\n    margin-top: 2em;\n    margin-left: auto;\n    margin-right: auto;\n  }\n\n  .wall-top {\n    border-top: 2px solid #FFB000;\n    z-index: 9;\n  }\n\n  .wall-bottom {\n    border-bottom: 2px solid #FFB000;\n    z-index: 9;\n  }\n\n  .wall-right {\n    border-right: 2px solid #FFB000;\n    z-index: 9;\n  }\n\n  .wall-left {\n    border-left: 2px solid #FFB000;\n    z-index: 9;\n  }\n\n  .table {\n    width: 100vw;\n    border-spacing: 0;\n    display: flex;\n    flex-direction: column;\n  }\n\n  .hall {\n    /* border: 5px solid #3A638E;  */\n    /* width: 4em; height: 4em;  */\n    z-index: 5;\n  }\n\n  td {\n    width: 39px;\n    height: 39px;\n    border: 2px solid #4D618B;\n    background: #7686A8;\n  }\n\n  tr {\n    height: 43px;\n  }\n\n  .button {\n    /* margin: 20px auto; */\n    padding: 5px 7px;\n  }\n\n  .controller-div {\n    margin: 1em auto;\n    width: 80%;\n    padding: 5px 7px;\n    display: flex;\n    justify-content: space-between;\n  }\n\n  .controller-btn {\n    background: #B8C3D9;\n    font-family: \"Quantico\", sans-serif;\n    cursor: pointer;\n    border: none;\n    margin: auto;\n    height: 45px;\n    width: 100px;\n    transition: transform 0.3s ease-in-out;\n    box-shadow: 0 1.4px 1.1px rgba(0, 0, 0, 0.034), 0 3.4px 2.6px rgba(0, 0, 0, 0.048), 0 7.7px 5px rgba(0, 0, 0, 0.06), 0 11.15px 8.5px rgba(0, 0, 0, 0.086), 0 50px 40px rgba(0, 0, 0, 0.12);\n  }\n\n  .controller-btn:hover {\n    transition: 0.3s ease-in-out;\n    background: #7383A6;\n    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 15.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);\n  }\n\n  .player {\n    font-size: 1.7em;\n    line-height: 43px;\n    text-align: center;\n  }\n\n  .highlight {\n    background: #8DBB5E;\n  }\n\n  .highlight:hover {\n    background: #BDE297;\n  }\n\n  .selectedWall {\n    background: #B02D1F;\n  }\n\n  .player-turn {\n    font-family: \"Quantico\", sans-serif;\n    padding: 13px;\n    text-align: center;\n  }\n\n  .wall-counter-div {\n    margin: 2em auto;\n    display: flex;\n  }\n\n  .wall-counter {\n    font-family: \"Quantico\", sans-serif;\n    font-size: 1.25em;\n    max-width: 80px;\n    margin-left: 20px;\n    margin-right: 20px;\n  }\n}\n/* tablet */\n@media only screen and (max-width: 768px) and (min-width: 641px) {\n  table {\n    font-size: 1em;\n  }\n\n  .hide {\n    display: none;\n  }\n\n  #board {\n    width: 495px;\n    height: 495px;\n    margin-top: 2em;\n    margin-left: auto;\n    margin-right: auto;\n  }\n\n  .wall-top {\n    border-top: 3px solid #FFB000;\n    z-index: 9;\n  }\n\n  .wall-bottom {\n    border-bottom: 3px solid #FFB000;\n    z-index: 9;\n  }\n\n  .wall-right {\n    border-right: 3px solid #FFB000;\n    z-index: 9;\n  }\n\n  .wall-left {\n    border-left: 3px solid #FFB000;\n    z-index: 9;\n  }\n\n  .table {\n    border-spacing: 0;\n    display: flex;\n    flex-direction: column;\n  }\n\n  .hall {\n    z-index: 5;\n  }\n\n  td {\n    width: 49px;\n    height: 49px;\n    border: 3px solid #4D618B;\n    background: #7686A8;\n  }\n\n  tr {\n    height: 55px;\n  }\n\n  .button {\n    padding: 5px 7px;\n  }\n\n  .controller-div {\n    margin: 1em auto;\n    width: 80%;\n    padding: 5px 7px;\n    display: flex;\n    justify-content: space-between;\n  }\n\n  .controller-btn {\n    background: #B8C3D9;\n    font-family: \"Quantico\", sans-serif;\n    cursor: pointer;\n    border: none;\n    margin: auto;\n    height: 45px;\n    width: 100px;\n    transition: transform 0.3s ease-in-out;\n    box-shadow: 0 1.4px 1.1px rgba(0, 0, 0, 0.034), 0 3.4px 2.6px rgba(0, 0, 0, 0.048), 0 7.7px 5px rgba(0, 0, 0, 0.06), 0 11.15px 8.5px rgba(0, 0, 0, 0.086), 0 50px 40px rgba(0, 0, 0, 0.12);\n  }\n\n  .controller-btn:hover {\n    transition: 0.3s ease-in-out;\n    background: #7383A6;\n    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 15.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);\n  }\n\n  .player {\n    font-size: 1.75em;\n    line-height: 55px;\n    text-align: center;\n  }\n\n  .highlight {\n    background: #8DBB5E;\n  }\n\n  .highlight:hover {\n    background: #BDE297;\n  }\n\n  .selectedWall {\n    background: #B02D1F;\n  }\n\n  .player-turn {\n    font-family: \"Quantico\", sans-serif;\n    padding: 20px;\n    margin: 0 auto;\n  }\n\n  .wall-counter-div {\n    margin-top: 30px;\n    display: flex;\n  }\n\n  .wall-counter {\n    font-family: \"Quantico\", sans-serif;\n    margin: auto;\n  }\n}\n/* laptop 1024px */\n@media only screen and (max-width: 1024px) and (min-width: 769px) {\n  table {\n    font-size: 1em;\n  }\n\n  .hide {\n    display: none;\n  }\n\n  #board {\n    width: 495px;\n    height: 495px;\n    margin-top: 1em;\n    margin-left: auto;\n    margin-right: auto;\n  }\n\n  .wall-top {\n    border-top: 3px solid #FFB000;\n    z-index: 9;\n  }\n\n  .wall-bottom {\n    border-bottom: 3px solid #FFB000;\n    z-index: 9;\n  }\n\n  .wall-right {\n    border-right: 3px solid #FFB000;\n    z-index: 9;\n  }\n\n  .wall-left {\n    border-left: 3px solid #FFB000;\n    z-index: 9;\n  }\n\n  .table {\n    border-spacing: 0;\n    display: flex;\n    flex-direction: column;\n  }\n\n  .hall {\n    z-index: 5;\n  }\n\n  td {\n    width: 49px;\n    height: 49px;\n    border: 3px solid #4D618B;\n    background: #7686A8;\n  }\n\n  tr {\n    height: 55px;\n  }\n\n  .button {\n    padding: 5px 7px;\n  }\n\n  .controller-div {\n    margin: 1em auto;\n    width: 80%;\n    padding: 5px 7px;\n    display: flex;\n    justify-content: space-between;\n  }\n\n  .controller-btn {\n    background: #B8C3D9;\n    font-family: \"Quantico\", sans-serif;\n    font-size: 1em;\n    cursor: pointer;\n    border: none;\n    margin: auto;\n    height: 55px;\n    width: 133px;\n    transition: transform 0.3s ease-in-out;\n    box-shadow: 0 1.4px 1.1px rgba(0, 0, 0, 0.034), 0 3.4px 2.6px rgba(0, 0, 0, 0.048), 0 7.7px 5px rgba(0, 0, 0, 0.06), 0 11.15px 8.5px rgba(0, 0, 0, 0.086), 0 50px 40px rgba(0, 0, 0, 0.12);\n  }\n\n  .controller-btn:hover {\n    transition: 0.3s ease-in-out;\n    background: #7383A6;\n    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 15.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);\n  }\n\n  .player {\n    font-size: 1.75em;\n    line-height: 55px;\n    text-align: center;\n  }\n\n  .highlight {\n    background: #8DBB5E;\n  }\n\n  .highlight:hover {\n    background: #BDE297;\n  }\n\n  .selectedWall {\n    background: #B02D1F;\n  }\n\n  .player-turn {\n    font-family: \"Quantico\", sans-serif;\n    padding: 20px;\n    margin: 0 auto;\n  }\n\n  .wall-counter-div {\n    margin-top: 5px;\n    display: flex;\n  }\n\n  .wall-counter {\n    font-family: \"Quantico\", sans-serif;\n    margin: auto;\n  }\n}\n/* large laptop */\n@media only screen and (max-width: 1440px) and (min-width: 1025px) {\n  table {\n    font-size: 1em;\n  }\n\n  .hide {\n    display: none;\n  }\n\n  #board {\n    width: 630px;\n    height: 630px;\n    margin-top: 1em;\n    margin-left: auto;\n    margin-right: auto;\n  }\n\n  .wall-top {\n    border-top: 3px solid #FFB000;\n    z-index: 9;\n  }\n\n  .wall-bottom {\n    border-bottom: 3px solid #FFB000;\n    z-index: 9;\n  }\n\n  .wall-right {\n    border-right: 3px solid #FFB000;\n    z-index: 9;\n  }\n\n  .wall-left {\n    border-left: 3px solid #FFB000;\n    z-index: 9;\n  }\n\n  .table {\n    border-spacing: 0;\n    display: flex;\n    flex-direction: column;\n  }\n\n  .hall {\n    z-index: 5;\n  }\n\n  td {\n    width: 60px;\n    height: 60px;\n    border: 5px solid #4D618B;\n    background: #7686A8;\n  }\n\n  tr {\n    height: 70px;\n  }\n\n  .button {\n    padding: 5px 7px;\n  }\n\n  .controller-div {\n    margin: 1em auto;\n    width: 80%;\n    padding: 5px 7px;\n    display: flex;\n    justify-content: space-between;\n  }\n\n  .controller-div > p {\n    font-family: \"Quantico\", sans-serif;\n    font-size: 1em;\n  }\n\n  .controller-btn {\n    background: #B8C3D9;\n    font-family: \"Quantico\", sans-serif;\n    font-size: 1em;\n    cursor: pointer;\n    border: none;\n    margin: auto;\n    height: 55px;\n    width: 133px;\n    transition: transform 0.3s ease-in-out;\n    box-shadow: 0 1.4px 1.1px rgba(0, 0, 0, 0.034), 0 3.4px 2.6px rgba(0, 0, 0, 0.048), 0 7.7px 5px rgba(0, 0, 0, 0.06), 0 11.15px 8.5px rgba(0, 0, 0, 0.086), 0 50px 40px rgba(0, 0, 0, 0.12);\n  }\n\n  .controller-btn:hover {\n    transition: 0.3s ease-in-out;\n    background: #7383A6;\n    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 15.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);\n  }\n\n  .player {\n    font-size: 1.75em;\n    line-height: 55px;\n    text-align: center;\n  }\n\n  .highlight {\n    background: #8DBB5E;\n  }\n\n  .highlight:hover {\n    background: #BDE297;\n  }\n\n  .selectedWall {\n    background: #B02D1F;\n  }\n\n  .player-turn {\n    font-family: \"Quantico\", sans-serif;\n    padding: 20px;\n    margin: 0 auto;\n  }\n\n  .wall-counter-div {\n    margin-top: 5px;\n    display: flex;\n  }\n\n  .wall-counter {\n    font-family: \"Quantico\", sans-serif;\n    margin: auto;\n  }\n}\n/* 4k laptop */\n@media only screen and (min-width: 1441px) {\n  table {\n    font-size: 1em;\n  }\n\n  .hide {\n    display: none;\n  }\n\n  #board {\n    width: 720px;\n    height: 720px;\n    margin-top: 3em;\n    margin-left: auto;\n    margin-right: auto;\n  }\n\n  .wall-top {\n    border-top: 5px solid #FFB000;\n    z-index: 9;\n  }\n\n  .wall-bottom {\n    border-bottom: 5px solid #FFB000;\n    z-index: 9;\n  }\n\n  .wall-right {\n    border-right: 5px solid #FFB000;\n    z-index: 9;\n  }\n\n  .wall-left {\n    border-left: 5px solid #FFB000;\n    z-index: 9;\n  }\n\n  .table {\n    border-spacing: 0;\n    display: flex;\n    flex-direction: column;\n  }\n\n  .hall {\n    z-index: 5;\n  }\n\n  td {\n    width: 70px;\n    height: 70px;\n    border: 5px solid #4D618B;\n    background: #7686A8;\n  }\n\n  tr {\n    height: 80px;\n  }\n\n  .button {\n    padding: 5px 7px;\n  }\n\n  .controller-div {\n    margin: 0 auto;\n    width: 80%;\n    padding: 5px 7px;\n    display: flex;\n    justify-content: space-between;\n  }\n\n  .controller-div > p {\n    font-family: \"Quantico\", sans-serif;\n    font-size: 1.5em;\n  }\n\n  .controller-btn {\n    background: #B8C3D9;\n    font-family: \"Quantico\", sans-serif;\n    font-size: 1.5em;\n    cursor: pointer;\n    border: none;\n    margin: 0 auto;\n    height: 75px;\n    width: 200px;\n    transition: transform 0.3s ease-in-out;\n    box-shadow: 0 1.4px 1.1px rgba(0, 0, 0, 0.034), 0 3.4px 2.6px rgba(0, 0, 0, 0.048), 0 7.7px 5px rgba(0, 0, 0, 0.06), 0 11.15px 8.5px rgba(0, 0, 0, 0.086), 0 50px 40px rgba(0, 0, 0, 0.12);\n  }\n\n  .controller-btn:hover {\n    transition: 0.3s ease-in-out;\n    background: #7383A6;\n    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 15.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);\n  }\n\n  .player {\n    font-size: 3em;\n    line-height: 80px;\n    text-align: center;\n  }\n\n  .highlight {\n    background: #8DBB5E;\n  }\n\n  .highlight:hover {\n    background: #BDE297;\n  }\n\n  .selectedWall {\n    background: #B02D1F;\n  }\n\n  .player-turn {\n    font-family: \"Quantico\", sans-serif;\n    font-size: 2em;\n    padding: 20px;\n    margin: 0 auto;\n  }\n\n  .wall-counter-div {\n    margin-top: 2em;\n    display: flex;\n  }\n\n  .wall-counter {\n    font-family: \"Quantico\", sans-serif;\n    font-size: 2em;\n    margin: auto;\n  }\n}\n#restart-div {\n  position: fixed;\n  display: flex;\n  flex-direction: column;\n  font-size: 2em;\n  padding: 15px;\n  margin: 200px;\n  background-color: white;\n  width: 400px;\n  height: 200px;\n}\n\n#restart-div h1 {\n  margin: 10px auto;\n}\n\n#restart-div button {\n  margin: auto;\n  width: 30%;\n  height: 15%;\n}\n\n.buttonTest {\n  width: 300px;\n  height: 100px;\n}\n\n#roomForm {\n  background: rgba(0, 0, 0, 0.15);\n  margin: auto;\n}\n\n#formDiv {\n  margin: 30% auto;\n}\n\n#roomInput {\n  border: none;\n  padding: 0 1rem;\n  flex-grow: 1;\n  border-radius: 2rem;\n  margin: 0.25rem;\n}\n\n#roomInput:focus {\n  outline: none;\n}\n\n#roomButton {\n  background: #333;\n  border: none;\n  padding: 0 1rem;\n  margin: 0.25rem;\n  border-radius: 3px;\n  outline: none;\n  color: #fff;\n}\n\n#roomButton:hover {\n  background: gray;\n}\n\n#lobby-div {\n  width: 80%;\n}\n\n#lobby-div > h1 {\n  background: #fff;\n  text-align: center;\n}\n\n#lobby-form {\n  background: rgba(0, 0, 0, 0.15);\n  padding: 0.25rem;\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  display: flex;\n  height: 3rem;\n  box-sizing: border-box;\n  backdrop-filter: blur(10px);\n}\n\n#lobby-input {\n  border: none;\n  padding: 0 1rem;\n  flex-grow: 1;\n  border-radius: 2rem;\n  margin: 0.25rem;\n}\n\n#lobby-input:focus {\n  outline: none;\n}\n\n#lobby-form > button {\n  background: #333;\n  border: none;\n  padding: 0 1rem;\n  margin: 0.25rem;\n  border-radius: 3px;\n  outline: none;\n  color: #fff;\n}\n\n#lobby-form > button:hover {\n  background: gray;\n}\n\n#lobby-messages {\n  background: #fff;\n  list-style-type: none;\n  margin: 100px 0;\n  padding: 0;\n  width: 100%;\n  height: 100%;\n}\n\n#lobby-messages > li {\n  padding: 0.5rem 1rem;\n}\n\n#lobby-messages > li:nth-child(odd) {\n  background: #efefef;\n}\n\n#lobby-start-game {\n  width: 100px;\n  height: 50px;\n}\n\n/* splash div */\n#splash-div {\n  background: #A6B1C9;\n  width: 21em;\n  height: 21em;\n  margin: 15em auto auto auto;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 15.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);\n}\n\n.btn {\n  background: #B8C3D9;\n  border: none;\n  margin: auto;\n  height: 5em;\n  width: 13em;\n  transition: transform 0.3s ease-in-out;\n  box-shadow: 0 1.4px 1.1px rgba(0, 0, 0, 0.034), 0 3.4px 2.6px rgba(0, 0, 0, 0.048), 0 7.7px 5px rgba(0, 0, 0, 0.06), 0 11.15px 8.5px rgba(0, 0, 0, 0.086), 0 50px 40px rgba(0, 0, 0, 0.12);\n}\n\n.btn:hover {\n  transition: 0.3s ease-in-out;\n  transform: scale(1.1);\n  background: #7383A6;\n  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 15.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);\n}\n\n/* form div */\n#form-div {\n  background: #A6B1C9;\n  width: 21em;\n  height: 21em;\n  margin: 15em auto auto auto;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 15.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);\n}\n\n#room-form {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n\n#room-input {\n  text-align: center;\n  width: 50%;\n  margin: auto;\n  line-height: 1.5;\n  font: 700 1.2rem \"Roboto Slab\", sans-serif;\n  padding: 1em 2em;\n  letter-spacing: 0.05rem;\n}\n\n#room-button {\n  margin: auto;\n}\n\n/* lobby rooms list */\n#lobby-rooms-list-div {\n  background: #A6B1C9;\n  width: 21em;\n  margin: 15em auto auto auto;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 15.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);\n}\n\n#lobby-rooms-list-div > ul > li > button {\n  margin: 1.3em;\n}\n\n.btn {\n  color: #403174;\n  transition: color 0.25s 0.0833333333s;\n  position: relative;\n}\n.btn::before, .btn::after {\n  border: 0 solid transparent;\n  box-sizing: border-box;\n  content: \"\";\n  pointer-events: none;\n  position: absolute;\n  width: 0;\n  height: 0;\n  bottom: 0;\n  right: 0;\n}\n.btn::before {\n  border-bottom-width: 4px;\n  border-left-width: 4px;\n}\n.btn::after {\n  border-top-width: 4px;\n  border-right-width: 4px;\n}\n.btn:hover {\n  color: #B1A9CD;\n}\n.btn:hover::before, .btn:hover::after {\n  border-color: #B1A9CD;\n  transition: border-color 0s, width 0.25s, height 0.25s;\n  width: 100%;\n  height: 100%;\n}\n.btn:hover::before {\n  transition-delay: 0s, 0s, 0.25s;\n}\n.btn:hover::after {\n  transition-delay: 0s, 0.25s, 0s;\n}\n\n.controller-btn {\n  color: #403174;\n  transition: color 0.25s 0.0833333333s;\n  position: relative;\n}\n.controller-btn::before, .controller-btn::after {\n  border: 0 solid transparent;\n  box-sizing: border-box;\n  content: \"\";\n  pointer-events: none;\n  position: absolute;\n  width: 0;\n  height: 0;\n  bottom: 0;\n  right: 0;\n}\n.controller-btn::before {\n  border-bottom-width: 4px;\n  border-left-width: 4px;\n}\n.controller-btn::after {\n  border-top-width: 4px;\n  border-right-width: 4px;\n}\n.controller-btn:hover {\n  color: #B1A9CD;\n}\n.controller-btn:hover::before, .controller-btn:hover::after {\n  border-color: #B1A9CD;\n  transition: border-color 0s, width 0.25s, height 0.25s;\n  width: 100%;\n  height: 100%;\n}\n.controller-btn:hover::before {\n  transition-delay: 0s, 0s, 0.25s;\n}\n.controller-btn:hover::after {\n  transition-delay: 0s, 0.25s, 0s;\n}\n\n.btn {\n  cursor: pointer;\n  line-height: 1.5;\n  font: 700 1.2rem \"Roboto Slab\", sans-serif;\n  padding: 1em 2em;\n  letter-spacing: 0.05rem;\n}\n\n#winner-div {\n  background: #A6B1C9;\n  width: 30vw;\n  height: 30vw;\n  margin: auto;\n  position: relative;\n}\n\n#winner-message {\n  color: #403174;\n  font-family: \"Quantico\", sans-serif;\n  font-size: 3em;\n  font-weight: bold;\n  text-align: center;\n  position: absolute;\n  bottom: 50%;\n}", "",{"version":3,"sources":["webpack://./src/style.scss"],"names":[],"mappings":"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","sourcesContent":["\r\n\r\n/* http://meyerweb.com/eric/tools/css/reset/ \r\n   v2.0 | 20110126\r\n   License: none (public domain)\r\n*/\r\n\r\n@import url('https://fonts.googleapis.com/css2?family=Quantico:wght@400;700&display=swap');\r\n\r\nhtml, body, div, span, applet, object, iframe,\r\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\r\na, abbr, acronym, address, big, cite, code,\r\ndel, dfn, em, img, ins, kbd, q, s, samp,\r\nsmall, strike, strong, sub, sup, tt, var,\r\nb, u, i, center,\r\ndl, dt, dd, ol, ul, li,\r\nfieldset, form, label, legend,\r\ntable, caption, tbody, tfoot, thead, tr, th, td,\r\narticle, aside, canvas, details, embed, \r\nfigure, figcaption, footer, header, hgroup, \r\nmenu, nav, output, ruby, section, summary,\r\ntime, mark, audio, video {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n\tborder: 0;\r\n\tfont-size: 100%;\r\n\tfont: inherit;\r\n\tvertical-align: baseline;\r\n}\r\n/* HTML5 display-role reset for older browsers */\r\narticle, aside, details, figcaption, figure, \r\nfooter, header, hgroup, menu, nav, section {\r\n\tdisplay: block;\r\n}\r\n\r\n\r\nhtml {\r\n\tbackground: #4D618B;\r\n}\r\n\r\nbody {\r\n\tline-height: 1;\r\n\twidth: 100vw;\r\n\theight: 100vh;\r\n\tdisplay: flex;\r\n\tjustify-content: center;\r\n}\r\nol, ul {\r\n\tlist-style: none;\r\n}\r\nblockquote, q {\r\n\tquotes: none;\r\n}\r\nblockquote:before, blockquote:after,\r\nq:before, q:after {\r\n\tcontent: '';\r\n\tcontent: none;\r\n}\r\n\r\n/*\r\n\tmedia queries\r\n*/\r\n/* small phone */\r\n@media only screen and (max-width: 321px) {\r\n\ttable {\r\n\t\tfont-size: 1em;\r\n\t}\r\n\t\r\n\t.hide {\r\n\t\tdisplay: none;\r\n\t}\r\n\r\n\t#board {\r\n\t\twidth: 95%;\r\n\t\tmin-height: 304px;\r\n\t\tmargin-top: 2em;\r\n\t\tmargin-left: auto;\r\n\t\tmargin-right: auto;\r\n\t}\r\n\r\n\t.wall-top {\r\n\t\tborder-top: 2px solid #FFB000;\r\n\t\tz-index: 9;\r\n\t}\r\n\t\r\n\t.wall-bottom {\r\n\t\tborder-bottom: 2px solid #FFB000;\r\n\t\tz-index: 9;\r\n\t}\r\n\t\r\n\t.wall-right {\r\n\t\tborder-right: 2px solid #FFB000;\r\n\t\tz-index: 9;\r\n\t}\r\n\t\r\n\t.wall-left {\r\n\t\tborder-left: 2px solid #FFB000;\r\n\t\tz-index: 9;\r\n\t}\r\n\t\r\n\t.table { \r\n\t\twidth: 100vw;\r\n\t\tborder-spacing: 0; \r\n\t\tdisplay: flex;\r\n\t\tflex-direction: column;\r\n\t}\r\n\t.hall { \r\n\t\t/* border: 5px solid #3A638E;  */\r\n\t\t/* width: 4em; height: 4em;  */\r\n\t\tz-index: 5;\r\n\t}\t\r\n\t\r\n\ttd {\r\n\t\twidth: 33px;\r\n\t\theight: 33px;\r\n\t\tborder: 2px solid #4D618B;\r\n\t\tbackground: #7686A8; \r\n\t}\r\n\ttr {\r\n\t\theight: 33px;\r\n\t}\r\n\t\r\n\t.button {\r\n\t\t/* margin: 20px auto; */\r\n\t\tpadding: 5px 7px;\r\n\t}\r\n\t.controller-div {\r\n\t\tmargin: 1em auto;\r\n\t\twidth: 80%;\r\n\t\tpadding: 5px 7px;\r\n\t\tdisplay: flex;\r\n\t\tjustify-content: space-between;\r\n\t}\r\n\r\n\r\n\t.controller-btn {\r\n\t\tbackground: #B8C3D9;\r\n\t\tfont-family: 'Quantico', sans-serif;\r\n\t\t// letter-spacing: 0.05rem;\r\n\t\tcursor: pointer;\r\n\t\tborder: none;\r\n\t\tmargin: auto;\r\n\t\theight: 45px;\r\n\t\twidth: 100px;\r\n\t\ttransition: transform .3s ease-in-out;\r\n\t\tbox-shadow: \r\n\t\t\t0 1.4px 1.1px rgba(0, 0, 0, 0.034),\r\n\t\t\t0 3.4px 2.6px rgba(0, 0, 0, 0.048),\r\n\t\t\t0 7.7px 5px rgba(0, 0, 0, 0.06),\r\n\t\t\t0 11.15px 8.5px rgba(0, 0, 0, 0.086),\r\n\t\t\t0 50px 40px rgba(0, 0, 0, 0.12);\r\n\t}\r\n\r\n\t.controller-btn:hover {\r\n\t\ttransition: .3s ease-in-out;\r\n\t\tbackground: #7383A6;\r\n\t\tbox-shadow: \r\n\t\t\t0 2.8px 2.2px rgba(0, 0, 0, 0.034),\r\n\t\t\t0 6.7px 5.3px rgba(0, 0, 0, 0.048),\r\n\t\t\t0 15.5px 10px rgba(0, 0, 0, 0.06),\r\n\t\t\t0 22.3px 17.9px rgba(0, 0, 0, 0.086),\r\n\t\t\t0 100px 80px rgba(0, 0, 0, 0.12);\r\n\t}\t\r\n\t\r\n\t.player {\r\n\t\tfont-size: 1.3em;\r\n\t\tline-height: 36px;\r\n\t\ttext-align: center;\r\n\t}\r\n\t\r\n\t.highlight {\r\n\t\tbackground: #8DBB5E;\r\n\t}\r\n\t.highlight:hover{\r\n\t\tbackground: #BDE297;\r\n\t}\r\n\t\r\n\t.selectedWall {\r\n\t\tbackground: #B02D1F;\r\n\t}\r\n\t\r\n\t.player-turn {\r\n\t\tfont-family: 'Quantico', sans-serif;\r\n\t\tpadding: 10px;\r\n\t\ttext-align: center;\r\n\t}\r\n\t\r\n\t.wall-counter-div {\r\n\t\tmargin: 2em auto;\r\n\t\tdisplay: flex;\r\n\t}\r\n\t.wall-counter {\r\n\t\tfont-family: 'Quantico', sans-serif;\r\n\t\tfont-size: 1em;\r\n\t\tmax-width: 75px;\r\n\t\tmargin-left: 20px;\r\n\t\tmargin-right: 20px;\r\n\t}\r\n\t\r\n}\r\n\r\n/* medium phone */\r\n@media only screen and (max-width: 376px) and (min-width: 322px) {\r\n\ttable {\r\n\t\tfont-size: 1em;\r\n\t}\r\n\t\r\n\t.hide {\r\n\t\tdisplay: none;\r\n\t}\r\n\r\n\t#board {\r\n\t\twidth: 95%;\r\n\t\tmax-height: 3360px;\r\n\t\tmargin-top: 2em;\r\n\t\tmargin-left: auto;\r\n\t\tmargin-right: auto;\r\n\t}\r\n\r\n\t.wall-top {\r\n\t\tborder-top: 2px solid #FFB000;\r\n\t\tz-index: 9;\r\n\t}\r\n\t\r\n\t.wall-bottom {\r\n\t\tborder-bottom: 2px solid #FFB000;\r\n\t\tz-index: 9;\r\n\t}\r\n\t\r\n\t.wall-right {\r\n\t\tborder-right: 2px solid #FFB000;\r\n\t\tz-index: 9;\r\n\t}\r\n\t\r\n\t.wall-left {\r\n\t\tborder-left: 2px solid #FFB000;\r\n\t\tz-index: 9;\r\n\t}\r\n\t\r\n\t.table { \r\n\t\twidth: 100vw;\r\n\t\tborder-spacing: 0; \r\n\t\tdisplay: flex;\r\n\t\tflex-direction: column;\r\n\t}\r\n\t.hall { \r\n\t\t/* border: 5px solid #3A638E;  */\r\n\t\t/* width: 4em; height: 4em;  */\r\n\t\tz-index: 5;\r\n\t}\r\n\t.table .floor { \r\n\t\t/* background: brown;  */\r\n\t\t// margin: 1px;\r\n\t}\r\n\t\r\n\t\r\n\ttd {\r\n\t\twidth: 36px;\r\n\t\theight: 36px;\r\n\t\tborder: 2px solid #4D618B;\r\n\t\tbackground: #7686A8; \r\n\t}\r\n\ttr {\r\n\t\theight: 43px;\r\n\t}\r\n\t\r\n\t.button {\r\n\t\t/* margin: 20px auto; */\r\n\t\tpadding: 5px 7px;\r\n\t}\r\n\t.controller-div {\r\n\t\tmargin: 1em auto;\r\n\t\twidth: 80%;\r\n\t\tpadding: 5px 7px;\r\n\t\tdisplay: flex;\r\n\t\tjustify-content: space-between;\r\n\t}\r\n\r\n\r\n\t.controller-btn {\r\n\t\tbackground: #B8C3D9;\r\n\t\tfont-family: 'Quantico', sans-serif;\r\n\t\t// letter-spacing: 0.05rem;\r\n\t\tcursor: pointer;\r\n\t\tborder: none;\r\n\t\tmargin: auto;\r\n\t\theight: 45px;\r\n\t\twidth: 100px;\r\n\t\ttransition: transform .3s ease-in-out;\r\n\t\tbox-shadow: \r\n\t\t\t0 1.4px 1.1px rgba(0, 0, 0, 0.034),\r\n\t\t\t0 3.4px 2.6px rgba(0, 0, 0, 0.048),\r\n\t\t\t0 7.7px 5px rgba(0, 0, 0, 0.06),\r\n\t\t\t0 11.15px 8.5px rgba(0, 0, 0, 0.086),\r\n\t\t\t0 50px 40px rgba(0, 0, 0, 0.12);\r\n\t}\r\n\r\n\t.controller-btn:hover {\r\n\t\ttransition: .3s ease-in-out;\r\n\t\tbackground: #7383A6;\r\n\t\tbox-shadow: \r\n\t\t\t0 2.8px 2.2px rgba(0, 0, 0, 0.034),\r\n\t\t\t0 6.7px 5.3px rgba(0, 0, 0, 0.048),\r\n\t\t\t0 15.5px 10px rgba(0, 0, 0, 0.06),\r\n\t\t\t0 22.3px 17.9px rgba(0, 0, 0, 0.086),\r\n\t\t\t0 100px 80px rgba(0, 0, 0, 0.12);\r\n\t}\t\r\n\t\r\n\t.player {\r\n\t\tfont-size: 1.7em;\r\n\t\tline-height: 36px;\r\n\t\ttext-align: center;\r\n\t}\r\n\t\r\n\t.highlight {\r\n\t\tbackground: #8DBB5E;\r\n\t}\r\n\t.highlight:hover{\r\n\t\tbackground: #BDE297;\r\n\t}\r\n\t\r\n\t.selectedWall {\r\n\t\tbackground: #B02D1F;\r\n\t}\r\n\t\r\n\t.player-turn {\r\n\t\tfont-family: 'Quantico', sans-serif;\r\n\t\tpadding: 10px;\r\n\t\ttext-align: center;\r\n\t}\r\n\t\r\n\t.wall-counter-div {\r\n\t\tmargin: 2em auto;\r\n\t\tdisplay: flex;\r\n\t}\r\n\t.wall-counter {\r\n\t\tfont-family: 'Quantico', sans-serif;\r\n\t\tfont-size: 1em;\r\n\t\tmax-width: 75px;\r\n\t\tmargin-left: 20px;\r\n\t\tmargin-right: 20px;\r\n\t}\r\n\t\r\n}\r\n\r\n/* large phone */\r\n@media only screen and (max-width: 640px) and (min-width: 377px) {\r\n\ttable {\r\n\t\tfont-size: 1em;\r\n\t\t\r\n\t}\r\n\t\r\n\t.hide {\r\n\t\tdisplay: none;\r\n\t}\r\n\r\n\t#board {\r\n\t\twidth: 387px;\r\n\t\tmax-height: 387px;\r\n\t\tmargin-top: 2em;\r\n\t\tmargin-left: auto;\r\n\t\tmargin-right: auto;\r\n\t}\r\n\r\n\t.wall-top {\r\n\t\tborder-top: 2px solid #FFB000;\r\n\t\tz-index: 9;\r\n\t}\r\n\t\r\n\t.wall-bottom {\r\n\t\tborder-bottom: 2px solid #FFB000;\r\n\t\tz-index: 9;\r\n\t}\r\n\t\r\n\t.wall-right {\r\n\t\tborder-right: 2px solid #FFB000;\r\n\t\tz-index: 9;\r\n\t}\r\n\t\r\n\t.wall-left {\r\n\t\tborder-left: 2px solid #FFB000;\r\n\t\tz-index: 9;\r\n\t}\r\n\t\r\n\t.table { \r\n\t\twidth: 100vw;\r\n\t\tborder-spacing: 0; \r\n\t\tdisplay: flex;\r\n\t\tflex-direction: column;\r\n\t}\r\n\t.hall { \r\n\t\t/* border: 5px solid #3A638E;  */\r\n\t\t/* width: 4em; height: 4em;  */\r\n\t\tz-index: 5;\r\n\t}\r\n\t\r\n\ttd {\r\n\t\twidth: 39px;\r\n\t\theight: 39px;\r\n\t\tborder: 2px solid #4D618B;\r\n\t\tbackground: #7686A8; \r\n\t}\r\n\ttr {\r\n\t\theight: 43px;\r\n\t}\r\n\t\r\n\t.button {\r\n\t\t/* margin: 20px auto; */\r\n\t\tpadding: 5px 7px;\r\n\t}\r\n\t.controller-div {\r\n\t\tmargin: 1em auto;\r\n\t\twidth: 80%;\r\n\t\tpadding: 5px 7px;\r\n\t\tdisplay: flex;\r\n\t\tjustify-content: space-between;\r\n\t}\r\n\r\n\r\n\t.controller-btn {\r\n\t\tbackground: #B8C3D9;\r\n\t\tfont-family: 'Quantico', sans-serif;\r\n\t\t// letter-spacing: 0.05rem;\r\n\t\tcursor: pointer;\r\n\t\tborder: none;\r\n\t\tmargin: auto;\r\n\t\theight: 45px;\r\n\t\twidth: 100px;\r\n\t\ttransition: transform .3s ease-in-out;\r\n\t\tbox-shadow: \r\n\t\t\t0 1.4px 1.1px rgba(0, 0, 0, 0.034),\r\n\t\t\t0 3.4px 2.6px rgba(0, 0, 0, 0.048),\r\n\t\t\t0 7.7px 5px rgba(0, 0, 0, 0.06),\r\n\t\t\t0 11.15px 8.5px rgba(0, 0, 0, 0.086),\r\n\t\t\t0 50px 40px rgba(0, 0, 0, 0.12);\r\n\t}\r\n\r\n\t.controller-btn:hover {\r\n\t\ttransition: .3s ease-in-out;\r\n\t\tbackground: #7383A6;\r\n\t\tbox-shadow: \r\n\t\t\t0 2.8px 2.2px rgba(0, 0, 0, 0.034),\r\n\t\t\t0 6.7px 5.3px rgba(0, 0, 0, 0.048),\r\n\t\t\t0 15.5px 10px rgba(0, 0, 0, 0.06),\r\n\t\t\t0 22.3px 17.9px rgba(0, 0, 0, 0.086),\r\n\t\t\t0 100px 80px rgba(0, 0, 0, 0.12);\r\n\t}\r\n\t\r\n\t.player {\r\n\t\tfont-size: 1.7em;\r\n\t\tline-height: 43px;\r\n\t\ttext-align: center;\r\n\t}\r\n\t\r\n\t.highlight {\r\n\t\tbackground: #8DBB5E;\r\n\t}\r\n\t.highlight:hover{\r\n\t\tbackground: #BDE297;\r\n\t}\r\n\t\r\n\t.selectedWall {\r\n\t\tbackground: #B02D1F;\r\n\t}\r\n\t\r\n\t.player-turn {\r\n\t\tfont-family: 'Quantico', sans-serif;\r\n\t\tpadding: 13px;\r\n\t\ttext-align: center;\r\n\t}\r\n\t\r\n\t.wall-counter-div {\r\n\t\tmargin: 2em auto;\r\n\t\tdisplay: flex;\r\n\t}\r\n\t.wall-counter {\r\n\t\tfont-family: 'Quantico', sans-serif;\r\n\t\tfont-size: 1.25em;\r\n\t\tmax-width: 80px;\r\n\t\tmargin-left: 20px;\r\n\t\tmargin-right: 20px;\r\n\t}\r\n\t\r\n}\r\n\r\n/* tablet */\r\n@media only screen and (max-width: 768px) and (min-width: 641px) {\r\n\r\n\ttable {\r\n\t\tfont-size: 1em;\r\n\t}\r\n\t\r\n\t.hide {\r\n\t\tdisplay: none;\r\n\t}\r\n\r\n\t#board {\r\n\t\twidth: 495px;\r\n\t\theight: 495px;\r\n\t\tmargin-top: 2em;\r\n\t\tmargin-left: auto;\r\n\t\tmargin-right: auto;\r\n\t}\r\n\t\r\n\t.wall-top {\r\n\t\tborder-top: 3px solid #FFB000;\r\n\t\tz-index: 9;\r\n\t}\r\n\t\r\n\t.wall-bottom {\r\n\t\tborder-bottom: 3px solid #FFB000;\r\n\t\tz-index: 9;\r\n\t}\r\n\t\r\n\t.wall-right {\r\n\t\tborder-right: 3px solid #FFB000;\r\n\t\tz-index: 9;\r\n\t}\r\n\t\r\n\t.wall-left {\r\n\t\tborder-left: 3px solid #FFB000;\r\n\t\tz-index: 9;\r\n\t}\r\n\t\r\n\t.table { \r\n\t\tborder-spacing: 0; \r\n\t\tdisplay: flex;\r\n\t\tflex-direction: column;\r\n\t}\r\n\r\n\t.hall { \r\n\t\tz-index: 5;\r\n\t}\r\n\t\r\n\ttd {\r\n\t\twidth: 49px;\r\n\t\theight: 49px;\r\n\t\tborder: 3px solid #4D618B;\r\n\t\tbackground: #7686A8; \r\n\t}\r\n\ttr {\r\n\t\theight: 55px;\r\n\t}\r\n\t\r\n\t.button {\r\n\t\tpadding: 5px 7px;\r\n\t}\r\n\r\n\t.controller-div {\r\n\t\tmargin: 1em auto;\r\n\t\twidth: 80%;\r\n\t\tpadding: 5px 7px;\r\n\t\tdisplay: flex;\r\n\t\tjustify-content: space-between;\r\n\t}\r\n\t.controller-btn {\r\n\t\tbackground: #B8C3D9;\r\n\t\tfont-family: 'Quantico', sans-serif;\r\n\t\tcursor: pointer;\r\n\t\tborder: none;\r\n\t\tmargin: auto;\r\n\t\theight: 45px;\r\n\t\twidth: 100px;\r\n\t\ttransition: transform .3s ease-in-out;\r\n\t\tbox-shadow: \r\n\t\t\t0 1.4px 1.1px rgba(0, 0, 0, 0.034),\r\n\t\t\t0 3.4px 2.6px rgba(0, 0, 0, 0.048),\r\n\t\t\t0 7.7px 5px rgba(0, 0, 0, 0.06),\r\n\t\t\t0 11.15px 8.5px rgba(0, 0, 0, 0.086),\r\n\t\t\t0 50px 40px rgba(0, 0, 0, 0.12);\r\n\t}\r\n\t.controller-btn:hover {\r\n\t\ttransition: .3s ease-in-out;\r\n\t\tbackground: #7383A6;\r\n\t\tbox-shadow: \r\n\t\t\t0 2.8px 2.2px rgba(0, 0, 0, 0.034),\r\n\t\t\t0 6.7px 5.3px rgba(0, 0, 0, 0.048),\r\n\t\t\t0 15.5px 10px rgba(0, 0, 0, 0.06),\r\n\t\t\t0 22.3px 17.9px rgba(0, 0, 0, 0.086),\r\n\t\t\t0 100px 80px rgba(0, 0, 0, 0.12);\r\n\t}\r\n\t\r\n\t.player {\r\n\t\tfont-size: 1.75em;\r\n\t\tline-height: 55px;\r\n\t\ttext-align: center;\r\n\t}\r\n\t\r\n\t.highlight {\r\n\t\tbackground: #8DBB5E;\r\n\t}\r\n\t.highlight:hover{\r\n\t\tbackground: #BDE297;\r\n\t}\t\r\n\t.selectedWall {\r\n\t\tbackground: #B02D1F;\r\n\t}\t\r\n\r\n\t.player-turn {\r\n\t\tfont-family: 'Quantico', sans-serif;\r\n\t\tpadding: 20px;\r\n\t\tmargin: 0 auto;\r\n\t}\r\n\t\r\n\t.wall-counter-div {\r\n\t\tmargin-top: 30px;\r\n\t\tdisplay: flex;\r\n\t}\r\n\t.wall-counter {\r\n\t\tfont-family: 'Quantico', sans-serif;\r\n\t\tmargin: auto;\r\n\t}\r\n}\r\n\r\n/* laptop 1024px */\r\n@media only screen and (max-width: 1024px) and (min-width: 769px) {\r\n\r\n\ttable {\r\n\t\tfont-size: 1em;\r\n\t}\r\n\t\r\n\t.hide {\r\n\t\tdisplay: none;\r\n\t}\r\n\r\n\t#board {\r\n\t\twidth: 495px;\r\n\t\theight: 495px;\r\n\t\tmargin-top: 1em;\r\n\t\tmargin-left: auto;\r\n\t\tmargin-right: auto;\r\n\t}\r\n\t\r\n\t.wall-top {\r\n\t\tborder-top: 3px solid #FFB000;\r\n\t\tz-index: 9;\r\n\t}\r\n\t\r\n\t.wall-bottom {\r\n\t\tborder-bottom: 3px solid #FFB000;\r\n\t\tz-index: 9;\r\n\t}\r\n\t\r\n\t.wall-right {\r\n\t\tborder-right: 3px solid #FFB000;\r\n\t\tz-index: 9;\r\n\t}\r\n\t\r\n\t.wall-left {\r\n\t\tborder-left: 3px solid #FFB000;\r\n\t\tz-index: 9;\r\n\t}\r\n\t\r\n\t.table { \r\n\t\tborder-spacing: 0; \r\n\t\tdisplay: flex;\r\n\t\tflex-direction: column;\r\n\t}\r\n\r\n\t.hall { \r\n\t\tz-index: 5;\r\n\t}\r\n\t\r\n\ttd {\r\n\t\twidth: 49px;\r\n\t\theight: 49px;\r\n\t\tborder: 3px solid #4D618B;\r\n\t\tbackground: #7686A8; \r\n\t}\r\n\ttr {\r\n\t\theight: 55px;\r\n\t}\r\n\t\r\n\t.button {\r\n\t\tpadding: 5px 7px;\r\n\t}\r\n\r\n\t.controller-div {\r\n\t\tmargin: 1em auto;\r\n\t\twidth: 80%;\r\n\t\tpadding: 5px 7px;\r\n\t\tdisplay: flex;\r\n\t\tjustify-content: space-between;\r\n\t}\r\n\t.controller-btn {\r\n\t\tbackground: #B8C3D9;\r\n\t\tfont-family: 'Quantico', sans-serif;\r\n\t\tfont-size: 1em;\r\n\t\tcursor: pointer;\r\n\t\tborder: none;\r\n\t\tmargin: auto;\r\n\t\theight: 55px;\r\n\t\twidth: 133px;\r\n\t\ttransition: transform .3s ease-in-out;\r\n\t\tbox-shadow: \r\n\t\t\t0 1.4px 1.1px rgba(0, 0, 0, 0.034),\r\n\t\t\t0 3.4px 2.6px rgba(0, 0, 0, 0.048),\r\n\t\t\t0 7.7px 5px rgba(0, 0, 0, 0.06),\r\n\t\t\t0 11.15px 8.5px rgba(0, 0, 0, 0.086),\r\n\t\t\t0 50px 40px rgba(0, 0, 0, 0.12);\r\n\t}\r\n\t.controller-btn:hover {\r\n\t\ttransition: .3s ease-in-out;\r\n\t\tbackground: #7383A6;\r\n\t\tbox-shadow: \r\n\t\t\t0 2.8px 2.2px rgba(0, 0, 0, 0.034),\r\n\t\t\t0 6.7px 5.3px rgba(0, 0, 0, 0.048),\r\n\t\t\t0 15.5px 10px rgba(0, 0, 0, 0.06),\r\n\t\t\t0 22.3px 17.9px rgba(0, 0, 0, 0.086),\r\n\t\t\t0 100px 80px rgba(0, 0, 0, 0.12);\r\n\t}\r\n\t\r\n\t.player {\r\n\t\tfont-size: 1.75em;\r\n\t\tline-height: 55px;\r\n\t\ttext-align: center;\r\n\t}\r\n\t\r\n\t.highlight {\r\n\t\tbackground: #8DBB5E;\r\n\t}\r\n\t.highlight:hover{\r\n\t\tbackground: #BDE297;\r\n\t}\t\r\n\t.selectedWall {\r\n\t\tbackground: #B02D1F;\r\n\t}\t\r\n\r\n\t.player-turn {\r\n\t\tfont-family: 'Quantico', sans-serif;\r\n\t\tpadding: 20px;\r\n\t\tmargin: 0 auto;\r\n\t}\r\n\t\r\n\t.wall-counter-div {\r\n\t\tmargin-top: 5px;\r\n\t\tdisplay: flex;\r\n\t}\r\n\t.wall-counter {\r\n\t\tfont-family: 'Quantico', sans-serif;\r\n\t\tmargin: auto;\r\n\t}\r\n}\r\n\r\n/* large laptop */\r\n@media only screen and (max-width: 1440px) and (min-width: 1025px) {\r\n\r\n\ttable {\r\n\t\tfont-size: 1em;\r\n\t}\r\n\t\r\n\t.hide {\r\n\t\tdisplay: none;\r\n\t}\r\n\r\n\t#board {\r\n\t\twidth: 630px;\r\n\t\theight: 630px;\r\n\t\tmargin-top: 1em;\r\n\t\tmargin-left: auto;\r\n\t\tmargin-right: auto;\r\n\t}\r\n\t\r\n\t.wall-top {\r\n\t\tborder-top: 3px solid #FFB000;\r\n\t\tz-index: 9;\r\n\t}\r\n\t\r\n\t.wall-bottom {\r\n\t\tborder-bottom: 3px solid #FFB000;\r\n\t\tz-index: 9;\r\n\t}\r\n\t\r\n\t.wall-right {\r\n\t\tborder-right: 3px solid #FFB000;\r\n\t\tz-index: 9;\r\n\t}\r\n\t\r\n\t.wall-left {\r\n\t\tborder-left: 3px solid #FFB000;\r\n\t\tz-index: 9;\r\n\t}\r\n\t\r\n\t.table { \r\n\t\tborder-spacing: 0; \r\n\t\tdisplay: flex;\r\n\t\tflex-direction: column;\r\n\t}\r\n\r\n\t.hall { \r\n\t\tz-index: 5;\r\n\t}\r\n\t\r\n\ttd {\r\n\t\twidth: 60px;\r\n\t\theight: 60px;\r\n\t\tborder: 5px solid #4D618B;\r\n\t\tbackground: #7686A8; \r\n\t}\r\n\ttr {\r\n\t\theight: 70px;\r\n\t}\r\n\t\r\n\t.button {\r\n\t\tpadding: 5px 7px;\r\n\t}\r\n\r\n\t.controller-div {\r\n\t\tmargin: 1em auto;\r\n\t\twidth: 80%;\r\n\t\tpadding: 5px 7px;\r\n\t\tdisplay: flex;\r\n\t\tjustify-content: space-between;\r\n\t}\r\n\t.controller-div > p {\r\n\t\tfont-family: 'Quantico', sans-serif;\r\n\t\tfont-size: 1em;\r\n\t}\r\n\t.controller-btn {\r\n\t\tbackground: #B8C3D9;\r\n\t\tfont-family: 'Quantico', sans-serif;\r\n\t\tfont-size: 1em;\r\n\t\tcursor: pointer;\r\n\t\tborder: none;\r\n\t\tmargin: auto;\r\n\t\theight: 55px;\r\n\t\twidth: 133px;\r\n\t\ttransition: transform .3s ease-in-out;\r\n\t\tbox-shadow: \r\n\t\t\t0 1.4px 1.1px rgba(0, 0, 0, 0.034),\r\n\t\t\t0 3.4px 2.6px rgba(0, 0, 0, 0.048),\r\n\t\t\t0 7.7px 5px rgba(0, 0, 0, 0.06),\r\n\t\t\t0 11.15px 8.5px rgba(0, 0, 0, 0.086),\r\n\t\t\t0 50px 40px rgba(0, 0, 0, 0.12);\r\n\t}\r\n\t.controller-btn:hover {\r\n\t\ttransition: .3s ease-in-out;\r\n\t\tbackground: #7383A6;\r\n\t\tbox-shadow: \r\n\t\t\t0 2.8px 2.2px rgba(0, 0, 0, 0.034),\r\n\t\t\t0 6.7px 5.3px rgba(0, 0, 0, 0.048),\r\n\t\t\t0 15.5px 10px rgba(0, 0, 0, 0.06),\r\n\t\t\t0 22.3px 17.9px rgba(0, 0, 0, 0.086),\r\n\t\t\t0 100px 80px rgba(0, 0, 0, 0.12);\r\n\t}\r\n\t\r\n\t.player {\r\n\t\tfont-size: 1.75em;\r\n\t\tline-height: 55px;\r\n\t\ttext-align: center;\r\n\t}\r\n\t\r\n\t.highlight {\r\n\t\tbackground: #8DBB5E;\r\n\t}\r\n\t.highlight:hover{\r\n\t\tbackground: #BDE297;\r\n\t}\t\r\n\t.selectedWall {\r\n\t\tbackground: #B02D1F;\r\n\t}\t\r\n\r\n\t.player-turn {\r\n\t\tfont-family: 'Quantico', sans-serif;\r\n\t\tpadding: 20px;\r\n\t\tmargin: 0 auto;\r\n\t}\r\n\t\r\n\t.wall-counter-div {\r\n\t\tmargin-top: 5px;\r\n\t\tdisplay: flex;\r\n\t}\r\n\t.wall-counter {\r\n\t\tfont-family: 'Quantico', sans-serif;\r\n\t\tmargin: auto;\r\n\t}\r\n}\r\n\r\n/* 4k laptop */\r\n@media only screen and (min-width: 1441px) {\r\n\r\n\ttable {\r\n\t\tfont-size: 1em;\r\n\t}\r\n\t\r\n\t.hide {\r\n\t\tdisplay: none;\r\n\t}\r\n\r\n\t#board {\r\n\t\twidth: 720px;\r\n\t\theight: 720px;\r\n\t\tmargin-top: 3em;\r\n\t\tmargin-left: auto;\r\n\t\tmargin-right: auto;\r\n\t}\r\n\t\r\n\t.wall-top {\r\n\t\tborder-top: 5px solid #FFB000;\r\n\t\tz-index: 9;\r\n\t}\r\n\t\r\n\t.wall-bottom {\r\n\t\tborder-bottom: 5px solid #FFB000;\r\n\t\tz-index: 9;\r\n\t}\r\n\t\r\n\t.wall-right {\r\n\t\tborder-right: 5px solid #FFB000;\r\n\t\tz-index: 9;\r\n\t}\r\n\t\r\n\t.wall-left {\r\n\t\tborder-left: 5px solid #FFB000;\r\n\t\tz-index: 9;\r\n\t}\r\n\t\r\n\t.table { \r\n\t\tborder-spacing: 0; \r\n\t\tdisplay: flex;\r\n\t\tflex-direction: column;\r\n\t}\r\n\r\n\t.hall { \r\n\t\tz-index: 5;\r\n\t}\r\n\t\r\n\ttd {\r\n\t\twidth: 70px;\r\n\t\theight: 70px;\r\n\t\tborder: 5px solid #4D618B;\r\n\t\tbackground: #7686A8; \r\n\t}\r\n\ttr {\r\n\t\theight: 80px;\r\n\t}\r\n\t\r\n\t.button {\r\n\t\tpadding: 5px 7px;\r\n\t}\r\n\r\n\t.controller-div {\r\n\t\tmargin: 0 auto;\r\n\t\twidth: 80%;\r\n\t\tpadding: 5px 7px;\r\n\t\tdisplay: flex;\r\n\t\tjustify-content: space-between;\r\n\t}\r\n\t.controller-div > p {\r\n\t\tfont-family: 'Quantico', sans-serif;\r\n\t\tfont-size: 1.5em;\r\n\t}\r\n\t.controller-btn {\r\n\t\tbackground: #B8C3D9;\r\n\t\tfont-family: 'Quantico', sans-serif;\r\n\t\tfont-size: 1.5em;\r\n\t\tcursor: pointer;\r\n\t\tborder: none;\r\n\t\tmargin: 0 auto;\r\n\t\theight: 75px;\r\n\t\twidth: 200px;\r\n\t\ttransition: transform .3s ease-in-out;\r\n\t\tbox-shadow: \r\n\t\t\t0 1.4px 1.1px rgba(0, 0, 0, 0.034),\r\n\t\t\t0 3.4px 2.6px rgba(0, 0, 0, 0.048),\r\n\t\t\t0 7.7px 5px rgba(0, 0, 0, 0.06),\r\n\t\t\t0 11.15px 8.5px rgba(0, 0, 0, 0.086),\r\n\t\t\t0 50px 40px rgba(0, 0, 0, 0.12);\r\n\t}\r\n\t.controller-btn:hover {\r\n\t\ttransition: .3s ease-in-out;\r\n\t\tbackground: #7383A6;\r\n\t\tbox-shadow: \r\n\t\t\t0 2.8px 2.2px rgba(0, 0, 0, 0.034),\r\n\t\t\t0 6.7px 5.3px rgba(0, 0, 0, 0.048),\r\n\t\t\t0 15.5px 10px rgba(0, 0, 0, 0.06),\r\n\t\t\t0 22.3px 17.9px rgba(0, 0, 0, 0.086),\r\n\t\t\t0 100px 80px rgba(0, 0, 0, 0.12);\r\n\t}\r\n\t\r\n\t.player {\r\n\t\tfont-size: 3em;\r\n\t\tline-height: 80px;\r\n\t\ttext-align: center;\r\n\t}\r\n\t\r\n\t.highlight {\r\n\t\tbackground: #8DBB5E;\r\n\t}\r\n\t.highlight:hover{\r\n\t\tbackground: #BDE297;\r\n\t}\t\r\n\t.selectedWall {\r\n\t\tbackground: #B02D1F;\r\n\t}\t\r\n\r\n\t.player-turn {\r\n\t\tfont-family: 'Quantico', sans-serif;\r\n\t\tfont-size: 2em;\r\n\t\tpadding: 20px;\r\n\t\tmargin: 0 auto;\r\n\t}\r\n\t\r\n\t.wall-counter-div {\r\n\t\tmargin-top: 2em;\r\n\t\tdisplay: flex;\r\n\t}\r\n\t.wall-counter {\r\n\t\tfont-family: 'Quantico', sans-serif;\r\n\t\tfont-size: 2em;\r\n\t\tmargin: auto;\r\n\t}\r\n}\r\n\r\n\r\n#restart-div {\r\n\tposition: fixed;\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\tfont-size: 2em;\r\n\tpadding: 15px;\r\n\tmargin: 200px;\r\n\tbackground-color: white;\r\n\twidth: 400px;\r\n\theight: 200px;\r\n}\r\n\r\n#restart-div h1 {\r\n\tmargin: 10px auto;\r\n}\r\n\r\n#restart-div button {\r\n\tmargin: auto;\r\n\twidth: 30%;\r\n\theight: 15%;\r\n}\r\n\r\n.buttonTest {\r\n\twidth: 300px;\r\n\theight: 100px;\r\n}\r\n\r\n#roomForm {\r\n\tbackground: rgba(0, 0, 0, 0.15);\r\n\tmargin: auto;\r\n}\r\n\r\n#formDiv {\r\n\tmargin: 30% auto;\r\n}\r\n\r\n#roomInput {\r\n\tborder: none; \r\n\tpadding: 0 1rem;\r\n\tflex-grow: 1;\r\n\tborder-radius: 2rem;\r\n\tmargin: 0.25rem;\r\n}\r\n\r\n#roomInput:focus {\r\n\toutline: none;\r\n}\r\n\r\n#roomButton {\r\n\tbackground: #333;\r\n\tborder: none;\r\n\tpadding: 0 1rem; \r\n\tmargin: 0.25rem; \r\n\tborder-radius: 3px; \r\n\toutline: none; \r\n\tcolor: #fff;\r\n}\r\n#roomButton:hover {\r\n\tbackground: gray;\r\n}\r\n\r\n#lobby-div {\r\n\t\r\n\twidth: 80%;\r\n}\r\n#lobby-div > h1 {\r\n\tbackground: #fff;\r\n\ttext-align: center;\r\n}\r\n#lobby-form { \r\n\tbackground: rgba(0, 0, 0, 0.15); \r\n\tpadding: 0.25rem; \r\n\tposition: fixed; \r\n\tbottom: 0; \r\n\tleft: 0; \r\n\tright: 0; \r\n\tdisplay: flex; \r\n\theight: 3rem; \r\n\tbox-sizing: border-box; \r\n\tbackdrop-filter: blur(10px); \r\n}\r\n#lobby-input { \r\n\tborder: none; \r\n\tpadding: 0 1rem; \r\n\tflex-grow: 1; \r\n\tborder-radius: 2rem; \r\n\tmargin: 0.25rem; \r\n}\r\n#lobby-input:focus { outline: none; }\r\n#lobby-form > button { \r\n\tbackground: #333; \r\n\tborder: none; \r\n\tpadding: 0 1rem; \r\n\tmargin: 0.25rem; \r\n\tborder-radius: 3px; \r\n\toutline: none; \r\n\tcolor: #fff; \r\n}\r\n#lobby-form > button:hover {\r\n\tbackground: gray;\r\n}\r\n\r\n#lobby-messages { \r\n\tbackground: #fff; \r\n\tlist-style-type: none; \r\n\tmargin: 100px 0; \r\n\tpadding: 0; \r\n\twidth: 100%;\r\n\theight: 100%;\r\n}\r\n#lobby-messages > li { padding: 0.5rem 1rem; }\r\n#lobby-messages > li:nth-child(odd) { background: #efefef; }\r\n#lobby-start-game {\r\n\twidth: 100px;\r\n\theight: 50px;\r\n}\r\n\r\n/* splash div */\r\n#splash-div {\r\n\tbackground: #A6B1C9;\r\n\twidth: 21em;\r\n\theight: 21em;\r\n\tmargin: 15em auto auto auto;\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\tbox-shadow: \r\n\t\t0 2.8px 2.2px rgba(0, 0, 0, 0.034),\r\n\t\t0 6.7px 5.3px rgba(0, 0, 0, 0.048),\r\n\t\t0 15.5px 10px rgba(0, 0, 0, 0.06),\r\n\t\t0 22.3px 17.9px rgba(0, 0, 0, 0.086),\r\n\t\t0 100px 80px rgba(0, 0, 0, 0.12);\r\n}\r\n\r\n.btn {\r\n\tbackground: #B8C3D9;\r\n\tborder: none;\r\n\tmargin: auto;\r\n\theight: 5em;\r\n\twidth: 13em;\r\n\ttransition: transform .3s ease-in-out;\r\n\tbox-shadow: \r\n\t\t0 1.4px 1.1px rgba(0, 0, 0, 0.034),\r\n\t\t0 3.4px 2.6px rgba(0, 0, 0, 0.048),\r\n\t\t0 7.7px 5px rgba(0, 0, 0, 0.06),\r\n\t\t0 11.15px 8.5px rgba(0, 0, 0, 0.086),\r\n\t\t0 50px 40px rgba(0, 0, 0, 0.12);\r\n}\r\n\r\n.btn:hover {\r\n\ttransition: .3s ease-in-out;\r\n\ttransform: scale(1.1);\r\n\tbackground: #7383A6;\r\n\tbox-shadow: \r\n\t\t0 2.8px 2.2px rgba(0, 0, 0, 0.034),\r\n\t\t0 6.7px 5.3px rgba(0, 0, 0, 0.048),\r\n\t\t0 15.5px 10px rgba(0, 0, 0, 0.06),\r\n\t\t0 22.3px 17.9px rgba(0, 0, 0, 0.086),\r\n\t\t0 100px 80px rgba(0, 0, 0, 0.12);\r\n}\r\n\r\n/* form div */\r\n#form-div {\r\n\tbackground: #A6B1C9;\r\n\twidth: 21em;\r\n\theight: 21em;\r\n\tmargin: 15em auto auto auto;\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\tbox-shadow: \r\n\t\t0 2.8px 2.2px rgba(0, 0, 0, 0.034),\r\n\t\t0 6.7px 5.3px rgba(0, 0, 0, 0.048),\r\n\t\t0 15.5px 10px rgba(0, 0, 0, 0.06),\r\n\t\t0 22.3px 17.9px rgba(0, 0, 0, 0.086),\r\n\t\t0 100px 80px rgba(0, 0, 0, 0.12);\r\n}\r\n\r\n#room-form {\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n}\r\n\r\n#room-input {\r\n\ttext-align: center;\r\n\twidth: 50%;\r\n\tmargin: auto;\r\n\tline-height: 1.5;\r\n  \tfont: 700 1.2rem 'Roboto Slab', sans-serif;\r\n  \tpadding: 1em 2em;\r\n  \tletter-spacing: 0.05rem;\r\n}\r\n\r\n#room-button {\r\n \tmargin: auto;\r\n}\r\n\r\n/* lobby rooms list */\r\n#lobby-rooms-list-div {\r\n\tbackground: #A6B1C9;\r\n\twidth: 21em;\r\n\tmargin: 15em auto auto auto;\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\tjustify-content: center;\r\n\talign-items: center;\r\n\tbox-shadow: \r\n\t\t0 2.8px 2.2px rgba(0, 0, 0, 0.034),\r\n\t\t0 6.7px 5.3px rgba(0, 0, 0, 0.048),\r\n\t\t0 15.5px 10px rgba(0, 0, 0, 0.06),\r\n\t\t0 22.3px 17.9px rgba(0, 0, 0, 0.086),\r\n\t\t0 100px 80px rgba(0, 0, 0, 0.12);\r\n\r\n}\r\n\r\n#lobby-rooms-list-div > ul > li > button {\r\n\tmargin: 1.3em;\r\n}\r\n\r\n\r\n\r\n\r\n\r\n@mixin btn-border-drawing($color: #FFEECD, $hover: black, $width: 2px, $vertical: top, $horizontal: left, $duration: 0.25s) {\r\n//   box-shadow: inset 0 0 0 $width $color;\r\n  color: $color;\r\n  transition: color $duration $duration/3;\r\n  position: relative;\r\n  \r\n  &::before,\r\n  &::after {\r\n    border: 0 solid transparent;\r\n    box-sizing: border-box;\r\n    content: '';\r\n    pointer-events: none;\r\n    position: absolute;\r\n    width: 0; height: 0;\r\n    \r\n    #{$vertical}: 0; \r\n    #{$horizontal}: 0;\r\n  }\r\n\r\n  &::before {\r\n    $h-side: if($horizontal == 'left', 'right', 'left');\r\n    \r\n    border-#{$vertical}-width: $width;\r\n    border-#{$h-side}-width: $width;\r\n  }\r\n  \r\n  &::after {\r\n    $v-side: if($vertical == 'top', 'bottom', 'top');\r\n    \r\n    border-#{$v-side}-width: $width;\r\n    border-#{$horizontal}-width: $width;\r\n  }\r\n  \r\n  &:hover {\r\n    color: $hover;\r\n    \r\n    &::before,\r\n    &::after {\r\n      border-color: $hover;\r\n      transition: border-color 0s, width $duration, height $duration;\r\n      width: 100%;\r\n      height: 100%;\r\n    }\r\n    \r\n    &::before { transition-delay: 0s, 0s, $duration; }\r\n    \r\n    &::after { transition-delay: 0s, $duration, 0s; }\r\n  }\r\n}\r\n\r\n.btn {\r\n  @include btn-border-drawing(#403174, #B1A9CD, 4px, bottom, right);\r\n}\r\n.controller-btn {\r\n  @include btn-border-drawing(#403174, #B1A9CD, 4px, bottom, right);\r\n}\r\n\r\n//=== Button styling, semi-ignore\r\n.btn {\r\n//   border: none;\r\n  cursor: pointer;\r\n  line-height: 1.5;\r\n  font: 700 1.2rem 'Roboto Slab', sans-serif;\r\n  padding: 1em 2em;\r\n  letter-spacing: 0.05rem;\r\n  \r\n//   &:focus { outline: 2px dotted #4D618C; }\r\n}\r\n\r\n#winner-div {\r\n\tbackground: #A6B1C9;\r\n\twidth: 30vw;\r\n\theight: 30vw;\r\n\tmargin: auto;\r\n\tposition: relative;\r\n}\r\n#winner-message {\r\n\tcolor: #403174;\r\n\tfont-family: 'Quantico', sans-serif;\r\n\tfont-size: 3em;\r\n\tfont-weight: bold;\r\n\ttext-align: center;\r\n\tposition: absolute;\r\n\tbottom: 50%;\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


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
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
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

"use strict";


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

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/debug/node_modules/ms/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/debug/node_modules/ms/index.js ***!
  \*****************************************************/
/***/ ((module) => {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),

/***/ "./node_modules/debug/src/browser.js":
/*!*******************************************!*\
  !*** ./node_modules/debug/src/browser.js ***!
  \*******************************************/
/***/ ((module, exports, __webpack_require__) => {

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (() => {
	let warned = false;

	return () => {
		if (!warned) {
			warned = true;
			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
		}
	};
})();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */
exports.log = console.debug || console.log || (() => {});

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = __webpack_require__(/*! ./common */ "./node_modules/debug/src/common.js")(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};


/***/ }),

/***/ "./node_modules/debug/src/common.js":
/*!******************************************!*\
  !*** ./node_modules/debug/src/common.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = __webpack_require__(/*! ms */ "./node_modules/debug/node_modules/ms/index.js");
	createDebug.destroy = destroy;

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;
		let enableOverride = null;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return '%';
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.useColors = createDebug.useColors();
		debug.color = createDebug.selectColor(namespace);
		debug.extend = extend;
		debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

		Object.defineProperty(debug, 'enabled', {
			enumerable: true,
			configurable: false,
			get: () => enableOverride === null ? createDebug.enabled(namespace) : enableOverride,
			set: v => {
				enableOverride = v;
			}
		});

		// Env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		return debug;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	/**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/
	function destroy() {
		console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;


/***/ }),

/***/ "./node_modules/engine.io-client/lib/globalThis.browser.js":
/*!*****************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/globalThis.browser.js ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = (() => {
  if (typeof self !== "undefined") {
    return self;
  } else if (typeof window !== "undefined") {
    return window;
  } else {
    return Function("return this")();
  }
})();


/***/ }),

/***/ "./node_modules/engine.io-client/lib/index.js":
/*!****************************************************!*\
  !*** ./node_modules/engine.io-client/lib/index.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Socket = __webpack_require__(/*! ./socket */ "./node_modules/engine.io-client/lib/socket.js");

module.exports = (uri, opts) => new Socket(uri, opts);

/**
 * Expose deps for legacy compatibility
 * and standalone browser access.
 */

module.exports.Socket = Socket;
module.exports.protocol = Socket.protocol; // this is an int
module.exports.Transport = __webpack_require__(/*! ./transport */ "./node_modules/engine.io-client/lib/transport.js");
module.exports.transports = __webpack_require__(/*! ./transports/index */ "./node_modules/engine.io-client/lib/transports/index.js");
module.exports.parser = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/lib/index.js");


/***/ }),

/***/ "./node_modules/engine.io-client/lib/socket.js":
/*!*****************************************************!*\
  !*** ./node_modules/engine.io-client/lib/socket.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const transports = __webpack_require__(/*! ./transports/index */ "./node_modules/engine.io-client/lib/transports/index.js");
const Emitter = __webpack_require__(/*! component-emitter */ "./node_modules/component-emitter/index.js");
const debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("engine.io-client:socket");
const parser = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/lib/index.js");
const parseuri = __webpack_require__(/*! parseuri */ "./node_modules/parseuri/index.js");
const parseqs = __webpack_require__(/*! parseqs */ "./node_modules/parseqs/index.js");

class Socket extends Emitter {
  /**
   * Socket constructor.
   *
   * @param {String|Object} uri or options
   * @param {Object} options
   * @api public
   */
  constructor(uri, opts = {}) {
    super();

    if (uri && "object" === typeof uri) {
      opts = uri;
      uri = null;
    }

    if (uri) {
      uri = parseuri(uri);
      opts.hostname = uri.host;
      opts.secure = uri.protocol === "https" || uri.protocol === "wss";
      opts.port = uri.port;
      if (uri.query) opts.query = uri.query;
    } else if (opts.host) {
      opts.hostname = parseuri(opts.host).host;
    }

    this.secure =
      null != opts.secure
        ? opts.secure
        : typeof location !== "undefined" && "https:" === location.protocol;

    if (opts.hostname && !opts.port) {
      // if no port is specified manually, use the protocol default
      opts.port = this.secure ? "443" : "80";
    }

    this.hostname =
      opts.hostname ||
      (typeof location !== "undefined" ? location.hostname : "localhost");
    this.port =
      opts.port ||
      (typeof location !== "undefined" && location.port
        ? location.port
        : this.secure
        ? 443
        : 80);

    this.transports = opts.transports || ["polling", "websocket"];
    this.readyState = "";
    this.writeBuffer = [];
    this.prevBufferLen = 0;

    this.opts = Object.assign(
      {
        path: "/engine.io",
        agent: false,
        withCredentials: false,
        upgrade: true,
        jsonp: true,
        timestampParam: "t",
        rememberUpgrade: false,
        rejectUnauthorized: true,
        perMessageDeflate: {
          threshold: 1024
        },
        transportOptions: {}
      },
      opts
    );

    this.opts.path = this.opts.path.replace(/\/$/, "") + "/";

    if (typeof this.opts.query === "string") {
      this.opts.query = parseqs.decode(this.opts.query);
    }

    // set on handshake
    this.id = null;
    this.upgrades = null;
    this.pingInterval = null;
    this.pingTimeout = null;

    // set on heartbeat
    this.pingTimeoutTimer = null;

    if (typeof addEventListener === "function") {
      addEventListener(
        "beforeunload",
        () => {
          if (this.transport) {
            // silently close the transport
            this.transport.removeAllListeners();
            this.transport.close();
          }
        },
        false
      );
    }

    this.open();
  }

  /**
   * Creates transport of the given type.
   *
   * @param {String} transport name
   * @return {Transport}
   * @api private
   */
  createTransport(name) {
    debug('creating transport "%s"', name);
    const query = clone(this.opts.query);

    // append engine.io protocol identifier
    query.EIO = parser.protocol;

    // transport name
    query.transport = name;

    // session id if we already have one
    if (this.id) query.sid = this.id;

    const opts = Object.assign(
      {},
      this.opts.transportOptions[name],
      this.opts,
      {
        query,
        socket: this,
        hostname: this.hostname,
        secure: this.secure,
        port: this.port
      }
    );

    debug("options: %j", opts);

    return new transports[name](opts);
  }

  /**
   * Initializes transport to use and starts probe.
   *
   * @api private
   */
  open() {
    let transport;
    if (
      this.opts.rememberUpgrade &&
      Socket.priorWebsocketSuccess &&
      this.transports.indexOf("websocket") !== -1
    ) {
      transport = "websocket";
    } else if (0 === this.transports.length) {
      // Emit error on next tick so it can be listened to
      const self = this;
      setTimeout(function() {
        self.emit("error", "No transports available");
      }, 0);
      return;
    } else {
      transport = this.transports[0];
    }
    this.readyState = "opening";

    // Retry with the next transport if the transport is disabled (jsonp: false)
    try {
      transport = this.createTransport(transport);
    } catch (e) {
      debug("error while creating transport: %s", e);
      this.transports.shift();
      this.open();
      return;
    }

    transport.open();
    this.setTransport(transport);
  }

  /**
   * Sets the current transport. Disables the existing one (if any).
   *
   * @api private
   */
  setTransport(transport) {
    debug("setting transport %s", transport.name);
    const self = this;

    if (this.transport) {
      debug("clearing existing transport %s", this.transport.name);
      this.transport.removeAllListeners();
    }

    // set up transport
    this.transport = transport;

    // set up transport listeners
    transport
      .on("drain", function() {
        self.onDrain();
      })
      .on("packet", function(packet) {
        self.onPacket(packet);
      })
      .on("error", function(e) {
        self.onError(e);
      })
      .on("close", function() {
        self.onClose("transport close");
      });
  }

  /**
   * Probes a transport.
   *
   * @param {String} transport name
   * @api private
   */
  probe(name) {
    debug('probing transport "%s"', name);
    let transport = this.createTransport(name, { probe: 1 });
    let failed = false;
    const self = this;

    Socket.priorWebsocketSuccess = false;

    function onTransportOpen() {
      if (self.onlyBinaryUpgrades) {
        const upgradeLosesBinary =
          !this.supportsBinary && self.transport.supportsBinary;
        failed = failed || upgradeLosesBinary;
      }
      if (failed) return;

      debug('probe transport "%s" opened', name);
      transport.send([{ type: "ping", data: "probe" }]);
      transport.once("packet", function(msg) {
        if (failed) return;
        if ("pong" === msg.type && "probe" === msg.data) {
          debug('probe transport "%s" pong', name);
          self.upgrading = true;
          self.emit("upgrading", transport);
          if (!transport) return;
          Socket.priorWebsocketSuccess = "websocket" === transport.name;

          debug('pausing current transport "%s"', self.transport.name);
          self.transport.pause(function() {
            if (failed) return;
            if ("closed" === self.readyState) return;
            debug("changing transport and sending upgrade packet");

            cleanup();

            self.setTransport(transport);
            transport.send([{ type: "upgrade" }]);
            self.emit("upgrade", transport);
            transport = null;
            self.upgrading = false;
            self.flush();
          });
        } else {
          debug('probe transport "%s" failed', name);
          const err = new Error("probe error");
          err.transport = transport.name;
          self.emit("upgradeError", err);
        }
      });
    }

    function freezeTransport() {
      if (failed) return;

      // Any callback called by transport should be ignored since now
      failed = true;

      cleanup();

      transport.close();
      transport = null;
    }

    // Handle any error that happens while probing
    function onerror(err) {
      const error = new Error("probe error: " + err);
      error.transport = transport.name;

      freezeTransport();

      debug('probe transport "%s" failed because of error: %s', name, err);

      self.emit("upgradeError", error);
    }

    function onTransportClose() {
      onerror("transport closed");
    }

    // When the socket is closed while we're probing
    function onclose() {
      onerror("socket closed");
    }

    // When the socket is upgraded while we're probing
    function onupgrade(to) {
      if (transport && to.name !== transport.name) {
        debug('"%s" works - aborting "%s"', to.name, transport.name);
        freezeTransport();
      }
    }

    // Remove all listeners on the transport and on self
    function cleanup() {
      transport.removeListener("open", onTransportOpen);
      transport.removeListener("error", onerror);
      transport.removeListener("close", onTransportClose);
      self.removeListener("close", onclose);
      self.removeListener("upgrading", onupgrade);
    }

    transport.once("open", onTransportOpen);
    transport.once("error", onerror);
    transport.once("close", onTransportClose);

    this.once("close", onclose);
    this.once("upgrading", onupgrade);

    transport.open();
  }

  /**
   * Called when connection is deemed open.
   *
   * @api public
   */
  onOpen() {
    debug("socket open");
    this.readyState = "open";
    Socket.priorWebsocketSuccess = "websocket" === this.transport.name;
    this.emit("open");
    this.flush();

    // we check for `readyState` in case an `open`
    // listener already closed the socket
    if (
      "open" === this.readyState &&
      this.opts.upgrade &&
      this.transport.pause
    ) {
      debug("starting upgrade probes");
      let i = 0;
      const l = this.upgrades.length;
      for (; i < l; i++) {
        this.probe(this.upgrades[i]);
      }
    }
  }

  /**
   * Handles a packet.
   *
   * @api private
   */
  onPacket(packet) {
    if (
      "opening" === this.readyState ||
      "open" === this.readyState ||
      "closing" === this.readyState
    ) {
      debug('socket receive: type "%s", data "%s"', packet.type, packet.data);

      this.emit("packet", packet);

      // Socket is live - any packet counts
      this.emit("heartbeat");

      switch (packet.type) {
        case "open":
          this.onHandshake(JSON.parse(packet.data));
          break;

        case "ping":
          this.resetPingTimeout();
          this.sendPacket("pong");
          this.emit("pong");
          break;

        case "error":
          const err = new Error("server error");
          err.code = packet.data;
          this.onError(err);
          break;

        case "message":
          this.emit("data", packet.data);
          this.emit("message", packet.data);
          break;
      }
    } else {
      debug('packet received with socket readyState "%s"', this.readyState);
    }
  }

  /**
   * Called upon handshake completion.
   *
   * @param {Object} handshake obj
   * @api private
   */
  onHandshake(data) {
    this.emit("handshake", data);
    this.id = data.sid;
    this.transport.query.sid = data.sid;
    this.upgrades = this.filterUpgrades(data.upgrades);
    this.pingInterval = data.pingInterval;
    this.pingTimeout = data.pingTimeout;
    this.onOpen();
    // In case open handler closes socket
    if ("closed" === this.readyState) return;
    this.resetPingTimeout();
  }

  /**
   * Sets and resets ping timeout timer based on server pings.
   *
   * @api private
   */
  resetPingTimeout() {
    clearTimeout(this.pingTimeoutTimer);
    this.pingTimeoutTimer = setTimeout(() => {
      this.onClose("ping timeout");
    }, this.pingInterval + this.pingTimeout);
  }

  /**
   * Called on `drain` event
   *
   * @api private
   */
  onDrain() {
    this.writeBuffer.splice(0, this.prevBufferLen);

    // setting prevBufferLen = 0 is very important
    // for example, when upgrading, upgrade packet is sent over,
    // and a nonzero prevBufferLen could cause problems on `drain`
    this.prevBufferLen = 0;

    if (0 === this.writeBuffer.length) {
      this.emit("drain");
    } else {
      this.flush();
    }
  }

  /**
   * Flush write buffers.
   *
   * @api private
   */
  flush() {
    if (
      "closed" !== this.readyState &&
      this.transport.writable &&
      !this.upgrading &&
      this.writeBuffer.length
    ) {
      debug("flushing %d packets in socket", this.writeBuffer.length);
      this.transport.send(this.writeBuffer);
      // keep track of current length of writeBuffer
      // splice writeBuffer and callbackBuffer on `drain`
      this.prevBufferLen = this.writeBuffer.length;
      this.emit("flush");
    }
  }

  /**
   * Sends a message.
   *
   * @param {String} message.
   * @param {Function} callback function.
   * @param {Object} options.
   * @return {Socket} for chaining.
   * @api public
   */
  write(msg, options, fn) {
    this.sendPacket("message", msg, options, fn);
    return this;
  }

  send(msg, options, fn) {
    this.sendPacket("message", msg, options, fn);
    return this;
  }

  /**
   * Sends a packet.
   *
   * @param {String} packet type.
   * @param {String} data.
   * @param {Object} options.
   * @param {Function} callback function.
   * @api private
   */
  sendPacket(type, data, options, fn) {
    if ("function" === typeof data) {
      fn = data;
      data = undefined;
    }

    if ("function" === typeof options) {
      fn = options;
      options = null;
    }

    if ("closing" === this.readyState || "closed" === this.readyState) {
      return;
    }

    options = options || {};
    options.compress = false !== options.compress;

    const packet = {
      type: type,
      data: data,
      options: options
    };
    this.emit("packetCreate", packet);
    this.writeBuffer.push(packet);
    if (fn) this.once("flush", fn);
    this.flush();
  }

  /**
   * Closes the connection.
   *
   * @api private
   */
  close() {
    const self = this;

    if ("opening" === this.readyState || "open" === this.readyState) {
      this.readyState = "closing";

      if (this.writeBuffer.length) {
        this.once("drain", function() {
          if (this.upgrading) {
            waitForUpgrade();
          } else {
            close();
          }
        });
      } else if (this.upgrading) {
        waitForUpgrade();
      } else {
        close();
      }
    }

    function close() {
      self.onClose("forced close");
      debug("socket closing - telling transport to close");
      self.transport.close();
    }

    function cleanupAndClose() {
      self.removeListener("upgrade", cleanupAndClose);
      self.removeListener("upgradeError", cleanupAndClose);
      close();
    }

    function waitForUpgrade() {
      // wait for upgrade to finish since we can't send packets while pausing a transport
      self.once("upgrade", cleanupAndClose);
      self.once("upgradeError", cleanupAndClose);
    }

    return this;
  }

  /**
   * Called upon transport error
   *
   * @api private
   */
  onError(err) {
    debug("socket error %j", err);
    Socket.priorWebsocketSuccess = false;
    this.emit("error", err);
    this.onClose("transport error", err);
  }

  /**
   * Called upon transport close.
   *
   * @api private
   */
  onClose(reason, desc) {
    if (
      "opening" === this.readyState ||
      "open" === this.readyState ||
      "closing" === this.readyState
    ) {
      debug('socket close with reason: "%s"', reason);
      const self = this;

      // clear timers
      clearTimeout(this.pingIntervalTimer);
      clearTimeout(this.pingTimeoutTimer);

      // stop event from firing again for transport
      this.transport.removeAllListeners("close");

      // ensure transport won't stay open
      this.transport.close();

      // ignore further transport communication
      this.transport.removeAllListeners();

      // set ready state
      this.readyState = "closed";

      // clear session id
      this.id = null;

      // emit close event
      this.emit("close", reason, desc);

      // clean buffers after, so users can still
      // grab the buffers on `close` event
      self.writeBuffer = [];
      self.prevBufferLen = 0;
    }
  }

  /**
   * Filters upgrades, returning only those matching client transports.
   *
   * @param {Array} server upgrades
   * @api private
   *
   */
  filterUpgrades(upgrades) {
    const filteredUpgrades = [];
    let i = 0;
    const j = upgrades.length;
    for (; i < j; i++) {
      if (~this.transports.indexOf(upgrades[i]))
        filteredUpgrades.push(upgrades[i]);
    }
    return filteredUpgrades;
  }
}

Socket.priorWebsocketSuccess = false;

/**
 * Protocol version.
 *
 * @api public
 */

Socket.protocol = parser.protocol; // this is an int

function clone(obj) {
  const o = {};
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = obj[i];
    }
  }
  return o;
}

module.exports = Socket;


/***/ }),

/***/ "./node_modules/engine.io-client/lib/transport.js":
/*!********************************************************!*\
  !*** ./node_modules/engine.io-client/lib/transport.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const parser = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/lib/index.js");
const Emitter = __webpack_require__(/*! component-emitter */ "./node_modules/component-emitter/index.js");

class Transport extends Emitter {
  /**
   * Transport abstract constructor.
   *
   * @param {Object} options.
   * @api private
   */
  constructor(opts) {
    super();

    this.opts = opts;
    this.query = opts.query;
    this.readyState = "";
    this.socket = opts.socket;
  }

  /**
   * Emits an error.
   *
   * @param {String} str
   * @return {Transport} for chaining
   * @api public
   */
  onError(msg, desc) {
    const err = new Error(msg);
    err.type = "TransportError";
    err.description = desc;
    this.emit("error", err);
    return this;
  }

  /**
   * Opens the transport.
   *
   * @api public
   */
  open() {
    if ("closed" === this.readyState || "" === this.readyState) {
      this.readyState = "opening";
      this.doOpen();
    }

    return this;
  }

  /**
   * Closes the transport.
   *
   * @api private
   */
  close() {
    if ("opening" === this.readyState || "open" === this.readyState) {
      this.doClose();
      this.onClose();
    }

    return this;
  }

  /**
   * Sends multiple packets.
   *
   * @param {Array} packets
   * @api private
   */
  send(packets) {
    if ("open" === this.readyState) {
      this.write(packets);
    } else {
      throw new Error("Transport not open");
    }
  }

  /**
   * Called upon open
   *
   * @api private
   */
  onOpen() {
    this.readyState = "open";
    this.writable = true;
    this.emit("open");
  }

  /**
   * Called with data.
   *
   * @param {String} data
   * @api private
   */
  onData(data) {
    const packet = parser.decodePacket(data, this.socket.binaryType);
    this.onPacket(packet);
  }

  /**
   * Called with a decoded packet.
   */
  onPacket(packet) {
    this.emit("packet", packet);
  }

  /**
   * Called upon close.
   *
   * @api private
   */
  onClose() {
    this.readyState = "closed";
    this.emit("close");
  }
}

module.exports = Transport;


/***/ }),

/***/ "./node_modules/engine.io-client/lib/transports/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/transports/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const XMLHttpRequest = __webpack_require__(/*! xmlhttprequest-ssl */ "./node_modules/engine.io-client/lib/xmlhttprequest.js");
const XHR = __webpack_require__(/*! ./polling-xhr */ "./node_modules/engine.io-client/lib/transports/polling-xhr.js");
const JSONP = __webpack_require__(/*! ./polling-jsonp */ "./node_modules/engine.io-client/lib/transports/polling-jsonp.js");
const websocket = __webpack_require__(/*! ./websocket */ "./node_modules/engine.io-client/lib/transports/websocket.js");

exports.polling = polling;
exports.websocket = websocket;

/**
 * Polling transport polymorphic constructor.
 * Decides on xhr vs jsonp based on feature detection.
 *
 * @api private
 */

function polling(opts) {
  let xhr;
  let xd = false;
  let xs = false;
  const jsonp = false !== opts.jsonp;

  if (typeof location !== "undefined") {
    const isSSL = "https:" === location.protocol;
    let port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    xd = opts.hostname !== location.hostname || port !== opts.port;
    xs = opts.secure !== isSSL;
  }

  opts.xdomain = xd;
  opts.xscheme = xs;
  xhr = new XMLHttpRequest(opts);

  if ("open" in xhr && !opts.forceJSONP) {
    return new XHR(opts);
  } else {
    if (!jsonp) throw new Error("JSONP disabled");
    return new JSONP(opts);
  }
}


/***/ }),

/***/ "./node_modules/engine.io-client/lib/transports/polling-jsonp.js":
/*!***********************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/transports/polling-jsonp.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Polling = __webpack_require__(/*! ./polling */ "./node_modules/engine.io-client/lib/transports/polling.js");
const globalThis = __webpack_require__(/*! ../globalThis */ "./node_modules/engine.io-client/lib/globalThis.browser.js");

const rNewline = /\n/g;
const rEscapedNewline = /\\n/g;

/**
 * Global JSONP callbacks.
 */

let callbacks;

class JSONPPolling extends Polling {
  /**
   * JSONP Polling constructor.
   *
   * @param {Object} opts.
   * @api public
   */
  constructor(opts) {
    super(opts);

    this.query = this.query || {};

    // define global callbacks array if not present
    // we do this here (lazily) to avoid unneeded global pollution
    if (!callbacks) {
      // we need to consider multiple engines in the same page
      callbacks = globalThis.___eio = globalThis.___eio || [];
    }

    // callback identifier
    this.index = callbacks.length;

    // add callback to jsonp global
    const self = this;
    callbacks.push(function(msg) {
      self.onData(msg);
    });

    // append to query string
    this.query.j = this.index;
  }

  /**
   * JSONP only supports binary as base64 encoded strings
   */
  get supportsBinary() {
    return false;
  }

  /**
   * Closes the socket.
   *
   * @api private
   */
  doClose() {
    if (this.script) {
      // prevent spurious errors from being emitted when the window is unloaded
      this.script.onerror = () => {};
      this.script.parentNode.removeChild(this.script);
      this.script = null;
    }

    if (this.form) {
      this.form.parentNode.removeChild(this.form);
      this.form = null;
      this.iframe = null;
    }

    super.doClose();
  }

  /**
   * Starts a poll cycle.
   *
   * @api private
   */
  doPoll() {
    const self = this;
    const script = document.createElement("script");

    if (this.script) {
      this.script.parentNode.removeChild(this.script);
      this.script = null;
    }

    script.async = true;
    script.src = this.uri();
    script.onerror = function(e) {
      self.onError("jsonp poll error", e);
    };

    const insertAt = document.getElementsByTagName("script")[0];
    if (insertAt) {
      insertAt.parentNode.insertBefore(script, insertAt);
    } else {
      (document.head || document.body).appendChild(script);
    }
    this.script = script;

    const isUAgecko =
      "undefined" !== typeof navigator && /gecko/i.test(navigator.userAgent);

    if (isUAgecko) {
      setTimeout(function() {
        const iframe = document.createElement("iframe");
        document.body.appendChild(iframe);
        document.body.removeChild(iframe);
      }, 100);
    }
  }

  /**
   * Writes with a hidden iframe.
   *
   * @param {String} data to send
   * @param {Function} called upon flush.
   * @api private
   */
  doWrite(data, fn) {
    const self = this;
    let iframe;

    if (!this.form) {
      const form = document.createElement("form");
      const area = document.createElement("textarea");
      const id = (this.iframeId = "eio_iframe_" + this.index);

      form.className = "socketio";
      form.style.position = "absolute";
      form.style.top = "-1000px";
      form.style.left = "-1000px";
      form.target = id;
      form.method = "POST";
      form.setAttribute("accept-charset", "utf-8");
      area.name = "d";
      form.appendChild(area);
      document.body.appendChild(form);

      this.form = form;
      this.area = area;
    }

    this.form.action = this.uri();

    function complete() {
      initIframe();
      fn();
    }

    function initIframe() {
      if (self.iframe) {
        try {
          self.form.removeChild(self.iframe);
        } catch (e) {
          self.onError("jsonp polling iframe removal error", e);
        }
      }

      try {
        // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
        const html = '<iframe src="javascript:0" name="' + self.iframeId + '">';
        iframe = document.createElement(html);
      } catch (e) {
        iframe = document.createElement("iframe");
        iframe.name = self.iframeId;
        iframe.src = "javascript:0";
      }

      iframe.id = self.iframeId;

      self.form.appendChild(iframe);
      self.iframe = iframe;
    }

    initIframe();

    // escape \n to prevent it from being converted into \r\n by some UAs
    // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
    data = data.replace(rEscapedNewline, "\\\n");
    this.area.value = data.replace(rNewline, "\\n");

    try {
      this.form.submit();
    } catch (e) {}

    if (this.iframe.attachEvent) {
      this.iframe.onreadystatechange = function() {
        if (self.iframe.readyState === "complete") {
          complete();
        }
      };
    } else {
      this.iframe.onload = complete;
    }
  }
}

module.exports = JSONPPolling;


/***/ }),

/***/ "./node_modules/engine.io-client/lib/transports/polling-xhr.js":
/*!*********************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/transports/polling-xhr.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* global attachEvent */

const XMLHttpRequest = __webpack_require__(/*! xmlhttprequest-ssl */ "./node_modules/engine.io-client/lib/xmlhttprequest.js");
const Polling = __webpack_require__(/*! ./polling */ "./node_modules/engine.io-client/lib/transports/polling.js");
const Emitter = __webpack_require__(/*! component-emitter */ "./node_modules/component-emitter/index.js");
const { pick } = __webpack_require__(/*! ../util */ "./node_modules/engine.io-client/lib/util.js");
const globalThis = __webpack_require__(/*! ../globalThis */ "./node_modules/engine.io-client/lib/globalThis.browser.js");

const debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("engine.io-client:polling-xhr");

/**
 * Empty function
 */

function empty() {}

const hasXHR2 = (function() {
  const xhr = new XMLHttpRequest({ xdomain: false });
  return null != xhr.responseType;
})();

class XHR extends Polling {
  /**
   * XHR Polling constructor.
   *
   * @param {Object} opts
   * @api public
   */
  constructor(opts) {
    super(opts);

    if (typeof location !== "undefined") {
      const isSSL = "https:" === location.protocol;
      let port = location.port;

      // some user agents have empty `location.port`
      if (!port) {
        port = isSSL ? 443 : 80;
      }

      this.xd =
        (typeof location !== "undefined" &&
          opts.hostname !== location.hostname) ||
        port !== opts.port;
      this.xs = opts.secure !== isSSL;
    }
    /**
     * XHR supports binary
     */
    const forceBase64 = opts && opts.forceBase64;
    this.supportsBinary = hasXHR2 && !forceBase64;
  }

  /**
   * Creates a request.
   *
   * @param {String} method
   * @api private
   */
  request(opts = {}) {
    Object.assign(opts, { xd: this.xd, xs: this.xs }, this.opts);
    return new Request(this.uri(), opts);
  }

  /**
   * Sends data.
   *
   * @param {String} data to send.
   * @param {Function} called upon flush.
   * @api private
   */
  doWrite(data, fn) {
    const req = this.request({
      method: "POST",
      data: data
    });
    const self = this;
    req.on("success", fn);
    req.on("error", function(err) {
      self.onError("xhr post error", err);
    });
  }

  /**
   * Starts a poll cycle.
   *
   * @api private
   */
  doPoll() {
    debug("xhr poll");
    const req = this.request();
    const self = this;
    req.on("data", function(data) {
      self.onData(data);
    });
    req.on("error", function(err) {
      self.onError("xhr poll error", err);
    });
    this.pollXhr = req;
  }
}

class Request extends Emitter {
  /**
   * Request constructor
   *
   * @param {Object} options
   * @api public
   */
  constructor(uri, opts) {
    super();
    this.opts = opts;

    this.method = opts.method || "GET";
    this.uri = uri;
    this.async = false !== opts.async;
    this.data = undefined !== opts.data ? opts.data : null;

    this.create();
  }

  /**
   * Creates the XHR object and sends the request.
   *
   * @api private
   */
  create() {
    const opts = pick(
      this.opts,
      "agent",
      "enablesXDR",
      "pfx",
      "key",
      "passphrase",
      "cert",
      "ca",
      "ciphers",
      "rejectUnauthorized"
    );
    opts.xdomain = !!this.opts.xd;
    opts.xscheme = !!this.opts.xs;

    const xhr = (this.xhr = new XMLHttpRequest(opts));
    const self = this;

    try {
      debug("xhr open %s: %s", this.method, this.uri);
      xhr.open(this.method, this.uri, this.async);
      try {
        if (this.opts.extraHeaders) {
          xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
          for (let i in this.opts.extraHeaders) {
            if (this.opts.extraHeaders.hasOwnProperty(i)) {
              xhr.setRequestHeader(i, this.opts.extraHeaders[i]);
            }
          }
        }
      } catch (e) {}

      if ("POST" === this.method) {
        try {
          xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
        } catch (e) {}
      }

      try {
        xhr.setRequestHeader("Accept", "*/*");
      } catch (e) {}

      // ie6 check
      if ("withCredentials" in xhr) {
        xhr.withCredentials = this.opts.withCredentials;
      }

      if (this.opts.requestTimeout) {
        xhr.timeout = this.opts.requestTimeout;
      }

      if (this.hasXDR()) {
        xhr.onload = function() {
          self.onLoad();
        };
        xhr.onerror = function() {
          self.onError(xhr.responseText);
        };
      } else {
        xhr.onreadystatechange = function() {
          if (4 !== xhr.readyState) return;
          if (200 === xhr.status || 1223 === xhr.status) {
            self.onLoad();
          } else {
            // make sure the `error` event handler that's user-set
            // does not throw in the same tick and gets caught here
            setTimeout(function() {
              self.onError(typeof xhr.status === "number" ? xhr.status : 0);
            }, 0);
          }
        };
      }

      debug("xhr data %s", this.data);
      xhr.send(this.data);
    } catch (e) {
      // Need to defer since .create() is called directly from the constructor
      // and thus the 'error' event can only be only bound *after* this exception
      // occurs.  Therefore, also, we cannot throw here at all.
      setTimeout(function() {
        self.onError(e);
      }, 0);
      return;
    }

    if (typeof document !== "undefined") {
      this.index = Request.requestsCount++;
      Request.requests[this.index] = this;
    }
  }

  /**
   * Called upon successful response.
   *
   * @api private
   */
  onSuccess() {
    this.emit("success");
    this.cleanup();
  }

  /**
   * Called if we have data.
   *
   * @api private
   */
  onData(data) {
    this.emit("data", data);
    this.onSuccess();
  }

  /**
   * Called upon error.
   *
   * @api private
   */
  onError(err) {
    this.emit("error", err);
    this.cleanup(true);
  }

  /**
   * Cleans up house.
   *
   * @api private
   */
  cleanup(fromError) {
    if ("undefined" === typeof this.xhr || null === this.xhr) {
      return;
    }
    // xmlhttprequest
    if (this.hasXDR()) {
      this.xhr.onload = this.xhr.onerror = empty;
    } else {
      this.xhr.onreadystatechange = empty;
    }

    if (fromError) {
      try {
        this.xhr.abort();
      } catch (e) {}
    }

    if (typeof document !== "undefined") {
      delete Request.requests[this.index];
    }

    this.xhr = null;
  }

  /**
   * Called upon load.
   *
   * @api private
   */
  onLoad() {
    const data = this.xhr.responseText;
    if (data !== null) {
      this.onData(data);
    }
  }

  /**
   * Check if it has XDomainRequest.
   *
   * @api private
   */
  hasXDR() {
    return typeof XDomainRequest !== "undefined" && !this.xs && this.enablesXDR;
  }

  /**
   * Aborts the request.
   *
   * @api public
   */
  abort() {
    this.cleanup();
  }
}

/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */

Request.requestsCount = 0;
Request.requests = {};

if (typeof document !== "undefined") {
  if (typeof attachEvent === "function") {
    attachEvent("onunload", unloadHandler);
  } else if (typeof addEventListener === "function") {
    const terminationEvent = "onpagehide" in globalThis ? "pagehide" : "unload";
    addEventListener(terminationEvent, unloadHandler, false);
  }
}

function unloadHandler() {
  for (let i in Request.requests) {
    if (Request.requests.hasOwnProperty(i)) {
      Request.requests[i].abort();
    }
  }
}

module.exports = XHR;
module.exports.Request = Request;


/***/ }),

/***/ "./node_modules/engine.io-client/lib/transports/polling.js":
/*!*****************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/transports/polling.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Transport = __webpack_require__(/*! ../transport */ "./node_modules/engine.io-client/lib/transport.js");
const parseqs = __webpack_require__(/*! parseqs */ "./node_modules/parseqs/index.js");
const parser = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/lib/index.js");
const yeast = __webpack_require__(/*! yeast */ "./node_modules/yeast/index.js");

const debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("engine.io-client:polling");

class Polling extends Transport {
  /**
   * Transport name.
   */
  get name() {
    return "polling";
  }

  /**
   * Opens the socket (triggers polling). We write a PING message to determine
   * when the transport is open.
   *
   * @api private
   */
  doOpen() {
    this.poll();
  }

  /**
   * Pauses polling.
   *
   * @param {Function} callback upon buffers are flushed and transport is paused
   * @api private
   */
  pause(onPause) {
    const self = this;

    this.readyState = "pausing";

    function pause() {
      debug("paused");
      self.readyState = "paused";
      onPause();
    }

    if (this.polling || !this.writable) {
      let total = 0;

      if (this.polling) {
        debug("we are currently polling - waiting to pause");
        total++;
        this.once("pollComplete", function() {
          debug("pre-pause polling complete");
          --total || pause();
        });
      }

      if (!this.writable) {
        debug("we are currently writing - waiting to pause");
        total++;
        this.once("drain", function() {
          debug("pre-pause writing complete");
          --total || pause();
        });
      }
    } else {
      pause();
    }
  }

  /**
   * Starts polling cycle.
   *
   * @api public
   */
  poll() {
    debug("polling");
    this.polling = true;
    this.doPoll();
    this.emit("poll");
  }

  /**
   * Overloads onData to detect payloads.
   *
   * @api private
   */
  onData(data) {
    const self = this;
    debug("polling got data %s", data);
    const callback = function(packet, index, total) {
      // if its the first message we consider the transport open
      if ("opening" === self.readyState && packet.type === "open") {
        self.onOpen();
      }

      // if its a close packet, we close the ongoing requests
      if ("close" === packet.type) {
        self.onClose();
        return false;
      }

      // otherwise bypass onData and handle the message
      self.onPacket(packet);
    };

    // decode payload
    parser.decodePayload(data, this.socket.binaryType).forEach(callback);

    // if an event did not trigger closing
    if ("closed" !== this.readyState) {
      // if we got data we're not polling
      this.polling = false;
      this.emit("pollComplete");

      if ("open" === this.readyState) {
        this.poll();
      } else {
        debug('ignoring poll - transport state "%s"', this.readyState);
      }
    }
  }

  /**
   * For polling, send a close packet.
   *
   * @api private
   */
  doClose() {
    const self = this;

    function close() {
      debug("writing close packet");
      self.write([{ type: "close" }]);
    }

    if ("open" === this.readyState) {
      debug("transport open - closing");
      close();
    } else {
      // in case we're trying to close while
      // handshaking is in progress (GH-164)
      debug("transport not open - deferring close");
      this.once("open", close);
    }
  }

  /**
   * Writes a packets payload.
   *
   * @param {Array} data packets
   * @param {Function} drain callback
   * @api private
   */
  write(packets) {
    this.writable = false;

    parser.encodePayload(packets, data => {
      this.doWrite(data, () => {
        this.writable = true;
        this.emit("drain");
      });
    });
  }

  /**
   * Generates uri for connection.
   *
   * @api private
   */
  uri() {
    let query = this.query || {};
    const schema = this.opts.secure ? "https" : "http";
    let port = "";

    // cache busting is forced
    if (false !== this.opts.timestampRequests) {
      query[this.opts.timestampParam] = yeast();
    }

    if (!this.supportsBinary && !query.sid) {
      query.b64 = 1;
    }

    query = parseqs.encode(query);

    // avoid port if default for schema
    if (
      this.opts.port &&
      (("https" === schema && Number(this.opts.port) !== 443) ||
        ("http" === schema && Number(this.opts.port) !== 80))
    ) {
      port = ":" + this.opts.port;
    }

    // prepend ? to query
    if (query.length) {
      query = "?" + query;
    }

    const ipv6 = this.opts.hostname.indexOf(":") !== -1;
    return (
      schema +
      "://" +
      (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) +
      port +
      this.opts.path +
      query
    );
  }
}

module.exports = Polling;


/***/ }),

/***/ "./node_modules/engine.io-client/lib/transports/websocket-constructor.browser.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/transports/websocket-constructor.browser.js ***!
  \***************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const globalThis = __webpack_require__(/*! ../globalThis */ "./node_modules/engine.io-client/lib/globalThis.browser.js");

module.exports = {
  WebSocket: globalThis.WebSocket || globalThis.MozWebSocket,
  usingBrowserWebSocket: true,
  defaultBinaryType: "arraybuffer"
};


/***/ }),

/***/ "./node_modules/engine.io-client/lib/transports/websocket.js":
/*!*******************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/transports/websocket.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Transport = __webpack_require__(/*! ../transport */ "./node_modules/engine.io-client/lib/transport.js");
const parser = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/lib/index.js");
const parseqs = __webpack_require__(/*! parseqs */ "./node_modules/parseqs/index.js");
const yeast = __webpack_require__(/*! yeast */ "./node_modules/yeast/index.js");
const { pick } = __webpack_require__(/*! ../util */ "./node_modules/engine.io-client/lib/util.js");
const {
  WebSocket,
  usingBrowserWebSocket,
  defaultBinaryType
} = __webpack_require__(/*! ./websocket-constructor */ "./node_modules/engine.io-client/lib/transports/websocket-constructor.browser.js");

const debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("engine.io-client:websocket");

// detect ReactNative environment
const isReactNative =
  typeof navigator !== "undefined" &&
  typeof navigator.product === "string" &&
  navigator.product.toLowerCase() === "reactnative";

class WS extends Transport {
  /**
   * WebSocket transport constructor.
   *
   * @api {Object} connection options
   * @api public
   */
  constructor(opts) {
    super(opts);

    this.supportsBinary = !opts.forceBase64;
  }

  /**
   * Transport name.
   *
   * @api public
   */
  get name() {
    return "websocket";
  }

  /**
   * Opens socket.
   *
   * @api private
   */
  doOpen() {
    if (!this.check()) {
      // let probe timeout
      return;
    }

    const uri = this.uri();
    const protocols = this.opts.protocols;

    // React Native only supports the 'headers' option, and will print a warning if anything else is passed
    const opts = isReactNative
      ? {}
      : pick(
          this.opts,
          "agent",
          "perMessageDeflate",
          "pfx",
          "key",
          "passphrase",
          "cert",
          "ca",
          "ciphers",
          "rejectUnauthorized",
          "localAddress",
          "protocolVersion",
          "origin",
          "maxPayload",
          "family",
          "checkServerIdentity"
        );

    if (this.opts.extraHeaders) {
      opts.headers = this.opts.extraHeaders;
    }

    try {
      this.ws =
        usingBrowserWebSocket && !isReactNative
          ? protocols
            ? new WebSocket(uri, protocols)
            : new WebSocket(uri)
          : new WebSocket(uri, protocols, opts);
    } catch (err) {
      return this.emit("error", err);
    }

    this.ws.binaryType = this.socket.binaryType || defaultBinaryType;

    this.addEventListeners();
  }

  /**
   * Adds event listeners to the socket
   *
   * @api private
   */
  addEventListeners() {
    const self = this;

    this.ws.onopen = function() {
      self.onOpen();
    };
    this.ws.onclose = function() {
      self.onClose();
    };
    this.ws.onmessage = function(ev) {
      self.onData(ev.data);
    };
    this.ws.onerror = function(e) {
      self.onError("websocket error", e);
    };
  }

  /**
   * Writes data to socket.
   *
   * @param {Array} array of packets.
   * @api private
   */
  write(packets) {
    const self = this;
    this.writable = false;

    // encodePacket efficient as it uses WS framing
    // no need for encodePayload
    let total = packets.length;
    let i = 0;
    const l = total;
    for (; i < l; i++) {
      (function(packet) {
        parser.encodePacket(packet, self.supportsBinary, function(data) {
          // always create a new object (GH-437)
          const opts = {};
          if (!usingBrowserWebSocket) {
            if (packet.options) {
              opts.compress = packet.options.compress;
            }

            if (self.opts.perMessageDeflate) {
              const len =
                "string" === typeof data
                  ? Buffer.byteLength(data)
                  : data.length;
              if (len < self.opts.perMessageDeflate.threshold) {
                opts.compress = false;
              }
            }
          }

          // Sometimes the websocket has already been closed but the browser didn't
          // have a chance of informing us about it yet, in that case send will
          // throw an error
          try {
            if (usingBrowserWebSocket) {
              // TypeError is thrown when passing the second argument on Safari
              self.ws.send(data);
            } else {
              self.ws.send(data, opts);
            }
          } catch (e) {
            debug("websocket closed before onclose event");
          }

          --total || done();
        });
      })(packets[i]);
    }

    function done() {
      self.emit("flush");

      // fake drain
      // defer to next tick to allow Socket to clear writeBuffer
      setTimeout(function() {
        self.writable = true;
        self.emit("drain");
      }, 0);
    }
  }

  /**
   * Called upon close
   *
   * @api private
   */
  onClose() {
    Transport.prototype.onClose.call(this);
  }

  /**
   * Closes socket.
   *
   * @api private
   */
  doClose() {
    if (typeof this.ws !== "undefined") {
      this.ws.close();
      this.ws = null;
    }
  }

  /**
   * Generates uri for connection.
   *
   * @api private
   */
  uri() {
    let query = this.query || {};
    const schema = this.opts.secure ? "wss" : "ws";
    let port = "";

    // avoid port if default for schema
    if (
      this.opts.port &&
      (("wss" === schema && Number(this.opts.port) !== 443) ||
        ("ws" === schema && Number(this.opts.port) !== 80))
    ) {
      port = ":" + this.opts.port;
    }

    // append timestamp to URI
    if (this.opts.timestampRequests) {
      query[this.opts.timestampParam] = yeast();
    }

    // communicate binary support capabilities
    if (!this.supportsBinary) {
      query.b64 = 1;
    }

    query = parseqs.encode(query);

    // prepend ? to query
    if (query.length) {
      query = "?" + query;
    }

    const ipv6 = this.opts.hostname.indexOf(":") !== -1;
    return (
      schema +
      "://" +
      (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) +
      port +
      this.opts.path +
      query
    );
  }

  /**
   * Feature detection for WebSocket.
   *
   * @return {Boolean} whether this transport is available.
   * @api public
   */
  check() {
    return (
      !!WebSocket &&
      !("__initialize" in WebSocket && this.name === WS.prototype.name)
    );
  }
}

module.exports = WS;


/***/ }),

/***/ "./node_modules/engine.io-client/lib/util.js":
/*!***************************************************!*\
  !*** ./node_modules/engine.io-client/lib/util.js ***!
  \***************************************************/
/***/ ((module) => {

module.exports.pick = (obj, ...attr) => {
  return attr.reduce((acc, k) => {
    if (obj.hasOwnProperty(k)) {
      acc[k] = obj[k];
    }
    return acc;
  }, {});
};


/***/ }),

/***/ "./node_modules/engine.io-client/lib/xmlhttprequest.js":
/*!*************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/xmlhttprequest.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// browser shim for xmlhttprequest module

const hasCORS = __webpack_require__(/*! has-cors */ "./node_modules/has-cors/index.js");
const globalThis = __webpack_require__(/*! ./globalThis */ "./node_modules/engine.io-client/lib/globalThis.browser.js");

module.exports = function(opts) {
  const xdomain = opts.xdomain;

  // scheme must be same when usign XDomainRequest
  // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
  const xscheme = opts.xscheme;

  // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
  // https://github.com/Automattic/engine.io-client/pull/217
  const enablesXDR = opts.enablesXDR;

  // XMLHttpRequest can be disabled on IE
  try {
    if ("undefined" !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
      return new XMLHttpRequest();
    }
  } catch (e) {}

  // Use XDomainRequest for IE8 if enablesXDR is true
  // because loading bar keeps flashing when using jsonp-polling
  // https://github.com/yujiosaka/socke.io-ie8-loading-example
  try {
    if ("undefined" !== typeof XDomainRequest && !xscheme && enablesXDR) {
      return new XDomainRequest();
    }
  } catch (e) {}

  if (!xdomain) {
    try {
      return new globalThis[["Active"].concat("Object").join("X")](
        "Microsoft.XMLHTTP"
      );
    } catch (e) {}
  }
};


/***/ }),

/***/ "./node_modules/engine.io-parser/lib/commons.js":
/*!******************************************************!*\
  !*** ./node_modules/engine.io-parser/lib/commons.js ***!
  \******************************************************/
/***/ ((module) => {

const PACKET_TYPES = Object.create(null); // no Map = no polyfill
PACKET_TYPES["open"] = "0";
PACKET_TYPES["close"] = "1";
PACKET_TYPES["ping"] = "2";
PACKET_TYPES["pong"] = "3";
PACKET_TYPES["message"] = "4";
PACKET_TYPES["upgrade"] = "5";
PACKET_TYPES["noop"] = "6";

const PACKET_TYPES_REVERSE = Object.create(null);
Object.keys(PACKET_TYPES).forEach(key => {
  PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
});

const ERROR_PACKET = { type: "error", data: "parser error" };

module.exports = {
  PACKET_TYPES,
  PACKET_TYPES_REVERSE,
  ERROR_PACKET
};


/***/ }),

/***/ "./node_modules/engine.io-parser/lib/decodePacket.browser.js":
/*!*******************************************************************!*\
  !*** ./node_modules/engine.io-parser/lib/decodePacket.browser.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { PACKET_TYPES_REVERSE, ERROR_PACKET } = __webpack_require__(/*! ./commons */ "./node_modules/engine.io-parser/lib/commons.js");

const withNativeArrayBuffer = typeof ArrayBuffer === "function";

let base64decoder;
if (withNativeArrayBuffer) {
  base64decoder = __webpack_require__(/*! base64-arraybuffer */ "./node_modules/base64-arraybuffer/lib/base64-arraybuffer.js");
}

const decodePacket = (encodedPacket, binaryType) => {
  if (typeof encodedPacket !== "string") {
    return {
      type: "message",
      data: mapBinary(encodedPacket, binaryType)
    };
  }
  const type = encodedPacket.charAt(0);
  if (type === "b") {
    return {
      type: "message",
      data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
    };
  }
  const packetType = PACKET_TYPES_REVERSE[type];
  if (!packetType) {
    return ERROR_PACKET;
  }
  return encodedPacket.length > 1
    ? {
        type: PACKET_TYPES_REVERSE[type],
        data: encodedPacket.substring(1)
      }
    : {
        type: PACKET_TYPES_REVERSE[type]
      };
};

const decodeBase64Packet = (data, binaryType) => {
  if (base64decoder) {
    const decoded = base64decoder.decode(data);
    return mapBinary(decoded, binaryType);
  } else {
    return { base64: true, data }; // fallback for old browsers
  }
};

const mapBinary = (data, binaryType) => {
  switch (binaryType) {
    case "blob":
      return data instanceof ArrayBuffer ? new Blob([data]) : data;
    case "arraybuffer":
    default:
      return data; // assuming the data is already an ArrayBuffer
  }
};

module.exports = decodePacket;


/***/ }),

/***/ "./node_modules/engine.io-parser/lib/encodePacket.browser.js":
/*!*******************************************************************!*\
  !*** ./node_modules/engine.io-parser/lib/encodePacket.browser.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { PACKET_TYPES } = __webpack_require__(/*! ./commons */ "./node_modules/engine.io-parser/lib/commons.js");

const withNativeBlob =
  typeof Blob === "function" ||
  (typeof Blob !== "undefined" &&
    Object.prototype.toString.call(Blob) === "[object BlobConstructor]");
const withNativeArrayBuffer = typeof ArrayBuffer === "function";

// ArrayBuffer.isView method is not defined in IE10
const isView = obj => {
  return typeof ArrayBuffer.isView === "function"
    ? ArrayBuffer.isView(obj)
    : obj && obj.buffer instanceof ArrayBuffer;
};

const encodePacket = ({ type, data }, supportsBinary, callback) => {
  if (withNativeBlob && data instanceof Blob) {
    if (supportsBinary) {
      return callback(data);
    } else {
      return encodeBlobAsBase64(data, callback);
    }
  } else if (
    withNativeArrayBuffer &&
    (data instanceof ArrayBuffer || isView(data))
  ) {
    if (supportsBinary) {
      return callback(data instanceof ArrayBuffer ? data : data.buffer);
    } else {
      return encodeBlobAsBase64(new Blob([data]), callback);
    }
  }
  // plain string
  return callback(PACKET_TYPES[type] + (data || ""));
};

const encodeBlobAsBase64 = (data, callback) => {
  const fileReader = new FileReader();
  fileReader.onload = function() {
    const content = fileReader.result.split(",")[1];
    callback("b" + content);
  };
  return fileReader.readAsDataURL(data);
};

module.exports = encodePacket;


/***/ }),

/***/ "./node_modules/engine.io-parser/lib/index.js":
/*!****************************************************!*\
  !*** ./node_modules/engine.io-parser/lib/index.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const encodePacket = __webpack_require__(/*! ./encodePacket */ "./node_modules/engine.io-parser/lib/encodePacket.browser.js");
const decodePacket = __webpack_require__(/*! ./decodePacket */ "./node_modules/engine.io-parser/lib/decodePacket.browser.js");

const SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text

const encodePayload = (packets, callback) => {
  // some packets may be added to the array while encoding, so the initial length must be saved
  const length = packets.length;
  const encodedPackets = new Array(length);
  let count = 0;

  packets.forEach((packet, i) => {
    // force base64 encoding for binary packets
    encodePacket(packet, false, encodedPacket => {
      encodedPackets[i] = encodedPacket;
      if (++count === length) {
        callback(encodedPackets.join(SEPARATOR));
      }
    });
  });
};

const decodePayload = (encodedPayload, binaryType) => {
  const encodedPackets = encodedPayload.split(SEPARATOR);
  const packets = [];
  for (let i = 0; i < encodedPackets.length; i++) {
    const decodedPacket = decodePacket(encodedPackets[i], binaryType);
    packets.push(decodedPacket);
    if (decodedPacket.type === "error") {
      break;
    }
  }
  return packets;
};

module.exports = {
  protocol: 4,
  encodePacket,
  encodePayload,
  decodePacket,
  decodePayload
};


/***/ }),

/***/ "./node_modules/has-cors/index.js":
/*!****************************************!*\
  !*** ./node_modules/has-cors/index.js ***!
  \****************************************/
/***/ ((module) => {


/**
 * Module exports.
 *
 * Logic borrowed from Modernizr:
 *
 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
 */

try {
  module.exports = typeof XMLHttpRequest !== 'undefined' &&
    'withCredentials' in new XMLHttpRequest();
} catch (err) {
  // if XMLHttp support is disabled in IE then it will throw
  // when trying to create
  module.exports = false;
}


/***/ }),

/***/ "./node_modules/parseqs/index.js":
/*!***************************************!*\
  !*** ./node_modules/parseqs/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */

exports.encode = function (obj) {
  var str = '';

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (str.length) str += '&';
      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
    }
  }

  return str;
};

/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */

exports.decode = function(qs){
  var qry = {};
  var pairs = qs.split('&');
  for (var i = 0, l = pairs.length; i < l; i++) {
    var pair = pairs[i].split('=');
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
};


/***/ }),

/***/ "./node_modules/parseuri/index.js":
/*!****************************************!*\
  !*** ./node_modules/parseuri/index.js ***!
  \****************************************/
/***/ ((module) => {

/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */

var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

var parts = [
    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
];

module.exports = function parseuri(str) {
    var src = str,
        b = str.indexOf('['),
        e = str.indexOf(']');

    if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }

    var m = re.exec(str || ''),
        uri = {},
        i = 14;

    while (i--) {
        uri[parts[i]] = m[i] || '';
    }

    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
        uri.ipv6uri = true;
    }

    uri.pathNames = pathNames(uri, uri['path']);
    uri.queryKey = queryKey(uri, uri['query']);

    return uri;
};

function pathNames(obj, path) {
    var regx = /\/{2,9}/g,
        names = path.replace(regx, "/").split("/");

    if (path.substr(0, 1) == '/' || path.length === 0) {
        names.splice(0, 1);
    }
    if (path.substr(path.length - 1, 1) == '/') {
        names.splice(names.length - 1, 1);
    }

    return names;
}

function queryKey(uri, query) {
    var data = {};

    query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function ($0, $1, $2) {
        if ($1) {
            data[$1] = $2;
        }
    });

    return data;
}


/***/ }),

/***/ "./node_modules/socket.io-client/build/index.js":
/*!******************************************************!*\
  !*** ./node_modules/socket.io-client/build/index.js ***!
  \******************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Socket = exports.io = exports.Manager = exports.protocol = void 0;
const url_1 = __webpack_require__(/*! ./url */ "./node_modules/socket.io-client/build/url.js");
const manager_1 = __webpack_require__(/*! ./manager */ "./node_modules/socket.io-client/build/manager.js");
const socket_1 = __webpack_require__(/*! ./socket */ "./node_modules/socket.io-client/build/socket.js");
Object.defineProperty(exports, "Socket", ({ enumerable: true, get: function () { return socket_1.Socket; } }));
const debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("socket.io-client");
/**
 * Module exports.
 */
module.exports = exports = lookup;
/**
 * Managers cache.
 */
const cache = (exports.managers = {});
function lookup(uri, opts) {
    if (typeof uri === "object") {
        opts = uri;
        uri = undefined;
    }
    opts = opts || {};
    const parsed = url_1.url(uri, opts.path);
    const source = parsed.source;
    const id = parsed.id;
    const path = parsed.path;
    const sameNamespace = cache[id] && path in cache[id]["nsps"];
    const newConnection = opts.forceNew ||
        opts["force new connection"] ||
        false === opts.multiplex ||
        sameNamespace;
    let io;
    if (newConnection) {
        debug("ignoring socket cache for %s", source);
        io = new manager_1.Manager(source, opts);
    }
    else {
        if (!cache[id]) {
            debug("new io instance for %s", source);
            cache[id] = new manager_1.Manager(source, opts);
        }
        io = cache[id];
    }
    if (parsed.query && !opts.query) {
        opts.query = parsed.queryKey;
    }
    return io.socket(parsed.path, opts);
}
exports.io = lookup;
/**
 * Protocol version.
 *
 * @public
 */
var socket_io_parser_1 = __webpack_require__(/*! socket.io-parser */ "./node_modules/socket.io-parser/dist/index.js");
Object.defineProperty(exports, "protocol", ({ enumerable: true, get: function () { return socket_io_parser_1.protocol; } }));
/**
 * `connect`.
 *
 * @param {String} uri
 * @public
 */
exports.connect = lookup;
/**
 * Expose constructors for standalone build.
 *
 * @public
 */
var manager_2 = __webpack_require__(/*! ./manager */ "./node_modules/socket.io-client/build/manager.js");
Object.defineProperty(exports, "Manager", ({ enumerable: true, get: function () { return manager_2.Manager; } }));


/***/ }),

/***/ "./node_modules/socket.io-client/build/manager.js":
/*!********************************************************!*\
  !*** ./node_modules/socket.io-client/build/manager.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Manager = void 0;
const eio = __webpack_require__(/*! engine.io-client */ "./node_modules/engine.io-client/lib/index.js");
const socket_1 = __webpack_require__(/*! ./socket */ "./node_modules/socket.io-client/build/socket.js");
const Emitter = __webpack_require__(/*! component-emitter */ "./node_modules/component-emitter/index.js");
const parser = __webpack_require__(/*! socket.io-parser */ "./node_modules/socket.io-parser/dist/index.js");
const on_1 = __webpack_require__(/*! ./on */ "./node_modules/socket.io-client/build/on.js");
const Backoff = __webpack_require__(/*! backo2 */ "./node_modules/backo2/index.js");
const debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("socket.io-client:manager");
class Manager extends Emitter {
    constructor(uri, opts) {
        super();
        this.nsps = {};
        this.subs = [];
        if (uri && "object" === typeof uri) {
            opts = uri;
            uri = undefined;
        }
        opts = opts || {};
        opts.path = opts.path || "/socket.io";
        this.opts = opts;
        this.reconnection(opts.reconnection !== false);
        this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
        this.reconnectionDelay(opts.reconnectionDelay || 1000);
        this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
        this.randomizationFactor(opts.randomizationFactor || 0.5);
        this.backoff = new Backoff({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor(),
        });
        this.timeout(null == opts.timeout ? 20000 : opts.timeout);
        this._readyState = "closed";
        this.uri = uri;
        const _parser = opts.parser || parser;
        this.encoder = new _parser.Encoder();
        this.decoder = new _parser.Decoder();
        this._autoConnect = opts.autoConnect !== false;
        if (this._autoConnect)
            this.open();
    }
    reconnection(v) {
        if (!arguments.length)
            return this._reconnection;
        this._reconnection = !!v;
        return this;
    }
    reconnectionAttempts(v) {
        if (v === undefined)
            return this._reconnectionAttempts;
        this._reconnectionAttempts = v;
        return this;
    }
    reconnectionDelay(v) {
        var _a;
        if (v === undefined)
            return this._reconnectionDelay;
        this._reconnectionDelay = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
        return this;
    }
    randomizationFactor(v) {
        var _a;
        if (v === undefined)
            return this._randomizationFactor;
        this._randomizationFactor = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
        return this;
    }
    reconnectionDelayMax(v) {
        var _a;
        if (v === undefined)
            return this._reconnectionDelayMax;
        this._reconnectionDelayMax = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
        return this;
    }
    timeout(v) {
        if (!arguments.length)
            return this._timeout;
        this._timeout = v;
        return this;
    }
    /**
     * Starts trying to reconnect if reconnection is enabled and we have not
     * started reconnecting yet
     *
     * @private
     */
    maybeReconnectOnOpen() {
        // Only try to reconnect if it's the first time we're connecting
        if (!this._reconnecting &&
            this._reconnection &&
            this.backoff.attempts === 0) {
            // keeps reconnection from firing twice for the same reconnection loop
            this.reconnect();
        }
    }
    /**
     * Sets the current transport `socket`.
     *
     * @param {Function} fn - optional, callback
     * @return self
     * @public
     */
    open(fn) {
        debug("readyState %s", this._readyState);
        if (~this._readyState.indexOf("open"))
            return this;
        debug("opening %s", this.uri);
        this.engine = eio(this.uri, this.opts);
        const socket = this.engine;
        const self = this;
        this._readyState = "opening";
        this.skipReconnect = false;
        // emit `open`
        const openSubDestroy = on_1.on(socket, "open", function () {
            self.onopen();
            fn && fn();
        });
        // emit `error`
        const errorSub = on_1.on(socket, "error", (err) => {
            debug("error");
            self.cleanup();
            self._readyState = "closed";
            super.emit("error", err);
            if (fn) {
                fn(err);
            }
            else {
                // Only do this if there is no fn to handle the error
                self.maybeReconnectOnOpen();
            }
        });
        if (false !== this._timeout) {
            const timeout = this._timeout;
            debug("connect attempt will timeout after %d", timeout);
            if (timeout === 0) {
                openSubDestroy(); // prevents a race condition with the 'open' event
            }
            // set timer
            const timer = setTimeout(() => {
                debug("connect attempt timed out after %d", timeout);
                openSubDestroy();
                socket.close();
                socket.emit("error", new Error("timeout"));
            }, timeout);
            this.subs.push(function subDestroy() {
                clearTimeout(timer);
            });
        }
        this.subs.push(openSubDestroy);
        this.subs.push(errorSub);
        return this;
    }
    /**
     * Alias for open()
     *
     * @return self
     * @public
     */
    connect(fn) {
        return this.open(fn);
    }
    /**
     * Called upon transport open.
     *
     * @private
     */
    onopen() {
        debug("open");
        // clear old subs
        this.cleanup();
        // mark as open
        this._readyState = "open";
        super.emit("open");
        // add new subs
        const socket = this.engine;
        this.subs.push(on_1.on(socket, "ping", this.onping.bind(this)), on_1.on(socket, "data", this.ondata.bind(this)), on_1.on(socket, "error", this.onerror.bind(this)), on_1.on(socket, "close", this.onclose.bind(this)), on_1.on(this.decoder, "decoded", this.ondecoded.bind(this)));
    }
    /**
     * Called upon a ping.
     *
     * @private
     */
    onping() {
        super.emit("ping");
    }
    /**
     * Called with data.
     *
     * @private
     */
    ondata(data) {
        this.decoder.add(data);
    }
    /**
     * Called when parser fully decodes a packet.
     *
     * @private
     */
    ondecoded(packet) {
        super.emit("packet", packet);
    }
    /**
     * Called upon socket error.
     *
     * @private
     */
    onerror(err) {
        debug("error", err);
        super.emit("error", err);
    }
    /**
     * Creates a new socket for the given `nsp`.
     *
     * @return {Socket}
     * @public
     */
    socket(nsp, opts) {
        let socket = this.nsps[nsp];
        if (!socket) {
            socket = new socket_1.Socket(this, nsp, opts);
            this.nsps[nsp] = socket;
        }
        return socket;
    }
    /**
     * Called upon a socket close.
     *
     * @param socket
     * @private
     */
    _destroy(socket) {
        const nsps = Object.keys(this.nsps);
        for (const nsp of nsps) {
            const socket = this.nsps[nsp];
            if (socket.active) {
                debug("socket %s is still active, skipping close", nsp);
                return;
            }
        }
        this._close();
    }
    /**
     * Writes a packet.
     *
     * @param packet
     * @private
     */
    _packet(packet) {
        debug("writing packet %j", packet);
        const encodedPackets = this.encoder.encode(packet);
        for (let i = 0; i < encodedPackets.length; i++) {
            this.engine.write(encodedPackets[i], packet.options);
        }
    }
    /**
     * Clean up transport subscriptions and packet buffer.
     *
     * @private
     */
    cleanup() {
        debug("cleanup");
        this.subs.forEach((subDestroy) => subDestroy());
        this.subs.length = 0;
        this.decoder.destroy();
    }
    /**
     * Close the current socket.
     *
     * @private
     */
    _close() {
        debug("disconnect");
        this.skipReconnect = true;
        this._reconnecting = false;
        if ("opening" === this._readyState) {
            // `onclose` will not fire because
            // an open event never happened
            this.cleanup();
        }
        this.backoff.reset();
        this._readyState = "closed";
        if (this.engine)
            this.engine.close();
    }
    /**
     * Alias for close()
     *
     * @private
     */
    disconnect() {
        return this._close();
    }
    /**
     * Called upon engine close.
     *
     * @private
     */
    onclose(reason) {
        debug("onclose");
        this.cleanup();
        this.backoff.reset();
        this._readyState = "closed";
        super.emit("close", reason);
        if (this._reconnection && !this.skipReconnect) {
            this.reconnect();
        }
    }
    /**
     * Attempt a reconnection.
     *
     * @private
     */
    reconnect() {
        if (this._reconnecting || this.skipReconnect)
            return this;
        const self = this;
        if (this.backoff.attempts >= this._reconnectionAttempts) {
            debug("reconnect failed");
            this.backoff.reset();
            super.emit("reconnect_failed");
            this._reconnecting = false;
        }
        else {
            const delay = this.backoff.duration();
            debug("will wait %dms before reconnect attempt", delay);
            this._reconnecting = true;
            const timer = setTimeout(() => {
                if (self.skipReconnect)
                    return;
                debug("attempting reconnect");
                super.emit("reconnect_attempt", self.backoff.attempts);
                // check again for the case socket closed in above events
                if (self.skipReconnect)
                    return;
                self.open((err) => {
                    if (err) {
                        debug("reconnect attempt error");
                        self._reconnecting = false;
                        self.reconnect();
                        super.emit("reconnect_error", err);
                    }
                    else {
                        debug("reconnect success");
                        self.onreconnect();
                    }
                });
            }, delay);
            this.subs.push(function subDestroy() {
                clearTimeout(timer);
            });
        }
    }
    /**
     * Called upon successful reconnect.
     *
     * @private
     */
    onreconnect() {
        const attempt = this.backoff.attempts;
        this._reconnecting = false;
        this.backoff.reset();
        super.emit("reconnect", attempt);
    }
}
exports.Manager = Manager;


/***/ }),

/***/ "./node_modules/socket.io-client/build/on.js":
/*!***************************************************!*\
  !*** ./node_modules/socket.io-client/build/on.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.on = void 0;
function on(obj, ev, fn) {
    obj.on(ev, fn);
    return function subDestroy() {
        obj.off(ev, fn);
    };
}
exports.on = on;


/***/ }),

/***/ "./node_modules/socket.io-client/build/socket.js":
/*!*******************************************************!*\
  !*** ./node_modules/socket.io-client/build/socket.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Socket = void 0;
const socket_io_parser_1 = __webpack_require__(/*! socket.io-parser */ "./node_modules/socket.io-parser/dist/index.js");
const Emitter = __webpack_require__(/*! component-emitter */ "./node_modules/component-emitter/index.js");
const on_1 = __webpack_require__(/*! ./on */ "./node_modules/socket.io-client/build/on.js");
const debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("socket.io-client:socket");
/**
 * Internal events.
 * These events can't be emitted by the user.
 */
const RESERVED_EVENTS = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
    newListener: 1,
    removeListener: 1,
});
class Socket extends Emitter {
    /**
     * `Socket` constructor.
     *
     * @public
     */
    constructor(io, nsp, opts) {
        super();
        this.receiveBuffer = [];
        this.sendBuffer = [];
        this.ids = 0;
        this.acks = {};
        this.flags = {};
        this.io = io;
        this.nsp = nsp;
        this.ids = 0;
        this.acks = {};
        this.receiveBuffer = [];
        this.sendBuffer = [];
        this.connected = false;
        this.disconnected = true;
        this.flags = {};
        if (opts && opts.auth) {
            this.auth = opts.auth;
        }
        if (this.io._autoConnect)
            this.open();
    }
    /**
     * Subscribe to open, close and packet events
     *
     * @private
     */
    subEvents() {
        if (this.subs)
            return;
        const io = this.io;
        this.subs = [
            on_1.on(io, "open", this.onopen.bind(this)),
            on_1.on(io, "packet", this.onpacket.bind(this)),
            on_1.on(io, "error", this.onerror.bind(this)),
            on_1.on(io, "close", this.onclose.bind(this)),
        ];
    }
    /**
     * Whether the Socket will try to reconnect when its Manager connects or reconnects
     */
    get active() {
        return !!this.subs;
    }
    /**
     * "Opens" the socket.
     *
     * @public
     */
    connect() {
        if (this.connected)
            return this;
        this.subEvents();
        if (!this.io["_reconnecting"])
            this.io.open(); // ensure open
        if ("open" === this.io._readyState)
            this.onopen();
        return this;
    }
    /**
     * Alias for connect()
     */
    open() {
        return this.connect();
    }
    /**
     * Sends a `message` event.
     *
     * @return self
     * @public
     */
    send(...args) {
        args.unshift("message");
        this.emit.apply(this, args);
        return this;
    }
    /**
     * Override `emit`.
     * If the event is in `events`, it's emitted normally.
     *
     * @param ev - event name
     * @return self
     * @public
     */
    emit(ev, ...args) {
        if (RESERVED_EVENTS.hasOwnProperty(ev)) {
            throw new Error('"' + ev + '" is a reserved event name');
        }
        args.unshift(ev);
        const packet = {
            type: socket_io_parser_1.PacketType.EVENT,
            data: args,
        };
        packet.options = {};
        packet.options.compress = this.flags.compress !== false;
        // event ack callback
        if ("function" === typeof args[args.length - 1]) {
            debug("emitting packet with ack id %d", this.ids);
            this.acks[this.ids] = args.pop();
            packet.id = this.ids++;
        }
        const isTransportWritable = this.io.engine &&
            this.io.engine.transport &&
            this.io.engine.transport.writable;
        const discardPacket = this.flags.volatile && (!isTransportWritable || !this.connected);
        if (discardPacket) {
            debug("discard packet as the transport is not currently writable");
        }
        else if (this.connected) {
            this.packet(packet);
        }
        else {
            this.sendBuffer.push(packet);
        }
        this.flags = {};
        return this;
    }
    /**
     * Sends a packet.
     *
     * @param packet
     * @private
     */
    packet(packet) {
        packet.nsp = this.nsp;
        this.io._packet(packet);
    }
    /**
     * Called upon engine `open`.
     *
     * @private
     */
    onopen() {
        debug("transport is open - connecting");
        if (typeof this.auth == "function") {
            this.auth((data) => {
                this.packet({ type: socket_io_parser_1.PacketType.CONNECT, data });
            });
        }
        else {
            this.packet({ type: socket_io_parser_1.PacketType.CONNECT, data: this.auth });
        }
    }
    /**
     * Called upon engine or manager `error`.
     *
     * @param err
     * @private
     */
    onerror(err) {
        if (!this.connected) {
            super.emit("connect_error", err);
        }
    }
    /**
     * Called upon engine `close`.
     *
     * @param reason
     * @private
     */
    onclose(reason) {
        debug("close (%s)", reason);
        this.connected = false;
        this.disconnected = true;
        delete this.id;
        super.emit("disconnect", reason);
    }
    /**
     * Called with socket packet.
     *
     * @param packet
     * @private
     */
    onpacket(packet) {
        const sameNamespace = packet.nsp === this.nsp;
        if (!sameNamespace)
            return;
        switch (packet.type) {
            case socket_io_parser_1.PacketType.CONNECT:
                if (packet.data && packet.data.sid) {
                    const id = packet.data.sid;
                    this.onconnect(id);
                }
                else {
                    super.emit("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
                }
                break;
            case socket_io_parser_1.PacketType.EVENT:
                this.onevent(packet);
                break;
            case socket_io_parser_1.PacketType.BINARY_EVENT:
                this.onevent(packet);
                break;
            case socket_io_parser_1.PacketType.ACK:
                this.onack(packet);
                break;
            case socket_io_parser_1.PacketType.BINARY_ACK:
                this.onack(packet);
                break;
            case socket_io_parser_1.PacketType.DISCONNECT:
                this.ondisconnect();
                break;
            case socket_io_parser_1.PacketType.CONNECT_ERROR:
                const err = new Error(packet.data.message);
                // @ts-ignore
                err.data = packet.data.data;
                super.emit("connect_error", err);
                break;
        }
    }
    /**
     * Called upon a server event.
     *
     * @param packet
     * @private
     */
    onevent(packet) {
        const args = packet.data || [];
        debug("emitting event %j", args);
        if (null != packet.id) {
            debug("attaching ack callback to event");
            args.push(this.ack(packet.id));
        }
        if (this.connected) {
            this.emitEvent(args);
        }
        else {
            this.receiveBuffer.push(Object.freeze(args));
        }
    }
    emitEvent(args) {
        if (this._anyListeners && this._anyListeners.length) {
            const listeners = this._anyListeners.slice();
            for (const listener of listeners) {
                listener.apply(this, args);
            }
        }
        super.emit.apply(this, args);
    }
    /**
     * Produces an ack callback to emit with an event.
     *
     * @private
     */
    ack(id) {
        const self = this;
        let sent = false;
        return function (...args) {
            // prevent double callbacks
            if (sent)
                return;
            sent = true;
            debug("sending ack %j", args);
            self.packet({
                type: socket_io_parser_1.PacketType.ACK,
                id: id,
                data: args,
            });
        };
    }
    /**
     * Called upon a server acknowlegement.
     *
     * @param packet
     * @private
     */
    onack(packet) {
        const ack = this.acks[packet.id];
        if ("function" === typeof ack) {
            debug("calling ack %s with %j", packet.id, packet.data);
            ack.apply(this, packet.data);
            delete this.acks[packet.id];
        }
        else {
            debug("bad ack %s", packet.id);
        }
    }
    /**
     * Called upon server connect.
     *
     * @private
     */
    onconnect(id) {
        debug("socket connected with id %s", id);
        this.id = id;
        this.connected = true;
        this.disconnected = false;
        super.emit("connect");
        this.emitBuffered();
    }
    /**
     * Emit buffered events (received and emitted).
     *
     * @private
     */
    emitBuffered() {
        this.receiveBuffer.forEach((args) => this.emitEvent(args));
        this.receiveBuffer = [];
        this.sendBuffer.forEach((packet) => this.packet(packet));
        this.sendBuffer = [];
    }
    /**
     * Called upon server disconnect.
     *
     * @private
     */
    ondisconnect() {
        debug("server disconnect (%s)", this.nsp);
        this.destroy();
        this.onclose("io server disconnect");
    }
    /**
     * Called upon forced client/server side disconnections,
     * this method ensures the manager stops tracking us and
     * that reconnections don't get triggered for this.
     *
     * @private
     */
    destroy() {
        if (this.subs) {
            // clean subscriptions to avoid reconnections
            this.subs.forEach((subDestroy) => subDestroy());
            this.subs = undefined;
        }
        this.io["_destroy"](this);
    }
    /**
     * Disconnects the socket manually.
     *
     * @return self
     * @public
     */
    disconnect() {
        if (this.connected) {
            debug("performing disconnect (%s)", this.nsp);
            this.packet({ type: socket_io_parser_1.PacketType.DISCONNECT });
        }
        // remove socket from pool
        this.destroy();
        if (this.connected) {
            // fire events
            this.onclose("io client disconnect");
        }
        return this;
    }
    /**
     * Alias for disconnect()
     *
     * @return self
     * @public
     */
    close() {
        return this.disconnect();
    }
    /**
     * Sets the compress flag.
     *
     * @param compress - if `true`, compresses the sending data
     * @return self
     * @public
     */
    compress(compress) {
        this.flags.compress = compress;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
     * ready to send messages.
     *
     * @returns self
     * @public
     */
    get volatile() {
        this.flags.volatile = true;
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * @param listener
     * @public
     */
    onAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.push(listener);
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * @param listener
     * @public
     */
    prependAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.unshift(listener);
        return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @param listener
     * @public
     */
    offAny(listener) {
        if (!this._anyListeners) {
            return this;
        }
        if (listener) {
            const listeners = this._anyListeners;
            for (let i = 0; i < listeners.length; i++) {
                if (listener === listeners[i]) {
                    listeners.splice(i, 1);
                    return this;
                }
            }
        }
        else {
            this._anyListeners = [];
        }
        return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     *
     * @public
     */
    listenersAny() {
        return this._anyListeners || [];
    }
}
exports.Socket = Socket;


/***/ }),

/***/ "./node_modules/socket.io-client/build/url.js":
/*!****************************************************!*\
  !*** ./node_modules/socket.io-client/build/url.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.url = void 0;
const parseuri = __webpack_require__(/*! parseuri */ "./node_modules/parseuri/index.js");
const debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("socket.io-client:url");
/**
 * URL parser.
 *
 * @param uri - url
 * @param path - the request path of the connection
 * @param loc - An object meant to mimic window.location.
 *        Defaults to window.location.
 * @public
 */
function url(uri, path = "", loc) {
    let obj = uri;
    // default to window.location
    loc = loc || (typeof location !== "undefined" && location);
    if (null == uri)
        uri = loc.protocol + "//" + loc.host;
    // relative path support
    if (typeof uri === "string") {
        if ("/" === uri.charAt(0)) {
            if ("/" === uri.charAt(1)) {
                uri = loc.protocol + uri;
            }
            else {
                uri = loc.host + uri;
            }
        }
        if (!/^(https?|wss?):\/\//.test(uri)) {
            debug("protocol-less url %s", uri);
            if ("undefined" !== typeof loc) {
                uri = loc.protocol + "//" + uri;
            }
            else {
                uri = "https://" + uri;
            }
        }
        // parse
        debug("parse %s", uri);
        obj = parseuri(uri);
    }
    // make sure we treat `localhost:80` and `localhost` equally
    if (!obj.port) {
        if (/^(http|ws)$/.test(obj.protocol)) {
            obj.port = "80";
        }
        else if (/^(http|ws)s$/.test(obj.protocol)) {
            obj.port = "443";
        }
    }
    obj.path = obj.path || "/";
    const ipv6 = obj.host.indexOf(":") !== -1;
    const host = ipv6 ? "[" + obj.host + "]" : obj.host;
    // define unique id
    obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
    // define href
    obj.href =
        obj.protocol +
            "://" +
            host +
            (loc && loc.port === obj.port ? "" : ":" + obj.port);
    return obj;
}
exports.url = url;


/***/ }),

/***/ "./node_modules/socket.io-client/wrapper.mjs":
/*!***************************************************!*\
  !*** ./node_modules/socket.io-client/wrapper.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Manager": () => (/* binding */ Manager),
/* harmony export */   "io": () => (/* reexport default export from named module */ _build_index_js__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _build_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./build/index.js */ "./node_modules/socket.io-client/build/index.js");


const Manager = _build_index_js__WEBPACK_IMPORTED_MODULE_0__.Manager;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_build_index_js__WEBPACK_IMPORTED_MODULE_0__);


/***/ }),

/***/ "./node_modules/socket.io-parser/dist/binary.js":
/*!******************************************************!*\
  !*** ./node_modules/socket.io-parser/dist/binary.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.reconstructPacket = exports.deconstructPacket = void 0;
const is_binary_1 = __webpack_require__(/*! ./is-binary */ "./node_modules/socket.io-parser/dist/is-binary.js");
/**
 * Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @public
 */
function deconstructPacket(packet) {
    const buffers = [];
    const packetData = packet.data;
    const pack = packet;
    pack.data = _deconstructPacket(packetData, buffers);
    pack.attachments = buffers.length; // number of binary 'attachments'
    return { packet: pack, buffers: buffers };
}
exports.deconstructPacket = deconstructPacket;
function _deconstructPacket(data, buffers) {
    if (!data)
        return data;
    if (is_binary_1.isBinary(data)) {
        const placeholder = { _placeholder: true, num: buffers.length };
        buffers.push(data);
        return placeholder;
    }
    else if (Array.isArray(data)) {
        const newData = new Array(data.length);
        for (let i = 0; i < data.length; i++) {
            newData[i] = _deconstructPacket(data[i], buffers);
        }
        return newData;
    }
    else if (typeof data === "object" && !(data instanceof Date)) {
        const newData = {};
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                newData[key] = _deconstructPacket(data[key], buffers);
            }
        }
        return newData;
    }
    return data;
}
/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @public
 */
function reconstructPacket(packet, buffers) {
    packet.data = _reconstructPacket(packet.data, buffers);
    packet.attachments = undefined; // no longer useful
    return packet;
}
exports.reconstructPacket = reconstructPacket;
function _reconstructPacket(data, buffers) {
    if (!data)
        return data;
    if (data && data._placeholder) {
        return buffers[data.num]; // appropriate buffer (should be natural order anyway)
    }
    else if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            data[i] = _reconstructPacket(data[i], buffers);
        }
    }
    else if (typeof data === "object") {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                data[key] = _reconstructPacket(data[key], buffers);
            }
        }
    }
    return data;
}


/***/ }),

/***/ "./node_modules/socket.io-parser/dist/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/socket.io-parser/dist/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Decoder = exports.Encoder = exports.PacketType = exports.protocol = void 0;
const Emitter = __webpack_require__(/*! component-emitter */ "./node_modules/component-emitter/index.js");
const binary_1 = __webpack_require__(/*! ./binary */ "./node_modules/socket.io-parser/dist/binary.js");
const is_binary_1 = __webpack_require__(/*! ./is-binary */ "./node_modules/socket.io-parser/dist/is-binary.js");
const debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("socket.io-parser");
/**
 * Protocol version.
 *
 * @public
 */
exports.protocol = 5;
var PacketType;
(function (PacketType) {
    PacketType[PacketType["CONNECT"] = 0] = "CONNECT";
    PacketType[PacketType["DISCONNECT"] = 1] = "DISCONNECT";
    PacketType[PacketType["EVENT"] = 2] = "EVENT";
    PacketType[PacketType["ACK"] = 3] = "ACK";
    PacketType[PacketType["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
    PacketType[PacketType["BINARY_EVENT"] = 5] = "BINARY_EVENT";
    PacketType[PacketType["BINARY_ACK"] = 6] = "BINARY_ACK";
})(PacketType = exports.PacketType || (exports.PacketType = {}));
/**
 * A socket.io Encoder instance
 */
class Encoder {
    /**
     * Encode a packet as a single string if non-binary, or as a
     * buffer sequence, depending on packet type.
     *
     * @param {Object} obj - packet object
     */
    encode(obj) {
        debug("encoding packet %j", obj);
        if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
            if (is_binary_1.hasBinary(obj)) {
                obj.type =
                    obj.type === PacketType.EVENT
                        ? PacketType.BINARY_EVENT
                        : PacketType.BINARY_ACK;
                return this.encodeAsBinary(obj);
            }
        }
        return [this.encodeAsString(obj)];
    }
    /**
     * Encode packet as string.
     */
    encodeAsString(obj) {
        // first is type
        let str = "" + obj.type;
        // attachments if we have them
        if (obj.type === PacketType.BINARY_EVENT ||
            obj.type === PacketType.BINARY_ACK) {
            str += obj.attachments + "-";
        }
        // if we have a namespace other than `/`
        // we append it followed by a comma `,`
        if (obj.nsp && "/" !== obj.nsp) {
            str += obj.nsp + ",";
        }
        // immediately followed by the id
        if (null != obj.id) {
            str += obj.id;
        }
        // json data
        if (null != obj.data) {
            str += JSON.stringify(obj.data);
        }
        debug("encoded %j as %s", obj, str);
        return str;
    }
    /**
     * Encode packet as 'buffer sequence' by removing blobs, and
     * deconstructing packet into object with placeholders and
     * a list of buffers.
     */
    encodeAsBinary(obj) {
        const deconstruction = binary_1.deconstructPacket(obj);
        const pack = this.encodeAsString(deconstruction.packet);
        const buffers = deconstruction.buffers;
        buffers.unshift(pack); // add packet info to beginning of data list
        return buffers; // write all the buffers
    }
}
exports.Encoder = Encoder;
/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 */
class Decoder extends Emitter {
    constructor() {
        super();
    }
    /**
     * Decodes an encoded packet string into packet JSON.
     *
     * @param {String} obj - encoded packet
     */
    add(obj) {
        let packet;
        if (typeof obj === "string") {
            packet = this.decodeString(obj);
            if (packet.type === PacketType.BINARY_EVENT ||
                packet.type === PacketType.BINARY_ACK) {
                // binary packet's json
                this.reconstructor = new BinaryReconstructor(packet);
                // no attachments, labeled binary but no binary data to follow
                if (packet.attachments === 0) {
                    super.emit("decoded", packet);
                }
            }
            else {
                // non-binary full packet
                super.emit("decoded", packet);
            }
        }
        else if (is_binary_1.isBinary(obj) || obj.base64) {
            // raw binary data
            if (!this.reconstructor) {
                throw new Error("got binary data when not reconstructing a packet");
            }
            else {
                packet = this.reconstructor.takeBinaryData(obj);
                if (packet) {
                    // received final buffer
                    this.reconstructor = null;
                    super.emit("decoded", packet);
                }
            }
        }
        else {
            throw new Error("Unknown type: " + obj);
        }
    }
    /**
     * Decode a packet String (JSON data)
     *
     * @param {String} str
     * @return {Object} packet
     */
    decodeString(str) {
        let i = 0;
        // look up type
        const p = {
            type: Number(str.charAt(0)),
        };
        if (PacketType[p.type] === undefined) {
            throw new Error("unknown packet type " + p.type);
        }
        // look up attachments if type binary
        if (p.type === PacketType.BINARY_EVENT ||
            p.type === PacketType.BINARY_ACK) {
            const start = i + 1;
            while (str.charAt(++i) !== "-" && i != str.length) { }
            const buf = str.substring(start, i);
            if (buf != Number(buf) || str.charAt(i) !== "-") {
                throw new Error("Illegal attachments");
            }
            p.attachments = Number(buf);
        }
        // look up namespace (if any)
        if ("/" === str.charAt(i + 1)) {
            const start = i + 1;
            while (++i) {
                const c = str.charAt(i);
                if ("," === c)
                    break;
                if (i === str.length)
                    break;
            }
            p.nsp = str.substring(start, i);
        }
        else {
            p.nsp = "/";
        }
        // look up id
        const next = str.charAt(i + 1);
        if ("" !== next && Number(next) == next) {
            const start = i + 1;
            while (++i) {
                const c = str.charAt(i);
                if (null == c || Number(c) != c) {
                    --i;
                    break;
                }
                if (i === str.length)
                    break;
            }
            p.id = Number(str.substring(start, i + 1));
        }
        // look up json data
        if (str.charAt(++i)) {
            const payload = tryParse(str.substr(i));
            if (Decoder.isPayloadValid(p.type, payload)) {
                p.data = payload;
            }
            else {
                throw new Error("invalid payload");
            }
        }
        debug("decoded %s as %j", str, p);
        return p;
    }
    static isPayloadValid(type, payload) {
        switch (type) {
            case PacketType.CONNECT:
                return typeof payload === "object";
            case PacketType.DISCONNECT:
                return payload === undefined;
            case PacketType.CONNECT_ERROR:
                return typeof payload === "string" || typeof payload === "object";
            case PacketType.EVENT:
            case PacketType.BINARY_EVENT:
                return Array.isArray(payload) && payload.length > 0;
            case PacketType.ACK:
            case PacketType.BINARY_ACK:
                return Array.isArray(payload);
        }
    }
    /**
     * Deallocates a parser's resources
     */
    destroy() {
        if (this.reconstructor) {
            this.reconstructor.finishedReconstruction();
        }
    }
}
exports.Decoder = Decoder;
function tryParse(str) {
    try {
        return JSON.parse(str);
    }
    catch (e) {
        return false;
    }
}
/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 */
class BinaryReconstructor {
    constructor(packet) {
        this.packet = packet;
        this.buffers = [];
        this.reconPack = packet;
    }
    /**
     * Method to be called when binary data received from connection
     * after a BINARY_EVENT packet.
     *
     * @param {Buffer | ArrayBuffer} binData - the raw binary data received
     * @return {null | Object} returns null if more binary data is expected or
     *   a reconstructed packet object if all buffers have been received.
     */
    takeBinaryData(binData) {
        this.buffers.push(binData);
        if (this.buffers.length === this.reconPack.attachments) {
            // done with buffer list
            const packet = binary_1.reconstructPacket(this.reconPack, this.buffers);
            this.finishedReconstruction();
            return packet;
        }
        return null;
    }
    /**
     * Cleans up binary packet reconstruction variables.
     */
    finishedReconstruction() {
        this.reconPack = null;
        this.buffers = [];
    }
}


/***/ }),

/***/ "./node_modules/socket.io-parser/dist/is-binary.js":
/*!*********************************************************!*\
  !*** ./node_modules/socket.io-parser/dist/is-binary.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hasBinary = exports.isBinary = void 0;
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const isView = (obj) => {
    return typeof ArrayBuffer.isView === "function"
        ? ArrayBuffer.isView(obj)
        : obj.buffer instanceof ArrayBuffer;
};
const toString = Object.prototype.toString;
const withNativeBlob = typeof Blob === "function" ||
    (typeof Blob !== "undefined" &&
        toString.call(Blob) === "[object BlobConstructor]");
const withNativeFile = typeof File === "function" ||
    (typeof File !== "undefined" &&
        toString.call(File) === "[object FileConstructor]");
/**
 * Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
 *
 * @private
 */
function isBinary(obj) {
    return ((withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj))) ||
        (withNativeBlob && obj instanceof Blob) ||
        (withNativeFile && obj instanceof File));
}
exports.isBinary = isBinary;
function hasBinary(obj, toJSON) {
    if (!obj || typeof obj !== "object") {
        return false;
    }
    if (Array.isArray(obj)) {
        for (let i = 0, l = obj.length; i < l; i++) {
            if (hasBinary(obj[i])) {
                return true;
            }
        }
        return false;
    }
    if (isBinary(obj)) {
        return true;
    }
    if (obj.toJSON &&
        typeof obj.toJSON === "function" &&
        arguments.length === 1) {
        return hasBinary(obj.toJSON(), true);
    }
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
            return true;
        }
    }
    return false;
}
exports.hasBinary = hasBinary;


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./style.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


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

/***/ "./node_modules/yeast/index.js":
/*!*************************************!*\
  !*** ./node_modules/yeast/index.js ***!
  \*************************************/
/***/ ((module) => {

"use strict";


var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('')
  , length = 64
  , map = {}
  , seed = 0
  , i = 0
  , prev;

/**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 * @api public
 */
function encode(num) {
  var encoded = '';

  do {
    encoded = alphabet[num % length] + encoded;
    num = Math.floor(num / length);
  } while (num > 0);

  return encoded;
}

/**
 * Return the integer value specified by the given string.
 *
 * @param {String} str The string to convert.
 * @returns {Number} The integer value represented by the string.
 * @api public
 */
function decode(str) {
  var decoded = 0;

  for (i = 0; i < str.length; i++) {
    decoded = decoded * length + map[str.charAt(i)];
  }

  return decoded;
}

/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */
function yeast() {
  var now = encode(+new Date());

  if (now !== prev) return seed = 0, prev = now;
  return now +'.'+ encode(seed++);
}

//
// Map each character to its index.
//
for (; i < length; i++) map[alphabet[i]] = i;

//
// Expose the `yeast`, `encode` and `decode` functions.
//
yeast.encode = encode;
yeast.decode = decode;
module.exports = yeast;


/***/ }),

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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


/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ "./src/board.js");


class Game {
    constructor(socket, room) {
        this.socket = socket;
        this.room = room;
        /* this.player = [rowIdx, colIdx] */
        this.player1ID = room.player1;
        this.player2ID = room.player2;
        this.board = new _board__WEBPACK_IMPORTED_MODULE_0__.default(this.player1ID, this.player2ID);
        this.grid = this.board.grid;
        this.currentPlayer = "noone";
        this.player1 = [8, 4];
        this.player2 = [0, 4];
        this.player1Walls = 10;
        this.player2Walls = 10;
        this.state = "not doing anything";
        this.util;
        

        this.movePlayer = this.movePlayer.bind(this);
    }

    isOver() {
        this.util.trackFunctions("isOver");
        if (this.winner() !== null) {
            return true;
        } else {
            return false;
        }
    }

    // computerAiTurn() {
    //     this.util.trackFunctions("computerAiTurn");
    //     if(this.currentPlayer === "player2") {
    //         let p2Path = this.board.bfs(this.player2, ["80","81","82","83","84","85","86","87","88"])
    //         let p1Path = this.board.bfs(this.player1);
    //         let random = Math.floor(Math.random() * 2);
    //         if ((p1Path[1].length <= p2Path[1].length) && (this.player2Walls > 0)) {
    //             /* place wall if player1 is closer to goal */
    //             for(let i = 0; i < p1Path[1].length; i++) {
    //                 let rowIdx = p1Path[1][i].split("")[0];
    //                 let colIdx = p1Path[1][i].split("")[1];   
    //                 let nextRowIdx = p1Path[1][i + 1].split("")[0];
    //                 let nextColIdx = p1Path[1][i + 1].split("")[1];
    //                 let placedWall = false;
    //                 let squareA = [parseInt(nextRowIdx), parseInt(nextColIdx)];
    //                 let squareNeighbors = this.board.checkNeighbors(squareA);
    //                 let squareB;
    //                 /* 
    //                 left and up 
    //                 placeWall(dir, event, squareA, squareB)
    //                 dir = North, South, East, West
    //                 event = null
    //                 squareA = [rowIdx, colIdx]
    //                 squareB = [rowIdx, colIdx]
    //                 */
    //                 if(colIdx === nextColIdx) {
    //                     /*
    //                     path is moving up or down
    //                     check neighbors and set squareB to a valid one
    //                     neighbors = [north, south, west, east]
    //                     use random if you want
    //                     squareA = next best pos of player1 (opponent)
    //                     squareB = square to the west of squareA
    //                      */
    //                     if(random === 0) {
    //                         if (squareNeighbors[2][0] !== -1) {
    //                             squareB = squareNeighbors[2];
    //                         } else {
    //                             squareB = squareNeighbors[3];
    //                         }
    //                     } else {
    //                         if (squareNeighbors[3][0] !== -1) {
    //                             squareB = squareNeighbors[3];
    //                         } else {
    //                             squareB = squareNeighbors[2];
    //                         }
    //                     }
    //                     placedWall = this.placeWall("South", squareA, squareB);
    //                     if (placedWall === true) {
    //                         break;
    //                     } else {
    //                     }
    //                 }
    //                 if (rowIdx === nextRowIdx) {

    //                     if(random === 0) {
    //                         if (squareNeighbors[0][0] !== -1) {
    //                             squareB = squareNeighbors[0];
    //                         } else {
    //                             squareB = squareNeighbors[1];
    //                         }
    //                     } else {
    //                         if (squareNeighbors[1][0] !== -1) {
    //                             squareB = squareNeighbors[1];
    //                         } else {
    //                             squareB = squareNeighbors[0];
    //                         }
    //                     }

    //                     if (colIdx > nextColIdx) {
    //                         placedWall = this.placeWall("East", squareA, squareB);
    //                         if (placedWall === true) {
    //                             break;
    //                         }
    //                     } else {
    //                         placedWall = this.placeWall("West", squareA, squareB);
    //                         if (placedWall === true) {
    //                             break;
    //                         }
    //                     }
    //                 }
    //             }

    //         } else {
    //             /* move player2 towards goal */
    //             let currRow = p2Path[1][0].split("")[0];
    //             let currCol = p2Path[1][0].split("")[1];
    //             let moves = this.getAvailableMoves([parseInt(currRow), parseInt(currCol)]);
    //             for (let i = 0; i < moves.length; i++) {
    //                 let move = moves[i].join("");
    //                 if (p2Path[1].includes(move)){
    //                     this.movePlayer(moves[i]);
    //                 }
    //             }
    //         }
    //     }
    // }

    winner() {
        this.util.trackFunctions("winner");
        let winner = null;
        for(let i = 0; i < this.grid[0].length; i++) {
            if(this.grid[0][i].player === this.player1ID) {
                winner = this.player1ID;
            }
            if(this.grid[8][i].player === this.player2ID) {
                winner = this.player2ID;
            }
        }
        return winner;
    }

    takeTurn(action, dir = null, event, squareA = null, squareB = null) {
        this.util.trackFunctions("takeTurn");
        // movement or wall placement?

        if (action === "move") {
            if(dir === null) {
                this.movePlayer(event.target.id.split(""));
            }
        }

        if (action === "placeWall") {
            this.placeWall(dir, squareA, squareB);
        }

    }

    placeWall(dir, squareA, squareB) {
        this.util.trackFunctions("placeWall");
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
        this.currentPlayer === this.player1ID ? playerWalls = this.player1Walls : playerWalls = this.player2Walls
        if (playerWalls > 0) {

            if(dir === "North" && (!sqrA.walls.North && !sqrB.walls.North)){
                sqrA.walls.North = true;
                sqrB.walls.North = true;
                /* sets the north neighbors south wall to true */
                this.grid[neighborsA[0][0]][neighborsA[0][1]].walls.South = true;
                this.grid[neighborsB[0][0]][neighborsB[0][1]].walls.South = true;
                isValidWall = this.findPath();
                if(isValidWall) {
                    if (this.currentPlayer === this.player1ID) this.player1Walls = this.player1Walls - 1;
                    if (this.currentPlayer === this.player2ID) this.player2Walls = this.player2Walls - 1;
                    this.socket.emit('placeWall', { roomId: this.room.id, 
                                                    dir: "north",
                                                    wallA: [sqrA.rowIdx, sqrA.colIdx],
                                                    wallB: [sqrB.rowIdx, sqrB.colIdx],
                                                    wallC: [neighborsA[0][0], neighborsA[0][1]], 
                                                    wallD: [neighborsB[0][0], neighborsB[0][1]], 
                                                    player: this.currentPlayer});
                    // this.swapTurn();
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
                    if (this.currentPlayer === this.player1ID) this.player1Walls = this.player1Walls - 1;
                    if (this.currentPlayer === this.player2ID) this.player2Walls = this.player2Walls - 1;
                    this.socket.emit('placeWall', { roomId: this.room.id, 
                                                    dir: "east",
                                                    wallA: [sqrA.rowIdx, sqrA.colIdx],
                                                    wallB: [sqrB.rowIdx, sqrB.colIdx],
                                                    wallC: [neighborsA[3][0], neighborsA[3][1]], 
                                                    wallD: [neighborsB[3][0], neighborsB[3][1]], 
                                                    player: this.currentPlayer});
                    // this.swapTurn();
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
                    if (this.currentPlayer === this.player1ID) this.player1Walls = this.player1Walls - 1;
                    if (this.currentPlayer === this.player2ID) this.player2Walls = this.player2Walls - 1;
                    this.socket.emit('placeWall', { roomId: this.room.id, 
                                                    dir: "south",
                                                    wallA: [sqrA.rowIdx, sqrA.colIdx],
                                                    wallB: [sqrB.rowIdx, sqrB.colIdx],
                                                    wallC: [neighborsA[1][0], neighborsA[1][1]], 
                                                    wallD: [neighborsB[1][0], neighborsB[1][1]], 
                                                    player: this.currentPlayer});
                    // this.swapTurn();
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
                    if (this.currentPlayer === this.player1ID) this.player1Walls = this.player1Walls - 1;
                    if (this.currentPlayer === this.player2ID) this.player2Walls = this.player2Walls - 1;
                    this.socket.emit('placeWall', { roomId: this.room.id, 
                                                    dir: "west",
                                                    wallA: [sqrA.rowIdx, sqrA.colIdx],
                                                    wallB: [sqrB.rowIdx, sqrB.colIdx],
                                                    wallC: [neighborsA[2][0], neighborsA[2][1]], 
                                                    wallD: [neighborsB[2][0], neighborsB[2][1]], 
                                                    player: this.currentPlayer});
                    // this.swapTurn();
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
        this.util.trackFunctions("movePlayer");
        // takes current player current pos
        // calculates future pos with dir
        let player;
        this.currentPlayer === this.player1ID ? player = this.player1 : player = this.player2
        let newColIdx;
        let newRowIdx;
        let isWalled;
        let isValid;
    
        newRowIdx = parseInt(dir[0]);
        newColIdx = parseInt(dir[1]);

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
                this.socket.emit('playerMove', {roomId: this.room.id, 
                                                oldPos: [oldSquare.rowIdx, oldSquare.colIdx], 
                                                newPos: [newSquare.rowIdx, newSquare.colIdx], 
                                                player: this.currentPlayer})
                // this.swapTurn();
            }


        } else {
            // else then does nothing or sends error message
            //    does not swap turns

        }
    }

    getAvailableMoves(pos) {
        this.util.trackFunctions("getAvailableMoves");
        /* pos = [row, col] */
        let moves = [];
        let currentSquare = this.grid[pos[0]][pos[1]];
        let square;
        let colIdx = pos[1];
        let rowIdx  = pos[0];

        /* 
        pattern for these next four if statement blocks

        if position is on the board and there is not wall
            if position has no player on it
            else if position has a player on it
            *** getting the available move that hops the opponent ***
                if no obstructions for a straight hop => add that move
                else 
                    tempsquare is destination of a staight hop
                    if wall is an obstruction for a straight hop
                        add a diagonal hop if not obstructed by a wall
                    else if tempsquare is off the board
                        add a diagonal hop if not obstructed by a wall

         */

        if ((rowIdx - 1 >= 0) && (!currentSquare.walls.North)) {
            square = this.grid[rowIdx - 1][colIdx];
            if (square.player === "empty") {
                moves.push([rowIdx - 1, colIdx]);  // north
            } else if ([this.player1ID, this.player2ID].includes(square.player)){
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
            } else if ([this.player1ID, this.player2ID].includes(square.player)){
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
            } else if ([this.player1ID, this.player2ID].includes(square.player)){
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
            } else if ([this.player1ID, this.player2ID].includes(square.player)){
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
        
        return moves;
    }


    setPlayerPos(player, pos) {
        this.util.trackFunctions("setPlayerPos");
        if (player === this.player1ID) {
            this.player1 = pos;
        } else if (player === this.player2ID) {
            this.player2 = pos;
        }
    }

    start() {
        this.util.trackFunctions("start");
        this.board.setPlayers(true, this.player1, true, this.player2);
        this.currentPlayer = this.player1ID;
    }

    swapTurn() {
        this.util.trackFunctions("swapTurn");
        if( this.currentPlayer === this.player1ID ) {
            this.currentPlayer = this.player2ID;
        } else if( this.currentPlayer === this.player2ID ) {
            this.currentPlayer = this.player1ID;
        }
    }

    findPath() {
        this.util.trackFunctions("findPath");
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameView)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.js");


class GameView {
    constructor(socket, room, game) {
        this.socket = socket;
        this.room = room;
        this.body = document.querySelector("body");
        this.game = game;
        this.board = this.game.board;
        this.grid = this.board.grid;
        this.squareA = null;
        this.squareB = null;
        this.neighbors = null;  
        this.availableMoves = [];

        this.winner = null;

        this.util = new _util__WEBPACK_IMPORTED_MODULE_0__.default();
        this.game.util = this.util;
        this.game.board.util = this.util;
        this.setupBoard();
        this.setupEventListeners();
    }

    show() {
        this.util.trackFunctions("show");
        // this.game.computerAiTurn();
        this.showBoard();
        if (this.game.isOver()) {
            if(this.game.currentPlayer !== "noone") {
                if (!this.winner) {
                    if (this.game.currentPlayer === this.game.player2ID) this.winner = this.room.player1;
                    if (this.game.currentPlayer === this.game.player1ID) this.winner = this.room.player2;
                    this.socket.emit('winner', this.room.id, this.winner);
                    // let table = document.getElementsByClassName("table")[0];
                    // this.createRestartDiv(table, winner);
                    // this.game.currentPlayer = "noone";
                    // this.showBoard();
                    // table.remove();
                    // let restart = document.createElement("div");
        
                    // location.reload();
                }
            }
        }
    }

    showBoard() {
        this.util.trackFunctions("showBoard");
        for(let rowIdx = 0; rowIdx  < this.grid.length; rowIdx++) {
            for (let colIdx = 0; colIdx < this.grid[rowIdx].length; colIdx++)
            {
                let square = this.grid[rowIdx][colIdx];
                let id = (rowIdx).toString() + (colIdx).toString();
                let ele = document.getElementById(id);
                if(square.player === this.game.player1ID) {
                    ele.classList.add("player");
                    ele.innerHTML = "&#x265F";
                } else if(square.player === this.game.player2ID) {
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
        if ((this.game.currentPlayer === this.game.player1ID) && (this.game.player1Walls === 0)) {
            btn.classList.add("hide");
        } else if ((this.game.currentPlayer === this.game.player2ID) && (this.game.player2Walls === 0)){
            btn.classList.add("hide");
        } else {
            if (this.game.state === "not doing anything") {
                if (btn.classList.contains("hide")) btn.classList.remove("hide");
            }
        }
        const playersTurn = this.game.currentPlayer === this.socket.id ? 'Your' : "Opponent's";
        document.getElementById("player-turn").innerHTML = `${playersTurn} turn`;
    }

    setupEventListeners() {
        this.util.trackFunctions("setupEventListeners");

        this.body.addEventListener("click", (event) => {
            if (this.socket.id === this.game.currentPlayer) {
            // if (true) { // testing purposes
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
            } else {
            }
        }, false);
    } 

    handlePlaceWallButton(event) {
        this.util.trackFunctions("handlePlaceWallButton");
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
        this.util.trackFunctions("handleSquareClick");
        if (this.game.currentPlayer !== "noone") {
            //wait for client to click two valid squares
            let target = event.target;
            
            if ((target.classList.contains("floor")) && (this.squareA === null)) {
                event.target.classList.add("selectedWall");
                this.squareA = target.id;
                //parse squareA
                // squareA = "00" and needs to be [0, 0]
                let square = this.squareA.split("");
                square[0] = parseInt(square[0]);
                square[1] = parseInt(square[1]);
                //get neighbors
                // returns [[north],[east],[south],[west]]
                this.neighbors = this.board.checkNeighbors(square);

                for(let i = 0; i < this.neighbors.length; i++) {
                    if(this.neighbors[i][0] !== -1) {
                        let id = this.neighbors[i].join("");
                        document.getElementById(id).classList.add("highlight");
                    }
                }
                this.changeNeighborsArrayToString(this.neighbors);  
    
            } else if ((target.classList.contains("floor")) && (this.squareA !== null) && (this.squareB === null)) {
                if(!!this.neighbors.includes(target.id)) {
                    this.squareB = target.id;
                }
            }
    
            if (this.squareA !== null && this.squareB !== null) {
                // should create two buttons depending on squareA and squareB orientation
                this.body.getElementsByClassName("clickInstruct")[0].classList.add("hide");

                const A = this.grid[this.squareA.split("")[0]][this.squareA.split("")[1]];
                const B = this.grid[this.squareB.split("")[0]][this.squareB.split("")[1]];
                
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
                
                for(let i = 0; i < this.neighbors.length; i++) {
                    if(!this.neighbors[i].includes("-")) {
                        let id = this.neighbors[i];
                        document.getElementById(id).classList.remove("highlight");
                    }
                }
                this.neighbors = [];
                event.target.classList.add("selectedWall");
                this.game.state = "selecting wall type";
                
            }
        }
    }

    handleWallTypeButton(dir, event) {
        this.util.trackFunctions("handleWallTypeButton");

        let selectedWalls = document.getElementsByClassName("selectedWall");
        for (let i = 0; i < selectedWalls.length; i++) {
            let wall = selectedWalls[i];
            setTimeout(() => {
                wall.classList.remove("selectedWall");
            },0);
        }

        /* game logic */
        this.game.takeTurn("placeWall", dir, event, this.squareA, this.squareB);

        /* stylize */
        this.body.getElementsByClassName("north")[0].classList.add("hide");
        this.body.getElementsByClassName("east")[0].classList.add("hide");
        this.body.getElementsByClassName("south")[0].classList.add("hide");
        this.body.getElementsByClassName("west")[0].classList.add("hide");
        this.body.getElementsByClassName("button")[0].classList.remove("hide");
        document.getElementById("back").classList.add("hide");
        document.getElementById("move").classList.remove("hide");

        /* resetting useful variables */
        this.squareA = null;
        this.squareB = null;

        /* state change */
        this.game.state = "not doing anything";

        /* renders */
        this.show();
    }

    handleMovementButton(event) {
        this.util.trackFunctions("handleMovementButton");
        if(this.game.currentPlayer !== "noone") {
            document.getElementById("back").classList.remove("hide");
            document.getElementById("place").classList.add("hide");
            let availableMoves;
            let player = this.game.currentPlayer === this.game.player1ID ? this.game.player1 : this.game.player2;
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
        this.util.trackFunctions("handleBackButton");
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
        let selectedWalls = document.getElementsByClassName("selectedWall");
        for (let i = 0; i < selectedWalls.length; i++) {
            let wall = selectedWalls[i];
            setTimeout(() => {
                wall.classList.remove("selectedWall");
            },0);
        }
        this.availableMoves = [];
        this.show();
    }

    changeNeighborsArrayToString(array) {
        this.util.trackFunctions("changeNeighborsArrayToString");
        //changes this.neighbors to be able to be read as an array of strings
        for (let i = 0; i < array.length; i++) {
            let id = array[i].join("").toString();
            this.neighbors[i] = id;
            let ele = document.getElementById(`${id}`);
        }
    }

    createButton(innerText) {
        this.util.trackFunctions("createButton");
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
        btn.classList.add('controller-btn');
        this.body.getElementsByClassName("controller-div")[0].appendChild(btn);
        return btn;
    }

    createRestartDiv(board, winner) {
        this.util.trackFunctions("createRestartDiv");
        let div = document.createElement("div");
        let congrats = document.createElement("h1");
        let btn = document.createElement("button");
        div.setAttribute("id", "restart-div");
        btn.setAttribute("id", "restart");
        congrats.innerHTML = `Congrats to ${winner}!!!!`;
        btn.innerHTML = "Restart"
        div.appendChild(congrats);
        div.appendChild(btn);
        board.appendChild(div);
    }

    setupBoard() {
        this.util.trackFunctions("setupBoard");
        let div = document.createElement("div");
        let boardDiv = document.createElement("div");
        this.body.appendChild(div);
        let board = document.createElement("table");
        boardDiv.appendChild(board);
        div.appendChild(boardDiv);
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

        for(let rowIdx = 0; rowIdx < 9; rowIdx++) {
            let tr = document.createElement("tr");
            for(let colIdx = 0; colIdx < 9; colIdx++) {
                let td = document.createElement("td");
                td.id = `${rowIdx}${colIdx}`;
                td.classList.add("floor", "hall");
                tr.appendChild(td);
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

"use strict";
module.exports = __webpack_require__.p + "932e694c1134fb7b39f9.png";

/***/ }),

/***/ "./src/square.js":
/*!***********************!*\
  !*** ./src/square.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Util)
/* harmony export */ });
class Util {
    constructor() {
        this.map = new Map();
    }

    trackFunctions(key) {
        if(this.map[key] === undefined) {
            this.map.set(key, 1);
            return;
        }
        if (this.map[key] === 0) {
            this.map.set(key, 1);
            return;
        }
        return;
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
/******/ 		__webpack_require__.p = "/";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _icon_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./icon.png */ "./src/icon.png");
/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game_view */ "./src/game_view.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game */ "./src/game.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/wrapper.mjs");
// import _, { throttle } from 'lodash';







function iconComponent() {
    
    // Add the image to our existing div.
    const element = document.createElement('link');
    element.rel = "icon";
    element.href = _icon_png__WEBPACK_IMPORTED_MODULE_1__;
    element.type = 'image/png';

    return element;
}

function lobbySplash(socket) {
    const div = document.createElement('div');
    const createRoom = document.createElement('button');
    const joinRoom = document.createElement('button');
    div.setAttribute('id', 'splash-div');
    createRoom.setAttribute('id', 'create-room-button');
    createRoom.innerHTML = "Create A Room";
    createRoom.classList.add("btn");
    joinRoom.setAttribute('id', 'join-room-button');
    joinRoom.innerHTML = "Join A Room";
    joinRoom.classList.add("btn");
    div.appendChild(createRoom);
    div.appendChild(joinRoom);

    /** Event Listener for createRoom and joinRoom */
    createRoom.addEventListener('click', () => {
        /** deletes div and adds a form to create a room */
        div.remove();
        createRoomForm(socket);
    });
    joinRoom.addEventListener('click', () => {
        /** emits getRoomNames and make the room names buttons */
        const callback = (roomNames) => {
            const numberOfRooms = lobbyRoomsList(socket, roomNames);
            if (numberOfRooms > 0) {
                div.remove();
            } else {
                document.getElementById('lobby-rooms-list-div').remove();
            }
        };
        socket.emit('getRoomNames', callback);
    });

    document.getElementsByTagName('body')[0].appendChild(div);
}

function lobbyRoomsList(socket, roomNames) {
    const div = document.createElement('div');
    div.setAttribute('id', 'lobby-rooms-list-div');
    const ul = document.createElement('ul');
    const callback = () => {
        socket.emit('ready');
    };
    for (let i = 0; i < roomNames.length; i++) {
        if (roomNames[i].sockets < 2) {
            const li = document.createElement('li');
            const button = document.createElement('button');
            li.appendChild(button);
            button.innerHTML = roomNames[i].name;
            button.classList.add("btn");
            button.addEventListener('click', (e) => {
                div.remove();
                socket.emit('joinRoom', roomNames[i].id, callback);
            });
            ul.appendChild(li);
        }
    }
    div.appendChild(ul);
    document.getElementsByTagName('body')[0].appendChild(div);
    return roomNames.length;
}

function createRoomForm(socket) {

    const roomForm = document.createElement("form");
    const formDiv = document.createElement("div");
    const roomInput = document.createElement("input");
    const roomButton = document.createElement("button");
    roomForm.setAttribute("id", "room-form");
    formDiv.setAttribute("id", "form-div");
    roomInput.setAttribute("id", "room-input");
    roomInput.setAttribute("placeholder", "Type room name");
    roomButton.setAttribute("id", "room-button");
    roomButton.classList.add("btn");
    roomButton.innerHTML = "Go!"

    formDiv.appendChild(roomForm);
    roomForm.appendChild(roomInput);
    roomForm.appendChild(roomButton);
    document.getElementsByTagName("body")[0].appendChild(formDiv);
    


    roomForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (roomInput.value) {
            const callback = (bool) => {
                if(bool) {
                    formDiv.remove();
                    socket.emit('ready');
                } else {
                    roomInput.setAttribute("placeholder", "Room List is full");
                    setTimeout(() => {
                        location.reload();
                    }, 3000);
                }
            };
            socket.emit('createRoom', roomInput.value, callback);
            roomInput.value = '';
        }
    });

    socket.on('join-room', (roomID) => {
        formDiv.classList.add("hide");
        gameLobby(socket, roomID);
    });

    socket.on('lobby-message', ([id, msg]) => {
        let item = document.createElement('li');
        item.textContent = id + " -> " + msg;
        document.getElementById('lobby-messages').appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    });

    socket.on('start-game', ([socket, room]) => {
        if(!document.getElementsByClassName('table')[0]) {
            document.getElementById('lobby-div').classList.add("hide");
            gameTable(socket, room);
        }
        
    });
}

function gameLobby(socket, room) {
    if(!document.getElementById('lobby-div')) {
        const div = document.createElement("div");
        const h1 = document.createElement("h1")
        const ul = document.createElement("ul");
        const form = document.createElement("form");
        const input = document.createElement("input");
        const button = document.createElement("button");
        const startGame = document.createElement("button");
        div.setAttribute("id", "lobby-div");
        h1.innerHTML = room;
        h1.setAttribute("id", "lobby-id");
        ul.setAttribute("id", "lobby-messages");
        startGame.setAttribute("id", "lobby-start-game");
        startGame.innerHTML = "Start Game!";
        form.setAttribute("id", "lobby-form");
        form.setAttribute("action", "");
        input.setAttribute("id", "lobby-input");
        input.setAttribute("autocomplete", "off");
        button.innerHTML = "send";
        form.appendChild(input);
        form.appendChild(button);
        ul.appendChild(form);
        div.appendChild(h1);
        div.appendChild(ul);
        div.appendChild(startGame);
        document.getElementsByTagName("body")[0].appendChild(div);
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (input.value) {
                socket.emit('lobby-message', [room, input.value]);
                input.value = '';
            }
        });
        startGame.addEventListener('click', (e) => {
            socket.emit('start-game', [socket.id, room]);
        })
    }
}

function gameTable(socket, JSONroom) {
    const room = JSON.parse(JSONroom);
    const game = new _game__WEBPACK_IMPORTED_MODULE_3__.default(socket, room);
    let winner = null;
    // setupBoard();
    const gameView = new _game_view__WEBPACK_IMPORTED_MODULE_2__.default(socket, room, game);
    game.start();
    gameView.show();

    socket.on('playerMove', (data) => {
        let oldRow = data.oldPos[0];
        let oldCol = data.oldPos[1];
        let newRow = data.newPos[0];
        let newCol = data.newPos[1];
        game.board.grid[oldRow][oldCol].player = "empty";
        game.board.grid[newRow][newCol].player = data.player;
        game.swapTurn();
        gameView.show();
    });

    socket.on('placeWall', (data) => {
        const posA = data.wallA;
        const posB = data.wallB;
        const posC = data.wallC;
        const posD = data.wallD;
        const sqrA = game.board.grid[posA[0]][posA[1]];
        const sqrB = game.board.grid[posB[0]][posB[1]];
        const sqrC = game.board.grid[posC[0]][posC[1]];
        const sqrD = game.board.grid[posD[0]][posD[1]];
        if ( data.dir === "north" ) {
            sqrA.walls.North = true;
            sqrB.walls.North = true;
            sqrC.walls.South = true;
            sqrD.walls.South = true;
        } else if (data.dir === "south" ) {
            sqrA.walls.South = true;
            sqrB.walls.South = true;
            sqrC.walls.North = true;
            sqrD.walls.North = true;
        } else if (data.dir === "east" ) {
            sqrA.walls.East = true;
            sqrB.walls.East = true;
            sqrC.walls.West = true;
            sqrD.walls.West = true;
        } else if (data.dir === "west" ) {
            sqrA.walls.West = true;
            sqrB.walls.West = true;
            sqrC.walls.East = true;
            sqrD.walls.East = true;
        } else {
        }
        game.swapTurn();
        gameView.show();
    });

    socket.on('gameOver', (id) => {
        game.currentPlayer = "noone";
        let table = document.getElementsByClassName('table')[0];
        if (table) {
            table.remove();
        } 
        if (!winner) {
            winner = id;
            gameOver(socket.id, id);
        }
    });
}

/**
 * 
 * @param {winner} winner Is an ID of the winner of the game.
 * Displays the winner and then reloads the page. 
 */
function gameOver(socketId, winner) {
    const div = document.createElement('div');
    div.setAttribute("id", "winner-div");
    const message = document.createElement('h1');
    message.setAttribute("id", "winner-message");
    message.innerHTML = socketId === winner ? "CONGRATS YOU WON!!!" : "sucks to suck.. try again next time";
    div.appendChild(message);
    document.getElementsByTagName("body")[0].appendChild(div);
    setTimeout(() => {
        location.reload();
    },5000);
}

document.head.appendChild(iconComponent());



document.addEventListener("DOMContentLoaded", function () {
    
    const socket = (0,socket_io_client__WEBPACK_IMPORTED_MODULE_4__.io)();
    // const room = {
    //     id: "xxxxxxx", 
    //     name: "room", 
    //     sockets: ["test1", "test2"],
    //     player1: 'test1',
    //     player2: 'test2',
    // };
    // gameTable(socket, JSON.stringify(room));

    lobbySplash(socket);

    socket.on('initGame', (room) => {
        gameTable(socket, room);
    });

});




})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9xdW9yaWRvci8uL25vZGVfbW9kdWxlcy9iYWNrbzIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcXVvcmlkb3IvLi9ub2RlX21vZHVsZXMvYmFzZTY0LWFycmF5YnVmZmVyL2xpYi9iYXNlNjQtYXJyYXlidWZmZXIuanMiLCJ3ZWJwYWNrOi8vcXVvcmlkb3IvLi9ub2RlX21vZHVsZXMvY29tcG9uZW50LWVtaXR0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcXVvcmlkb3IvLi9zcmMvc3R5bGUuc2NzcyIsIndlYnBhY2s6Ly9xdW9yaWRvci8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vcXVvcmlkb3IvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qcyIsIndlYnBhY2s6Ly9xdW9yaWRvci8uL25vZGVfbW9kdWxlcy9kZWJ1Zy9ub2RlX21vZHVsZXMvbXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcXVvcmlkb3IvLi9ub2RlX21vZHVsZXMvZGVidWcvc3JjL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vcXVvcmlkb3IvLi9ub2RlX21vZHVsZXMvZGVidWcvc3JjL2NvbW1vbi5qcyIsIndlYnBhY2s6Ly9xdW9yaWRvci8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2xpYi9nbG9iYWxUaGlzLmJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vcXVvcmlkb3IvLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcXVvcmlkb3IvLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9saWIvc29ja2V0LmpzIiwid2VicGFjazovL3F1b3JpZG9yLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvbGliL3RyYW5zcG9ydC5qcyIsIndlYnBhY2s6Ly9xdW9yaWRvci8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2xpYi90cmFuc3BvcnRzL2luZGV4LmpzIiwid2VicGFjazovL3F1b3JpZG9yLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvbGliL3RyYW5zcG9ydHMvcG9sbGluZy1qc29ucC5qcyIsIndlYnBhY2s6Ly9xdW9yaWRvci8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2xpYi90cmFuc3BvcnRzL3BvbGxpbmcteGhyLmpzIiwid2VicGFjazovL3F1b3JpZG9yLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvbGliL3RyYW5zcG9ydHMvcG9sbGluZy5qcyIsIndlYnBhY2s6Ly9xdW9yaWRvci8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2xpYi90cmFuc3BvcnRzL3dlYnNvY2tldC1jb25zdHJ1Y3Rvci5icm93c2VyLmpzIiwid2VicGFjazovL3F1b3JpZG9yLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvbGliL3RyYW5zcG9ydHMvd2Vic29ja2V0LmpzIiwid2VicGFjazovL3F1b3JpZG9yLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvbGliL3V0aWwuanMiLCJ3ZWJwYWNrOi8vcXVvcmlkb3IvLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9saWIveG1saHR0cHJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vcXVvcmlkb3IvLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLXBhcnNlci9saWIvY29tbW9ucy5qcyIsIndlYnBhY2s6Ly9xdW9yaWRvci8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tcGFyc2VyL2xpYi9kZWNvZGVQYWNrZXQuYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9xdW9yaWRvci8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tcGFyc2VyL2xpYi9lbmNvZGVQYWNrZXQuYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9xdW9yaWRvci8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tcGFyc2VyL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9xdW9yaWRvci8uL25vZGVfbW9kdWxlcy9oYXMtY29ycy9pbmRleC5qcyIsIndlYnBhY2s6Ly9xdW9yaWRvci8uL25vZGVfbW9kdWxlcy9wYXJzZXFzL2luZGV4LmpzIiwid2VicGFjazovL3F1b3JpZG9yLy4vbm9kZV9tb2R1bGVzL3BhcnNldXJpL2luZGV4LmpzIiwid2VicGFjazovL3F1b3JpZG9yLy4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1jbGllbnQvYnVpbGQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcXVvcmlkb3IvLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9idWlsZC9tYW5hZ2VyLmpzIiwid2VicGFjazovL3F1b3JpZG9yLy4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1jbGllbnQvYnVpbGQvb24uanMiLCJ3ZWJwYWNrOi8vcXVvcmlkb3IvLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9idWlsZC9zb2NrZXQuanMiLCJ3ZWJwYWNrOi8vcXVvcmlkb3IvLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9idWlsZC91cmwuanMiLCJ3ZWJwYWNrOi8vcXVvcmlkb3IvLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC93cmFwcGVyLm1qcyIsIndlYnBhY2s6Ly9xdW9yaWRvci8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tcGFyc2VyL2Rpc3QvYmluYXJ5LmpzIiwid2VicGFjazovL3F1b3JpZG9yLy4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1wYXJzZXIvZGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9xdW9yaWRvci8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tcGFyc2VyL2Rpc3QvaXMtYmluYXJ5LmpzIiwid2VicGFjazovL3F1b3JpZG9yLy4vc3JjL3N0eWxlLnNjc3M/NzViYSIsIndlYnBhY2s6Ly9xdW9yaWRvci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9xdW9yaWRvci8uL25vZGVfbW9kdWxlcy95ZWFzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9xdW9yaWRvci8uL3NyYy9ib2FyZC5qcyIsIndlYnBhY2s6Ly9xdW9yaWRvci8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL3F1b3JpZG9yLy4vc3JjL2dhbWVfdmlldy5qcyIsIndlYnBhY2s6Ly9xdW9yaWRvci8uL3NyYy9zcXVhcmUuanMiLCJ3ZWJwYWNrOi8vcXVvcmlkb3IvLi9zcmMvdXRpbC5qcyIsIndlYnBhY2s6Ly9xdW9yaWRvci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9xdW9yaWRvci93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9xdW9yaWRvci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcXVvcmlkb3Ivd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9xdW9yaWRvci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3F1b3JpZG9yL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3F1b3JpZG9yLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFD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LFdBQVcsV0FBVyxLQUFLLEtBQUssV0FBVyxLQUFLLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxXQUFXLFVBQVUsV0FBVyxXQUFXLE1BQU0sS0FBSyxXQUFXLFVBQVUsTUFBTSxLQUFLLFdBQVcsVUFBVSxNQUFNLEtBQUssV0FBVyxVQUFVLE1BQU0sS0FBSyxXQUFXLFVBQVUsTUFBTSxLQUFLLFVBQVUsV0FBVyxVQUFVLFdBQVcsTUFBTSxLQUFLLFdBQVcsV0FBVyxVQUFVLE1BQU0sS0FBSyxXQUFXLE1BQU0sS0FBSyxVQUFVLFVBQVUsV0FBVyxXQUFXLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxXQUFXLFdBQVcsTUFBTSxLQUFLLFdBQVcsVUFBVSxXQUFXLFVBQVUsV0FBVyxNQUFNLEtBQUssV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLFdBQVcsV0FBVyxPQUFPLE1BQU0sV0FBVyxPQUFPLE1BQU0sV0FBVyxPQUFPLE1BQU0sV0FBVyxPQUFPLE1BQU0sV0FBVyxVQUFVLFdBQVcsT0FBTyxNQUFNLFdBQVcsVUFBVSxPQUFPLE1BQU0sV0FBVyxVQUFVLFVBQVUsV0FBVyxXQUFXLE1BQU0sS0FBSyxZQUFZLEtBQUssS0FBSyxVQUFVLE9BQU8sTUFBTSxVQUFVLE9BQU8sTUFBTSxVQUFVLFdBQVcsVUFBVSxXQUFXLFdBQVcsT0FBTyxNQUFNLFdBQVcsVUFBVSxPQUFPLE1BQU0sV0FBVyxVQUFVLE9BQU8sTUFBTSxXQUFXLFVBQVUsT0FBTyxNQUFNLFdBQVcsVUFBVSxPQUFPLE1BQU0sVUFBVSxXQUFXLFVBQVUsV0FBVyxPQUFPLE1BQU0sV0FBVyxXQUFXLFVBQVUsT0FBTyxNQUFNLFVBQVUsVUFBVSxXQUFXLFdBQVcsT0FBTyxNQUFNLFVBQVUsT0FBTyxNQUFNLFdBQVcsV0FBVyxPQUFPLE1BQU0sV0FBVyxVQUFVLFdBQVcsVUFBVSxXQUFXLE9BQU8sTUFBTSxXQUFXLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxPQUFPLE1BQU0sV0FBVyxXQUFXLFdBQVcsT0FBTyxNQUFNLFdBQVcsV0FBVyxXQUFXLE9BQU8sTUFBTSxXQUFXLE9BQU8sTUFBTSxXQUFXLE9BQU8sTUFBTSxXQUFXLE9BQU8sTUFBTSxXQUFXLFVBQVUsV0FBVyxPQUFPLE1BQU0sV0FBVyxVQUFVLE9BQU8sTUFBTSxXQUFXLFdBQVcsVUFBVSxXQUFXLFdBQVcsTUFBTSxLQUFLLFdBQVcsS0FBSyxLQUFLLFVBQVUsT0FBTyxNQUFNLFVBQVUsT0FBTyxNQUFNLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxPQUFPLE1BQU0sV0FBVyxVQUFVLE9BQU8sTUFBTSxXQUFXLFVBQVUsT0FBTyxNQUFNLFdBQVcsVUFBVSxPQUFPLE1BQU0sV0FBVyxVQUFVLE9BQU8sTUFBTSxXQUFXLFVBQVUsV0FBVyxPQUFPLE1BQU0sVUFBVSxPQUFPLE1BQU0sVUFBVSxVQUFVLFdBQVcsV0FBVyxPQUFPLE1BQU0sVUFBVSxPQUFPLE1BQU0sV0FBVyxPQUFPLE1BQU0sV0FBVyxVQUFVLFdBQVcsVUFBVSxXQUFXLE9BQU8sTUFBTSxXQUFXLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxPQUFPLE1BQU0sV0FBVyxXQUFXLFdBQVcsT0FBTyxNQUFNLFdBQVcsV0FBVyxXQUFXLE9BQU8sTUFBTSxXQUFXLE9BQU8sTUFBTSxXQUFXLE9BQU8sTUFBTSxXQUFXLE9BQU8sTUFBTSxXQUFXLFVBQVUsVUFBVSxPQUFPLE1BQU0sV0FBVyxVQUFVLE9BQU8sTUFBTSxXQUFXLFVBQVUsTUFBTSxLQUFLLFlBQVksS0FBSyxLQUFLLFVBQVUsT0FBTyxNQUFNLFVBQVUsT0FBTyxNQUFNLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxPQUFPLE1BQU0sV0FBVyxVQUFVLE9BQU8sTUFBTSxXQUFXLFVBQVUsT0FBTyxNQUFNLFdBQVcsVUFBVSxPQUFPLE1BQU0sV0FBVyxVQUFVLE9BQU8sTUFBTSxXQUFXLFVBQVUsV0FBVyxPQUFPLE1BQU0sVUFBVSxPQUFPLE1BQU0sVUFBVSxVQUFVLFdBQVcsV0FBVyxPQUFPLE1BQU0sVUFBVSxPQUFPLE1BQU0sV0FBVyxPQUFPLE1BQU0sV0FBVyxVQUFVLFdBQVcsVUFBVSxXQUFXLE9BQU8sTUFBTSxXQUFXLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLE9BQU8sTUFBTSxXQUFXLFdBQVcsV0FBVyxPQUFPLE1BQU0sV0FBVyxXQUFXLFdBQVcsT0FBTyxNQUFNLFdBQVcsT0FBTyxNQUFNLFdBQVcsT0FBTyxNQUFNLFdBQVcsT0FBTyxNQUFNLFdBQVcsVUFBVSxVQUFVLE9BQU8sTUFBTSxVQUFVLFVBQVUsT0FBTyxNQUFNLFdBQVcsVUFBVSxNQUFNLEtBQUssWUFBWSxLQUFLLEtBQUssVUFBVSxPQUFPLE1BQU0sVUFBVSxPQUFPLE1BQU0sVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLE9BQU8sTUFBTSxXQUFXLFVBQVUsT0FBTyxNQUFNLFdBQVcsVUFBVSxPQUFPLE1BQU0sV0FBVyxVQUFVLE9BQU8sTUFBTSxXQUFXLFVBQVUsT0FBTyxNQUFNLFdBQVcsVUFBVSxXQUFXLE9BQU8sTUFBTSxVQUFVLE9BQU8sTUFBTSxVQUFVLFVBQVUsV0FBVyxXQUFXLE9BQU8sTUFBTSxVQUFVLE9BQU8sTUFBTSxXQUFXLE9BQU8sTUFBTSxXQUFXLFVBQVUsV0FBVyxVQUFVLFdBQVcsT0FBTyxNQUFNLFdBQVcsVUFBVSxPQUFPLE1BQU0sV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxPQUFPLE1BQU0sV0FBVyxXQUFXLFdBQVcsT0FBTyxNQUFNLFdBQVcsV0FBVyxXQUFXLE9BQU8sTUFBTSxXQUFXLE9BQU8sTUFBTSxXQUFXLE9BQU8sTUFBTSxXQUFXLE9BQU8sTUFBTSxXQUFXLFVBQVUsVUFBVSxPQUFPLE1BQU0sVUFBVSxVQUFVLE9BQU8sTUFBTSxXQUFXLFVBQVUsTUFBTSxLQUFLLFdBQVcsS0FBSyxLQUFLLFVBQVUsT0FBTyxNQUFNLFVBQVUsT0FBTyxNQUFNLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxPQUFPLE1BQU0sV0FBVyxVQUFVLE9BQU8sTUFBTSxXQUFXLFVBQVUsT0FBTyxNQUFNLFdBQVcsVUFBVSxPQUFPLE1BQU0sV0FBVyxVQUFVLE9BQU8sTUFBTSxXQUFXLFVBQVUsV0FBVyxPQUFPLE1BQU0sVUFBVSxPQUFPLE1BQU0sVUFBVSxVQUFVLFdBQVcsV0FBVyxPQUFPLE1BQU0sVUFBVSxPQUFPLE1BQU0sV0FBVyxPQUFPLE1BQU0sVUFBVSxVQUFVLFdBQVcsVUFBVSxXQUFXLE9BQU8sTUFBTSxXQUFXLFdBQVcsT0FBTyxNQUFNLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxXQUFXLFdBQVcsT0FBTyxNQUFNLFdBQVcsV0FBVyxXQUFXLE9BQU8sTUFBTSxVQUFVLFdBQVcsV0FBVyxPQUFPLE1BQU0sV0FBVyxPQUFPLE1BQU0sV0FBVyxPQUFPLE1BQU0sV0FBVyxPQUFPLE1BQU0sV0FBVyxVQUFVLFVBQVUsVUFBVSxPQUFPLE1BQU0sVUFBVSxVQUFVLE9BQU8sTUFBTSxXQUFXLFVBQVUsVUFBVSxNQUFNLEtBQUssTUFBTSxVQUFVLFVBQVUsV0FBVyxVQUFVLFVBQVUsVUFBVSxXQUFXLFVBQVUsVUFBVSxPQUFPLE1BQU0sV0FBVyxPQUFPLE1BQU0sVUFBVSxVQUFVLFVBQVUsT0FBTyxNQUFNLFVBQVUsVUFBVSxPQUFPLE1BQU0sV0FBVyxVQUFVLE9BQU8sTUFBTSxXQUFXLE9BQU8sTUFBTSxVQUFVLFVBQVUsVUFBVSxXQUFXLFVBQVUsT0FBTyxNQUFNLFVBQVUsT0FBTyxNQUFNLFdBQVcsVUFBVSxVQUFVLFVBQVUsV0FBVyxVQUFVLFVBQVUsT0FBTyxNQUFNLFdBQVcsT0FBTyxNQUFNLFVBQVUsT0FBTyxNQUFNLFdBQVcsV0FBVyxPQUFPLE1BQU0sV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxPQUFPLE1BQU0sVUFBVSxVQUFVLFVBQVUsV0FBVyxVQUFVLE9BQU8sTUFBTSxXQUFXLFFBQVEsTUFBTSxXQUFXLFVBQVUsVUFBVSxVQUFVLFdBQVcsVUFBVSxVQUFVLE9BQU8sTUFBTSxXQUFXLE9BQU8sTUFBTSxXQUFXLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxPQUFPLE1BQU0sWUFBWSxRQUFRLE1BQU0sWUFBWSxRQUFRLE1BQU0sVUFBVSxVQUFVLE9BQU8sV0FBVyxLQUFLLFdBQVcsVUFBVSxVQUFVLFdBQVcsVUFBVSxXQUFXLFdBQVcsT0FBTyxNQUFNLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxXQUFXLFdBQVcsT0FBTyxNQUFNLFdBQVcsV0FBVyxXQUFXLFdBQVcsT0FBTyxXQUFXLEtBQUssV0FBVyxVQUFVLFVBQVUsV0FBVyxVQUFVLFdBQVcsV0FBVyxPQUFPLE1BQU0sVUFBVSxVQUFVLFVBQVUsV0FBVyxPQUFPLE1BQU0sV0FBVyxVQUFVLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxPQUFPLE1BQU0sVUFBVSxPQUFPLFlBQVksS0FBSyxXQUFXLFVBQVUsV0FBVyxVQUFVLFdBQVcsV0FBVyxXQUFXLFdBQVcsT0FBTyxNQUFNLFVBQVUsT0FBTyxNQUFNLGFBQWEsYUFBYSxXQUFXLE1BQU0sTUFBTSxXQUFXLFdBQVcsVUFBVSxXQUFXLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxNQUFNLE1BQU0sYUFBYSxlQUFlLE9BQU8sTUFBTSxhQUFhLGVBQWUsT0FBTyxNQUFNLFlBQVksT0FBTyxNQUFNLFlBQVksWUFBWSxVQUFVLFVBQVUsTUFBTSxNQUFNLFdBQVcsT0FBTyxNQUFNLFdBQVcsT0FBTyxNQUFNLGFBQWEsYUFBYSxXQUFXLE1BQU0sTUFBTSxXQUFXLFdBQVcsVUFBVSxXQUFXLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxNQUFNLE1BQU0sYUFBYSxlQUFlLE9BQU8sTUFBTSxhQUFhLGVBQWUsT0FBTyxNQUFNLFlBQVksT0FBTyxNQUFNLGFBQWEsWUFBWSxVQUFVLFVBQVUsTUFBTSxNQUFNLFdBQVcsT0FBTyxNQUFN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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLDRDQUE0Qzs7QUFFdkQ7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFD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QkFBbUIsbUJBQU8sQ0FBQyxnRkFBZTs7QUFFMUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQ3ZNQTs7QUFFQSx1QkFBdUIsbUJBQU8sQ0FBQyxpRkFBb0I7QUFDbkQsZ0JBQWdCLG1CQUFPLENBQUMsNEVBQVc7QUFDbkMsZ0JBQWdCLG1CQUFPLENBQUMsb0VBQW1CO0FBQzNDLE9BQU8sT0FBTyxHQUFHLG1CQUFPLENBQUMsNERBQVM7QUFDbEMsbUJBQW1CLG1CQUFPLENBQUMsZ0ZBQWU7O0FBRTFDLGNBQWMsbUJBQU8sQ0FBQyxrREFBTzs7QUFFN0I7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0Esa0NBQWtDLGlCQUFpQjtBQUNuRDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQix5QkFBeUIsMkJBQTJCO0FBQ3BEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBLDJEQUEyRDtBQUMzRCxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFD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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxPQUFPO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixvREFBb0Q7QUFDakYsYUFBYTtBQUNiO0FBQ0E7QUFDQSx5QkFBeUIsK0RBQStEO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixpREFBaUQ7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTSxZQUFZOztBQUVsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkU4Qjs7QUFFZjtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRGQUE0RjtBQUM1Riw0RkFBNEY7QUFDNUYsNEZBQTRGO0FBQzVGLDRGQUE0RjtBQUM1RjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQSxnQztBQUNBLG1CQUFtQjtBQUNuQiw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7OztBQUlBOztBQUVBLG1CQUFtQixvREFBRTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMLENBQUMiLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKipcbiAqIEV4cG9zZSBgQmFja29mZmAuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBCYWNrb2ZmO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYmFja29mZiB0aW1lciB3aXRoIGBvcHRzYC5cbiAqXG4gKiAtIGBtaW5gIGluaXRpYWwgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgWzEwMF1cbiAqIC0gYG1heGAgbWF4IHRpbWVvdXQgWzEwMDAwXVxuICogLSBgaml0dGVyYCBbMF1cbiAqIC0gYGZhY3RvcmAgWzJdXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gQmFja29mZihvcHRzKSB7XG4gIG9wdHMgPSBvcHRzIHx8IHt9O1xuICB0aGlzLm1zID0gb3B0cy5taW4gfHwgMTAwO1xuICB0aGlzLm1heCA9IG9wdHMubWF4IHx8IDEwMDAwO1xuICB0aGlzLmZhY3RvciA9IG9wdHMuZmFjdG9yIHx8IDI7XG4gIHRoaXMuaml0dGVyID0gb3B0cy5qaXR0ZXIgPiAwICYmIG9wdHMuaml0dGVyIDw9IDEgPyBvcHRzLmppdHRlciA6IDA7XG4gIHRoaXMuYXR0ZW1wdHMgPSAwO1xufVxuXG4vKipcbiAqIFJldHVybiB0aGUgYmFja29mZiBkdXJhdGlvbi5cbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkJhY2tvZmYucHJvdG90eXBlLmR1cmF0aW9uID0gZnVuY3Rpb24oKXtcbiAgdmFyIG1zID0gdGhpcy5tcyAqIE1hdGgucG93KHRoaXMuZmFjdG9yLCB0aGlzLmF0dGVtcHRzKyspO1xuICBpZiAodGhpcy5qaXR0ZXIpIHtcbiAgICB2YXIgcmFuZCA9ICBNYXRoLnJhbmRvbSgpO1xuICAgIHZhciBkZXZpYXRpb24gPSBNYXRoLmZsb29yKHJhbmQgKiB0aGlzLmppdHRlciAqIG1zKTtcbiAgICBtcyA9IChNYXRoLmZsb29yKHJhbmQgKiAxMCkgJiAxKSA9PSAwICA/IG1zIC0gZGV2aWF0aW9uIDogbXMgKyBkZXZpYXRpb247XG4gIH1cbiAgcmV0dXJuIE1hdGgubWluKG1zLCB0aGlzLm1heCkgfCAwO1xufTtcblxuLyoqXG4gKiBSZXNldCB0aGUgbnVtYmVyIG9mIGF0dGVtcHRzLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQmFja29mZi5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbigpe1xuICB0aGlzLmF0dGVtcHRzID0gMDtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBtaW5pbXVtIGR1cmF0aW9uXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5CYWNrb2ZmLnByb3RvdHlwZS5zZXRNaW4gPSBmdW5jdGlvbihtaW4pe1xuICB0aGlzLm1zID0gbWluO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIG1heGltdW0gZHVyYXRpb25cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkJhY2tvZmYucHJvdG90eXBlLnNldE1heCA9IGZ1bmN0aW9uKG1heCl7XG4gIHRoaXMubWF4ID0gbWF4O1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIGppdHRlclxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQmFja29mZi5wcm90b3R5cGUuc2V0Sml0dGVyID0gZnVuY3Rpb24oaml0dGVyKXtcbiAgdGhpcy5qaXR0ZXIgPSBqaXR0ZXI7XG59O1xuXG4iLCIvKlxuICogYmFzZTY0LWFycmF5YnVmZmVyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbmlrbGFzdmgvYmFzZTY0LWFycmF5YnVmZmVyXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEyIE5pa2xhcyB2b24gSGVydHplblxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICovXG4oZnVuY3Rpb24oY2hhcnMpe1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBleHBvcnRzLmVuY29kZSA9IGZ1bmN0aW9uKGFycmF5YnVmZmVyKSB7XG4gICAgdmFyIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpLFxuICAgIGksIGxlbiA9IGJ5dGVzLmxlbmd0aCwgYmFzZTY0ID0gXCJcIjtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrPTMpIHtcbiAgICAgIGJhc2U2NCArPSBjaGFyc1tieXRlc1tpXSA+PiAyXTtcbiAgICAgIGJhc2U2NCArPSBjaGFyc1soKGJ5dGVzW2ldICYgMykgPDwgNCkgfCAoYnl0ZXNbaSArIDFdID4+IDQpXTtcbiAgICAgIGJhc2U2NCArPSBjaGFyc1soKGJ5dGVzW2kgKyAxXSAmIDE1KSA8PCAyKSB8IChieXRlc1tpICsgMl0gPj4gNildO1xuICAgICAgYmFzZTY0ICs9IGNoYXJzW2J5dGVzW2kgKyAyXSAmIDYzXTtcbiAgICB9XG5cbiAgICBpZiAoKGxlbiAlIDMpID09PSAyKSB7XG4gICAgICBiYXNlNjQgPSBiYXNlNjQuc3Vic3RyaW5nKDAsIGJhc2U2NC5sZW5ndGggLSAxKSArIFwiPVwiO1xuICAgIH0gZWxzZSBpZiAobGVuICUgMyA9PT0gMSkge1xuICAgICAgYmFzZTY0ID0gYmFzZTY0LnN1YnN0cmluZygwLCBiYXNlNjQubGVuZ3RoIC0gMikgKyBcIj09XCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJhc2U2NDtcbiAgfTtcblxuICBleHBvcnRzLmRlY29kZSA9ICBmdW5jdGlvbihiYXNlNjQpIHtcbiAgICB2YXIgYnVmZmVyTGVuZ3RoID0gYmFzZTY0Lmxlbmd0aCAqIDAuNzUsXG4gICAgbGVuID0gYmFzZTY0Lmxlbmd0aCwgaSwgcCA9IDAsXG4gICAgZW5jb2RlZDEsIGVuY29kZWQyLCBlbmNvZGVkMywgZW5jb2RlZDQ7XG5cbiAgICBpZiAoYmFzZTY0W2Jhc2U2NC5sZW5ndGggLSAxXSA9PT0gXCI9XCIpIHtcbiAgICAgIGJ1ZmZlckxlbmd0aC0tO1xuICAgICAgaWYgKGJhc2U2NFtiYXNlNjQubGVuZ3RoIC0gMl0gPT09IFwiPVwiKSB7XG4gICAgICAgIGJ1ZmZlckxlbmd0aC0tO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBhcnJheWJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihidWZmZXJMZW5ndGgpLFxuICAgIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSs9NCkge1xuICAgICAgZW5jb2RlZDEgPSBjaGFycy5pbmRleE9mKGJhc2U2NFtpXSk7XG4gICAgICBlbmNvZGVkMiA9IGNoYXJzLmluZGV4T2YoYmFzZTY0W2krMV0pO1xuICAgICAgZW5jb2RlZDMgPSBjaGFycy5pbmRleE9mKGJhc2U2NFtpKzJdKTtcbiAgICAgIGVuY29kZWQ0ID0gY2hhcnMuaW5kZXhPZihiYXNlNjRbaSszXSk7XG5cbiAgICAgIGJ5dGVzW3ArK10gPSAoZW5jb2RlZDEgPDwgMikgfCAoZW5jb2RlZDIgPj4gNCk7XG4gICAgICBieXRlc1twKytdID0gKChlbmNvZGVkMiAmIDE1KSA8PCA0KSB8IChlbmNvZGVkMyA+PiAyKTtcbiAgICAgIGJ5dGVzW3ArK10gPSAoKGVuY29kZWQzICYgMykgPDwgNikgfCAoZW5jb2RlZDQgJiA2Myk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycmF5YnVmZmVyO1xuICB9O1xufSkoXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCIpO1xuIiwiXHJcbi8qKlxyXG4gKiBFeHBvc2UgYEVtaXR0ZXJgLlxyXG4gKi9cclxuXHJcbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xyXG4gIG1vZHVsZS5leHBvcnRzID0gRW1pdHRlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgYSBuZXcgYEVtaXR0ZXJgLlxyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIEVtaXR0ZXIob2JqKSB7XHJcbiAgaWYgKG9iaikgcmV0dXJuIG1peGluKG9iaik7XHJcbn07XHJcblxyXG4vKipcclxuICogTWl4aW4gdGhlIGVtaXR0ZXIgcHJvcGVydGllcy5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IG9ialxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIG1peGluKG9iaikge1xyXG4gIGZvciAodmFyIGtleSBpbiBFbWl0dGVyLnByb3RvdHlwZSkge1xyXG4gICAgb2JqW2tleV0gPSBFbWl0dGVyLnByb3RvdHlwZVtrZXldO1xyXG4gIH1cclxuICByZXR1cm4gb2JqO1xyXG59XHJcblxyXG4vKipcclxuICogTGlzdGVuIG9uIHRoZSBnaXZlbiBgZXZlbnRgIHdpdGggYGZuYC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUub24gPVxyXG5FbWl0dGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcclxuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcbiAgKHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gPSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdIHx8IFtdKVxyXG4gICAgLnB1c2goZm4pO1xyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFkZHMgYW4gYGV2ZW50YCBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgaW52b2tlZCBhIHNpbmdsZVxyXG4gKiB0aW1lIHRoZW4gYXV0b21hdGljYWxseSByZW1vdmVkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcclxuICBmdW5jdGlvbiBvbigpIHtcclxuICAgIHRoaXMub2ZmKGV2ZW50LCBvbik7XHJcbiAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gIH1cclxuXHJcbiAgb24uZm4gPSBmbjtcclxuICB0aGlzLm9uKGV2ZW50LCBvbik7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIHRoZSBnaXZlbiBjYWxsYmFjayBmb3IgYGV2ZW50YCBvciBhbGxcclxuICogcmVnaXN0ZXJlZCBjYWxsYmFja3MuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLm9mZiA9XHJcbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cclxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cclxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XHJcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG5cclxuICAvLyBhbGxcclxuICBpZiAoMCA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICB0aGlzLl9jYWxsYmFja3MgPSB7fTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLy8gc3BlY2lmaWMgZXZlbnRcclxuICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcclxuICBpZiAoIWNhbGxiYWNrcykgcmV0dXJuIHRoaXM7XHJcblxyXG4gIC8vIHJlbW92ZSBhbGwgaGFuZGxlcnNcclxuICBpZiAoMSA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICBkZWxldGUgdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLy8gcmVtb3ZlIHNwZWNpZmljIGhhbmRsZXJcclxuICB2YXIgY2I7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgIGNiID0gY2FsbGJhY2tzW2ldO1xyXG4gICAgaWYgKGNiID09PSBmbiB8fCBjYi5mbiA9PT0gZm4pIHtcclxuICAgICAgY2FsbGJhY2tzLnNwbGljZShpLCAxKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBSZW1vdmUgZXZlbnQgc3BlY2lmaWMgYXJyYXlzIGZvciBldmVudCB0eXBlcyB0aGF0IG5vXHJcbiAgLy8gb25lIGlzIHN1YnNjcmliZWQgZm9yIHRvIGF2b2lkIG1lbW9yeSBsZWFrLlxyXG4gIGlmIChjYWxsYmFja3MubGVuZ3RoID09PSAwKSB7XHJcbiAgICBkZWxldGUgdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcclxuICB9XHJcblxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVtaXQgYGV2ZW50YCB3aXRoIHRoZSBnaXZlbiBhcmdzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtNaXhlZH0gLi4uXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcblxyXG4gIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKVxyXG4gICAgLCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xyXG5cclxuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XHJcbiAgfVxyXG5cclxuICBpZiAoY2FsbGJhY2tzKSB7XHJcbiAgICBjYWxsYmFja3MgPSBjYWxsYmFja3Muc2xpY2UoMCk7XHJcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2FsbGJhY2tzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgIGNhbGxiYWNrc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybiBhcnJheSBvZiBjYWxsYmFja3MgZm9yIGBldmVudGAuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcmV0dXJuIHtBcnJheX1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG4gIHJldHVybiB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdIHx8IFtdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIHRoaXMgZW1pdHRlciBoYXMgYGV2ZW50YCBoYW5kbGVycy5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUuaGFzTGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gIHJldHVybiAhISB0aGlzLmxpc3RlbmVycyhldmVudCkubGVuZ3RoO1xyXG59O1xyXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVF1YW50aWNvOndnaHRANDAwOzcwMCZkaXNwbGF5PXN3YXApO1wiXSk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcbiovXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxuYiwgdSwgaSwgY2VudGVyLFxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm9yZGVyOiAwO1xcbiAgZm9udC1zaXplOiAxMDAlO1xcbiAgZm9udDogaW5oZXJpdDtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuXFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG5odG1sIHtcXG4gIGJhY2tncm91bmQ6ICM0RDYxOEI7XFxufVxcblxcbmJvZHkge1xcbiAgbGluZS1oZWlnaHQ6IDE7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG5vbCwgdWwge1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuXFxuYmxvY2txdW90ZSwgcSB7XFxuICBxdW90ZXM6IG5vbmU7XFxufVxcblxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgY29udGVudDogbm9uZTtcXG59XFxuXFxuLypcXG5cXHRtZWRpYSBxdWVyaWVzXFxuKi9cXG4vKiBzbWFsbCBwaG9uZSAqL1xcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogMzIxcHgpIHtcXG4gIHRhYmxlIHtcXG4gICAgZm9udC1zaXplOiAxZW07XFxuICB9XFxuXFxuICAuaGlkZSB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICB9XFxuXFxuICAjYm9hcmQge1xcbiAgICB3aWR0aDogOTUlO1xcbiAgICBtaW4taGVpZ2h0OiAzMDRweDtcXG4gICAgbWFyZ2luLXRvcDogMmVtO1xcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgfVxcblxcbiAgLndhbGwtdG9wIHtcXG4gICAgYm9yZGVyLXRvcDogMnB4IHNvbGlkICNGRkIwMDA7XFxuICAgIHotaW5kZXg6IDk7XFxuICB9XFxuXFxuICAud2FsbC1ib3R0b20ge1xcbiAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgI0ZGQjAwMDtcXG4gICAgei1pbmRleDogOTtcXG4gIH1cXG5cXG4gIC53YWxsLXJpZ2h0IHtcXG4gICAgYm9yZGVyLXJpZ2h0OiAycHggc29saWQgI0ZGQjAwMDtcXG4gICAgei1pbmRleDogOTtcXG4gIH1cXG5cXG4gIC53YWxsLWxlZnQge1xcbiAgICBib3JkZXItbGVmdDogMnB4IHNvbGlkICNGRkIwMDA7XFxuICAgIHotaW5kZXg6IDk7XFxuICB9XFxuXFxuICAudGFibGUge1xcbiAgICB3aWR0aDogMTAwdnc7XFxuICAgIGJvcmRlci1zcGFjaW5nOiAwO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgfVxcblxcbiAgLmhhbGwge1xcbiAgICAvKiBib3JkZXI6IDVweCBzb2xpZCAjM0E2MzhFOyAgKi9cXG4gICAgLyogd2lkdGg6IDRlbTsgaGVpZ2h0OiA0ZW07ICAqL1xcbiAgICB6LWluZGV4OiA1O1xcbiAgfVxcblxcbiAgdGQge1xcbiAgICB3aWR0aDogMzNweDtcXG4gICAgaGVpZ2h0OiAzM3B4O1xcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjNEQ2MThCO1xcbiAgICBiYWNrZ3JvdW5kOiAjNzY4NkE4O1xcbiAgfVxcblxcbiAgdHIge1xcbiAgICBoZWlnaHQ6IDMzcHg7XFxuICB9XFxuXFxuICAuYnV0dG9uIHtcXG4gICAgLyogbWFyZ2luOiAyMHB4IGF1dG87ICovXFxuICAgIHBhZGRpbmc6IDVweCA3cHg7XFxuICB9XFxuXFxuICAuY29udHJvbGxlci1kaXYge1xcbiAgICBtYXJnaW46IDFlbSBhdXRvO1xcbiAgICB3aWR0aDogODAlO1xcbiAgICBwYWRkaW5nOiA1cHggN3B4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICB9XFxuXFxuICAuY29udHJvbGxlci1idG4ge1xcbiAgICBiYWNrZ3JvdW5kOiAjQjhDM0Q5O1xcbiAgICBmb250LWZhbWlseTogXFxcIlF1YW50aWNvXFxcIiwgc2Fucy1zZXJpZjtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIG1hcmdpbjogYXV0bztcXG4gICAgaGVpZ2h0OiA0NXB4O1xcbiAgICB3aWR0aDogMTAwcHg7XFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UtaW4tb3V0O1xcbiAgICBib3gtc2hhZG93OiAwIDEuNHB4IDEuMXB4IHJnYmEoMCwgMCwgMCwgMC4wMzQpLCAwIDMuNHB4IDIuNnB4IHJnYmEoMCwgMCwgMCwgMC4wNDgpLCAwIDcuN3B4IDVweCByZ2JhKDAsIDAsIDAsIDAuMDYpLCAwIDExLjE1cHggOC41cHggcmdiYSgwLCAwLCAwLCAwLjA4NiksIDAgNTBweCA0MHB4IHJnYmEoMCwgMCwgMCwgMC4xMik7XFxuICB9XFxuXFxuICAuY29udHJvbGxlci1idG46aG92ZXIge1xcbiAgICB0cmFuc2l0aW9uOiAwLjNzIGVhc2UtaW4tb3V0O1xcbiAgICBiYWNrZ3JvdW5kOiAjNzM4M0E2O1xcbiAgICBib3gtc2hhZG93OiAwIDIuOHB4IDIuMnB4IHJnYmEoMCwgMCwgMCwgMC4wMzQpLCAwIDYuN3B4IDUuM3B4IHJnYmEoMCwgMCwgMCwgMC4wNDgpLCAwIDE1LjVweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4wNiksIDAgMjIuM3B4IDE3LjlweCByZ2JhKDAsIDAsIDAsIDAuMDg2KSwgMCAxMDBweCA4MHB4IHJnYmEoMCwgMCwgMCwgMC4xMik7XFxuICB9XFxuXFxuICAucGxheWVyIHtcXG4gICAgZm9udC1zaXplOiAxLjNlbTtcXG4gICAgbGluZS1oZWlnaHQ6IDM2cHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIH1cXG5cXG4gIC5oaWdobGlnaHQge1xcbiAgICBiYWNrZ3JvdW5kOiAjOERCQjVFO1xcbiAgfVxcblxcbiAgLmhpZ2hsaWdodDpob3ZlciB7XFxuICAgIGJhY2tncm91bmQ6ICNCREUyOTc7XFxuICB9XFxuXFxuICAuc2VsZWN0ZWRXYWxsIHtcXG4gICAgYmFja2dyb3VuZDogI0IwMkQxRjtcXG4gIH1cXG5cXG4gIC5wbGF5ZXItdHVybiB7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiUXVhbnRpY29cXFwiLCBzYW5zLXNlcmlmO1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB9XFxuXFxuICAud2FsbC1jb3VudGVyLWRpdiB7XFxuICAgIG1hcmdpbjogMmVtIGF1dG87XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICB9XFxuXFxuICAud2FsbC1jb3VudGVyIHtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJRdWFudGljb1xcXCIsIHNhbnMtc2VyaWY7XFxuICAgIGZvbnQtc2l6ZTogMWVtO1xcbiAgICBtYXgtd2lkdGg6IDc1cHg7XFxuICAgIG1hcmdpbi1sZWZ0OiAyMHB4O1xcbiAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XFxuICB9XFxufVxcbi8qIG1lZGl1bSBwaG9uZSAqL1xcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogMzc2cHgpIGFuZCAobWluLXdpZHRoOiAzMjJweCkge1xcbiAgdGFibGUge1xcbiAgICBmb250LXNpemU6IDFlbTtcXG4gIH1cXG5cXG4gIC5oaWRlIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gIH1cXG5cXG4gICNib2FyZCB7XFxuICAgIHdpZHRoOiA5NSU7XFxuICAgIG1heC1oZWlnaHQ6IDMzNjBweDtcXG4gICAgbWFyZ2luLXRvcDogMmVtO1xcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgfVxcblxcbiAgLndhbGwtdG9wIHtcXG4gICAgYm9yZGVyLXRvcDogMnB4IHNvbGlkICNGRkIwMDA7XFxuICAgIHotaW5kZXg6IDk7XFxuICB9XFxuXFxuICAud2FsbC1ib3R0b20ge1xcbiAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgI0ZGQjAwMDtcXG4gICAgei1pbmRleDogOTtcXG4gIH1cXG5cXG4gIC53YWxsLXJpZ2h0IHtcXG4gICAgYm9yZGVyLXJpZ2h0OiAycHggc29saWQgI0ZGQjAwMDtcXG4gICAgei1pbmRleDogOTtcXG4gIH1cXG5cXG4gIC53YWxsLWxlZnQge1xcbiAgICBib3JkZXItbGVmdDogMnB4IHNvbGlkICNGRkIwMDA7XFxuICAgIHotaW5kZXg6IDk7XFxuICB9XFxuXFxuICAudGFibGUge1xcbiAgICB3aWR0aDogMTAwdnc7XFxuICAgIGJvcmRlci1zcGFjaW5nOiAwO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgfVxcblxcbiAgLmhhbGwge1xcbiAgICAvKiBib3JkZXI6IDVweCBzb2xpZCAjM0E2MzhFOyAgKi9cXG4gICAgLyogd2lkdGg6IDRlbTsgaGVpZ2h0OiA0ZW07ICAqL1xcbiAgICB6LWluZGV4OiA1O1xcbiAgfVxcblxcbiAgLnRhYmxlIC5mbG9vciB7XFxuICAgIC8qIGJhY2tncm91bmQ6IGJyb3duOyAgKi9cXG4gIH1cXG5cXG4gIHRkIHtcXG4gICAgd2lkdGg6IDM2cHg7XFxuICAgIGhlaWdodDogMzZweDtcXG4gICAgYm9yZGVyOiAycHggc29saWQgIzRENjE4QjtcXG4gICAgYmFja2dyb3VuZDogIzc2ODZBODtcXG4gIH1cXG5cXG4gIHRyIHtcXG4gICAgaGVpZ2h0OiA0M3B4O1xcbiAgfVxcblxcbiAgLmJ1dHRvbiB7XFxuICAgIC8qIG1hcmdpbjogMjBweCBhdXRvOyAqL1xcbiAgICBwYWRkaW5nOiA1cHggN3B4O1xcbiAgfVxcblxcbiAgLmNvbnRyb2xsZXItZGl2IHtcXG4gICAgbWFyZ2luOiAxZW0gYXV0bztcXG4gICAgd2lkdGg6IDgwJTtcXG4gICAgcGFkZGluZzogNXB4IDdweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgfVxcblxcbiAgLmNvbnRyb2xsZXItYnRuIHtcXG4gICAgYmFja2dyb3VuZDogI0I4QzNEOTtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJRdWFudGljb1xcXCIsIHNhbnMtc2VyaWY7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBtYXJnaW46IGF1dG87XFxuICAgIGhlaWdodDogNDVweDtcXG4gICAgd2lkdGg6IDEwMHB4O1xcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLWluLW91dDtcXG4gICAgYm94LXNoYWRvdzogMCAxLjRweCAxLjFweCByZ2JhKDAsIDAsIDAsIDAuMDM0KSwgMCAzLjRweCAyLjZweCByZ2JhKDAsIDAsIDAsIDAuMDQ4KSwgMCA3LjdweCA1cHggcmdiYSgwLCAwLCAwLCAwLjA2KSwgMCAxMS4xNXB4IDguNXB4IHJnYmEoMCwgMCwgMCwgMC4wODYpLCAwIDUwcHggNDBweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xcbiAgfVxcblxcbiAgLmNvbnRyb2xsZXItYnRuOmhvdmVyIHtcXG4gICAgdHJhbnNpdGlvbjogMC4zcyBlYXNlLWluLW91dDtcXG4gICAgYmFja2dyb3VuZDogIzczODNBNjtcXG4gICAgYm94LXNoYWRvdzogMCAyLjhweCAyLjJweCByZ2JhKDAsIDAsIDAsIDAuMDM0KSwgMCA2LjdweCA1LjNweCByZ2JhKDAsIDAsIDAsIDAuMDQ4KSwgMCAxNS41cHggMTBweCByZ2JhKDAsIDAsIDAsIDAuMDYpLCAwIDIyLjNweCAxNy45cHggcmdiYSgwLCAwLCAwLCAwLjA4NiksIDAgMTAwcHggODBweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xcbiAgfVxcblxcbiAgLnBsYXllciB7XFxuICAgIGZvbnQtc2l6ZTogMS43ZW07XFxuICAgIGxpbmUtaGVpZ2h0OiAzNnB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB9XFxuXFxuICAuaGlnaGxpZ2h0IHtcXG4gICAgYmFja2dyb3VuZDogIzhEQkI1RTtcXG4gIH1cXG5cXG4gIC5oaWdobGlnaHQ6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kOiAjQkRFMjk3O1xcbiAgfVxcblxcbiAgLnNlbGVjdGVkV2FsbCB7XFxuICAgIGJhY2tncm91bmQ6ICNCMDJEMUY7XFxuICB9XFxuXFxuICAucGxheWVyLXR1cm4ge1xcbiAgICBmb250LWZhbWlseTogXFxcIlF1YW50aWNvXFxcIiwgc2Fucy1zZXJpZjtcXG4gICAgcGFkZGluZzogMTBweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgfVxcblxcbiAgLndhbGwtY291bnRlci1kaXYge1xcbiAgICBtYXJnaW46IDJlbSBhdXRvO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgfVxcblxcbiAgLndhbGwtY291bnRlciB7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiUXVhbnRpY29cXFwiLCBzYW5zLXNlcmlmO1xcbiAgICBmb250LXNpemU6IDFlbTtcXG4gICAgbWF4LXdpZHRoOiA3NXB4O1xcbiAgICBtYXJnaW4tbGVmdDogMjBweDtcXG4gICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xcbiAgfVxcbn1cXG4vKiBsYXJnZSBwaG9uZSAqL1xcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNjQwcHgpIGFuZCAobWluLXdpZHRoOiAzNzdweCkge1xcbiAgdGFibGUge1xcbiAgICBmb250LXNpemU6IDFlbTtcXG4gIH1cXG5cXG4gIC5oaWRlIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gIH1cXG5cXG4gICNib2FyZCB7XFxuICAgIHdpZHRoOiAzODdweDtcXG4gICAgbWF4LWhlaWdodDogMzg3cHg7XFxuICAgIG1hcmdpbi10b3A6IDJlbTtcXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgIG1hcmdpbi1yaWdodDogYXV0bztcXG4gIH1cXG5cXG4gIC53YWxsLXRvcCB7XFxuICAgIGJvcmRlci10b3A6IDJweCBzb2xpZCAjRkZCMDAwO1xcbiAgICB6LWluZGV4OiA5O1xcbiAgfVxcblxcbiAgLndhbGwtYm90dG9tIHtcXG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNGRkIwMDA7XFxuICAgIHotaW5kZXg6IDk7XFxuICB9XFxuXFxuICAud2FsbC1yaWdodCB7XFxuICAgIGJvcmRlci1yaWdodDogMnB4IHNvbGlkICNGRkIwMDA7XFxuICAgIHotaW5kZXg6IDk7XFxuICB9XFxuXFxuICAud2FsbC1sZWZ0IHtcXG4gICAgYm9yZGVyLWxlZnQ6IDJweCBzb2xpZCAjRkZCMDAwO1xcbiAgICB6LWluZGV4OiA5O1xcbiAgfVxcblxcbiAgLnRhYmxlIHtcXG4gICAgd2lkdGg6IDEwMHZ3O1xcbiAgICBib3JkZXItc3BhY2luZzogMDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIH1cXG5cXG4gIC5oYWxsIHtcXG4gICAgLyogYm9yZGVyOiA1cHggc29saWQgIzNBNjM4RTsgICovXFxuICAgIC8qIHdpZHRoOiA0ZW07IGhlaWdodDogNGVtOyAgKi9cXG4gICAgei1pbmRleDogNTtcXG4gIH1cXG5cXG4gIHRkIHtcXG4gICAgd2lkdGg6IDM5cHg7XFxuICAgIGhlaWdodDogMzlweDtcXG4gICAgYm9yZGVyOiAycHggc29saWQgIzRENjE4QjtcXG4gICAgYmFja2dyb3VuZDogIzc2ODZBODtcXG4gIH1cXG5cXG4gIHRyIHtcXG4gICAgaGVpZ2h0OiA0M3B4O1xcbiAgfVxcblxcbiAgLmJ1dHRvbiB7XFxuICAgIC8qIG1hcmdpbjogMjBweCBhdXRvOyAqL1xcbiAgICBwYWRkaW5nOiA1cHggN3B4O1xcbiAgfVxcblxcbiAgLmNvbnRyb2xsZXItZGl2IHtcXG4gICAgbWFyZ2luOiAxZW0gYXV0bztcXG4gICAgd2lkdGg6IDgwJTtcXG4gICAgcGFkZGluZzogNXB4IDdweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgfVxcblxcbiAgLmNvbnRyb2xsZXItYnRuIHtcXG4gICAgYmFja2dyb3VuZDogI0I4QzNEOTtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJRdWFudGljb1xcXCIsIHNhbnMtc2VyaWY7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBtYXJnaW46IGF1dG87XFxuICAgIGhlaWdodDogNDVweDtcXG4gICAgd2lkdGg6IDEwMHB4O1xcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLWluLW91dDtcXG4gICAgYm94LXNoYWRvdzogMCAxLjRweCAxLjFweCByZ2JhKDAsIDAsIDAsIDAuMDM0KSwgMCAzLjRweCAyLjZweCByZ2JhKDAsIDAsIDAsIDAuMDQ4KSwgMCA3LjdweCA1cHggcmdiYSgwLCAwLCAwLCAwLjA2KSwgMCAxMS4xNXB4IDguNXB4IHJnYmEoMCwgMCwgMCwgMC4wODYpLCAwIDUwcHggNDBweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xcbiAgfVxcblxcbiAgLmNvbnRyb2xsZXItYnRuOmhvdmVyIHtcXG4gICAgdHJhbnNpdGlvbjogMC4zcyBlYXNlLWluLW91dDtcXG4gICAgYmFja2dyb3VuZDogIzczODNBNjtcXG4gICAgYm94LXNoYWRvdzogMCAyLjhweCAyLjJweCByZ2JhKDAsIDAsIDAsIDAuMDM0KSwgMCA2LjdweCA1LjNweCByZ2JhKDAsIDAsIDAsIDAuMDQ4KSwgMCAxNS41cHggMTBweCByZ2JhKDAsIDAsIDAsIDAuMDYpLCAwIDIyLjNweCAxNy45cHggcmdiYSgwLCAwLCAwLCAwLjA4NiksIDAgMTAwcHggODBweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xcbiAgfVxcblxcbiAgLnBsYXllciB7XFxuICAgIGZvbnQtc2l6ZTogMS43ZW07XFxuICAgIGxpbmUtaGVpZ2h0OiA0M3B4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB9XFxuXFxuICAuaGlnaGxpZ2h0IHtcXG4gICAgYmFja2dyb3VuZDogIzhEQkI1RTtcXG4gIH1cXG5cXG4gIC5oaWdobGlnaHQ6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kOiAjQkRFMjk3O1xcbiAgfVxcblxcbiAgLnNlbGVjdGVkV2FsbCB7XFxuICAgIGJhY2tncm91bmQ6ICNCMDJEMUY7XFxuICB9XFxuXFxuICAucGxheWVyLXR1cm4ge1xcbiAgICBmb250LWZhbWlseTogXFxcIlF1YW50aWNvXFxcIiwgc2Fucy1zZXJpZjtcXG4gICAgcGFkZGluZzogMTNweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgfVxcblxcbiAgLndhbGwtY291bnRlci1kaXYge1xcbiAgICBtYXJnaW46IDJlbSBhdXRvO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgfVxcblxcbiAgLndhbGwtY291bnRlciB7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiUXVhbnRpY29cXFwiLCBzYW5zLXNlcmlmO1xcbiAgICBmb250LXNpemU6IDEuMjVlbTtcXG4gICAgbWF4LXdpZHRoOiA4MHB4O1xcbiAgICBtYXJnaW4tbGVmdDogMjBweDtcXG4gICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xcbiAgfVxcbn1cXG4vKiB0YWJsZXQgKi9cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KSBhbmQgKG1pbi13aWR0aDogNjQxcHgpIHtcXG4gIHRhYmxlIHtcXG4gICAgZm9udC1zaXplOiAxZW07XFxuICB9XFxuXFxuICAuaGlkZSB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICB9XFxuXFxuICAjYm9hcmQge1xcbiAgICB3aWR0aDogNDk1cHg7XFxuICAgIGhlaWdodDogNDk1cHg7XFxuICAgIG1hcmdpbi10b3A6IDJlbTtcXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgIG1hcmdpbi1yaWdodDogYXV0bztcXG4gIH1cXG5cXG4gIC53YWxsLXRvcCB7XFxuICAgIGJvcmRlci10b3A6IDNweCBzb2xpZCAjRkZCMDAwO1xcbiAgICB6LWluZGV4OiA5O1xcbiAgfVxcblxcbiAgLndhbGwtYm90dG9tIHtcXG4gICAgYm9yZGVyLWJvdHRvbTogM3B4IHNvbGlkICNGRkIwMDA7XFxuICAgIHotaW5kZXg6IDk7XFxuICB9XFxuXFxuICAud2FsbC1yaWdodCB7XFxuICAgIGJvcmRlci1yaWdodDogM3B4IHNvbGlkICNGRkIwMDA7XFxuICAgIHotaW5kZXg6IDk7XFxuICB9XFxuXFxuICAud2FsbC1sZWZ0IHtcXG4gICAgYm9yZGVyLWxlZnQ6IDNweCBzb2xpZCAjRkZCMDAwO1xcbiAgICB6LWluZGV4OiA5O1xcbiAgfVxcblxcbiAgLnRhYmxlIHtcXG4gICAgYm9yZGVyLXNwYWNpbmc6IDA7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICB9XFxuXFxuICAuaGFsbCB7XFxuICAgIHotaW5kZXg6IDU7XFxuICB9XFxuXFxuICB0ZCB7XFxuICAgIHdpZHRoOiA0OXB4O1xcbiAgICBoZWlnaHQ6IDQ5cHg7XFxuICAgIGJvcmRlcjogM3B4IHNvbGlkICM0RDYxOEI7XFxuICAgIGJhY2tncm91bmQ6ICM3Njg2QTg7XFxuICB9XFxuXFxuICB0ciB7XFxuICAgIGhlaWdodDogNTVweDtcXG4gIH1cXG5cXG4gIC5idXR0b24ge1xcbiAgICBwYWRkaW5nOiA1cHggN3B4O1xcbiAgfVxcblxcbiAgLmNvbnRyb2xsZXItZGl2IHtcXG4gICAgbWFyZ2luOiAxZW0gYXV0bztcXG4gICAgd2lkdGg6IDgwJTtcXG4gICAgcGFkZGluZzogNXB4IDdweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgfVxcblxcbiAgLmNvbnRyb2xsZXItYnRuIHtcXG4gICAgYmFja2dyb3VuZDogI0I4QzNEOTtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJRdWFudGljb1xcXCIsIHNhbnMtc2VyaWY7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBtYXJnaW46IGF1dG87XFxuICAgIGhlaWdodDogNDVweDtcXG4gICAgd2lkdGg6IDEwMHB4O1xcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLWluLW91dDtcXG4gICAgYm94LXNoYWRvdzogMCAxLjRweCAxLjFweCByZ2JhKDAsIDAsIDAsIDAuMDM0KSwgMCAzLjRweCAyLjZweCByZ2JhKDAsIDAsIDAsIDAuMDQ4KSwgMCA3LjdweCA1cHggcmdiYSgwLCAwLCAwLCAwLjA2KSwgMCAxMS4xNXB4IDguNXB4IHJnYmEoMCwgMCwgMCwgMC4wODYpLCAwIDUwcHggNDBweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xcbiAgfVxcblxcbiAgLmNvbnRyb2xsZXItYnRuOmhvdmVyIHtcXG4gICAgdHJhbnNpdGlvbjogMC4zcyBlYXNlLWluLW91dDtcXG4gICAgYmFja2dyb3VuZDogIzczODNBNjtcXG4gICAgYm94LXNoYWRvdzogMCAyLjhweCAyLjJweCByZ2JhKDAsIDAsIDAsIDAuMDM0KSwgMCA2LjdweCA1LjNweCByZ2JhKDAsIDAsIDAsIDAuMDQ4KSwgMCAxNS41cHggMTBweCByZ2JhKDAsIDAsIDAsIDAuMDYpLCAwIDIyLjNweCAxNy45cHggcmdiYSgwLCAwLCAwLCAwLjA4NiksIDAgMTAwcHggODBweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xcbiAgfVxcblxcbiAgLnBsYXllciB7XFxuICAgIGZvbnQtc2l6ZTogMS43NWVtO1xcbiAgICBsaW5lLWhlaWdodDogNTVweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgfVxcblxcbiAgLmhpZ2hsaWdodCB7XFxuICAgIGJhY2tncm91bmQ6ICM4REJCNUU7XFxuICB9XFxuXFxuICAuaGlnaGxpZ2h0OmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZDogI0JERTI5NztcXG4gIH1cXG5cXG4gIC5zZWxlY3RlZFdhbGwge1xcbiAgICBiYWNrZ3JvdW5kOiAjQjAyRDFGO1xcbiAgfVxcblxcbiAgLnBsYXllci10dXJuIHtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJRdWFudGljb1xcXCIsIHNhbnMtc2VyaWY7XFxuICAgIHBhZGRpbmc6IDIwcHg7XFxuICAgIG1hcmdpbjogMCBhdXRvO1xcbiAgfVxcblxcbiAgLndhbGwtY291bnRlci1kaXYge1xcbiAgICBtYXJnaW4tdG9wOiAzMHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgfVxcblxcbiAgLndhbGwtY291bnRlciB7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiUXVhbnRpY29cXFwiLCBzYW5zLXNlcmlmO1xcbiAgICBtYXJnaW46IGF1dG87XFxuICB9XFxufVxcbi8qIGxhcHRvcCAxMDI0cHggKi9cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDEwMjRweCkgYW5kIChtaW4td2lkdGg6IDc2OXB4KSB7XFxuICB0YWJsZSB7XFxuICAgIGZvbnQtc2l6ZTogMWVtO1xcbiAgfVxcblxcbiAgLmhpZGUge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgfVxcblxcbiAgI2JvYXJkIHtcXG4gICAgd2lkdGg6IDQ5NXB4O1xcbiAgICBoZWlnaHQ6IDQ5NXB4O1xcbiAgICBtYXJnaW4tdG9wOiAxZW07XFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxuICB9XFxuXFxuICAud2FsbC10b3Age1xcbiAgICBib3JkZXItdG9wOiAzcHggc29saWQgI0ZGQjAwMDtcXG4gICAgei1pbmRleDogOTtcXG4gIH1cXG5cXG4gIC53YWxsLWJvdHRvbSB7XFxuICAgIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCAjRkZCMDAwO1xcbiAgICB6LWluZGV4OiA5O1xcbiAgfVxcblxcbiAgLndhbGwtcmlnaHQge1xcbiAgICBib3JkZXItcmlnaHQ6IDNweCBzb2xpZCAjRkZCMDAwO1xcbiAgICB6LWluZGV4OiA5O1xcbiAgfVxcblxcbiAgLndhbGwtbGVmdCB7XFxuICAgIGJvcmRlci1sZWZ0OiAzcHggc29saWQgI0ZGQjAwMDtcXG4gICAgei1pbmRleDogOTtcXG4gIH1cXG5cXG4gIC50YWJsZSB7XFxuICAgIGJvcmRlci1zcGFjaW5nOiAwO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgfVxcblxcbiAgLmhhbGwge1xcbiAgICB6LWluZGV4OiA1O1xcbiAgfVxcblxcbiAgdGQge1xcbiAgICB3aWR0aDogNDlweDtcXG4gICAgaGVpZ2h0OiA0OXB4O1xcbiAgICBib3JkZXI6IDNweCBzb2xpZCAjNEQ2MThCO1xcbiAgICBiYWNrZ3JvdW5kOiAjNzY4NkE4O1xcbiAgfVxcblxcbiAgdHIge1xcbiAgICBoZWlnaHQ6IDU1cHg7XFxuICB9XFxuXFxuICAuYnV0dG9uIHtcXG4gICAgcGFkZGluZzogNXB4IDdweDtcXG4gIH1cXG5cXG4gIC5jb250cm9sbGVyLWRpdiB7XFxuICAgIG1hcmdpbjogMWVtIGF1dG87XFxuICAgIHdpZHRoOiA4MCU7XFxuICAgIHBhZGRpbmc6IDVweCA3cHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIH1cXG5cXG4gIC5jb250cm9sbGVyLWJ0biB7XFxuICAgIGJhY2tncm91bmQ6ICNCOEMzRDk7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiUXVhbnRpY29cXFwiLCBzYW5zLXNlcmlmO1xcbiAgICBmb250LXNpemU6IDFlbTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIG1hcmdpbjogYXV0bztcXG4gICAgaGVpZ2h0OiA1NXB4O1xcbiAgICB3aWR0aDogMTMzcHg7XFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UtaW4tb3V0O1xcbiAgICBib3gtc2hhZG93OiAwIDEuNHB4IDEuMXB4IHJnYmEoMCwgMCwgMCwgMC4wMzQpLCAwIDMuNHB4IDIuNnB4IHJnYmEoMCwgMCwgMCwgMC4wNDgpLCAwIDcuN3B4IDVweCByZ2JhKDAsIDAsIDAsIDAuMDYpLCAwIDExLjE1cHggOC41cHggcmdiYSgwLCAwLCAwLCAwLjA4NiksIDAgNTBweCA0MHB4IHJnYmEoMCwgMCwgMCwgMC4xMik7XFxuICB9XFxuXFxuICAuY29udHJvbGxlci1idG46aG92ZXIge1xcbiAgICB0cmFuc2l0aW9uOiAwLjNzIGVhc2UtaW4tb3V0O1xcbiAgICBiYWNrZ3JvdW5kOiAjNzM4M0E2O1xcbiAgICBib3gtc2hhZG93OiAwIDIuOHB4IDIuMnB4IHJnYmEoMCwgMCwgMCwgMC4wMzQpLCAwIDYuN3B4IDUuM3B4IHJnYmEoMCwgMCwgMCwgMC4wNDgpLCAwIDE1LjVweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4wNiksIDAgMjIuM3B4IDE3LjlweCByZ2JhKDAsIDAsIDAsIDAuMDg2KSwgMCAxMDBweCA4MHB4IHJnYmEoMCwgMCwgMCwgMC4xMik7XFxuICB9XFxuXFxuICAucGxheWVyIHtcXG4gICAgZm9udC1zaXplOiAxLjc1ZW07XFxuICAgIGxpbmUtaGVpZ2h0OiA1NXB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB9XFxuXFxuICAuaGlnaGxpZ2h0IHtcXG4gICAgYmFja2dyb3VuZDogIzhEQkI1RTtcXG4gIH1cXG5cXG4gIC5oaWdobGlnaHQ6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kOiAjQkRFMjk3O1xcbiAgfVxcblxcbiAgLnNlbGVjdGVkV2FsbCB7XFxuICAgIGJhY2tncm91bmQ6ICNCMDJEMUY7XFxuICB9XFxuXFxuICAucGxheWVyLXR1cm4ge1xcbiAgICBmb250LWZhbWlseTogXFxcIlF1YW50aWNvXFxcIiwgc2Fucy1zZXJpZjtcXG4gICAgcGFkZGluZzogMjBweDtcXG4gICAgbWFyZ2luOiAwIGF1dG87XFxuICB9XFxuXFxuICAud2FsbC1jb3VudGVyLWRpdiB7XFxuICAgIG1hcmdpbi10b3A6IDVweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gIH1cXG5cXG4gIC53YWxsLWNvdW50ZXIge1xcbiAgICBmb250LWZhbWlseTogXFxcIlF1YW50aWNvXFxcIiwgc2Fucy1zZXJpZjtcXG4gICAgbWFyZ2luOiBhdXRvO1xcbiAgfVxcbn1cXG4vKiBsYXJnZSBsYXB0b3AgKi9cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDE0NDBweCkgYW5kIChtaW4td2lkdGg6IDEwMjVweCkge1xcbiAgdGFibGUge1xcbiAgICBmb250LXNpemU6IDFlbTtcXG4gIH1cXG5cXG4gIC5oaWRlIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gIH1cXG5cXG4gICNib2FyZCB7XFxuICAgIHdpZHRoOiA2MzBweDtcXG4gICAgaGVpZ2h0OiA2MzBweDtcXG4gICAgbWFyZ2luLXRvcDogMWVtO1xcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgfVxcblxcbiAgLndhbGwtdG9wIHtcXG4gICAgYm9yZGVyLXRvcDogM3B4IHNvbGlkICNGRkIwMDA7XFxuICAgIHotaW5kZXg6IDk7XFxuICB9XFxuXFxuICAud2FsbC1ib3R0b20ge1xcbiAgICBib3JkZXItYm90dG9tOiAzcHggc29saWQgI0ZGQjAwMDtcXG4gICAgei1pbmRleDogOTtcXG4gIH1cXG5cXG4gIC53YWxsLXJpZ2h0IHtcXG4gICAgYm9yZGVyLXJpZ2h0OiAzcHggc29saWQgI0ZGQjAwMDtcXG4gICAgei1pbmRleDogOTtcXG4gIH1cXG5cXG4gIC53YWxsLWxlZnQge1xcbiAgICBib3JkZXItbGVmdDogM3B4IHNvbGlkICNGRkIwMDA7XFxuICAgIHotaW5kZXg6IDk7XFxuICB9XFxuXFxuICAudGFibGUge1xcbiAgICBib3JkZXItc3BhY2luZzogMDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIH1cXG5cXG4gIC5oYWxsIHtcXG4gICAgei1pbmRleDogNTtcXG4gIH1cXG5cXG4gIHRkIHtcXG4gICAgd2lkdGg6IDYwcHg7XFxuICAgIGhlaWdodDogNjBweDtcXG4gICAgYm9yZGVyOiA1cHggc29saWQgIzRENjE4QjtcXG4gICAgYmFja2dyb3VuZDogIzc2ODZBODtcXG4gIH1cXG5cXG4gIHRyIHtcXG4gICAgaGVpZ2h0OiA3MHB4O1xcbiAgfVxcblxcbiAgLmJ1dHRvbiB7XFxuICAgIHBhZGRpbmc6IDVweCA3cHg7XFxuICB9XFxuXFxuICAuY29udHJvbGxlci1kaXYge1xcbiAgICBtYXJnaW46IDFlbSBhdXRvO1xcbiAgICB3aWR0aDogODAlO1xcbiAgICBwYWRkaW5nOiA1cHggN3B4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICB9XFxuXFxuICAuY29udHJvbGxlci1kaXYgPiBwIHtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJRdWFudGljb1xcXCIsIHNhbnMtc2VyaWY7XFxuICAgIGZvbnQtc2l6ZTogMWVtO1xcbiAgfVxcblxcbiAgLmNvbnRyb2xsZXItYnRuIHtcXG4gICAgYmFja2dyb3VuZDogI0I4QzNEOTtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJRdWFudGljb1xcXCIsIHNhbnMtc2VyaWY7XFxuICAgIGZvbnQtc2l6ZTogMWVtO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgbWFyZ2luOiBhdXRvO1xcbiAgICBoZWlnaHQ6IDU1cHg7XFxuICAgIHdpZHRoOiAxMzNweDtcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZS1pbi1vdXQ7XFxuICAgIGJveC1zaGFkb3c6IDAgMS40cHggMS4xcHggcmdiYSgwLCAwLCAwLCAwLjAzNCksIDAgMy40cHggMi42cHggcmdiYSgwLCAwLCAwLCAwLjA0OCksIDAgNy43cHggNXB4IHJnYmEoMCwgMCwgMCwgMC4wNiksIDAgMTEuMTVweCA4LjVweCByZ2JhKDAsIDAsIDAsIDAuMDg2KSwgMCA1MHB4IDQwcHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcXG4gIH1cXG5cXG4gIC5jb250cm9sbGVyLWJ0bjpob3ZlciB7XFxuICAgIHRyYW5zaXRpb246IDAuM3MgZWFzZS1pbi1vdXQ7XFxuICAgIGJhY2tncm91bmQ6ICM3MzgzQTY7XFxuICAgIGJveC1zaGFkb3c6IDAgMi44cHggMi4ycHggcmdiYSgwLCAwLCAwLCAwLjAzNCksIDAgNi43cHggNS4zcHggcmdiYSgwLCAwLCAwLCAwLjA0OCksIDAgMTUuNXB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjA2KSwgMCAyMi4zcHggMTcuOXB4IHJnYmEoMCwgMCwgMCwgMC4wODYpLCAwIDEwMHB4IDgwcHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcXG4gIH1cXG5cXG4gIC5wbGF5ZXIge1xcbiAgICBmb250LXNpemU6IDEuNzVlbTtcXG4gICAgbGluZS1oZWlnaHQ6IDU1cHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIH1cXG5cXG4gIC5oaWdobGlnaHQge1xcbiAgICBiYWNrZ3JvdW5kOiAjOERCQjVFO1xcbiAgfVxcblxcbiAgLmhpZ2hsaWdodDpob3ZlciB7XFxuICAgIGJhY2tncm91bmQ6ICNCREUyOTc7XFxuICB9XFxuXFxuICAuc2VsZWN0ZWRXYWxsIHtcXG4gICAgYmFja2dyb3VuZDogI0IwMkQxRjtcXG4gIH1cXG5cXG4gIC5wbGF5ZXItdHVybiB7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiUXVhbnRpY29cXFwiLCBzYW5zLXNlcmlmO1xcbiAgICBwYWRkaW5nOiAyMHB4O1xcbiAgICBtYXJnaW46IDAgYXV0bztcXG4gIH1cXG5cXG4gIC53YWxsLWNvdW50ZXItZGl2IHtcXG4gICAgbWFyZ2luLXRvcDogNXB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgfVxcblxcbiAgLndhbGwtY291bnRlciB7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiUXVhbnRpY29cXFwiLCBzYW5zLXNlcmlmO1xcbiAgICBtYXJnaW46IGF1dG87XFxuICB9XFxufVxcbi8qIDRrIGxhcHRvcCAqL1xcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTQ0MXB4KSB7XFxuICB0YWJsZSB7XFxuICAgIGZvbnQtc2l6ZTogMWVtO1xcbiAgfVxcblxcbiAgLmhpZGUge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgfVxcblxcbiAgI2JvYXJkIHtcXG4gICAgd2lkdGg6IDcyMHB4O1xcbiAgICBoZWlnaHQ6IDcyMHB4O1xcbiAgICBtYXJnaW4tdG9wOiAzZW07XFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxuICB9XFxuXFxuICAud2FsbC10b3Age1xcbiAgICBib3JkZXItdG9wOiA1cHggc29saWQgI0ZGQjAwMDtcXG4gICAgei1pbmRleDogOTtcXG4gIH1cXG5cXG4gIC53YWxsLWJvdHRvbSB7XFxuICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCAjRkZCMDAwO1xcbiAgICB6LWluZGV4OiA5O1xcbiAgfVxcblxcbiAgLndhbGwtcmlnaHQge1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCAjRkZCMDAwO1xcbiAgICB6LWluZGV4OiA5O1xcbiAgfVxcblxcbiAgLndhbGwtbGVmdCB7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgI0ZGQjAwMDtcXG4gICAgei1pbmRleDogOTtcXG4gIH1cXG5cXG4gIC50YWJsZSB7XFxuICAgIGJvcmRlci1zcGFjaW5nOiAwO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgfVxcblxcbiAgLmhhbGwge1xcbiAgICB6LWluZGV4OiA1O1xcbiAgfVxcblxcbiAgdGQge1xcbiAgICB3aWR0aDogNzBweDtcXG4gICAgaGVpZ2h0OiA3MHB4O1xcbiAgICBib3JkZXI6IDVweCBzb2xpZCAjNEQ2MThCO1xcbiAgICBiYWNrZ3JvdW5kOiAjNzY4NkE4O1xcbiAgfVxcblxcbiAgdHIge1xcbiAgICBoZWlnaHQ6IDgwcHg7XFxuICB9XFxuXFxuICAuYnV0dG9uIHtcXG4gICAgcGFkZGluZzogNXB4IDdweDtcXG4gIH1cXG5cXG4gIC5jb250cm9sbGVyLWRpdiB7XFxuICAgIG1hcmdpbjogMCBhdXRvO1xcbiAgICB3aWR0aDogODAlO1xcbiAgICBwYWRkaW5nOiA1cHggN3B4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICB9XFxuXFxuICAuY29udHJvbGxlci1kaXYgPiBwIHtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJRdWFudGljb1xcXCIsIHNhbnMtc2VyaWY7XFxuICAgIGZvbnQtc2l6ZTogMS41ZW07XFxuICB9XFxuXFxuICAuY29udHJvbGxlci1idG4ge1xcbiAgICBiYWNrZ3JvdW5kOiAjQjhDM0Q5O1xcbiAgICBmb250LWZhbWlseTogXFxcIlF1YW50aWNvXFxcIiwgc2Fucy1zZXJpZjtcXG4gICAgZm9udC1zaXplOiAxLjVlbTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIG1hcmdpbjogMCBhdXRvO1xcbiAgICBoZWlnaHQ6IDc1cHg7XFxuICAgIHdpZHRoOiAyMDBweDtcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZS1pbi1vdXQ7XFxuICAgIGJveC1zaGFkb3c6IDAgMS40cHggMS4xcHggcmdiYSgwLCAwLCAwLCAwLjAzNCksIDAgMy40cHggMi42cHggcmdiYSgwLCAwLCAwLCAwLjA0OCksIDAgNy43cHggNXB4IHJnYmEoMCwgMCwgMCwgMC4wNiksIDAgMTEuMTVweCA4LjVweCByZ2JhKDAsIDAsIDAsIDAuMDg2KSwgMCA1MHB4IDQwcHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcXG4gIH1cXG5cXG4gIC5jb250cm9sbGVyLWJ0bjpob3ZlciB7XFxuICAgIHRyYW5zaXRpb246IDAuM3MgZWFzZS1pbi1vdXQ7XFxuICAgIGJhY2tncm91bmQ6ICM3MzgzQTY7XFxuICAgIGJveC1zaGFkb3c6IDAgMi44cHggMi4ycHggcmdiYSgwLCAwLCAwLCAwLjAzNCksIDAgNi43cHggNS4zcHggcmdiYSgwLCAwLCAwLCAwLjA0OCksIDAgMTUuNXB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjA2KSwgMCAyMi4zcHggMTcuOXB4IHJnYmEoMCwgMCwgMCwgMC4wODYpLCAwIDEwMHB4IDgwcHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcXG4gIH1cXG5cXG4gIC5wbGF5ZXIge1xcbiAgICBmb250LXNpemU6IDNlbTtcXG4gICAgbGluZS1oZWlnaHQ6IDgwcHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIH1cXG5cXG4gIC5oaWdobGlnaHQge1xcbiAgICBiYWNrZ3JvdW5kOiAjOERCQjVFO1xcbiAgfVxcblxcbiAgLmhpZ2hsaWdodDpob3ZlciB7XFxuICAgIGJhY2tncm91bmQ6ICNCREUyOTc7XFxuICB9XFxuXFxuICAuc2VsZWN0ZWRXYWxsIHtcXG4gICAgYmFja2dyb3VuZDogI0IwMkQxRjtcXG4gIH1cXG5cXG4gIC5wbGF5ZXItdHVybiB7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiUXVhbnRpY29cXFwiLCBzYW5zLXNlcmlmO1xcbiAgICBmb250LXNpemU6IDJlbTtcXG4gICAgcGFkZGluZzogMjBweDtcXG4gICAgbWFyZ2luOiAwIGF1dG87XFxuICB9XFxuXFxuICAud2FsbC1jb3VudGVyLWRpdiB7XFxuICAgIG1hcmdpbi10b3A6IDJlbTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gIH1cXG5cXG4gIC53YWxsLWNvdW50ZXIge1xcbiAgICBmb250LWZhbWlseTogXFxcIlF1YW50aWNvXFxcIiwgc2Fucy1zZXJpZjtcXG4gICAgZm9udC1zaXplOiAyZW07XFxuICAgIG1hcmdpbjogYXV0bztcXG4gIH1cXG59XFxuI3Jlc3RhcnQtZGl2IHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZm9udC1zaXplOiAyZW07XFxuICBwYWRkaW5nOiAxNXB4O1xcbiAgbWFyZ2luOiAyMDBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgd2lkdGg6IDQwMHB4O1xcbiAgaGVpZ2h0OiAyMDBweDtcXG59XFxuXFxuI3Jlc3RhcnQtZGl2IGgxIHtcXG4gIG1hcmdpbjogMTBweCBhdXRvO1xcbn1cXG5cXG4jcmVzdGFydC1kaXYgYnV0dG9uIHtcXG4gIG1hcmdpbjogYXV0bztcXG4gIHdpZHRoOiAzMCU7XFxuICBoZWlnaHQ6IDE1JTtcXG59XFxuXFxuLmJ1dHRvblRlc3Qge1xcbiAgd2lkdGg6IDMwMHB4O1xcbiAgaGVpZ2h0OiAxMDBweDtcXG59XFxuXFxuI3Jvb21Gb3JtIHtcXG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC4xNSk7XFxuICBtYXJnaW46IGF1dG87XFxufVxcblxcbiNmb3JtRGl2IHtcXG4gIG1hcmdpbjogMzAlIGF1dG87XFxufVxcblxcbiNyb29tSW5wdXQge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogMCAxcmVtO1xcbiAgZmxleC1ncm93OiAxO1xcbiAgYm9yZGVyLXJhZGl1czogMnJlbTtcXG4gIG1hcmdpbjogMC4yNXJlbTtcXG59XFxuXFxuI3Jvb21JbnB1dDpmb2N1cyB7XFxuICBvdXRsaW5lOiBub25lO1xcbn1cXG5cXG4jcm9vbUJ1dHRvbiB7XFxuICBiYWNrZ3JvdW5kOiAjMzMzO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogMCAxcmVtO1xcbiAgbWFyZ2luOiAwLjI1cmVtO1xcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xcbiAgb3V0bGluZTogbm9uZTtcXG4gIGNvbG9yOiAjZmZmO1xcbn1cXG5cXG4jcm9vbUJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kOiBncmF5O1xcbn1cXG5cXG4jbG9iYnktZGl2IHtcXG4gIHdpZHRoOiA4MCU7XFxufVxcblxcbiNsb2JieS1kaXYgPiBoMSB7XFxuICBiYWNrZ3JvdW5kOiAjZmZmO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4jbG9iYnktZm9ybSB7XFxuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMTUpO1xcbiAgcGFkZGluZzogMC4yNXJlbTtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGJvdHRvbTogMDtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBoZWlnaHQ6IDNyZW07XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDEwcHgpO1xcbn1cXG5cXG4jbG9iYnktaW5wdXQge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogMCAxcmVtO1xcbiAgZmxleC1ncm93OiAxO1xcbiAgYm9yZGVyLXJhZGl1czogMnJlbTtcXG4gIG1hcmdpbjogMC4yNXJlbTtcXG59XFxuXFxuI2xvYmJ5LWlucHV0OmZvY3VzIHtcXG4gIG91dGxpbmU6IG5vbmU7XFxufVxcblxcbiNsb2JieS1mb3JtID4gYnV0dG9uIHtcXG4gIGJhY2tncm91bmQ6ICMzMzM7XFxuICBib3JkZXI6IG5vbmU7XFxuICBwYWRkaW5nOiAwIDFyZW07XFxuICBtYXJnaW46IDAuMjVyZW07XFxuICBib3JkZXItcmFkaXVzOiAzcHg7XFxuICBvdXRsaW5lOiBub25lO1xcbiAgY29sb3I6ICNmZmY7XFxufVxcblxcbiNsb2JieS1mb3JtID4gYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQ6IGdyYXk7XFxufVxcblxcbiNsb2JieS1tZXNzYWdlcyB7XFxuICBiYWNrZ3JvdW5kOiAjZmZmO1xcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xcbiAgbWFyZ2luOiAxMDBweCAwO1xcbiAgcGFkZGluZzogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4jbG9iYnktbWVzc2FnZXMgPiBsaSB7XFxuICBwYWRkaW5nOiAwLjVyZW0gMXJlbTtcXG59XFxuXFxuI2xvYmJ5LW1lc3NhZ2VzID4gbGk6bnRoLWNoaWxkKG9kZCkge1xcbiAgYmFja2dyb3VuZDogI2VmZWZlZjtcXG59XFxuXFxuI2xvYmJ5LXN0YXJ0LWdhbWUge1xcbiAgd2lkdGg6IDEwMHB4O1xcbiAgaGVpZ2h0OiA1MHB4O1xcbn1cXG5cXG4vKiBzcGxhc2ggZGl2ICovXFxuI3NwbGFzaC1kaXYge1xcbiAgYmFja2dyb3VuZDogI0E2QjFDOTtcXG4gIHdpZHRoOiAyMWVtO1xcbiAgaGVpZ2h0OiAyMWVtO1xcbiAgbWFyZ2luOiAxNWVtIGF1dG8gYXV0byBhdXRvO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBib3gtc2hhZG93OiAwIDIuOHB4IDIuMnB4IHJnYmEoMCwgMCwgMCwgMC4wMzQpLCAwIDYuN3B4IDUuM3B4IHJnYmEoMCwgMCwgMCwgMC4wNDgpLCAwIDE1LjVweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4wNiksIDAgMjIuM3B4IDE3LjlweCByZ2JhKDAsIDAsIDAsIDAuMDg2KSwgMCAxMDBweCA4MHB4IHJnYmEoMCwgMCwgMCwgMC4xMik7XFxufVxcblxcbi5idG4ge1xcbiAgYmFja2dyb3VuZDogI0I4QzNEOTtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIG1hcmdpbjogYXV0bztcXG4gIGhlaWdodDogNWVtO1xcbiAgd2lkdGg6IDEzZW07XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLWluLW91dDtcXG4gIGJveC1zaGFkb3c6IDAgMS40cHggMS4xcHggcmdiYSgwLCAwLCAwLCAwLjAzNCksIDAgMy40cHggMi42cHggcmdiYSgwLCAwLCAwLCAwLjA0OCksIDAgNy43cHggNXB4IHJnYmEoMCwgMCwgMCwgMC4wNiksIDAgMTEuMTVweCA4LjVweCByZ2JhKDAsIDAsIDAsIDAuMDg2KSwgMCA1MHB4IDQwcHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcXG59XFxuXFxuLmJ0bjpob3ZlciB7XFxuICB0cmFuc2l0aW9uOiAwLjNzIGVhc2UtaW4tb3V0O1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xcbiAgYmFja2dyb3VuZDogIzczODNBNjtcXG4gIGJveC1zaGFkb3c6IDAgMi44cHggMi4ycHggcmdiYSgwLCAwLCAwLCAwLjAzNCksIDAgNi43cHggNS4zcHggcmdiYSgwLCAwLCAwLCAwLjA0OCksIDAgMTUuNXB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjA2KSwgMCAyMi4zcHggMTcuOXB4IHJnYmEoMCwgMCwgMCwgMC4wODYpLCAwIDEwMHB4IDgwcHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcXG59XFxuXFxuLyogZm9ybSBkaXYgKi9cXG4jZm9ybS1kaXYge1xcbiAgYmFja2dyb3VuZDogI0E2QjFDOTtcXG4gIHdpZHRoOiAyMWVtO1xcbiAgaGVpZ2h0OiAyMWVtO1xcbiAgbWFyZ2luOiAxNWVtIGF1dG8gYXV0byBhdXRvO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBib3gtc2hhZG93OiAwIDIuOHB4IDIuMnB4IHJnYmEoMCwgMCwgMCwgMC4wMzQpLCAwIDYuN3B4IDUuM3B4IHJnYmEoMCwgMCwgMCwgMC4wNDgpLCAwIDE1LjVweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4wNiksIDAgMjIuM3B4IDE3LjlweCByZ2JhKDAsIDAsIDAsIDAuMDg2KSwgMCAxMDBweCA4MHB4IHJnYmEoMCwgMCwgMCwgMC4xMik7XFxufVxcblxcbiNyb29tLWZvcm0ge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuI3Jvb20taW5wdXQge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgd2lkdGg6IDUwJTtcXG4gIG1hcmdpbjogYXV0bztcXG4gIGxpbmUtaGVpZ2h0OiAxLjU7XFxuICBmb250OiA3MDAgMS4ycmVtIFxcXCJSb2JvdG8gU2xhYlxcXCIsIHNhbnMtc2VyaWY7XFxuICBwYWRkaW5nOiAxZW0gMmVtO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDVyZW07XFxufVxcblxcbiNyb29tLWJ1dHRvbiB7XFxuICBtYXJnaW46IGF1dG87XFxufVxcblxcbi8qIGxvYmJ5IHJvb21zIGxpc3QgKi9cXG4jbG9iYnktcm9vbXMtbGlzdC1kaXYge1xcbiAgYmFja2dyb3VuZDogI0E2QjFDOTtcXG4gIHdpZHRoOiAyMWVtO1xcbiAgbWFyZ2luOiAxNWVtIGF1dG8gYXV0byBhdXRvO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBib3gtc2hhZG93OiAwIDIuOHB4IDIuMnB4IHJnYmEoMCwgMCwgMCwgMC4wMzQpLCAwIDYuN3B4IDUuM3B4IHJnYmEoMCwgMCwgMCwgMC4wNDgpLCAwIDE1LjVweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4wNiksIDAgMjIuM3B4IDE3LjlweCByZ2JhKDAsIDAsIDAsIDAuMDg2KSwgMCAxMDBweCA4MHB4IHJnYmEoMCwgMCwgMCwgMC4xMik7XFxufVxcblxcbiNsb2JieS1yb29tcy1saXN0LWRpdiA+IHVsID4gbGkgPiBidXR0b24ge1xcbiAgbWFyZ2luOiAxLjNlbTtcXG59XFxuXFxuLmJ0biB7XFxuICBjb2xvcjogIzQwMzE3NDtcXG4gIHRyYW5zaXRpb246IGNvbG9yIDAuMjVzIDAuMDgzMzMzMzMzM3M7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcbi5idG46OmJlZm9yZSwgLmJ0bjo6YWZ0ZXIge1xcbiAgYm9yZGVyOiAwIHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB3aWR0aDogMDtcXG4gIGhlaWdodDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIHJpZ2h0OiAwO1xcbn1cXG4uYnRuOjpiZWZvcmUge1xcbiAgYm9yZGVyLWJvdHRvbS13aWR0aDogNHB4O1xcbiAgYm9yZGVyLWxlZnQtd2lkdGg6IDRweDtcXG59XFxuLmJ0bjo6YWZ0ZXIge1xcbiAgYm9yZGVyLXRvcC13aWR0aDogNHB4O1xcbiAgYm9yZGVyLXJpZ2h0LXdpZHRoOiA0cHg7XFxufVxcbi5idG46aG92ZXIge1xcbiAgY29sb3I6ICNCMUE5Q0Q7XFxufVxcbi5idG46aG92ZXI6OmJlZm9yZSwgLmJ0bjpob3Zlcjo6YWZ0ZXIge1xcbiAgYm9yZGVyLWNvbG9yOiAjQjFBOUNEO1xcbiAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDBzLCB3aWR0aCAwLjI1cywgaGVpZ2h0IDAuMjVzO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxufVxcbi5idG46aG92ZXI6OmJlZm9yZSB7XFxuICB0cmFuc2l0aW9uLWRlbGF5OiAwcywgMHMsIDAuMjVzO1xcbn1cXG4uYnRuOmhvdmVyOjphZnRlciB7XFxuICB0cmFuc2l0aW9uLWRlbGF5OiAwcywgMC4yNXMsIDBzO1xcbn1cXG5cXG4uY29udHJvbGxlci1idG4ge1xcbiAgY29sb3I6ICM0MDMxNzQ7XFxuICB0cmFuc2l0aW9uOiBjb2xvciAwLjI1cyAwLjA4MzMzMzMzMzNzO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG4uY29udHJvbGxlci1idG46OmJlZm9yZSwgLmNvbnRyb2xsZXItYnRuOjphZnRlciB7XFxuICBib3JkZXI6IDAgc29saWQgdHJhbnNwYXJlbnQ7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHdpZHRoOiAwO1xcbiAgaGVpZ2h0OiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgcmlnaHQ6IDA7XFxufVxcbi5jb250cm9sbGVyLWJ0bjo6YmVmb3JlIHtcXG4gIGJvcmRlci1ib3R0b20td2lkdGg6IDRweDtcXG4gIGJvcmRlci1sZWZ0LXdpZHRoOiA0cHg7XFxufVxcbi5jb250cm9sbGVyLWJ0bjo6YWZ0ZXIge1xcbiAgYm9yZGVyLXRvcC13aWR0aDogNHB4O1xcbiAgYm9yZGVyLXJpZ2h0LXdpZHRoOiA0cHg7XFxufVxcbi5jb250cm9sbGVyLWJ0bjpob3ZlciB7XFxuICBjb2xvcjogI0IxQTlDRDtcXG59XFxuLmNvbnRyb2xsZXItYnRuOmhvdmVyOjpiZWZvcmUsIC5jb250cm9sbGVyLWJ0bjpob3Zlcjo6YWZ0ZXIge1xcbiAgYm9yZGVyLWNvbG9yOiAjQjFBOUNEO1xcbiAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDBzLCB3aWR0aCAwLjI1cywgaGVpZ2h0IDAuMjVzO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxufVxcbi5jb250cm9sbGVyLWJ0bjpob3Zlcjo6YmVmb3JlIHtcXG4gIHRyYW5zaXRpb24tZGVsYXk6IDBzLCAwcywgMC4yNXM7XFxufVxcbi5jb250cm9sbGVyLWJ0bjpob3Zlcjo6YWZ0ZXIge1xcbiAgdHJhbnNpdGlvbi1kZWxheTogMHMsIDAuMjVzLCAwcztcXG59XFxuXFxuLmJ0biB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBsaW5lLWhlaWdodDogMS41O1xcbiAgZm9udDogNzAwIDEuMnJlbSBcXFwiUm9ib3RvIFNsYWJcXFwiLCBzYW5zLXNlcmlmO1xcbiAgcGFkZGluZzogMWVtIDJlbTtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjA1cmVtO1xcbn1cXG5cXG4jd2lubmVyLWRpdiB7XFxuICBiYWNrZ3JvdW5kOiAjQTZCMUM5O1xcbiAgd2lkdGg6IDMwdnc7XFxuICBoZWlnaHQ6IDMwdnc7XFxuICBtYXJnaW46IGF1dG87XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbiN3aW5uZXItbWVzc2FnZSB7XFxuICBjb2xvcjogIzQwMzE3NDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUXVhbnRpY29cXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAzZW07XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJvdHRvbTogNTAlO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFFQTs7O0NBQUE7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QXdCNEM7QUEzRGhEO0FBc0NFO0VBQ0UsY0FvQm1DO0FBeER2QztBQXNDSTtFQUVFLHFCQWdCaUM7RUFmakMsc0RBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQXJDTjtBQXdDSTtFQUFZLCtCQUFBO0FBckNoQjtBQXVDSTtFQUFXLCtCQUFBO0FBcENmOztBQWdEQTtFQUVFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLDBDQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtBQTlDRjs7QUFtREE7RUFDQyxtQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0FBaEREOztBQWtEQTtFQUNDLGNBQUE7RUFDQSxtQ0FBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0FBL0NEXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIlxcclxcblxcclxcbi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcclxcbiAgIHYyLjAgfCAyMDExMDEyNlxcclxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxyXFxuKi9cXHJcXG5cXHJcXG5AaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1RdWFudGljbzp3Z2h0QDQwMDs3MDAmZGlzcGxheT1zd2FwJyk7XFxyXFxuXFxyXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcclxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXHJcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxyXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcclxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxyXFxuYiwgdSwgaSwgY2VudGVyLFxcclxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxyXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxyXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxyXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsIFxcclxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgXFxyXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxyXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXHJcXG5cXHRtYXJnaW46IDA7XFxyXFxuXFx0cGFkZGluZzogMDtcXHJcXG5cXHRib3JkZXI6IDA7XFxyXFxuXFx0Zm9udC1zaXplOiAxMDAlO1xcclxcblxcdGZvbnQ6IGluaGVyaXQ7XFxyXFxuXFx0dmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcclxcbn1cXHJcXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxyXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSwgXFxyXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXHJcXG5cXHRkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuaHRtbCB7XFxyXFxuXFx0YmFja2dyb3VuZDogIzRENjE4QjtcXHJcXG59XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxyXFxuXFx0d2lkdGg6IDEwMHZ3O1xcclxcblxcdGhlaWdodDogMTAwdmg7XFxyXFxuXFx0ZGlzcGxheTogZmxleDtcXHJcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG59XFxyXFxub2wsIHVsIHtcXHJcXG5cXHRsaXN0LXN0eWxlOiBub25lO1xcclxcbn1cXHJcXG5ibG9ja3F1b3RlLCBxIHtcXHJcXG5cXHRxdW90ZXM6IG5vbmU7XFxyXFxufVxcclxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcclxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXHJcXG5cXHRjb250ZW50OiAnJztcXHJcXG5cXHRjb250ZW50OiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4vKlxcclxcblxcdG1lZGlhIHF1ZXJpZXNcXHJcXG4qL1xcclxcbi8qIHNtYWxsIHBob25lICovXFxyXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAzMjFweCkge1xcclxcblxcdHRhYmxlIHtcXHJcXG5cXHRcXHRmb250LXNpemU6IDFlbTtcXHJcXG5cXHR9XFxyXFxuXFx0XFxyXFxuXFx0LmhpZGUge1xcclxcblxcdFxcdGRpc3BsYXk6IG5vbmU7XFxyXFxuXFx0fVxcclxcblxcclxcblxcdCNib2FyZCB7XFxyXFxuXFx0XFx0d2lkdGg6IDk1JTtcXHJcXG5cXHRcXHRtaW4taGVpZ2h0OiAzMDRweDtcXHJcXG5cXHRcXHRtYXJnaW4tdG9wOiAyZW07XFxyXFxuXFx0XFx0bWFyZ2luLWxlZnQ6IGF1dG87XFxyXFxuXFx0XFx0bWFyZ2luLXJpZ2h0OiBhdXRvO1xcclxcblxcdH1cXHJcXG5cXHJcXG5cXHQud2FsbC10b3Age1xcclxcblxcdFxcdGJvcmRlci10b3A6IDJweCBzb2xpZCAjRkZCMDAwO1xcclxcblxcdFxcdHotaW5kZXg6IDk7XFxyXFxuXFx0fVxcclxcblxcdFxcclxcblxcdC53YWxsLWJvdHRvbSB7XFxyXFxuXFx0XFx0Ym9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNGRkIwMDA7XFxyXFxuXFx0XFx0ei1pbmRleDogOTtcXHJcXG5cXHR9XFxyXFxuXFx0XFxyXFxuXFx0LndhbGwtcmlnaHQge1xcclxcblxcdFxcdGJvcmRlci1yaWdodDogMnB4IHNvbGlkICNGRkIwMDA7XFxyXFxuXFx0XFx0ei1pbmRleDogOTtcXHJcXG5cXHR9XFxyXFxuXFx0XFxyXFxuXFx0LndhbGwtbGVmdCB7XFxyXFxuXFx0XFx0Ym9yZGVyLWxlZnQ6IDJweCBzb2xpZCAjRkZCMDAwO1xcclxcblxcdFxcdHotaW5kZXg6IDk7XFxyXFxuXFx0fVxcclxcblxcdFxcclxcblxcdC50YWJsZSB7IFxcclxcblxcdFxcdHdpZHRoOiAxMDB2dztcXHJcXG5cXHRcXHRib3JkZXItc3BhY2luZzogMDsgXFxyXFxuXFx0XFx0ZGlzcGxheTogZmxleDtcXHJcXG5cXHRcXHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcblxcdH1cXHJcXG5cXHQuaGFsbCB7IFxcclxcblxcdFxcdC8qIGJvcmRlcjogNXB4IHNvbGlkICMzQTYzOEU7ICAqL1xcclxcblxcdFxcdC8qIHdpZHRoOiA0ZW07IGhlaWdodDogNGVtOyAgKi9cXHJcXG5cXHRcXHR6LWluZGV4OiA1O1xcclxcblxcdH1cXHRcXHJcXG5cXHRcXHJcXG5cXHR0ZCB7XFxyXFxuXFx0XFx0d2lkdGg6IDMzcHg7XFxyXFxuXFx0XFx0aGVpZ2h0OiAzM3B4O1xcclxcblxcdFxcdGJvcmRlcjogMnB4IHNvbGlkICM0RDYxOEI7XFxyXFxuXFx0XFx0YmFja2dyb3VuZDogIzc2ODZBODsgXFxyXFxuXFx0fVxcclxcblxcdHRyIHtcXHJcXG5cXHRcXHRoZWlnaHQ6IDMzcHg7XFxyXFxuXFx0fVxcclxcblxcdFxcclxcblxcdC5idXR0b24ge1xcclxcblxcdFxcdC8qIG1hcmdpbjogMjBweCBhdXRvOyAqL1xcclxcblxcdFxcdHBhZGRpbmc6IDVweCA3cHg7XFxyXFxuXFx0fVxcclxcblxcdC5jb250cm9sbGVyLWRpdiB7XFxyXFxuXFx0XFx0bWFyZ2luOiAxZW0gYXV0bztcXHJcXG5cXHRcXHR3aWR0aDogODAlO1xcclxcblxcdFxcdHBhZGRpbmc6IDVweCA3cHg7XFxyXFxuXFx0XFx0ZGlzcGxheTogZmxleDtcXHJcXG5cXHRcXHRqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuXFx0fVxcclxcblxcclxcblxcclxcblxcdC5jb250cm9sbGVyLWJ0biB7XFxyXFxuXFx0XFx0YmFja2dyb3VuZDogI0I4QzNEOTtcXHJcXG5cXHRcXHRmb250LWZhbWlseTogJ1F1YW50aWNvJywgc2Fucy1zZXJpZjtcXHJcXG5cXHRcXHQvLyBsZXR0ZXItc3BhY2luZzogMC4wNXJlbTtcXHJcXG5cXHRcXHRjdXJzb3I6IHBvaW50ZXI7XFxyXFxuXFx0XFx0Ym9yZGVyOiBub25lO1xcclxcblxcdFxcdG1hcmdpbjogYXV0bztcXHJcXG5cXHRcXHRoZWlnaHQ6IDQ1cHg7XFxyXFxuXFx0XFx0d2lkdGg6IDEwMHB4O1xcclxcblxcdFxcdHRyYW5zaXRpb246IHRyYW5zZm9ybSAuM3MgZWFzZS1pbi1vdXQ7XFxyXFxuXFx0XFx0Ym94LXNoYWRvdzogXFxyXFxuXFx0XFx0XFx0MCAxLjRweCAxLjFweCByZ2JhKDAsIDAsIDAsIDAuMDM0KSxcXHJcXG5cXHRcXHRcXHQwIDMuNHB4IDIuNnB4IHJnYmEoMCwgMCwgMCwgMC4wNDgpLFxcclxcblxcdFxcdFxcdDAgNy43cHggNXB4IHJnYmEoMCwgMCwgMCwgMC4wNiksXFxyXFxuXFx0XFx0XFx0MCAxMS4xNXB4IDguNXB4IHJnYmEoMCwgMCwgMCwgMC4wODYpLFxcclxcblxcdFxcdFxcdDAgNTBweCA0MHB4IHJnYmEoMCwgMCwgMCwgMC4xMik7XFxyXFxuXFx0fVxcclxcblxcclxcblxcdC5jb250cm9sbGVyLWJ0bjpob3ZlciB7XFxyXFxuXFx0XFx0dHJhbnNpdGlvbjogLjNzIGVhc2UtaW4tb3V0O1xcclxcblxcdFxcdGJhY2tncm91bmQ6ICM3MzgzQTY7XFxyXFxuXFx0XFx0Ym94LXNoYWRvdzogXFxyXFxuXFx0XFx0XFx0MCAyLjhweCAyLjJweCByZ2JhKDAsIDAsIDAsIDAuMDM0KSxcXHJcXG5cXHRcXHRcXHQwIDYuN3B4IDUuM3B4IHJnYmEoMCwgMCwgMCwgMC4wNDgpLFxcclxcblxcdFxcdFxcdDAgMTUuNXB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjA2KSxcXHJcXG5cXHRcXHRcXHQwIDIyLjNweCAxNy45cHggcmdiYSgwLCAwLCAwLCAwLjA4NiksXFxyXFxuXFx0XFx0XFx0MCAxMDBweCA4MHB4IHJnYmEoMCwgMCwgMCwgMC4xMik7XFxyXFxuXFx0fVxcdFxcclxcblxcdFxcclxcblxcdC5wbGF5ZXIge1xcclxcblxcdFxcdGZvbnQtc2l6ZTogMS4zZW07XFxyXFxuXFx0XFx0bGluZS1oZWlnaHQ6IDM2cHg7XFxyXFxuXFx0XFx0dGV4dC1hbGlnbjogY2VudGVyO1xcclxcblxcdH1cXHJcXG5cXHRcXHJcXG5cXHQuaGlnaGxpZ2h0IHtcXHJcXG5cXHRcXHRiYWNrZ3JvdW5kOiAjOERCQjVFO1xcclxcblxcdH1cXHJcXG5cXHQuaGlnaGxpZ2h0OmhvdmVye1xcclxcblxcdFxcdGJhY2tncm91bmQ6ICNCREUyOTc7XFxyXFxuXFx0fVxcclxcblxcdFxcclxcblxcdC5zZWxlY3RlZFdhbGwge1xcclxcblxcdFxcdGJhY2tncm91bmQ6ICNCMDJEMUY7XFxyXFxuXFx0fVxcclxcblxcdFxcclxcblxcdC5wbGF5ZXItdHVybiB7XFxyXFxuXFx0XFx0Zm9udC1mYW1pbHk6ICdRdWFudGljbycsIHNhbnMtc2VyaWY7XFxyXFxuXFx0XFx0cGFkZGluZzogMTBweDtcXHJcXG5cXHRcXHR0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuXFx0fVxcclxcblxcdFxcclxcblxcdC53YWxsLWNvdW50ZXItZGl2IHtcXHJcXG5cXHRcXHRtYXJnaW46IDJlbSBhdXRvO1xcclxcblxcdFxcdGRpc3BsYXk6IGZsZXg7XFxyXFxuXFx0fVxcclxcblxcdC53YWxsLWNvdW50ZXIge1xcclxcblxcdFxcdGZvbnQtZmFtaWx5OiAnUXVhbnRpY28nLCBzYW5zLXNlcmlmO1xcclxcblxcdFxcdGZvbnQtc2l6ZTogMWVtO1xcclxcblxcdFxcdG1heC13aWR0aDogNzVweDtcXHJcXG5cXHRcXHRtYXJnaW4tbGVmdDogMjBweDtcXHJcXG5cXHRcXHRtYXJnaW4tcmlnaHQ6IDIwcHg7XFxyXFxuXFx0fVxcclxcblxcdFxcclxcbn1cXHJcXG5cXHJcXG4vKiBtZWRpdW0gcGhvbmUgKi9cXHJcXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDM3NnB4KSBhbmQgKG1pbi13aWR0aDogMzIycHgpIHtcXHJcXG5cXHR0YWJsZSB7XFxyXFxuXFx0XFx0Zm9udC1zaXplOiAxZW07XFxyXFxuXFx0fVxcclxcblxcdFxcclxcblxcdC5oaWRlIHtcXHJcXG5cXHRcXHRkaXNwbGF5OiBub25lO1xcclxcblxcdH1cXHJcXG5cXHJcXG5cXHQjYm9hcmQge1xcclxcblxcdFxcdHdpZHRoOiA5NSU7XFxyXFxuXFx0XFx0bWF4LWhlaWdodDogMzM2MHB4O1xcclxcblxcdFxcdG1hcmdpbi10b3A6IDJlbTtcXHJcXG5cXHRcXHRtYXJnaW4tbGVmdDogYXV0bztcXHJcXG5cXHRcXHRtYXJnaW4tcmlnaHQ6IGF1dG87XFxyXFxuXFx0fVxcclxcblxcclxcblxcdC53YWxsLXRvcCB7XFxyXFxuXFx0XFx0Ym9yZGVyLXRvcDogMnB4IHNvbGlkICNGRkIwMDA7XFxyXFxuXFx0XFx0ei1pbmRleDogOTtcXHJcXG5cXHR9XFxyXFxuXFx0XFxyXFxuXFx0LndhbGwtYm90dG9tIHtcXHJcXG5cXHRcXHRib3JkZXItYm90dG9tOiAycHggc29saWQgI0ZGQjAwMDtcXHJcXG5cXHRcXHR6LWluZGV4OiA5O1xcclxcblxcdH1cXHJcXG5cXHRcXHJcXG5cXHQud2FsbC1yaWdodCB7XFxyXFxuXFx0XFx0Ym9yZGVyLXJpZ2h0OiAycHggc29saWQgI0ZGQjAwMDtcXHJcXG5cXHRcXHR6LWluZGV4OiA5O1xcclxcblxcdH1cXHJcXG5cXHRcXHJcXG5cXHQud2FsbC1sZWZ0IHtcXHJcXG5cXHRcXHRib3JkZXItbGVmdDogMnB4IHNvbGlkICNGRkIwMDA7XFxyXFxuXFx0XFx0ei1pbmRleDogOTtcXHJcXG5cXHR9XFxyXFxuXFx0XFxyXFxuXFx0LnRhYmxlIHsgXFxyXFxuXFx0XFx0d2lkdGg6IDEwMHZ3O1xcclxcblxcdFxcdGJvcmRlci1zcGFjaW5nOiAwOyBcXHJcXG5cXHRcXHRkaXNwbGF5OiBmbGV4O1xcclxcblxcdFxcdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuXFx0fVxcclxcblxcdC5oYWxsIHsgXFxyXFxuXFx0XFx0LyogYm9yZGVyOiA1cHggc29saWQgIzNBNjM4RTsgICovXFxyXFxuXFx0XFx0Lyogd2lkdGg6IDRlbTsgaGVpZ2h0OiA0ZW07ICAqL1xcclxcblxcdFxcdHotaW5kZXg6IDU7XFxyXFxuXFx0fVxcclxcblxcdC50YWJsZSAuZmxvb3IgeyBcXHJcXG5cXHRcXHQvKiBiYWNrZ3JvdW5kOiBicm93bjsgICovXFxyXFxuXFx0XFx0Ly8gbWFyZ2luOiAxcHg7XFxyXFxuXFx0fVxcclxcblxcdFxcclxcblxcdFxcclxcblxcdHRkIHtcXHJcXG5cXHRcXHR3aWR0aDogMzZweDtcXHJcXG5cXHRcXHRoZWlnaHQ6IDM2cHg7XFxyXFxuXFx0XFx0Ym9yZGVyOiAycHggc29saWQgIzRENjE4QjtcXHJcXG5cXHRcXHRiYWNrZ3JvdW5kOiAjNzY4NkE4OyBcXHJcXG5cXHR9XFxyXFxuXFx0dHIge1xcclxcblxcdFxcdGhlaWdodDogNDNweDtcXHJcXG5cXHR9XFxyXFxuXFx0XFxyXFxuXFx0LmJ1dHRvbiB7XFxyXFxuXFx0XFx0LyogbWFyZ2luOiAyMHB4IGF1dG87ICovXFxyXFxuXFx0XFx0cGFkZGluZzogNXB4IDdweDtcXHJcXG5cXHR9XFxyXFxuXFx0LmNvbnRyb2xsZXItZGl2IHtcXHJcXG5cXHRcXHRtYXJnaW46IDFlbSBhdXRvO1xcclxcblxcdFxcdHdpZHRoOiA4MCU7XFxyXFxuXFx0XFx0cGFkZGluZzogNXB4IDdweDtcXHJcXG5cXHRcXHRkaXNwbGF5OiBmbGV4O1xcclxcblxcdFxcdGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG5cXHR9XFxyXFxuXFxyXFxuXFxyXFxuXFx0LmNvbnRyb2xsZXItYnRuIHtcXHJcXG5cXHRcXHRiYWNrZ3JvdW5kOiAjQjhDM0Q5O1xcclxcblxcdFxcdGZvbnQtZmFtaWx5OiAnUXVhbnRpY28nLCBzYW5zLXNlcmlmO1xcclxcblxcdFxcdC8vIGxldHRlci1zcGFjaW5nOiAwLjA1cmVtO1xcclxcblxcdFxcdGN1cnNvcjogcG9pbnRlcjtcXHJcXG5cXHRcXHRib3JkZXI6IG5vbmU7XFxyXFxuXFx0XFx0bWFyZ2luOiBhdXRvO1xcclxcblxcdFxcdGhlaWdodDogNDVweDtcXHJcXG5cXHRcXHR3aWR0aDogMTAwcHg7XFxyXFxuXFx0XFx0dHJhbnNpdGlvbjogdHJhbnNmb3JtIC4zcyBlYXNlLWluLW91dDtcXHJcXG5cXHRcXHRib3gtc2hhZG93OiBcXHJcXG5cXHRcXHRcXHQwIDEuNHB4IDEuMXB4IHJnYmEoMCwgMCwgMCwgMC4wMzQpLFxcclxcblxcdFxcdFxcdDAgMy40cHggMi42cHggcmdiYSgwLCAwLCAwLCAwLjA0OCksXFxyXFxuXFx0XFx0XFx0MCA3LjdweCA1cHggcmdiYSgwLCAwLCAwLCAwLjA2KSxcXHJcXG5cXHRcXHRcXHQwIDExLjE1cHggOC41cHggcmdiYSgwLCAwLCAwLCAwLjA4NiksXFxyXFxuXFx0XFx0XFx0MCA1MHB4IDQwcHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcXHJcXG5cXHR9XFxyXFxuXFxyXFxuXFx0LmNvbnRyb2xsZXItYnRuOmhvdmVyIHtcXHJcXG5cXHRcXHR0cmFuc2l0aW9uOiAuM3MgZWFzZS1pbi1vdXQ7XFxyXFxuXFx0XFx0YmFja2dyb3VuZDogIzczODNBNjtcXHJcXG5cXHRcXHRib3gtc2hhZG93OiBcXHJcXG5cXHRcXHRcXHQwIDIuOHB4IDIuMnB4IHJnYmEoMCwgMCwgMCwgMC4wMzQpLFxcclxcblxcdFxcdFxcdDAgNi43cHggNS4zcHggcmdiYSgwLCAwLCAwLCAwLjA0OCksXFxyXFxuXFx0XFx0XFx0MCAxNS41cHggMTBweCByZ2JhKDAsIDAsIDAsIDAuMDYpLFxcclxcblxcdFxcdFxcdDAgMjIuM3B4IDE3LjlweCByZ2JhKDAsIDAsIDAsIDAuMDg2KSxcXHJcXG5cXHRcXHRcXHQwIDEwMHB4IDgwcHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcXHJcXG5cXHR9XFx0XFxyXFxuXFx0XFxyXFxuXFx0LnBsYXllciB7XFxyXFxuXFx0XFx0Zm9udC1zaXplOiAxLjdlbTtcXHJcXG5cXHRcXHRsaW5lLWhlaWdodDogMzZweDtcXHJcXG5cXHRcXHR0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuXFx0fVxcclxcblxcdFxcclxcblxcdC5oaWdobGlnaHQge1xcclxcblxcdFxcdGJhY2tncm91bmQ6ICM4REJCNUU7XFxyXFxuXFx0fVxcclxcblxcdC5oaWdobGlnaHQ6aG92ZXJ7XFxyXFxuXFx0XFx0YmFja2dyb3VuZDogI0JERTI5NztcXHJcXG5cXHR9XFxyXFxuXFx0XFxyXFxuXFx0LnNlbGVjdGVkV2FsbCB7XFxyXFxuXFx0XFx0YmFja2dyb3VuZDogI0IwMkQxRjtcXHJcXG5cXHR9XFxyXFxuXFx0XFxyXFxuXFx0LnBsYXllci10dXJuIHtcXHJcXG5cXHRcXHRmb250LWZhbWlseTogJ1F1YW50aWNvJywgc2Fucy1zZXJpZjtcXHJcXG5cXHRcXHRwYWRkaW5nOiAxMHB4O1xcclxcblxcdFxcdHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG5cXHR9XFxyXFxuXFx0XFxyXFxuXFx0LndhbGwtY291bnRlci1kaXYge1xcclxcblxcdFxcdG1hcmdpbjogMmVtIGF1dG87XFxyXFxuXFx0XFx0ZGlzcGxheTogZmxleDtcXHJcXG5cXHR9XFxyXFxuXFx0LndhbGwtY291bnRlciB7XFxyXFxuXFx0XFx0Zm9udC1mYW1pbHk6ICdRdWFudGljbycsIHNhbnMtc2VyaWY7XFxyXFxuXFx0XFx0Zm9udC1zaXplOiAxZW07XFxyXFxuXFx0XFx0bWF4LXdpZHRoOiA3NXB4O1xcclxcblxcdFxcdG1hcmdpbi1sZWZ0OiAyMHB4O1xcclxcblxcdFxcdG1hcmdpbi1yaWdodDogMjBweDtcXHJcXG5cXHR9XFxyXFxuXFx0XFxyXFxufVxcclxcblxcclxcbi8qIGxhcmdlIHBob25lICovXFxyXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2NDBweCkgYW5kIChtaW4td2lkdGg6IDM3N3B4KSB7XFxyXFxuXFx0dGFibGUge1xcclxcblxcdFxcdGZvbnQtc2l6ZTogMWVtO1xcclxcblxcdFxcdFxcclxcblxcdH1cXHJcXG5cXHRcXHJcXG5cXHQuaGlkZSB7XFxyXFxuXFx0XFx0ZGlzcGxheTogbm9uZTtcXHJcXG5cXHR9XFxyXFxuXFxyXFxuXFx0I2JvYXJkIHtcXHJcXG5cXHRcXHR3aWR0aDogMzg3cHg7XFxyXFxuXFx0XFx0bWF4LWhlaWdodDogMzg3cHg7XFxyXFxuXFx0XFx0bWFyZ2luLXRvcDogMmVtO1xcclxcblxcdFxcdG1hcmdpbi1sZWZ0OiBhdXRvO1xcclxcblxcdFxcdG1hcmdpbi1yaWdodDogYXV0bztcXHJcXG5cXHR9XFxyXFxuXFxyXFxuXFx0LndhbGwtdG9wIHtcXHJcXG5cXHRcXHRib3JkZXItdG9wOiAycHggc29saWQgI0ZGQjAwMDtcXHJcXG5cXHRcXHR6LWluZGV4OiA5O1xcclxcblxcdH1cXHJcXG5cXHRcXHJcXG5cXHQud2FsbC1ib3R0b20ge1xcclxcblxcdFxcdGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjRkZCMDAwO1xcclxcblxcdFxcdHotaW5kZXg6IDk7XFxyXFxuXFx0fVxcclxcblxcdFxcclxcblxcdC53YWxsLXJpZ2h0IHtcXHJcXG5cXHRcXHRib3JkZXItcmlnaHQ6IDJweCBzb2xpZCAjRkZCMDAwO1xcclxcblxcdFxcdHotaW5kZXg6IDk7XFxyXFxuXFx0fVxcclxcblxcdFxcclxcblxcdC53YWxsLWxlZnQge1xcclxcblxcdFxcdGJvcmRlci1sZWZ0OiAycHggc29saWQgI0ZGQjAwMDtcXHJcXG5cXHRcXHR6LWluZGV4OiA5O1xcclxcblxcdH1cXHJcXG5cXHRcXHJcXG5cXHQudGFibGUgeyBcXHJcXG5cXHRcXHR3aWR0aDogMTAwdnc7XFxyXFxuXFx0XFx0Ym9yZGVyLXNwYWNpbmc6IDA7IFxcclxcblxcdFxcdGRpc3BsYXk6IGZsZXg7XFxyXFxuXFx0XFx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG5cXHR9XFxyXFxuXFx0LmhhbGwgeyBcXHJcXG5cXHRcXHQvKiBib3JkZXI6IDVweCBzb2xpZCAjM0E2MzhFOyAgKi9cXHJcXG5cXHRcXHQvKiB3aWR0aDogNGVtOyBoZWlnaHQ6IDRlbTsgICovXFxyXFxuXFx0XFx0ei1pbmRleDogNTtcXHJcXG5cXHR9XFxyXFxuXFx0XFxyXFxuXFx0dGQge1xcclxcblxcdFxcdHdpZHRoOiAzOXB4O1xcclxcblxcdFxcdGhlaWdodDogMzlweDtcXHJcXG5cXHRcXHRib3JkZXI6IDJweCBzb2xpZCAjNEQ2MThCO1xcclxcblxcdFxcdGJhY2tncm91bmQ6ICM3Njg2QTg7IFxcclxcblxcdH1cXHJcXG5cXHR0ciB7XFxyXFxuXFx0XFx0aGVpZ2h0OiA0M3B4O1xcclxcblxcdH1cXHJcXG5cXHRcXHJcXG5cXHQuYnV0dG9uIHtcXHJcXG5cXHRcXHQvKiBtYXJnaW46IDIwcHggYXV0bzsgKi9cXHJcXG5cXHRcXHRwYWRkaW5nOiA1cHggN3B4O1xcclxcblxcdH1cXHJcXG5cXHQuY29udHJvbGxlci1kaXYge1xcclxcblxcdFxcdG1hcmdpbjogMWVtIGF1dG87XFxyXFxuXFx0XFx0d2lkdGg6IDgwJTtcXHJcXG5cXHRcXHRwYWRkaW5nOiA1cHggN3B4O1xcclxcblxcdFxcdGRpc3BsYXk6IGZsZXg7XFxyXFxuXFx0XFx0anVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcblxcdH1cXHJcXG5cXHJcXG5cXHJcXG5cXHQuY29udHJvbGxlci1idG4ge1xcclxcblxcdFxcdGJhY2tncm91bmQ6ICNCOEMzRDk7XFxyXFxuXFx0XFx0Zm9udC1mYW1pbHk6ICdRdWFudGljbycsIHNhbnMtc2VyaWY7XFxyXFxuXFx0XFx0Ly8gbGV0dGVyLXNwYWNpbmc6IDAuMDVyZW07XFxyXFxuXFx0XFx0Y3Vyc29yOiBwb2ludGVyO1xcclxcblxcdFxcdGJvcmRlcjogbm9uZTtcXHJcXG5cXHRcXHRtYXJnaW46IGF1dG87XFxyXFxuXFx0XFx0aGVpZ2h0OiA0NXB4O1xcclxcblxcdFxcdHdpZHRoOiAxMDBweDtcXHJcXG5cXHRcXHR0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gLjNzIGVhc2UtaW4tb3V0O1xcclxcblxcdFxcdGJveC1zaGFkb3c6IFxcclxcblxcdFxcdFxcdDAgMS40cHggMS4xcHggcmdiYSgwLCAwLCAwLCAwLjAzNCksXFxyXFxuXFx0XFx0XFx0MCAzLjRweCAyLjZweCByZ2JhKDAsIDAsIDAsIDAuMDQ4KSxcXHJcXG5cXHRcXHRcXHQwIDcuN3B4IDVweCByZ2JhKDAsIDAsIDAsIDAuMDYpLFxcclxcblxcdFxcdFxcdDAgMTEuMTVweCA4LjVweCByZ2JhKDAsIDAsIDAsIDAuMDg2KSxcXHJcXG5cXHRcXHRcXHQwIDUwcHggNDBweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xcclxcblxcdH1cXHJcXG5cXHJcXG5cXHQuY29udHJvbGxlci1idG46aG92ZXIge1xcclxcblxcdFxcdHRyYW5zaXRpb246IC4zcyBlYXNlLWluLW91dDtcXHJcXG5cXHRcXHRiYWNrZ3JvdW5kOiAjNzM4M0E2O1xcclxcblxcdFxcdGJveC1zaGFkb3c6IFxcclxcblxcdFxcdFxcdDAgMi44cHggMi4ycHggcmdiYSgwLCAwLCAwLCAwLjAzNCksXFxyXFxuXFx0XFx0XFx0MCA2LjdweCA1LjNweCByZ2JhKDAsIDAsIDAsIDAuMDQ4KSxcXHJcXG5cXHRcXHRcXHQwIDE1LjVweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4wNiksXFxyXFxuXFx0XFx0XFx0MCAyMi4zcHggMTcuOXB4IHJnYmEoMCwgMCwgMCwgMC4wODYpLFxcclxcblxcdFxcdFxcdDAgMTAwcHggODBweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xcclxcblxcdH1cXHJcXG5cXHRcXHJcXG5cXHQucGxheWVyIHtcXHJcXG5cXHRcXHRmb250LXNpemU6IDEuN2VtO1xcclxcblxcdFxcdGxpbmUtaGVpZ2h0OiA0M3B4O1xcclxcblxcdFxcdHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG5cXHR9XFxyXFxuXFx0XFxyXFxuXFx0LmhpZ2hsaWdodCB7XFxyXFxuXFx0XFx0YmFja2dyb3VuZDogIzhEQkI1RTtcXHJcXG5cXHR9XFxyXFxuXFx0LmhpZ2hsaWdodDpob3ZlcntcXHJcXG5cXHRcXHRiYWNrZ3JvdW5kOiAjQkRFMjk3O1xcclxcblxcdH1cXHJcXG5cXHRcXHJcXG5cXHQuc2VsZWN0ZWRXYWxsIHtcXHJcXG5cXHRcXHRiYWNrZ3JvdW5kOiAjQjAyRDFGO1xcclxcblxcdH1cXHJcXG5cXHRcXHJcXG5cXHQucGxheWVyLXR1cm4ge1xcclxcblxcdFxcdGZvbnQtZmFtaWx5OiAnUXVhbnRpY28nLCBzYW5zLXNlcmlmO1xcclxcblxcdFxcdHBhZGRpbmc6IDEzcHg7XFxyXFxuXFx0XFx0dGV4dC1hbGlnbjogY2VudGVyO1xcclxcblxcdH1cXHJcXG5cXHRcXHJcXG5cXHQud2FsbC1jb3VudGVyLWRpdiB7XFxyXFxuXFx0XFx0bWFyZ2luOiAyZW0gYXV0bztcXHJcXG5cXHRcXHRkaXNwbGF5OiBmbGV4O1xcclxcblxcdH1cXHJcXG5cXHQud2FsbC1jb3VudGVyIHtcXHJcXG5cXHRcXHRmb250LWZhbWlseTogJ1F1YW50aWNvJywgc2Fucy1zZXJpZjtcXHJcXG5cXHRcXHRmb250LXNpemU6IDEuMjVlbTtcXHJcXG5cXHRcXHRtYXgtd2lkdGg6IDgwcHg7XFxyXFxuXFx0XFx0bWFyZ2luLWxlZnQ6IDIwcHg7XFxyXFxuXFx0XFx0bWFyZ2luLXJpZ2h0OiAyMHB4O1xcclxcblxcdH1cXHJcXG5cXHRcXHJcXG59XFxyXFxuXFxyXFxuLyogdGFibGV0ICovXFxyXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweCkgYW5kIChtaW4td2lkdGg6IDY0MXB4KSB7XFxyXFxuXFxyXFxuXFx0dGFibGUge1xcclxcblxcdFxcdGZvbnQtc2l6ZTogMWVtO1xcclxcblxcdH1cXHJcXG5cXHRcXHJcXG5cXHQuaGlkZSB7XFxyXFxuXFx0XFx0ZGlzcGxheTogbm9uZTtcXHJcXG5cXHR9XFxyXFxuXFxyXFxuXFx0I2JvYXJkIHtcXHJcXG5cXHRcXHR3aWR0aDogNDk1cHg7XFxyXFxuXFx0XFx0aGVpZ2h0OiA0OTVweDtcXHJcXG5cXHRcXHRtYXJnaW4tdG9wOiAyZW07XFxyXFxuXFx0XFx0bWFyZ2luLWxlZnQ6IGF1dG87XFxyXFxuXFx0XFx0bWFyZ2luLXJpZ2h0OiBhdXRvO1xcclxcblxcdH1cXHJcXG5cXHRcXHJcXG5cXHQud2FsbC10b3Age1xcclxcblxcdFxcdGJvcmRlci10b3A6IDNweCBzb2xpZCAjRkZCMDAwO1xcclxcblxcdFxcdHotaW5kZXg6IDk7XFxyXFxuXFx0fVxcclxcblxcdFxcclxcblxcdC53YWxsLWJvdHRvbSB7XFxyXFxuXFx0XFx0Ym9yZGVyLWJvdHRvbTogM3B4IHNvbGlkICNGRkIwMDA7XFxyXFxuXFx0XFx0ei1pbmRleDogOTtcXHJcXG5cXHR9XFxyXFxuXFx0XFxyXFxuXFx0LndhbGwtcmlnaHQge1xcclxcblxcdFxcdGJvcmRlci1yaWdodDogM3B4IHNvbGlkICNGRkIwMDA7XFxyXFxuXFx0XFx0ei1pbmRleDogOTtcXHJcXG5cXHR9XFxyXFxuXFx0XFxyXFxuXFx0LndhbGwtbGVmdCB7XFxyXFxuXFx0XFx0Ym9yZGVyLWxlZnQ6IDNweCBzb2xpZCAjRkZCMDAwO1xcclxcblxcdFxcdHotaW5kZXg6IDk7XFxyXFxuXFx0fVxcclxcblxcdFxcclxcblxcdC50YWJsZSB7IFxcclxcblxcdFxcdGJvcmRlci1zcGFjaW5nOiAwOyBcXHJcXG5cXHRcXHRkaXNwbGF5OiBmbGV4O1xcclxcblxcdFxcdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuXFx0fVxcclxcblxcclxcblxcdC5oYWxsIHsgXFxyXFxuXFx0XFx0ei1pbmRleDogNTtcXHJcXG5cXHR9XFxyXFxuXFx0XFxyXFxuXFx0dGQge1xcclxcblxcdFxcdHdpZHRoOiA0OXB4O1xcclxcblxcdFxcdGhlaWdodDogNDlweDtcXHJcXG5cXHRcXHRib3JkZXI6IDNweCBzb2xpZCAjNEQ2MThCO1xcclxcblxcdFxcdGJhY2tncm91bmQ6ICM3Njg2QTg7IFxcclxcblxcdH1cXHJcXG5cXHR0ciB7XFxyXFxuXFx0XFx0aGVpZ2h0OiA1NXB4O1xcclxcblxcdH1cXHJcXG5cXHRcXHJcXG5cXHQuYnV0dG9uIHtcXHJcXG5cXHRcXHRwYWRkaW5nOiA1cHggN3B4O1xcclxcblxcdH1cXHJcXG5cXHJcXG5cXHQuY29udHJvbGxlci1kaXYge1xcclxcblxcdFxcdG1hcmdpbjogMWVtIGF1dG87XFxyXFxuXFx0XFx0d2lkdGg6IDgwJTtcXHJcXG5cXHRcXHRwYWRkaW5nOiA1cHggN3B4O1xcclxcblxcdFxcdGRpc3BsYXk6IGZsZXg7XFxyXFxuXFx0XFx0anVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcblxcdH1cXHJcXG5cXHQuY29udHJvbGxlci1idG4ge1xcclxcblxcdFxcdGJhY2tncm91bmQ6ICNCOEMzRDk7XFxyXFxuXFx0XFx0Zm9udC1mYW1pbHk6ICdRdWFudGljbycsIHNhbnMtc2VyaWY7XFxyXFxuXFx0XFx0Y3Vyc29yOiBwb2ludGVyO1xcclxcblxcdFxcdGJvcmRlcjogbm9uZTtcXHJcXG5cXHRcXHRtYXJnaW46IGF1dG87XFxyXFxuXFx0XFx0aGVpZ2h0OiA0NXB4O1xcclxcblxcdFxcdHdpZHRoOiAxMDBweDtcXHJcXG5cXHRcXHR0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gLjNzIGVhc2UtaW4tb3V0O1xcclxcblxcdFxcdGJveC1zaGFkb3c6IFxcclxcblxcdFxcdFxcdDAgMS40cHggMS4xcHggcmdiYSgwLCAwLCAwLCAwLjAzNCksXFxyXFxuXFx0XFx0XFx0MCAzLjRweCAyLjZweCByZ2JhKDAsIDAsIDAsIDAuMDQ4KSxcXHJcXG5cXHRcXHRcXHQwIDcuN3B4IDVweCByZ2JhKDAsIDAsIDAsIDAuMDYpLFxcclxcblxcdFxcdFxcdDAgMTEuMTVweCA4LjVweCByZ2JhKDAsIDAsIDAsIDAuMDg2KSxcXHJcXG5cXHRcXHRcXHQwIDUwcHggNDBweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xcclxcblxcdH1cXHJcXG5cXHQuY29udHJvbGxlci1idG46aG92ZXIge1xcclxcblxcdFxcdHRyYW5zaXRpb246IC4zcyBlYXNlLWluLW91dDtcXHJcXG5cXHRcXHRiYWNrZ3JvdW5kOiAjNzM4M0E2O1xcclxcblxcdFxcdGJveC1zaGFkb3c6IFxcclxcblxcdFxcdFxcdDAgMi44cHggMi4ycHggcmdiYSgwLCAwLCAwLCAwLjAzNCksXFxyXFxuXFx0XFx0XFx0MCA2LjdweCA1LjNweCByZ2JhKDAsIDAsIDAsIDAuMDQ4KSxcXHJcXG5cXHRcXHRcXHQwIDE1LjVweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4wNiksXFxyXFxuXFx0XFx0XFx0MCAyMi4zcHggMTcuOXB4IHJnYmEoMCwgMCwgMCwgMC4wODYpLFxcclxcblxcdFxcdFxcdDAgMTAwcHggODBweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xcclxcblxcdH1cXHJcXG5cXHRcXHJcXG5cXHQucGxheWVyIHtcXHJcXG5cXHRcXHRmb250LXNpemU6IDEuNzVlbTtcXHJcXG5cXHRcXHRsaW5lLWhlaWdodDogNTVweDtcXHJcXG5cXHRcXHR0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuXFx0fVxcclxcblxcdFxcclxcblxcdC5oaWdobGlnaHQge1xcclxcblxcdFxcdGJhY2tncm91bmQ6ICM4REJCNUU7XFxyXFxuXFx0fVxcclxcblxcdC5oaWdobGlnaHQ6aG92ZXJ7XFxyXFxuXFx0XFx0YmFja2dyb3VuZDogI0JERTI5NztcXHJcXG5cXHR9XFx0XFxyXFxuXFx0LnNlbGVjdGVkV2FsbCB7XFxyXFxuXFx0XFx0YmFja2dyb3VuZDogI0IwMkQxRjtcXHJcXG5cXHR9XFx0XFxyXFxuXFxyXFxuXFx0LnBsYXllci10dXJuIHtcXHJcXG5cXHRcXHRmb250LWZhbWlseTogJ1F1YW50aWNvJywgc2Fucy1zZXJpZjtcXHJcXG5cXHRcXHRwYWRkaW5nOiAyMHB4O1xcclxcblxcdFxcdG1hcmdpbjogMCBhdXRvO1xcclxcblxcdH1cXHJcXG5cXHRcXHJcXG5cXHQud2FsbC1jb3VudGVyLWRpdiB7XFxyXFxuXFx0XFx0bWFyZ2luLXRvcDogMzBweDtcXHJcXG5cXHRcXHRkaXNwbGF5OiBmbGV4O1xcclxcblxcdH1cXHJcXG5cXHQud2FsbC1jb3VudGVyIHtcXHJcXG5cXHRcXHRmb250LWZhbWlseTogJ1F1YW50aWNvJywgc2Fucy1zZXJpZjtcXHJcXG5cXHRcXHRtYXJnaW46IGF1dG87XFxyXFxuXFx0fVxcclxcbn1cXHJcXG5cXHJcXG4vKiBsYXB0b3AgMTAyNHB4ICovXFxyXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAxMDI0cHgpIGFuZCAobWluLXdpZHRoOiA3NjlweCkge1xcclxcblxcclxcblxcdHRhYmxlIHtcXHJcXG5cXHRcXHRmb250LXNpemU6IDFlbTtcXHJcXG5cXHR9XFxyXFxuXFx0XFxyXFxuXFx0LmhpZGUge1xcclxcblxcdFxcdGRpc3BsYXk6IG5vbmU7XFxyXFxuXFx0fVxcclxcblxcclxcblxcdCNib2FyZCB7XFxyXFxuXFx0XFx0d2lkdGg6IDQ5NXB4O1xcclxcblxcdFxcdGhlaWdodDogNDk1cHg7XFxyXFxuXFx0XFx0bWFyZ2luLXRvcDogMWVtO1xcclxcblxcdFxcdG1hcmdpbi1sZWZ0OiBhdXRvO1xcclxcblxcdFxcdG1hcmdpbi1yaWdodDogYXV0bztcXHJcXG5cXHR9XFxyXFxuXFx0XFxyXFxuXFx0LndhbGwtdG9wIHtcXHJcXG5cXHRcXHRib3JkZXItdG9wOiAzcHggc29saWQgI0ZGQjAwMDtcXHJcXG5cXHRcXHR6LWluZGV4OiA5O1xcclxcblxcdH1cXHJcXG5cXHRcXHJcXG5cXHQud2FsbC1ib3R0b20ge1xcclxcblxcdFxcdGJvcmRlci1ib3R0b206IDNweCBzb2xpZCAjRkZCMDAwO1xcclxcblxcdFxcdHotaW5kZXg6IDk7XFxyXFxuXFx0fVxcclxcblxcdFxcclxcblxcdC53YWxsLXJpZ2h0IHtcXHJcXG5cXHRcXHRib3JkZXItcmlnaHQ6IDNweCBzb2xpZCAjRkZCMDAwO1xcclxcblxcdFxcdHotaW5kZXg6IDk7XFxyXFxuXFx0fVxcclxcblxcdFxcclxcblxcdC53YWxsLWxlZnQge1xcclxcblxcdFxcdGJvcmRlci1sZWZ0OiAzcHggc29saWQgI0ZGQjAwMDtcXHJcXG5cXHRcXHR6LWluZGV4OiA5O1xcclxcblxcdH1cXHJcXG5cXHRcXHJcXG5cXHQudGFibGUgeyBcXHJcXG5cXHRcXHRib3JkZXItc3BhY2luZzogMDsgXFxyXFxuXFx0XFx0ZGlzcGxheTogZmxleDtcXHJcXG5cXHRcXHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcblxcdH1cXHJcXG5cXHJcXG5cXHQuaGFsbCB7IFxcclxcblxcdFxcdHotaW5kZXg6IDU7XFxyXFxuXFx0fVxcclxcblxcdFxcclxcblxcdHRkIHtcXHJcXG5cXHRcXHR3aWR0aDogNDlweDtcXHJcXG5cXHRcXHRoZWlnaHQ6IDQ5cHg7XFxyXFxuXFx0XFx0Ym9yZGVyOiAzcHggc29saWQgIzRENjE4QjtcXHJcXG5cXHRcXHRiYWNrZ3JvdW5kOiAjNzY4NkE4OyBcXHJcXG5cXHR9XFxyXFxuXFx0dHIge1xcclxcblxcdFxcdGhlaWdodDogNTVweDtcXHJcXG5cXHR9XFxyXFxuXFx0XFxyXFxuXFx0LmJ1dHRvbiB7XFxyXFxuXFx0XFx0cGFkZGluZzogNXB4IDdweDtcXHJcXG5cXHR9XFxyXFxuXFxyXFxuXFx0LmNvbnRyb2xsZXItZGl2IHtcXHJcXG5cXHRcXHRtYXJnaW46IDFlbSBhdXRvO1xcclxcblxcdFxcdHdpZHRoOiA4MCU7XFxyXFxuXFx0XFx0cGFkZGluZzogNXB4IDdweDtcXHJcXG5cXHRcXHRkaXNwbGF5OiBmbGV4O1xcclxcblxcdFxcdGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG5cXHR9XFxyXFxuXFx0LmNvbnRyb2xsZXItYnRuIHtcXHJcXG5cXHRcXHRiYWNrZ3JvdW5kOiAjQjhDM0Q5O1xcclxcblxcdFxcdGZvbnQtZmFtaWx5OiAnUXVhbnRpY28nLCBzYW5zLXNlcmlmO1xcclxcblxcdFxcdGZvbnQtc2l6ZTogMWVtO1xcclxcblxcdFxcdGN1cnNvcjogcG9pbnRlcjtcXHJcXG5cXHRcXHRib3JkZXI6IG5vbmU7XFxyXFxuXFx0XFx0bWFyZ2luOiBhdXRvO1xcclxcblxcdFxcdGhlaWdodDogNTVweDtcXHJcXG5cXHRcXHR3aWR0aDogMTMzcHg7XFxyXFxuXFx0XFx0dHJhbnNpdGlvbjogdHJhbnNmb3JtIC4zcyBlYXNlLWluLW91dDtcXHJcXG5cXHRcXHRib3gtc2hhZG93OiBcXHJcXG5cXHRcXHRcXHQwIDEuNHB4IDEuMXB4IHJnYmEoMCwgMCwgMCwgMC4wMzQpLFxcclxcblxcdFxcdFxcdDAgMy40cHggMi42cHggcmdiYSgwLCAwLCAwLCAwLjA0OCksXFxyXFxuXFx0XFx0XFx0MCA3LjdweCA1cHggcmdiYSgwLCAwLCAwLCAwLjA2KSxcXHJcXG5cXHRcXHRcXHQwIDExLjE1cHggOC41cHggcmdiYSgwLCAwLCAwLCAwLjA4NiksXFxyXFxuXFx0XFx0XFx0MCA1MHB4IDQwcHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcXHJcXG5cXHR9XFxyXFxuXFx0LmNvbnRyb2xsZXItYnRuOmhvdmVyIHtcXHJcXG5cXHRcXHR0cmFuc2l0aW9uOiAuM3MgZWFzZS1pbi1vdXQ7XFxyXFxuXFx0XFx0YmFja2dyb3VuZDogIzczODNBNjtcXHJcXG5cXHRcXHRib3gtc2hhZG93OiBcXHJcXG5cXHRcXHRcXHQwIDIuOHB4IDIuMnB4IHJnYmEoMCwgMCwgMCwgMC4wMzQpLFxcclxcblxcdFxcdFxcdDAgNi43cHggNS4zcHggcmdiYSgwLCAwLCAwLCAwLjA0OCksXFxyXFxuXFx0XFx0XFx0MCAxNS41cHggMTBweCByZ2JhKDAsIDAsIDAsIDAuMDYpLFxcclxcblxcdFxcdFxcdDAgMjIuM3B4IDE3LjlweCByZ2JhKDAsIDAsIDAsIDAuMDg2KSxcXHJcXG5cXHRcXHRcXHQwIDEwMHB4IDgwcHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcXHJcXG5cXHR9XFxyXFxuXFx0XFxyXFxuXFx0LnBsYXllciB7XFxyXFxuXFx0XFx0Zm9udC1zaXplOiAxLjc1ZW07XFxyXFxuXFx0XFx0bGluZS1oZWlnaHQ6IDU1cHg7XFxyXFxuXFx0XFx0dGV4dC1hbGlnbjogY2VudGVyO1xcclxcblxcdH1cXHJcXG5cXHRcXHJcXG5cXHQuaGlnaGxpZ2h0IHtcXHJcXG5cXHRcXHRiYWNrZ3JvdW5kOiAjOERCQjVFO1xcclxcblxcdH1cXHJcXG5cXHQuaGlnaGxpZ2h0OmhvdmVye1xcclxcblxcdFxcdGJhY2tncm91bmQ6ICNCREUyOTc7XFxyXFxuXFx0fVxcdFxcclxcblxcdC5zZWxlY3RlZFdhbGwge1xcclxcblxcdFxcdGJhY2tncm91bmQ6ICNCMDJEMUY7XFxyXFxuXFx0fVxcdFxcclxcblxcclxcblxcdC5wbGF5ZXItdHVybiB7XFxyXFxuXFx0XFx0Zm9udC1mYW1pbHk6ICdRdWFudGljbycsIHNhbnMtc2VyaWY7XFxyXFxuXFx0XFx0cGFkZGluZzogMjBweDtcXHJcXG5cXHRcXHRtYXJnaW46IDAgYXV0bztcXHJcXG5cXHR9XFxyXFxuXFx0XFxyXFxuXFx0LndhbGwtY291bnRlci1kaXYge1xcclxcblxcdFxcdG1hcmdpbi10b3A6IDVweDtcXHJcXG5cXHRcXHRkaXNwbGF5OiBmbGV4O1xcclxcblxcdH1cXHJcXG5cXHQud2FsbC1jb3VudGVyIHtcXHJcXG5cXHRcXHRmb250LWZhbWlseTogJ1F1YW50aWNvJywgc2Fucy1zZXJpZjtcXHJcXG5cXHRcXHRtYXJnaW46IGF1dG87XFxyXFxuXFx0fVxcclxcbn1cXHJcXG5cXHJcXG4vKiBsYXJnZSBsYXB0b3AgKi9cXHJcXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDE0NDBweCkgYW5kIChtaW4td2lkdGg6IDEwMjVweCkge1xcclxcblxcclxcblxcdHRhYmxlIHtcXHJcXG5cXHRcXHRmb250LXNpemU6IDFlbTtcXHJcXG5cXHR9XFxyXFxuXFx0XFxyXFxuXFx0LmhpZGUge1xcclxcblxcdFxcdGRpc3BsYXk6IG5vbmU7XFxyXFxuXFx0fVxcclxcblxcclxcblxcdCNib2FyZCB7XFxyXFxuXFx0XFx0d2lkdGg6IDYzMHB4O1xcclxcblxcdFxcdGhlaWdodDogNjMwcHg7XFxyXFxuXFx0XFx0bWFyZ2luLXRvcDogMWVtO1xcclxcblxcdFxcdG1hcmdpbi1sZWZ0OiBhdXRvO1xcclxcblxcdFxcdG1hcmdpbi1yaWdodDogYXV0bztcXHJcXG5cXHR9XFxyXFxuXFx0XFxyXFxuXFx0LndhbGwtdG9wIHtcXHJcXG5cXHRcXHRib3JkZXItdG9wOiAzcHggc29saWQgI0ZGQjAwMDtcXHJcXG5cXHRcXHR6LWluZGV4OiA5O1xcclxcblxcdH1cXHJcXG5cXHRcXHJcXG5cXHQud2FsbC1ib3R0b20ge1xcclxcblxcdFxcdGJvcmRlci1ib3R0b206IDNweCBzb2xpZCAjRkZCMDAwO1xcclxcblxcdFxcdHotaW5kZXg6IDk7XFxyXFxuXFx0fVxcclxcblxcdFxcclxcblxcdC53YWxsLXJpZ2h0IHtcXHJcXG5cXHRcXHRib3JkZXItcmlnaHQ6IDNweCBzb2xpZCAjRkZCMDAwO1xcclxcblxcdFxcdHotaW5kZXg6IDk7XFxyXFxuXFx0fVxcclxcblxcdFxcclxcblxcdC53YWxsLWxlZnQge1xcclxcblxcdFxcdGJvcmRlci1sZWZ0OiAzcHggc29saWQgI0ZGQjAwMDtcXHJcXG5cXHRcXHR6LWluZGV4OiA5O1xcclxcblxcdH1cXHJcXG5cXHRcXHJcXG5cXHQudGFibGUgeyBcXHJcXG5cXHRcXHRib3JkZXItc3BhY2luZzogMDsgXFxyXFxuXFx0XFx0ZGlzcGxheTogZmxleDtcXHJcXG5cXHRcXHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcblxcdH1cXHJcXG5cXHJcXG5cXHQuaGFsbCB7IFxcclxcblxcdFxcdHotaW5kZXg6IDU7XFxyXFxuXFx0fVxcclxcblxcdFxcclxcblxcdHRkIHtcXHJcXG5cXHRcXHR3aWR0aDogNjBweDtcXHJcXG5cXHRcXHRoZWlnaHQ6IDYwcHg7XFxyXFxuXFx0XFx0Ym9yZGVyOiA1cHggc29saWQgIzRENjE4QjtcXHJcXG5cXHRcXHRiYWNrZ3JvdW5kOiAjNzY4NkE4OyBcXHJcXG5cXHR9XFxyXFxuXFx0dHIge1xcclxcblxcdFxcdGhlaWdodDogNzBweDtcXHJcXG5cXHR9XFxyXFxuXFx0XFxyXFxuXFx0LmJ1dHRvbiB7XFxyXFxuXFx0XFx0cGFkZGluZzogNXB4IDdweDtcXHJcXG5cXHR9XFxyXFxuXFxyXFxuXFx0LmNvbnRyb2xsZXItZGl2IHtcXHJcXG5cXHRcXHRtYXJnaW46IDFlbSBhdXRvO1xcclxcblxcdFxcdHdpZHRoOiA4MCU7XFxyXFxuXFx0XFx0cGFkZGluZzogNXB4IDdweDtcXHJcXG5cXHRcXHRkaXNwbGF5OiBmbGV4O1xcclxcblxcdFxcdGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG5cXHR9XFxyXFxuXFx0LmNvbnRyb2xsZXItZGl2ID4gcCB7XFxyXFxuXFx0XFx0Zm9udC1mYW1pbHk6ICdRdWFudGljbycsIHNhbnMtc2VyaWY7XFxyXFxuXFx0XFx0Zm9udC1zaXplOiAxZW07XFxyXFxuXFx0fVxcclxcblxcdC5jb250cm9sbGVyLWJ0biB7XFxyXFxuXFx0XFx0YmFja2dyb3VuZDogI0I4QzNEOTtcXHJcXG5cXHRcXHRmb250LWZhbWlseTogJ1F1YW50aWNvJywgc2Fucy1zZXJpZjtcXHJcXG5cXHRcXHRmb250LXNpemU6IDFlbTtcXHJcXG5cXHRcXHRjdXJzb3I6IHBvaW50ZXI7XFxyXFxuXFx0XFx0Ym9yZGVyOiBub25lO1xcclxcblxcdFxcdG1hcmdpbjogYXV0bztcXHJcXG5cXHRcXHRoZWlnaHQ6IDU1cHg7XFxyXFxuXFx0XFx0d2lkdGg6IDEzM3B4O1xcclxcblxcdFxcdHRyYW5zaXRpb246IHRyYW5zZm9ybSAuM3MgZWFzZS1pbi1vdXQ7XFxyXFxuXFx0XFx0Ym94LXNoYWRvdzogXFxyXFxuXFx0XFx0XFx0MCAxLjRweCAxLjFweCByZ2JhKDAsIDAsIDAsIDAuMDM0KSxcXHJcXG5cXHRcXHRcXHQwIDMuNHB4IDIuNnB4IHJnYmEoMCwgMCwgMCwgMC4wNDgpLFxcclxcblxcdFxcdFxcdDAgNy43cHggNXB4IHJnYmEoMCwgMCwgMCwgMC4wNiksXFxyXFxuXFx0XFx0XFx0MCAxMS4xNXB4IDguNXB4IHJnYmEoMCwgMCwgMCwgMC4wODYpLFxcclxcblxcdFxcdFxcdDAgNTBweCA0MHB4IHJnYmEoMCwgMCwgMCwgMC4xMik7XFxyXFxuXFx0fVxcclxcblxcdC5jb250cm9sbGVyLWJ0bjpob3ZlciB7XFxyXFxuXFx0XFx0dHJhbnNpdGlvbjogLjNzIGVhc2UtaW4tb3V0O1xcclxcblxcdFxcdGJhY2tncm91bmQ6ICM3MzgzQTY7XFxyXFxuXFx0XFx0Ym94LXNoYWRvdzogXFxyXFxuXFx0XFx0XFx0MCAyLjhweCAyLjJweCByZ2JhKDAsIDAsIDAsIDAuMDM0KSxcXHJcXG5cXHRcXHRcXHQwIDYuN3B4IDUuM3B4IHJnYmEoMCwgMCwgMCwgMC4wNDgpLFxcclxcblxcdFxcdFxcdDAgMTUuNXB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjA2KSxcXHJcXG5cXHRcXHRcXHQwIDIyLjNweCAxNy45cHggcmdiYSgwLCAwLCAwLCAwLjA4NiksXFxyXFxuXFx0XFx0XFx0MCAxMDBweCA4MHB4IHJnYmEoMCwgMCwgMCwgMC4xMik7XFxyXFxuXFx0fVxcclxcblxcdFxcclxcblxcdC5wbGF5ZXIge1xcclxcblxcdFxcdGZvbnQtc2l6ZTogMS43NWVtO1xcclxcblxcdFxcdGxpbmUtaGVpZ2h0OiA1NXB4O1xcclxcblxcdFxcdHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG5cXHR9XFxyXFxuXFx0XFxyXFxuXFx0LmhpZ2hsaWdodCB7XFxyXFxuXFx0XFx0YmFja2dyb3VuZDogIzhEQkI1RTtcXHJcXG5cXHR9XFxyXFxuXFx0LmhpZ2hsaWdodDpob3ZlcntcXHJcXG5cXHRcXHRiYWNrZ3JvdW5kOiAjQkRFMjk3O1xcclxcblxcdH1cXHRcXHJcXG5cXHQuc2VsZWN0ZWRXYWxsIHtcXHJcXG5cXHRcXHRiYWNrZ3JvdW5kOiAjQjAyRDFGO1xcclxcblxcdH1cXHRcXHJcXG5cXHJcXG5cXHQucGxheWVyLXR1cm4ge1xcclxcblxcdFxcdGZvbnQtZmFtaWx5OiAnUXVhbnRpY28nLCBzYW5zLXNlcmlmO1xcclxcblxcdFxcdHBhZGRpbmc6IDIwcHg7XFxyXFxuXFx0XFx0bWFyZ2luOiAwIGF1dG87XFxyXFxuXFx0fVxcclxcblxcdFxcclxcblxcdC53YWxsLWNvdW50ZXItZGl2IHtcXHJcXG5cXHRcXHRtYXJnaW4tdG9wOiA1cHg7XFxyXFxuXFx0XFx0ZGlzcGxheTogZmxleDtcXHJcXG5cXHR9XFxyXFxuXFx0LndhbGwtY291bnRlciB7XFxyXFxuXFx0XFx0Zm9udC1mYW1pbHk6ICdRdWFudGljbycsIHNhbnMtc2VyaWY7XFxyXFxuXFx0XFx0bWFyZ2luOiBhdXRvO1xcclxcblxcdH1cXHJcXG59XFxyXFxuXFxyXFxuLyogNGsgbGFwdG9wICovXFxyXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxNDQxcHgpIHtcXHJcXG5cXHJcXG5cXHR0YWJsZSB7XFxyXFxuXFx0XFx0Zm9udC1zaXplOiAxZW07XFxyXFxuXFx0fVxcclxcblxcdFxcclxcblxcdC5oaWRlIHtcXHJcXG5cXHRcXHRkaXNwbGF5OiBub25lO1xcclxcblxcdH1cXHJcXG5cXHJcXG5cXHQjYm9hcmQge1xcclxcblxcdFxcdHdpZHRoOiA3MjBweDtcXHJcXG5cXHRcXHRoZWlnaHQ6IDcyMHB4O1xcclxcblxcdFxcdG1hcmdpbi10b3A6IDNlbTtcXHJcXG5cXHRcXHRtYXJnaW4tbGVmdDogYXV0bztcXHJcXG5cXHRcXHRtYXJnaW4tcmlnaHQ6IGF1dG87XFxyXFxuXFx0fVxcclxcblxcdFxcclxcblxcdC53YWxsLXRvcCB7XFxyXFxuXFx0XFx0Ym9yZGVyLXRvcDogNXB4IHNvbGlkICNGRkIwMDA7XFxyXFxuXFx0XFx0ei1pbmRleDogOTtcXHJcXG5cXHR9XFxyXFxuXFx0XFxyXFxuXFx0LndhbGwtYm90dG9tIHtcXHJcXG5cXHRcXHRib3JkZXItYm90dG9tOiA1cHggc29saWQgI0ZGQjAwMDtcXHJcXG5cXHRcXHR6LWluZGV4OiA5O1xcclxcblxcdH1cXHJcXG5cXHRcXHJcXG5cXHQud2FsbC1yaWdodCB7XFxyXFxuXFx0XFx0Ym9yZGVyLXJpZ2h0OiA1cHggc29saWQgI0ZGQjAwMDtcXHJcXG5cXHRcXHR6LWluZGV4OiA5O1xcclxcblxcdH1cXHJcXG5cXHRcXHJcXG5cXHQud2FsbC1sZWZ0IHtcXHJcXG5cXHRcXHRib3JkZXItbGVmdDogNXB4IHNvbGlkICNGRkIwMDA7XFxyXFxuXFx0XFx0ei1pbmRleDogOTtcXHJcXG5cXHR9XFxyXFxuXFx0XFxyXFxuXFx0LnRhYmxlIHsgXFxyXFxuXFx0XFx0Ym9yZGVyLXNwYWNpbmc6IDA7IFxcclxcblxcdFxcdGRpc3BsYXk6IGZsZXg7XFxyXFxuXFx0XFx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG5cXHR9XFxyXFxuXFxyXFxuXFx0LmhhbGwgeyBcXHJcXG5cXHRcXHR6LWluZGV4OiA1O1xcclxcblxcdH1cXHJcXG5cXHRcXHJcXG5cXHR0ZCB7XFxyXFxuXFx0XFx0d2lkdGg6IDcwcHg7XFxyXFxuXFx0XFx0aGVpZ2h0OiA3MHB4O1xcclxcblxcdFxcdGJvcmRlcjogNXB4IHNvbGlkICM0RDYxOEI7XFxyXFxuXFx0XFx0YmFja2dyb3VuZDogIzc2ODZBODsgXFxyXFxuXFx0fVxcclxcblxcdHRyIHtcXHJcXG5cXHRcXHRoZWlnaHQ6IDgwcHg7XFxyXFxuXFx0fVxcclxcblxcdFxcclxcblxcdC5idXR0b24ge1xcclxcblxcdFxcdHBhZGRpbmc6IDVweCA3cHg7XFxyXFxuXFx0fVxcclxcblxcclxcblxcdC5jb250cm9sbGVyLWRpdiB7XFxyXFxuXFx0XFx0bWFyZ2luOiAwIGF1dG87XFxyXFxuXFx0XFx0d2lkdGg6IDgwJTtcXHJcXG5cXHRcXHRwYWRkaW5nOiA1cHggN3B4O1xcclxcblxcdFxcdGRpc3BsYXk6IGZsZXg7XFxyXFxuXFx0XFx0anVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcblxcdH1cXHJcXG5cXHQuY29udHJvbGxlci1kaXYgPiBwIHtcXHJcXG5cXHRcXHRmb250LWZhbWlseTogJ1F1YW50aWNvJywgc2Fucy1zZXJpZjtcXHJcXG5cXHRcXHRmb250LXNpemU6IDEuNWVtO1xcclxcblxcdH1cXHJcXG5cXHQuY29udHJvbGxlci1idG4ge1xcclxcblxcdFxcdGJhY2tncm91bmQ6ICNCOEMzRDk7XFxyXFxuXFx0XFx0Zm9udC1mYW1pbHk6ICdRdWFudGljbycsIHNhbnMtc2VyaWY7XFxyXFxuXFx0XFx0Zm9udC1zaXplOiAxLjVlbTtcXHJcXG5cXHRcXHRjdXJzb3I6IHBvaW50ZXI7XFxyXFxuXFx0XFx0Ym9yZGVyOiBub25lO1xcclxcblxcdFxcdG1hcmdpbjogMCBhdXRvO1xcclxcblxcdFxcdGhlaWdodDogNzVweDtcXHJcXG5cXHRcXHR3aWR0aDogMjAwcHg7XFxyXFxuXFx0XFx0dHJhbnNpdGlvbjogdHJhbnNmb3JtIC4zcyBlYXNlLWluLW91dDtcXHJcXG5cXHRcXHRib3gtc2hhZG93OiBcXHJcXG5cXHRcXHRcXHQwIDEuNHB4IDEuMXB4IHJnYmEoMCwgMCwgMCwgMC4wMzQpLFxcclxcblxcdFxcdFxcdDAgMy40cHggMi42cHggcmdiYSgwLCAwLCAwLCAwLjA0OCksXFxyXFxuXFx0XFx0XFx0MCA3LjdweCA1cHggcmdiYSgwLCAwLCAwLCAwLjA2KSxcXHJcXG5cXHRcXHRcXHQwIDExLjE1cHggOC41cHggcmdiYSgwLCAwLCAwLCAwLjA4NiksXFxyXFxuXFx0XFx0XFx0MCA1MHB4IDQwcHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcXHJcXG5cXHR9XFxyXFxuXFx0LmNvbnRyb2xsZXItYnRuOmhvdmVyIHtcXHJcXG5cXHRcXHR0cmFuc2l0aW9uOiAuM3MgZWFzZS1pbi1vdXQ7XFxyXFxuXFx0XFx0YmFja2dyb3VuZDogIzczODNBNjtcXHJcXG5cXHRcXHRib3gtc2hhZG93OiBcXHJcXG5cXHRcXHRcXHQwIDIuOHB4IDIuMnB4IHJnYmEoMCwgMCwgMCwgMC4wMzQpLFxcclxcblxcdFxcdFxcdDAgNi43cHggNS4zcHggcmdiYSgwLCAwLCAwLCAwLjA0OCksXFxyXFxuXFx0XFx0XFx0MCAxNS41cHggMTBweCByZ2JhKDAsIDAsIDAsIDAuMDYpLFxcclxcblxcdFxcdFxcdDAgMjIuM3B4IDE3LjlweCByZ2JhKDAsIDAsIDAsIDAuMDg2KSxcXHJcXG5cXHRcXHRcXHQwIDEwMHB4IDgwcHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcXHJcXG5cXHR9XFxyXFxuXFx0XFxyXFxuXFx0LnBsYXllciB7XFxyXFxuXFx0XFx0Zm9udC1zaXplOiAzZW07XFxyXFxuXFx0XFx0bGluZS1oZWlnaHQ6IDgwcHg7XFxyXFxuXFx0XFx0dGV4dC1hbGlnbjogY2VudGVyO1xcclxcblxcdH1cXHJcXG5cXHRcXHJcXG5cXHQuaGlnaGxpZ2h0IHtcXHJcXG5cXHRcXHRiYWNrZ3JvdW5kOiAjOERCQjVFO1xcclxcblxcdH1cXHJcXG5cXHQuaGlnaGxpZ2h0OmhvdmVye1xcclxcblxcdFxcdGJhY2tncm91bmQ6ICNCREUyOTc7XFxyXFxuXFx0fVxcdFxcclxcblxcdC5zZWxlY3RlZFdhbGwge1xcclxcblxcdFxcdGJhY2tncm91bmQ6ICNCMDJEMUY7XFxyXFxuXFx0fVxcdFxcclxcblxcclxcblxcdC5wbGF5ZXItdHVybiB7XFxyXFxuXFx0XFx0Zm9udC1mYW1pbHk6ICdRdWFudGljbycsIHNhbnMtc2VyaWY7XFxyXFxuXFx0XFx0Zm9udC1zaXplOiAyZW07XFxyXFxuXFx0XFx0cGFkZGluZzogMjBweDtcXHJcXG5cXHRcXHRtYXJnaW46IDAgYXV0bztcXHJcXG5cXHR9XFxyXFxuXFx0XFxyXFxuXFx0LndhbGwtY291bnRlci1kaXYge1xcclxcblxcdFxcdG1hcmdpbi10b3A6IDJlbTtcXHJcXG5cXHRcXHRkaXNwbGF5OiBmbGV4O1xcclxcblxcdH1cXHJcXG5cXHQud2FsbC1jb3VudGVyIHtcXHJcXG5cXHRcXHRmb250LWZhbWlseTogJ1F1YW50aWNvJywgc2Fucy1zZXJpZjtcXHJcXG5cXHRcXHRmb250LXNpemU6IDJlbTtcXHJcXG5cXHRcXHRtYXJnaW46IGF1dG87XFxyXFxuXFx0fVxcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG4jcmVzdGFydC1kaXYge1xcclxcblxcdHBvc2l0aW9uOiBmaXhlZDtcXHJcXG5cXHRkaXNwbGF5OiBmbGV4O1xcclxcblxcdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuXFx0Zm9udC1zaXplOiAyZW07XFxyXFxuXFx0cGFkZGluZzogMTVweDtcXHJcXG5cXHRtYXJnaW46IDIwMHB4O1xcclxcblxcdGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcclxcblxcdHdpZHRoOiA0MDBweDtcXHJcXG5cXHRoZWlnaHQ6IDIwMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4jcmVzdGFydC1kaXYgaDEge1xcclxcblxcdG1hcmdpbjogMTBweCBhdXRvO1xcclxcbn1cXHJcXG5cXHJcXG4jcmVzdGFydC1kaXYgYnV0dG9uIHtcXHJcXG5cXHRtYXJnaW46IGF1dG87XFxyXFxuXFx0d2lkdGg6IDMwJTtcXHJcXG5cXHRoZWlnaHQ6IDE1JTtcXHJcXG59XFxyXFxuXFxyXFxuLmJ1dHRvblRlc3Qge1xcclxcblxcdHdpZHRoOiAzMDBweDtcXHJcXG5cXHRoZWlnaHQ6IDEwMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4jcm9vbUZvcm0ge1xcclxcblxcdGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC4xNSk7XFxyXFxuXFx0bWFyZ2luOiBhdXRvO1xcclxcbn1cXHJcXG5cXHJcXG4jZm9ybURpdiB7XFxyXFxuXFx0bWFyZ2luOiAzMCUgYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuI3Jvb21JbnB1dCB7XFxyXFxuXFx0Ym9yZGVyOiBub25lOyBcXHJcXG5cXHRwYWRkaW5nOiAwIDFyZW07XFxyXFxuXFx0ZmxleC1ncm93OiAxO1xcclxcblxcdGJvcmRlci1yYWRpdXM6IDJyZW07XFxyXFxuXFx0bWFyZ2luOiAwLjI1cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4jcm9vbUlucHV0OmZvY3VzIHtcXHJcXG5cXHRvdXRsaW5lOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4jcm9vbUJ1dHRvbiB7XFxyXFxuXFx0YmFja2dyb3VuZDogIzMzMztcXHJcXG5cXHRib3JkZXI6IG5vbmU7XFxyXFxuXFx0cGFkZGluZzogMCAxcmVtOyBcXHJcXG5cXHRtYXJnaW46IDAuMjVyZW07IFxcclxcblxcdGJvcmRlci1yYWRpdXM6IDNweDsgXFxyXFxuXFx0b3V0bGluZTogbm9uZTsgXFxyXFxuXFx0Y29sb3I6ICNmZmY7XFxyXFxufVxcclxcbiNyb29tQnV0dG9uOmhvdmVyIHtcXHJcXG5cXHRiYWNrZ3JvdW5kOiBncmF5O1xcclxcbn1cXHJcXG5cXHJcXG4jbG9iYnktZGl2IHtcXHJcXG5cXHRcXHJcXG5cXHR3aWR0aDogODAlO1xcclxcbn1cXHJcXG4jbG9iYnktZGl2ID4gaDEge1xcclxcblxcdGJhY2tncm91bmQ6ICNmZmY7XFxyXFxuXFx0dGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG4jbG9iYnktZm9ybSB7IFxcclxcblxcdGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC4xNSk7IFxcclxcblxcdHBhZGRpbmc6IDAuMjVyZW07IFxcclxcblxcdHBvc2l0aW9uOiBmaXhlZDsgXFxyXFxuXFx0Ym90dG9tOiAwOyBcXHJcXG5cXHRsZWZ0OiAwOyBcXHJcXG5cXHRyaWdodDogMDsgXFxyXFxuXFx0ZGlzcGxheTogZmxleDsgXFxyXFxuXFx0aGVpZ2h0OiAzcmVtOyBcXHJcXG5cXHRib3gtc2l6aW5nOiBib3JkZXItYm94OyBcXHJcXG5cXHRiYWNrZHJvcC1maWx0ZXI6IGJsdXIoMTBweCk7IFxcclxcbn1cXHJcXG4jbG9iYnktaW5wdXQgeyBcXHJcXG5cXHRib3JkZXI6IG5vbmU7IFxcclxcblxcdHBhZGRpbmc6IDAgMXJlbTsgXFxyXFxuXFx0ZmxleC1ncm93OiAxOyBcXHJcXG5cXHRib3JkZXItcmFkaXVzOiAycmVtOyBcXHJcXG5cXHRtYXJnaW46IDAuMjVyZW07IFxcclxcbn1cXHJcXG4jbG9iYnktaW5wdXQ6Zm9jdXMgeyBvdXRsaW5lOiBub25lOyB9XFxyXFxuI2xvYmJ5LWZvcm0gPiBidXR0b24geyBcXHJcXG5cXHRiYWNrZ3JvdW5kOiAjMzMzOyBcXHJcXG5cXHRib3JkZXI6IG5vbmU7IFxcclxcblxcdHBhZGRpbmc6IDAgMXJlbTsgXFxyXFxuXFx0bWFyZ2luOiAwLjI1cmVtOyBcXHJcXG5cXHRib3JkZXItcmFkaXVzOiAzcHg7IFxcclxcblxcdG91dGxpbmU6IG5vbmU7IFxcclxcblxcdGNvbG9yOiAjZmZmOyBcXHJcXG59XFxyXFxuI2xvYmJ5LWZvcm0gPiBidXR0b246aG92ZXIge1xcclxcblxcdGJhY2tncm91bmQ6IGdyYXk7XFxyXFxufVxcclxcblxcclxcbiNsb2JieS1tZXNzYWdlcyB7IFxcclxcblxcdGJhY2tncm91bmQ6ICNmZmY7IFxcclxcblxcdGxpc3Qtc3R5bGUtdHlwZTogbm9uZTsgXFxyXFxuXFx0bWFyZ2luOiAxMDBweCAwOyBcXHJcXG5cXHRwYWRkaW5nOiAwOyBcXHJcXG5cXHR3aWR0aDogMTAwJTtcXHJcXG5cXHRoZWlnaHQ6IDEwMCU7XFxyXFxufVxcclxcbiNsb2JieS1tZXNzYWdlcyA+IGxpIHsgcGFkZGluZzogMC41cmVtIDFyZW07IH1cXHJcXG4jbG9iYnktbWVzc2FnZXMgPiBsaTpudGgtY2hpbGQob2RkKSB7IGJhY2tncm91bmQ6ICNlZmVmZWY7IH1cXHJcXG4jbG9iYnktc3RhcnQtZ2FtZSB7XFxyXFxuXFx0d2lkdGg6IDEwMHB4O1xcclxcblxcdGhlaWdodDogNTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLyogc3BsYXNoIGRpdiAqL1xcclxcbiNzcGxhc2gtZGl2IHtcXHJcXG5cXHRiYWNrZ3JvdW5kOiAjQTZCMUM5O1xcclxcblxcdHdpZHRoOiAyMWVtO1xcclxcblxcdGhlaWdodDogMjFlbTtcXHJcXG5cXHRtYXJnaW46IDE1ZW0gYXV0byBhdXRvIGF1dG87XFxyXFxuXFx0ZGlzcGxheTogZmxleDtcXHJcXG5cXHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcblxcdGJveC1zaGFkb3c6IFxcclxcblxcdFxcdDAgMi44cHggMi4ycHggcmdiYSgwLCAwLCAwLCAwLjAzNCksXFxyXFxuXFx0XFx0MCA2LjdweCA1LjNweCByZ2JhKDAsIDAsIDAsIDAuMDQ4KSxcXHJcXG5cXHRcXHQwIDE1LjVweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4wNiksXFxyXFxuXFx0XFx0MCAyMi4zcHggMTcuOXB4IHJnYmEoMCwgMCwgMCwgMC4wODYpLFxcclxcblxcdFxcdDAgMTAwcHggODBweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xcclxcbn1cXHJcXG5cXHJcXG4uYnRuIHtcXHJcXG5cXHRiYWNrZ3JvdW5kOiAjQjhDM0Q5O1xcclxcblxcdGJvcmRlcjogbm9uZTtcXHJcXG5cXHRtYXJnaW46IGF1dG87XFxyXFxuXFx0aGVpZ2h0OiA1ZW07XFxyXFxuXFx0d2lkdGg6IDEzZW07XFxyXFxuXFx0dHJhbnNpdGlvbjogdHJhbnNmb3JtIC4zcyBlYXNlLWluLW91dDtcXHJcXG5cXHRib3gtc2hhZG93OiBcXHJcXG5cXHRcXHQwIDEuNHB4IDEuMXB4IHJnYmEoMCwgMCwgMCwgMC4wMzQpLFxcclxcblxcdFxcdDAgMy40cHggMi42cHggcmdiYSgwLCAwLCAwLCAwLjA0OCksXFxyXFxuXFx0XFx0MCA3LjdweCA1cHggcmdiYSgwLCAwLCAwLCAwLjA2KSxcXHJcXG5cXHRcXHQwIDExLjE1cHggOC41cHggcmdiYSgwLCAwLCAwLCAwLjA4NiksXFxyXFxuXFx0XFx0MCA1MHB4IDQwcHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcXHJcXG59XFxyXFxuXFxyXFxuLmJ0bjpob3ZlciB7XFxyXFxuXFx0dHJhbnNpdGlvbjogLjNzIGVhc2UtaW4tb3V0O1xcclxcblxcdHRyYW5zZm9ybTogc2NhbGUoMS4xKTtcXHJcXG5cXHRiYWNrZ3JvdW5kOiAjNzM4M0E2O1xcclxcblxcdGJveC1zaGFkb3c6IFxcclxcblxcdFxcdDAgMi44cHggMi4ycHggcmdiYSgwLCAwLCAwLCAwLjAzNCksXFxyXFxuXFx0XFx0MCA2LjdweCA1LjNweCByZ2JhKDAsIDAsIDAsIDAuMDQ4KSxcXHJcXG5cXHRcXHQwIDE1LjVweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4wNiksXFxyXFxuXFx0XFx0MCAyMi4zcHggMTcuOXB4IHJnYmEoMCwgMCwgMCwgMC4wODYpLFxcclxcblxcdFxcdDAgMTAwcHggODBweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBmb3JtIGRpdiAqL1xcclxcbiNmb3JtLWRpdiB7XFxyXFxuXFx0YmFja2dyb3VuZDogI0E2QjFDOTtcXHJcXG5cXHR3aWR0aDogMjFlbTtcXHJcXG5cXHRoZWlnaHQ6IDIxZW07XFxyXFxuXFx0bWFyZ2luOiAxNWVtIGF1dG8gYXV0byBhdXRvO1xcclxcblxcdGRpc3BsYXk6IGZsZXg7XFxyXFxuXFx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG5cXHRib3gtc2hhZG93OiBcXHJcXG5cXHRcXHQwIDIuOHB4IDIuMnB4IHJnYmEoMCwgMCwgMCwgMC4wMzQpLFxcclxcblxcdFxcdDAgNi43cHggNS4zcHggcmdiYSgwLCAwLCAwLCAwLjA0OCksXFxyXFxuXFx0XFx0MCAxNS41cHggMTBweCByZ2JhKDAsIDAsIDAsIDAuMDYpLFxcclxcblxcdFxcdDAgMjIuM3B4IDE3LjlweCByZ2JhKDAsIDAsIDAsIDAuMDg2KSxcXHJcXG5cXHRcXHQwIDEwMHB4IDgwcHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcXHJcXG59XFxyXFxuXFxyXFxuI3Jvb20tZm9ybSB7XFxyXFxuXFx0d2lkdGg6IDEwMCU7XFxyXFxuXFx0aGVpZ2h0OiAxMDAlO1xcclxcblxcdGRpc3BsYXk6IGZsZXg7XFxyXFxuXFx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG59XFxyXFxuXFxyXFxuI3Jvb20taW5wdXQge1xcclxcblxcdHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG5cXHR3aWR0aDogNTAlO1xcclxcblxcdG1hcmdpbjogYXV0bztcXHJcXG5cXHRsaW5lLWhlaWdodDogMS41O1xcclxcbiAgXFx0Zm9udDogNzAwIDEuMnJlbSAnUm9ib3RvIFNsYWInLCBzYW5zLXNlcmlmO1xcclxcbiAgXFx0cGFkZGluZzogMWVtIDJlbTtcXHJcXG4gIFxcdGxldHRlci1zcGFjaW5nOiAwLjA1cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4jcm9vbS1idXR0b24ge1xcclxcbiBcXHRtYXJnaW46IGF1dG87XFxyXFxufVxcclxcblxcclxcbi8qIGxvYmJ5IHJvb21zIGxpc3QgKi9cXHJcXG4jbG9iYnktcm9vbXMtbGlzdC1kaXYge1xcclxcblxcdGJhY2tncm91bmQ6ICNBNkIxQzk7XFxyXFxuXFx0d2lkdGg6IDIxZW07XFxyXFxuXFx0bWFyZ2luOiAxNWVtIGF1dG8gYXV0byBhdXRvO1xcclxcblxcdGRpc3BsYXk6IGZsZXg7XFxyXFxuXFx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG5cXHRhbGlnbi1pdGVtczogY2VudGVyO1xcclxcblxcdGJveC1zaGFkb3c6IFxcclxcblxcdFxcdDAgMi44cHggMi4ycHggcmdiYSgwLCAwLCAwLCAwLjAzNCksXFxyXFxuXFx0XFx0MCA2LjdweCA1LjNweCByZ2JhKDAsIDAsIDAsIDAuMDQ4KSxcXHJcXG5cXHRcXHQwIDE1LjVweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4wNiksXFxyXFxuXFx0XFx0MCAyMi4zcHggMTcuOXB4IHJnYmEoMCwgMCwgMCwgMC4wODYpLFxcclxcblxcdFxcdDAgMTAwcHggODBweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG4jbG9iYnktcm9vbXMtbGlzdC1kaXYgPiB1bCA+IGxpID4gYnV0dG9uIHtcXHJcXG5cXHRtYXJnaW46IDEuM2VtO1xcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG5cXHJcXG5cXHJcXG5cXHJcXG5AbWl4aW4gYnRuLWJvcmRlci1kcmF3aW5nKCRjb2xvcjogI0ZGRUVDRCwgJGhvdmVyOiBibGFjaywgJHdpZHRoOiAycHgsICR2ZXJ0aWNhbDogdG9wLCAkaG9yaXpvbnRhbDogbGVmdCwgJGR1cmF0aW9uOiAwLjI1cykge1xcclxcbi8vICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDAgJHdpZHRoICRjb2xvcjtcXHJcXG4gIGNvbG9yOiAkY29sb3I7XFxyXFxuICB0cmFuc2l0aW9uOiBjb2xvciAkZHVyYXRpb24gJGR1cmF0aW9uLzM7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICBcXHJcXG4gICY6OmJlZm9yZSxcXHJcXG4gICY6OmFmdGVyIHtcXHJcXG4gICAgYm9yZGVyOiAwIHNvbGlkIHRyYW5zcGFyZW50O1xcclxcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgICBjb250ZW50OiAnJztcXHJcXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgd2lkdGg6IDA7IGhlaWdodDogMDtcXHJcXG4gICAgXFxyXFxuICAgICN7JHZlcnRpY2FsfTogMDsgXFxyXFxuICAgICN7JGhvcml6b250YWx9OiAwO1xcclxcbiAgfVxcclxcblxcclxcbiAgJjo6YmVmb3JlIHtcXHJcXG4gICAgJGgtc2lkZTogaWYoJGhvcml6b250YWwgPT0gJ2xlZnQnLCAncmlnaHQnLCAnbGVmdCcpO1xcclxcbiAgICBcXHJcXG4gICAgYm9yZGVyLSN7JHZlcnRpY2FsfS13aWR0aDogJHdpZHRoO1xcclxcbiAgICBib3JkZXItI3skaC1zaWRlfS13aWR0aDogJHdpZHRoO1xcclxcbiAgfVxcclxcbiAgXFxyXFxuICAmOjphZnRlciB7XFxyXFxuICAgICR2LXNpZGU6IGlmKCR2ZXJ0aWNhbCA9PSAndG9wJywgJ2JvdHRvbScsICd0b3AnKTtcXHJcXG4gICAgXFxyXFxuICAgIGJvcmRlci0jeyR2LXNpZGV9LXdpZHRoOiAkd2lkdGg7XFxyXFxuICAgIGJvcmRlci0jeyRob3Jpem9udGFsfS13aWR0aDogJHdpZHRoO1xcclxcbiAgfVxcclxcbiAgXFxyXFxuICAmOmhvdmVyIHtcXHJcXG4gICAgY29sb3I6ICRob3ZlcjtcXHJcXG4gICAgXFxyXFxuICAgICY6OmJlZm9yZSxcXHJcXG4gICAgJjo6YWZ0ZXIge1xcclxcbiAgICAgIGJvcmRlci1jb2xvcjogJGhvdmVyO1xcclxcbiAgICAgIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAwcywgd2lkdGggJGR1cmF0aW9uLCBoZWlnaHQgJGR1cmF0aW9uO1xcclxcbiAgICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICAgIGhlaWdodDogMTAwJTtcXHJcXG4gICAgfVxcclxcbiAgICBcXHJcXG4gICAgJjo6YmVmb3JlIHsgdHJhbnNpdGlvbi1kZWxheTogMHMsIDBzLCAkZHVyYXRpb247IH1cXHJcXG4gICAgXFxyXFxuICAgICY6OmFmdGVyIHsgdHJhbnNpdGlvbi1kZWxheTogMHMsICRkdXJhdGlvbiwgMHM7IH1cXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuLmJ0biB7XFxyXFxuICBAaW5jbHVkZSBidG4tYm9yZGVyLWRyYXdpbmcoIzQwMzE3NCwgI0IxQTlDRCwgNHB4LCBib3R0b20sIHJpZ2h0KTtcXHJcXG59XFxyXFxuLmNvbnRyb2xsZXItYnRuIHtcXHJcXG4gIEBpbmNsdWRlIGJ0bi1ib3JkZXItZHJhd2luZygjNDAzMTc0LCAjQjFBOUNELCA0cHgsIGJvdHRvbSwgcmlnaHQpO1xcclxcbn1cXHJcXG5cXHJcXG4vLz09PSBCdXR0b24gc3R5bGluZywgc2VtaS1pZ25vcmVcXHJcXG4uYnRuIHtcXHJcXG4vLyAgIGJvcmRlcjogbm9uZTtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gIGxpbmUtaGVpZ2h0OiAxLjU7XFxyXFxuICBmb250OiA3MDAgMS4ycmVtICdSb2JvdG8gU2xhYicsIHNhbnMtc2VyaWY7XFxyXFxuICBwYWRkaW5nOiAxZW0gMmVtO1xcclxcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDVyZW07XFxyXFxuICBcXHJcXG4vLyAgICY6Zm9jdXMgeyBvdXRsaW5lOiAycHggZG90dGVkICM0RDYxOEM7IH1cXHJcXG59XFxyXFxuXFxyXFxuI3dpbm5lci1kaXYge1xcclxcblxcdGJhY2tncm91bmQ6ICNBNkIxQzk7XFxyXFxuXFx0d2lkdGg6IDMwdnc7XFxyXFxuXFx0aGVpZ2h0OiAzMHZ3O1xcclxcblxcdG1hcmdpbjogYXV0bztcXHJcXG5cXHRwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxufVxcclxcbiN3aW5uZXItbWVzc2FnZSB7XFxyXFxuXFx0Y29sb3I6ICM0MDMxNzQ7XFxyXFxuXFx0Zm9udC1mYW1pbHk6ICdRdWFudGljbycsIHNhbnMtc2VyaWY7XFxyXFxuXFx0Zm9udC1zaXplOiAzZW07XFxyXFxuXFx0Zm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuXFx0dGV4dC1hbGlnbjogY2VudGVyO1xcclxcblxcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG5cXHRib3R0b206IDUwJTtcXHJcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIHJldHVybiBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoY29udGVudCwgXCJ9XCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gKG1vZHVsZXMsIG1lZGlhUXVlcnksIGRlZHVwZSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcbiAgICAgICAgdmFyIGlkID0gdGhpc1tpXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBtb2R1bGVzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfaV0pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnRpbnVlXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWFRdWVyeSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWFRdWVyeTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzJdID0gXCJcIi5jb25jYXQobWVkaWFRdWVyeSwgXCIgYW5kIFwiKS5jb25jYXQoaXRlbVsyXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8ICEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKSB7XG4gIHZhciBfaXRlbSA9IF9zbGljZWRUb0FycmF5KGl0ZW0sIDQpLFxuICAgICAgY29udGVudCA9IF9pdGVtWzFdLFxuICAgICAgY3NzTWFwcGluZyA9IF9pdGVtWzNdO1xuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIi8qKlxuICogSGVscGVycy5cbiAqL1xuXG52YXIgcyA9IDEwMDA7XG52YXIgbSA9IHMgKiA2MDtcbnZhciBoID0gbSAqIDYwO1xudmFyIGQgPSBoICogMjQ7XG52YXIgdyA9IGQgKiA3O1xudmFyIHkgPSBkICogMzY1LjI1O1xuXG4vKipcbiAqIFBhcnNlIG9yIGZvcm1hdCB0aGUgZ2l2ZW4gYHZhbGAuXG4gKlxuICogT3B0aW9uczpcbiAqXG4gKiAgLSBgbG9uZ2AgdmVyYm9zZSBmb3JtYXR0aW5nIFtmYWxzZV1cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IHZhbFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQHRocm93cyB7RXJyb3J9IHRocm93IGFuIGVycm9yIGlmIHZhbCBpcyBub3QgYSBub24tZW1wdHkgc3RyaW5nIG9yIGEgbnVtYmVyXG4gKiBAcmV0dXJuIHtTdHJpbmd8TnVtYmVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsO1xuICBpZiAodHlwZSA9PT0gJ3N0cmluZycgJiYgdmFsLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gcGFyc2UodmFsKTtcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZSh2YWwpKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMubG9uZyA/IGZtdExvbmcodmFsKSA6IGZtdFNob3J0KHZhbCk7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKFxuICAgICd2YWwgaXMgbm90IGEgbm9uLWVtcHR5IHN0cmluZyBvciBhIHZhbGlkIG51bWJlci4gdmFsPScgK1xuICAgICAgSlNPTi5zdHJpbmdpZnkodmFsKVxuICApO1xufTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gYHN0cmAgYW5kIHJldHVybiBtaWxsaXNlY29uZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcGFyc2Uoc3RyKSB7XG4gIHN0ciA9IFN0cmluZyhzdHIpO1xuICBpZiAoc3RyLmxlbmd0aCA+IDEwMCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbWF0Y2ggPSAvXigtPyg/OlxcZCspP1xcLj9cXGQrKSAqKG1pbGxpc2Vjb25kcz98bXNlY3M/fG1zfHNlY29uZHM/fHNlY3M/fHN8bWludXRlcz98bWlucz98bXxob3Vycz98aHJzP3xofGRheXM/fGR8d2Vla3M/fHd8eWVhcnM/fHlycz98eSk/JC9pLmV4ZWMoXG4gICAgc3RyXG4gICk7XG4gIGlmICghbWF0Y2gpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG4gPSBwYXJzZUZsb2F0KG1hdGNoWzFdKTtcbiAgdmFyIHR5cGUgPSAobWF0Y2hbMl0gfHwgJ21zJykudG9Mb3dlckNhc2UoKTtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAneWVhcnMnOlxuICAgIGNhc2UgJ3llYXInOlxuICAgIGNhc2UgJ3lycyc6XG4gICAgY2FzZSAneXInOlxuICAgIGNhc2UgJ3knOlxuICAgICAgcmV0dXJuIG4gKiB5O1xuICAgIGNhc2UgJ3dlZWtzJzpcbiAgICBjYXNlICd3ZWVrJzpcbiAgICBjYXNlICd3JzpcbiAgICAgIHJldHVybiBuICogdztcbiAgICBjYXNlICdkYXlzJzpcbiAgICBjYXNlICdkYXknOlxuICAgIGNhc2UgJ2QnOlxuICAgICAgcmV0dXJuIG4gKiBkO1xuICAgIGNhc2UgJ2hvdXJzJzpcbiAgICBjYXNlICdob3VyJzpcbiAgICBjYXNlICdocnMnOlxuICAgIGNhc2UgJ2hyJzpcbiAgICBjYXNlICdoJzpcbiAgICAgIHJldHVybiBuICogaDtcbiAgICBjYXNlICdtaW51dGVzJzpcbiAgICBjYXNlICdtaW51dGUnOlxuICAgIGNhc2UgJ21pbnMnOlxuICAgIGNhc2UgJ21pbic6XG4gICAgY2FzZSAnbSc6XG4gICAgICByZXR1cm4gbiAqIG07XG4gICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgY2FzZSAnc2Vjb25kJzpcbiAgICBjYXNlICdzZWNzJzpcbiAgICBjYXNlICdzZWMnOlxuICAgIGNhc2UgJ3MnOlxuICAgICAgcmV0dXJuIG4gKiBzO1xuICAgIGNhc2UgJ21pbGxpc2Vjb25kcyc6XG4gICAgY2FzZSAnbWlsbGlzZWNvbmQnOlxuICAgIGNhc2UgJ21zZWNzJzpcbiAgICBjYXNlICdtc2VjJzpcbiAgICBjYXNlICdtcyc6XG4gICAgICByZXR1cm4gbjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG4vKipcbiAqIFNob3J0IGZvcm1hdCBmb3IgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGZtdFNob3J0KG1zKSB7XG4gIHZhciBtc0FicyA9IE1hdGguYWJzKG1zKTtcbiAgaWYgKG1zQWJzID49IGQpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIGQpICsgJ2QnO1xuICB9XG4gIGlmIChtc0FicyA+PSBoKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBoKSArICdoJztcbiAgfVxuICBpZiAobXNBYnMgPj0gbSkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gbSkgKyAnbSc7XG4gIH1cbiAgaWYgKG1zQWJzID49IHMpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIHMpICsgJ3MnO1xuICB9XG4gIHJldHVybiBtcyArICdtcyc7XG59XG5cbi8qKlxuICogTG9uZyBmb3JtYXQgZm9yIGBtc2AuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBmbXRMb25nKG1zKSB7XG4gIHZhciBtc0FicyA9IE1hdGguYWJzKG1zKTtcbiAgaWYgKG1zQWJzID49IGQpIHtcbiAgICByZXR1cm4gcGx1cmFsKG1zLCBtc0FicywgZCwgJ2RheScpO1xuICB9XG4gIGlmIChtc0FicyA+PSBoKSB7XG4gICAgcmV0dXJuIHBsdXJhbChtcywgbXNBYnMsIGgsICdob3VyJyk7XG4gIH1cbiAgaWYgKG1zQWJzID49IG0pIHtcbiAgICByZXR1cm4gcGx1cmFsKG1zLCBtc0FicywgbSwgJ21pbnV0ZScpO1xuICB9XG4gIGlmIChtc0FicyA+PSBzKSB7XG4gICAgcmV0dXJuIHBsdXJhbChtcywgbXNBYnMsIHMsICdzZWNvbmQnKTtcbiAgfVxuICByZXR1cm4gbXMgKyAnIG1zJztcbn1cblxuLyoqXG4gKiBQbHVyYWxpemF0aW9uIGhlbHBlci5cbiAqL1xuXG5mdW5jdGlvbiBwbHVyYWwobXMsIG1zQWJzLCBuLCBuYW1lKSB7XG4gIHZhciBpc1BsdXJhbCA9IG1zQWJzID49IG4gKiAxLjU7XG4gIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gbikgKyAnICcgKyBuYW1lICsgKGlzUGx1cmFsID8gJ3MnIDogJycpO1xufVxuIiwiLyogZXNsaW50LWVudiBicm93c2VyICovXG5cbi8qKlxuICogVGhpcyBpcyB0aGUgd2ViIGJyb3dzZXIgaW1wbGVtZW50YXRpb24gb2YgYGRlYnVnKClgLlxuICovXG5cbmV4cG9ydHMuZm9ybWF0QXJncyA9IGZvcm1hdEFyZ3M7XG5leHBvcnRzLnNhdmUgPSBzYXZlO1xuZXhwb3J0cy5sb2FkID0gbG9hZDtcbmV4cG9ydHMudXNlQ29sb3JzID0gdXNlQ29sb3JzO1xuZXhwb3J0cy5zdG9yYWdlID0gbG9jYWxzdG9yYWdlKCk7XG5leHBvcnRzLmRlc3Ryb3kgPSAoKCkgPT4ge1xuXHRsZXQgd2FybmVkID0gZmFsc2U7XG5cblx0cmV0dXJuICgpID0+IHtcblx0XHRpZiAoIXdhcm5lZCkge1xuXHRcdFx0d2FybmVkID0gdHJ1ZTtcblx0XHRcdGNvbnNvbGUud2FybignSW5zdGFuY2UgbWV0aG9kIGBkZWJ1Zy5kZXN0cm95KClgIGlzIGRlcHJlY2F0ZWQgYW5kIG5vIGxvbmdlciBkb2VzIGFueXRoaW5nLiBJdCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIG5leHQgbWFqb3IgdmVyc2lvbiBvZiBgZGVidWdgLicpO1xuXHRcdH1cblx0fTtcbn0pKCk7XG5cbi8qKlxuICogQ29sb3JzLlxuICovXG5cbmV4cG9ydHMuY29sb3JzID0gW1xuXHQnIzAwMDBDQycsXG5cdCcjMDAwMEZGJyxcblx0JyMwMDMzQ0MnLFxuXHQnIzAwMzNGRicsXG5cdCcjMDA2NkNDJyxcblx0JyMwMDY2RkYnLFxuXHQnIzAwOTlDQycsXG5cdCcjMDA5OUZGJyxcblx0JyMwMENDMDAnLFxuXHQnIzAwQ0MzMycsXG5cdCcjMDBDQzY2Jyxcblx0JyMwMENDOTknLFxuXHQnIzAwQ0NDQycsXG5cdCcjMDBDQ0ZGJyxcblx0JyMzMzAwQ0MnLFxuXHQnIzMzMDBGRicsXG5cdCcjMzMzM0NDJyxcblx0JyMzMzMzRkYnLFxuXHQnIzMzNjZDQycsXG5cdCcjMzM2NkZGJyxcblx0JyMzMzk5Q0MnLFxuXHQnIzMzOTlGRicsXG5cdCcjMzNDQzAwJyxcblx0JyMzM0NDMzMnLFxuXHQnIzMzQ0M2NicsXG5cdCcjMzNDQzk5Jyxcblx0JyMzM0NDQ0MnLFxuXHQnIzMzQ0NGRicsXG5cdCcjNjYwMENDJyxcblx0JyM2NjAwRkYnLFxuXHQnIzY2MzNDQycsXG5cdCcjNjYzM0ZGJyxcblx0JyM2NkNDMDAnLFxuXHQnIzY2Q0MzMycsXG5cdCcjOTkwMENDJyxcblx0JyM5OTAwRkYnLFxuXHQnIzk5MzNDQycsXG5cdCcjOTkzM0ZGJyxcblx0JyM5OUNDMDAnLFxuXHQnIzk5Q0MzMycsXG5cdCcjQ0MwMDAwJyxcblx0JyNDQzAwMzMnLFxuXHQnI0NDMDA2NicsXG5cdCcjQ0MwMDk5Jyxcblx0JyNDQzAwQ0MnLFxuXHQnI0NDMDBGRicsXG5cdCcjQ0MzMzAwJyxcblx0JyNDQzMzMzMnLFxuXHQnI0NDMzM2NicsXG5cdCcjQ0MzMzk5Jyxcblx0JyNDQzMzQ0MnLFxuXHQnI0NDMzNGRicsXG5cdCcjQ0M2NjAwJyxcblx0JyNDQzY2MzMnLFxuXHQnI0NDOTkwMCcsXG5cdCcjQ0M5OTMzJyxcblx0JyNDQ0NDMDAnLFxuXHQnI0NDQ0MzMycsXG5cdCcjRkYwMDAwJyxcblx0JyNGRjAwMzMnLFxuXHQnI0ZGMDA2NicsXG5cdCcjRkYwMDk5Jyxcblx0JyNGRjAwQ0MnLFxuXHQnI0ZGMDBGRicsXG5cdCcjRkYzMzAwJyxcblx0JyNGRjMzMzMnLFxuXHQnI0ZGMzM2NicsXG5cdCcjRkYzMzk5Jyxcblx0JyNGRjMzQ0MnLFxuXHQnI0ZGMzNGRicsXG5cdCcjRkY2NjAwJyxcblx0JyNGRjY2MzMnLFxuXHQnI0ZGOTkwMCcsXG5cdCcjRkY5OTMzJyxcblx0JyNGRkNDMDAnLFxuXHQnI0ZGQ0MzMydcbl07XG5cbi8qKlxuICogQ3VycmVudGx5IG9ubHkgV2ViS2l0LWJhc2VkIFdlYiBJbnNwZWN0b3JzLCBGaXJlZm94ID49IHYzMSxcbiAqIGFuZCB0aGUgRmlyZWJ1ZyBleHRlbnNpb24gKGFueSBGaXJlZm94IHZlcnNpb24pIGFyZSBrbm93blxuICogdG8gc3VwcG9ydCBcIiVjXCIgQ1NTIGN1c3RvbWl6YXRpb25zLlxuICpcbiAqIFRPRE86IGFkZCBhIGBsb2NhbFN0b3JhZ2VgIHZhcmlhYmxlIHRvIGV4cGxpY2l0bHkgZW5hYmxlL2Rpc2FibGUgY29sb3JzXG4gKi9cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcbmZ1bmN0aW9uIHVzZUNvbG9ycygpIHtcblx0Ly8gTkI6IEluIGFuIEVsZWN0cm9uIHByZWxvYWQgc2NyaXB0LCBkb2N1bWVudCB3aWxsIGJlIGRlZmluZWQgYnV0IG5vdCBmdWxseVxuXHQvLyBpbml0aWFsaXplZC4gU2luY2Ugd2Uga25vdyB3ZSdyZSBpbiBDaHJvbWUsIHdlJ2xsIGp1c3QgZGV0ZWN0IHRoaXMgY2FzZVxuXHQvLyBleHBsaWNpdGx5XG5cdGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cucHJvY2VzcyAmJiAod2luZG93LnByb2Nlc3MudHlwZSA9PT0gJ3JlbmRlcmVyJyB8fCB3aW5kb3cucHJvY2Vzcy5fX253anMpKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHQvLyBJbnRlcm5ldCBFeHBsb3JlciBhbmQgRWRnZSBkbyBub3Qgc3VwcG9ydCBjb2xvcnMuXG5cdGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvKGVkZ2V8dHJpZGVudClcXC8oXFxkKykvKSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8vIElzIHdlYmtpdD8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTY0NTk2MDYvMzc2NzczXG5cdC8vIGRvY3VtZW50IGlzIHVuZGVmaW5lZCBpbiByZWFjdC1uYXRpdmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC1uYXRpdmUvcHVsbC8xNjMyXG5cdHJldHVybiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5XZWJraXRBcHBlYXJhbmNlKSB8fFxuXHRcdC8vIElzIGZpcmVidWc/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM5ODEyMC8zNzY3NzNcblx0XHQodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmNvbnNvbGUgJiYgKHdpbmRvdy5jb25zb2xlLmZpcmVidWcgfHwgKHdpbmRvdy5jb25zb2xlLmV4Y2VwdGlvbiAmJiB3aW5kb3cuY29uc29sZS50YWJsZSkpKSB8fFxuXHRcdC8vIElzIGZpcmVmb3ggPj0gdjMxP1xuXHRcdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvVG9vbHMvV2ViX0NvbnNvbGUjU3R5bGluZ19tZXNzYWdlc1xuXHRcdCh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvZmlyZWZveFxcLyhcXGQrKS8pICYmIHBhcnNlSW50KFJlZ0V4cC4kMSwgMTApID49IDMxKSB8fFxuXHRcdC8vIERvdWJsZSBjaGVjayB3ZWJraXQgaW4gdXNlckFnZW50IGp1c3QgaW4gY2FzZSB3ZSBhcmUgaW4gYSB3b3JrZXJcblx0XHQodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2FwcGxld2Via2l0XFwvKFxcZCspLykpO1xufVxuXG4vKipcbiAqIENvbG9yaXplIGxvZyBhcmd1bWVudHMgaWYgZW5hYmxlZC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGZvcm1hdEFyZ3MoYXJncykge1xuXHRhcmdzWzBdID0gKHRoaXMudXNlQ29sb3JzID8gJyVjJyA6ICcnKSArXG5cdFx0dGhpcy5uYW1lc3BhY2UgK1xuXHRcdCh0aGlzLnVzZUNvbG9ycyA/ICcgJWMnIDogJyAnKSArXG5cdFx0YXJnc1swXSArXG5cdFx0KHRoaXMudXNlQ29sb3JzID8gJyVjICcgOiAnICcpICtcblx0XHQnKycgKyBtb2R1bGUuZXhwb3J0cy5odW1hbml6ZSh0aGlzLmRpZmYpO1xuXG5cdGlmICghdGhpcy51c2VDb2xvcnMpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCBjID0gJ2NvbG9yOiAnICsgdGhpcy5jb2xvcjtcblx0YXJncy5zcGxpY2UoMSwgMCwgYywgJ2NvbG9yOiBpbmhlcml0Jyk7XG5cblx0Ly8gVGhlIGZpbmFsIFwiJWNcIiBpcyBzb21ld2hhdCB0cmlja3ksIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgb3RoZXJcblx0Ly8gYXJndW1lbnRzIHBhc3NlZCBlaXRoZXIgYmVmb3JlIG9yIGFmdGVyIHRoZSAlYywgc28gd2UgbmVlZCB0b1xuXHQvLyBmaWd1cmUgb3V0IHRoZSBjb3JyZWN0IGluZGV4IHRvIGluc2VydCB0aGUgQ1NTIGludG9cblx0bGV0IGluZGV4ID0gMDtcblx0bGV0IGxhc3RDID0gMDtcblx0YXJnc1swXS5yZXBsYWNlKC8lW2EtekEtWiVdL2csIG1hdGNoID0+IHtcblx0XHRpZiAobWF0Y2ggPT09ICclJScpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aW5kZXgrKztcblx0XHRpZiAobWF0Y2ggPT09ICclYycpIHtcblx0XHRcdC8vIFdlIG9ubHkgYXJlIGludGVyZXN0ZWQgaW4gdGhlICpsYXN0KiAlY1xuXHRcdFx0Ly8gKHRoZSB1c2VyIG1heSBoYXZlIHByb3ZpZGVkIHRoZWlyIG93bilcblx0XHRcdGxhc3RDID0gaW5kZXg7XG5cdFx0fVxuXHR9KTtcblxuXHRhcmdzLnNwbGljZShsYXN0QywgMCwgYyk7XG59XG5cbi8qKlxuICogSW52b2tlcyBgY29uc29sZS5kZWJ1ZygpYCB3aGVuIGF2YWlsYWJsZS5cbiAqIE5vLW9wIHdoZW4gYGNvbnNvbGUuZGVidWdgIGlzIG5vdCBhIFwiZnVuY3Rpb25cIi5cbiAqIElmIGBjb25zb2xlLmRlYnVnYCBpcyBub3QgYXZhaWxhYmxlLCBmYWxscyBiYWNrXG4gKiB0byBgY29uc29sZS5sb2dgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cbmV4cG9ydHMubG9nID0gY29uc29sZS5kZWJ1ZyB8fCBjb25zb2xlLmxvZyB8fCAoKCkgPT4ge30pO1xuXG4vKipcbiAqIFNhdmUgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc2F2ZShuYW1lc3BhY2VzKSB7XG5cdHRyeSB7XG5cdFx0aWYgKG5hbWVzcGFjZXMpIHtcblx0XHRcdGV4cG9ydHMuc3RvcmFnZS5zZXRJdGVtKCdkZWJ1ZycsIG5hbWVzcGFjZXMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRleHBvcnRzLnN0b3JhZ2UucmVtb3ZlSXRlbSgnZGVidWcnKTtcblx0XHR9XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Ly8gU3dhbGxvd1xuXHRcdC8vIFhYWCAoQFFpeC0pIHNob3VsZCB3ZSBiZSBsb2dnaW5nIHRoZXNlP1xuXHR9XG59XG5cbi8qKlxuICogTG9hZCBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSByZXR1cm5zIHRoZSBwcmV2aW91c2x5IHBlcnNpc3RlZCBkZWJ1ZyBtb2Rlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGxvYWQoKSB7XG5cdGxldCByO1xuXHR0cnkge1xuXHRcdHIgPSBleHBvcnRzLnN0b3JhZ2UuZ2V0SXRlbSgnZGVidWcnKTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHQvLyBTd2FsbG93XG5cdFx0Ly8gWFhYIChAUWl4LSkgc2hvdWxkIHdlIGJlIGxvZ2dpbmcgdGhlc2U/XG5cdH1cblxuXHQvLyBJZiBkZWJ1ZyBpc24ndCBzZXQgaW4gTFMsIGFuZCB3ZSdyZSBpbiBFbGVjdHJvbiwgdHJ5IHRvIGxvYWQgJERFQlVHXG5cdGlmICghciAmJiB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgJ2VudicgaW4gcHJvY2Vzcykge1xuXHRcdHIgPSBwcm9jZXNzLmVudi5ERUJVRztcblx0fVxuXG5cdHJldHVybiByO1xufVxuXG4vKipcbiAqIExvY2Fsc3RvcmFnZSBhdHRlbXB0cyB0byByZXR1cm4gdGhlIGxvY2Fsc3RvcmFnZS5cbiAqXG4gKiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIHNhZmFyaSB0aHJvd3NcbiAqIHdoZW4gYSB1c2VyIGRpc2FibGVzIGNvb2tpZXMvbG9jYWxzdG9yYWdlXG4gKiBhbmQgeW91IGF0dGVtcHQgdG8gYWNjZXNzIGl0LlxuICpcbiAqIEByZXR1cm4ge0xvY2FsU3RvcmFnZX1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvY2Fsc3RvcmFnZSgpIHtcblx0dHJ5IHtcblx0XHQvLyBUVk1MS2l0IChBcHBsZSBUViBKUyBSdW50aW1lKSBkb2VzIG5vdCBoYXZlIGEgd2luZG93IG9iamVjdCwganVzdCBsb2NhbFN0b3JhZ2UgaW4gdGhlIGdsb2JhbCBjb250ZXh0XG5cdFx0Ly8gVGhlIEJyb3dzZXIgYWxzbyBoYXMgbG9jYWxTdG9yYWdlIGluIHRoZSBnbG9iYWwgY29udGV4dC5cblx0XHRyZXR1cm4gbG9jYWxTdG9yYWdlO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdC8vIFN3YWxsb3dcblx0XHQvLyBYWFggKEBRaXgtKSBzaG91bGQgd2UgYmUgbG9nZ2luZyB0aGVzZT9cblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY29tbW9uJykoZXhwb3J0cyk7XG5cbmNvbnN0IHtmb3JtYXR0ZXJzfSA9IG1vZHVsZS5leHBvcnRzO1xuXG4vKipcbiAqIE1hcCAlaiB0byBgSlNPTi5zdHJpbmdpZnkoKWAsIHNpbmNlIG5vIFdlYiBJbnNwZWN0b3JzIGRvIHRoYXQgYnkgZGVmYXVsdC5cbiAqL1xuXG5mb3JtYXR0ZXJzLmogPSBmdW5jdGlvbiAodikge1xuXHR0cnkge1xuXHRcdHJldHVybiBKU09OLnN0cmluZ2lmeSh2KTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRyZXR1cm4gJ1tVbmV4cGVjdGVkSlNPTlBhcnNlRXJyb3JdOiAnICsgZXJyb3IubWVzc2FnZTtcblx0fVxufTtcbiIsIlxuLyoqXG4gKiBUaGlzIGlzIHRoZSBjb21tb24gbG9naWMgZm9yIGJvdGggdGhlIE5vZGUuanMgYW5kIHdlYiBicm93c2VyXG4gKiBpbXBsZW1lbnRhdGlvbnMgb2YgYGRlYnVnKClgLlxuICovXG5cbmZ1bmN0aW9uIHNldHVwKGVudikge1xuXHRjcmVhdGVEZWJ1Zy5kZWJ1ZyA9IGNyZWF0ZURlYnVnO1xuXHRjcmVhdGVEZWJ1Zy5kZWZhdWx0ID0gY3JlYXRlRGVidWc7XG5cdGNyZWF0ZURlYnVnLmNvZXJjZSA9IGNvZXJjZTtcblx0Y3JlYXRlRGVidWcuZGlzYWJsZSA9IGRpc2FibGU7XG5cdGNyZWF0ZURlYnVnLmVuYWJsZSA9IGVuYWJsZTtcblx0Y3JlYXRlRGVidWcuZW5hYmxlZCA9IGVuYWJsZWQ7XG5cdGNyZWF0ZURlYnVnLmh1bWFuaXplID0gcmVxdWlyZSgnbXMnKTtcblx0Y3JlYXRlRGVidWcuZGVzdHJveSA9IGRlc3Ryb3k7XG5cblx0T2JqZWN0LmtleXMoZW52KS5mb3JFYWNoKGtleSA9PiB7XG5cdFx0Y3JlYXRlRGVidWdba2V5XSA9IGVudltrZXldO1xuXHR9KTtcblxuXHQvKipcblx0KiBUaGUgY3VycmVudGx5IGFjdGl2ZSBkZWJ1ZyBtb2RlIG5hbWVzLCBhbmQgbmFtZXMgdG8gc2tpcC5cblx0Ki9cblxuXHRjcmVhdGVEZWJ1Zy5uYW1lcyA9IFtdO1xuXHRjcmVhdGVEZWJ1Zy5za2lwcyA9IFtdO1xuXG5cdC8qKlxuXHQqIE1hcCBvZiBzcGVjaWFsIFwiJW5cIiBoYW5kbGluZyBmdW5jdGlvbnMsIGZvciB0aGUgZGVidWcgXCJmb3JtYXRcIiBhcmd1bWVudC5cblx0KlxuXHQqIFZhbGlkIGtleSBuYW1lcyBhcmUgYSBzaW5nbGUsIGxvd2VyIG9yIHVwcGVyLWNhc2UgbGV0dGVyLCBpLmUuIFwiblwiIGFuZCBcIk5cIi5cblx0Ki9cblx0Y3JlYXRlRGVidWcuZm9ybWF0dGVycyA9IHt9O1xuXG5cdC8qKlxuXHQqIFNlbGVjdHMgYSBjb2xvciBmb3IgYSBkZWJ1ZyBuYW1lc3BhY2Vcblx0KiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlIFRoZSBuYW1lc3BhY2Ugc3RyaW5nIGZvciB0aGUgZm9yIHRoZSBkZWJ1ZyBpbnN0YW5jZSB0byBiZSBjb2xvcmVkXG5cdCogQHJldHVybiB7TnVtYmVyfFN0cmluZ30gQW4gQU5TSSBjb2xvciBjb2RlIGZvciB0aGUgZ2l2ZW4gbmFtZXNwYWNlXG5cdCogQGFwaSBwcml2YXRlXG5cdCovXG5cdGZ1bmN0aW9uIHNlbGVjdENvbG9yKG5hbWVzcGFjZSkge1xuXHRcdGxldCBoYXNoID0gMDtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbmFtZXNwYWNlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBuYW1lc3BhY2UuY2hhckNvZGVBdChpKTtcblx0XHRcdGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNyZWF0ZURlYnVnLmNvbG9yc1tNYXRoLmFicyhoYXNoKSAlIGNyZWF0ZURlYnVnLmNvbG9ycy5sZW5ndGhdO1xuXHR9XG5cdGNyZWF0ZURlYnVnLnNlbGVjdENvbG9yID0gc2VsZWN0Q29sb3I7XG5cblx0LyoqXG5cdCogQ3JlYXRlIGEgZGVidWdnZXIgd2l0aCB0aGUgZ2l2ZW4gYG5hbWVzcGFjZWAuXG5cdCpcblx0KiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG5cdCogQHJldHVybiB7RnVuY3Rpb259XG5cdCogQGFwaSBwdWJsaWNcblx0Ki9cblx0ZnVuY3Rpb24gY3JlYXRlRGVidWcobmFtZXNwYWNlKSB7XG5cdFx0bGV0IHByZXZUaW1lO1xuXHRcdGxldCBlbmFibGVPdmVycmlkZSA9IG51bGw7XG5cblx0XHRmdW5jdGlvbiBkZWJ1ZyguLi5hcmdzKSB7XG5cdFx0XHQvLyBEaXNhYmxlZD9cblx0XHRcdGlmICghZGVidWcuZW5hYmxlZCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHNlbGYgPSBkZWJ1ZztcblxuXHRcdFx0Ly8gU2V0IGBkaWZmYCB0aW1lc3RhbXBcblx0XHRcdGNvbnN0IGN1cnIgPSBOdW1iZXIobmV3IERhdGUoKSk7XG5cdFx0XHRjb25zdCBtcyA9IGN1cnIgLSAocHJldlRpbWUgfHwgY3Vycik7XG5cdFx0XHRzZWxmLmRpZmYgPSBtcztcblx0XHRcdHNlbGYucHJldiA9IHByZXZUaW1lO1xuXHRcdFx0c2VsZi5jdXJyID0gY3Vycjtcblx0XHRcdHByZXZUaW1lID0gY3VycjtcblxuXHRcdFx0YXJnc1swXSA9IGNyZWF0ZURlYnVnLmNvZXJjZShhcmdzWzBdKTtcblxuXHRcdFx0aWYgKHR5cGVvZiBhcmdzWzBdICE9PSAnc3RyaW5nJykge1xuXHRcdFx0XHQvLyBBbnl0aGluZyBlbHNlIGxldCdzIGluc3BlY3Qgd2l0aCAlT1xuXHRcdFx0XHRhcmdzLnVuc2hpZnQoJyVPJyk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFwcGx5IGFueSBgZm9ybWF0dGVyc2AgdHJhbnNmb3JtYXRpb25zXG5cdFx0XHRsZXQgaW5kZXggPSAwO1xuXHRcdFx0YXJnc1swXSA9IGFyZ3NbMF0ucmVwbGFjZSgvJShbYS16QS1aJV0pL2csIChtYXRjaCwgZm9ybWF0KSA9PiB7XG5cdFx0XHRcdC8vIElmIHdlIGVuY291bnRlciBhbiBlc2NhcGVkICUgdGhlbiBkb24ndCBpbmNyZWFzZSB0aGUgYXJyYXkgaW5kZXhcblx0XHRcdFx0aWYgKG1hdGNoID09PSAnJSUnKSB7XG5cdFx0XHRcdFx0cmV0dXJuICclJztcblx0XHRcdFx0fVxuXHRcdFx0XHRpbmRleCsrO1xuXHRcdFx0XHRjb25zdCBmb3JtYXR0ZXIgPSBjcmVhdGVEZWJ1Zy5mb3JtYXR0ZXJzW2Zvcm1hdF07XG5cdFx0XHRcdGlmICh0eXBlb2YgZm9ybWF0dGVyID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0Y29uc3QgdmFsID0gYXJnc1tpbmRleF07XG5cdFx0XHRcdFx0bWF0Y2ggPSBmb3JtYXR0ZXIuY2FsbChzZWxmLCB2YWwpO1xuXG5cdFx0XHRcdFx0Ly8gTm93IHdlIG5lZWQgdG8gcmVtb3ZlIGBhcmdzW2luZGV4XWAgc2luY2UgaXQncyBpbmxpbmVkIGluIHRoZSBgZm9ybWF0YFxuXHRcdFx0XHRcdGFyZ3Muc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdFx0XHRpbmRleC0tO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBtYXRjaDtcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBBcHBseSBlbnYtc3BlY2lmaWMgZm9ybWF0dGluZyAoY29sb3JzLCBldGMuKVxuXHRcdFx0Y3JlYXRlRGVidWcuZm9ybWF0QXJncy5jYWxsKHNlbGYsIGFyZ3MpO1xuXG5cdFx0XHRjb25zdCBsb2dGbiA9IHNlbGYubG9nIHx8IGNyZWF0ZURlYnVnLmxvZztcblx0XHRcdGxvZ0ZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuXHRcdH1cblxuXHRcdGRlYnVnLm5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcblx0XHRkZWJ1Zy51c2VDb2xvcnMgPSBjcmVhdGVEZWJ1Zy51c2VDb2xvcnMoKTtcblx0XHRkZWJ1Zy5jb2xvciA9IGNyZWF0ZURlYnVnLnNlbGVjdENvbG9yKG5hbWVzcGFjZSk7XG5cdFx0ZGVidWcuZXh0ZW5kID0gZXh0ZW5kO1xuXHRcdGRlYnVnLmRlc3Ryb3kgPSBjcmVhdGVEZWJ1Zy5kZXN0cm95OyAvLyBYWFggVGVtcG9yYXJ5LiBXaWxsIGJlIHJlbW92ZWQgaW4gdGhlIG5leHQgbWFqb3IgcmVsZWFzZS5cblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkZWJ1ZywgJ2VuYWJsZWQnLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcblx0XHRcdGdldDogKCkgPT4gZW5hYmxlT3ZlcnJpZGUgPT09IG51bGwgPyBjcmVhdGVEZWJ1Zy5lbmFibGVkKG5hbWVzcGFjZSkgOiBlbmFibGVPdmVycmlkZSxcblx0XHRcdHNldDogdiA9PiB7XG5cdFx0XHRcdGVuYWJsZU92ZXJyaWRlID0gdjtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIEVudi1zcGVjaWZpYyBpbml0aWFsaXphdGlvbiBsb2dpYyBmb3IgZGVidWcgaW5zdGFuY2VzXG5cdFx0aWYgKHR5cGVvZiBjcmVhdGVEZWJ1Zy5pbml0ID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRjcmVhdGVEZWJ1Zy5pbml0KGRlYnVnKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZGVidWc7XG5cdH1cblxuXHRmdW5jdGlvbiBleHRlbmQobmFtZXNwYWNlLCBkZWxpbWl0ZXIpIHtcblx0XHRjb25zdCBuZXdEZWJ1ZyA9IGNyZWF0ZURlYnVnKHRoaXMubmFtZXNwYWNlICsgKHR5cGVvZiBkZWxpbWl0ZXIgPT09ICd1bmRlZmluZWQnID8gJzonIDogZGVsaW1pdGVyKSArIG5hbWVzcGFjZSk7XG5cdFx0bmV3RGVidWcubG9nID0gdGhpcy5sb2c7XG5cdFx0cmV0dXJuIG5ld0RlYnVnO1xuXHR9XG5cblx0LyoqXG5cdCogRW5hYmxlcyBhIGRlYnVnIG1vZGUgYnkgbmFtZXNwYWNlcy4gVGhpcyBjYW4gaW5jbHVkZSBtb2Rlc1xuXHQqIHNlcGFyYXRlZCBieSBhIGNvbG9uIGFuZCB3aWxkY2FyZHMuXG5cdCpcblx0KiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuXHQqIEBhcGkgcHVibGljXG5cdCovXG5cdGZ1bmN0aW9uIGVuYWJsZShuYW1lc3BhY2VzKSB7XG5cdFx0Y3JlYXRlRGVidWcuc2F2ZShuYW1lc3BhY2VzKTtcblxuXHRcdGNyZWF0ZURlYnVnLm5hbWVzID0gW107XG5cdFx0Y3JlYXRlRGVidWcuc2tpcHMgPSBbXTtcblxuXHRcdGxldCBpO1xuXHRcdGNvbnN0IHNwbGl0ID0gKHR5cGVvZiBuYW1lc3BhY2VzID09PSAnc3RyaW5nJyA/IG5hbWVzcGFjZXMgOiAnJykuc3BsaXQoL1tcXHMsXSsvKTtcblx0XHRjb25zdCBsZW4gPSBzcGxpdC5sZW5ndGg7XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdGlmICghc3BsaXRbaV0pIHtcblx0XHRcdFx0Ly8gaWdub3JlIGVtcHR5IHN0cmluZ3Ncblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdG5hbWVzcGFjZXMgPSBzcGxpdFtpXS5yZXBsYWNlKC9cXCovZywgJy4qPycpO1xuXG5cdFx0XHRpZiAobmFtZXNwYWNlc1swXSA9PT0gJy0nKSB7XG5cdFx0XHRcdGNyZWF0ZURlYnVnLnNraXBzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzLnN1YnN0cigxKSArICckJykpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y3JlYXRlRGVidWcubmFtZXMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMgKyAnJCcpKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0KiBEaXNhYmxlIGRlYnVnIG91dHB1dC5cblx0KlxuXHQqIEByZXR1cm4ge1N0cmluZ30gbmFtZXNwYWNlc1xuXHQqIEBhcGkgcHVibGljXG5cdCovXG5cdGZ1bmN0aW9uIGRpc2FibGUoKSB7XG5cdFx0Y29uc3QgbmFtZXNwYWNlcyA9IFtcblx0XHRcdC4uLmNyZWF0ZURlYnVnLm5hbWVzLm1hcCh0b05hbWVzcGFjZSksXG5cdFx0XHQuLi5jcmVhdGVEZWJ1Zy5za2lwcy5tYXAodG9OYW1lc3BhY2UpLm1hcChuYW1lc3BhY2UgPT4gJy0nICsgbmFtZXNwYWNlKVxuXHRcdF0uam9pbignLCcpO1xuXHRcdGNyZWF0ZURlYnVnLmVuYWJsZSgnJyk7XG5cdFx0cmV0dXJuIG5hbWVzcGFjZXM7XG5cdH1cblxuXHQvKipcblx0KiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIG1vZGUgbmFtZSBpcyBlbmFibGVkLCBmYWxzZSBvdGhlcndpc2UuXG5cdCpcblx0KiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuXHQqIEByZXR1cm4ge0Jvb2xlYW59XG5cdCogQGFwaSBwdWJsaWNcblx0Ki9cblx0ZnVuY3Rpb24gZW5hYmxlZChuYW1lKSB7XG5cdFx0aWYgKG5hbWVbbmFtZS5sZW5ndGggLSAxXSA9PT0gJyonKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRsZXQgaTtcblx0XHRsZXQgbGVuO1xuXG5cdFx0Zm9yIChpID0gMCwgbGVuID0gY3JlYXRlRGVidWcuc2tpcHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdGlmIChjcmVhdGVEZWJ1Zy5za2lwc1tpXS50ZXN0KG5hbWUpKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmb3IgKGkgPSAwLCBsZW4gPSBjcmVhdGVEZWJ1Zy5uYW1lcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0aWYgKGNyZWF0ZURlYnVnLm5hbWVzW2ldLnRlc3QobmFtZSkpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCogQ29udmVydCByZWdleHAgdG8gbmFtZXNwYWNlXG5cdCpcblx0KiBAcGFyYW0ge1JlZ0V4cH0gcmVneGVwXG5cdCogQHJldHVybiB7U3RyaW5nfSBuYW1lc3BhY2Vcblx0KiBAYXBpIHByaXZhdGVcblx0Ki9cblx0ZnVuY3Rpb24gdG9OYW1lc3BhY2UocmVnZXhwKSB7XG5cdFx0cmV0dXJuIHJlZ2V4cC50b1N0cmluZygpXG5cdFx0XHQuc3Vic3RyaW5nKDIsIHJlZ2V4cC50b1N0cmluZygpLmxlbmd0aCAtIDIpXG5cdFx0XHQucmVwbGFjZSgvXFwuXFwqXFw/JC8sICcqJyk7XG5cdH1cblxuXHQvKipcblx0KiBDb2VyY2UgYHZhbGAuXG5cdCpcblx0KiBAcGFyYW0ge01peGVkfSB2YWxcblx0KiBAcmV0dXJuIHtNaXhlZH1cblx0KiBAYXBpIHByaXZhdGVcblx0Ki9cblx0ZnVuY3Rpb24gY29lcmNlKHZhbCkge1xuXHRcdGlmICh2YWwgaW5zdGFuY2VvZiBFcnJvcikge1xuXHRcdFx0cmV0dXJuIHZhbC5zdGFjayB8fCB2YWwubWVzc2FnZTtcblx0XHR9XG5cdFx0cmV0dXJuIHZhbDtcblx0fVxuXG5cdC8qKlxuXHQqIFhYWCBETyBOT1QgVVNFLiBUaGlzIGlzIGEgdGVtcG9yYXJ5IHN0dWIgZnVuY3Rpb24uXG5cdCogWFhYIEl0IFdJTEwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciByZWxlYXNlLlxuXHQqL1xuXHRmdW5jdGlvbiBkZXN0cm95KCkge1xuXHRcdGNvbnNvbGUud2FybignSW5zdGFuY2UgbWV0aG9kIGBkZWJ1Zy5kZXN0cm95KClgIGlzIGRlcHJlY2F0ZWQgYW5kIG5vIGxvbmdlciBkb2VzIGFueXRoaW5nLiBJdCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIG5leHQgbWFqb3IgdmVyc2lvbiBvZiBgZGVidWdgLicpO1xuXHR9XG5cblx0Y3JlYXRlRGVidWcuZW5hYmxlKGNyZWF0ZURlYnVnLmxvYWQoKSk7XG5cblx0cmV0dXJuIGNyZWF0ZURlYnVnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldHVwO1xuIiwibW9kdWxlLmV4cG9ydHMgPSAoKCkgPT4ge1xuICBpZiAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4gc2VsZjtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHdpbmRvdztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xuICB9XG59KSgpO1xuIiwiY29uc3QgU29ja2V0ID0gcmVxdWlyZShcIi4vc29ja2V0XCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICh1cmksIG9wdHMpID0+IG5ldyBTb2NrZXQodXJpLCBvcHRzKTtcblxuLyoqXG4gKiBFeHBvc2UgZGVwcyBmb3IgbGVnYWN5IGNvbXBhdGliaWxpdHlcbiAqIGFuZCBzdGFuZGFsb25lIGJyb3dzZXIgYWNjZXNzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzLlNvY2tldCA9IFNvY2tldDtcbm1vZHVsZS5leHBvcnRzLnByb3RvY29sID0gU29ja2V0LnByb3RvY29sOyAvLyB0aGlzIGlzIGFuIGludFxubW9kdWxlLmV4cG9ydHMuVHJhbnNwb3J0ID0gcmVxdWlyZShcIi4vdHJhbnNwb3J0XCIpO1xubW9kdWxlLmV4cG9ydHMudHJhbnNwb3J0cyA9IHJlcXVpcmUoXCIuL3RyYW5zcG9ydHMvaW5kZXhcIik7XG5tb2R1bGUuZXhwb3J0cy5wYXJzZXIgPSByZXF1aXJlKFwiZW5naW5lLmlvLXBhcnNlclwiKTtcbiIsImNvbnN0IHRyYW5zcG9ydHMgPSByZXF1aXJlKFwiLi90cmFuc3BvcnRzL2luZGV4XCIpO1xuY29uc3QgRW1pdHRlciA9IHJlcXVpcmUoXCJjb21wb25lbnQtZW1pdHRlclwiKTtcbmNvbnN0IGRlYnVnID0gcmVxdWlyZShcImRlYnVnXCIpKFwiZW5naW5lLmlvLWNsaWVudDpzb2NrZXRcIik7XG5jb25zdCBwYXJzZXIgPSByZXF1aXJlKFwiZW5naW5lLmlvLXBhcnNlclwiKTtcbmNvbnN0IHBhcnNldXJpID0gcmVxdWlyZShcInBhcnNldXJpXCIpO1xuY29uc3QgcGFyc2VxcyA9IHJlcXVpcmUoXCJwYXJzZXFzXCIpO1xuXG5jbGFzcyBTb2NrZXQgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgLyoqXG4gICAqIFNvY2tldCBjb25zdHJ1Y3Rvci5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSB1cmkgb3Igb3B0aW9uc1xuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cbiAgY29uc3RydWN0b3IodXJpLCBvcHRzID0ge30pIHtcbiAgICBzdXBlcigpO1xuXG4gICAgaWYgKHVyaSAmJiBcIm9iamVjdFwiID09PSB0eXBlb2YgdXJpKSB7XG4gICAgICBvcHRzID0gdXJpO1xuICAgICAgdXJpID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodXJpKSB7XG4gICAgICB1cmkgPSBwYXJzZXVyaSh1cmkpO1xuICAgICAgb3B0cy5ob3N0bmFtZSA9IHVyaS5ob3N0O1xuICAgICAgb3B0cy5zZWN1cmUgPSB1cmkucHJvdG9jb2wgPT09IFwiaHR0cHNcIiB8fCB1cmkucHJvdG9jb2wgPT09IFwid3NzXCI7XG4gICAgICBvcHRzLnBvcnQgPSB1cmkucG9ydDtcbiAgICAgIGlmICh1cmkucXVlcnkpIG9wdHMucXVlcnkgPSB1cmkucXVlcnk7XG4gICAgfSBlbHNlIGlmIChvcHRzLmhvc3QpIHtcbiAgICAgIG9wdHMuaG9zdG5hbWUgPSBwYXJzZXVyaShvcHRzLmhvc3QpLmhvc3Q7XG4gICAgfVxuXG4gICAgdGhpcy5zZWN1cmUgPVxuICAgICAgbnVsbCAhPSBvcHRzLnNlY3VyZVxuICAgICAgICA/IG9wdHMuc2VjdXJlXG4gICAgICAgIDogdHlwZW9mIGxvY2F0aW9uICE9PSBcInVuZGVmaW5lZFwiICYmIFwiaHR0cHM6XCIgPT09IGxvY2F0aW9uLnByb3RvY29sO1xuXG4gICAgaWYgKG9wdHMuaG9zdG5hbWUgJiYgIW9wdHMucG9ydCkge1xuICAgICAgLy8gaWYgbm8gcG9ydCBpcyBzcGVjaWZpZWQgbWFudWFsbHksIHVzZSB0aGUgcHJvdG9jb2wgZGVmYXVsdFxuICAgICAgb3B0cy5wb3J0ID0gdGhpcy5zZWN1cmUgPyBcIjQ0M1wiIDogXCI4MFwiO1xuICAgIH1cblxuICAgIHRoaXMuaG9zdG5hbWUgPVxuICAgICAgb3B0cy5ob3N0bmFtZSB8fFxuICAgICAgKHR5cGVvZiBsb2NhdGlvbiAhPT0gXCJ1bmRlZmluZWRcIiA/IGxvY2F0aW9uLmhvc3RuYW1lIDogXCJsb2NhbGhvc3RcIik7XG4gICAgdGhpcy5wb3J0ID1cbiAgICAgIG9wdHMucG9ydCB8fFxuICAgICAgKHR5cGVvZiBsb2NhdGlvbiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBsb2NhdGlvbi5wb3J0XG4gICAgICAgID8gbG9jYXRpb24ucG9ydFxuICAgICAgICA6IHRoaXMuc2VjdXJlXG4gICAgICAgID8gNDQzXG4gICAgICAgIDogODApO1xuXG4gICAgdGhpcy50cmFuc3BvcnRzID0gb3B0cy50cmFuc3BvcnRzIHx8IFtcInBvbGxpbmdcIiwgXCJ3ZWJzb2NrZXRcIl07XG4gICAgdGhpcy5yZWFkeVN0YXRlID0gXCJcIjtcbiAgICB0aGlzLndyaXRlQnVmZmVyID0gW107XG4gICAgdGhpcy5wcmV2QnVmZmVyTGVuID0gMDtcblxuICAgIHRoaXMub3B0cyA9IE9iamVjdC5hc3NpZ24oXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwiL2VuZ2luZS5pb1wiLFxuICAgICAgICBhZ2VudDogZmFsc2UsXG4gICAgICAgIHdpdGhDcmVkZW50aWFsczogZmFsc2UsXG4gICAgICAgIHVwZ3JhZGU6IHRydWUsXG4gICAgICAgIGpzb25wOiB0cnVlLFxuICAgICAgICB0aW1lc3RhbXBQYXJhbTogXCJ0XCIsXG4gICAgICAgIHJlbWVtYmVyVXBncmFkZTogZmFsc2UsXG4gICAgICAgIHJlamVjdFVuYXV0aG9yaXplZDogdHJ1ZSxcbiAgICAgICAgcGVyTWVzc2FnZURlZmxhdGU6IHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IDEwMjRcbiAgICAgICAgfSxcbiAgICAgICAgdHJhbnNwb3J0T3B0aW9uczoge31cbiAgICAgIH0sXG4gICAgICBvcHRzXG4gICAgKTtcblxuICAgIHRoaXMub3B0cy5wYXRoID0gdGhpcy5vcHRzLnBhdGgucmVwbGFjZSgvXFwvJC8sIFwiXCIpICsgXCIvXCI7XG5cbiAgICBpZiAodHlwZW9mIHRoaXMub3B0cy5xdWVyeSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhpcy5vcHRzLnF1ZXJ5ID0gcGFyc2Vxcy5kZWNvZGUodGhpcy5vcHRzLnF1ZXJ5KTtcbiAgICB9XG5cbiAgICAvLyBzZXQgb24gaGFuZHNoYWtlXG4gICAgdGhpcy5pZCA9IG51bGw7XG4gICAgdGhpcy51cGdyYWRlcyA9IG51bGw7XG4gICAgdGhpcy5waW5nSW50ZXJ2YWwgPSBudWxsO1xuICAgIHRoaXMucGluZ1RpbWVvdXQgPSBudWxsO1xuXG4gICAgLy8gc2V0IG9uIGhlYXJ0YmVhdFxuICAgIHRoaXMucGluZ1RpbWVvdXRUaW1lciA9IG51bGw7XG5cbiAgICBpZiAodHlwZW9mIGFkZEV2ZW50TGlzdGVuZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgXCJiZWZvcmV1bmxvYWRcIixcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLnRyYW5zcG9ydCkge1xuICAgICAgICAgICAgLy8gc2lsZW50bHkgY2xvc2UgdGhlIHRyYW5zcG9ydFxuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5jbG9zZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZmFsc2VcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5vcGVuKCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0cmFuc3BvcnQgb2YgdGhlIGdpdmVuIHR5cGUuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0cmFuc3BvcnQgbmFtZVxuICAgKiBAcmV0dXJuIHtUcmFuc3BvcnR9XG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cbiAgY3JlYXRlVHJhbnNwb3J0KG5hbWUpIHtcbiAgICBkZWJ1ZygnY3JlYXRpbmcgdHJhbnNwb3J0IFwiJXNcIicsIG5hbWUpO1xuICAgIGNvbnN0IHF1ZXJ5ID0gY2xvbmUodGhpcy5vcHRzLnF1ZXJ5KTtcblxuICAgIC8vIGFwcGVuZCBlbmdpbmUuaW8gcHJvdG9jb2wgaWRlbnRpZmllclxuICAgIHF1ZXJ5LkVJTyA9IHBhcnNlci5wcm90b2NvbDtcblxuICAgIC8vIHRyYW5zcG9ydCBuYW1lXG4gICAgcXVlcnkudHJhbnNwb3J0ID0gbmFtZTtcblxuICAgIC8vIHNlc3Npb24gaWQgaWYgd2UgYWxyZWFkeSBoYXZlIG9uZVxuICAgIGlmICh0aGlzLmlkKSBxdWVyeS5zaWQgPSB0aGlzLmlkO1xuXG4gICAgY29uc3Qgb3B0cyA9IE9iamVjdC5hc3NpZ24oXG4gICAgICB7fSxcbiAgICAgIHRoaXMub3B0cy50cmFuc3BvcnRPcHRpb25zW25hbWVdLFxuICAgICAgdGhpcy5vcHRzLFxuICAgICAge1xuICAgICAgICBxdWVyeSxcbiAgICAgICAgc29ja2V0OiB0aGlzLFxuICAgICAgICBob3N0bmFtZTogdGhpcy5ob3N0bmFtZSxcbiAgICAgICAgc2VjdXJlOiB0aGlzLnNlY3VyZSxcbiAgICAgICAgcG9ydDogdGhpcy5wb3J0XG4gICAgICB9XG4gICAgKTtcblxuICAgIGRlYnVnKFwib3B0aW9uczogJWpcIiwgb3B0cyk7XG5cbiAgICByZXR1cm4gbmV3IHRyYW5zcG9ydHNbbmFtZV0ob3B0cyk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdHJhbnNwb3J0IHRvIHVzZSBhbmQgc3RhcnRzIHByb2JlLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG4gIG9wZW4oKSB7XG4gICAgbGV0IHRyYW5zcG9ydDtcbiAgICBpZiAoXG4gICAgICB0aGlzLm9wdHMucmVtZW1iZXJVcGdyYWRlICYmXG4gICAgICBTb2NrZXQucHJpb3JXZWJzb2NrZXRTdWNjZXNzICYmXG4gICAgICB0aGlzLnRyYW5zcG9ydHMuaW5kZXhPZihcIndlYnNvY2tldFwiKSAhPT0gLTFcbiAgICApIHtcbiAgICAgIHRyYW5zcG9ydCA9IFwid2Vic29ja2V0XCI7XG4gICAgfSBlbHNlIGlmICgwID09PSB0aGlzLnRyYW5zcG9ydHMubGVuZ3RoKSB7XG4gICAgICAvLyBFbWl0IGVycm9yIG9uIG5leHQgdGljayBzbyBpdCBjYW4gYmUgbGlzdGVuZWQgdG9cbiAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgc2VsZi5lbWl0KFwiZXJyb3JcIiwgXCJObyB0cmFuc3BvcnRzIGF2YWlsYWJsZVwiKTtcbiAgICAgIH0sIDApO1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICB0cmFuc3BvcnQgPSB0aGlzLnRyYW5zcG9ydHNbMF07XG4gICAgfVxuICAgIHRoaXMucmVhZHlTdGF0ZSA9IFwib3BlbmluZ1wiO1xuXG4gICAgLy8gUmV0cnkgd2l0aCB0aGUgbmV4dCB0cmFuc3BvcnQgaWYgdGhlIHRyYW5zcG9ydCBpcyBkaXNhYmxlZCAoanNvbnA6IGZhbHNlKVxuICAgIHRyeSB7XG4gICAgICB0cmFuc3BvcnQgPSB0aGlzLmNyZWF0ZVRyYW5zcG9ydCh0cmFuc3BvcnQpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGRlYnVnKFwiZXJyb3Igd2hpbGUgY3JlYXRpbmcgdHJhbnNwb3J0OiAlc1wiLCBlKTtcbiAgICAgIHRoaXMudHJhbnNwb3J0cy5zaGlmdCgpO1xuICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJhbnNwb3J0Lm9wZW4oKTtcbiAgICB0aGlzLnNldFRyYW5zcG9ydCh0cmFuc3BvcnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGN1cnJlbnQgdHJhbnNwb3J0LiBEaXNhYmxlcyB0aGUgZXhpc3Rpbmcgb25lIChpZiBhbnkpLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG4gIHNldFRyYW5zcG9ydCh0cmFuc3BvcnQpIHtcbiAgICBkZWJ1ZyhcInNldHRpbmcgdHJhbnNwb3J0ICVzXCIsIHRyYW5zcG9ydC5uYW1lKTtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIGlmICh0aGlzLnRyYW5zcG9ydCkge1xuICAgICAgZGVidWcoXCJjbGVhcmluZyBleGlzdGluZyB0cmFuc3BvcnQgJXNcIiwgdGhpcy50cmFuc3BvcnQubmFtZSk7XG4gICAgICB0aGlzLnRyYW5zcG9ydC5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICB9XG5cbiAgICAvLyBzZXQgdXAgdHJhbnNwb3J0XG4gICAgdGhpcy50cmFuc3BvcnQgPSB0cmFuc3BvcnQ7XG5cbiAgICAvLyBzZXQgdXAgdHJhbnNwb3J0IGxpc3RlbmVyc1xuICAgIHRyYW5zcG9ydFxuICAgICAgLm9uKFwiZHJhaW5cIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYub25EcmFpbigpO1xuICAgICAgfSlcbiAgICAgIC5vbihcInBhY2tldFwiLCBmdW5jdGlvbihwYWNrZXQpIHtcbiAgICAgICAgc2VsZi5vblBhY2tldChwYWNrZXQpO1xuICAgICAgfSlcbiAgICAgIC5vbihcImVycm9yXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgc2VsZi5vbkVycm9yKGUpO1xuICAgICAgfSlcbiAgICAgIC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBzZWxmLm9uQ2xvc2UoXCJ0cmFuc3BvcnQgY2xvc2VcIik7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9iZXMgYSB0cmFuc3BvcnQuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0cmFuc3BvcnQgbmFtZVxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG4gIHByb2JlKG5hbWUpIHtcbiAgICBkZWJ1ZygncHJvYmluZyB0cmFuc3BvcnQgXCIlc1wiJywgbmFtZSk7XG4gICAgbGV0IHRyYW5zcG9ydCA9IHRoaXMuY3JlYXRlVHJhbnNwb3J0KG5hbWUsIHsgcHJvYmU6IDEgfSk7XG4gICAgbGV0IGZhaWxlZCA9IGZhbHNlO1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gb25UcmFuc3BvcnRPcGVuKCkge1xuICAgICAgaWYgKHNlbGYub25seUJpbmFyeVVwZ3JhZGVzKSB7XG4gICAgICAgIGNvbnN0IHVwZ3JhZGVMb3Nlc0JpbmFyeSA9XG4gICAgICAgICAgIXRoaXMuc3VwcG9ydHNCaW5hcnkgJiYgc2VsZi50cmFuc3BvcnQuc3VwcG9ydHNCaW5hcnk7XG4gICAgICAgIGZhaWxlZCA9IGZhaWxlZCB8fCB1cGdyYWRlTG9zZXNCaW5hcnk7XG4gICAgICB9XG4gICAgICBpZiAoZmFpbGVkKSByZXR1cm47XG5cbiAgICAgIGRlYnVnKCdwcm9iZSB0cmFuc3BvcnQgXCIlc1wiIG9wZW5lZCcsIG5hbWUpO1xuICAgICAgdHJhbnNwb3J0LnNlbmQoW3sgdHlwZTogXCJwaW5nXCIsIGRhdGE6IFwicHJvYmVcIiB9XSk7XG4gICAgICB0cmFuc3BvcnQub25jZShcInBhY2tldFwiLCBmdW5jdGlvbihtc2cpIHtcbiAgICAgICAgaWYgKGZhaWxlZCkgcmV0dXJuO1xuICAgICAgICBpZiAoXCJwb25nXCIgPT09IG1zZy50eXBlICYmIFwicHJvYmVcIiA9PT0gbXNnLmRhdGEpIHtcbiAgICAgICAgICBkZWJ1ZygncHJvYmUgdHJhbnNwb3J0IFwiJXNcIiBwb25nJywgbmFtZSk7XG4gICAgICAgICAgc2VsZi51cGdyYWRpbmcgPSB0cnVlO1xuICAgICAgICAgIHNlbGYuZW1pdChcInVwZ3JhZGluZ1wiLCB0cmFuc3BvcnQpO1xuICAgICAgICAgIGlmICghdHJhbnNwb3J0KSByZXR1cm47XG4gICAgICAgICAgU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9IFwid2Vic29ja2V0XCIgPT09IHRyYW5zcG9ydC5uYW1lO1xuXG4gICAgICAgICAgZGVidWcoJ3BhdXNpbmcgY3VycmVudCB0cmFuc3BvcnQgXCIlc1wiJywgc2VsZi50cmFuc3BvcnQubmFtZSk7XG4gICAgICAgICAgc2VsZi50cmFuc3BvcnQucGF1c2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoZmFpbGVkKSByZXR1cm47XG4gICAgICAgICAgICBpZiAoXCJjbG9zZWRcIiA9PT0gc2VsZi5yZWFkeVN0YXRlKSByZXR1cm47XG4gICAgICAgICAgICBkZWJ1ZyhcImNoYW5naW5nIHRyYW5zcG9ydCBhbmQgc2VuZGluZyB1cGdyYWRlIHBhY2tldFwiKTtcblxuICAgICAgICAgICAgY2xlYW51cCgpO1xuXG4gICAgICAgICAgICBzZWxmLnNldFRyYW5zcG9ydCh0cmFuc3BvcnQpO1xuICAgICAgICAgICAgdHJhbnNwb3J0LnNlbmQoW3sgdHlwZTogXCJ1cGdyYWRlXCIgfV0pO1xuICAgICAgICAgICAgc2VsZi5lbWl0KFwidXBncmFkZVwiLCB0cmFuc3BvcnQpO1xuICAgICAgICAgICAgdHJhbnNwb3J0ID0gbnVsbDtcbiAgICAgICAgICAgIHNlbGYudXBncmFkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICBzZWxmLmZsdXNoKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVidWcoJ3Byb2JlIHRyYW5zcG9ydCBcIiVzXCIgZmFpbGVkJywgbmFtZSk7XG4gICAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKFwicHJvYmUgZXJyb3JcIik7XG4gICAgICAgICAgZXJyLnRyYW5zcG9ydCA9IHRyYW5zcG9ydC5uYW1lO1xuICAgICAgICAgIHNlbGYuZW1pdChcInVwZ3JhZGVFcnJvclwiLCBlcnIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmcmVlemVUcmFuc3BvcnQoKSB7XG4gICAgICBpZiAoZmFpbGVkKSByZXR1cm47XG5cbiAgICAgIC8vIEFueSBjYWxsYmFjayBjYWxsZWQgYnkgdHJhbnNwb3J0IHNob3VsZCBiZSBpZ25vcmVkIHNpbmNlIG5vd1xuICAgICAgZmFpbGVkID0gdHJ1ZTtcblxuICAgICAgY2xlYW51cCgpO1xuXG4gICAgICB0cmFuc3BvcnQuY2xvc2UoKTtcbiAgICAgIHRyYW5zcG9ydCA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIGFueSBlcnJvciB0aGF0IGhhcHBlbnMgd2hpbGUgcHJvYmluZ1xuICAgIGZ1bmN0aW9uIG9uZXJyb3IoZXJyKSB7XG4gICAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcihcInByb2JlIGVycm9yOiBcIiArIGVycik7XG4gICAgICBlcnJvci50cmFuc3BvcnQgPSB0cmFuc3BvcnQubmFtZTtcblxuICAgICAgZnJlZXplVHJhbnNwb3J0KCk7XG5cbiAgICAgIGRlYnVnKCdwcm9iZSB0cmFuc3BvcnQgXCIlc1wiIGZhaWxlZCBiZWNhdXNlIG9mIGVycm9yOiAlcycsIG5hbWUsIGVycik7XG5cbiAgICAgIHNlbGYuZW1pdChcInVwZ3JhZGVFcnJvclwiLCBlcnJvcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25UcmFuc3BvcnRDbG9zZSgpIHtcbiAgICAgIG9uZXJyb3IoXCJ0cmFuc3BvcnQgY2xvc2VkXCIpO1xuICAgIH1cblxuICAgIC8vIFdoZW4gdGhlIHNvY2tldCBpcyBjbG9zZWQgd2hpbGUgd2UncmUgcHJvYmluZ1xuICAgIGZ1bmN0aW9uIG9uY2xvc2UoKSB7XG4gICAgICBvbmVycm9yKFwic29ja2V0IGNsb3NlZFwiKTtcbiAgICB9XG5cbiAgICAvLyBXaGVuIHRoZSBzb2NrZXQgaXMgdXBncmFkZWQgd2hpbGUgd2UncmUgcHJvYmluZ1xuICAgIGZ1bmN0aW9uIG9udXBncmFkZSh0bykge1xuICAgICAgaWYgKHRyYW5zcG9ydCAmJiB0by5uYW1lICE9PSB0cmFuc3BvcnQubmFtZSkge1xuICAgICAgICBkZWJ1ZygnXCIlc1wiIHdvcmtzIC0gYWJvcnRpbmcgXCIlc1wiJywgdG8ubmFtZSwgdHJhbnNwb3J0Lm5hbWUpO1xuICAgICAgICBmcmVlemVUcmFuc3BvcnQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgYWxsIGxpc3RlbmVycyBvbiB0aGUgdHJhbnNwb3J0IGFuZCBvbiBzZWxmXG4gICAgZnVuY3Rpb24gY2xlYW51cCgpIHtcbiAgICAgIHRyYW5zcG9ydC5yZW1vdmVMaXN0ZW5lcihcIm9wZW5cIiwgb25UcmFuc3BvcnRPcGVuKTtcbiAgICAgIHRyYW5zcG9ydC5yZW1vdmVMaXN0ZW5lcihcImVycm9yXCIsIG9uZXJyb3IpO1xuICAgICAgdHJhbnNwb3J0LnJlbW92ZUxpc3RlbmVyKFwiY2xvc2VcIiwgb25UcmFuc3BvcnRDbG9zZSk7XG4gICAgICBzZWxmLnJlbW92ZUxpc3RlbmVyKFwiY2xvc2VcIiwgb25jbG9zZSk7XG4gICAgICBzZWxmLnJlbW92ZUxpc3RlbmVyKFwidXBncmFkaW5nXCIsIG9udXBncmFkZSk7XG4gICAgfVxuXG4gICAgdHJhbnNwb3J0Lm9uY2UoXCJvcGVuXCIsIG9uVHJhbnNwb3J0T3Blbik7XG4gICAgdHJhbnNwb3J0Lm9uY2UoXCJlcnJvclwiLCBvbmVycm9yKTtcbiAgICB0cmFuc3BvcnQub25jZShcImNsb3NlXCIsIG9uVHJhbnNwb3J0Q2xvc2UpO1xuXG4gICAgdGhpcy5vbmNlKFwiY2xvc2VcIiwgb25jbG9zZSk7XG4gICAgdGhpcy5vbmNlKFwidXBncmFkaW5nXCIsIG9udXBncmFkZSk7XG5cbiAgICB0cmFuc3BvcnQub3BlbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGNvbm5lY3Rpb24gaXMgZGVlbWVkIG9wZW4uXG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuICBvbk9wZW4oKSB7XG4gICAgZGVidWcoXCJzb2NrZXQgb3BlblwiKTtcbiAgICB0aGlzLnJlYWR5U3RhdGUgPSBcIm9wZW5cIjtcbiAgICBTb2NrZXQucHJpb3JXZWJzb2NrZXRTdWNjZXNzID0gXCJ3ZWJzb2NrZXRcIiA9PT0gdGhpcy50cmFuc3BvcnQubmFtZTtcbiAgICB0aGlzLmVtaXQoXCJvcGVuXCIpO1xuICAgIHRoaXMuZmx1c2goKTtcblxuICAgIC8vIHdlIGNoZWNrIGZvciBgcmVhZHlTdGF0ZWAgaW4gY2FzZSBhbiBgb3BlbmBcbiAgICAvLyBsaXN0ZW5lciBhbHJlYWR5IGNsb3NlZCB0aGUgc29ja2V0XG4gICAgaWYgKFxuICAgICAgXCJvcGVuXCIgPT09IHRoaXMucmVhZHlTdGF0ZSAmJlxuICAgICAgdGhpcy5vcHRzLnVwZ3JhZGUgJiZcbiAgICAgIHRoaXMudHJhbnNwb3J0LnBhdXNlXG4gICAgKSB7XG4gICAgICBkZWJ1ZyhcInN0YXJ0aW5nIHVwZ3JhZGUgcHJvYmVzXCIpO1xuICAgICAgbGV0IGkgPSAwO1xuICAgICAgY29uc3QgbCA9IHRoaXMudXBncmFkZXMubGVuZ3RoO1xuICAgICAgZm9yICg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdGhpcy5wcm9iZSh0aGlzLnVwZ3JhZGVzW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhIHBhY2tldC5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuICBvblBhY2tldChwYWNrZXQpIHtcbiAgICBpZiAoXG4gICAgICBcIm9wZW5pbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8XG4gICAgICBcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8XG4gICAgICBcImNsb3NpbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlXG4gICAgKSB7XG4gICAgICBkZWJ1Zygnc29ja2V0IHJlY2VpdmU6IHR5cGUgXCIlc1wiLCBkYXRhIFwiJXNcIicsIHBhY2tldC50eXBlLCBwYWNrZXQuZGF0YSk7XG5cbiAgICAgIHRoaXMuZW1pdChcInBhY2tldFwiLCBwYWNrZXQpO1xuXG4gICAgICAvLyBTb2NrZXQgaXMgbGl2ZSAtIGFueSBwYWNrZXQgY291bnRzXG4gICAgICB0aGlzLmVtaXQoXCJoZWFydGJlYXRcIik7XG5cbiAgICAgIHN3aXRjaCAocGFja2V0LnR5cGUpIHtcbiAgICAgICAgY2FzZSBcIm9wZW5cIjpcbiAgICAgICAgICB0aGlzLm9uSGFuZHNoYWtlKEpTT04ucGFyc2UocGFja2V0LmRhdGEpKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwicGluZ1wiOlxuICAgICAgICAgIHRoaXMucmVzZXRQaW5nVGltZW91dCgpO1xuICAgICAgICAgIHRoaXMuc2VuZFBhY2tldChcInBvbmdcIik7XG4gICAgICAgICAgdGhpcy5lbWl0KFwicG9uZ1wiKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwiZXJyb3JcIjpcbiAgICAgICAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoXCJzZXJ2ZXIgZXJyb3JcIik7XG4gICAgICAgICAgZXJyLmNvZGUgPSBwYWNrZXQuZGF0YTtcbiAgICAgICAgICB0aGlzLm9uRXJyb3IoZXJyKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwibWVzc2FnZVwiOlxuICAgICAgICAgIHRoaXMuZW1pdChcImRhdGFcIiwgcGFja2V0LmRhdGEpO1xuICAgICAgICAgIHRoaXMuZW1pdChcIm1lc3NhZ2VcIiwgcGFja2V0LmRhdGEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBkZWJ1ZygncGFja2V0IHJlY2VpdmVkIHdpdGggc29ja2V0IHJlYWR5U3RhdGUgXCIlc1wiJywgdGhpcy5yZWFkeVN0YXRlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIHVwb24gaGFuZHNoYWtlIGNvbXBsZXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBoYW5kc2hha2Ugb2JqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cbiAgb25IYW5kc2hha2UoZGF0YSkge1xuICAgIHRoaXMuZW1pdChcImhhbmRzaGFrZVwiLCBkYXRhKTtcbiAgICB0aGlzLmlkID0gZGF0YS5zaWQ7XG4gICAgdGhpcy50cmFuc3BvcnQucXVlcnkuc2lkID0gZGF0YS5zaWQ7XG4gICAgdGhpcy51cGdyYWRlcyA9IHRoaXMuZmlsdGVyVXBncmFkZXMoZGF0YS51cGdyYWRlcyk7XG4gICAgdGhpcy5waW5nSW50ZXJ2YWwgPSBkYXRhLnBpbmdJbnRlcnZhbDtcbiAgICB0aGlzLnBpbmdUaW1lb3V0ID0gZGF0YS5waW5nVGltZW91dDtcbiAgICB0aGlzLm9uT3BlbigpO1xuICAgIC8vIEluIGNhc2Ugb3BlbiBoYW5kbGVyIGNsb3NlcyBzb2NrZXRcbiAgICBpZiAoXCJjbG9zZWRcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSByZXR1cm47XG4gICAgdGhpcy5yZXNldFBpbmdUaW1lb3V0KCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBhbmQgcmVzZXRzIHBpbmcgdGltZW91dCB0aW1lciBiYXNlZCBvbiBzZXJ2ZXIgcGluZ3MuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cbiAgcmVzZXRQaW5nVGltZW91dCgpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5waW5nVGltZW91dFRpbWVyKTtcbiAgICB0aGlzLnBpbmdUaW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMub25DbG9zZShcInBpbmcgdGltZW91dFwiKTtcbiAgICB9LCB0aGlzLnBpbmdJbnRlcnZhbCArIHRoaXMucGluZ1RpbWVvdXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCBvbiBgZHJhaW5gIGV2ZW50XG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cbiAgb25EcmFpbigpIHtcbiAgICB0aGlzLndyaXRlQnVmZmVyLnNwbGljZSgwLCB0aGlzLnByZXZCdWZmZXJMZW4pO1xuXG4gICAgLy8gc2V0dGluZyBwcmV2QnVmZmVyTGVuID0gMCBpcyB2ZXJ5IGltcG9ydGFudFxuICAgIC8vIGZvciBleGFtcGxlLCB3aGVuIHVwZ3JhZGluZywgdXBncmFkZSBwYWNrZXQgaXMgc2VudCBvdmVyLFxuICAgIC8vIGFuZCBhIG5vbnplcm8gcHJldkJ1ZmZlckxlbiBjb3VsZCBjYXVzZSBwcm9ibGVtcyBvbiBgZHJhaW5gXG4gICAgdGhpcy5wcmV2QnVmZmVyTGVuID0gMDtcblxuICAgIGlmICgwID09PSB0aGlzLndyaXRlQnVmZmVyLmxlbmd0aCkge1xuICAgICAgdGhpcy5lbWl0KFwiZHJhaW5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZmx1c2goKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRmx1c2ggd3JpdGUgYnVmZmVycy5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuICBmbHVzaCgpIHtcbiAgICBpZiAoXG4gICAgICBcImNsb3NlZFwiICE9PSB0aGlzLnJlYWR5U3RhdGUgJiZcbiAgICAgIHRoaXMudHJhbnNwb3J0LndyaXRhYmxlICYmXG4gICAgICAhdGhpcy51cGdyYWRpbmcgJiZcbiAgICAgIHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoXG4gICAgKSB7XG4gICAgICBkZWJ1ZyhcImZsdXNoaW5nICVkIHBhY2tldHMgaW4gc29ja2V0XCIsIHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoKTtcbiAgICAgIHRoaXMudHJhbnNwb3J0LnNlbmQodGhpcy53cml0ZUJ1ZmZlcik7XG4gICAgICAvLyBrZWVwIHRyYWNrIG9mIGN1cnJlbnQgbGVuZ3RoIG9mIHdyaXRlQnVmZmVyXG4gICAgICAvLyBzcGxpY2Ugd3JpdGVCdWZmZXIgYW5kIGNhbGxiYWNrQnVmZmVyIG9uIGBkcmFpbmBcbiAgICAgIHRoaXMucHJldkJ1ZmZlckxlbiA9IHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoO1xuICAgICAgdGhpcy5lbWl0KFwiZmx1c2hcIik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbmRzIGEgbWVzc2FnZS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5cbiAgICogQHJldHVybiB7U29ja2V0fSBmb3IgY2hhaW5pbmcuXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuICB3cml0ZShtc2csIG9wdGlvbnMsIGZuKSB7XG4gICAgdGhpcy5zZW5kUGFja2V0KFwibWVzc2FnZVwiLCBtc2csIG9wdGlvbnMsIGZuKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNlbmQobXNnLCBvcHRpb25zLCBmbikge1xuICAgIHRoaXMuc2VuZFBhY2tldChcIm1lc3NhZ2VcIiwgbXNnLCBvcHRpb25zLCBmbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU2VuZHMgYSBwYWNrZXQuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYWNrZXQgdHlwZS5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBmdW5jdGlvbi5cbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuICBzZW5kUGFja2V0KHR5cGUsIGRhdGEsIG9wdGlvbnMsIGZuKSB7XG4gICAgaWYgKFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIGRhdGEpIHtcbiAgICAgIGZuID0gZGF0YTtcbiAgICAgIGRhdGEgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgaWYgKFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIG9wdGlvbnMpIHtcbiAgICAgIGZuID0gb3B0aW9ucztcbiAgICAgIG9wdGlvbnMgPSBudWxsO1xuICAgIH1cblxuICAgIGlmIChcImNsb3NpbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8IFwiY2xvc2VkXCIgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIG9wdGlvbnMuY29tcHJlc3MgPSBmYWxzZSAhPT0gb3B0aW9ucy5jb21wcmVzcztcblxuICAgIGNvbnN0IHBhY2tldCA9IHtcbiAgICAgIHR5cGU6IHR5cGUsXG4gICAgICBkYXRhOiBkYXRhLFxuICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgIH07XG4gICAgdGhpcy5lbWl0KFwicGFja2V0Q3JlYXRlXCIsIHBhY2tldCk7XG4gICAgdGhpcy53cml0ZUJ1ZmZlci5wdXNoKHBhY2tldCk7XG4gICAgaWYgKGZuKSB0aGlzLm9uY2UoXCJmbHVzaFwiLCBmbik7XG4gICAgdGhpcy5mbHVzaCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgY29ubmVjdGlvbi5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuICBjbG9zZSgpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIGlmIChcIm9wZW5pbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8IFwib3BlblwiID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFwiY2xvc2luZ1wiO1xuXG4gICAgICBpZiAodGhpcy53cml0ZUJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5vbmNlKFwiZHJhaW5cIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKHRoaXMudXBncmFkaW5nKSB7XG4gICAgICAgICAgICB3YWl0Rm9yVXBncmFkZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudXBncmFkaW5nKSB7XG4gICAgICAgIHdhaXRGb3JVcGdyYWRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjbG9zZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgICAgc2VsZi5vbkNsb3NlKFwiZm9yY2VkIGNsb3NlXCIpO1xuICAgICAgZGVidWcoXCJzb2NrZXQgY2xvc2luZyAtIHRlbGxpbmcgdHJhbnNwb3J0IHRvIGNsb3NlXCIpO1xuICAgICAgc2VsZi50cmFuc3BvcnQuY2xvc2UoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhbnVwQW5kQ2xvc2UoKSB7XG4gICAgICBzZWxmLnJlbW92ZUxpc3RlbmVyKFwidXBncmFkZVwiLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICAgICAgc2VsZi5yZW1vdmVMaXN0ZW5lcihcInVwZ3JhZGVFcnJvclwiLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICAgICAgY2xvc2UoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3YWl0Rm9yVXBncmFkZSgpIHtcbiAgICAgIC8vIHdhaXQgZm9yIHVwZ3JhZGUgdG8gZmluaXNoIHNpbmNlIHdlIGNhbid0IHNlbmQgcGFja2V0cyB3aGlsZSBwYXVzaW5nIGEgdHJhbnNwb3J0XG4gICAgICBzZWxmLm9uY2UoXCJ1cGdyYWRlXCIsIGNsZWFudXBBbmRDbG9zZSk7XG4gICAgICBzZWxmLm9uY2UoXCJ1cGdyYWRlRXJyb3JcIiwgY2xlYW51cEFuZENsb3NlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgdXBvbiB0cmFuc3BvcnQgZXJyb3JcbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuICBvbkVycm9yKGVycikge1xuICAgIGRlYnVnKFwic29ja2V0IGVycm9yICVqXCIsIGVycik7XG4gICAgU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdChcImVycm9yXCIsIGVycik7XG4gICAgdGhpcy5vbkNsb3NlKFwidHJhbnNwb3J0IGVycm9yXCIsIGVycik7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIHVwb24gdHJhbnNwb3J0IGNsb3NlLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG4gIG9uQ2xvc2UocmVhc29uLCBkZXNjKSB7XG4gICAgaWYgKFxuICAgICAgXCJvcGVuaW5nXCIgPT09IHRoaXMucmVhZHlTdGF0ZSB8fFxuICAgICAgXCJvcGVuXCIgPT09IHRoaXMucmVhZHlTdGF0ZSB8fFxuICAgICAgXCJjbG9zaW5nXCIgPT09IHRoaXMucmVhZHlTdGF0ZVxuICAgICkge1xuICAgICAgZGVidWcoJ3NvY2tldCBjbG9zZSB3aXRoIHJlYXNvbjogXCIlc1wiJywgcmVhc29uKTtcbiAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAvLyBjbGVhciB0aW1lcnNcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnBpbmdJbnRlcnZhbFRpbWVyKTtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnBpbmdUaW1lb3V0VGltZXIpO1xuXG4gICAgICAvLyBzdG9wIGV2ZW50IGZyb20gZmlyaW5nIGFnYWluIGZvciB0cmFuc3BvcnRcbiAgICAgIHRoaXMudHJhbnNwb3J0LnJlbW92ZUFsbExpc3RlbmVycyhcImNsb3NlXCIpO1xuXG4gICAgICAvLyBlbnN1cmUgdHJhbnNwb3J0IHdvbid0IHN0YXkgb3BlblxuICAgICAgdGhpcy50cmFuc3BvcnQuY2xvc2UoKTtcblxuICAgICAgLy8gaWdub3JlIGZ1cnRoZXIgdHJhbnNwb3J0IGNvbW11bmljYXRpb25cbiAgICAgIHRoaXMudHJhbnNwb3J0LnJlbW92ZUFsbExpc3RlbmVycygpO1xuXG4gICAgICAvLyBzZXQgcmVhZHkgc3RhdGVcbiAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFwiY2xvc2VkXCI7XG5cbiAgICAgIC8vIGNsZWFyIHNlc3Npb24gaWRcbiAgICAgIHRoaXMuaWQgPSBudWxsO1xuXG4gICAgICAvLyBlbWl0IGNsb3NlIGV2ZW50XG4gICAgICB0aGlzLmVtaXQoXCJjbG9zZVwiLCByZWFzb24sIGRlc2MpO1xuXG4gICAgICAvLyBjbGVhbiBidWZmZXJzIGFmdGVyLCBzbyB1c2VycyBjYW4gc3RpbGxcbiAgICAgIC8vIGdyYWIgdGhlIGJ1ZmZlcnMgb24gYGNsb3NlYCBldmVudFxuICAgICAgc2VsZi53cml0ZUJ1ZmZlciA9IFtdO1xuICAgICAgc2VsZi5wcmV2QnVmZmVyTGVuID0gMDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRmlsdGVycyB1cGdyYWRlcywgcmV0dXJuaW5nIG9ubHkgdGhvc2UgbWF0Y2hpbmcgY2xpZW50IHRyYW5zcG9ydHMuXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IHNlcnZlciB1cGdyYWRlc1xuICAgKiBAYXBpIHByaXZhdGVcbiAgICpcbiAgICovXG4gIGZpbHRlclVwZ3JhZGVzKHVwZ3JhZGVzKSB7XG4gICAgY29uc3QgZmlsdGVyZWRVcGdyYWRlcyA9IFtdO1xuICAgIGxldCBpID0gMDtcbiAgICBjb25zdCBqID0gdXBncmFkZXMubGVuZ3RoO1xuICAgIGZvciAoOyBpIDwgajsgaSsrKSB7XG4gICAgICBpZiAofnRoaXMudHJhbnNwb3J0cy5pbmRleE9mKHVwZ3JhZGVzW2ldKSlcbiAgICAgICAgZmlsdGVyZWRVcGdyYWRlcy5wdXNoKHVwZ3JhZGVzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGZpbHRlcmVkVXBncmFkZXM7XG4gIH1cbn1cblxuU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9IGZhbHNlO1xuXG4vKipcbiAqIFByb3RvY29sIHZlcnNpb24uXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5Tb2NrZXQucHJvdG9jb2wgPSBwYXJzZXIucHJvdG9jb2w7IC8vIHRoaXMgaXMgYW4gaW50XG5cbmZ1bmN0aW9uIGNsb25lKG9iaikge1xuICBjb25zdCBvID0ge307XG4gIGZvciAobGV0IGkgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgb1tpXSA9IG9ialtpXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG87XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU29ja2V0O1xuIiwiY29uc3QgcGFyc2VyID0gcmVxdWlyZShcImVuZ2luZS5pby1wYXJzZXJcIik7XG5jb25zdCBFbWl0dGVyID0gcmVxdWlyZShcImNvbXBvbmVudC1lbWl0dGVyXCIpO1xuXG5jbGFzcyBUcmFuc3BvcnQgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgLyoqXG4gICAqIFRyYW5zcG9ydCBhYnN0cmFjdCBjb25zdHJ1Y3Rvci5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3Iob3B0cykge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLm9wdHMgPSBvcHRzO1xuICAgIHRoaXMucXVlcnkgPSBvcHRzLnF1ZXJ5O1xuICAgIHRoaXMucmVhZHlTdGF0ZSA9IFwiXCI7XG4gICAgdGhpcy5zb2NrZXQgPSBvcHRzLnNvY2tldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBlcnJvci5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICAgKiBAcmV0dXJuIHtUcmFuc3BvcnR9IGZvciBjaGFpbmluZ1xuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cbiAgb25FcnJvcihtc2csIGRlc2MpIHtcbiAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IobXNnKTtcbiAgICBlcnIudHlwZSA9IFwiVHJhbnNwb3J0RXJyb3JcIjtcbiAgICBlcnIuZGVzY3JpcHRpb24gPSBkZXNjO1xuICAgIHRoaXMuZW1pdChcImVycm9yXCIsIGVycik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgdGhlIHRyYW5zcG9ydC5cbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG4gIG9wZW4oKSB7XG4gICAgaWYgKFwiY2xvc2VkXCIgPT09IHRoaXMucmVhZHlTdGF0ZSB8fCBcIlwiID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFwib3BlbmluZ1wiO1xuICAgICAgdGhpcy5kb09wZW4oKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIHRyYW5zcG9ydC5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuICBjbG9zZSgpIHtcbiAgICBpZiAoXCJvcGVuaW5nXCIgPT09IHRoaXMucmVhZHlTdGF0ZSB8fCBcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICB0aGlzLmRvQ2xvc2UoKTtcbiAgICAgIHRoaXMub25DbG9zZSgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbmRzIG11bHRpcGxlIHBhY2tldHMuXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IHBhY2tldHNcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuICBzZW5kKHBhY2tldHMpIHtcbiAgICBpZiAoXCJvcGVuXCIgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgdGhpcy53cml0ZShwYWNrZXRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVHJhbnNwb3J0IG5vdCBvcGVuXCIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgdXBvbiBvcGVuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cbiAgb25PcGVuKCkge1xuICAgIHRoaXMucmVhZHlTdGF0ZSA9IFwib3BlblwiO1xuICAgIHRoaXMud3JpdGFibGUgPSB0cnVlO1xuICAgIHRoaXMuZW1pdChcIm9wZW5cIik7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIHdpdGggZGF0YS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGFcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuICBvbkRhdGEoZGF0YSkge1xuICAgIGNvbnN0IHBhY2tldCA9IHBhcnNlci5kZWNvZGVQYWNrZXQoZGF0YSwgdGhpcy5zb2NrZXQuYmluYXJ5VHlwZSk7XG4gICAgdGhpcy5vblBhY2tldChwYWNrZXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aXRoIGEgZGVjb2RlZCBwYWNrZXQuXG4gICAqL1xuICBvblBhY2tldChwYWNrZXQpIHtcbiAgICB0aGlzLmVtaXQoXCJwYWNrZXRcIiwgcGFja2V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgdXBvbiBjbG9zZS5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuICBvbkNsb3NlKCkge1xuICAgIHRoaXMucmVhZHlTdGF0ZSA9IFwiY2xvc2VkXCI7XG4gICAgdGhpcy5lbWl0KFwiY2xvc2VcIik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUcmFuc3BvcnQ7XG4iLCJjb25zdCBYTUxIdHRwUmVxdWVzdCA9IHJlcXVpcmUoXCJ4bWxodHRwcmVxdWVzdC1zc2xcIik7XG5jb25zdCBYSFIgPSByZXF1aXJlKFwiLi9wb2xsaW5nLXhoclwiKTtcbmNvbnN0IEpTT05QID0gcmVxdWlyZShcIi4vcG9sbGluZy1qc29ucFwiKTtcbmNvbnN0IHdlYnNvY2tldCA9IHJlcXVpcmUoXCIuL3dlYnNvY2tldFwiKTtcblxuZXhwb3J0cy5wb2xsaW5nID0gcG9sbGluZztcbmV4cG9ydHMud2Vic29ja2V0ID0gd2Vic29ja2V0O1xuXG4vKipcbiAqIFBvbGxpbmcgdHJhbnNwb3J0IHBvbHltb3JwaGljIGNvbnN0cnVjdG9yLlxuICogRGVjaWRlcyBvbiB4aHIgdnMganNvbnAgYmFzZWQgb24gZmVhdHVyZSBkZXRlY3Rpb24uXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcG9sbGluZyhvcHRzKSB7XG4gIGxldCB4aHI7XG4gIGxldCB4ZCA9IGZhbHNlO1xuICBsZXQgeHMgPSBmYWxzZTtcbiAgY29uc3QganNvbnAgPSBmYWxzZSAhPT0gb3B0cy5qc29ucDtcblxuICBpZiAodHlwZW9mIGxvY2F0aW9uICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY29uc3QgaXNTU0wgPSBcImh0dHBzOlwiID09PSBsb2NhdGlvbi5wcm90b2NvbDtcbiAgICBsZXQgcG9ydCA9IGxvY2F0aW9uLnBvcnQ7XG5cbiAgICAvLyBzb21lIHVzZXIgYWdlbnRzIGhhdmUgZW1wdHkgYGxvY2F0aW9uLnBvcnRgXG4gICAgaWYgKCFwb3J0KSB7XG4gICAgICBwb3J0ID0gaXNTU0wgPyA0NDMgOiA4MDtcbiAgICB9XG5cbiAgICB4ZCA9IG9wdHMuaG9zdG5hbWUgIT09IGxvY2F0aW9uLmhvc3RuYW1lIHx8IHBvcnQgIT09IG9wdHMucG9ydDtcbiAgICB4cyA9IG9wdHMuc2VjdXJlICE9PSBpc1NTTDtcbiAgfVxuXG4gIG9wdHMueGRvbWFpbiA9IHhkO1xuICBvcHRzLnhzY2hlbWUgPSB4cztcbiAgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KG9wdHMpO1xuXG4gIGlmIChcIm9wZW5cIiBpbiB4aHIgJiYgIW9wdHMuZm9yY2VKU09OUCkge1xuICAgIHJldHVybiBuZXcgWEhSKG9wdHMpO1xuICB9IGVsc2Uge1xuICAgIGlmICghanNvbnApIHRocm93IG5ldyBFcnJvcihcIkpTT05QIGRpc2FibGVkXCIpO1xuICAgIHJldHVybiBuZXcgSlNPTlAob3B0cyk7XG4gIH1cbn1cbiIsImNvbnN0IFBvbGxpbmcgPSByZXF1aXJlKFwiLi9wb2xsaW5nXCIpO1xuY29uc3QgZ2xvYmFsVGhpcyA9IHJlcXVpcmUoXCIuLi9nbG9iYWxUaGlzXCIpO1xuXG5jb25zdCByTmV3bGluZSA9IC9cXG4vZztcbmNvbnN0IHJFc2NhcGVkTmV3bGluZSA9IC9cXFxcbi9nO1xuXG4vKipcbiAqIEdsb2JhbCBKU09OUCBjYWxsYmFja3MuXG4gKi9cblxubGV0IGNhbGxiYWNrcztcblxuY2xhc3MgSlNPTlBQb2xsaW5nIGV4dGVuZHMgUG9sbGluZyB7XG4gIC8qKlxuICAgKiBKU09OUCBQb2xsaW5nIGNvbnN0cnVjdG9yLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cy5cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG4gIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICBzdXBlcihvcHRzKTtcblxuICAgIHRoaXMucXVlcnkgPSB0aGlzLnF1ZXJ5IHx8IHt9O1xuXG4gICAgLy8gZGVmaW5lIGdsb2JhbCBjYWxsYmFja3MgYXJyYXkgaWYgbm90IHByZXNlbnRcbiAgICAvLyB3ZSBkbyB0aGlzIGhlcmUgKGxhemlseSkgdG8gYXZvaWQgdW5uZWVkZWQgZ2xvYmFsIHBvbGx1dGlvblxuICAgIGlmICghY2FsbGJhY2tzKSB7XG4gICAgICAvLyB3ZSBuZWVkIHRvIGNvbnNpZGVyIG11bHRpcGxlIGVuZ2luZXMgaW4gdGhlIHNhbWUgcGFnZVxuICAgICAgY2FsbGJhY2tzID0gZ2xvYmFsVGhpcy5fX19laW8gPSBnbG9iYWxUaGlzLl9fX2VpbyB8fCBbXTtcbiAgICB9XG5cbiAgICAvLyBjYWxsYmFjayBpZGVudGlmaWVyXG4gICAgdGhpcy5pbmRleCA9IGNhbGxiYWNrcy5sZW5ndGg7XG5cbiAgICAvLyBhZGQgY2FsbGJhY2sgdG8ganNvbnAgZ2xvYmFsXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgY2FsbGJhY2tzLnB1c2goZnVuY3Rpb24obXNnKSB7XG4gICAgICBzZWxmLm9uRGF0YShtc2cpO1xuICAgIH0pO1xuXG4gICAgLy8gYXBwZW5kIHRvIHF1ZXJ5IHN0cmluZ1xuICAgIHRoaXMucXVlcnkuaiA9IHRoaXMuaW5kZXg7XG4gIH1cblxuICAvKipcbiAgICogSlNPTlAgb25seSBzdXBwb3J0cyBiaW5hcnkgYXMgYmFzZTY0IGVuY29kZWQgc3RyaW5nc1xuICAgKi9cbiAgZ2V0IHN1cHBvcnRzQmluYXJ5KCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIHNvY2tldC5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuICBkb0Nsb3NlKCkge1xuICAgIGlmICh0aGlzLnNjcmlwdCkge1xuICAgICAgLy8gcHJldmVudCBzcHVyaW91cyBlcnJvcnMgZnJvbSBiZWluZyBlbWl0dGVkIHdoZW4gdGhlIHdpbmRvdyBpcyB1bmxvYWRlZFxuICAgICAgdGhpcy5zY3JpcHQub25lcnJvciA9ICgpID0+IHt9O1xuICAgICAgdGhpcy5zY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnNjcmlwdCk7XG4gICAgICB0aGlzLnNjcmlwdCA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZm9ybSkge1xuICAgICAgdGhpcy5mb3JtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5mb3JtKTtcbiAgICAgIHRoaXMuZm9ybSA9IG51bGw7XG4gICAgICB0aGlzLmlmcmFtZSA9IG51bGw7XG4gICAgfVxuXG4gICAgc3VwZXIuZG9DbG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBhIHBvbGwgY3ljbGUuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cbiAgZG9Qb2xsKCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG5cbiAgICBpZiAodGhpcy5zY3JpcHQpIHtcbiAgICAgIHRoaXMuc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5zY3JpcHQpO1xuICAgICAgdGhpcy5zY3JpcHQgPSBudWxsO1xuICAgIH1cblxuICAgIHNjcmlwdC5hc3luYyA9IHRydWU7XG4gICAgc2NyaXB0LnNyYyA9IHRoaXMudXJpKCk7XG4gICAgc2NyaXB0Lm9uZXJyb3IgPSBmdW5jdGlvbihlKSB7XG4gICAgICBzZWxmLm9uRXJyb3IoXCJqc29ucCBwb2xsIGVycm9yXCIsIGUpO1xuICAgIH07XG5cbiAgICBjb25zdCBpbnNlcnRBdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpWzBdO1xuICAgIGlmIChpbnNlcnRBdCkge1xuICAgICAgaW5zZXJ0QXQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc2NyaXB0LCBpbnNlcnRBdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIChkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmJvZHkpLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgfVxuICAgIHRoaXMuc2NyaXB0ID0gc2NyaXB0O1xuXG4gICAgY29uc3QgaXNVQWdlY2tvID1cbiAgICAgIFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBuYXZpZ2F0b3IgJiYgL2dlY2tvL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuICAgIGlmIChpc1VBZ2Vja28pIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIik7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICAgICAgfSwgMTAwKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogV3JpdGVzIHdpdGggYSBoaWRkZW4gaWZyYW1lLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YSB0byBzZW5kXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxlZCB1cG9uIGZsdXNoLlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG4gIGRvV3JpdGUoZGF0YSwgZm4pIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBsZXQgaWZyYW1lO1xuXG4gICAgaWYgKCF0aGlzLmZvcm0pIHtcbiAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcbiAgICAgIGNvbnN0IGFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIik7XG4gICAgICBjb25zdCBpZCA9ICh0aGlzLmlmcmFtZUlkID0gXCJlaW9faWZyYW1lX1wiICsgdGhpcy5pbmRleCk7XG5cbiAgICAgIGZvcm0uY2xhc3NOYW1lID0gXCJzb2NrZXRpb1wiO1xuICAgICAgZm9ybS5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICAgIGZvcm0uc3R5bGUudG9wID0gXCItMTAwMHB4XCI7XG4gICAgICBmb3JtLnN0eWxlLmxlZnQgPSBcIi0xMDAwcHhcIjtcbiAgICAgIGZvcm0udGFyZ2V0ID0gaWQ7XG4gICAgICBmb3JtLm1ldGhvZCA9IFwiUE9TVFwiO1xuICAgICAgZm9ybS5zZXRBdHRyaWJ1dGUoXCJhY2NlcHQtY2hhcnNldFwiLCBcInV0Zi04XCIpO1xuICAgICAgYXJlYS5uYW1lID0gXCJkXCI7XG4gICAgICBmb3JtLmFwcGVuZENoaWxkKGFyZWEpO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmb3JtKTtcblxuICAgICAgdGhpcy5mb3JtID0gZm9ybTtcbiAgICAgIHRoaXMuYXJlYSA9IGFyZWE7XG4gICAgfVxuXG4gICAgdGhpcy5mb3JtLmFjdGlvbiA9IHRoaXMudXJpKCk7XG5cbiAgICBmdW5jdGlvbiBjb21wbGV0ZSgpIHtcbiAgICAgIGluaXRJZnJhbWUoKTtcbiAgICAgIGZuKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdElmcmFtZSgpIHtcbiAgICAgIGlmIChzZWxmLmlmcmFtZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHNlbGYuZm9ybS5yZW1vdmVDaGlsZChzZWxmLmlmcmFtZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBzZWxmLm9uRXJyb3IoXCJqc29ucCBwb2xsaW5nIGlmcmFtZSByZW1vdmFsIGVycm9yXCIsIGUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIGllNiBkeW5hbWljIGlmcmFtZXMgd2l0aCB0YXJnZXQ9XCJcIiBzdXBwb3J0ICh0aGFua3MgQ2hyaXMgTGFtYmFjaGVyKVxuICAgICAgICBjb25zdCBodG1sID0gJzxpZnJhbWUgc3JjPVwiamF2YXNjcmlwdDowXCIgbmFtZT1cIicgKyBzZWxmLmlmcmFtZUlkICsgJ1wiPic7XG4gICAgICAgIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaHRtbCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIik7XG4gICAgICAgIGlmcmFtZS5uYW1lID0gc2VsZi5pZnJhbWVJZDtcbiAgICAgICAgaWZyYW1lLnNyYyA9IFwiamF2YXNjcmlwdDowXCI7XG4gICAgICB9XG5cbiAgICAgIGlmcmFtZS5pZCA9IHNlbGYuaWZyYW1lSWQ7XG5cbiAgICAgIHNlbGYuZm9ybS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAgICAgc2VsZi5pZnJhbWUgPSBpZnJhbWU7XG4gICAgfVxuXG4gICAgaW5pdElmcmFtZSgpO1xuXG4gICAgLy8gZXNjYXBlIFxcbiB0byBwcmV2ZW50IGl0IGZyb20gYmVpbmcgY29udmVydGVkIGludG8gXFxyXFxuIGJ5IHNvbWUgVUFzXG4gICAgLy8gZG91YmxlIGVzY2FwaW5nIGlzIHJlcXVpcmVkIGZvciBlc2NhcGVkIG5ldyBsaW5lcyBiZWNhdXNlIHVuZXNjYXBpbmcgb2YgbmV3IGxpbmVzIGNhbiBiZSBkb25lIHNhZmVseSBvbiBzZXJ2ZXItc2lkZVxuICAgIGRhdGEgPSBkYXRhLnJlcGxhY2UockVzY2FwZWROZXdsaW5lLCBcIlxcXFxcXG5cIik7XG4gICAgdGhpcy5hcmVhLnZhbHVlID0gZGF0YS5yZXBsYWNlKHJOZXdsaW5lLCBcIlxcXFxuXCIpO1xuXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuZm9ybS5zdWJtaXQoKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgaWYgKHRoaXMuaWZyYW1lLmF0dGFjaEV2ZW50KSB7XG4gICAgICB0aGlzLmlmcmFtZS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHNlbGYuaWZyYW1lLnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIikge1xuICAgICAgICAgIGNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaWZyYW1lLm9ubG9hZCA9IGNvbXBsZXRlO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEpTT05QUG9sbGluZztcbiIsIi8qIGdsb2JhbCBhdHRhY2hFdmVudCAqL1xuXG5jb25zdCBYTUxIdHRwUmVxdWVzdCA9IHJlcXVpcmUoXCJ4bWxodHRwcmVxdWVzdC1zc2xcIik7XG5jb25zdCBQb2xsaW5nID0gcmVxdWlyZShcIi4vcG9sbGluZ1wiKTtcbmNvbnN0IEVtaXR0ZXIgPSByZXF1aXJlKFwiY29tcG9uZW50LWVtaXR0ZXJcIik7XG5jb25zdCB7IHBpY2sgfSA9IHJlcXVpcmUoXCIuLi91dGlsXCIpO1xuY29uc3QgZ2xvYmFsVGhpcyA9IHJlcXVpcmUoXCIuLi9nbG9iYWxUaGlzXCIpO1xuXG5jb25zdCBkZWJ1ZyA9IHJlcXVpcmUoXCJkZWJ1Z1wiKShcImVuZ2luZS5pby1jbGllbnQ6cG9sbGluZy14aHJcIik7XG5cbi8qKlxuICogRW1wdHkgZnVuY3Rpb25cbiAqL1xuXG5mdW5jdGlvbiBlbXB0eSgpIHt9XG5cbmNvbnN0IGhhc1hIUjIgPSAoZnVuY3Rpb24oKSB7XG4gIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCh7IHhkb21haW46IGZhbHNlIH0pO1xuICByZXR1cm4gbnVsbCAhPSB4aHIucmVzcG9uc2VUeXBlO1xufSkoKTtcblxuY2xhc3MgWEhSIGV4dGVuZHMgUG9sbGluZyB7XG4gIC8qKlxuICAgKiBYSFIgUG9sbGluZyBjb25zdHJ1Y3Rvci5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG4gIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICBzdXBlcihvcHRzKTtcblxuICAgIGlmICh0eXBlb2YgbG9jYXRpb24gIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIGNvbnN0IGlzU1NMID0gXCJodHRwczpcIiA9PT0gbG9jYXRpb24ucHJvdG9jb2w7XG4gICAgICBsZXQgcG9ydCA9IGxvY2F0aW9uLnBvcnQ7XG5cbiAgICAgIC8vIHNvbWUgdXNlciBhZ2VudHMgaGF2ZSBlbXB0eSBgbG9jYXRpb24ucG9ydGBcbiAgICAgIGlmICghcG9ydCkge1xuICAgICAgICBwb3J0ID0gaXNTU0wgPyA0NDMgOiA4MDtcbiAgICAgIH1cblxuICAgICAgdGhpcy54ZCA9XG4gICAgICAgICh0eXBlb2YgbG9jYXRpb24gIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgICBvcHRzLmhvc3RuYW1lICE9PSBsb2NhdGlvbi5ob3N0bmFtZSkgfHxcbiAgICAgICAgcG9ydCAhPT0gb3B0cy5wb3J0O1xuICAgICAgdGhpcy54cyA9IG9wdHMuc2VjdXJlICE9PSBpc1NTTDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogWEhSIHN1cHBvcnRzIGJpbmFyeVxuICAgICAqL1xuICAgIGNvbnN0IGZvcmNlQmFzZTY0ID0gb3B0cyAmJiBvcHRzLmZvcmNlQmFzZTY0O1xuICAgIHRoaXMuc3VwcG9ydHNCaW5hcnkgPSBoYXNYSFIyICYmICFmb3JjZUJhc2U2NDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgcmVxdWVzdC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZFxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG4gIHJlcXVlc3Qob3B0cyA9IHt9KSB7XG4gICAgT2JqZWN0LmFzc2lnbihvcHRzLCB7IHhkOiB0aGlzLnhkLCB4czogdGhpcy54cyB9LCB0aGlzLm9wdHMpO1xuICAgIHJldHVybiBuZXcgUmVxdWVzdCh0aGlzLnVyaSgpLCBvcHRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBkYXRhLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YSB0byBzZW5kLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsZWQgdXBvbiBmbHVzaC5cbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuICBkb1dyaXRlKGRhdGEsIGZuKSB7XG4gICAgY29uc3QgcmVxID0gdGhpcy5yZXF1ZXN0KHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSk7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgcmVxLm9uKFwic3VjY2Vzc1wiLCBmbik7XG4gICAgcmVxLm9uKFwiZXJyb3JcIiwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICBzZWxmLm9uRXJyb3IoXCJ4aHIgcG9zdCBlcnJvclwiLCBlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBhIHBvbGwgY3ljbGUuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cbiAgZG9Qb2xsKCkge1xuICAgIGRlYnVnKFwieGhyIHBvbGxcIik7XG4gICAgY29uc3QgcmVxID0gdGhpcy5yZXF1ZXN0KCk7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgcmVxLm9uKFwiZGF0YVwiLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICBzZWxmLm9uRGF0YShkYXRhKTtcbiAgICB9KTtcbiAgICByZXEub24oXCJlcnJvclwiLCBmdW5jdGlvbihlcnIpIHtcbiAgICAgIHNlbGYub25FcnJvcihcInhociBwb2xsIGVycm9yXCIsIGVycik7XG4gICAgfSk7XG4gICAgdGhpcy5wb2xsWGhyID0gcmVxO1xuICB9XG59XG5cbmNsYXNzIFJlcXVlc3QgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgLyoqXG4gICAqIFJlcXVlc3QgY29uc3RydWN0b3JcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHVyaSwgb3B0cykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5vcHRzID0gb3B0cztcblxuICAgIHRoaXMubWV0aG9kID0gb3B0cy5tZXRob2QgfHwgXCJHRVRcIjtcbiAgICB0aGlzLnVyaSA9IHVyaTtcbiAgICB0aGlzLmFzeW5jID0gZmFsc2UgIT09IG9wdHMuYXN5bmM7XG4gICAgdGhpcy5kYXRhID0gdW5kZWZpbmVkICE9PSBvcHRzLmRhdGEgPyBvcHRzLmRhdGEgOiBudWxsO1xuXG4gICAgdGhpcy5jcmVhdGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBYSFIgb2JqZWN0IGFuZCBzZW5kcyB0aGUgcmVxdWVzdC5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuICBjcmVhdGUoKSB7XG4gICAgY29uc3Qgb3B0cyA9IHBpY2soXG4gICAgICB0aGlzLm9wdHMsXG4gICAgICBcImFnZW50XCIsXG4gICAgICBcImVuYWJsZXNYRFJcIixcbiAgICAgIFwicGZ4XCIsXG4gICAgICBcImtleVwiLFxuICAgICAgXCJwYXNzcGhyYXNlXCIsXG4gICAgICBcImNlcnRcIixcbiAgICAgIFwiY2FcIixcbiAgICAgIFwiY2lwaGVyc1wiLFxuICAgICAgXCJyZWplY3RVbmF1dGhvcml6ZWRcIlxuICAgICk7XG4gICAgb3B0cy54ZG9tYWluID0gISF0aGlzLm9wdHMueGQ7XG4gICAgb3B0cy54c2NoZW1lID0gISF0aGlzLm9wdHMueHM7XG5cbiAgICBjb25zdCB4aHIgPSAodGhpcy54aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3Qob3B0cykpO1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgdHJ5IHtcbiAgICAgIGRlYnVnKFwieGhyIG9wZW4gJXM6ICVzXCIsIHRoaXMubWV0aG9kLCB0aGlzLnVyaSk7XG4gICAgICB4aHIub3Blbih0aGlzLm1ldGhvZCwgdGhpcy51cmksIHRoaXMuYXN5bmMpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHRoaXMub3B0cy5leHRyYUhlYWRlcnMpIHtcbiAgICAgICAgICB4aHIuc2V0RGlzYWJsZUhlYWRlckNoZWNrICYmIHhoci5zZXREaXNhYmxlSGVhZGVyQ2hlY2sodHJ1ZSk7XG4gICAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLm9wdHMuZXh0cmFIZWFkZXJzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLmV4dHJhSGVhZGVycy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihpLCB0aGlzLm9wdHMuZXh0cmFIZWFkZXJzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgIGlmIChcIlBPU1RcIiA9PT0gdGhpcy5tZXRob2QpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtdHlwZVwiLCBcInRleHQvcGxhaW47Y2hhcnNldD1VVEYtOFwiKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJBY2NlcHRcIiwgXCIqLypcIik7XG4gICAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgICAvLyBpZTYgY2hlY2tcbiAgICAgIGlmIChcIndpdGhDcmVkZW50aWFsc1wiIGluIHhocikge1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdGhpcy5vcHRzLndpdGhDcmVkZW50aWFscztcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMub3B0cy5yZXF1ZXN0VGltZW91dCkge1xuICAgICAgICB4aHIudGltZW91dCA9IHRoaXMub3B0cy5yZXF1ZXN0VGltZW91dDtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaGFzWERSKCkpIHtcbiAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNlbGYub25Mb2FkKCk7XG4gICAgICAgIH07XG4gICAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2VsZi5vbkVycm9yKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICg0ICE9PSB4aHIucmVhZHlTdGF0ZSkgcmV0dXJuO1xuICAgICAgICAgIGlmICgyMDAgPT09IHhoci5zdGF0dXMgfHwgMTIyMyA9PT0geGhyLnN0YXR1cykge1xuICAgICAgICAgICAgc2VsZi5vbkxvYWQoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHRoZSBgZXJyb3JgIGV2ZW50IGhhbmRsZXIgdGhhdCdzIHVzZXItc2V0XG4gICAgICAgICAgICAvLyBkb2VzIG5vdCB0aHJvdyBpbiB0aGUgc2FtZSB0aWNrIGFuZCBnZXRzIGNhdWdodCBoZXJlXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBzZWxmLm9uRXJyb3IodHlwZW9mIHhoci5zdGF0dXMgPT09IFwibnVtYmVyXCIgPyB4aHIuc3RhdHVzIDogMCk7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGRlYnVnKFwieGhyIGRhdGEgJXNcIiwgdGhpcy5kYXRhKTtcbiAgICAgIHhoci5zZW5kKHRoaXMuZGF0YSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gTmVlZCB0byBkZWZlciBzaW5jZSAuY3JlYXRlKCkgaXMgY2FsbGVkIGRpcmVjdGx5IGZyb20gdGhlIGNvbnN0cnVjdG9yXG4gICAgICAvLyBhbmQgdGh1cyB0aGUgJ2Vycm9yJyBldmVudCBjYW4gb25seSBiZSBvbmx5IGJvdW5kICphZnRlciogdGhpcyBleGNlcHRpb25cbiAgICAgIC8vIG9jY3Vycy4gIFRoZXJlZm9yZSwgYWxzbywgd2UgY2Fubm90IHRocm93IGhlcmUgYXQgYWxsLlxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgc2VsZi5vbkVycm9yKGUpO1xuICAgICAgfSwgMCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5pbmRleCA9IFJlcXVlc3QucmVxdWVzdHNDb3VudCsrO1xuICAgICAgUmVxdWVzdC5yZXF1ZXN0c1t0aGlzLmluZGV4XSA9IHRoaXM7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB1cG9uIHN1Y2Nlc3NmdWwgcmVzcG9uc2UuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cbiAgb25TdWNjZXNzKCkge1xuICAgIHRoaXMuZW1pdChcInN1Y2Nlc3NcIik7XG4gICAgdGhpcy5jbGVhbnVwKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIGlmIHdlIGhhdmUgZGF0YS5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuICBvbkRhdGEoZGF0YSkge1xuICAgIHRoaXMuZW1pdChcImRhdGFcIiwgZGF0YSk7XG4gICAgdGhpcy5vblN1Y2Nlc3MoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgdXBvbiBlcnJvci5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuICBvbkVycm9yKGVycikge1xuICAgIHRoaXMuZW1pdChcImVycm9yXCIsIGVycik7XG4gICAgdGhpcy5jbGVhbnVwKHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFucyB1cCBob3VzZS5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuICBjbGVhbnVwKGZyb21FcnJvcikge1xuICAgIGlmIChcInVuZGVmaW5lZFwiID09PSB0eXBlb2YgdGhpcy54aHIgfHwgbnVsbCA9PT0gdGhpcy54aHIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8geG1saHR0cHJlcXVlc3RcbiAgICBpZiAodGhpcy5oYXNYRFIoKSkge1xuICAgICAgdGhpcy54aHIub25sb2FkID0gdGhpcy54aHIub25lcnJvciA9IGVtcHR5O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBlbXB0eTtcbiAgICB9XG5cbiAgICBpZiAoZnJvbUVycm9yKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLnhoci5hYm9ydCgpO1xuICAgICAgfSBjYXRjaCAoZSkge31cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBkZWxldGUgUmVxdWVzdC5yZXF1ZXN0c1t0aGlzLmluZGV4XTtcbiAgICB9XG5cbiAgICB0aGlzLnhociA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIHVwb24gbG9hZC5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuICBvbkxvYWQoKSB7XG4gICAgY29uc3QgZGF0YSA9IHRoaXMueGhyLnJlc3BvbnNlVGV4dDtcbiAgICBpZiAoZGF0YSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5vbkRhdGEoZGF0YSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGl0IGhhcyBYRG9tYWluUmVxdWVzdC5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuICBoYXNYRFIoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBYRG9tYWluUmVxdWVzdCAhPT0gXCJ1bmRlZmluZWRcIiAmJiAhdGhpcy54cyAmJiB0aGlzLmVuYWJsZXNYRFI7XG4gIH1cblxuICAvKipcbiAgICogQWJvcnRzIHRoZSByZXF1ZXN0LlxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cbiAgYWJvcnQoKSB7XG4gICAgdGhpcy5jbGVhbnVwKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBYm9ydHMgcGVuZGluZyByZXF1ZXN0cyB3aGVuIHVubG9hZGluZyB0aGUgd2luZG93LiBUaGlzIGlzIG5lZWRlZCB0byBwcmV2ZW50XG4gKiBtZW1vcnkgbGVha3MgKGUuZy4gd2hlbiB1c2luZyBJRSkgYW5kIHRvIGVuc3VyZSB0aGF0IG5vIHNwdXJpb3VzIGVycm9yIGlzXG4gKiBlbWl0dGVkLlxuICovXG5cblJlcXVlc3QucmVxdWVzdHNDb3VudCA9IDA7XG5SZXF1ZXN0LnJlcXVlc3RzID0ge307XG5cbmlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgaWYgKHR5cGVvZiBhdHRhY2hFdmVudCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgYXR0YWNoRXZlbnQoXCJvbnVubG9hZFwiLCB1bmxvYWRIYW5kbGVyKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgYWRkRXZlbnRMaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgY29uc3QgdGVybWluYXRpb25FdmVudCA9IFwib25wYWdlaGlkZVwiIGluIGdsb2JhbFRoaXMgPyBcInBhZ2VoaWRlXCIgOiBcInVubG9hZFwiO1xuICAgIGFkZEV2ZW50TGlzdGVuZXIodGVybWluYXRpb25FdmVudCwgdW5sb2FkSGFuZGxlciwgZmFsc2UpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVubG9hZEhhbmRsZXIoKSB7XG4gIGZvciAobGV0IGkgaW4gUmVxdWVzdC5yZXF1ZXN0cykge1xuICAgIGlmIChSZXF1ZXN0LnJlcXVlc3RzLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICBSZXF1ZXN0LnJlcXVlc3RzW2ldLmFib3J0KCk7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gWEhSO1xubW9kdWxlLmV4cG9ydHMuUmVxdWVzdCA9IFJlcXVlc3Q7XG4iLCJjb25zdCBUcmFuc3BvcnQgPSByZXF1aXJlKFwiLi4vdHJhbnNwb3J0XCIpO1xuY29uc3QgcGFyc2VxcyA9IHJlcXVpcmUoXCJwYXJzZXFzXCIpO1xuY29uc3QgcGFyc2VyID0gcmVxdWlyZShcImVuZ2luZS5pby1wYXJzZXJcIik7XG5jb25zdCB5ZWFzdCA9IHJlcXVpcmUoXCJ5ZWFzdFwiKTtcblxuY29uc3QgZGVidWcgPSByZXF1aXJlKFwiZGVidWdcIikoXCJlbmdpbmUuaW8tY2xpZW50OnBvbGxpbmdcIik7XG5cbmNsYXNzIFBvbGxpbmcgZXh0ZW5kcyBUcmFuc3BvcnQge1xuICAvKipcbiAgICogVHJhbnNwb3J0IG5hbWUuXG4gICAqL1xuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gXCJwb2xsaW5nXCI7XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgdGhlIHNvY2tldCAodHJpZ2dlcnMgcG9sbGluZykuIFdlIHdyaXRlIGEgUElORyBtZXNzYWdlIHRvIGRldGVybWluZVxuICAgKiB3aGVuIHRoZSB0cmFuc3BvcnQgaXMgb3Blbi5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuICBkb09wZW4oKSB7XG4gICAgdGhpcy5wb2xsKCk7XG4gIH1cblxuICAvKipcbiAgICogUGF1c2VzIHBvbGxpbmcuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIHVwb24gYnVmZmVycyBhcmUgZmx1c2hlZCBhbmQgdHJhbnNwb3J0IGlzIHBhdXNlZFxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG4gIHBhdXNlKG9uUGF1c2UpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIHRoaXMucmVhZHlTdGF0ZSA9IFwicGF1c2luZ1wiO1xuXG4gICAgZnVuY3Rpb24gcGF1c2UoKSB7XG4gICAgICBkZWJ1ZyhcInBhdXNlZFwiKTtcbiAgICAgIHNlbGYucmVhZHlTdGF0ZSA9IFwicGF1c2VkXCI7XG4gICAgICBvblBhdXNlKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucG9sbGluZyB8fCAhdGhpcy53cml0YWJsZSkge1xuICAgICAgbGV0IHRvdGFsID0gMDtcblxuICAgICAgaWYgKHRoaXMucG9sbGluZykge1xuICAgICAgICBkZWJ1ZyhcIndlIGFyZSBjdXJyZW50bHkgcG9sbGluZyAtIHdhaXRpbmcgdG8gcGF1c2VcIik7XG4gICAgICAgIHRvdGFsKys7XG4gICAgICAgIHRoaXMub25jZShcInBvbGxDb21wbGV0ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBkZWJ1ZyhcInByZS1wYXVzZSBwb2xsaW5nIGNvbXBsZXRlXCIpO1xuICAgICAgICAgIC0tdG90YWwgfHwgcGF1c2UoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy53cml0YWJsZSkge1xuICAgICAgICBkZWJ1ZyhcIndlIGFyZSBjdXJyZW50bHkgd3JpdGluZyAtIHdhaXRpbmcgdG8gcGF1c2VcIik7XG4gICAgICAgIHRvdGFsKys7XG4gICAgICAgIHRoaXMub25jZShcImRyYWluXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGRlYnVnKFwicHJlLXBhdXNlIHdyaXRpbmcgY29tcGxldGVcIik7XG4gICAgICAgICAgLS10b3RhbCB8fCBwYXVzZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcGF1c2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3RhcnRzIHBvbGxpbmcgY3ljbGUuXG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuICBwb2xsKCkge1xuICAgIGRlYnVnKFwicG9sbGluZ1wiKTtcbiAgICB0aGlzLnBvbGxpbmcgPSB0cnVlO1xuICAgIHRoaXMuZG9Qb2xsKCk7XG4gICAgdGhpcy5lbWl0KFwicG9sbFwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPdmVybG9hZHMgb25EYXRhIHRvIGRldGVjdCBwYXlsb2Fkcy5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuICBvbkRhdGEoZGF0YSkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGRlYnVnKFwicG9sbGluZyBnb3QgZGF0YSAlc1wiLCBkYXRhKTtcbiAgICBjb25zdCBjYWxsYmFjayA9IGZ1bmN0aW9uKHBhY2tldCwgaW5kZXgsIHRvdGFsKSB7XG4gICAgICAvLyBpZiBpdHMgdGhlIGZpcnN0IG1lc3NhZ2Ugd2UgY29uc2lkZXIgdGhlIHRyYW5zcG9ydCBvcGVuXG4gICAgICBpZiAoXCJvcGVuaW5nXCIgPT09IHNlbGYucmVhZHlTdGF0ZSAmJiBwYWNrZXQudHlwZSA9PT0gXCJvcGVuXCIpIHtcbiAgICAgICAgc2VsZi5vbk9wZW4oKTtcbiAgICAgIH1cblxuICAgICAgLy8gaWYgaXRzIGEgY2xvc2UgcGFja2V0LCB3ZSBjbG9zZSB0aGUgb25nb2luZyByZXF1ZXN0c1xuICAgICAgaWYgKFwiY2xvc2VcIiA9PT0gcGFja2V0LnR5cGUpIHtcbiAgICAgICAgc2VsZi5vbkNsb3NlKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLy8gb3RoZXJ3aXNlIGJ5cGFzcyBvbkRhdGEgYW5kIGhhbmRsZSB0aGUgbWVzc2FnZVxuICAgICAgc2VsZi5vblBhY2tldChwYWNrZXQpO1xuICAgIH07XG5cbiAgICAvLyBkZWNvZGUgcGF5bG9hZFxuICAgIHBhcnNlci5kZWNvZGVQYXlsb2FkKGRhdGEsIHRoaXMuc29ja2V0LmJpbmFyeVR5cGUpLmZvckVhY2goY2FsbGJhY2spO1xuXG4gICAgLy8gaWYgYW4gZXZlbnQgZGlkIG5vdCB0cmlnZ2VyIGNsb3NpbmdcbiAgICBpZiAoXCJjbG9zZWRcIiAhPT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAvLyBpZiB3ZSBnb3QgZGF0YSB3ZSdyZSBub3QgcG9sbGluZ1xuICAgICAgdGhpcy5wb2xsaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLmVtaXQoXCJwb2xsQ29tcGxldGVcIik7XG5cbiAgICAgIGlmIChcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgIHRoaXMucG9sbCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVidWcoJ2lnbm9yaW5nIHBvbGwgLSB0cmFuc3BvcnQgc3RhdGUgXCIlc1wiJywgdGhpcy5yZWFkeVN0YXRlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRm9yIHBvbGxpbmcsIHNlbmQgYSBjbG9zZSBwYWNrZXQuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cbiAgZG9DbG9zZSgpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgICAgZGVidWcoXCJ3cml0aW5nIGNsb3NlIHBhY2tldFwiKTtcbiAgICAgIHNlbGYud3JpdGUoW3sgdHlwZTogXCJjbG9zZVwiIH1dKTtcbiAgICB9XG5cbiAgICBpZiAoXCJvcGVuXCIgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgZGVidWcoXCJ0cmFuc3BvcnQgb3BlbiAtIGNsb3NpbmdcIik7XG4gICAgICBjbG9zZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpbiBjYXNlIHdlJ3JlIHRyeWluZyB0byBjbG9zZSB3aGlsZVxuICAgICAgLy8gaGFuZHNoYWtpbmcgaXMgaW4gcHJvZ3Jlc3MgKEdILTE2NClcbiAgICAgIGRlYnVnKFwidHJhbnNwb3J0IG5vdCBvcGVuIC0gZGVmZXJyaW5nIGNsb3NlXCIpO1xuICAgICAgdGhpcy5vbmNlKFwib3BlblwiLCBjbG9zZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdyaXRlcyBhIHBhY2tldHMgcGF5bG9hZC5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gZGF0YSBwYWNrZXRzXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGRyYWluIGNhbGxiYWNrXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cbiAgd3JpdGUocGFja2V0cykge1xuICAgIHRoaXMud3JpdGFibGUgPSBmYWxzZTtcblxuICAgIHBhcnNlci5lbmNvZGVQYXlsb2FkKHBhY2tldHMsIGRhdGEgPT4ge1xuICAgICAgdGhpcy5kb1dyaXRlKGRhdGEsICgpID0+IHtcbiAgICAgICAgdGhpcy53cml0YWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMuZW1pdChcImRyYWluXCIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIHVyaSBmb3IgY29ubmVjdGlvbi5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuICB1cmkoKSB7XG4gICAgbGV0IHF1ZXJ5ID0gdGhpcy5xdWVyeSB8fCB7fTtcbiAgICBjb25zdCBzY2hlbWEgPSB0aGlzLm9wdHMuc2VjdXJlID8gXCJodHRwc1wiIDogXCJodHRwXCI7XG4gICAgbGV0IHBvcnQgPSBcIlwiO1xuXG4gICAgLy8gY2FjaGUgYnVzdGluZyBpcyBmb3JjZWRcbiAgICBpZiAoZmFsc2UgIT09IHRoaXMub3B0cy50aW1lc3RhbXBSZXF1ZXN0cykge1xuICAgICAgcXVlcnlbdGhpcy5vcHRzLnRpbWVzdGFtcFBhcmFtXSA9IHllYXN0KCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnN1cHBvcnRzQmluYXJ5ICYmICFxdWVyeS5zaWQpIHtcbiAgICAgIHF1ZXJ5LmI2NCA9IDE7XG4gICAgfVxuXG4gICAgcXVlcnkgPSBwYXJzZXFzLmVuY29kZShxdWVyeSk7XG5cbiAgICAvLyBhdm9pZCBwb3J0IGlmIGRlZmF1bHQgZm9yIHNjaGVtYVxuICAgIGlmIChcbiAgICAgIHRoaXMub3B0cy5wb3J0ICYmXG4gICAgICAoKFwiaHR0cHNcIiA9PT0gc2NoZW1hICYmIE51bWJlcih0aGlzLm9wdHMucG9ydCkgIT09IDQ0MykgfHxcbiAgICAgICAgKFwiaHR0cFwiID09PSBzY2hlbWEgJiYgTnVtYmVyKHRoaXMub3B0cy5wb3J0KSAhPT0gODApKVxuICAgICkge1xuICAgICAgcG9ydCA9IFwiOlwiICsgdGhpcy5vcHRzLnBvcnQ7XG4gICAgfVxuXG4gICAgLy8gcHJlcGVuZCA/IHRvIHF1ZXJ5XG4gICAgaWYgKHF1ZXJ5Lmxlbmd0aCkge1xuICAgICAgcXVlcnkgPSBcIj9cIiArIHF1ZXJ5O1xuICAgIH1cblxuICAgIGNvbnN0IGlwdjYgPSB0aGlzLm9wdHMuaG9zdG5hbWUuaW5kZXhPZihcIjpcIikgIT09IC0xO1xuICAgIHJldHVybiAoXG4gICAgICBzY2hlbWEgK1xuICAgICAgXCI6Ly9cIiArXG4gICAgICAoaXB2NiA/IFwiW1wiICsgdGhpcy5vcHRzLmhvc3RuYW1lICsgXCJdXCIgOiB0aGlzLm9wdHMuaG9zdG5hbWUpICtcbiAgICAgIHBvcnQgK1xuICAgICAgdGhpcy5vcHRzLnBhdGggK1xuICAgICAgcXVlcnlcbiAgICApO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUG9sbGluZztcbiIsImNvbnN0IGdsb2JhbFRoaXMgPSByZXF1aXJlKFwiLi4vZ2xvYmFsVGhpc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFdlYlNvY2tldDogZ2xvYmFsVGhpcy5XZWJTb2NrZXQgfHwgZ2xvYmFsVGhpcy5Nb3pXZWJTb2NrZXQsXG4gIHVzaW5nQnJvd3NlcldlYlNvY2tldDogdHJ1ZSxcbiAgZGVmYXVsdEJpbmFyeVR5cGU6IFwiYXJyYXlidWZmZXJcIlxufTtcbiIsImNvbnN0IFRyYW5zcG9ydCA9IHJlcXVpcmUoXCIuLi90cmFuc3BvcnRcIik7XG5jb25zdCBwYXJzZXIgPSByZXF1aXJlKFwiZW5naW5lLmlvLXBhcnNlclwiKTtcbmNvbnN0IHBhcnNlcXMgPSByZXF1aXJlKFwicGFyc2Vxc1wiKTtcbmNvbnN0IHllYXN0ID0gcmVxdWlyZShcInllYXN0XCIpO1xuY29uc3QgeyBwaWNrIH0gPSByZXF1aXJlKFwiLi4vdXRpbFwiKTtcbmNvbnN0IHtcbiAgV2ViU29ja2V0LFxuICB1c2luZ0Jyb3dzZXJXZWJTb2NrZXQsXG4gIGRlZmF1bHRCaW5hcnlUeXBlXG59ID0gcmVxdWlyZShcIi4vd2Vic29ja2V0LWNvbnN0cnVjdG9yXCIpO1xuXG5jb25zdCBkZWJ1ZyA9IHJlcXVpcmUoXCJkZWJ1Z1wiKShcImVuZ2luZS5pby1jbGllbnQ6d2Vic29ja2V0XCIpO1xuXG4vLyBkZXRlY3QgUmVhY3ROYXRpdmUgZW52aXJvbm1lbnRcbmNvbnN0IGlzUmVhY3ROYXRpdmUgPVxuICB0eXBlb2YgbmF2aWdhdG9yICE9PSBcInVuZGVmaW5lZFwiICYmXG4gIHR5cGVvZiBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gXCJzdHJpbmdcIiAmJlxuICBuYXZpZ2F0b3IucHJvZHVjdC50b0xvd2VyQ2FzZSgpID09PSBcInJlYWN0bmF0aXZlXCI7XG5cbmNsYXNzIFdTIGV4dGVuZHMgVHJhbnNwb3J0IHtcbiAgLyoqXG4gICAqIFdlYlNvY2tldCB0cmFuc3BvcnQgY29uc3RydWN0b3IuXG4gICAqXG4gICAqIEBhcGkge09iamVjdH0gY29ubmVjdGlvbiBvcHRpb25zXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgc3VwZXIob3B0cyk7XG5cbiAgICB0aGlzLnN1cHBvcnRzQmluYXJ5ID0gIW9wdHMuZm9yY2VCYXNlNjQ7XG4gIH1cblxuICAvKipcbiAgICogVHJhbnNwb3J0IG5hbWUuXG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gXCJ3ZWJzb2NrZXRcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyBzb2NrZXQuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cbiAgZG9PcGVuKCkge1xuICAgIGlmICghdGhpcy5jaGVjaygpKSB7XG4gICAgICAvLyBsZXQgcHJvYmUgdGltZW91dFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHVyaSA9IHRoaXMudXJpKCk7XG4gICAgY29uc3QgcHJvdG9jb2xzID0gdGhpcy5vcHRzLnByb3RvY29scztcblxuICAgIC8vIFJlYWN0IE5hdGl2ZSBvbmx5IHN1cHBvcnRzIHRoZSAnaGVhZGVycycgb3B0aW9uLCBhbmQgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgYW55dGhpbmcgZWxzZSBpcyBwYXNzZWRcbiAgICBjb25zdCBvcHRzID0gaXNSZWFjdE5hdGl2ZVxuICAgICAgPyB7fVxuICAgICAgOiBwaWNrKFxuICAgICAgICAgIHRoaXMub3B0cyxcbiAgICAgICAgICBcImFnZW50XCIsXG4gICAgICAgICAgXCJwZXJNZXNzYWdlRGVmbGF0ZVwiLFxuICAgICAgICAgIFwicGZ4XCIsXG4gICAgICAgICAgXCJrZXlcIixcbiAgICAgICAgICBcInBhc3NwaHJhc2VcIixcbiAgICAgICAgICBcImNlcnRcIixcbiAgICAgICAgICBcImNhXCIsXG4gICAgICAgICAgXCJjaXBoZXJzXCIsXG4gICAgICAgICAgXCJyZWplY3RVbmF1dGhvcml6ZWRcIixcbiAgICAgICAgICBcImxvY2FsQWRkcmVzc1wiLFxuICAgICAgICAgIFwicHJvdG9jb2xWZXJzaW9uXCIsXG4gICAgICAgICAgXCJvcmlnaW5cIixcbiAgICAgICAgICBcIm1heFBheWxvYWRcIixcbiAgICAgICAgICBcImZhbWlseVwiLFxuICAgICAgICAgIFwiY2hlY2tTZXJ2ZXJJZGVudGl0eVwiXG4gICAgICAgICk7XG5cbiAgICBpZiAodGhpcy5vcHRzLmV4dHJhSGVhZGVycykge1xuICAgICAgb3B0cy5oZWFkZXJzID0gdGhpcy5vcHRzLmV4dHJhSGVhZGVycztcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgdGhpcy53cyA9XG4gICAgICAgIHVzaW5nQnJvd3NlcldlYlNvY2tldCAmJiAhaXNSZWFjdE5hdGl2ZVxuICAgICAgICAgID8gcHJvdG9jb2xzXG4gICAgICAgICAgICA/IG5ldyBXZWJTb2NrZXQodXJpLCBwcm90b2NvbHMpXG4gICAgICAgICAgICA6IG5ldyBXZWJTb2NrZXQodXJpKVxuICAgICAgICAgIDogbmV3IFdlYlNvY2tldCh1cmksIHByb3RvY29scywgb3B0cyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbWl0KFwiZXJyb3JcIiwgZXJyKTtcbiAgICB9XG5cbiAgICB0aGlzLndzLmJpbmFyeVR5cGUgPSB0aGlzLnNvY2tldC5iaW5hcnlUeXBlIHx8IGRlZmF1bHRCaW5hcnlUeXBlO1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBzb2NrZXRcbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuICBhZGRFdmVudExpc3RlbmVycygpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIHRoaXMud3Mub25vcGVuID0gZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLm9uT3BlbigpO1xuICAgIH07XG4gICAgdGhpcy53cy5vbmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLm9uQ2xvc2UoKTtcbiAgICB9O1xuICAgIHRoaXMud3Mub25tZXNzYWdlID0gZnVuY3Rpb24oZXYpIHtcbiAgICAgIHNlbGYub25EYXRhKGV2LmRhdGEpO1xuICAgIH07XG4gICAgdGhpcy53cy5vbmVycm9yID0gZnVuY3Rpb24oZSkge1xuICAgICAgc2VsZi5vbkVycm9yKFwid2Vic29ja2V0IGVycm9yXCIsIGUpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogV3JpdGVzIGRhdGEgdG8gc29ja2V0LlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBvZiBwYWNrZXRzLlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG4gIHdyaXRlKHBhY2tldHMpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICB0aGlzLndyaXRhYmxlID0gZmFsc2U7XG5cbiAgICAvLyBlbmNvZGVQYWNrZXQgZWZmaWNpZW50IGFzIGl0IHVzZXMgV1MgZnJhbWluZ1xuICAgIC8vIG5vIG5lZWQgZm9yIGVuY29kZVBheWxvYWRcbiAgICBsZXQgdG90YWwgPSBwYWNrZXRzLmxlbmd0aDtcbiAgICBsZXQgaSA9IDA7XG4gICAgY29uc3QgbCA9IHRvdGFsO1xuICAgIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAoZnVuY3Rpb24ocGFja2V0KSB7XG4gICAgICAgIHBhcnNlci5lbmNvZGVQYWNrZXQocGFja2V0LCBzZWxmLnN1cHBvcnRzQmluYXJ5LCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgLy8gYWx3YXlzIGNyZWF0ZSBhIG5ldyBvYmplY3QgKEdILTQzNylcbiAgICAgICAgICBjb25zdCBvcHRzID0ge307XG4gICAgICAgICAgaWYgKCF1c2luZ0Jyb3dzZXJXZWJTb2NrZXQpIHtcbiAgICAgICAgICAgIGlmIChwYWNrZXQub3B0aW9ucykge1xuICAgICAgICAgICAgICBvcHRzLmNvbXByZXNzID0gcGFja2V0Lm9wdGlvbnMuY29tcHJlc3M7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzZWxmLm9wdHMucGVyTWVzc2FnZURlZmxhdGUpIHtcbiAgICAgICAgICAgICAgY29uc3QgbGVuID1cbiAgICAgICAgICAgICAgICBcInN0cmluZ1wiID09PSB0eXBlb2YgZGF0YVxuICAgICAgICAgICAgICAgICAgPyBCdWZmZXIuYnl0ZUxlbmd0aChkYXRhKVxuICAgICAgICAgICAgICAgICAgOiBkYXRhLmxlbmd0aDtcbiAgICAgICAgICAgICAgaWYgKGxlbiA8IHNlbGYub3B0cy5wZXJNZXNzYWdlRGVmbGF0ZS50aHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICBvcHRzLmNvbXByZXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBTb21ldGltZXMgdGhlIHdlYnNvY2tldCBoYXMgYWxyZWFkeSBiZWVuIGNsb3NlZCBidXQgdGhlIGJyb3dzZXIgZGlkbid0XG4gICAgICAgICAgLy8gaGF2ZSBhIGNoYW5jZSBvZiBpbmZvcm1pbmcgdXMgYWJvdXQgaXQgeWV0LCBpbiB0aGF0IGNhc2Ugc2VuZCB3aWxsXG4gICAgICAgICAgLy8gdGhyb3cgYW4gZXJyb3JcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHVzaW5nQnJvd3NlcldlYlNvY2tldCkge1xuICAgICAgICAgICAgICAvLyBUeXBlRXJyb3IgaXMgdGhyb3duIHdoZW4gcGFzc2luZyB0aGUgc2Vjb25kIGFyZ3VtZW50IG9uIFNhZmFyaVxuICAgICAgICAgICAgICBzZWxmLndzLnNlbmQoZGF0YSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzZWxmLndzLnNlbmQoZGF0YSwgb3B0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgZGVidWcoXCJ3ZWJzb2NrZXQgY2xvc2VkIGJlZm9yZSBvbmNsb3NlIGV2ZW50XCIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC0tdG90YWwgfHwgZG9uZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pKHBhY2tldHNbaV0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRvbmUoKSB7XG4gICAgICBzZWxmLmVtaXQoXCJmbHVzaFwiKTtcblxuICAgICAgLy8gZmFrZSBkcmFpblxuICAgICAgLy8gZGVmZXIgdG8gbmV4dCB0aWNrIHRvIGFsbG93IFNvY2tldCB0byBjbGVhciB3cml0ZUJ1ZmZlclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgc2VsZi53cml0YWJsZSA9IHRydWU7XG4gICAgICAgIHNlbGYuZW1pdChcImRyYWluXCIpO1xuICAgICAgfSwgMCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB1cG9uIGNsb3NlXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cbiAgb25DbG9zZSgpIHtcbiAgICBUcmFuc3BvcnQucHJvdG90eXBlLm9uQ2xvc2UuY2FsbCh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgc29ja2V0LlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG4gIGRvQ2xvc2UoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLndzICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLndzLmNsb3NlKCk7XG4gICAgICB0aGlzLndzID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIHVyaSBmb3IgY29ubmVjdGlvbi5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuICB1cmkoKSB7XG4gICAgbGV0IHF1ZXJ5ID0gdGhpcy5xdWVyeSB8fCB7fTtcbiAgICBjb25zdCBzY2hlbWEgPSB0aGlzLm9wdHMuc2VjdXJlID8gXCJ3c3NcIiA6IFwid3NcIjtcbiAgICBsZXQgcG9ydCA9IFwiXCI7XG5cbiAgICAvLyBhdm9pZCBwb3J0IGlmIGRlZmF1bHQgZm9yIHNjaGVtYVxuICAgIGlmIChcbiAgICAgIHRoaXMub3B0cy5wb3J0ICYmXG4gICAgICAoKFwid3NzXCIgPT09IHNjaGVtYSAmJiBOdW1iZXIodGhpcy5vcHRzLnBvcnQpICE9PSA0NDMpIHx8XG4gICAgICAgIChcIndzXCIgPT09IHNjaGVtYSAmJiBOdW1iZXIodGhpcy5vcHRzLnBvcnQpICE9PSA4MCkpXG4gICAgKSB7XG4gICAgICBwb3J0ID0gXCI6XCIgKyB0aGlzLm9wdHMucG9ydDtcbiAgICB9XG5cbiAgICAvLyBhcHBlbmQgdGltZXN0YW1wIHRvIFVSSVxuICAgIGlmICh0aGlzLm9wdHMudGltZXN0YW1wUmVxdWVzdHMpIHtcbiAgICAgIHF1ZXJ5W3RoaXMub3B0cy50aW1lc3RhbXBQYXJhbV0gPSB5ZWFzdCgpO1xuICAgIH1cblxuICAgIC8vIGNvbW11bmljYXRlIGJpbmFyeSBzdXBwb3J0IGNhcGFiaWxpdGllc1xuICAgIGlmICghdGhpcy5zdXBwb3J0c0JpbmFyeSkge1xuICAgICAgcXVlcnkuYjY0ID0gMTtcbiAgICB9XG5cbiAgICBxdWVyeSA9IHBhcnNlcXMuZW5jb2RlKHF1ZXJ5KTtcblxuICAgIC8vIHByZXBlbmQgPyB0byBxdWVyeVxuICAgIGlmIChxdWVyeS5sZW5ndGgpIHtcbiAgICAgIHF1ZXJ5ID0gXCI/XCIgKyBxdWVyeTtcbiAgICB9XG5cbiAgICBjb25zdCBpcHY2ID0gdGhpcy5vcHRzLmhvc3RuYW1lLmluZGV4T2YoXCI6XCIpICE9PSAtMTtcbiAgICByZXR1cm4gKFxuICAgICAgc2NoZW1hICtcbiAgICAgIFwiOi8vXCIgK1xuICAgICAgKGlwdjYgPyBcIltcIiArIHRoaXMub3B0cy5ob3N0bmFtZSArIFwiXVwiIDogdGhpcy5vcHRzLmhvc3RuYW1lKSArXG4gICAgICBwb3J0ICtcbiAgICAgIHRoaXMub3B0cy5wYXRoICtcbiAgICAgIHF1ZXJ5XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGZWF0dXJlIGRldGVjdGlvbiBmb3IgV2ViU29ja2V0LlxuICAgKlxuICAgKiBAcmV0dXJuIHtCb29sZWFufSB3aGV0aGVyIHRoaXMgdHJhbnNwb3J0IGlzIGF2YWlsYWJsZS5cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG4gIGNoZWNrKCkge1xuICAgIHJldHVybiAoXG4gICAgICAhIVdlYlNvY2tldCAmJlxuICAgICAgIShcIl9faW5pdGlhbGl6ZVwiIGluIFdlYlNvY2tldCAmJiB0aGlzLm5hbWUgPT09IFdTLnByb3RvdHlwZS5uYW1lKVxuICAgICk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBXUztcbiIsIm1vZHVsZS5leHBvcnRzLnBpY2sgPSAob2JqLCAuLi5hdHRyKSA9PiB7XG4gIHJldHVybiBhdHRyLnJlZHVjZSgoYWNjLCBrKSA9PiB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgYWNjW2tdID0gb2JqW2tdO1xuICAgIH1cbiAgICByZXR1cm4gYWNjO1xuICB9LCB7fSk7XG59O1xuIiwiLy8gYnJvd3NlciBzaGltIGZvciB4bWxodHRwcmVxdWVzdCBtb2R1bGVcblxuY29uc3QgaGFzQ09SUyA9IHJlcXVpcmUoXCJoYXMtY29yc1wiKTtcbmNvbnN0IGdsb2JhbFRoaXMgPSByZXF1aXJlKFwiLi9nbG9iYWxUaGlzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9wdHMpIHtcbiAgY29uc3QgeGRvbWFpbiA9IG9wdHMueGRvbWFpbjtcblxuICAvLyBzY2hlbWUgbXVzdCBiZSBzYW1lIHdoZW4gdXNpZ24gWERvbWFpblJlcXVlc3RcbiAgLy8gaHR0cDovL2Jsb2dzLm1zZG4uY29tL2IvaWVpbnRlcm5hbHMvYXJjaGl2ZS8yMDEwLzA1LzEzL3hkb21haW5yZXF1ZXN0LXJlc3RyaWN0aW9ucy1saW1pdGF0aW9ucy1hbmQtd29ya2Fyb3VuZHMuYXNweFxuICBjb25zdCB4c2NoZW1lID0gb3B0cy54c2NoZW1lO1xuXG4gIC8vIFhEb21haW5SZXF1ZXN0IGhhcyBhIGZsb3cgb2Ygbm90IHNlbmRpbmcgY29va2llLCB0aGVyZWZvcmUgaXQgc2hvdWxkIGJlIGRpc2FibGVkIGFzIGEgZGVmYXVsdC5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL0F1dG9tYXR0aWMvZW5naW5lLmlvLWNsaWVudC9wdWxsLzIxN1xuICBjb25zdCBlbmFibGVzWERSID0gb3B0cy5lbmFibGVzWERSO1xuXG4gIC8vIFhNTEh0dHBSZXF1ZXN0IGNhbiBiZSBkaXNhYmxlZCBvbiBJRVxuICB0cnkge1xuICAgIGlmIChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgWE1MSHR0cFJlcXVlc3QgJiYgKCF4ZG9tYWluIHx8IGhhc0NPUlMpKSB7XG4gICAgICByZXR1cm4gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7fVxuXG4gIC8vIFVzZSBYRG9tYWluUmVxdWVzdCBmb3IgSUU4IGlmIGVuYWJsZXNYRFIgaXMgdHJ1ZVxuICAvLyBiZWNhdXNlIGxvYWRpbmcgYmFyIGtlZXBzIGZsYXNoaW5nIHdoZW4gdXNpbmcganNvbnAtcG9sbGluZ1xuICAvLyBodHRwczovL2dpdGh1Yi5jb20veXVqaW9zYWthL3NvY2tlLmlvLWllOC1sb2FkaW5nLWV4YW1wbGVcbiAgdHJ5IHtcbiAgICBpZiAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIFhEb21haW5SZXF1ZXN0ICYmICF4c2NoZW1lICYmIGVuYWJsZXNYRFIpIHtcbiAgICAgIHJldHVybiBuZXcgWERvbWFpblJlcXVlc3QoKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgaWYgKCF4ZG9tYWluKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBuZXcgZ2xvYmFsVGhpc1tbXCJBY3RpdmVcIl0uY29uY2F0KFwiT2JqZWN0XCIpLmpvaW4oXCJYXCIpXShcbiAgICAgICAgXCJNaWNyb3NvZnQuWE1MSFRUUFwiXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbn07XG4iLCJjb25zdCBQQUNLRVRfVFlQRVMgPSBPYmplY3QuY3JlYXRlKG51bGwpOyAvLyBubyBNYXAgPSBubyBwb2x5ZmlsbFxuUEFDS0VUX1RZUEVTW1wib3BlblwiXSA9IFwiMFwiO1xuUEFDS0VUX1RZUEVTW1wiY2xvc2VcIl0gPSBcIjFcIjtcblBBQ0tFVF9UWVBFU1tcInBpbmdcIl0gPSBcIjJcIjtcblBBQ0tFVF9UWVBFU1tcInBvbmdcIl0gPSBcIjNcIjtcblBBQ0tFVF9UWVBFU1tcIm1lc3NhZ2VcIl0gPSBcIjRcIjtcblBBQ0tFVF9UWVBFU1tcInVwZ3JhZGVcIl0gPSBcIjVcIjtcblBBQ0tFVF9UWVBFU1tcIm5vb3BcIl0gPSBcIjZcIjtcblxuY29uc3QgUEFDS0VUX1RZUEVTX1JFVkVSU0UgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuT2JqZWN0LmtleXMoUEFDS0VUX1RZUEVTKS5mb3JFYWNoKGtleSA9PiB7XG4gIFBBQ0tFVF9UWVBFU19SRVZFUlNFW1BBQ0tFVF9UWVBFU1trZXldXSA9IGtleTtcbn0pO1xuXG5jb25zdCBFUlJPUl9QQUNLRVQgPSB7IHR5cGU6IFwiZXJyb3JcIiwgZGF0YTogXCJwYXJzZXIgZXJyb3JcIiB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgUEFDS0VUX1RZUEVTLFxuICBQQUNLRVRfVFlQRVNfUkVWRVJTRSxcbiAgRVJST1JfUEFDS0VUXG59O1xuIiwiY29uc3QgeyBQQUNLRVRfVFlQRVNfUkVWRVJTRSwgRVJST1JfUEFDS0VUIH0gPSByZXF1aXJlKFwiLi9jb21tb25zXCIpO1xuXG5jb25zdCB3aXRoTmF0aXZlQXJyYXlCdWZmZXIgPSB0eXBlb2YgQXJyYXlCdWZmZXIgPT09IFwiZnVuY3Rpb25cIjtcblxubGV0IGJhc2U2NGRlY29kZXI7XG5pZiAod2l0aE5hdGl2ZUFycmF5QnVmZmVyKSB7XG4gIGJhc2U2NGRlY29kZXIgPSByZXF1aXJlKFwiYmFzZTY0LWFycmF5YnVmZmVyXCIpO1xufVxuXG5jb25zdCBkZWNvZGVQYWNrZXQgPSAoZW5jb2RlZFBhY2tldCwgYmluYXJ5VHlwZSkgPT4ge1xuICBpZiAodHlwZW9mIGVuY29kZWRQYWNrZXQgIT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogXCJtZXNzYWdlXCIsXG4gICAgICBkYXRhOiBtYXBCaW5hcnkoZW5jb2RlZFBhY2tldCwgYmluYXJ5VHlwZSlcbiAgICB9O1xuICB9XG4gIGNvbnN0IHR5cGUgPSBlbmNvZGVkUGFja2V0LmNoYXJBdCgwKTtcbiAgaWYgKHR5cGUgPT09IFwiYlwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IFwibWVzc2FnZVwiLFxuICAgICAgZGF0YTogZGVjb2RlQmFzZTY0UGFja2V0KGVuY29kZWRQYWNrZXQuc3Vic3RyaW5nKDEpLCBiaW5hcnlUeXBlKVxuICAgIH07XG4gIH1cbiAgY29uc3QgcGFja2V0VHlwZSA9IFBBQ0tFVF9UWVBFU19SRVZFUlNFW3R5cGVdO1xuICBpZiAoIXBhY2tldFR5cGUpIHtcbiAgICByZXR1cm4gRVJST1JfUEFDS0VUO1xuICB9XG4gIHJldHVybiBlbmNvZGVkUGFja2V0Lmxlbmd0aCA+IDFcbiAgICA/IHtcbiAgICAgICAgdHlwZTogUEFDS0VUX1RZUEVTX1JFVkVSU0VbdHlwZV0sXG4gICAgICAgIGRhdGE6IGVuY29kZWRQYWNrZXQuc3Vic3RyaW5nKDEpXG4gICAgICB9XG4gICAgOiB7XG4gICAgICAgIHR5cGU6IFBBQ0tFVF9UWVBFU19SRVZFUlNFW3R5cGVdXG4gICAgICB9O1xufTtcblxuY29uc3QgZGVjb2RlQmFzZTY0UGFja2V0ID0gKGRhdGEsIGJpbmFyeVR5cGUpID0+IHtcbiAgaWYgKGJhc2U2NGRlY29kZXIpIHtcbiAgICBjb25zdCBkZWNvZGVkID0gYmFzZTY0ZGVjb2Rlci5kZWNvZGUoZGF0YSk7XG4gICAgcmV0dXJuIG1hcEJpbmFyeShkZWNvZGVkLCBiaW5hcnlUeXBlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4geyBiYXNlNjQ6IHRydWUsIGRhdGEgfTsgLy8gZmFsbGJhY2sgZm9yIG9sZCBicm93c2Vyc1xuICB9XG59O1xuXG5jb25zdCBtYXBCaW5hcnkgPSAoZGF0YSwgYmluYXJ5VHlwZSkgPT4ge1xuICBzd2l0Y2ggKGJpbmFyeVR5cGUpIHtcbiAgICBjYXNlIFwiYmxvYlwiOlxuICAgICAgcmV0dXJuIGRhdGEgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlciA/IG5ldyBCbG9iKFtkYXRhXSkgOiBkYXRhO1xuICAgIGNhc2UgXCJhcnJheWJ1ZmZlclwiOlxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZGF0YTsgLy8gYXNzdW1pbmcgdGhlIGRhdGEgaXMgYWxyZWFkeSBhbiBBcnJheUJ1ZmZlclxuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlY29kZVBhY2tldDtcbiIsImNvbnN0IHsgUEFDS0VUX1RZUEVTIH0gPSByZXF1aXJlKFwiLi9jb21tb25zXCIpO1xuXG5jb25zdCB3aXRoTmF0aXZlQmxvYiA9XG4gIHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgfHxcbiAgKHR5cGVvZiBCbG9iICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKEJsb2IpID09PSBcIltvYmplY3QgQmxvYkNvbnN0cnVjdG9yXVwiKTtcbmNvbnN0IHdpdGhOYXRpdmVBcnJheUJ1ZmZlciA9IHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gXCJmdW5jdGlvblwiO1xuXG4vLyBBcnJheUJ1ZmZlci5pc1ZpZXcgbWV0aG9kIGlzIG5vdCBkZWZpbmVkIGluIElFMTBcbmNvbnN0IGlzVmlldyA9IG9iaiA9PiB7XG4gIHJldHVybiB0eXBlb2YgQXJyYXlCdWZmZXIuaXNWaWV3ID09PSBcImZ1bmN0aW9uXCJcbiAgICA/IEFycmF5QnVmZmVyLmlzVmlldyhvYmopXG4gICAgOiBvYmogJiYgb2JqLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyO1xufTtcblxuY29uc3QgZW5jb2RlUGFja2V0ID0gKHsgdHlwZSwgZGF0YSB9LCBzdXBwb3J0c0JpbmFyeSwgY2FsbGJhY2spID0+IHtcbiAgaWYgKHdpdGhOYXRpdmVCbG9iICYmIGRhdGEgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgaWYgKHN1cHBvcnRzQmluYXJ5KSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2soZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBlbmNvZGVCbG9iQXNCYXNlNjQoZGF0YSwgY2FsbGJhY2spO1xuICAgIH1cbiAgfSBlbHNlIGlmIChcbiAgICB3aXRoTmF0aXZlQXJyYXlCdWZmZXIgJiZcbiAgICAoZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyIHx8IGlzVmlldyhkYXRhKSlcbiAgKSB7XG4gICAgaWYgKHN1cHBvcnRzQmluYXJ5KSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2soZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyID8gZGF0YSA6IGRhdGEuYnVmZmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGVuY29kZUJsb2JBc0Jhc2U2NChuZXcgQmxvYihbZGF0YV0pLCBjYWxsYmFjayk7XG4gICAgfVxuICB9XG4gIC8vIHBsYWluIHN0cmluZ1xuICByZXR1cm4gY2FsbGJhY2soUEFDS0VUX1RZUEVTW3R5cGVdICsgKGRhdGEgfHwgXCJcIikpO1xufTtcblxuY29uc3QgZW5jb2RlQmxvYkFzQmFzZTY0ID0gKGRhdGEsIGNhbGxiYWNrKSA9PiB7XG4gIGNvbnN0IGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICBmaWxlUmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBmaWxlUmVhZGVyLnJlc3VsdC5zcGxpdChcIixcIilbMV07XG4gICAgY2FsbGJhY2soXCJiXCIgKyBjb250ZW50KTtcbiAgfTtcbiAgcmV0dXJuIGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChkYXRhKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZW5jb2RlUGFja2V0O1xuIiwiY29uc3QgZW5jb2RlUGFja2V0ID0gcmVxdWlyZShcIi4vZW5jb2RlUGFja2V0XCIpO1xuY29uc3QgZGVjb2RlUGFja2V0ID0gcmVxdWlyZShcIi4vZGVjb2RlUGFja2V0XCIpO1xuXG5jb25zdCBTRVBBUkFUT1IgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDMwKTsgLy8gc2VlIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0RlbGltaXRlciNBU0NJSV9kZWxpbWl0ZWRfdGV4dFxuXG5jb25zdCBlbmNvZGVQYXlsb2FkID0gKHBhY2tldHMsIGNhbGxiYWNrKSA9PiB7XG4gIC8vIHNvbWUgcGFja2V0cyBtYXkgYmUgYWRkZWQgdG8gdGhlIGFycmF5IHdoaWxlIGVuY29kaW5nLCBzbyB0aGUgaW5pdGlhbCBsZW5ndGggbXVzdCBiZSBzYXZlZFxuICBjb25zdCBsZW5ndGggPSBwYWNrZXRzLmxlbmd0aDtcbiAgY29uc3QgZW5jb2RlZFBhY2tldHMgPSBuZXcgQXJyYXkobGVuZ3RoKTtcbiAgbGV0IGNvdW50ID0gMDtcblxuICBwYWNrZXRzLmZvckVhY2goKHBhY2tldCwgaSkgPT4ge1xuICAgIC8vIGZvcmNlIGJhc2U2NCBlbmNvZGluZyBmb3IgYmluYXJ5IHBhY2tldHNcbiAgICBlbmNvZGVQYWNrZXQocGFja2V0LCBmYWxzZSwgZW5jb2RlZFBhY2tldCA9PiB7XG4gICAgICBlbmNvZGVkUGFja2V0c1tpXSA9IGVuY29kZWRQYWNrZXQ7XG4gICAgICBpZiAoKytjb3VudCA9PT0gbGVuZ3RoKSB7XG4gICAgICAgIGNhbGxiYWNrKGVuY29kZWRQYWNrZXRzLmpvaW4oU0VQQVJBVE9SKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufTtcblxuY29uc3QgZGVjb2RlUGF5bG9hZCA9IChlbmNvZGVkUGF5bG9hZCwgYmluYXJ5VHlwZSkgPT4ge1xuICBjb25zdCBlbmNvZGVkUGFja2V0cyA9IGVuY29kZWRQYXlsb2FkLnNwbGl0KFNFUEFSQVRPUik7XG4gIGNvbnN0IHBhY2tldHMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbmNvZGVkUGFja2V0cy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGRlY29kZWRQYWNrZXQgPSBkZWNvZGVQYWNrZXQoZW5jb2RlZFBhY2tldHNbaV0sIGJpbmFyeVR5cGUpO1xuICAgIHBhY2tldHMucHVzaChkZWNvZGVkUGFja2V0KTtcbiAgICBpZiAoZGVjb2RlZFBhY2tldC50eXBlID09PSBcImVycm9yXCIpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcGFja2V0cztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwcm90b2NvbDogNCxcbiAgZW5jb2RlUGFja2V0LFxuICBlbmNvZGVQYXlsb2FkLFxuICBkZWNvZGVQYWNrZXQsXG4gIGRlY29kZVBheWxvYWRcbn07XG4iLCJcbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKlxuICogTG9naWMgYm9ycm93ZWQgZnJvbSBNb2Rlcm5penI6XG4gKlxuICogICAtIGh0dHBzOi8vZ2l0aHViLmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL2Jsb2IvbWFzdGVyL2ZlYXR1cmUtZGV0ZWN0cy9jb3JzLmpzXG4gKi9cblxudHJ5IHtcbiAgbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnICYmXG4gICAgJ3dpdGhDcmVkZW50aWFscycgaW4gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG59IGNhdGNoIChlcnIpIHtcbiAgLy8gaWYgWE1MSHR0cCBzdXBwb3J0IGlzIGRpc2FibGVkIGluIElFIHRoZW4gaXQgd2lsbCB0aHJvd1xuICAvLyB3aGVuIHRyeWluZyB0byBjcmVhdGVcbiAgbW9kdWxlLmV4cG9ydHMgPSBmYWxzZTtcbn1cbiIsIi8qKlxuICogQ29tcGlsZXMgYSBxdWVyeXN0cmluZ1xuICogUmV0dXJucyBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5lbmNvZGUgPSBmdW5jdGlvbiAob2JqKSB7XG4gIHZhciBzdHIgPSAnJztcblxuICBmb3IgKHZhciBpIGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgIGlmIChzdHIubGVuZ3RoKSBzdHIgKz0gJyYnO1xuICAgICAgc3RyICs9IGVuY29kZVVSSUNvbXBvbmVudChpKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChvYmpbaV0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdHI7XG59O1xuXG4vKipcbiAqIFBhcnNlcyBhIHNpbXBsZSBxdWVyeXN0cmluZyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBxc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5kZWNvZGUgPSBmdW5jdGlvbihxcyl7XG4gIHZhciBxcnkgPSB7fTtcbiAgdmFyIHBhaXJzID0gcXMuc3BsaXQoJyYnKTtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBwYWlycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICB2YXIgcGFpciA9IHBhaXJzW2ldLnNwbGl0KCc9Jyk7XG4gICAgcXJ5W2RlY29kZVVSSUNvbXBvbmVudChwYWlyWzBdKV0gPSBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSk7XG4gIH1cbiAgcmV0dXJuIHFyeTtcbn07XG4iLCIvKipcbiAqIFBhcnNlcyBhbiBVUklcbiAqXG4gKiBAYXV0aG9yIFN0ZXZlbiBMZXZpdGhhbiA8c3RldmVubGV2aXRoYW4uY29tPiAoTUlUIGxpY2Vuc2UpXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG52YXIgcmUgPSAvXig/Oig/IVteOkBdKzpbXjpAXFwvXSpAKShodHRwfGh0dHBzfHdzfHdzcyk6XFwvXFwvKT8oKD86KChbXjpAXSopKD86OihbXjpAXSopKT8pP0ApPygoPzpbYS1mMC05XXswLDR9Oil7Miw3fVthLWYwLTldezAsNH18W146XFwvPyNdKikoPzo6KFxcZCopKT8pKCgoXFwvKD86W14/I10oPyFbXj8jXFwvXSpcXC5bXj8jXFwvLl0rKD86Wz8jXXwkKSkpKlxcLz8pPyhbXj8jXFwvXSopKSg/OlxcPyhbXiNdKikpPyg/OiMoLiopKT8pLztcblxudmFyIHBhcnRzID0gW1xuICAgICdzb3VyY2UnLCAncHJvdG9jb2wnLCAnYXV0aG9yaXR5JywgJ3VzZXJJbmZvJywgJ3VzZXInLCAncGFzc3dvcmQnLCAnaG9zdCcsICdwb3J0JywgJ3JlbGF0aXZlJywgJ3BhdGgnLCAnZGlyZWN0b3J5JywgJ2ZpbGUnLCAncXVlcnknLCAnYW5jaG9yJ1xuXTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZXVyaShzdHIpIHtcbiAgICB2YXIgc3JjID0gc3RyLFxuICAgICAgICBiID0gc3RyLmluZGV4T2YoJ1snKSxcbiAgICAgICAgZSA9IHN0ci5pbmRleE9mKCddJyk7XG5cbiAgICBpZiAoYiAhPSAtMSAmJiBlICE9IC0xKSB7XG4gICAgICAgIHN0ciA9IHN0ci5zdWJzdHJpbmcoMCwgYikgKyBzdHIuc3Vic3RyaW5nKGIsIGUpLnJlcGxhY2UoLzovZywgJzsnKSArIHN0ci5zdWJzdHJpbmcoZSwgc3RyLmxlbmd0aCk7XG4gICAgfVxuXG4gICAgdmFyIG0gPSByZS5leGVjKHN0ciB8fCAnJyksXG4gICAgICAgIHVyaSA9IHt9LFxuICAgICAgICBpID0gMTQ7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHVyaVtwYXJ0c1tpXV0gPSBtW2ldIHx8ICcnO1xuICAgIH1cblxuICAgIGlmIChiICE9IC0xICYmIGUgIT0gLTEpIHtcbiAgICAgICAgdXJpLnNvdXJjZSA9IHNyYztcbiAgICAgICAgdXJpLmhvc3QgPSB1cmkuaG9zdC5zdWJzdHJpbmcoMSwgdXJpLmhvc3QubGVuZ3RoIC0gMSkucmVwbGFjZSgvOy9nLCAnOicpO1xuICAgICAgICB1cmkuYXV0aG9yaXR5ID0gdXJpLmF1dGhvcml0eS5yZXBsYWNlKCdbJywgJycpLnJlcGxhY2UoJ10nLCAnJykucmVwbGFjZSgvOy9nLCAnOicpO1xuICAgICAgICB1cmkuaXB2NnVyaSA9IHRydWU7XG4gICAgfVxuXG4gICAgdXJpLnBhdGhOYW1lcyA9IHBhdGhOYW1lcyh1cmksIHVyaVsncGF0aCddKTtcbiAgICB1cmkucXVlcnlLZXkgPSBxdWVyeUtleSh1cmksIHVyaVsncXVlcnknXSk7XG5cbiAgICByZXR1cm4gdXJpO1xufTtcblxuZnVuY3Rpb24gcGF0aE5hbWVzKG9iaiwgcGF0aCkge1xuICAgIHZhciByZWd4ID0gL1xcL3syLDl9L2csXG4gICAgICAgIG5hbWVzID0gcGF0aC5yZXBsYWNlKHJlZ3gsIFwiL1wiKS5zcGxpdChcIi9cIik7XG5cbiAgICBpZiAocGF0aC5zdWJzdHIoMCwgMSkgPT0gJy8nIHx8IHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIG5hbWVzLnNwbGljZSgwLCAxKTtcbiAgICB9XG4gICAgaWYgKHBhdGguc3Vic3RyKHBhdGgubGVuZ3RoIC0gMSwgMSkgPT0gJy8nKSB7XG4gICAgICAgIG5hbWVzLnNwbGljZShuYW1lcy5sZW5ndGggLSAxLCAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmFtZXM7XG59XG5cbmZ1bmN0aW9uIHF1ZXJ5S2V5KHVyaSwgcXVlcnkpIHtcbiAgICB2YXIgZGF0YSA9IHt9O1xuXG4gICAgcXVlcnkucmVwbGFjZSgvKD86XnwmKShbXiY9XSopPT8oW14mXSopL2csIGZ1bmN0aW9uICgkMCwgJDEsICQyKSB7XG4gICAgICAgIGlmICgkMSkge1xuICAgICAgICAgICAgZGF0YVskMV0gPSAkMjtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRhdGE7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU29ja2V0ID0gZXhwb3J0cy5pbyA9IGV4cG9ydHMuTWFuYWdlciA9IGV4cG9ydHMucHJvdG9jb2wgPSB2b2lkIDA7XG5jb25zdCB1cmxfMSA9IHJlcXVpcmUoXCIuL3VybFwiKTtcbmNvbnN0IG1hbmFnZXJfMSA9IHJlcXVpcmUoXCIuL21hbmFnZXJcIik7XG5jb25zdCBzb2NrZXRfMSA9IHJlcXVpcmUoXCIuL3NvY2tldFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlNvY2tldFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc29ja2V0XzEuU29ja2V0OyB9IH0pO1xuY29uc3QgZGVidWcgPSByZXF1aXJlKFwiZGVidWdcIikoXCJzb2NrZXQuaW8tY2xpZW50XCIpO1xuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gbG9va3VwO1xuLyoqXG4gKiBNYW5hZ2VycyBjYWNoZS5cbiAqL1xuY29uc3QgY2FjaGUgPSAoZXhwb3J0cy5tYW5hZ2VycyA9IHt9KTtcbmZ1bmN0aW9uIGxvb2t1cCh1cmksIG9wdHMpIHtcbiAgICBpZiAodHlwZW9mIHVyaSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBvcHRzID0gdXJpO1xuICAgICAgICB1cmkgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuICAgIGNvbnN0IHBhcnNlZCA9IHVybF8xLnVybCh1cmksIG9wdHMucGF0aCk7XG4gICAgY29uc3Qgc291cmNlID0gcGFyc2VkLnNvdXJjZTtcbiAgICBjb25zdCBpZCA9IHBhcnNlZC5pZDtcbiAgICBjb25zdCBwYXRoID0gcGFyc2VkLnBhdGg7XG4gICAgY29uc3Qgc2FtZU5hbWVzcGFjZSA9IGNhY2hlW2lkXSAmJiBwYXRoIGluIGNhY2hlW2lkXVtcIm5zcHNcIl07XG4gICAgY29uc3QgbmV3Q29ubmVjdGlvbiA9IG9wdHMuZm9yY2VOZXcgfHxcbiAgICAgICAgb3B0c1tcImZvcmNlIG5ldyBjb25uZWN0aW9uXCJdIHx8XG4gICAgICAgIGZhbHNlID09PSBvcHRzLm11bHRpcGxleCB8fFxuICAgICAgICBzYW1lTmFtZXNwYWNlO1xuICAgIGxldCBpbztcbiAgICBpZiAobmV3Q29ubmVjdGlvbikge1xuICAgICAgICBkZWJ1ZyhcImlnbm9yaW5nIHNvY2tldCBjYWNoZSBmb3IgJXNcIiwgc291cmNlKTtcbiAgICAgICAgaW8gPSBuZXcgbWFuYWdlcl8xLk1hbmFnZXIoc291cmNlLCBvcHRzKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmICghY2FjaGVbaWRdKSB7XG4gICAgICAgICAgICBkZWJ1ZyhcIm5ldyBpbyBpbnN0YW5jZSBmb3IgJXNcIiwgc291cmNlKTtcbiAgICAgICAgICAgIGNhY2hlW2lkXSA9IG5ldyBtYW5hZ2VyXzEuTWFuYWdlcihzb3VyY2UsIG9wdHMpO1xuICAgICAgICB9XG4gICAgICAgIGlvID0gY2FjaGVbaWRdO1xuICAgIH1cbiAgICBpZiAocGFyc2VkLnF1ZXJ5ICYmICFvcHRzLnF1ZXJ5KSB7XG4gICAgICAgIG9wdHMucXVlcnkgPSBwYXJzZWQucXVlcnlLZXk7XG4gICAgfVxuICAgIHJldHVybiBpby5zb2NrZXQocGFyc2VkLnBhdGgsIG9wdHMpO1xufVxuZXhwb3J0cy5pbyA9IGxvb2t1cDtcbi8qKlxuICogUHJvdG9jb2wgdmVyc2lvbi5cbiAqXG4gKiBAcHVibGljXG4gKi9cbnZhciBzb2NrZXRfaW9fcGFyc2VyXzEgPSByZXF1aXJlKFwic29ja2V0LmlvLXBhcnNlclwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInByb3RvY29sXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzb2NrZXRfaW9fcGFyc2VyXzEucHJvdG9jb2w7IH0gfSk7XG4vKipcbiAqIGBjb25uZWN0YC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJpXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydHMuY29ubmVjdCA9IGxvb2t1cDtcbi8qKlxuICogRXhwb3NlIGNvbnN0cnVjdG9ycyBmb3Igc3RhbmRhbG9uZSBidWlsZC5cbiAqXG4gKiBAcHVibGljXG4gKi9cbnZhciBtYW5hZ2VyXzIgPSByZXF1aXJlKFwiLi9tYW5hZ2VyXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTWFuYWdlclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWFuYWdlcl8yLk1hbmFnZXI7IH0gfSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTWFuYWdlciA9IHZvaWQgMDtcbmNvbnN0IGVpbyA9IHJlcXVpcmUoXCJlbmdpbmUuaW8tY2xpZW50XCIpO1xuY29uc3Qgc29ja2V0XzEgPSByZXF1aXJlKFwiLi9zb2NrZXRcIik7XG5jb25zdCBFbWl0dGVyID0gcmVxdWlyZShcImNvbXBvbmVudC1lbWl0dGVyXCIpO1xuY29uc3QgcGFyc2VyID0gcmVxdWlyZShcInNvY2tldC5pby1wYXJzZXJcIik7XG5jb25zdCBvbl8xID0gcmVxdWlyZShcIi4vb25cIik7XG5jb25zdCBCYWNrb2ZmID0gcmVxdWlyZShcImJhY2tvMlwiKTtcbmNvbnN0IGRlYnVnID0gcmVxdWlyZShcImRlYnVnXCIpKFwic29ja2V0LmlvLWNsaWVudDptYW5hZ2VyXCIpO1xuY2xhc3MgTWFuYWdlciBleHRlbmRzIEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKHVyaSwgb3B0cykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLm5zcHMgPSB7fTtcbiAgICAgICAgdGhpcy5zdWJzID0gW107XG4gICAgICAgIGlmICh1cmkgJiYgXCJvYmplY3RcIiA9PT0gdHlwZW9mIHVyaSkge1xuICAgICAgICAgICAgb3B0cyA9IHVyaTtcbiAgICAgICAgICAgIHVyaSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICAgICAgb3B0cy5wYXRoID0gb3B0cy5wYXRoIHx8IFwiL3NvY2tldC5pb1wiO1xuICAgICAgICB0aGlzLm9wdHMgPSBvcHRzO1xuICAgICAgICB0aGlzLnJlY29ubmVjdGlvbihvcHRzLnJlY29ubmVjdGlvbiAhPT0gZmFsc2UpO1xuICAgICAgICB0aGlzLnJlY29ubmVjdGlvbkF0dGVtcHRzKG9wdHMucmVjb25uZWN0aW9uQXR0ZW1wdHMgfHwgSW5maW5pdHkpO1xuICAgICAgICB0aGlzLnJlY29ubmVjdGlvbkRlbGF5KG9wdHMucmVjb25uZWN0aW9uRGVsYXkgfHwgMTAwMCk7XG4gICAgICAgIHRoaXMucmVjb25uZWN0aW9uRGVsYXlNYXgob3B0cy5yZWNvbm5lY3Rpb25EZWxheU1heCB8fCA1MDAwKTtcbiAgICAgICAgdGhpcy5yYW5kb21pemF0aW9uRmFjdG9yKG9wdHMucmFuZG9taXphdGlvbkZhY3RvciB8fCAwLjUpO1xuICAgICAgICB0aGlzLmJhY2tvZmYgPSBuZXcgQmFja29mZih7XG4gICAgICAgICAgICBtaW46IHRoaXMucmVjb25uZWN0aW9uRGVsYXkoKSxcbiAgICAgICAgICAgIG1heDogdGhpcy5yZWNvbm5lY3Rpb25EZWxheU1heCgpLFxuICAgICAgICAgICAgaml0dGVyOiB0aGlzLnJhbmRvbWl6YXRpb25GYWN0b3IoKSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudGltZW91dChudWxsID09IG9wdHMudGltZW91dCA/IDIwMDAwIDogb3B0cy50aW1lb3V0KTtcbiAgICAgICAgdGhpcy5fcmVhZHlTdGF0ZSA9IFwiY2xvc2VkXCI7XG4gICAgICAgIHRoaXMudXJpID0gdXJpO1xuICAgICAgICBjb25zdCBfcGFyc2VyID0gb3B0cy5wYXJzZXIgfHwgcGFyc2VyO1xuICAgICAgICB0aGlzLmVuY29kZXIgPSBuZXcgX3BhcnNlci5FbmNvZGVyKCk7XG4gICAgICAgIHRoaXMuZGVjb2RlciA9IG5ldyBfcGFyc2VyLkRlY29kZXIoKTtcbiAgICAgICAgdGhpcy5fYXV0b0Nvbm5lY3QgPSBvcHRzLmF1dG9Db25uZWN0ICE9PSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuX2F1dG9Db25uZWN0KVxuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuICAgIHJlY29ubmVjdGlvbih2KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb247XG4gICAgICAgIHRoaXMuX3JlY29ubmVjdGlvbiA9ICEhdjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlY29ubmVjdGlvbkF0dGVtcHRzKHYpIHtcbiAgICAgICAgaWYgKHYgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb25BdHRlbXB0cztcbiAgICAgICAgdGhpcy5fcmVjb25uZWN0aW9uQXR0ZW1wdHMgPSB2O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVjb25uZWN0aW9uRGVsYXkodikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh2ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uRGVsYXk7XG4gICAgICAgIHRoaXMuX3JlY29ubmVjdGlvbkRlbGF5ID0gdjtcbiAgICAgICAgKF9hID0gdGhpcy5iYWNrb2ZmKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2V0TWluKHYpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmFuZG9taXphdGlvbkZhY3Rvcih2KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKHYgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yYW5kb21pemF0aW9uRmFjdG9yO1xuICAgICAgICB0aGlzLl9yYW5kb21pemF0aW9uRmFjdG9yID0gdjtcbiAgICAgICAgKF9hID0gdGhpcy5iYWNrb2ZmKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2V0Sml0dGVyKHYpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVjb25uZWN0aW9uRGVsYXlNYXgodikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh2ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uRGVsYXlNYXg7XG4gICAgICAgIHRoaXMuX3JlY29ubmVjdGlvbkRlbGF5TWF4ID0gdjtcbiAgICAgICAgKF9hID0gdGhpcy5iYWNrb2ZmKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2V0TWF4KHYpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdGltZW91dCh2KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90aW1lb3V0O1xuICAgICAgICB0aGlzLl90aW1lb3V0ID0gdjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyB0cnlpbmcgdG8gcmVjb25uZWN0IGlmIHJlY29ubmVjdGlvbiBpcyBlbmFibGVkIGFuZCB3ZSBoYXZlIG5vdFxuICAgICAqIHN0YXJ0ZWQgcmVjb25uZWN0aW5nIHlldFxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBtYXliZVJlY29ubmVjdE9uT3BlbigpIHtcbiAgICAgICAgLy8gT25seSB0cnkgdG8gcmVjb25uZWN0IGlmIGl0J3MgdGhlIGZpcnN0IHRpbWUgd2UncmUgY29ubmVjdGluZ1xuICAgICAgICBpZiAoIXRoaXMuX3JlY29ubmVjdGluZyAmJlxuICAgICAgICAgICAgdGhpcy5fcmVjb25uZWN0aW9uICYmXG4gICAgICAgICAgICB0aGlzLmJhY2tvZmYuYXR0ZW1wdHMgPT09IDApIHtcbiAgICAgICAgICAgIC8vIGtlZXBzIHJlY29ubmVjdGlvbiBmcm9tIGZpcmluZyB0d2ljZSBmb3IgdGhlIHNhbWUgcmVjb25uZWN0aW9uIGxvb3BcbiAgICAgICAgICAgIHRoaXMucmVjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgY3VycmVudCB0cmFuc3BvcnQgYHNvY2tldGAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIG9wdGlvbmFsLCBjYWxsYmFja1xuICAgICAqIEByZXR1cm4gc2VsZlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBvcGVuKGZuKSB7XG4gICAgICAgIGRlYnVnKFwicmVhZHlTdGF0ZSAlc1wiLCB0aGlzLl9yZWFkeVN0YXRlKTtcbiAgICAgICAgaWYgKH50aGlzLl9yZWFkeVN0YXRlLmluZGV4T2YoXCJvcGVuXCIpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIGRlYnVnKFwib3BlbmluZyAlc1wiLCB0aGlzLnVyaSk7XG4gICAgICAgIHRoaXMuZW5naW5lID0gZWlvKHRoaXMudXJpLCB0aGlzLm9wdHMpO1xuICAgICAgICBjb25zdCBzb2NrZXQgPSB0aGlzLmVuZ2luZTtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuX3JlYWR5U3RhdGUgPSBcIm9wZW5pbmdcIjtcbiAgICAgICAgdGhpcy5za2lwUmVjb25uZWN0ID0gZmFsc2U7XG4gICAgICAgIC8vIGVtaXQgYG9wZW5gXG4gICAgICAgIGNvbnN0IG9wZW5TdWJEZXN0cm95ID0gb25fMS5vbihzb2NrZXQsIFwib3BlblwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLm9ub3BlbigpO1xuICAgICAgICAgICAgZm4gJiYgZm4oKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGVtaXQgYGVycm9yYFxuICAgICAgICBjb25zdCBlcnJvclN1YiA9IG9uXzEub24oc29ja2V0LCBcImVycm9yXCIsIChlcnIpID0+IHtcbiAgICAgICAgICAgIGRlYnVnKFwiZXJyb3JcIik7XG4gICAgICAgICAgICBzZWxmLmNsZWFudXAoKTtcbiAgICAgICAgICAgIHNlbGYuX3JlYWR5U3RhdGUgPSBcImNsb3NlZFwiO1xuICAgICAgICAgICAgc3VwZXIuZW1pdChcImVycm9yXCIsIGVycik7XG4gICAgICAgICAgICBpZiAoZm4pIHtcbiAgICAgICAgICAgICAgICBmbihlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gT25seSBkbyB0aGlzIGlmIHRoZXJlIGlzIG5vIGZuIHRvIGhhbmRsZSB0aGUgZXJyb3JcbiAgICAgICAgICAgICAgICBzZWxmLm1heWJlUmVjb25uZWN0T25PcGVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZmFsc2UgIT09IHRoaXMuX3RpbWVvdXQpIHtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVvdXQgPSB0aGlzLl90aW1lb3V0O1xuICAgICAgICAgICAgZGVidWcoXCJjb25uZWN0IGF0dGVtcHQgd2lsbCB0aW1lb3V0IGFmdGVyICVkXCIsIHRpbWVvdXQpO1xuICAgICAgICAgICAgaWYgKHRpbWVvdXQgPT09IDApIHtcbiAgICAgICAgICAgICAgICBvcGVuU3ViRGVzdHJveSgpOyAvLyBwcmV2ZW50cyBhIHJhY2UgY29uZGl0aW9uIHdpdGggdGhlICdvcGVuJyBldmVudFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gc2V0IHRpbWVyXG4gICAgICAgICAgICBjb25zdCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRlYnVnKFwiY29ubmVjdCBhdHRlbXB0IHRpbWVkIG91dCBhZnRlciAlZFwiLCB0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICBvcGVuU3ViRGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIHNvY2tldC5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIHNvY2tldC5lbWl0KFwiZXJyb3JcIiwgbmV3IEVycm9yKFwidGltZW91dFwiKSk7XG4gICAgICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgICAgICAgIHRoaXMuc3Vicy5wdXNoKGZ1bmN0aW9uIHN1YkRlc3Ryb3koKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3Vicy5wdXNoKG9wZW5TdWJEZXN0cm95KTtcbiAgICAgICAgdGhpcy5zdWJzLnB1c2goZXJyb3JTdWIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIG9wZW4oKVxuICAgICAqXG4gICAgICogQHJldHVybiBzZWxmXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGNvbm5lY3QoZm4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3Blbihmbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIHRyYW5zcG9ydCBvcGVuLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbm9wZW4oKSB7XG4gICAgICAgIGRlYnVnKFwib3BlblwiKTtcbiAgICAgICAgLy8gY2xlYXIgb2xkIHN1YnNcbiAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgICAgIC8vIG1hcmsgYXMgb3BlblxuICAgICAgICB0aGlzLl9yZWFkeVN0YXRlID0gXCJvcGVuXCI7XG4gICAgICAgIHN1cGVyLmVtaXQoXCJvcGVuXCIpO1xuICAgICAgICAvLyBhZGQgbmV3IHN1YnNcbiAgICAgICAgY29uc3Qgc29ja2V0ID0gdGhpcy5lbmdpbmU7XG4gICAgICAgIHRoaXMuc3Vicy5wdXNoKG9uXzEub24oc29ja2V0LCBcInBpbmdcIiwgdGhpcy5vbnBpbmcuYmluZCh0aGlzKSksIG9uXzEub24oc29ja2V0LCBcImRhdGFcIiwgdGhpcy5vbmRhdGEuYmluZCh0aGlzKSksIG9uXzEub24oc29ja2V0LCBcImVycm9yXCIsIHRoaXMub25lcnJvci5iaW5kKHRoaXMpKSwgb25fMS5vbihzb2NrZXQsIFwiY2xvc2VcIiwgdGhpcy5vbmNsb3NlLmJpbmQodGhpcykpLCBvbl8xLm9uKHRoaXMuZGVjb2RlciwgXCJkZWNvZGVkXCIsIHRoaXMub25kZWNvZGVkLmJpbmQodGhpcykpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gYSBwaW5nLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbnBpbmcoKSB7XG4gICAgICAgIHN1cGVyLmVtaXQoXCJwaW5nXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2l0aCBkYXRhLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmRhdGEoZGF0YSkge1xuICAgICAgICB0aGlzLmRlY29kZXIuYWRkKGRhdGEpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiBwYXJzZXIgZnVsbHkgZGVjb2RlcyBhIHBhY2tldC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25kZWNvZGVkKHBhY2tldCkge1xuICAgICAgICBzdXBlci5lbWl0KFwicGFja2V0XCIsIHBhY2tldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIHNvY2tldCBlcnJvci5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25lcnJvcihlcnIpIHtcbiAgICAgICAgZGVidWcoXCJlcnJvclwiLCBlcnIpO1xuICAgICAgICBzdXBlci5lbWl0KFwiZXJyb3JcIiwgZXJyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBzb2NrZXQgZm9yIHRoZSBnaXZlbiBgbnNwYC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1NvY2tldH1cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgc29ja2V0KG5zcCwgb3B0cykge1xuICAgICAgICBsZXQgc29ja2V0ID0gdGhpcy5uc3BzW25zcF07XG4gICAgICAgIGlmICghc29ja2V0KSB7XG4gICAgICAgICAgICBzb2NrZXQgPSBuZXcgc29ja2V0XzEuU29ja2V0KHRoaXMsIG5zcCwgb3B0cyk7XG4gICAgICAgICAgICB0aGlzLm5zcHNbbnNwXSA9IHNvY2tldDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc29ja2V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBhIHNvY2tldCBjbG9zZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzb2NrZXRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9kZXN0cm95KHNvY2tldCkge1xuICAgICAgICBjb25zdCBuc3BzID0gT2JqZWN0LmtleXModGhpcy5uc3BzKTtcbiAgICAgICAgZm9yIChjb25zdCBuc3Agb2YgbnNwcykge1xuICAgICAgICAgICAgY29uc3Qgc29ja2V0ID0gdGhpcy5uc3BzW25zcF07XG4gICAgICAgICAgICBpZiAoc29ja2V0LmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIGRlYnVnKFwic29ja2V0ICVzIGlzIHN0aWxsIGFjdGl2ZSwgc2tpcHBpbmcgY2xvc2VcIiwgbnNwKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2xvc2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV3JpdGVzIGEgcGFja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhY2tldFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3BhY2tldChwYWNrZXQpIHtcbiAgICAgICAgZGVidWcoXCJ3cml0aW5nIHBhY2tldCAlalwiLCBwYWNrZXQpO1xuICAgICAgICBjb25zdCBlbmNvZGVkUGFja2V0cyA9IHRoaXMuZW5jb2Rlci5lbmNvZGUocGFja2V0KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbmNvZGVkUGFja2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5lbmdpbmUud3JpdGUoZW5jb2RlZFBhY2tldHNbaV0sIHBhY2tldC5vcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbGVhbiB1cCB0cmFuc3BvcnQgc3Vic2NyaXB0aW9ucyBhbmQgcGFja2V0IGJ1ZmZlci5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgY2xlYW51cCgpIHtcbiAgICAgICAgZGVidWcoXCJjbGVhbnVwXCIpO1xuICAgICAgICB0aGlzLnN1YnMuZm9yRWFjaCgoc3ViRGVzdHJveSkgPT4gc3ViRGVzdHJveSgpKTtcbiAgICAgICAgdGhpcy5zdWJzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuZGVjb2Rlci5kZXN0cm95KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb3NlIHRoZSBjdXJyZW50IHNvY2tldC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2Nsb3NlKCkge1xuICAgICAgICBkZWJ1ZyhcImRpc2Nvbm5lY3RcIik7XG4gICAgICAgIHRoaXMuc2tpcFJlY29ubmVjdCA9IHRydWU7XG4gICAgICAgIHRoaXMuX3JlY29ubmVjdGluZyA9IGZhbHNlO1xuICAgICAgICBpZiAoXCJvcGVuaW5nXCIgPT09IHRoaXMuX3JlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgIC8vIGBvbmNsb3NlYCB3aWxsIG5vdCBmaXJlIGJlY2F1c2VcbiAgICAgICAgICAgIC8vIGFuIG9wZW4gZXZlbnQgbmV2ZXIgaGFwcGVuZWRcbiAgICAgICAgICAgIHRoaXMuY2xlYW51cCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICAgICAgICB0aGlzLl9yZWFkeVN0YXRlID0gXCJjbG9zZWRcIjtcbiAgICAgICAgaWYgKHRoaXMuZW5naW5lKVxuICAgICAgICAgICAgdGhpcy5lbmdpbmUuY2xvc2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIGNsb3NlKClcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZGlzY29ubmVjdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Nsb3NlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGVuZ2luZSBjbG9zZS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25jbG9zZShyZWFzb24pIHtcbiAgICAgICAgZGVidWcoXCJvbmNsb3NlXCIpO1xuICAgICAgICB0aGlzLmNsZWFudXAoKTtcbiAgICAgICAgdGhpcy5iYWNrb2ZmLnJlc2V0KCk7XG4gICAgICAgIHRoaXMuX3JlYWR5U3RhdGUgPSBcImNsb3NlZFwiO1xuICAgICAgICBzdXBlci5lbWl0KFwiY2xvc2VcIiwgcmVhc29uKTtcbiAgICAgICAgaWYgKHRoaXMuX3JlY29ubmVjdGlvbiAmJiAhdGhpcy5za2lwUmVjb25uZWN0KSB7XG4gICAgICAgICAgICB0aGlzLnJlY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEF0dGVtcHQgYSByZWNvbm5lY3Rpb24uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHJlY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3JlY29ubmVjdGluZyB8fCB0aGlzLnNraXBSZWNvbm5lY3QpXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLmJhY2tvZmYuYXR0ZW1wdHMgPj0gdGhpcy5fcmVjb25uZWN0aW9uQXR0ZW1wdHMpIHtcbiAgICAgICAgICAgIGRlYnVnKFwicmVjb25uZWN0IGZhaWxlZFwiKTtcbiAgICAgICAgICAgIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICAgICAgICAgICAgc3VwZXIuZW1pdChcInJlY29ubmVjdF9mYWlsZWRcIik7XG4gICAgICAgICAgICB0aGlzLl9yZWNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGRlbGF5ID0gdGhpcy5iYWNrb2ZmLmR1cmF0aW9uKCk7XG4gICAgICAgICAgICBkZWJ1ZyhcIndpbGwgd2FpdCAlZG1zIGJlZm9yZSByZWNvbm5lY3QgYXR0ZW1wdFwiLCBkZWxheSk7XG4gICAgICAgICAgICB0aGlzLl9yZWNvbm5lY3RpbmcgPSB0cnVlO1xuICAgICAgICAgICAgY29uc3QgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5za2lwUmVjb25uZWN0KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgZGVidWcoXCJhdHRlbXB0aW5nIHJlY29ubmVjdFwiKTtcbiAgICAgICAgICAgICAgICBzdXBlci5lbWl0KFwicmVjb25uZWN0X2F0dGVtcHRcIiwgc2VsZi5iYWNrb2ZmLmF0dGVtcHRzKTtcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBhZ2FpbiBmb3IgdGhlIGNhc2Ugc29ja2V0IGNsb3NlZCBpbiBhYm92ZSBldmVudHNcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5za2lwUmVjb25uZWN0KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgc2VsZi5vcGVuKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVidWcoXCJyZWNvbm5lY3QgYXR0ZW1wdCBlcnJvclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3JlY29ubmVjdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZWNvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cGVyLmVtaXQoXCJyZWNvbm5lY3RfZXJyb3JcIiwgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnKFwicmVjb25uZWN0IHN1Y2Nlc3NcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm9ucmVjb25uZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIGRlbGF5KTtcbiAgICAgICAgICAgIHRoaXMuc3Vicy5wdXNoKGZ1bmN0aW9uIHN1YkRlc3Ryb3koKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIHN1Y2Nlc3NmdWwgcmVjb25uZWN0LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbnJlY29ubmVjdCgpIHtcbiAgICAgICAgY29uc3QgYXR0ZW1wdCA9IHRoaXMuYmFja29mZi5hdHRlbXB0cztcbiAgICAgICAgdGhpcy5fcmVjb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICAgICAgICBzdXBlci5lbWl0KFwicmVjb25uZWN0XCIsIGF0dGVtcHQpO1xuICAgIH1cbn1cbmV4cG9ydHMuTWFuYWdlciA9IE1hbmFnZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMub24gPSB2b2lkIDA7XG5mdW5jdGlvbiBvbihvYmosIGV2LCBmbikge1xuICAgIG9iai5vbihldiwgZm4pO1xuICAgIHJldHVybiBmdW5jdGlvbiBzdWJEZXN0cm95KCkge1xuICAgICAgICBvYmoub2ZmKGV2LCBmbik7XG4gICAgfTtcbn1cbmV4cG9ydHMub24gPSBvbjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Tb2NrZXQgPSB2b2lkIDA7XG5jb25zdCBzb2NrZXRfaW9fcGFyc2VyXzEgPSByZXF1aXJlKFwic29ja2V0LmlvLXBhcnNlclwiKTtcbmNvbnN0IEVtaXR0ZXIgPSByZXF1aXJlKFwiY29tcG9uZW50LWVtaXR0ZXJcIik7XG5jb25zdCBvbl8xID0gcmVxdWlyZShcIi4vb25cIik7XG5jb25zdCBkZWJ1ZyA9IHJlcXVpcmUoXCJkZWJ1Z1wiKShcInNvY2tldC5pby1jbGllbnQ6c29ja2V0XCIpO1xuLyoqXG4gKiBJbnRlcm5hbCBldmVudHMuXG4gKiBUaGVzZSBldmVudHMgY2FuJ3QgYmUgZW1pdHRlZCBieSB0aGUgdXNlci5cbiAqL1xuY29uc3QgUkVTRVJWRURfRVZFTlRTID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgY29ubmVjdDogMSxcbiAgICBjb25uZWN0X2Vycm9yOiAxLFxuICAgIGRpc2Nvbm5lY3Q6IDEsXG4gICAgZGlzY29ubmVjdGluZzogMSxcbiAgICAvLyBFdmVudEVtaXR0ZXIgcmVzZXJ2ZWQgZXZlbnRzOiBodHRwczovL25vZGVqcy5vcmcvYXBpL2V2ZW50cy5odG1sI2V2ZW50c19ldmVudF9uZXdsaXN0ZW5lclxuICAgIG5ld0xpc3RlbmVyOiAxLFxuICAgIHJlbW92ZUxpc3RlbmVyOiAxLFxufSk7XG5jbGFzcyBTb2NrZXQgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgICAvKipcbiAgICAgKiBgU29ja2V0YCBjb25zdHJ1Y3Rvci5cbiAgICAgKlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihpbywgbnNwLCBvcHRzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucmVjZWl2ZUJ1ZmZlciA9IFtdO1xuICAgICAgICB0aGlzLnNlbmRCdWZmZXIgPSBbXTtcbiAgICAgICAgdGhpcy5pZHMgPSAwO1xuICAgICAgICB0aGlzLmFja3MgPSB7fTtcbiAgICAgICAgdGhpcy5mbGFncyA9IHt9O1xuICAgICAgICB0aGlzLmlvID0gaW87XG4gICAgICAgIHRoaXMubnNwID0gbnNwO1xuICAgICAgICB0aGlzLmlkcyA9IDA7XG4gICAgICAgIHRoaXMuYWNrcyA9IHt9O1xuICAgICAgICB0aGlzLnJlY2VpdmVCdWZmZXIgPSBbXTtcbiAgICAgICAgdGhpcy5zZW5kQnVmZmVyID0gW107XG4gICAgICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZGlzY29ubmVjdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5mbGFncyA9IHt9O1xuICAgICAgICBpZiAob3B0cyAmJiBvcHRzLmF1dGgpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0aCA9IG9wdHMuYXV0aDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pby5fYXV0b0Nvbm5lY3QpXG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlIHRvIG9wZW4sIGNsb3NlIGFuZCBwYWNrZXQgZXZlbnRzXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHN1YkV2ZW50cygpIHtcbiAgICAgICAgaWYgKHRoaXMuc3VicylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgaW8gPSB0aGlzLmlvO1xuICAgICAgICB0aGlzLnN1YnMgPSBbXG4gICAgICAgICAgICBvbl8xLm9uKGlvLCBcIm9wZW5cIiwgdGhpcy5vbm9wZW4uYmluZCh0aGlzKSksXG4gICAgICAgICAgICBvbl8xLm9uKGlvLCBcInBhY2tldFwiLCB0aGlzLm9ucGFja2V0LmJpbmQodGhpcykpLFxuICAgICAgICAgICAgb25fMS5vbihpbywgXCJlcnJvclwiLCB0aGlzLm9uZXJyb3IuYmluZCh0aGlzKSksXG4gICAgICAgICAgICBvbl8xLm9uKGlvLCBcImNsb3NlXCIsIHRoaXMub25jbG9zZS5iaW5kKHRoaXMpKSxcbiAgICAgICAgXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgU29ja2V0IHdpbGwgdHJ5IHRvIHJlY29ubmVjdCB3aGVuIGl0cyBNYW5hZ2VyIGNvbm5lY3RzIG9yIHJlY29ubmVjdHNcbiAgICAgKi9cbiAgICBnZXQgYWN0aXZlKCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLnN1YnM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFwiT3BlbnNcIiB0aGUgc29ja2V0LlxuICAgICAqXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3RlZClcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB0aGlzLnN1YkV2ZW50cygpO1xuICAgICAgICBpZiAoIXRoaXMuaW9bXCJfcmVjb25uZWN0aW5nXCJdKVxuICAgICAgICAgICAgdGhpcy5pby5vcGVuKCk7IC8vIGVuc3VyZSBvcGVuXG4gICAgICAgIGlmIChcIm9wZW5cIiA9PT0gdGhpcy5pby5fcmVhZHlTdGF0ZSlcbiAgICAgICAgICAgIHRoaXMub25vcGVuKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3IgY29ubmVjdCgpXG4gICAgICovXG4gICAgb3BlbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIGBtZXNzYWdlYCBldmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4gc2VsZlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBzZW5kKC4uLmFyZ3MpIHtcbiAgICAgICAgYXJncy51bnNoaWZ0KFwibWVzc2FnZVwiKTtcbiAgICAgICAgdGhpcy5lbWl0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgYGVtaXRgLlxuICAgICAqIElmIHRoZSBldmVudCBpcyBpbiBgZXZlbnRzYCwgaXQncyBlbWl0dGVkIG5vcm1hbGx5LlxuICAgICAqXG4gICAgICogQHBhcmFtIGV2IC0gZXZlbnQgbmFtZVxuICAgICAqIEByZXR1cm4gc2VsZlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBlbWl0KGV2LCAuLi5hcmdzKSB7XG4gICAgICAgIGlmIChSRVNFUlZFRF9FVkVOVFMuaGFzT3duUHJvcGVydHkoZXYpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1wiJyArIGV2ICsgJ1wiIGlzIGEgcmVzZXJ2ZWQgZXZlbnQgbmFtZScpO1xuICAgICAgICB9XG4gICAgICAgIGFyZ3MudW5zaGlmdChldik7XG4gICAgICAgIGNvbnN0IHBhY2tldCA9IHtcbiAgICAgICAgICAgIHR5cGU6IHNvY2tldF9pb19wYXJzZXJfMS5QYWNrZXRUeXBlLkVWRU5ULFxuICAgICAgICAgICAgZGF0YTogYXJncyxcbiAgICAgICAgfTtcbiAgICAgICAgcGFja2V0Lm9wdGlvbnMgPSB7fTtcbiAgICAgICAgcGFja2V0Lm9wdGlvbnMuY29tcHJlc3MgPSB0aGlzLmZsYWdzLmNvbXByZXNzICE9PSBmYWxzZTtcbiAgICAgICAgLy8gZXZlbnQgYWNrIGNhbGxiYWNrXG4gICAgICAgIGlmIChcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0pIHtcbiAgICAgICAgICAgIGRlYnVnKFwiZW1pdHRpbmcgcGFja2V0IHdpdGggYWNrIGlkICVkXCIsIHRoaXMuaWRzKTtcbiAgICAgICAgICAgIHRoaXMuYWNrc1t0aGlzLmlkc10gPSBhcmdzLnBvcCgpO1xuICAgICAgICAgICAgcGFja2V0LmlkID0gdGhpcy5pZHMrKztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpc1RyYW5zcG9ydFdyaXRhYmxlID0gdGhpcy5pby5lbmdpbmUgJiZcbiAgICAgICAgICAgIHRoaXMuaW8uZW5naW5lLnRyYW5zcG9ydCAmJlxuICAgICAgICAgICAgdGhpcy5pby5lbmdpbmUudHJhbnNwb3J0LndyaXRhYmxlO1xuICAgICAgICBjb25zdCBkaXNjYXJkUGFja2V0ID0gdGhpcy5mbGFncy52b2xhdGlsZSAmJiAoIWlzVHJhbnNwb3J0V3JpdGFibGUgfHwgIXRoaXMuY29ubmVjdGVkKTtcbiAgICAgICAgaWYgKGRpc2NhcmRQYWNrZXQpIHtcbiAgICAgICAgICAgIGRlYnVnKFwiZGlzY2FyZCBwYWNrZXQgYXMgdGhlIHRyYW5zcG9ydCBpcyBub3QgY3VycmVudGx5IHdyaXRhYmxlXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnBhY2tldChwYWNrZXQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZW5kQnVmZmVyLnB1c2gocGFja2V0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZsYWdzID0ge307XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIHBhY2tldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYWNrZXRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHBhY2tldChwYWNrZXQpIHtcbiAgICAgICAgcGFja2V0Lm5zcCA9IHRoaXMubnNwO1xuICAgICAgICB0aGlzLmlvLl9wYWNrZXQocGFja2V0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gZW5naW5lIGBvcGVuYC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25vcGVuKCkge1xuICAgICAgICBkZWJ1ZyhcInRyYW5zcG9ydCBpcyBvcGVuIC0gY29ubmVjdGluZ1wiKTtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmF1dGggPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aGlzLmF1dGgoKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhY2tldCh7IHR5cGU6IHNvY2tldF9pb19wYXJzZXJfMS5QYWNrZXRUeXBlLkNPTk5FQ1QsIGRhdGEgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGFja2V0KHsgdHlwZTogc29ja2V0X2lvX3BhcnNlcl8xLlBhY2tldFR5cGUuQ09OTkVDVCwgZGF0YTogdGhpcy5hdXRoIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGVuZ2luZSBvciBtYW5hZ2VyIGBlcnJvcmAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXJyXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmVycm9yKGVycikge1xuICAgICAgICBpZiAoIXRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICBzdXBlci5lbWl0KFwiY29ubmVjdF9lcnJvclwiLCBlcnIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGVuZ2luZSBgY2xvc2VgLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlYXNvblxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25jbG9zZShyZWFzb24pIHtcbiAgICAgICAgZGVidWcoXCJjbG9zZSAoJXMpXCIsIHJlYXNvbik7XG4gICAgICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZGlzY29ubmVjdGVkID0gdHJ1ZTtcbiAgICAgICAgZGVsZXRlIHRoaXMuaWQ7XG4gICAgICAgIHN1cGVyLmVtaXQoXCJkaXNjb25uZWN0XCIsIHJlYXNvbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aXRoIHNvY2tldCBwYWNrZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGFja2V0XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbnBhY2tldChwYWNrZXQpIHtcbiAgICAgICAgY29uc3Qgc2FtZU5hbWVzcGFjZSA9IHBhY2tldC5uc3AgPT09IHRoaXMubnNwO1xuICAgICAgICBpZiAoIXNhbWVOYW1lc3BhY2UpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHN3aXRjaCAocGFja2V0LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2Ugc29ja2V0X2lvX3BhcnNlcl8xLlBhY2tldFR5cGUuQ09OTkVDVDpcbiAgICAgICAgICAgICAgICBpZiAocGFja2V0LmRhdGEgJiYgcGFja2V0LmRhdGEuc2lkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkID0gcGFja2V0LmRhdGEuc2lkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uY29ubmVjdChpZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdXBlci5lbWl0KFwiY29ubmVjdF9lcnJvclwiLCBuZXcgRXJyb3IoXCJJdCBzZWVtcyB5b3UgYXJlIHRyeWluZyB0byByZWFjaCBhIFNvY2tldC5JTyBzZXJ2ZXIgaW4gdjIueCB3aXRoIGEgdjMueCBjbGllbnQsIGJ1dCB0aGV5IGFyZSBub3QgY29tcGF0aWJsZSAobW9yZSBpbmZvcm1hdGlvbiBoZXJlOiBodHRwczovL3NvY2tldC5pby9kb2NzL3YzL21pZ3JhdGluZy1mcm9tLTIteC10by0zLTAvKVwiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBzb2NrZXRfaW9fcGFyc2VyXzEuUGFja2V0VHlwZS5FVkVOVDpcbiAgICAgICAgICAgICAgICB0aGlzLm9uZXZlbnQocGFja2V0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2Ugc29ja2V0X2lvX3BhcnNlcl8xLlBhY2tldFR5cGUuQklOQVJZX0VWRU5UOlxuICAgICAgICAgICAgICAgIHRoaXMub25ldmVudChwYWNrZXQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBzb2NrZXRfaW9fcGFyc2VyXzEuUGFja2V0VHlwZS5BQ0s6XG4gICAgICAgICAgICAgICAgdGhpcy5vbmFjayhwYWNrZXQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBzb2NrZXRfaW9fcGFyc2VyXzEuUGFja2V0VHlwZS5CSU5BUllfQUNLOlxuICAgICAgICAgICAgICAgIHRoaXMub25hY2socGFja2V0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2Ugc29ja2V0X2lvX3BhcnNlcl8xLlBhY2tldFR5cGUuRElTQ09OTkVDVDpcbiAgICAgICAgICAgICAgICB0aGlzLm9uZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBzb2NrZXRfaW9fcGFyc2VyXzEuUGFja2V0VHlwZS5DT05ORUNUX0VSUk9SOlxuICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihwYWNrZXQuZGF0YS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgZXJyLmRhdGEgPSBwYWNrZXQuZGF0YS5kYXRhO1xuICAgICAgICAgICAgICAgIHN1cGVyLmVtaXQoXCJjb25uZWN0X2Vycm9yXCIsIGVycik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gYSBzZXJ2ZXIgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGFja2V0XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmV2ZW50KHBhY2tldCkge1xuICAgICAgICBjb25zdCBhcmdzID0gcGFja2V0LmRhdGEgfHwgW107XG4gICAgICAgIGRlYnVnKFwiZW1pdHRpbmcgZXZlbnQgJWpcIiwgYXJncyk7XG4gICAgICAgIGlmIChudWxsICE9IHBhY2tldC5pZCkge1xuICAgICAgICAgICAgZGVidWcoXCJhdHRhY2hpbmcgYWNrIGNhbGxiYWNrIHRvIGV2ZW50XCIpO1xuICAgICAgICAgICAgYXJncy5wdXNoKHRoaXMuYWNrKHBhY2tldC5pZCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5lbWl0RXZlbnQoYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlY2VpdmVCdWZmZXIucHVzaChPYmplY3QuZnJlZXplKGFyZ3MpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbWl0RXZlbnQoYXJncykge1xuICAgICAgICBpZiAodGhpcy5fYW55TGlzdGVuZXJzICYmIHRoaXMuX2FueUxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2FueUxpc3RlbmVycy5zbGljZSgpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiBsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzdXBlci5lbWl0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQcm9kdWNlcyBhbiBhY2sgY2FsbGJhY2sgdG8gZW1pdCB3aXRoIGFuIGV2ZW50LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBhY2soaWQpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCBzZW50ID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgICAgICAgLy8gcHJldmVudCBkb3VibGUgY2FsbGJhY2tzXG4gICAgICAgICAgICBpZiAoc2VudClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBzZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIGRlYnVnKFwic2VuZGluZyBhY2sgJWpcIiwgYXJncyk7XG4gICAgICAgICAgICBzZWxmLnBhY2tldCh7XG4gICAgICAgICAgICAgICAgdHlwZTogc29ja2V0X2lvX3BhcnNlcl8xLlBhY2tldFR5cGUuQUNLLFxuICAgICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgICBkYXRhOiBhcmdzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGEgc2VydmVyIGFja25vd2xlZ2VtZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhY2tldFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25hY2socGFja2V0KSB7XG4gICAgICAgIGNvbnN0IGFjayA9IHRoaXMuYWNrc1twYWNrZXQuaWRdO1xuICAgICAgICBpZiAoXCJmdW5jdGlvblwiID09PSB0eXBlb2YgYWNrKSB7XG4gICAgICAgICAgICBkZWJ1ZyhcImNhbGxpbmcgYWNrICVzIHdpdGggJWpcIiwgcGFja2V0LmlkLCBwYWNrZXQuZGF0YSk7XG4gICAgICAgICAgICBhY2suYXBwbHkodGhpcywgcGFja2V0LmRhdGEpO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuYWNrc1twYWNrZXQuaWRdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGVidWcoXCJiYWQgYWNrICVzXCIsIHBhY2tldC5pZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gc2VydmVyIGNvbm5lY3QuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uY29ubmVjdChpZCkge1xuICAgICAgICBkZWJ1ZyhcInNvY2tldCBjb25uZWN0ZWQgd2l0aCBpZCAlc1wiLCBpZCk7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmRpc2Nvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICBzdXBlci5lbWl0KFwiY29ubmVjdFwiKTtcbiAgICAgICAgdGhpcy5lbWl0QnVmZmVyZWQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRW1pdCBidWZmZXJlZCBldmVudHMgKHJlY2VpdmVkIGFuZCBlbWl0dGVkKS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZW1pdEJ1ZmZlcmVkKCkge1xuICAgICAgICB0aGlzLnJlY2VpdmVCdWZmZXIuZm9yRWFjaCgoYXJncykgPT4gdGhpcy5lbWl0RXZlbnQoYXJncykpO1xuICAgICAgICB0aGlzLnJlY2VpdmVCdWZmZXIgPSBbXTtcbiAgICAgICAgdGhpcy5zZW5kQnVmZmVyLmZvckVhY2goKHBhY2tldCkgPT4gdGhpcy5wYWNrZXQocGFja2V0KSk7XG4gICAgICAgIHRoaXMuc2VuZEJ1ZmZlciA9IFtdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBzZXJ2ZXIgZGlzY29ubmVjdC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25kaXNjb25uZWN0KCkge1xuICAgICAgICBkZWJ1ZyhcInNlcnZlciBkaXNjb25uZWN0ICglcylcIiwgdGhpcy5uc3ApO1xuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5vbmNsb3NlKFwiaW8gc2VydmVyIGRpc2Nvbm5lY3RcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGZvcmNlZCBjbGllbnQvc2VydmVyIHNpZGUgZGlzY29ubmVjdGlvbnMsXG4gICAgICogdGhpcyBtZXRob2QgZW5zdXJlcyB0aGUgbWFuYWdlciBzdG9wcyB0cmFja2luZyB1cyBhbmRcbiAgICAgKiB0aGF0IHJlY29ubmVjdGlvbnMgZG9uJ3QgZ2V0IHRyaWdnZXJlZCBmb3IgdGhpcy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vicykge1xuICAgICAgICAgICAgLy8gY2xlYW4gc3Vic2NyaXB0aW9ucyB0byBhdm9pZCByZWNvbm5lY3Rpb25zXG4gICAgICAgICAgICB0aGlzLnN1YnMuZm9yRWFjaCgoc3ViRGVzdHJveSkgPT4gc3ViRGVzdHJveSgpKTtcbiAgICAgICAgICAgIHRoaXMuc3VicyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlvW1wiX2Rlc3Ryb3lcIl0odGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc2Nvbm5lY3RzIHRoZSBzb2NrZXQgbWFudWFsbHkuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHNlbGZcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgZGlzY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICBkZWJ1ZyhcInBlcmZvcm1pbmcgZGlzY29ubmVjdCAoJXMpXCIsIHRoaXMubnNwKTtcbiAgICAgICAgICAgIHRoaXMucGFja2V0KHsgdHlwZTogc29ja2V0X2lvX3BhcnNlcl8xLlBhY2tldFR5cGUuRElTQ09OTkVDVCB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyByZW1vdmUgc29ja2V0IGZyb20gcG9vbFxuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICAvLyBmaXJlIGV2ZW50c1xuICAgICAgICAgICAgdGhpcy5vbmNsb3NlKFwiaW8gY2xpZW50IGRpc2Nvbm5lY3RcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsaWFzIGZvciBkaXNjb25uZWN0KClcbiAgICAgKlxuICAgICAqIEByZXR1cm4gc2VsZlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzY29ubmVjdCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBjb21wcmVzcyBmbGFnLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbXByZXNzIC0gaWYgYHRydWVgLCBjb21wcmVzc2VzIHRoZSBzZW5kaW5nIGRhdGFcbiAgICAgKiBAcmV0dXJuIHNlbGZcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgY29tcHJlc3MoY29tcHJlc3MpIHtcbiAgICAgICAgdGhpcy5mbGFncy5jb21wcmVzcyA9IGNvbXByZXNzO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyBhIG1vZGlmaWVyIGZvciBhIHN1YnNlcXVlbnQgZXZlbnQgZW1pc3Npb24gdGhhdCB0aGUgZXZlbnQgbWVzc2FnZSB3aWxsIGJlIGRyb3BwZWQgd2hlbiB0aGlzIHNvY2tldCBpcyBub3RcbiAgICAgKiByZWFkeSB0byBzZW5kIG1lc3NhZ2VzLlxuICAgICAqXG4gICAgICogQHJldHVybnMgc2VsZlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBnZXQgdm9sYXRpbGUoKSB7XG4gICAgICAgIHRoaXMuZmxhZ3Mudm9sYXRpbGUgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBmaXJlZCB3aGVuIGFueSBldmVudCBpcyBlbWl0dGVkLiBUaGUgZXZlbnQgbmFtZSBpcyBwYXNzZWQgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZVxuICAgICAqIGNhbGxiYWNrLlxuICAgICAqXG4gICAgICogQHBhcmFtIGxpc3RlbmVyXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIG9uQW55KGxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMuX2FueUxpc3RlbmVycyA9IHRoaXMuX2FueUxpc3RlbmVycyB8fCBbXTtcbiAgICAgICAgdGhpcy5fYW55TGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBmaXJlZCB3aGVuIGFueSBldmVudCBpcyBlbWl0dGVkLiBUaGUgZXZlbnQgbmFtZSBpcyBwYXNzZWQgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZVxuICAgICAqIGNhbGxiYWNrLiBUaGUgbGlzdGVuZXIgaXMgYWRkZWQgdG8gdGhlIGJlZ2lubmluZyBvZiB0aGUgbGlzdGVuZXJzIGFycmF5LlxuICAgICAqXG4gICAgICogQHBhcmFtIGxpc3RlbmVyXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHByZXBlbmRBbnkobGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5fYW55TGlzdGVuZXJzID0gdGhpcy5fYW55TGlzdGVuZXJzIHx8IFtdO1xuICAgICAgICB0aGlzLl9hbnlMaXN0ZW5lcnMudW5zaGlmdChsaXN0ZW5lcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgZmlyZWQgd2hlbiBhbnkgZXZlbnQgaXMgZW1pdHRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsaXN0ZW5lclxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBvZmZBbnkobGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hbnlMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsaXN0ZW5lcikge1xuICAgICAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fYW55TGlzdGVuZXJzO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIgPT09IGxpc3RlbmVyc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9hbnlMaXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgdGhhdCBhcmUgbGlzdGVuaW5nIGZvciBhbnkgZXZlbnQgdGhhdCBpcyBzcGVjaWZpZWQuIFRoaXMgYXJyYXkgY2FuIGJlIG1hbmlwdWxhdGVkLFxuICAgICAqIGUuZy4gdG8gcmVtb3ZlIGxpc3RlbmVycy5cbiAgICAgKlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBsaXN0ZW5lcnNBbnkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hbnlMaXN0ZW5lcnMgfHwgW107XG4gICAgfVxufVxuZXhwb3J0cy5Tb2NrZXQgPSBTb2NrZXQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudXJsID0gdm9pZCAwO1xuY29uc3QgcGFyc2V1cmkgPSByZXF1aXJlKFwicGFyc2V1cmlcIik7XG5jb25zdCBkZWJ1ZyA9IHJlcXVpcmUoXCJkZWJ1Z1wiKShcInNvY2tldC5pby1jbGllbnQ6dXJsXCIpO1xuLyoqXG4gKiBVUkwgcGFyc2VyLlxuICpcbiAqIEBwYXJhbSB1cmkgLSB1cmxcbiAqIEBwYXJhbSBwYXRoIC0gdGhlIHJlcXVlc3QgcGF0aCBvZiB0aGUgY29ubmVjdGlvblxuICogQHBhcmFtIGxvYyAtIEFuIG9iamVjdCBtZWFudCB0byBtaW1pYyB3aW5kb3cubG9jYXRpb24uXG4gKiAgICAgICAgRGVmYXVsdHMgdG8gd2luZG93LmxvY2F0aW9uLlxuICogQHB1YmxpY1xuICovXG5mdW5jdGlvbiB1cmwodXJpLCBwYXRoID0gXCJcIiwgbG9jKSB7XG4gICAgbGV0IG9iaiA9IHVyaTtcbiAgICAvLyBkZWZhdWx0IHRvIHdpbmRvdy5sb2NhdGlvblxuICAgIGxvYyA9IGxvYyB8fCAodHlwZW9mIGxvY2F0aW9uICE9PSBcInVuZGVmaW5lZFwiICYmIGxvY2F0aW9uKTtcbiAgICBpZiAobnVsbCA9PSB1cmkpXG4gICAgICAgIHVyaSA9IGxvYy5wcm90b2NvbCArIFwiLy9cIiArIGxvYy5ob3N0O1xuICAgIC8vIHJlbGF0aXZlIHBhdGggc3VwcG9ydFxuICAgIGlmICh0eXBlb2YgdXJpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmIChcIi9cIiA9PT0gdXJpLmNoYXJBdCgwKSkge1xuICAgICAgICAgICAgaWYgKFwiL1wiID09PSB1cmkuY2hhckF0KDEpKSB7XG4gICAgICAgICAgICAgICAgdXJpID0gbG9jLnByb3RvY29sICsgdXJpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdXJpID0gbG9jLmhvc3QgKyB1cmk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEvXihodHRwcz98d3NzPyk6XFwvXFwvLy50ZXN0KHVyaSkpIHtcbiAgICAgICAgICAgIGRlYnVnKFwicHJvdG9jb2wtbGVzcyB1cmwgJXNcIiwgdXJpKTtcbiAgICAgICAgICAgIGlmIChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgbG9jKSB7XG4gICAgICAgICAgICAgICAgdXJpID0gbG9jLnByb3RvY29sICsgXCIvL1wiICsgdXJpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdXJpID0gXCJodHRwczovL1wiICsgdXJpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHBhcnNlXG4gICAgICAgIGRlYnVnKFwicGFyc2UgJXNcIiwgdXJpKTtcbiAgICAgICAgb2JqID0gcGFyc2V1cmkodXJpKTtcbiAgICB9XG4gICAgLy8gbWFrZSBzdXJlIHdlIHRyZWF0IGBsb2NhbGhvc3Q6ODBgIGFuZCBgbG9jYWxob3N0YCBlcXVhbGx5XG4gICAgaWYgKCFvYmoucG9ydCkge1xuICAgICAgICBpZiAoL14oaHR0cHx3cykkLy50ZXN0KG9iai5wcm90b2NvbCkpIHtcbiAgICAgICAgICAgIG9iai5wb3J0ID0gXCI4MFwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKC9eKGh0dHB8d3MpcyQvLnRlc3Qob2JqLnByb3RvY29sKSkge1xuICAgICAgICAgICAgb2JqLnBvcnQgPSBcIjQ0M1wiO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9iai5wYXRoID0gb2JqLnBhdGggfHwgXCIvXCI7XG4gICAgY29uc3QgaXB2NiA9IG9iai5ob3N0LmluZGV4T2YoXCI6XCIpICE9PSAtMTtcbiAgICBjb25zdCBob3N0ID0gaXB2NiA/IFwiW1wiICsgb2JqLmhvc3QgKyBcIl1cIiA6IG9iai5ob3N0O1xuICAgIC8vIGRlZmluZSB1bmlxdWUgaWRcbiAgICBvYmouaWQgPSBvYmoucHJvdG9jb2wgKyBcIjovL1wiICsgaG9zdCArIFwiOlwiICsgb2JqLnBvcnQgKyBwYXRoO1xuICAgIC8vIGRlZmluZSBocmVmXG4gICAgb2JqLmhyZWYgPVxuICAgICAgICBvYmoucHJvdG9jb2wgK1xuICAgICAgICAgICAgXCI6Ly9cIiArXG4gICAgICAgICAgICBob3N0ICtcbiAgICAgICAgICAgIChsb2MgJiYgbG9jLnBvcnQgPT09IG9iai5wb3J0ID8gXCJcIiA6IFwiOlwiICsgb2JqLnBvcnQpO1xuICAgIHJldHVybiBvYmo7XG59XG5leHBvcnRzLnVybCA9IHVybDtcbiIsImltcG9ydCBpbyBmcm9tIFwiLi9idWlsZC9pbmRleC5qc1wiO1xuXG5leHBvcnQgY29uc3QgTWFuYWdlciA9IGlvLk1hbmFnZXI7XG5leHBvcnQgeyBpbyB9O1xuZXhwb3J0IGRlZmF1bHQgaW87XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmVjb25zdHJ1Y3RQYWNrZXQgPSBleHBvcnRzLmRlY29uc3RydWN0UGFja2V0ID0gdm9pZCAwO1xuY29uc3QgaXNfYmluYXJ5XzEgPSByZXF1aXJlKFwiLi9pcy1iaW5hcnlcIik7XG4vKipcbiAqIFJlcGxhY2VzIGV2ZXJ5IEJ1ZmZlciB8IEFycmF5QnVmZmVyIHwgQmxvYiB8IEZpbGUgaW4gcGFja2V0IHdpdGggYSBudW1iZXJlZCBwbGFjZWhvbGRlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0IC0gc29ja2V0LmlvIGV2ZW50IHBhY2tldFxuICogQHJldHVybiB7T2JqZWN0fSB3aXRoIGRlY29uc3RydWN0ZWQgcGFja2V0IGFuZCBsaXN0IG9mIGJ1ZmZlcnNcbiAqIEBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gZGVjb25zdHJ1Y3RQYWNrZXQocGFja2V0KSB7XG4gICAgY29uc3QgYnVmZmVycyA9IFtdO1xuICAgIGNvbnN0IHBhY2tldERhdGEgPSBwYWNrZXQuZGF0YTtcbiAgICBjb25zdCBwYWNrID0gcGFja2V0O1xuICAgIHBhY2suZGF0YSA9IF9kZWNvbnN0cnVjdFBhY2tldChwYWNrZXREYXRhLCBidWZmZXJzKTtcbiAgICBwYWNrLmF0dGFjaG1lbnRzID0gYnVmZmVycy5sZW5ndGg7IC8vIG51bWJlciBvZiBiaW5hcnkgJ2F0dGFjaG1lbnRzJ1xuICAgIHJldHVybiB7IHBhY2tldDogcGFjaywgYnVmZmVyczogYnVmZmVycyB9O1xufVxuZXhwb3J0cy5kZWNvbnN0cnVjdFBhY2tldCA9IGRlY29uc3RydWN0UGFja2V0O1xuZnVuY3Rpb24gX2RlY29uc3RydWN0UGFja2V0KGRhdGEsIGJ1ZmZlcnMpIHtcbiAgICBpZiAoIWRhdGEpXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIGlmIChpc19iaW5hcnlfMS5pc0JpbmFyeShkYXRhKSkge1xuICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IHsgX3BsYWNlaG9sZGVyOiB0cnVlLCBudW06IGJ1ZmZlcnMubGVuZ3RoIH07XG4gICAgICAgIGJ1ZmZlcnMucHVzaChkYXRhKTtcbiAgICAgICAgcmV0dXJuIHBsYWNlaG9sZGVyO1xuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICAgIGNvbnN0IG5ld0RhdGEgPSBuZXcgQXJyYXkoZGF0YS5sZW5ndGgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG5ld0RhdGFbaV0gPSBfZGVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtpXSwgYnVmZmVycyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld0RhdGE7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkYXRhID09PSBcIm9iamVjdFwiICYmICEoZGF0YSBpbnN0YW5jZW9mIERhdGUpKSB7XG4gICAgICAgIGNvbnN0IG5ld0RhdGEgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIG5ld0RhdGFba2V5XSA9IF9kZWNvbnN0cnVjdFBhY2tldChkYXRhW2tleV0sIGJ1ZmZlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdEYXRhO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbn1cbi8qKlxuICogUmVjb25zdHJ1Y3RzIGEgYmluYXJ5IHBhY2tldCBmcm9tIGl0cyBwbGFjZWhvbGRlciBwYWNrZXQgYW5kIGJ1ZmZlcnNcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0IC0gZXZlbnQgcGFja2V0IHdpdGggcGxhY2Vob2xkZXJzXG4gKiBAcGFyYW0ge0FycmF5fSBidWZmZXJzIC0gYmluYXJ5IGJ1ZmZlcnMgdG8gcHV0IGluIHBsYWNlaG9sZGVyIHBvc2l0aW9uc1xuICogQHJldHVybiB7T2JqZWN0fSByZWNvbnN0cnVjdGVkIHBhY2tldFxuICogQHB1YmxpY1xuICovXG5mdW5jdGlvbiByZWNvbnN0cnVjdFBhY2tldChwYWNrZXQsIGJ1ZmZlcnMpIHtcbiAgICBwYWNrZXQuZGF0YSA9IF9yZWNvbnN0cnVjdFBhY2tldChwYWNrZXQuZGF0YSwgYnVmZmVycyk7XG4gICAgcGFja2V0LmF0dGFjaG1lbnRzID0gdW5kZWZpbmVkOyAvLyBubyBsb25nZXIgdXNlZnVsXG4gICAgcmV0dXJuIHBhY2tldDtcbn1cbmV4cG9ydHMucmVjb25zdHJ1Y3RQYWNrZXQgPSByZWNvbnN0cnVjdFBhY2tldDtcbmZ1bmN0aW9uIF9yZWNvbnN0cnVjdFBhY2tldChkYXRhLCBidWZmZXJzKSB7XG4gICAgaWYgKCFkYXRhKVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICBpZiAoZGF0YSAmJiBkYXRhLl9wbGFjZWhvbGRlcikge1xuICAgICAgICByZXR1cm4gYnVmZmVyc1tkYXRhLm51bV07IC8vIGFwcHJvcHJpYXRlIGJ1ZmZlciAoc2hvdWxkIGJlIG5hdHVyYWwgb3JkZXIgYW55d2F5KVxuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZGF0YVtpXSA9IF9yZWNvbnN0cnVjdFBhY2tldChkYXRhW2ldLCBidWZmZXJzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGF0YSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgZGF0YVtrZXldID0gX3JlY29uc3RydWN0UGFja2V0KGRhdGFba2V5XSwgYnVmZmVycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRGVjb2RlciA9IGV4cG9ydHMuRW5jb2RlciA9IGV4cG9ydHMuUGFja2V0VHlwZSA9IGV4cG9ydHMucHJvdG9jb2wgPSB2b2lkIDA7XG5jb25zdCBFbWl0dGVyID0gcmVxdWlyZShcImNvbXBvbmVudC1lbWl0dGVyXCIpO1xuY29uc3QgYmluYXJ5XzEgPSByZXF1aXJlKFwiLi9iaW5hcnlcIik7XG5jb25zdCBpc19iaW5hcnlfMSA9IHJlcXVpcmUoXCIuL2lzLWJpbmFyeVwiKTtcbmNvbnN0IGRlYnVnID0gcmVxdWlyZShcImRlYnVnXCIpKFwic29ja2V0LmlvLXBhcnNlclwiKTtcbi8qKlxuICogUHJvdG9jb2wgdmVyc2lvbi5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydHMucHJvdG9jb2wgPSA1O1xudmFyIFBhY2tldFR5cGU7XG4oZnVuY3Rpb24gKFBhY2tldFR5cGUpIHtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJDT05ORUNUXCJdID0gMF0gPSBcIkNPTk5FQ1RcIjtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJESVNDT05ORUNUXCJdID0gMV0gPSBcIkRJU0NPTk5FQ1RcIjtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJFVkVOVFwiXSA9IDJdID0gXCJFVkVOVFwiO1xuICAgIFBhY2tldFR5cGVbUGFja2V0VHlwZVtcIkFDS1wiXSA9IDNdID0gXCJBQ0tcIjtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJDT05ORUNUX0VSUk9SXCJdID0gNF0gPSBcIkNPTk5FQ1RfRVJST1JcIjtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJCSU5BUllfRVZFTlRcIl0gPSA1XSA9IFwiQklOQVJZX0VWRU5UXCI7XG4gICAgUGFja2V0VHlwZVtQYWNrZXRUeXBlW1wiQklOQVJZX0FDS1wiXSA9IDZdID0gXCJCSU5BUllfQUNLXCI7XG59KShQYWNrZXRUeXBlID0gZXhwb3J0cy5QYWNrZXRUeXBlIHx8IChleHBvcnRzLlBhY2tldFR5cGUgPSB7fSkpO1xuLyoqXG4gKiBBIHNvY2tldC5pbyBFbmNvZGVyIGluc3RhbmNlXG4gKi9cbmNsYXNzIEVuY29kZXIge1xuICAgIC8qKlxuICAgICAqIEVuY29kZSBhIHBhY2tldCBhcyBhIHNpbmdsZSBzdHJpbmcgaWYgbm9uLWJpbmFyeSwgb3IgYXMgYVxuICAgICAqIGJ1ZmZlciBzZXF1ZW5jZSwgZGVwZW5kaW5nIG9uIHBhY2tldCB0eXBlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iaiAtIHBhY2tldCBvYmplY3RcbiAgICAgKi9cbiAgICBlbmNvZGUob2JqKSB7XG4gICAgICAgIGRlYnVnKFwiZW5jb2RpbmcgcGFja2V0ICVqXCIsIG9iaik7XG4gICAgICAgIGlmIChvYmoudHlwZSA9PT0gUGFja2V0VHlwZS5FVkVOVCB8fCBvYmoudHlwZSA9PT0gUGFja2V0VHlwZS5BQ0spIHtcbiAgICAgICAgICAgIGlmIChpc19iaW5hcnlfMS5oYXNCaW5hcnkob2JqKSkge1xuICAgICAgICAgICAgICAgIG9iai50eXBlID1cbiAgICAgICAgICAgICAgICAgICAgb2JqLnR5cGUgPT09IFBhY2tldFR5cGUuRVZFTlRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gUGFja2V0VHlwZS5CSU5BUllfRVZFTlRcbiAgICAgICAgICAgICAgICAgICAgICAgIDogUGFja2V0VHlwZS5CSU5BUllfQUNLO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVuY29kZUFzQmluYXJ5KG9iaik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFt0aGlzLmVuY29kZUFzU3RyaW5nKG9iaildO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFbmNvZGUgcGFja2V0IGFzIHN0cmluZy5cbiAgICAgKi9cbiAgICBlbmNvZGVBc1N0cmluZyhvYmopIHtcbiAgICAgICAgLy8gZmlyc3QgaXMgdHlwZVxuICAgICAgICBsZXQgc3RyID0gXCJcIiArIG9iai50eXBlO1xuICAgICAgICAvLyBhdHRhY2htZW50cyBpZiB3ZSBoYXZlIHRoZW1cbiAgICAgICAgaWYgKG9iai50eXBlID09PSBQYWNrZXRUeXBlLkJJTkFSWV9FVkVOVCB8fFxuICAgICAgICAgICAgb2JqLnR5cGUgPT09IFBhY2tldFR5cGUuQklOQVJZX0FDSykge1xuICAgICAgICAgICAgc3RyICs9IG9iai5hdHRhY2htZW50cyArIFwiLVwiO1xuICAgICAgICB9XG4gICAgICAgIC8vIGlmIHdlIGhhdmUgYSBuYW1lc3BhY2Ugb3RoZXIgdGhhbiBgL2BcbiAgICAgICAgLy8gd2UgYXBwZW5kIGl0IGZvbGxvd2VkIGJ5IGEgY29tbWEgYCxgXG4gICAgICAgIGlmIChvYmoubnNwICYmIFwiL1wiICE9PSBvYmoubnNwKSB7XG4gICAgICAgICAgICBzdHIgKz0gb2JqLm5zcCArIFwiLFwiO1xuICAgICAgICB9XG4gICAgICAgIC8vIGltbWVkaWF0ZWx5IGZvbGxvd2VkIGJ5IHRoZSBpZFxuICAgICAgICBpZiAobnVsbCAhPSBvYmouaWQpIHtcbiAgICAgICAgICAgIHN0ciArPSBvYmouaWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8ganNvbiBkYXRhXG4gICAgICAgIGlmIChudWxsICE9IG9iai5kYXRhKSB7XG4gICAgICAgICAgICBzdHIgKz0gSlNPTi5zdHJpbmdpZnkob2JqLmRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGRlYnVnKFwiZW5jb2RlZCAlaiBhcyAlc1wiLCBvYmosIHN0cik7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVuY29kZSBwYWNrZXQgYXMgJ2J1ZmZlciBzZXF1ZW5jZScgYnkgcmVtb3ZpbmcgYmxvYnMsIGFuZFxuICAgICAqIGRlY29uc3RydWN0aW5nIHBhY2tldCBpbnRvIG9iamVjdCB3aXRoIHBsYWNlaG9sZGVycyBhbmRcbiAgICAgKiBhIGxpc3Qgb2YgYnVmZmVycy5cbiAgICAgKi9cbiAgICBlbmNvZGVBc0JpbmFyeShvYmopIHtcbiAgICAgICAgY29uc3QgZGVjb25zdHJ1Y3Rpb24gPSBiaW5hcnlfMS5kZWNvbnN0cnVjdFBhY2tldChvYmopO1xuICAgICAgICBjb25zdCBwYWNrID0gdGhpcy5lbmNvZGVBc1N0cmluZyhkZWNvbnN0cnVjdGlvbi5wYWNrZXQpO1xuICAgICAgICBjb25zdCBidWZmZXJzID0gZGVjb25zdHJ1Y3Rpb24uYnVmZmVycztcbiAgICAgICAgYnVmZmVycy51bnNoaWZ0KHBhY2spOyAvLyBhZGQgcGFja2V0IGluZm8gdG8gYmVnaW5uaW5nIG9mIGRhdGEgbGlzdFxuICAgICAgICByZXR1cm4gYnVmZmVyczsgLy8gd3JpdGUgYWxsIHRoZSBidWZmZXJzXG4gICAgfVxufVxuZXhwb3J0cy5FbmNvZGVyID0gRW5jb2Rlcjtcbi8qKlxuICogQSBzb2NrZXQuaW8gRGVjb2RlciBpbnN0YW5jZVxuICpcbiAqIEByZXR1cm4ge09iamVjdH0gZGVjb2RlclxuICovXG5jbGFzcyBEZWNvZGVyIGV4dGVuZHMgRW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlY29kZXMgYW4gZW5jb2RlZCBwYWNrZXQgc3RyaW5nIGludG8gcGFja2V0IEpTT04uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2JqIC0gZW5jb2RlZCBwYWNrZXRcbiAgICAgKi9cbiAgICBhZGQob2JqKSB7XG4gICAgICAgIGxldCBwYWNrZXQ7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JqID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBwYWNrZXQgPSB0aGlzLmRlY29kZVN0cmluZyhvYmopO1xuICAgICAgICAgICAgaWYgKHBhY2tldC50eXBlID09PSBQYWNrZXRUeXBlLkJJTkFSWV9FVkVOVCB8fFxuICAgICAgICAgICAgICAgIHBhY2tldC50eXBlID09PSBQYWNrZXRUeXBlLkJJTkFSWV9BQ0spIHtcbiAgICAgICAgICAgICAgICAvLyBiaW5hcnkgcGFja2V0J3MganNvblxuICAgICAgICAgICAgICAgIHRoaXMucmVjb25zdHJ1Y3RvciA9IG5ldyBCaW5hcnlSZWNvbnN0cnVjdG9yKHBhY2tldCk7XG4gICAgICAgICAgICAgICAgLy8gbm8gYXR0YWNobWVudHMsIGxhYmVsZWQgYmluYXJ5IGJ1dCBubyBiaW5hcnkgZGF0YSB0byBmb2xsb3dcbiAgICAgICAgICAgICAgICBpZiAocGFja2V0LmF0dGFjaG1lbnRzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1cGVyLmVtaXQoXCJkZWNvZGVkXCIsIHBhY2tldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gbm9uLWJpbmFyeSBmdWxsIHBhY2tldFxuICAgICAgICAgICAgICAgIHN1cGVyLmVtaXQoXCJkZWNvZGVkXCIsIHBhY2tldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNfYmluYXJ5XzEuaXNCaW5hcnkob2JqKSB8fCBvYmouYmFzZTY0KSB7XG4gICAgICAgICAgICAvLyByYXcgYmluYXJ5IGRhdGFcbiAgICAgICAgICAgIGlmICghdGhpcy5yZWNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZ290IGJpbmFyeSBkYXRhIHdoZW4gbm90IHJlY29uc3RydWN0aW5nIGEgcGFja2V0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFja2V0ID0gdGhpcy5yZWNvbnN0cnVjdG9yLnRha2VCaW5hcnlEYXRhKG9iaik7XG4gICAgICAgICAgICAgICAgaWYgKHBhY2tldCkge1xuICAgICAgICAgICAgICAgICAgICAvLyByZWNlaXZlZCBmaW5hbCBidWZmZXJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWNvbnN0cnVjdG9yID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIuZW1pdChcImRlY29kZWRcIiwgcGFja2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIHR5cGU6IFwiICsgb2JqKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWNvZGUgYSBwYWNrZXQgU3RyaW5nIChKU09OIGRhdGEpXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBwYWNrZXRcbiAgICAgKi9cbiAgICBkZWNvZGVTdHJpbmcoc3RyKSB7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgLy8gbG9vayB1cCB0eXBlXG4gICAgICAgIGNvbnN0IHAgPSB7XG4gICAgICAgICAgICB0eXBlOiBOdW1iZXIoc3RyLmNoYXJBdCgwKSksXG4gICAgICAgIH07XG4gICAgICAgIGlmIChQYWNrZXRUeXBlW3AudHlwZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidW5rbm93biBwYWNrZXQgdHlwZSBcIiArIHAudHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbG9vayB1cCBhdHRhY2htZW50cyBpZiB0eXBlIGJpbmFyeVxuICAgICAgICBpZiAocC50eXBlID09PSBQYWNrZXRUeXBlLkJJTkFSWV9FVkVOVCB8fFxuICAgICAgICAgICAgcC50eXBlID09PSBQYWNrZXRUeXBlLkJJTkFSWV9BQ0spIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gaSArIDE7XG4gICAgICAgICAgICB3aGlsZSAoc3RyLmNoYXJBdCgrK2kpICE9PSBcIi1cIiAmJiBpICE9IHN0ci5sZW5ndGgpIHsgfVxuICAgICAgICAgICAgY29uc3QgYnVmID0gc3RyLnN1YnN0cmluZyhzdGFydCwgaSk7XG4gICAgICAgICAgICBpZiAoYnVmICE9IE51bWJlcihidWYpIHx8IHN0ci5jaGFyQXQoaSkgIT09IFwiLVwiKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSWxsZWdhbCBhdHRhY2htZW50c1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHAuYXR0YWNobWVudHMgPSBOdW1iZXIoYnVmKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBsb29rIHVwIG5hbWVzcGFjZSAoaWYgYW55KVxuICAgICAgICBpZiAoXCIvXCIgPT09IHN0ci5jaGFyQXQoaSArIDEpKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IGkgKyAxO1xuICAgICAgICAgICAgd2hpbGUgKCsraSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGMgPSBzdHIuY2hhckF0KGkpO1xuICAgICAgICAgICAgICAgIGlmIChcIixcIiA9PT0gYylcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IHN0ci5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcC5uc3AgPSBzdHIuc3Vic3RyaW5nKHN0YXJ0LCBpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHAubnNwID0gXCIvXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbG9vayB1cCBpZFxuICAgICAgICBjb25zdCBuZXh0ID0gc3RyLmNoYXJBdChpICsgMSk7XG4gICAgICAgIGlmIChcIlwiICE9PSBuZXh0ICYmIE51bWJlcihuZXh0KSA9PSBuZXh0KSB7XG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IGkgKyAxO1xuICAgICAgICAgICAgd2hpbGUgKCsraSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGMgPSBzdHIuY2hhckF0KGkpO1xuICAgICAgICAgICAgICAgIGlmIChudWxsID09IGMgfHwgTnVtYmVyKGMpICE9IGMpIHtcbiAgICAgICAgICAgICAgICAgICAgLS1pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IHN0ci5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcC5pZCA9IE51bWJlcihzdHIuc3Vic3RyaW5nKHN0YXJ0LCBpICsgMSkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGxvb2sgdXAganNvbiBkYXRhXG4gICAgICAgIGlmIChzdHIuY2hhckF0KCsraSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHBheWxvYWQgPSB0cnlQYXJzZShzdHIuc3Vic3RyKGkpKTtcbiAgICAgICAgICAgIGlmIChEZWNvZGVyLmlzUGF5bG9hZFZhbGlkKHAudHlwZSwgcGF5bG9hZCkpIHtcbiAgICAgICAgICAgICAgICBwLmRhdGEgPSBwYXlsb2FkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBwYXlsb2FkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGRlYnVnKFwiZGVjb2RlZCAlcyBhcyAlalwiLCBzdHIsIHApO1xuICAgICAgICByZXR1cm4gcDtcbiAgICB9XG4gICAgc3RhdGljIGlzUGF5bG9hZFZhbGlkKHR5cGUsIHBheWxvYWQpIHtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQ09OTkVDVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIHBheWxvYWQgPT09IFwib2JqZWN0XCI7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuRElTQ09OTkVDVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gcGF5bG9hZCA9PT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkNPTk5FQ1RfRVJST1I6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBwYXlsb2FkID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiBwYXlsb2FkID09PSBcIm9iamVjdFwiO1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkVWRU5UOlxuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkJJTkFSWV9FVkVOVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShwYXlsb2FkKSAmJiBwYXlsb2FkLmxlbmd0aCA+IDA7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQUNLOlxuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkJJTkFSWV9BQ0s6XG4gICAgICAgICAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkocGF5bG9hZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVhbGxvY2F0ZXMgYSBwYXJzZXIncyByZXNvdXJjZXNcbiAgICAgKi9cbiAgICBkZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5yZWNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICB0aGlzLnJlY29uc3RydWN0b3IuZmluaXNoZWRSZWNvbnN0cnVjdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5EZWNvZGVyID0gRGVjb2RlcjtcbmZ1bmN0aW9uIHRyeVBhcnNlKHN0cikge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHN0cik7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG4vKipcbiAqIEEgbWFuYWdlciBvZiBhIGJpbmFyeSBldmVudCdzICdidWZmZXIgc2VxdWVuY2UnLiBTaG91bGRcbiAqIGJlIGNvbnN0cnVjdGVkIHdoZW5ldmVyIGEgcGFja2V0IG9mIHR5cGUgQklOQVJZX0VWRU5UIGlzXG4gKiBkZWNvZGVkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcbiAqIEByZXR1cm4ge0JpbmFyeVJlY29uc3RydWN0b3J9IGluaXRpYWxpemVkIHJlY29uc3RydWN0b3JcbiAqL1xuY2xhc3MgQmluYXJ5UmVjb25zdHJ1Y3RvciB7XG4gICAgY29uc3RydWN0b3IocGFja2V0KSB7XG4gICAgICAgIHRoaXMucGFja2V0ID0gcGFja2V0O1xuICAgICAgICB0aGlzLmJ1ZmZlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5yZWNvblBhY2sgPSBwYWNrZXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byBiZSBjYWxsZWQgd2hlbiBiaW5hcnkgZGF0YSByZWNlaXZlZCBmcm9tIGNvbm5lY3Rpb25cbiAgICAgKiBhZnRlciBhIEJJTkFSWV9FVkVOVCBwYWNrZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0J1ZmZlciB8IEFycmF5QnVmZmVyfSBiaW5EYXRhIC0gdGhlIHJhdyBiaW5hcnkgZGF0YSByZWNlaXZlZFxuICAgICAqIEByZXR1cm4ge251bGwgfCBPYmplY3R9IHJldHVybnMgbnVsbCBpZiBtb3JlIGJpbmFyeSBkYXRhIGlzIGV4cGVjdGVkIG9yXG4gICAgICogICBhIHJlY29uc3RydWN0ZWQgcGFja2V0IG9iamVjdCBpZiBhbGwgYnVmZmVycyBoYXZlIGJlZW4gcmVjZWl2ZWQuXG4gICAgICovXG4gICAgdGFrZUJpbmFyeURhdGEoYmluRGF0YSkge1xuICAgICAgICB0aGlzLmJ1ZmZlcnMucHVzaChiaW5EYXRhKTtcbiAgICAgICAgaWYgKHRoaXMuYnVmZmVycy5sZW5ndGggPT09IHRoaXMucmVjb25QYWNrLmF0dGFjaG1lbnRzKSB7XG4gICAgICAgICAgICAvLyBkb25lIHdpdGggYnVmZmVyIGxpc3RcbiAgICAgICAgICAgIGNvbnN0IHBhY2tldCA9IGJpbmFyeV8xLnJlY29uc3RydWN0UGFja2V0KHRoaXMucmVjb25QYWNrLCB0aGlzLmJ1ZmZlcnMpO1xuICAgICAgICAgICAgdGhpcy5maW5pc2hlZFJlY29uc3RydWN0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm4gcGFja2V0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbGVhbnMgdXAgYmluYXJ5IHBhY2tldCByZWNvbnN0cnVjdGlvbiB2YXJpYWJsZXMuXG4gICAgICovXG4gICAgZmluaXNoZWRSZWNvbnN0cnVjdGlvbigpIHtcbiAgICAgICAgdGhpcy5yZWNvblBhY2sgPSBudWxsO1xuICAgICAgICB0aGlzLmJ1ZmZlcnMgPSBbXTtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaGFzQmluYXJ5ID0gZXhwb3J0cy5pc0JpbmFyeSA9IHZvaWQgMDtcbmNvbnN0IHdpdGhOYXRpdmVBcnJheUJ1ZmZlciA9IHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gXCJmdW5jdGlvblwiO1xuY29uc3QgaXNWaWV3ID0gKG9iaikgPT4ge1xuICAgIHJldHVybiB0eXBlb2YgQXJyYXlCdWZmZXIuaXNWaWV3ID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgPyBBcnJheUJ1ZmZlci5pc1ZpZXcob2JqKVxuICAgICAgICA6IG9iai5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcjtcbn07XG5jb25zdCB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5jb25zdCB3aXRoTmF0aXZlQmxvYiA9IHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAodHlwZW9mIEJsb2IgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgdG9TdHJpbmcuY2FsbChCbG9iKSA9PT0gXCJbb2JqZWN0IEJsb2JDb25zdHJ1Y3Rvcl1cIik7XG5jb25zdCB3aXRoTmF0aXZlRmlsZSA9IHR5cGVvZiBGaWxlID09PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAodHlwZW9mIEZpbGUgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgdG9TdHJpbmcuY2FsbChGaWxlKSA9PT0gXCJbb2JqZWN0IEZpbGVDb25zdHJ1Y3Rvcl1cIik7XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBvYmogaXMgYSBCdWZmZXIsIGFuIEFycmF5QnVmZmVyLCBhIEJsb2Igb3IgYSBGaWxlLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGlzQmluYXJ5KG9iaikge1xuICAgIHJldHVybiAoKHdpdGhOYXRpdmVBcnJheUJ1ZmZlciAmJiAob2JqIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgfHwgaXNWaWV3KG9iaikpKSB8fFxuICAgICAgICAod2l0aE5hdGl2ZUJsb2IgJiYgb2JqIGluc3RhbmNlb2YgQmxvYikgfHxcbiAgICAgICAgKHdpdGhOYXRpdmVGaWxlICYmIG9iaiBpbnN0YW5jZW9mIEZpbGUpKTtcbn1cbmV4cG9ydHMuaXNCaW5hcnkgPSBpc0JpbmFyeTtcbmZ1bmN0aW9uIGhhc0JpbmFyeShvYmosIHRvSlNPTikge1xuICAgIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgaWYgKGhhc0JpbmFyeShvYmpbaV0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoaXNCaW5hcnkob2JqKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKG9iai50b0pTT04gJiZcbiAgICAgICAgdHlwZW9mIG9iai50b0pTT04gPT09IFwiZnVuY3Rpb25cIiAmJlxuICAgICAgICBhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBoYXNCaW5hcnkob2JqLnRvSlNPTigpLCB0cnVlKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpICYmIGhhc0JpbmFyeShvYmpba2V5XSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbmV4cG9ydHMuaGFzQmluYXJ5ID0gaGFzQmluYXJ5O1xuIiwiaW1wb3J0IGFwaSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgICAgICAgaW1wb3J0IGNvbnRlbnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuc2Nzc1wiO1xuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLmluc2VydCA9IFwiaGVhZFwiO1xub3B0aW9ucy5zaW5nbGV0b24gPSBmYWxzZTtcblxudmFyIHVwZGF0ZSA9IGFwaShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRlbnQubG9jYWxzIHx8IHt9OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgaXNPbGRJRSA9IGZ1bmN0aW9uIGlzT2xkSUUoKSB7XG4gIHZhciBtZW1vO1xuICByZXR1cm4gZnVuY3Rpb24gbWVtb3JpemUoKSB7XG4gICAgaWYgKHR5cGVvZiBtZW1vID09PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3NcbiAgICAgIC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcbiAgICAgIC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcbiAgICAgIC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuICAgICAgLy8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG4gICAgICBtZW1vID0gQm9vbGVhbih3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lbW87XG4gIH07XG59KCk7XG5cbnZhciBnZXRUYXJnZXQgPSBmdW5jdGlvbiBnZXRUYXJnZXQoKSB7XG4gIHZhciBtZW1vID0ge307XG4gIHJldHVybiBmdW5jdGlvbiBtZW1vcml6ZSh0YXJnZXQpIHtcbiAgICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbiAgfTtcbn0oKTtcblxudmFyIHN0eWxlc0luRG9tID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5Eb20ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5Eb21baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRvbVtpbmRleF0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5Eb21baW5kZXhdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVzSW5Eb20ucHVzaCh7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IGFkZFN0eWxlKG9iaiwgb3B0aW9ucyksXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIHZhciBhdHRyaWJ1dGVzID0gb3B0aW9ucy5hdHRyaWJ1dGVzIHx8IHt9O1xuXG4gIGlmICh0eXBlb2YgYXR0cmlidXRlcy5ub25jZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09ICd1bmRlZmluZWQnID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gICAgaWYgKG5vbmNlKSB7XG4gICAgICBhdHRyaWJ1dGVzLm5vbmNlID0gbm9uY2U7XG4gICAgfVxuICB9XG5cbiAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgc3R5bGUuc2V0QXR0cmlidXRlKGtleSwgYXR0cmlidXRlc1trZXldKTtcbiAgfSk7XG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIG9wdGlvbnMuaW5zZXJ0KHN0eWxlKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KG9wdGlvbnMuaW5zZXJ0IHx8ICdoZWFkJyk7XG5cbiAgICBpZiAoIXRhcmdldCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgICB9XG5cbiAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICB9XG5cbiAgcmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG52YXIgcmVwbGFjZVRleHQgPSBmdW5jdGlvbiByZXBsYWNlVGV4dCgpIHtcbiAgdmFyIHRleHRTdG9yZSA9IFtdO1xuICByZXR1cm4gZnVuY3Rpb24gcmVwbGFjZShpbmRleCwgcmVwbGFjZW1lbnQpIHtcbiAgICB0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG4gICAgcmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG4gIH07XG59KCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuICB2YXIgY3NzID0gcmVtb3ZlID8gJycgOiBvYmoubWVkaWEgPyBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpLmNvbmNhdChvYmouY3NzLCBcIn1cIikgOiBvYmouY3NzOyAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG4gIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuICAgIHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuICAgIGlmIChjaGlsZE5vZGVzW2luZGV4XSkge1xuICAgICAgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuICAgIH1cblxuICAgIGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgc3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGUsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gb2JqLmNzcztcbiAgdmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAobWVkaWEpIHtcbiAgICBzdHlsZS5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgbWVkaWEpO1xuICB9IGVsc2Uge1xuICAgIHN0eWxlLnJlbW92ZUF0dHJpYnV0ZSgnbWVkaWEnKTtcbiAgfVxuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZS5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhciBzaW5nbGV0b25Db3VudGVyID0gMDtcblxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBzdHlsZTtcbiAgdmFyIHVwZGF0ZTtcbiAgdmFyIHJlbW92ZTtcblxuICBpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcbiAgICB2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcbiAgICBzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcbiAgICB1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcbiAgICByZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuICB9IGVsc2Uge1xuICAgIHN0eWxlID0gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICAgIHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cbiAgICByZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuICAgIH07XG4gIH1cblxuICB1cGRhdGUob2JqKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB1cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlKCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9OyAvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cbiAgLy8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXG4gIGlmICghb3B0aW9ucy5zaW5nbGV0b24gJiYgdHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uICE9PSAnYm9vbGVhbicpIHtcbiAgICBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcbiAgfVxuXG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobmV3TGlzdCkgIT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5Eb21bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRG9tW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRG9tLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYWxwaGFiZXQgPSAnMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXotXycuc3BsaXQoJycpXG4gICwgbGVuZ3RoID0gNjRcbiAgLCBtYXAgPSB7fVxuICAsIHNlZWQgPSAwXG4gICwgaSA9IDBcbiAgLCBwcmV2O1xuXG4vKipcbiAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHNwZWNpZmllZCBudW1iZXIuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG51bSBUaGUgbnVtYmVyIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBudW1iZXIuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBlbmNvZGUobnVtKSB7XG4gIHZhciBlbmNvZGVkID0gJyc7XG5cbiAgZG8ge1xuICAgIGVuY29kZWQgPSBhbHBoYWJldFtudW0gJSBsZW5ndGhdICsgZW5jb2RlZDtcbiAgICBudW0gPSBNYXRoLmZsb29yKG51bSAvIGxlbmd0aCk7XG4gIH0gd2hpbGUgKG51bSA+IDApO1xuXG4gIHJldHVybiBlbmNvZGVkO1xufVxuXG4vKipcbiAqIFJldHVybiB0aGUgaW50ZWdlciB2YWx1ZSBzcGVjaWZpZWQgYnkgdGhlIGdpdmVuIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBpbnRlZ2VyIHZhbHVlIHJlcHJlc2VudGVkIGJ5IHRoZSBzdHJpbmcuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBkZWNvZGUoc3RyKSB7XG4gIHZhciBkZWNvZGVkID0gMDtcblxuICBmb3IgKGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgZGVjb2RlZCA9IGRlY29kZWQgKiBsZW5ndGggKyBtYXBbc3RyLmNoYXJBdChpKV07XG4gIH1cblxuICByZXR1cm4gZGVjb2RlZDtcbn1cblxuLyoqXG4gKiBZZWFzdDogQSB0aW55IGdyb3dpbmcgaWQgZ2VuZXJhdG9yLlxuICpcbiAqIEByZXR1cm5zIHtTdHJpbmd9IEEgdW5pcXVlIGlkLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24geWVhc3QoKSB7XG4gIHZhciBub3cgPSBlbmNvZGUoK25ldyBEYXRlKCkpO1xuXG4gIGlmIChub3cgIT09IHByZXYpIHJldHVybiBzZWVkID0gMCwgcHJldiA9IG5vdztcbiAgcmV0dXJuIG5vdyArJy4nKyBlbmNvZGUoc2VlZCsrKTtcbn1cblxuLy9cbi8vIE1hcCBlYWNoIGNoYXJhY3RlciB0byBpdHMgaW5kZXguXG4vL1xuZm9yICg7IGkgPCBsZW5ndGg7IGkrKykgbWFwW2FscGhhYmV0W2ldXSA9IGk7XG5cbi8vXG4vLyBFeHBvc2UgdGhlIGB5ZWFzdGAsIGBlbmNvZGVgIGFuZCBgZGVjb2RlYCBmdW5jdGlvbnMuXG4vL1xueWVhc3QuZW5jb2RlID0gZW5jb2RlO1xueWVhc3QuZGVjb2RlID0gZGVjb2RlO1xubW9kdWxlLmV4cG9ydHMgPSB5ZWFzdDtcbiIsImltcG9ydCBTcXVhcmUgZnJvbSBcIi4vc3F1YXJlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2FyZCB7XHJcbiAgICBjb25zdHJ1Y3RvcihwMSwgcDIpIHtcclxuICAgICAgICB0aGlzLndpZHRoID0gOTtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IDk7XHJcbiAgICAgICAgdGhpcy5wMSA9IHAxO1xyXG4gICAgICAgIHRoaXMucDIgPSBwMlxyXG4gICAgICAgIHRoaXMuZ3JpZCA9IEJvYXJkLm1ha2VHcmlkKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLndpbm5lciA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudXRpbDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQbGF5ZXJzKHBsYXllcjEsIHAxUG9zLCBwbGF5ZXIyLCBwMlBvcykge1xyXG4gICAgICAgIHRoaXMudXRpbC50cmFja0Z1bmN0aW9ucyhcInNldFBsYXllcnNcIik7XHJcbiAgICAgICAgLyogcDFQb3MgJiBwMlBvcyA9IFtyb3csIGNvbF0gKi9cclxuICAgICAgICBsZXQgZ3JpZFNxdWFyZTIgPSB0aGlzLmdyaWRbcDJQb3NbMF1dW3AyUG9zWzFdXTtcclxuICAgICAgICBsZXQgZ3JpZFNxdWFyZTEgPSB0aGlzLmdyaWRbcDFQb3NbMF1dW3AxUG9zWzFdXTtcclxuICAgICAgICBpZighIXBsYXllcjIpIHtcclxuICAgICAgICAgICAgZ3JpZFNxdWFyZTIubW9kZWwgPSBcInBlcnNvblwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdyaWRTcXVhcmUyLm1vZGVsID0gXCJhaVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighIXBsYXllcjEpIHtcclxuICAgICAgICAgICAgZ3JpZFNxdWFyZTEubW9kZWwgPSBcInBlcnNvblwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdyaWRTcXVhcmUxLm1vZGVsID0gXCJhaVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBncmlkU3F1YXJlMi5wbGF5ZXIgPSB0aGlzLnAyO1xyXG4gICAgICAgIGdyaWRTcXVhcmUxLnBsYXllciA9IHRoaXMucDE7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tOZWlnaGJvcnMoc3F1YXJlKSB7XHJcbiAgICAgICAgdGhpcy51dGlsLnRyYWNrRnVuY3Rpb25zKFwiY2hlY2tOZWlnaGJvcnNcIik7XHJcbiAgICAgICAgLyogXHJcbiAgICAgICAgcmVxdWlyZXMgW1tudW1dW251bV1dIFxyXG4gICAgICAgIHNxdWFyZSA9IFtyb3dJZHgsIGNvbElkeF1cclxuICAgICAgICAqL1xyXG4gICAgICAgIGxldCBuZWlnaGJvcnMgPSBbXTtcclxuICAgICAgICBsZXQgY29sSWR4ID0gc3F1YXJlWzFdO1xyXG4gICAgICAgIGxldCByb3dJZHggID0gc3F1YXJlWzBdO1xyXG4gICAgICAgIChyb3dJZHggLSAxID49IDApID8gbmVpZ2hib3JzLnB1c2goW3Jvd0lkeCAtIDEsIGNvbElkeF0pIDogbmVpZ2hib3JzLnB1c2goWy0xLCAtMV0pOyAgLy8gbm9ydGhcclxuICAgICAgICAocm93SWR4ICsgMSA8PSA4KSA/IG5laWdoYm9ycy5wdXNoKFtyb3dJZHggKyAxLCBjb2xJZHhdKSA6IG5laWdoYm9ycy5wdXNoKFstMSwgLTFdKTsgIC8vIHNvdXRoXHJcbiAgICAgICAgKGNvbElkeCAtIDEgPj0gMCkgPyBuZWlnaGJvcnMucHVzaChbcm93SWR4LCBjb2xJZHggLSAxXSkgOiBuZWlnaGJvcnMucHVzaChbLTEsIC0xXSk7ICAvLyB3ZXN0XHJcbiAgICAgICAgKGNvbElkeCArIDEgPD0gOCkgPyBuZWlnaGJvcnMucHVzaChbcm93SWR4LCBjb2xJZHggKyAxXSkgOiBuZWlnaGJvcnMucHVzaChbLTEsIC0xXSk7ICAvLyBlYXN0XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tDcm9zc1dhbGwobmVpZ2hib3JzKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja0Nyb3NzV2FsbChuZWlnaGJvcnMpIHtcclxuICAgICAgICByZXR1cm4gbmVpZ2hib3JzO1xyXG4gICAgfVxyXG5cclxuICAgIGlzV2FsbGVkKGRpciwgcm93SWR4LCBjb2xJZHgpIHtcclxuICAgICAgICB0aGlzLnV0aWwudHJhY2tGdW5jdGlvbnMoXCJpc1dhbGxlZFwiKTtcclxuICAgICAgICAvKiBcclxuICAgICAgICAgcmV0dXJucyB0cnVlIGlmIHBhdGggaXMgYmxvY2tlZCBieSB3YWxsXHJcbiAgICAgICAgIHJldHVybnMgZmFsc2UgaWYgcGF0aCBpcyBmcmVlXHJcbiAgICAgICAgKi9cclxuICAgICAgIFxyXG4gICAgICAgIGxldCBzcXVhcmUgPSB0aGlzLmdyaWRbcm93SWR4XVtjb2xJZHhdO1xyXG4gICAgICAgIGlmKGRpciA9PT0gXCJ1cFwiKSB7XHJcbiAgICAgICAgICAgIGlmKHNxdWFyZS53YWxscy5Ob3J0aCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGRpciA9PT0gXCJyaWdodFwiKSB7XHJcbiAgICAgICAgICAgIGlmKHNxdWFyZS53YWxscy5FYXN0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZGlyID09PSBcImRvd25cIikge1xyXG4gICAgICAgICAgICBpZihzcXVhcmUud2FsbHMuU291dGgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChkaXIgPT09IFwibGVmdFwiKSB7XHJcbiAgICAgICAgICAgIGlmKHNxdWFyZS53YWxscy5XZXN0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGJmcyhyb290LCBnb2FsID0gW1wiMDBcIixcIjAxXCIsXCIwMlwiLFwiMDNcIixcIjA0XCIsXCIwNVwiLFwiMDZcIixcIjA3XCIsXCIwOFwiXSkge1xyXG4gICAgICAgIHRoaXMudXRpbC50cmFja0Z1bmN0aW9ucyhcImJmc1wiKTtcclxuICAgICAgICAvKiBcclxuICAgICAgICByb290ID09PSBbcm93SWR4LCBjb2xJZHhdXHJcblxyXG4gICAgICAgIHRoaXMgZnVuY3Rpb24gaXMgc28gY3J1c3R5IFxyXG4gICAgICAgICovXHJcblxyXG5cclxuICAgICAgICBsZXQgaGFzaG1hcCA9IG5ldyBNYXAoKTsgXHJcbiAgICAgICAgbGV0IFEgPSBbXTsgLy9hcnJheSBvZiBbcm93LCBjb2xdXHJcbiAgICAgICAgbGV0IGRpc2NvdmVyZWQgPSBbXTsgLy9hcnJheSBvZiBpZFxyXG4gICAgICAgIGhhc2htYXAuc2V0KHJvb3QsIG51bGwpXHJcbiAgICAgICAgUS5wdXNoKHJvb3QpO1xyXG4gICAgICAgIGRpc2NvdmVyZWQucHVzaChyb290LmpvaW4oXCJcIikpO1xyXG4gICAgICAgIHdoaWxlIChRLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IHYgPSBRLnNoaWZ0KCk7IC8vIHBvc1xyXG4gICAgICAgICAgICBsZXQgaWQgPSB2LmpvaW4oXCJcIik7XHJcbiAgICAgICAgICAgIGxldCBzcXVhcmUgPSB0aGlzLmdyaWRbdlswXV1bdlsxXV07IC8vc3F1YXJlXHJcbiAgICAgICAgICAgIGlmIChnb2FsLmluY2x1ZGVzKGlkKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhdGggPSBbXTtcclxuICAgICAgICAgICAgICAgIHBhdGggPSB0aGlzLnRyYXZlcnNlSGFzaG1hcChoYXNobWFwLCB2LmpvaW4oXCJcIikpO1xyXG4gICAgICAgICAgICAgICAgcGF0aC5wdXNoKHYuam9pbihcIlwiKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW3Yuam9pbihcIlwiKSwgcGF0aF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gZmluZGluZyBhbGwgcG9zc2libGUgZGlyZWN0aW9uc1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKCghc3F1YXJlLndhbGxzLk5vcnRoICYmIChwYXJzZUludCh2WzBdKSA+IDApKSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3ViA9IHYuam9pbihcIlwiKS5zcGxpdChcIlwiKTtcclxuICAgICAgICAgICAgICAgIG5ld1ZbMF0gPSBwYXJzZUludChuZXdWWzBdKSAtIDE7XHJcbiAgICAgICAgICAgICAgICBpZCA9IG5ld1Yuam9pbihcIlwiKTtcclxuICAgICAgICAgICAgICAgIGlmICghZGlzY292ZXJlZC5pbmNsdWRlcyhpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNjb3ZlcmVkLnB1c2goaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIFEucHVzaChuZXdWKTtcclxuICAgICAgICAgICAgICAgICAgICBoYXNobWFwLnNldChuZXdWLmpvaW4oXCJcIiksIHYuam9pbihcIlwiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCghc3F1YXJlLndhbGxzLlNvdXRoICYmIChwYXJzZUludCh2WzBdKSA8IDgpKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1YgPSB2LmpvaW4oXCJcIikuc3BsaXQoXCJcIik7XHJcbiAgICAgICAgICAgICAgICBuZXdWWzBdID0gcGFyc2VJbnQobmV3VlswXSkgKyAxO1xyXG4gICAgICAgICAgICAgICAgaWQgPSBuZXdWLmpvaW4oXCJcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRpc2NvdmVyZWQuaW5jbHVkZXMoaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzY292ZXJlZC5wdXNoKGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBRLnB1c2gobmV3Vik7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzaG1hcC5zZXQobmV3Vi5qb2luKFwiXCIpLCB2LmpvaW4oXCJcIikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgoIXNxdWFyZS53YWxscy5FYXN0ICYmIChwYXJzZUludCh2WzFdKSA8IDgpKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1YgPSB2LmpvaW4oXCJcIikuc3BsaXQoXCJcIik7XHJcbiAgICAgICAgICAgICAgICBuZXdWWzFdID0gcGFyc2VJbnQobmV3VlsxXSkgKyAxO1xyXG4gICAgICAgICAgICAgICAgaWQgPSBuZXdWLmpvaW4oXCJcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRpc2NvdmVyZWQuaW5jbHVkZXMoaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzY292ZXJlZC5wdXNoKGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBRLnB1c2gobmV3Vik7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzaG1hcC5zZXQobmV3Vi5qb2luKFwiXCIpLCB2LmpvaW4oXCJcIikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgoIXNxdWFyZS53YWxscy5XZXN0ICYmIChwYXJzZUludCh2WzFdKSA+IDApKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1YgPSB2LmpvaW4oXCJcIikuc3BsaXQoXCJcIik7XHJcbiAgICAgICAgICAgICAgICBuZXdWWzFdID0gcGFyc2VJbnQobmV3VlsxXSkgLSAxO1xyXG4gICAgICAgICAgICAgICAgaWQgPSBuZXdWLmpvaW4oXCJcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRpc2NvdmVyZWQuaW5jbHVkZXMoaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzY292ZXJlZC5wdXNoKGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBRLnB1c2gobmV3Vik7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzaG1hcC5zZXQobmV3Vi5qb2luKFwiXCIpLCB2LmpvaW4oXCJcIikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB0cmF2ZXJzZUhhc2htYXAoaGFzaCwgc3RhcnQpIHtcclxuICAgICAgICB0aGlzLnV0aWwudHJhY2tGdW5jdGlvbnMoXCJ0cmF2ZXJzZUhhc2htYXBcIik7XHJcbiAgICAgICAgbGV0IG5vZGUgPSBoYXNoLmdldChzdGFydCk7XHJcbiAgICAgICAgbGV0IHBhdGggPSBbXTtcclxuICAgICAgICB3aGlsZSAobm9kZSkge1xyXG4gICAgICAgICAgICBwYXRoLnB1c2gobm9kZSlcclxuICAgICAgICAgICAgbm9kZSA9IGhhc2guZ2V0KG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGF0aC5yZXZlcnNlKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHN0YXRpYyBtYWtlR3JpZCh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgY29uc3QgZ3JpZCA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCByb3dJZHggPSAwOyByb3dJZHggPCBoZWlnaHQ7IHJvd0lkeCsrKSB7XHJcbiAgICAgICAgICAgIGdyaWQucHVzaChbXSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGNvbElkeCA9IDA7IGNvbElkeCA8IHdpZHRoOyBjb2xJZHgrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNxdWFyZSA9IG5ldyBTcXVhcmUoY29sSWR4ICwgcm93SWR4KVxyXG4gICAgICAgICAgICAgICAgZ3JpZFtyb3dJZHhdLnB1c2goc3F1YXJlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZ3JpZDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaXNWYWxpZFBvcyhjb2xJZHgsIHJvd0lkeCkge1xyXG4gICAgICAgIC8vIHZhbGlkYXRpb24gdG8gY2hlY2sgdGhlIGVuZHMgb2YgdGhlIGJvYXJkXHJcbiAgICAgICAgaWYgKChjb2xJZHggPCAwIHx8IHJvd0lkeCA8IDApIHx8IChjb2xJZHggPiA4IHx8IHJvd0lkeCA+IDgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGZhbHNlKSB7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgQm9hcmQgZnJvbSBcIi4vYm9hcmRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUge1xyXG4gICAgY29uc3RydWN0b3Ioc29ja2V0LCByb29tKSB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQgPSBzb2NrZXQ7XHJcbiAgICAgICAgdGhpcy5yb29tID0gcm9vbTtcclxuICAgICAgICAvKiB0aGlzLnBsYXllciA9IFtyb3dJZHgsIGNvbElkeF0gKi9cclxuICAgICAgICB0aGlzLnBsYXllcjFJRCA9IHJvb20ucGxheWVyMTtcclxuICAgICAgICB0aGlzLnBsYXllcjJJRCA9IHJvb20ucGxheWVyMjtcclxuICAgICAgICB0aGlzLmJvYXJkID0gbmV3IEJvYXJkKHRoaXMucGxheWVyMUlELCB0aGlzLnBsYXllcjJJRCk7XHJcbiAgICAgICAgdGhpcy5ncmlkID0gdGhpcy5ib2FyZC5ncmlkO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFBsYXllciA9IFwibm9vbmVcIjtcclxuICAgICAgICB0aGlzLnBsYXllcjEgPSBbOCwgNF07XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIyID0gWzAsIDRdO1xyXG4gICAgICAgIHRoaXMucGxheWVyMVdhbGxzID0gMTA7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIyV2FsbHMgPSAxMDtcclxuICAgICAgICB0aGlzLnN0YXRlID0gXCJub3QgZG9pbmcgYW55dGhpbmdcIjtcclxuICAgICAgICB0aGlzLnV0aWw7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHRoaXMubW92ZVBsYXllciA9IHRoaXMubW92ZVBsYXllci5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzT3ZlcigpIHtcclxuICAgICAgICB0aGlzLnV0aWwudHJhY2tGdW5jdGlvbnMoXCJpc092ZXJcIik7XHJcbiAgICAgICAgaWYgKHRoaXMud2lubmVyKCkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBjb21wdXRlckFpVHVybigpIHtcclxuICAgIC8vICAgICB0aGlzLnV0aWwudHJhY2tGdW5jdGlvbnMoXCJjb21wdXRlckFpVHVyblwiKTtcclxuICAgIC8vICAgICBpZih0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyMlwiKSB7XHJcbiAgICAvLyAgICAgICAgIGxldCBwMlBhdGggPSB0aGlzLmJvYXJkLmJmcyh0aGlzLnBsYXllcjIsIFtcIjgwXCIsXCI4MVwiLFwiODJcIixcIjgzXCIsXCI4NFwiLFwiODVcIixcIjg2XCIsXCI4N1wiLFwiODhcIl0pXHJcbiAgICAvLyAgICAgICAgIGxldCBwMVBhdGggPSB0aGlzLmJvYXJkLmJmcyh0aGlzLnBsYXllcjEpO1xyXG4gICAgLy8gICAgICAgICBsZXQgcmFuZG9tID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XHJcbiAgICAvLyAgICAgICAgIGlmICgocDFQYXRoWzFdLmxlbmd0aCA8PSBwMlBhdGhbMV0ubGVuZ3RoKSAmJiAodGhpcy5wbGF5ZXIyV2FsbHMgPiAwKSkge1xyXG4gICAgLy8gICAgICAgICAgICAgLyogcGxhY2Ugd2FsbCBpZiBwbGF5ZXIxIGlzIGNsb3NlciB0byBnb2FsICovXHJcbiAgICAvLyAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcDFQYXRoWzFdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbGV0IHJvd0lkeCA9IHAxUGF0aFsxXVtpXS5zcGxpdChcIlwiKVswXTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBsZXQgY29sSWR4ID0gcDFQYXRoWzFdW2ldLnNwbGl0KFwiXCIpWzFdOyAgIFxyXG4gICAgLy8gICAgICAgICAgICAgICAgIGxldCBuZXh0Um93SWR4ID0gcDFQYXRoWzFdW2kgKyAxXS5zcGxpdChcIlwiKVswXTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBsZXQgbmV4dENvbElkeCA9IHAxUGF0aFsxXVtpICsgMV0uc3BsaXQoXCJcIilbMV07XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbGV0IHBsYWNlZFdhbGwgPSBmYWxzZTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBsZXQgc3F1YXJlQSA9IFtwYXJzZUludChuZXh0Um93SWR4KSwgcGFyc2VJbnQobmV4dENvbElkeCldO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGxldCBzcXVhcmVOZWlnaGJvcnMgPSB0aGlzLmJvYXJkLmNoZWNrTmVpZ2hib3JzKHNxdWFyZUEpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGxldCBzcXVhcmVCO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8qIFxyXG4gICAgLy8gICAgICAgICAgICAgICAgIGxlZnQgYW5kIHVwIFxyXG4gICAgLy8gICAgICAgICAgICAgICAgIHBsYWNlV2FsbChkaXIsIGV2ZW50LCBzcXVhcmVBLCBzcXVhcmVCKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIGRpciA9IE5vcnRoLCBTb3V0aCwgRWFzdCwgV2VzdFxyXG4gICAgLy8gICAgICAgICAgICAgICAgIGV2ZW50ID0gbnVsbFxyXG4gICAgLy8gICAgICAgICAgICAgICAgIHNxdWFyZUEgPSBbcm93SWR4LCBjb2xJZHhdXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgc3F1YXJlQiA9IFtyb3dJZHgsIGNvbElkeF1cclxuICAgIC8vICAgICAgICAgICAgICAgICAqL1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGlmKGNvbElkeCA9PT0gbmV4dENvbElkeCkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAvKlxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBwYXRoIGlzIG1vdmluZyB1cCBvciBkb3duXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGNoZWNrIG5laWdoYm9ycyBhbmQgc2V0IHNxdWFyZUIgdG8gYSB2YWxpZCBvbmVcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3JzID0gW25vcnRoLCBzb3V0aCwgd2VzdCwgZWFzdF1cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgdXNlIHJhbmRvbSBpZiB5b3Ugd2FudFxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBzcXVhcmVBID0gbmV4dCBiZXN0IHBvcyBvZiBwbGF5ZXIxIChvcHBvbmVudClcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgc3F1YXJlQiA9IHNxdWFyZSB0byB0aGUgd2VzdCBvZiBzcXVhcmVBXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBpZihyYW5kb20gPT09IDApIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcXVhcmVOZWlnaGJvcnNbMl1bMF0gIT09IC0xKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlQiA9IHNxdWFyZU5laWdoYm9yc1syXTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlQiA9IHNxdWFyZU5laWdoYm9yc1szXTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcXVhcmVOZWlnaGJvcnNbM11bMF0gIT09IC0xKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlQiA9IHNxdWFyZU5laWdoYm9yc1szXTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlQiA9IHNxdWFyZU5laWdoYm9yc1syXTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBwbGFjZWRXYWxsID0gdGhpcy5wbGFjZVdhbGwoXCJTb3V0aFwiLCBzcXVhcmVBLCBzcXVhcmVCKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgaWYgKHBsYWNlZFdhbGwgPT09IHRydWUpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIGlmIChyb3dJZHggPT09IG5leHRSb3dJZHgpIHtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGlmKHJhbmRvbSA9PT0gMCkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNxdWFyZU5laWdoYm9yc1swXVswXSAhPT0gLTEpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmVCID0gc3F1YXJlTmVpZ2hib3JzWzBdO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmVCID0gc3F1YXJlTmVpZ2hib3JzWzFdO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNxdWFyZU5laWdoYm9yc1sxXVswXSAhPT0gLTEpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmVCID0gc3F1YXJlTmVpZ2hib3JzWzFdO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmVCID0gc3F1YXJlTmVpZ2hib3JzWzBdO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBpZiAoY29sSWR4ID4gbmV4dENvbElkeCkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VkV2FsbCA9IHRoaXMucGxhY2VXYWxsKFwiRWFzdFwiLCBzcXVhcmVBLCBzcXVhcmVCKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwbGFjZWRXYWxsID09PSB0cnVlKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWRXYWxsID0gdGhpcy5wbGFjZVdhbGwoXCJXZXN0XCIsIHNxdWFyZUEsIHNxdWFyZUIpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBsYWNlZFdhbGwgPT09IHRydWUpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgIH1cclxuXHJcbiAgICAvLyAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgICAvKiBtb3ZlIHBsYXllcjIgdG93YXJkcyBnb2FsICovXHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgY3VyclJvdyA9IHAyUGF0aFsxXVswXS5zcGxpdChcIlwiKVswXTtcclxuICAgIC8vICAgICAgICAgICAgIGxldCBjdXJyQ29sID0gcDJQYXRoWzFdWzBdLnNwbGl0KFwiXCIpWzFdO1xyXG4gICAgLy8gICAgICAgICAgICAgbGV0IG1vdmVzID0gdGhpcy5nZXRBdmFpbGFibGVNb3ZlcyhbcGFyc2VJbnQoY3VyclJvdyksIHBhcnNlSW50KGN1cnJDb2wpXSk7XHJcbiAgICAvLyAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vdmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBtb3Zlc1tpXS5qb2luKFwiXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGlmIChwMlBhdGhbMV0uaW5jbHVkZXMobW92ZSkpe1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVQbGF5ZXIobW92ZXNbaV0pO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICB3aW5uZXIoKSB7XHJcbiAgICAgICAgdGhpcy51dGlsLnRyYWNrRnVuY3Rpb25zKFwid2lubmVyXCIpO1xyXG4gICAgICAgIGxldCB3aW5uZXIgPSBudWxsO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmdyaWRbMF0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYodGhpcy5ncmlkWzBdW2ldLnBsYXllciA9PT0gdGhpcy5wbGF5ZXIxSUQpIHtcclxuICAgICAgICAgICAgICAgIHdpbm5lciA9IHRoaXMucGxheWVyMUlEO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ3JpZFs4XVtpXS5wbGF5ZXIgPT09IHRoaXMucGxheWVyMklEKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5uZXIgPSB0aGlzLnBsYXllcjJJRDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gd2lubmVyO1xyXG4gICAgfVxyXG5cclxuICAgIHRha2VUdXJuKGFjdGlvbiwgZGlyID0gbnVsbCwgZXZlbnQsIHNxdWFyZUEgPSBudWxsLCBzcXVhcmVCID0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMudXRpbC50cmFja0Z1bmN0aW9ucyhcInRha2VUdXJuXCIpO1xyXG4gICAgICAgIC8vIG1vdmVtZW50IG9yIHdhbGwgcGxhY2VtZW50P1xyXG5cclxuICAgICAgICBpZiAoYWN0aW9uID09PSBcIm1vdmVcIikge1xyXG4gICAgICAgICAgICBpZihkaXIgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZVBsYXllcihldmVudC50YXJnZXQuaWQuc3BsaXQoXCJcIikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uID09PSBcInBsYWNlV2FsbFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxhY2VXYWxsKGRpciwgc3F1YXJlQSwgc3F1YXJlQik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwbGFjZVdhbGwoZGlyLCBzcXVhcmVBLCBzcXVhcmVCKSB7XHJcbiAgICAgICAgdGhpcy51dGlsLnRyYWNrRnVuY3Rpb25zKFwicGxhY2VXYWxsXCIpO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgc3F1YXJlQSAmIHNxdWFyZUIgPSBbcm93SWR4LCBjb2xJZHhdXHJcbiAgICAgICAgZ2V0IFNxdWFyZSBhbmQgc2V0IHRoZSBzcGVjaWZpYyB3YWxscyB0byB0cnVlIFxyXG4gICAgICAgIGdldCBuZWlnaGJvcnMgYW5kIHNzZXQgc3BlY2lmaWMgd2FsbHMgdG8gdHJ1ZS4uLiBvcHBvc2l0ZSB3YWxsXHJcbiAgICAgICAgc3F1YXJlUG9zID0gdGhpcy5ncmlkW3Jvd0lkeCwgY29sSWR4XVxyXG4gICAgICAgICovXHJcblxyXG5cclxuICAgICAgICBpZihzcXVhcmVBWzBdID4gOCB8fCBzcXVhcmVBWzBdIDwgMCB8fCBzcXVhcmVCWzBdID4gOCB8fCBzcXVhcmVCWzBdIDwgMFxyXG4gICAgICAgICAgICB8fCBzcXVhcmVBWzFdID4gOCB8fCBzcXVhcmVBWzFdIDwgMCB8fCBzcXVhcmVCWzFdID4gOCB8fCBzcXVhcmVCWzFdIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc3FyQSA9IHRoaXMuZ3JpZFtzcXVhcmVBWzBdXVtzcXVhcmVBWzFdXTtcclxuICAgICAgICBsZXQgc3FyQiA9IHRoaXMuZ3JpZFtzcXVhcmVCWzBdXVtzcXVhcmVCWzFdXTtcclxuICAgICAgICBsZXQgbmVpZ2hib3JzQSA9IHRoaXMuYm9hcmQuY2hlY2tOZWlnaGJvcnMoW3NxckEucm93SWR4LCBzcXJBLmNvbElkeF0pO1xyXG4gICAgICAgIGxldCBuZWlnaGJvcnNCID0gdGhpcy5ib2FyZC5jaGVja05laWdoYm9ycyhbc3FyQi5yb3dJZHgsIHNxckIuY29sSWR4XSk7XHJcbiAgICAgICAgbGV0IGlzVmFsaWRXYWxsO1xyXG4gICAgICAgIGxldCBwbGF5ZXJXYWxscztcclxuICAgICAgICB0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IHRoaXMucGxheWVyMUlEID8gcGxheWVyV2FsbHMgPSB0aGlzLnBsYXllcjFXYWxscyA6IHBsYXllcldhbGxzID0gdGhpcy5wbGF5ZXIyV2FsbHNcclxuICAgICAgICBpZiAocGxheWVyV2FsbHMgPiAwKSB7XHJcblxyXG4gICAgICAgICAgICBpZihkaXIgPT09IFwiTm9ydGhcIiAmJiAoIXNxckEud2FsbHMuTm9ydGggJiYgIXNxckIud2FsbHMuTm9ydGgpKXtcclxuICAgICAgICAgICAgICAgIHNxckEud2FsbHMuTm9ydGggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc3FyQi53YWxscy5Ob3J0aCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvKiBzZXRzIHRoZSBub3J0aCBuZWlnaGJvcnMgc291dGggd2FsbCB0byB0cnVlICovXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRbbmVpZ2hib3JzQVswXVswXV1bbmVpZ2hib3JzQVswXVsxXV0ud2FsbHMuU291dGggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0JbMF1bMF1dW25laWdoYm9yc0JbMF1bMV1dLndhbGxzLlNvdXRoID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlzVmFsaWRXYWxsID0gdGhpcy5maW5kUGF0aCgpO1xyXG4gICAgICAgICAgICAgICAgaWYoaXNWYWxpZFdhbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50UGxheWVyID09PSB0aGlzLnBsYXllcjFJRCkgdGhpcy5wbGF5ZXIxV2FsbHMgPSB0aGlzLnBsYXllcjFXYWxscyAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFBsYXllciA9PT0gdGhpcy5wbGF5ZXIySUQpIHRoaXMucGxheWVyMldhbGxzID0gdGhpcy5wbGF5ZXIyV2FsbHMgLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ3BsYWNlV2FsbCcsIHsgcm9vbUlkOiB0aGlzLnJvb20uaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyOiBcIm5vcnRoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YWxsQTogW3NxckEucm93SWR4LCBzcXJBLmNvbElkeF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YWxsQjogW3NxckIucm93SWR4LCBzcXJCLmNvbElkeF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YWxsQzogW25laWdoYm9yc0FbMF1bMF0sIG5laWdoYm9yc0FbMF1bMV1dLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhbGxEOiBbbmVpZ2hib3JzQlswXVswXSwgbmVpZ2hib3JzQlswXVsxXV0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyOiB0aGlzLmN1cnJlbnRQbGF5ZXJ9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnN3YXBUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNxckEud2FsbHMuTm9ydGggPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBzcXJCLndhbGxzLk5vcnRoID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0FbMF1bMF1dW25laWdoYm9yc0FbMF1bMV1dLndhbGxzLlNvdXRoID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0JbMF1bMF1dW25laWdoYm9yc0JbMF1bMV1dLndhbGxzLlNvdXRoID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoZGlyID09PSBcIkVhc3RcIiAmJiAoIXNxckEud2FsbHMuRWFzdCAmJiAhc3FyQi53YWxscy5FYXN0KSl7XHJcbiAgICAgICAgICAgICAgICBzcXJBLndhbGxzLkVhc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc3FyQi53YWxscy5FYXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8qIHNldHMgdGhlIEVhc3QgbmVpZ2hib3JzIFdlc3Qgd2FsbCB0byB0cnVlICovXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRbbmVpZ2hib3JzQVszXVswXV1bbmVpZ2hib3JzQVszXVsxXV0ud2FsbHMuV2VzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRbbmVpZ2hib3JzQlszXVswXV1bbmVpZ2hib3JzQlszXVsxXV0ud2FsbHMuV2VzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpc1ZhbGlkV2FsbCA9IHRoaXMuZmluZFBhdGgoKTtcclxuICAgICAgICAgICAgICAgIGlmKGlzVmFsaWRXYWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFBsYXllciA9PT0gdGhpcy5wbGF5ZXIxSUQpIHRoaXMucGxheWVyMVdhbGxzID0gdGhpcy5wbGF5ZXIxV2FsbHMgLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IHRoaXMucGxheWVyMklEKSB0aGlzLnBsYXllcjJXYWxscyA9IHRoaXMucGxheWVyMldhbGxzIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvY2tldC5lbWl0KCdwbGFjZVdhbGwnLCB7IHJvb21JZDogdGhpcy5yb29tLmlkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcjogXCJlYXN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YWxsQTogW3NxckEucm93SWR4LCBzcXJBLmNvbElkeF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YWxsQjogW3NxckIucm93SWR4LCBzcXJCLmNvbElkeF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YWxsQzogW25laWdoYm9yc0FbM11bMF0sIG5laWdoYm9yc0FbM11bMV1dLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhbGxEOiBbbmVpZ2hib3JzQlszXVswXSwgbmVpZ2hib3JzQlszXVsxXV0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyOiB0aGlzLmN1cnJlbnRQbGF5ZXJ9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnN3YXBUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNxckEud2FsbHMuRWFzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNxckIud2FsbHMuRWFzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtuZWlnaGJvcnNBWzNdWzBdXVtuZWlnaGJvcnNBWzNdWzFdXS53YWxscy5XZXN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0JbM11bMF1dW25laWdoYm9yc0JbM11bMV1dLndhbGxzLldlc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihkaXIgPT09IFwiU291dGhcIiAmJiAoIXNxckEud2FsbHMuU291dGggJiYgIXNxckIud2FsbHMuU291dGgpKXtcclxuICAgICAgICAgICAgICAgIHNxckEud2FsbHMuU291dGggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc3FyQi53YWxscy5Tb3V0aCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvKiBzZXRzIHRoZSBTb3V0aCBuZWlnaGJvcnMgTm9ydGggd2FsbCB0byB0cnVlICovXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRbbmVpZ2hib3JzQVsxXVswXV1bbmVpZ2hib3JzQVsxXVsxXV0ud2FsbHMuTm9ydGggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0JbMV1bMF1dW25laWdoYm9yc0JbMV1bMV1dLndhbGxzLk5vcnRoID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlzVmFsaWRXYWxsID0gdGhpcy5maW5kUGF0aCgpO1xyXG4gICAgICAgICAgICAgICAgaWYoaXNWYWxpZFdhbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50UGxheWVyID09PSB0aGlzLnBsYXllcjFJRCkgdGhpcy5wbGF5ZXIxV2FsbHMgPSB0aGlzLnBsYXllcjFXYWxscyAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFBsYXllciA9PT0gdGhpcy5wbGF5ZXIySUQpIHRoaXMucGxheWVyMldhbGxzID0gdGhpcy5wbGF5ZXIyV2FsbHMgLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ3BsYWNlV2FsbCcsIHsgcm9vbUlkOiB0aGlzLnJvb20uaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyOiBcInNvdXRoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YWxsQTogW3NxckEucm93SWR4LCBzcXJBLmNvbElkeF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YWxsQjogW3NxckIucm93SWR4LCBzcXJCLmNvbElkeF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YWxsQzogW25laWdoYm9yc0FbMV1bMF0sIG5laWdoYm9yc0FbMV1bMV1dLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhbGxEOiBbbmVpZ2hib3JzQlsxXVswXSwgbmVpZ2hib3JzQlsxXVsxXV0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyOiB0aGlzLmN1cnJlbnRQbGF5ZXJ9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnN3YXBUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNxckEud2FsbHMuU291dGggPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBzcXJCLndhbGxzLlNvdXRoID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0FbMV1bMF1dW25laWdoYm9yc0FbMV1bMV1dLndhbGxzLk5vcnRoID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0JbMV1bMF1dW25laWdoYm9yc0JbMV1bMV1dLndhbGxzLk5vcnRoID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoZGlyID09PSBcIldlc3RcIiAmJiAoIXNxckEud2FsbHMuV2VzdCAmJiAhc3FyQi53YWxscy5XZXN0KSl7XHJcbiAgICAgICAgICAgICAgICBzcXJBLndhbGxzLldlc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc3FyQi53YWxscy5XZXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8qIHNldHMgdGhlIFdlc3QgbmVpZ2hib3JzIEVhc3Qgd2FsbCB0byB0cnVlICovXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRbbmVpZ2hib3JzQVsyXVswXV1bbmVpZ2hib3JzQVsyXVsxXV0ud2FsbHMuRWFzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRbbmVpZ2hib3JzQlsyXVswXV1bbmVpZ2hib3JzQlsyXVsxXV0ud2FsbHMuRWFzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpc1ZhbGlkV2FsbCA9IHRoaXMuZmluZFBhdGgoKTtcclxuICAgICAgICAgICAgICAgIGlmKGlzVmFsaWRXYWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFBsYXllciA9PT0gdGhpcy5wbGF5ZXIxSUQpIHRoaXMucGxheWVyMVdhbGxzID0gdGhpcy5wbGF5ZXIxV2FsbHMgLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IHRoaXMucGxheWVyMklEKSB0aGlzLnBsYXllcjJXYWxscyA9IHRoaXMucGxheWVyMldhbGxzIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvY2tldC5lbWl0KCdwbGFjZVdhbGwnLCB7IHJvb21JZDogdGhpcy5yb29tLmlkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcjogXCJ3ZXN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YWxsQTogW3NxckEucm93SWR4LCBzcXJBLmNvbElkeF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YWxsQjogW3NxckIucm93SWR4LCBzcXJCLmNvbElkeF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YWxsQzogW25laWdoYm9yc0FbMl1bMF0sIG5laWdoYm9yc0FbMl1bMV1dLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhbGxEOiBbbmVpZ2hib3JzQlsyXVswXSwgbmVpZ2hib3JzQlsyXVsxXV0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyOiB0aGlzLmN1cnJlbnRQbGF5ZXJ9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnN3YXBUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNxckEud2FsbHMuV2VzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNxckIud2FsbHMuV2VzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtuZWlnaGJvcnNBWzJdWzBdXVtuZWlnaGJvcnNBWzJdWzFdXS53YWxscy5FYXN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmlkW25laWdoYm9yc0JbMl1bMF1dW25laWdoYm9yc0JbMl1bMV1dLndhbGxzLkVhc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZVBsYXllcihkaXIpIHtcclxuICAgICAgICB0aGlzLnV0aWwudHJhY2tGdW5jdGlvbnMoXCJtb3ZlUGxheWVyXCIpO1xyXG4gICAgICAgIC8vIHRha2VzIGN1cnJlbnQgcGxheWVyIGN1cnJlbnQgcG9zXHJcbiAgICAgICAgLy8gY2FsY3VsYXRlcyBmdXR1cmUgcG9zIHdpdGggZGlyXHJcbiAgICAgICAgbGV0IHBsYXllcjtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IHRoaXMucGxheWVyMUlEID8gcGxheWVyID0gdGhpcy5wbGF5ZXIxIDogcGxheWVyID0gdGhpcy5wbGF5ZXIyXHJcbiAgICAgICAgbGV0IG5ld0NvbElkeDtcclxuICAgICAgICBsZXQgbmV3Um93SWR4O1xyXG4gICAgICAgIGxldCBpc1dhbGxlZDtcclxuICAgICAgICBsZXQgaXNWYWxpZDtcclxuICAgIFxyXG4gICAgICAgIG5ld1Jvd0lkeCA9IHBhcnNlSW50KGRpclswXSk7XHJcbiAgICAgICAgbmV3Q29sSWR4ID0gcGFyc2VJbnQoZGlyWzFdKTtcclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICBUaGUgYmVsb3cgdmFsaWRhdGlvbiBubyBsb25nZXIgd29ya3MgZm9yIGNsaWNraW5nIG1vdmVtZW50LiAgXHJcbiAgICAgICAgY2hlY2sgZm9yIHdhbGxzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaXNXYWxsZWQgPSB0aGlzLmJvYXJkLmlzV2FsbGVkKGRpciwgcGxheWVyWzBdLCBwbGF5ZXJbMV0pO1xyXG4gICAgICAgIC8vIGdpdmVzIHRvIHRoaXMuYm9hcmQgdG8gdmFsaWRhdGVcclxuICAgICAgICBpc1ZhbGlkID0gQm9hcmQuaXNWYWxpZFBvcyhuZXdDb2xJZHgsIG5ld1Jvd0lkeCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gaWYgdmFsaWQgdGhlbiBzZXRzIHBsYXllciBuZXcgeCBhbmQgeVxyXG4gICAgICAgIC8vICAgIHN3YXBzIHR1cm5zXHJcbiAgICAgICAgaWYgKGlzVmFsaWQgJiYgIWlzV2FsbGVkKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgb2xkU3F1YXJlID0gdGhpcy5ib2FyZC5ncmlkW3BsYXllclswXV1bcGxheWVyWzFdXTtcclxuICAgICAgICAgICAgbGV0IG5ld1NxdWFyZSA9IHRoaXMuYm9hcmQuZ3JpZFtuZXdSb3dJZHhdW25ld0NvbElkeF07XHJcblxyXG4gICAgICAgICAgICAvL3ZhbGlkYXRpb24gdG8gY2hlY2sgZm9yIHBsYXllciBjb2xsaXNpb24gICAgICAgICBcclxuICAgICAgICAgICAgaWYgKG5ld1NxdWFyZS5wbGF5ZXIgIT09IFwiZW1wdHlcIikge1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb2xkU3F1YXJlLnBsYXllciA9IFwiZW1wdHlcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0UGxheWVyUG9zKHRoaXMuY3VycmVudFBsYXllciwgW25ld1Jvd0lkeCwgbmV3Q29sSWR4XSk7XHJcbiAgICAgICAgICAgICAgICBuZXdTcXVhcmUucGxheWVyID0gdGhpcy5jdXJyZW50UGxheWVyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgncGxheWVyTW92ZScsIHtyb29tSWQ6IHRoaXMucm9vbS5pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZFBvczogW29sZFNxdWFyZS5yb3dJZHgsIG9sZFNxdWFyZS5jb2xJZHhdLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UG9zOiBbbmV3U3F1YXJlLnJvd0lkeCwgbmV3U3F1YXJlLmNvbElkeF0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXI6IHRoaXMuY3VycmVudFBsYXllcn0pXHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnN3YXBUdXJuKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGVsc2UgdGhlbiBkb2VzIG5vdGhpbmcgb3Igc2VuZHMgZXJyb3IgbWVzc2FnZVxyXG4gICAgICAgICAgICAvLyAgICBkb2VzIG5vdCBzd2FwIHR1cm5zXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRBdmFpbGFibGVNb3Zlcyhwb3MpIHtcclxuICAgICAgICB0aGlzLnV0aWwudHJhY2tGdW5jdGlvbnMoXCJnZXRBdmFpbGFibGVNb3Zlc1wiKTtcclxuICAgICAgICAvKiBwb3MgPSBbcm93LCBjb2xdICovXHJcbiAgICAgICAgbGV0IG1vdmVzID0gW107XHJcbiAgICAgICAgbGV0IGN1cnJlbnRTcXVhcmUgPSB0aGlzLmdyaWRbcG9zWzBdXVtwb3NbMV1dO1xyXG4gICAgICAgIGxldCBzcXVhcmU7XHJcbiAgICAgICAgbGV0IGNvbElkeCA9IHBvc1sxXTtcclxuICAgICAgICBsZXQgcm93SWR4ICA9IHBvc1swXTtcclxuXHJcbiAgICAgICAgLyogXHJcbiAgICAgICAgcGF0dGVybiBmb3IgdGhlc2UgbmV4dCBmb3VyIGlmIHN0YXRlbWVudCBibG9ja3NcclxuXHJcbiAgICAgICAgaWYgcG9zaXRpb24gaXMgb24gdGhlIGJvYXJkIGFuZCB0aGVyZSBpcyBub3Qgd2FsbFxyXG4gICAgICAgICAgICBpZiBwb3NpdGlvbiBoYXMgbm8gcGxheWVyIG9uIGl0XHJcbiAgICAgICAgICAgIGVsc2UgaWYgcG9zaXRpb24gaGFzIGEgcGxheWVyIG9uIGl0XHJcbiAgICAgICAgICAgICoqKiBnZXR0aW5nIHRoZSBhdmFpbGFibGUgbW92ZSB0aGF0IGhvcHMgdGhlIG9wcG9uZW50ICoqKlxyXG4gICAgICAgICAgICAgICAgaWYgbm8gb2JzdHJ1Y3Rpb25zIGZvciBhIHN0cmFpZ2h0IGhvcCA9PiBhZGQgdGhhdCBtb3ZlXHJcbiAgICAgICAgICAgICAgICBlbHNlIFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBzcXVhcmUgaXMgZGVzdGluYXRpb24gb2YgYSBzdGFpZ2h0IGhvcFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIHdhbGwgaXMgYW4gb2JzdHJ1Y3Rpb24gZm9yIGEgc3RyYWlnaHQgaG9wXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZCBhIGRpYWdvbmFsIGhvcCBpZiBub3Qgb2JzdHJ1Y3RlZCBieSBhIHdhbGxcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIHRlbXBzcXVhcmUgaXMgb2ZmIHRoZSBib2FyZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGQgYSBkaWFnb25hbCBob3AgaWYgbm90IG9ic3RydWN0ZWQgYnkgYSB3YWxsXHJcblxyXG4gICAgICAgICAqL1xyXG5cclxuICAgICAgICBpZiAoKHJvd0lkeCAtIDEgPj0gMCkgJiYgKCFjdXJyZW50U3F1YXJlLndhbGxzLk5vcnRoKSkge1xyXG4gICAgICAgICAgICBzcXVhcmUgPSB0aGlzLmdyaWRbcm93SWR4IC0gMV1bY29sSWR4XTtcclxuICAgICAgICAgICAgaWYgKHNxdWFyZS5wbGF5ZXIgPT09IFwiZW1wdHlcIikge1xyXG4gICAgICAgICAgICAgICAgbW92ZXMucHVzaChbcm93SWR4IC0gMSwgY29sSWR4XSk7ICAvLyBub3J0aFxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFt0aGlzLnBsYXllcjFJRCwgdGhpcy5wbGF5ZXIySURdLmluY2x1ZGVzKHNxdWFyZS5wbGF5ZXIpKXtcclxuICAgICAgICAgICAgICAgIGlmICgocm93SWR4IC0gMiA+PSAwKSAmJiAoIXNxdWFyZS53YWxscy5Ob3J0aCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3Zlcy5wdXNoKFtyb3dJZHggLSAyLCBjb2xJZHhdKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBTcXVhcmUgPSByb3dJZHggLSAyID49IDAgPyB0aGlzLmdyaWRbcm93SWR4IC0gMl1bY29sSWR4XSA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3F1YXJlLndhbGxzLk5vcnRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3F1YXJlLndhbGxzLkVhc3QpIG1vdmVzLnB1c2goW3Jvd0lkeCAtIDEsIGNvbElkeCArIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzcXVhcmUud2FsbHMuV2VzdCkgbW92ZXMucHVzaChbcm93SWR4IC0gMSwgY29sSWR4IC0gMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGVtcFNxdWFyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzcXVhcmUud2FsbHMuRWFzdCkgbW92ZXMucHVzaChbcm93SWR4IC0gMSwgY29sSWR4ICsgMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzcXVhcmUud2FsbHMuV2VzdCkgbW92ZXMucHVzaChbcm93SWR4IC0gMSwgY29sSWR4IC0gMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgoY29sSWR4ICsgMSA8PSA4KSAmJiAoIWN1cnJlbnRTcXVhcmUud2FsbHMuRWFzdCkpIHtcclxuICAgICAgICAgICAgc3F1YXJlID0gdGhpcy5ncmlkW3Jvd0lkeF1bY29sSWR4ICsgMV07XHJcbiAgICAgICAgICAgIGlmIChzcXVhcmUucGxheWVyID09PSBcImVtcHR5XCIpIHtcclxuICAgICAgICAgICAgICAgIG1vdmVzLnB1c2goW3Jvd0lkeCwgY29sSWR4ICsgMV0pOyAgLy8gZWFzdFxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFt0aGlzLnBsYXllcjFJRCwgdGhpcy5wbGF5ZXIySURdLmluY2x1ZGVzKHNxdWFyZS5wbGF5ZXIpKXtcclxuICAgICAgICAgICAgICAgIGlmICgoY29sSWR4ICsgMiA8PSA4KSAmJiAoIXNxdWFyZS53YWxscy5FYXN0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVzLnB1c2goW3Jvd0lkeCwgY29sSWR4ICsgMl0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcFNxdWFyZSA9IGNvbElkeCArIDIgPD0gOCA/IHRoaXMuZ3JpZFtyb3dJZHhdW2NvbElkeCArIDJdIDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzcXVhcmUud2FsbHMuRWFzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNxdWFyZS53YWxscy5Ob3J0aCkgbW92ZXMucHVzaChbcm93SWR4IC0gMSwgY29sSWR4ICsgMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNxdWFyZS53YWxscy5Tb3V0aCkgbW92ZXMucHVzaChbcm93SWR4ICsgMSwgY29sSWR4ICsgMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGVtcFNxdWFyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzcXVhcmUud2FsbHMuTm9ydGgpIG1vdmVzLnB1c2goW3Jvd0lkeCAtIDEsIGNvbElkeCArIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3F1YXJlLndhbGxzLlNvdXRoKSBtb3Zlcy5wdXNoKFtyb3dJZHggKyAxLCBjb2xJZHggKyAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKChyb3dJZHggKyAxIDw9IDgpICYmICghY3VycmVudFNxdWFyZS53YWxscy5Tb3V0aCkpIHtcclxuICAgICAgICAgICAgc3F1YXJlID0gdGhpcy5ncmlkW3Jvd0lkeCArIDFdW2NvbElkeF07XHJcbiAgICAgICAgICAgIGlmIChzcXVhcmUucGxheWVyID09PSBcImVtcHR5XCIpIHtcclxuICAgICAgICAgICAgICAgIG1vdmVzLnB1c2goW3Jvd0lkeCArIDEsIGNvbElkeF0pOyAgLy8gc291dGhcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChbdGhpcy5wbGF5ZXIxSUQsIHRoaXMucGxheWVyMklEXS5pbmNsdWRlcyhzcXVhcmUucGxheWVyKSl7XHJcbiAgICAgICAgICAgICAgICBpZiAoKHJvd0lkeCArIDIgPD0gOCkgJiYgKCFzcXVhcmUud2FsbHMuU291dGgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZXMucHVzaChbcm93SWR4ICsgMiwgY29sSWR4XSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wU3F1YXJlID0gcm93SWR4ICsgMiA8PSA4ID8gdGhpcy5ncmlkW3Jvd0lkeCArIDJdW2NvbElkeF0gOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNxdWFyZS53YWxscy5Tb3V0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNxdWFyZS53YWxscy5FYXN0KSBtb3Zlcy5wdXNoKFtyb3dJZHggKyAxLCBjb2xJZHggKyAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3F1YXJlLndhbGxzLldlc3QpIG1vdmVzLnB1c2goW3Jvd0lkeCArIDEsIGNvbElkeCAtIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRlbXBTcXVhcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3F1YXJlLndhbGxzLkVhc3QpIG1vdmVzLnB1c2goW3Jvd0lkeCArIDEsIGNvbElkeCArIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3F1YXJlLndhbGxzLldlc3QpIG1vdmVzLnB1c2goW3Jvd0lkeCArIDEsIGNvbElkeCAtIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKGNvbElkeCAtIDEgPj0gMCkgJiYgKCFjdXJyZW50U3F1YXJlLndhbGxzLldlc3QpKSB7XHJcbiAgICAgICAgICAgIHNxdWFyZSA9IHRoaXMuZ3JpZFtyb3dJZHhdW2NvbElkeCAtIDFdO1xyXG4gICAgICAgICAgICBpZiAoc3F1YXJlLnBsYXllciA9PT0gXCJlbXB0eVwiKSB7XHJcbiAgICAgICAgICAgICAgICBtb3Zlcy5wdXNoKFtyb3dJZHgsIGNvbElkeCAtIDFdKTsgIC8vIHdlc3RcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChbdGhpcy5wbGF5ZXIxSUQsIHRoaXMucGxheWVyMklEXS5pbmNsdWRlcyhzcXVhcmUucGxheWVyKSl7XHJcbiAgICAgICAgICAgICAgICBpZiAoKGNvbElkeCAtIDIgPj0gMCkgJiYgKCFzcXVhcmUud2FsbHMuV2VzdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3Zlcy5wdXNoKFtyb3dJZHgsIGNvbElkeCAtIDJdKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBTcXVhcmUgPSBjb2xJZHggLSAyID49IDAgPyB0aGlzLmdyaWRbcm93SWR4XVtjb2xJZHggLSAyXSA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3F1YXJlLndhbGxzLldlc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzcXVhcmUud2FsbHMuTm9ydGgpIG1vdmVzLnB1c2goW3Jvd0lkeCAtIDEsIGNvbElkeCAtIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzcXVhcmUud2FsbHMuU291dGgpIG1vdmVzLnB1c2goW3Jvd0lkeCArIDEsIGNvbElkeCAtIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRlbXBTcXVhcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3F1YXJlLndhbGxzLk5vcnRoKSBtb3Zlcy5wdXNoKFtyb3dJZHggLSAxLCBjb2xJZHggLSAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNxdWFyZS53YWxscy5Tb3V0aCkgbW92ZXMucHVzaChbcm93SWR4ICsgMSwgY29sSWR4IC0gMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBtb3ZlcztcclxuICAgIH1cclxuXHJcblxyXG4gICAgc2V0UGxheWVyUG9zKHBsYXllciwgcG9zKSB7XHJcbiAgICAgICAgdGhpcy51dGlsLnRyYWNrRnVuY3Rpb25zKFwic2V0UGxheWVyUG9zXCIpO1xyXG4gICAgICAgIGlmIChwbGF5ZXIgPT09IHRoaXMucGxheWVyMUlEKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyMSA9IHBvcztcclxuICAgICAgICB9IGVsc2UgaWYgKHBsYXllciA9PT0gdGhpcy5wbGF5ZXIySUQpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIyID0gcG9zO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLnV0aWwudHJhY2tGdW5jdGlvbnMoXCJzdGFydFwiKTtcclxuICAgICAgICB0aGlzLmJvYXJkLnNldFBsYXllcnModHJ1ZSwgdGhpcy5wbGF5ZXIxLCB0cnVlLCB0aGlzLnBsYXllcjIpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFBsYXllciA9IHRoaXMucGxheWVyMUlEO1xyXG4gICAgfVxyXG5cclxuICAgIHN3YXBUdXJuKCkge1xyXG4gICAgICAgIHRoaXMudXRpbC50cmFja0Z1bmN0aW9ucyhcInN3YXBUdXJuXCIpO1xyXG4gICAgICAgIGlmKCB0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IHRoaXMucGxheWVyMUlEICkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQbGF5ZXIgPSB0aGlzLnBsYXllcjJJRDtcclxuICAgICAgICB9IGVsc2UgaWYoIHRoaXMuY3VycmVudFBsYXllciA9PT0gdGhpcy5wbGF5ZXIySUQgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBsYXllciA9IHRoaXMucGxheWVyMUlEO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmaW5kUGF0aCgpIHtcclxuICAgICAgICB0aGlzLnV0aWwudHJhY2tGdW5jdGlvbnMoXCJmaW5kUGF0aFwiKTtcclxuICAgICAgICAvKiBcclxuICAgICAgICBydW4gdGhlIGJmc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHJldHVybiAhIXRoaXMuYm9hcmQuYmZzKHRoaXMucGxheWVyMSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsImltcG9ydCBVdGlsIGZyb20gJy4vdXRpbCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lVmlldyB7XHJcbiAgICBjb25zdHJ1Y3Rvcihzb2NrZXQsIHJvb20sIGdhbWUpIHtcclxuICAgICAgICB0aGlzLnNvY2tldCA9IHNvY2tldDtcclxuICAgICAgICB0aGlzLnJvb20gPSByb29tO1xyXG4gICAgICAgIHRoaXMuYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICAgICAgdGhpcy5ib2FyZCA9IHRoaXMuZ2FtZS5ib2FyZDtcclxuICAgICAgICB0aGlzLmdyaWQgPSB0aGlzLmJvYXJkLmdyaWQ7XHJcbiAgICAgICAgdGhpcy5zcXVhcmVBID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNxdWFyZUIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubmVpZ2hib3JzID0gbnVsbDsgIFxyXG4gICAgICAgIHRoaXMuYXZhaWxhYmxlTW92ZXMgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy53aW5uZXIgPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLnV0aWwgPSBuZXcgVXRpbCgpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS51dGlsID0gdGhpcy51dGlsO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5ib2FyZC51dGlsID0gdGhpcy51dGlsO1xyXG4gICAgICAgIHRoaXMuc2V0dXBCb2FyZCgpO1xyXG4gICAgICAgIHRoaXMuc2V0dXBFdmVudExpc3RlbmVycygpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3coKSB7XHJcbiAgICAgICAgdGhpcy51dGlsLnRyYWNrRnVuY3Rpb25zKFwic2hvd1wiKTtcclxuICAgICAgICAvLyB0aGlzLmdhbWUuY29tcHV0ZXJBaVR1cm4oKTtcclxuICAgICAgICB0aGlzLnNob3dCb2FyZCgpO1xyXG4gICAgICAgIGlmICh0aGlzLmdhbWUuaXNPdmVyKCkpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5nYW1lLmN1cnJlbnRQbGF5ZXIgIT09IFwibm9vbmVcIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLndpbm5lcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuY3VycmVudFBsYXllciA9PT0gdGhpcy5nYW1lLnBsYXllcjJJRCkgdGhpcy53aW5uZXIgPSB0aGlzLnJvb20ucGxheWVyMTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nYW1lLmN1cnJlbnRQbGF5ZXIgPT09IHRoaXMuZ2FtZS5wbGF5ZXIxSUQpIHRoaXMud2lubmVyID0gdGhpcy5yb29tLnBsYXllcjI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnd2lubmVyJywgdGhpcy5yb29tLmlkLCB0aGlzLndpbm5lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IHRhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInRhYmxlXCIpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuY3JlYXRlUmVzdGFydERpdih0YWJsZSwgd2lubmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmdhbWUuY3VycmVudFBsYXllciA9IFwibm9vbmVcIjtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnNob3dCb2FyZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRhYmxlLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCByZXN0YXJ0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93Qm9hcmQoKSB7XHJcbiAgICAgICAgdGhpcy51dGlsLnRyYWNrRnVuY3Rpb25zKFwic2hvd0JvYXJkXCIpO1xyXG4gICAgICAgIGZvcihsZXQgcm93SWR4ID0gMDsgcm93SWR4ICA8IHRoaXMuZ3JpZC5sZW5ndGg7IHJvd0lkeCsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGNvbElkeCA9IDA7IGNvbElkeCA8IHRoaXMuZ3JpZFtyb3dJZHhdLmxlbmd0aDsgY29sSWR4KyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBzcXVhcmUgPSB0aGlzLmdyaWRbcm93SWR4XVtjb2xJZHhdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGlkID0gKHJvd0lkeCkudG9TdHJpbmcoKSArIChjb2xJZHgpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG4gICAgICAgICAgICAgICAgaWYoc3F1YXJlLnBsYXllciA9PT0gdGhpcy5nYW1lLnBsYXllcjFJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QuYWRkKFwicGxheWVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5pbm5lckhUTUwgPSBcIiYjeDI2NUZcIjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihzcXVhcmUucGxheWVyID09PSB0aGlzLmdhbWUucGxheWVyMklEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlLmNsYXNzTGlzdC5hZGQoXCJwbGF5ZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlLmlubmVySFRNTCA9IFwiJiN4MjY1OVwiO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGUuY2xhc3NMaXN0LnJlbW92ZShcInBsYXllclwiKTtcclxuICAgICAgICAgICAgICAgICAgICBlbGUuaW5uZXJIVE1MID0gXCIgXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvKiB1cGRhdGUgd2FsbHMgKi9cclxuICAgICAgICAgICAgICAgIGlmICghIXNxdWFyZS53YWxscy5Ob3J0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QucmVtb3ZlKCdoYWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlLmNsYXNzTGlzdC5hZGQoJ3dhbGwtdG9wJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoISFzcXVhcmUud2FsbHMuRWFzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QucmVtb3ZlKCdoYWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlLmNsYXNzTGlzdC5hZGQoJ3dhbGwtcmlnaHQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghIXNxdWFyZS53YWxscy5Tb3V0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QucmVtb3ZlKCdoYWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlLmNsYXNzTGlzdC5hZGQoJ3dhbGwtYm90dG9tJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoISFzcXVhcmUud2FsbHMuV2VzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QucmVtb3ZlKCdoYWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlLmNsYXNzTGlzdC5hZGQoJ3dhbGwtbGVmdCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB3YWxsQ291bnRlcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwid2FsbC1jb3VudGVyXCIpO1xyXG4gICAgICAgIGxldCBidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYWNlXCIpO1xyXG4gICAgICAgIHdhbGxDb3VudGVyc1swXS5pbm5lckhUTUwgPSBgcGxheWVyIDEgaGFzICR7dGhpcy5nYW1lLnBsYXllcjFXYWxsc30gd2FsbHMgbGVmdGBcclxuICAgICAgICB3YWxsQ291bnRlcnNbMV0uaW5uZXJIVE1MID0gYHBsYXllciAyIGhhcyAke3RoaXMuZ2FtZS5wbGF5ZXIyV2FsbHN9IHdhbGxzIGxlZnRgXHJcbiAgICAgICAgaWYgKCh0aGlzLmdhbWUuY3VycmVudFBsYXllciA9PT0gdGhpcy5nYW1lLnBsYXllcjFJRCkgJiYgKHRoaXMuZ2FtZS5wbGF5ZXIxV2FsbHMgPT09IDApKSB7XHJcbiAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCh0aGlzLmdhbWUuY3VycmVudFBsYXllciA9PT0gdGhpcy5nYW1lLnBsYXllcjJJRCkgJiYgKHRoaXMuZ2FtZS5wbGF5ZXIyV2FsbHMgPT09IDApKXtcclxuICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuc3RhdGUgPT09IFwibm90IGRvaW5nIGFueXRoaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChidG4uY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGlkZVwiKSkgYnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHBsYXllcnNUdXJuID0gdGhpcy5nYW1lLmN1cnJlbnRQbGF5ZXIgPT09IHRoaXMuc29ja2V0LmlkID8gJ1lvdXInIDogXCJPcHBvbmVudCdzXCI7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItdHVyblwiKS5pbm5lckhUTUwgPSBgJHtwbGF5ZXJzVHVybn0gdHVybmA7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0dXBFdmVudExpc3RlbmVycygpIHtcclxuICAgICAgICB0aGlzLnV0aWwudHJhY2tGdW5jdGlvbnMoXCJzZXR1cEV2ZW50TGlzdGVuZXJzXCIpO1xyXG5cclxuICAgICAgICB0aGlzLmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zb2NrZXQuaWQgPT09IHRoaXMuZ2FtZS5jdXJyZW50UGxheWVyKSB7XHJcbiAgICAgICAgICAgIC8vIGlmICh0cnVlKSB7IC8vIHRlc3RpbmcgcHVycG9zZXNcclxuICAgICAgICAgICAgICAgIC8qIFxyXG4gICAgVGhlIGNsaWNrIGV2ZW50IGlzIHVzZWQgZm9yIGEgc3RhdGUgbWFjaGluZS5cclxuICAgIERlcGVuZGluZyBvbiB0aGUgc3RhdGUgb2YgcGxhY2luZyBhIHdhbGwgZGljdGF0ZXNcclxuICAgIHdoYXQgd2lsbCBoYXBwZW4gd2hlbiBhIGNsaWNrIGV2ZW50IHRyaWdnZXJzLlxyXG4gICAgU3RhdGUgaXMgc3RvcmVkIGluIHRoaXMuZ2FtZS5zdGF0ZSBcclxuICAgIFN0YXRlIE1hY2hpbmUgaXM6XHJcbiAgICBbcDEgbm90IGRvaW5nIGFueXRoaW5nXSA9PSBjbGlja3MgUGxhY2UgYSB3YWxsID4+IFtzZWxlY3Rpbmcgc3F1YXJlc10gPT4gW3NlbGVjdGluZyB3YWxsIHR5cGVdID0+IFtwMSBub3QgZG9pbmcgYW55dGhpbmddXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXC9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt3YWxsIGlzIGNyZWF0ZWR9ID0+IFtwMiBub3QgZG9pbmcgYW55dGhpbmddXHJcbiAgICAhISB1bmRldmVsb3BlZCAhIVxyXG4gICAgUGxheWVyIG1vdmVtZW50IHdpbGwgYmUgaW50ZWdyYXRlZCBpbnRvIHRoZSBzdGF0ZSBtYWNoaW5lIGFzIHdlbGxcclxuICAgICoqKiBtYXliZSBjaGFuZ2UgW25vdCBkb2luZyBhbnl0aGluZ10gdG8gW25vdCBkb2luZyBhbnl0aGluZ11cclxuICAgIFxyXG4gICAgW3AxIG5vdCBkb2luZyBhbnl0aGluZ10gPT0gY2xpY2tzIE1vdmUgY2hhcmFjdGVyID4+IFtzZWxlY3RpbmcgZGVzaXJlZCBtb3ZlXSA9PiBbcDEgbm90IGRvaW5nIGFueXRoaW5nXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFwvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bW92ZSBwbGF5ZXJ9ID0+IFtwMiBub3QgZG9pbmcgYW55dGhpbmddXHJcbiAgICBcclxuICAgICAgICAgICAgICAgICovIFxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLmdhbWUuc3RhdGU7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2xhc3NMaXN0ID0gZXZlbnQudGFyZ2V0LmNsYXNzTGlzdDtcclxuICAgICAgICAgICAgICAgIGxldCBpbm5lckhUTUwgPSBldmVudC50YXJnZXQuaW5uZXJIVE1MO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlID09PSBcIm5vdCBkb2luZyBhbnl0aGluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsYXNzTGlzdC5jb250YWlucyhcImJ1dHRvblwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpbm5lckhUTUwgPT09IFwiUGxhY2UgYSB3YWxsXCIpIHtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVQbGFjZVdhbGxCdXR0b24oZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaW5uZXJIVE1MID09PSBcIk1vdmUgY2hhcmFjdGVyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZW1lbnRCdXR0b24oZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gXCJzZWxlY3Rpbmcgc3F1YXJlc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsYXNzTGlzdC5jb250YWlucyhcImZsb29yXCIpKSB7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVTcXVhcmVDbGljayhldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gXCJzZWxlY3Rpbmcgd2FsbCB0eXBlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2xhc3NMaXN0LmNvbnRhaW5zKFwiYnV0dG9uXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKChpbm5lckhUTUwgPT09IFwiTm9ydGhcIikgfHwgKGlubmVySFRNTCA9PT0gXCJFYXN0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IChpbm5lckhUTUwgPT09IFwiU291dGhcIikgfHwgKGlubmVySFRNTCA9PT0gXCJXZXN0XCIpKSB7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlV2FsbFR5cGVCdXR0b24oaW5uZXJIVE1MLCBldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUgPT09IFwic2VsZWN0aW5nIGRlc2lyZWQgbW92ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYXZhaWxhYmxlTW92ZXMuaW5jbHVkZXMoZXZlbnQudGFyZ2V0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUudGFrZVR1cm4oXCJtb3ZlXCIsIG51bGwsIGV2ZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhY2tcIikuY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hdmFpbGFibGVNb3Zlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdmFpbGFibGVNb3Zlc1tpXS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlnaGxpZ2h0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5zdGF0ZSA9IFwibm90IGRvaW5nIGFueXRoaW5nXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXZhaWxhYmxlTW92ZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUgIT09IFwibm90IGRvaW5nIGFueXRoaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2xhc3NMaXN0LmNvbnRhaW5zKFwiYnV0dG9uXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbm5lckhUTUwgPT09IFwiYmFja1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUJhY2tCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpbm5lckhUTUwgPT09IFwiUmVzdGFydFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICB9IFxyXG5cclxuICAgIGhhbmRsZVBsYWNlV2FsbEJ1dHRvbihldmVudCkge1xyXG4gICAgICAgIHRoaXMudXRpbC50cmFja0Z1bmN0aW9ucyhcImhhbmRsZVBsYWNlV2FsbEJ1dHRvblwiKTtcclxuICAgICAgICAvLyBkZWxldGUgYnRuIGVsZW1lbnQgYW5kIHJlcGxhY2Ugd2l0aCBpbnN0cnVjdGlvbnMgdG9cclxuICAgICAgICAvLyBjbGljayB0d28gZGlzdGluY3Qgc3F1YXJlc1xyXG4gICAgICAgIGlmICh0aGlzLmdhbWUuY3VycmVudFBsYXllciAhPT0gXCJub29uZVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zdGF0ZSA9IFwic2VsZWN0aW5nIHNxdWFyZXNcIjtcclxuICAgICAgICAgICAgbGV0IGJ0biA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiYWNrXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNsaWNrSW5zdHJ1Y3RcIilbMF0uY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW92ZVwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcclxuICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVTcXVhcmVDbGljayhldmVudCkge1xyXG4gICAgICAgIHRoaXMudXRpbC50cmFja0Z1bmN0aW9ucyhcImhhbmRsZVNxdWFyZUNsaWNrXCIpO1xyXG4gICAgICAgIGlmICh0aGlzLmdhbWUuY3VycmVudFBsYXllciAhPT0gXCJub29uZVwiKSB7XHJcbiAgICAgICAgICAgIC8vd2FpdCBmb3IgY2xpZW50IHRvIGNsaWNrIHR3byB2YWxpZCBzcXVhcmVzXHJcbiAgICAgICAgICAgIGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJmbG9vclwiKSkgJiYgKHRoaXMuc3F1YXJlQSA9PT0gbnVsbCkpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRXYWxsXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcXVhcmVBID0gdGFyZ2V0LmlkO1xyXG4gICAgICAgICAgICAgICAgLy9wYXJzZSBzcXVhcmVBXHJcbiAgICAgICAgICAgICAgICAvLyBzcXVhcmVBID0gXCIwMFwiIGFuZCBuZWVkcyB0byBiZSBbMCwgMF1cclxuICAgICAgICAgICAgICAgIGxldCBzcXVhcmUgPSB0aGlzLnNxdWFyZUEuc3BsaXQoXCJcIik7XHJcbiAgICAgICAgICAgICAgICBzcXVhcmVbMF0gPSBwYXJzZUludChzcXVhcmVbMF0pO1xyXG4gICAgICAgICAgICAgICAgc3F1YXJlWzFdID0gcGFyc2VJbnQoc3F1YXJlWzFdKTtcclxuICAgICAgICAgICAgICAgIC8vZ2V0IG5laWdoYm9yc1xyXG4gICAgICAgICAgICAgICAgLy8gcmV0dXJucyBbW25vcnRoXSxbZWFzdF0sW3NvdXRoXSxbd2VzdF1dXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5laWdoYm9ycyA9IHRoaXMuYm9hcmQuY2hlY2tOZWlnaGJvcnMoc3F1YXJlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5uZWlnaGJvcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLm5laWdoYm9yc1tpXVswXSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlkID0gdGhpcy5uZWlnaGJvcnNbaV0uam9pbihcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLmNsYXNzTGlzdC5hZGQoXCJoaWdobGlnaHRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VOZWlnaGJvcnNBcnJheVRvU3RyaW5nKHRoaXMubmVpZ2hib3JzKTsgIFxyXG4gICAgXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJmbG9vclwiKSkgJiYgKHRoaXMuc3F1YXJlQSAhPT0gbnVsbCkgJiYgKHRoaXMuc3F1YXJlQiA9PT0gbnVsbCkpIHtcclxuICAgICAgICAgICAgICAgIGlmKCEhdGhpcy5uZWlnaGJvcnMuaW5jbHVkZXModGFyZ2V0LmlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3F1YXJlQiA9IHRhcmdldC5pZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNxdWFyZUEgIT09IG51bGwgJiYgdGhpcy5zcXVhcmVCICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBzaG91bGQgY3JlYXRlIHR3byBidXR0b25zIGRlcGVuZGluZyBvbiBzcXVhcmVBIGFuZCBzcXVhcmVCIG9yaWVudGF0aW9uXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNsaWNrSW5zdHJ1Y3RcIilbMF0uY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgQSA9IHRoaXMuZ3JpZFt0aGlzLnNxdWFyZUEuc3BsaXQoXCJcIilbMF1dW3RoaXMuc3F1YXJlQS5zcGxpdChcIlwiKVsxXV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBCID0gdGhpcy5ncmlkW3RoaXMuc3F1YXJlQi5zcGxpdChcIlwiKVswXV1bdGhpcy5zcXVhcmVCLnNwbGl0KFwiXCIpWzFdXTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5zcXVhcmVBLnNwbGl0KFwiXCIpWzBdID09PSB0aGlzLnNxdWFyZUIuc3BsaXQoXCJcIilbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnNxdWFyZUEuc3BsaXQoXCJcIilbMF0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYm9keS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibm9ydGhcIilbMF0uY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc3F1YXJlQS5zcGxpdChcIlwiKVswXSA8IDgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzb3V0aFwiKVswXS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNxdWFyZUEuc3BsaXQoXCJcIilbMV0gPT09IHRoaXMuc3F1YXJlQi5zcGxpdChcIlwiKVsxXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc3F1YXJlQS5zcGxpdChcIlwiKVsxXSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ3ZXN0XCIpWzBdLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnNxdWFyZUEuc3BsaXQoXCJcIilbMV0gPCA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYm9keS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZWFzdFwiKVswXS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLm5laWdoYm9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCF0aGlzLm5laWdoYm9yc1tpXS5pbmNsdWRlcyhcIi1cIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlkID0gdGhpcy5uZWlnaGJvcnNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlnaGxpZ2h0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubmVpZ2hib3JzID0gW107XHJcbiAgICAgICAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkV2FsbFwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5zdGF0ZSA9IFwic2VsZWN0aW5nIHdhbGwgdHlwZVwiO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlV2FsbFR5cGVCdXR0b24oZGlyLCBldmVudCkge1xyXG4gICAgICAgIHRoaXMudXRpbC50cmFja0Z1bmN0aW9ucyhcImhhbmRsZVdhbGxUeXBlQnV0dG9uXCIpO1xyXG5cclxuICAgICAgICBsZXQgc2VsZWN0ZWRXYWxscyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzZWxlY3RlZFdhbGxcIik7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3RlZFdhbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB3YWxsID0gc2VsZWN0ZWRXYWxsc1tpXTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB3YWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFdhbGxcIik7XHJcbiAgICAgICAgICAgIH0sMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiBnYW1lIGxvZ2ljICovXHJcbiAgICAgICAgdGhpcy5nYW1lLnRha2VUdXJuKFwicGxhY2VXYWxsXCIsIGRpciwgZXZlbnQsIHRoaXMuc3F1YXJlQSwgdGhpcy5zcXVhcmVCKTtcclxuXHJcbiAgICAgICAgLyogc3R5bGl6ZSAqL1xyXG4gICAgICAgIHRoaXMuYm9keS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibm9ydGhcIilbMF0uY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XHJcbiAgICAgICAgdGhpcy5ib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJlYXN0XCIpWzBdLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xyXG4gICAgICAgIHRoaXMuYm9keS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic291dGhcIilbMF0uY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XHJcbiAgICAgICAgdGhpcy5ib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ3ZXN0XCIpWzBdLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xyXG4gICAgICAgIHRoaXMuYm9keS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYnV0dG9uXCIpWzBdLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmFja1wiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vdmVcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XHJcblxyXG4gICAgICAgIC8qIHJlc2V0dGluZyB1c2VmdWwgdmFyaWFibGVzICovXHJcbiAgICAgICAgdGhpcy5zcXVhcmVBID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNxdWFyZUIgPSBudWxsO1xyXG5cclxuICAgICAgICAvKiBzdGF0ZSBjaGFuZ2UgKi9cclxuICAgICAgICB0aGlzLmdhbWUuc3RhdGUgPSBcIm5vdCBkb2luZyBhbnl0aGluZ1wiO1xyXG5cclxuICAgICAgICAvKiByZW5kZXJzICovXHJcbiAgICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlTW92ZW1lbnRCdXR0b24oZXZlbnQpIHtcclxuICAgICAgICB0aGlzLnV0aWwudHJhY2tGdW5jdGlvbnMoXCJoYW5kbGVNb3ZlbWVudEJ1dHRvblwiKTtcclxuICAgICAgICBpZih0aGlzLmdhbWUuY3VycmVudFBsYXllciAhPT0gXCJub29uZVwiKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmFja1wiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGFjZVwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcclxuICAgICAgICAgICAgbGV0IGF2YWlsYWJsZU1vdmVzO1xyXG4gICAgICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5nYW1lLmN1cnJlbnRQbGF5ZXIgPT09IHRoaXMuZ2FtZS5wbGF5ZXIxSUQgPyB0aGlzLmdhbWUucGxheWVyMSA6IHRoaXMuZ2FtZS5wbGF5ZXIyO1xyXG4gICAgICAgICAgICBsZXQgcm93SWR4ID0gcGFyc2VJbnQocGxheWVyWzBdKTtcclxuICAgICAgICAgICAgbGV0IGNvbElkeCA9IHBhcnNlSW50KHBsYXllclsxXSk7XHJcbiAgICAgICAgICAgIGF2YWlsYWJsZU1vdmVzID0gdGhpcy5nYW1lLmdldEF2YWlsYWJsZU1vdmVzKFtyb3dJZHgsIGNvbElkeF0pO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGF2YWlsYWJsZU1vdmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYXZhaWxhYmxlTW92ZXNbaV0uam9pbihcIlwiKSk7XHJcbiAgICAgICAgICAgICAgICBlbGUuY2xhc3NMaXN0LmFkZChcImhpZ2hsaWdodFwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXZhaWxhYmxlTW92ZXMucHVzaChlbGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8qIHNldCB0aGUgc3RhdGUgdG8gY2hlY2sgaWYgYW4gYXZhaWxhYmxlIG1vdmUgc3F1YXJlIGlzIGNsaWNrZWQuICovXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zdGF0ZSA9IFwic2VsZWN0aW5nIGRlc2lyZWQgbW92ZVwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVCYWNrQnV0dG9uKCkge1xyXG4gICAgICAgIHRoaXMudXRpbC50cmFja0Z1bmN0aW9ucyhcImhhbmRsZUJhY2tCdXR0b25cIik7XHJcbiAgICAgICAgdGhpcy5nYW1lLnN0YXRlID0gXCJub3QgZG9pbmcgYW55dGhpbmdcIjtcclxuICAgICAgICAvKiByZXNldHMgc3RhdGUgKi9cclxuICAgICAgICBsZXQgaW5zdHJ1Y3Rpb25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNvbnRyb2xsZXItZGl2XCIpWzBdLmNoaWxkTm9kZXM7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnN0cnVjdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGluc3RydWN0aW9uc1tpXS5pZCA9PT0gXCJwbGFjZVwiIHx8IGluc3RydWN0aW9uc1tpXS5pZCA9PT0gXCJtb3ZlXCIpIHtcclxuICAgICAgICAgICAgICAgIGluc3RydWN0aW9uc1tpXS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGluc3RydWN0aW9uc1tpXS5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNxdWFyZUEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc3F1YXJlQiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5uZWlnaGJvcnMgPSBudWxsOyAgXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmF2YWlsYWJsZU1vdmVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgdGhpcy5hdmFpbGFibGVNb3Zlc1tpXS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlnaGxpZ2h0XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc2VsZWN0ZWRXYWxscyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzZWxlY3RlZFdhbGxcIik7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3RlZFdhbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB3YWxsID0gc2VsZWN0ZWRXYWxsc1tpXTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB3YWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFdhbGxcIik7XHJcbiAgICAgICAgICAgIH0sMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYXZhaWxhYmxlTW92ZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnNob3coKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VOZWlnaGJvcnNBcnJheVRvU3RyaW5nKGFycmF5KSB7XHJcbiAgICAgICAgdGhpcy51dGlsLnRyYWNrRnVuY3Rpb25zKFwiY2hhbmdlTmVpZ2hib3JzQXJyYXlUb1N0cmluZ1wiKTtcclxuICAgICAgICAvL2NoYW5nZXMgdGhpcy5uZWlnaGJvcnMgdG8gYmUgYWJsZSB0byBiZSByZWFkIGFzIGFuIGFycmF5IG9mIHN0cmluZ3NcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IGFycmF5W2ldLmpvaW4oXCJcIikudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgdGhpcy5uZWlnaGJvcnNbaV0gPSBpZDtcclxuICAgICAgICAgICAgbGV0IGVsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2lkfWApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVCdXR0b24oaW5uZXJUZXh0KSB7XHJcbiAgICAgICAgdGhpcy51dGlsLnRyYWNrRnVuY3Rpb25zKFwiY3JlYXRlQnV0dG9uXCIpO1xyXG4gICAgICAgIGxldCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgIGJ0bi5pbm5lckhUTUwgPSBpbm5lclRleHRcclxuICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnYnV0dG9uJyk7XHJcbiAgICAgICAgaWYgKGlubmVyVGV4dCA9PT0gXCJQbGFjZSBhIHdhbGxcIikge1xyXG4gICAgICAgICAgICBidG4uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJwbGFjZVwiKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlubmVyVGV4dCA9PT0gXCJNb3ZlIGNoYXJhY3RlclwiKSB7XHJcbiAgICAgICAgICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIm1vdmVcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIGlubmVyVGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdjb250cm9sbGVyLWJ0bicpO1xyXG4gICAgICAgIHRoaXMuYm9keS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY29udHJvbGxlci1kaXZcIilbMF0uYXBwZW5kQ2hpbGQoYnRuKTtcclxuICAgICAgICByZXR1cm4gYnRuO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVJlc3RhcnREaXYoYm9hcmQsIHdpbm5lcikge1xyXG4gICAgICAgIHRoaXMudXRpbC50cmFja0Z1bmN0aW9ucyhcImNyZWF0ZVJlc3RhcnREaXZcIik7XHJcbiAgICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgbGV0IGNvbmdyYXRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xyXG4gICAgICAgIGxldCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInJlc3RhcnQtZGl2XCIpO1xyXG4gICAgICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInJlc3RhcnRcIik7XHJcbiAgICAgICAgY29uZ3JhdHMuaW5uZXJIVE1MID0gYENvbmdyYXRzIHRvICR7d2lubmVyfSEhISFgO1xyXG4gICAgICAgIGJ0bi5pbm5lckhUTUwgPSBcIlJlc3RhcnRcIlxyXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChjb25ncmF0cyk7XHJcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKGJ0bik7XHJcbiAgICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXR1cEJvYXJkKCkge1xyXG4gICAgICAgIHRoaXMudXRpbC50cmFja0Z1bmN0aW9ucyhcInNldHVwQm9hcmRcIik7XHJcbiAgICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgbGV0IGJvYXJkRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICB0aGlzLmJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgICAgICBsZXQgYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIik7XHJcbiAgICAgICAgYm9hcmREaXYuYXBwZW5kQ2hpbGQoYm9hcmQpO1xyXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChib2FyZERpdik7XHJcbiAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJ0YWJsZVwiKTtcclxuICAgICAgICBib2FyZC5zZXRBdHRyaWJ1dGUoXCJpZFwiICwgXCJib2FyZFwiKTtcclxuICAgICAgICBsZXQgd2hvc1R1cm4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIHdob3NUdXJuLmNsYXNzTGlzdC5hZGQoXCJwbGF5ZXItdHVyblwiKTtcclxuICAgICAgICB3aG9zVHVybi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInBsYXllci10dXJuXCIpO1xyXG4gICAgICAgIHdob3NUdXJuLmlubmVySFRNTCA9IFwiUGxheWVyIDEncyBUdXJuXCI7XHJcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKHdob3NUdXJuKTtcclxuICAgICAgICBsZXQgY250cmxEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGNudHJsRGl2LmNsYXNzTGlzdC5hZGQoXCJjb250cm9sbGVyLWRpdlwiKTtcclxuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoY250cmxEaXYpO1xyXG4gICAgICAgIGxldCB3YWxsQ291bnRlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgd2FsbENvdW50ZXJEaXYuY2xhc3NMaXN0LmFkZChcIndhbGwtY291bnRlci1kaXZcIik7XHJcbiAgICAgICAgd2FsbENvdW50ZXJEaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJ3YWxsLWNvdW50ZXJcIik7XHJcbiAgICAgICAgbGV0IHBsYXllcjFXYWxscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgbGV0IHBsYXllcjJXYWxscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgcGxheWVyMVdhbGxzLmNsYXNzTGlzdC5hZGQoXCJ3YWxsLWNvdW50ZXJcIik7XHJcbiAgICAgICAgcGxheWVyMldhbGxzLmNsYXNzTGlzdC5hZGQoXCJ3YWxsLWNvdW50ZXJcIik7XHJcbiAgICAgICAgcGxheWVyMVdhbGxzLmlubmVySFRNTCA9IFwicGxheWVyIDEgaGFzIDEwIHdhbGxzIGxlZnRcIjtcclxuICAgICAgICBwbGF5ZXIyV2FsbHMuaW5uZXJIVE1MID0gXCJwbGF5ZXIgMiBoYXMgMTAgd2FsbHMgbGVmdFwiO1xyXG4gICAgICAgIHdhbGxDb3VudGVyRGl2LmFwcGVuZENoaWxkKHBsYXllcjFXYWxscyk7XHJcbiAgICAgICAgd2FsbENvdW50ZXJEaXYuYXBwZW5kQ2hpbGQocGxheWVyMldhbGxzKTtcclxuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQod2FsbENvdW50ZXJEaXYpO1xyXG5cclxuICAgICAgICAvL2J1aWxkIHdhbGxzIGJ1dHRvblxyXG4gICAgICAgIHRoaXMuY3JlYXRlQnV0dG9uKFwiUGxhY2UgYSB3YWxsXCIpO1xyXG4gICAgICAgIC8vbW92ZW1lbnQgYnV0dG9uXHJcbiAgICAgICAgdGhpcy5jcmVhdGVCdXR0b24oXCJNb3ZlIGNoYXJhY3RlclwiKTtcclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIC8qIGluc3RydWN0aW9uIGZvciBjbGlja2luZyBzcXVhcmVzICovXHJcbiAgICAgICAgbGV0IGNsaWNrSW5zdHJ1Y3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgICAgICBjbGlja0luc3RydWN0LmNsYXNzTGlzdC5hZGQoXCJjbGlja0luc3RydWN0XCIpO1xyXG4gICAgICAgIGNsaWNrSW5zdHJ1Y3QuaW5uZXJIVE1MID0gXCJDbGljayB0d28gZGlzdGluY3Qgc3F1YXJlcy4uLlwiXHJcbiAgICAgICAgY2xpY2tJbnN0cnVjdC5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcclxuICAgICAgICBjbnRybERpdi5hcHBlbmRDaGlsZChjbGlja0luc3RydWN0KTtcclxuICAgICAgICAvKiB3YWxsIHR5cGUgYnV0dG9ucyAqL1xyXG4gICAgICAgIGxldCBub3J0aCA9IHRoaXMuY3JlYXRlQnV0dG9uKFwiTm9ydGhcIik7XHJcbiAgICAgICAgbGV0IGVhc3QgPSB0aGlzLmNyZWF0ZUJ1dHRvbihcIkVhc3RcIik7XHJcbiAgICAgICAgbGV0IHNvdXRoID0gdGhpcy5jcmVhdGVCdXR0b24oXCJTb3V0aFwiKTtcclxuICAgICAgICBsZXQgd2VzdCA9IHRoaXMuY3JlYXRlQnV0dG9uKFwiV2VzdFwiKTtcclxuICAgICAgICBub3J0aC5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiLCBcIm5vcnRoXCIpO1xyXG4gICAgICAgIGVhc3QuY2xhc3NMaXN0LmFkZChcImhpZGVcIiwgXCJlYXN0XCIpO1xyXG4gICAgICAgIHNvdXRoLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIsIFwic291dGhcIik7XHJcbiAgICAgICAgd2VzdC5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiLCBcIndlc3RcIik7XHJcbiAgICAgICAgY250cmxEaXYuYXBwZW5kQ2hpbGQobm9ydGgpO1xyXG4gICAgICAgIGNudHJsRGl2LmFwcGVuZENoaWxkKHNvdXRoKTtcclxuICAgICAgICBjbnRybERpdi5hcHBlbmRDaGlsZCh3ZXN0KTtcclxuICAgICAgICBjbnRybERpdi5hcHBlbmRDaGlsZChlYXN0KTtcclxuXHJcbiAgICAgICAgLyogYmFjayBidXR0b24gKi9cclxuICAgICAgICBsZXQgYmFjayA9IHRoaXMuY3JlYXRlQnV0dG9uKFwiYmFja1wiKTtcclxuICAgICAgICBiYWNrLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xyXG4gICAgICAgIGNudHJsRGl2LmFwcGVuZENoaWxkKGJhY2spO1xyXG5cclxuICAgICAgICBmb3IobGV0IHJvd0lkeCA9IDA7IHJvd0lkeCA8IDk7IHJvd0lkeCsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcclxuICAgICAgICAgICAgZm9yKGxldCBjb2xJZHggPSAwOyBjb2xJZHggPCA5OyBjb2xJZHgrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgICAgICAgICAgdGQuaWQgPSBgJHtyb3dJZHh9JHtjb2xJZHh9YDtcclxuICAgICAgICAgICAgICAgIHRkLmNsYXNzTGlzdC5hZGQoXCJmbG9vclwiLCBcImhhbGxcIik7XHJcbiAgICAgICAgICAgICAgICB0ci5hcHBlbmRDaGlsZCh0ZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQodHIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNxdWFyZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb2xJZHgsIHJvd0lkeCkge1xyXG4gICAgICAgIHRoaXMud2FsbHMgPSB7XHJcbiAgICAgICAgICAgIE5vcnRoOiBmYWxzZSxcclxuICAgICAgICAgICAgRWFzdDogZmFsc2UsXHJcbiAgICAgICAgICAgIFNvdXRoOiBmYWxzZSxcclxuICAgICAgICAgICAgV2VzdDogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb2xJZHggPSBjb2xJZHg7XHJcbiAgICAgICAgdGhpcy5yb3dJZHggPSByb3dJZHg7IFxyXG4gICAgICAgIHRoaXMucGxheWVyID0gXCJlbXB0eVwiO1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSBcIm5vb25lXCJcclxuICAgIH1cclxuXHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVdGlsIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubWFwID0gbmV3IE1hcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRyYWNrRnVuY3Rpb25zKGtleSkge1xyXG4gICAgICAgIGlmKHRoaXMubWFwW2tleV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLm1hcC5zZXQoa2V5LCAxKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5tYXBba2V5XSA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm1hcC5zZXQoa2V5LCAxKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiOyIsIi8vIGltcG9ydCBfLCB7IHRocm90dGxlIH0gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0ICcuL3N0eWxlLnNjc3MnO1xyXG5pbXBvcnQgSWNvbiBmcm9tICcuL2ljb24ucG5nJztcclxuaW1wb3J0IEdhbWVWaWV3IGZyb20gJy4vZ2FtZV92aWV3JztcclxuaW1wb3J0IEdhbWUgZnJvbSAnLi9nYW1lJztcclxuaW1wb3J0IHsgaW8gfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcclxuXHJcblxyXG5mdW5jdGlvbiBpY29uQ29tcG9uZW50KCkge1xyXG4gICAgXHJcbiAgICAvLyBBZGQgdGhlIGltYWdlIHRvIG91ciBleGlzdGluZyBkaXYuXHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xyXG4gICAgZWxlbWVudC5yZWwgPSBcImljb25cIjtcclxuICAgIGVsZW1lbnQuaHJlZiA9IEljb247XHJcbiAgICBlbGVtZW50LnR5cGUgPSAnaW1hZ2UvcG5nJztcclxuXHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9iYnlTcGxhc2goc29ja2V0KSB7XHJcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IGNyZWF0ZVJvb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIGNvbnN0IGpvaW5Sb29tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBkaXYuc2V0QXR0cmlidXRlKCdpZCcsICdzcGxhc2gtZGl2Jyk7XHJcbiAgICBjcmVhdGVSb29tLnNldEF0dHJpYnV0ZSgnaWQnLCAnY3JlYXRlLXJvb20tYnV0dG9uJyk7XHJcbiAgICBjcmVhdGVSb29tLmlubmVySFRNTCA9IFwiQ3JlYXRlIEEgUm9vbVwiO1xyXG4gICAgY3JlYXRlUm9vbS5jbGFzc0xpc3QuYWRkKFwiYnRuXCIpO1xyXG4gICAgam9pblJvb20uc2V0QXR0cmlidXRlKCdpZCcsICdqb2luLXJvb20tYnV0dG9uJyk7XHJcbiAgICBqb2luUm9vbS5pbm5lckhUTUwgPSBcIkpvaW4gQSBSb29tXCI7XHJcbiAgICBqb2luUm9vbS5jbGFzc0xpc3QuYWRkKFwiYnRuXCIpO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKGNyZWF0ZVJvb20pO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKGpvaW5Sb29tKTtcclxuXHJcbiAgICAvKiogRXZlbnQgTGlzdGVuZXIgZm9yIGNyZWF0ZVJvb20gYW5kIGpvaW5Sb29tICovXHJcbiAgICBjcmVhdGVSb29tLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIC8qKiBkZWxldGVzIGRpdiBhbmQgYWRkcyBhIGZvcm0gdG8gY3JlYXRlIGEgcm9vbSAqL1xyXG4gICAgICAgIGRpdi5yZW1vdmUoKTtcclxuICAgICAgICBjcmVhdGVSb29tRm9ybShzb2NrZXQpO1xyXG4gICAgfSk7XHJcbiAgICBqb2luUm9vbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAvKiogZW1pdHMgZ2V0Um9vbU5hbWVzIGFuZCBtYWtlIHRoZSByb29tIG5hbWVzIGJ1dHRvbnMgKi9cclxuICAgICAgICBjb25zdCBjYWxsYmFjayA9IChyb29tTmFtZXMpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbnVtYmVyT2ZSb29tcyA9IGxvYmJ5Um9vbXNMaXN0KHNvY2tldCwgcm9vbU5hbWVzKTtcclxuICAgICAgICAgICAgaWYgKG51bWJlck9mUm9vbXMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBkaXYucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9iYnktcm9vbXMtbGlzdC1kaXYnKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgc29ja2V0LmVtaXQoJ2dldFJvb21OYW1lcycsIGNhbGxiYWNrKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0uYXBwZW5kQ2hpbGQoZGl2KTtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9iYnlSb29tc0xpc3Qoc29ja2V0LCByb29tTmFtZXMpIHtcclxuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGl2LnNldEF0dHJpYnV0ZSgnaWQnLCAnbG9iYnktcm9vbXMtbGlzdC1kaXYnKTtcclxuICAgIGNvbnN0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuICAgIGNvbnN0IGNhbGxiYWNrID0gKCkgPT4ge1xyXG4gICAgICAgIHNvY2tldC5lbWl0KCdyZWFkeScpO1xyXG4gICAgfTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm9vbU5hbWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHJvb21OYW1lc1tpXS5zb2NrZXRzIDwgMikge1xyXG4gICAgICAgICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgICAgICBsaS5hcHBlbmRDaGlsZChidXR0b24pO1xyXG4gICAgICAgICAgICBidXR0b24uaW5uZXJIVE1MID0gcm9vbU5hbWVzW2ldLm5hbWU7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYnRuXCIpO1xyXG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGl2LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgc29ja2V0LmVtaXQoJ2pvaW5Sb29tJywgcm9vbU5hbWVzW2ldLmlkLCBjYWxsYmFjayk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB1bC5hcHBlbmRDaGlsZChsaSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZGl2LmFwcGVuZENoaWxkKHVsKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgIHJldHVybiByb29tTmFtZXMubGVuZ3RoO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVSb29tRm9ybShzb2NrZXQpIHtcclxuXHJcbiAgICBjb25zdCByb29tRm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xyXG4gICAgY29uc3QgZm9ybURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBjb25zdCByb29tSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICBjb25zdCByb29tQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIHJvb21Gb3JtLnNldEF0dHJpYnV0ZShcImlkXCIsIFwicm9vbS1mb3JtXCIpO1xyXG4gICAgZm9ybURpdi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImZvcm0tZGl2XCIpO1xyXG4gICAgcm9vbUlucHV0LnNldEF0dHJpYnV0ZShcImlkXCIsIFwicm9vbS1pbnB1dFwiKTtcclxuICAgIHJvb21JbnB1dC5zZXRBdHRyaWJ1dGUoXCJwbGFjZWhvbGRlclwiLCBcIlR5cGUgcm9vbSBuYW1lXCIpO1xyXG4gICAgcm9vbUJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInJvb20tYnV0dG9uXCIpO1xyXG4gICAgcm9vbUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYnRuXCIpO1xyXG4gICAgcm9vbUJ1dHRvbi5pbm5lckhUTUwgPSBcIkdvIVwiXHJcblxyXG4gICAgZm9ybURpdi5hcHBlbmRDaGlsZChyb29tRm9ybSk7XHJcbiAgICByb29tRm9ybS5hcHBlbmRDaGlsZChyb29tSW5wdXQpO1xyXG4gICAgcm9vbUZvcm0uYXBwZW5kQ2hpbGQocm9vbUJ1dHRvbik7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilbMF0uYXBwZW5kQ2hpbGQoZm9ybURpdik7XHJcbiAgICBcclxuXHJcblxyXG4gICAgcm9vbUZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgaWYgKHJvb21JbnB1dC52YWx1ZSkge1xyXG4gICAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IChib29sKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihib29sKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybURpdi5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICBzb2NrZXQuZW1pdCgncmVhZHknKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm9vbUlucHV0LnNldEF0dHJpYnV0ZShcInBsYWNlaG9sZGVyXCIsIFwiUm9vbSBMaXN0IGlzIGZ1bGxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDMwMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzb2NrZXQuZW1pdCgnY3JlYXRlUm9vbScsIHJvb21JbnB1dC52YWx1ZSwgY2FsbGJhY2spO1xyXG4gICAgICAgICAgICByb29tSW5wdXQudmFsdWUgPSAnJztcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBzb2NrZXQub24oJ2pvaW4tcm9vbScsIChyb29tSUQpID0+IHtcclxuICAgICAgICBmb3JtRGl2LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xyXG4gICAgICAgIGdhbWVMb2JieShzb2NrZXQsIHJvb21JRCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzb2NrZXQub24oJ2xvYmJ5LW1lc3NhZ2UnLCAoW2lkLCBtc2ddKSA9PiB7XHJcbiAgICAgICAgbGV0IGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgICAgIGl0ZW0udGV4dENvbnRlbnQgPSBpZCArIFwiIC0+IFwiICsgbXNnO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2JieS1tZXNzYWdlcycpLmFwcGVuZENoaWxkKGl0ZW0pO1xyXG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzb2NrZXQub24oJ3N0YXJ0LWdhbWUnLCAoW3NvY2tldCwgcm9vbV0pID0+IHtcclxuICAgICAgICBpZighZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndGFibGUnKVswXSkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9iYnktZGl2JykuY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XHJcbiAgICAgICAgICAgIGdhbWVUYWJsZShzb2NrZXQsIHJvb20pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnYW1lTG9iYnkoc29ja2V0LCByb29tKSB7XHJcbiAgICBpZighZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYmJ5LWRpdicpKSB7XHJcbiAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBjb25zdCBoMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKVxyXG4gICAgICAgIGNvbnN0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xyXG4gICAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcclxuICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0R2FtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgZGl2LnNldEF0dHJpYnV0ZShcImlkXCIsIFwibG9iYnktZGl2XCIpO1xyXG4gICAgICAgIGgxLmlubmVySFRNTCA9IHJvb207XHJcbiAgICAgICAgaDEuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJsb2JieS1pZFwiKTtcclxuICAgICAgICB1bC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImxvYmJ5LW1lc3NhZ2VzXCIpO1xyXG4gICAgICAgIHN0YXJ0R2FtZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImxvYmJ5LXN0YXJ0LWdhbWVcIik7XHJcbiAgICAgICAgc3RhcnRHYW1lLmlubmVySFRNTCA9IFwiU3RhcnQgR2FtZSFcIjtcclxuICAgICAgICBmb3JtLnNldEF0dHJpYnV0ZShcImlkXCIsIFwibG9iYnktZm9ybVwiKTtcclxuICAgICAgICBmb3JtLnNldEF0dHJpYnV0ZShcImFjdGlvblwiLCBcIlwiKTtcclxuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImxvYmJ5LWlucHV0XCIpO1xyXG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZShcImF1dG9jb21wbGV0ZVwiLCBcIm9mZlwiKTtcclxuICAgICAgICBidXR0b24uaW5uZXJIVE1MID0gXCJzZW5kXCI7XHJcbiAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChpbnB1dCk7XHJcbiAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChidXR0b24pO1xyXG4gICAgICAgIHVsLmFwcGVuZENoaWxkKGZvcm0pO1xyXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChoMSk7XHJcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKHVsKTtcclxuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoc3RhcnRHYW1lKTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilbMF0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgaWYgKGlucHV0LnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBzb2NrZXQuZW1pdCgnbG9iYnktbWVzc2FnZScsIFtyb29tLCBpbnB1dC52YWx1ZV0pO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSAnJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHN0YXJ0R2FtZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIHNvY2tldC5lbWl0KCdzdGFydC1nYW1lJywgW3NvY2tldC5pZCwgcm9vbV0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdhbWVUYWJsZShzb2NrZXQsIEpTT05yb29tKSB7XHJcbiAgICBjb25zdCByb29tID0gSlNPTi5wYXJzZShKU09Ocm9vbSk7XHJcbiAgICBjb25zdCBnYW1lID0gbmV3IEdhbWUoc29ja2V0LCByb29tKTtcclxuICAgIGxldCB3aW5uZXIgPSBudWxsO1xyXG4gICAgLy8gc2V0dXBCb2FyZCgpO1xyXG4gICAgY29uc3QgZ2FtZVZpZXcgPSBuZXcgR2FtZVZpZXcoc29ja2V0LCByb29tLCBnYW1lKTtcclxuICAgIGdhbWUuc3RhcnQoKTtcclxuICAgIGdhbWVWaWV3LnNob3coKTtcclxuXHJcbiAgICBzb2NrZXQub24oJ3BsYXllck1vdmUnLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgIGxldCBvbGRSb3cgPSBkYXRhLm9sZFBvc1swXTtcclxuICAgICAgICBsZXQgb2xkQ29sID0gZGF0YS5vbGRQb3NbMV07XHJcbiAgICAgICAgbGV0IG5ld1JvdyA9IGRhdGEubmV3UG9zWzBdO1xyXG4gICAgICAgIGxldCBuZXdDb2wgPSBkYXRhLm5ld1Bvc1sxXTtcclxuICAgICAgICBnYW1lLmJvYXJkLmdyaWRbb2xkUm93XVtvbGRDb2xdLnBsYXllciA9IFwiZW1wdHlcIjtcclxuICAgICAgICBnYW1lLmJvYXJkLmdyaWRbbmV3Um93XVtuZXdDb2xdLnBsYXllciA9IGRhdGEucGxheWVyO1xyXG4gICAgICAgIGdhbWUuc3dhcFR1cm4oKTtcclxuICAgICAgICBnYW1lVmlldy5zaG93KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzb2NrZXQub24oJ3BsYWNlV2FsbCcsIChkYXRhKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcG9zQSA9IGRhdGEud2FsbEE7XHJcbiAgICAgICAgY29uc3QgcG9zQiA9IGRhdGEud2FsbEI7XHJcbiAgICAgICAgY29uc3QgcG9zQyA9IGRhdGEud2FsbEM7XHJcbiAgICAgICAgY29uc3QgcG9zRCA9IGRhdGEud2FsbEQ7XHJcbiAgICAgICAgY29uc3Qgc3FyQSA9IGdhbWUuYm9hcmQuZ3JpZFtwb3NBWzBdXVtwb3NBWzFdXTtcclxuICAgICAgICBjb25zdCBzcXJCID0gZ2FtZS5ib2FyZC5ncmlkW3Bvc0JbMF1dW3Bvc0JbMV1dO1xyXG4gICAgICAgIGNvbnN0IHNxckMgPSBnYW1lLmJvYXJkLmdyaWRbcG9zQ1swXV1bcG9zQ1sxXV07XHJcbiAgICAgICAgY29uc3Qgc3FyRCA9IGdhbWUuYm9hcmQuZ3JpZFtwb3NEWzBdXVtwb3NEWzFdXTtcclxuICAgICAgICBpZiAoIGRhdGEuZGlyID09PSBcIm5vcnRoXCIgKSB7XHJcbiAgICAgICAgICAgIHNxckEud2FsbHMuTm9ydGggPSB0cnVlO1xyXG4gICAgICAgICAgICBzcXJCLndhbGxzLk5vcnRoID0gdHJ1ZTtcclxuICAgICAgICAgICAgc3FyQy53YWxscy5Tb3V0aCA9IHRydWU7XHJcbiAgICAgICAgICAgIHNxckQud2FsbHMuU291dGggPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS5kaXIgPT09IFwic291dGhcIiApIHtcclxuICAgICAgICAgICAgc3FyQS53YWxscy5Tb3V0aCA9IHRydWU7XHJcbiAgICAgICAgICAgIHNxckIud2FsbHMuU291dGggPSB0cnVlO1xyXG4gICAgICAgICAgICBzcXJDLndhbGxzLk5vcnRoID0gdHJ1ZTtcclxuICAgICAgICAgICAgc3FyRC53YWxscy5Ob3J0aCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLmRpciA9PT0gXCJlYXN0XCIgKSB7XHJcbiAgICAgICAgICAgIHNxckEud2FsbHMuRWFzdCA9IHRydWU7XHJcbiAgICAgICAgICAgIHNxckIud2FsbHMuRWFzdCA9IHRydWU7XHJcbiAgICAgICAgICAgIHNxckMud2FsbHMuV2VzdCA9IHRydWU7XHJcbiAgICAgICAgICAgIHNxckQud2FsbHMuV2VzdCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLmRpciA9PT0gXCJ3ZXN0XCIgKSB7XHJcbiAgICAgICAgICAgIHNxckEud2FsbHMuV2VzdCA9IHRydWU7XHJcbiAgICAgICAgICAgIHNxckIud2FsbHMuV2VzdCA9IHRydWU7XHJcbiAgICAgICAgICAgIHNxckMud2FsbHMuRWFzdCA9IHRydWU7XHJcbiAgICAgICAgICAgIHNxckQud2FsbHMuRWFzdCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2FtZS5zd2FwVHVybigpO1xyXG4gICAgICAgIGdhbWVWaWV3LnNob3coKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHNvY2tldC5vbignZ2FtZU92ZXInLCAoaWQpID0+IHtcclxuICAgICAgICBnYW1lLmN1cnJlbnRQbGF5ZXIgPSBcIm5vb25lXCI7XHJcbiAgICAgICAgbGV0IHRhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndGFibGUnKVswXTtcclxuICAgICAgICBpZiAodGFibGUpIHtcclxuICAgICAgICAgICAgdGFibGUucmVtb3ZlKCk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBpZiAoIXdpbm5lcikge1xyXG4gICAgICAgICAgICB3aW5uZXIgPSBpZDtcclxuICAgICAgICAgICAgZ2FtZU92ZXIoc29ja2V0LmlkLCBpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBcclxuICogQHBhcmFtIHt3aW5uZXJ9IHdpbm5lciBJcyBhbiBJRCBvZiB0aGUgd2lubmVyIG9mIHRoZSBnYW1lLlxyXG4gKiBEaXNwbGF5cyB0aGUgd2lubmVyIGFuZCB0aGVuIHJlbG9hZHMgdGhlIHBhZ2UuIFxyXG4gKi9cclxuZnVuY3Rpb24gZ2FtZU92ZXIoc29ja2V0SWQsIHdpbm5lcikge1xyXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBkaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJ3aW5uZXItZGl2XCIpO1xyXG4gICAgY29uc3QgbWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XHJcbiAgICBtZXNzYWdlLnNldEF0dHJpYnV0ZShcImlkXCIsIFwid2lubmVyLW1lc3NhZ2VcIik7XHJcbiAgICBtZXNzYWdlLmlubmVySFRNTCA9IHNvY2tldElkID09PSB3aW5uZXIgPyBcIkNPTkdSQVRTIFlPVSBXT04hISFcIiA6IFwic3Vja3MgdG8gc3Vjay4uIHRyeSBhZ2FpbiBuZXh0IHRpbWVcIjtcclxuICAgIGRpdi5hcHBlbmRDaGlsZChtZXNzYWdlKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYm9keVwiKVswXS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICB9LDUwMDApO1xyXG59XHJcblxyXG5kb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGljb25Db21wb25lbnQoKSk7XHJcblxyXG5cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIFxyXG4gICAgY29uc3Qgc29ja2V0ID0gaW8oKTtcclxuICAgIC8vIGNvbnN0IHJvb20gPSB7XHJcbiAgICAvLyAgICAgaWQ6IFwieHh4eHh4eFwiLCBcclxuICAgIC8vICAgICBuYW1lOiBcInJvb21cIiwgXHJcbiAgICAvLyAgICAgc29ja2V0czogW1widGVzdDFcIiwgXCJ0ZXN0MlwiXSxcclxuICAgIC8vICAgICBwbGF5ZXIxOiAndGVzdDEnLFxyXG4gICAgLy8gICAgIHBsYXllcjI6ICd0ZXN0MicsXHJcbiAgICAvLyB9O1xyXG4gICAgLy8gZ2FtZVRhYmxlKHNvY2tldCwgSlNPTi5zdHJpbmdpZnkocm9vbSkpO1xyXG5cclxuICAgIGxvYmJ5U3BsYXNoKHNvY2tldCk7XHJcblxyXG4gICAgc29ja2V0Lm9uKCdpbml0R2FtZScsIChyb29tKSA9PiB7XHJcbiAgICAgICAgZ2FtZVRhYmxlKHNvY2tldCwgcm9vbSk7XHJcbiAgICB9KTtcclxuXHJcbn0pO1xyXG5cclxuXHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9