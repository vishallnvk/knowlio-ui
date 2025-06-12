'use client';

import { Container, Typography, Box } from '@mui/material';
import { useAuth } from '@/components/AuthProvider';
import 'aws-amplify/auth/enable-oauth-listener'; 

export default function Home() {
  const { loading: authLoading } = useAuth();

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
