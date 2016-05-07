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

	/* WEBPACK VAR INJECTION */(function(__dirname) {"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _FileReader = __webpack_require__(1);

	var _User = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var VERSION = '2.5.1';
	/*
	 * Created by begolf123 on 4/22/16
	 */

	'use strict';

	var main = function () {
	    function main() {
	        _classCallCheck(this, main);

	        console.log(VERSION);

	        document.getElementById('card-number').focus();

	        document.getElementById('submit').addEventListener('click', function () {
	            main.login(document.getElementById('card-number').value, document.getElementById('pin').value);
	        });

	        document.getElementById('card-number').addEventListener('keypress', function (e) {
	            var key = e.which || e.keyCode;
	            if (key === 13) {
	                // 13 is enter
	                if (document.getElementById('pin').value) {
	                    main.login(document.getElementById('card-number').value, document.getElementById('pin').value);
	                } else {
	                    document.getElementById('pin').focus();
	                }
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
	                _FileReader.FileReader.loadData(__dirname + 'data/users.csv', function (fileData) {
	                    var userData = [];
	                    for (var i = 0; i < fileData.length; i++) {
	                        if (cardNumber == fileData[i][CARD_NUMBER]) {
	                            //console.log('user ' + i);
	                            userData = fileData[i];
	                            //userData.forEach(function(value) {
	                            //console.log(value);
	                            //});
	                            break;
	                        }
	                    }
	                    //console.log(userData[0]);
	                    if (userData != null) {
	                        var PIN = 1;
	                        if (userData[PIN] == pinNumber) {
	                            //console.log('correct!');
	                            //userData.shift();
	                            //userData.shift();
	                            new _User.User(userData);
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
	    }]);

	    return main;
	}();

	window.onload = function () {
	    new main();
	};
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

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

/***/ },
/* 2 */
/***/ function(module, exports) {

	/*  AUTHOR: begolf123
	 *  VERSION: 1.0
	 *  CREATED: 04.24.2016
	 */

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var that = null;

	var User = exports.User = function () {
	    function User(userData) {
	        _classCallCheck(this, User);

	        this.userData = userData;
	        this.setUserData();
	        that = this;

	        document.getElementById('deposit-checking').addEventListener('click', function () {
	            var depositView = document.getElementById('deposit-checking-input');
	            var depositValue = document.getElementById('deposit-checking-value');
	            depositView.style.display = 'block';
	            depositValue.focus();
	            if (userData[2] == 'Satan') depositValue.type = 'text';
	            depositValue.addEventListener('keypress', function (e) {
	                var key = e.which || e.keyCode;
	                var CHECKING_BALANCE = 4;
	                var warning = document.getElementById('checking-warning');
	                if (key === 13 && depositValue.value != '') {
	                    //enter
	                    if (Number.parseInt(depositValue.value) >= 0) {
	                        //console.log(that.userData[CHECKING_BALANCE] + ' + ' + depositValue.value);
	                        that.userData[CHECKING_BALANCE] = Number.parseInt(that.userData[CHECKING_BALANCE]) + Number.parseInt(depositValue.value);
	                        depositValue.value = '';
	                        depositView.style.display = 'none';
	                        that.setUserData();
	                        warning.style.display = 'none';
	                        warning.innerHtml = '';
	                    } else if (userData[0] == 'Satan' && depositValue.value.toLowerCase() == 'holy water') {
	                        document.querySelector('body').innerHTML = 'Account banished.';
	                    } else {
	                        warning.style.display = 'block';
	                        warning.innerHTML = 'Invalid deposit amount';
	                    }
	                } else if (key === 13 && depositValue.value == '') {
	                    depositView.style.display = 'none';
	                }
	            });
	        });

	        document.getElementById('withdraw-checking').addEventListener('click', function () {
	            var withdrawView = document.getElementById('withdraw-checking-input');
	            var withdrawValue = document.getElementById('withdraw-checking-value');
	            withdrawView.style.display = 'block';
	            withdrawValue.focus();
	            withdrawValue.addEventListener('keypress', function (e) {
	                var key = e.which || e.keyCode;
	                var CHECKING_BALANCE = 4;
	                var warning = document.getElementById('checking-warning');
	                if (key === 13 && withdrawValue.value != '') {
	                    //enter
	                    if (Number.parseInt(withdrawValue.value) <= userData[CHECKING_BALANCE] && Number.parseInt(withdrawValue.value) >= 0) {
	                        //console.log(that.userData[CHECKING_BALANCE] + ' - ' + withdrawValue.value);
	                        that.userData[CHECKING_BALANCE] = Number.parseInt(that.userData[CHECKING_BALANCE]) - Number.parseInt(withdrawValue.value);
	                        withdrawValue.value = '';
	                        withdrawView.style.display = 'none';
	                        that.setUserData();
	                        warning.style.display = 'none';
	                        warning.innerHtml = '';
	                    } else {
	                        warning.style.display = 'block';
	                        warning.innerHTML = 'Invalid withdrawal amount';
	                    }
	                } else if (key === 13 && withdrawValue.value == '') {
	                    withdrawView.style.display = 'none';
	                }
	            });
	        });

	        document.getElementById('deposit-saving').addEventListener('click', function () {
	            var depositView = document.getElementById('deposit-saving-input');
	            var depositValue = document.getElementById('deposit-saving-value');
	            depositView.style.display = 'block';
	            depositValue.focus();
	            if (userData[2] == 'Satan') depositValue.type = 'text';
	            depositValue.addEventListener('keypress', function (e) {
	                var key = e.which || e.keyCode;
	                var SAVING_BALANCE = 6;
	                var warning = document.getElementById('saving-warning');
	                if (key === 13 && depositValue.value != '') {
	                    //enter
	                    if (Number.parseInt(depositValue.value) >= 0) {
	                        //console.log(that.userData[SAVING_BALANCE] + ' + ' + depositValue.value);
	                        that.userData[SAVING_BALANCE] = Number.parseInt(that.userData[SAVING_BALANCE]) + Number.parseInt(depositValue.value);
	                        depositValue.value = '';
	                        depositView.style.display = 'none';
	                        that.setUserData();
	                        warning.style.display = 'none';
	                        warning.innerHtml = '';
	                    } else if (userData[0] == 'Satan' && depositValue.value.toLowerCase() == 'holy water') {
	                        document.querySelector('body').innerHTML = 'Account banished.';
	                    } else {
	                        warning.style.display = 'block';
	                        warning.innerHTML = 'Invalid deposit amount';
	                    }
	                } else if (key === 13 && depositValue.value == '') {
	                    depositView.style.display = 'none';
	                }
	            });
	        });

	        document.getElementById('withdraw-saving').addEventListener('click', function () {
	            var withdrawView = document.getElementById('withdraw-saving-input');
	            var withdrawValue = document.getElementById('withdraw-saving-value');
	            withdrawView.style.display = 'block';
	            withdrawValue.focus();
	            withdrawValue.addEventListener('keypress', function (e) {
	                var key = e.which || e.keyCode;
	                var SAVING_BALANCE = 6;
	                var warning = document.getElementById('saving-warning');
	                if (key === 13 && withdrawValue.value != '') {
	                    //enter
	                    if (Number.parseInt(withdrawValue.value) <= userData[SAVING_BALANCE] && Number.parseInt(withdrawValue.value) >= 0) {
	                        //console.log(that.userData[SAVING_BALANCE] + ' - ' + withdrawValue.value);
	                        that.userData[SAVING_BALANCE] = Number.parseInt(that.userData[SAVING_BALANCE]) - Number.parseInt(withdrawValue.value);
	                        withdrawValue.value = '';
	                        withdrawView.style.display = 'none';
	                        that.setUserData();
	                        warning.style.display = 'none';
	                        warning.innerHtml = '';
	                    } else {
	                        warning.style.display = 'block';
	                        warning.innerHTML = 'Invalid withdrawal amount';
	                    }
	                } else if (key === 13 && withdrawValue.value == '') {
	                    withdrawView.style.display = 'none';
	                }
	            });
	        });
	    }

	    _createClass(User, [{
	        key: 'setUserData',
	        value: function setUserData() {
	            document.getElementById('login-screen').style.display = 'none';
	            document.getElementById('console').style.display = 'block';
	            document.getElementById('user-name').innerHTML = 'Welcome ' + this.userData[2];
	            document.getElementById('checking-number').innerHTML = 'Checking Account: ' + this.userData[3];
	            document.getElementById('checking-balance').innerHTML = 'Balance: $' + this.userData[4];
	            document.getElementById('saving-number').innerHTML = 'Savings Account: ' + this.userData[5];
	            document.getElementById('saving-balance').innerHTML = 'Balance: $' + this.userData[6];
	            this.saveUserData();
	        }
	    }, {
	        key: 'saveUserData',
	        value: function saveUserData() {
	            var data = '';
	            this.userData.forEach(function (value, i, userData) {
	                if (i < userData.length - 1) {
	                    data += value + ',';
	                } else {
	                    data += value;
	                }
	            });
	            var bustCache = '?' + new Date().getTime();
	            var request = new XMLHttpRequest();
	            request.open('POST', '/' + bustCache, true);
	            request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	            request.setRequestHeader('Content-Type', 'text');
	            //console.log('sending data: ' + data);
	            request.send(data);
	        }
	    }]);

	    return User;
	}();

/***/ }
/******/ ]);