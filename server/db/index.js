const mongoose = require('mongoose');

mongoose
	.connect('mongodb+srv://admin:admin123@cluster0.o4fgx.mongodb.net/cinema?retryWrites=true&w=majority', { useNewUrlParser: true })
	.catch(e => {
		console.error('Connection error', e.message);
	});

const db = mongoose.connection;

module.exports = db;