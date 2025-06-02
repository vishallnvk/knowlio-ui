import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

/**
 * Footer - Application footer component with navigation links and copyright information
 */
function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom fontWeight={700}>
              KNOWLIO
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Building lightweight, responsive web applications with Material-UI and AWS Cognito.
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Link href="#" color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </Link>
              <Link href="#" color="inherit" aria-label="Twitter">
                <TwitterIcon />
              </Link>
              <Link href="#" color="inherit" aria-label="LinkedIn">
                <LinkedInIcon />
              </Link>
              <Link href="#" color="inherit" aria-label="GitHub">
                <GitHubIcon />
              </Link>
            </Box>
          </Grid>
          
          {/* Product */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Product
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
              <Link href="#" color="inherit" underline="hover">
                Features
              </Link>
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
              <Link href="#" color="inherit" underline="hover">
                Pricing
              </Link>
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
              <Link href="#" color="inherit" underline="hover">
                Documentation
              </Link>
            </Typography>
          </Grid>
          
          {/* Company */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Company
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
              <Link href="/about" color="inherit" underline="hover">
                About
              </Link>
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
              <Link href="/contact" color="inherit" underline="hover">
                Contact
              </Link>
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
              <Link href="#" color="inherit" underline="hover">
                Careers
              </Link>
            </Typography>
          </Grid>
          
          {/* Legal */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Legal
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
              <Link href="#" color="inherit" underline="hover">
                Privacy Policy
              </Link>
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
              <Link href="#" color="inherit" underline="hover">
                Terms of Service
              </Link>
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
              <Link href="#" color="inherit" underline="hover">
                Cookie Policy
              </Link>
            </Typography>
          </Grid>
        </Grid>
        
        {/* Copyright */}
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Knowlio. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            Made with ❤️ using React and AWS
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
