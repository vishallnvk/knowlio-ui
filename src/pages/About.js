import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudIcon from '@mui/icons-material/Cloud';
import DevicesIcon from '@mui/icons-material/Devices';
import ShieldIcon from '@mui/icons-material/Shield';

function About() {
  const benefits = [
    'Serverless architecture with S3 hosting',
    'Built-in responsive design for all devices',
    'Lightweight Material-UI components',
    'AWS Cognito for secure authentication',
    'Optimized for fast loading times',
    'Easy deployment and maintenance',
  ];

  const techStack = [
    { icon: <DevicesIcon />, title: 'React 19', description: 'Latest React for modern web development' },
    { icon: <CloudIcon />, title: 'AWS S3', description: 'Static website hosting with global CDN' },
    { icon: <ShieldIcon />, title: 'AWS Cognito', description: 'Enterprise-grade authentication' },
  ];

  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 700,
            }}
          >
            About Knowlio
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{
              fontSize: { xs: '1rem', sm: '1.25rem' },
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            A modern, lightweight web application framework built for speed and simplicity
          </Typography>
        </Box>

        {/* Mission Section */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            mb: 6,
            backgroundColor: 'primary.main',
            color: 'white',
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom fontWeight={600}>
            Our Mission
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            We believe in creating web applications that are fast, secure, and accessible to everyone. 
            By leveraging the power of AWS services and modern React development, we provide a platform 
            that makes it easy to build and deploy professional web applications without the complexity 
            of traditional server management.
          </Typography>
        </Paper>

        {/* Benefits Section */}
        <Grid container spacing={6} mb={6}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom fontWeight={600}>
              Key Benefits
            </Typography>
            <List>
              {benefits.map((benefit, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={benefit} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'grey.100',
                borderRadius: 2,
                p: 4,
              }}
            >
              <Typography
                variant="h3"
                align="center"
                sx={{
                  fontSize: { xs: '2rem', sm: '2.5rem' },
                  fontWeight: 300,
                  color: 'text.secondary',
                }}
              >
                Build Fast.
                <br />
                Deploy Easy.
                <br />
                <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>
                  Scale Effortlessly.
                </Box>
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ mb: 6 }} />

        {/* Tech Stack Section */}
        <Box mb={6}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            fontWeight={600}
            textAlign="center"
            mb={4}
          >
            Technology Stack
          </Typography>
          <Grid container spacing={4}>
            {techStack.map((tech, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    border: '1px solid',
                    borderColor: 'grey.200',
                    borderRadius: 2,
                    height: '100%',
                  }}
                >
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {React.cloneElement(tech.icon, { sx: { fontSize: 48 } })}
                  </Box>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    {tech.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {tech.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA Section */}
        <Box
          textAlign="center"
          sx={{
            py: 4,
            px: 3,
            backgroundColor: 'grey.50',
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Ready to start building?
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Join our community and create amazing web applications
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default About;
