"use client";

import { useState, useEffect, useMemo } from "react";
import { useContent, ContentParams } from "@/lib/api/content";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Alert,
  Typography,
  Pagination,
  Skeleton,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";

interface ContentListProps {
  contentParams: ContentParams;
}

export default function ContentList({ contentParams }: ContentListProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Hide filters panel below sm breakpoint

  const [currentPage, setCurrentPage] = useState(1);
  const [expandedKeywords, setExpandedKeywords] = useState<Set<string>>(
    new Set()
  );
  const itemsPerPage = 10;

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useContent(contentParams);

  const allContent = useMemo(
    () => data?.pages.flatMap((p) => p.items) ?? [],
    [data]
  );

  // Fetch next page if needed
  useEffect(() => {
    const currentPageStart = (currentPage - 1) * itemsPerPage;
    const needsMoreData = currentPageStart >= allContent.length;

    if (needsMoreData && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [
    currentPage,
    itemsPerPage,
    allContent.length,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  // Get current page items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = allContent.slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(
    (hasNextPage ? allContent.length + itemsPerPage : allContent.length) /
      itemsPerPage
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const toggleKeywords = (contentId: string) => {
    const newExpanded = new Set(expandedKeywords);
    if (newExpanded.has(contentId)) {
      newExpanded.delete(contentId);
    } else {
      newExpanded.add(contentId);
    }
    setExpandedKeywords(newExpanded);
  };

  if (error) {
    return (
      <Box sx={{ width: "100%" }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="h6" component="div">
            Error Loading Content
          </Typography>
          <Typography variant="body2">
            {error.message ||
              "An error occurred while fetching content. Please try again."}
          </Typography>
        </Alert>
      </Box>
    );
  }

  if (isLoading && allContent.length === 0) {
    return (
      <Box sx={{ width: "100%" }}>
        <Stack spacing={3}>
          {[...Array(2)].map((_, index) => (
            <Card key={index} sx={{ display: "flex", minHeight: 218 }}>
              <Skeleton
                variant="rectangular"
                width={200}
                height={210}
                sx={{ m: "3px", borderRadius: "16px 0 0 16px" }}
              />
              <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <CardContent sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="60%" height={32} />
                  <Skeleton
                    variant="text"
                    width="40%"
                    height={20}
                    sx={{ mt: 1 }}
                  />
                  <Skeleton
                    variant="text"
                    width="60%"
                    height={20}
                    sx={{ mt: 1 }}
                  />
                  <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                    <Skeleton variant="rounded" width={60} height={24} />
                    <Skeleton variant="rounded" width={80} height={24} />
                  </Box>
                </CardContent>
              </Box>
            </Card>
          ))}
        </Stack>
      </Box>
    );
  }

  if (!isLoading && allContent.length === 0) {
    return (
      <Box sx={{ width: "100%", py: 4, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          0 results found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={3}>
        {currentPageItems.map((item) => (
          <Card
            key={item.content_id}
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              minHeight: 242,
              "&:hover": {
                boxShadow: 3,
                transform: "translateY(-2px)",
                transition: "all 0.2s ease-in-out",
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            <CardMedia
              component="img"
              sx={{
                p: "3px",
                width: isMobile ? "100%" : 200,
                objectFit: "cover",
                borderRadius: isMobile ? "16px 16px 0 0" : "16px 0 0 16px",
              }}
              image={"https://placehold.co/200x150?text=Book"}
              alt={item.title}
            />
            <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <CardContent
                sx={{ display: "flex", flexDirection: "column", flex: 1, p: 3 }}
              >
                <Typography
                  variant="h6"
                  component="h2"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    color: "#1f2937",
                    mb: 0.75,
                  }}
                >
                  {item.title || "Unknown Title"}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.75 }}
                >
                  <span style={{ fontWeight: 500 }}>Auhtor: </span>
                  {item.authors &&
                  Array.isArray(item.authors) &&
                  item.authors.length > 0
                    ? `${item.authors.join(", ")}`
                    : "Unknown"}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  <span style={{ fontWeight: 500 }}>Publisher: </span>
                  {item.publisher || "Unknown"}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    mb: 2,
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  <Chip
                    label={item.type}
                    size="small"
                    variant="outlined"
                    sx={{ fontWeight: 500 }}
                  />
                  <Chip
                    label={"LICENSE " + item.licensing_status}
                    size="small"
                    color={
                      item.licensing_status === "DISABLED" ? "error" : "success"
                    }
                    variant="outlined"
                  />
                  {item.year && (
                    <Chip
                      label={item.year}
                      size="small"
                      variant="outlined"
                      sx={{ backgroundColor: "#f3f4f6" }}
                    />
                  )}
                </Box>

                {item.keywords &&
                  Array.isArray(item.keywords) &&
                  item.keywords.length > 0 && (
                    <Box
                      sx={{
                        display: "flex",
                        gap: 0.5,
                        flexWrap: "wrap",
                        mb: 2,
                      }}
                    >
                      {(expandedKeywords.has(item.content_id)
                        ? item.keywords
                        : item.keywords.slice(0, 3)
                      ).map((keyword: string, index: number) => (
                        <Chip
                          key={`${item.content_id}-keyword-${index}`}
                          label={keyword}
                          size="small"
                          variant="outlined"
                          sx={{
                            fontSize: "0.75rem",
                            backgroundColor: "#f8fafc",
                            borderColor: "#e2e8f0",
                          }}
                        />
                      ))}
                      {item.keywords.length > 3 && (
                        <Chip
                          label={
                            expandedKeywords.has(item.content_id)
                              ? "Show less"
                              : `+${item.keywords.length - 3} more`
                          }
                          size="small"
                          variant="outlined"
                          onClick={() => toggleKeywords(item.content_id)}
                          sx={{
                            fontSize: "0.75rem",
                            backgroundColor: "#f1f5f9",
                            borderColor: "#cbd5e1",
                            cursor: "pointer",
                            "&:hover": {
                              backgroundColor: "#e2e8f0",
                              borderColor: "#94a3b8",
                            },
                          }}
                        />
                      )}
                    </Box>
                  )}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: "auto",
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Created: {new Date(item.created_at).toLocaleDateString()}
                  </Typography>
                  {item.isbn && (
                    <Typography variant="caption" color="text.secondary">
                      ISBN: {item.isbn}
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Box>
          </Card>
        ))}
      </Stack>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
            disabled={isFetchingNextPage}
          />
        </Box>
      )}

      {/* Loading indicator for fetching next page */}
      {isFetchingNextPage && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Loading more content...
          </Typography>
        </Box>
      )}
    </Box>
  );
}
