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

	console.log(req.body)
	let user = req.body.user;
	let message = req.body.message;

	var answer = bot1.response(user, message).then((reply) => {
		console.log(reply)
		res.json({
			response : "reply",
		});
	});
	// console.log(req);
    // console.log('Got body:', req.body);
	
}).get(function(req, res){

	console.log(req.body)
	let user = req.body.user;
	let message = req.body.message;

	var answer = bot1.response(user, message).then((reply) => {
		console.log(reply)
		res.json({
			response : reply,
		});
	});
	// console.log(req);
    // console.log('Got body:', req.body);
	
})

/*

*/

module.exports = router;
