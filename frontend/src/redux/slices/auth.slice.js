import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { AuthService } from "../../services";
import { formatErrorResponse } from "../../utils";

export const login = createAsyncThunk("register", async ({email, password}, thunkAPI) => {
  try {
    const { data } = await AuthService.login(email, password);
    return data;
  } catch (error) {
    const message = formatErrorResponse(error);
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});
