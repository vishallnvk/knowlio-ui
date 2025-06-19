'use client';

import { useAuth } from '@/components/AuthProvider';
import { useLicenseStatus, useLicenseAgreement, signLicenseAgreement } from '@/lib/api/license';
import { useState } from 'react';
import { 
  Box,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  Button,
  Link as MuiLink,
  Divider,
  Alert,
  Card,
  CardContent,
  Chip,
  Stack
} from '@mui/material';
import Link from 'next/link';
import ArticleIcon from '@mui/icons-material/Article';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useQueryClient } from '@tanstack/react-query';

export default function LicensePage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: licenseStatus, isLoading: isStatusLoading, error: statusError } = useLicenseStatus();
  const { data: licenseAgreement, isLoading: isAgreementLoading } = useLicenseAgreement();
  
  const [agreements, setAgreements] = useState({
    terms: false,
    contentManagement: false,
    dataPrivacy: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!user) {
    return null;
  }

  const handleAgreementChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgreements({
      ...agreements,
      [event.target.name]: event.target.checked
    });
  };

  const allAgreed = agreements.terms && agreements.contentManagement && agreements.dataPrivacy;

  const handleSignAgreement = async () => {
    if (!allAgreed) return;
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      await signLicenseAgreement(agreements);
      // Invalidate and refetch license status
      queryClient.invalidateQueries({ queryKey: ['licenseStatus'] });
    } catch (error: any) {
      setSubmitError(error.message || 'Failed to sign license agreement');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isStatusLoading) {
    return (
      <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </Box>
    );
  }

  if (statusError) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          <Typography variant="h6">Error Loading License Information</Typography>
          <Typography variant="body2">
            {statusError instanceof Error ? statusError.message : 'An error occurred while loading license information'}
          </Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider', backgroundColor: 'background.paper' }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
          License Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome, {user.username}! Manage your license agreements below.
        </Typography>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 3, backgroundColor: '#f9fafb' }}>
        <Paper sx={{ maxWidth: 900, mx: 'auto', overflow: 'hidden' }}>
          {licenseStatus?.isSigned ? (
            // Signed License View
            <Box>
              <Box sx={{ p: 3, backgroundColor: '#f0fdf4', borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 2 }}>
                <CheckCircleIcon color="success" sx={{ fontSize: 32 }} />
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 'medium', color: '#166534' }}>
                    License Agreement Signed
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Your license agreement is active and valid.
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ p: 3 }}>
                <Card variant="outlined" sx={{ mb: 3 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          License Details
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          License ID: {licenseStatus.licenseId}
                        </Typography>
                      </Box>
                      <Chip 
                        icon={<VerifiedIcon />} 
                        label="Active" 
                        color="success" 
                        variant="outlined" 
                      />
                    </Box>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Stack spacing={2}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">License Type</Typography>
                        <Typography variant="body2" fontWeight="medium">{licenseStatus.licenseType}</Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">Signed Date</Typography>
                        <Typography variant="body2">{formatDate(licenseStatus.signedAt)}</Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">Expiration Date</Typography>
                        <Typography variant="body2">{formatDate(licenseStatus.expiresAt)}</Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Button
                    component={Link}
                    href="/license/agreement"
                    startIcon={<ArticleIcon />}
                    variant="outlined"
                    color="primary"
                  >
                    View License Agreement
                  </Button>
                  
                  <Typography variant="body2" color="text.secondary">
                    Need help? <MuiLink href="#" underline="hover">Contact Support</MuiLink>
                  </Typography>
                </Box>
              </Box>
            </Box>
          ) : (
            // Unsigned License View
            <Box>
              <Box sx={{ p: 3, backgroundColor: '#fff7ed', borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="h5" sx={{ fontWeight: 'medium', color: '#9a3412' }}>
                  License Agreement Required
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Please review and sign the license agreement to continue using all features.
                </Typography>
              </Box>
              
              <Box sx={{ p: 3 }}>
                {submitError && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {submitError}
                  </Alert>
                )}
                
                <Typography variant="h6" gutterBottom>
                  License Agreement
                </Typography>
                
                <Typography variant="body2" paragraph>
                  Before using our platform, please review and agree to the following terms:
                </Typography>
                
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 2, 
                    mb: 3, 
                    maxHeight: 200, 
                    overflow: 'auto',
                    backgroundColor: '#f9fafb'
                  }}
                >
                  {isAgreementLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </Box>
                  ) : (
                    <Typography variant="body2">
                      {licenseAgreement?.content || 
                        `This License Agreement ("Agreement") is entered into between Knowlio ("Licensor") and the user ("Licensee").
                        
                        1. GRANT OF LICENSE
                        Subject to the terms of this Agreement, Licensor grants Licensee a non-exclusive, non-transferable license to use the Knowlio platform.
                        
                        2. RESTRICTIONS
                        Licensee shall not: (a) modify, translate, reverse engineer, decompile, or disassemble the software; (b) create derivative works; (c) sublicense or permit third parties to use the software.
                        
                        3. PROPRIETARY RIGHTS
                        Licensor retains all right, title, and interest in the software and documentation.
                        
                        4. TERM AND TERMINATION
                        This Agreement is effective until terminated. Licensor may terminate this Agreement if Licensee fails to comply with its terms.
                        
                        5. DISCLAIMER OF WARRANTY
                        THE SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND.
                        
                        6. LIMITATION OF LIABILITY
                        IN NO EVENT SHALL LICENSOR BE LIABLE FOR ANY DAMAGES WHATSOEVER ARISING OUT OF THE USE OF OR INABILITY TO USE THE SOFTWARE.`
                      }
                    </Typography>
                  )}
                </Paper>
                
                <Button
                  component={Link}
                  href="/license/agreement"
                  startIcon={<ArticleIcon />}
                  variant="text"
                  sx={{ mb: 3 }}
                >
                  View Full License Agreement
                </Button>
                
                <Typography variant="h6" gutterBottom>
                  Acceptance
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={agreements.terms} 
                        onChange={handleAgreementChange} 
                        name="terms" 
                      />
                    }
                    label="I have read and agree to the Terms and Conditions"
                  />
                  
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={agreements.contentManagement} 
                        onChange={handleAgreementChange} 
                        name="contentManagement" 
                      />
                    }
                    label="I agree to the Content Management policies"
                  />
                  
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={agreements.dataPrivacy} 
                        onChange={handleAgreementChange} 
                        name="dataPrivacy" 
                      />
                    }
                    label="I consent to the Data Privacy and Usage policies"
                  />
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={!allAgreed || isSubmitting}
                    onClick={handleSignAgreement}
                    sx={{ px: 4 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        Signing...
                      </>
                    ) : (
                      'Agree and Sign'
                    )}
                  </Button>
                  
                  <Typography variant="body2" color="text.secondary">
                    Need help? <MuiLink href="#" underline="hover">Contact Support</MuiLink>
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
}
