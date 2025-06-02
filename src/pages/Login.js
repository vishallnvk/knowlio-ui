import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
  Divider,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import { signIn, signUp, confirmSignUp, signInWithRedirect } from 'aws-amplify/auth';

function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('signin'); // 'signin', 'signup', or 'confirm'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    confirmationCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'confirm') {
        // Confirm sign up
        const { isSignUpComplete } = await confirmSignUp({
          username: formData.email,
          confirmationCode: formData.confirmationCode,
        });
        
        if (isSignUpComplete) {
          setMode('signin');
          setError('');
          alert('Email confirmed! You can now sign in.');
        }
      } else if (mode === 'signup') {
        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        
        // Sign up with Cognito
        const { isSignUpComplete, userId, nextStep } = await signUp({
          username: formData.email,
          password: formData.password,
          options: {
            userAttributes: {
              email: formData.email,
              name: formData.name,
            },
          },
        });
        
        if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
          setMode('confirm');
          alert('Please check your email for a confirmation code.');
        }
      } else {
        // Sign in with Cognito
        const { isSignedIn, nextStep } = await signIn({
          username: formData.email,
          password: formData.password,
        });
        
        if (isSignedIn) {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      await signInWithRedirect({ provider });
    } catch (err) {
      setError(err.message || 'An error occurred during social login');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 2, md: 4 },
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
          }}
        >
          <Box textAlign="center" mb={4}>
            <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
              {mode === 'signin' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Confirm Email'}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {mode === 'signin'
                ? 'Sign in to your account to continue'
                : mode === 'signup'
                ? 'Sign up to get started with Knowlio'
                : 'Enter the confirmation code sent to your email'}
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            {mode === 'confirm' ? (
              <>
                <TextField
                  fullWidth
                  label="Confirmation Code"
                  name="confirmationCode"
                  value={formData.confirmationCode}
                  onChange={handleChange}
                  margin="normal"
                  required
                  autoComplete="one-time-code"
                  helperText="Check your email for the 6-digit code"
                />
              </>
            ) : (
              <>
                {mode === 'signup' && (
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    margin="normal"
                    required
                    autoComplete="name"
                  />
                )}

                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  margin="normal"
                  required
                  autoComplete="email"
                  disabled={mode === 'confirm'}
                />

                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  margin="normal"
                  required
                  autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {mode === 'signup' && (
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    margin="normal"
                    required
                    autoComplete="new-password"
                  />
                )}
              </>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : mode === 'signin' ? (
                'Sign In'
              ) : mode === 'signup' ? (
                'Create Account'
              ) : (
                'Confirm Email'
              )}
            </Button>
          </form>

          {mode !== 'confirm' && (
            <>
              <Divider sx={{ my: 3 }}>OR</Divider>

              {/* Social Login Buttons */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  onClick={() => handleSocialLogin('Google')}
                  startIcon={<GoogleIcon />}
                  sx={{
                    borderColor: 'grey.300',
                    color: 'text.primary',
                    '&:hover': {
                      borderColor: 'grey.400',
                      backgroundColor: 'grey.50',
                    },
                  }}
                >
                  Continue with Google
                </Button>
              </Box>
            </>
          )}

          {/* Toggle between signin and signup */}
          <Box textAlign="center" mt={3}>
            <Typography variant="body2" color="text.secondary">
              {mode === 'confirm' ? (
                <>
                  Need to change email?{' '}
                  <Link
                    component="button"
                    variant="body2"
                    onClick={(e) => {
                      e.preventDefault();
                      setMode('signup');
                      setError('');
                    }}
                    sx={{ fontWeight: 600 }}
                  >
                    Go back
                  </Link>
                </>
              ) : (
                <>
                  {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
                  <Link
                    component="button"
                    variant="body2"
                    onClick={(e) => {
                      e.preventDefault();
                      setMode(mode === 'signin' ? 'signup' : 'signin');
                      setError('');
                    }}
                    sx={{ fontWeight: 600 }}
                  >
                    {mode === 'signin' ? 'Sign up' : 'Sign in'}
                  </Link>
                </>
              )}
            </Typography>
          </Box>

          {mode === 'signin' && (
            <Box textAlign="center" mt={2}>
              <Link
                component="button"
                variant="body2"
                onClick={(e) => {
                  e.preventDefault();
                  console.log('Forgot password');
                }}
                sx={{ color: 'text.secondary' }}
              >
                Forgot your password?
              </Link>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;
