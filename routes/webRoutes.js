var express = require('express');
var path = require('path');

var router = express.Router();

//===============

router.route('/')
.get(function(req, res){ 
	res.sendFile(path.join(__dirname + '/../public/main/index.html'));
})

router.route('/index.css')
.get(function(req, res){ 
	res.sendFile(path.join(__dirname + '/../public/main/index.css'));
})

router.route('/index.js')
.get(function(req, res){ 
	res.sendFile(path.join(__dirname + '/../public/main/index.js'));
})

//===============

router.route('/message-me')
.get(function(req, res){ 
	res.sendFile(path.join(__dirname + '/../public/message-service/index.html'));
})

router.route('/message-me.css')
.get(function(req, res){ 
	res.sendFile(path.join(__dirname + '/../public/message-service/index.css'));
})

router.route('/message-me')
.get(function(req, res){ 
	res.sendFile(path.join(__dirname + '/../public/message-service/index.js'));
})

//===============

router.route('/icon/send')
.get(function(req, res){ 
	res.sendFile(path.join(__dirname + '/../public/assets/icons/send.png'));
})

router.route('/icon/send_hover')
.get(function(req, res){ 
	res.sendFile(path.join(__dirname + '/../public/assets/icons/send_hover.png'));
})

//===============

router.route('/circle.js')
.get(function(req, res){ 
	res.sendFile(path.join(__dirname + '/../public/util/circle.js'));
})

//===============

module.exports = router;