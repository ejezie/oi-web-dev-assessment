import React, { useState } from "react";
import "./imageinput.scss";

const ImageUploadInput = ({ setImageFile, errorMessage }) => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
        setImageFile(reader.result);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImageFile(null);
  };

  return (
    <div className="image-upload-input-container">
      {image ? (
        <img src={image} alt="uploaded" className="uploaded-image" />
      ) : (
        <div className="default">no file chosen</div>
      )}
      <div className="image-input-container">
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

      {image && (
        <div onClick={removeImage} className="remove-image center">
          remove Image
        </div>
      )}
    {errorMessage && <span style={{color: 'red', fontSize: '12px'}}>{image ? null : errorMessage}</span>}

    </div>
  );
};

export default ImageUploadInput;
