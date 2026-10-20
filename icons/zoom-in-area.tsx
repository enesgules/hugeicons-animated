'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ZoomInAreaIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ZoomInAreaIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// rest-parity: split-source-path
const FRAME_DURATION = 0.8;
const FRAME_TIMES = [0, 0.16, 0.4, 1];
const MARK_LAND = springEase(0.5, 0.3);
const OBJECT_LAND = springEase(0.45, 0.35);

// Frame (zoom in): the lens and the area corners contract for leverage, then
// burst outward as the lens magnifies, and spring back.
const lensVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(0.94)', 'scale(1.16)', 'scale(1)'],
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

const ZoomInAreaIcon = forwardRef<ZoomInAreaIconHandle, ZoomInAreaIconProps>(
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
            style={{ transformBox: 'view-box', originX: 14.5 / 24, originY: 15.1217 / 24 }}
          >
            <path
              d="M18.5016 19.1217L21 21.6217M20 15.1217C20 12.0842 17.5376 9.62173 14.5 9.62173C11.4624 9.62173 9 12.0842 9 15.1217C9 18.1593 11.4624 20.6217 14.5 20.6217C17.5376 20.6217 20 18.1593 20 15.1217Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M14.5 13.1217V17.1217M16.5 15.1217H12.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </motion.g>
          <motion.path
            d="M10 3.62173H14"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={cornerVariants}
            custom={[0, -1]}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M3 10.6217V14.6217"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={cornerVariants}
            custom={[-1, 0]}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M6.5 21.6217C4.567 21.6217 3 20.0547 3 18.1217"
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
            d="M17.5 3.62173C19.433 3.62173 21 5.18873 21 7.12173"
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
            d="M3 7.12173C3 5.18873 4.567 3.62173 6.5 3.62173"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={cornerVariants}
            custom={[-1, -1]}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

ZoomInAreaIcon.displayName = 'ZoomInAreaIcon';

export { ZoomInAreaIcon };
