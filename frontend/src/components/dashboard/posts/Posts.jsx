import "../dashboard.scss";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deletePostAction,
  getPostsAction,
  updatePostAction,
  createPostAction,
} from "../../../redux/slices/post.slice";
import { ThreeDots } from "react-loader-spinner";
import DashboardPanel from "../DashboardPanel";
import Input from "../../primitives/Input/Input";
import TextArea from "../../primitives/text-area/Text-Area";
import Button from "../../primitives/Button/Button";
import ImageUploadInput from "../../primitives/Image-upload-input/ImageUploadInput";
import CustomSelect from "../../primitives/custom-selet/CustomSelect";

function scrollToTop() {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  document.querySelector("parentElementSelector").style.overflow = "visible";
}

function Posts() {
  const [currentPostId, setCurrentPostId] = useState("");
  const [buttonText, setButtonText] = useState("Create");
  const [postFormData, setPostFormData] = useState({
    title: "",
    content: "",
    id: "",
  });
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [tagIds, setTagIds] = useState(null);
  const [categoryId, setCategoryId] = useState(null);

  const scrollToTopRef = React.useRef(null);

  // Prepare form data for POST request
  const form = new FormData();
  form.append("title", postFormData.title);
  form.append("content", postFormData.content);
  form.append("image", imageFile);

  const handleSetImage = (image) => {
    setImageFile(image);
  };

  const dispatch = useDispatch();
  const { isLoading, postsData } = useSelector((state) => state.post);
  const posts = postsData?.data;
  console.log(postFormData, "posts");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPostFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = {};

    // Validate title
    if (!postFormData.title) {
      errors.title = "Please add a title";
    }

    // Validate image
    if (!postFormData.content) {
      errors.content = "Please add post content";
    }

    // Validate image
    if (!imageFile) {
      errors.image = "Please upload an image";
    }

    setErrors(errors);

    // If no errors, submit the form
    if (Object.keys(errors).length === 0 && imageFile) {
      if (buttonText === "Create") {
        // Create a new category
        dispatch(
          createPostAction({
            title: postFormData.title,
            content: postFormData.content,
            image: imageFile,
            id: currentPostId,
            tagIds: tagIds,
            categoryId: categoryId,
          })
        );
        setButtonText("Create");
      } else {
        // Update an existing category
        dispatch(
          updatePostAction({
            title: postFormData.title,
            content: postFormData.content,
            image: imageFile,
            id: currentPostId,
            tagIds: tagIds,
            categoryId: categoryId,
          })
        );
      }
    }
  };

  const handleEdit = (postId) => {
    const post = posts.find((post) => post?._id === postId);
    setPostFormData({
      title: post.title,
      content: post.content,
      id: post._id,
    });
    setCurrentPostId(post?._id);
    setButtonText("Edit");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = (postId) => {
    dispatch(deletePostAction(postId));
  };

  useEffect(() => {
    dispatch(getPostsAction());
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [dispatch]);

  return (
    <div className="left" ref={scrollToTopRef}>
      <DashboardPanel />
      <div className="category">
        <h1>Posts</h1>
        <form onSubmit={handleSubmit} className="left column">
          <label htmlFor="title">Title:</label>
          <Input
            type="text"
            id="title"
            name="title"
            value={postFormData.title}
            onChange={(event) => handleInputChange(event)}
            className="Category__input"
            error={errors.title}
          />
          <label htmlFor="title">Content:</label>
          <TextArea
            type="text"
            id="content"
            name="content"
            value={postFormData.content}
            onChange={(event) => handleInputChange(event)}
            error={errors.content}
          />
          <div>
            <CustomSelect setTagIds={setTagIds} setCategoryId={setCategoryId} />
          </div>
          <div>
            <ImageUploadInput
              setImageFile={handleSetImage}
              errorMessage={errors.image}
            />
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            className="Category__button"
          >
            {buttonText}
          </Button>
        </form>
        <table className="Category__table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Created</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          {isLoading ? (
            <div className="center" style={{ height: "200px", width: "100%" }}>
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
            <tbody>
              {posts &&
                posts?.map((post) => (
                  <tr key={post?._id}>
                    <td>{post?.title}</td>
                    <td>{post?.createdAt}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(post?._id)}
                        className="Category__editButton"
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(post?._id)}
                        className="Category__deleteButton"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          )}
        </table>
        <div>{!posts && "No posts created"}</div>
      </div>
    </div>
  );
}

export default Posts;
