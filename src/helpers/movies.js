export const mapWithGenres = (movies, genres) => {
	return movies.map((movie) => {
		movie.genres = movie["genre_ids"].map((gen) => genres[gen]).join(", ");
		return movie;
	});
};
