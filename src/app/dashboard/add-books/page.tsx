'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useBookSearch, useAddBooks, searchBookByIsbn, addBooks, Book as ApiBook } from '@/lib/api/books';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
  Divider,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  FormHelperText
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useRouter } from 'next/navigation';

interface Book {
  id?: string;
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  isbn: string;
  categories: string[];
  selected?: boolean;
}

export default function AddBooksPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [isbn, setIsbn] = useState('');
  const [isbnError, setIsbnError] = useState('');
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isLoadingCsv, setIsLoadingCsv] = useState(false);
  
  // React Query hooks
  const { 
    data: bookSearchData, 
    isLoading: isSearchLoading, 
    error: searchError 
  } = useBookSearch(isbn, undefined, { enabled: searchEnabled });
  
  const { 
    mutate: addBooksToLibrary, 
    isPending: isAddingBooks,
    isSuccess: addSuccess,
    error: addError
  } = useAddBooks();
  
  // Combined loading state
  const isLoading = isSearchLoading || isAddingBooks || isLoadingCsv;
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<Book[]>([]);
  const [csvErrors, setCsvErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    // Clear data when switching tabs
    setIsbn('');
    setIsbnError('');
    setSearchResults([]);
    setSelectedBooks([]);
    setCsvFile(null);
    setCsvData([]);
    setCsvErrors([]);
    setSuccessMessage('');
  };

  const validateIsbn = (value: string) => {
    // Basic ISBN validation - should be 10 or 13 digits
    const cleanedIsbn = value.replace(/[-\s]/g, '');
    if (!/^\d{10}(\d{3})?$/.test(cleanedIsbn)) {
      setIsbnError('ISBN must be 10 or 13 digits');
      return false;
    }
    setIsbnError('');
    return true;
  };

  // Effect to update search results when data is available
  useEffect(() => {
    if (bookSearchData && searchEnabled) {
      // The API returns a single book directly
      const bookWithSelected: Book = {
        ...bookSearchData,
        selected: false
      };
      
      setSearchResults([bookWithSelected]);
      setSearchEnabled(false); // Reset for next search
    }
  }, [bookSearchData, searchEnabled]);

  // Effect to handle search errors
  useEffect(() => {
    if (searchError) {
      setIsbnError('Failed to fetch book information. Please try again.');
      setSearchEnabled(false);
    }
  }, [searchError]);

  const searchIsbn = () => {
    if (!validateIsbn(isbn)) return;
    
    setSearchResults([]);
    setSuccessMessage('');
    setSearchEnabled(true); // Enable the query
  };

  const handleBookSelection = (index: number) => {
    const updatedResults = [...searchResults];
    updatedResults[index].selected = !updatedResults[index].selected;
    setSearchResults(updatedResults);
  };

  const handleSelectAll = () => {
    const allSelected = searchResults.every(book => book.selected);
    const updatedResults = searchResults.map(book => ({
      ...book,
      selected: !allSelected
    }));
    setSearchResults(updatedResults);
  };

  const addSelectedBooks = async () => {
    const booksToAdd = searchResults.filter(book => book.selected);
    if (booksToAdd.length === 0) {
      setIsbnError('Please select at least one book to add');
      return;
    }
    
    // Use the React Query mutation
    addBooksToLibrary(booksToAdd, {
      onSuccess: () => {
        setSuccessMessage(`Successfully added ${booksToAdd.length} book(s) to your library`);
        setSearchResults([]);
        setIsbn('');
      },
      onError: (error) => {
        console.error('Error adding books:', error);
        setIsbnError('Failed to add books. Please try again.');
      }
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setCsvFile(file);
    setCsvErrors([]);
    setCsvData([]);
    
    // Read and parse CSV file
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      parseCsvContent(content);
    };
    reader.readAsText(file);
  };

  const parseCsvContent = (content: string) => {
    const lines = content.split('\n');
    if (lines.length < 2) {
      setCsvErrors(['CSV file must contain a header row and at least one data row']);
      return;
    }
    
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const requiredFields = ['title', 'authors', 'publisher', 'publisheddate', 'isbn'];
    
    // Validate headers
    const missingFields = requiredFields.filter(field => !headers.includes(field));
    if (missingFields.length > 0) {
      setCsvErrors([`CSV is missing required columns: ${missingFields.join(', ')}`]);
      return;
    }
    
    const parsedData: Book[] = [];
    const errors: string[] = [];
    
    // Parse data rows
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue; // Skip empty lines
      
      const values = lines[i].split(',').map(v => v.trim());
      if (values.length !== headers.length) {
        errors.push(`Row ${i} has ${values.length} columns, expected ${headers.length}`);
        continue;
      }
      
      const book: any = {};
      headers.forEach((header, index) => {
        if (header === 'authors' || header === 'categories') {
          // Parse arrays from pipe-separated values
          book[header] = values[index] ? values[index].split('|') : [];
        } else {
          book[header] = values[index];
        }
      });
      
      // Validate ISBN
      if (!/^\d{10}(\d{3})?$/.test(book.isbn.replace(/[-\s]/g, ''))) {
        errors.push(`Row ${i}: Invalid ISBN "${book.isbn}"`);
      }
      
      parsedData.push(book as Book);
    }
    
    setCsvData(parsedData);
    setCsvErrors(errors);
  };

  const uploadCsvData = async () => {
    if (csvErrors.length > 0) {
      return;
    }
    
    if (csvData.length === 0) {
      setCsvErrors(['No valid data to upload']);
      return;
    }
    
    setIsLoadingCsv(true);
    
    try {
      // Use the React Query mutation
      addBooksToLibrary(csvData, {
        onSuccess: () => {
          setSuccessMessage(`Successfully added ${csvData.length} book(s) to your library`);
          setCsvData([]);
          setCsvFile(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
          setIsLoadingCsv(false);
        },
        onError: (error) => {
          console.error('Error uploading CSV data:', error);
          setCsvErrors(['Failed to add books from CSV. Please try again.']);
          setIsLoadingCsv(false);
        }
      });
    } catch (error) {
      console.error('Error uploading CSV data:', error);
      setCsvErrors(['Failed to add books from CSV. Please try again.']);
      setIsLoadingCsv(false);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={() => router.push('/dashboard')} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1">
          Add Books
        </Typography>
      </Box>

      <Paper sx={{ mb: 4 }}>
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="ISBN Search" />
          <Tab label="CSV Import" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {activeTab === 0 ? (
            // ISBN Search Tab
            <Box>
              <Typography variant="h6" gutterBottom>
                Search by ISBN
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Enter an ISBN to search for book information. You can add found books to your library.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <TextField
                  label="ISBN"
                  variant="outlined"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                  placeholder="Enter 10 or 13 digit ISBN"
                  error={!!isbnError}
                  helperText={isbnError}
                  sx={{ flexGrow: 1 }}
                />
                <Button
                  variant="contained"
                  onClick={searchIsbn}
                  disabled={isLoading || !isbn.trim()}
                >
                  Search
                </Button>
              </Box>

              {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                  <CircularProgress />
                </Box>
              )}

              {successMessage && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  {successMessage}
                </Alert>
              )}

              {searchResults.length > 0 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Search Results
                  </Typography>
                  <TableContainer component={Paper} sx={{ mb: 3 }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell padding="checkbox">
                            <Checkbox
                              indeterminate={
                                searchResults.some(book => book.selected) && 
                                !searchResults.every(book => book.selected)
                              }
                              checked={searchResults.every(book => book.selected)}
                              onChange={handleSelectAll}
                            />
                          </TableCell>
                          <TableCell>Title</TableCell>
                          <TableCell>Author(s)</TableCell>
                          <TableCell>Publisher</TableCell>
                          <TableCell>Published</TableCell>
                          <TableCell>ISBN</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {searchResults.map((book, index) => (
                          <TableRow key={index}>
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={book.selected || false}
                                onChange={() => handleBookSelection(index)}
                              />
                            </TableCell>
                            <TableCell>{book.title}</TableCell>
                            <TableCell>{book.authors.join(', ')}</TableCell>
                            <TableCell>{book.publisher}</TableCell>
                            <TableCell>{book.publishedDate}</TableCell>
                            <TableCell>{book.isbn}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="contained"
                      onClick={addSelectedBooks}
                      disabled={isLoading || !searchResults.some(book => book.selected)}
                    >
                      Add Selected Books
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          ) : (
            // CSV Import Tab
            <Box>
              <Typography variant="h6" gutterBottom>
                Import Books from CSV
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Upload a CSV file with book information. The CSV must include columns for: title, authors, publisher, publishedDate, and isbn.
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                For authors and categories columns, use pipe (|) to separate multiple values.
                <Button 
                  variant="text" 
                  size="small" 
                  component="a" 
                  href="/sample-books.csv" 
                  download
                  sx={{ ml: 1 }}
                >
                  Download Sample CSV
                </Button>
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, border: '2px dashed #ccc', borderRadius: 2, mb: 3 }}>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                />
                <Button
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  onClick={() => fileInputRef.current?.click()}
                  sx={{ mb: 2 }}
                >
                  Select CSV File
                </Button>
                {csvFile && (
                  <Typography>
                    Selected: {csvFile.name}
                  </Typography>
                )}
              </Box>

              {csvErrors.length > 0 && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  <Typography variant="subtitle2">CSV Validation Errors:</Typography>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {csvErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </Alert>
              )}

              {successMessage && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  {successMessage}
                </Alert>
              )}

              {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                  <CircularProgress />
                </Box>
              )}

              {csvData.length > 0 && !isLoading && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    CSV Preview ({csvData.length} books)
                  </Typography>
                  <TableContainer component={Paper} sx={{ mb: 3, maxHeight: 400 }}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell>Title</TableCell>
                          <TableCell>Author(s)</TableCell>
                          <TableCell>Publisher</TableCell>
                          <TableCell>Published</TableCell>
                          <TableCell>ISBN</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {csvData.map((book, index) => (
                          <TableRow key={index}>
                            <TableCell>{book.title}</TableCell>
                            <TableCell>{book.authors.join(', ')}</TableCell>
                            <TableCell>{book.publisher}</TableCell>
                            <TableCell>{book.publishedDate}</TableCell>
                            <TableCell>{book.isbn}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="contained"
                      onClick={uploadCsvData}
                      disabled={isLoading || csvErrors.length > 0}
                    >
                      Import All Books
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
