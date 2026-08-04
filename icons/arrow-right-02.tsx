'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ArrowRight02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ArrowRight02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// a launch and softer echo — the shaft follows the head and never disconnects
const shaftVariants: Variants = {
  normal: { d: 'M18.5 12L4.99997 12' },
  animate: {
    d: [
      'M18.5 12L4.99997 12',
      'M20.5 12L9.5 12',
      'M18.5 12L4.99997 12',
      'M19.3 12L7.5 12',
      'M18.5 12L4.99997 12',
    ],
    transition: { duration: 0.64, ease: [0.23, 1, 0.32, 1], times: [0, 0.3, 0.58, 0.78, 1] },
  },
};

const headVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: ['translateX(0px)', 'translateX(2px)', 'translateX(0px)', 'translateX(0.8px)', 'translateX(0px)'],
    transition: { duration: 0.64, ease: [0.23, 1, 0.32, 1], times: [0, 0.28, 0.58, 0.78, 1] },
  },
};

const ArrowRight02Icon = forwardRef<ArrowRight02IconHandle, ArrowRight02IconProps>(
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
            d="M18.5 12L4.99997 12"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={shaftVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={headVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

ArrowRight02Icon.displayName = 'ArrowRight02Icon';

export { ArrowRight02Icon };
