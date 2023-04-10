import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { CategoryService } from "../../services";
import { formatErrorResponse } from "../../utils";

export const getCategoriesAction = createAsyncThunk("category/all", async (thunkAPI) => {
  try {
    const response = await CategoryService.getAllCategories();
    return response.data;
  } catch (error) {
    const message = formatErrorResponse(error);
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const createCategoryAction = createAsyncThunk("category/create", async (title, thunkAPI) => {
  try {
    const response = await CategoryService.createCategory(title);
    toast.success("created successfully");
    return response.data;
  } catch (error) {
    const message = formatErrorResponse(error);
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateCategoryAction = createAsyncThunk("category/update", async ({title, id}, thunkAPI) => {
  try {
    const response = await CategoryService.updateCategory(title, id);
    toast.success("edited successfully");
    return response.data;
  } catch (error) {
    const message = formatErrorResponse(error);
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteCategoryAction = createAsyncThunk("category/delete", async (id, thunkAPI) => {
  try {
    const response = await CategoryService.deleteCategory(id);
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
  categoriesData: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all categories cases
    builder.addCase(getCategoriesAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategoriesAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categoriesData = action.payload;
    });
    builder.addCase(getCategoriesAction.rejected, (state, action) => {
      state.isLoading = false;
    });

    // create category cases
    builder.addCase(createCategoryAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createCategoryAction.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createCategoryAction.rejected, (state) => {
      state.isLoading = false;
    });

    // update category cases
    builder.addCase(updateCategoryAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCategoryAction.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateCategoryAction.rejected, (state) => {
      state.isLoading = false;
    });

    // delete category cases
    builder.addCase(deleteCategoryAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCategoryAction.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteCategoryAction.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

const { reducer } = categorySlice;
export default reducer;
