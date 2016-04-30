var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var friendSchema = new Schema({
	email: String,
	fr: String
});

var Friend = mongoose.model('Friend', friendSchema);
module.exports = Friend;

