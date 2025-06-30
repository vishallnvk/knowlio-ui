import { api } from './client';
import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from '@tanstack/react-query';

// Book interface
export interface Book {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  isbn: string;
  categories: string[];
}

// The API returns a single book directly, not wrapped in a response object
export type BookSearchResponse = Book;

// Fields to request from the API
export type BookField = 'title' | 'authors' | 'publisher' | 'publishedDate' | 'description' | 'isbn' | 'categories';

// Add books response interface
export interface AddBooksResponse {
  success: boolean;
  message: string;
}

/**
 * Search for books by ISBN - base API function
 * @param isbn - The ISBN to search for
 * @param fields - Optional array of fields to include in the response
 * @returns Promise with the book search response
 */
export const searchBookByIsbn = async (
  isbn: string,
  fields: BookField[] = ['title', 'authors', 'publisher', 'publishedDate', 'description', 'isbn', 'categories']
): Promise<BookSearchResponse> => {
  // Clean the ISBN (remove hyphens and spaces)
  const cleanedIsbn = isbn.replace(/[-\s]/g, '');
  
  return api.post<BookSearchResponse>(
    `/prod/books/filtered/${cleanedIsbn}`,
    {
      fields
    }
  );
};

/**
 * Add books to the user's library - base API function
 * @param books - Array of books to add
 * @returns Promise with the response
 */
export const addBooks = async (books: Omit<Book, 'id'>[]): Promise<AddBooksResponse> => {
  return api.post<AddBooksResponse>(
    '/prod/books/add',
    {
      books
    }
  );
};

/**
 * React Query hook for searching books by ISBN
 * @param isbn - The ISBN to search for
 * @param fields - Optional array of fields to include in the response
 * @param options - Optional React Query options
 * @returns UseQueryResult with book search data
 */
export const useBookSearch = (
  isbn: string,
  fields: BookField[] = ['title', 'authors', 'publisher', 'publishedDate', 'description', 'isbn', 'categories'],
  options: { enabled?: boolean } = {}
): UseQueryResult<BookSearchResponse, Error> => {
  return useQuery<BookSearchResponse, Error>({
    queryKey: ['book', 'search', isbn, fields],
    queryFn: () => searchBookByIsbn(isbn, fields),
    enabled: !!isbn && options.enabled !== false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * React Query hook for adding books
 * @returns UseMutationResult for adding books
 */
export const useAddBooks = (): UseMutationResult<AddBooksResponse, Error, Omit<Book, 'id'>[]> => {
  const queryClient = useQueryClient();
  
  return useMutation<AddBooksResponse, Error, Omit<Book, 'id'>[]>({
    mutationFn: (books) => addBooks(books),
    onSuccess: () => {
      // Invalidate relevant queries when books are added
      queryClient.invalidateQueries({ queryKey: ['content'] });
    },
  });
};

// Export default
export default {
  searchBookByIsbn,
  addBooks,
  useBookSearch,
  useAddBooks
};
