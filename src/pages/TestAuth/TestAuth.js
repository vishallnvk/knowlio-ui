import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Alert,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Hub } from 'aws-amplify/utils';

/**
 * TestAuth - A development component to test authentication flow
 * Allows simulation of login/logout without actual Cognito credentials
 */
function TestAuth() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  /**
   * Simulate successful user login
   * Creates mock user data in localStorage and emits auth events
   */
  const simulateLogin = () => {
    // Simulate successful login
    setMessage('Simulating login...');
    
    // Create mock user data
    const mockUser = {
      username: 'testuser@example.com',
      attributes: {
        email: 'testuser@example.com',
        name: 'Test User'
      }
    };
    
    // Store mock user in localStorage
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    
    // Emit auth event to trigger UI updates
    Hub.dispatch('auth', { event: 'signedIn', data: {} });
    
    // Navigate to dashboard after brief delay
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  /**
   * Simulate user logout
   * Clears mock user data and emits auth events
   */
  const simulateLogout = () => {
    // Show logout message
    setMessage('Simulating logout...');
    
    // Clear mock user data
    localStorage.removeItem('mockUser');
    
    // Emit auth event
    Hub.dispatch('auth', { event: 'signedOut', data: {} });
    
    // Navigate to home page after brief delay
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="sm">
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
          <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
            Test Authentication Flow
          </Typography>

          <Typography variant="body1" color="text.secondary" gutterBottom>
            Use this page to test the authentication flow without actual Cognito credentials
          </Typography>

          {message && (
            <Alert severity="info" sx={{ my: 2 }}>
              {message}
            </Alert>
          )}

          <Stack 
            direction="column" 
            spacing={2} 
            sx={{ mt: 4 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={simulateLogin}
              fullWidth
            >
              Simulate Login
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={simulateLogout}
              fullWidth
            >
              Simulate Logout
            </Button>
          </Stack>

          <Box sx={{ mt: 4, textAlign: 'left' }}>
            <Typography variant="h6" gutterBottom>
              Expected Behavior:
            </Typography>
            <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
              <li>Click "Simulate Login" to mock a successful authentication</li>
              <li>Navigation bar should update to show "Hi, Test User!"</li>
              <li>You'll be redirected to the Dashboard page</li>
              <li>Dashboard will show user information</li>
              <li>Logout button in navigation will redirect to homepage</li>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default TestAuth;
