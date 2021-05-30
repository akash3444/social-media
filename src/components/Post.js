import React, { useEffect } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BsChat, BsBookmark, BsHeart, BsHeartFill } from "react-icons/bs";
import { IoShareSocialOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { LIKE_POST, UNLIKE_POST } from "../queries";
import { useMutation } from "@apollo/client";
import { useUserData } from "../hooks/useUserData";
import { useLikes } from "../hooks/useLikes";

export const Post = ({ post }) => {
	const { likes, isLiked, setLikes, setIsLiked } = useLikes(
		post.id,
		post.likesCount,
		post.isLiked
	);
	const { token } = useUserData();
	const [likePost, { data: likePostResponse }] = useMutation(LIKE_POST);
	const [unlikePost, { data: unlikePostResponse }] = useMutation(UNLIKE_POST);

	useEffect(() => {
		if (likePostResponse && likePostResponse !== "undefined")
			localStorage.setItem(
				post.id,
				JSON.stringify({ likes: likePostResponse.likePost, isLiked })
			);
		if (unlikePostResponse && unlikePostResponse !== "undefined")
			localStorage.setItem(
				post.id,
				JSON.stringify({ likes: unlikePostResponse.unlikePost, isLiked })
			);
	}, [post.id, likePostResponse, unlikePostResponse, isLiked]);

	const mutationVariables = {
		variables: {
			token,
			postId: post.id,
		},
	};
	const handleLike = () => {
		isLiked ? unlikePost(mutationVariables) : likePost(mutationVariables);
		setLikes((currLikes) => (isLiked ? --currLikes : ++currLikes));
		setIsLiked((curr) => !curr);
	};

	return (
		<div className='w-full bg-white shadow max-w-xl mx-auto rounded-xl overflow-hidden'>
			{/* Post Header */}
			<div className='flex items-center justify-between px-5 py-3 sm:bg-white border'>
				<div className='flex items-center space-x-3'>
					<img
						src='https://picsum.photos/100/100'
						alt='Avatar'
						className='h-10 w-10 rounded-full ring-2 ring-offset-2 ring-indigo-600'
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
			<div className='px-5 py-4 space-y-2'>
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
