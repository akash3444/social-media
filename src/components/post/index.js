import React, { useEffect, useState } from "react";
import {
	LIKE_POST,
	UNLIKE_POST,
	ADD_BOOKMARK,
	REMOVE_BOOKMARK,
} from "../../queries";
import { useMutation } from "@apollo/client";
import { useUserData } from "../../hooks/useUserData";
import { useLikes } from "../../hooks/useLikes";
import PostHeader from "./Header";
import PostBody from "./Body";
import PostFooter from "./Footer";

export const Post = ({ post }) => {
	const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);
	const { likes, isLiked, setLikes, setIsLiked } = useLikes(
		post.id,
		post.likesCount,
		post.isLiked
	);
	const { token } = useUserData();
	const [likePost, { data: likePostResponse }] = useMutation(LIKE_POST);
	const [unlikePost, { data: unlikePostResponse }] = useMutation(UNLIKE_POST);
	const [addBookmark, { data: addBookmarkResponse }] = useMutation(
		ADD_BOOKMARK
	);
	const [removeBookmark, { data: removeBookmarkResponse }] = useMutation(
		REMOVE_BOOKMARK
	);

	const bookmarkVariables = {
		token,
		postId: post.id,
	};

	console.log(addBookmarkResponse);

	const handleClick = () => {
		console.log("isBookmarked", isBookmarked);
		!isBookmarked
			? addBookmark({
					variables: bookmarkVariables,
			  })
			: removeBookmark({
					variables: bookmarkVariables,
			  });
		setIsBookmarked((curr) => !curr);
	};

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

	const likeMutationVariables = {
		variables: {
			token,
			postId: post.id,
		},
	};
	const handleLike = () => {
		isLiked
			? unlikePost(likeMutationVariables)
			: likePost(likeMutationVariables);
		setLikes((currLikes) => (isLiked ? --currLikes : ++currLikes));
		setIsLiked((curr) => !curr);
	};

	return (
		<div className='w-full bg-white shadow max-w-xl mx-auto overflow-hidden'>
			{/* Post Header */}
			<PostHeader author={post.author} />

			{/* Post Body */}
			<PostBody image={post.image} />

			{/* Post Footer */}
			<PostFooter
				isLiked={isLiked}
				isBookmarked={isBookmarked}
				handleClick={handleClick}
				handleLike={handleLike}
				post={post}
				likes={likes}
				comments={post.comments}
			/>
		</div>
	);
};
