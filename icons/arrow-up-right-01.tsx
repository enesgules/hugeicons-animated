'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ArrowUpRight01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ArrowUpRight01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const pathVariants: Variants = {
  normal: { opacity: 1, transform: 'translate(0, 0)' },
  animate: {
    transform: [
      'translate(0, 0)',
      'translate(-0.7px, 0.7px)',
      'translate(3px, -3px)',
      'translate(-0.4px, 0.4px)',
      'translate(0, 0)',
    ],
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1],
      times: [0, 0.16, 0.5, 0.8, 1],
    },
  },
};

const ArrowUpRight01Icon = forwardRef<ArrowUpRight01IconHandle, ArrowUpRight01IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const { handleMouseEnter, handleMouseLeave } = useIconAnimation({
      controls,
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
          d="M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={pathVariants}
          custom={0}
          animate={controls}
          initial="normal"
        />
        </svg>
      </div>
    );
  }
);

ArrowUpRight01Icon.displayName = 'ArrowUpRight01Icon';

export { ArrowUpRight01Icon };
