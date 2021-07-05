import React from "react";

const Input = (props) => {
	return (
		<input
			className='border border-gray-300 block mt-1 w-full h-10 rounded px-2 transition duration-300 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600'
			{...props}
		/>
	);
};

export default Input;
