'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface EyeIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface EyeIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const EYE_DURATION = 0.88;
const EYE_TIMES = [0, 0.18, 0.38, 0.58, 0.68, 0.74, 0.78, 0.88, 1];
const TOP_EYELID_OPEN =
  'M2 14C2 13.6845 2.15201 13.4713 2.45604 13.045C3.8221 11.1294 7.31078 7 12 7C16.6892 7 20.1779 11.1294 21.544 13.045C21.848 13.4713 22 13.6845 22 14';
const TOP_EYELID_HALF =
  'M2 14C2 13.85 2.15201 13.7 2.45604 13.55C5.2 11.2 8.5 10 12 10C15.5 10 18.8 11.2 21.544 13.55C21.848 13.7 22 13.85 22 14';
const EYELID_CLOSED =
  'M2 14C2 14 2.15201 14 2.45604 14C3.8221 14 7.31078 14 12 14C16.6892 14 20.1779 14 21.544 14C21.848 14 22 14 22 14';
const BOTTOM_EYELID_OPEN =
  'M2 14C2 14.3155 2.15201 14.5287 2.45604 14.955C3.8221 16.8706 7.31078 21 12 21C16.6892 21 20.1779 16.8706 21.544 14.955C21.848 14.5287 22 14.3155 22 14';
const BOTTOM_EYELID_HALF =
  'M2 14C2 14.15 2.15201 14.3 2.45604 14.45C5.2 16.8 8.5 18 12 18C15.5 18 18.8 16.8 21.544 14.45C21.848 14.3 22 14.15 22 14';

// The pupil darts first, then yields softly as the lids meet.
const pupilVariants: Variants = {
  normal: { translateX: 0, scaleX: 1, scaleY: 1 },
  animate: {
    translateX: [0, -1.6, 1.5, 0, 0, 0, 0, 0, 0],
    scaleX: [1, 1, 1, 1, 1.04, 1.08, 1.06, 0.98, 1],
    scaleY: [1, 1, 1, 1, 0.92, 0.85, 0.88, 1.03, 1],
    transition: {
      duration: EYE_DURATION,
      ease: 'easeInOut',
      times: EYE_TIMES,
    },
  },
};

const eyeOutlineVariants: Variants = {
  normal: { scaleX: 1, scaleY: 1 },
  animate: {
    scaleX: [1, 1, 1, 1, 1.015, 1.03, 1.025, 0.99, 1],
    scaleY: [1, 1, 1, 1, 0.91, 0.78, 0.83, 1.025, 1],
    transition: { duration: EYE_DURATION, ease: 'easeInOut', times: EYE_TIMES },
  },
};

const browVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, 0, 0, 0, 0.25, 0.65, 0.55, -0.12, 0],
    transition: { duration: EYE_DURATION, ease: 'easeInOut', times: EYE_TIMES },
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
    transition: { duration: EYE_DURATION, ease: 'easeInOut', times: EYE_TIMES },
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
    transition: { duration: EYE_DURATION, ease: 'easeInOut', times: EYE_TIMES },
  },
};

const pupilClipVariants: Variants = {
  normal: { height: 14, y: 7 },
  animate: {
    height: [14, 14, 14, 14, 8, 0, 0, 8, 14],
    y: [7, 7, 7, 7, 10, 14, 14, 10, 7],
    transition: { duration: EYE_DURATION, ease: 'easeInOut', times: EYE_TIMES },
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
    transition: { duration: EYE_DURATION, ease: 'easeInOut', times: EYE_TIMES },
  },
};

const EyeIcon = forwardRef<EyeIconHandle, EyeIconProps>(
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
            d="M2 8C2 8 6.47715 3 12 3C17.5228 3 22 8 22 8"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={browVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M21.544 13.045C21.848 13.4713 22 13.6845 22 14C22 14.3155 21.848 14.5287 21.544 14.955C20.1779 16.8706 16.6892 21 12 21C7.31078 21 3.8221 16.8706 2.45604 14.955C2.15201 14.5287 2 14.3155 2 14C2 13.6845 2.15201 13.4713 2.45604 13.045C3.8221 11.1294 7.31078 7 12 7C16.6892 7 20.1779 11.1294 21.544 13.045Z"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={eyeOutlineVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 14px' }}
          />
          <motion.path
            d="M15 14C15 12.3431 13.6569 11 12 11C10.3431 11 9 12.3431 9 14C9 15.6569 10.3431 17 12 17C13.6569 17 15 15.6569 15 14Z"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={pupilVariants}
            animate={controls}
            initial="normal"
            clipPath={`url(#${pupilClipId})`}
            style={{ transformOrigin: '12px 14px' }}
          />
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 14px' }}
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

EyeIcon.displayName = 'EyeIcon';

export { EyeIcon };
