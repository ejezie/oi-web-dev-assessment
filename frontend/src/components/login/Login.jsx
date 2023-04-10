import React, { useState } from "react";
import "./login.scss";
import { useSelector, useDispatch } from "react-redux";
import Input from "../primitives/Input/Input";
import Button from "../primitives/Button/Button";
import { loginAction } from "../../redux/slices/auth.slice";
import { useNavigate } from "react-router-dom";


const Login = () => {

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch()
  const {isLoading, isAuthenticated} = useSelector(state => state.auth)

//   console.log(authData, "dataAuth")
  const navigate = useNavigate()

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const errors = {};

    // Validate email
    if (!loginData.email) {
      errors.email = "Please enter an email";
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      errors.email = "Please enter a valid email";
    }

    // Validate password
    if (!loginData.password) {
      errors.password = "Please enter a password";
    } else if (loginData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    setErrors(errors);

    // If no errors, submit the form
    if (Object.keys(errors).length === 0) {
      dispatch(loginAction({email: loginData.email, password: loginData.password}));
    }
  };

  React.useEffect(() => {
    if (isAuthenticated){
        navigate('/');
    }
  }, [dispatch, isAuthenticated, navigate])

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <Input
          type="text"
          name="email"
          label="Email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleInputChange}
          error={errors.email}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleInputChange}
          error={errors.password}
        />
        <Button isLoading={isLoading} type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Login;
