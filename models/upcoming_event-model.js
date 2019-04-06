const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
	name: String,
	writeup: String,
	picUrl: String,
	date: Date,
	picUrl1: String,
	picUrl2: String,
	picUrl3: String,
	fblink: String
});

const Upcoming_event = mongoose.model('upcoming_event', eventSchema);

module.exports = Upcoming_event;