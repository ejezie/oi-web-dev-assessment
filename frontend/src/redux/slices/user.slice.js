import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { UserService } from "../../services";
import { formatErrorResponse } from "../../utils";

export const loadUserAction = createAsyncThunk("user/me", async (thunkAPI) => {
  try {
    const response = await UserService.loadUser();
    return response.data;
  } catch (error) {
    const message = formatErrorResponse(error);
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  isLoading: false,
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadUserAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadUserAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(loadUserAction.rejected, (state, action) => {
      state.isLoading = false;
      state.user = {};
    });
  },
});

const { reducer } = userSlice;
export default reducer;
