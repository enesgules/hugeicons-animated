'use client';

import type { Easing, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface UserCheck01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface UserCheck01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const CHECK_DURATION = 0.8;
const CHECK_TIMES = [0, 0.12, 0.15, 0.3, 0.36, 0.52, 1];
const CHECK_LAND = springEase(0.5, 0.3);
const PEN_EASE: Easing[] = [[0.55, 0, 1, 0.45], 'linear', 'easeInOut', 'linear', [0.4, 0, 0.2, 1], 'linear'];
const POP_EASE: Easing[] = ['linear', 'linear', 'linear', 'linear', [0.4, 0, 0.2, 1], CHECK_LAND];
const FRAME_LAND = springEase(0.45, 0.35);
const FRAME_EASE: Easing[] = ['linear', 'linear', 'linear', 'linear', [0.4, 0, 0.2, 1], FRAME_LAND];
// Share of the check stroke before its corner, where the pen rests.
const CORNER = 0.28;

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

// The person nods down as the check lands and springs back.
const personVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: [
      'translateY(0px)',
      'translateY(0px)',
      'translateY(0px)',
      'translateY(0px)',
      'translateY(0px)',
      'translateY(1px)',
      'translateY(0px)',
    ],
    transition: { duration: CHECK_DURATION, times: CHECK_TIMES, ease: FRAME_EASE },
  },
};

const UserCheck01Icon = forwardRef<UserCheck01IconHandle, UserCheck01IconProps>(
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
          <motion.g variants={personVariants} animate={controls} initial="normal">
            <path
              d="M15 8C15 5.23858 12.7614 3 10 3C7.23858 3 5 5.23858 5 8C5 10.7614 7.23858 13 10 13C12.7614 13 15 10.7614 15 8Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M3 20C3 16.134 6.13401 13 10 13C11.9587 13 13.7295 13.8045 15 15.101"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </motion.g>
          <motion.path
            d="M13 18.5C13 18.5 14.3485 19.0067 15 21C15 21 18.1765 16 21 15"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={checkVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 17 / 24, originY: 18 / 24 }}
          />
        </svg>
      </div>
    );
  }
);

UserCheck01Icon.displayName = 'UserCheck01Icon';

export { UserCheck01Icon };
