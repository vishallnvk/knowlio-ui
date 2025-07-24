import { api } from './client';
import { useInfiniteQuery } from '@tanstack/react-query';

// Content item interface
export interface Content {
  created_at: string;
  licensing_status: string;
  rag_status: string;
  isbn: string;
  content_id: string;
  training_status: string;
  publisher: string;
  thumbnail_url?: string;
  small_thumbnail_url?: string;
  keywords: string[];
  year: string;
  insert_time: string;
  publisher_id: string;
  type: string;
  title: string;
  authors: string[];
  // Optional fields that might be present in some responses
  status?: string;
  file_key?: string | null;
  updated_at?: string | null;
  description?: string;
  tags?: string[];
  metadata?: {
    format?: string;
    pages?: string;
    isbn?: string;
  };
}

// Pagination interface
export interface Pagination {
  next_token: string;
  has_more: boolean;
}

// API response wrapper interface
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  metadata: {
    timestamp: string;
    request_id: string;
    pagination?: Pagination;
  };
}

// Content filter response interface
export interface ContentFilterResponse {
  items: Content[];
  count: number;
  total_scanned: number;
  pagination?: Pagination;
}

// Content parameters interface for UI components
export interface ContentParams {
  type: string;
  year?: string;
  title?: string;
  licensing_status?: string;
  authors?: string;
  publisher?: string;
  limit: number;
}

// Content filter request interface (optional - for type safety on request payload)
export interface ContentFilterRequest {
  // Add filter parameters as needed
  type?: string;
  year?: number | string;
  title?: string;
  licensing_status?: string;
  limit?: number;
  next_token?: string;
  [key: string]: any; // Allow additional filter parameters
}

/**
 * Filter content using the /prod/content/search endpoint
 * @param filters - Optional filter parameters
 * @returns Promise with filtered content response
 */
export const filterContent = async (
  filters?: ContentFilterRequest
): Promise<ContentFilterResponse> => {
  const response = await api.post<ApiResponse<ContentFilterResponse>, ContentFilterRequest>(
    '/prod/content/search',
    filters
  );
  
  // Extract pagination from metadata and include it in the response
  const result = response.data;
  if (response.metadata?.pagination) {
    result.pagination = response.metadata.pagination;
  }
  
  return result;
};

/**
 * Custom hook for infinite content querying with pagination
 * @param filters - Filter parameters for content search
 * @returns useInfiniteQuery result with content data and pagination
 */
export const useContent = (
  filters?: Omit<ContentFilterRequest, 'next_token'>
) => {
  return useInfiniteQuery<ContentFilterResponse, Error>({
    queryKey: ['content', filters],
    queryFn: async ({ pageParam }) => {
      const requestFilters: ContentFilterRequest = {
        ...filters,
        next_token: pageParam as string | undefined,
      };
      return await filterContent(requestFilters);
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage?.pagination?.has_more
        ? lastPage.pagination.next_token
        : undefined,
    getPreviousPageParam: () => undefined,
  });
};
// Export default
export default {
  filterContent,
  useContent,
};
