var express = require('express');
var path = require('path');
var fs = require('fs');

const PATH = "./data/mouths";

var router = express.Router();

//===========================
// Routes

//=================
// Mouths Collection

router.route("/mouths")
.get(function(req, res){ // GET
	fs.readdir(PATH, function (err, files) {
		
		if (err) {
			return res.status(500).json({
				"error" : "Internal server error"
			});
		}

		let listOfMouths = {};

		files.forEach(function (file) {
			let f = fs.readFileSync(PATH+"/"+file)
			let id = parseInt(file.trim(".json"));
		
			let mouth = JSON.parse(f);
		
			listOfMouths[id] = mouth;
		});

		return res.status(200).json(listOfMouths);
	});
})
.post(function(req, res){ // TODO
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).json({
			"error" : "No files were uploaded"
		});
	} else if (Object.keys(req.files).length > 1) {
		return res.status(400).json({
			"error" : "Too many files were uploaded"
		});
	}
	
	let max = 0;

	fs.readdir(PATH, function (err, files) {
		
		if (err) {
			return res.status(500).json({
				"error" : "Internal server error"
			});
		} 

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
				return res.status(500).json({
					"error" : "Internal server error"
				});
			}

			res.setHeader('Location', "/api/mouth/"+max)
			return res.status(201).json({
				"success" : "Created",
				"location" : "/api/mouth/"+max,
			});
		});
	});
})
.put(function(req, res){ // Not Allowed

	return res.status(405).json({
		"error": 'Method Not Allowed'
	});
})
.patch(function(req, res){ // Not Allowed

	return res.status(405).json({
		"error": 'Method Not Allowed'
	});
})
.delete(function(req, res){ // Not Allowed

	return res.status(405).json({
		"error": 'Method Not Allowed'
	});
})

//=================
// Mouth ID

router.route("/mouth/:id")
.get(function(req, res){ // TODO
	fs.readFile(PATH+"/"+req.params.id+'.json', (err, data) => {
		if (err){
			return res.status(404).json({
				"error": 'Not Found'
			});
		}
		let mouth = JSON.parse(data);
	
		return res.status(200).json(mouth);
	});
})
.put(function(req, res){ // TODO
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).json({
			"error" : "No files were uploaded"
		});
	} else if (Object.keys(req.files).length > 1) {
		return res.status(400).json({
			"error" : "Too many files were uploaded"
		});
	}

	let isAlready = true;
	fs.readFile(PATH+"/"+req.params.id+'.json', (err) => {
		if (err){
			isAlready = false;
		}
	});

	let file = req.files.file;
	file.mv(PATH+"/"+req.params.id+".json", function(err) {
		if (err){
			return res.status(404).json({
				"error": 'Not Found'
			});
		}
		if (isAlready){
			return res.status(200).json({
				"success" : "Updated",
			});
		}
		return res.status(201).json({
			"success" : "Created",
		});
	});
})
.patch(function(req, res){ // TODO
	fs.readFile(PATH+"/"+req.params.id+'.json', (err, data) => {
		if (err){
			return res.status(404).json({
				"error": 'Not Found'
			});
		}

		if (req.body.type != undefined || req.body.token != undefined || req.body.link != undefined){
	
			let mouth = JSON.parse(data);

			if (req.body.type != undefined){
				mouth.type = req.body.type;
			}
			if (req.body.token != undefined){
				mouth.token = req.body.token;
			}
			if (req.body.link != undefined){
				mouth.link = req.body.link;
			}

			newdata = JSON.stringify(mouth);
			fs.writeFileSync(PATH+"/"+req.params.id+'.json', newdata);

			return res.status(200).json({
				"success" : "Updated",
			});
		}

		return res.status(400).json({
			"error" : "No body sended",
		});
	});
})
.delete(function(req, res){ // TODO
	fs.unlink(PATH+"/"+req.params.id+".json", function(err) {
		if (err){
			return res.status(404).json({
				"error": "Not Found"
			});
		}
		return res.status(200).json({
			"success": "Deleted"
		});
	});
})
.post(function(req, res){ // NOT Allowed

	return res.status(405).json({
		"error": 'Method Not Allowed'
	});
})

//===========================
// Export

module.exports = router;
