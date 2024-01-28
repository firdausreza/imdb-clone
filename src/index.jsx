import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import * as serviceWorker from "./_serviceWorkerRegistration.js";

import Home, { loader as homeLoader } from "./routes/home/Home.jsx";
import Root from "./routes/Root.jsx";
import Watchlists from "./routes/watchlists/Watchlists.jsx";
import MovieDetail, {
	loader as movieLoader,
} from "./routes/movie-detail/Detail.jsx";
import { syncWatchlistData } from "./helpers/dataHandler.js";

import "./assets/css/index.css";
import "animate.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "",
				element: <Home />,
				loader: homeLoader,
			},
			{
				path: "watchlists",
				element: <Watchlists />,
			},
			{
				path: "movies/:movieId",
				element: <MovieDetail />,
				loader: movieLoader,
			},
		],
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

serviceWorker.register();
syncWatchlistData();
