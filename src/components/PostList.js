import React, { useContext } from "react";
import { Post } from "./Post";
import { useQuery } from "@apollo/client";
import { UserContext } from "../App";
import { GET_RELATED_POSTS } from "../queries";
import { Spinner } from "../ui/Spinner";

export const PostList = () => {
	const { user } = useContext(UserContext);
	const { data, error, loading } = useQuery(GET_RELATED_POSTS, {
		variables: { token: user.token },
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
