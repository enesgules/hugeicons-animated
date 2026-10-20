'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface MinimizeScreenIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MinimizeScreenIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const FRAME_DURATION = 0.8;
const FRAME_TIMES = [0, 0.16, 0.4, 1];
const MARK_LAND = springEase(0.5, 0.3);
const OBJECT_LAND = springEase(0.45, 0.35);

// Frame (minimize): the window winds outward, then bursts inward toward its
// target size, and springs back.
const windowVariants: Variants = {
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

// The arrow rides the window corner through the wind-up (the corner moves
// 9 * 0.06 = 0.54 along each axis), darts along its direction, and springs back.
const ARROW_TRAVEL = [0, 0.54, 2.2, 0];
const arrowVariants: Variants = {
  normal: { transform: 'translate(0px, 0px)' },
  animate: {
    transform: ARROW_TRAVEL.map((v) => `translate(${-v}px, ${v}px)`),
    transition: {
      duration: FRAME_DURATION,
      times: FRAME_TIMES,
      ease: ['easeOut', [0.4, 0, 0.2, 1], MARK_LAND],
    },
  },
};

const MinimizeScreenIcon = forwardRef<MinimizeScreenIconHandle, MinimizeScreenIconProps>(
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
            d="M11.4333 16.0659L8.6912 15.9658C8.28365 15.951 7.96094 15.6163 7.96094 15.2084L7.96094 12.5936M13.4609 10.5659L8.41716 15.5843"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={arrowVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M22 7C22 8.8856 22 9.8284 21.4142 10.4142C20.8284 11 19.8856 11 18 11H17C15.1144 11 14.1716 11 13.5858 10.4142C13 9.8284 13 8.8856 13 7L13 6C13 4.1144 13 3.1716 13.5858 2.5858C14.1716 2 15.1144 2 17 2L18 2C19.8856 2 20.8284 2 21.4142 2.5858C22 3.1716 22 4.1144 22 6V7Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={windowVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 22 / 24, originY: 2 / 24 }}
          />
          <path
            d="M22 15.5V13.5M10 22H14M2 10L2 14M10.5 2L8.5 2M21.9401 18.5C21.7861 19.5656 21.4865 20.321 20.9037 20.9038C20.321 21.4865 19.5656 21.7861 18.5 21.9401M5.5 21.9401C4.4344 21.7861 3.679 21.4865 3.0963 20.9037C2.5135 20.321 2.2139 19.5656 2.0599 18.5M2.0599 5.5C2.2139 4.4344 2.5135 3.679 3.0963 3.0963C3.679 2.5135 4.4344 2.2139 5.5 2.0599"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    );
  }
);

MinimizeScreenIcon.displayName = 'MinimizeScreenIcon';

export { MinimizeScreenIcon };
