const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

const restaurantSchema = new Schema({
	username: String,
	password: String,
	googleId: String,
	facebookId: String,
	city: String,
	area: String,
	name: String,
	phoneNumber: Number,
	menu_name: Array,
	menu_pic: Array,
	top: Number
});

restaurantSchema.methods.hashPassword = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

restaurantSchema.methods.comparePassword = function(password, hash){
	return bcrypt.compareSync(password, hash);
}

const Restaurant = mongoose.model('restaurant', restaurantSchema);

module.exports = Restaurant;


