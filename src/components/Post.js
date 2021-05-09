import React from "react";
import { BsHeart, BsChat, BsBookmark } from "react-icons/bs";
import { RiShareCircleFill } from "react-icons/ri";
import { MdMoreHoriz } from "react-icons/md";
import { Img } from "./Img";

export const Post = ({ post, loading }) => {
  console.log("my post", post);
  return (
    <div
      style={{ breakInside: "avoid" }}
      className="post bg-white mx-auto mt-0 border max-w-sm rounded-xl"
    >
      {/* Header */}
      <div className="flex h-16 items-center px-6 justify-between">
        <div className="flex items-center space-x-5">
          <div className="h-10 w-10 rounded-full bg-gray-400 overflow-hidden">
            <img
              src="https://picsum.photos/200/200"
              alt="Avatar"
              className="object-contain"
            />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">
              {loading ? (
                <div className="w-32 h-4 bg-gray-400"></div>
              ) : (
                post?.author?.username
              )}
            </h4>
            <h5 className="text-sm mt-1">
              {loading ? (
                <div className="w-20 h-4 bg-gray-400"></div>
              ) : (
                post?.author?.displayName
              )}
            </h5>
          </div>
        </div>
        <MdMoreHoriz size="25" className="text-gray-500" />
      </div>

      {/* Body */}
      <div>
        <Img src={post.image} alt={post.capion} />
      </div>

      {/* Footer */}
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 h-10">
            <BsHeart size={25} className="text-gray-400" />
            <BsChat
              size={25}
              className="z-0 text-gray-400 relative bottom-0.5"
            />
            <RiShareCircleFill size={25} className="text-gray-400" />
          </div>
          <BsBookmark size={25} className="text-gray-400" />
        </div>

        <div className="">
          <h5 className="font-semibold">
            {loading ? (
              <div className="w-full h-4 bg-gray-400"></div>
            ) : (
              post.caption
            )}
          </h5>
          <p className="text-sm text-gray-500 mt-1">
            {loading ? (
              <div className="w-32 h-4 bg-gray-400"></div>
            ) : (
              "Wed, 21 April 2021"
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
