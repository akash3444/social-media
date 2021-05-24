import React, { useContext, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BsChat, BsBookmark, BsHeart, BsHeartFill } from "react-icons/bs";
import { IoShareSocialOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { LIKE_POST, UNLIKE_POST } from "../queries";
import { UserContext } from "../App";
import { useMutation } from "@apollo/client";

export const Post = ({ post }) => {
	const [isLiked, setIsLiked] = useState(post.isLiked);
	const [likes, setLikes] = useState(post.likesCount);
	const { user } = useContext(UserContext);
	const [likePost, { data: likedData, error: likedError }] = useMutation(
		LIKE_POST
	);
	const [unlikePost, { data: unlikedData, error: unlikedError }] = useMutation(
		UNLIKE_POST
	);
	const mutationVariables = {
		variables: {
			token: user?.token,
			postId: post.id,
		},
	};
	const handleLike = () => {
		isLiked ? unlikePost(mutationVariables) : likePost(mutationVariables);
		setLikes((currLikes) => (isLiked ? --currLikes : ++currLikes));
		setIsLiked((curr) => !curr);
	};

	return (
		<div className='w-full bg-white border max-w-xl mx-auto'>
			{/* Post Header */}
			<div className='flex items-center justify-between px-5 py-3 sm:bg-white border'>
				<div className='flex items-center space-x-3'>
					<img
						src='https://picsum.photos/100/100'
						alt='Avatar'
						className='h-10 w-10 rounded-full'
					/>
					<h5 className='font-medium hover:underline cursor-pointer'>
						<Link to={`/${post.author.username}`}>{post.author.username}</Link>
					</h5>
				</div>

				<HiOutlineDotsHorizontal size={25} />
			</div>

			{/* Post Img */}
			<div className='w-full'>
				<img src={post.image} alt='Post' className='bg-cover w-full h-auto' />
			</div>

			{/* Post Footer */}
			<div className='px-5 py-2 space-y-2'>
				<div className='flex items-center justify-between text-gray-700'>
					<div className='flex space-x-4'>
						<div
							className='cursor-pointer relative top-0.5'
							onClick={handleLike}>
							{isLiked ? (
								<BsHeartFill size={25} className='text-red-500' />
							) : (
								<BsHeart size={25} />
							)}
						</div>
						<BsChat size={25} />
						<IoShareSocialOutline size={25} />
					</div>
					<BsBookmark size={25} />
				</div>

				{/* Likes */}
				<p className='text-left text-sm font-bold'>
					{likes} {likes !== 1 ? "likes" : "like"}
				</p>

				{/* Caption */}
				<p className='text-sm text-left space-x-2'>
					<b>{post.author.username}</b>
					<span>{post.caption}</span>
				</p>
			</div>
		</div>
	);
};
