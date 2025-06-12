'use client';

import { useAuth } from '@/components/AuthProvider';
import { 
  Container,
  Typography,
  Box,
  Card,
  CardContent
} from '@mui/material';

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <Container maxWidth="lg" className="pt-8">
      <Box className="mb-8">
        <Typography variant="h3" component="h1" className="font-bold text-gray-900 mb-2">
          Profile
        </Typography>
        <Typography variant="h6" className="text-gray-600">
          Manage your account information, {user.username}!
        </Typography>
      </Box>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Typography variant="h5" component="h2" className="font-semibold mb-4 text-gray-900">
              User Information
            </Typography>
            <Box className="space-y-3">
              <Box>
                <Typography variant="body2" className="text-gray-600 font-medium">
                  Username
                </Typography>
                <Typography variant="body1" className="text-gray-900">
                  {user.username}
                </Typography>
              </Box>
              {user.email && (
                <Box>
                  <Typography variant="body2" className="text-gray-600 font-medium">
                    Email
                  </Typography>
                  <Typography variant="body1" className="text-gray-900">
                    {user.email}
                  </Typography>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Typography variant="h5" component="h2" className="font-semibold mb-4 text-gray-900">
              Account Status
            </Typography>
            <Box className="space-y-3">
              <Box>
                <Typography variant="body2" className="text-gray-600 font-medium">
                  Status
                </Typography>
                <Typography variant="body1" className="text-green-600 font-semibold">
                  Active
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" className="text-gray-600 font-medium">
                  Last Login
                </Typography>
                <Typography variant="body1" className="text-gray-900">
                  {new Date().toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
