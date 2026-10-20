'use client';

import type { Easing, Variants } from 'motion/react';
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
// The pen lifts along the end tangent of each long arm.
const BACK_LIFT_PATH = 'M17 6L17.62 5.69';
const FRONT_LIFT_PATH = 'M22 6L22.62 5.69';

// The front tick is written a beat after the back tick.
const FRONT_DELAY = 0.08;
const STROKE_EASE: Easing = [0.77, 0, 0.175, 1];

const penLiftVariants: Variants = {
  normal: { pathLength: 0, opacity: 0, visibility: 'hidden' },
  animate: (delay: number) => ({
    pathLength: [0, 0, 1, 1],
    opacity: [0, 0, 0.72, 0],
    visibility: ['hidden', 'hidden', 'visible', 'hidden'],
    transition: {
      duration: 0.9,
      delay,
      ease: [
        'linear',
        [0.23, 1, 0.32, 1],
        [0.23, 1, 0.32, 1],
      ],
      times: [0, 0.765, 0.89, 1],
    },
  }),
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0.08 } },
  animate: { visibility: 'visible', transition: { duration: 0 } },
};

// The completed strokes compress once as the front tick lands, then release
// without a trailing bounce.
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
      duration: 0.82,
      delay: FRONT_DELAY,
      ease: ['linear', [0.23, 1, 0.32, 1], [0.23, 1, 0.32, 1]],
      times: [0, 0.78, 0.9, 1],
    },
  },
};

// Check, as in Tick 02: each tick is erased from its tail, written again with
// a rest at the corner, and the pen lifts off the end of the long arm. The
// offset resets while the path is hidden, so no cap or jump shows.
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
      duration: 0.82,
      delay: FRONT_DELAY,
      ease: [
        'linear',
        STROKE_EASE,
        'linear',
        'linear',
        'linear',
        STROKE_EASE,
        'linear',
        STROKE_EASE,
        'linear',
      ],
      times: [0, 0.06, 0.25, 0.28, 0.35, 0.39, 0.5, 0.57, 0.84, 1],
    },
  },
};

// The back tick is the front tick shifted left, written with the same
// keyframes as one stroke that jumps the gap. Its short piece holds the first
// 0.323 of that stroke and its long piece the last 0.433. The keyframes are cut
// where the eraser and the pen cross the gap, and each cut ease is the matching
// part of the stroke ease, so the motion is the same as one stroke.
const backShortVariants: Variants = {
  normal: { pathLength: 1, pathOffset: 0, visibility: 'visible' },
  animate: {
    pathLength: [1, 1, 0, 0.372, 0.774, 0.774, 1, 1],
    pathOffset: [0, 0, 1, 0, 0, 0, 0, 0],
    visibility: ['visible', 'visible', 'hidden', 'hidden', 'visible', 'visible', 'visible', 'visible'],
    transition: {
      duration: 0.82,
      ease: [
        'linear',
        [0.701, 0, 0.892, 0.459],
        'linear',
        STROKE_EASE,
        'linear',
        [0.474, 0, 0.786, 0.383],
        'linear',
      ],
      times: [0, 0.06, 0.146, 0.39, 0.5, 0.57, 0.655, 1],
    },
  },
};

// The pen writes this piece from its lower end, against the source direction,
// so the visible part is kept at the end of the path.
const backLongVariants: Variants = {
  normal: { pathLength: 1, pathOffset: 0, visibility: 'visible' },
  animate: {
    pathLength: [1, 1, 0.277, 0, 1, 1],
    pathOffset: [0, 0, 0, 1, 0, 0],
    visibility: ['visible', 'visible', 'hidden', 'hidden', 'visible', 'visible'],
    transition: {
      duration: 0.82,
      ease: ['linear', [0.11, 0.544, 0.319, 1], 'linear', [0.109, 0.473, 0.151, 1], 'linear'],
      times: [0, 0.157, 0.25, 0.695, 0.84, 1],
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
              d={BACK_LIFT_PATH}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              custom={0}
              variants={penLiftVariants}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d={FRONT_LIFT_PATH}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              custom={FRONT_DELAY}
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
