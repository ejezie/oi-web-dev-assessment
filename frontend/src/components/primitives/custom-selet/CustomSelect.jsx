import React, { useState } from "react";
import "./customselect.scss";
import { useSelector, useDispatch } from "react-redux";
import { loadUserAction } from "../../../redux/slices/user.slice";
import { getTagsAction } from "../../../redux/slices/tag.slice";
import { getCategoriesAction } from "../../../redux/slices/category.slice";

const CustomSelect = ({setTagIds, setCategoryId}) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const dispatch = useDispatch();
  const { tagsData } = useSelector((state) => state.tag);
  const { categoriesData } = useSelector((state) => state.category);

  const names = [];

  tagsData?.tags?.forEach((tag) => {
    names.push(tag.name);
    console.log(names, "names");

  });

  const handleTagSelect = (event) => {
    const selectedTagId = event.target.value;
    if (selectedTags.includes(selectedTagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== selectedTagId));
    } else {
      setSelectedTags([...selectedTags, selectedTagId]);
    }
  };

  const handleCategorySelect = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleRemoveTag = (tagId) => {
    setSelectedTags(selectedTags.filter((id) => id !== tagId));
  };

  const tagIds = selectedTags.reduce(
    (acc, id, index) =>
      acc +
      (index === 0 ? "?tagIds[]=" : "&tagIds[]=") +
      encodeURIComponent(id),
    ""
  );

  const categoryId = selectedCategory
    ? `&categoryId=${encodeURIComponent(selectedCategory)}`
    : "";

    setCategoryId(categoryId);
    setTagIds(tagIds)

  React.useEffect(() => {
    dispatch(getTagsAction());
    dispatch(getCategoriesAction());
  }, []);

  return (
    <div>
      <div className="tag-select">
        <label htmlFor="tags">Select tags:</label>
        <select
          id="tags"
          name="tags"
          multiple
          onChange={handleTagSelect}
          value={selectedTags}
        >
          {tagsData?.tags?.map((tag) => (
            <option name={tag?.name} value={tag?._id}>
              {tag?.name}
            </option>
          ))}
        </select>
        <div className="tag-chips">
          {selectedTags.map((tagId, index) => (
            <div className="tag-chip" key={tagId}>
              <span>{names[index]}</span>
              <button
                type="button"
                onClick={() => {
                  handleRemoveTag(tagId);
                }}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="category-select">
        <label htmlFor="category">Select category:</label>
        <select
          id="category"
          name="category"
          onChange={handleCategorySelect}
          value={selectedCategory}
        >
          {categoriesData.categories?.map((category) => (
            <option value={category?._id} name={category?.title}>
              {category?.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CustomSelect;
