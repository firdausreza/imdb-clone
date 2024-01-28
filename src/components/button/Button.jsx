import React from "react";

function Button({ id, text, customClass, clickFn }) {
	return (
		<button id={id} onClick={clickFn} className={customClass}>
			{text}
		</button>
	);
}

export default Button;
