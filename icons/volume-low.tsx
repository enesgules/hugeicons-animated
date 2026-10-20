'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation, waveTrain } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface VolumeLowIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface VolumeLowIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// A quieter volume-high: one wave at a time rises at the cone mouth, travels
// out through the rest arc, and fades while the cone pushes for each wave.
const WAVE_CYCLE = 1.1;
const WAVES = [
  'M16.75 10.5C16.9063 10.9099 17 11.4317 17 12C17 12.5683 16.9063 13.0901 16.75 13.5',
  'M19 9C19.6254 9.81968 20 10.8634 20 12C20 13.1366 19.6254 14.1803 19 15',
  'M21.25 7.5C22.3445 8.7295 23 10.2951 23 12C23 13.7049 22.3445 15.2705 21.25 16.5',
];

const speakerVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(1.04)', 'scale(0.98)', 'scale(1)'],
    transition: {
      duration: WAVE_CYCLE / 2,
      ease: 'easeInOut',
      times: [0, 0.25, 0.6, 1],
      repeat: Infinity,
    },
  },
};

const waveVariants: Variants = {
  normal: (i: number) => ({
    d: WAVES[i],
    opacity: 1,
    transition: { duration: 0.25, ease: 'easeOut' },
  }),
  animate: (i: number) => waveTrain(WAVES, i, WAVE_CYCLE),
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0.25 } },
  animate: { visibility: 'visible' },
};

const VolumeLowIcon = forwardRef<VolumeLowIconHandle, VolumeLowIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const { handleMouseEnter, handleMouseLeave } = useIconAnimation({
      controls,
      loops: true,
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
            custom={1}
            animate={controls}
            initial="normal"
          />
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            <motion.path
              d={WAVES[0]}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={waveVariants}
              custom={0}
              animate={controls}
              initial="normal"
            />
          </motion.g>
          <motion.path
            d="M16 14.8135V9.18646C16 6.04126 16 4.46866 15.0747 4.0773C14.1494 3.68593 13.0604 4.79793 10.8823 7.02192C9.7544 8.17365 9.11086 8.42869 7.50605 8.42869C6.10259 8.42869 5.40086 8.42869 4.89677 8.77262C3.85036 9.48655 4.00854 10.882 4.00854 12C4.00854 13.118 3.85036 14.5134 4.89677 15.2274C5.40086 15.5713 6.10259 15.5713 7.50605 15.5713C9.11086 15.5713 9.7544 15.8264 10.8823 16.9781C13.0604 19.2021 14.1494 20.3141 15.0747 19.9227C16 19.5313 16 17.9587 16 14.8135Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={speakerVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 14 / 24, originY: 0.5 }}
          />
        </svg>
      </div>
    );
  }
);

VolumeLowIcon.displayName = 'VolumeLowIcon';

export { VolumeLowIcon };
