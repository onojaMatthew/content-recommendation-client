import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';
import { SaasProduct } from '../../types/saas';
import { UserPreferences } from '../../types/user';
import { RootState } from '@/types/storeType';

interface RecommendationState {
  recommendations: SaasProduct[];
  loading: boolean;
  error: string | null;
  filters: {
    categories: string[];
    priceRange: [number, number];
    rating: number;
  };
}

const initialState: RecommendationState = {
  recommendations: [],
  loading: false,
  error: null,
  filters: {
    categories: [],
    priceRange: [0, 1000],
    rating: 0,
  },
};

// Async thunk for fetching recommendations
export const fetchRecommendations = createAsyncThunk<
  SaasProduct[],
  UserPreferences,
  { state: RootState; rejectValue: string }
>(
  'recommendations/fetch',
  async (preferences, { getState, rejectWithValue }) => {
    try {
      const { filters } = getState().recommendations;
      const response = await api.post('/recommendations', {
        preferences,
        filters,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch recommendations');
    }
  }
);

// Async thunk for saving user preferences
export const savePreferences = createAsyncThunk<
  UserPreferences,
  UserPreferences,
  { rejectValue: string }
>(
  'recommendations/savePreferences',
  async (preferences, { rejectWithValue }) => {
    try {
      const response = await api.put('/user/preferences', preferences);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to save preferences');
    }
  }
);

const recommendationSlice = createSlice({
  name: 'recommendations',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<RecommendationState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearRecommendationsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Recommendations
      .addCase(fetchRecommendations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        state.recommendations = action.payload;
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch recommendations';
      })
      
      // Save Preferences
      .addCase(savePreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(savePreferences.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(savePreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to save preferences';
      });
  },
});

export const { setFilters, resetFilters, clearRecommendationsError } = recommendationSlice.actions;

export const selectRecommendations = (state: RootState) => state.recommendations.recommendations;
export const selectRecommendationsLoading = (state: RootState) => state.recommendations.loading;
export const selectRecommendationsError = (state: RootState) => state.recommendations.error;
export const selectRecommendationFilters = (state: RootState) => state.recommendations.filters;

export default recommendationSlice.reducer;