export interface Price {
  monthly: number;
  annual: number;
  currency?: string;
}

export interface Feature {
  name: string;
  available: boolean;
  description?: string;
}

export interface Review {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Integration {
  name: string;
  type: string;
  supported: boolean;
}

export interface SaasProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  logo: string;
  website: string;
  rating: number;
  totalReviews: number;
  categories: string[];
  tags: string[];
  price: Price;
  features: Feature[];
  integrations: Integration[];
  reviews?: Review[];
  createdAt: string;
  updatedAt: string;
}

export interface SaasListing {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  logo: string;
  rating: number;
  price: Price;
  categories: string[];
}

export interface SaasComparison {
  id: string;
  name: string;
  logo: string;
  features: {
    name: string;
    value: boolean | string;
  }[];
}