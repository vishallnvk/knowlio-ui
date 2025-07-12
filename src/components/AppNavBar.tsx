'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Avatar,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import ArticleIcon from '@mui/icons-material/Article';
import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useAuth } from './AuthProvider';
import { UserDropdown } from './UserDropdown';

export function AppNavBar() {
  const { user, signOutUser } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const navLinks = [
    { label: 'Dashboard', href: '/dashboard', icon: <DashboardIcon /> },
    { label: 'User Agreement', href: '/user-agreement', icon: <ArticleIcon /> },
    { label: 'Licensing Options', href: '/licensing-options', icon: <ArticleIcon /> },
    { label: 'Profile', href: '/profile', icon: <PersonIcon /> },
    { label: 'About', href: '/about', icon: <InfoIcon /> },
  ];

  return (
    <>
      <AppBar 
        position="static" 
        elevation={0}
        sx={{
          backgroundColor: '#e2e8f0',
          borderBottom: '1px solid #e5e7eb',
          color: '#111827',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 2, px: { xs: 2, sm: 3 } }}>
          {/* Left: Logo & menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {isMobile && user && (
              <IconButton 
                edge="start" 
                onClick={toggleDrawer(true)}
                sx={{ 
                  color: '#374151',
                  '&:hover': {
                    backgroundColor: '#f3f4f6',
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Link href={user ? '/dashboard' : '/'} style={{ textDecoration: 'none' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    backgroundColor: '#3b82f6',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                  }}
                >
                  K
                </Box>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    color: '#111827', 
                    fontWeight: 800,
                    letterSpacing: '-0.05em',
                    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                  }}
                >
                  Knowlio
                </Typography>
              </Box>
            </Link>

            {!isMobile && user && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
                {navLinks.map(link => (
                  <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        px: 3,
                        py: 1.5,
                        cursor: 'pointer',
                        borderRadius: 0,
                        color: '#6b7280',
                        fontWeight: 500,
                        fontSize: '0.95rem',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: '#f9fafb',
                          color: '#374151',
                        },
                      }}
                    >
                      {link.icon}
                      <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.95rem' }}>
                        {link.label}
                      </Typography>
                    </Box>
                  </Link>
                ))}
              </Box>
            )}
          </Box>

          {/* Right: User section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {user ? (
              <UserDropdown user={user} onLogout={signOutUser} />
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Link href="/signup" style={{ textDecoration: 'none' }}>
                  <Button
                    sx={{
                      color: '#6b7280',
                      fontWeight: 500,
                      px: 3,
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: '#f9fafb',
                        color: '#374151',
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </Link>
                <Link href="/login" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      boxShadow: 'none',
                      '&:hover': {
                        backgroundColor: '#2563eb',
                        boxShadow: 'none',
                      },
                    }}
                  >
                    Login
                  </Button>
                </Link>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box 
          sx={{ 
            width: 280, 
            backgroundColor: '#ffffff',
            height: '100%',
          }} 
          role="presentation" 
          onClick={toggleDrawer(false)} 
          onKeyDown={toggleDrawer(false)}
        >
          <Box sx={{ p: 3, borderBottom: '1px solid #e5e7eb' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  backgroundColor: '#3b82f6',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                }}
              >
                K
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827' }}>
                Knowlio
              </Typography>
            </Box>
            {user && (
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                {user.email}
              </Typography>
            )}
          </Box>
          <List sx={{ pt: 2 }}>
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItem 
                  sx={{
                    py: 2,
                    px: 3,
                    '&:hover': {
                      backgroundColor: '#f9fafb',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, color: '#374151' }}>
                    {link.icon}
                    <ListItemText 
                      primary={link.label} 
                      sx={{ 
                        '& .MuiListItemText-primary': {
                          fontWeight: 500,
                          color: '#374151',
                          fontSize: '0.95rem',
                        }
                      }}
                    />
                  </Box>
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
