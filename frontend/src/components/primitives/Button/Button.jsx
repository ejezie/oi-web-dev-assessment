import React from "react";
import "./button.scss";

const Button = ({ isLoading, children, ...rest }) => {
  return (
    <button className={`button center ${isLoading ? "loading" : ""}`} {...rest}>
      {isLoading ? (
        <></>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
