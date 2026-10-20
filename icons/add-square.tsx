'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface AddSquareIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AddSquareIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the boundary makes room, then the add mark resolves at its center
const containerVariants: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 0.96, 1.025, 1],
    transition: { duration: 0.48, ease: [0.23, 1, 0.32, 1] },
  },
};

const plusVariants: Variants = {
  normal: { rotate: 0, scale: 1 },
  animate: {
    rotate: [0, -10, 3, 0],
    scale: [1, 0.82, 1.08, 1],
    transition: { duration: 0.42, delay: 0.04, ease: [0.23, 1, 0.32, 1] },
  },
};

const AddSquareIcon = forwardRef<AddSquareIconHandle, AddSquareIconProps>(
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
          <motion.g
            variants={containerVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 0.5 }}
          >
            <path
              d="M2.5 12.0001C2.5 7.52171 2.5 5.28254 3.89124 3.8913C5.28249 2.50005 7.52166 2.50005 12 2.50005C16.4783 2.50005 18.7175 2.50005 20.1088 3.8913C21.5 5.28254 21.5 7.52171 21.5 12.0001C21.5 16.4784 21.5 18.7176 20.1088 20.1088C18.7175 21.5001 16.4783 21.5001 12 21.5001C7.52166 21.5001 5.28249 21.5001 3.89124 20.1088C2.5 18.7176 2.5 16.4784 2.5 12.0001Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </motion.g>
          <motion.path
            d="M12 8.00005V16.0001M16 12.0001L8 12.0001"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={plusVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 0.5 }}
          />
        </svg>
      </div>
    );
  }
);

AddSquareIcon.displayName = 'AddSquareIcon';

export { AddSquareIcon };
