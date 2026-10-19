'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Target01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Target01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const TARGET_DURATION = 1.05;
const IMPACT = 0.32;
const RING_ORIGIN = { transformBox: 'view-box', originX: 0.5, originY: 0.5 } as const;

// The dart draws back and strikes the center. The inner ring tightens on the
// hit and sheds a copy of itself that travels out and merges into the outer
// ring, which gives a small bump as it takes the wave.
const dartVariants: Variants = {
  normal: { translateX: 0, translateY: 0 },
  animate: {
    translateX: [0, 2.2, -0.7, 0.25, 0],
    translateY: [0, -2.2, 0.7, -0.25, 0],
    transition: {
      duration: TARGET_DURATION,
      times: [0, 0.22, IMPACT, 0.46, 0.62],
      ease: [[0.33, 1, 0.68, 1], [0.55, 0, 1, 0.45], [0.33, 1, 0.68, 1], 'easeInOut'],
    },
  },
};

const innerRingVariants: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 1, 0.86, 1.03, 1],
    transition: {
      duration: TARGET_DURATION,
      times: [0, IMPACT, IMPACT + 0.08, 0.56, 0.72],
      ease: [[0.33, 1, 0.68, 1], [0.33, 1, 0.68, 1], 'easeInOut', 'easeInOut'],
    },
  },
};

const outerRingVariants: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 1, 1.04, 1],
    transition: {
      duration: TARGET_DURATION,
      times: [0, 0.6, 0.68, 0.86],
      ease: 'easeOut',
    },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: {
    visibility: ['hidden', 'hidden', 'visible', 'visible', 'hidden', 'hidden'],
    transition: {
      duration: TARGET_DURATION,
      times: [0, IMPACT - 0.01, IMPACT, 0.6, 0.62, 1],
    },
  },
};

// Same three-quarter arc as the inner ring, so the gap always frames the dart
// and the wave starts and ends exactly on target geometry.
const rippleVariants: Variants = {
  normal: { r: 5 },
  animate: {
    r: [5, 5, 10, 10],
    transition: {
      duration: TARGET_DURATION,
      times: [0, IMPACT, 0.62, 1],
      ease: 'linear',
    },
  },
};

const Target01Icon = forwardRef<Target01IconHandle, Target01IconProps>(
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
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            <motion.circle
              cx="12"
              cy="12"
              r="5"
              pathLength={1}
              strokeDasharray="0.75 0.25"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={rippleVariants}
              animate={controls}
              initial="normal"
            />
          </motion.g>
          <motion.path
            d="M15.1312 2.5C14.1462 2.17555 13.0936 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 10.9548 21.8396 9.94704 21.5422 9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={outerRingVariants}
            animate={controls}
            initial="normal"
            style={RING_ORIGIN}
          />
          <motion.path
            d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={innerRingVariants}
            animate={controls}
            initial="normal"
            style={RING_ORIGIN}
          />
          <motion.path
            d="M19.5 4.5L12 12M19.5 4.5V2M19.5 4.5H22"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={dartVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

Target01Icon.displayName = 'Target01Icon';

export { Target01Icon };
