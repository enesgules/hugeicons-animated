'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Search02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Search02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const SEARCH_LAND = springEase(0.45, 0.35);

// Search, shared by the magnifier icons: the magnifier lifts and tilts to scan
// right, sweeps back left, zooms in over the lens center, and lands with a
// spring.
const searchVariants: Variants = {
  normal: { transform: 'translate(0px, 0px) rotate(0deg) scale(1)' },
  animate: {
    transform: [
      'translate(0px, 0px) rotate(0deg) scale(1)',
      'translate(1.25px, -0.55px) rotate(14deg) scale(0.78)',
      'translate(-0.65px, 0.25px) rotate(-8deg) scale(0.8)',
      'translate(0px, 0px) rotate(0deg) scale(1.1)',
      'translate(0px, 0px) rotate(0deg) scale(1)',
    ],
    transition: {
      duration: 1.1,
      times: [0, 0.24, 0.46, 0.62, 1],
      ease: [[0.77, 0, 0.175, 1], [0.77, 0, 0.175, 1], [0.4, 0, 0.2, 1], SEARCH_LAND],
    },
  },
};

const Search02Icon = forwardRef<Search02IconHandle, Search02IconProps>(
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
          variants={searchVariants}
          animate={controls}
          initial="normal"
          style={{ transformOrigin: '39.5833% 39.5833%' }}
        >
          <path
            d="M15 15L16.5 16.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M16.9333 19.0252C16.3556 18.4475 16.3556 17.5109 16.9333 16.9333C17.5109 16.3556 18.4475 16.3556 19.0252 16.9333L21.0667 18.9748C21.6444 19.5525 21.6444 20.4891 21.0667 21.0667C20.4891 21.6444 19.5525 21.6444 18.9748 21.0667L16.9333 19.0252Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M16.5 9.5C16.5 5.63401 13.366 2.5 9.5 2.5C5.63401 2.5 2.5 5.63401 2.5 9.5C2.5 13.366 5.63401 16.5 9.5 16.5C13.366 16.5 16.5 13.366 16.5 9.5Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </motion.svg>
      </div>
    );
  }
);

Search02Icon.displayName = 'Search02Icon';

export { Search02Icon };
