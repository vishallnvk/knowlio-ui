import React from 'react';
import { Box, Container, Typography, Button, Stack } from '@mui/material';

/**
 * Hero - A reusable hero section component for page headers
 * 
 * @param {Object} props
 * @param {string} props.title - The main heading text
 * @param {string} props.subtitle - The secondary text
 * @param {Array<Object>} props.actions - Array of action buttons with label and onClick
 * @param {string} props.backgroundImage - Optional background image URL
 * @param {Object} props.sx - Additional MUI sx styles to apply
 */
function Hero({ 
  title, 
  subtitle, 
  actions = [],
  backgroundImage = null, 
  sx = {} 
}) {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
        backgroundColor: backgroundImage ? 'rgba(25, 118, 210, 0.9)' : 'primary.main',
        color: 'white',
        ...(backgroundImage && {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(25, 118, 210, 0.9)',
          },
        }),
        ...sx
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          component="h1"
          variant="h1"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 3
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="h5"
            align="center"
            sx={{
              mb: 4,
              mx: 'auto',
              maxWidth: 'sm'
            }}
          >
            {subtitle}
          </Typography>
        )}
        {actions.length > 0 && (
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{ mt: 4 }}
          >
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={index === 0 ? 'contained' : 'outlined'}
                color={index === 0 ? 'secondary' : 'inherit'}
                size="large"
                onClick={action.onClick}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  ...(index !== 0 && {
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      borderColor: 'white',
                    }
                  })
                }}
              >
                {action.label}
              </Button>
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
}

export default Hero;
