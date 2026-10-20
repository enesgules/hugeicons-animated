'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface PlayCircleIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PlayCircleIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the play shape compresses, releases forward, and settles without decoration
const playVariants: Variants = {
  normal: { x: 0, scaleX: 1, scaleY: 1 },
  animate: {
    x: [0, -0.8, 2, -0.2, 0],
    scaleX: [1, 0.9, 1.1, 0.99, 1],
    scaleY: [1, 1.04, 0.97, 1.005, 1],
    transition: { duration: 0.52, times: [0, 0.2, 0.52, 0.78, 1], ease: [0.23, 1, 0.32, 1] },
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
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <motion.path
            d="M15.9453 12.3948C15.7686 13.0215 14.9333 13.4644 13.2629 14.3502C11.648 15.2064 10.8406 15.6346 10.1899 15.4625C9.9209 15.3913 9.6758 15.2562 9.47812 15.0701C9 14.6198 9 13.7465 9 12C9 10.2535 9 9.38018 9.47812 8.92995C9.6758 8.74381 9.9209 8.60868 10.1899 8.53753C10.8406 8.36544 11.648 8.79357 13.2629 9.64983C14.9333 10.5356 15.7686 10.9785 15.9453 11.6052C16.0182 11.8639 16.0182 12.1361 15.9453 12.3948Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={playVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 12.5 / 24, originY: 0.5 }}
          />
        </svg>
      </div>
    );
  }
);

PlayCircleIcon.displayName = 'PlayCircleIcon';

export { PlayCircleIcon };
