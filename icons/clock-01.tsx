'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Clock01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Clock01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const CLOCK_DURATION = 1.1;
const CLOCK_TIMES = [0, 0.16, 0.6, 1];
const CLOCK_LAND = springEase(0.45, 0.35);

// rest-parity: split-source-path
// Clock, shared by every clock face: the hands wind back, sweep around the
// dial (the long hand twice, the short hand once), run just past twelve
// o'clock and spring back into place. Here time runs fast-forward.
const handVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: (turns: number) => ({
    transform: [
      'rotate(0deg)',
      `rotate(${turns * -10}deg)`,
      `rotate(${turns * 372}deg)`,
      `rotate(${turns * 360}deg)`,
    ],
    transition: {
      duration: CLOCK_DURATION,
      times: CLOCK_TIMES,
      ease: ['easeOut', [0.4, 0, 0.2, 1], CLOCK_LAND],
    },
  }),
};

const Clock01Icon = forwardRef<Clock01IconHandle, Clock01IconProps>(
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
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <motion.path
            d="M12 8V12"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={handVariants}
            custom={2}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 0.5 }}
          />
          <motion.path
            d="M12 12L14 14"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={handVariants}
            custom={1}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 0.5 }}
          />
        </svg>
      </div>
    );
  }
);

Clock01Icon.displayName = 'Clock01Icon';

export { Clock01Icon };
