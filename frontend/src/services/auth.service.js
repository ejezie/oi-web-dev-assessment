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
    data: {
      email,
      password,
    },
  };
  return axios(config);
};

export const register = (name, email, password) => {
  const config = {
    url: `${devEnv.API_BASE_URL}${REGISTER}`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      name,
      email,
      password,
    },
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
  };

  return axios(config);
};
