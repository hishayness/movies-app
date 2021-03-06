import axios from 'axios';

const api = axios.create({
	baseURL: `${process.env.REACT_APP_API_SERVER || `http://localhost:8000/`}api`,
	withCredentials: true
});

export const insertMovie = payload => api.post(`/movie`, payload);
export const getAllMovies = () => api.get(`/movies`);
export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload);
export const deleteMovieById = id => api.delete(`/movie/${id}`);
export const getMovieById = id => api.get(`/movie/${id}`);
export const searchMovies = query => api.get(`/movies/search/${query}`);
export const registerUser = payload => api.post(`join`, payload);
export const loginUser = payload => api.post(`login`, payload);
export const verifyUser = () => api.get(`/verify`);
export const getUser = () => api.get(`/user`);

const apis = {
	insertMovie,
	getAllMovies,
	updateMovieById,
	deleteMovieById,
	getMovieById,
	searchMovies,
	registerUser,
	loginUser,
	verifyUser,
	getUser
}

export default apis;