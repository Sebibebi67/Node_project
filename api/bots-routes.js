var express = require('express');
var path = require('path');
var fs = require('fs');

const PATH = "./data/bots";

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
.get(function(req, res){ // TODO
	fs.readdir(PATH, function (err, files) {
		
		if (err) {
			return console.log('Unable to scan directory: ' + err);
		}
		else {
			let listOfBots = [];

			files.forEach(function (file) {
				let f = fs.readFileSync(PATH+"/"+file)
			
				let bot = JSON.parse(f);
			
				listOfBots.push(bot);
			});
	
			res.json(listOfBots);
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
// bot ID

router.route("/bot/:id")
.get(function(req, res){ // TODO
	fs.readFile(PATH+"/"+req.params.id+'.json', (err, data) => {
		if (err){
			res.status(404);
			res.send('Resource Not Found');
		} else {
			let bot = JSON.parse(data);
		
			res.json(bot);
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

	res.status(405);
	res.send('Method Not Allowed');
})
.delete(function(req, res){ // TODO
	fs.unlink(PATH+"/"+req.params.id+".json", function(err) {
		if (err){
			res.status(404);
			res.send('Resource Not Found');
		} else {
			return res.status(200).send("Resource deleted");
		}
	});
})
.post(function(req, res){ // TODO

	res.status(405);
	res.send('Method Not Allowed');
})

//===========================
// Export

module.exports = router;
