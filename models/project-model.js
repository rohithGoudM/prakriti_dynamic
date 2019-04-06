const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
	name: String,
	writeup: String,
	picUrl: String
});

const Project = mongoose.model('project', eventSchema);

module.exports = Project;