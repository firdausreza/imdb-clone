import axios from "axios";

export const tmdb = {
	getMovies: (category) => {
		return axios.get(`https://api.themoviedb.org/3/movie/${category}`, {
			headers: {
				Accept: "application/json",
			},
			params: {
				api_key: process.env.REACT_APP_TMDB_KEY,
				language: "en-US",
				page: 1,
			},
		});
	},
	getGenres: () => {
		return axios.get("https://api.themoviedb.org/3/genre/movie/list", {
			headers: {
				Accept: "application/json",
			},
			params: {
				api_key: process.env.REACT_APP_TMDB_KEY,
				language: "en-US",
			},
		});
	},
	getMovieDetail: (movieId) => {
		return axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
			headers: {
				Accept: "application/json",
			},
			params: {
				api_key: process.env.REACT_APP_TMDB_KEY,
				language: "en-US",
			},
		});
	},
};
