'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { pathAt, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface VolumeHighIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface VolumeHighIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// Sound leaves the speaker: each wave travels outward along its own curve and
// fades. The cone draws back and pushes, and the same wave rises again at the
// cone mouth, travels back out, and settles on its rest arc with a small
// overshoot. The inner wave leads. Waves change shape, not scale, so the
// stroke keeps its width.
const WAVES = [
  'M14 11C14 11.2732 14 11.6211 14 12C14 12.3789 14 12.7267 14 13',
  'M17 9C17.6254 9.81968 18 10.8634 18 12C18 13.1366 17.6254 14.1803 17 15',
  'M20 7C21.2508 8.36613 22 10.1057 22 12C22 13.8943 21.2508 15.6339 20 17',
  'M23 5C24.8762 6.9126 26 9.348 26 12C26 14.652 24.8762 17.0875 23 19',
];

const speakerVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(1)', 'scale(0.95)', 'scale(1.04)', 'scale(1)'],
    transition: {
      duration: 0.9,
      times: [0, 0.12, 0.3, 0.46, 1],
      ease: ['linear', 'easeOut', [0.23, 1, 0.32, 1], 'easeInOut'],
    },
  },
};

const waveVariants: Variants = {
  normal: (rest: number) => ({ d: WAVES[rest], opacity: 1 }),
  animate: (rest: number) => ({
    d: [rest, rest + 0.7, 0.15, rest + 0.08, rest].map((t) => pathAt(WAVES, t)),
    opacity: [1, 0, 0, 1, 1],
    transition: {
      duration: 0.9,
      delay: (rest - 1) * 0.08,
      times: [0, 0.3, 0.31, 0.78, 1],
      ease: ['easeIn', 'linear', [0.23, 1, 0.32, 1], 'easeInOut'],
    },
  }),
};

const VolumeHighIcon = forwardRef<VolumeHighIconHandle, VolumeHighIconProps>(
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
            d="M14 14.8135V9.18646C14 6.04126 14 4.46866 13.0747 4.0773C12.1494 3.68593 11.0603 4.79793 8.88232 7.02192C7.75439 8.17365 7.11085 8.42869 5.50604 8.42869C4.10257 8.42869 3.40084 8.42869 2.89675 8.77262C1.85035 9.48655 2.00852 10.882 2.00852 12C2.00852 13.118 1.85035 14.5134 2.89675 15.2274C3.40084 15.5713 4.10257 15.5713 5.50604 15.5713C7.11085 15.5713 7.75439 15.8264 8.88232 16.9781C11.0603 19.2021 12.1494 20.3141 13.0747 19.9227C14 19.5313 14 17.9587 14 14.8135Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={speakerVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box' }}
          />
          <motion.path
            d="M17 9C17.6254 9.81968 18 10.8634 18 12C18 13.1366 17.6254 14.1803 17 15"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={waveVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M20 7C21.2508 8.36613 22 10.1057 22 12C22 13.8943 21.2508 15.6339 20 17"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={waveVariants}
            custom={2}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

VolumeHighIcon.displayName = 'VolumeHighIcon';

export { VolumeHighIcon };
