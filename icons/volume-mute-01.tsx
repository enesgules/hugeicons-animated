'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface VolumeMute01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface VolumeMute01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const MUTE_MARK = 'M20 9.75L23 14.25M23 9.75L20 14.25';
const SOUND_WAVE =
  'M20 9C20.6254 9.81968 21 10.8634 21 12C21 13.1366 20.6254 14.1803 20 15';

const MUTE_DURATION = 1.12;
const MUTE_TIMES = [
  0, 0.05, 0.1, 0.16, 0.24, 0.34, 0.44, 0.56, 0.68, 0.76, 0.82, 0.87,
  0.92, 0.97, 1,
];

const departingMuteVariants: Variants = {
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
    transition: {
      duration: MUTE_DURATION,
      ease: 'linear',
      times: MUTE_TIMES,
    },
  },
};

const soundWaveVariants: Variants = {
  normal: {
    pathLength: 0,
    transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] },
  },
  animate: {
    pathLength: [0, 0, 0, 0, 0.25, 0.7, 1, 1, 1, 1, 1, 1, 0.8, 0.3, 0],
    transition: {
      duration: MUTE_DURATION,
      ease: 'linear',
      times: MUTE_TIMES,
    },
  },
};

const arrivingMuteVariants: Variants = {
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
    transition: {
      duration: MUTE_DURATION,
      ease: 'linear',
      times: MUTE_TIMES,
    },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: { visibility: 'visible', transition: { duration: 0 } },
};

const VolumeMute01Icon = forwardRef<VolumeMute01IconHandle, VolumeMute01IconProps>(
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
            d="M18 14.8135V9.18646C18 6.04126 18 4.46866 17.074 4.0773C16.1481 3.68593 15.0583 4.79793 12.8787 7.02192C11.7499 8.17365 11.1059 8.42869 9.5 8.42869C8.3879 8.42869 7.02749 8.28131 6.33706 9.33566C6 9.85038 6 10.5669 6 12C6 13.4331 6 14.1496 6.33706 14.6643C7.02749 15.7187 8.3879 15.5713 9.5 15.5713C11.106 15.5713 11.7499 15.8264 12.8787 16.9781C15.0583 19.2021 16.1481 20.3141 17.074 19.9227C18 19.5313 18 17.9587 18 14.8135Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.path
            d={MUTE_MARK}
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={departingMuteVariants}
            animate={controls}
            initial="normal"
          />
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            <motion.path
              d={SOUND_WAVE}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={soundWaveVariants}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d={MUTE_MARK}
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={arrivingMuteVariants}
              animate={controls}
              initial="normal"
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

VolumeMute01Icon.displayName = 'VolumeMute01Icon';

export { VolumeMute01Icon };
