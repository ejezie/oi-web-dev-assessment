import "../dashboard.scss";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTagAction,
  getTagsAction,
  updateTagAction,
  createTagAction,
} from "../../../redux/slices/tag.slice";
import { ThreeDots } from "react-loader-spinner";
import DashboardPanel from "../DashboardPanel";
import Input from "../../primitives/Input/Input";
import Button from "../../primitives/Button/Button";

function Comments() {
  const [name, setName] = useState("");
  const [currentTagId, setCurrentTagId] = useState("");
  const [buttonText, setButtonText] = useState("Create");

  const dispatch = useDispatch();
  const { isLoading, tagsData } = useSelector((state) => state.tag);
  const tags = tagsData?.tags
  console.log(tagsData, "Tags");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (buttonText === "Create") {
      // Create a new category
      dispatch(createTagAction(name));
      setButtonText("Create");
    } else {
      // Update an existing category
      dispatch(updateTagAction({ name: name, id: currentTagId }));
    }
  };
  const handleEdit = (tagId) => {
    const tag = tags.find(
      (tag) => tag?._id === tagId
    );
    setName(tag?.name);
    setCurrentTagId(tag?._id);
    setButtonText("Edit");
  };

  const handleDelete = (tagId) => {
    dispatch(deleteTagAction(tagId));
  };

  useEffect(() => {
    dispatch(getTagsAction());
  }, [dispatch]);

  return (
    <div className="center">
      <DashboardPanel />
      <div className="category">
        <h1>Tags</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <Input
            type="text"
            id="title"
            name="title"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="Category__input"
          />
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
              <th>Name</th>
              <th>Created</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          {isLoading ? (
            <div
              className="center"
              style={{ height: "200px", width: "100%", background: "red" }}
            >
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
              {tags &&
                tags?.map((tag) => (
                  <tr key={tag._id}>
                    <td>{tag?.name}</td>
                    <td>{tag?.createdAt}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(tag._id)}
                        className="Category__editButton"
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(tag._id)}
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
        <div>{!tags && "No tags created"}</div>
      </div>
    </div>
  );
}

export default Comments;
