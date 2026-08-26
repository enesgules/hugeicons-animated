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

// the dart recoils into the target, then the existing inner ring absorbs the impact
const dartVariants: Variants = {
  normal: { transform: 'translate(0px, 0px)' },
  animate: {
    transform: [
      'translate(0px, 0px)',
      'translate(2.25px, -2.25px)',
      'translate(2.25px, -2.25px)',
      'translate(-0.45px, 0.45px)',
      'translate(0px, 0px)',
    ],
    transition: {
      duration: 0.88,
      times: [0, 0.22, 0.38, 0.62, 1],
      ease: [0.65, 0, 0.35, 1],
    },
  },
};

const outerRingVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(1)', 'scale(1.035)', 'scale(1)'],
    transition: {
      duration: 0.88,
      times: [0, 0.45, 0.68, 1],
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

const innerRingVariants: Variants = {
  normal: { transform: 'scale(1)', opacity: 1 },
  animate: {
    transform: ['scale(1)', 'scale(1)', 'scale(1.16)', 'scale(1.02)', 'scale(1)'],
    opacity: [1, 1, 0.74, 0.92, 1],
    transition: {
      duration: 0.88,
      times: [0, 0.45, 0.68, 0.84, 1],
      ease: [0.23, 1, 0.32, 1],
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
            style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
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
            style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
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
