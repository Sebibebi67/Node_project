var express = require('express');
var path = require('path');

var router = express.Router();

router.use(express.static(path.join(__dirname,'/build')));
router.get('/', function (req, res, next) {
    res.sendFile(path.resolve('build/index.html'));
});

/*router.route('/icon/send_hover')
.get(function(req, res){ 
	res.sendFile(path.join(__dirname + '/../public/assets/icons/send_hover.png'));
})*/

//===============

/*router.route('/circle.js')
.get(function(req, res){ 
	res.sendFile(path.join(__dirname + '/../public/util/circle.js'));
})*/

//===============

module.exports = router;