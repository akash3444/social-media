import { useMutation } from "@apollo/client";
import React from "react";
import { FOLLOW, UNFOLLOW } from "../queries";

export const Follow = ({ isFollowing, token, username, GET_USER, data }) => {
	const [followUser] = useMutation(FOLLOW, {
		refetchQueries: [
			{
				query: GET_USER,
				variables: { token, username },
			},
		],
	});
	const [
		unfollowUser,
		{ loading: unfollowingUser, error: unfollowError },
	] = useMutation(UNFOLLOW, {
		refetchQueries: [
			{
				query: GET_USER,
				variables: { token, username },
			},
		],
	});

	console.log(data);

	const handleFollow = () => {
		!isFollowing
			? followUser({
					variables: {
						token,
						following: username,
					},
			  })
			: unfollowUser({
					variables: { token, user: username },
			  });
	};

	return (
		<button
			className='py-1.5 mt-3 px-4 rounded bg-indigo-600 text-white'
			onClick={handleFollow}>
			{followingUser
				? "Following..."
				: unfollowingUser
				? "Unfollowing..."
				: isFollowing
				? "Unfollow"
				: "Follow"}
		</button>
	);
};
