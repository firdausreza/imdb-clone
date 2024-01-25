import React from "react";

function MovieBadge({ title, value, logo }) {
	return (
		<div className="flex items-center bg-white py-2 px-4 rounded-md shadow-md">
			<div className="w-[33%]">{logo}</div>
			<div className="flex-1 ms-4">
				<h5 className="text-base font-medium text-nowrap">{title}</h5>
				<p className="text-xl font-bold uppercase">{value}</p>
			</div>
		</div>
	);
}

export default MovieBadge;
