const express = require('express');

const MovieCtrl = require('../controllers/movie-ctrl');
const UserCtrl = require('../controllers/user-ctrl');

const router = express.Router();

router.post('/movie', MovieCtrl.createMovie);
router.put('/movie/:id', MovieCtrl.updateMovie);
router.delete('/movie/:id', MovieCtrl.deleteMovie);
router.get('/movie/:id', MovieCtrl.getMovieById);
router.get('/movies', [UserCtrl.verifyToken], MovieCtrl.getMovies);
router.get('/movies/search/:query', MovieCtrl.searchMovies);
router.post('/join', [UserCtrl.userExists], UserCtrl.signup);
router.post('/login', UserCtrl.login);
router.get('/auth', UserCtrl.verifyToken);
router.get('/user', [UserCtrl.verifyToken], UserCtrl.getUser);

UserCtrl.initRole();

module.exports = router;
