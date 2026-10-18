'use client';

import type { Easing, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface NextIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface NextIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// Skip forward: the play triangle loads back, then jumps toward the stop bar.
// The bar takes the push a moment later and both settle back in place.
const SKIP_TIMES = [0, 0.2, 0.5, 0.76, 1];
const SKIP_EASE: Easing[] = ['easeOut', [0.23, 1, 0.32, 1], 'easeInOut', 'easeOut'];

const triangleVariants: Variants = {
  normal: { translateX: 0 },
  animate: {
    translateX: [0, -1.4, 3, -0.4, 0],
    transition: { duration: 0.6, ease: SKIP_EASE, times: SKIP_TIMES },
  },
};

const barVariants: Variants = {
  normal: { translateX: 0 },
  animate: {
    translateX: [0, 0, 1.5, -0.25, 0],
    transition: { duration: 0.6, delay: 0.04, ease: SKIP_EASE, times: SKIP_TIMES },
  },
};

const NextIcon = forwardRef<NextIconHandle, NextIconProps>(
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
            d="M15.9351 12.6258C15.6807 13.8374 14.327 14.7077 11.6198 16.4481C8.67528 18.3411 7.20303 19.2876 6.01052 18.9229C5.60662 18.7994 5.23463 18.5823 4.92227 18.2876C4 17.4178 4 15.6118 4 12C4 8.38816 4 6.58224 4.92227 5.71235C5.23463 5.41773 5.60662 5.20057 6.01052 5.07707C7.20304 4.71243 8.67528 5.6589 11.6198 7.55186C14.327 9.29233 15.6807 10.1626 15.9351 11.3742C16.0216 11.7865 16.0216 12.2135 15.9351 12.6258Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={triangleVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M20 5V19"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={barVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

NextIcon.displayName = 'NextIcon';

export { NextIcon };
