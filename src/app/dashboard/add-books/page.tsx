"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  useBookSearch,
  useAddBook,
  searchBookByIsbn,
  addBook,
  Book,
} from "@/lib/api/books";
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
  FormHelperText,
  Chip,
} from "@mui/material";
import LoadingSpinner from "@/components/LoadingSpinner";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { useRouter } from "next/navigation";

interface BookWithSelection extends Book {
  selected?: boolean;
}

interface CsvBookRecord {
  isbn: string;
  status: "loading" | "ready" | "error" | "adding" | "success" | "failed";
  book?: Book;
  error?: string;
}

export default function AddBooksPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [isbn, setIsbn] = useState("");
  const [isbnError, setIsbnError] = useState("");
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [searchResults, setSearchResults] = useState<BookWithSelection[]>([]);
  const [isLoadingCsv, setIsLoadingCsv] = useState(false);

  // React Query hooks
  const {
    data: bookSearchData,
    isLoading: isSearchLoading,
    error: searchError,
  } = useBookSearch(isbn, undefined, { enabled: searchEnabled });

  const {
    mutate: addBookToLibrary,
    isPending: isAddingBooks,
    isSuccess: addSuccess,
    error: addError,
  } = useAddBook();

  // Combined loading state
  const isLoading = isSearchLoading || isAddingBooks || isLoadingCsv;
  const [selectedBooks, setSelectedBooks] = useState<BookWithSelection[]>([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvRecords, setCsvRecords] = useState<CsvBookRecord[]>([]);
  const [csvErrors, setCsvErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [csvSuccessCount, setCsvSuccessCount] = useState(0);
  const [csvErrorCount, setCsvErrorCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    // Clear data when switching tabs
    setIsbn("");
    setIsbnError("");
    setSearchResults([]);
    setSelectedBooks([]);
    setCsvFile(null);
    setCsvRecords([]);
    setCsvErrors([]);
    setSuccessMessage("");
  };

  const validateIsbn = (value: string) => {
    // Basic ISBN validation - should be 10 or 13 digits
    const cleanedIsbn = value.replace(/[-\s]/g, "");
    if (!/^\d{10}(\d{3})?$/.test(cleanedIsbn)) {
      setIsbnError("ISBN must be 10 or 13 digits");
      return false;
    }
    setIsbnError("");
    return true;
  };

  // Effect to update search results when data is available
  useEffect(() => {
    if (bookSearchData && searchEnabled) {
      // The API returns a single book directly
      const bookWithSelected: BookWithSelection = {
        ...bookSearchData,
        selected: false,
      };

      setSearchResults([bookWithSelected]);
      setSearchEnabled(false); // Reset for next search
    }
  }, [bookSearchData, searchEnabled]);

  // Effect to handle search errors
  useEffect(() => {
    if (searchError) {
      setIsbnError("Failed to fetch book information. Please try again.");
      setSearchEnabled(false);
    }
  }, [searchError]);

  const searchIsbn = () => {
    if (!validateIsbn(isbn)) return;

    setSearchResults([]);
    setSuccessMessage("");
    setSearchEnabled(true); // Enable the query
  };

  const handleBookSelection = (index: number) => {
    const updatedResults = [...searchResults];
    updatedResults[index].selected = !updatedResults[index].selected;
    setSearchResults(updatedResults);
  };

  const handleSelectAll = () => {
    const allSelected = searchResults.every((book) => book.selected);
    const updatedResults = searchResults.map((book) => ({
      ...book,
      selected: !allSelected,
    }));
    setSearchResults(updatedResults);
  };

  const addSelectedBooks = async () => {
    const booksToAdd = searchResults.filter((book) => book.selected);
    if (booksToAdd.length === 0) {
      setIsbnError("Please select at least one book to add");
      return;
    }

    setSuccessMessage(`Processing ${booksToAdd.length} book(s)...`);
    
    let successCount = 0;
    let errorCount = 0;
    const totalBooks = booksToAdd.length;

    // Add books one by one
    for (const book of booksToAdd) {
      try {
        await new Promise<void>((resolve, reject) => {
          addBookToLibrary(book.isbn, {
            onSuccess: () => {
              successCount++;
              console.log(`Successfully added book: ${book.title}`);
              
              // Update progress message
              if (successCount + errorCount === totalBooks) {
                // All books processed
                if (errorCount === 0) {
                  setSuccessMessage(`Successfully added ${successCount} book(s) to your library`);
                } else {
                  setSuccessMessage(`Added ${successCount} out of ${totalBooks} book(s) successfully`);
                }
              } else {
                // Still processing
                setSuccessMessage(`Processing ${booksToAdd.length} book(s)... (${successCount + errorCount}/${totalBooks} completed)`);
              }
              
              resolve();
            },
            onError: (error: any) => {
              errorCount++;
              console.error("Error adding book:", error);
              
              // Update progress message
              if (successCount + errorCount === totalBooks) {
                // All books processed
                if (successCount === 0) {
                  setIsbnError(`Failed to add all books`);
                  setSuccessMessage("");
                } else {
                  setSuccessMessage(`Added ${successCount} out of ${totalBooks} book(s) successfully`);
                }
              } else {
                // Still processing
                setSuccessMessage(`Processing ${booksToAdd.length} book(s)... (${successCount + errorCount}/${totalBooks} completed)`);
              }
              
              resolve(); // Don't reject, just continue with next book
            },
          });
        });
      } catch (error) {
        // This shouldn't happen since we resolve in both success and error cases
        console.error("Unexpected error:", error);
      }
    }

    // Clear search results and ISBN after processing
    setSearchResults([]);
    setIsbn("");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setCsvFile(file);
    setCsvErrors([]);
    setCsvRecords([]);

    // Read and parse CSV file
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      parseCsvContent(content);
    };
    reader.readAsText(file);
  };

  const parseCsvContent = async (content: string) => {
    const lines = content.split("\n");
    if (lines.length < 2) {
      setCsvErrors([
        "CSV file must contain a header row and at least one data row",
      ]);
      return;
    }

    const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());

    // Only require ISBN column
    if (!headers.includes("isbn")) {
      setCsvErrors(['CSV must contain an "isbn" column']);
      return;
    }

    const isbnIndex = headers.indexOf("isbn");
    const isbns: string[] = [];
    const errors: string[] = [];

    // Parse ISBN values
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue; // Skip empty lines

      const values = lines[i].split(",").map((v) => v.trim());
      if (values.length <= isbnIndex) {
        errors.push(`Row ${i}: Missing ISBN value`);
        continue;
      }

      const isbn = values[isbnIndex];

      // Validate ISBN
      if (!/^\d{10}(\d{3})?$/.test(isbn.replace(/[-\s]/g, ""))) {
        errors.push(`Row ${i}: Invalid ISBN "${isbn}"`);
        continue;
      }

      isbns.push(isbn);
    }

    if (errors.length > 0) {
      setCsvErrors(errors);
      return;
    }

    // Initialize records with loading status
    const initialRecords: CsvBookRecord[] = isbns.map((isbn) => ({
      isbn,
      status: "loading",
    }));
    setCsvRecords(initialRecords);

    // Search for each book by ISBN and update status in real-time
    for (let i = 0; i < isbns.length; i++) {
      const isbn = isbns[i];
      try {
        const book = await searchBookByIsbn(isbn);
        setCsvRecords((prev) =>
          prev.map((record) =>
            record.isbn === isbn ? { ...record, status: "ready", book } : record
          )
        );
      } catch (error: any) {
        setCsvRecords((prev) =>
          prev.map((record) =>
            record.isbn === isbn
              ? {
                  ...record,
                  status: "error",
                  error: `Failed to find book with ISBN: ${isbn}`,
                }
              : record
          )
        );
      }
    }
  };

  const uploadCsvData = async () => {
    const readyRecords = csvRecords.filter(
      (record) => record.status === "ready"
    );

    if (readyRecords.length === 0) {
      setCsvErrors(["No valid books to import"]);
      return;
    }

    // Reset counters and initialize progress message
    setCsvSuccessCount(0);
    setCsvErrorCount(0);
    const totalBooks = readyRecords.length;
    setSuccessMessage(`Processing ${totalBooks} book(s)...`);

    // Process each ready record
    for (const record of readyRecords) {
      // Update status to adding
      setCsvRecords((prev) =>
        prev.map((r) =>
          r.isbn === record.isbn ? { ...r, status: "adding" } : r
        )
      );

      try {
        await addBook(record.isbn);
        
        // Update status to success and increment success counter
        setCsvRecords((prev) =>
          prev.map((r) =>
            r.isbn === record.isbn ? { ...r, status: "success" } : r
          )
        );
        
        setCsvSuccessCount((prev) => {
          const newSuccessCount = prev + 1;
          setCsvErrorCount((errorCount) => {
            const completedCount = newSuccessCount + errorCount;
            
            // Update progress message
            if (completedCount === totalBooks) {
              // All books processed
              if (errorCount === 0) {
                setSuccessMessage(`Successfully added ${newSuccessCount} book(s) to your library`);
              } else {
                setSuccessMessage(`Successfully added ${newSuccessCount} out of ${totalBooks} book(s) to your library`);
              }
            } else {
              // Still processing
              setSuccessMessage(`Processing ${totalBooks} book(s)... (${completedCount}/${totalBooks} completed)`);
            }
            
            return errorCount;
          });
          
          return newSuccessCount;
        });
        
      } catch (error: any) {
        // Update status to failed and increment error counter
        setCsvRecords((prev) =>
          prev.map((r) =>
            r.isbn === record.isbn
              ? {
                  ...r,
                  status: "failed",
                  error: `Failed to add book: ${r.book?.title || r.isbn}`,
                }
              : r
          )
        );
        
        setCsvErrorCount((prev) => {
          const newErrorCount = prev + 1;
          setCsvSuccessCount((successCount) => {
            const completedCount = successCount + newErrorCount;
            
            // Update progress message
            if (completedCount === totalBooks) {
              // All books processed
              if (successCount === 0) {
                setSuccessMessage(`Failed to add all books`);
              } else {
                setSuccessMessage(`Successfully added ${successCount} out of ${totalBooks} book(s) to your library`);
              }
            } else {
              // Still processing
              setSuccessMessage(`Processing ${totalBooks} book(s)... (${completedCount}/${totalBooks} completed)`);
            }
            
            return successCount;
          });
          
          return newErrorCount;
        });
      }
    }
  };

  const getStatusChip = (record: CsvBookRecord) => {
    switch (record.status) {
      case "loading":
        return (
          <Chip
            size="small"
            label="Loading..."
            color="default"
            icon={<CircularProgress size={16} />}
          />
        );
      case "ready":
        return <Chip size="small" label="Ready" color="success" />;
      case "error":
        return (
          <Chip size="small" label="Error" color="error" icon={<ErrorIcon />} />
        );
      case "adding":
        return (
          <Chip
            size="small"
            label="Adding..."
            color="primary"
            icon={<CircularProgress size={16} />}
          />
        );
      case "success":
        return (
          <Chip
            size="small"
            label="Success"
            color="success"
            icon={<CheckCircleIcon />}
          />
        );
      case "failed":
        return (
          <Chip
            size="small"
            label="Failed"
            color="error"
            icon={<ErrorIcon />}
          />
        );
      default:
        return null;
    }
  };

  const getRowColor = (status: string) => {
    switch (status) {
      case "error":
      case "failed":
        return "#ffebee"; // Light red
      case "success":
        return "#e8f5e8"; // Light green
      default:
        return "inherit";
    }
  };

  return (
    <Box sx={{ p: 3, width: "100%", maxWidth: 1200, mx: "auto" }}>
      <Paper sx={{ mx: 2, my: 4 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
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
                Enter an ISBN to search for book information. You can add found
                books to your library.
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
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
                <Box sx={{ my: 4 }}>
                  <LoadingSpinner />
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
                                searchResults.some((book) => book.selected) &&
                                !searchResults.every((book) => book.selected)
                              }
                              checked={searchResults.every(
                                (book) => book.selected
                              )}
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
                            <TableCell>{book.authors.join(", ")}</TableCell>
                            <TableCell>{book.publisher}</TableCell>
                            <TableCell>{book.publishedDate}</TableCell>
                            <TableCell>{book.isbn}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      variant="contained"
                      onClick={addSelectedBooks}
                      disabled={
                        isLoading ||
                        !searchResults.some((book) => book.selected)
                      }
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
                Upload a CSV file with ISBN numbers. The CSV must contain an
                "isbn" column. Book details will be automatically fetched for
                each ISBN.
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
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

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 3,
                  border: "2px dashed #ccc",
                  borderRadius: 2,
                  mb: 3,
                }}
              >
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
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
                {csvFile && <Typography>Selected: {csvFile.name}</Typography>}
              </Box>

              {csvErrors.length > 0 && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  <Typography variant="subtitle2">
                    CSV Validation Errors:
                  </Typography>
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

              {csvRecords.length > 0 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    CSV Import Status ({csvRecords.length} records)
                  </Typography>
                  <TableContainer
                    component={Paper}
                    sx={{ mb: 3, maxHeight: 400 }}
                  >
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell>Status</TableCell>
                          <TableCell>ISBN</TableCell>
                          <TableCell>Title</TableCell>
                          <TableCell>Author(s)</TableCell>
                          <TableCell>Publisher</TableCell>
                          <TableCell>Error</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {csvRecords.map((record, index) => (
                          <TableRow
                            key={index}
                            sx={{ backgroundColor: getRowColor(record.status) }}
                          >
                            <TableCell>{getStatusChip(record)}</TableCell>
                            <TableCell>{record.isbn}</TableCell>
                            <TableCell>{record.book?.title || "-"}</TableCell>
                            <TableCell>
                              {record.book?.authors?.join(", ") || "-"}
                            </TableCell>
                            <TableCell>
                              {record.book?.publisher || "-"}
                            </TableCell>
                            <TableCell>{record.error || "-"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      variant="contained"
                      onClick={uploadCsvData}
                      disabled={
                        csvRecords.filter((r) => r.status === "ready")
                          .length === 0
                      }
                    >
                      Add Books (
                      {csvRecords.filter((r) => r.status === "ready").length}{" "}
                      ready)
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
