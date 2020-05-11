var express = require('express');
var path = require('path');

var ai = require('../ai/brain');

var router = express.Router();

//===========================
// Load AI

ai.loading();

//===========================
// Routes

router.route('/message')
.get(function(req, res){
	res.json({

	});
})

module.exports = router;
