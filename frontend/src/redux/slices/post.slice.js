import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import { PostService } from "../../services";
import { formatErrorResponse } from "../../utils";

export const getPosts = createAsyncThunk("posts", async () => {
  try {
    const { data } = PostService.getAllPosts();
    return data;
  } catch (error) {
    return formatErrorResponse(error);
  }
});


const initialState = {
    isLoading: false,
    postsData: []
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPosts.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.postsData = action.payload
        });
        builder.addCase(getPosts.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.error.message)
        })
    }
})

const {reducer} = postSlice;
export default reducer