var express = require('express');
var path = require('path');

var router = express.Router();

router.route('/message')
.get(function(req, res){
	res.json({
		message: "test",
	})
})

module.exports = router;
