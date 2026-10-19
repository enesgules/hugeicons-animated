'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface CancelCircleIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CancelCircleIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const RING_PATH =
  'M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z';
const FIRST_PATH = 'M15 9L9.00064 15';
const SECOND_PATH = 'M9 9L14.9994 15';

// The ring gives way under the second strike and springs back as it lands.
const ringVariants: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 1, 0.95, 1.025, 1],
    transition: {
      duration: 1.04,
      ease: ['linear', 'easeInOut', [0.23, 1, 0.32, 1], 'easeInOut'],
      times: [0, 0.6, 0.78, 0.9, 1],
    },
  },
};

// Each stroke continues briefly as the pen lifts from the page.
const firstEndFlourishVariants: Variants = {
  normal: {
    pathLength: 0,
    opacity: 0,
    visibility: 'hidden',
  },
  animate: {
    pathLength: [0, 0, 1, 1],
    opacity: [0, 0, 1, 0],
    visibility: ['hidden', 'hidden', 'visible', 'hidden'],
    transition: {
      duration: 0.76,
      ease: [
        'linear',
        [0.23, 1, 0.32, 1],
        [0.23, 1, 0.32, 1],
      ],
      times: [0, 0.69, 0.84, 1],
    },
  },
};

const secondEndFlourishVariants: Variants = {
  normal: {
    pathLength: 0,
    opacity: 0,
    visibility: 'hidden',
  },
  animate: {
    pathLength: [0, 0, 1, 1],
    opacity: [0, 0, 1, 0],
    visibility: ['hidden', 'hidden', 'visible', 'hidden'],
    transition: {
      duration: 1.06,
      ease: [
        'linear',
        [0.23, 1, 0.32, 1],
        [0.23, 1, 0.32, 1],
      ],
      times: [0, 0.77, 0.88, 1],
    },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0.08 } },
  animate: { visibility: 'visible', transition: { duration: 0 } },
};

// rest-parity: split-source-path
// The cross is struck out again inside the ring. The first strike starts at
// the top-right. The second starts at the top-left.
// Erase and redraw use those same starts, with the offset reset while hidden.
const firstStrikeVariants: Variants = {
  normal: { pathLength: 1, pathOffset: 0, visibility: 'visible' },
  animate: {
    pathLength: [1, 1, 0.12, 0, 0, 0.12, 1, 1],
    pathOffset: [0, 0, 0.88, 1, 0, 0, 0, 0],
    visibility: [
      'visible',
      'visible',
      'hidden',
      'hidden',
      'hidden',
      'hidden',
      'visible',
      'visible',
    ],
    transition: {
      duration: 0.9,
      ease: [
        'linear',
        [0.77, 0, 0.175, 1],
        'linear',
        'linear',
        'linear',
        [0.77, 0, 0.175, 1],
        'linear',
      ],
      times: [0, 0.05, 0.22, 0.25, 0.34, 0.38, 0.58, 1],
    },
  },
};

const secondStrikeVariants: Variants = {
  normal: { pathLength: 1, pathOffset: 0, visibility: 'visible' },
  animate: {
    pathLength: [1, 1, 0.12, 0, 0, 0.12, 1, 1],
    pathOffset: [0, 0, 0.88, 1, 0, 0, 0, 0],
    visibility: [
      'visible',
      'visible',
      'hidden',
      'hidden',
      'hidden',
      'hidden',
      'visible',
      'visible',
    ],
    transition: {
      duration: 0.9,
      ease: [
        'linear',
        [0.77, 0, 0.175, 1],
        'linear',
        'linear',
        'linear',
        [0.77, 0, 0.175, 1],
        'linear',
      ],
      times: [0, 0.1, 0.27, 0.3, 0.64, 0.7, 0.9, 1],
    },
  },
};

const CancelCircleIcon = forwardRef<CancelCircleIconHandle, CancelCircleIconProps>(
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
            d={RING_PATH}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={ringVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 0.5 }}
          />
          <motion.path
            d={FIRST_PATH}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={firstStrikeVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d={SECOND_PATH}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={secondStrikeVariants}
            animate={controls}
            initial="normal"
          />
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            <motion.path
              d="M9.00064 15L8.5 15.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={firstEndFlourishVariants}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d="M14.9994 15L15.5 15.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={secondEndFlourishVariants}
              animate={controls}
              initial="normal"
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

CancelCircleIcon.displayName = 'CancelCircleIcon';

export { CancelCircleIcon };
