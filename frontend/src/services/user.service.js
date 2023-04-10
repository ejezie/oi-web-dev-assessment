import { GET_USER, LOAD_USER } from "./CONSTANTS";
import axios from "axios";
import { devEnv } from "../configs/environment.config";

export const getUserById = async (id) => {
  try {
    const data = await axios.get(`${GET_USER}/${id}`);
    return data;
  } catch (err) {
    return err;
  }
};

export const loadUser = () => {
  const config = {
    url: `${devEnv.API_BASE_URL}${LOAD_USER}`,
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  return axios(config);
};