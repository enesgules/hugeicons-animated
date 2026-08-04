'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface DatabaseIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface DatabaseIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// a write compresses each platter in order, travelling down the stack
const platterVariants: Variants = {
  normal: { transform: 'scaleX(1)', pathLength: 1 },
  animate: (i: number) => ({
    transform: ['scaleX(1)', 'scaleX(0.72)', 'scaleX(1.08)', 'scaleX(1)'],
    pathLength: [1, 0.35, 1, 1],
    transition: { duration: 0.42, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] },
  }),
};

const databaseShellVariants: Variants = {
  normal: { transform: 'scaleY(1)' },
  animate: {
    transform: ['scaleY(1)', 'scaleY(0.96)', 'scaleY(1.025)', 'scaleY(1)'],
    transition: { duration: 0.62, ease: [0.23, 1, 0.32, 1] },
  },
};

const DatabaseIcon = forwardRef<DatabaseIconHandle, DatabaseIconProps>(
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
          <motion.ellipse
            cx="12"
            cy="5"
            rx="8"
            ry="3"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={platterVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M7 10.842C7.60158 11.0229 8.27434 11.1718 9 11.282"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={platterVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M20 12C20 13.6569 16.4183 15 12 15C7.58172 15 4 13.6569 4 12"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={platterVariants}
            custom={2}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M7 17.842C7.60158 18.0229 8.27434 18.1718 9 18.282"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={platterVariants}
            custom={3}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M20 5V19C20 20.6569 16.4183 22 12 22C7.58172 22 4 20.6569 4 19V5"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={databaseShellVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 13px' }}
          />
        </svg>
      </div>
    );
  }
);

DatabaseIcon.displayName = 'DatabaseIcon';

export { DatabaseIcon };
