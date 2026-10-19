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

const PAUSE_DURATION = 0.56;
const PAUSE_TIMES = [0, 0.22, 0.5, 0.76, 1];

// The button presses in as the bars squeeze toward each other, then the bars
// release outward and everything settles as one control.
const buttonVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(0.93)', 'scale(1.03)', 'scale(0.995)', 'scale(1)'],
    transition: { duration: PAUSE_DURATION, times: PAUSE_TIMES, ease: [0.23, 1, 0.32, 1] },
  },
};

const barVariants: Variants = {
  normal: { transform: 'translateX(0px) scaleY(1)' },
  animate: (direction: number) => ({
    transform: [
      'translateX(0px) scaleY(1)',
      `translateX(${direction * 1.1}px) scaleY(0.8)`,
      `translateX(${direction * -0.7}px) scaleY(1.14)`,
      `translateX(${direction * 0.15}px) scaleY(0.98)`,
      'translateX(0px) scaleY(1)',
    ],
    transition: { duration: PAUSE_DURATION, times: PAUSE_TIMES, ease: [0.77, 0, 0.175, 1] },
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
          <motion.circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={buttonVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 0.5 }}
          />
          {/* rest-parity: split-source-path */}
          <motion.path
            d="M9.5 9L9.5 15"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={barVariants}
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
            variants={barVariants}
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
