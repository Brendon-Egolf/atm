/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by begolf123 on 4/22/16
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _FileReader = __webpack_require__(1);

	var _User = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./User.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	'use strict';

	var main = function () {
	    function main() {
	        _classCallCheck(this, main);

	        console.log('Hello World!!');
	        document.getElementById('card-number').focus();
	        document.getElementById('submit').addEventListener('click', function () {
	            main.login(document.getElementById('card-number').value, document.getElementById('pin').value);
	        });

	        document.getElementById('card-number').addEventListener('keypress', function (e) {
	            var key = e.which || e.keyCode;
	            if (key === 13) {
	                // 13 is enter
	                main.login(document.getElementById('card-number').value, document.getElementById('pin').value);
	            }
	        });

	        document.getElementById('pin').addEventListener('keypress', function (e) {
	            var key = e.which || e.keyCode;
	            if (key === 13) {
	                // 13 is enter
	                main.login(document.getElementById('card-number').value, document.getElementById('pin').value);
	            }
	        });
	    }

	    _createClass(main, null, [{
	        key: "verifyCard",
	        value: function verifyCard(cardNumber) {
	            var regExp = new RegExp('^[0-9]{3}$');
	            return regExp.test(cardNumber);
	        }
	    }, {
	        key: "verifyPin",
	        value: function verifyPin(pinNumber) {
	            var regExp = new RegExp('^[0-9]{1}$');
	            return regExp.test(pinNumber);
	        }
	    }, {
	        key: "login",
	        value: function login(cardNumber, pinNumber) {
	            var CARD_NUMBER = 0;

	            if (main.verifyCard(cardNumber) && main.verifyPin(pinNumber)) {
	                _FileReader.FileReader.loadData('/atm/data/users.csv', function (fileData) {
	                    var userData = [];
	                    for (var i = 0; i < fileData.length; i++) {
	                        if (cardNumber == fileData[i][CARD_NUMBER]) {
	                            //console.log('user ' + i);
	                            this.fileData = fileData;
	                            userData = fileData[i];
	                            //userData.forEach(function(value) {
	                            //console.log(value);
	                            //});
	                            break;
	                        }
	                    }
	                    if (userData != null) {
	                        var PIN = 1;
	                        if (userData[PIN] == pinNumber) {
	                            //console.log('correct!');
	                            userData.shift();
	                            userData.shift();
	                            this.user = new _User.User(userData);
	                        } else {
	                            //console.log('incorrect?');
	                            document.getElementById('warning').innerHTML = 'Incorrect PIN';
	                        }
	                    } else {
	                        //console.log('card not found');
	                        document.getElementById('warning').innerHTML = 'This card number is not in our database';
	                    }
	                });
	            } else {
	                //console.log('invalid entry');
	                document.getElementById('warning').innerHTML = main.verifyCard(cardNumber) ? 'pin must be 1 digit long' : 'Card number must be 3 digits long';
	            }
	        }
	    }, {
	        key: "sendData",
	        value: function sendData() {
	            var request = new XMLHttpRequest();
	            var BUST_CACHE = '?' + new Date().getTime();
	            var userData = this.user.getUserData();

	            for (var i = 0; i < this.fileData.length; i++) {
	                if (userData[0] == this.fileData[i][3]) {
	                    for (var j = 2; j < this.fileData[i].length; j++) {
	                        this.fileData[i][j] = userData[j - 2];
	                    }
	                }
	            }

	            request.open('POST', BUST_CACHE, true);
	            request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	            request.send(this.fileData);
	        }
	    }]);

	    return main;
	}();

	window.onload = function () {
	    new main();
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by begolf123 on 4/22/16.
	 */

	var FileReader = exports.FileReader = function () {
	    function FileReader() {
	        _classCallCheck(this, FileReader);
	    }

	    _createClass(FileReader, null, [{
	        key: "loadData",
	        value: function loadData(filePath, callback) {
	            var request = new XMLHttpRequest();
	            request.open("GET", filePath, true);
	            request.send();
	            request.onload = function () {
	                var COLUMNS = 7;
	                var data = void 0,
	                    middleData = void 0,
	                    finalData = [];
	                if (request.readyState === 4 && request.status === 200) {
	                    data = request.responseText.split(/\n/);
	                }
	                for (var i = 0; i < data.length; i++) {
	                    middleData = data[i].split(/,/);
	                    finalData[i] = []; //makes it an MD array
	                    for (var j = 0; j < COLUMNS; j++) {
	                        finalData[i][j] = middleData[j];
	                    }
	                }
	                callback(finalData);
	            };
	        }
	    }]);

	    return FileReader;
	}();

/***/ }
/******/ ]);