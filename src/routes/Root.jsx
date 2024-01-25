import React from "react";
import { Outlet } from "react-router-dom";

import Layout from "../components/layout/Layout.jsx";

function Root() {
	return (
		<Layout>
			<Outlet />
		</Layout>
	);
}

export default Root;
