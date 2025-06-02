import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Avatar,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, signOut, fetchUserAttributes } from 'aws-amplify/auth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userAttributes, setUserAttributes] = useState(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      // Check for mock user first (for testing)
      const mockUser = localStorage.getItem('mockUser');
      if (mockUser) {
        const userData = JSON.parse(mockUser);
        setUser({ 
          userId: 'mock-user-id',
          username: userData.username 
        });
        setUserAttributes(userData.attributes);
        setLoading(false);
        return;
      }

      // Check for real Cognito user
      const currentUser = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      setUser(currentUser);
      setUserAttributes(attributes);
    } catch (error) {
      console.error('Not authenticated', error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            border: '1px solid',
            borderColor: 'grey.200',
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Avatar
            sx={{
              width: 100,
              height: 100,
              mx: 'auto',
              mb: 3,
              bgcolor: 'primary.main',
            }}
          >
            <AccountCircleIcon sx={{ fontSize: 60 }} />
          </Avatar>

          <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
            Welcome, {userAttributes?.name || userAttributes?.email?.split('@')[0] || 'User'}!
          </Typography>

          <Typography variant="h5" color="text.secondary" gutterBottom>
            You have successfully logged in to Knowlio
          </Typography>

          <Box sx={{ mt: 4, mb: 3 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                backgroundColor: 'grey.50',
                border: '1px solid',
                borderColor: 'grey.200',
              }}
            >
              <Typography variant="h6" gutterBottom>
                User Information
              </Typography>
              <Box sx={{ textAlign: 'left', mt: 2 }}>
                <Typography variant="body1" gutterBottom>
                  <strong>Email:</strong> {userAttributes?.email || 'N/A'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Name:</strong> {userAttributes?.name || 'N/A'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>User ID:</strong> {user?.userId || 'N/A'}
                </Typography>
                <Typography variant="body1">
                  <strong>Username:</strong> {user?.username || 'N/A'}
                </Typography>
              </Box>
            </Paper>
          </Box>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            This is a dummy dashboard page. In a real application, this would show your
            personalized content and features.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/')}
            >
              Go to Home Page
            </Button>
            <Button
              variant="outlined"
              size="large"
              color="error"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </Box>
        </Paper>

        <Box textAlign="center" mt={4}>
          <Typography variant="caption" color="text.secondary">
            This dashboard demonstrates successful authentication with AWS Cognito.
            <br />
            You can sign in using your email/password or through Google OAuth.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Dashboard;
