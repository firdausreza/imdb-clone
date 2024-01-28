import React, { useEffect, useState } from "react";

function Offline() {
	const [isOnline, setOnline] = useState();

	useEffect(() => {
		if (navigator.onLine) {
			setOnline(true);
		} else {
			setOnline(false);
		}
	}, []);

	if (!isOnline) {
		return (
			<div className="sm:container mx-auto h-[100px] py-4 sm:py-8">
				<h1 className="text-xl font-bold">You're Offline!</h1>
			</div>
		);
	}

	return <div></div>;
}

export default Offline;
