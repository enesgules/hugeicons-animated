'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ChevronRightIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ChevronRightIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the arms pinch left in anticipation, open into the turn, then softly close
const upperArmVariants: Variants = {
  normal: { transform: 'translateX(0px) rotate(0deg)' },
  animate: {
    transform: [
      'translateX(0px) rotate(0deg)',
      'translateX(-0.35px) rotate(-2.5deg)',
      'translateX(1.15px) rotate(1.5deg)',
      'translateX(0px) rotate(0deg)',
    ],
    transition: { duration: 0.34, ease: [0.23, 1, 0.32, 1] },
  },
};

const lowerArmVariants: Variants = {
  normal: { transform: 'translateX(0px) rotate(0deg)' },
  animate: {
    transform: [
      'translateX(0px) rotate(0deg)',
      'translateX(-0.35px) rotate(2.5deg)',
      'translateX(1.15px) rotate(-1.5deg)',
      'translateX(0px) rotate(0deg)',
    ],
    transition: { duration: 0.34, ease: [0.23, 1, 0.32, 1] },
  },
};

const ChevronRightIcon = forwardRef<ChevronRightIconHandle, ChevronRightIconProps>(
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
            d="M9.00005 18C9.00005 18 15 13.5811 15 12"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={lowerArmVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '15px 12px' }}
          />
          <motion.path
            d="M15 12C15 10.4188 9 6 9 6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={upperArmVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '15px 12px' }}
          />
        </svg>
      </div>
    );
  }
);

ChevronRightIcon.displayName = 'ChevronRightIcon';

export { ChevronRightIcon };
