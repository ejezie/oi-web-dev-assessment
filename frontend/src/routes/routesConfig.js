import { Routes, Route } from "react-router-dom";

import {
  Home,
  ErrorPage,
} from "../pages";

import Login from "../components/login/Login";
import Register from "../components/register/Register";
import Category from "../components/dashboard/category/Category";
import Tags from "../components/dashboard/tags/Tags";
import Posts from "../components/dashboard/posts/Posts";
import SinglePost from "../components/single-post/SinglePost";

import {
  HOME,
  REGISTER,
  LOGIN,
  CATEGORY,
  TAGS,
  POSTS,
  POST,
} from "./CONSTANTS";

import { ProtectedRoutes, PublicRoutes } from "../components/guards";

const RouterConfig = () => {
  return (
    <div>
      <Routes>
        {/* Public routes should be placed in here */}
        <Route path={HOME} element={<Home />} />
        <Route path={POST} element={<SinglePost />} />

        <Route path="/" element={<PublicRoutes />}>
          {/* Auth pages */}
          <Route path={REGISTER} element={<Register />} />
          <Route path={LOGIN} element={<Login />} />
        </Route>

        <Route path="/dashboard" element={<ProtectedRoutes />}>
          {/* Protected routes should be placed in here */}
          <Route path={CATEGORY} element={<Category />} />
          <Route path={TAGS} element={<Tags />} />
          <Route path={POSTS} element={<Posts />} />

        </Route>

        {/* 404 page */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default RouterConfig;
