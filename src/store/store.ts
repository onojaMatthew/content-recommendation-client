import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./slices/authSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';

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

// Infer types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks for usage in components
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
