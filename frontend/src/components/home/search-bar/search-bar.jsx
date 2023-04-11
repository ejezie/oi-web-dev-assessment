import React from "react";
import "./search.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchPostAction } from "../../../redux/slices/post.slice";
import Button from "../../primitives/Button/Button";
import Input from "../../primitives/Input/Input";

const SearchBar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.post);

  const [keyword, setKeyword] = React.useState("");


  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      dispatch(searchPostAction(keyword));
    } else {
      navigate("/");
    }
  };

  return (
    <div className="searchBar-wrap">
      <form onSubmit={searchHandler}>
        <Input
          type="text"
          placeholder="Search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        {<div style={{margin: "15px 0px", cursor: 'pointer', fontSize: "10px", color: 'red'}} onClick={() => setKeyword("")}>clear</div>}
        <Button isLoading={isLoading}>Search</Button>
      </form>
    </div>
  );
};

export default SearchBar;
