'use client';

import type { Transition, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Redo02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Redo02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// a complete forward turn mirrors undo-02, as in redo; the hook tightens on
// the wind-up and opens again as the turn takes off
const REDO_TRANSITION: Transition = {
  duration: 0.82,
  ease: [0.77, 0, 0.175, 1],
  times: [0, 0.1, 0.68, 0.84, 1],
};

const turnVariants: Variants = {
  normal: { transform: 'rotate(0deg) scale(1)' },
  animate: {
    transform: [
      'rotate(0deg) scale(1)',
      'rotate(-16deg) scale(0.97)',
      'rotate(360deg) scale(1)',
      'rotate(352deg) scale(1.01)',
      'rotate(360deg) scale(1)',
    ],
    transition: REDO_TRANSITION,
    transitionEnd: { transform: 'rotate(0deg) scale(1)' },
  },
};

const hookVariants: Variants = {
  normal: { pathLength: 1 },
  animate: {
    pathLength: [1, 0.78, 1, 1, 1],
    transition: REDO_TRANSITION,
  },
};

const Redo02Icon = forwardRef<Redo02IconHandle, Redo02IconProps>(
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
              d="M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C15.3313 3 18.2398 4.80989 19.796 7.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <motion.path
              d="M20.9991 3V4.27816C20.9991 6.47004 20.9991 7.56599 20.2918 8.16512C19.5846 8.76425 18.5036 8.58408 16.3415 8.22373L14.9991 8"
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

Redo02Icon.displayName = 'Redo02Icon';

export { Redo02Icon };
