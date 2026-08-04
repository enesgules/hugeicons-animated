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

// the connected flake turns as one object and returns exactly to rest
const snowVariants: Variants = {
  normal: { transform: 'translateY(0px) rotate(0deg) scale(1)' },
  animate: {
    transform: [
      'translateY(0px) rotate(0deg) scale(1)',
      'translateY(-0.55px) rotate(60deg) scale(1.055)',
      'translateY(0.2px) rotate(120deg) scale(0.99)',
      'translateY(0px) rotate(0deg) scale(1)',
    ],
    transition: { duration: 0.82, ease: [0.23, 1, 0.32, 1] },
  },
};

const SnowIcon = forwardRef<SnowIconHandle, SnowIconProps>(
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
          <path
            d="M21 14.25L20.1689 13.591C19.223 12.841 18.75 12.466 18.75 12C18.75 11.534 19.223 11.159 20.1689 10.409L21 9.75M3 9.75L3.83115 10.409C4.77705 11.159 5.25 11.534 5.25 12C5.25 12.466 4.77705 12.841 3.83115 13.591L3 14.25"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M14.5718 21L14.7282 19.9412C14.9062 18.7362 14.9951 18.1337 15.4019 17.8986C15.8087 17.6635 16.3744 17.8876 17.5058 18.3358L18.5 18.7296M9.4282 3L9.27182 4.0588C9.09384 5.26379 9.00486 5.86629 8.59808 6.10139C8.1913 6.3365 7.62558 6.1124 6.49416 5.6642L5.5 5.27038"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M5 18.7317L6.07032 18.3375C7.2884 17.8889 7.89747 17.6645 8.33521 17.8994C8.77295 18.1343 8.86844 18.7367 9.05941 19.9414L9.22722 21M19 5.26825L17.9297 5.66249C16.7116 6.11115 16.1025 6.33548 15.6648 6.1006C15.2271 5.86571 15.1316 5.26333 14.9406 4.05859L14.7728 3"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
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
