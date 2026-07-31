'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface SlidersHorizontalIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SlidersHorizontalIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// each control moves along its own track, one after another
const knobVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: (i: number) => ({
    transform: [
      'translateX(0px)',
      i === 0 ? 'translateX(-1.6px)' : i === 1 ? 'translateX(1.7px)' : 'translateX(-1.2px)',
      'translateX(0px)',
    ],
    transition: { duration: 0.25, delay: i * 0.025, ease: [0.23, 1, 0.32, 1] },
  }),
};

const SlidersHorizontalIcon = forwardRef<SlidersHorizontalIconHandle, SlidersHorizontalIconProps>(
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
          <path
            d="M3.99963 5.00055L9.99963 5.00031"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
          <path
            d="M12.9996 5.00031L19.9996 5.00031"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M15.9996 9.00031L15.9996 15.0003"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={knobVariants}
            custom={0}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '16px 12px' }}
          />
          <motion.path
            d="M9.99963 2.00031L9.99963 8.00031"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={knobVariants}
            custom={1}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '10px 5px' }}
          />
          <motion.path
            d="M11.9996 16.0003L11.9996 22.0003"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={knobVariants}
            custom={2}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 19px' }}
          />
          <path
            d="M15.9996 12.0001L19.9996 12.0003"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
          <path
            d="M3.99963 12.0005L12.9996 12.0003"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
          <path
            d="M11.9996 19.0003L19.9996 19.0003"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
          <path
            d="M3.99963 19.0005L8.99963 19.0003"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    );
  }
);

SlidersHorizontalIcon.displayName = 'SlidersHorizontalIcon';

export { SlidersHorizontalIcon };
