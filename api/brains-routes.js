//====================================================
// Require
//====================================================

//======================
// Vendors

var express = require('express');
var path = require('path');
var fs = require('fs');

//======================
// Own

//

//====================================================
// Define
//====================================================

const PATH = "./data/brains";
const BOT_PATH = "./data/bots";

var router = express.Router();

//====================================================
// Define Routes
//====================================================

//======================
// Brains Collection

router.route("/brains")
.get(function(req, res){ 										// ====GET====
	fs.readdir(PATH, function (err, files) {
		
		if (err) {												// 500 - Internal Server Error
			return res.status(500).json({
				"error" : "Internal Server Error"
			});
		} 
		
		let listOfBrains = [];

		files.forEach(function (file) {
			listOfBrains.push(parseInt(file.trim(".rive")));
		});

		return res.status(200).json(listOfBrains);				// 200 - OK
	});
})
.post(function(req, res){ 										// ====POST====
	if (!req.files || Object.keys(req.files).length === 0
		|| req.files.file == undefined) {
		return res.status(400).json({							// 400 - Bad Request
			"error" : "No File"
		});
	} else if (Object.keys(req.files).length > 1 
				|| Array.isArray(req.files.file)) {
		return res.status(400).json({							// 400 - Bad Request
			"error" : "Too Many Files"
		});
	}
	
	let max = 0;

	fs.readdir(PATH, function (err, files) {
		
		if (err) {
			return res.status(500).json({						// 500 - Internal Server Error
				"error" : "Internal Server Error"
			});
		} 
		
		files.forEach(function (file) {
			let id = parseInt(file.trim(".rive"));
			if (max < id){
				max = id;
			}
		});

		max++;

		let file = req.files.file;

		// Rive file ?
		try {
			JSON.parse(file.data);
			return res.status(400).json({							// 400 - Bad Request
				"error" : "Not a Rive File"
			});
		} catch(e) {
			if (!file.name.includes(".rive")){
				return res.status(400).json({							// 400 - Bad Request
					"error" : "Not a Rive File"
				});
			}
		}

		file.mv(PATH+"/"+max+".rive", function(err) {
			if (err){
				return res.status(500).json({					// 500 - Internal Server Error
					"error" : "Internal Server Error"
				});
			}
			
			res.setHeader('Location', "/api/brain/"+max)
			return res.status(201).json({						// 201 - Created
				"success" : "Created",
				"location" : "/api/brain/"+max,
			});

		});
		
	});
})
.put(function(req, res){ 										// ====PUT====

	return res.status(405).json({								// 405 - Method Not Allowed
		"error": 'Method Not Allowed'
	});
})
.patch(function(req, res){ 										// ====PATCH====

	return res.status(405).json({								// 405 - Method Not Allowed
		"error": 'Method Not Allowed'
	});
})
.delete(function(req, res){ 									// ====DELETE====

	return res.status(405).json({								// 405 - Method Not Allowed
		"error": 'Method Not Allowed'
	});
})

//=================
// Brain ID

router.route("/brain/:id")
.get(function(req, res){ 										// ====GET====
	fs.readFile(PATH+"/"+req.params.id+'.rive', "utf-8", (err, data) => {
		if (err){
			return res.status(404).json({						// 404 - Not Found
				"error": 'Not Found'
			});
		}
		
		return res.status(200).json(data);						// 200 - OK
	});
})
.put(function(req, res){ 										// ====PUT====
	if (!req.files || Object.keys(req.files).length === 0
		|| req.files.file == undefined) {
		return res.status(400).json({							// 400 - Bad Request
			"error" : "No File"
		});
	} else if (Object.keys(req.files).length > 1 
				|| Array.isArray(req.files.file)) {
		return res.status(400).json({							// 400 - Bad Request
			"error" : "Too Many Files"
		});
	}

	if (req.params.id <= 0){
		return res.status(400).json({							// 400 - Bad Request
			"error" : "ID cannot be less than 1"
		});
	}
	
	let isAlready = true;
	fs.readFile(PATH+"/"+req.params.id+'.rive', (err) => {
		if (err){
			isAlready = false;
		}
	});

	let file = req.files.file;

	// Rive file ?
	try {
		JSON.parse(file.data);
		return res.status(400).json({							// 400 - Bad Request
			"error" : "Not a Rive File"
		});
	} catch(e) {
		if (!file.name.includes(".rive")){
			return res.status(400).json({							// 400 - Bad Request
				"error" : "Not a Rive File"
			});
		}
	}

	file.mv(PATH+"/"+req.params.id+".rive", function(err) {
		if (err){
			return res.status(404).json({						// 404 - Not Found
				"error": 'Not Found'
			});
		}
		if (isAlready){
			return res.status(200).json({						// 200 - OK
				"success" : "Updated",
			});
		}
		return res.status(201).json({							// 201 - Created
			"success" : "Created",
		});

	});
})
.delete(function(req, res){ 									// ====DELETE====
	fs.readdir(BOT_PATH, function(err, files){
		
		if (err) {
			return res.status(500).json({						// 500 - Internal Server Error
				"error" : "Internal Server Error"
			});
		} 
		
		let linkedWith = [];
		files.forEach(function (file) {
			let f = fs.readFileSync(BOT_PATH+"/"+file)
			let id = parseInt(file.trim(".json"));
		
			let bot = JSON.parse(f);
			//console.log(bot);
			if (bot.brains.includes(parseInt(req.params.id))){
				linkedWith.push("/api/bot/"+id);
			}
		});

		if (linkedWith.length != 0){
			return res.status(409).json({						// 500 - Internal Server Error
				"error" : "Conflict : Resource linked to a bot",
				"linked-with" : linkedWith
			});
		}

		fs.unlink(PATH+"/"+req.params.id+".rive", function(err) {
			if (err){
				return res.status(404).json({						// 404 - Not Found
					"error": "Not Found"
				});
			}
			
			return res.status(200).json({							// 200 - OK
				"success": "Deleted"
			});
		});
	});
})
.post(function(req, res){ 										// ====POST====

	return res.status(405).json({								// 400 - Method Not Allowed
		"error": 'Method Not Allowed'
	});
})
.patch(function(req, res){ 										// ====PATCH====

	return res.status(405).json({								// 405 - Method Not Allowed
		"error": 'Method Not Allowed'
	});
})

//====================================================
// Export
//====================================================

module.exports = router;

//====================================================
// End
//====================================================
