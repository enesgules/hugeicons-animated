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

// The gem pops into the light, its center facet flashes, and a large glint
// catches its upper edge before everything settles cleanly.
const svgVariants: Variants = {
  normal: {
    translateY: 0,
    rotate: 0,
    scale: 1,
    transition: { type: 'spring', duration: 0.3, bounce: 0 },
  },
  animate: {
    translateY: [0, -1.1, 0.2, -0.35, 0],
    rotate: [0, -4.5, 2.5, -0.75, 0],
    scale: [1, 1.15, 0.985, 1.045, 1],
    transition: {
      duration: 0.85,
      ease: 'easeInOut',
      times: [0, 0.3, 0.5, 0.72, 1],
    },
  },
};

const facetVariants: Variants = {
  normal: {
    visibility: 'visible',
    scaleX: 1,
    transition: { duration: 0.18, ease: 'easeOut' },
  },
  animate: {
    visibility: ['visible', 'visible', 'visible', 'visible', 'visible'],
    scaleX: [1, 0.55, 1.55, 0.82, 1],
    transition: {
      duration: 0.72,
      delay: 0.05,
      ease: 'easeInOut',
      times: [0, 0.24, 0.48, 0.72, 1],
    },
  },
};

const glintVariants: Variants = {
  normal: {
    visibility: 'hidden',
    scale: 0.2,
    rotate: -18,
    transition: { duration: 0.16, ease: 'easeOut' },
  },
  animate: {
    visibility: ['hidden', 'visible', 'visible', 'hidden'],
    scale: [0.2, 1.35, 1.05, 0.45],
    rotate: [-18, 0, 14, 26],
    transition: {
      duration: 0.68,
      delay: 0.08,
      ease: 'easeInOut',
      times: [0, 0.34, 0.62, 1],
    },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0.08 } },
  animate: { visibility: 'visible', transition: { duration: 0.08 } },
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
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            <motion.path
              d="M19.1 1.9V6.7M16.7 4.3H21.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={glintVariants}
              animate={controls}
              initial="normal"
              style={{ transformOrigin: '19.1px 4.3px' }}
            />
          </motion.g>
        </motion.svg>
      </div>
    );
  }
);

Diamond02Icon.displayName = 'Diamond02Icon';

export { Diamond02Icon };
