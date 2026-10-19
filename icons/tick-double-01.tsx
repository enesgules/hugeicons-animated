'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface TickDouble01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface TickDouble01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// rest-parity: split-source-path
// The back tick is split at its gap so each piece can be written in pen order.
const BACK_SHORT_PATH =
  'M3 13.3333C3 13.3333 4.5 14 6.5 17C6.5 17 6.78485 16.5192 7.32133 15.7526';
const BACK_LONG_PATH = 'M17 6C14.7085 7.14577 12.3119 9.55181 10.3879 11.8223';
const FRONT_PATH = 'M8 13.3333C8 13.3333 9.5 14 11.5 17C11.5 17 17 8.5 22 6';
const PEN_LIFT_PATH = 'M22 6L22.63 5.69';

const penLiftVariants: Variants = {
  normal: { pathLength: 0, opacity: 0, visibility: 'hidden' },
  animate: {
    pathLength: [0, 0, 1, 1],
    opacity: [0, 0, 0.72, 0],
    visibility: ['hidden', 'hidden', 'visible', 'hidden'],
    transition: {
      duration: 1.06,
      ease: ['linear', [0.23, 1, 0.32, 1], [0.23, 1, 0.32, 1]],
      times: [0, 0.8, 0.9, 1],
    },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0.08 } },
  animate: { visibility: 'visible', transition: { duration: 0 } },
};

// Both ticks are erased from their tails. The back tick is written in one
// sweep that jumps its gap, then the front tick is written like Tick: pen
// down, rest, sweep, and one landing.
const impactVariants: Variants = {
  normal: { transform: 'translateY(0px) rotate(0deg) scale(1)' },
  animate: {
    transform: [
      'translateY(0px) rotate(0deg) scale(1)',
      'translateY(0px) rotate(0deg) scale(1)',
      'translateY(-0.35px) rotate(0.8deg) scale(1.08)',
      'translateY(0px) rotate(0deg) scale(1)',
    ],
    transition: {
      duration: 1.06,
      ease: ['linear', [0.23, 1, 0.32, 1], [0.23, 1, 0.32, 1]],
      times: [0, 0.77, 0.88, 1],
    },
  },
};

const backShortVariants: Variants = {
  normal: { pathLength: 1, pathOffset: 0, visibility: 'visible' },
  animate: {
    pathLength: [1, 1, 0.12, 0, 0, 0.15, 1, 1],
    pathOffset: [0, 0, 0.88, 1, 0, 0, 0, 0],
    visibility: [
      'visible',
      'visible',
      'hidden',
      'hidden',
      'hidden',
      'hidden',
      'visible',
      'visible',
    ],
    transition: {
      duration: 1,
      ease: [
        'linear',
        [0.77, 0, 0.175, 1],
        'linear',
        'linear',
        'linear',
        [0.55, 0, 0.45, 1],
        'linear',
      ],
      times: [0, 0.05, 0.2, 0.23, 0.28, 0.31, 0.44, 1],
    },
  },
};

// The pen writes this piece from its lower end, against the source direction,
// so the visible part is kept at the end of the path.
const backLongVariants: Variants = {
  normal: { pathLength: 1, pathOffset: 0, visibility: 'visible' },
  animate: {
    pathLength: [1, 1, 0.12, 0, 0, 0.15, 1, 1],
    pathOffset: [0, 0, 0, 0, 1, 0.85, 0, 0],
    visibility: [
      'visible',
      'visible',
      'hidden',
      'hidden',
      'hidden',
      'hidden',
      'visible',
      'visible',
    ],
    transition: {
      duration: 1,
      ease: [
        'linear',
        [0.77, 0, 0.175, 1],
        'linear',
        'linear',
        'linear',
        [0.25, 0.1, 0.25, 1],
        'linear',
      ],
      times: [0, 0.05, 0.2, 0.23, 0.42, 0.44, 0.55, 1],
    },
  },
};

const frontVariants: Variants = {
  normal: { pathLength: 1, pathOffset: 0, visibility: 'visible' },
  animate: {
    pathLength: [1, 1, 0.12, 0, 0, 0.12, 0.25, 0.25, 1, 1],
    pathOffset: [0, 0, 0.88, 1, 0, 0, 0, 0, 0, 0],
    visibility: [
      'visible',
      'visible',
      'hidden',
      'hidden',
      'hidden',
      'hidden',
      'visible',
      'visible',
      'visible',
      'visible',
    ],
    transition: {
      duration: 1,
      ease: [
        'linear',
        [0.77, 0, 0.175, 1],
        'linear',
        'linear',
        'linear',
        [0.77, 0, 0.175, 1],
        'linear',
        [0.77, 0, 0.175, 1],
        'linear',
      ],
      times: [0, 0.05, 0.2, 0.23, 0.55, 0.58, 0.64, 0.68, 0.87, 1],
    },
  },
};

const TickDouble01Icon = forwardRef<TickDouble01IconHandle, TickDouble01IconProps>(
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
          variants={impactVariants}
          animate={controls}
          initial="normal"
          style={{ transformOrigin: '50% 50%' }}
        >
          <motion.path
            d={BACK_SHORT_PATH}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={backShortVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d={BACK_LONG_PATH}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={backLongVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d={FRONT_PATH}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={frontVariants}
            animate={controls}
            initial="normal"
          />
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            <motion.path
              d={PEN_LIFT_PATH}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={penLiftVariants}
              animate={controls}
              initial="normal"
            />
          </motion.g>
        </motion.svg>
      </div>
    );
  }
);

TickDouble01Icon.displayName = 'TickDouble01Icon';

export { TickDouble01Icon };
