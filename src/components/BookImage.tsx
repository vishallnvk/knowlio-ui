"use client";

import React, { useState, useEffect } from "react";
import { Box, Skeleton } from "@mui/material";

interface BookImageProps {
  title: string;
  thumbnail_url?: string;
  small_thumbnail_url?: string;
  sx?: object;
  width?: number | string;
  height?: number | string;
  borderRadius?: string;
}

export default function BookImage({
  title,
  thumbnail_url,
  small_thumbnail_url,
  sx = {},
  width = 200,
  height = 300,
  borderRadius = "16px 0 0 16px",
}: BookImageProps) {
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Fallback placeholder image
  const placeholderUrl = "https://placehold.co/200x300/f3f4f6/9ca3af?text=Book";

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    // Helper function to convert HTTP to HTTPS for Google Books URLs
    const convertToHttps = (url: string) => {
      if (url && url.startsWith("http://")) {
        return url.replace("http://", "https://");
      }
      return url;
    };

    // Priority order: thumbnail_url -> small_thumbnail_url -> placeholder
    if (thumbnail_url) {
      setCurrentImageUrl(convertToHttps(thumbnail_url));
    } else if (small_thumbnail_url) {
      setCurrentImageUrl(convertToHttps(small_thumbnail_url));
    } else {
      setCurrentImageUrl(placeholderUrl);
    }
  }, [thumbnail_url, small_thumbnail_url]);

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);

    // Helper function to convert HTTP to HTTPS for Google Books URLs
    const convertToHttps = (url: string) => {
      if (url && url.startsWith("http://")) {
        return url.replace("http://", "https://");
      }
      return url;
    };

    // Try fallback images in order
    const convertedThumbnailUrl = thumbnail_url ? convertToHttps(thumbnail_url) : null;
    const convertedSmallThumbnailUrl = small_thumbnail_url ? convertToHttps(small_thumbnail_url) : null;

    if (currentImageUrl === convertedThumbnailUrl && convertedSmallThumbnailUrl) {
      setCurrentImageUrl(convertedSmallThumbnailUrl);
      setIsLoading(true);
      setHasError(false);
    } else if (currentImageUrl === convertedSmallThumbnailUrl || currentImageUrl === convertedThumbnailUrl) {
      setCurrentImageUrl(placeholderUrl);
      setIsLoading(true);
      setHasError(false);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        width,
        height,
        borderRadius,
        overflow: "hidden",
        backgroundColor: "#f3f4f6",
        ...sx,
      }}
    >
      {isLoading && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            borderRadius,
          }}
        />
      )}
      
      {currentImageUrl && (
        <img
          src={currentImageUrl}
          alt={`Book cover for ${title}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: isLoading ? "none" : "block",
            transition: "opacity 0.3s ease-in-out",
            opacity: hasError ? 0.7 : 1,
          }}
          loading="lazy"
        />
      )}
    </Box>
  );
}
