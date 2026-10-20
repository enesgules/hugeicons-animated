'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface CheckmarkCircle02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CheckmarkCircle02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// The pen lifts along the end tangent of the long arm.
const PEN_LIFT_PATH = 'M16 9L16.44 8.52';
// Share of the check stroke before its corner, where the pen rests.
const CORNER = 0.3;

const penLiftVariants: Variants = {
  normal: { pathLength: 0, opacity: 0, visibility: 'hidden' },
  animate: {
    pathLength: [0, 0, 1, 1],
    opacity: [0, 0, 0.72, 0],
    visibility: ['hidden', 'hidden', 'visible', 'hidden'],
    transition: {
      duration: 0.9,
      ease: [
        'linear',
        [0.23, 1, 0.32, 1],
        [0.23, 1, 0.32, 1],
      ],
      times: [0, 0.765, 0.89, 1],
    },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0.08 } },
  animate: { visibility: 'visible', transition: { duration: 0 } },
};

// The ring gives as the pen touches down again, then settles.
const frameVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(0.96)', 'scale(1.025)', 'scale(1)'],
    transition: {
      duration: 0.48,
      delay: 0.34,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

// Check, as in Circle Check: the tick is erased from its tail, written again
// with a rest at the corner, and the pen lifts off the end of the long arm.
// The offset resets while the path is hidden, so no cap or jump shows.
const checkVariants: Variants = {
  normal: { pathLength: 1, pathOffset: 0, visibility: 'visible' },
  animate: {
    pathLength: [1, 1, 0.12, 0, 0, 0.12, CORNER, CORNER, 1, 1],
    pathOffset: [0, 0, 0.88, 1, 0, 0, 0, 0, 0, 0],
    visibility: [
      'visible',
      'visible',
      'hidden',
      'hidden',
      'hidden',
      'hidden',
      'visible',
      'visible',
      'visible',
      'visible',
    ],
    transition: {
      duration: 0.82,
      ease: [
        'linear',
        [0.77, 0, 0.175, 1],
        'linear',
        'linear',
        'linear',
        [0.77, 0, 0.175, 1],
        'linear',
        [0.77, 0, 0.175, 1],
        'linear',
      ],
      times: [0, 0.06, 0.25, 0.28, 0.35, 0.39, 0.5, 0.57, 0.84, 1],
    },
  },
};

const CheckmarkCircle02Icon = forwardRef<CheckmarkCircle02IconHandle, CheckmarkCircle02IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const { handleMouseEnter, handleMouseLeave } = useIconAnimation({
      controls,
      loops: false,
      onMouseEnter,
      onMouseLeave,
      ref,
    });

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          overflow="visible"
        >
          <motion.path
            d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={frameVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 0.5 }}
          />
          <motion.path
            d="M8 12.5L10.5 15L16 9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={checkVariants}
            animate={controls}
            initial="normal"
          />
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            <motion.path
              d={PEN_LIFT_PATH}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={penLiftVariants}
              animate={controls}
              initial="normal"
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

CheckmarkCircle02Icon.displayName = 'CheckmarkCircle02Icon';

export { CheckmarkCircle02Icon };
