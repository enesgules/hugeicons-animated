'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Notification01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Notification01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const SWING = springEase(0.8, 0.45);
const SWING_DURATION = 1.3;
const SWING_TIMES = [0, 0.16, 1];
const LAG = 0.06;

// Pendulum: a kick to one side, then a high-bounce spring swings the bell back
// through rest and decays about its hanging point; the clapper lags the bell.
const bellVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, -18, 0],
    transition: { duration: SWING_DURATION, times: SWING_TIMES, ease: ['easeOut', SWING] },
  },
};

const clapperVariants: Variants = {
  normal: { x: 0 },
  animate: {
    x: [0, -1.6, 0],
    transition: {
      duration: SWING_DURATION,
      delay: LAG,
      times: SWING_TIMES,
      ease: ['easeOut', SWING],
    },
  },
};

const Notification01Icon = forwardRef<Notification01IconHandle, Notification01IconProps>(
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
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          overflow="visible"
          variants={bellVariants}
          animate={controls}
          initial="normal"
          style={{ transformOrigin: '50% 10.4167%' }}
        >
          <motion.path
            d="M15.5 18C15.5 19.933 13.933 21.5 12 21.5C10.067 21.5 8.5 19.933 8.5 18"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={clapperVariants}
            animate={controls}
            initial="normal"
          />
          <path
            d="M19.2311 18H4.76887C3.79195 18 3 17.208 3 16.2311C3 15.762 3.18636 15.3121 3.51809 14.9803L4.12132 14.3771C4.68393 13.8145 5 13.0514 5 12.2558V9.5C5 5.63401 8.13401 2.5 12 2.5C15.866 2.5 19 5.634 19 9.5V12.2558C19 13.0514 19.3161 13.8145 19.8787 14.3771L20.4819 14.9803C20.8136 15.3121 21 15.762 21 16.2311C21 17.208 20.208 18 19.2311 18Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </motion.svg>
      </div>
    );
  }
);

Notification01Icon.displayName = 'Notification01Icon';

export { Notification01Icon };
