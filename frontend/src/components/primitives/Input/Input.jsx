import React from "react";
import "./input.scss";

const Input = ({ error, ...props }) => {
  return (
    <div className="custom-input-container">
      <input {...props} />
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default Input;
