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

	let user = req.body.user;
	let message = req.body.message;

	var answer = bot1.response(user, message).then((reply) => {
		res.json({
			response : reply,
		});
	});
})

/*
fetch('http://localhost:3000/message', {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'}, // this line is important, if this content-type is not set it wont work
    body: encodeURI("user=Tony&message=What's your name"),
}).then(json => json.json()).then((data) => {console.log(data)});
*/

module.exports = router;
