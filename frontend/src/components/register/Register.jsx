import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerAction } from "../../redux/slices/auth.slice";
import Input from "../primitives/Input/Input";
import ImageUploadInput from "../primitives/Image-upload-input/ImageUploadInput";
import Button from "../primitives/Button/Button";
import "./register.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


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

  const navigate = useNavigate();


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

  
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, isAuthenticated, navigate]);

  return (
    <div className="register-container">
      <h2 className="register-heading">Register</h2>
      <form className="register-form" onSubmit={handleFormSubmit}>
        <Input
          className="register-input"
          type="text"
          name="name"
          label="Name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          error={errors.name}
        />
        <Input
          className="register-input"
          type="text"
          name="email"
          label="Email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
        />
        <Input
          className="register-input"
          type="password"
          name="password"
          label="Password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
        />
        <div className="register-image-upload">
          <ImageUploadInput
            setImageFile={handleSetImage}
            errorMessage={errors.image}
          />
        </div>

        <Button className="register-button" isLoading={isLoading} type="submit">
          Submit
        </Button>
      </form>
      <Link to={"/"}>Home</Link>
    </div>
  );
};

export default Register;
