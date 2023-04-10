import "../dashboard.scss";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCategoryAction,
  getCategoriesAction,
  updateCategoryAction,
  createCategoryAction,
} from "../../../redux/slices/category.slice";
import { ThreeDots } from "react-loader-spinner";
import DashboardPanel from "../DashboardPanel";
import Input from "../../primitives/Input/Input";
import Button from "../../primitives/Button/Button";

function Category() {
  const [title, setTitle] = useState("");
  const [currentCategoryId, setCurrentCategoryId] = useState("");
  const [buttonText, setButtonText] = useState("Create");

  const dispatch = useDispatch();
  const { isLoading, categoriesData } = useSelector((state) => state.category);
  const categories = categoriesData?.categories


  const handleSubmit = (event) => {
    event.preventDefault();

    if (buttonText === "Create") {
      // Create a new category
      dispatch(createCategoryAction(title));
      setButtonText("Create");
    } else {
      // Update an existing category
      dispatch(updateCategoryAction({ title: title, id: currentCategoryId }));
    }
  };

  const handleEdit = (categoryId) => {
    const category = categories.find(
      (category) => category?._id === categoryId
    );
    setTitle(category?.title);
    setCurrentCategoryId(category?._id);
    setButtonText("Edit");
  };

  const handleDelete = (categoryId) => {
    dispatch(deleteCategoryAction(categoryId));
  };

  useEffect(() => {
    dispatch(getCategoriesAction());
  }, [dispatch]);

  return (
    <div className="left">
      <DashboardPanel />
      <div className="category">
        <h1>Categories</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <Input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
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
              <th>Title</th>
              <th>Created</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          {isLoading ? (
            <div
              className="center"
              style={{ height: "200px", width: "100%" }}
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
              {categories &&
                categories?.map((category) => (
                  <tr key={category._id}>
                    <td>{category?.title}</td>
                    <td>{category?.createdAt}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(category._id)}
                        className="Category__editButton"
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(category._id)}
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
        <div>{!categoriesData && "No tags created"}</div>
      </div>
    </div>
  );
}

export default Category;
