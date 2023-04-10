import React from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../redux/slices/auth.slice";
import Button from "../primitives/Button/Button";

const Header = ({ image }) => {
  const dispatch = useDispatch();

  const { isLoading, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <div className="header">
      <img
        src={
          "https://w1.pngwing.com/pngs/964/495/png-transparent-social-media-icons-blog-blogger-symbol-wordpress-blue-text-technology-thumbnail.png"
        }
        alt="Home"
        className="home-logo"
      />
      <div className="center">
        <img
          src={
            image ||
            "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"
          }
          alt="Avatar"
          className="avatar"
        />
        {isAuthenticated ? (
          <div className="center">
            <Button
              isLoading={isLoading}
              className="text"
              onClick={handleLogout}
            >
              Logout
            </Button>
            <Link to={"/dasboard"} style={{marginLeft: '12px'}} className="link">Dashboard</Link>
          </div>
        ) : (
          <Link to={"/login"} className="text">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
