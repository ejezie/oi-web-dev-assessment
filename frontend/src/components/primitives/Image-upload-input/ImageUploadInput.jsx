import React, { useState } from "react";
import "./imageinput.scss";

const ImageUploadInput = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-upload-input-container">
      {image && <img src={image} alt="uploaded" className="uploaded-image" />}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="image-input"
      />
      <label htmlFor="image-input" className="image-label">
        Upload Image
      </label>
    </div>
  );
};

export default ImageUploadInput;
