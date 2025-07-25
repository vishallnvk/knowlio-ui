/**
 * Animation utility functions for consistent animation patterns
 */

import { SxProps, Theme } from '@mui/material/styles';
import { ANIMATION_DURATION, ANIMATION_EASING, ANIMATION_DELAYS } from './constants';

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
}

export interface EntranceAnimationConfig extends AnimationConfig {
  staggerIndex?: number;
  staggerDelay?: number;
}

/**
 * Creates base entrance animation styles
 */
export const createEntranceAnimation = (
  animationName: string,
  config: EntranceAnimationConfig = {}
): SxProps<Theme> => {
  const {
    duration = ANIMATION_DURATION.ENTRANCE,
    delay = ANIMATION_DELAYS.BASE,
    easing = ANIMATION_EASING.EASE_OUT,
    fillMode = 'forwards',
    staggerIndex = 0,
    staggerDelay = ANIMATION_DELAYS.STAGGER,
  } = config;

  const calculatedDelay = delay + (staggerIndex * staggerDelay);

  return {
    opacity: 0,
    animation: `${animationName} ${duration}ms ${easing} ${calculatedDelay}s ${fillMode}`,
    // Add support for view timeline when available
    animationTimeline: 'view()',
    animationRange: 'entry 50% cover 50%',
  };
};

/**
 * Creates hover animation styles
 */
export const createHoverAnimation = (
  baseTransform: string = 'translateY(0)',
  hoverTransform: string = 'translateY(-4px)',
  scale: number = 1.02
): SxProps<Theme> => ({
  transition: `all ${ANIMATION_DURATION.HOVER_TRANSITION}ms ${ANIMATION_EASING.EASE_OUT}`,
  transform: baseTransform,
  '&:hover': {
    transform: `${hoverTransform} scale(${scale})`,
    boxShadow: 3,
  },
});

/**
 * Creates icon animation styles
 */
export const createIconAnimation = (
  animationName: string,
  duration: number = ANIMATION_DURATION.ICON_ANIMATION,
  easing: string = ANIMATION_EASING.EASE_IN_OUT
): SxProps<Theme> => ({
  animation: `${animationName} ${duration}ms ${easing} infinite`,
});

/**
 * Creates emoji animation styles
 */
export const createEmojiAnimation = (
  animationName: string,
  duration: number = ANIMATION_DURATION.EMOJI_ANIMATION,
  easing: string = ANIMATION_EASING.EASE_IN_OUT
): SxProps<Theme> => ({
  display: 'inline-block',
  animation: `${animationName} ${duration}ms ${easing} infinite`,
});

/**
 * Creates staggered animation styles for lists
 */
export const createStaggeredAnimation = (
  animationName: string,
  itemCount: number,
  config: AnimationConfig = {}
): SxProps<Theme>[] => {
  const {
    duration = ANIMATION_DURATION.ENTRANCE,
    delay = ANIMATION_DELAYS.BASE,
    easing = ANIMATION_EASING.EASE_OUT,
    fillMode = 'forwards',
  } = config;

  return Array.from({ length: itemCount }, (_, index) => ({
    opacity: 0,
    animation: `${animationName} ${duration}ms ${easing} ${delay + (index * ANIMATION_DELAYS.STAGGER)}s ${fillMode}`,
  }));
};

/**
 * Creates card animation styles with hover effects
 */
export const createCardAnimation = (
  entranceAnimation: string,
  staggerIndex: number = 0,
  hoverConfig: {
    translateY?: number;
    scale?: number;
    boxShadow?: string;
  } = {}
): SxProps<Theme> => {
  const {
    translateY = -4,
    scale = 1.02,
    boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)',
  } = hoverConfig;

  return {
    ...createEntranceAnimation(entranceAnimation, { staggerIndex }),
    transition: `all ${ANIMATION_DURATION.HOVER_TRANSITION}ms ${ANIMATION_EASING.SPRING}`,
    '&:hover': {
      transform: `translateY(${translateY}px) scale(${scale})`,
      boxShadow,
    },
  };
};

/**
 * Creates typewriter animation styles
 */
export const createTypewriterAnimation = (
  animationName: string,
  staggerIndex: number = 0,
  config: AnimationConfig = {}
): SxProps<Theme> => {
  const {
    duration = ANIMATION_DURATION.ENTRANCE,
    delay = ANIMATION_DELAYS.BASE,
    easing = ANIMATION_EASING.EASE_OUT,
    fillMode = 'forwards',
  } = config;

  return {
    opacity: 0,
    animation: `${animationName} ${duration}ms ${easing} ${delay + (staggerIndex * ANIMATION_DELAYS.STAGGER)}s ${fillMode}`,
  };
};

/**
 * Creates responsive animation styles that disable animations on mobile if needed
 */
export const createResponsiveAnimation = (
  animationStyles: SxProps<Theme>,
  enableOnMobile: boolean = true
): SxProps<Theme> => {
  if (enableOnMobile) {
    return animationStyles;
  }

  return {
    ...animationStyles,
    '@media (max-width: 768px)': {
      animation: 'none !important',
      opacity: 1,
      transform: 'none !important',
    },
  };
};

/**
 * Creates accessibility-friendly animation styles
 */
export const createAccessibleAnimation = (
  animationStyles: SxProps<Theme>
): SxProps<Theme> => ({
  ...animationStyles,
  '@media (prefers-reduced-motion: reduce)': {
    animation: 'none !important',
    transition: 'none !important',
    opacity: 1,
    transform: 'none !important',
  },
});

/**
 * Combines multiple animation utilities for complex animations
 */
export const combineAnimations = (
  ...animationStyles: SxProps<Theme>[]
): SxProps<Theme> => {
  return animationStyles.reduce((combined, current) => ({
    ...combined,
    ...current,
  }), {});
};

/**
 * Creates a delay function for staggered animations
 */
export const getStaggerDelay = (
  index: number,
  baseDelay: number = ANIMATION_DELAYS.BASE,
  staggerDelay: number = ANIMATION_DELAYS.STAGGER
): number => {
  return baseDelay + (index * staggerDelay);
};

/**
 * Animation preset configurations
 */
export const ANIMATION_PRESETS = {
  ENTRANCE: {
    FADE_UP: 'fadeInUp',
    FADE_DOWN: 'fadeInDown',
    SLIDE_LEFT: 'slideInLeft',
    SLIDE_RIGHT: 'slideInRight',
    SLIDE_UP: 'slideInUp',
    ZOOM_IN: 'zoomIn',
  },
  ICON: {
    PULSE: 'iconPulse',
    WIGGLE: 'iconWiggle',
    FLOAT: 'iconFloat',
    ROTATE: 'iconRotate',
    BREATHE: 'iconBreathe',
  },
  EMOJI: {
    PULSE: 'emojiPulse',
    WIGGLE: 'emojiWiggle',
    FLOAT: 'emojiFloat',
    SCALE: 'emojiScale',
  },
  FLOATING: {
    GENTLE: 'floatGentle',
    WITH_ROTATION: 'floatWithRotation',
    WITH_SCALE: 'floatWithScale',
  },
  SPECIAL: {
    SPARKLE: 'sparkle',
    CARD_GLOW: 'cardGlow',
    TEXT_PULSE: 'textPulse',
    REVENUE_PULSE: 'revenuePulse',
  },
  TYPEWRITER: {
    WIDTH: 'typewriterWidth',
    SLIDE: 'typewriterSlide',
    SCALE: 'typewriterScale',
  },
} as const;
