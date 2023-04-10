import axios from "axios";
import { LOGIN, LOG_OUT, REGISTER } from "./CONSTANTS";
import { devEnv } from "../configs/environment.config";

export const login = (email, password) => {
  const config = {
    url: `${devEnv.API_BASE_URL}${LOGIN}`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
    data: {
      email,
      password,
    },
  };
  return axios(config);
};

export const register = (name, email, password, avarter) => {
  const config = {
    url: `${devEnv.API_BASE_URL}${REGISTER}`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: {
      name,
      email,
      password,
      avarter
    },
    withCredentials: true,
  };
    return axios(config);
};

export const logout = () => {
  const config = {
    url: `${devEnv.API_BASE_URL}${LOG_OUT}`,
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  return axios(config);
};
