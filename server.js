
//===========================
// Import

// Vendors Modules
var express = require('express');
//var path = require('path');
var bodyParser = require('body-parser');

// Own Modules
var webRoutes = require('./web/routes');
var apiRoutes = require('./api/routes');

//===========================
// Define

var hostname = 'localhost'; 
var port = 3000;  

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

//===========================
// Define routes

app.use(webRoutes);
app.use(apiRoutes);

//===========================
// Start the server

app.listen(port, hostname, function(){
	console.log("To use the API : http://"+ hostname +":"+port+"\n");
});
