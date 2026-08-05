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

const arrowVariants: Variants = {
  normal: { transform: 'translateX(0px) scaleY(1)' },
  animate: {
    transform: [
      'translateX(0px) scaleY(1)',
      'translateX(2.6px) scaleY(0.94)',
      'translateX(-0.3px) scaleY(1.02)',
      'translateX(0.45px) scaleY(0.99)',
      'translateX(0px) scaleY(1)',
    ],
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
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
          <motion.g
            variants={arrowVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 12px' }}
          >
            <path d="M18.5 12L4.99997 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </motion.g>
        </svg>
      </div>
    );
  }
);

ArrowRight02Icon.displayName = 'ArrowRight02Icon';

export { ArrowRight02Icon };
