'use client';

import type { Transition, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Undo02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Undo02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// a complete backward turn reads as undo, as in undo; the hook tightens on the
// wind-up and opens again as the turn takes off
const UNDO_TRANSITION: Transition = {
  duration: 0.82,
  ease: [0.77, 0, 0.175, 1],
  times: [0, 0.1, 0.68, 0.84, 1],
};

const turnVariants: Variants = {
  normal: { transform: 'rotate(0deg) scale(1)' },
  animate: {
    transform: [
      'rotate(0deg) scale(1)',
      'rotate(16deg) scale(0.97)',
      'rotate(-360deg) scale(1)',
      'rotate(-352deg) scale(1.01)',
      'rotate(-360deg) scale(1)',
    ],
    transition: UNDO_TRANSITION,
    transitionEnd: { transform: 'rotate(0deg) scale(1)' },
  },
};

const hookVariants: Variants = {
  normal: { pathLength: 1 },
  animate: {
    pathLength: [1, 0.78, 1, 1, 1],
    transition: UNDO_TRANSITION,
  },
};

const Undo02Icon = forwardRef<Undo02IconHandle, Undo02IconProps>(
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
            variants={turnVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 0.5 }}
          >
            <path
              d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C8.66873 3 5.76018 4.80989 4.20404 7.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <motion.path
              d="M3 3V4.27816C3 6.47004 3 7.56599 3.70725 8.16512C4.4145 8.76425 5.49553 8.58408 7.6576 8.22373L9 8"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={hookVariants}
              animate={controls}
              initial="normal"
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

Undo02Icon.displayName = 'Undo02Icon';

export { Undo02Icon };
