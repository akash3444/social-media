import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { FOLLOW, UNFOLLOW, CREATE_ACTIVITY } from "../../queries";
import { useCountRenders } from "../../hooks/useCountRenders";

export const Follow = ({ isFollowing, token, username, GET_USER, data }) => {
	const [isFollowingUser, setIsFollowingUser] = useState(isFollowing);
	useCountRenders("FOLLOW")

	const [createActivity, { data: createActivityResponse}] = useMutation(CREATE_ACTIVITY);
	const [followUser, { loading: followingUser }] = useMutation(FOLLOW, {
		refetchQueries: [
			{
				query: GET_USER,
				variables: { token, username },
			},
		],
		onCompleted: () => {
			createActivity({
				variables: {
					token,
					username,
					text: " started following you."
				}
			})
		}
	});
	const [unfollowUser, { loading: unfollowingUser }] = useMutation(UNFOLLOW, {
		refetchQueries: [
			{
				query: GET_USER,
				variables: { token, username },
			},
		],
		onCompleted: () => {
			createActivity({
				variables: {
					token,
					username,
					text: " unfollowed you."
				}
			})
		}
	});

	const isLoading = followingUser || unfollowingUser;

	console.log(data);

	const handleFollow = () => {
		if (!followingUser && !unfollowingUser) {
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
		}
		setIsFollowingUser((currFollowing) => !currFollowing);
	};

	return (
		<button
			className={`py-1.5 mt-3 px-4 rounded bg-indigo-600 text-white ${
				isLoading ? "cursor-not-allowed" : null
			}`}
			onClick={handleFollow}
			disabled={isLoading}>
			{isFollowingUser ? "Unfollow" : "Follow"}
		</button>
	);
};
