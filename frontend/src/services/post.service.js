import axios from "axios";
import { devEnv } from "../configs/environment.config";
import { GET_ALL_POSTS, GET_ONE_POST, NEW_POST, UPDATE_POST, DELETE_POST } from "./CONSTANTS";

export const getAllPosts = async () => {
    try {
        const config = {
            url: `${devEnv.API_BASE_URL}${GET_ALL_POSTS}`,
            method: 'get',
            headers: {
            "Content-Type": "application/json",
            }
        }

       const response = await axios(config)
       return response.data

    } catch (error) {
        return error
    }
} 