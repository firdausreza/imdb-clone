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
	createReqToken: () => {
		return axios.get(
			"https://api.themoviedb.org/3/authentication/token/new",
			{
				headers: {
					Accept: "application/json",
				},
				params: {
					api_key: process.env.REACT_APP_TMDB_KEY,
				},
			}
		);
	},
	createSession: (reqToken) => {
		return axios.get(
			"https://api.themoviedb.org/3/authentication/session/new",
			{
				headers: {
					"Content-Type": "application/json",
				},
				params: {
					api_key: process.env.REACT_APP_TMDB_KEY,
					request_token: reqToken,
				},
			}
		);
	},
	deleteSession: (sessionId) => {
		return axios.delete(
			"https://api.themoviedb.org/3/authentication/session",
			{
				headers: {
					"Content-Type": "application/json",
				},
				params: {
					api_key: process.env.REACT_APP_TMDB_KEY,
					session_id: sessionId,
				},
			}
		);
	},
	getAccountDetails: (sessionId) => {
		return axios.get("https://api.themoviedb.org/3/account", {
			headers: {
				"Content-Type": "application/json",
			},
			params: {
				api_key: process.env.REACT_APP_TMDB_KEY,
				session_id: sessionId,
			},
		});
	},
	getWatchlists: (accountId, sessionId) => {
		return axios.get(
			`https://api.themoviedb.org/3/account/${accountId}/watchlist/movies`,
			{
				headers: {
					"Content-Type": "application/json",
				},
				params: {
					api_key: process.env.REACT_APP_TMDB_KEY,
					session_id: sessionId,
				},
			}
		);
	},
	// Payload contain media_id, media_type, watchlist: true/false. this function contain handler for add/remove item
	requestWatchlist: (accountId, sessionId, payload) => {
		return axios.post(
			`https://api.themoviedb.org/3/account/${accountId}/watchlist`,
			payload,
			{
				headers: {
					"Content-Type": "application/json",
				},
				params: {
					api_key: process.env.REACT_APP_TMDB_KEY,
					session_id: sessionId,
				},
			}
		);
	},
};
