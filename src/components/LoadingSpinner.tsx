'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
  className?: string;
}

export default function LoadingSpinner({ 
  message = 'Loading', 
  size = 'medium',
  fullScreen = false,
  className = ''
}: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'h-8 w-8',
    medium: 'h-12 w-12', 
    large: 'h-16 w-16'
  };

  const containerClasses = fullScreen 
    ? 'min-h-screen bg-gray-50 flex items-center justify-center'
    : 'flex items-center justify-center';

  return (
    <div className={`${containerClasses} ${className}`}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <div className={`animate-spin rounded-full ${sizeClasses[size]} border-b-2 border-blue-600`}></div>
        <Typography variant="h6" className="text-gray-600">
          {message}
        </Typography>
      </Box>
    </div>
  );
}

// Inline spinner for buttons and small spaces
export function InlineSpinner({ size = 'small', className = '' }: { size?: 'small' | 'medium'; className?: string }) {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-6 w-6'
  };

  return (
    <div className={`animate-spin rounded-full ${sizeClasses[size]} border-b-2 border-white ${className}`}></div>
  );
}
