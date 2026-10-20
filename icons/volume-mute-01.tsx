'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface VolumeMute01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface VolumeMute01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const SOUND_DURATION = 0.8;
const SOUND_TIMES = [0, 0.16, 0.4, 1];
const SPEAKER_LAND = springEase(0.45, 0.35);
const CROSS_LAND = springEase(0.5, 0.3);

// Sound burst, shared by every speaker icon: the cone draws back, pushes,
// and lands with a spring. Here no wave comes out: a mute cross springs up
// beside the cone mouth, holds, and shrinks away to the silent speaker.
const speakerVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(0.92)', 'scale(1.05)', 'scale(1)'],
    transition: {
      duration: SOUND_DURATION,
      times: SOUND_TIMES,
      ease: ['easeOut', [0.4, 0, 0.2, 1], SPEAKER_LAND],
    },
  },
};

const muteCrossVariants: Variants = {
  normal: { transform: 'scale(0)', visibility: 'hidden' },
  animate: {
    transform: ['scale(0)', 'scale(0)', 'scale(1)', 'scale(1)', 'scale(0)'],
    visibility: ['hidden', 'hidden', 'visible', 'visible', 'hidden'],
    transition: {
      duration: 1.1,
      times: [0, 0.4, 0.68, 0.84, 1],
      ease: ['linear', CROSS_LAND, 'linear', 'easeIn'],
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
          overflow="visible"
        >
          <motion.path
            d="M18 14.8135V9.18646C18 6.04126 18 4.46866 17.074 4.0773C16.1481 3.68593 15.0583 4.79793 12.8787 7.02192C11.7499 8.17365 11.1059 8.42869 9.5 8.42869C8.3879 8.42869 7.02749 8.28131 6.33706 9.33566C6 9.85038 6 10.5669 6 12C6 13.4331 6 14.1496 6.33706 14.6643C7.02749 15.7187 8.3879 15.5713 9.5 15.5713C11.106 15.5713 11.7499 15.8264 12.8787 16.9781C15.0583 19.2021 16.1481 20.3141 17.074 19.9227C18 19.5313 18 17.9587 18 14.8135Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={speakerVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 12 / 24, originY: 0.5 }}
          />
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            <motion.path
              d="M20.25 10.75L22.75 13.25M22.75 10.75L20.25 13.25"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={muteCrossVariants}
              animate={controls}
              initial="normal"
              style={{ transformBox: 'view-box', originX: 21.5 / 24, originY: 0.5 }}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

VolumeMute01Icon.displayName = 'VolumeMute01Icon';

export { VolumeMute01Icon };
