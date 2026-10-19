'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Wifi01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Wifi01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// Searching for signal: the arcs retract into their midpoints from the
// outside in, then the source pulses and they redraw from the inside out. Each
// cycle starts and ends on the complete, untouched icon.
const WIFI_CYCLE = 1.6;

const arcVariants: Variants = {
  normal: {
    pathLength: 1,
    pathOffset: 0,
    visibility: 'visible',
    transition: { duration: 0.22, ease: 'easeOut' },
  },
  animate: (i: number) => {
    const collapse = 0.04 + (2 - i) * 0.07;
    const grow = 0.46 + i * 0.1;
    return {
      pathLength: [1, 1, 0, 0, 1, 1],
      pathOffset: [0, 0, 0.5, 0.5, 0, 0],
      visibility: ['visible', 'visible', 'hidden', 'hidden', 'visible', 'visible'],
      transition: {
        duration: WIFI_CYCLE,
        ease: ['linear', 'easeIn', 'linear', 'easeOut', 'linear'],
        times: [0, collapse, collapse + 0.16, grow, grow + 0.2, 1],
        repeat: Infinity,
      },
    };
  },
};

const sourceVariants: Variants = {
  normal: { scale: 1, transition: { duration: 0.2 } },
  animate: {
    scale: [1, 1, 0.7, 1.25, 1, 1],
    transition: {
      duration: WIFI_CYCLE,
      ease: ['linear', 'easeInOut', 'easeOut', 'easeInOut', 'linear'],
      times: [0, 0.3, 0.4, 0.5, 0.62, 1],
      repeat: Infinity,
    },
  },
};

const Wifi01Icon = forwardRef<Wifi01IconHandle, Wifi01IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const { handleMouseEnter, handleMouseLeave } = useIconAnimation({
      controls,
      loops: true,
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
            d="M8.25 14.5C10.25 12.5 13.75 12.5 15.75 14.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={arcVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M18.5 11.5C14.7324 8.16667 9.5 8.16667 5.5 11.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={arcVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M2 8.5C8.31579 3.16669 15.6842 3.16668 22 8.49989"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={arcVariants}
            custom={2}
            animate={controls}
            initial="normal"
          />
          <motion.circle
            cx="12"
            cy="18"
            r="1.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={sourceVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 12 / 24, originY: 18 / 24 }}
          />
        </svg>
      </div>
    );
  },
);

Wifi01Icon.displayName = 'Wifi01Icon';

export { Wifi01Icon };
