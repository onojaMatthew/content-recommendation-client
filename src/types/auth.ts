import { User } from "./user";

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  businessName: string;
}

export interface AuthResponse {
  success: boolean;
  data: object;
  user: User;
  token: string;
  message: string;
}