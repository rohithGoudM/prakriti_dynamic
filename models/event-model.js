const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
	name: String,
	writeup: String,
	picUrl: String,
	date: Date
});

const Event = mongoose.model('event', eventSchema);

module.exports = Event;