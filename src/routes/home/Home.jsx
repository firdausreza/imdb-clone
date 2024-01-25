import React from "react";
import MovieCard from "../../components/movie-card/MovieCard.jsx";

function Home() {
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
				<article className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
					<MovieCard showBtn />
					<MovieCard showBtn />
					<MovieCard showBtn />
					<MovieCard showBtn />
				</article>
			</section>
			<section
				id="popular"
				className="sm:container p-4 sm:py-4 sm:px-0 mx-auto"
			>
				<h2 id="np-heading" className="text-2xl sm:text-4xl font-bold">
					Popular Movies
				</h2>
				<article className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
					<MovieCard showBtn />
					<MovieCard showBtn />
					<MovieCard showBtn />
					<MovieCard showBtn />
				</article>
			</section>
			<section
				id="top-rated"
				className="sm:container p-4 sm:py-4 sm:px-0 mx-auto"
			>
				<h2 id="np-heading" className="text-2xl sm:text-4xl font-bold">
					Top Rated
				</h2>
				<article className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
					<MovieCard showBtn />
					<MovieCard showBtn />
					<MovieCard showBtn />
					<MovieCard showBtn />
				</article>
			</section>
			<section
				id="upcoming"
				className="sm:container p-4 sm:py-4 sm:px-0 mx-auto"
			>
				<h2 id="np-heading" className="text-2xl sm:text-4xl font-bold">
					Upcoming
				</h2>
				<article className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
					<MovieCard showBtn />
					<MovieCard showBtn />
					<MovieCard showBtn />
					<MovieCard showBtn />
				</article>
			</section>
		</>
	);
}

export default Home;
