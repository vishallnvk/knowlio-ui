"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Chip,
  Card,
  CardContent,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
  Stack,
  Alert,
  LinearProgress,
} from '@mui/material';
import { 
  Close as CloseIcon, 
  CloudUpload as CloudUploadIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';
import { Content } from '@/lib/api/content';

interface ContentModalProps {
  open: boolean;
  onClose: () => void;
  content: Content | null;
}

// Configuration for content type-specific fields and display
interface ContentTypeConfig {
  imageFields: string[];
  specificFields: Array<{
    key: string;
    label: string;
    formatter?: (value: any) => string;
  }>;
  placeholderText: string;
}

const CONTENT_TYPE_CONFIGS: Record<string, ContentTypeConfig> = {
  book: {
    imageFields: ['thumbnail_url', 'small_thumbnail_url'],
    specificFields: [
      { key: 'authors', label: 'Authors', formatter: (authors) => Array.isArray(authors) ? authors.join(', ') : 'Unknown' },
      { key: 'isbn', label: 'ISBN' },
      { key: 'publisher', label: 'Publisher' },
      { key: 'year', label: 'Year' },
    ],
    placeholderText: 'Book',
  },
  video: {
    imageFields: ['thumbnail_url', 'small_thumbnail_url'],
    specificFields: [
      { key: 'duration', label: 'Duration' },
      { key: 'resolution', label: 'Resolution' },
      { key: 'creator', label: 'Creator' },
      { key: 'year', label: 'Year' },
    ],
    placeholderText: 'Video',
  },
  audio: {
    imageFields: ['thumbnail_url', 'small_thumbnail_url'],
    specificFields: [
      { key: 'duration', label: 'Duration' },
      { key: 'artist', label: 'Artist' },
      { key: 'album', label: 'Album' },
      { key: 'year', label: 'Year' },
    ],
    placeholderText: 'Audio',
  },
  default: {
    imageFields: ['thumbnail_url', 'small_thumbnail_url'],
    specificFields: [
      { key: 'creator', label: 'Creator' },
      { key: 'year', label: 'Year' },
    ],
    placeholderText: 'Content',
  },
};

// Status configuration for consistent color coding
const STATUS_CONFIG = {
  success: ['enabled', 'active', 'completed', 'available'],
  error: ['disabled', 'inactive', 'failed', 'unavailable'],
  warning: ['pending', 'processing', 'partial'],
} as const;

export default function ContentModal({ open, onClose, content }: ContentModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadMessage, setUploadMessage] = useState('');

  if (!content) return null;

  // Get content type configuration
  const contentConfig = CONTENT_TYPE_CONFIGS[content.type] || CONTENT_TYPE_CONFIGS.default;

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadFile(file);
      setUploadStatus('idle');
      setUploadMessage('');
    }
  };

  const handleUpload = async () => {
    if (!uploadFile) return;

    setUploadStatus('uploading');
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      // TODO: Implement actual upload logic here
      // This is a placeholder for the actual upload implementation
      await new Promise(resolve => setTimeout(resolve, 2000));

      clearInterval(interval);
      setUploadProgress(100);
      setUploadStatus('success');
      setUploadMessage('File uploaded successfully!');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setUploadFile(null);
        setUploadStatus('idle');
        setUploadMessage('');
        setUploadProgress(0);
      }, 3000);
    } catch (error) {
      setUploadStatus('error');
      setUploadMessage('Upload failed. Please try again.');
      setUploadProgress(0);
    }
  };

  const handleBrowseClick = () => {
    document.getElementById('file-upload-input')?.click();
  };

  const formatDate = (dateString: string): string => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (status: string | undefined): 'success' | 'error' | 'warning' | 'default' => {
    if (!status) return 'default';
    
    const normalizedStatus = status.toLowerCase();
    
    // Check each status category
    if (STATUS_CONFIG.success.includes(normalizedStatus as any)) return 'success';
    if (STATUS_CONFIG.error.includes(normalizedStatus as any)) return 'error';
    if (STATUS_CONFIG.warning.includes(normalizedStatus as any)) return 'warning';
    
    return 'default';
  };

  const getContentImage = (): string => {
    for (const field of contentConfig.imageFields) {
      const value = content[field as keyof Content];
      if (value && typeof value === 'string') {
        return value;
      }
    }
    return `https://placehold.co/200x300?text=${contentConfig.placeholderText}`;
  };

  const renderField = (field: { key: string; label: string; formatter?: (value: any) => string }) => {
    const value = content[field.key as keyof Content];
    if (!value) return null;

    const displayValue = field.formatter ? field.formatter(value) : String(value);
    if (displayValue === 'Unknown' || displayValue === 'Not available') return null;

    return (
      <Box key={field.key} sx={{ flex: 1, minWidth: 200 }}>
        <Typography variant="body2" color="text.secondary">
          {field.label}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {displayValue}
        </Typography>
      </Box>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: isMobile ? 0 : 2,
          maxHeight: isMobile ? '100vh' : '90vh',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 2,
        }}
      >
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
          Content Details
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            color: 'text.secondary',
            '&:hover': { color: 'text.primary' },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 0 }}>
        <Stack spacing={3}>
          {/* Header Section with Image and Basic Info */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 3 }}>
                {/* Book Image */}
                <Box sx={{ flex: '0 0 auto' }}>
                  <Box
                    component="img"
                    src={
                      content.thumbnail_url ||
                      content.small_thumbnail_url ||
                      'https://placehold.co/200x300?text=Book'
                    }
                    alt={content.title}
                    sx={{
                      width: isMobile ? '100%' : 200,
                      maxWidth: 200,
                      height: 'auto',
                      borderRadius: 1,
                      boxShadow: 2,
                      mx: isMobile ? 'auto' : 0,
                      display: 'block',
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== 'https://placehold.co/200x300?text=Book') {
                        target.src = 'https://placehold.co/200x300?text=Book';
                      }
                    }}
                  />
                </Box>

                {/* Basic Information */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Basic Information
                  </Typography>
                  <Stack spacing={1.5}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Title
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {content.title || 'Unknown Title'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                      <Box sx={{ flex: 1, minWidth: 200 }}>
                        <Typography variant="body2" color="text.secondary">
                          Authors
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {content.authors && content.authors.length > 0
                            ? content.authors.join(', ')
                            : 'Unknown'}
                        </Typography>
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 200 }}>
                        <Typography variant="body2" color="text.secondary">
                          ISBN
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {content.isbn || 'Not available'}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                      <Box sx={{ flex: 1, minWidth: 200 }}>
                        <Typography variant="body2" color="text.secondary">
                          Publisher
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {content.publisher || 'Unknown'}
                        </Typography>
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 200 }}>
                        <Typography variant="body2" color="text.secondary">
                          Year
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {content.year || 'Not available'}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Type
                      </Typography>
                      <Chip
                        label={content.type || 'Unknown'}
                        size="small"
                        variant="outlined"
                        sx={{ mt: 0.5 }}
                      />
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Technical Details */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Content Details
              </Typography>
              <Stack spacing={2}>
                {/* File Key with Upload Section */}
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    File Key
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: 2, 
                    alignItems: isMobile ? 'stretch' : 'center',
                    p: 2,
                    backgroundColor: '#f8fafc',
                    borderRadius: 1,
                    border: '1px solid #e2e8f0'
                  }}>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <DescriptionIcon color="action" />
                        <Typography variant="body1" sx={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                          {content.file_key || 'Not available'}
                        </Typography>
                      </Box>
                      {uploadFile && (
                        <Typography variant="body2" color="text.secondary">
                          Selected: {uploadFile.name}
                        </Typography>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
                      <Button
                        variant="outlined"
                        startIcon={<CloudUploadIcon />}
                        onClick={handleBrowseClick}
                        size="small"
                        disabled={uploadStatus === 'uploading'}
                      >
                        Browse
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<CloudUploadIcon />}
                        onClick={handleUpload}
                        disabled={!uploadFile || uploadStatus === 'uploading'}
                        size="small"
                      >
                        {uploadStatus === 'uploading' ? 'Uploading...' : 'Upload'}
                      </Button>
                    </Box>
                  </Box>
                  
                  {/* Hidden file input */}
                  <input
                    id="file-upload-input"
                    type="file"
                    accept=".pdf,.epub,.txt,.doc,.docx"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                  />
                  
                  {/* Upload Progress */}
                  {uploadStatus === 'uploading' && (
                    <Box sx={{ mt: 2 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={uploadProgress} 
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Uploading... {uploadProgress}%
                      </Typography>
                    </Box>
                  )}
                  
                  {/* Upload Status Messages */}
                  {uploadMessage && (
                    <Alert 
                      severity={uploadStatus === 'success' ? 'success' : 'error'} 
                      sx={{ mt: 2 }}
                    >
                      {uploadMessage}
                    </Alert>
                  )}
                </Box>

                {/* Timestamps */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <Box sx={{ flex: 1, minWidth: 250 }}>
                    <Typography variant="body2" color="text.secondary">
                      Created At
                    </Typography>
                    <Typography variant="body1">
                      {formatDate(content.created_at)}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 250 }}>
                    <Typography variant="body2" color="text.secondary">
                      Insert Time
                    </Typography>
                    <Typography variant="body1">
                      {formatDate(content.insert_time)}
                    </Typography>
                  </Box>
                  {content.updated_at && (
                    <Box sx={{ flex: 1, minWidth: 250 }}>
                      <Typography variant="body2" color="text.secondary">
                        Updated At
                      </Typography>
                      <Typography variant="body1">
                        {formatDate(content.updated_at)}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Stack>

              {content.metadata && (
                <Box sx={{ mt: 2 }}>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Additional Metadata
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {content.metadata.format && (
                      <Box sx={{ flex: 1, minWidth: 200 }}>
                        <Typography variant="body2" color="text.secondary">
                          Format
                        </Typography>
                        <Typography variant="body1">
                          {content.metadata.format}
                        </Typography>
                      </Box>
                    )}
                    {content.metadata.pages && (
                      <Box sx={{ flex: 1, minWidth: 200 }}>
                        <Typography variant="body2" color="text.secondary">
                          Pages
                        </Typography>
                        <Typography variant="body1">
                          {content.metadata.pages}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Status Information */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Status Information
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ flex: 1, minWidth: 200 }}>
                  <Typography variant="body2" color="text.secondary">
                    Licensing Status
                  </Typography>
                  <Chip
                    label={content.licensing_status || 'Unknown'}
                    size="small"
                    color={getStatusColor(content.licensing_status)}
                    sx={{ mt: 0.5 }}
                  />
                </Box>
                <Box sx={{ flex: 1, minWidth: 200 }}>
                  <Typography variant="body2" color="text.secondary">
                    RAG Status
                  </Typography>
                  <Chip
                    label={content.rag_status || 'Unknown'}
                    size="small"
                    color={getStatusColor(content.rag_status)}
                    sx={{ mt: 0.5 }}
                  />
                </Box>
                <Box sx={{ flex: 1, minWidth: 200 }}>
                  <Typography variant="body2" color="text.secondary">
                    Training Status
                  </Typography>
                  <Chip
                    label={content.training_status || 'Unknown'}
                    size="small"
                    color={getStatusColor(content.training_status)}
                    sx={{ mt: 0.5 }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Content & Keywords */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Content & Keywords
              </Typography>
              
              {content.description && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Description
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 0.5, mb: 2 }}>
                    {content.description}
                  </Typography>
                </Box>
              )}

              {content.keywords && content.keywords.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Keywords
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {content.keywords.map((keyword, index) => (
                      <Chip
                        key={index}
                        label={keyword}
                        size="small"
                        variant="outlined"
                        sx={{
                          backgroundColor: '#f8fafc',
                          borderColor: '#e2e8f0',
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {content.tags && content.tags.length > 0 && (
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Tags
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {content.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
