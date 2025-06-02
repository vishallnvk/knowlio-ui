import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, signOut, fetchUserAttributes } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const pages = ['Home', 'About', 'Contact', 'TestAuth'];

function Navigation() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [user, setUser] = useState(null);
  const [userAttributes, setUserAttributes] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  useEffect(() => {
    // Check user on component mount and when the URL changes
    // This helps with catching redirects from OAuth
    checkUser();
    
    // Re-check user every few seconds when page loads after redirect
    // This helps with timing issues in OAuth flow
    const initialCheckInterval = setInterval(() => {
      checkUser();
    }, 1000);
    
    // Clear the interval after 5 seconds
    setTimeout(() => clearInterval(initialCheckInterval), 5000);

    // Listen for auth events
    const unsubscribe = Hub.listen('auth', ({ payload }) => {
      console.log('Auth event:', payload.event);
      switch (payload.event) {
        case 'signedIn':
        case 'signInWithRedirect_success':
        case 'customOAuthState':
          checkUser();
          break;
        case 'signedOut':
          setUser(null);
          setUserAttributes(null);
          break;
        default:
          // For any other auth event, try to check user as well
          checkUser();
          break;
      }
    });

    return () => {
      unsubscribe();
      clearInterval(initialCheckInterval);
    };
  }, []);

  const checkUser = async () => {
    try {
      // Check for mock user first (for testing)
      const mockUser = localStorage.getItem('mockUser');
      if (mockUser) {
        const userData = JSON.parse(mockUser);
        setUser({ username: userData.username });
        setUserAttributes(userData.attributes);
        return;
      }

      // Check for real Cognito user
      const currentUser = await getCurrentUser();
      console.log('Current user:', currentUser);
      
      try {
        const attributes = await fetchUserAttributes();
        console.log('User attributes:', attributes);
        setUser(currentUser);
        setUserAttributes(attributes);
      } catch (attrError) {
        console.error('Error fetching user attributes:', attrError);
        // Still set the user even if attributes fail
        setUser(currentUser);
      }
    } catch (error) {
      console.error('Error checking user:', error);
      // User is not authenticated
      setUser(null);
      setUserAttributes(null);
    }
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigate = (page) => {
    let path;
    if (page === 'Home') {
      path = '/';
    } else if (page === 'TestAuth') {
      path = '/test-auth';
    } else {
      path = `/${page.toLowerCase()}`;
    }
    navigate(path);
    handleCloseNavMenu();
  };

  const handleLogout = async () => {
    try {
      // Clear mock user if exists
      localStorage.removeItem('mockUser');
      
      // Try to sign out from Cognito
      try {
        await signOut();
      } catch (cognitoError) {
        // Ignore Cognito errors if using mock auth
      }
      
      setUser(null);
      setUserAttributes(null);
      navigate('/');
      handleCloseUserMenu();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{ backgroundColor: 'primary.main' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo/Brand - Desktop */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            KNOWLIO
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleNavigate(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
              {user ? (
                <>
                  <MenuItem>
                    <Typography textAlign="center">
                      Hi, {userAttributes?.name || userAttributes?.email?.split('@')[0] || user?.username?.split('@')[0] || 'User'}!
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={() => handleNavigate('dashboard')}>
                    <Typography textAlign="center">Dashboard</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </>
              ) : (
                <MenuItem onClick={() => handleNavigate('login')}>
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>

          {/* Logo/Brand - Mobile */}
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            KNOWLIO
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavigate(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* User Menu / Login Button - Desktop */}
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            {user ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body1" sx={{ color: 'white' }}>
                  Hi, {userAttributes?.name || userAttributes?.email?.split('@')[0] || user?.username?.split('@')[0] || 'User'}!
                </Typography>
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, color: 'white' }}
                >
                  <AccountCircleIcon sx={{ fontSize: 32 }} />
                </IconButton>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={() => { navigate('/dashboard'); handleCloseUserMenu(); }}>
                    <Typography textAlign="center">Dashboard</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Button
                variant="outlined"
                onClick={() => navigate('/login')}
                sx={{
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  },
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navigation;
