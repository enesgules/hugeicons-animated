'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface MinusSignSquareIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MinusSignSquareIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const MINUS_LAND = springEase(0.5, 0.3);
const CONTAINER_LAND = springEase(0.45, 0.35);

// Remove, shared by every minus mark: the minus stretches a little, pinches
// to scaleX 0.45, and springs back out. The container dips with the pinch.
const minusVariants: Variants = {
  normal: { transform: 'scaleX(1)' },
  animate: {
    transform: ['scaleX(1)', 'scaleX(1.08)', 'scaleX(0.45)', 'scaleX(1)'],
    transition: {
      duration: 0.8,
      times: [0, 0.16, 0.4, 1],
      ease: ['easeOut', [0.4, 0, 0.2, 1], MINUS_LAND],
    },
  },
};

const containerVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(1.02)', 'scale(0.95)', 'scale(1)'],
    transition: {
      duration: 0.8,
      times: [0, 0.16, 0.4, 1],
      ease: ['easeOut', [0.4, 0, 0.2, 1], CONTAINER_LAND],
    },
  },
};

const MinusSignSquareIcon = forwardRef<MinusSignSquareIconHandle, MinusSignSquareIconProps>(
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
            d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={containerVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 0.5 }}
          />
          <motion.path
            d="M16 12H8"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={minusVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 0.5 }}
          />
        </svg>
      </div>
    );
  }
);

MinusSignSquareIcon.displayName = 'MinusSignSquareIcon';

export { MinusSignSquareIcon };
