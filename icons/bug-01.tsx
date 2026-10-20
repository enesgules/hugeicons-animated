'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Bug01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Bug01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// six deliberately mismatched leg cycles drift in and out of phase while the
// shell makes a small irregular weight shift
const bugVariants: Variants = {
  normal: {
    transform: 'translate(0px, 0px) rotate(0deg)',
    transition: { type: 'spring', duration: 0.32, bounce: 0 },
  },
  animate: {
    transform: [
      'translate(0px, 0px) rotate(0deg)',
      'translate(0.42px, -0.45px) rotate(-0.9deg)',
      'translate(-0.28px, -0.12px) rotate(0.65deg)',
      'translate(0.55px, 0.08px) rotate(-1.15deg)',
      'translate(-0.4px, -0.36px) rotate(1deg)',
      'translate(0.18px, -0.52px) rotate(-0.4deg)',
      'translate(0px, 0px) rotate(0deg)',
    ],
    transition: {
      duration: 1.12,
      ease: [0.77, 0, 0.175, 1],
      times: [0, 0.13, 0.31, 0.46, 0.68, 0.82, 1],
      repeat: Infinity,
    },
  },
};

interface LegMotion {
  angles: number[];
  delay: number;
  duration: number;
  times: number[];
}

const DEFAULT_LEG_MOTION: LegMotion = {
  angles: [0, 18, -7, 25, -15, 9, -22, 0],
  delay: 0,
  duration: 0.83,
  times: [0, 0.11, 0.24, 0.39, 0.55, 0.7, 0.86, 1],
};

const LEG_MOTIONS: readonly LegMotion[] = [
  DEFAULT_LEG_MOTION,
  {
    angles: [0, -12, 23, -19, 8, -25, 14, 0],
    delay: 0.05,
    duration: 0.91,
    times: [0, 0.16, 0.29, 0.43, 0.6, 0.76, 0.9, 1],
  },
  {
    angles: [0, 21, -16, 7, -24, 18, -9, 0],
    delay: 0.11,
    duration: 0.84,
    times: [0, 0.09, 0.22, 0.38, 0.57, 0.71, 0.89, 1],
  },
  {
    angles: [0, -22, 11, -17, 24, -6, 15, 0],
    delay: 0.02,
    duration: 1.03,
    times: [0, 0.14, 0.31, 0.45, 0.62, 0.78, 0.91, 1],
  },
  {
    angles: [0, 14, -20, 9, -16, 22, -7, 0],
    delay: 0.14,
    duration: 0.88,
    times: [0, 0.12, 0.26, 0.47, 0.59, 0.74, 0.87, 1],
  },
  {
    angles: [0, -18, 8, -22, 16, -10, 20, 0],
    delay: 0.08,
    duration: 0.96,
    times: [0, 0.18, 0.33, 0.48, 0.64, 0.79, 0.92, 1],
  },
];

const randomLegVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: (legIndex: number) => {
    const legMotion = LEG_MOTIONS[legIndex] ?? DEFAULT_LEG_MOTION;

    return {
      transform: legMotion.angles.map((angle) => `rotate(${angle}deg)`),
      transition: {
        delay: legMotion.delay,
        duration: legMotion.duration,
        ease: 'linear',
        times: legMotion.times,
        repeat: Infinity,
      },
    };
  },
};

const Bug01Icon = forwardRef<Bug01IconHandle, Bug01IconProps>(
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
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          overflow="visible"
          variants={bugVariants}
          animate={controls}
          initial="normal"
          style={{ transformBox: 'view-box', originX: 0.5, originY: 12.5 / 24 }}
        >
          <motion.path
            d="M3.01309 4.99084C2.89323 6.05084 3.55249 8.42285 6.48923 8.42285"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={randomLegVariants}
            custom={0}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 6.5 / 24, originY: 8.4 / 24 }}
          />
          <motion.path
            d="M17.5951 8.38081C18.8357 8.57881 21.1132 7.49881 20.9957 5.00281"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={randomLegVariants}
            custom={1}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 17.6 / 24, originY: 8.4 / 24 }}
          />
          <motion.path
            d="M20.9928 20.9989C21.0528 19.9429 20.1777 17.5549 17.599 17.4229"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={randomLegVariants}
            custom={2}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 17.6 / 24, originY: 17.4 / 24 }}
          />
          <motion.path
            d="M6.45163 17.4708C5.65013 17.2308 3.01306 18.3348 3.01306 20.9988"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={randomLegVariants}
            custom={3}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 6.45 / 24, originY: 17.47 / 24 }}
          />
          <path
            d="M9.3299 6.11884C9.35388 5.09884 9.84533 2.99884 12.0029 2.99884C13.9208 2.99884 14.5861 4.61884 14.676 6.11884M6.26131 9.41884C6.38118 8.63884 7.29216 6.81484 9.36586 6.63484C11.4635 6.55564 14.3403 6.58684 14.8797 6.67084C15.5869 6.73377 17.2951 7.43884 17.7506 9.41884C17.9124 10.4388 17.8285 11.8788 17.8524 12.7188C17.8165 13.5588 17.9207 15.2623 17.7565 16.1388C17.6367 17.0988 16.9894 18.4668 16.1024 19.3068C14.7838 20.7228 11.1639 22.2108 8.03534 19.4508C6.41713 17.8908 6.30925 16.3788 6.18939 15.7788C6.15725 15.4571 6.15875 13.8763 6.16541 12.3588C6.14144 11.046 6.17235 9.78063 6.26131 9.41884Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <motion.path
            d="M3.01306 12.8988H5.9498"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={randomLegVariants}
            custom={4}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 5.95 / 24, originY: 12.9 / 24 }}
          />
          <motion.path
            d="M20.9929 12.8988L18.1161 12.8988"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={randomLegVariants}
            custom={5}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 18.12 / 24, originY: 12.9 / 24 }}
          />
          <path
            d="M12.0033 16.4988L12.0033 20.2788"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
        </motion.svg>
      </div>
    );
  }
);

Bug01Icon.displayName = 'Bug01Icon';

export { Bug01Icon };
