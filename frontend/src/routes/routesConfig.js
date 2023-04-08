import { Routes, Route } from "react-router-dom";
import {
  Home,
  ErrorPage,
  Register,
  Login,
  
} from "../pages";
import {
  HOME,
  REGISTER,
  LOGIN
} from "./CONSTANTS";

import { ProtectedRoutes, PublicRoutes } from "../components/guards";

const RouterConfig = () => {
  return (
    <div>
      <Routes>
        {/* Public routes should be placed in here */}
        <Route path={HOME} element={<Home />} />

        <Route path="/" element={<PublicRoutes />}>
          {/* Auth pages */}
          <Route path={REGISTER} element={<Register />} />
          <Route path={LOGIN} element={<Login />} />
        </Route>

        <Route path="/" element={<ProtectedRoutes />}>
          {/* Protected routes should be placed in here */}
        </Route>

        {/* 404 page */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default RouterConfig;
