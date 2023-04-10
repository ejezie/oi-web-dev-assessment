import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { CommentService } from "../../services";
import { formatErrorResponse } from "../../utils";

export const getCommentAction = createAsyncThunk("comment/all", async (thunkAPI) => {
  try {
    const response = await CommentService.getAllComments();
    return response.data;
  } catch (error) {
    const message = formatErrorResponse(error);
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const createCommentAction = createAsyncThunk("comment/create", async (body, thunkAPI) => {
  try {
    const response = await CommentService.createComment(body);
    toast.success("created successfully");
    return response.data;
  } catch (error) {
    const message = formatErrorResponse(error);
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateCommentAction = createAsyncThunk("comment/update", async ({body, id}, thunkAPI) => {
  try {
    const response = await CommentService.updateComment(body, id);
    toast.success("edited successfully");
    return response.data;
  } catch (error) {
    const message = formatErrorResponse(error);
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateCommentActionAdmin = createAsyncThunk("comment/admin/update", async ({body, status, id}, thunkAPI) => {
  try {
    const response = await CommentService.updateCommentAdmin(body, status, id);
    toast.success("edited successfully");
    return response.data;
  } catch (error) {
    const message = formatErrorResponse(error);
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteCommentAction = createAsyncThunk("comment/delete", async (id, thunkAPI) => {
  try {
    const response = await CommentService.deleteComment(id);
    toast.success("deleted successfully");
    return response.data;
  } catch (error) {
    const message = formatErrorResponse(error);
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  isLoading: true,
  commentsData: [],
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all categories cases
    builder.addCase(getCommentAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCommentAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.commentsData = action.payload;
    });
    builder.addCase(getCommentAction.rejected, (state, action) => {
      state.isLoading = false;
    });

    // create comment cases
    builder.addCase(createCommentAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createCommentAction.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createCommentAction.rejected, (state) => {
      state.isLoading = false;
    });

    // update comment cases
    builder.addCase(updateCommentAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCommentAction.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateCommentAction.rejected, (state) => {
      state.isLoading = false;
    });

    // update admin comment cases
    builder.addCase(updateCommentActionAdmin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCommentActionAdmin.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateCommentActionAdmin.rejected, (state) => {
      state.isLoading = false;
    });

    // delete comment cases
    builder.addCase(deleteCommentAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCommentAction.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteCommentAction.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

const { reducer } = commentSlice;
export default reducer;
