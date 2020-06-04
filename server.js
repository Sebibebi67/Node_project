//====================================================
// Require
//====================================================

//======================
// Vendors

var express = require('express');
var app = express();
const fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');

//======================
// Own

var webRoutes = require('./web/routes');
var apiRoutes = require('./api/routes');

//====================================================
// Init express
//====================================================

var hostname = 'localhost'; 
var port = 3001;  

app.use(fileUpload());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Methods", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Content-Security-Policy', 'script-src \'self\'');
    res.setHeader("Content-Security-Policy", "script-src 'self' *");
	next();
});

//====================================================
// Define routes
//====================================================

app.use("/api", apiRoutes);
app.use("/web", webRoutes);

app.route("*").all(function(req, res) {
	return res.status(404).json({
		"error" : "Bad URL"
	});
})

//====================================================
// Start the server
//====================================================

app.listen(port, hostname, function() {
	console.log("\nTo use the API : http://"+ hostname +":"+port+"\n");
});

//====================================================
// End
//====================================================
