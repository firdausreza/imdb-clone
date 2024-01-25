import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./routes/home/Home.jsx";
import "./assets/css/index.css";
import "animate.css";
import Root from "./routes/Root.jsx";
import Watchlists from "./routes/watchlists/Watchlists.jsx";
import MovieDetail from "./routes/movie-detail/Detail.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "",
				element: <Home />,
			},
			{
				path: "watchlists",
				element: <Watchlists />,
			},
			{
				path: "movies/:movieName",
				element: <MovieDetail />,
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
