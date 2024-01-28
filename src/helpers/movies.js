export const mapWithGenres = (movies, genres) => {
	return movies.map((movie) => {
		movie.genres = movie["genre_ids"].map((gen) => genres[gen]).join(", ");
		return movie;
	});
};

// Movies: Array, Watchlist: Array
export const mapWithWatchlist = (movies, watchlist) => {
	return movies.map((movie) => {
		if (watchlist.some((_movie) => _movie.id === movie.id))
			movie.watchlist = true;
		else movie.watchlist = false;
		return movie;
	});
};
