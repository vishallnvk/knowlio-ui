'use client';

import { useAuth } from '@/components/AuthProvider';
import { 
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Chip
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedIcon from '@mui/icons-material/Verified';

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f9fafb', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ mb: 4, p: 4, backgroundColor: 'white', border: '1px solid #e5e7eb' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Avatar 
              sx={{ 
                width: 64, 
                height: 64, 
                backgroundColor: '#374151',
                fontSize: '1.5rem',
                fontWeight: 500
              }}
            >
              {user.name?.charAt(0).toUpperCase() || user.username?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 500, mb: 1, color: '#111827' }}>
                Profile
              </Typography>
              <Typography variant="body1" sx={{ color: '#6b7280', mb: 2 }}>
                Manage your account information, {user.name || user.username || 'User'}
              </Typography>
              <Chip 
                icon={<VerifiedIcon />} 
                label="Active Account" 
                color="success"
                variant="outlined"
                sx={{ fontWeight: 400 }}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          {/* User Information */}
          <Card sx={{ backgroundColor: 'white', border: '1px solid #e5e7eb', boxShadow: 'none' }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, pb: 2, borderBottom: '1px solid #f3f4f6' }}>
                <PersonIcon sx={{ color: '#6b7280', mr: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 500, color: '#111827' }}>
                  User Information
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {user.name && (
                  <Box>
                    <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 400, mb: 1, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                      Name
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#111827', fontWeight: 400 }}>
                      {user.name}
                    </Typography>
                  </Box>
                )}
                
                {user.email && (
                  <Box>
                    <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 400, mb: 1, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                      Email Address
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#111827', fontWeight: 400 }}>
                      {user.email}
                    </Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>

          {/* Account Status */}
          <Card sx={{ backgroundColor: 'white', border: '1px solid #e5e7eb', boxShadow: 'none' }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, pb: 2, borderBottom: '1px solid #f3f4f6' }}>
                <VerifiedIcon sx={{ color: '#6b7280', mr: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 500, color: '#111827' }}>
                  Account Status
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Box>
                  <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 400, mb: 1, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                    Status
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ 
                      width: 8, 
                      height: 8, 
                      backgroundColor: '#10b981', 
                      borderRadius: '50%' 
                    }} />
                    <Typography variant="body1" sx={{ color: '#10b981', fontWeight: 400 }}>
                      Active
                    </Typography>
                  </Box>
                </Box>
                
                <Box>
                  <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 400, mb: 1, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                    Last Login
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#111827', fontWeight: 400 }}>
                    {new Date().toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
