export interface UserPreferences {
  budget?: {
    min?: number;
    max?: number;
  };
  categories?: string[];
  mustHaveFeatures?: string[];
  deployment?: 'cloud' | 'self-hosted' | 'hybrid';
  teamSize?: 'individual' | 'small-team' | 'enterprise';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfileUpdate {
  name?: string;
  avatar?: string;
  preferences?: UserPreferences;
}