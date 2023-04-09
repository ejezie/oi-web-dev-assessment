import { combineReducers } from "@reduxjs/toolkit";

// import auth from "./auth.slice";
import post from "./post.slice";
import message from "./message.slice";
import auth from "./auth.slice";

const rootReducer = combineReducers({
  post,
  message,
  auth,
});

export default rootReducer;
