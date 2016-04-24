/**
 * Created by begolf123 on 4/22/16.
 */

export class FileReader {
    constructor() {
    }

    static loadData(filePath, callback) {
        let request = new XMLHttpRequest();
        request.open("GET", filePath, true);
        request.send();
        request.onload = function() {
            const COLUMNS = 7;
            let data, middleData, finalData = [];
            if (request.readyState === 4 && request.status === 200) {
                data = request.responseText.split(/\n/);
            }
            for (let i = 0; i < data.length; i++) {
                middleData = data[i].split(/,/);
                finalData[i] = []; //makes it an MD array
                for (let j = 0; j < COLUMNS; j++) {
                    finalData[i][j] = middleData[j];
                }
            }
            callback(finalData);
        };
    }
}