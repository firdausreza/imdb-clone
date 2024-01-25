import React, { useEffect, useMemo, useState } from "react";
import MovieCard from "../../components/movie-card/MovieCard.jsx";
import { tmdb } from "../../helpers/tmdb-api.js";
import { mapWithGenres } from "../../helpers/movies.js";

function Home() {
	const [nowPlayingMovies, setNpMovies] = useState();
	const [popularMovies, setPopularMovies] = useState();
	const [topRatedMovies, setTopMovies] = useState();
	const [upcomingMovies, setUpcomingMovies] = useState();
	const [genres, setGenres] = useState();

	const getGenres = async () => {
		const { data } = await tmdb.getGenres();
		console.log(data);

		if (!data) {
			setGenres(null);
			return;
		}

		const genreObject = {};
		data.genres.forEach((genre) => {
			genreObject[genre.id] = genre.name;
		});

		setGenres(genreObject);
	};

	const getMovies = async (category) => {
		try {
			const { data } = await tmdb.getMovies(category);

			if (!data) {
				setNpMovies(null);
				setPopularMovies(null);
				setTopMovies(null);
				setUpcomingMovies(null);
			}

			if (category === "now_playing") setNpMovies(data.results);
			if (category === "popular") setPopularMovies(data.results);
			if (category === "top_rated") setTopMovies(data.results);
			if (category === "upcoming") setUpcomingMovies(data.results);
		} catch (e) {
			throw new Error("Failed to fetch movies: ", e);
		}
	};

	const nowPlayingMemo = useMemo(() => {
		if (nowPlayingMovies && genres) {
			const result = mapWithGenres(nowPlayingMovies, genres);
			return result.slice(0, 8);
		} else return null;
	}, [nowPlayingMovies, genres]);

	const popularMemo = useMemo(() => {
		if (popularMovies && genres) {
			const result = mapWithGenres(popularMovies, genres);
			return result.slice(0, 8);
		} else return null;
	}, [popularMovies, genres]);

	const topRatedMemo = useMemo(() => {
		if (topRatedMovies && genres) {
			const result = mapWithGenres(topRatedMovies, genres);
			return result.slice(0, 8);
		} else return null;
	}, [topRatedMovies, genres]);

	const upcomingMemo = useMemo(() => {
		if (upcomingMovies && genres) {
			const result = mapWithGenres(upcomingMovies, genres);
			return result.slice(0, 8);
		} else return null;
	}, [upcomingMovies, genres]);

	useEffect(() => {
		if (!genres) getGenres();
		if (genres) {
			getMovies("now_playing");
			getMovies("popular");
			getMovies("top_rated");
			getMovies("upcoming");
		}
	}, [genres]);

	return (
		<>
			<section
				id="hero"
				className="sm:container p-4 sm:py-12 sm:px-0 mx-auto"
			>
				<h1 className="text-2xl sm:text-4xl font-bold">IMDb Clone!</h1>
				<p>Find your favorite movies here.</p>
			</section>
			<section
				id="now-playing"
				className="sm:container p-4 sm:py-4 sm:px-0 mx-auto"
			>
				<h2 id="np-heading" className="text-2xl sm:text-4xl font-bold">
					Now Playing
				</h2>
				{nowPlayingMemo && (
					<article className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
						{nowPlayingMemo.map((movie) => {
							return (
								<MovieCard
									id={movie.id}
									title={movie.title}
									genres={movie.genres}
									poster={movie.poster_path}
									year={movie.release_date}
									rating={movie.vote_average}
									totalRate={movie.vote_count}
									showBtn
									key={movie.title}
								/>
							);
						})}
					</article>
				)}
				{!nowPlayingMemo && (
					<div className="h-[150px] flex justify-center items-center">
						<p className="text-center">No data yet.</p>
					</div>
				)}
			</section>
			<section
				id="popular"
				className="sm:container p-4 sm:py-4 sm:px-0 mx-auto"
			>
				<h2
					id="popular-heading"
					className="text-2xl sm:text-4xl font-bold"
				>
					Popular Movies
				</h2>
				{popularMemo && (
					<article className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
						{popularMemo.map((movie) => {
							return (
								<MovieCard
									id={movie.id}
									title={movie.title}
									genres={movie.genres}
									poster={movie.poster_path}
									year={movie.release_date}
									rating={movie.vote_average}
									totalRate={movie.vote_count}
									showBtn
									key={movie.title}
								/>
							);
						})}
					</article>
				)}
				{!popularMemo && (
					<div className="h-[150px] flex justify-center items-center">
						<p className="text-center">No data yet.</p>
					</div>
				)}
			</section>
			<section
				id="top-rated"
				className="sm:container p-4 sm:py-4 sm:px-0 mx-auto"
			>
				<h2
					id="toprated-heading"
					className="text-2xl sm:text-4xl font-bold"
				>
					Top Rated
				</h2>
				{topRatedMemo && (
					<article className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
						{topRatedMemo.map((movie) => {
							return (
								<MovieCard
									id={movie.id}
									title={movie.title}
									genres={movie.genres}
									poster={movie.poster_path}
									year={movie.release_date}
									rating={movie.vote_average}
									totalRate={movie.vote_count}
									showBtn
									key={movie.title}
								/>
							);
						})}
					</article>
				)}
				{!topRatedMemo && (
					<div className="h-[150px] flex justify-center items-center">
						<p className="text-center">No data yet.</p>
					</div>
				)}
			</section>
			<section
				id="upcoming"
				className="sm:container p-4 sm:py-4 sm:px-0 mx-auto"
			>
				<h2
					id="upcoming-heading"
					className="text-2xl sm:text-4xl font-bold"
				>
					Upcoming
				</h2>
				{upcomingMemo && (
					<article className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
						{upcomingMemo.map((movie) => {
							return (
								<MovieCard
									id={movie.id}
									title={movie.title}
									genres={movie.genres}
									poster={movie.poster_path}
									year={movie.release_date}
									rating={movie.vote_average}
									totalRate={movie.vote_count}
									showBtn
									key={movie.title}
								/>
							);
						})}
					</article>
				)}
				{!upcomingMemo && (
					<div className="h-[150px] flex justify-center items-center">
						<p className="text-center">No data yet.</p>
					</div>
				)}
			</section>
		</>
	);
}

export default Home;
