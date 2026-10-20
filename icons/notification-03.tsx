'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Notification03IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Notification03IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const SWING = springEase(0.8, 0.45);
const SWING_DURATION = 1.3;
const SWING_TIMES = [0, 0.16, 1];
const LAG = 0.06;

// Pendulum: a kick to one side, then a high-bounce spring swings the bell back
// through rest and decays about its hanging point; the clapper lags the bell.
const svgVariants: Variants = {
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

const Notification03Icon = forwardRef<Notification03IconHandle, Notification03IconProps>(
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
          variants={svgVariants}
          animate={controls}
          initial="normal"
          style={{ transformOrigin: 'top center' }}
        >
          <path
            d="M20 18.5011L18.349 7.93407C17.8603 4.80601 15.166 2.5 12 2.5C8.83398 2.5 6.13971 4.80601 5.65098 7.93407L4 18.5011"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M20 18.5C20 16.8431 16.4183 15.5 12 15.5C7.58172 15.5 4 16.8431 4 18.5C4 20.1569 7.58172 21.5 12 21.5C16.4183 21.5 20 20.1569 20 18.5Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M13 18.5H11"
            stroke="currentColor"
            strokeLinecap="round"
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

Notification03Icon.displayName = 'Notification03Icon';

export { Notification03Icon };
