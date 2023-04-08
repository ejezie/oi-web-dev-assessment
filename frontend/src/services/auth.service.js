import axios from "axios";
import { LOGIN, LOG_OUT, REGISTER } from "./CONSTANTS";
import { devEnv } from "../configs/environment.config";

export const login = async (email, password) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await axios
    .post(`${devEnv.API_BASE_URL}/${LOGIN}`, { email, password }, config)
    .then((res) => {
      const data = res.data;
      return data;
    })
    .catch((err) => {
      return err.message;
    });
};

export const register = async (name, email, password) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await axios
    .post(
      `${devEnv.API_BASE_URL}/${REGISTER}`,
      { email, password, name },
      config
    )
    .then((res) => {
      const data = res.data;
      return data;
    });
};

export const logout = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await axios
    .post(`${devEnv.API_BASE_URL}/${LOG_OUT}`, {}, config)
    .then((res) => {
      const data = res.data;
      return data;
    });
};
