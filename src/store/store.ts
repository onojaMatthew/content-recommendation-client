import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./slices/authSlice";


// Create the Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});





