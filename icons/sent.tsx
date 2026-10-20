'use client';

import type { Easing, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
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

// Launch, shared by planes and rockets: the craft winds back, accelerates out
// of the frame, and a replacement glides in along the same route, runs a
// touch past its spot, and lands on a spring.
const LAUNCH_DURATION = 1.2;
const DEPART_TIMES = [0, 0.16, 0.42, 1];
const DEPART_EASE: Easing[] = ['easeOut', [0.5, 0, 0.9, 0.4], 'linear'];
const ARRIVE_TIMES = [0, 0.42, 0.66, 1];
const LAUNCH_LAND = springEase(0.45, 0.35);
const ARRIVE_EASE: Easing[] = ['linear', [0.2, 0.6, 0.35, 1], LAUNCH_LAND];

const departingPlaneVariants: Variants = {
  normal: { transform: 'translate(0%, 0%) rotate(0deg)' },
  animate: {
    transform: [
      'translate(0%, 0%) rotate(0deg)',
      'translate(-3%, 3%) rotate(2.2deg)',
      'translate(145%, -125%) rotate(-4deg)',
      'translate(145%, -125%) rotate(-4deg)',
    ],
    transition: { duration: LAUNCH_DURATION, times: DEPART_TIMES, ease: DEPART_EASE },
  },
};

const arrivingPlaneVariants: Variants = {
  normal: { transform: 'translate(-145%, 125%) rotate(-6deg)' },
  animate: {
    transform: [
      'translate(-145%, 125%) rotate(-6deg)',
      'translate(-145%, 125%) rotate(-6deg)',
      'translate(4%, -3.5%) rotate(1deg)',
      'translate(0%, 0%) rotate(0deg)',
    ],
    transition: { duration: LAUNCH_DURATION, times: ARRIVE_TIMES, ease: ARRIVE_EASE },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: { visibility: 'visible', transition: { duration: 0 } },
};

// Temporary launch trails grow behind the plane as it accelerates, move back
// toward the bottom left, and clear before the replacement arrives.
const trailVariants: Variants = {
  normal: { pathLength: 0, pathOffset: 0, visibility: 'hidden' },
  animate: (i: number) => ({
    pathLength: [0, 0.25, 1, 0.34, 0, 0],
    pathOffset: [0, 0, 0, 0.66, 1, 1],
    visibility: ['hidden', 'visible', 'visible', 'visible', 'hidden', 'hidden'],
    transition: {
      duration: 0.4,
      delay: 0.2 + i * 0.03,
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
            style={{ transformBox: 'view-box', originX: 0.5, originY: 0.5 }}
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
              style={{ transformBox: 'view-box', originX: 0.5, originY: 0.5 }}
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
