'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Diamond02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Diamond02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the gem opens wide enough to read, then its center facet catches up
const svgVariants: Variants = {
  normal: { transform: 'rotate(0deg) scale(1)' },
  animate: {
    transform: ['rotate(0deg) scale(1)', 'rotate(-5deg) scale(1.13)', 'rotate(3deg) scale(0.985)', 'rotate(0deg) scale(1)'],
    transition: { duration: 0.62, ease: [0.23, 1, 0.32, 1] },
  },
};

const facetVariants: Variants = {
  normal: { transform: 'scaleX(1)' },
  animate: {
    transform: ['scaleX(1)', 'scaleX(0.55)', 'scaleX(1.28)', 'scaleX(1)'],
    transition: { duration: 0.5, delay: 0.07, ease: [0.23, 1, 0.32, 1] },
  },
};

const Diamond02Icon = forwardRef<Diamond02IconHandle, Diamond02IconProps>(
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
          variants={svgVariants}
          animate={controls}
          initial="normal"
          style={{ transformOrigin: '12px 12px' }}
        >
          <path
            d="M5.78223 4.18192C6.43007 3.68319 6.754 3.43383 7.12788 3.27323C7.29741 3.20041 7.47367 3.14158 7.65459 3.09741C8.0536 3 8.4767 3 9.32289 3H14.6771C15.5233 3 15.9464 3 16.3454 3.09741C16.5263 3.14158 16.7026 3.20041 16.8721 3.27323C17.246 3.43383 17.5699 3.68319 18.2178 4.18192C20.3644 5.83448 21.4378 6.66077 21.8057 7.73078C21.9694 8.20673 22.0305 8.70728 21.9858 9.20461C21.8852 10.3227 21.0379 11.346 19.3433 13.3925L15.3498 18.2153C13.8126 20.0718 13.044 21 12 21C10.956 21 10.1874 20.0718 8.65018 18.2153L4.65671 13.3925C2.96208 11.346 2.11476 10.3227 2.0142 9.20461C1.96947 8.70728 2.03064 8.20673 2.1943 7.73078C2.56224 6.66077 3.63557 5.83448 5.78223 4.18192Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <motion.path
            d="M10 8.5H14"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={facetVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 8.5px' }}
          />
        </motion.svg>
      </div>
    );
  }
);

Diamond02Icon.displayName = 'Diamond02Icon';

export { Diamond02Icon };
