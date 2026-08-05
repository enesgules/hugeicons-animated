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

// rest-parity: split-source-path

const arrowVariants: Variants = {
  normal: { transform: 'translate(0px, 0px) scale(1)' },
  animate: {
    transform: [
      'translate(0px, 0px) scale(1)',
      'translate(2.1px, -2.1px) scale(0.97)',
      'translate(-0.25px, 0.25px) scale(1.01)',
      'translate(0.4px, -0.4px) scale(0.995)',
      'translate(0px, 0px) scale(1)',
    ],
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
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
          <motion.g
            variants={arrowVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 12px' }}
          >
            <path d="M16.5 7.5L6.5 17.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d="M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </motion.g>
        </svg>
      </div>
    );
  }
);

ArrowUpRight01Icon.displayName = 'ArrowUpRight01Icon';

export { ArrowUpRight01Icon };
