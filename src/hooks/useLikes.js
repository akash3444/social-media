import { useState } from "react";

export const useLikes = (postId, likesCount, isPostLiked) => {
	const post = JSON.parse(localStorage.getItem(postId));
	const [isLiked, setIsLiked] = useState(post ? post.isLiked : isPostLiked);
	const [likes, setLikes] = useState(
		post && post.likes ? post.likes : likesCount
	);
	return {
		likes,
		isLiked,
		setLikes,
		setIsLiked,
	};
};
