'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Cancel01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Cancel01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const FIRST_PATH = 'M18 6L6.00081 17.9992';
const SECOND_PATH = 'M6 6.00085L17.9992 18';

// Use the same single landing as Tick after the second strike is complete.
const impactVariants: Variants = {
  normal: { transform: 'translateY(0px) rotate(0deg) scale(1)' },
  animate: {
    transform: [
      'translateY(0px) rotate(0deg) scale(1)',
      'translateY(0px) rotate(0deg) scale(1)',
      'translateY(-0.35px) rotate(0.8deg) scale(1.08)',
      'translateY(0px) rotate(0deg) scale(1)',
    ],
    transition: {
      duration: 1.04,
      ease: ['linear', [0.23, 1, 0.32, 1], [0.23, 1, 0.32, 1]],
      times: [0, 0.78, 0.9, 1],
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
// The first strike starts at the top-right. The second starts at the top-left.
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

const Cancel01Icon = forwardRef<Cancel01IconHandle, Cancel01IconProps>(
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
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          overflow="visible"
          variants={impactVariants}
          animate={controls}
          initial="normal"
          style={{ transformOrigin: '12px 12px' }}
        >
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
              d="M6.00081 17.9992L5.1 18.9"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={firstEndFlourishVariants}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d="M17.9992 18L18.9 18.9008"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={secondEndFlourishVariants}
              animate={controls}
              initial="normal"
            />
          </motion.g>
        </motion.svg>
      </div>
    );
  }
);

Cancel01Icon.displayName = 'Cancel01Icon';

export { Cancel01Icon };
