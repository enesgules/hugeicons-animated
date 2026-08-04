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

// the dart strikes and the inner target ring expands into the next ring
const dartVariants: Variants = {
  normal: { translateX: 0, translateY: 0, transition: { duration: 0.3 } },
  animate: {
    translateX: [0, 2.4, 2.4, 0],
    translateY: [0, -2.4, -2.4, 0],
    transition: {
      duration: 1,
      times: [0, 0.3, 0.45, 0.58],
      ease: ['easeOut', 'linear', 'easeIn'],
    },
  },
};

const ringVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: (i: number) => ({
    transform: i === 0
      ? ['scale(1)', 'scale(1)', 'scale(1.06)', 'scale(1)']
      : ['scale(1)', 'scale(1)', 'scale(1.58)', 'scale(1)'],
    transition: { duration: 0.86, times: [0, 0.58, 0.76, 1], ease: [0.23, 1, 0.32, 1] },
  }),
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
            variants={ringVariants}
            custom={0}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 12px' }}
          />
          <motion.path
            d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={ringVariants}
            custom={1}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 12px' }}
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
