import axios from "axios";
import { devEnv } from "../configs/environment.config";
import {
  GET_ALL_POSTS,
  GET_ONE_POST,
  NEW_POST,
  UPDATE_POST,
  DELETE_POST,
} from "./CONSTANTS";

export const getAllPosts = async () => {
  const config = {
    url: `${devEnv.API_BASE_URL}${GET_ALL_POSTS}`,
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  return await axios(config);
};

export const getSinglePosts = async (id) => {
  const config = {
    url: `${devEnv.API_BASE_URL}${GET_ONE_POST}/${id}`,
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  return await axios(config);
};

export const updatePost = async (
  title,
  content,
  image,
  id,
  tagIds,
  categoryId
) => {
  const config = {
    url: `${devEnv.API_BASE_URL}${UPDATE_POST}/${id}${tagIds}${categoryId}`,
    method: "put",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: {
      title,
      content,
      image,
    },
    withCredentials: true,
  };

  return await axios(config);
};

export const createPost = async (title, content, image, tagIds, categoryId) => {
  const config = {
    url: `${devEnv.API_BASE_URL}${NEW_POST}${tagIds}${categoryId}`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: {
      title,
      content,
      image,
    },
    withCredentials: true,
  };

  return await axios(config);
};

export const deletePosts = async (id) => {
  const config = {
    url: `${devEnv.API_BASE_URL}${DELETE_POST}/${id}`,
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  return await axios(config);
};
