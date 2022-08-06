import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  authenticationService,
  loginService,
  logoutService,
  registerService,
} from "../../Services/authService";

const initialState = {
  loading: false,
  user: null, // for user object
  isError: false,
  success: false, // for monitoring the registration process.
  isAuthenticated: false,
  message: "",
};

// Register User
export const registerUser = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await registerService(user);
    } catch (isError) {
      const message = "Not Registered..!!";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout User
export const loginUser = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      return await loginService(user);
    } catch (isError) {
      const message = "Not Logged Out..!!";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Authenticate User
export const authenticateUser = createAsyncThunk(
  "auth/authenticate",
  async (user, thunkAPI) => {
    try {
      return await authenticationService();
    } catch (isError) {
      const message = "Not Authenticated..!!";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout User
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (user, thunkAPI) => {
    try {
      return await logoutService();
    } catch (isError) {
      const message = "Not Logged Out..!!";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.isError = false;
      state.success = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // For Registration
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.success = action.payload.success;
          state.isAuthenticated = action.payload.isAuthenticated;
          state.user = action.payload.user;
          localStorage.setItem("token", action.payload.token);
          window.location.reload();
        } else {
          state.isError = true;
          state.message = action.payload.message;
          state.user = null;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.user = null;
      })
      // For Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.success = action.payload.success;
          state.isAuthenticated = action.payload.isAuthenticated;
          state.user = action.payload.user;
          localStorage.setItem("token", action.payload.token);
          window.location.reload();
        } else {
          state.isError = true;
          state.message = action.payload.message;
          state.user = null;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.user = null;
      })
      // For Authentication
      .addCase(authenticateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.isAuthenticated = action.payload.isAuthenticated;
          state.user = action.payload.user;
        } else {
          state.isError = true;
          state.message = action.payload.message;
          state.user = null;
        }
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.user = null;
      })
      // For Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.isAuthenticated = false;
          state.user = null;
          localStorage.removeItem("token");
          window.location.reload();
        } else {
          state.isError = true;
          state.message = action.payload.message;
          state.user = null;
        }
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
