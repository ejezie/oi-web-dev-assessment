import React from "react";
import "./posts.scss";
import Container from "../layout/Container/Container";
import PostItem from "./post-item/PostItem";
import { useSelector, useDispatch } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import { getPostsAction } from "../../redux/slices/post.slice";

const Posts = () => {
  const dispatch = useDispatch();

  const { isLoading, postsData } = useSelector((state) => state.post);
  const posts = postsData?.data;


  React.useEffect(() => {
    dispatch(getPostsAction());
  }, [dispatch]);

  return (
    <Container>
      <div className="latest-posts-container">
        <div className="latest-posts-sub sub-heading">Latest Posts</div>
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
          <div className="posts-container space-between wrap">
            {Array.isArray(posts) && posts?.map((post, idx) => (
              <div className="product-item" key={idx}>
                <PostItem post={post} />
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Posts;
