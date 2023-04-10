import { Routes, Route } from "react-router-dom";
import {
  Home,
  ErrorPage,
  
} from "../pages";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import Dashboard from "../components/dashboard/Dashboard";
import {
  HOME,
  REGISTER,
  LOGIN,
  DASHBOARD,
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
          <Route path={DASHBOARD} element={<Dashboard />} />

        </Route>

        {/* 404 page */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default RouterConfig;
