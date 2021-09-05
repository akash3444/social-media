import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { FOLLOW, UNFOLLOW, CREATE_ACTIVITY, GET_USER } from "../../queries";
import { useCountRenders } from "../../hooks/useCountRenders";

export const Follow = ({ isFollowing, token, username, GET_USER, data }) => {
	const [isFollowingUser, setIsFollowingUser] = useState(isFollowing);
	useCountRenders("FOLLOW")

	const [createActivity, { data: createActivityResponse}] = useMutation(CREATE_ACTIVITY);
	const [followUser, { loading: followingUser }] = useMutation(FOLLOW, {
		// refetchQueries: [
		// 	{
		// 		query: GET_USER,
		// 		variables: { token, username },
		// 	},
		// ],
		onCompleted: () => {
			createActivity({
				variables: {
					token,
					username,
					text: " started following you."
				}
			})
		},
		update: (cache, { data }) => {
			const { user: userData } = cache.readQuery({
				query: GET_USER,
				variables: { token, username }
			})
			console.log("USER(FOLLOW)", userData);
			
			const updatedUser =  {
				...userData,
				user: {
					...userData.user,
					followerCount: userData.user.followerCount + 1
				}
			}

			cache.writeQuery({
				query: GET_USER,
				variables: { token, username },
				data: {
					user: updatedUser
				}
			})
			setIsFollowingUser(true);
		}
	});
	const [unfollowUser, { loading: unfollowingUser }] = useMutation(UNFOLLOW, {
		// refetchQueries: [
		// 	{
		// 		query: GET_USER,
		// 		variables: { token, username },
		// 	},
		// ],
		onCompleted: () => {
			createActivity({
				variables: {
					token,
					username,
					text: " unfollowed you."
				}
			})
		},
		update: (cache, { data }) => {
			const { user: userData } = cache.readQuery({
				query: GET_USER,
				variables: { token, username }
			})
			console.log("USER(FOLLOW)", userData);
			
			const updatedUser =  {
				...userData,
				user: {
					...userData.user,
					followerCount: userData.user.followerCount - 1
				}
			}

			cache.writeQuery({
				query: GET_USER,
				variables: { token, username },
				data: {
					user: updatedUser
				}
			});
			setIsFollowingUser(false);
		}
	});

	const isLoading = followingUser || unfollowingUser;

	console.log(data);

	const handleFollow = () => {
		console.log("IS FOLLOWING", isFollowing)
		if (!followingUser && !unfollowingUser) {
			!isFollowingUser
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
	};

	return (
		<button
			className={`py-1.5 mt-3 px-4 rounded text-white ${
				isLoading ? "cursor-not-allowed bg-indigo-400" : 'bg-indigo-600'
			}`}
			onClick={handleFollow}
			disabled={isLoading}>
			{isFollowingUser ? "Unfollow" : "Follow"}
		</button>
	);
};
