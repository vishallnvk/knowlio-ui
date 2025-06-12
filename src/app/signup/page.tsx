'use client';

import { 
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { signUp, confirmSignUp, signInWithRedirect } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [confirmationCode, setConfirmationCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const router = useRouter();
  const { loading: authLoading } = useAuth();

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await signUp({
        username: formData.email,
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.email,
            name: formData.name
          }
        }
      });
      setNeedsConfirmation(true);
    } catch (error: any) {
      setError(error.message || 'An error occurred during sign up');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await confirmSignUp({
        username: formData.email,
        confirmationCode: confirmationCode
      });
      router.push('/login');
    } catch (error: any) {
      setError(error.message || 'An error occurred during confirmation');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithRedirect({ provider: 'Google' });
    } catch (error: any) {
      console.error('Google sign up error:', error);
      setError(error.message || 'An error occurred during Google sign up');
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <Typography variant="h6" className="text-gray-600">
            Loading
          </Typography>
        </Box>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Signup Form */}
      <Container maxWidth="sm" className="pt-16">
        <Paper elevation={3} className="p-8">
          <Box className="text-center mb-6">
            <Typography variant="h4" component="h1" className="font-bold text-gray-900 mb-2">
              {needsConfirmation ? 'Confirm Your Email' : 'Create Account'}
            </Typography>
            <Typography variant="body1" className="text-gray-600">
              {needsConfirmation ? 'Enter the confirmation code sent to your email' : 'Join Knowlio today'}
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" className="mb-4">
              {error}
            </Alert>
          )}

          {!needsConfirmation ? (
            <Box component="form" onSubmit={handleSignUp} className="space-y-4">
              <TextField
                fullWidth
                label="Full Name"
                type="text"
                variant="outlined"
                required
                value={formData.name}
                onChange={handleInputChange('name')}
                className="mb-4"
              />

              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                required
                value={formData.email}
                onChange={handleInputChange('email')}
                className="mb-4"
              />
              
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                required
                value={formData.password}
                onChange={handleInputChange('password')}
                className="mb-4"
              />

              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                variant="outlined"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
                className="mb-6"
              />

              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                disabled={loading}
                className="mb-4"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>

              <Box className="text-center mb-4">
                <Typography variant="body2" className="text-gray-500 mb-4">
                  or
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="outlined"
                size="large"
                onClick={handleGoogleSignUp}
                disabled={loading}
                className="mb-4"
                sx={{
                  borderColor: '#db4437',
                  color: '#db4437',
                  '&:hover': {
                    borderColor: '#c23321',
                    backgroundColor: '#fdf2f2'
                  }
                }}
              >
                Continue with Google
              </Button>

              <Box className="text-center">
                <Typography variant="body2" className="text-gray-600">
                  Already have an account?{' '}
                  <Link href="/login" className="text-blue-600 hover:underline">
                    Sign in
                  </Link>
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleConfirmSignUp} className="space-y-4">
              <TextField
                fullWidth
                label="Confirmation Code"
                type="text"
                variant="outlined"
                required
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                className="mb-6"
              />

              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                disabled={loading}
                className="mb-4"
              >
                {loading ? 'Confirming...' : 'Confirm Account'}
              </Button>

              <Box className="text-center">
                <Typography variant="body2" className="text-gray-600">
                  Already have an account?{' '}
                  <Link href="/login" className="text-blue-600 hover:underline">
                    Sign in
                  </Link>
                </Typography>
              </Box>
            </Box>
          )}
        </Paper>
      </Container>
    </div>
  );
}
