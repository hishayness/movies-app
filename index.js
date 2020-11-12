const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const apiPort = process.env.PORT || 3000;

const db = require('./db');
const movieRouter = require('./routes/movie-router');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'Mongo DB connection error:'));

app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/api', movieRouter);

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
})

app.listen(apiPort, () => console.log(`Server running on post ${apiPort}`));