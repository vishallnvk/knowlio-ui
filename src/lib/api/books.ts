import { api } from './client';
import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from '@tanstack/react-query';

// Book interface
export interface Book {
  isbn: string;
  description: string;
  categories: string[];
  publisher: string;
  title: string;
  authors: string[];
  publishedDate: string;
  selected?: boolean; // For UI selection
}

// Add book payload interface
export interface AddBookPayload {
  type: 'BOOK';
  isbn: string;
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
 * Add a single book to the user's library - base API function
 * @param isbn - ISBN of the book to add
 * @returns Promise with the response
 */
export const addBook = async (isbn: string): Promise<AddBooksResponse> => {
  const payload: AddBookPayload = {
    type: 'BOOK',
    isbn: isbn
  };

  return api.post<AddBooksResponse>(
    '/prod/content/metadata/upload',
    payload
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
 * React Query hook for adding a single book
 * @returns UseMutationResult for adding a book
 */
export const useAddBook = (): UseMutationResult<AddBooksResponse, Error, string> => {
  const queryClient = useQueryClient();
  
  return useMutation<AddBooksResponse, Error, string>({
    mutationFn: (isbn) => addBook(isbn),
    onSuccess: () => {
      // Invalidate relevant queries when books are added
      queryClient.invalidateQueries({ queryKey: ['content'] });
    },
  });
};

// Export default
export default {
  searchBookByIsbn,
  addBook,
  useBookSearch,
  useAddBook
};
