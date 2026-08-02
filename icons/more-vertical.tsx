'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface MoreVerticalIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MoreVerticalIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// focus descends through the options, with each dot handing off to the next
const dotVariants: Variants = {
  normal: { opacity: 1, transform: 'scale(1)' },
  animate: (i: number) => ({
    opacity: [1, 0.55, 1],
    transform: ['scale(1)', 'scale(1.14)', 'scale(1)'],
    transition: {
      duration: 0.16,
      ease: [0.23, 1, 0.32, 1],
      delay: i * 0.035,
      times: [0, 0.45, 1],
    },
  }),
};

const DOT_CENTERS = [6, 12, 18];

const MoreVerticalIcon = forwardRef<MoreVerticalIconHandle, MoreVerticalIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const { handleMouseEnter, handleMouseLeave } = useIconAnimation({
      controls,
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
          {DOT_CENTERS.map((cy, index) => (
            <motion.circle
              key={cy}
              cx="12"
              cy={cy}
              r="1.25"
              fill="currentColor"
              variants={dotVariants}
              custom={index}
              animate={controls}
              initial="normal"
              style={{ transformBox: 'view-box', transformOrigin: `12px ${cy}px` }}
            />
          ))}
        </svg>
      </div>
    );
  }
);

MoreVerticalIcon.displayName = 'MoreVerticalIcon';

export { MoreVerticalIcon };
