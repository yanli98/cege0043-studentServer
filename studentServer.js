// express is the server that forms part of the nodejs program
var express = require('express');
var path = require("path");
var app = express();
// add an http server to serve files to the Edge browser
// due to certificate issues it rejects the https files if they are not
// directly called in a typed URL
var http = require('http');
var httpServer = http.createServer(app);
httpServer.listen(4480);


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
extended: true
}));
app.use(bodyParser.json());

var fs = require('fs');
var pg = require('pg');
var configtext =
""+fs.readFileSync("/home/studentuser/certs/postGISConnection.js");
// now convert the configruation file into the correct format -i.e. a name/value
pair array
var configarray = configtext.split(",");
var config = {};
for (var i = 0; i < configarray.length; i++) {
var split = configarray[i].split(':');
config[split[0].trim()] = split[1].trim();
}
var pool = new pg.Pool(config);


// adding functionality to log the requests
app.use(function (req, res, next) {
var filename = path.basename(req.url);
var extension = path.extname(filename);
console.log("The file " + filename + " was requested.");
next();
});

// adding functionality to log the requests
app.use(function (req, res, next) {
var filename = path.basename(req.url);
var extension = path.extname(filename);
console.log("The file " + filename + " was requested.");
next();
});

var app = express();
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "X-Requested-With");
next();
});

// serve static files - e.g. html, css
// this should always be the last line in the server file
app.use(express.static(__dirname));