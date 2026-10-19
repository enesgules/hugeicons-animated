'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface DatabaseIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface DatabaseIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// Each layer's record track runs parallel to its record mark: the lower half
// of an ellipse (rx 8, ry 3) lifted 3.5 above that layer's platter edge.
const TRACK_START = 11;
const TRACK_END = 18.2;
const trackDrop = (x: number) => 3 * Math.sqrt(1 - ((x - 12) / 8) ** 2);
const READ_HEADS = ['M11 11.476H11.01', 'M11 18.476H11.01'];
const RECORD_FRAGMENTS = [
  ['M11.1 11.481A8 3 0 0 0 12.5 11.494', 'M14.6 11.337A8 3 0 0 0 16.2 11.053'],
  ['M11.1 18.481A8 3 0 0 0 12.5 18.494', 'M14.6 18.337A8 3 0 0 0 16.2 18.053'],
];

const SCAN_START = 0.04;
const LAYER_STAGGER = 0.4;
const HEAD_TRAVEL = 0.5;
const HEAD_STEPS = 8;
const DATABASE_DURATION = 1.4;
// Fraction of the head travel at which each fragment starts and finishes
// writing, so its growing tip trails the head by a clear gap.
const FRAGMENT_WRITE = [
  [0.292, 0.486],
  [0.778, 1],
];

const headSteps = Array.from({ length: HEAD_STEPS + 1 }, (_, step) => step / HEAD_STEPS);
const headX = headSteps.map((step) => step * (TRACK_END - TRACK_START));
const headY = headX.map((x) => trackDrop(TRACK_START + x) - trackDrop(TRACK_START));

// The stack stays fixed. A short read head runs at constant speed along each
// layer's record track, top layer first, and record fragments write in behind
// it. After a hold the fragments wipe away and the icon returns to rest.
const readHeadVariants: Variants = {
  normal: { x: 0, y: 0, visibility: 'hidden' },
  animate: (layer: number) => {
    const start = SCAN_START + layer * LAYER_STAGGER;
    const lastX = headX[HEAD_STEPS];
    const lastY = headY[HEAD_STEPS];
    return {
      x: [0, ...headX, lastX],
      y: [0, ...headY, lastY],
      visibility: [
        'hidden',
        'hidden',
        ...headSteps.slice(2).map(() => 'visible'),
        'hidden',
        'hidden',
      ],
      transition: {
        duration: DATABASE_DURATION,
        ease: 'linear',
        times: [0, ...headSteps.map((step) => (start + step * HEAD_TRAVEL) / DATABASE_DURATION), 1],
      },
    };
  },
};

const recordFragmentVariants: Variants = {
  normal: { pathLength: 0, pathOffset: 0, visibility: 'hidden' },
  animate: ({ layer, fragment }: { layer: number; fragment: number }) => {
    const start = SCAN_START + layer * LAYER_STAGGER;
    const [from, to] = FRAGMENT_WRITE[fragment];
    const wipe = 1.06 + layer * 0.08 + fragment * 0.04;
    return {
      pathLength: [0, 0, 1, 1, 0],
      pathOffset: [0, 0, 0, 0, 1],
      visibility: ['hidden', 'hidden', 'visible', 'visible', 'hidden'],
      transition: {
        duration: DATABASE_DURATION,
        ease: 'linear',
        times: [
          0,
          (start + from * HEAD_TRAVEL) / DATABASE_DURATION,
          (start + to * HEAD_TRAVEL) / DATABASE_DURATION,
          wipe / DATABASE_DURATION,
          (wipe + 0.16) / DATABASE_DURATION,
        ],
      },
    };
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: {
    visibility: ['visible', 'visible', 'hidden'],
    transition: { duration: DATABASE_DURATION, times: [0, 0.99, 1] },
  },
};

const DatabaseIcon = forwardRef<DatabaseIconHandle, DatabaseIconProps>(
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
          <ellipse cx="12" cy="5" rx="8" ry="3" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M7 10.842C7.60158 11.0229 8.27434 11.1718 9 11.282"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
          <path
            d="M20 12C20 13.6569 16.4183 15 12 15C7.58172 15 4 13.6569 4 12"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M7 17.842C7.60158 18.0229 8.27434 18.1718 9 18.282"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
          <path
            d="M20 5V19C20 20.6569 16.4183 22 12 22C7.58172 22 4 20.6569 4 19V5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <motion.g variants={generatedGeometryVariants} animate={controls} initial="normal">
            {READ_HEADS.map((d, layer) => (
              <motion.path
                key={d}
                d={d}
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
                variants={readHeadVariants}
                custom={layer}
                animate={controls}
                initial="normal"
              />
            ))}
            {RECORD_FRAGMENTS.map((fragments, layer) =>
              fragments.map((d, fragment) => (
                <motion.path
                  key={d}
                  d={d}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  variants={recordFragmentVariants}
                  custom={{ layer, fragment }}
                  animate={controls}
                  initial="normal"
                />
              )),
            )}
          </motion.g>
        </svg>
      </div>
    );
  },
);

DatabaseIcon.displayName = 'DatabaseIcon';

export { DatabaseIcon };
