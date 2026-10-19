'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface HelpSquareIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface HelpSquareIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// The question mark tilts its head on its base like a puzzled shrug, and the
// dot hops under it.
const squareVariants: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 0.98, 1.018, 0.996, 1],
    transition: {
      duration: 0.72,
      ease: ['easeInOut', 'easeInOut', 'easeInOut', 'easeInOut'],
      times: [0, 0.22, 0.5, 0.76, 1],
    },
  },
};

const questionVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, -18, 12, -5, 0],
    transition: {
      duration: 0.72,
      ease: ['easeInOut', 'easeInOut', 'easeInOut', 'easeInOut'],
      times: [0, 0.22, 0.5, 0.76, 1],
    },
  },
};

const dotVariants: Variants = {
  normal: { y: 0, scale: 1 },
  animate: {
    y: [0, 0.5, -0.7, 0.2, 0],
    scale: [1, 0.9, 1.15, 0.95, 1],
    transition: {
      duration: 0.72,
      ease: ['easeInOut', [0.23, 1, 0.32, 1], 'easeInOut', 'easeInOut'],
      times: [0, 0.22, 0.5, 0.76, 1],
    },
  },
};

const HelpSquareIcon = forwardRef<HelpSquareIconHandle, HelpSquareIconProps>(
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
            strokeWidth="1.5"
            variants={squareVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 0.5 }}
          />
          <motion.path
            d="M9.5 9.5C9.5 8.11929 10.6193 7 12 7C13.3807 7 14.5 8.11929 14.5 9.5C14.5 10.3569 14.0689 11.1131 13.4117 11.5636C12.7283 12.0319 12 12.6716 12 13.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={questionVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 13.5 / 24 }}
          />
          <motion.path
            d="M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={dotVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 16.75 / 24 }}
          />
        </svg>
      </div>
    );
  }
);

HelpSquareIcon.displayName = 'HelpSquareIcon';

export { HelpSquareIcon };
