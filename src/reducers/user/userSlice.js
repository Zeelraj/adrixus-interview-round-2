import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { usersListService } from "../../Services/userService";

const initialState = {
  loading: false,
  users: [],
  isError: false,
  success: false,
  message: "",
};

// Authenticate User
export const usersList = createAsyncThunk(
  "user/users/all",
  async (user, thunkAPI) => {
    try {
      return await usersListService();
    } catch (isError) {
      const message = "No Users Fetched..!!";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
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
      // For Authentication
      .addCase(usersList.pending, (state) => {
        state.loading = true;
      })
      .addCase(usersList.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.users = action.payload.users;
        } else {
          state.isError = true;
          state.message = action.payload.message;
          state.users = [];
        }
      })
      .addCase(usersList.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.users = [];
      });
  },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
