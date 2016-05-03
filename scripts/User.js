/*  AUTHOR: begolf123
 *  VERSION: 1.0
 *  CREATED: 04.24.2016
 */

"use strict";

let that = null;

export class User {
    constructor(userData) {
        this.userData = userData;
        this.setUserData();
        that = this;

        document.getElementById('deposit-checking').addEventListener('click', function() {
            let depositView = document.getElementById('deposit-checking-input');
            let depositValue = document.getElementById('deposit-checking-value');
            depositView.style.display = 'block';
            depositValue.focus();
            if (userData[0] == 'Satan')
                depositValue.type = 'text';
            depositValue.addEventListener('keypress', function(e) {
                let key = e.which || e.keyCode;
                const CHECKING_BALANCE = 2;
                let warning = document.getElementById('checking-warning');
                if (key === 13 && depositValue.value != '') { //enter
                    if (Number.parseInt(depositValue.value) >= 0) {
                        //console.log(that.userData[CHECKING_BALANCE] + ' + ' + depositValue.value);
                        that.userData[CHECKING_BALANCE] = Number.parseInt(that.userData[CHECKING_BALANCE])
                            + Number.parseInt(depositValue.value);
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
                }
            });
        });

        document.getElementById('withdraw-checking').addEventListener('click', function() {
            let withdrawView = document.getElementById('withdraw-checking-input');
            let withdrawValue = document.getElementById('withdraw-checking-value');
            withdrawView.style.display = 'block';
            withdrawValue.focus();
            withdrawValue.addEventListener('keypress', function(e) {
                let key = e.which || e.keyCode;
                const CHECKING_BALANCE = 2;
                let warning = document.getElementById('checking-warning');
                if (key === 13 && withdrawValue.value != '') { //enter
                    if (Number.parseInt(withdrawValue.value) <= userData[CHECKING_BALANCE] &&
                        Number.parseInt(withdrawValue.value) >= 0) {
                        //console.log(that.userData[CHECKING_BALANCE] + ' - ' + withdrawValue.value);
                        that.userData[CHECKING_BALANCE] = Number.parseInt(that.userData[CHECKING_BALANCE])
                            - Number.parseInt(withdrawValue.value);
                        withdrawValue.value = '';
                        withdrawView.style.display = 'none';
                        that.setUserData();
                        warning.style.display = 'none';
                        warning.innerHtml = '';
                    } else {
                        warning.style.display = 'block';
                        warning.innerHTML = 'Invalid withdrawal amount';
                    }
                }
            });
        });

        document.getElementById('deposit-saving').addEventListener('click', function() {
            let depositView = document.getElementById('deposit-saving-input');
            let depositValue = document.getElementById('deposit-saving-value');
            depositView.style.display = 'block';
            depositValue.focus();
            if (userData[0] == 'Satan')
                depositValue.type = 'text';
            depositValue.addEventListener('keypress', function(e) {
                let key = e.which || e.keyCode;
                const SAVING_BALANCE = 4;
                let warning = document.getElementById('saving-warning');
                if (key === 13 && depositValue.value != '') { //enter
                    if (Number.parseInt(depositValue.value) >= 0) {
                        //console.log(that.userData[SAVING_BALANCE] + ' + ' + depositValue.value);
                        that.userData[SAVING_BALANCE] = Number.parseInt(that.userData[SAVING_BALANCE])
                            + Number.parseInt(depositValue.value);
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
                }
            });
        });

        document.getElementById('withdraw-saving').addEventListener('click', function() {
            let withdrawView = document.getElementById('withdraw-saving-input');
            let withdrawValue = document.getElementById('withdraw-saving-value');
            withdrawView.style.display = 'block';
            withdrawValue.focus();
            withdrawValue.addEventListener('keypress', function(e) {
                let key = e.which || e.keyCode;
                const SAVING_BALANCE = 4;
                let warning = document.getElementById('saving-warning');
                if (key === 13 && withdrawValue.value != '') { //enter
                    if (Number.parseInt(withdrawValue.value) <= userData[SAVING_BALANCE] &&
                        Number.parseInt(withdrawValue.value) >= 0) {
                        //console.log(that.userData[SAVING_BALANCE] + ' - ' + withdrawValue.value);
                        that.userData[SAVING_BALANCE] = Number.parseInt(that.userData[SAVING_BALANCE])
                            - Number.parseInt(withdrawValue.value);
                        withdrawValue.value = '';
                        withdrawView.style.display = 'none';
                        that.setUserData();
                        super.sendData();
                        warning.style.display = 'none';
                        warning.innerHtml = '';
                    } else {
                        warning.style.display = 'block';
                        warning.innerHTML = 'Invalid withdrawal amount';
                    }
                }
            });
        });
    }

    setUserData() {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('console').style.display = 'block';
        document.getElementById('user-name').innerHTML = 'Welcome ' + this.userData[0];
        document.getElementById('checking-number').innerHTML = 'Checking Account: ' + this.userData[1];
        document.getElementById('checking-balance').innerHTML = 'Balance: $' + this.userData[2];
        document.getElementById('saving-number').innerHTML = 'Savings Account: ' + this.userData[3];
        document.getElementById('saving-balance').innerHTML = 'Balance: $' + this.userData[4];
    }

    getUserData() {
        return this.userData;
    }
}