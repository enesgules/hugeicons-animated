'use client';

import type { Easing, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Tick01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Tick01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const CHECK_DURATION = 0.8;
const CHECK_TIMES = [0, 0.12, 0.15, 0.3, 0.36, 0.52, 1];
const CHECK_LAND = springEase(0.5, 0.3);
const PEN_EASE: Easing[] = [[0.55, 0, 1, 0.45], 'linear', 'easeInOut', 'linear', [0.4, 0, 0.2, 1], 'linear'];
const POP_EASE: Easing[] = ['linear', 'linear', 'linear', 'linear', [0.4, 0, 0.2, 1], CHECK_LAND];
// Share of the check stroke before its corner, where the pen rests.
const CORNER = 0.25;

// Check: the tick is erased fast from its tail, the pen writes it again (down
// the short arm, a rest at the corner, a sweep up the long arm), and it lands
// with a spring pop. The stroke is hidden while it has no length, so no
// round-cap dot shows.
const checkVariants: Variants = {
  normal: { transform: 'scale(1)', pathLength: 1, pathOffset: 0, visibility: 'visible' },
  animate: {
    transform: ['scale(1)', 'scale(1)', 'scale(1)', 'scale(1)', 'scale(1)', 'scale(1.16)', 'scale(1)'],
    pathLength: [1, 0, 0.05, CORNER, CORNER, 1, 1],
    pathOffset: [0, 1, 0, 0, 0, 0, 0],
    visibility: ['visible', 'hidden', 'hidden', 'visible', 'visible', 'visible', 'visible'],
    transition: {
      duration: CHECK_DURATION,
      times: CHECK_TIMES,
      ease: PEN_EASE,
      transform: { duration: CHECK_DURATION, times: CHECK_TIMES, ease: POP_EASE },
    },
  },
};

const Tick01Icon = forwardRef<Tick01IconHandle, Tick01IconProps>(
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
            d="M5 14.5C5 14.5 6.5 14.5 8.5 18C8.5 18 14.0588 8.83333 19 7"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={checkVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 12 / 24, originY: 12.5 / 24 }}
          />
        </svg>
      </div>
    );
  }
);

Tick01Icon.displayName = 'Tick01Icon';

export { Tick01Icon };
