'use client';

import { useState } from 'react';
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
  Chip
} from '@mui/material';
import ContentList from './ContentList';

interface ContentFilters {
  search: string;
  status: string;
  publisher_id: string;
}

interface ContentParams {
  type: string;
  attributes: {
    type: string;
    status?: string;
    publisher_id?: string;
    search?: string;
  };
  limit: number;
}

const contentTypes = [
  { value: 'BOOK', label: 'Books' },
  { value: 'ARTICLE', label: 'Articles' },
  { value: 'VIDEO', label: 'Videos' },
  { value: 'PODCAST', label: 'Podcasts' }
];

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'DRAFT', label: 'Draft' },
  { value: 'PUBLISHED', label: 'Published' },
  { value: 'ARCHIVED', label: 'Archived' }
];

export default function ContentBrowser() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [filters, setFilters] = useState<ContentFilters>({
    search: '',
    status: 'DRAFT',
    publisher_id: '2df85e25-6066-4581-b1d6-7008cf4a671a'
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleFilterChange = (field: keyof ContentFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      status: '',
      publisher_id: '2df85e25-6066-4581-b1d6-7008cf4a671a'
    });
  };

  const getContentParams = (): ContentParams => {
    const selectedType = contentTypes[selectedTab];
    const attributes: ContentParams['attributes'] = {
      type: selectedType.value,
      publisher_id: filters.publisher_id
    };

    if (filters.status) {
      attributes.status = filters.status;
    }

    if (filters.search.trim()) {
      attributes.search = filters.search.trim();
    }

    return {
      type: selectedType.value,
      attributes,
      limit: 1
    };
  };

  const activeFiltersCount = Object.values(filters).filter(value => 
    value && value !== '2df85e25-6066-4581-b1d6-7008cf4a671a'
  ).length;

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
        {/* Left Panel - Filters */}
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="h6">Filters</Typography>
              {activeFiltersCount > 0 && (
                <Chip 
                  label={`${activeFiltersCount} active`} 
                  size="small" 
                  color="primary"
                  onClick={clearFilters}
                  onDelete={clearFilters}
                />
              )}
            </Box>
          </Box>

          <Box sx={{ p: 2, flex: 1, overflow: 'auto' }}>
            {/* Search Filter */}
            <TextField
              fullWidth
              label="Search"
              variant="outlined"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder="Search content..."
              sx={{ mb: 3 }}
            />

            {/* Status Filter */}
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status}
                label="Status"
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Publisher ID Filter */}
            <TextField
              fullWidth
              label="Publisher ID"
              variant="outlined"
              value={filters.publisher_id}
              onChange={(e) => handleFilterChange('publisher_id', e.target.value)}
              placeholder="Enter publisher ID..."
              sx={{ mb: 3 }}
            />

            <Divider sx={{ my: 2 }} />

            {/* Filter Summary */}
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Current Filters:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2">
                <strong>Type:</strong> {contentTypes[selectedTab].label}
              </Typography>
              {filters.search && (
                <Typography variant="body2">
                  <strong>Search:</strong> "{filters.search}"
                </Typography>
              )}
              {filters.status && (
                <Typography variant="body2">
                  <strong>Status:</strong> {statusOptions.find(s => s.value === filters.status)?.label}
                </Typography>
              )}
            </Box>
          </Box>
        </Paper>

        {/* Right Panel - Content List */}
        <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', backgroundColor: 'background.paper' }}>
            <Typography variant="h5">
              {contentTypes[selectedTab].label}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Browse and manage your {contentTypes[selectedTab].label.toLowerCase()}
            </Typography>
          </Box>
          
          <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
            <ContentList contentParams={getContentParams()} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
