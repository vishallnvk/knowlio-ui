/**
 * Animation utilities main export
 * Provides a centralized import for all animation-related utilities
 */

// Export all keyframes
export * from './keyframes';

// Export all constants
export * from './constants';

// Export all utilities
export * from './utils';

// Export animation components
export * from './components';

// Re-export commonly used combinations for convenience
export {
  fadeInUp,
  fadeInDown,
  slideInLeft,
  slideInRight,
  slideInUp,
  zoomIn,
  iconPulse,
  iconWiggle,
  iconFloat,
  iconRotate,
  iconBreathe,
  emojiPulse,
  emojiWiggle,
  emojiFloat,
  emojiScale,
  floatGentle,
  floatWithRotation,
  floatWithScale,
  sparkle,
  cardGlow,
  textPulse,
  revenuePulse,
  typewriterWidth,
  typewriterSlide,
  typewriterScale,
} from './keyframes';

export {
  createEntranceAnimation,
  createHoverAnimation,
  createIconAnimation,
  createEmojiAnimation,
  createStaggeredAnimation,
  createCardAnimation,
  createTypewriterAnimation,
  createResponsiveAnimation,
  createAccessibleAnimation,
  combineAnimations,
  getStaggerDelay,
  ANIMATION_PRESETS,
} from './utils';

export {
  ANIMATION_DURATION,
  ANIMATION_EASING,
  ANIMATION_DELAYS,
  TRANSFORM_VALUES,
  OPACITY_VALUES,
} from './constants';
