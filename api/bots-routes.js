var express = require('express');
var path = require('path');
var fs = require('fs');

const PATH = "./data/bots";
const BRAIN_PATH = "./data/brains";
const MOUTH_PATH = "./data/mouths";

var router = express.Router();

//===========================
// TEST

// $ cd ./NodeBot

// $ curl -X GET http://localhost:3000/api/bots | python -m json.tool
// $ curl -X POST http://localhost:3000/api/bots -F "file=@./tests/bot.json" && echo


// $ curl -X GET http://localhost:3000/api/bot/6 | python -m json.tool
// $ curl -X PUT http://localhost:3000/api/bot/6 -F "file=@./tests/bot.json" && echo
// $ curl -X DELETE http://localhost:3000/api/bot/6 && echo
// $ curl -X PATCH --data-urlencode "type=discord" --data-urlencode "token=discord-token" http://localhost:3000/api/bot/6 && echo

//===========================
// Routes

//=================
// bots Collection

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
					"error" : "Brain "+data.mouths[id]+" Not Found"
				});
			}
		}

		file.mv(PATH+"/"+max+".json", function(err) {
			if (err){
				return res.status(500).json({					// 500 - Internal Server Error
					"error" : "Internal Server Error"
				});
			}

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

//=================
// bot ID

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
				"error" : "Brain "+data.mouths[id]+" Not Found"
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

		if (req.body.status != undefined){
	
			let mouth = JSON.parse(data);

			if (req.body.status != undefined){
				if (req.body.status != "true" 
					&& req.body.status != "false"){

					return res.status(400).json({				// 400 - Bad Request
						"error": 'Status can be true or false'
					});
				}
			}
			mouth.status = req.body.status==="true"?true:false;

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
})
.post(function(req, res){ 										// ====POST====

	res.status(405);
	res.send('Method Not Allowed');
})

//===========================
// Export

module.exports = router;
