'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface SnowIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SnowIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// a drifting snowflake turns with tiny independent flex through its arms
const snowVariants: Variants = {
  normal: { rotate: 0, scale: 1, translateY: 0, transition: { type: 'spring', duration: 0.55, bounce: 0 } },
  animate: {
    rotate: [0, 60, 120],
    scale: [1, 1.06, 1],
    translateY: [0, 0.7, 0],
    transition: { duration: 1.6, ease: 'easeInOut' },
  },
};

const snowArmVariants: Variants = {
  normal: { opacity: 1 },
  animate: (i: number) => ({
    opacity: [1, 0.5, 1],
    transition: { duration: 0.65, delay: i * 0.08, ease: 'easeInOut' },
  }),
};

const SnowIcon = forwardRef<SnowIconHandle, SnowIconProps>(
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
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          overflow="visible"
          variants={snowVariants}
          animate={controls}
          initial="normal"
          style={{ transformOrigin: '12px 12px' }}
        >
          <motion.path
            d="M21 14.25L20.1689 13.591C19.223 12.841 18.75 12.466 18.75 12C18.75 11.534 19.223 11.159 20.1689 10.409L21 9.75M3 9.75L3.83115 10.409C4.77705 11.159 5.25 11.534 5.25 12C5.25 12.466 4.77705 12.841 3.83115 13.591L3 14.25"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={snowArmVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M14.5718 21L14.7282 19.9412C14.9062 18.7362 14.9951 18.1337 15.4019 17.8986C15.8087 17.6635 16.3744 17.8876 17.5058 18.3358L18.5 18.7296M9.4282 3L9.27182 4.0588C9.09384 5.26379 9.00486 5.86629 8.59808 6.10139C8.1913 6.3365 7.62558 6.1124 6.49416 5.6642L5.5 5.27038"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={snowArmVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M5 18.7317L6.07032 18.3375C7.2884 17.8889 7.89747 17.6645 8.33521 17.8994C8.77295 18.1343 8.86844 18.7367 9.05941 19.9414L9.22722 21M19 5.26825L17.9297 5.66249C16.7116 6.11115 16.1025 6.33548 15.6648 6.1006C15.2271 5.86571 15.1316 5.26333 14.9406 4.05859L14.7728 3"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={snowArmVariants}
            custom={2}
            animate={controls}
            initial="normal"
          />
          <path
            d="M19 12.0003H5M15.5 17.9998L8.5 6M15.5 6.00025L8.5 18"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </motion.svg>
      </div>
    );
  }
);

SnowIcon.displayName = 'SnowIcon';

export { SnowIcon };
