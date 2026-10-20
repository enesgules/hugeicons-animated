'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { pathAt, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Wifi01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Wifi01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// Signal leaves the source: each arc travels outward along its own curve and
// fades, the dot pulses, and the same arc rises again out of the dot, travels
// back out, and settles on its rest arc with a small overshoot. The inner arc
// leads. Arcs change shape, not scale, so the stroke keeps its width.
const WAVES = [
  'M11 17.5C11 16.8333 12.7676 16.8333 13 17.5',
  'M8.25 14.5C10.25 12.5 13.75 12.5 15.75 14.5',
  'M5.5 11.5C9.5 8.16667 14.7324 8.16667 18.5 11.5',
  'M2 8.5C8.31579 3.16669 15.6842 3.16668 22 8.49989',
  'M-1.5 5.5C7.1316 -1.8333 16.636 -1.8333 25.5 5.4998',
];

const arcVariants: Variants = {
  normal: (rest: number) => ({ d: WAVES[rest], opacity: 1 }),
  animate: (rest: number) => ({
    d: [rest, rest + 0.6, 0.25, rest + 0.08, rest].map((t) => pathAt(WAVES, t)),
    opacity: [1, 0, 0, 1, 1],
    transition: {
      duration: 1,
      delay: (rest - 1) * 0.08,
      times: [0, 0.28, 0.29, 0.76, 1],
      ease: ['easeIn', 'linear', [0.23, 1, 0.32, 1], 'easeInOut'],
    },
  }),
};

const sourceVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(1)', 'scale(0.8)', 'scale(1.12)', 'scale(1)'],
    transition: {
      duration: 1,
      times: [0, 0.12, 0.28, 0.42, 1],
      ease: ['linear', 'easeOut', [0.23, 1, 0.32, 1], 'easeInOut'],
    },
  },
};

const Wifi01Icon = forwardRef<Wifi01IconHandle, Wifi01IconProps>(
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
            d="M8.25 14.5C10.25 12.5 13.75 12.5 15.75 14.5"
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
            d={WAVES[2]}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={arcVariants}
            custom={2}
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
            custom={3}
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
