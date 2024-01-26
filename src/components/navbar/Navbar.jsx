import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/imdb-logo.png";

import "./navbar.css";
import Button from "../button/Button.jsx";
import { tmdb } from "../../helpers/tmdb-api.js";

function Navbar() {
	const [expanded, setExpanded] = useState(false);
	const [onSession, setSession] = useState(false);

	const burgerBtnClick = () => {
		setExpanded((prev) => !prev);
	};

	const authClick = async () => {
		if (!onSession) {
			await tmdb.createReqToken().then((res) => {
				const token = res.data.request_token;
				window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3000/`;
			});
		} else {
			await tmdb
				.deleteSession(sessionStorage.getItem("currentSession"))
				.then(() => {
					sessionStorage.removeItem("authStatus");
					sessionStorage.removeItem("currentSession");
					sessionStorage.removeItem("currentUser");
					window.location.href = "/";
				})
				.catch((e) => {
					throw new Error("Failed to delete session: ", e);
				});
		}
	};

	useEffect(() => {
		if (sessionStorage.getItem("currentSession")) {
			setSession(true);
		}
	}, []);

	return (
		<header className="bg-stone-950">
			<nav className="sm:container py-4 px-4 sm:px-0 mx-auto">
				<div className="flex justify-between items-center">
					<img src={Logo} alt="IMDb logo" width={100} />
					<button
						onClick={burgerBtnClick}
						className="bg-yellow-500 p-2 rounded-md sm:hidden"
					>
						<svg className="svg-icon" viewBox="0 0 20 20">
							<path
								fill="none"
								d="M3.314,4.8h13.372c0.41,0,0.743-0.333,0.743-0.743c0-0.41-0.333-0.743-0.743-0.743H3.314
								c-0.41,0-0.743,0.333-0.743,0.743C2.571,4.467,2.904,4.8,3.314,4.8z M16.686,15.2H3.314c-0.41,0-0.743,0.333-0.743,0.743
								s0.333,0.743,0.743,0.743h13.372c0.41,0,0.743-0.333,0.743-0.743S17.096,15.2,16.686,15.2z M16.686,9.257H3.314
								c-0.41,0-0.743,0.333-0.743,0.743s0.333,0.743,0.743,0.743h13.372c0.41,0,0.743-0.333,0.743-0.743S17.096,9.257,16.686,9.257z"
							></path>
						</svg>
					</button>
					<div className="sm:flex items-center gap-4 hidden">
						<Link
							to={""}
							className="text-white hover:underline underline-offset-1"
						>
							Movies
						</Link>
						<Link
							to={"watchlists"}
							className="text-white hover:underline underline-offset-1"
						>
							My Watchlists
						</Link>
						<Button
							clickFn={() => authClick()}
							customClass={`px-4 py-2 rounded-md ${
								onSession
									? "bg-red-500 text-white"
									: "bg-yellow-500"
							}`}
							text={onSession ? "Disconnect" : "Authenticate"}
						/>
					</div>
				</div>
				{expanded && (
					<div className="flex flex-col justify-start bg-yellow-500 p-4 mt-4 rounded-md">
						<Link
							to={""}
							className="text-stone-950 text-start font-semibold hover:underline underline-offset-1 pb-2 border-b-2 border-stone-950"
						>
							Movies
						</Link>
						<Link
							to={"watchlists"}
							className="text-stone-950 text-start font-semibold hover:underline underline-offset-1 pb-2 border-b-2 border-stone-950"
						>
							My Watchlists
						</Link>
						<Button
							clickFn={() => authClick()}
							customClass={`px-2 py-1 rounded-md text-sm ${
								onSession
									? "bg-red-500 text-white"
									: "bg-yellow-500"
							}`}
							text={onSession ? "Disconnect" : "Authenticate"}
						/>
					</div>
				)}
			</nav>
		</header>
	);
}

export default Navbar;
