import React from "react";
import FillHeart from '../icons/FillHeart';

export const ProfilePost = ({ image }) => {
	return (
		<div className='relative aspect-w-1 aspect-h-1 d-none'>
			<img src={image} width='100%' height='auto' alt="Avatar" className='object-cover' />
			{/*<div className='absolute inset-0'>
				<div>
					<div>
						<FillHeart /> 0
					</div>
					<div></div>
				</div>
			</div>*/}
		</div>
	);
};
