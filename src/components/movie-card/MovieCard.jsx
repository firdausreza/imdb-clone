import React, { useState } from "react";
import { Link } from "react-router-dom";
import numeral from "numeral";
import { saveWatchlist } from "../../helpers/dataHandler.js";
import localforage from "localforage";

import ButtonLogo from "../button/ButtonLogo.jsx";

function MovieCard({ movie, reloadWatchlist }) {
	const [isLoading, setLoading] = useState();
	const _year = new Date(movie.release_date).getFullYear();

	const handleReqWatchlist = async () => {
		const sessionId = await localforage.getItem("currentSession");
		if (sessionId) {
			setLoading(true);
			const accountId =
				JSON.parse(await localforage.getItem("currentUser")).id || 0;
			const payload = {
				account_id: accountId,
				data: [
					{
						media_id: movie.id,
						media_type: "movie",
						watchlist: !movie.watchlist,
					},
				],
			};

			saveWatchlist(payload, sessionId).then(() => {
				movie.watchlist = !movie.watchlist;
				if (navigator.onLine) reloadWatchlist();
				setLoading(false);
			});
		}
	};

	const generateWatchlistIcon = () => {
		if (movie.watchlist) {
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="icon icon-tabler icon-tabler-bookmark-minus"
					width={16}
					height={16}
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
				width="16"
				height="16"
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

	return (
		<div className="rounded-md flex items-start bg-white border shadow-md">
			<img
				src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
				alt={movie.title}
				className="w-[39%] h-full rounded-tl-md rounded-bl-md object-cover object-center bg-clip-border"
			/>
			<div className="w-[61%] h-full flex flex-col p-4 justify-start">
				<Link to={`movies/${movie.id}`}>
					<h3 className="text-lg font-semibold leading-tight">
						{movie.title}
					</h3>
				</Link>
				<p className="text-sm text-stone-500 mt-2">Release: {_year}</p>
				<p className="text-sm text-stone-500 mt-2">
					Genres: {movie.genres}
				</p>
				<p className="text-sm text-stone-500 mt-2">
					<span className="flex items-center gap-1">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="icon icon-tabler icon-tabler-star"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							strokeWidth="2"
							stroke="#facc15"
							fill="#facc15"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
						</svg>
						{numeral(movie.vote_average).format("0.[0]")}
						<span className="uppercase">
							({numeral(movie.vote_count).format("0a")})
						</span>
					</span>
				</p>
				{!isLoading && (
					<ButtonLogo
						id="toggleWatchlist"
						clickFn={() => handleReqWatchlist()}
						customClass={`w-max text-xs text-center font-semibold px-2 py-1 rounded-md mt-4 ${
							movie.watchlist
								? "bg-red-500 text-white"
								: "bg-yellow-500 text-stone-950"
						}`}
						logo={generateWatchlistIcon()}
						text={
							movie.watchlist
								? "Remove Watchlist"
								: "Add Watchlist"
						}
					/>
				)}
				{isLoading && (
					<ButtonLogo
						customClass="w-max bg-yellow-500 text-stone-950 text-xs text-center font-semibold px-2 py-1 rounded-md mt-4"
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
			</div>
		</div>
	);
}

export default MovieCard;
