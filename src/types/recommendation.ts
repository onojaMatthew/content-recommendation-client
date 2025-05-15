import { SaasProduct } from './saas';
import { UserPreferences } from './user';

export interface RecommendationFilters {
  categories?: string[];
  priceRange?: [number, number];
  minRating?: number;
  mustHaveFeatures?: string[];
  deploymentType?: 'cloud' | 'self-hosted' | 'hybrid';
  teamSize?: 'individual' | 'small-team' | 'enterprise';
}

export interface RecommendationResult {
  products: SaasProduct[];
  filtersApplied: RecommendationFilters;
  matchScore: number;
  generatedAt: string;
}

export interface RecommendationRequest {
  preferences: UserPreferences;
  filters?: RecommendationFilters;
  limit?: number;
}