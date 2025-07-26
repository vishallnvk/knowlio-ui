"use client";

import { useState, useRef } from "react";
import {
  Box,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Chip,
  Button,
  Card,
  CardContent,
  IconButton,
  Badge,
  Dialog,
  Drawer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ContentParams } from "@/lib/api/content";
import BookIcon from "@mui/icons-material/Book";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ContentList from "./ContentList";
import AddBooksPage from "./add-books/page";

const contentTypes = [
  {
    value: "BOOK",
    label: "Books",
    icon: <BookIcon />,
    color: "#3b82f6",
  },
  {
    value: "AUDIO",
    label: "Audio",
    icon: <AudiotrackIcon />,
    color: "#10b981",
  },
];

const licenseStatusOptions = [
  { value: "", label: "All License Status" },
  { value: "ENABLED", label: "Enabled" },
  { value: "DISABLED", label: "Disabled" },
];

export default function ContentBrowser() {
  const theme = useTheme();
  const isLaptop = useMediaQuery(theme.breakpoints.down("lg")); // Hide filters panel below lg breakpoint
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Hide filters panel below sm breakpoint

  const [selectedTab, setSelectedTab] = useState(0);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Use refs for filter inputs to avoid re-renders
  const authorRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const publisherRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const [licenseStatus, setLicenseStatus] = useState("");
  const [onAddBook, setOnAddBook] = useState(false);

  const [appliedFilters, setAppliedFilters] = useState<Partial<ContentParams>>({
    authors: "",
    year: "",
    publisher: "",
    title: "",
    licensing_status: "",
  });
  const [validationError, setValidationError] = useState("");

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    // Clear filters when switching tabs
    if (authorRef.current) authorRef.current.value = "";
    if (yearRef.current) yearRef.current.value = "";
    if (publisherRef.current) publisherRef.current.value = "";
    if (titleRef.current) titleRef.current.value = "";
    setLicenseStatus("");

    setAppliedFilters({
      authors: "",
      year: "",
      publisher: "",
      title: "",
      licensing_status: "",
    });
    setValidationError("");
  };

  const clearFilters = () => {
    if (authorRef.current) authorRef.current.value = "";
    if (yearRef.current) yearRef.current.value = "";
    if (publisherRef.current) publisherRef.current.value = "";
    if (titleRef.current) titleRef.current.value = "";
    setLicenseStatus("");

    setAppliedFilters({
      authors: "",
      year: "",
      publisher: "",
      title: "",
      licensing_status: "",
    });
    setValidationError("");
  };

  const applyFilters = () => {
    const author = authorRef.current?.value || "";
    const year = yearRef.current?.value || "";
    const publisher = publisherRef.current?.value || "";
    const title = titleRef.current?.value || "";

    // Validate year_published on search button click
    if (year && !/^\d{4}$/.test(year)) {
      setValidationError("Year must be a 4-digit number");
      return;
    }

    setValidationError("");
    setAppliedFilters({
      authors: author,
      year: year || "",
      publisher,
      title,
      licensing_status: licenseStatus,
    });

    // Close drawer on mobile after applying filters
    if (isLaptop) {
      setFilterDrawerOpen(false);
    }
  };

  const getContentParams = (): ContentParams => {
    const selectedType = contentTypes[selectedTab];
    const params: any = {
      type: selectedType.value,
      limit: 10,
    };

    // Only add filters for Book type and only if they have values
    if (selectedType.value === "BOOK") {
      if (appliedFilters.year) {
        params.year = appliedFilters.year.toString();
      }
      if (appliedFilters.title && appliedFilters.title.trim()) {
        params.title = appliedFilters.title.trim();
      }
      if (
        appliedFilters.licensing_status &&
        appliedFilters.licensing_status.trim()
      ) {
        params.licensing_status = appliedFilters.licensing_status;
      }
      if (appliedFilters.authors && appliedFilters.authors.trim()) {
        params.authors = appliedFilters.authors.trim();
      }
      if (appliedFilters.publisher && appliedFilters.publisher.trim()) {
        params.publisher = appliedFilters.publisher.trim();
      }
    }

    return params;
  };

  const hasActiveFilters = () => {
    return !!(
      (authorRef.current?.value || "").trim() ||
      (yearRef.current?.value || "").trim() ||
      (publisherRef.current?.value || "").trim() ||
      (titleRef.current?.value || "").trim() ||
      licenseStatus
    );
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (appliedFilters.authors && appliedFilters.authors.trim()) count++;
    if (appliedFilters.year) count++;
    if (appliedFilters.publisher && appliedFilters.publisher.trim()) count++;
    if (appliedFilters.title && appliedFilters.title.trim()) count++;
    if (
      appliedFilters.licensing_status &&
      appliedFilters.licensing_status.trim()
    )
      count++;
    return count;
  };

  const isBookTab = contentTypes[selectedTab].value === "BOOK";
  const selectedType = contentTypes[selectedTab];

  // Filter Panel Component (reusable for both sidebar and drawer)
  const FilterPanel = ({ onClose }: { onClose?: () => void }) => (
    <Box
      sx={{
        width: isLaptop ? 320 : 280,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Filters Header */}
      <Box sx={{ p: 2.5, pb: 1.5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <FilterListIcon sx={{ mt: "-2px" }} />
            <Typography
              variant="h6"
              sx={{ fontWeight: 500, color: "#111827", mr: 1 }}
            >
              Filters
            </Typography>
            {getActiveFilterCount() > 0 && (
              <Badge
                badgeContent={getActiveFilterCount()}
                color="primary"
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: selectedType.color,
                    position: "relative",
                    transform: "none",
                    right: "auto",
                    top: "auto",
                  },
                }}
              >
                <Box sx={{ width: 0, height: 0 }} />
              </Badge>
            )}
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            {hasActiveFilters() && (
              <IconButton
                size="small"
                onClick={clearFilters}
                sx={{ color: "#6b7280" }}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            )}
            {onClose && (
              <IconButton
                size="small"
                onClick={onClose}
                sx={{ color: "#6b7280" }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>

      <Box sx={{ p: 2.5, pb: 1.5, flex: 1, overflow: "auto" }}>
        {/* Author Filter */}
        <TextField
          fullWidth
          label="Author"
          variant="outlined"
          inputRef={authorRef}
          placeholder="Search by author name..."
          size="small"
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: selectedType.color,
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: selectedType.color,
            },
          }}
        />

        {/* Year Published Filter */}
        <TextField
          fullWidth
          label="Year Published"
          variant="outlined"
          inputRef={yearRef}
          placeholder="e.g., 2023"
          error={!!validationError}
          helperText={validationError}
          size="small"
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: selectedType.color,
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: selectedType.color,
            },
          }}
        />

        {/* Publisher Name Filter */}
        <TextField
          fullWidth
          label="Publisher"
          variant="outlined"
          inputRef={publisherRef}
          placeholder="Search by publisher..."
          size="small"
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: selectedType.color,
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: selectedType.color,
            },
          }}
        />

        {/* Title Filter */}
        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          inputRef={titleRef}
          placeholder="Search by book title..."
          size="small"
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: selectedType.color,
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: selectedType.color,
            },
          }}
        />

        {/* License Status Filter */}
        <FormControl size="small" fullWidth sx={{ mb: 4 }}>
          <InputLabel sx={{ "&.Mui-focused": { color: selectedType.color } }}>
            License Status
          </InputLabel>
          <Select
            value={licenseStatus}
            label="License Status"
            onChange={(e) => setLicenseStatus(e.target.value)}
            sx={{
              borderRadius: "8px",
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: selectedType.color,
              },
            }}
          >
            {licenseStatusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Search Buttons */}
        <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
          <Button
            variant="contained"
            onClick={applyFilters}
            size="small"
            sx={{
              py: "6.75px",
              flex: 0.65,
              backgroundColor: "#1877F2",
              "&:hover": {
                backgroundColor: "#1877F2",
                filter: "brightness(0.9)",
              },
            }}
          >
            Search
          </Button>

          <Button
            variant="outlined"
            onClick={clearFilters}
            color="error"
            sx={{
              py: "6.75px",
              flex: 0.35,
            }}
          >
            Clear
          </Button>
        </Box>

        {/* Active Filters Summary */}
        {(appliedFilters.authors ||
          appliedFilters.year ||
          appliedFilters.publisher ||
          appliedFilters.title ||
          appliedFilters.licensing_status) && (
          <Card
            sx={{
              backgroundColor: "#f8fafc",
              border: `1px solid ${selectedType.color}20`,
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, color: "#111827", mb: 2 }}
              >
                Active Filters
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {appliedFilters.authors && (
                  <Chip
                    label={`Author: ${appliedFilters.authors}`}
                    size="small"
                    sx={{
                      backgroundColor: `${selectedType.color}15`,
                      color: selectedType.color,
                    }}
                  />
                )}
                {appliedFilters.year && (
                  <Chip
                    label={`Year: ${appliedFilters.year}`}
                    size="small"
                    sx={{
                      backgroundColor: `${selectedType.color}15`,
                      color: selectedType.color,
                    }}
                  />
                )}
                {appliedFilters.publisher && (
                  <Chip
                    label={`Publisher: ${appliedFilters.publisher}`}
                    size="small"
                    sx={{
                      backgroundColor: `${selectedType.color}15`,
                      color: selectedType.color,
                    }}
                  />
                )}
                {appliedFilters.title && (
                  <Chip
                    label={`Title: ${appliedFilters.title}`}
                    size="small"
                    sx={{
                      backgroundColor: `${selectedType.color}15`,
                      color: selectedType.color,
                    }}
                  />
                )}
                {appliedFilters.licensing_status && (
                  <Chip
                    label={`License: ${
                      licenseStatusOptions.find(
                        (s) => s.value === appliedFilters.licensing_status
                      )?.label
                    }`}
                    size="small"
                    sx={{
                      backgroundColor: `${selectedType.color}15`,
                      color: selectedType.color,
                    }}
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Pill Bar at Top */}
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 2 : 0,
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{ textAlign: isMobile ? "center" : "left" }}
            >
              License{" "}
              {selectedType.value.charAt(0) +
                selectedType.value.slice(1).toLowerCase()}
            </Typography>
            <Typography variant="body2">
              You can add {selectedType.value.toLowerCase()} and license it
              easily.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: "#e7e7e7",
              borderRadius: 3,
              p: 0.5,
              gap: 0.5,
            }}
          >
            {contentTypes.map((type, index) => (
              <Box
                key={type.value}
                onClick={() => handleTabChange({} as any, index)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  p: 1,
                  cursor: "pointer",
                  borderRadius: 2.5,
                  backgroundColor:
                    selectedTab === index ? "white" : "transparent",
                  color: selectedTab === index ? type.color : "#64748b",
                  fontWeight: selectedTab === index ? 600 : 500,
                  boxShadow:
                    selectedTab === index
                      ? "0 2px 8px rgba(0,0,0,0.1)"
                      : "none",
                  transition: "all 0.3s ease",
                  minWidth: 100,
                  justifyContent: "center",
                  "&:hover": {
                    backgroundColor:
                      selectedTab === index ? "white" : "rgba(255,255,255,0.7)",
                    color: selectedTab === index ? type.color : "#475569",
                    transform:
                      selectedTab === index ? "none" : "translateY(-1px)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    "& svg": {
                      fontSize: "1.1rem",
                    },
                  }}
                >
                  {type.icon}
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "inherit",
                    color: "inherit",
                    fontSize: "0.875rem",
                  }}
                >
                  {type.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Left Panel - Filters (Desktop Only) */}
        {isBookTab && !isLaptop && (
          <Paper
            sx={{
              m: 3,
              width: 280,
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              borderRadius: "16px",
            }}
          >
            <FilterPanel />
          </Paper>
        )}

        {/* Filter Drawer (Laptop) */}
        <Drawer
          anchor="left"
          open={filterDrawerOpen}
          onClose={() => setFilterDrawerOpen(false)}
        >
          <FilterPanel onClose={() => setFilterDrawerOpen(false)} />
        </Drawer>

        {/* Right Panel - Content List */}
        <Box
          sx={{
            flex: 1,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ flex: 1, overflow: "auto", p: 3 }}>
            {/* Action Buttons */}
            {isBookTab && (
              <Box
                display="flex"
                sx={{
                  mb: 3,
                  justifyContent: isMobile ? "center" : "space-between",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                {/* Left Side - Content Dashboard Title and Filter Button */}
                <Box display="flex" gap={2} alignItems="center">
                  {/* Content Dashboard Title */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "1.125rem",
                      fontWeight: 600,
                      color: "#374151",
                      display: isMobile ? "none" : "block",
                    }}
                  >
                    Content Dashboard
                  </Typography>

                  {/* Filter Button (Laptop Only) */}
                  {isLaptop && (
                    <Button
                      variant="outlined"
                      onClick={() => setFilterDrawerOpen(true)}
                      sx={{
                        p: isMobile ? "4px 12px" : "",
                        color: "#000",
                        borderColor: "#000",
                        borderRadius: 1,
                        "&:hover": {
                          backgroundColor: "#eee",
                        },
                      }}
                    >
                      <Box display="flex" gap={1} alignItems="center">
                        <FilterListIcon sx={{ mt: "-2px" }} />
                        Filters
                        {getActiveFilterCount() > 0 && (
                          <Badge
                            badgeContent={getActiveFilterCount()}
                            color="primary"
                            sx={{
                              position: "absolute",
                              top: 0,
                              right: "2px",
                              "& .MuiBadge-badge": {
                                backgroundColor: selectedType.color,
                                fontSize: "0.625rem",
                                minWidth: 16,
                                height: 16,
                              },
                            }}
                          />
                        )}
                      </Box>
                    </Button>
                  )}
                </Box>

                {/* Right Side - Add Books Button */}
                <Button
                  variant="contained"
                  onClick={() => setOnAddBook(true)}
                  sx={{
                    p: isMobile ? "4px 12px" : "",
                    backgroundColor: "#1877F2",
                    borderRadius: 1,
                    "&:hover": {
                      backgroundColor: "#1877F2",
                      filter: "brightness(0.9)",
                    },
                  }}
                >
                  <Box display="flex" gap={1}>
                    <AddIcon sx={{ mt: "-1px" }} /> Add Books
                  </Box>
                </Button>
              </Box>
            )}

            <ContentList contentParams={getContentParams()} />
          </Box>
        </Box>
      </Box>

      <Dialog
        fullWidth
        maxWidth="lg"
        open={onAddBook}
        onClose={() => setOnAddBook(false)}
        sx={{ backdropFilter: "blur(5px)" }}
      >
        <AddBooksPage />
      </Dialog>
    </Box>
  );
}
