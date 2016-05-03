/**  AUTHOR: hbates@northmen.org
 *   VERSION: 1.0.0
 *   CREATED: 3.17.2016
 *   PURPOSE: Library class for handling file O
 */

"use strict";

class DataHandler {
     constructor(columns) {
          this.columns = columns;
          this.finalData = [];
     }

     setFinalData(dataPath) {
          const FS = require('fs');
          let fileHandle = FS.readFileSync(dataPath, 'utf8');
          let tempArray = fileHandle.split(/\r?\n/); //remove newlines
          for (let i = 0; i < tempArray.length; i++) {
               this.finalData[i] = tempArray[i].split(/,/).slice(0, this.columns);
          }
     }

     getFinalData() {
          return this.finalData;
     }

     writeDataFile(dataPath, data) {
          const FS = require('fs');
          for (let i = 0; i < data.length; i++) {
               let line = "";
               for (let j = 0; j < data[i].length; j++) {
                    if (j < data[i].length - 1) {
                         line = line + data[i][j] + ',';
                    } else {
                         line = line + data[i][j] + '\n';
                    }
               }
               let fileHandle = FS.appendFileSync(dataPath, line, 'utf8');
          }
     }
}

module.exports = DataHandler;