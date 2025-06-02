import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Alert,
  Button,
  Chip,
} from '@mui/material';
import { 
  Person as PersonIcon,
  Email as EmailIcon, 
  AccessTime as AccessTimeIcon, 
  VerifiedUser as VerifiedUserIcon,
} from '@mui/icons-material';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';

/**
 * Dashboard - User dashboard component shown after authentication
 * Displays user information and authentication status
 */
function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userAttributes, setUserAttributes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get authenticated user data on component mount
    checkUser();
  }, []);

  /**
   * Check for authenticated user and fetch their attributes
   */
  const checkUser = async () => {
    try {
      setLoading(true);

      // Check for mock user first (for testing)
      const mockUser = localStorage.getItem('mockUser');
      if (mockUser) {
        const userData = JSON.parse(mockUser);
        setUser({ username: userData.username });
        setUserAttributes(userData.attributes);
        setLoading(false);
        return;
      }

      // Check for real Cognito user
      const currentUser = await getCurrentUser();
      
      try {
        const attributes = await fetchUserAttributes();
        setUser(currentUser);
        setUserAttributes(attributes);
      } catch (attrError) {
        console.error('Error fetching user attributes:', attrError);
        // Still set the user even if attributes fail
        setUser(currentUser);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error checking user:', error);
      setError('You must be logged in to view this page');
      setLoading(false);
      // Redirect to login if not authenticated
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper sx={{ p: 4 }}>
          <Box mb={3}>
            <Skeleton variant="text" width="60%" height={60} />
            <Skeleton variant="text" width="40%" />
          </Box>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Skeleton variant="rectangular" height={200} />
            </Grid>
            <Grid item xs={12} md={8}>
              <Skeleton variant="rectangular" height={200} />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }

  // Show error if not authenticated
  if (error) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button
          variant="contained"
          onClick={() => navigate('/login')}
          fullWidth
        >
          Go to Login
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={4}>
        {/* Header */}
        <Grid item xs={12}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight={600}>
            Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Welcome back! Here's an overview of your account.
          </Typography>
        </Grid>

        {/* User Profile Card */}
        <Grid item xs={12} md={4}>
          <Card elevation={1}>
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: 'primary.main',
                  fontSize: '2rem',
                  mb: 2
                }}
              >
                {userAttributes?.name ? userAttributes.name.charAt(0) : 'U'}
              </Avatar>
              <Typography variant="h5" component="h2" gutterBottom>
                {userAttributes?.name || 'User'}
              </Typography>
              <Chip
                icon={<VerifiedUserIcon />}
                label="Authenticated User"
                color="primary"
                size="small"
                sx={{ mb: 2 }}
              />
              <Typography variant="body2" color="text.secondary" textAlign="center">
                Logged in with {user?.username?.includes('@') ? 'Email' : 'Google'}
              </Typography>
            </Box>
            <Divider />
            <CardContent>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Username" 
                    secondary={user?.username || 'N/A'} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Email" 
                    secondary={userAttributes?.email || 'N/A'} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AccessTimeIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Last Sign In" 
                    secondary={new Date().toLocaleString()} 
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4, height: '100%' }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Authentication Details
            </Typography>
            <Typography variant="body1" paragraph>
              You've successfully authenticated using AWS Cognito. This secure authentication 
              system provides user management and authentication features to help protect
              your application.
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Available User Attributes:
              </Typography>
              <Grid container spacing={2}>
                {userAttributes && Object.entries(userAttributes).map(([key, value]) => (
                  <Grid item xs={12} sm={6} key={key}>
                    <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                      <Typography variant="subtitle2" color="primary">
                        {key}:
                      </Typography>
                      <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                        {value}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
                {(!userAttributes || Object.keys(userAttributes).length === 0) && (
                  <Grid item xs={12}>
                    <Alert severity="info">
                      No user attributes found. Google authentication may not provide all attributes.
                    </Alert>
                  </Grid>
                )}
              </Grid>
            </Box>
            
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => navigate('/test-auth')}
              sx={{ mr: 2 }}
            >
              Test Auth Page
            </Button>
            
            <Button 
              variant="outlined"
              onClick={() => navigate('/')}
            >
              Return Home
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
