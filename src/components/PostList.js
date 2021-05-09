import React, { useEffect } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";

import { Layout } from "./Layout";
import { Post } from "./Post";

const GET_POSTS = gql`
  query GetPosts($token: String!, $username: String!) {
    posts(token: $token, user: $user) {
      id
      caption
      image
      author {
        username
        displayName
      }
    }
  }
`;

const GET_RELATED_POSTS = gql`
  query GetRelatedPosts($token: String!) {
    relatedPosts(token: $token) {
      id
      caption
      image
      author {
        username
        displayName
      }
    }
  }
`;

export const PostList = ({ history }) => {
  const xAuthToken = localStorage.getItem("x-auth-token");
  const userData = xAuthToken ? JSON.parse(xAuthToken) : null;
  const [getPosts, { data, loading, error }] = useLazyQuery(GET_POSTS);
  const [
    getRelatedPosts,
    { data: postData, loading: postsLoading, error: postsError }
  ] = useLazyQuery(GET_RELATED_POSTS);

  // useEffect(() => {
  //   const path = history.location.pathname;
  //   path === "/"
  //     ? getRelatedPosts({ variables: { token } })
  //     : getPosts({ variables: { token, username: user.username } });
  // }, [history, user, token]);

  return (
    <Layout>
      <>
        {error || postsError ? (
          "error" + (error?.message || postsError?.message)
        ) : (
          <>
            {console.log(data || postData)}
            {/* <div
              className="posts bg-gray-100 py-10 space-y-5 px-5"
              style={{ columns: "4 18rem", columnGap: "1rem" }}
            >
              {postData && history.location.pathname === "/"
                ? postData?.relatedPosts.map((post) => (
                    <Post key={post.id} post={post} loading={loading} />
                  ))
                : data.posts.map((post) => (
                    <Post key={post.id} post={post} loading={loading} />
                  ))}
            </div> */}
          </>
        )}
      </>
    </Layout>
  );
};
