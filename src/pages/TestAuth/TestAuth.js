import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Alert,
  Stack,
  TextField,
  FormControl
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
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');

  /**
   * Simulate successful user login
   * Creates mock user data in localStorage and emits auth events
   */
  const simulateLogin = () => {
    // Simulate successful login
    setMessage('Simulating login...');
    
    // Use entered email or default if empty
    const email = userEmail.trim() || 'user@example.com';
    // Save to localStorage for future use
    localStorage.setItem('userEmail', email);
    const userName = email.split('@')[0];
    
    // Create mock user data with actual email
    const mockUser = {
      username: userEmail, 
      attributes: {
        email: userEmail,
        name: userName.charAt(0).toUpperCase() + userName.slice(1), // Capitalize first letter
        given_name: userName.charAt(0).toUpperCase() + userName.slice(1)
      }
    };
    
    // Store mock user in localStorage
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    
    // Emit auth event to trigger UI updates
    Hub.dispatch('auth', { event: 'signedIn', data: {} });
    
    // Navigate to publisher dashboard after brief delay
    setTimeout(() => {
      navigate('/publisher-dashboard');
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

          <Box sx={{ mt: 3, mb: 4 }}>
            <FormControl fullWidth>
              <TextField
                label="Your Email Address"
                variant="outlined"
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Enter your email for the mock login"
                helperText="This will be used to display your name after login"
                sx={{ mb: 1 }}
              />
            </FormControl>
          </Box>

          <Stack 
            direction="column" 
            spacing={2} 
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
              <li>Navigation bar should update to show your first name</li>
              <li>You'll be redirected to the Publisher Dashboard page</li>
              <li>Publisher Dashboard will show your content library</li>
              <li>Logout button in navigation will redirect to homepage</li>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default TestAuth;
