var express = require('express');
var mongoose = require('mongoose');
var ect = require('ect');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');

var routes = require('./routes/index');
var users = require('./routes/users');

var ectRenderer = ect({ watch: true, root: __dirname + '/views', ext : '.ect' });
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);

app.set('view engine', 'ect');
app.engine('ect', ectRenderer.render);
app.set(express.static(__dirname + '/views'));
var port = Number(process.env.PORT || 3000);

app.use(function(req, res, next) {
	var err = new Error('Not found!');
	err.status = 404;
	next(err);
});

mongoose.connect('mongodb://system:123456@ds013232.mlab.com:13232/bt2', function(){
	console.log('Connected!');
});

app.listen(port, function(){
	console.log('Now listening on https://localhost:3000');
});