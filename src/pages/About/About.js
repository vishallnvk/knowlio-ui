import React from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import Hero from '../../components/ui/Hero';

/**
 * About - About page component
 */
function About() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="About Knowlio"
        subtitle="Learn about our mission and what we do"
      />

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" component="h2" gutterBottom fontWeight={600}>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              Knowlio provides a comprehensive foundation for building modern web applications 
              with React, Material-UI, and AWS Cognito authentication. Our goal is to help developers 
              create secure, responsive, and well-structured applications that follow best practices.
            </Typography>
            <Typography variant="body1" paragraph>
              We believe that a solid foundation is crucial for building scalable applications.
              Our template includes authentication, responsive layouts, and components that can be
              easily customized to fit your specific needs.
            </Typography>
            <Typography variant="h4" component="h2" gutterBottom fontWeight={600} sx={{ mt: 4 }}>
              Our Approach
            </Typography>
            <Typography variant="body1" paragraph>
              We follow modern React development patterns and best practices:
            </Typography>
            <Box component="ul" sx={{ pl: 4 }}>
              <Typography component="li" variant="body1" paragraph>
                <strong>Component-Based Architecture:</strong> Well-organized component structure for maximum reusability and maintainability
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                <strong>Responsive Design:</strong> Mobile-first approach ensuring your application looks great on all devices
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                <strong>Secure Authentication:</strong> Integrated AWS Cognito for reliable user authentication and management
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                <strong>Clean Code:</strong> Emphasis on readability, consistent naming conventions, and proper documentation
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 4, border: '1px solid', borderColor: 'grey.200' }}>
              <Typography variant="h5" gutterBottom fontWeight={600}>
                Technology Stack
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <Typography component="li" variant="body1" paragraph>
                  <strong>React:</strong> A JavaScript library for building user interfaces
                </Typography>
                <Typography component="li" variant="body1" paragraph>
                  <strong>React Router:</strong> Declarative routing for React applications
                </Typography>
                <Typography component="li" variant="body1" paragraph>
                  <strong>Material-UI:</strong> React components that implement Google's Material Design
                </Typography>
                <Typography component="li" variant="body1" paragraph>
                  <strong>AWS Amplify:</strong> Authentication and API integration with AWS services
                </Typography>
                <Typography component="li" variant="body1" paragraph>
                  <strong>AWS Cognito:</strong> User authentication and management service
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default About;
