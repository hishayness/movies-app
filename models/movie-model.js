const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Movie = new Schema({
	name: { type: String, required: true },
	time: { type: [String], required: true },
	rating: { type: Number, required: true }
}, { timestamps: true });

Movie.query.byName = function(name) {
	return this.where({ name: new RegExp(name, 'i') });
}

module.exports = mongoose.model('movies', Movie);