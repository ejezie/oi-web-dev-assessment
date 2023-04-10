import { useSelector } from "react-redux";
import { LOGIN } from "../../routes/CONSTANTS";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? <Outlet /> : <Navigate to={LOGIN} replace />;
};

export default ProtectedRoutes;
