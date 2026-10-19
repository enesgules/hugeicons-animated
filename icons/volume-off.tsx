'use client';

import type { Easing, Variants } from 'motion/react';
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

const OFF_DURATION = 1.3;
const BURST_EASE: Easing[] = ['linear', 'easeOut', [0.23, 1, 0.32, 1], 'easeInOut', 'linear'];

// The slash slides out, the speaker outline heals across its two breaks and
// gives one sound burst, then the slash slides back in and the breaks reopen
// where it crosses. Off-canvas, the slash jumps corners while hidden.
const slashVariants: Variants = {
  normal: { transform: 'translate(0px, 0px)', visibility: 'visible' },
  animate: {
    transform: [
      'translate(0px, 0px)',
      'translate(0.8px, 0.8px)',
      'translate(4px, 4px)',
      'translate(24px, 24px)',
      'translate(24px, 24px)',
      'translate(-24px, -24px)',
      'translate(-24px, -24px)',
      'translate(-18px, -18px)',
      'translate(-9px, -9px)',
      'translate(-3px, -3px)',
      'translate(-0.6px, -0.6px)',
      'translate(0px, 0px)',
    ],
    visibility: [
      'visible',
      'visible',
      'visible',
      'visible',
      'hidden',
      'hidden',
      'hidden',
      'visible',
      'visible',
      'visible',
      'visible',
      'visible',
    ],
    transition: {
      duration: OFF_DURATION,
      ease: 'linear',
      times: [0, 0.05, 0.1, 0.18, 0.5, 0.501, 0.74, 0.8, 0.85, 0.9, 0.95, 1],
    },
  },
};

const speakerVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(1)', 'scale(0.94)', 'scale(1.04)', 'scale(1)', 'scale(1)'],
    transition: {
      duration: OFF_DURATION,
      ease: BURST_EASE,
      times: [0, 0.3, 0.38, 0.5, 0.64, 1],
    },
  },
};

const waveVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(1)', 'scale(0.7)', 'scale(1.12)', 'scale(1)', 'scale(1)'],
    transition: {
      duration: OFF_DURATION,
      ease: BURST_EASE,
      times: [0, 0.3, 0.42, 0.56, 0.7, 1],
    },
  },
};

// Each continuation grows from the end the slash leaves first and retracts
// toward the end it reaches first on its way back.
const continuationVariants: Variants = {
  normal: { pathLength: 0 },
  animate: ([drawn, crossed]: [number, number]) => ({
    pathLength: [0, 0, 1, 1, 0, 0],
    transition: {
      duration: OFF_DURATION,
      ease: [0.23, 1, 0.32, 1],
      times: [0, drawn, drawn + 0.16, crossed, crossed + 0.08, 1],
    },
  }),
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: {
    visibility: ['visible', 'visible', 'hidden'],
    transition: { duration: OFF_DURATION, ease: 'linear', times: [0, 0.96, 1] },
  },
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
            variants={slashVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M17 10C17.6296 10.7667 18 11.7054 18 12.7195C18 13.1635 17.929 13.593 17.7963 14"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={waveVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 14 / 24, originY: 0.5 }}
          />
          <motion.path
            d="M20 8C21.2508 9.22951 22 10.7952 22 12.5C22 13.9164 21.4829 15.2367 20.5906 16.348"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={waveVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 14 / 24, originY: 0.5 }}
          />
          <motion.g
            variants={speakerVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 8 / 24, originY: 0.5 }}
          >
            <motion.g
              variants={generatedGeometryVariants}
              animate={controls}
              initial="normal"
            >
              <motion.path
                d="M7.96 7.96C8.44 7.58 9.5 6.5 10 6"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                variants={continuationVariants}
                custom={[0.06, 0.82]}
                animate={controls}
                initial="normal"
              />
              <motion.path
                d="M14 14V9.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                variants={continuationVariants}
                custom={[0.1, 0.86]}
                animate={controls}
                initial="normal"
              />
            </motion.g>
            <path
              d="M14 14C14 17.1452 14 19.5313 13.074 19.9227C12.1481 20.3141 11.0583 19.2021 8.8787 16.9781C7.7499 15.8264 7.106 15.5713 5.5 15.5713C4.3879 15.5713 3.02749 15.7187 2.33706 14.6643C2 14.1496 2 13.4331 2 12C2 10.5669 2 9.85038 2.33706 9.33566C3.02749 8.28131 4.3879 8.42869 5.5 8.42869C6.60725 8.42869 7.3569 8.43869 7.96 7.96M14 9.5C14 6.3548 14.026 4.46866 13.1 4.0773C12.3292 3.75147 11.5323 4.46765 10 6"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

VolumeOffIcon.displayName = 'VolumeOffIcon';

export { VolumeOffIcon };
