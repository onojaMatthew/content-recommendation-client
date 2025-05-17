import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./slices/authSlice";
import recommendations from "./slices/recommendationSlice";
import user from "./slices/userSlice";

// Create the Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    recommendations,
    user
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});





