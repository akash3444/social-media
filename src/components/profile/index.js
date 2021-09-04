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
			<div className='py-10 space-y-14 w-full max-w-screen-lg mx-auto'>
				{/* Top */}
				<div className='flex space-x-6 md:space-x-10 px-10'>
					<img
						src='https://picsum.photos/500/500'
						alt='Avatar'
						className='h-20 w-20 md:h-28 md:w-28 rounded-full'
					/>
					<div className='pt-3'>
						<div className='flex items-center space-x-5'>
							<h4 className='text-2xl text-gray-700'>{username}</h4>
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

						{/* Statistics for md screens */}
						<div className='hidden md:flex w-full py-2 space-x-12'>
							<div className='flex items-center'>
								<h4 className='font-bold'>{posts.length}</h4>
								<span className="text-gray-700 ml-1">posts</span>
							</div>

							<div className='flex items-center'>
								<h4 className='font-bold'>{followerCount}</h4>
								<span className="text-gray-700 ml-1">followers</span>
							</div>

							<div className='flex items-center'>
								<h4 className='font-bold'>{followingCount}</h4>
								<span className="text-gray-700 ml-1">following</span>
							</div>
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
				{/* Statistics for mobile devices*/}
				<div className='flex md:hidden w-full border-t border-b border-gray-300 py-2 px-5'>
					<div className='flex-1 flex flex-col items-center'>
						<h4 className='text-sm font-bold'>{posts.length}</h4>
						<span className="text-gray-500 -mt-1">posts</span>
					</div>

					<div className='flex-1 flex flex-col items-center'>
						<h4 className='text-sm font-bold'>{followerCount}</h4>
						<span className="text-gray-500 -mt-1">followers</span>
					</div>

					<div className='flex-1 flex flex-col items-center'>
						<h4 className='text-sm font-bold'>{followingCount}</h4>
						<span className="text-gray-500 -mt-1">following</span>
					</div>
				</div>
				{/* Posts */}
				<div className='grid grid-cols-1 gap-y-10 sm:gap-x-10 sm:grid-cols-2 md:grid-cols-3 px-10'>
					{posts.map(({id, image, likesCount, commentsCount}) => (
						<ProfilePost key={id} image={image} likes={likesCount} comments={commentsCount} />
					))}
				</div>
			</div>
		</>
	);
};
