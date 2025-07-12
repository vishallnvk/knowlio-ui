'use client';

import { Container, Typography, Box } from '@mui/material';
import { useAuth } from '@/components/AuthProvider';
import LoadingSpinner from '@/components/LoadingSpinner';
import 'aws-amplify/auth/enable-oauth-listener'; 

export default function Home() {
  const { loading: authLoading } = useAuth();

  if (authLoading) {
    return <LoadingSpinner fullScreen />;
  } else {
      return (
        <div className="min-h-screen bg-gray-50">
          <Container maxWidth="lg" className="pt-16">
            <Box className="text-center">
              <Typography variant="h2" component="h1" className="font-bold text-gray-900 mb-4">
                Welcome to Knowlio
              </Typography>
              <Typography variant="h6" className="text-gray-600">
                Your knowledge management platform
              </Typography>
            </Box>
          </Container>
        </div>
      );
    }
}
