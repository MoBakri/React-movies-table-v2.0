import React from "react";

const Like = ({ handleLike, liked }) => {
  return (
    <div onClick={() => handleLike(liked)}>
      <i
        className={liked.like === true ? "fa fa-heart" : "fa fa-heart-o"}
        style={{ color: liked.like === true ? "red" : "", cursor: "pointer" }}
      ></i>
    </div>
  );
};

export default Like;
