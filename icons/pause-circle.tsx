'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface PauseCircleIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PauseCircleIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const MEDIA_LAND = springEase(0.5, 0.3);
const MEDIA_DURATION = 0.8;
const MEDIA_TIMES = [0, 0.16, 0.4, 1];

// Media: the bars compress toward each other, release outward, and land with
// a spring; the ring dips with the press and springs back.
const ringVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(0.92)', 'scale(0.95)', 'scale(1)'],
    transition: {
      duration: MEDIA_DURATION,
      times: MEDIA_TIMES,
      ease: ['easeOut', [0.4, 0, 0.2, 1], MEDIA_LAND],
    },
  },
};

const barVariants: Variants = {
  normal: { transform: 'translateX(0px) scaleY(1)' },
  animate: (direction: number) => ({
    transform: [
      'translateX(0px) scaleY(1)',
      `translateX(${direction * 1.1}px) scaleY(0.88)`,
      `translateX(${direction * -0.66}px) scaleY(1.08)`,
      'translateX(0px) scaleY(1)',
    ],
    transition: {
      duration: MEDIA_DURATION,
      times: MEDIA_TIMES,
      ease: ['easeOut', [0.4, 0, 0.2, 1], MEDIA_LAND],
    },
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
            variants={ringVariants}
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
