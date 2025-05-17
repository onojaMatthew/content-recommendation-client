import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';
import { User, UserProfileUpdate, UserPreferences } from '../../types/user';
import { RootState } from '@/types/storeType';

interface UserState {
  profile: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
};

// Async thunk for updating user profile
export const updateUserProfile = createAsyncThunk<
  User,
  UserProfileUpdate,
  { state: RootState; rejectValue: string }
>(
  'user/updateProfile',
  async (profileData, { getState, rejectWithValue }) => {
    try {
      const response = await api.put('/user/profile', profileData);
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);

// Async thunk for updating preferences
export const updateUserPreferences = createAsyncThunk<
  UserPreferences,
  UserPreferences,
  { state: RootState; rejectValue: string }
>(
  'user/updatePreferences',
  async (preferences, { rejectWithValue }) => {
    try {
      const response = await api.put('/user/preferences', preferences);
      return response.data.preferences;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update preferences');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<User>) => {
      state.profile = action.payload;
    },
    clearUserError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update profile';
      })
      
      // Update Preferences
      .addCase(updateUserPreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserPreferences.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile) {
          state.profile.preferences = action.payload;
        }
      })
      .addCase(updateUserPreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update preferences';
      });
  },
});

export const { setUserProfile, clearUserError } = userSlice.actions;

export const selectUserProfile = (state: RootState) => state.user.profile;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;
export const selectUserPreferences = (state: RootState) => state.user.profile?.preferences;

export default userSlice.reducer;