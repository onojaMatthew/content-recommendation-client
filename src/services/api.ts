import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosRequestConfig, AxiosResponse } from 'axios';
import { RootState } from "../types/storeType";
import { store } from '@/store/store';
import { resetAuthState } from "../store/slices/authSlice";


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

// Create axios instance with base URL
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable if you're using HTTP-only cookies
});

// Request interceptor to add auth token to requests
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = store.getState().auth.token || localStorage.getItem('token');

    if (token && config.headers && typeof config.headers.set === 'function') {
      config.headers.set('Authorization', `Bearer ${token}`);
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    
    // Handle 401 Unauthorized responses
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
       
        store.dispatch(resetAuthState());
        localStorage.removeItem('token');
        window.location.href = '/auth/login';
        return Promise.reject(error);
      } catch (refreshError) {
        store.dispatch(resetAuthState());
        localStorage.removeItem('token');
        window.location.href = '/auth/login';
        return Promise.reject(error);
      }
    }
    
    // Handle other error statuses
    if (error.response) {
      switch (error.response.status) {
        case 400:
          console.error('Bad Request:', error.response.data);
          break;
        case 403:
          console.error('Forbidden:', error.response.data);
          break;
        case 404:
          console.error('Not Found:', error.response.data);
          break;
        case 500:
          console.error('Server Error:', error.response.data);
          break;
        default:
          console.error('Unknown Error:', error.response.data);
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Request setup error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Helper function to extract error message
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || 'An API error occurred';
  }
  return error instanceof Error ? error.message : 'Unknown error occurred';
}

export default api;