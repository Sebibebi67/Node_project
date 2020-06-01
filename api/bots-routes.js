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

var BotManager = require("../bot/bot-manager")

//====================================================
// Define
//====================================================

const PATH = "./data/bots";
const BRAIN_PATH = "./data/brains";
const MOUTH_PATH = "./data/mouths";

var router = express.Router();

//======================
// Load AI

let botManager = new BotManager();
botManager.loadBots().then(() => {
	console.log("Bots loaded");
	console.log(botManager);
}).catch(err => {
	console.log(err);
	process.exit(1);
})

//====================================================
// Define Routes
//====================================================

//======================
// Bots Collection

router.route("/bots")
.get(function(req, res){ 										// ====GET====
	fs.readdir(PATH, function (err, files) {
		
		if (err) {												// 500 - Internal Server Error
			return res.status(500).json({
				"error" : "Internal Server Error"
			});
		}
	
		let listOfBots = {};

		files.forEach(function (file) {
			let f = fs.readFileSync(PATH+"/"+file)
			let id = parseInt(file.trim(".json"));
		
			let bot = JSON.parse(f);
		
			listOfBots[id] = bot;
		});

		return res.status(200).json(listOfBots);				// 200 - OK
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
		
		// Json file ?
		try {
			var data = JSON.parse(file.data);
		} catch(e) {
			return res.status(400).json({							// 400 - Bad Request
				"error" : "Not A Json File"
			});
		}

		// Good fields ?
		if (data.state != true && data.state != false){
			return res.status(400).json({							// 400 - Bad Request
				"error" : "Bad Json Data"
			});
		}

		// All fields exist
		for (let field in data){
			if (field != "state" && field != "brains" && field != "mouths"){
				return res.status(400).json({						// 400 - Bad Request
					"error" : "Bad Json Data"
				});
			}
		}
		
		// Fields brains & mouths are arrays ?
		if (!Array.isArray(data.brains) || !Array.isArray(data.mouths)){
			return res.status(400).json({						// 400 - Bad Request
				"error" : "Brains and Mouths must be arrays"
			});
		}
		
		// Brains exist
		for (let id in data.brains){
			try {
				fs.readFileSync(BRAIN_PATH+"/"+data.brains[id]+".rive");
			} catch (err) {
				return res.status(400).json({						// 400 - Bad Request
					"error" : "Brain "+data.brains[id]+" Not Found"
				});
			}
		}

		// Mouths exist
		for (let id in data.mouths){
			try {
				fs.readFileSync(MOUTH_PATH+"/"+data.mouths[id]+".json");
			} catch (err) {
				return res.status(400).json({						// 400 - Bad Request
					"error" : "Mouth "+data.mouths[id]+" Not Found"
				});
			}
		}

		file.mv(PATH+"/"+max+".json", function(err) {
			if (err){
				return res.status(500).json({					// 500 - Internal Server Error
					"error" : "Internal Server Error"
				});
			}

			botManager.loadBots().then(() => {
				console.log("Bots loaded");
				console.log(botManager);
			}).catch(err => {
				console.log(err);
				process.exit(1);
			})

			res.setHeader('Location', "/api/bot/"+max)
			return res.status(201).json({						// 201 - Created
				"success" : "Created",
				"location" : "/api/bot/"+max,
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

//======================
// Bot ID

router.route("/bot/:id")
.get(function(req, res){ 										// ====GET====
	fs.readFile(PATH+"/"+req.params.id+'.json', (err, data) => {
		if (err){
			return res.status(404).json({						// 404 - Not Found
				"error": 'Not Found'
			});
		}
		let bot = JSON.parse(data);
	
		return res.status(200).json(bot);						// 200 - OK
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
	fs.readFile(PATH+"/"+req.params.id+'.json', (err) => {
		if (err){
			isAlready = false;
		}
	});

	let file = req.files.file;
	
	// Json file ?
	try {
		var data = JSON.parse(file.data);
	} catch(e) {
		return res.status(400).json({							// 400 - Bad Request
			"error" : "Not A Json File"
		});
	}

	// Good fields ?
	if (data.state != true && data.state != false){
		return res.status(400).json({							// 400 - Bad Request
			"error" : "Bad Json Data"
		});
	}

	// All fields exist
	for (let field in data){
		if (field != "state" && field != "brains" && field != "mouths"){
			return res.status(400).json({						// 400 - Bad Request
				"error" : "Bad Json Data"
			});
		}
	}
	
	// Fields brains & mouths are arrays ?
	if (!Array.isArray(data.brains) || !Array.isArray(data.mouths)){
		return res.status(400).json({						// 400 - Bad Request
			"error" : "Brains and Mouths must be arrays"
		});
	}
	
	// Brains exist
	for (let id in data.brains){
		try {
			fs.readFileSync(BRAIN_PATH+"/"+data.brains[id]+".rive");
		} catch (err) {
			return res.status(400).json({						// 400 - Bad Request
				"error" : "Brain "+data.brains[id]+" Not Found"
			});
		}
	}

	// Mouths exist
	for (let id in data.mouths){
		try {
			fs.readFileSync(MOUTH_PATH+"/"+data.mouths[id]+".json");
		} catch (err) {
			return res.status(400).json({						// 400 - Bad Request
				"error" : "Mouth "+data.mouths[id]+" Not Found"
			});
		}
	}

	file.mv(PATH+"/"+req.params.id+".json", function(err) {
		if (err){
			return res.status(404).json({						// 404 - Not Found
				"error": 'Not Found'
			});
		}

		botManager.loadBots().then(() => {
			console.log("Bots loaded");
			console.log(botManager);
		}).catch(err => {
			console.log(err);
			process.exit(1);
		})

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

		console.log(req.body);

		if (req.body.state != undefined || req.body.addmouth != undefined){

			let bot = JSON.parse(data);

			if (req.body.addmouth != undefined){
				console.log(req.body.addmouth);
			}

			if (req.body.state != undefined){
				if (req.body.state != "true" 
					&& req.body.state != "false"){

					return res.status(400).json({				// 400 - Bad Request
						"error": 'state can be true or false'
					});
				}
				bot.state = req.body.state==="true"?true:false;
			}

			newData = JSON.stringify(bot);
			fs.writeFileSync(PATH+"/"+req.params.id+'.json', newData);

			botManager.loadBots().then(() => {
				console.log(botManager);
			}).catch(err => {
				console.log(err);
				process.exit(1);
			})

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
	fs.unlink(PATH+"/"+req.params.id+".json", function(err) {
		if (err){
			return res.status(404).json({						// 404 - Not Found
				"error": "Not Found"
			});
		}
		
		botManager.loadBots().then(() => {
			console.log("Bots loaded");
			console.log(botManager);
		}).catch(err => {
			console.log(err);
			process.exit(1);
		})

		return res.status(200).json({							// 200 - OK
			"success": "Deleted"
		});
	});
})
.post(function(req, res){ 										// ====POST====

	return res.status(405).json({							// 400- Bad request
		"error" : "Method Not Allowed",
	});
})

//====================================================
// Export
//====================================================

module.exports = router;

//====================================================
// End
//====================================================