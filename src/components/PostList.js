import React from "react";
import { Post } from "./Post";
import { useQuery } from "@apollo/client";
import { GET_RELATED_POSTS } from "../queries";
import { Spinner } from "../ui/Spinner";
import { useUserData } from '../hooks/useUserData';

export const PostList = () => {
	const {token} = useUserData();
	const { data, error, loading } = useQuery(GET_RELATED_POSTS, {
		variables: { token },
	});
	return (
		<>
			{loading ? (
				<div className='pt-14 flex-1 max-w-xl flex justify-center'>
					<Spinner />
				</div>
			) : error ? (
				error.message
			) : (
				<div className='my-8 space-y-10'>
					{data.posts.map((post) => (
						<Post key={post.id} post={post} />
					))}
				</div>
			)}
		</>
	);
};
