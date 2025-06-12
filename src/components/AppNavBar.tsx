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
  Chip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useAuth } from './AuthProvider';
import { UserDropdown } from './UserDropdown';

export function AppNavBar() {
  const { user, signOutUser } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const navLinks = [
    { label: 'Dashboard', href: '/dashboard', icon: <DashboardIcon /> },
    { label: 'Profile', href: '/profile', icon: <PersonIcon /> },
    { label: 'About', href: '/about', icon: <InfoIcon /> },
  ];

  return (
    <>
      <AppBar 
        position="static" 
        elevation={0}
        sx={{
          backgroundColor: '#1f2937', // Dark slate gray
          borderBottom: '1px solid #374151',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Left: Logo & menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {isMobile && user && (
              <IconButton 
                edge="start" 
                color="inherit" 
                onClick={toggleDrawer(true)}
                sx={{ color: 'white' }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Link href={user ? '/dashboard' : '/'} style={{ textDecoration: 'none' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }}>
                <Avatar 
                  sx={{ 
                    width: 36, 
                    height: 36, 
                    backgroundColor: '#6366f1',
                    color: 'white',
                    fontSize: '1.1rem',
                    fontWeight: 'bold'
                  }}
                >
                  K
                </Avatar>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: 'white', 
                    fontWeight: 700,
                    letterSpacing: '-0.025em'
                  }}
                >
                  Knowlio
                </Typography>
              </Box>
            </Link>

            {!isMobile && user && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 3 }}>
                {navLinks.map(link => (
                  <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
                    <Button 
                      color="inherit" 
                      startIcon={link.icon}
                      sx={{
                        color: '#d1d5db',
                        fontWeight: 500,
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        textTransform: 'none',
                        '&:hover': {
                          backgroundColor: '#374151',
                          color: 'white',
                        },
                      }}
                    >
                      {link.label}
                    </Button>
                  </Link>
                ))}
              </Box>
            )}
          </Box>

          {/* Right: User section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {user ? (
              <UserDropdown user={user} onLogout={signOutUser} />
            ) : (
              <Link href="/login" style={{ textDecoration: 'none' }}>
                <Button
                  variant="outlined"
                  sx={{
                    color: '#6366f1',
                    borderColor: '#6366f1',
                    fontWeight: 500,
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    textTransform: 'none',
                    backgroundColor: 'white',
                    '&:hover': {
                      borderColor: '#4f46e5',
                      backgroundColor: '#f8fafc',
                    },
                  }}
                >
                  Login
                </Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box 
          sx={{ 
            width: 280, 
            backgroundColor: '#1f2937',
            height: '100%',
            color: 'white'
          }} 
          role="presentation" 
          onClick={toggleDrawer(false)} 
          onKeyDown={toggleDrawer(false)}
        >
          <Box sx={{ p: 3, borderBottom: '1px solid #374151' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'white' }}>
              Knowlio
            </Typography>
            {user && (
              <Typography variant="body2" sx={{ color: '#9ca3af', mt: 1 }}>
                Welcome, {user.username}
              </Typography>
            )}
          </Box>
          <List sx={{ pt: 2 }}>
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItem 
                  sx={{
                    py: 1.5,
                    px: 3,
                    '&:hover': {
                      backgroundColor: '#374151',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: '#d1d5db' }}>
                    {link.icon}
                    <ListItemText 
                      primary={link.label} 
                      sx={{ 
                        '& .MuiListItemText-primary': {
                          fontWeight: 500,
                          color: '#d1d5db'
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
