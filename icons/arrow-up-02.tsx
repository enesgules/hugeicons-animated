'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ArrowUp02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ArrowUp02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the up arrow stays rigid and travels along its own axis
const svgVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: [
      'translateY(0px)',
      'translateY(-2px)',
      'translateY(0px)',
    ],
    transition: {
      duration: 0.46,
      ease: [0.77, 0, 0.175, 1],
      times: [0, 0.58, 1],
    },
  },
};

const ArrowUp02Icon = forwardRef<ArrowUp02IconHandle, ArrowUp02IconProps>(
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
            d="M12 5.5V19"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11"
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

ArrowUp02Icon.displayName = 'ArrowUp02Icon';

export { ArrowUp02Icon };
