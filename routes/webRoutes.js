var express = require('express');
var path = require('path');

var router = express.Router();

router.route('/')
.get(function(req, res){ 
	res.sendFile(path.join(__dirname + '/../public/index.html'));
})

router.route('/index.css')
.get(function(req, res){ 
	res.sendFile(path.join(__dirname + '/../public/index.css'));
})

router.route('/index.js')
.get(function(req, res){ 
	res.sendFile(path.join(__dirname + '/../public/index.js'));
})

module.exports = router;