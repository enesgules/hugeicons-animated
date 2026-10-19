'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ZoomInAreaIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ZoomInAreaIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// rest-parity: split-source-path
const ZOOM_DURATION = 0.8;
const ZOOM_TIMES = [0, 0.18, 0.55, 0.8, 1];

// Zooming in: the area corners wind in, then push outward as the lens
// magnifies, and both settle back with a small rebound.
const lensVariants: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 0.94, 1.2, 0.98, 1],
    transition: { duration: ZOOM_DURATION, times: ZOOM_TIMES, ease: 'easeInOut' },
  },
};

// Each corner piece travels along its own direction (x, y).
const FRAME_TRAVEL = [0, -0.35, 1.3, -0.15, 0];
const frameVariants: Variants = {
  normal: { translateX: 0, translateY: 0 },
  animate: ([dx, dy]: [number, number]) => ({
    translateX: FRAME_TRAVEL.map((v) => v * dx),
    translateY: FRAME_TRAVEL.map((v) => v * dy),
    transition: { duration: ZOOM_DURATION, times: ZOOM_TIMES, ease: 'easeInOut' },
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
            variants={frameVariants}
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
            variants={frameVariants}
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
            variants={frameVariants}
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
            variants={frameVariants}
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
            variants={frameVariants}
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
