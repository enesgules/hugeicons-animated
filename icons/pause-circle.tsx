'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface PauseCircleIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PauseCircleIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// The pair compresses toward the center, releases outward, and settles as one control.
const pauseBarVariants: Variants = {
  normal: { x: 0, y: 0, scaleY: 1, transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] } },
  animate: (direction: number) => ({
    x: [0, direction * 0.8, direction * -0.55, direction * 0.14, 0],
    y: [0, 0.65, -0.35, 0, 0],
    scaleY: [1, 0.91, 1.045, 0.99, 1],
    transition: { duration: 0.52, times: [0, 0.22, 0.5, 0.76, 1], ease: [0.77, 0, 0.175, 1] },
  }),
};

const PauseCircleIcon = forwardRef<PauseCircleIconHandle, PauseCircleIconProps>(
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
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          {/* rest-parity: split-source-path */}
          <motion.path
            d="M9.5 9L9.5 15"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={pauseBarVariants}
            custom={1}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 9.5 / 24, originY: 0.5 }}
          />
          <motion.path
            d="M14.5 9V15"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={pauseBarVariants}
            custom={-1}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 14.5 / 24, originY: 0.5 }}
          />
        </svg>
      </div>
    );
  }
);

PauseCircleIcon.displayName = 'PauseCircleIcon';

export { PauseCircleIcon };
