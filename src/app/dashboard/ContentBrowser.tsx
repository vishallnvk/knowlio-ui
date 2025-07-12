'use client';

import { useState, useRef } from 'react';
import {
  Box,
  Grid,
  Paper,
  Tabs,
  Tab,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Divider,
  Chip,
  Button,
  Card,
  CardContent,
  IconButton,
  Badge
} from '@mui/material';
import ContentList from './ContentList';
import { ContentParams } from '@/lib/api/content';
import BookIcon from '@mui/icons-material/Book';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ArticleIcon from '@mui/icons-material/Article';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

const contentTypes = [
  { value: 'BOOK', label: 'Books', icon: <BookIcon />, color: '#3b82f6' },
  { value: 'AUDIO', label: 'Audio', icon: <AudiotrackIcon />, color: '#10b981' }
];

const licenseStatusOptions = [
  { value: '', label: 'All License Status' },
  { value: 'ENABLED', label: 'Enabled' },
  { value: 'DISABLED', label: 'Disabled' }
];

export default function ContentBrowser() {
  const [selectedTab, setSelectedTab] = useState(0);
  // Use refs for filter inputs to avoid re-renders
  const authorRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const publisherRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const [licenseStatus, setLicenseStatus] = useState('');
  
  const [appliedFilters, setAppliedFilters] = useState<Partial<ContentParams>>({
    author: '',
    year: undefined,
    publisher: '',
    title: '',
    licensing_status: ''
  });
  const [validationError, setValidationError] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    // Clear filters when switching tabs
    if (authorRef.current) authorRef.current.value = '';
    if (yearRef.current) yearRef.current.value = '';
    if (publisherRef.current) publisherRef.current.value = '';
    if (titleRef.current) titleRef.current.value = '';
    setLicenseStatus('');
    
    setAppliedFilters({
      author: '',
      year: undefined,
      publisher: '',
      title: '',
      licensing_status: ''
    });
    setValidationError('');
  };

  const clearFilters = () => {
    if (authorRef.current) authorRef.current.value = '';
    if (yearRef.current) yearRef.current.value = '';
    if (publisherRef.current) publisherRef.current.value = '';
    if (titleRef.current) titleRef.current.value = '';
    setLicenseStatus('');
    
    setAppliedFilters({
      author: '',
      year: undefined,
      publisher: '',
      title: '',
      licensing_status: ''
    });
    setValidationError('');
  };

  const applyFilters = () => {
    const author = authorRef.current?.value || '';
    const year = yearRef.current?.value || '';
    const publisher = publisherRef.current?.value || '';
    const title = titleRef.current?.value || '';
    
    // Validate year_published on search button click
    if (year && !/^\d{4}$/.test(year)) {
      setValidationError('Year must be a 4-digit number');
      return;
    }
    
    setValidationError('');
    setAppliedFilters({
      author,
      year: year ? parseInt(year) : undefined,
      publisher,
      title,
      licensing_status: licenseStatus
    });
  };

  const getContentParams = (): ContentParams => {
    const selectedType = contentTypes[selectedTab];
    const params: any = {
      type: selectedType.value,
      limit: 10
    };

    // Only add filters for Book type and only if they have values
    if (selectedType.value === 'BOOK') {
      if (appliedFilters.year) {
        params.year = appliedFilters.year;
      }
      if (appliedFilters.title && appliedFilters.title.trim()) {
        params.title = appliedFilters.title.trim();
      }
      if (appliedFilters.licensing_status && appliedFilters.licensing_status.trim()) {
        params.licensing_status = appliedFilters.licensing_status;
      }
      if (appliedFilters.author && appliedFilters.author.trim()) {
        params.author = appliedFilters.author.trim();
      }
      if (appliedFilters.publisher && appliedFilters.publisher.trim()) {
        params.publisher = appliedFilters.publisher.trim();
      }
    }

    return params;
  };

  const hasActiveFilters = () => {
    return !!(
      (authorRef.current?.value || '').trim() ||
      (yearRef.current?.value || '').trim() ||
      (publisherRef.current?.value || '').trim() ||
      (titleRef.current?.value || '').trim() ||
      licenseStatus
    );
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if ((authorRef.current?.value || '').trim()) count++;
    if ((yearRef.current?.value || '').trim()) count++;
    if ((publisherRef.current?.value || '').trim()) count++;
    if ((titleRef.current?.value || '').trim()) count++;
    if (licenseStatus) count++;
    return count;
  };

  const isBookTab = contentTypes[selectedTab].value === 'BOOK';
  const selectedType = contentTypes[selectedTab];

  return (
    <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
      {/* Pill Bar at Top */}
      <Box sx={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', px: 3, py: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ 
            display: 'inline-flex', 
            alignItems: 'center',
            backgroundColor: '#f1f5f9',
            borderRadius: 3,
            p: 0.5,
            gap: 0.5
          }}>
            {contentTypes.map((type, index) => (
              <Box
                key={type.value}
                onClick={() => handleTabChange({} as any, index)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  px: 3,
                  py: 2,
                  cursor: 'pointer',
                  borderRadius: 2.5,
                  backgroundColor: selectedTab === index ? 'white' : 'transparent',
                  color: selectedTab === index ? type.color : '#64748b',
                  fontWeight: selectedTab === index ? 600 : 500,
                  boxShadow: selectedTab === index ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.3s ease',
                  minWidth: 120,
                  justifyContent: 'center',
                  '&:hover': {
                    backgroundColor: selectedTab === index ? 'white' : 'rgba(255,255,255,0.7)',
                    color: selectedTab === index ? type.color : '#475569',
                    transform: selectedTab === index ? 'none' : 'translateY(-1px)',
                  },
                }}
              >
                <Box sx={{ 
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  {type.icon}
                </Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 'inherit',
                    color: 'inherit',
                    fontSize: '0.875rem'
                  }}
                >
                  {type.label}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Add Books Button for Book tab */}
          {isBookTab && (
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              href="/dashboard/add-books"
              sx={{
                backgroundColor: selectedType.color,
                '&:hover': {
                  backgroundColor: selectedType.color,
                  filter: 'brightness(0.9)',
                },
                borderRadius: 2,
                px: 3,
                py: 1.5,
              }}
            >
              Add Books
            </Button>
          )}
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left Panel - Filters */}
        {isBookTab && (
          <Box sx={{ 
            width: 320, 
            borderRight: '1px solid #e5e7eb',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
          }}>
            {/* Filters Header */}
            <Box sx={{ p: 3, borderBottom: '1px solid #f3f4f6', backgroundColor: '#f8fafc' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <FilterListIcon sx={{ color: selectedType.color }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', mr: 1 }}>
                      Filters
                    </Typography>
                    {getActiveFilterCount() > 0 && (
                      <Badge 
                        badgeContent={getActiveFilterCount()} 
                        color="primary" 
                        sx={{
                          '& .MuiBadge-badge': {
                            backgroundColor: selectedType.color,
                            position: 'relative',
                            transform: 'none',
                            right: 'auto',
                            top: 'auto',
                          }
                        }}
                      >
                        <Box sx={{ width: 0, height: 0 }} />
                      </Badge>
                    )}
                  </Box>
                  {hasActiveFilters() && (
                    <IconButton 
                      size="small" 
                      onClick={clearFilters}
                      sx={{ color: '#6b7280' }}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              </Box>

            <Box sx={{ p: 3, flex: 1, overflow: 'auto' }}>
              {/* Author Filter */}
              <TextField
                fullWidth
                label="Author"
                variant="outlined"
                inputRef={authorRef}
                placeholder="Search by author name..."
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: selectedType.color,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
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
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: selectedType.color,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
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
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: selectedType.color,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
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
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: selectedType.color,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: selectedType.color,
                  },
                }}
              />

              {/* License Status Filter */}
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel sx={{ '&.Mui-focused': { color: selectedType.color } }}>
                  License Status
                </InputLabel>
                <Select
                  value={licenseStatus}
                  label="License Status"
                  onChange={(e) => setLicenseStatus(e.target.value)}
                  sx={{
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
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
              <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                <Button 
                  variant="contained" 
                  fullWidth
                  startIcon={<SearchIcon />}
                  onClick={applyFilters}
                  sx={{
                    backgroundColor: selectedType.color,
                    '&:hover': {
                      backgroundColor: selectedType.color,
                      filter: 'brightness(0.9)',
                    },
                    borderRadius: 2,
                    py: 1.5,
                  }}
                >
                  Search
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={clearFilters}
                  sx={{
                    borderColor: '#d1d5db',
                    color: '#6b7280',
                    '&:hover': {
                      borderColor: '#9ca3af',
                      backgroundColor: '#f9fafb',
                    },
                    borderRadius: 2,
                    py: 1.5,
                    minWidth: 80,
                  }}
                >
                  Clear
                </Button>
              </Box>

              {/* Active Filters Summary */}
              {(appliedFilters.author || appliedFilters.year || appliedFilters.publisher || appliedFilters.title || appliedFilters.licensing_status) && (
                <Card sx={{ backgroundColor: '#f8fafc', border: `1px solid ${selectedType.color}20` }}>
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#111827', mb: 2 }}>
                      Active Filters
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {appliedFilters.author && (
                        <Chip 
                          label={`Author: ${appliedFilters.author}`} 
                          size="small" 
                          sx={{ backgroundColor: `${selectedType.color}15`, color: selectedType.color }}
                        />
                      )}
                      {appliedFilters.year && (
                        <Chip 
                          label={`Year: ${appliedFilters.year}`} 
                          size="small" 
                          sx={{ backgroundColor: `${selectedType.color}15`, color: selectedType.color }}
                        />
                      )}
                      {appliedFilters.publisher && (
                        <Chip 
                          label={`Publisher: ${appliedFilters.publisher}`} 
                          size="small" 
                          sx={{ backgroundColor: `${selectedType.color}15`, color: selectedType.color }}
                        />
                      )}
                      {appliedFilters.title && (
                        <Chip 
                          label={`Title: ${appliedFilters.title}`} 
                          size="small" 
                          sx={{ backgroundColor: `${selectedType.color}15`, color: selectedType.color }}
                        />
                      )}
                      {appliedFilters.licensing_status && (
                        <Chip 
                          label={`License: ${licenseStatusOptions.find(s => s.value === appliedFilters.licensing_status)?.label}`} 
                          size="small" 
                          sx={{ backgroundColor: `${selectedType.color}15`, color: selectedType.color }}
                        />
                      )}
                    </Box>
                  </CardContent>
                </Card>
              )}
            </Box>

          </Box>
        )}

        {/* Right Panel - Content List */}
        <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ flex: 1, overflow: 'auto', p: 3, backgroundColor: '#f8fafc' }}>
            <ContentList contentParams={getContentParams()} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
