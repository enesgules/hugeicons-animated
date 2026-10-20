'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface MoreHorizontalIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MoreHorizontalIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const dotVariants: Variants = {
  normal: { translateY: 0, scale: 1 },
  animate: (i: number) => ({
    translateY: [0, -1.5, 0.35, 0],
    scale: [1, 1.2, 0.95, 1],
    transition: { duration: 0.42, ease: 'easeOut', delay: i * 0.08 },
  }),
};

const DOT_CENTERS = [6, 12, 18];

const MoreHorizontalIcon = forwardRef<MoreHorizontalIconHandle, MoreHorizontalIconProps>(
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
          {DOT_CENTERS.map((cx, index) => (
            <motion.circle
              key={cx}
              cx={cx}
              cy="12"
              r="1.25"
              fill="currentColor"
              variants={dotVariants}
              custom={index}
              animate={controls}
              initial="normal"
              style={{ transformOrigin: `${cx}px 12px` }}
            />
          ))}
        </svg>
      </div>
    );
  }
);

MoreHorizontalIcon.displayName = 'MoreHorizontalIcon';

export { MoreHorizontalIcon };
