var express = require('express');
var path = require('path');

var Brain = require('../ai/brain');
// import Brain from '../ai/brain';

var router = express.Router();

//===========================
// Load AI

var bot1 = new Brain('Ally', './ai/brains');
// setTimeout(()=> {bot1.response("local-user", "hello");}, 100);

//===========================
// Routes

router.route('/message')
.post(function(req, res){
	bot1.response("local-user", req).then((answer) => {
		console.log(answer);
	});
	// console.log(req);
    // console.log('Got body:', req.body);
	res.json({

	});
}).get(function(req, res){
	bot1.response("local-user", req).then((answer) => {
		console.log(answer);
	});
	// console.log(req);
    // console.log('Got body:', req.body);
	res.json({

	});
})

module.exports = router;
