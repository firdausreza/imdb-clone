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
	getNowPlayingMovies: () => {
		return axios.get(`https://api.themoviedb.org/3/movie/now_playing`, {
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
	getPopularMovies: () => {
		return axios.get("https://api.themoviedb.org/3/movie/popular", {
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
	getTopRatedMovies: () => {
		return axios.get("https://api.themoviedb.org/3/movie/top_rated", {
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
	getUpcomingMovies: () => {
		return axios.get("https://api.themoviedb.org/3/movie/upcoming", {
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
