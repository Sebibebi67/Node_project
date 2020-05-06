
//===========================
// Import

// Vendors Modules
var express = require('express');
var path = require('path');

// Own Modules
var webRoutes = require('./routes/webRoutes');
var apiRoutes = require('./routes/apiRoutes');
var rs = require('./rs');

//===========================
// Define

var hostname = 'localhost'; 
var port = 3000;  

var app = express();

var myRouter = express.Router();

//===========================
// Start the server

app.use(webRoutes);
app.use(apiRoutes);

app.listen(port, hostname, function(){
	console.log("To use the API : http://"+ hostname +":"+port+"\n");
});


rs.loading();
