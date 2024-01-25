import React from "react";

function ButtonLogo({ text, customClass, clickFn, reversed = false, logo }) {
	return (
		<button
			onClick={clickFn}
			className={`flex items-center ${customClass}`}
		>
			{!reversed && <span className="me-1">{logo}</span>}
			{text}
			{reversed && <span className="ms-1">{logo}</span>}
		</button>
	);
}

export default ButtonLogo;
