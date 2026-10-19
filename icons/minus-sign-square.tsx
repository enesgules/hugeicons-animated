'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface MinusSignSquareIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MinusSignSquareIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// Subtraction pinches the minus inward while the box squeezes with it, then
// both spring back out and settle.
const minusVariants: Variants = {
  normal: { scaleX: 1 },
  animate: {
    scaleX: [1, 0.45, 1.12, 1],
    transition: {
      duration: 0.6,
      ease: ['easeInOut', [0.23, 1, 0.32, 1], 'easeInOut'],
      times: [0, 0.38, 0.7, 1],
    },
  },
};

const squareVariants: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 0.95, 1.025, 1],
    transition: {
      duration: 0.6,
      ease: ['easeInOut', [0.23, 1, 0.32, 1], 'easeInOut'],
      times: [0, 0.38, 0.7, 1],
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
            variants={squareVariants}
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
