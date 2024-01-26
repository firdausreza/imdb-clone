import React, { useEffect, useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";

import MovieCard from "../../components/movie-card/MovieCard.jsx";
import { tmdb } from "../../helpers/tmdb-api.js";
import { mapWithGenres, mapWithWatchlist } from "../../helpers/movies.js";

export async function loader({ request }) {
	const url = new URL(request.url);
	const requestToken = url.searchParams.get("request_token");
	const isApproved = url.searchParams.get("approved");
	let authData = {
		status: "unauthenticated",
		request_token: "",
		approved: false,
	};

	if (requestToken && isApproved) {
		authData.status = "authenticated";
		authData.request_token = requestToken;
		authData.approved = true;
	}

	return authData;
}

const RenderNowPlayingMovies = ({
	movieCollection,
	reloadWatchlist,
	isSectionLoading,
}) => {
	return (
		<>
			<h2 id="np-heading" className="text-2xl sm:text-4xl font-bold">
				Now Playing
			</h2>
			{isSectionLoading && (
				<div className="h-[200px] flex justify-center items-center">
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
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
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
			{!isSectionLoading && movieCollection && (
				<article className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
					{movieCollection.map((movie) => {
						return (
							<MovieCard
								movie={movie}
								key={movie.id}
								reloadWatchlist={() => reloadWatchlist()}
							/>
						);
					})}
				</article>
			)}
			{!isSectionLoading && !movieCollection && (
				<div className="h-[150px] flex justify-center items-center">
					<p className="text-center">No data yet.</p>
				</div>
			)}
		</>
	);
};

const RenderPopularMovies = ({
	movieCollection,
	reloadWatchlist,
	isSectionLoading,
}) => {
	return (
		<>
			<h2 id="popular-heading" className="text-2xl sm:text-4xl font-bold">
				Popular Movies
			</h2>
			{isSectionLoading && (
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
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
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
			{!isSectionLoading && movieCollection && (
				<article className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
					{movieCollection.map((movie) => {
						return (
							<MovieCard
								movie={movie}
								key={movie.id}
								reloadWatchlist={() => reloadWatchlist()}
							/>
						);
					})}
				</article>
			)}
			{!isSectionLoading && !movieCollection && (
				<div className="h-[150px] flex justify-center items-center">
					<p className="text-center">No data yet.</p>
				</div>
			)}
		</>
	);
};

const RenderTopRatedMovies = ({
	movieCollection,
	reloadWatchlist,
	isSectionLoading,
}) => {
	return (
		<>
			<h2
				id="toprated-heading"
				className="text-2xl sm:text-4xl font-bold"
			>
				Top Rated
			</h2>
			{isSectionLoading && (
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
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
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
			{!isSectionLoading && movieCollection && (
				<article className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
					{movieCollection.map((movie) => {
						return (
							<MovieCard
								movie={movie}
								key={movie.id}
								reloadWatchlist={() => reloadWatchlist()}
							/>
						);
					})}
				</article>
			)}
			{!isSectionLoading && !movieCollection && (
				<div className="h-[150px] flex justify-center items-center">
					<p className="text-center">No data yet.</p>
				</div>
			)}
		</>
	);
};

const RenderUpcomingMovies = ({
	movieCollection,
	reloadWatchlist,
	isSectionLoading,
}) => {
	return (
		<>
			<h2
				id="upcoming-heading"
				className="text-2xl sm:text-4xl font-bold"
			>
				Upcoming
			</h2>
			{isSectionLoading && (
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
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
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
			{!isSectionLoading && movieCollection && (
				<article className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
					{movieCollection.map((movie) => {
						return (
							<MovieCard
								movie={movie}
								key={movie.id}
								reloadWatchlist={() => reloadWatchlist()}
							/>
						);
					})}
				</article>
			)}
			{!isSectionLoading && !movieCollection && (
				<div className="h-[150px] flex justify-center items-center">
					<p className="text-center">No data yet.</p>
				</div>
			)}
		</>
	);
};

function Home() {
	const [nowPlayingMovies, setNpMovies] = useState();
	const [popularMovies, setPopularMovies] = useState();
	const [topRatedMovies, setTopMovies] = useState();
	const [upcomingMovies, setUpcomingMovies] = useState();
	const [genres, setGenres] = useState();
	const [userWatchlist, setUserWatchlist] = useState();
	const [isPageLoading, setPageLoading] = useState();

	const authData = useLoaderData();

	const getGenres = async () => {
		const { data } = await tmdb.getGenres();

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
		setPageLoading(true);
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
			setPageLoading(false);
		} catch (e) {
			throw new Error(`Failed to fetch ${category} movies: `, e);
		}
	};

	const getWatchlists = () => {
		const accountId = JSON.parse(sessionStorage.getItem("currentUser")).id;
		const sessionId = sessionStorage.getItem("currentSession");

		tmdb.getWatchlists(accountId, sessionId)
			.then((res) => {
				if (!res.data) {
					setUserWatchlist(null);
					return;
				}

				setUserWatchlist(res.data.results);
			})
			.catch((e) => {
				throw new Error("Failed to get user watchlists: ", e);
			});
	};

	const nowPlayingMemo = useMemo(() => {
		if (nowPlayingMovies && genres) {
			let result = mapWithGenres(nowPlayingMovies, genres);
			if (userWatchlist) result = mapWithWatchlist(result, userWatchlist);
			return result.slice(0, 8);
		} else return null;
	}, [nowPlayingMovies, genres, userWatchlist]);

	const popularMemo = useMemo(() => {
		if (popularMovies && genres) {
			let result = mapWithGenres(popularMovies, genres);
			if (userWatchlist) result = mapWithWatchlist(result, userWatchlist);
			return result.slice(0, 8);
		} else return null;
	}, [popularMovies, genres, userWatchlist]);

	const topRatedMemo = useMemo(() => {
		if (topRatedMovies && genres) {
			let result = mapWithGenres(topRatedMovies, genres);
			if (userWatchlist) result = mapWithWatchlist(result, userWatchlist);
			return result.slice(0, 8);
		} else return null;
	}, [topRatedMovies, genres, userWatchlist]);

	const upcomingMemo = useMemo(() => {
		if (upcomingMovies && genres) {
			let result = mapWithGenres(upcomingMovies, genres);
			if (userWatchlist) result = mapWithWatchlist(result, userWatchlist);
			return result.slice(0, 8);
		} else return null;
	}, [upcomingMovies, genres, userWatchlist]);

	useEffect(() => {
		if (!sessionStorage.getItem("currentSession")) {
			if (
				authData.status === "authenticated" &&
				authData.request_token !== "" &&
				authData.approved
			) {
				sessionStorage.setItem("authStatus", JSON.stringify(authData));
				tmdb.createSession(authData.request_token)
					.then((res) => {
						if (res.data) {
							sessionStorage.setItem(
								"currentSession",
								res.data.session_id
							);
							tmdb.getAccountDetails(res.data.session_id)
								.then((_res) => {
									if (res.data) {
										sessionStorage.setItem(
											"currentUser",
											JSON.stringify({
												name: _res.data.name,
												username: _res.data.username,
												id: _res.data.id,
											})
										);
									}
								})
								.then(() => window.location.reload())
								.catch((e) => {
									throw new Error(
										"Failed to get account details: ",
										e
									);
								});
						}
					})
					.catch((e) => {
						throw new Error("Failed to createSession: ", e);
					});
			}
		}

		if (sessionStorage.getItem("currentSession")) getWatchlists();
		if (!genres) getGenres();
		if (genres) {
			getMovies("now_playing");
			getMovies("popular");
			getMovies("top_rated");
			getMovies("upcoming");
		}
	}, [genres, authData]);

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
				<RenderNowPlayingMovies
					movieCollection={nowPlayingMemo}
					reloadWatchlist={() => getWatchlists()}
					isSectionLoading={isPageLoading}
				/>
			</section>
			<section
				id="popular"
				className="sm:container p-4 sm:py-4 sm:px-0 mx-auto"
			>
				<RenderPopularMovies
					movieCollection={popularMemo}
					reloadWatchlist={() => getWatchlists()}
					isSectionLoading={isPageLoading}
				/>
			</section>
			<section
				id="top-rated"
				className="sm:container p-4 sm:py-4 sm:px-0 mx-auto"
			>
				<RenderTopRatedMovies
					movieCollection={topRatedMemo}
					reloadWatchlist={() => getWatchlists()}
					isSectionLoading={isPageLoading}
				/>
			</section>
			<section
				id="upcoming"
				className="sm:container p-4 sm:py-4 sm:px-0 mx-auto"
			>
				<RenderUpcomingMovies
					movieCollection={upcomingMemo}
					reloadWatchlist={() => getWatchlists()}
					isSectionLoading={isPageLoading}
				/>
			</section>
		</>
	);
}

export default Home;
