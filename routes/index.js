var express = require('express');
var router = express.Router();
var User = require('../lib/users')
 ,	Friend = require('../lib/friends');



var dangnhap;
router.get('/', function(req, res) {
	res.render('index', { title: 'HOME' });
});

router.get('/signup', function(req, res) {
	res.render('sign_up', { title: 'SIGN UP' });
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

router.post('/signup', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;

	var newuser = new User();
	newuser.username = username;
	newuser.password = password;
	newuser.email = email;
	newuser.save(function(err, saveUser) {
		if (err) {
			console.log(err);
			return res.status(500).send();
		}
		console.log('New user added!');
		return res.status(200).send();
	});
});

router.get('/messages', function(req, res) {
	if (req.session.isLoggedIn == false) {
			return res.send(404, "NOT FOUND...");
		}
	if (req.session.turn == 1){
		req.session.turn = 2;
		res.render('messages', {title : Message});
	}
	else {
		var select = req.query.select;
		Message.find({to: req.session.user}).populate('from').exec(function(err, foundData) {
			if (err) {
				console.log(err);
				return res.send(500, "OPP!!! ERROR +.=");
			}

			var messagesObject = [];
			messagesObject = foundData;
			res.send(messagesObject);
		});
		
	}
});

router.get('/dsuser', function(req, res)
	{
		console.log('Lay ds user');
		Friend.find({}, function (err, friends){
			User.find({},function(err, users) 
			{
		  		if (err) throw err;
		  		console.log(friends.length);	
				res.render('dsuser', { users: users, friends: friends, dangnhap: dangnhap});
			})
		});
		
	});

router.get('/newmess', function(req, res)
	{
		console.log('create messages');
		User.find({},function(err, users) 
			{
		  		if (err) throw err;
		  			
				res.render('sendMail', {users: users, dangnhap: dangnhap})
			})
		
		
		
	});

module.exports = router;