import axios from 'axios';

const api = axios.create({
	baseURL: `${process.env.API_SERVER || `http://localhost:3000`}/api`
});

export const insertMovie = payload => api.post(`/movie`, payload);
export const getAllMovies = () => api.get(`/movies`);
export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload);
export const deleteMovieById = id => api.delete(`/movie/${id}`);
export const getMovieById = id => api.get(`/movie/${id}`);
export const searchMovies = query => api.get(`/movies/search/${query}`);

const apis = {
	insertMovie,
	getAllMovies,
	updateMovieById,
	deleteMovieById,
	getMovieById,
	searchMovies
}

export default apis;