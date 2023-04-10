import axios from "axios";
import { devEnv } from "../configs/environment.config";
import {
  GET_ALL_COMMENT,
  NEW_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT_ADMIN,
} from "./CONSTANTS";

export const getAllComments = async () => {
  const config = {
    url: `${devEnv.API_BASE_URL}${GET_ALL_COMMENT}`,
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  return await axios(config);
};


export const updateComment = async (body, id) => {
  const config = {
    url: `${devEnv.API_BASE_URL}${UPDATE_COMMENT}/${id}`,
    method: "put",
    data: {body},
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  return await axios(config);
};

export const updateCommentAdmin = async (body, status, id) => {
  const config = {
    url: `${devEnv.API_BASE_URL}${UPDATE_COMMENT_ADMIN}/${id}`,
    method: "put",
    data: {body, status},
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  return await axios(config);
};

export const createComment = async (body) => {
  const config = {
    url: `${devEnv.API_BASE_URL}${NEW_COMMENT}`,
    method: "post",
    data: { body },
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  return await axios(config);
};

export const deleteComment = async (id) => {
  const config = {
    url: `${devEnv.API_BASE_URL}${DELETE_COMMENT}/${id}`,
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  return await axios(config);
};
