import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, Box, CardMedia, useTheme } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import DevicesIcon from '@mui/icons-material/Devices';

// UI Components
import Hero from '../../components/ui/Hero';

/**
 * Home - Landing page component for the application
 */
function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  
  // Features section data
  const features = [
    {
      icon: <SpeedIcon fontSize="large" color="primary" />,
      title: 'Lightweight & Fast',
      description: 'Built with performance in mind using React and Material-UI for a smooth user experience.',
    },
    {
      icon: <SecurityIcon fontSize="large" color="primary" />,
      title: 'Secure Authentication',
      description: 'AWS Cognito integration for secure user authentication and authorization.',
    },
    {
      icon: <DevicesIcon fontSize="large" color="primary" />,
      title: 'Responsive Design',
      description: 'Fully responsive design that works on all devices, from mobile to desktop.',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Welcome to Knowlio"
        subtitle="Build responsive, lightweight web applications with Material-UI and AWS Cognito"
        actions={[
          { 
            label: 'Get Started', 
            onClick: () => navigate('/login') 
          },
          { 
            label: 'Learn More', 
            onClick: () => {
              const featuresSection = document.getElementById('features');
              featuresSection?.scrollIntoView({ behavior: 'smooth' });
            } 
          }
        ]}
      />

      {/* Features Section */}
      <Box 
        id="features" 
        sx={{ 
          py: { xs: 8, md: 12 },
          backgroundColor: theme.palette.grey[50]
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{ mb: 6, fontWeight: 600 }}
          >
            Why Choose Knowlio?
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 3,
                    },
                  }}
                  elevation={1}
                >
                  <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h5" component="h3" gutterBottom fontWeight={600}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Showcase Section */}
      <Box py={{ xs: 8, md: 12 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h2" gutterBottom fontWeight={600}>
                Modern React Applications
              </Typography>
              <Typography variant="body1" paragraph>
                Build professional web applications with the latest React features
                and best practices. Our template provides a solid foundation for
                your next project with authentication, routing, and UI components
                pre-configured.
              </Typography>
              <Typography variant="body1">
                The architecture follows modern development standards, making your
                application maintainable, scalable and ready for production.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                alt="Dashboard preview"
                image="https://source.unsplash.com/random/600x400/?dashboard"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default Home;
