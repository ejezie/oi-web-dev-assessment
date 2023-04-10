import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { TagService } from "../../services";
import { formatErrorResponse } from "../../utils";

export const getTagsAction = createAsyncThunk("tag/all", async (thunkAPI) => {
  try {
    const response = await TagService.getAllTags();
    return response.data;
  } catch (error) {
    const message = formatErrorResponse(error);
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const createTagAction = createAsyncThunk("tag/create", async (name, thunkAPI) => {
  try {
    const response = await TagService.createTag(name);
    toast.success("created successfully");
    return response.data;
  } catch (error) {
    const message = formatErrorResponse(error);
    console.log(error)
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateTagAction = createAsyncThunk("tag/update", async ({name, id}, thunkAPI) => {
  try {
    const response = await TagService.updateTag(name, id);
    toast.success("updated successfully");
    return response.data;
  } catch (error) {
    const message = formatErrorResponse(error);
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteTagAction = createAsyncThunk("tag/delete", async (id, thunkAPI) => {
  try {
    const response = await TagService.deleteTag(id);
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
  tagsData: [],
};

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get tags cases
    builder.addCase(getTagsAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTagsAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tagsData = action.payload;
    });
    builder.addCase(getTagsAction.rejected, (state, action) => {
      state.isLoading = false;
    });

    // create tag cases
    builder.addCase(createTagAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createTagAction.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createTagAction.rejected, (state) => {
      state.isLoading = false;
    });

    // update tags cases
    builder.addCase(updateTagAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateTagAction.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateTagAction.rejected, (state) => {
      state.isLoading = false;
    });

    // delete tag cases
    builder.addCase(deleteTagAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTagAction.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteTagAction.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

const { reducer } = tagSlice;
export default reducer;
