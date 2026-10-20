'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface CancelCircleIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CancelCircleIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const MARK_LAND = springEase(0.5, 0.3);
const CONTAINER_LAND = springEase(0.45, 0.35);

// Cancel, shared by every X mark: both strokes are erased fast, then redrawn
// in writing order (top-right stroke first) a little large, and the X lands
// at its size with a spring. The container dips as it lands.
const markVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(1.12)', 'scale(1.12)', 'scale(1)'],
    transition: {
      duration: 1,
      times: [0, 0.16, 0.56, 1],
      ease: ['easeOut', 'linear', MARK_LAND],
    },
  },
};

// rest-parity: split-source-path
const strokeVariants: Variants = {
  normal: { pathLength: 1, pathOffset: 0, visibility: 'visible' },
  animate: (i: number) => ({
    pathLength: [1, 0, 0, 1, 1],
    pathOffset: [0, 1, 0, 0, 0],
    visibility: ['visible', 'hidden', 'hidden', 'visible', 'visible'],
    transition: {
      duration: 1,
      times: [0, 0.12, 0.16 + i * 0.2, 0.36 + i * 0.2, 1],
      ease: ['easeIn', 'linear', [0.4, 0, 0.2, 1], 'linear'],
    },
  }),
};

const containerVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(1)', 'scale(0.95)', 'scale(1)'],
    transition: {
      duration: 1,
      times: [0, 0.56, 0.64, 1],
      ease: ['linear', 'easeOut', CONTAINER_LAND],
    },
  },
};

const CancelCircleIcon = forwardRef<CancelCircleIconHandle, CancelCircleIconProps>(
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
            d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={containerVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 0.5 }}
          />
          <motion.g
            variants={markVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 0.5 }}
          >
            <motion.path
              d="M15 9L9.00064 15"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              custom={0}
              variants={strokeVariants}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d="M9 9L14.9994 15"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              custom={1}
              variants={strokeVariants}
              animate={controls}
              initial="normal"
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

CancelCircleIcon.displayName = 'CancelCircleIcon';

export { CancelCircleIcon };
