'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation, waveTrain } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Wifi01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Wifi01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// Signal radiates from the source as a train of waves: each arc rises out of
// the dot, travels out through the rest arcs at an even pace, and fades. The
// dot pulses once for each wave while hovered.
const WAVE_CYCLE = 1.6;
const WAVES = [
  'M11 17.5C11 16.8333 12.7676 16.8333 13 17.5',
  'M8.25 14.5C10.25 12.5 13.75 12.5 15.75 14.5',
  'M5.5 11.5C9.5 8.16667 14.7324 8.16667 18.5 11.5',
  'M2 8.5C8.31579 3.16669 15.6842 3.16668 22 8.49989',
  'M-1.5 5.5C7.1316 -1.8333 16.636 -1.8333 25.5 5.4998',
];

const arcVariants: Variants = {
  normal: (i: number) => ({
    d: WAVES[i],
    opacity: 1,
    transition: { duration: 0.25, ease: 'easeOut' },
  }),
  animate: (i: number) => waveTrain(WAVES, i, WAVE_CYCLE),
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0.25 } },
  animate: { visibility: 'visible' },
};

const sourceVariants: Variants = {
  normal: { transform: 'scale(1)', transition: { duration: 0.2 } },
  animate: {
    transform: ['scale(1)', 'scale(0.8)', 'scale(1.1)', 'scale(1)'],
    transition: {
      duration: WAVE_CYCLE / 4,
      ease: 'easeInOut',
      times: [0, 0.3, 0.65, 1],
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
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            <motion.path
              d={WAVES[0]}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={arcVariants}
              custom={0}
              animate={controls}
              initial="normal"
            />
          </motion.g>
        </svg>
      </div>
    );
  },
);

Wifi01Icon.displayName = 'Wifi01Icon';

export { Wifi01Icon };
