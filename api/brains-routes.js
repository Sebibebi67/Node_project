var express = require('express');
var path = require('path');

var router = express.Router();

//===========================
// Load AI

// setTimeout(()=> {bot1.response("local-user", "hello");}, 100);

//===========================
// Routes

//=================
// brains Collection

router.route("/brains")
.get(function(req, res){ // TODO
	res.json({
		response : "brains",
	});
})
.post(function(req, res){ // TODO

	res.json({
		response : "brains",
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
.get(function(req, res){ // TODO

	res.json({
		response : "brain",
	});
})
.put(function(req, res){ // TODO

	res.json({
		response : "brain",
	});
})
.patch(function(req, res){ // TODO

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
