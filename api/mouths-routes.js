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

const PATH = "./data/mouths";
const BOT_PATH = "./data/bots";

var router = express.Router();

//====================================================
// Define Routes
//====================================================

//======================
// Mouths Collection

router.route("/mouths")
.get(function(req, res){ 										// ====GET====
	fs.readdir(PATH, function (err, files) {
		
		if (err) {												// 500 - Internal Server Error
			return res.status(500).json({
				"error" : "Internal Server Error"
			});
		}

		let listOfMouths = {};

		files.forEach(function (file) {
			let f = fs.readFileSync(PATH+"/"+file)
			let id = parseInt(file.trim(".json"));
		
			let mouth = JSON.parse(f);
		
			listOfMouths[id] = mouth;
		});

		return res.status(200).json(listOfMouths);				// 200 - OK
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
			let id = parseInt(file.trim(".json"));
			if (max < id){
				max = id;
			}
		});

		max++;

		let file = req.files.file;
		
		try {
			var data = JSON.parse(file.data);
		} catch(e) {
			return res.status(400).json({						// 400 - Bad Request
				"error" : "Not A Json File"
			});
		}

		if (data.type != "web" && data.type != "discord"){
			return res.status(400).json({						// 400 - Bad Request
				"error" : "Bad Json Data"
			});
		}
		for (let field in data){
			if (field != "type" && field != "token" && field != "link"){
				return res.status(400).json({					// 400 - Bad Request
					"error" : "Bad Json Data"
				});
			}
		}

		file.mv(PATH+"/"+max+".json", function(err) {
			if (err){
				return res.status(500).json({					// 500 - Internal Server Error
					"error" : "Internal Server Error"
				});
			}

			res.setHeader('Location', "/api/mouth/"+max)
			return res.status(201).json({						// 201 - Created
				"success" : "Created",
				"location" : "/api/mouth/"+max,
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
// Mouth ID

router.route("/mouth/:id")
.get(function(req, res){ 										// ====GET====
	fs.readFile(PATH+"/"+req.params.id+'.json', (err, data) => {
		if (err){
			return res.status(404).json({						// 404 - Not Found
				"error": 'Not Found'
			});
		}
		let mouth = JSON.parse(data);
	
		return res.status(200).json(mouth);						// 200 - OK
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
	
	if (!Number.isInteger(parseInt(req.params.id))){
		return res.status(400).json({							// 400 - Bad Request
			"error" : "ID must be an integer"
		});
	}

	let isAlready = true;
	fs.readFile(PATH+"/"+req.params.id+'.json', (err) => {
		if (err){
			isAlready = false;
		}
	});

	let file = req.files.file;

	try {
		var data = JSON.parse(file.data);
	} catch(e) {
		return res.status(400).json({						// 400 - Bad Request
			"error" : "Not A Json File"
		});
	}

	if (data.type != "web" && data.type != "discord"){
		return res.status(400).json({						// 400 - Bad Request
			"error" : "Bad Json Data"
		});
	}
	for (let field in data){
		if (field != "type" && field != "token" && field != "link"){
			return res.status(400).json({						// 400 - Bad Request
				"error" : "Bad Json Data"
			});
		}
	}

	file.mv(PATH+"/"+req.params.id+".json", function(err) {
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
.patch(function(req, res){ 										// ====PATCH====
	fs.readFile(PATH+"/"+req.params.id+'.json', (err, data) => {
		if (err){
			return res.status(404).json({						// 404 - Not Found
				"error": 'Not Found'
			});
		}

		if (req.body.type != undefined 
			|| req.body.token != undefined 
			|| req.body.link != undefined){
	
			let mouth = JSON.parse(data);

			if (req.body.type != undefined){
				if (req.body.type != "web" 
					&& req.body.type != "discord"){

					return res.status(400).json({						// 400 - Bad Request
						"error": 'Type can be "web" or "discord"'
					});
				}
				mouth.type = req.body.type;
			}
			if (req.body.token != undefined){
				if (req.body.token == "null"){
					mouth.token = null;
				} else {
					mouth.token = req.body.token;
				}
			}
			if (req.body.link != undefined){
				if (req.body.link == "null"){
					mouth.link = null;
				} else {
					mouth.link = req.body.link;
				}
			}
			if (mouth.type == "web"){
				mouth.token = null;
				mouth.link = null;
			}

			newData = JSON.stringify(mouth);
			fs.writeFileSync(PATH+"/"+req.params.id+'.json', newData);

			return res.status(200).json({						// 200 - OK
				"success" : "Updated",
			});
		}

		return res.status(400).json({							// 400- Bad request
			"error" : "No Body Sended",
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

		fs.unlink(PATH+"/"+req.params.id+".json", function(err) {
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

//====================================================
// Export
//====================================================

module.exports = router;

//====================================================
// End
//====================================================