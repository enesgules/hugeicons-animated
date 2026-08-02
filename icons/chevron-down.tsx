'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ChevronDownIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ChevronDownIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the arms pinch upward in anticipation, open into the descent, then softly close
const leftArmVariants: Variants = {
  normal: { transform: 'translateY(0px) rotate(0deg)' },
  animate: {
    transform: [
      'translateY(0px) rotate(0deg)',
      'translateY(-0.35px) rotate(2.5deg)',
      'translateY(1.15px) rotate(-1.5deg)',
      'translateY(0px) rotate(0deg)',
    ],
    transition: { duration: 0.34, ease: [0.23, 1, 0.32, 1] },
  },
};

const rightArmVariants: Variants = {
  normal: { transform: 'translateY(0px) rotate(0deg)' },
  animate: {
    transform: [
      'translateY(0px) rotate(0deg)',
      'translateY(-0.35px) rotate(-2.5deg)',
      'translateY(1.15px) rotate(1.5deg)',
      'translateY(0px) rotate(0deg)',
    ],
    transition: { duration: 0.34, ease: [0.23, 1, 0.32, 1] },
  },
};

const ChevronDownIcon = forwardRef<ChevronDownIconHandle, ChevronDownIconProps>(
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
            d="M18 9.00005C18 9.00005 13.5811 15 12 15"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={rightArmVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 15px' }}
          />
          <motion.path
            d="M12 15C10.4188 15 6 9 6 9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={leftArmVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 15px' }}
          />
        </svg>
      </div>
    );
  }
);

ChevronDownIcon.displayName = 'ChevronDownIcon';

export { ChevronDownIcon };
