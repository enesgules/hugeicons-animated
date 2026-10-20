'use client';

import type { Transition, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Redo02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Redo02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const TURN_LAND = springEase(0.45, 0.35);
const REDO_TRANSITION: Transition = {
  duration: 0.8,
  times: [0, 0.15, 0.55, 1],
  ease: ['easeOut', [0.4, 0, 0.2, 1], TURN_LAND],
};

// Turn: a complete forward turn reads as redo, as in redo. The arrow winds up
// against the turn as the hook tightens, whips one turn a little past rest,
// and lands with a spring.
const turnVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: {
    transform: ['rotate(0deg)', 'rotate(-18deg)', 'rotate(384deg)', 'rotate(360deg)'],
    transition: REDO_TRANSITION,
  },
};

const hookVariants: Variants = {
  normal: { pathLength: 1 },
  animate: {
    pathLength: [1, 0.78, 1, 1],
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
