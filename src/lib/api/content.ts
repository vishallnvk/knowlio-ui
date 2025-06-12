import { api } from './client';
import { useInfiniteQuery } from '@tanstack/react-query';

// Content metadata interface
export interface ContentMetadata {
  format: string;
  pages: string;
  isbn: string;
}

// Content item interface
export interface Content {
  metadata: ContentMetadata;
  created_at: string;
  licensing_status: string;
  rag_status: string;
  status: string;
  content_id: string;
  file_key: string | null;
  training_status: string;
  updated_at: string | null;
  description: string;
  publisher_id: string;
  tags: string[];
  type: string;
  title: string;
}

// Pagination interface
export interface Pagination {
  next_token: string;
  has_more: boolean;
}

// Content filter response interface
export interface ContentFilterResponse {
  contents: Content[];
  count: number;
  total_scanned: number;
  pagination: Pagination;
}

// Content filter request interface (optional - for type safety on request payload)
export interface ContentFilterRequest {
  // Add filter parameters as needed
  type?: string;
  status?: string;
  tags?: string[];
  publisher_id?: string;
  limit?: number;
  next_token?: string;
  [key: string]: any; // Allow additional filter parameters
}

/**
 * Filter content using the /prod/content/filter endpoint
 * @param filters - Optional filter parameters
 * @returns Promise with filtered content response
 */
export const filterContent = async (
  filters?: ContentFilterRequest
): Promise<ContentFilterResponse> => {
  return api.post<ContentFilterResponse, ContentFilterRequest>(
    '/prod/content/search',
    filters
  );
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
        pagination_token: pageParam as string | undefined,
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
