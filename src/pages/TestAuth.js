import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Hub } from 'aws-amplify/utils';

function TestAuth() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const simulateLogin = () => {
    // Simulate successful login
    setMessage('Simulating login...');
    
    // Emit auth event
    Hub.dispatch('auth', { event: 'signedIn', data: {} });
    
    // Simulate setting user data
    localStorage.setItem('mockUser', JSON.stringify({
      username: 'testuser@example.com',
      attributes: {
        email: 'testuser@example.com',
        name: 'Test User'
      }
    }));
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  const simulateLogout = () => {
    // Simulate logout
    setMessage('Simulating logout...');
    
    // Clear mock user data
    localStorage.removeItem('mockUser');
    
    // Emit auth event
    Hub.dispatch('auth', { event: 'signedOut', data: {} });
    
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

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
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
          </Box>

          <Box sx={{ mt: 4, textAlign: 'left' }}>
            <Typography variant="h6" gutterBottom>
              Expected Behavior:
            </Typography>
            <Typography variant="body2" component="ul">
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
