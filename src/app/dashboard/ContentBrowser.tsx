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
  Button
} from '@mui/material';
import ContentList from './ContentList';

interface ContentFilters {
  author: string;
  year_published: string;
  publisher_name: string;
  title: string;
  license_status: string;
}

interface ContentParams {
  type: string;
  attributes: {
    type: string;
    author?: string;
    year_published?: string;
    publisher_name?: string;
    title?: string;
    license_status?: string;
  };
  limit: number;
}

const contentTypes = [
  { value: 'BOOK', label: 'Book' },
  { value: 'AUDIO', label: 'Audio' },
  { value: 'VIDEO', label: 'Video' },
  { value: 'TEXT', label: 'Text' }
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
  
  const [appliedFilters, setAppliedFilters] = useState<ContentFilters>({
    author: '',
    year_published: '',
    publisher_name: '',
    title: '',
    license_status: ''
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
      year_published: '',
      publisher_name: '',
      title: '',
      license_status: ''
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
      year_published: '',
      publisher_name: '',
      title: '',
      license_status: ''
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
      year_published: year,
      publisher_name: publisher,
      title,
      license_status: licenseStatus
    });
  };

  const getContentParams = (): ContentParams => {
    const selectedType = contentTypes[selectedTab];
    const attributes: ContentParams['attributes'] = {
      type: selectedType.value,
    };

    // Only add filters for Book type
    if (selectedType.value === 'BOOK') {
      if (appliedFilters.author.trim()) {
        attributes.author = appliedFilters.author.trim();
      }
      if (appliedFilters.year_published.trim()) {
        attributes.year_published = appliedFilters.year_published.trim();
      }
      if (appliedFilters.publisher_name.trim()) {
        attributes.publisher_name = appliedFilters.publisher_name.trim();
      }
      if (appliedFilters.title.trim()) {
        attributes.title = appliedFilters.title.trim();
      }
      if (appliedFilters.license_status) {
        attributes.license_status = appliedFilters.license_status;
      }
    }

    return {
      type: selectedType.value,
      attributes,
      limit: 10
    };
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

  const isBookTab = contentTypes[selectedTab].value === 'BOOK';

  return (
    <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header with Tabs */}
      <Paper sx={{ borderRadius: 0, borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ px: 2 }}
        >
          {contentTypes.map((type, index) => (
            <Tab key={type.value} label={type.label} />
          ))}
        </Tabs>
      </Paper>

      {/* Main Content Area */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left Panel - Filters (only show for Book tab) */}
        {isBookTab && (
          <Paper 
            sx={{ 
              width: 300, 
              borderRadius: 0, 
              borderRight: 1, 
              borderColor: 'divider',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="h6">Filters</Typography>
            </Box>

            <Box sx={{ p: 2, flex: 1, overflow: 'auto' }}>
              {/* Author Filter */}
              <TextField
                fullWidth
                label="Author"
                variant="outlined"
                inputRef={authorRef}
                placeholder="Enter author name..."
                sx={{ mb: 3 }}
              />

              {/* Year Published Filter */}
              <TextField
                fullWidth
                label="Year Published"
                variant="outlined"
                inputRef={yearRef}
                placeholder="Enter year (e.g., 2023)..."
                error={!!validationError}
                helperText={validationError}
                sx={{ mb: 3 }}
              />

              {/* Publisher Name Filter */}
              <TextField
                fullWidth
                label="Publisher Name"
                variant="outlined"
                inputRef={publisherRef}
                placeholder="Enter publisher name..."
                sx={{ mb: 3 }}
              />

              {/* Title Filter */}
              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                inputRef={titleRef}
                placeholder="Enter book title..."
                sx={{ mb: 3 }}
              />

              {/* License Status Filter */}
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>License Status</InputLabel>
                <Select
                  value={licenseStatus}
                  label="License Status"
                  onChange={(e) => setLicenseStatus(e.target.value)}
                >
                  {licenseStatusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Search Button */}
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  onClick={applyFilters}
                >
                  Search
                </Button>
                <Button 
                  variant="outlined" 
                  color="primary"
                  onClick={clearFilters}
                >
                  Clear
                </Button>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Filter Summary */}
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Applied Filters:
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2">
                  <strong>Type:</strong> {contentTypes[selectedTab].label}
                </Typography>
                {appliedFilters.author && (
                  <Typography variant="body2">
                    <strong>Author:</strong> "{appliedFilters.author}"
                  </Typography>
                )}
                {appliedFilters.year_published && (
                  <Typography variant="body2">
                    <strong>Year:</strong> {appliedFilters.year_published}
                  </Typography>
                )}
                {appliedFilters.publisher_name && (
                  <Typography variant="body2">
                    <strong>Publisher:</strong> "{appliedFilters.publisher_name}"
                  </Typography>
                )}
                {appliedFilters.title && (
                  <Typography variant="body2">
                    <strong>Title:</strong> "{appliedFilters.title}"
                  </Typography>
                )}
                {appliedFilters.license_status && (
                  <Typography variant="body2">
                    <strong>License:</strong> {licenseStatusOptions.find(s => s.value === appliedFilters.license_status)?.label}
                  </Typography>
                )}
              </Box>
            </Box>
          </Paper>
        )}

        {/* Right Panel - Content List */}
        <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', backgroundColor: 'background.paper', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h5">
                {contentTypes[selectedTab].label}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Browse and manage your {contentTypes[selectedTab].label.toLowerCase()}
                {!isBookTab && ' (No filters available for this content type)'}
              </Typography>
            </Box>
            {isBookTab && (
              <Button 
                variant="contained" 
                color="primary"
                href="/dashboard/add-books"
              >
                Add Books
              </Button>
            )}
          </Box>
          
          <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
            <ContentList contentParams={getContentParams()} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
