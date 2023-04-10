import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerAction } from "../../redux/slices/auth.slice";
import Input from "../primitives/Input/Input";
import ImageUploadInput from "../primitives/Image-upload-input/ImageUploadInput";
import Button from "../primitives/Button/Button";
import "./register.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { isLoading, isAuthenticated } = useSelector((state) => state.auth);

  // Prepare form data for POST request
  const form = new FormData();
  form.append("name", formData.name);
  form.append("email", formData.email);
  form.append("password", formData.password);
  form.append("avarter", imageFile);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSetImage = (image) => {
    setImageFile(image);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const errors = {};

    // Validate name
    if (!formData.name) {
      errors.name = "Please enter a name";
    }

    // Validate email
    if (!formData.email) {
      errors.email = "Please enter an email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }

    // Validate password
    if (!formData.password) {
      errors.password = "Please enter a password";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    // Validate image
    if (!imageFile) {
      errors.image = "Please upload an image";
    }

    setErrors(errors);

    // If no errors, submit the form
    if (Object.keys(errors).length === 0 && imageFile) {
      dispatch(
        registerAction({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          avarter: imageFile,
        })
      );
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleFormSubmit}>
        <Input
          type="text"
          name="name"
          label="Name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          error={errors.name}
        />
        <Input
          type="text"
          name="email"
          label="Email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
        />
        <div>
          <ImageUploadInput setImageFile={handleSetImage} errorMessage={errors.image}/>
        </div>

        <Button isLoading={isLoading} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Register;
