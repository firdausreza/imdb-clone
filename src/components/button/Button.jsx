import React from "react";

function Button({ text, customClass, clickFn }) {
	return (
		<button onClick={clickFn} className={customClass}>
			{text}
		</button>
	);
}

export default Button;
