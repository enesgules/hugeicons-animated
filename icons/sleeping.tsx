'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
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

// The Z drifts toward the top-right corner while shrinking away, then a fresh
// Z grows back in place on a spring. New z marks of three sizes rise beside it on their
// own headings and speeds. All marks share one cycle with staggered starts;
// their paths were checked to keep at least 0.7 units between any two marks.
const SLEEP_CYCLE = 3.2;
// A soft spring: the regrown Z overshoots about 7%, which keeps the checked
// clearance to the drifting marks.
const Z_LAND = springEase(0.35, 0.3);

const zVariants: Variants = {
  normal: { transform: 'translate(0px, 0px) scale(1)', transition: { duration: 0.2 } },
  animate: {
    transform: [
      'translate(0px, 0px) scale(1)',
      'translate(2.09px, -3.3px) scale(0.5)',
      'translate(2.4px, -3.8px) scale(0)',
      'translate(0px, 0px) scale(0)',
      'translate(0px, 0px) scale(0)',
      'translate(0px, 0px) scale(1)',
    ],
    transition: {
      duration: SLEEP_CYCLE,
      ease: ['linear', 'linear', 'linear', 'linear', Z_LAND],
      times: [0, 2 / SLEEP_CYCLE, 2.3 / SLEEP_CYCLE, 2.4 / SLEEP_CYCLE, 2.5 / SLEEP_CYCLE, 1],
      repeat: Infinity,
    },
  },
};

const DRIFTERS = [
  { x: 23.9, y: 5.9, scale: 0.55, dx: 3.8, dy: -4.7, duration: 2.6, delay: 0.7 },
  { x: 24.1, y: 6.8, scale: 0.4, dx: 3.8, dy: -3.7, duration: 2, delay: 2.2 },
  { x: 22.5, y: 4.5, scale: 0.3, dx: 2.5, dy: -4.8, duration: 1.5, delay: 2 },
];

const driftVariants: Variants = {
  normal: { transform: 'translate(0px, 0px) scale(0)' },
  animate: (i: number) => {
    const { dx, dy, duration, delay } = DRIFTERS[i];
    return {
      transform: [
        'translate(0px, 0px) scale(0)',
        `translate(${dx * 0.12}px, ${dy * 0.12}px) scale(1)`,
        `translate(${dx * 0.75}px, ${dy * 0.75}px) scale(0.9)`,
        `translate(${dx}px, ${dy}px) scale(0)`,
      ],
      transition: {
        duration,
        delay,
        ease: 'linear',
        times: [0, 0.15, 0.75, 1],
        repeat: Infinity,
        repeatDelay: SLEEP_CYCLE - duration,
      },
    };
  },
};

const snoreVariants: Variants = {
  normal: { scale: 1, transition: { duration: 0.2 } },
  animate: {
    scale: [1, 1.2, 1],
    transition: {
      duration: SLEEP_CYCLE,
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
            {DRIFTERS.map(({ x, y, scale }, i) => (
              <motion.g
                key={i}
                variants={driftVariants}
                custom={i}
                animate={controls}
                initial="normal"
              >
                <path
                  d={Z_PATH}
                  transform={`translate(${x} ${y}) scale(${scale}) translate(-19 -4.5)`}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </motion.g>
            ))}
          </motion.g>
        </svg>
      </div>
    );
  }
);

SleepingIcon.displayName = 'SleepingIcon';

export { SleepingIcon };
