'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Notification02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Notification02IconProps extends HTMLAttributes<HTMLDivElement> {
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

const Notification02Icon = forwardRef<Notification02IconHandle, Notification02IconProps>(
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
          <path
            d="M19 18V9.5C19 5.63401 15.866 2.5 12 2.5C8.13401 2.5 5 5.63401 5 9.5V18"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M20.5 18H3.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M13.5 20C13.5 20.8284 12.8284 21.5 12 21.5M10.5 20C10.5 20.8284 11.1716 21.5 12 21.5M12 21.5V20"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={clapperVariants}
            animate={controls}
            initial="normal"
          />
        </motion.svg>
      </div>
    );
  }
);

Notification02Icon.displayName = 'Notification02Icon';

export { Notification02Icon };
