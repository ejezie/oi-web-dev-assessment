import React from "react";
import "./text-area.scss";

const TextArea = ({ error, ...props }) => {
  return (
    <div className="custom-input-container">
      <textarea className="area" {...props} />
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default TextArea;
