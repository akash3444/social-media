import React from "react";

export const Button = ({ children, className, ...other }) => {
	console.log(other);
	return (
		<button
			className={`bg-indigo-600 tracking-wide hover:bg-indigo-700 focus:bg-indigo-800 w-full py-2 text-white rounded focus:outline-none focus:ring-2 ring-offset-2 ring-indigo-500 ${className}`}
			{...other}>
			{children}
		</button>
	);
};
