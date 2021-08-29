import React from "react";
import { useQuery } from "@apollo/client";
import { ProfilePost } from "./Post";
import { Follow } from "./Follow";
import { GET_USER } from "../../queries";
import { Spinner } from "../../ui/Spinner";
import { useUserData } from "../../hooks/useUserData";

export const Profile = ({ location }) => {
	const {token, username:loggedinUser} = useUserData();
	const { data, error, loading } = useQuery(GET_USER, {
		variables: { token, username: location.pathname.slice(1) },
	});
	const { username, followerCount, followingCount, posts } = data
		? data.user.user
		: {};
	if (loading)
		return (
			<div className='pt-14 flex-1 max-w-xl flex justify-center'>
				<Spinner />
			</div>
		);
	if (error) return error.message;

	return (
		<>
			{" "}
			<div className='p-10 space-y-14 w-full max-w-screen-lg mx-auto'>
				{/* Top */}
				<div className='flex space-x-10'>
					<img
						src='https://picsum.photos/500/500'
						alt='Avatar'
						className='h-24 w-24 rounded-full'
					/>
					<div className='pt-3'>
						<div className='flex items-center space-x-5'>
							<h4 className='text-2xl'>{username}</h4>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'>
								<path
									stroke-linecap='round'
									stroke-linejoin='round'
									stroke-width='2'
									d='M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z'
								/>
							</svg>
						</div>
						{loggedinUser !== location.pathname.slice(1) && <Follow
							isFollowing={data.user.isFollowing}
							token={token}
							username={username}
							GET_USER={GET_USER}
							data={data}
							loadingUser={loading}
						/>}
					</div>
				</div>
				{/* Statistics */}
				<div className='flex w-full divide-x divide-gray-300'>
					<div className='flex-1 flex flex-col items-center'>
						<h4 className='text-lg font-bold'>{posts.length}</h4>
						<span>posts</span>
					</div>

					<div className='flex-1 flex flex-col items-center'>
						<h4 className='text-lg font-bold'>{followerCount}</h4>
						<span>followers</span>
					</div>

					<div className='flex-1 flex flex-col items-center'>
						<h4 className='text-lg font-bold'>{followingCount}</h4>
						<span>following</span>
					</div>
				</div>
				{/* Posts */}
				<div className='grid grid-cols-1 gap-y-10 sm:gap-x-10 sm:grid-cols-2 md:grid-cols-3'>
					{posts.map((post) => (
						<ProfilePost key={post.id} image={post.image} />
					))}
				</div>
			</div>
		</>
	);
};
