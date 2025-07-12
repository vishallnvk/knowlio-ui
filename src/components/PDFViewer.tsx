'use client';

import React, { useEffect, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { Box, Alert } from '@mui/material';
import LoadingSpinner from './LoadingSpinner';

// You need to set the worker file URL for pdfjs
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

interface PDFViewerProps {
  fileUrl: string;
  errorMessage?: string;
}

export default function PDFViewer({ fileUrl, errorMessage = 'Failed to load PDF document' }: PDFViewerProps) {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadPdf() {
      try {
        const loadingTask = pdfjsLib.getDocument(fileUrl);
        const pdf = await loadingTask.promise;
        const numPages = pdf.numPages;

        const imgs: string[] = [];
        for (let i = 1; i <= numPages; i++) {
          const page = await pdf.getPage(i);

          // Create a canvas to render the page
          const viewport = page.getViewport({ scale: 3 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          if (!context) continue;
          
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };

          await page.render(renderContext).promise;

          if (cancelled) return;

          // Convert canvas to image URL
          const imgData = canvas.toDataURL('image/png');
          imgs.push(imgData);
        }

        if (!cancelled) {
          setImages(imgs);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error loading PDF:', error);
        setError(errorMessage);
        setLoading(false);
      }
    }

    loadPdf();

    return () => {
      cancelled = true;
    };
  }, [fileUrl, errorMessage]);

  if (loading) {
    return (
      <Box sx={{ minHeight: '400px' }}>
        <LoadingSpinner />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ 
      width: '100%', 
      maxWidth: 1000, 
      margin: '0 auto'
    }}>
      {images.map((src, idx) => (
        <Box
          key={idx}
          sx={{
            mb: 2,
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            border: '1px solid #e0e0e0',
            borderRadius: 1,
            overflow: 'hidden'
          }}
        >
          <img
            src={src}
            alt={`Page ${idx + 1}`}
            style={{ 
              width: '100%', 
              height: 'auto',
              display: 'block'
            }}
          />
        </Box>
      ))}
    </Box>
  );
}
