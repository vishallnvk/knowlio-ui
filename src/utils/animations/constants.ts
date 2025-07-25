/**
 * Animation constants for consistent timing and easing across the application
 * Following Material Design motion principles
 */

export const ANIMATION_DURATION = {
  // Base durations
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 800,
  
  // Specific animation durations
  ENTRANCE: 600,
  STAGGER_DELAY: 200,
  HOVER_TRANSITION: 300,
  ICON_ANIMATION: 2000,
  EMOJI_ANIMATION: 1500,
  SPARKLE_ANIMATION: 2000,
  FLOAT_ANIMATION: 3000,
  PULSE_ANIMATION: 2000,
} as const;

export const ANIMATION_EASING = {
  // Standard easing functions
  EASE_OUT: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  EASE_IN: 'cubic-bezier(0.4, 0.0, 1, 1)',
  EASE_IN_OUT: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  EASE_OUT_BACK: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  
  // Custom easing for specific animations
  SPRING: 'cubic-bezier(0.4, 0, 0.2, 1)',
  BOUNCE: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  ELASTIC: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
} as const;

export const ANIMATION_DELAYS = {
  BASE: 0.2,
  STAGGER: 0.15,
  CARD_STAGGER: 0.1,
  ICON_STAGGER: 0.05,
} as const;

export const TRANSFORM_VALUES = {
  TRANSLATE_Y: {
    ENTRANCE: 30,
    HOVER: -4,
    FLOAT: -8,
  },
  TRANSLATE_X: {
    ENTRANCE: 20,
    SLIDE: 40,
  },
  SCALE: {
    HOVER: 1.02,
    ICON_HOVER: 1.1,
    EMOJI_PULSE: 1.2,
    ICON_PULSE: 1.15,
  },
  ROTATE: {
    ICON_WIGGLE: 5,
    SPARKLE: 180,
  },
} as const;

export const OPACITY_VALUES = {
  HIDDEN: 0,
  VISIBLE: 1,
  DIMMED: 0.7,
  FADED: 0.9,
} as const;
