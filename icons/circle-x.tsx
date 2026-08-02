'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface CircleXIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CircleXIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the cross clamps shut, and the ring takes the small rejection knock
const ringVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(1)', 'scale(0.98)', 'scale(1.02)', 'scale(1)'],
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
      times: [0, 0.42, 0.6, 0.8, 1],
    },
  },
};

const crossVariants: Variants = {
  normal: { transform: 'rotate(0deg) scale(1)' },
  animate: {
    transform: [
      'rotate(0deg) scale(1)',
      'rotate(-6deg) scale(0.72)',
      'rotate(2deg) scale(1.1)',
      'rotate(0deg) scale(1)',
    ],
    transition: { duration: 0.34, ease: [0.23, 1, 0.32, 1] },
  },
};

const CircleXIcon = forwardRef<CircleXIconHandle, CircleXIconProps>(
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
        <motion.circle
          cx="12" cy="12" r="10" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={ringVariants}
          animate={controls}
          initial="normal"
          style={{ transformOrigin: '12px 12px' }}
        />
        <motion.path
          d="M9 9L15 15M15 9L9 15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={crossVariants}
          animate={controls}
          initial="normal"
          style={{ transformOrigin: '12px 12px' }}
        />
        </svg>
      </div>
    );
  }
);

CircleXIcon.displayName = 'CircleXIcon';

export { CircleXIcon };
