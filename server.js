
//===========================
// Import

var express = require('express');
var path = require('path');

//===========================
// Define

var hostname = 'localhost'; 
var port = 3000;  

var app = express();

var myRouter = express.Router();

//===========================
// Web part

myRouter.route('/')
.get(function(req, res){ 
	res.sendFile(path.join(__dirname + '/public/index.html'));
})

myRouter.route('/index.css')
.get(function(req, res){ 
	res.sendFile(path.join(__dirname + '/public/index.css'));
})

myRouter.route('/index.js')
.get(function(req, res){ 
	res.sendFile(path.join(__dirname + '/public/index.js'));
})

//===========================
//API part

myRouter.route('/message')
.get(function(req, res){
	res.json({
		message: "test",
	})
})

//===========================
// Start the server

app.use(myRouter);

app.listen(port, hostname, function(){
	console.log("To use the API : http://"+ hostname +":"+port+"\n");
});
 