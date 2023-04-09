import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerAction } from "../../redux/slices/auth.slice";
import Input from "../primitives/Input/Input";
import Button from "../primitives/Button/Button";
import "./register.scss";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch()
  const {isLoading, isAuthenticated} = useSelector(state => state.auth)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const errors = {};

    // Validate name
    if (!registerData.name) {
      errors.name = "Please enter a name";
    }

    // Validate email
    if (!registerData.email) {
      errors.email = "Please enter an email";
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      errors.email = "Please enter a valid email";
    }

    // Validate password
    if (!registerData.password) {
      errors.password = "Please enter a password";
    } else if (registerData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    setErrors(errors);

    // If no errors, submit the form
    if (Object.keys(errors).length === 0) {
      dispatch(registerAction({name: registerAction.name, email: registerData.email, password: registerData.password}));

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
          value={registerData.name}
          onChange={handleInputChange}
          error={errors.name}
        />
        <Input
          type="text"
          name="email"
          label="Email"
          placeholder="Email"
          value={registerData.email}
          onChange={handleInputChange}
          error={errors.email}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Password"
          value={registerData.password}
          onChange={handleInputChange}
          error={errors.password}
        />
        <Button isLoading={isLoading} type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Register;
