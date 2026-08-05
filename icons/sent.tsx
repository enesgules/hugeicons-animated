'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface SentIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SentIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const SENT_PLANE =
  'M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z';

const SENT_DURATION = 0.92;
const SENT_TIMES = [
  0, 0.07, 0.14, 0.22, 0.32, 0.43, 0.5, 0.54, 0.62, 0.71, 0.8, 0.88,
  0.95, 1,
];

// The first plane pulls back, banks, and accelerates beyond the top-right
// edge. A second full plane follows the same route from the bottom left.
const departingPlaneVariants: Variants = {
  normal: {
    transform: 'translate(0%, 0%) rotate(0deg)',
    transition: { duration: 0.16, ease: [0.23, 1, 0.32, 1] },
  },
  animate: {
    transform: [
      'translate(0%, 0%) rotate(0deg)',
      'translate(-3%, 3%) rotate(2.2deg)',
      'translate(-1%, 1.5%) rotate(1.2deg)',
      'translate(7%, -5%) rotate(-1deg)',
      'translate(22%, -16%) rotate(-3.2deg)',
      'translate(48%, -38%) rotate(-5.5deg)',
      'translate(82%, -68%) rotate(-5deg)',
      'translate(118%, -100%) rotate(-3.5deg)',
      'translate(145%, -125%) rotate(-2deg)',
      'translate(145%, -125%) rotate(-2deg)',
      'translate(145%, -125%) rotate(-2deg)',
      'translate(145%, -125%) rotate(-2deg)',
      'translate(145%, -125%) rotate(-2deg)',
      'translate(145%, -125%) rotate(-2deg)',
    ],
    transition: {
      duration: SENT_DURATION,
      ease: 'linear',
      times: SENT_TIMES,
    },
  },
};

const arrivingPlaneVariants: Variants = {
  normal: {
    transform: 'translate(-145%, 125%) rotate(-6deg)',
    transition: { duration: 0.16, ease: [0.23, 1, 0.32, 1] },
  },
  animate: {
    transform: [
      'translate(-145%, 125%) rotate(-6deg)',
      'translate(-145%, 125%) rotate(-6deg)',
      'translate(-145%, 125%) rotate(-6deg)',
      'translate(-145%, 125%) rotate(-6deg)',
      'translate(-145%, 125%) rotate(-6deg)',
      'translate(-145%, 125%) rotate(-6deg)',
      'translate(-145%, 125%) rotate(-6deg)',
      'translate(-118%, 102%) rotate(-6deg)',
      'translate(-82%, 70%) rotate(-5deg)',
      'translate(-50%, 41%) rotate(-4deg)',
      'translate(-24%, 19%) rotate(-2.5deg)',
      'translate(-7%, 4%) rotate(-0.8deg)',
      'translate(-1%, 1%) rotate(0.8deg)',
      'translate(0%, 0%) rotate(0deg)',
    ],
    transition: {
      duration: SENT_DURATION,
      ease: 'linear',
      times: SENT_TIMES,
    },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: { visibility: 'visible', transition: { duration: 0 } },
};

// Temporary launch trails grow behind the plane, move back toward the bottom
// left, and clear before the replacement arrives.
const trailVariants: Variants = {
  normal: { pathLength: 0, pathOffset: 0, visibility: 'hidden' },
  animate: (i: number) => ({
    pathLength: [0, 0.25, 1, 0.34, 0, 0],
    pathOffset: [0, 0, 0, 0.66, 1, 1],
    visibility: ['hidden', 'visible', 'visible', 'visible', 'hidden', 'hidden'],
    transition: {
      duration: 0.38,
      delay: 0.06 + i * 0.028,
      ease: 'linear',
      times: [0, 0.14, 0.34, 0.58, 0.8, 1],
    },
  }),
};

function PlaneGeometry() {
  return (
    <>
      <path d={SENT_PLANE} stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M11.4999 12.5L14.9999 9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </>
  );
}

const SentIcon = forwardRef<SentIconHandle, SentIconProps>(
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
          overflow="hidden"
        >
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            <motion.path
              d="M7.2 14.8L2.2 19.8"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={trailVariants}
              custom={0}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d="M10.2 17.6L6.6 21.2"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={trailVariants}
              custom={1}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d="M5.2 12.6L2 15.8"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={trailVariants}
              custom={2}
              animate={controls}
              initial="normal"
            />
          </motion.g>
          <motion.g
            variants={departingPlaneVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 12px' }}
          >
            <PlaneGeometry />
          </motion.g>
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            <motion.g
              variants={arrivingPlaneVariants}
              animate={controls}
              initial="normal"
              style={{ transformOrigin: '12px 12px' }}
            >
              <PlaneGeometry />
            </motion.g>
          </motion.g>
        </svg>
      </div>
    );
  }
);

SentIcon.displayName = 'SentIcon';

export { SentIcon };
