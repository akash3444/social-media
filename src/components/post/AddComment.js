import React, { useState } from "react";

import OutlineEmoji from "../icons/OutlineEmoji";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT, GET_RELATED_POSTS } from "../../queries";
import { useUserData } from "../../hooks/useUserData";

const AddComment = ({ postId }) => {
	// console.log(postId);
	const { token } = useUserData();
	const [text, setText] = useState("");
	const [addComment] = useMutation(ADD_COMMENT, {
		update(cache, { data }) {
			const comment = data.addComment;
			const { posts: allPosts } = cache.readQuery({
				query: GET_RELATED_POSTS,
				variables: { token },
			});

			// console.log("COMMENT", comment);
			// console.log("ALL POSTS", allPosts);

			const posts = allPosts.map((post) => {
				if (post.id === postId) {
					return {
						...post,
						comments: [...post.comments, comment],
					};
				}
				return post;
			});
			// console.log("EEEEEEEEEEEEEEEE", posts);

			cache.writeQuery({
				query: GET_RELATED_POSTS,
				variables: { token },
				data: {
					posts,
				},
			});
			setText("");
		},
	});

	const handleClick = () => {
		console.log(token, postId, text);
		addComment({
			variables: {
				token,
				postId,
				text,
			},
		});
	};

	return (
		<div
			className='h-14 flex items-center border-t px-5'
			style={{
				fontFamily:
					'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
			}}>
			<OutlineEmoji />
			<input
				type='text'
				placeholder='Add a comment...'
				name='comment'
				value={text}
				onChange={(e) => setText(e.target.value)}
				className='mx-3 font-normal text-md focus:outline-none flex-1'
			/>
			<button
				className='focus:outline-none text-indigo-600 font-me'
				onClick={handleClick}>
				Post
			</button>
		</div>
	);
};

export default AddComment;
