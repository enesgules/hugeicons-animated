'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface InformationSquareIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface InformationSquareIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// The stem crouches and pushes off, and the dot hops above it before both
// settle back into the box.
const squareVariants: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 0.975, 1.02, 0.996, 1],
    transition: {
      duration: 0.62,
      ease: ['easeInOut', [0.23, 1, 0.32, 1], 'easeInOut', 'easeInOut'],
      times: [0, 0.22, 0.5, 0.76, 1],
    },
  },
};

const stemVariants: Variants = {
  normal: { scaleY: 1 },
  animate: {
    scaleY: [1, 0.75, 1.12, 0.97, 1],
    transition: {
      duration: 0.62,
      ease: ['easeInOut', [0.23, 1, 0.32, 1], 'easeInOut', 'easeInOut'],
      times: [0, 0.22, 0.5, 0.76, 1],
    },
  },
};

const dotVariants: Variants = {
  normal: { y: 0, scale: 1 },
  animate: {
    y: [0, 0.6, -2, 0.25, 0],
    scale: [1, 0.9, 1.16, 0.94, 1],
    transition: {
      duration: 0.62,
      ease: ['easeInOut', [0.23, 1, 0.32, 1], 'easeInOut', 'easeInOut'],
      times: [0, 0.22, 0.5, 0.76, 1],
    },
  },
};

const InformationSquareIcon = forwardRef<InformationSquareIconHandle, InformationSquareIconProps>(
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
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={squareVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 0.5 }}
          />
          <motion.path
            d="M12 16V12"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={stemVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 16 / 24 }}
          />
          <motion.path
            d="M12.125 8.25H12M12.25 8.25C12.25 8.11193 12.1381 8 12 8C11.8619 8 11.75 8.11193 11.75 8.25C11.75 8.38807 11.8619 8.5 12 8.5C12.1381 8.5 12.25 8.38807 12.25 8.25Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={dotVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 8.25 / 24 }}
          />
        </svg>
      </div>
    );
  }
);

InformationSquareIcon.displayName = 'InformationSquareIcon';

export { InformationSquareIcon };
