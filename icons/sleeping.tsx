'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface SleepingIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SleepingIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const Z_PATH =
  'M17 2H19.9474C20.5675 2 20.8775 2 20.9601 2.20009C21.0427 2.40019 20.8317 2.64023 20.4098 3.1203L17.9846 5.8797C17.5627 6.35977 17.3517 6.59981 17.4343 6.79991C17.5169 7 17.8269 7 18.447 7H21';

// One snore cycle: a smaller z and then a smallest z pop out above the Z in
// fixed, separated slots. The whole Zzz then floats up and shrinks away as one
// group, so the marks keep their gaps, and a fresh Z grows back in place.
const SLEEP_DURATION = 3;

const zzzVariants: Variants = {
  normal: { transform: 'translate(0px, 0px) scale(1)', transition: { duration: 0.2 } },
  animate: {
    transform: [
      'translate(0px, 0px) scale(1)',
      'translate(0px, 0px) scale(1)',
      'translate(2.5px, -3.5px) scale(0)',
      'translate(0px, 0px) scale(1)',
      'translate(0px, 0px) scale(1)',
    ],
    transition: {
      duration: SLEEP_DURATION,
      ease: ['linear', 'easeIn', 'linear', 'linear'],
      times: [0, 0.5, 0.78, 0.8, 1],
      repeat: Infinity,
    },
  },
};

const zVariants: Variants = {
  normal: { scale: 1, transition: { duration: 0.2 } },
  animate: {
    scale: [1, 1, 0, 0, 1.08, 1],
    transition: {
      duration: SLEEP_DURATION,
      ease: ['linear', 'linear', 'linear', [0.23, 1, 0.32, 1], 'easeInOut'],
      times: [0, 0.76, 0.78, 0.82, 0.94, 1],
      repeat: Infinity,
    },
  },
};

// Each small z pops in at its slot and is already gone before the group snaps back.
const smallZVariants: Variants = {
  normal: { scale: 0 },
  animate: (i: number) => {
    const start = 0.1 + i * 0.14;
    return {
      scale: [0, 0, 1.15, 1, 1, 0, 0],
      transition: {
        duration: SLEEP_DURATION,
        ease: ['linear', [0.23, 1, 0.32, 1], 'easeInOut', 'linear', 'linear', 'linear'],
        times: [0, start, start + 0.08, start + 0.13, 0.76, 0.78, 1],
        repeat: Infinity,
      },
    };
  },
};

const snoreVariants: Variants = {
  normal: { scale: 1, transition: { duration: 0.2 } },
  animate: {
    scale: [1, 1.2, 1],
    transition: {
      duration: SLEEP_DURATION,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: { visibility: 'visible', transition: { duration: 0 } },
};

const SleepingIcon = forwardRef<SleepingIconHandle, SleepingIconProps>(
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
          <path
            d="M13 2.04938C12.6711 2.01672 12.3375 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.3151 21.9311 10.6462 21.8 10"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M10 11H8.70711C8.25435 11 7.82014 10.8201 7.5 10.5M14 11H15.2929C15.7456 11 16.1799 10.8201 16.5 10.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.circle
            cx="12"
            cy="16"
            r="2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={snoreVariants}
            animate={controls}
            initial="normal"
          />
          <motion.g
            variants={zzzVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', transformOrigin: '21px 2px' }}
          >
            <motion.path
              d={Z_PATH}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={zVariants}
              animate={controls}
              initial="normal"
            />
            <motion.g
              variants={generatedGeometryVariants}
              animate={controls}
              initial="normal"
            >
              <g transform="translate(13.3 -3) scale(0.5)">
                <motion.path
                  d={Z_PATH}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  variants={smallZVariants}
                  custom={0}
                  animate={controls}
                  initial="normal"
                />
              </g>
              <g transform="translate(18.65 -5.5) scale(0.35)">
                <motion.path
                  d={Z_PATH}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  variants={smallZVariants}
                  custom={1}
                  animate={controls}
                  initial="normal"
                />
              </g>
            </motion.g>
          </motion.g>
        </svg>
      </div>
    );
  }
);

SleepingIcon.displayName = 'SleepingIcon';

export { SleepingIcon };
