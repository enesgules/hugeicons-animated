'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface VolumeOffIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface VolumeOffIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const SPEAKER_TOP_CONTINUATION = 'M7.96 7.96C8.44 7.58 9.5 6.5 10 6';
const SPEAKER_MOUTH_CONTINUATION = 'M14 14V9.5';

// Slash off, as in the eye, headphone and notification off icons: the slash
// leaves to the bottom right, the speaker heals across its two breaks, then a
// fresh slash comes back from the top left and the breaks reopen behind it.
const OFF_DURATION = 1.12;
const OFF_TIMES = [
  0, 0.05, 0.1, 0.16, 0.24, 0.34, 0.44, 0.56, 0.68, 0.76, 0.82, 0.87,
  0.92, 0.97, 1,
];

const departingSlashVariants: Variants = {
  normal: {
    transform: 'translate(0px, 0px)',
    transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] },
  },
  animate: {
    transform: [
      'translate(0px, 0px)',
      'translate(0.8px, 0.8px)',
      'translate(4px, 4px)',
      'translate(24px, 24px)',
      'translate(24px, 24px)',
      'translate(24px, 24px)',
      'translate(24px, 24px)',
      'translate(24px, 24px)',
      'translate(24px, 24px)',
      'translate(24px, 24px)',
      'translate(24px, 24px)',
      'translate(24px, 24px)',
      'translate(24px, 24px)',
      'translate(24px, 24px)',
      'translate(24px, 24px)',
    ],
    transition: { duration: OFF_DURATION, ease: 'linear', times: OFF_TIMES },
  },
};

// A zero-length stroke with round caps draws a dot, so each continuation is
// only visible while it has length.
const LEADING_LENGTH = [0, 0, 0, 0.12, 0.62, 1, 1, 1, 1, 1, 0.62, 0.2, 0, 0, 0];
const TRAILING_LENGTH = [0, 0, 0, 0, 0.25, 0.7, 1, 1, 1, 1, 1, 1, 0.8, 0.3, 0];
const visibleWhileDrawn = (lengths: number[]) =>
  lengths.map((value) => (value > 0 ? 'visible' : 'hidden'));

const leadingContinuationVariants: Variants = {
  normal: {
    pathLength: 0,
    visibility: 'hidden',
    transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] },
  },
  animate: {
    pathLength: LEADING_LENGTH,
    visibility: visibleWhileDrawn(LEADING_LENGTH),
    transition: { duration: OFF_DURATION, ease: 'linear', times: OFF_TIMES },
  },
};

const trailingContinuationVariants: Variants = {
  normal: {
    pathLength: 0,
    visibility: 'hidden',
    transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] },
  },
  animate: {
    pathLength: TRAILING_LENGTH,
    visibility: visibleWhileDrawn(TRAILING_LENGTH),
    transition: { duration: OFF_DURATION, ease: 'linear', times: OFF_TIMES },
  },
};

const arrivingSlashVariants: Variants = {
  normal: {
    transform: 'translate(-24px, -24px)',
    transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] },
  },
  animate: {
    transform: [
      'translate(-24px, -24px)',
      'translate(-24px, -24px)',
      'translate(-24px, -24px)',
      'translate(-24px, -24px)',
      'translate(-24px, -24px)',
      'translate(-24px, -24px)',
      'translate(-24px, -24px)',
      'translate(-24px, -24px)',
      'translate(-24px, -24px)',
      'translate(-24px, -24px)',
      'translate(-18px, -18px)',
      'translate(-9px, -9px)',
      'translate(-3px, -3px)',
      'translate(-0.6px, -0.6px)',
      'translate(0px, 0px)',
    ],
    transition: { duration: OFF_DURATION, ease: 'linear', times: OFF_TIMES },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: { visibility: 'visible', transition: { duration: 0 } },
};

const VolumeOffIcon = forwardRef<VolumeOffIconHandle, VolumeOffIconProps>(
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
          <motion.path
            d="M22 22L2 2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={departingSlashVariants}
            animate={controls}
            initial="normal"
          />
          <path
            d="M17 10C17.6296 10.7667 18 11.7054 18 12.7195C18 13.1635 17.929 13.593 17.7963 14"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M20 8C21.2508 9.22951 22 10.7952 22 12.5C22 13.9164 21.4829 15.2367 20.5906 16.348"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M14 14C14 17.1452 14 19.5313 13.074 19.9227C12.1481 20.3141 11.0583 19.2021 8.8787 16.9781C7.7499 15.8264 7.106 15.5713 5.5 15.5713C4.3879 15.5713 3.02749 15.7187 2.33706 14.6643C2 14.1496 2 13.4331 2 12C2 10.5669 2 9.85038 2.33706 9.33566C3.02749 8.28131 4.3879 8.42869 5.5 8.42869C6.60725 8.42869 7.3569 8.43869 7.96 7.96M14 9.5C14 6.3548 14.026 4.46866 13.1 4.0773C12.3292 3.75147 11.5323 4.46765 10 6"
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
              d={SPEAKER_TOP_CONTINUATION}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={leadingContinuationVariants}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d={SPEAKER_MOUTH_CONTINUATION}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={trailingContinuationVariants}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d="M22 22L2 2"
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

VolumeOffIcon.displayName = 'VolumeOffIcon';

export { VolumeOffIcon };
