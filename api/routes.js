var express = require('express');
var path = require('path');

var ai = require('./ai/brain/brain');

var router = express.Router();

//===========================
// Load AI

ai.loading();

//===========================
// Routes

router.route('/message')
.post(function(req, res){
	console.log(req);
    console.log('Got body:', req.body);
	res.json({

	});
})

module.exports = router;
