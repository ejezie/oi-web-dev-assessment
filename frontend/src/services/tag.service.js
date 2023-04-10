import { GET_ALL_TAGS, UPDATE_TAG, DELETE_TAG, NEW_TAG } from "./CONSTANTS";
import axios from "axios";
import { devEnv } from "../configs/environment.config";

export const getAllTags = async () => {
  const config = {
    url: `${devEnv.API_BASE_URL}${GET_ALL_TAGS}`,
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  return await axios(config);
};

export const updateTag = async (name, id) => {
  const config = {
    url: `${devEnv.API_BASE_URL}${UPDATE_TAG}/${id}`,
    method: "put",
    data: {name},
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  return await axios(config);
};

export const createTag = async (name) => {
  const config = {
    url: `${devEnv.API_BASE_URL}${NEW_TAG}`,
    method: "post",
    data: { name },
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  return await axios(config);
};

export const deleteTag = async (id) => {
  const config = {
    url: `${devEnv.API_BASE_URL}${DELETE_TAG}/${id}`,
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  return await axios(config);
};
