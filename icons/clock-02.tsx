'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Clock02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Clock02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const CLOCK_DURATION = 1.1;
const CLOCK_TIMES = [0, 0.16, 0.6, 1];
const CLOCK_LAND = springEase(0.45, 0.35);

// rest-parity: split-source-path
// Clock, shared by every clock face: the hands wind back, sweep around the
// dial (the long hand twice, the short hand once), run just past twelve
// o'clock and spring back into place. Here time rewinds, so the hands turn
// counter-clockwise and the arrowed rim is pulled back with them.
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

const rimVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: {
    transform: ['rotate(0deg)', 'rotate(8deg)', 'rotate(-24deg)', 'rotate(0deg)'],
    transition: {
      duration: CLOCK_DURATION,
      times: CLOCK_TIMES,
      ease: ['easeOut', [0.4, 0, 0.2, 1], CLOCK_LAND],
    },
  },
};

const Clock02Icon = forwardRef<Clock02IconHandle, Clock02IconProps>(
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
            d="M5.04798 8.60657L2.53784 8.45376C4.33712 3.70477 9.503 0.999914 14.5396 2.34474C19.904 3.77711 23.0904 9.26107 21.6565 14.5935C20.2227 19.926 14.7116 23.0876 9.3472 21.6553C5.36419 20.5917 2.58192 17.2946 2 13.4844"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={rimVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 0.5 }}
          />
          <motion.path
            d="M12 8V12"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={handVariants}
            custom={-2}
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
            custom={-1}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 0.5 }}
          />
        </svg>
      </div>
    );
  }
);

Clock02Icon.displayName = 'Clock02Icon';

export { Clock02Icon };
