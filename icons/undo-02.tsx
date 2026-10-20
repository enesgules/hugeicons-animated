'use client';

import type { Transition, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Undo02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Undo02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const TURN_LAND = springEase(0.45, 0.35);
const UNDO_TRANSITION: Transition = {
  duration: 0.8,
  times: [0, 0.15, 0.55, 1],
  ease: ['easeOut', [0.4, 0, 0.2, 1], TURN_LAND],
};

// Turn: a complete backward turn reads as undo, as in undo. The arrow winds up
// against the turn as the hook tightens, whips one turn a little past rest,
// and lands with a spring.
const turnVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: {
    transform: ['rotate(0deg)', 'rotate(18deg)', 'rotate(-384deg)', 'rotate(-360deg)'],
    transition: UNDO_TRANSITION,
  },
};

const hookVariants: Variants = {
  normal: { pathLength: 1 },
  animate: {
    pathLength: [1, 0.78, 1, 1],
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
