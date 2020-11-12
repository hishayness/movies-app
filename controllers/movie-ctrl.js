const Movie = require('../models/movie-model');

createMovie = (req, res) => {
	const body = req.body;
 
	if(!body) {
		return res.status(400).json({
			success: false,
			error: 'You must provide a movie'
		})
	}

	const movie = new Movie(body);

	if(!movie) {
		return res.status(400).json({ success: false, error: 'Could create movie' });
	}

	movie
		.save()
		.then(() => {
			return res.status(201).json({
				success: true,
				id: movie._id,
				message: 'Movie created!'
			});
		})
		.catch(err => {
			return res.status(400).json({
				error: err,
				message: 'Movie not created!'
			})
		})
}

updateMovie = (req, res) => {
	const body = req.body;

	if(!body) {
		return res.status(400).json({
			success: false,
			error: 'You must provide a body to update'
		});
	}

	Movie.findOne({ _id: req.params.id }, (err, movie) => {
		movie.name = body.name;
		movie.time = body.time;
		movie.rating = body.rating;
		movie
			.save()
			.then(() => {
				return res.status(200).json({
					success: true,
					id: movie._id,
					message: 'Movie updated!'
				})
			})
			.catch(err => {
				return res.status(404).json({
					error: err,
					message: 'Movie not updated!'
				})
			})
	})
}

deleteMovie = async (req, res) => {
	await Movie.findOneAndDelete({ _id: req.params.id }, (err, movie) => {
		if(err) {
			return res.status(400).json({ success: false, error: err });
		}

		if(!movie) {
			return res
				.status(404)
				.json({ success: false, message: 'Movie not found'});
		}

		return res.status(200).json({ success: true, data: movie });
	})
	.catch(err => console.log(err));
}

getMovieById = async (req, res) => {
	await Movie.findOne({ _id: req.params.id }, (err, movie) => {
		if(err) {
			return res.status(400).json({ success: false, error: err });
		}

		if(!movie) {
			return res
				.status(404)
				.json({ success: false, message: 'Movie not found'});
		}

		return res.status(200).json({ success: true, data: movie });
	})
	.catch(err => console.log(err));
}

getMovies = async (req, res) => {
	await Movie.find({}, (err, movies) => {
		if(err) {
			return res.status(400).json({ success: false, error: err });
		}

		if(!movies.length) {
			return res
				.status(404)
				.json({ success: false, error: "Movie not found"})
		}

		return res.status(200).json({ success: true, data: movies });
	}).catch(err => console.log(err));
}

searchMovies = async (req, res) => {
	await Movie.find().byName(req.params.query).exec((err, movies) => {
		if(err) {
			return res.status(400).json({ success: false, error: err });
		}
		
		return res
			.status(200)
			.json({ success: true, data: movies });

	});
}

module.exports = {
	createMovie,
	updateMovie,
	deleteMovie,
	getMovies,
	getMovieById,
	searchMovies
}
