'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface AddCircleIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AddCircleIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the boundary makes room, then the add mark resolves at its center
const circleVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(0.97)', 'scale(1.075)', 'scale(0.995)', 'scale(1)'],
    transition: { duration: 0.82, ease: [0.23, 1, 0.32, 1], times: [0, 0.18, 0.48, 0.74, 1] },
  },
};

const plusVariants: Variants = {
  normal: { transform: 'rotate(0deg) scale(1)' },
  animate: {
    transform: [
      'rotate(0deg) scale(1)',
      'rotate(-18deg) scale(0.64)',
      'rotate(5deg) scale(1.18)',
      'rotate(-1.5deg) scale(0.98)',
      'rotate(0deg) scale(1)',
    ],
    transition: { duration: 0.86, delay: 0.03, ease: [0.23, 1, 0.32, 1], times: [0, 0.2, 0.5, 0.74, 1] },
  },
};

const AddCircleIcon = forwardRef<AddCircleIconHandle, AddCircleIconProps>(
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
            d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={circleVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 12px' }}
          />
          <motion.path
            d="M12 8V16M16 12H8"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={plusVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 12px' }}
          />
        </svg>
      </div>
    );
  }
);

AddCircleIcon.displayName = 'AddCircleIcon';

export { AddCircleIcon };
