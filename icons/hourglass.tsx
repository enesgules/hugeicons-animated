'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface HourglassIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface HourglassIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// Time running: the top sand surface sinks into a deepening funnel and drains
// through the neck as a falling stream while a mound builds in the bottom bulb.
// Then the glass winds up and turns over with a small overshoot. The full
// bottom mound turned over is exactly the full top surface, so every cycle
// continues without a jump.
const SAND_CYCLE = 2.6;
const SAND_TIMES = [0, 0.06, 0.12, 0.4, 0.6, 0.66, 0.7, 0.76, 0.9, 0.96, 1];

const TOP_FULL = 'M17.2 4.6Q12 7 6.8 4.6';
const TOP_HALF = 'M15.7 8Q12 10.2 8.3 8';
const TOP_LOW = 'M12.8 10.4Q12 11 11.2 10.4';
const TOP_EMPTY = 'M12.1 11.2Q12 11.3 11.9 11.2';
const BOTTOM_EMPTY = 'M11 20.2Q12 20 13 20.2';
const BOTTOM_HALF = 'M8.2 20Q12 18.2 15.8 20';
const BOTTOM_FULL = 'M6.8 19.4Q12 17 17.2 19.4';
const STREAM_START = 'M12 12.8L12 12.8';
const STREAM_LONG = 'M12 12.8L12 19.6';
const STREAM_SHORT = 'M12 12.8L12 17.8';
const STREAM_END = 'M12 17.6L12 17.6';

const SAND_LOOP = {
  duration: SAND_CYCLE,
  ease: 'easeInOut',
  times: SAND_TIMES,
  repeat: Infinity,
} as const;

const flipVariants: Variants = {
  normal: { transform: 'rotate(0deg)', transition: { duration: 0.25 } },
  animate: {
    transform: [
      ...Array(7).fill('rotate(0deg)'),
      'rotate(-10deg)',
      'rotate(188deg)',
      'rotate(178.5deg)',
      'rotate(180deg)',
    ],
    transition: SAND_LOOP,
  },
};

const topSandVariants: Variants = {
  normal: { d: TOP_FULL },
  animate: {
    d: [TOP_FULL, TOP_FULL, TOP_FULL, TOP_HALF, TOP_LOW, ...Array(6).fill(TOP_EMPTY)],
    visibility: [...Array(5).fill('visible'), ...Array(6).fill('hidden')],
    transition: SAND_LOOP,
  },
};

const bottomSandVariants: Variants = {
  normal: { d: BOTTOM_EMPTY, visibility: 'hidden' },
  animate: {
    d: [BOTTOM_EMPTY, BOTTOM_EMPTY, BOTTOM_EMPTY, BOTTOM_HALF, ...Array(7).fill(BOTTOM_FULL)],
    visibility: ['hidden', 'hidden', ...Array(9).fill('visible')],
    transition: SAND_LOOP,
  },
};

const streamVariants: Variants = {
  normal: { d: STREAM_START, visibility: 'hidden' },
  animate: {
    d: [STREAM_START, STREAM_START, STREAM_LONG, STREAM_LONG, STREAM_SHORT, STREAM_SHORT, ...Array(5).fill(STREAM_END)],
    visibility: ['hidden', ...Array(5).fill('visible'), ...Array(5).fill('hidden')],
    transition: SAND_LOOP,
  },
};

// The sand grows out of the neck once at the start instead of popping in.
const sandInVariants: Variants = {
  normal: { scale: 0 },
  animate: { scale: 1, transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] } },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: { visibility: 'visible', transition: { duration: 0 } },
};

const HourglassIcon = forwardRef<HourglassIconHandle, HourglassIconProps>(
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
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          overflow="visible"
          variants={flipVariants}
          animate={controls}
          initial="normal"
          style={{ transformOrigin: '50% 50%' }}
        >
          <path
            d="M4 3H20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M5.5 3V5.03039C5.5 6.27227 6.07682 7.4437 7.06116 8.20089L12 12L16.9388 8.20089C17.9232 7.44371 18.5 6.27227 18.5 5.03039V3"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M5.5 21V18.9696C5.5 17.7277 6.07682 16.5563 7.06116 15.7991L12 12L16.9388 15.7991C17.9232 16.5563 18.5 17.7277 18.5 18.9696V21"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M4 21H20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            <motion.g
              variants={sandInVariants}
              animate={controls}
              initial="normal"
              style={{ transformBox: 'view-box' }}
            >
              <motion.path
                d={TOP_FULL}
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
                variants={topSandVariants}
                animate={controls}
                initial="normal"
              />
              <motion.path
                d={STREAM_START}
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
                variants={streamVariants}
                animate={controls}
                initial="normal"
              />
              <motion.path
                d={BOTTOM_EMPTY}
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
                variants={bottomSandVariants}
                animate={controls}
                initial="normal"
              />
            </motion.g>
          </motion.g>
        </motion.svg>
      </div>
    );
  }
);

HourglassIcon.displayName = 'HourglassIcon';

export { HourglassIcon };
