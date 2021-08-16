import React from "react";

import OutlineEmoji from "../icons/OutlineEmoji";

const AddComment = () => {
	return (
		<div
			className='h-14 flex items-center border-t px-5'
			style={{
				fontFamily:
					'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
			}}>
			<OutlineEmoji />
			<input
				type='text'
				placeholder='Add a comment...'
				name='comment'
				className='mx-3 font-normal text-md focus:outline-none flex-1'
			/>
			<button className='focus:outline-none text-indigo-600 font-me'>
				Post
			</button>
		</div>
	);
};

export default AddComment;
