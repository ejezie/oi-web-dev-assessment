import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { PostService } from "../../services";
import { formatErrorResponse } from "../../utils";

export const getPostsAction = createAsyncThunk("posts", async (thunkAPI) => {
  try {
    const data = await PostService.getAllPosts();
    return data.data;
  } catch (error) {
    const message = formatErrorResponse(error);
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  isLoading: true,
  postsData: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPostsAction.pending, (state) => {
      state.isLoading = true;
      state.postsData = []
    });
    builder.addCase(getPostsAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.postsData = action.payload;
    });
    builder.addCase(getPostsAction.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

const { reducer } = postSlice;
export default reducer;
