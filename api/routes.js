var express = require('express');
var path = require('path');

var Brain = require('../ai/brain');
// import Brain from '../ai/brain';

var router = express.Router();

//===========================
// Load AI

var bot1 = new Brain('Ally', './ai/brain','standard.rive');
setTimeout(()=> {bot1.response("local-user", "hello");}, 100);

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
