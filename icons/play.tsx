'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface PlayIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PlayIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the play shape compresses, releases forward, and settles without decoration
const playVariants: Variants = {
  normal: { transform: 'translateX(0px) scaleX(1) scaleY(1)' },
  animate: {
    transform: [
      'translateX(0px) scaleX(1) scaleY(1)',
      'translateX(-0.8px) scaleX(0.9) scaleY(1.04)',
      'translateX(2px) scaleX(1.1) scaleY(0.97)',
      'translateX(-0.2px) scaleX(0.99) scaleY(1.005)',
      'translateX(0px) scaleX(1) scaleY(1)',
    ],
    transition: { duration: 0.52, times: [0, 0.2, 0.52, 0.78, 1], ease: [0.23, 1, 0.32, 1] },
  },
};

const PlayIcon = forwardRef<PlayIconHandle, PlayIconProps>(
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
            d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={playVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '10px 12px' }}
          />
        </svg>
      </div>
    );
  }
);

PlayIcon.displayName = 'PlayIcon';

export { PlayIcon };
