'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface MaximizeScreenIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MaximizeScreenIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const FRAME_DURATION = 0.8;
const FRAME_TIMES = [0, 0.16, 0.4, 1];
const MARK_LAND = springEase(0.5, 0.3);
const OBJECT_LAND = springEase(0.45, 0.35);

// Frame (maximize): the window contracts for leverage, then bursts outward
// toward the full frame, and springs back.
const windowVariants: Variants = {
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

// The arrow rides the window corner through the wind-up (the corner moves
// 9 * 0.06 = 0.54 along each axis), darts along its direction, and springs back.
const ARROW_TRAVEL = [0, -0.54, 2.2, 0];
const arrowVariants: Variants = {
  normal: { transform: 'translate(0px, 0px)' },
  animate: {
    transform: ARROW_TRAVEL.map((v) => `translate(${v}px, ${-v}px)`),
    transition: {
      duration: FRAME_DURATION,
      times: FRAME_TIMES,
      ease: ['easeOut', [0.4, 0, 0.2, 1], MARK_LAND],
    },
  },
};

const MaximizeScreenIcon = forwardRef<MaximizeScreenIconHandle, MaximizeScreenIconProps>(
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
            d="M12.5667 7.93408L15.3088 8.03416C15.7163 8.04903 16.0391 8.38374 16.0391 8.79156V11.4064M10.5391 13.4341L15.5828 8.41565"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={arrowVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M2 17C2 15.1144 2 14.1716 2.58579 13.5858C3.17157 13 4.11438 13 6 13H7C8.88562 13 9.82843 13 10.4142 13.5858C11 14.1716 11 15.1144 11 17V18C11 19.8856 11 20.8284 10.4142 21.4142C9.82843 22 8.88562 22 7 22H6C4.11438 22 3.17157 22 2.58579 21.4142C2 20.8284 2 19.8856 2 18V17Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={windowVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 2 / 24, originY: 22 / 24 }}
          />
          <path
            d="M2 8.5V10.5M14 2H10M22 14V10M13.5 22H15.5M2.05986 5.5C2.21387 4.43442 2.51347 3.67903 3.09625 3.09625C3.67903 2.51347 4.43442 2.21387 5.5 2.05986M18.5 2.05986C19.5656 2.21387 20.321 2.51347 20.9037 3.09625C21.4865 3.67903 21.7861 4.43442 21.9401 5.5M21.9401 18.5C21.7861 19.5656 21.4865 20.321 20.9037 20.9037C20.321 21.4865 19.5656 21.7861 18.5 21.9401"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    );
  },
);

MaximizeScreenIcon.displayName = 'MaximizeScreenIcon';

export { MaximizeScreenIcon };
