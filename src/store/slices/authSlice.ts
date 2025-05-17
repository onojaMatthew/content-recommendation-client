import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';
import { LoginCredentials, RegisterCredentials, AuthResponse } from '../../types/auth';
import { User } from '../../types/user';
import { AppDispatch, RootState } from '../../types/storeType';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  success: boolean;
  business: any;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  business: null,
  token: null,
  loading: false,
  success: false,
  error: null,
};

// Helper to save token to localStorage
const saveToken = (token: object) => {
  if (typeof window !== 'undefined') {
    // safe to use browser features
    localStorage.setItem('token', JSON.stringify(token));
  }
 
};

// Async thunk for user registration
export const signup = createAsyncThunk<
  AuthResponse,
  RegisterCredentials,
  { rejectValue: string }
>(
  'auth/signup',
  async (data, { rejectWithValue }) => {
    try {
      let response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "ACCEPT": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      const resp: AuthResponse = await response.json()
      saveToken(resp);
      return resp;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

// Async thunk for user login
export const login = createAsyncThunk<
  AuthResponse,
  LoginCredentials,
  { rejectValue: string }
>(
  'auth/login',
  async (data, { rejectWithValue }) => {
    console.log(data, " the data in the action")
    try {
      let response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      
      const resp: AuthResponse = await response.json();
      saveToken(resp);
      return resp;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Async thunk for fetching user profile
export const fetchUserProfile = createAsyncThunk<
  User,
  void,
  { state: RootState; rejectValue: string }
>(
  'auth/fetchUserProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await api.get('/auth/me');
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

// Async thunk for logout
export const logout = createAsyncThunk<void, void, { dispatch: AppDispatch }>(
  'auth/logout',
  async (_, { dispatch }) => {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('token');
      dispatch(resetAuthState());
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    resetAuthState: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.data.user;
        state.business = action.payload.data.business;
        state.token = action.payload.token;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || 'Registration failed';
      })
      
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.data.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || 'Login failed';
      })
      
      // Fetch Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch profile';
      })
      
      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setCredentials, resetAuthState, clearError } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;

export default authSlice.reducer;