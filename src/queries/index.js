import { gql } from "@apollo/client";

export const GET_RELATED_POSTS = gql`
	query GetRelatedPosts($token: String!) {
		posts: relatedPosts(token: $token) {
			id
			caption
			image
			author {
				username
				displayName
			}
			likesCount
			isLiked(token: $token)
		}
	}
`;

export const SEARCH_USER = gql`
	query SearchUser($token: String!, $query: String!) {
		searchUser(token: $token, query: $query) {
			results {
				id
				username
			}
		}
	}
`;

export const GET_USER = gql`
	query GetUser($token: String!, $username: String) {
		user(token: $token, username: $username) {
			user {
				id
				username
				displayName
				followerCount
				followingCount
				posts {
					id
					image
				}
			}
			isFollowing
		}
	}
`;

export const LOGIN_USER = gql`
	query LoginUser($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			error {
				message
			}
			token
			user {
				id
				username
			}
		}
	}
`;

export const REGISTER_USER = gql`
	mutation RegisterUser(
		$username: String!
		$email: String!
		$password: String!
	) {
		addUser(username: $username, email: $email, password: $password) {
			error {
				message
			}
			user {
				id
				username
				email
				password
			}
		}
	}
`;

export const FOLLOW = gql`
	mutation FollowUser($token: String!, $following: String!) {
		follow(token: $token, following: $following)
	}
`;

export const UNFOLLOW = gql`
	mutation UnfollowUser($token: String!, $user: String!) {
		unfollow(token: $token, user: $user)
	}
`;

export const CREATE_POST = gql`
	mutation CreatePost($token: String!, $caption: String!, $image: String!) {
		addPost(token: $token, caption: $caption, image: $image) {
			id
			caption
			image
		}
	}
`;

export const LIKE_POST = gql`
	mutation likeThePost($token: String!, $postId: String!) {
		likePost(token: $token, postId: $postId)
	}
`;
export const UNLIKE_POST = gql`
	mutation unlikeThePost($token: String!, $postId: String!) {
		unlikePost(token: $token, postId: $postId)
	}
`;
