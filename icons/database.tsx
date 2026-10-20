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

// The stack squashes on its base, stretches up, lands with a smaller squash,
// and settles. The body stretches from its base; every ring and record mark
// rides at its own height instead of scaling, so ring ends stay on the body
// sides and strokes keep their width. The record marks erase as the stack
// rises and write back in after it lands, top layer first.
const DATABASE_DURATION = 1;
const STRETCH = [1, 0.93, 1.07, 0.97, 1.01, 1];
const STRETCH_TIMES = [0, 0.14, 0.36, 0.56, 0.74, 1];
const SNAP = [0.23, 1, 0.32, 1] as const;
const BASE = 22;

const bodyVariants: Variants = {
  normal: { transform: 'scaleY(1)' },
  animate: {
    transform: STRETCH.map((s) => `scaleY(${s})`),
    transition: { duration: DATABASE_DURATION, times: STRETCH_TIMES, ease: SNAP },
  },
};

// A part at height `y` stays where the stretched body puts that height.
const rideVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: (y: number) => ({
    transform: STRETCH.map((s) => `translateY(${Math.round((BASE - y) * (1 - s) * 1000) / 1000}px)`),
    transition: { duration: DATABASE_DURATION, times: STRETCH_TIMES, ease: SNAP },
  }),
};

const markVariants: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: (layer: number) => ({
    pathLength: [1, 1, 0.05, 0.05, 1],
    opacity: [1, 1, 0, 0, 1],
    transition: {
      duration: DATABASE_DURATION,
      times: [0, 0.14, 0.3, 0.56 + layer * 0.08, 0.84 + layer * 0.08],
      ease: ['linear', 'easeIn', 'linear', SNAP],
    },
  }),
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
            variants={rideVariants}
            custom={5}
            animate={controls}
            initial="normal"
          />
          <motion.g variants={rideVariants} custom={11} animate={controls} initial="normal">
            <motion.path
              d="M7 10.842C7.60158 11.0229 8.27434 11.1718 9 11.282"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={markVariants}
              custom={0}
              animate={controls}
              initial="normal"
            />
          </motion.g>
          <motion.path
            d="M20 12C20 13.6569 16.4183 15 12 15C7.58172 15 4 13.6569 4 12"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={rideVariants}
            custom={12}
            animate={controls}
            initial="normal"
          />
          <motion.g variants={rideVariants} custom={18} animate={controls} initial="normal">
            <motion.path
              d="M7 17.842C7.60158 18.0229 8.27434 18.1718 9 18.282"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={markVariants}
              custom={1}
              animate={controls}
              initial="normal"
            />
          </motion.g>
          <motion.path
            d="M20 5V19C20 20.6569 16.4183 22 12 22C7.58172 22 4 20.6569 4 19V5"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={bodyVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: BASE / 24 }}
          />
        </svg>
      </div>
    );
  },
);

DatabaseIcon.displayName = 'DatabaseIcon';

export { DatabaseIcon };
