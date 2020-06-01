//====================================================
// Require
//====================================================

//======================
// Vendors

var express = require('express');
var path = require('path');

//======================
// Own

var botsRoutes = require("./bots-routes");
var mouthsRoutes = require("./mouths-routes");
var brainsRoutes = require("./brains-routes");

//====================================================
// Define
//====================================================

//var Brain = require('../ai/brain');
// import Brain from '../ai/brain';

var router = express.Router();

//===========================
// Load AI

//var bot1 = new Brain('Ally', './ai/brains');
// setTimeout(()=> {bot1.response("local-user", "hello");}, 100);

//===========================
// Routes

// router.route('/message')
// .post(function(req, res){

// 	let user = req.body.user;
// 	let message = req.body.message;

// 	var answer = bot1.response(user, message).then((reply) => {
// 		res.json({
// 			response : reply,
// 		});
// 	});
// })

//====================================================
// Define routes
//====================================================

router
.use(botsRoutes)
.use(mouthsRoutes)
.use(brainsRoutes);

router.route("*").all(function(req, res) {
	return res.status(404).json({
		"error" : "Bad URL"
	});
})

//====================================================
// Export
//====================================================

module.exports = router;

//====================================================
// End
//====================================================