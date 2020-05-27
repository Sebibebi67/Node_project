var express = require('express');
var path = require('path');
var fs = require('fs');

const PATH = "./data/brains";

var router = express.Router();

//===========================
// Load AI

// setTimeout(()=> {bot1.response("local-user", "hello");}, 100);

//===========================
// TEST

// $ cd ./NodeBot

// $ curl -X GET http://localhost:3000/api/brains
// $ curl -X POST http://localhost:3000/api/brains -F "file=@./test/brain.rive"


// $ curl -X GET http://localhost:3000/api/brain/6
// $ curl -X PUT http://localhost:3000/api/brain/6 -F "file=@./test/brain.rive"

//===========================
// Routes

//=================
// brains Collection

router.route("/brains")
.get(function(req, res){
	fs.readdir(PATH, function (err, files) {
		
		if (err) {
			return console.log('Unable to scan directory: ' + err);
		} 
		
		let listOfBrains = [];

		files.forEach(function (file) {
			listOfBrains.push(parseInt(file.trim(".rive")));
		});

		res.json(listOfBrains);
	});
})
.post(function(req, res){ // TODO

	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send('No files were uploaded.');
	}
	
	let max = 0;

	fs.readdir(PATH, function (err, files) {
		
		if (err) {
			return console.log('Unable to scan directory: ' + err);
		} 
		
		files.forEach(function (file) {
			let id = parseInt(file.trim(".rive"));
			if (max < id){
				max = id;
			}
		});

		max++;

		let file = req.files.file;
		file.mv(PATH+"/"+max+".rive", function(err) {
			if (err){
				return res.status(500).send(err);
			}

			res.send('File uploaded!');
		});
	});
})
.put(function(req, res){ // Not Allowed

	res.status(405);
	res.send('Method Not Allowed');
})
.patch(function(req, res){ // Not Allowed

	res.status(405);
	res.send('Method Not Allowed');
})
.delete(function(req, res){ // Not Allowed

	res.status(405);
	res.send('Method Not Allowed');
})

//=================
// brain ID

router.route("/brain/:id")
.get(function(req, res){
	fs.readFile(PATH+"/"+req.params.id+'.rive', (err, data) => {
		if (err){
			res.status(404);
			res.send('Resource Not Found');
		} else {
			res.send(data)
		}
	});
})
.put(function(req, res){ // TODO
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send('No files were uploaded.');
	}

	let file = req.files.file;
	file.mv(PATH+"/"+req.params.id+".rive", function(err) {
		if (err){
			return res.status(500).send(err);
		}

		res.send('File uploaded!');
	});
})
.patch(function(req, res){ // TODO

	console.log(req.body)
	res.json({
		response : "brain",
	});
})
.delete(function(req, res){ // TODO

	res.json({
		response : "bot",
	});
})
.post(function(req, res){ // NOT Allowed

	res.status(405);
	res.send('Method Not Allowed');
})

//===========================
// Export

module.exports = router;
