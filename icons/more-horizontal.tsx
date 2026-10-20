'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface MoreHorizontalIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MoreHorizontalIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// rest-parity: split-source-path
const DOTS = [
  'M6.00449 12.5V12M7.00449 12.5C7.00449 11.9477 6.55677 11.5 6.00449 11.5C5.4522 11.5 5.00449 11.9477 5.00449 12.5C5.00449 13.0523 5.4522 13.5 6.00449 13.5C6.55677 13.5 7.00449 13.0523 7.00449 12.5Z',
  'M12.0045 12.5V12M13.0045 12.5C13.0045 11.9477 12.5568 11.5 12.0045 11.5C11.4522 11.5 11.0045 11.9477 11.0045 12.5C11.0045 13.0523 11.4522 13.5 12.0045 13.5C12.5568 13.5 13.0045 13.0523 13.0045 12.5Z',
  'M18.0045 12.5V12M19.0045 12.5C19.0045 11.9477 18.5568 11.5 18.0045 11.5C17.4522 11.5 17.0045 11.9477 17.0045 12.5C17.0045 13.0523 17.4522 13.5 18.0045 13.5C18.5568 13.5 19.0045 13.0523 19.0045 12.5Z',
];
const DOT_DURATION = 0.7;
const DOT_TIMES = [0, 0.16, 0.4, 1];
const DOT_STAGGER = 0.08;
const DOT_LAND = springEase(0.5, 0.3);

// Hop, shared by the more icons: each dot crouches, hops up off the row,
// and lands with a spring, one after the other in reading order.
const dotVariants: Variants = {
  normal: { transform: 'translateY(0px) scale(1)' },
  animate: (i: number) => ({
    transform: [
      'translateY(0px) scale(1)',
      'translateY(0.5px) scale(0.85)',
      'translateY(-2px) scale(1.1)',
      'translateY(0px) scale(1)',
    ],
    transition: {
      duration: DOT_DURATION,
      delay: i * DOT_STAGGER,
      times: DOT_TIMES,
      ease: ['easeOut', [0.4, 0, 0.2, 1], DOT_LAND],
    },
  }),
};

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
          {DOTS.map((d, index) => (
            <motion.path
              key={d}
              d={d}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={dotVariants}
              custom={index}
              animate={controls}
              initial="normal"
            />
          ))}
        </svg>
      </div>
    );
  }
);

MoreHorizontalIcon.displayName = 'MoreHorizontalIcon';

export { MoreHorizontalIcon };
