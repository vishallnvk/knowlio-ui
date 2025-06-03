import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Menu,
  MenuItem,
  Chip,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';

// Mock data for content table
const mockContentData = [
  {
    id: '001',
    title: 'Economic Trends 2025 Report',
    type: 'Book',
    pricingTraining: '$5,000',
    pricingReference: '$2,500',
    sharing: true,
  },
  {
    id: '002',
    title: 'Advanced Machine Learning Techniques',
    type: 'Video',
    pricingTraining: '$8,000',
    pricingReference: '$4,000',
    sharing: false,
  },
  {
    id: '003',
    title: 'Financial Markets Podcast Series',
    type: 'Audio',
    pricingTraining: '$3,500',
    pricingReference: '$1,800',
    sharing: true,
  },
  {
    id: '004',
    title: 'Healthcare Innovation Dataset',
    type: 'Dataset',
    pricingTraining: '$10,000',
    pricingReference: '$5,500',
    sharing: true,
  },
  {
    id: '005',
    title: 'Renewable Energy White Papers',
    type: 'Book',
    pricingTraining: '$7,200',
    pricingReference: '$3,600',
    sharing: false,
  },
  {
    id: '006',
    title: 'Consumer Behavior Analysis',
    type: 'Video',
    pricingTraining: '$6,500',
    pricingReference: '$3,250',
    sharing: true,
  },
  {
    id: '007',
    title: 'Historical Market Data 1990-2020',
    type: 'Dataset',
    pricingTraining: '$12,000',
    pricingReference: '$6,000',
    sharing: true,
  },
  {
    id: '008',
    title: 'Executive Interview Series',
    type: 'Audio',
    pricingTraining: '$4,800',
    pricingReference: '$2,400',
    sharing: false,
  },
  {
    id: '009',
    title: 'Technology Adoption Survey',
    type: 'Book',
    pricingTraining: '$9,200',
    pricingReference: '$4,600',
    sharing: true,
  },
  {
    id: '010',
    title: 'Sustainable Business Practices',
    type: 'Video',
    pricingTraining: '$7,800',
    pricingReference: '$3,900',
    sharing: false,
  },
];

/**
 * PublisherDashboard - Main dashboard component for content publishers
 * Displays a searchable, paginated table of content with action options
 */
function PublisherDashboard() {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedContentId, setSelectedContentId] = useState(null);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset to first page when searching
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Open actions menu
  const handleOpenMenu = (event, contentId) => {
    setAnchorEl(event.currentTarget);
    setSelectedContentId(contentId);
  };

  // Close actions menu
  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedContentId(null);
  };

  // Handle action selection
  const handleAction = (action) => {
    console.log(`${action} action for content ID: ${selectedContentId}`);
    handleCloseMenu();
    // Here you would implement the actual logic for each action
  };

  // Get content for current page
  const paginatedContent = mockContentData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Dashboard Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Content Library
        </Typography>
        
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          size="large"
        >
          Add Content
        </Button>
      </Box>

      {/* Search Bar */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 2, 
          mb: 3, 
          border: '1px solid', 
          borderColor: 'grey.200',
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <TextField
          fullWidth
          placeholder="Search content by title, type, or other attributes..."
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mr: 2 }}
        />
      </Paper>

      {/* Content Table */}
      <TableContainer component={Paper} sx={{ border: '1px solid', borderColor: 'grey.200', boxShadow: 0 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Training Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Reference Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Sharing</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedContent.map((content) => (
              <TableRow 
                key={content.id}
                sx={{ 
                  '&:hover': { 
                    backgroundColor: 'rgba(0, 0, 0, 0.04)' 
                  } 
                }}
              >
                <TableCell>{content.title}</TableCell>
                <TableCell>{content.type}</TableCell>
                <TableCell>{content.pricingTraining}</TableCell>
                <TableCell>{content.pricingReference}</TableCell>
                <TableCell>
                  <Chip 
                    label={content.sharing ? "Enabled" : "Disabled"} 
                    color={content.sharing ? "success" : "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton 
                    onClick={(e) => handleOpenMenu(e, content.id)}
                    size="small"
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={mockContentData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => handleAction('download')}>
          <DownloadIcon fontSize="small" sx={{ mr: 1 }} />
          Download
        </MenuItem>
        <MenuItem onClick={() => handleAction('delete')} sx={{ color: 'error.main' }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </Container>
  );
}

export default PublisherDashboard;
