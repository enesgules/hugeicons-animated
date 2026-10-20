'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ZoomOutAreaIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ZoomOutAreaIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// rest-parity: split-source-path
const FRAME_DURATION = 0.8;
const FRAME_TIMES = [0, 0.16, 0.4, 1];
const MARK_LAND = springEase(0.5, 0.3);
const OBJECT_LAND = springEase(0.45, 0.35);

// Frame (zoom out): the lens and the area corners wind outward, then burst
// inward as the lens shrinks away, and spring back.
const lensVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(1.06)', 'scale(0.86)', 'scale(1)'],
    transition: {
      duration: FRAME_DURATION,
      times: FRAME_TIMES,
      ease: ['easeOut', [0.4, 0, 0.2, 1], OBJECT_LAND],
    },
  },
};

// Each corner piece travels along its own direction (x, y): a short wind-up,
// the burst, and a spring landing.
const CORNER_TRAVEL = [0, -0.5, 1.4, 0];
const cornerVariants: Variants = {
  normal: { transform: 'translate(0px, 0px)' },
  animate: ([dx, dy]: [number, number]) => ({
    transform: CORNER_TRAVEL.map((v) => `translate(${v * dx}px, ${v * dy}px)`),
    transition: {
      duration: FRAME_DURATION,
      times: FRAME_TIMES,
      ease: ['easeOut', [0.4, 0, 0.2, 1], MARK_LAND],
    },
  }),
};

const ZoomOutAreaIcon = forwardRef<ZoomOutAreaIconHandle, ZoomOutAreaIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const { handleMouseEnter, handleMouseLeave } = useIconAnimation({
      controls,
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
            variants={lensVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 14.5 / 24, originY: 14.5 / 24 }}
          >
            <path
              d="M18.5016 18.5L21 21M20 14.5C20 11.4624 17.5376 9 14.5 9C11.4624 9 9 11.4624 9 14.5C9 17.5376 11.4624 20 14.5 20C17.5376 20 20 17.5376 20 14.5Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M16.5 14.5H12.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </motion.g>
          <motion.path
            d="M10 3H14"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={cornerVariants}
            custom={[0, 1]}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M3 10V14"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={cornerVariants}
            custom={[1, 0]}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M6.5 21C4.567 21 3 19.433 3 17.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={cornerVariants}
            custom={[1, -1]}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M17.5 3C19.433 3 21 4.567 21 6.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={cornerVariants}
            custom={[-1, 1]}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M3 6.5C3 4.567 4.567 3 6.5 3"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={cornerVariants}
            custom={[1, 1]}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

ZoomOutAreaIcon.displayName = 'ZoomOutAreaIcon';

export { ZoomOutAreaIcon };
