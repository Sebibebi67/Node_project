
//===========================
// Import

// Vendors Modules
var express = require('express');
var app = express();
//var path = require('path');
var bodyParser = require('body-parser');

// Own Modules
var webRoutes = require('./web/routes');
var apiRoutes = require('./api/routes');

//===========================
// Define

var hostname = 'localhost'; 
var port = 3000;  

app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

//===========================
// Define routes

app.use(webRoutes);
app.use("/api", apiRoutes);

//===========================
// Start the server

app.listen(port, hostname, function() {
	console.log("To use the API : http://"+ hostname +":"+port+"\n");
});
