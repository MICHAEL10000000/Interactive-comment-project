import React, { useState } from "react";
import images from "./images/icon-reply.svg";
import plus from "./images/icon-plus.svg";
import minus from "./images/icon-minus.svg";
import Comment from "./comment";
import deleteIcon from "./images/icon-delete.svg";
import editIcon from "./images/icon-edit.svg";

import amyrobson from "./images/avatars/image-amyrobson.png";

const Post = ({
  ImageSrc,
  timeline,
  name,
  post,
  number,
  increase,
  decrease,
  allowNewPost,
  deletePost,
  editPost,
}) => {
  const [commentStyle, setcommentStyle] = useState({
    display: "none",
  });
  const handleReplyClick = () => {
    console.log("clicked");
    setcommentStyle({
      display: "flex",
    });
  };

  return (
    <div className="post_grandparent px-4 font-Rubik-V  bg-SCWhite py-4 rounded-lg">
      <div className="post_header">
        <div className="profile flex items-center gap-4 mb-3">
          <img src={ImageSrc} alt="" className="w-9" />
          <p className=" font-Rubik-B text-SCGrayishBlue">{name}</p>
          <p className=" font-Rubik-V font-medium text-SCGrayishBlue ">
            {timeline}
          </p>
        </div>
        <div className="post font-medium text-SCDarkblue mb-3">{post}</div>
        <div className="flex justify-between items-center">
          <div className="count flex items-center gap-4 bg-SCLightgray text-SCModerateblue font-Rubik-B px-4 py-2 rounded-xl">
            <img src={plus} alt="" onClick={increase} />
            <p className="score">{number}</p>
            <img src={minus} alt="" onClick={decrease} />
          </div>
          <div>
            {name != "juliusomo" && (
              <div
                className="reply flex gap-4 items-center text-SCModerateblue font-Rubik-B"
                onClick={handleReplyClick}
              >
                <img src={images} alt="" />
                <p className="Reply" onClick={allowNewPost}>
                  Reply
                </p>
              </div>
            )}

            {name === "juliusomo" && (
              <div className="replyoptions flex gap-4">
                <div className="flex items-center gap-2" onClick={deletePost}>
                  <img src={deleteIcon} alt="" />
                  <p className=" text-SCSoftRed">Delete</p>
                </div>
                <div className="flex items-center gap-2" onClick={editPost}>
                  <img src={editIcon} alt="" />
                  <p className=" text-SCModerateblue">Edit</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post;
