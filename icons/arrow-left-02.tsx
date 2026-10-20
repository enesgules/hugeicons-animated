'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ArrowLeft02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ArrowLeft02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const NUDGE_LAND = springEase(0.5, 0.3);

// Nudge, shared by every arrow and chevron: a short wind-up against the
// direction, a dart along it, and a spring landing back in place.
const arrowVariants: Variants = {
  normal: { transform: 'translateX(0px) scaleY(1)' },
  animate: {
    transform: [
      'translateX(0px) scaleY(1)',
      'translateX(0.7px) scaleY(1.03)',
      'translateX(-2.6px) scaleY(0.9)',
      'translateX(0px) scaleY(1)',
    ],
    transition: {
      duration: 0.8,
      times: [0, 0.16, 0.4, 1],
      ease: ['easeOut', [0.4, 0, 0.2, 1], NUDGE_LAND],
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
          >
            <path d="M5.5 12.002H19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d="M10.9999 18.002C10.9999 18.002 4.99998 13.583 4.99997 12.0019C4.99996 10.4208 11 6.00195 11 6.00195" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </motion.g>
        </svg>
      </div>
    );
  }
);

ArrowLeft02Icon.displayName = 'ArrowLeft02Icon';

export { ArrowLeft02Icon };
