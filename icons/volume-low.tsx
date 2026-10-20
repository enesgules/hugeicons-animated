'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface VolumeLowIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface VolumeLowIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const SOUND_DURATION = 0.8;
const SOUND_TIMES = [0, 0.16, 0.4, 1];
const SPEAKER_LAND = springEase(0.45, 0.35);
const WAVE_LAND = springEase(0.5, 0.3);

// Sound burst, shared by every speaker icon: the cone draws back and pushes,
// the waves gather toward the cone mouth and radiate past their rest arcs,
// the outer wave last, and everything lands with a spring.
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

const waveVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: (i: number) => ({
    transform: ['scale(1)', 'scale(0.65)', 'scale(1.15)', 'scale(1)'],
    transition: {
      duration: SOUND_DURATION,
      delay: i * 0.06,
      times: SOUND_TIMES,
      ease: ['easeOut', [0.4, 0, 0.2, 1], WAVE_LAND],
    },
  }),
};

const VolumeLowIcon = forwardRef<VolumeLowIconHandle, VolumeLowIconProps>(
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
            d="M19 9C19.6254 9.81968 20 10.8634 20 12C20 13.1366 19.6254 14.1803 19 15"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={waveVariants}
            custom={0}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 16 / 24, originY: 0.5 }}
          />
          <motion.path
            d="M16 14.8135V9.18646C16 6.04126 16 4.46866 15.0747 4.0773C14.1494 3.68593 13.0604 4.79793 10.8823 7.02192C9.7544 8.17365 9.11086 8.42869 7.50605 8.42869C6.10259 8.42869 5.40086 8.42869 4.89677 8.77262C3.85036 9.48655 4.00854 10.882 4.00854 12C4.00854 13.118 3.85036 14.5134 4.89677 15.2274C5.40086 15.5713 6.10259 15.5713 7.50605 15.5713C9.11086 15.5713 9.7544 15.8264 10.8823 16.9781C13.0604 19.2021 14.1494 20.3141 15.0747 19.9227C16 19.5313 16 17.9587 16 14.8135Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={speakerVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 10 / 24, originY: 0.5 }}
          />
        </svg>
      </div>
    );
  }
);

VolumeLowIcon.displayName = 'VolumeLowIcon';

export { VolumeLowIcon };
