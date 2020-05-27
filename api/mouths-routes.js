var express = require('express');
var path = require('path');
var fs = require('fs');

const PATH = "./data/mouths";

var router = express.Router();

//===========================
// TEST

// $ cd ./NodeBot

// $ curl -X GET http://localhost:3000/api/mouths
// $ curl -X POST http://localhost:3000/api/mouths -F "file=@./test/mouth.json"


// $ curl -X GET http://localhost:3000/api/mouth/6
// $ curl -X PUT http://localhost:3000/api/mouth/6 -F "file=@./test/mouth.json"
// $ curl -X DELETE http://localhost:3000/api/mouth/6
// $ curl -X PATCH --data-urlencode "type=discord" http://localhost:3000/api/mouth/6

//===========================
// Routes

//=================
// Mouths Collection

router.route("/mouths")
.get(function(req, res){ // TODO
	fs.readdir(PATH, function (err, files) {
		
		if (err) {
			return console.log('Unable to scan directory: ' + err);
		}
		else {
			let listOfMouths = [];

			files.forEach(function (file) {
				listOfMouths.push(parseInt(file.trim(".json")));
			});
	
			res.json(listOfMouths);
		} 
	});
})
.post(function(req, res){ // TODO
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send('No files were uploaded');
	}
	
	let max = 0;

	fs.readdir(PATH, function (err, files) {
		
		if (err) {
			return console.log('Unable to scan directory: ' + err);
		} 
		else {

			files.forEach(function (file) {
				let id = parseInt(file.trim(".json"));
				if (max < id){
					max = id;
				}
			});
	
			max++;
	
			let file = req.files.file;
			file.mv(PATH+"/"+max+".json", function(err) {
				if (err){
					return res.status(500).send(err);
				}
				else {
					res.send('File uploaded!');
				}
			});
		}
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
// Mouth ID

router.route("/mouth/:id")
.get(function(req, res){ // TODO
	fs.readFile(PATH+"/"+req.params.id+'.json', (err, data) => {
		if (err){
			res.status(404);
			res.send('Resource Not Found');
		} else {
			let mouth = JSON.parse(data);
		
			res.json(mouth);
		}
	});
})
.put(function(req, res){ // TODO
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send('No files were uploaded');
	}

	let file = req.files.file;
	file.mv(PATH+"/"+req.params.id+".json", function(err) {
		if (err){
			res.status(404);
			res.send('Resource Not Found');
		}
		else {
			res.send('File uploaded!');
		}
	});
})
.patch(function(req, res){ // TODO
	if (req.body.type != undefined || req.body.token != undefined){
		console.log(req.body.type, req.body.token)

		fs.readFile(PATH+"/"+req.params.id+'.json', (err, data) => {
			if (err){
				res.status(404);
				res.send('Resource Not Found');
			} else {
				let mouth = JSON.parse(data);
				console.log(mouth)

				if (req.body.type != undefined){
					mouth.type = req.body.type;
				}
				if (req.body.token != undefined){
					mouth.token = req.body.token;
				}

				newdata = JSON.stringify(mouth);
				console.log(newdata)
				fs.writeFileSync(PATH+"/"+req.params.id+'.json', newdata);

				return res.status(200).send('File uploaded');
			}
		});
	} else {
		return res.status(400).send('No body sended');
	}
})
.delete(function(req, res){ // TODO
	fs.unlink(PATH+"/"+req.params.id+".json", function(err) {
		if (err){
			res.status(404);
			res.send('Resource Not Found');
		}
	});
})
.post(function(req, res){ // NOT Allowed

	res.status(405);
	res.send('Method Not Allowed');
})

//===========================
// Export

module.exports = router;
