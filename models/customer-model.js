const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

const customerSchema = new Schema({
	username: String,
	password: String,
	googleId: String,
	facebookId: String,
	subscription: Boolean,
	city: String,
	area: String,
	phoneNumber: Number,
	name: String
});

customerSchema.methods.hashPassword = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

customerSchema.methods.comparePassword = function(password, hash){
	return bcrypt.compareSync(password, hash);
}

const Customer = mongoose.model('customer', customerSchema);

module.exports = Customer;


