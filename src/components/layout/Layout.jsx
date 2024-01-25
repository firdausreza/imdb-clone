import React from "react";
import Navbar from "../navbar/Navbar.jsx";
import Footer from "../footer/Footer.jsx";

function Layout({ children }) {
	return (
		<>
			<Navbar />
			<main id="App" className="bg-slate-200 py-4">
				{children}
			</main>
			<Footer />
		</>
	);
}

export default Layout;
