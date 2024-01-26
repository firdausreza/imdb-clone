import React, { useEffect, useState } from "react";
import MovieCard from "../../components/movie-card/MovieCard.jsx";
import { tmdb } from "../../helpers/tmdb-api.js";

function Watchlists() {
	const [myWatchlist, setMyWatchlist] = useState();
	const [isPageLoading, setPageLoading] = useState(false);

	const getWatchlists = () => {
		setPageLoading(true);
		const accountId = JSON.parse(sessionStorage.getItem("currentUser")).id;
		const sessionId = sessionStorage.getItem("currentSession");

		tmdb.getWatchlists(accountId, sessionId).then((res) => {
			if (!res.data) {
				setMyWatchlist(null);
				return;
			}

			let watchlistData = null;
			if (res.data.results.length > 0) {
				watchlistData = res.data.results.map((movie) => {
					movie.watchlist = true;
					return movie;
				});
			}
			setMyWatchlist(watchlistData);
			setPageLoading(false);
		});
	};

	useEffect(() => {
		if (!sessionStorage.getItem("currentSession")) {
			setMyWatchlist(null);
			return;
		}

		getWatchlists();
	}, []);

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
					{isPageLoading && (
						<div className="h-[150px] flex justify-center items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="icon icon-tabler icon-tabler-loader animate-spin"
								width={32}
								height={32}
								viewBox="0 0 24 24"
								strokeWidth={2}
								stroke="#000"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path
									stroke="none"
									d="M0 0h24v24H0z"
									fill="none"
								/>
								<path d="M12 6l0 -3" />
								<path d="M16.25 7.75l2.15 -2.15" />
								<path d="M18 12l3 0" />
								<path d="M16.25 16.25l2.15 2.15" />
								<path d="M12 18l0 3" />
								<path d="M7.75 16.25l-2.15 2.15" />
								<path d="M6 12l-3 0" />
								<path d="M7.75 7.75l-2.15 -2.15" />
							</svg>
						</div>
					)}
					{!isPageLoading &&
						myWatchlist &&
						myWatchlist.length > 0 && (
							<article className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
								{myWatchlist.map((movie) => {
									return (
										<MovieCard
											movie={movie}
											key={movie.id}
											reloadWatchlist={() =>
												getWatchlists()
											}
										/>
									);
								})}
							</article>
						)}
					{!isPageLoading && !myWatchlist && (
						<div className="h-[150px] flex justify-center items-center">
							<p className="text-center">No data yet.</p>
						</div>
					)}
				</section>
			</section>
		</>
	);
}

export default Watchlists;
