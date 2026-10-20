'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ChevronLeftIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ChevronLeftIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const NUDGE_LAND = springEase(0.5, 0.3);

// Nudge, shared by every arrow and chevron: a short wind-up against the
// direction, a dart along it, and a spring landing back in place.
const chevronVariants: Variants = {
  normal: { transform: 'translateX(0px) scaleY(1)' },
  animate: {
    transform: [
      'translateX(0px) scaleY(1)',
      'translateX(0.7px) scaleY(1.03)',
      'translateX(-2.6px) scaleY(0.9)',
      'translateX(0px) scaleY(1)',
    ],
    transition: {
      duration: 0.8,
      times: [0, 0.16, 0.4, 1],
      ease: ['easeOut', [0.4, 0, 0.2, 1], NUDGE_LAND],
    },
  },
};

const ChevronLeftIcon = forwardRef<ChevronLeftIconHandle, ChevronLeftIconProps>(
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
        <motion.path
          d="M15 18C15 18 9.00001 13.5811 9 12C8.99999 10.4188 15 6 15 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={chevronVariants}
          animate={controls}
          initial="normal"
        />
        </svg>
      </div>
    );
  }
);

ChevronLeftIcon.displayName = 'ChevronLeftIcon';

export { ChevronLeftIcon };
