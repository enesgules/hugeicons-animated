'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Wifi01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Wifi01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the signal physically expands from its source; visibility only supports the motion
const arcVariants: Variants = {
  normal: { visibility: 'visible', transform: 'translateY(0px) scale(1)', transition: { duration: 0.22 } },
  animate: (i: number) => ({
    visibility: ['visible', 'visible', 'visible'],
    transform: [
      'translateY(0.8px) scale(0.82)',
      'translateY(0px) scale(1.06)',
      'translateY(0px) scale(1)',
    ],
    transition: {
      duration: 0.95,
      ease: [0.23, 1, 0.32, 1],
      repeat: Infinity,
      repeatDelay: 0.08,
      delay: i * 0.12,
    },
  }),
};

const sourceVariants: Variants = {
  normal: { transform: 'scale(1)', transition: { duration: 0.2 } },
  animate: {
    transform: ['scale(1)', 'scale(0.86)', 'scale(1.18)', 'scale(1)'],
    transition: { duration: 0.95, ease: [0.23, 1, 0.32, 1], repeat: Infinity, repeatDelay: 0.08 },
  },
};

const Wifi01Icon = forwardRef<Wifi01IconHandle, Wifi01IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const { handleMouseEnter, handleMouseLeave } = useIconAnimation({
      controls,
      loops: true,
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
            d="M8.25 14.5C10.25 12.5 13.75 12.5 15.75 14.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={arcVariants}
            custom={0}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 18px' }}
          />
          <motion.path
            d="M18.5 11.5C14.7324 8.16667 9.5 8.16667 5.5 11.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={arcVariants}
            custom={1}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 18px' }}
          />
          <motion.path
            d="M2 8.5C8.31579 3.16669 15.6842 3.16668 22 8.49989"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={arcVariants}
            custom={2}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 18px' }}
          />
          <motion.circle
            cx="12"
            cy="18"
            r="1.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={sourceVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 18px' }}
          />
        </svg>
      </div>
    );
  }
);

Wifi01Icon.displayName = 'Wifi01Icon';

export { Wifi01Icon };
