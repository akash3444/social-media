import React from "react";

export const ProfilePost = ({ image }) => {
	return (
		<div className='aspect-w-1 aspect-h-1 d-none'>
			<img src={image} width='100%' height='auto' alt="Avatar" className='object-cover' />
		</div>
	);
};
