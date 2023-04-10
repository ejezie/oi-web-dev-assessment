import { combineReducers } from "@reduxjs/toolkit";

// import auth from "./auth.slice";
import post from "./post.slice";
import message from "./message.slice";
import auth from "./auth.slice";
import user from "./user.slice";
import tag from "./tag.slice";
import category from "./category.slice";
import comment from "./comment.slice";

const rootReducer = combineReducers({
  post,
  message,
  auth,
  user,
  category,
  tag,
  comment
});

export default rootReducer;
