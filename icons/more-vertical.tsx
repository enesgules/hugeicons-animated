'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface MoreVerticalIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MoreVerticalIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// rest-parity: split-source-path
const DOTS = [
  'M11.9967 6.5V6M12.9967 6.5C12.9967 5.94772 12.549 5.5 11.9967 5.5C11.4444 5.5 10.9967 5.94772 10.9967 6.5C10.9967 7.05228 11.4444 7.5 11.9967 7.5C12.549 7.5 12.9967 7.05228 12.9967 6.5Z',
  'M11.9967 12.5V12M12.9967 12.5C12.9967 11.9477 12.549 11.5 11.9967 11.5C11.4444 11.5 10.9967 11.9477 10.9967 12.5C10.9967 13.0523 11.4444 13.5 11.9967 13.5C12.549 13.5 12.9967 13.0523 12.9967 12.5Z',
  'M11.9967 18.5V18M12.9967 18.5C12.9967 17.9477 12.549 17.5 11.9967 17.5C11.4444 17.5 10.9967 17.9477 10.9967 18.5C10.9967 19.0523 11.4444 19.5 11.9967 19.5C12.549 19.5 12.9967 19.0523 12.9967 18.5Z',
];
const DOT_DURATION = 0.7;
const DOT_TIMES = [0, 0.16, 0.4, 1];
const DOT_STAGGER = 0.08;
const DOT_LAND = springEase(0.5, 0.3);

// Hop, shared by the more icons: each dot crouches, hops sideways off the
// column, and lands with a spring, one after the other in reading order.
const dotVariants: Variants = {
  normal: { transform: 'translateX(0px) scale(1)' },
  animate: (i: number) => ({
    transform: [
      'translateX(0px) scale(1)',
      'translateX(-0.5px) scale(0.85)',
      'translateX(2px) scale(1.1)',
      'translateX(0px) scale(1)',
    ],
    transition: {
      duration: DOT_DURATION,
      delay: i * DOT_STAGGER,
      times: DOT_TIMES,
      ease: ['easeOut', [0.4, 0, 0.2, 1], DOT_LAND],
    },
  }),
};

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

MoreVerticalIcon.displayName = 'MoreVerticalIcon';

export { MoreVerticalIcon };
