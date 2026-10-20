'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface EyeOffIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface EyeOffIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const EYE_OFF_LOWER_PATH =
  'M6.43385 6.51953C4.22009 7.89049 2.93281 9.86457 2.31858 11.0339C2.10621 11.4382 2.00003 11.6403 2 12.0082C1.99997 12.3761 2.10584 12.5777 2.3176 12.981C3.32862 14.9066 6.16702 19.0195 11.9669 19.0195C14.2454 19.0195 16.0669 18.3848 17.5 17.4972';

const EYE_OFF_PUPIL_PATH =
  'M9.87868 9.87868C9.33579 10.4216 9 11.1716 9 12C9 13.6569 10.3431 15 12 15C12.8284 15 13.5784 14.6642 14.1213 14.1213';

const EYE_OFF_UPPER_PATH =
  'M10 5.14847C10.5934 5.05255 11.224 5 11.8936 5C17.7747 5 20.6528 9.05385 21.6779 10.9517C21.8927 11.3492 22 11.548 22 11.9106C22 12.2733 21.8921 12.4727 21.6765 12.8717C21.3678 13.4428 20.8916 14.2085 20.2167 15';

// These bridges continue directly from the three interrupted source paths.
const EYE_UPPER_CONTINUATION =
  'M6.43385 6.51953C7.518 5.841 8.69 5.36 10 5.14847';
const EYE_LOWER_CONTINUATION =
  'M20.2167 15C19.493 15.972 18.594 16.86 17.5 17.4972';
const EYE_PUPIL_CONTINUATION =
  'M14.1213 14.1213C14.6642 13.5784 15 12.8284 15 12C15 10.3431 13.6569 9 12 9C11.1716 9 10.4216 9.33579 9.87868 9.87868';

const OFF_DURATION = 1.2;
const SLASH_LAND = springEase(0.5, 0.3);

// Slash off, shared by every icon with a slash: the slash winds back and
// shoots off the bottom-right corner, the outline heals across its breaks,
// then a fresh slash darts in from the top-left corner and lands with a
// spring while the breaks reopen where it crosses.
const departingSlashVariants: Variants = {
  normal: { transform: 'translate(0px, 0px)' },
  animate: {
    transform: [
      'translate(0px, 0px)',
      'translate(-0.8px, -0.8px)',
      'translate(24px, 24px)',
      'translate(24px, 24px)',
    ],
    transition: {
      duration: OFF_DURATION,
      times: [0, 0.12, 0.34, 1],
      ease: ['easeOut', 'easeIn', 'linear'],
    },
  },
};

const arrivingSlashVariants: Variants = {
  normal: { transform: 'translate(-24px, -24px)' },
  animate: {
    transform: [
      'translate(-24px, -24px)',
      'translate(-24px, -24px)',
      'translate(1.2px, 1.2px)',
      'translate(0px, 0px)',
    ],
    transition: {
      duration: OFF_DURATION,
      times: [0, 0.6, 0.8, 1],
      ease: ['linear', [0.4, 0, 0.2, 1], SLASH_LAND],
    },
  },
};

// Each continuation draws once the departing slash has passed its break and
// retracts just before the arriving slash reaches it. A zero-length stroke
// with round caps draws a dot, so it is only visible while it has length.
const continuationVariants: Variants = {
  normal: { pathLength: 0, visibility: 'hidden' },
  animate: ([drawn, crossed]: [number, number]) => ({
    pathLength: [0, 0, 1, 1, 0, 0],
    visibility: ['hidden', 'hidden', 'visible', 'visible', 'hidden', 'hidden'],
    transition: {
      duration: OFF_DURATION,
      ease: 'easeOut',
      times: [0, drawn, drawn + 0.08, crossed - 0.015, crossed + 0.015, 1],
    },
  }),
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: { visibility: 'visible', transition: { duration: 0 } },
};

const EyeOffIcon = forwardRef<EyeOffIconHandle, EyeOffIconProps>(
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
          <path
            d={EYE_OFF_LOWER_PATH}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d={EYE_OFF_PUPIL_PATH}
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M2 2L22 22"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={departingSlashVariants}
            animate={controls}
            initial="normal"
          />
          <path
            d={EYE_OFF_UPPER_PATH}
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
            <motion.path
              d={EYE_UPPER_CONTINUATION}
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={continuationVariants}
              custom={[0.22, 0.656]}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d={EYE_LOWER_CONTINUATION}
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={continuationVariants}
              custom={[0.297, 0.694]}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d={EYE_PUPIL_CONTINUATION}
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={continuationVariants}
              custom={[0.246, 0.665]}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d="M2 2L22 22"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={arrivingSlashVariants}
              animate={controls}
              initial="normal"
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

EyeOffIcon.displayName = 'EyeOffIcon';

export { EyeOffIcon };
