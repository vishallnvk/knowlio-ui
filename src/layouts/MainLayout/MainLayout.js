import React from 'react';
import { Box } from '@mui/material';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';

/**
 * MainLayout - Primary layout component that wraps the application content
 * Provides consistent structure with navigation and footer
 */
const MainLayout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {/* Navigation header */}
      <Navigation />

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default MainLayout;
