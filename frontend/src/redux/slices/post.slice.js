import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { PostService } from "../../services";
import { formatErrorResponse } from "../../utils";

export const getPostsAction = createAsyncThunk("post/all", async (thunkAPI) => {
  try {
    const data = await PostService.getAllPosts();
    return data.data;
  } catch (error) {
    const message = formatErrorResponse(error);
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const createPostAction = createAsyncThunk(
  "post/create",
  async ({ title, content, image, tagIds, categoryId }, thunkAPI) => {
    try {
      const response = await PostService.createPost(
        title,
        content,
        image,
        tagIds,
        categoryId
      );
      toast.success("post created successfully");
      return response.data;
    } catch (error) {
      const message = formatErrorResponse(error);
      console.log(error, "error");
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePostAction = createAsyncThunk(
  "post/update",
  async ({ title, content, image, id, tagIds, categoryId }, thunkAPI) => {
    try {
      const response = await PostService.updatePost(
        title,
        content,
        image,
        id,
        tagIds,
        categoryId
      );
      toast.success("edited successfully");
      return response.data;
    } catch (error) {
      const message = formatErrorResponse(error);
      console.log(error, "err");
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const singlePostAction = createAsyncThunk(
  "post/single",
  async (id, thunkAPI) => {
    try {
      const response = await PostService.getSinglePosts(id);
      return response.data;
    } catch (error) {
      const message = formatErrorResponse(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deletePostAction = createAsyncThunk(
  "post/delete",
  async (id, thunkAPI) => {
    try {
      const response = await PostService.deletePosts(id);
      toast.success("deleted successfully");
      return response.data;
    } catch (error) {
      const message = formatErrorResponse(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const searchPostAction = createAsyncThunk(
  "post/search",
  async (keyword, thunkAPI) => {
    try {
      const response = await PostService.searchPost(keyword);
      console.log(response);
      return response.data;
    } catch (error) {
      const message = formatErrorResponse(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  isLoading: true,
  postsData: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // All post cases
    builder.addCase(getPostsAction.pending, (state) => {
      state.isLoading = true;
      state.postsData = [];
    });
    builder.addCase(getPostsAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.postsData = action.payload;
    });
    builder.addCase(getPostsAction.rejected, (state) => {
      state.isLoading = false;
    });

    // Single post cases
    builder.addCase(singlePostAction.pending, (state) => {
      state.isLoading = true;
      state.postsData = [];
    });
    builder.addCase(singlePostAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.postsData = action.payload;
    });
    builder.addCase(singlePostAction.rejected, (state) => {
      state.isLoading = false;
    });

    // Search post cases
    builder.addCase(searchPostAction.pending, (state) => {
      state.isLoading = true;
      state.postsData = [];
    });
    builder.addCase(searchPostAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.postsData = action.payload;
    });
    builder.addCase(searchPostAction.rejected, (state) => {
      state.isLoading = false;
    });

    // create Post cases
    builder.addCase(createPostAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createPostAction.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createPostAction.rejected, (state) => {
      state.isLoading = false;
    });

    // update Post cases
    builder.addCase(updatePostAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updatePostAction.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updatePostAction.rejected, (state) => {
      state.isLoading = false;
    });

    // delete Post cases
    builder.addCase(deletePostAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deletePostAction.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deletePostAction.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

const { reducer } = postSlice;
export default reducer;
