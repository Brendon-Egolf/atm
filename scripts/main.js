/*
 * Created by begolf123 on 4/22/16
 */

import {FileReader} from "./FileReader.js";
import {User} from "./User.js";

'use strict';


class main {
    constructor() {
        console.log('Hello World!!');
        document.getElementById('card-number').focus();
        document.getElementById('submit').addEventListener('click', function() {
            main.login(document.getElementById('card-number').value,
                document.getElementById('pin').value);
        });

        document.getElementById('card-number').addEventListener('keypress', function(e) {
            let key = e.which || e.keyCode;
            if (key === 13) { // 13 is enter
                main.login(document.getElementById('card-number').value,
                    document.getElementById('pin').value);
            }
        });

        document.getElementById('pin').addEventListener('keypress', function(e) {
            let key = e.which || e.keyCode;
            if (key === 13) { // 13 is enter
                main.login(document.getElementById('card-number').value,
                    document.getElementById('pin').value);
            }
        });
    }

    static verifyCard(cardNumber) {
        let regExp = new RegExp('^[0-9]{3}$');
        return regExp.test(cardNumber);
    }

    static verifyPin(pinNumber) {
        let regExp = new RegExp('^[0-9]{1}$');
        return regExp.test(pinNumber);
    }

    static login(cardNumber, pinNumber) {
        const CARD_NUMBER = 0;

        if (main.verifyCard(cardNumber) && main.verifyPin(pinNumber)) {
            FileReader.loadData('/atm/data/users.csv', function(fileData) {
                let userData = [];
                for (let i = 0; i < fileData.length; i++) {
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
                    const PIN = 1;
                    if (userData[PIN] == pinNumber) {
                        //console.log('correct!');
                        userData.shift();
                        userData.shift();
                        this.user = new User(userData);
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
            document.getElementById('warning').innerHTML = main.verifyCard(cardNumber) ? 'pin must be 1 digit long' :
             'Card number must be 3 digits long';
        }
    }

    static sendData() {
        const request = new XMLHttpRequest();
        const BUST_CACHE = '?' + new Date().getTime();
        let userData = this.user.getUserData();

        for (let i = 0; i < this.fileData.length; i++) {
            if (userData[0] == this.fileData[i][3]) {
                for (let j = 2; j < this.fileData[i].length; j++) {
                    this.fileData[i][j] = userData[j - 2];
                }
            }
        }

        request.open('POST', BUST_CACHE, true);
        request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        request.send(this.fileData);
    }
}

window.onload = function() {
    new main();
};