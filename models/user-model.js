const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
	username: String,
	password: String,
	googleId: String,
	facebookId: String,
	type: String,
	subscription: Boolean
});

userSchema.methods.hashPassword = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.methods.comparePassword = function(password, hash){
	return bcrypt.compareSync(password, hash);
}

const User = mongoose.model('user', userSchema);

module.exports = User;


