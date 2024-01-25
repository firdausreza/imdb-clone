import React from "react";
import { Link } from "react-router-dom";
import Image from "../../assets/img/movie.jpg";
import ButtonLogo from "../button/ButtonLogo.jsx";

function MovieCard({ showBtn }) {
	return (
		<div className="rounded-md flex items-start bg-white border shadow-md">
			<img
				src={Image}
				alt="movie poster"
				className="w-[33%] h-full rounded-tl-md rounded-bl-md object-cover object-center bg-clip-border"
			/>
			<div className="w-[66%] h-full flex flex-col p-4 justify-start">
				<Link to={"movies/movie-name"}>
					<h3 className="text-lg font-semibold">Movie Name</h3>
				</Link>
				<p className="text-sm text-stone-500 mt-2">
					2005 - 160min - Genre
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
						8.2 (91K)
					</span>
				</p>
				{showBtn && (
					<ButtonLogo
						customClass="w-max bg-yellow-500 text-stone-950 text-xs text-center font-semibold px-2 py-1 rounded-md mt-4"
						logo={
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
								<path
									stroke="none"
									d="M0 0h24v24H0z"
									fill="none"
								/>
								<path d="M12 17l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v5" />
								<path d="M16 19h6" />
								<path d="M19 16v6" />
							</svg>
						}
						text="Add Watchlist"
					/>
				)}
			</div>
		</div>
	);
}

export default MovieCard;