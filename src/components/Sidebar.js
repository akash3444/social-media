import React, { useEffect, useState } from "react";
import { BsBellFill } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";

const GET_USER = gql`
  query GetUser($token: String!, $username: String) {
    user(token: $token, username: $username) {
      id
      username
      displayName
      followerCount
      followingCount
      posts {
        id
      }
      followers {
        follower
      }
    }
  }
`;

const FOLLOW = gql`
  mutation FollowUser($token: String!, $following: String!) {
    follow(token: $token, following: $following)
  }
`;

const UNFOLLOW = gql`
  mutation UnfollowUser($token: String!, $user: String!) {
    unfollow(token: $token, user: $user)
  }
`;

export const Sidebar = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const history = useHistory();
  const path = history.location.pathname;
  const { token, user } = JSON.parse(localStorage.getItem("x-auth-token"));
  const username = path === "/" ? user.username : path.slice(1);
  console.log("username", username);

  const updateUser = (userData) => {
    console.log("userData", userData);
    const followers = userData.user.followers;
    const follower = followers.find((f) => f.follower === user.username);
    setIsFollowing(follower ? true : false);
  };

  const { data: userInfo, error, loading, refetch: refetchQuery } = useQuery(
    GET_USER,
    {
      variables: { token, username }
      // onCompleted: (data) => {
      //   updateUser(data);
      // }
    }
  );
  const [
    followUser,
    { loading: followingUser, error: mutationError }
  ] = useMutation(FOLLOW);
  const [
    unfollowUser,
    { loading: unfollowingUser, error: unfollowError }
  ] = useMutation(UNFOLLOW);

  useEffect(() => {
    if (userInfo) {
      const followers = userInfo.user.followers;
      console.log("myfollowers", followers);
      const follower = followers.find((f) => f.follower === user.username);
      console.log("myfollower", follower);
      setIsFollowing(follower ? true : false);
    }
  }, [userInfo, user]);

  useEffect(() => {
    console.log("isFollowing", isFollowing);
  }, [isFollowing]);

  const handleFollow = () => {
    const following = userInfo.user.followers.find(
      (f) => f.follower === user.username
    );
    !following
      ? followUser({
          variables: {
            token,
            following: username
          },
          refetchQueries: [
            {
              query: GET_USER,
              variables: { token, username }
            }
          ]
        })
      : unfollowUser({
          variables: { token, user: username },
          refetchQueries: [
            {
              query: GET_USER,
              variables: { token, username }
            }
          ]
        });
  };

  return (
    <>
      <div className="hidden lg:block w-full max-w-sm border mx-auto bg-white px-5 sticky top-0 h-screen">
        <div className="float-right pt-5">
          <BsBellFill size={20} className="text-indigo-600" />
        </div>
        {error ? (
          "error" + error.message
        ) : (
          <>
            <div className="clear-both flex flex-col items-center space-y-12">
              {loading ? (
                "loading"
              ) : (
                <>
                  <div className="mt-10">
                    <img
                      src="https://picsum.photos/200/200"
                      alt="avatar"
                      className="h-20 w-20 mx-auto rounded-full"
                    />
                    <h2 className="text-xl font-bold text-gray-700 text-center mt-4">
                      {userInfo?.user?.username}
                    </h2>
                    <h5 className="text-gray-700 text-center">
                      {userInfo?.user.username}
                    </h5>
                  </div>

                  {/* Statistics */}
                  <div className="w-full divide-x flex text-center">
                    <div className="px-5 flex-1">
                      <span className="font-bold text-lg">
                        {userInfo?.user?.posts?.length}
                      </span>
                      <p className="text-gray-700">Posts</p>
                    </div>
                    <div className="px-5 flex-1">
                      <span className="font-bold text-lg">
                        {userInfo?.user?.followerCount}
                      </span>
                      <p className="text-gray-700">Followers</p>
                    </div>
                    <div className="px-5 flex-1">
                      <span className="font-bold text-lg">
                        {userInfo?.user?.followingCount}
                      </span>
                      <p className="text-gray-700">Followings</p>
                    </div>
                  </div>

                  {user.username !== userInfo.user.username && (
                    <button
                      onClick={handleFollow}
                      className="bg-red-500 w-full py-2 text-white rounded focus:outline-none focus:ring-2 ring-red-300"
                    >
                      {isFollowing ? "Unfollow" : "Follow"}
                    </button>
                  )}

                  {/* Info */}
                  <div className="py-5 space-y-2">
                    <h2 className="text-xl font-bold text-gray-700">
                      {userInfo?.user?.username}
                    </h2>
                    <p className="text-gray-600">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged.
                    </p>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};
