import React from "react";
import "./search.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { devEnv } from "../../../configs/environment.config";

const SearchBar = ({ formSubmit, value, handleSearchKey, clearSearch }) => {

  const navigate = useNavigate()

  const [keyword, setKeyword] = React.useState('');

  console.log(keyword);

  const searchHandler = (e) => {

    e.preventDefault();
    if(keyword){
      axios.post(`${devEnv.API_BASE_URL}posts?${keyword}`)
    }else {
      navigate('/')
    }
  };

  return (
    <div className="searchBar-wrap">
      <form onSubmit={searchHandler}>
        <input
          type="text"
          placeholder="Search By Category"
          value={value}
          onChange={(e) => setKeyword(e.target.value)}
        />
        {value && <span onClick={clearSearch}>X</span>}
        <button>Go</button>
      </form>
    </div>
  );
};

export default SearchBar;
