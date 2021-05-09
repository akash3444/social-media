import React, { useEffect, useState } from "react";

export const Img = (props) => {
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const imgToLoad = new Image();
    imgToLoad.src = props.src;
    console.log(imgToLoad.height);
    imgToLoad.onload = () => {
      console.log("Image loaded");
      setHeight(imgToLoad.height);
      setWidth(imgToLoad.width);
      setLoading(false);
    };
  }, [props.src]);

  return (
    <>
      {loading ? (
        <div className="z-10 w-full h-56 bg-gray-400 animate-pulse"></div>
      ) : (
        <img src={props.src} alt={props.alt} loading="lazy" />
      )}
    </>
  );
};
