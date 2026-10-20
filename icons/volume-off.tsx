'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface VolumeOffIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface VolumeOffIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

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

const SOUND_DURATION = 0.8;
const SOUND_TIMES = [0, 0.16, 0.4, 1];
const SPEAKER_LAND = springEase(0.45, 0.35);
const WAVE_LAND = springEase(0.5, 0.3);
// The burst plays while the slash is away.
const SOUND_DELAY = 0.4;

// Sound burst, shared by every speaker icon: the cone draws back and pushes,
// the waves gather toward the cone mouth and radiate past their rest arcs,
// the outer wave last, and everything lands with a spring.
const speakerVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(0.92)', 'scale(1.05)', 'scale(1)'],
    transition: {
      duration: SOUND_DURATION,
      delay: SOUND_DELAY,
      times: SOUND_TIMES,
      ease: ['easeOut', [0.4, 0, 0.2, 1], SPEAKER_LAND],
    },
  },
};

const waveVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: (i: number) => ({
    transform: ['scale(1)', 'scale(0.65)', 'scale(1.15)', 'scale(1)'],
    transition: {
      duration: SOUND_DURATION,
      delay: SOUND_DELAY + i * 0.06,
      times: SOUND_TIMES,
      ease: ['easeOut', [0.4, 0, 0.2, 1], WAVE_LAND],
    },
  }),
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
          <motion.path
            d="M17 10C17.6296 10.7667 18 11.7054 18 12.7195C18 13.1635 17.929 13.593 17.7963 14"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={waveVariants}
            custom={0}
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
            custom={1}
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
                custom={[0.23, 0.659]}
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
                custom={[0.267, 0.674]}
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
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
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
