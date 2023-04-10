import React from "react";
import "./singlepost.scss";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { singlePostAction } from "../../redux/slices/post.slice";
import { ThreeDots } from "react-loader-spinner";
import Header from "../header/Header";

const SinglePost = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { isLoading, postsData } = useSelector((state) => state.post);
  const post = postsData?.data;

  console.log(postsData);

  React.useEffect(() => {
    dispatch(singlePostAction(id));
  }, [dispatch]);

  return (
    <>
      <Header></Header>
      {isLoading ? (
        <div className="spinner center">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#003F62"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      ) : (
        <div className="postView">
          <div className="postView-header">
            <img
              className="postView-cover"
              src={post?.image?.url}
              alt="cover"
            />
          </div>
          <div className="postView-body">
            <div className="postView-author">
              <img
                className="postView-avatar"
                src={
                  post?.avatar ||
                  "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
                }
                alt="avatar"
              />
              <div>
                <h4 className="postView-authorName">{post?.author?.name}</h4>
                <p className="postView-date">{post?.createdAt}</p>
              </div>
            </div>
            <div className="postView-content">
              <h2 className="postView-title">{post?.title}</h2>
              <p className="postView-text">{post?.content}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SinglePost;
