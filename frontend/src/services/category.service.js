import {
  GET_ALL_CATEGORIES,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  NEW_CATEGORY,
} from "./CONSTANTS";
import axios from "axios";
import { devEnv } from "../configs/environment.config";

export const getAllCategories = async () => {
  const config = {
    url: `${devEnv.API_BASE_URL}${GET_ALL_CATEGORIES}`,
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  return await axios(config);
};

export const updateCategory = async (title, id) => {
  const config = {
    url: `${devEnv.API_BASE_URL}${UPDATE_CATEGORY}/${id}`,
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    data: { title },
    withCredentials: true,
  };

  return await axios(config);
};
export const createCategory = async (title) => {
  const config = {
    url: `${devEnv.API_BASE_URL}${NEW_CATEGORY}`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: { title },
    withCredentials: true,
  };

  return await axios(config);
};
export const deleteCategory = async (id) => {
  const config = {
    url: `${devEnv.API_BASE_URL}${DELETE_CATEGORY}/${id}`,
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  return await axios(config);
};
