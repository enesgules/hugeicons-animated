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

const TARGET_DURATION = 1.1;
const TIMES = [0, 0.24, 0.34, 0.42, 0.52, 0.62, 0.72, 0.84, 1];
const CENTER = { transformBox: 'view-box', originX: 0.5, originY: 0.5 } as const;

// The dart pulls out along its shaft and strikes the center again, sinks in a
// little, and quivers about its tip as the hit fades. The inner ring takes
// the hit first and the outer ring answers a beat later.
const dartVariants: Variants = {
  normal: { translateX: 0, translateY: 0, rotate: 0 },
  animate: {
    translateX: [0, 2.8, -0.6, 0, 0, 0, 0, 0, 0],
    translateY: [0, -2.8, 0.6, 0, 0, 0, 0, 0, 0],
    rotate: [0, 0, 0, 9, -6, 3.5, -1.5, 0, 0],
    transition: {
      duration: TARGET_DURATION,
      times: TIMES,
      ease: [
        [0.23, 1, 0.32, 1],
        [0.55, 0, 1, 0.45],
        [0.23, 1, 0.32, 1],
        'easeInOut',
        'easeInOut',
        'easeInOut',
        'easeInOut',
        'easeInOut',
      ],
    },
  },
};

const innerRingVariants: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 1, 0.86, 1.05, 1],
    transition: {
      duration: TARGET_DURATION,
      times: [0, 0.34, 0.42, 0.56, 0.7],
      ease: ['linear', [0.23, 1, 0.32, 1], 'easeInOut', 'easeInOut'],
    },
  },
};

const outerRingVariants: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 1, 1.05, 0.99, 1],
    transition: {
      duration: TARGET_DURATION,
      times: [0, 0.42, 0.52, 0.64, 0.78],
      ease: ['linear', [0.23, 1, 0.32, 1], 'easeInOut', 'easeInOut'],
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
          <motion.path
            d="M15.1312 2.5C14.1462 2.17555 13.0936 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 10.9548 21.8396 9.94704 21.5422 9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={outerRingVariants}
            animate={controls}
            initial="normal"
            style={CENTER}
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
            style={CENTER}
          />
          <motion.path
            d="M19.5 4.5L12 12M19.5 4.5V2M19.5 4.5H22"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={dartVariants}
            animate={controls}
            initial="normal"
            style={CENTER}
          />
        </svg>
      </div>
    );
  }
);

Target01Icon.displayName = 'Target01Icon';

export { Target01Icon };
