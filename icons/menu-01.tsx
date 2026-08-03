'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Menu01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Menu01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// three shared strokes make the state change legible: the outer bars become
// the X while the unused middle bar collapses to an invisible center line
const topLineVariants: Variants = {
  normal: { transform: 'translateY(0px) rotate(0deg)' },
  animate: {
    transform: [
      'translateY(0px) rotate(0deg)',
      'translateY(7px) rotate(45deg)',
      'translateY(7px) rotate(45deg)',
      'translateY(0px) rotate(0deg)',
    ],
    transition: {
      duration: 0.72,
      ease: [0.77, 0, 0.175, 1],
      times: [0, 0.36, 0.64, 1],
    },
  },
};

const bottomLineVariants: Variants = {
  normal: { transform: 'translateY(0px) rotate(0deg)' },
  animate: {
    transform: [
      'translateY(0px) rotate(0deg)',
      'translateY(-7px) rotate(-45deg)',
      'translateY(-7px) rotate(-45deg)',
      'translateY(0px) rotate(0deg)',
    ],
    transition: {
      duration: 0.72,
      ease: [0.77, 0, 0.175, 1],
      times: [0, 0.36, 0.64, 1],
    },
  },
};

const midLineVariants: Variants = {
  normal: { opacity: 1, transform: 'scaleX(1)' },
  animate: {
    opacity: [1, 0, 0, 1],
    transform: ['scaleX(1)', 'scaleX(0.001)', 'scaleX(0.001)', 'scaleX(1)'],
    transition: {
      duration: 0.72,
      ease: [0.77, 0, 0.175, 1],
      times: [0, 0.3, 0.7, 1],
    },
  },
};

const Menu01Icon = forwardRef<Menu01IconHandle, Menu01IconProps>(
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
            d="M4 5L20 5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={topLineVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', transformOrigin: '12px 5px' }}
          />
          <motion.path
            d="M4 12L20 12"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={midLineVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
          />
          <motion.path
            d="M4 19L20 19"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={bottomLineVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', transformOrigin: '12px 19px' }}
          />
        </svg>
      </div>
    );
  }
);

Menu01Icon.displayName = 'Menu01Icon';

export { Menu01Icon };
