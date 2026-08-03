'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface SparklesIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SparklesIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// two stars trade brightness so the twinkle feels continuous, not simultaneous
const sparkleVariants: Variants = {
  normal: { scale: 1, rotate: 0, opacity: 1, transition: { type: 'spring', duration: 0.45, bounce: 0 } },
  animate: (i: number) => ({
    scale: [1, i === 0 ? 1.18 : 0.72, i === 0 ? 0.78 : 1.2, 1],
    rotate: [0, i === 0 ? 8 : -10, 0],
    opacity: [1, i === 0 ? 1 : 0.45, i === 0 ? 0.5 : 1, 1],
    transition: { duration: 1, times: [0, 0.32, 0.7, 1], ease: 'easeInOut' },
  }),
};

const glintVariants: Variants = {
  normal: { opacity: 0, scale: 0.25 },
  animate: (i: number) => ({
    opacity: [0, 1, 0],
    scale: [0.25, 1.1],
    transition: { duration: 0.45, delay: 0.18 + i * 0.16, ease: 'easeOut' },
  }),
};

const SparklesIcon = forwardRef<SparklesIconHandle, SparklesIconProps>(
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
            d="M15 2L15.5387 4.39157C15.9957 6.42015 17.5798 8.00431 19.6084 8.46127L22 9L19.6084 9.53873C17.5798 9.99569 15.9957 11.5798 15.5387 13.6084L15 16L14.4613 13.6084C14.0043 11.5798 12.4202 9.99569 10.3916 9.53873L8 9L10.3916 8.46127C12.4201 8.00431 14.0043 6.42015 14.4613 4.39158L15 2Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={sparkleVariants}
            custom={0}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '15px 9px' }}
          />
          <motion.path
            d="M7 12L7.38481 13.7083C7.71121 15.1572 8.84275 16.2888 10.2917 16.6152L12 17L10.2917 17.3848C8.84275 17.7112 7.71121 18.8427 7.38481 20.2917L7 22L6.61519 20.2917C6.28879 18.8427 5.15725 17.7112 3.70827 17.3848L2 17L3.70827 16.6152C5.15725 16.2888 6.28879 15.1573 6.61519 13.7083L7 12Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={sparkleVariants}
            custom={1}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '7px 17px' }}
          />
          <motion.path d="M5 4V2.4M4.2 3.2H5.8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.1" variants={glintVariants} custom={0} animate={controls} initial="normal" style={{ transformOrigin: '5px 3.2px' }} />
          <motion.path d="M19.5 19.5V17.9M18.7 18.7H20.3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.1" variants={glintVariants} custom={1} animate={controls} initial="normal" style={{ transformOrigin: '19.5px 18.7px' }} />
        </svg>
      </div>
    );
  }
);

SparklesIcon.displayName = 'SparklesIcon';

export { SparklesIcon };
