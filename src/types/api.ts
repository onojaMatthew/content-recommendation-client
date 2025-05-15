export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ErrorResponse {
  message: string;
  statusCode: number;
  error?: string;
  validationErrors?: {
    field: string;
    message: string;
  }[];
}

export interface ListQueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  filter?: string;
  search?: string;
}