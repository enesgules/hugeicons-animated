'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ViewIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ViewIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const VIEW_DURATION = 0.88;
const VIEW_TIMES = [0, 0.18, 0.38, 0.58, 0.68, 0.74, 0.78, 0.88, 1];
const TOP_EYELID_OPEN =
  'M2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045C21.848 11.4713 22 11.6845 22 12';
const TOP_EYELID_HALF =
  'M2 12C2 11.85 2.15201 11.7 2.45604 11.55C5.2 9.2 8.5 8 12 8C15.5 8 18.8 9.2 21.544 11.55C21.848 11.7 22 11.85 22 12';
const EYELID_CLOSED =
  'M2 12C2 12 2.15201 12 2.45604 12C3.8221 12 7.31078 12 12 12C16.6892 12 20.1779 12 21.544 12C21.848 12 22 12 22 12';
const BOTTOM_EYELID_OPEN =
  'M2 12C2 12.3155 2.15201 12.5287 2.45604 12.955C3.8221 14.8706 7.31078 19 12 19C16.6892 19 20.1779 14.8706 21.544 12.955C21.848 12.5287 22 12.3155 22 12';
const BOTTOM_EYELID_HALF =
  'M2 12C2 12.15 2.15201 12.3 2.45604 12.45C5.2 14.8 8.5 16 12 16C15.5 16 18.8 14.8 21.544 12.45C21.848 12.3 22 12.15 22 12';

// Glance and blink, as in the eye icon: the pupil darts left and right, then
// the lids meet over it and the eye opens a touch wide before it settles.
const pupilVariants: Variants = {
  normal: { translateX: 0, scaleX: 1, scaleY: 1 },
  animate: {
    translateX: [0, -1.6, 1.5, 0, 0, 0, 0, 0, 0],
    scaleX: [1, 1, 1, 1, 1.04, 1.08, 1.06, 0.98, 1],
    scaleY: [1, 1, 1, 1, 0.92, 0.85, 0.88, 1.03, 1],
    transition: { duration: VIEW_DURATION, ease: 'easeInOut', times: VIEW_TIMES },
  },
};

const eyeOutlineVariants: Variants = {
  normal: { scaleX: 1, scaleY: 1 },
  animate: {
    scaleX: [1, 1, 1, 1, 1.015, 1.03, 1.025, 0.99, 1],
    scaleY: [1, 1, 1, 1, 0.91, 0.78, 0.83, 1.025, 1],
    transition: { duration: VIEW_DURATION, ease: 'easeInOut', times: VIEW_TIMES },
  },
};

const topEyelidVariants: Variants = {
  normal: { d: TOP_EYELID_OPEN, pathLength: 1 },
  animate: {
    d: [
      TOP_EYELID_OPEN,
      TOP_EYELID_OPEN,
      TOP_EYELID_OPEN,
      TOP_EYELID_OPEN,
      TOP_EYELID_HALF,
      EYELID_CLOSED,
      EYELID_CLOSED,
      TOP_EYELID_HALF,
      TOP_EYELID_OPEN,
    ],
    transition: { duration: VIEW_DURATION, ease: 'easeInOut', times: VIEW_TIMES },
  },
};

const bottomEyelidVariants: Variants = {
  normal: { d: BOTTOM_EYELID_OPEN, pathLength: 1 },
  animate: {
    d: [
      BOTTOM_EYELID_OPEN,
      BOTTOM_EYELID_OPEN,
      BOTTOM_EYELID_OPEN,
      BOTTOM_EYELID_OPEN,
      BOTTOM_EYELID_HALF,
      EYELID_CLOSED,
      EYELID_CLOSED,
      BOTTOM_EYELID_HALF,
      BOTTOM_EYELID_OPEN,
    ],
    transition: { duration: VIEW_DURATION, ease: 'easeInOut', times: VIEW_TIMES },
  },
};

const pupilClipVariants: Variants = {
  normal: { height: 14, y: 5 },
  animate: {
    height: [14, 14, 14, 14, 8, 0, 0, 8, 14],
    y: [5, 5, 5, 5, 8, 12, 12, 8, 5],
    transition: { duration: VIEW_DURATION, ease: 'easeInOut', times: VIEW_TIMES },
  },
};

const generatedGeometryVariants: Variants = {
  normal: {
    visibility: 'hidden',
    transform: 'scaleX(1) scaleY(1)',
    transition: { duration: 0 },
  },
  animate: {
    visibility: [
      'hidden',
      'hidden',
      'hidden',
      'visible',
      'visible',
      'visible',
      'visible',
      'visible',
      'hidden',
    ],
    transform: [
      'scaleX(1) scaleY(1)',
      'scaleX(1) scaleY(1)',
      'scaleX(1) scaleY(1)',
      'scaleX(1) scaleY(1)',
      'scaleX(1.012) scaleY(0.93)',
      'scaleX(1.025) scaleY(0.84)',
      'scaleX(1.02) scaleY(0.88)',
      'scaleX(0.995) scaleY(1.02)',
      'scaleX(1) scaleY(1)',
    ],
    transition: { duration: VIEW_DURATION, ease: 'easeInOut', times: VIEW_TIMES },
  },
};

const EYE_CENTER = { transformBox: 'view-box', originX: 0.5, originY: 0.5 } as const;

const ViewIcon = forwardRef<ViewIconHandle, ViewIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const pupilClipId = useId();
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
          <defs>
            <clipPath id={pupilClipId} clipPathUnits="userSpaceOnUse">
              <motion.rect
                x="0"
                width="24"
                fill="currentColor"
                variants={pupilClipVariants}
                animate={controls}
                initial="normal"
              />
            </clipPath>
          </defs>
          <motion.path
            d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={eyeOutlineVariants}
            animate={controls}
            initial="normal"
            style={EYE_CENTER}
          />
          <motion.path
            d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={pupilVariants}
            animate={controls}
            initial="normal"
            clipPath={`url(#${pupilClipId})`}
            style={EYE_CENTER}
          />
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
            style={EYE_CENTER}
          >
            <motion.path
              d={TOP_EYELID_OPEN}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={topEyelidVariants}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d={BOTTOM_EYELID_OPEN}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={bottomEyelidVariants}
              animate={controls}
              initial="normal"
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

ViewIcon.displayName = 'ViewIcon';

export { ViewIcon };
