'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Robot01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Robot01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const HEAD_LAND = springEase(0.45, 0.35);
const SWING = springEase(0.8, 0.45);

// The antenna tunes in, the face tilts, and a segmented status display
// responds. The head tilts back, swings over and lands with a spring; the
// antenna is kicked and swings back on its base like a pendulum.
const robotHeadVariants: Variants = {
  normal: { transform: 'translateY(0px) rotate(0deg)' },
  animate: {
    transform: [
      'translateY(0px) rotate(0deg)',
      'translateY(-0.6px) rotate(-5deg)',
      'translateY(0px) rotate(4deg)',
      'translateY(0px) rotate(0deg)',
    ],
    transition: {
      duration: 1,
      times: [0, 0.16, 0.4, 1],
      ease: ['easeOut', [0.4, 0, 0.2, 1], HEAD_LAND],
    },
  },
};

const robotEyeVariants: Variants = {
  normal: { scaleY: 1 },
  animate: (i: number) => ({
    scaleY: [1, 0.1, 1, 1, 0.1, 1],
    transition: { duration: 0.9, times: [0, 0.12, 0.24, 0.58, 0.7, 0.82], delay: i * 0.03 },
  }),
};

const antennaVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, -15, 0],
    transition: { duration: 1.3, times: [0, 0.16, 1], ease: ['easeOut', SWING] },
  },
};

const robotDisplayVariants: Variants = {
  normal: { pathLength: 0 },
  animate: {
    pathLength: [0, 0, 1, 1, 0],
    transition: {
      duration: 1,
      times: [0, 0.2, 0.38, 0.86, 1],
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0.08 } },
  animate: {
    visibility: ['hidden', 'hidden', 'visible', 'visible', 'hidden'],
    transition: {
      duration: 1,
      times: [0, 0.2, 0.24, 0.86, 1],
      ease: 'easeInOut',
    },
  },
};

const Robot01Icon = forwardRef<Robot01IconHandle, Robot01IconProps>(
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
            d="M12 4V2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={antennaVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 12 / 24, originY: 4 / 24 }}
          />
          <path
            d="M20 22C20 17.5817 16.4183 14 12 14C7.58172 14 4 17.5817 4 22"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M9.375 8.25H9.25M9.5 8.25C9.5 8.38807 9.38807 8.5 9.25 8.5C9.11193 8.5 9 8.38807 9 8.25C9 8.11193 9.11193 8 9.25 8C9.38807 8 9.5 8.11193 9.5 8.25Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={robotEyeVariants}
            custom={0}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 9.25 / 24, originY: 8.25 / 24 }}
          />
          <motion.path
            d="M14.875 8.25H14.75M15 8.25C15 8.38807 14.8881 8.5 14.75 8.5C14.6119 8.5 14.5 8.38807 14.5 8.25C14.5 8.11193 14.6119 8 14.75 8C14.8881 8 15 8.11193 15 8.25Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={robotEyeVariants}
            custom={1}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 14.75 / 24, originY: 8.25 / 24 }}
          />
          <motion.path
            d="M15.1538 4H8.84615C7.59095 4 6.96334 4 6.47397 4.22025C5.91693 4.47095 5.47095 4.91693 5.22025 5.47397C5 5.96334 5 6.59095 5 7.84615C5 9.85448 5 10.8586 5.3524 11.6417C5.75353 12.5329 6.46709 13.2465 7.35835 13.6476C8.14135 14 9.14552 14 11.1538 14H12.8462C14.8545 14 15.8586 14 16.6417 13.6476C17.5329 13.2465 18.2465 12.5329 18.6476 11.6417C19 10.8586 19 9.85448 19 7.84615C19 6.59095 19 5.96334 18.7797 5.47397C18.529 4.91693 18.0831 4.47095 17.526 4.22025C17.0367 4 16.4091 4 15.1538 4Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={robotHeadVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 12 / 24, originY: 9 / 24 }}
          />
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            <motion.path
              d="M9 11.5H10.5M11.25 11.5H12.75M13.5 11.5H15"
              stroke="currentColor"
              strokeLinecap="butt"
              strokeWidth="1.6"
              variants={robotDisplayVariants}
              animate={controls}
              initial="normal"
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

Robot01Icon.displayName = 'Robot01Icon';

export { Robot01Icon };
