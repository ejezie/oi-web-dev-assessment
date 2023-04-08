import React from "react";
import { Link } from "react-router-dom";
import Chip from "../../primitives/chip/Chip";
import "./postitem.css";

const PostItem = ({post}) => {

  return (
    <div className="blogItem-wrap">
      <img className="blogItem-cover" src={""} alt="cover" />
      <Chip label={post?.category} />
      <h3>{post?.title}</h3>
      <p className="blogItem-desc">{post?.content}</p>
      <div>
        <div className="blogItem-author">
          <img src={""} alt="avatar" />
          <div>
            <h6>{post?.author?.name}</h6>
            <p>{post?.createdAt}</p>
          </div>
        </div>
        <Link className="blogItem-link" to={`/blog/${post?._id}`}>
          ➝
        </Link>
      </div>
    </div>
  );
};

export default PostItem;
