/**
 * AnimatedSection - Reusable section with entrance animations
 * Provides consistent section-level animations with accessibility support
 */

import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import { createEntranceAnimation, createAccessibleAnimation, ANIMATION_PRESETS } from '../utils';

export interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: keyof typeof ANIMATION_PRESETS.ENTRANCE;
  staggerIndex?: number;
  duration?: number;
  delay?: number;
  enableOnMobile?: boolean;
  sx?: SxProps<Theme>;
  component?: React.ElementType;
  [key: string]: any;
}

/**
 * Animated section component with entrance animations
 */
export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  animation = 'FADE_UP',
  staggerIndex = 0,
  duration,
  delay,
  enableOnMobile = true,
  sx = {},
  component = 'div',
  ...props
}) => {
  const animationName = ANIMATION_PRESETS.ENTRANCE[animation];
  
  const animationStyles = createEntranceAnimation(animationName, {
    staggerIndex,
    duration,
    delay,
  });

  const accessibleStyles = createAccessibleAnimation(animationStyles);

  const responsiveStyles = enableOnMobile
    ? accessibleStyles
    : {
        ...accessibleStyles,
        '@media (max-width: 768px)': {
          animation: 'none !important',
          opacity: 1,
          transform: 'none !important',
        },
      };

  return (
    <Box
      component={component}
      sx={[
        responsiveStyles,
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      {children}
    </Box>
  );
};

export default AnimatedSection;
