'use client';

import type { Easing, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface TickDouble01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface TickDouble01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// rest-parity: split-source-path
// The back tick is split at its gap so each piece can be written in pen order.
const BACK_SHORT_PATH =
  'M3 13.3333C3 13.3333 4.5 14 6.5 17C6.5 17 6.78485 16.5192 7.32133 15.7526';
const BACK_LONG_PATH = 'M17 6C14.7085 7.14577 12.3119 9.55181 10.3879 11.8223';

const CHECK_DURATION = 0.8;
const CHECK_TIMES = [0, 0.12, 0.15, 0.3, 0.36, 0.52, 1];
const CHECK_LAND = springEase(0.5, 0.3);
const PEN_EASE: Easing[] = [[0.55, 0, 1, 0.45], 'linear', 'easeInOut', 'linear', [0.4, 0, 0.2, 1], 'linear'];
const POP_EASE: Easing[] = ['linear', 'linear', 'linear', 'linear', [0.4, 0, 0.2, 1], CHECK_LAND];
// Share of the check stroke before its corner, where the pen rests.
const CORNER = 0.25;
// The front tick follows the back tick, like the second chevron of a double arrow.
const FRONT_DELAY = 0.06;
// Both ticks pop around one shared centre, so the gap between them only grows.
const POP_ORIGIN = { transformBox: 'view-box', originX: 12.5 / 24, originY: 11.5 / 24 } as const;

// Check: each tick is erased fast from its tail, the pen writes it again (down
// the short arm, a rest at the corner, a sweep up the long arm), and it lands
// with a spring pop. Strokes are hidden while they have no length, so no
// round-cap dot shows.
const popVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(1)', 'scale(1)', 'scale(1)', 'scale(1)', 'scale(1.16)', 'scale(1)'],
    transition: { duration: CHECK_DURATION, times: CHECK_TIMES, ease: POP_EASE },
  },
};

const frontVariants: Variants = {
  normal: { transform: 'scale(1)', pathLength: 1, pathOffset: 0, visibility: 'visible' },
  animate: {
    transform: ['scale(1)', 'scale(1)', 'scale(1)', 'scale(1)', 'scale(1)', 'scale(1.16)', 'scale(1)'],
    pathLength: [1, 0, 0.05, CORNER, CORNER, 1, 1],
    pathOffset: [0, 1, 0, 0, 0, 0, 0],
    visibility: ['visible', 'hidden', 'hidden', 'visible', 'visible', 'visible', 'visible'],
    transition: {
      duration: CHECK_DURATION,
      delay: FRONT_DELAY,
      times: CHECK_TIMES,
      ease: PEN_EASE,
      transform: {
        duration: CHECK_DURATION,
        delay: FRONT_DELAY,
        times: CHECK_TIMES,
        ease: POP_EASE,
      },
    },
  },
};

// The back tick is the front tick shifted left, written as one stroke that
// jumps the gap. Its short piece holds the first 0.323 of that stroke and its
// long piece the last 0.433, so the keyframes are split where the eraser and
// the pen cross the gap. The short piece is small, so its erase waits a beat to
// keep the first frame at rest.
const backShortVariants: Variants = {
  normal: { pathLength: 1, pathOffset: 0, visibility: 'visible' },
  animate: {
    pathLength: [1, 1, 0, 0.155, 0.774, 0.774, 1, 1],
    pathOffset: [0, 0, 1, 0, 0, 0, 0, 0],
    visibility: ['visible', 'visible', 'hidden', 'hidden', 'visible', 'visible', 'visible', 'visible'],
    transition: {
      duration: CHECK_DURATION,
      times: [0, 0.03, 0.088, 0.15, 0.3, 0.36, 0.39, 1],
      ease: ['linear', 'easeIn', 'linear', 'easeInOut', 'linear', 'easeIn', 'linear'],
    },
  },
};

// The pen writes this piece from its lower end, against the source direction,
// so the visible part is kept at the end of the path.
const backLongVariants: Variants = {
  normal: { pathLength: 1, pathOffset: 0, visibility: 'visible' },
  animate: {
    pathLength: [1, 1, 0, 0, 0.05, 1, 1],
    pathOffset: [0, 0, 0, 1, 0.95, 0, 0],
    visibility: ['visible', 'visible', 'hidden', 'hidden', 'hidden', 'visible', 'visible'],
    transition: {
      duration: CHECK_DURATION,
      times: [0, 0.088, 0.12, 0.15, 0.41, 0.52, 1],
      ease: ['linear', 'linear', 'linear', 'linear', 'easeOut', 'linear'],
    },
  },
};

const TickDouble01Icon = forwardRef<TickDouble01IconHandle, TickDouble01IconProps>(
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
          <motion.g
            variants={popVariants}
            animate={controls}
            initial="normal"
            style={POP_ORIGIN}
          >
            <motion.path
              d={BACK_SHORT_PATH}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={backShortVariants}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d={BACK_LONG_PATH}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={backLongVariants}
              animate={controls}
              initial="normal"
            />
          </motion.g>
          <motion.path
            d="M8 13.3333C8 13.3333 9.5 14 11.5 17C11.5 17 17 8.5 22 6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={frontVariants}
            animate={controls}
            initial="normal"
            style={POP_ORIGIN}
          />
        </svg>
      </div>
    );
  }
);

TickDouble01Icon.displayName = 'TickDouble01Icon';

export { TickDouble01Icon };
