/**
 * Created by Howard on 4/8/2016.
 */

"use strict";

class app {
    constructor() {
        app.loadServer();
    }

    static loadServer() {
        const HTTP = require('http'),
            PORT = process.env.PORT || 8080,
            SERVER = HTTP.createServer(function (req, res) {
                let httpHandler = function (err, str, contentType) {
                    //console.log("you can't handle the truth! " + req.url);
                    if (err) {
                        res.writeHead(500, {'Content-Type': 'text/plain'});
                        res.end('An error has occurred: ' + err.message);
                    } else if (contentType.indexOf('image') >= 0) {
                        res.writeHead(200, {'Content-Type': contentType});
                        res.end(str, 'binary');
                    } else {
                        res.writeHead(200, {'Content-Type': contentType});
                        res.end(str);
                    }
                };

                if (req.headers['x-requested-with'] === 'XMLHttpRequest') {
                    if (req.method == 'POST') {
                        app.getFormData(req, res);
                    } else {
                        //console.log("[405] " + req.method + " to " + req.url);
                        res.writeHead(405, "Method not supported", {'Content-Type': 'text/html'});
                        res.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
                    }
                } else if (req.url.indexOf('/data/') >=0) {
                    app.render(req.url.slice(1), 'text/csv', httpHandler, 'utf-8');
                } else if (req.url.indexOf('/javascripts/') >= 0) {
                    app.render(req.url.slice(1), 'application/ecmascript', httpHandler, 'utf-8');
                } else if (req.url.indexOf('/css/') >= 0) {
                    app.render(req.url.slice(1), 'text/css', httpHandler, 'utf-8');
                    //console.log('rendering ' + req.url.slice(1));
                } else if (req.url.indexOf('/images/') >= 0) {
                    app.render(req.url.slice(1), 'image/jpeg', httpHandler, 'binary');
                } else if (req.url == '/') {
                    app.render('public/views/index.html', 'text/html', httpHandler, 'utf-8');
                } else {
                    app.render('public/views/index.html', 'text/html', httpHandler, 'utf-8');
                }
            }).listen(PORT, function () {
                console.log('Such Memes at localhost:' + PORT + ' Wow.');
            });
    }

    static render(path, contentType, callback, encoding) {
        const FS = require('fs');
        FS.readFile(__dirname + '/' + path, encoding ? encoding : 'utf-8', function (err, str) { // ternary
            callback(err, str, contentType);
        });
    }

    static getFormData(req, res) {
        const FileWriter = require('./node/FileWriter');
        let fileWriter = new FileWriter('./data/users.csv');
        let data = '';
        req.on('data', function(chunk) {
            data += chunk;
            //console.log(data);
        }).on('end', function() {
            //console.log(data);
            fileWriter.writeUserData(data);
        });
    }
}

module.exports = app;
