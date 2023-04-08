import { GET_USER } from "./CONSTANTS";
import axios from "axios";

export const getUserById = async (id) => {
  try {
    const data = await axios.get(`${GET_USER}/${id}`);
    return data;
  } catch (err) {
    return err;
  }
};
