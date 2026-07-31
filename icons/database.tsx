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

// a write travels through the stack from the top platter to the bottom
const platterVariants: Variants = {
  normal: { translateY: 0, opacity: 1 },
  animate: (i: number) => ({
    translateY: [0, i % 2 === 0 ? 0.7 : -0.45, 0],
    opacity: [1, 0.45, 1],
    transition: { duration: 0.65, delay: i * 0.09, ease: 'easeInOut' },
  }),
};

const databaseShellVariants: Variants = {
  normal: { scaleY: 1, transition: { type: 'spring', duration: 0.45, bounce: 0 } },
  animate: {
    scaleY: [1, 0.96, 1.02, 1],
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const dataDotVariants: Variants = {
  normal: { opacity: 0, translateY: -4 },
  animate: {
    opacity: [0, 1, 1, 0],
    translateY: [-4, 0, 4],
    transition: { duration: 0.8, ease: 'easeInOut' },
  },
};

const DatabaseIcon = forwardRef<DatabaseIconHandle, DatabaseIconProps>(
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
          <motion.circle cx="12" cy="8.5" r="0.7" fill="currentColor" variants={dataDotVariants} animate={controls} initial="normal" />
        </svg>
      </div>
    );
  }
);

DatabaseIcon.displayName = 'DatabaseIcon';

export { DatabaseIcon };
