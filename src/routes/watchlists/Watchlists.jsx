import React from "react";
import MovieCard from "../../components/movie-card/MovieCard.jsx";

function Watchlists() {
	return (
		<>
			<section className="min-h-[80vh]">
				<section
					id="hero"
					className="sm:container p-4 sm:py-8 sm:px-0 mx-auto"
				>
					<h1 className="text-2xl sm:text-4xl font-bold">
						My Watchlists
					</h1>
				</section>
				<section
					id="my-watchlists"
					className="sm:container p-4 sm:px-0 mx-auto"
				>
					<article className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
						<MovieCard />
						<MovieCard />
						<MovieCard />
						<MovieCard />
					</article>
				</section>
			</section>
		</>
	);
}

export default Watchlists;
