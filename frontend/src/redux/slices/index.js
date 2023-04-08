import { combineReducers } from "@reduxjs/toolkit";

// import auth from "./auth.slice";
import post from "./post.slice";
import message from "./message.slice";

const rootReducer = combineReducers({
  post,
  message,
});

export default rootReducer;
