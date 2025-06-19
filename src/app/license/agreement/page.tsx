'use client';

import { useAuth } from '@/components/AuthProvider';
import { useLicenseAgreement } from '@/lib/api/license';
import { 
  Box,
  Typography,
  Paper,
  Button,
  Breadcrumbs,
  Link as MuiLink,
  Alert,
  Divider
} from '@mui/material';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DescriptionIcon from '@mui/icons-material/Description';

export default function LicenseAgreementPage() {
  const { user } = useAuth();
  const { data: licenseAgreement, isLoading, error } = useLicenseAgreement();

  if (!user) {
    return null;
  }

  if (isLoading) {
    return (
      <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          <Typography variant="h6">Error Loading License Agreement</Typography>
          <Typography variant="body2">
            {error instanceof Error ? error.message : 'An error occurred while loading the license agreement'}
          </Typography>
        </Alert>
      </Box>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider', backgroundColor: 'background.paper' }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
          <MuiLink 
            component={Link} 
            href="/dashboard" 
            underline="hover" 
            color="inherit"
          >
            Dashboard
          </MuiLink>
          <MuiLink 
            component={Link} 
            href="/license" 
            underline="hover" 
            color="inherit"
          >
            License
          </MuiLink>
          <Typography color="text.primary">Agreement</Typography>
        </Breadcrumbs>
        
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
          License Agreement
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Full terms and conditions for using the Knowlio platform.
        </Typography>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 3, backgroundColor: '#f9fafb' }}>
        <Paper sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <DescriptionIcon color="primary" sx={{ fontSize: 32 }} />
              <Box>
                <Typography variant="h5">
                  {licenseAgreement?.title || 'Knowlio License Agreement'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Version {licenseAgreement?.version || '1.0'} • Last Updated: {formatDate(licenseAgreement?.updatedAt)}
                </Typography>
              </Box>
            </Box>
            
            <Button
              component={Link}
              href="/license"
              startIcon={<ArrowBackIcon />}
              variant="outlined"
            >
              Back to License
            </Button>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
              {licenseAgreement?.content || `
This License Agreement ("Agreement") is entered into between Knowlio ("Licensor") and the user ("Licensee").

1. GRANT OF LICENSE
Subject to the terms of this Agreement, Licensor grants Licensee a non-exclusive, non-transferable license to use the Knowlio platform.

2. RESTRICTIONS
Licensee shall not:
(a) modify, translate, reverse engineer, decompile, or disassemble the software;
(b) create derivative works based on the software;
(c) sublicense, rent, lease, or otherwise transfer rights to the software;
(d) remove any proprietary notices or labels on the software;
(e) use the software in any manner that infringes the intellectual property rights of Licensor or any third party.

3. PROPRIETARY RIGHTS
Licensor retains all right, title, and interest in the software and documentation. The software is protected by copyright and other intellectual property laws and treaties.

4. TERM AND TERMINATION
This Agreement is effective until terminated. Licensor may terminate this Agreement if Licensee fails to comply with its terms. Upon termination, Licensee must cease all use of the software and destroy all copies.

5. DISCLAIMER OF WARRANTY
THE SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NONINFRINGEMENT.

6. LIMITATION OF LIABILITY
IN NO EVENT SHALL LICENSOR BE LIABLE FOR ANY DAMAGES WHATSOEVER (INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF BUSINESS PROFITS, BUSINESS INTERRUPTION, LOSS OF BUSINESS INFORMATION, OR ANY OTHER PECUNIARY LOSS) ARISING OUT OF THE USE OF OR INABILITY TO USE THE SOFTWARE, EVEN IF LICENSOR HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.

7. GOVERNING LAW
This Agreement shall be governed by and construed in accordance with the laws of the jurisdiction in which Licensor is located, without giving effect to any principles of conflicts of law.

8. ENTIRE AGREEMENT
This Agreement constitutes the entire agreement between the parties concerning the subject matter hereof and supersedes all prior and contemporaneous agreements and understandings, whether oral or written.

9. AMENDMENTS
Licensor reserves the right to amend this Agreement at any time by posting the amended terms on its website. Continued use of the software after such posting shall constitute acceptance of the amended terms.

10. SEVERABILITY
If any provision of this Agreement is held to be unenforceable, such provision shall be reformed only to the extent necessary to make it enforceable, and the remaining provisions shall remain in full force and effect.

11. WAIVER
The failure of Licensor to enforce any right or provision of this Agreement shall not constitute a waiver of such right or provision.

12. ASSIGNMENT
Licensee may not assign or transfer this Agreement or any rights hereunder without the prior written consent of Licensor. Any attempt to do so shall be void.

13. NOTICES
All notices required or permitted under this Agreement shall be in writing and shall be deemed effective upon receipt.

14. EXPORT RESTRICTIONS
Licensee agrees to comply with all applicable international and national laws that apply to the software, including the U.S. Export Administration Regulations.

15. GOVERNMENT USERS
If Licensee is a U.S. government entity, the software is provided with RESTRICTED RIGHTS as set forth in subparagraphs (a) through (d) of the Commercial Computer Software-Restricted Rights clause at FAR 52.227-19.

16. SURVIVAL
Sections 3, 5, 6, 7, 10, 11, 12, 14, and 16 shall survive termination of this Agreement.

By using the Knowlio platform, Licensee acknowledges that they have read this Agreement, understand it, and agree to be bound by its terms and conditions.
              `}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              component={Link}
              href="/license"
              startIcon={<ArrowBackIcon />}
              variant="contained"
              color="primary"
            >
              Back to License Management
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
