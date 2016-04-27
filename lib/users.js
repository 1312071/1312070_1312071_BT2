var mongoose = require('mongoose');

var mySchema = mongoose.Schema({
	username: String,
	email: String,
	password: String
});
//define a model
var User = mongoose.model('User', mySchema);

module.exports = User;