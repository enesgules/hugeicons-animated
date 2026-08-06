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

const DATABASE_MIDDLE_PLATTER =
  'M20 12C20 13.6569 16.4183 15 12 15C7.58172 15 4 13.6569 4 12';
const DATABASE_BOTTOM_PLATTER =
  'M20 19C20 20.6569 16.4183 22 12 22C7.58172 22 4 20.6569 4 19';

// A short read head scans each platter from top to bottom.
const scanPulseVariants: Variants = {
  normal: { visibility: 'hidden', strokeDashoffset: 0.95 },
  animate: (i: number) => ({
    visibility: ['hidden', 'visible', 'visible', 'hidden'],
    strokeDashoffset: [0.95, 0.95, -0.12, -0.12],
    transition: {
      duration: 0.38,
      delay: i * 0.14,
      times: [0, 0.08, 0.82, 1],
      ease: 'linear',
    },
  }),
};

// Record fragments fill after the scan reaches their layer, then clear in reverse.
const recordLineVariants: Variants = {
  normal: { pathLength: 0 },
  animate: (i: number) => ({
    pathLength: [0, 0, 1, 1, 0],
    transition: {
      duration: 0.72,
      delay: i * 0.14,
      times: [0, 0.2, 0.4, 0.76, 1],
      ease: [0.77, 0, 0.175, 1],
    },
  }),
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: { visibility: 'visible', transition: { duration: 0 } },
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
          <ellipse
            cx="12"
            cy="5"
            rx="8"
            ry="3"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M7 10.842C7.60158 11.0229 8.27434 11.1718 9 11.282"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
          <path
            d={DATABASE_MIDDLE_PLATTER}
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M7 17.842C7.60158 18.0229 8.27434 18.1718 9 18.282"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
          <path
            d="M20 5V19C20 20.6569 16.4183 22 12 22C7.58172 22 4 20.6569 4 19V5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            <motion.ellipse
              cx="12"
              cy="5"
              rx="8"
              ry="3"
              pathLength="1"
              stroke="currentColor"
              strokeDasharray="0.18 0.82"
              strokeLinecap="round"
              strokeWidth="2.4"
              variants={scanPulseVariants}
              custom={0}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d={DATABASE_MIDDLE_PLATTER}
              pathLength="1"
              stroke="currentColor"
              strokeDasharray="0.18 0.82"
              strokeLinecap="round"
              strokeWidth="2.4"
              variants={scanPulseVariants}
              custom={1}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d={DATABASE_BOTTOM_PLATTER}
              pathLength="1"
              stroke="currentColor"
              strokeDasharray="0.18 0.82"
              strokeLinecap="round"
              strokeWidth="2.4"
              variants={scanPulseVariants}
              custom={2}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d="M10.5 11.4H12.25M13.75 11.4H16.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={recordLineVariants}
              custom={0}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d="M10.5 18.4H14M15.5 18.4H17"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={recordLineVariants}
              custom={1}
              animate={controls}
              initial="normal"
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

DatabaseIcon.displayName = 'DatabaseIcon';

export { DatabaseIcon };
