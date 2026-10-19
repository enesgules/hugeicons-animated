'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ViewIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ViewIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// The source outline with its lid height scaled around the eye line (y = 12).
const outline = (k: number) => {
  const y = (v: number) => +(12 + (v - 12) * k).toFixed(4);
  return `M21.544 ${y(11.045)}C21.848 ${y(11.4713)} 22 ${y(11.6845)} 22 12C22 ${y(12.3155)} 21.848 ${y(12.5287)} 21.544 ${y(12.955)}C20.1779 ${y(14.8706)} 16.6892 ${y(19)} 12 ${y(19)}C7.31078 ${y(19)} 3.8221 ${y(14.8706)} 2.45604 ${y(12.955)}C2.15201 ${y(12.5287)} 2 ${y(12.3155)} 2 12C2 ${y(11.6845)} 2.15201 ${y(11.4713)} 2.45604 ${y(11.045)}C3.8221 ${y(9.12944)} 7.31078 ${y(5)} 12 ${y(5)}C16.6892 ${y(5)} 20.1779 ${y(9.12944)} 21.544 ${y(11.045)}Z`;
};

const VIEW_OPEN = outline(1);
const VIEW_DURATION = 1;
const VIEW_TIMES = [0, 0.16, 0.34, 0.48, 0.6, 0.66, 0.8, 0.9, 1];

// The pupil glances left and right, then the lids meet in a blink and
// reopen a touch wide before settling.
const outlineVariants: Variants = {
  normal: { d: VIEW_OPEN },
  animate: {
    d: [
      VIEW_OPEN,
      VIEW_OPEN,
      VIEW_OPEN,
      VIEW_OPEN,
      outline(0),
      outline(0),
      outline(1.08),
      outline(0.98),
      VIEW_OPEN,
    ],
    transition: { duration: VIEW_DURATION, ease: 'easeInOut', times: VIEW_TIMES },
  },
};

const pupilVariants: Variants = {
  normal: { translateX: 0, scaleY: 1 },
  animate: {
    translateX: [0, -2.4, 2.2, 0, 0, 0, 0, 0, 0],
    scaleY: [1, 1, 1, 1, 0, 0, 1, 1, 1],
    transition: { duration: VIEW_DURATION, ease: 'easeInOut', times: VIEW_TIMES },
  },
};

const ViewIcon = forwardRef<ViewIconHandle, ViewIconProps>(
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
            d={VIEW_OPEN}
            stroke="currentColor"
            strokeWidth="1.5"
            variants={outlineVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={pupilVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 0.5 }}
          />
        </svg>
      </div>
    );
  }
);

ViewIcon.displayName = 'ViewIcon';

export { ViewIcon };
