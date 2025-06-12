'use client';

import { useAuth } from '@/components/AuthProvider';
import ContentBrowser from './ContentBrowser';
import { 
  Box,
  Typography
} from '@mui/material';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider', backgroundColor: 'background.paper' }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Content Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back, {user.username}! Manage your content library below.
        </Typography>
      </Box>

      {/* Content Browser */}
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <ContentBrowser />
      </Box>
    </Box>
  );
}
