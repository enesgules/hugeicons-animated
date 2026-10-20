'use client';

import type { Easing, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface EyeIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface EyeIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// The source outline with its lid height scaled around the eye line (y = 14).
const outline = (k: number) => {
  const y = (v: number) => +(14 + (v - 14) * k).toFixed(4);
  return `M21.544 ${y(13.045)}C21.848 ${y(13.4713)} 22 ${y(13.6845)} 22 14C22 ${y(14.3155)} 21.848 ${y(14.5287)} 21.544 ${y(14.955)}C20.1779 ${y(16.8706)} 16.6892 ${y(21)} 12 ${y(21)}C7.31078 ${y(21)} 3.8221 ${y(16.8706)} 2.45604 ${y(14.955)}C2.15201 ${y(14.5287)} 2 ${y(14.3155)} 2 14C2 ${y(13.6845)} 2.15201 ${y(13.4713)} 2.45604 ${y(13.045)}C3.8221 ${y(11.1294)} 7.31078 ${y(7)} 12 ${y(7)}C16.6892 ${y(7)} 20.1779 ${y(11.1294)} 21.544 ${y(13.045)}Z`;
};

const EYE_OPEN = outline(1);
const BLINK = springEase(0.45, 0.35);
const BLINK_DURATION = 1;
const BLINK_TIMES = [0, 0.16, 0.34, 0.5, 0.62, 0.68, 1];
const BLINK_EASE: Easing[] = ['easeOut', [0.4, 0, 0.2, 1], 'easeInOut', 'easeIn', 'linear', BLINK];
const LIDS = [1, 1, 1, 1, 0, 0, 1];
const GLANCE = [0, -2.2, 2, 0, 0, 0, 0];

// Glance and blink, shared by the eye icons: the pupil glances left and right,
// the lids meet, and the eye springs open a touch wide before it settles.
// The brow dips with the blink.
const outlineVariants: Variants = {
  normal: { d: EYE_OPEN },
  animate: {
    d: LIDS.map(outline),
    transition: { duration: BLINK_DURATION, times: BLINK_TIMES, ease: BLINK_EASE },
  },
};

const pupilVariants: Variants = {
  normal: { transform: 'translateX(0px) scaleY(1)' },
  animate: {
    transform: GLANCE.map((x, i) => `translateX(${x}px) scaleY(${LIDS[i]})`),
    transition: { duration: BLINK_DURATION, times: BLINK_TIMES, ease: BLINK_EASE },
  },
};

const browVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: LIDS.map((k) => `translateY(${(1 - k) * 0.7}px)`),
    transition: { duration: BLINK_DURATION, times: BLINK_TIMES, ease: BLINK_EASE },
  },
};

const EyeIcon = forwardRef<EyeIconHandle, EyeIconProps>(
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
            d="M2 8C2 8 6.47715 3 12 3C17.5228 3 22 8 22 8"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={browVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d={EYE_OPEN}
            stroke="currentColor"
            strokeWidth="1.5"
            variants={outlineVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M15 14C15 12.3431 13.6569 11 12 11C10.3431 11 9 12.3431 9 14C9 15.6569 10.3431 17 12 17C13.6569 17 15 15.6569 15 14Z"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={pupilVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 14 / 24 }}
          />
        </svg>
      </div>
    );
  }
);

EyeIcon.displayName = 'EyeIcon';

export { EyeIcon };
