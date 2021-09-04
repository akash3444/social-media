import React from "react";

const iconStyle = {
	backgroundImage: "url(https://www.instagram.com/static/bundles/es6/sprite_core_32f0a4f27407.png/32f0a4f27407.png)"
}

export const ProfilePost = ({ image, likes, comments }) => {
	return (
		<div className='group cursor-pointer relative aspect-w-1 aspect-h-1 d-none'>
			<img src={image} width='100%' height='auto' alt="Avatar" className='object-cover' />
			<div className='opacity-0 group-hover:opacity-100 absolute inset-0 transition-opacity duration-300'>
				<div className="h-full w-full flex justify-center items-center bg-gray-800 bg-opacity-60">
					<div className="flex justify-center items-center">
						<div className="h-5 w-5" style={{...iconStyle, backgroundPosition: '-340px -333px'}}></div>
						<span className="font-medium text-white ml-2">{likes}</span>
					</div>
					<div className="flex justify-center items-center ml-12">
						<div className="h-5 w-5" style={{...iconStyle, backgroundPosition: '-382px -333px'}}></div> 
						<span className="font-medium text-white ml-2">{comments}</span>
					</div>
				</div>
			</div>
		</div>
	);
};
