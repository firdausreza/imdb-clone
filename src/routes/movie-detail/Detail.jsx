import React, { useEffect, useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import MovieBadge from "../../components/badge/MovieBadge.jsx";
import ButtonLogo from "../../components/button/ButtonLogo.jsx";
import Button from "../../components/button/Button.jsx";
import { tmdb } from "../../helpers/tmdb-api.js";
import moment from "moment";
import numeral from "numeral";
import { mapWithWatchlist } from "../../helpers/movies.js";
import { saveRating, saveWatchlist } from "../../helpers/dataHandler.js";
import localforage from "localforage";
import Offline from "../../components/offline/Offline.jsx";

export async function loader({ params }) {
	let sessionId = "";
	let accountId = null;

	try {
		localforage.getItem("currentSession").then((value) => {
			if (value && value !== "") {
				sessionId = value;
			}
		});
		localforage.getItem("currentUser").then((user) => {
			if (user) {
				accountId = JSON.parse(user).id;
			}
		});
	} catch (err) {
		throw new Error("Failed to fetch detail loader: ", err);
	} finally {
		const { data } = await tmdb.getMovieDetail(params.movieId);
		if (sessionId) {
			const watchlistRes = await tmdb.getWatchlists(accountId, sessionId);
			return {
				movieData: data,
				watchlistData: watchlistRes.data.results,
				sessionId: sessionId,
				accountId: accountId,
			};
		} else {
			return {
				movieData: data,
				watchlistData: null,
				sessionId: sessionId,
				accountId: accountId,
			};
		}
	}
}

function MovieDetail() {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [isLoading, setLoading] = useState(false);
	const { movieData, watchlistData, sessionId, accountId } = useLoaderData();

	useEffect(() => {
		document.title = `IMDb Clone - ${movieData.title}`;
		window.addEventListener("resize", () => {
			setWindowWidth(window.innerWidth);
		});

		return () => {
			window.removeEventListener("resize", () => {});
		};
	}, [movieData, watchlistData]);

	const movieMemo = useMemo(() => {
		let result;
		if (watchlistData) {
			result = mapWithWatchlist([movieData], watchlistData)[0];
		} else {
			result = movieData;
		}
		return result;
	}, [movieData, watchlistData]);

	// Handler for watchlist button
	const toggleWatchlist = () => {
		if (sessionId && sessionId !== "") {
			setLoading(true);
			const payload = {
				account_id: accountId,
				data: {
					media_id: movieData.id,
					media_type: "movie",
					watchlist: !movieData.watchlist,
				},
			};

			saveWatchlist(payload, sessionId).then(() => {
				movieData.watchlist = !movieData.watchlist;
				setLoading(false);
			});
		}
	};

	// Comment component
	const comments = () => {
		return (
			<div className="mt-4 py-4 border-t-2 border-stone-950">
				<div className="flex items-start gap-2">
					<div className="p-2 rounded-full bg-white">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="icon icon-tabler icon-tabler-user"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							strokeWidth="2"
							stroke="black"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
							<path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
						</svg>
					</div>
					<div className="flex-1 ms-2">
						<h5 className="text-lg font-medium text-nowrap">
							Anonymous User
						</h5>
						<p className="text-sm ">25-01-2024</p>
						<p className="text-base font-medium mt-1">
							Lorem, ipsum dolor sit amet consectetur adipisicing
							elit. Cumque accusamus nisi expedita qui neque
							cupiditate facilis repellendus et in alias, iste
							soluta quae, iusto exercitationem.
						</p>
					</div>
				</div>
			</div>
		);
	};

	const generateWatchlistIcon = () => {
		if (movieData.watchlist) {
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="icon icon-tabler icon-tabler-bookmark-minus"
					width={windowWidth > 640 ? 24 : 16}
					height={windowWidth > 640 ? 24 : 16}
					viewBox="0 0 24 24"
					strokeWidth={2}
					stroke="currentColor"
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M12 17l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v8" />
					<path d="M16 19h6" />
				</svg>
			);
		}
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="icon icon-tabler icon-tabler-bookmark-plus"
				width={windowWidth > 640 ? 24 : 16}
				height={windowWidth > 640 ? 24 : 16}
				viewBox="0 0 24 24"
				strokeWidth="2"
				stroke="currentColor"
				fill="none"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M12 17l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v5" />
				<path d="M16 19h6" />
				<path d="M19 16v6" />
			</svg>
		);
	};

	// View for window.innerWidth <= 640px
	const mobileView = () => {
		const defineImgWidth = () => {
			if (windowWidth > 375 && windowWidth <= 640) return "w-[150px]";
			else return "w-[125px]";
		};
		return (
			<>
				<Offline />
				<section id="movie-title" className="w-full px-4">
					<h1 className="text-2xl font-bold">{movieMemo.title}</h1>
				</section>
				<section
					id="main-info"
					className="w-full flex items-start px-4 mt-2"
				>
					<img
						src={`https://image.tmdb.org/t/p/original/${movieMemo.poster_path}`}
						alt="movie poster"
						className={`${defineImgWidth()} object-contain`}
					/>
					<article className="flex-1 flex flex-col justify-start ms-4">
						<h2 className="font-medium">{movieMemo.tagline}</h2>
						<div className="mt-1">
							<p className=" font-medium">
								<span className="text-amber-500 font-bold">
									Genre:{" "}
								</span>
								{movieMemo.genres
									.map((gen) => gen.name)
									.join(", ")}
							</p>
							<p className="mt-2 font-medium">
								<span className="text-amber-500 font-bold">
									Status:{" "}
								</span>
								{movieMemo.status}
							</p>
							<p className="mt-2 font-medium">
								<span className="text-amber-500 font-bold">
									Release Date:{" "}
								</span>
								{moment(movieMemo.release_date).format(
									"DD MMM YYYY"
								)}
							</p>
							<p className="mt-2 font-medium">
								<span className="text-amber-500 font-bold">
									Languages:{" "}
								</span>
								{movieMemo.spoken_languages
									.map((lang) => lang.english_name)
									.join(", ")}
							</p>
							<p className="mt-2 font-medium">
								<span className="text-amber-500 font-bold">
									Productions:{" "}
								</span>
								{movieMemo.production_companies
									.map((company) => company.name)
									.join(", ")}
							</p>
							<p className="mt-2 font-medium">
								<span className="text-amber-500 font-bold">
									Production Origin:{" "}
								</span>
								{movieMemo.production_countries[0].name}
							</p>
						</div>
						<div className="flex flex-wrap items-center gap-2 mt-2">
							{isLoading && (
								<ButtonLogo
									customClass="w-max bg-yellow-500 text-stone-950 text-center font-semibold px-2 py-1 rounded-md"
									logo={
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="icon icon-tabler icon-tabler-loader animate-spin"
											width={16}
											height={16}
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
									}
								/>
							)}
							{!isLoading && (
								<ButtonLogo
									customClass={`w-max text-xs text-center font-semibold px-2 py-1 rounded-md ${
										movieData.watchlist
											? "bg-red-500 text-white"
											: "bg-yellow-500 text-stone-950"
									}`}
									logo={generateWatchlistIcon()}
									text={
										movieData.watchlist
											? "Remove Watchlist"
											: "Add Watchlist"
									}
								/>
							)}
							<ButtonLogo
								customClass="w-max bg-blue-500 text-white text-xs text-center font-semibold px-2 py-1 rounded-md"
								logo={
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-star"
										width={16}
										height={16}
										viewBox="0 0 24 24"
										strokeWidth={2}
										stroke="#FFF"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path
											stroke="none"
											d="M0 0h24v24H0z"
											fill="none"
										/>
										<path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
									</svg>
								}
								text="Rate"
							/>
						</div>
					</article>
				</section>
				<section id="other-info" className="w-full mt-4 px-4">
					<p className="font-medium">
						Synopsis:
						<br />
						{movieMemo.overview}
					</p>
					<div className="w-full flex flex-wrap items-center gap-2 mt-4">
						<MovieBadge
							title="Popularity"
							value={numeral(movieMemo.popularity).format("0.0a")}
							logo={
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="icon icon-tabler icon-tabler-user"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									strokeWidth="2"
									stroke="black"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path
										stroke="none"
										d="M0 0h24v24H0z"
										fill="none"
									/>
									<path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
									<path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
								</svg>
							}
						/>
						<MovieBadge
							title="Ratings"
							value={numeral(movieMemo.vote_average).format(
								"0.[0]"
							)}
							logo={
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="icon icon-tabler icon-tabler-user"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									strokeWidth="2"
									stroke="black"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path
										stroke="none"
										d="M0 0h24v24H0z"
										fill="none"
									/>
									<path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
									<path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
								</svg>
							}
						/>
						<MovieBadge
							title="Total Ratings"
							value={numeral(movieMemo.vote_count).format("0.0a")}
							logo={
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="icon icon-tabler icon-tabler-user"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									strokeWidth="2"
									stroke="black"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path
										stroke="none"
										d="M0 0h24v24H0z"
										fill="none"
									/>
									<path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
									<path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
								</svg>
							}
						/>
					</div>
				</section>
				<section
					id="comments"
					className="w-full flex flex-col mt-4 px-4"
				>
					<h3 className="text-xl font-medium">Comments:</h3>
					<div className="mt-2">
						<textarea
							name="comment"
							id="comment-field"
							className="w-full rounded-md shadow-md text-sm p-2"
							placeholder="Enter your comment here..."
							rows={5}
						></textarea>
						<Button
							text="Submit"
							customClass="bg-green-700 text-white text-sm px-4 py-2 rounded-md mt-2"
						/>
					</div>
					<div id="comment-lists">{comments()}</div>
				</section>
			</>
		);
	};

	// View for window.innerWidth > 640px
	const defaultView = () => {
		return (
			<>
				<Offline />
				<section id="main-info" className="w-full flex items-start">
					<img
						src={`https://image.tmdb.org/t/p/original/${movieMemo.poster_path}`}
						alt="movie poster"
						className="w-[33%] object-contain"
					/>
					<article className="w-[66%] flex flex-col justify-start px-8">
						<h1 className="text-4xl font-bold">
							{movieMemo.title}
						</h1>
						<h2 className="text-lg font-medium mt-2">
							{movieMemo.tagline}
						</h2>
						<p className="mt-4 font-medium">
							Synopsis:
							<br />
							{movieMemo.overview}
						</p>
						<div className="mt-4">
							<p className=" font-medium">
								<span className="text-amber-500 font-bold">
									Genres:{" "}
								</span>
								{movieMemo.genres
									.map((gen) => gen.name)
									.join(", ")}
							</p>
							<p className="mt-2 font-medium">
								<span className="text-amber-500 font-bold">
									Status:{" "}
								</span>{" "}
								{movieMemo.status}
							</p>
							<p className="mt-2 font-medium">
								<span className="text-amber-500 font-bold">
									Release Date:{" "}
								</span>
								{moment(movieMemo.release_date).format(
									"DD MMM YYYY"
								)}
							</p>
							<p className="mt-2 font-medium">
								<span className="text-amber-500 font-bold">
									Languages:{" "}
								</span>
								{movieMemo.spoken_languages
									.map((lang) => lang.english_name)
									.join(", ")}
							</p>
							<p className="mt-2 font-medium">
								<span className="text-amber-500 font-bold">
									Productions:{" "}
								</span>
								{movieMemo.production_companies
									.map((company) => company.name)
									.join(", ")}
							</p>
							<p className="mt-2 font-medium">
								<span className="text-amber-500 font-bold">
									Production Origin:{" "}
								</span>
								{movieMemo.production_countries[0].name}
							</p>
						</div>
						<div className="flex items-center mt-4">
							{isLoading && (
								<ButtonLogo
									customClass="w-max bg-yellow-500 text-stone-950 text-center font-semibold px-4 py-2 rounded-md"
									logo={
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="icon icon-tabler icon-tabler-loader animate-spin"
											width={24}
											height={24}
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
									}
								/>
							)}
							{!isLoading && (
								<ButtonLogo
									customClass={`w-max text-center font-semibold px-4 py-2 rounded-md ${
										movieData.watchlist
											? "bg-red-500 text-white"
											: "bg-yellow-500 text-stone-950"
									}`}
									logo={generateWatchlistIcon()}
									text={
										movieData.watchlist
											? "Remove Watchlist"
											: "Add Watchlist"
									}
									clickFn={() => toggleWatchlist()}
								/>
							)}
							<ButtonLogo
								customClass="w-max bg-blue-500 text-white text-base text-center font-semibold px-4 py-2 ms-2 rounded-md"
								logo={
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-star"
										width={24}
										height={24}
										viewBox="0 0 24 24"
										strokeWidth={2}
										stroke="#FFF"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path
											stroke="none"
											d="M0 0h24v24H0z"
											fill="none"
										/>
										<path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
									</svg>
								}
								text="Rate"
							/>
						</div>
						<div className="flex flex-wrap items-center gap-2 mt-4">
							<MovieBadge
								title="Popularity"
								value={numeral(movieMemo.popularity).format(
									"0,0"
								)}
								logo={
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-user"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										strokeWidth="2"
										stroke="black"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path
											stroke="none"
											d="M0 0h24v24H0z"
											fill="none"
										/>
										<path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
										<path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
									</svg>
								}
							/>
							<MovieBadge
								title="Ratings"
								value={numeral(movieMemo.vote_average).format(
									"0.[0]"
								)}
								logo={
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-star-filled"
										width={24}
										height={24}
										viewBox="0 0 24 24"
										strokeWidth={2}
										stroke="#eab308"
										fill="#eab308"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path
											stroke="none"
											d="M0 0h24v24H0z"
											fill="none"
										/>
										<path
											d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z"
											strokeWidth={0}
											fill="#eab308"
										/>
									</svg>
								}
							/>
							<MovieBadge
								title="Total Ratings"
								value={numeral(movieMemo.vote_count).format(
									"0,0"
								)}
								logo={
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-eye-star"
										width={24}
										height={24}
										viewBox="0 0 24 24"
										strokeWidth={2}
										stroke="#eab308"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path
											stroke="none"
											d="M0 0h24v24H0z"
											fill="none"
										/>
										<path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
										<path d="M9.608 17.682c-2.558 -.71 -4.76 -2.603 -6.608 -5.682c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
										<path d="M17.8 20.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138z" />
									</svg>
								}
							/>
						</div>
						<div className="w-full flex flex-col mt-4">
							<h3 className="text-xl font-medium">Comments:</h3>
							<div className="mt-2">
								<textarea
									name="comment"
									id="comment-field"
									className="w-full rounded-md shadow-md text-sm p-2"
									placeholder="Enter your comment here..."
									rows={5}
								></textarea>
								<Button
									text="Submit"
									customClass="bg-green-700 text-white text-sm px-4 py-2 rounded-md mt-2"
								/>
							</div>
							<div id="comments">{comments()}</div>
						</div>
					</article>
				</section>
			</>
		);
	};

	return (
		<>
			<section className="sm:container py-4 mx-auto">
				{windowWidth <= 640 && mobileView()}
				{windowWidth > 640 && defaultView()}
			</section>
		</>
	);
}

export default MovieDetail;
