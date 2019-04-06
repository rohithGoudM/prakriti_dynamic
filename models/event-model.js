const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
	name: String,
	writeup: String,
	picUrl: String
});

const Event = mongoose.model('event', eventSchema);

module.exports = Event;