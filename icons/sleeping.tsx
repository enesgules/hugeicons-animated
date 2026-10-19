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

// New z marks rise from beside the Z and drift slowly toward the top-right
// corner. Each has its own size, speed, and heading, and they share one cycle
// with staggered starts, so they never meet. The source Z stays still.
const SLEEP_CYCLE = 3;

const DRIFTERS = [
  { x: 22.6, y: 0.6, scale: 0.55, dx: 4, dy: -4, duration: 2.6, delay: 0 },
  { x: 23.4, y: 3.4, scale: 0.42, dx: 4.5, dy: -2.2, duration: 2, delay: 1 },
  { x: 21.2, y: -1.2, scale: 0.32, dx: 2.2, dy: -4.5, duration: 1.6, delay: 2 },
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
        ease: ['easeOut', 'linear', 'easeIn'],
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
          <path
            d={Z_PATH}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
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
