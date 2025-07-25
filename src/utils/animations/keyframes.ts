/**
 * Centralized animation keyframes for consistent animations across the application
 * All keyframes use transform and opacity for optimal performance
 */

import { keyframes } from '@mui/material';
import { TRANSFORM_VALUES, OPACITY_VALUES } from './constants';

// Base entrance animations
export const fadeInUp = keyframes`
  from {
    opacity: ${OPACITY_VALUES.HIDDEN};
    transform: translateY(${TRANSFORM_VALUES.TRANSLATE_Y.ENTRANCE}px);
  }
  to {
    opacity: ${OPACITY_VALUES.VISIBLE};
    transform: translateY(0);
  }
`;

export const fadeInDown = keyframes`
  from {
    opacity: ${OPACITY_VALUES.HIDDEN};
    transform: translateY(-${TRANSFORM_VALUES.TRANSLATE_Y.ENTRANCE}px);
  }
  to {
    opacity: ${OPACITY_VALUES.VISIBLE};
    transform: translateY(0);
  }
`;

export const slideInLeft = keyframes`
  from {
    opacity: ${OPACITY_VALUES.HIDDEN};
    transform: translateX(-${TRANSFORM_VALUES.TRANSLATE_X.SLIDE}px);
  }
  to {
    opacity: ${OPACITY_VALUES.VISIBLE};
    transform: translateX(0);
  }
`;

export const slideInRight = keyframes`
  from {
    opacity: ${OPACITY_VALUES.HIDDEN};
    transform: translateX(${TRANSFORM_VALUES.TRANSLATE_X.SLIDE}px);
  }
  to {
    opacity: ${OPACITY_VALUES.VISIBLE};
    transform: translateX(0);
  }
`;

export const slideInUp = keyframes`
  from {
    opacity: ${OPACITY_VALUES.HIDDEN};
    transform: translateY(${TRANSFORM_VALUES.TRANSLATE_X.SLIDE}px);
  }
  to {
    opacity: ${OPACITY_VALUES.VISIBLE};
    transform: translateY(0);
  }
`;

export const zoomIn = keyframes`
  from {
    opacity: ${OPACITY_VALUES.HIDDEN};
    transform: scale(0.9);
  }
  to {
    opacity: ${OPACITY_VALUES.VISIBLE};
    transform: scale(1);
  }
`;

// Icon animations
export const iconPulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(${TRANSFORM_VALUES.SCALE.ICON_PULSE});
  }
`;

export const iconWiggle = keyframes`
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(${TRANSFORM_VALUES.ROTATE.ICON_WIGGLE}deg);
  }
  75% {
    transform: rotate(-${TRANSFORM_VALUES.ROTATE.ICON_WIGGLE}deg);
  }
`;

export const iconFloat = keyframes`
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-${TRANSFORM_VALUES.TRANSLATE_Y.FLOAT}px) scale(${TRANSFORM_VALUES.SCALE.ICON_HOVER});
  }
`;

export const iconRotate = keyframes`
  0%, 100% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(${TRANSFORM_VALUES.ROTATE.ICON_WIGGLE * 2}deg) scale(${TRANSFORM_VALUES.SCALE.ICON_HOVER});
  }
`;

export const iconBreathe = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(${TRANSFORM_VALUES.SCALE.EMOJI_PULSE});
  }
`;

// Emoji animations
export const emojiPulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(${TRANSFORM_VALUES.SCALE.EMOJI_PULSE});
  }
`;

export const emojiWiggle = keyframes`
  0%, 100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(${TRANSFORM_VALUES.ROTATE.ICON_WIGGLE * 2}deg);
  }
`;

export const emojiFloat = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
`;

export const emojiScale = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(${TRANSFORM_VALUES.SCALE.EMOJI_PULSE});
  }
`;

// Floating animations
export const floatGentle = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-${TRANSFORM_VALUES.TRANSLATE_Y.FLOAT}px);
  }
`;

export const floatWithRotation = keyframes`
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-${TRANSFORM_VALUES.TRANSLATE_Y.FLOAT - 2}px) rotate(${TRANSFORM_VALUES.ROTATE.ICON_WIGGLE}deg);
  }
`;

export const floatWithScale = keyframes`
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-${TRANSFORM_VALUES.TRANSLATE_Y.FLOAT + 2}px) scale(${TRANSFORM_VALUES.SCALE.HOVER});
  }
`;

// Special animations
export const sparkle = keyframes`
  0%, 100% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(${TRANSFORM_VALUES.ROTATE.SPARKLE}deg) scale(${TRANSFORM_VALUES.SCALE.ICON_HOVER});
  }
`;

export const cardGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 rgba(99, 102, 241, 0);
  }
  50% {
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.1);
  }
`;

export const textPulse = keyframes`
  0%, 100% {
    opacity: ${OPACITY_VALUES.VISIBLE};
  }
  50% {
    opacity: ${OPACITY_VALUES.DIMMED};
  }
`;

export const revenuePulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(${TRANSFORM_VALUES.SCALE.HOVER});
  }
`;

// Typewriter effects
export const typewriterWidth = keyframes`
  0% {
    opacity: ${OPACITY_VALUES.HIDDEN};
    width: 0%;
  }
  100% {
    opacity: ${OPACITY_VALUES.VISIBLE};
    width: 100%;
  }
`;

export const typewriterSlide = keyframes`
  0% {
    opacity: ${OPACITY_VALUES.HIDDEN};
    transform: translateX(-10px);
  }
  100% {
    opacity: ${OPACITY_VALUES.VISIBLE};
    transform: translateX(0);
  }
`;

export const typewriterScale = keyframes`
  0% {
    opacity: ${OPACITY_VALUES.HIDDEN};
    transform: scale(0.8);
  }
  100% {
    opacity: ${OPACITY_VALUES.VISIBLE};
    transform: scale(1);
  }
`;
