import React from "react";
import "./posts.scss";
import Container from "../layout/Container/Container";
import PostItem from "./post-item/PostItem";
import { useSelector, useDispatch } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import {getPosts} from "../../redux/slices/post.slice"

const Posts = () => {
  const dispatch = useDispatch();

  const { isLoading, postsData } = useSelector(
    (state) => state.post
  );

  React.useEffect(() => {
    
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Container>
      <div className="latest-posts-container left column">
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
            {postsData &&
              postsData?.data?.map((post) => (
                <div className="product-item" key={post?._id}>
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
