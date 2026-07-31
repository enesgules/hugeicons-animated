'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ArrowLeft02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ArrowLeft02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the left arrow uses the same rigid travel as its rotation group
const svgVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: [
      'translateX(0px)',
      'translateX(-2px)',
      'translateX(0px)',
    ],
    transition: {
      duration: 0.46,
      ease: [0.77, 0, 0.175, 1],
      times: [0, 0.58, 1],
    },
  },
};

const ArrowLeft02Icon = forwardRef<ArrowLeft02IconHandle, ArrowLeft02IconProps>(
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
          variants={svgVariants}
          animate={controls}
          initial="normal"
        >
          <path
            d="M5.5 12.002H19"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M10.9999 18.002C10.9999 18.002 4.99998 13.583 4.99997 12.0019C4.99996 10.4208 11 6.00195 11 6.00195"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </motion.svg>
      </div>
    );
  }
);

ArrowLeft02Icon.displayName = 'ArrowLeft02Icon';

export { ArrowLeft02Icon };
