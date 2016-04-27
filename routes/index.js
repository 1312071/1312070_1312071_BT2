var express = require('express');
var router = express.Router();
var User = require('../lib/users');



var dangnhap;
router.get('/', function(req, res) {
	res.render('index', { title: 'HOME' });
});


router.post('/', function(req, res) {
	var email = req.body.email;
	var password = req.body.password;
	console.log(email);
	
	User.findOne({email: email, password: password}, function(err, user) {
		if (err) {
			console.log(err);
			return res.send(500, "OPP!!! ERROR +.+");
		}
			 
		if (!user) {
			console.log('404');
			return res.send(404, "NOT FOUND...");
		}
			 
			
		console.log('user login');
		req.session.isLoggedIn = true;
		req.session.user= email;
		dangnhap = email;
		console.log('created user: %s', email);
		return res.send(user);
	});
});


module.exports = router;