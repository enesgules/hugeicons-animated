'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ChevronUpIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ChevronUpIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the arms pinch down in anticipation, open into the ascent, then softly close
const leftArmVariants: Variants = {
  normal: { transform: 'translateY(0px) rotate(0deg)' },
  animate: {
    transform: [
      'translateY(0px) rotate(0deg)',
      'translateY(0.35px) rotate(-2.5deg)',
      'translateY(-1.15px) rotate(1.5deg)',
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
      'translateY(0.35px) rotate(2.5deg)',
      'translateY(-1.15px) rotate(-1.5deg)',
      'translateY(0px) rotate(0deg)',
    ],
    transition: { duration: 0.34, ease: [0.23, 1, 0.32, 1] },
  },
};

const ChevronUpIcon = forwardRef<ChevronUpIconHandle, ChevronUpIconProps>(
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
            d="M18 15C18 15 13.5811 9.00001 12 9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={rightArmVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 9px' }}
          />
          <motion.path
            d="M12 9C10.4188 8.99999 6 15 6 15"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={leftArmVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 9px' }}
          />
        </svg>
      </div>
    );
  }
);

ChevronUpIcon.displayName = 'ChevronUpIcon';

export { ChevronUpIcon };
