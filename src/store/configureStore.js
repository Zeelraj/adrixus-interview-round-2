import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/auth/authSlice";
import userReducer from "../reducers/user/userSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});
