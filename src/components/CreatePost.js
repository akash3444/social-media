import React, { useContext, useState } from "react";
import FileBase from "react-file-base64";
import { useMutation } from "@apollo/client";
import { Dialog } from "@headlessui/react";
import { UserContext } from "../App";
import { Button } from "../ui/Button";
import { CREATE_POST } from "../queries";

export const CreatePost = ({ isOpen, setIsOpen }) => {
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const userContext = useContext(UserContext);
  const { token } = userContext.user;
  // console.log(token)
  const [createPost, { data, loading, error }] = useMutation(CREATE_POST);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (image) {
      createPost({ variables: { token, caption, image: image.base64 } });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-sm mx-auto py-10 rounded"
      style={{
        boxShadow: "0 0 0 100vw rgba(0, 0, 0, .5)"
      }}
    >
      <Dialog.Overlay />
      <Dialog.Title className="text-2xl font-bold text-center mb-8">
        Create Post
      </Dialog.Title>
      <div className="w-full grid place-items-center">
        <div className="bg-white max-w-sm rounded px-6 w-full">
          <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="caption"
              placeholder="Caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="border focus:outline-none focus:ring ring-blue-200 focus:border-blue-500 py-2 px-2 w-full rounded"
            />
            <FileBase
              multiple={false}
              onDone={(img) => setImage(img)}
              id="img"
            />
            {image && (
              <img
                src={image.base64}
                alt="hello"
                className="h-20 w-20 mx-auto"
              />
            )}
            <Button type="submit">{`${
              loading
                ? "Creating post..."
                : error
                ? error.message
                : "Create Post"
            }`}</Button>
          </form>
        </div>
      </div>
    </Dialog>
  );
};
