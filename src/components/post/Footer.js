import React from "react";

import { Transition } from "@headlessui/react";
import OutlineHeart from "../icons/OutlineHeart";
import FillHeart from "../icons/FillHeart";
import OutlineComment from "../icons/OutlineComment";
import OutlineShare from "../icons/OutlineShare";
import OutlineBookmark from "../icons/OutlineBookmark";
import FillBookmark from "../icons/FillBookmark";
import AddComment from "./AddComment";
import Comment from "./Comment";

const Footer = ({
	isLiked,
	isBookmarked,
	handleClick,
	handleLike,
	post,
	likes,
	comments,
}) => {
	console.log(comments);
	return (
		<div className='pt-4 space-y-2'>
			<div className='flex items-center justify-between text-gray-700 px-5'>
				<div className='flex space-x-4'>
					<div className='cursor-pointer ' onClick={handleLike}>
						<Transition
							show={isLiked}
							appear={false}
							enter='transition duration-300 transform'
							enterFrom='scale-100'
							enterTo='scale-125'>
							<FillHeart />
						</Transition>
						<Transition
							show={!isLiked}
							appear={false}
							enter='transition duration-200 transform'
							enterFrom='scale-100'
							enterTo='scale-125'>
							<OutlineHeart />
						</Transition>
					</div>
					<OutlineComment />
					<OutlineShare />
				</div>
				{isBookmarked ? (
					<div onClick={handleClick} className='cursor-pointer'>
						<FillBookmark />
					</div>
				) : (
					<div onClick={handleClick} className='cursor-pointer'>
						<OutlineBookmark />
					</div>
				)}
			</div>

			{/* Likes */}
			<p className='text-left text-sm font-bold px-5'>
				{likes} {likes !== 1 ? "likes" : "like"}
			</p>

			{/* Caption */}
			<p className='text-sm text-left space-x-2 px-5'>
				<b>{post.author.username}</b>
				<span>{post.caption}</span>
			</p>

			{/* Comments */}
			{comments && comments.length !== 0 && (
				<div className='w-full px-5'>
					<p className='font-medium text-gray-500 text-sm'>Comments</p>

					{comments.map(({ id, text, user }) => (
						<Comment key={id} text={text} username={user.username} />
					))}
				</div>
			)}

			<AddComment postId={post.id} />
		</div>
	);
};

export default Footer;
