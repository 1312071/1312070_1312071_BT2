var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('users', { title: 'Users\'\ s home' });
});

module.exports = router;