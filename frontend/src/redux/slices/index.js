import { combineReducers } from "@reduxjs/toolkit";

// import auth from "./auth.slice";
import post from "./post.slice";
import message from "./message.slice";
import auth from "./auth.slice";
import user from "./user.slice";

const rootReducer = combineReducers({
  post,
  message,
  auth,
  user,
});

export default rootReducer;
