import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { AuthService } from "../../services";
import { formatErrorResponse } from "../../utils";

export const loginAction = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(email, password);
      if (data?.data?.token) {
        localStorage.setItem("token", JSON.stringify(data.data.token));
      }
      toast.success("Logged in successfully");
      return data;
    } catch (error) {
      const message = formatErrorResponse(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const registerAction = createAsyncThunk(
  "auth/register",
  async ({ name, email, password, avarter }, thunkAPI) => {
    try {
      const data = await AuthService.register(name, email, password, avarter);
      if (data?.data?.token) {
        localStorage.setItem("token", JSON.stringify(data.data.token));
      }
      toast.success("user created successfully");
      console.log(data, "reg");
      return data;
    } catch (error) {
      const message = formatErrorResponse(error);
      console.log(error, "error");
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logoutAction = createAsyncThunk(
  "auth/logout",
  async (thunkAPI) => {
    try {
      const data = await AuthService.logout();
      if (data?.data) {
        localStorage.removeItem("token");
        toast.success("user logged out successfully");
      }
      console.log(data, "reg");
    } catch (error) {
      const message = formatErrorResponse(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const token = localStorage.getItem("token");

const initialState = token
  ? { isAuthenticated: true, isLoading: false }
  : { isAuthenticated: false, isLoading: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login actions
    builder.addCase(loginAction.pending, (state) => {
      state.isLoading = true;
      state.isAuthenticated = false;
    });
    builder.addCase(loginAction.fulfilled, (state) => {
      state.isAuthenticated = true;
      state.isLoading = false;
    });
    builder.addCase(loginAction.rejected, (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
    });

    // Register actions
    builder.addCase(registerAction.pending, (state) => {
      state.isLoading = true;
      state.isAuthenticated = false;
    });
    builder.addCase(registerAction.fulfilled, (state) => {
      state.isAuthenticated = true;
      state.isLoading = false;
    });
    builder.addCase(registerAction.rejected, (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
    });

    // Logout actions
    builder.addCase(logoutAction.pending, (state) => {
      state.isLoading = true;
      state.isAuthenticated = false;
    });
    builder.addCase(logoutAction.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
    });
    builder.addCase(logoutAction.rejected, (state) => {
      state.isAuthenticated = true;
      state.isLoading = false;
    });
  },
});

const { reducer } = authSlice;
export default reducer;
