import React from "react";
import { Link } from "react-router-dom";
import Chip from "../../primitives/chip/Chip";
import "./postitem.scss";

const PostItem = ({ post }) => {
  return (
    <Link to={`/post/${post?._id}`} className="blogItem-wrap link">
      <img
        className="blogItem-cover"
        src={
          post?.image?.url
            ? post?.image?.url
            : "https://img.freepik.com/free-photo/psychedelic-paper-shapes-with-copy-space_23-2149378246.jpg?w=900&t=st=1681159604~exp=1681160204~hmac=1eddfd67038d5eee850eada1e3f5d05865768fe75dde7985b4eb5ee1b17d858b.png"
        }
        alt="cover"
      />
      {/* <Chip label={post?.category} /> */}
      <h3 className="sub-heading">{post?.title}</h3>
      <p className="blogItem-desc ellipsis">{post?.content}</p>
      <div>
        <div className="blogItem-author">
          <img
            src={
              "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
            }
            alt="avatar"
          />
          <div>
            <h6>{post?.author?.name}</h6>
            <p>{post?.createdAt}</p>
          </div>
        </div>
        <Link className="blogItem-link" to={`/post/${post?._id}`}>
          ➝
        </Link>
      </div>
    </Link>
  );
};

export default PostItem;
