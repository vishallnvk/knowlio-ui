/**
 * AnimatedIcon - Reusable icon animation wrapper
 * Provides consistent icon animations with accessibility support
 */

import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import { createIconAnimation, createAccessibleAnimation, ANIMATION_PRESETS } from '../utils';

export interface AnimatedIconProps {
  children: React.ReactNode;
  animation?: keyof typeof ANIMATION_PRESETS.ICON;
  duration?: number;
  easing?: string;
  sx?: SxProps<Theme>;
  component?: React.ElementType;
  [key: string]: any;
}

/**
 * Animated icon component with built-in icon animations
 */
export const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  children,
  animation = 'PULSE',
  duration,
  easing,
  sx = {},
  component = 'div',
  ...props
}) => {
  const animationName = ANIMATION_PRESETS.ICON[animation];
  
  const animationStyles = createIconAnimation(animationName, duration, easing);
  const accessibleStyles = createAccessibleAnimation(animationStyles);

  return (
    <Box
      component={component}
      sx={[
        accessibleStyles,
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      {children}
    </Box>
  );
};

export default AnimatedIcon;
