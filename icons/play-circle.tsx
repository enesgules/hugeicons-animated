'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface PlayCircleIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PlayCircleIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const MEDIA_LAND = springEase(0.5, 0.3);
const MEDIA_DURATION = 0.8;
const MEDIA_TIMES = [0, 0.16, 0.4, 1];

// Media: the play shape compresses back, releases forward, and lands with a
// spring; the ring dips with the press and springs back.
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

const triangleVariants: Variants = {
  normal: { transform: 'translateX(0px) scaleX(1) scaleY(1)' },
  animate: {
    transform: [
      'translateX(0px) scaleX(1) scaleY(1)',
      'translateX(-0.8px) scaleX(0.88) scaleY(1.04)',
      'translateX(2px) scaleX(1.08) scaleY(0.97)',
      'translateX(0px) scaleX(1) scaleY(1)',
    ],
    transition: {
      duration: MEDIA_DURATION,
      times: MEDIA_TIMES,
      ease: ['easeOut', [0.4, 0, 0.2, 1], MEDIA_LAND],
    },
  },
};

const PlayCircleIcon = forwardRef<PlayCircleIconHandle, PlayCircleIconProps>(
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
          <motion.path
            d="M15.9453 12.3948C15.7686 13.0215 14.9333 13.4644 13.2629 14.3502C11.648 15.2064 10.8406 15.6346 10.1899 15.4625C9.9209 15.3913 9.6758 15.2562 9.47812 15.0701C9 14.6198 9 13.7465 9 12C9 10.2535 9 9.38018 9.47812 8.92995C9.6758 8.74381 9.9209 8.60868 10.1899 8.53753C10.8406 8.36544 11.648 8.79357 13.2629 9.64983C14.9333 10.5356 15.7686 10.9785 15.9453 11.6052C16.0182 11.8639 16.0182 12.1361 15.9453 12.3948Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={triangleVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 10 / 24, originY: 0.5 }}
          />
        </svg>
      </div>
    );
  }
);

PlayCircleIcon.displayName = 'PlayCircleIcon';

export { PlayCircleIcon };
