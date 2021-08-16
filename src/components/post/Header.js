import React from "react";
import OutlineHorizontalDots from "../icons/OutlineHorizontalDots";
import { Link } from "react-router-dom";

const PostHeader = ({ author }) => {
	return (
		<div className='flex items-center justify-between px-5 py-3 sm:bg-white border'>
			<div className='flex items-center space-x-3'>
				<img
					src='https://picsum.photos/100/100'
					alt='Avatar'
					className='h-10 w-10 rounded-full ring-2 ring-offset-2 ring-indigo-600'
				/>
				<h5 className='font-medium hover:underline cursor-pointer'>
					<Link to={`/${author.username}`}>{author.username}</Link>
				</h5>
			</div>

			<OutlineHorizontalDots />
		</div>
	);
};

export default PostHeader;
