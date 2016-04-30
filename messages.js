var mongoose = require('mongoose');
var User = require('../lib/users');

var mySchema = mongoose.Schema({
	from: { type: mongoose.Schema.ObjectId, ref: 'User' },
	to: String,
	content: String,
	read: Boolean,
	date: Date
});
//define a model
var Message = mongoose.model('message', mySchema);

module.exports = Message;