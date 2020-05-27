var express = require('express');
var path = require('path');

var router = express.Router();

//===========================
// Load AI

// setTimeout(()=> {bot1.response("local-user", "hello");}, 100);

//===========================
// Routes

//=================
// bots Collection

router.route("/bots")
.get(function(req, res){ // TODO
	res.json({
		response : "bots",
	});
})
.post(function(req, res){ // TODO

	res.json({
		response : "bots",
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

	res.json({
		response : "bot",
	});
})
.put(function(req, res){ // TODO

	res.json({
		response : "bot",
	});
})
.patch(function(req, res){ // TODO

	res.json({
		response : "bot",
	});
})
.delete(function(req, res){ // TODO

	res.json({
		response : "bot",
	});
})
.post(function(req, res){ // TODO

	res.json({
		response : "bot",
	});
})

//===========================
// Export

module.exports = router;
