'use client';

import type { Easing, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface CheckmarkSquare02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CheckmarkSquare02IconProps extends HTMLAttributes<HTMLDivElement> {
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
const CORNER = 0.3;

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

// The box dips as the check lands and springs back.
const frameVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(1)', 'scale(1)', 'scale(1)', 'scale(1)', 'scale(0.94)', 'scale(1)'],
    transition: { duration: CHECK_DURATION, times: CHECK_TIMES, ease: FRAME_EASE },
  },
};

const CheckmarkSquare02Icon = forwardRef<CheckmarkSquare02IconHandle, CheckmarkSquare02IconProps>(
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
            d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={frameVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 12 / 24, originY: 12 / 24 }}
          />
          <motion.path
            d="M8 12.5L10.5 15L16 9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={checkVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 12 / 24, originY: 12 / 24 }}
          />
        </svg>
      </div>
    );
  }
);

CheckmarkSquare02Icon.displayName = 'CheckmarkSquare02Icon';

export { CheckmarkSquare02Icon };
