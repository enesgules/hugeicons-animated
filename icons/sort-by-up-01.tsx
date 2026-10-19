'use client';

import type { Easing, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface SortByUp01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SortByUp01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const SORT_DURATION = 0.95;
const SORT_TIMES = [0, 0.16, 0.6, 0.8, 0.999, 1];
const SORT_EASE: Easing[] = ['easeOut', 'easeInOut', 'easeInOut', 'easeOut', 'linear'];
const SWING_TIMES = [0, 0.16, 0.38, 0.6, 1];
const SWING_EASE: Easing[] = ['linear', 'easeOut', 'easeIn', 'linear'];

// The two items trade places: the bottom item travels upward beside the arrow
// while the other swings past on the outer side, both shrinking as they cross.
// They land in each other's slot, so the last frame equals the rest pose.
const itemVariants: Variants = {
  normal: { translateX: 0, translateY: 0, scale: 1 },
  animate: (i: number) => {
    const lead = i === 1;
    const travel = i === 0 ? 11 : -11;
    const back = i === 0 ? -0.7 : 0.7;
    const over = i === 0 ? 0.5 : -0.5;
    return {
      translateY: [0, back, travel + over, travel, travel, 0],
      translateX: [0, 0, lead ? 3.1 : -3.5, 0, 0],
      scale: [1, 1, 0.65, 1, 1],
      transition: {
        translateY: { duration: SORT_DURATION, times: SORT_TIMES, ease: SORT_EASE },
        translateX: { duration: SORT_DURATION, times: SWING_TIMES, ease: SWING_EASE },
        scale: { duration: SORT_DURATION, times: SWING_TIMES, ease: 'easeInOut' },
      },
    };
  },
};

// The arrow winds up against its direction, then pushes the order upward.
const arrowVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, 0.8, -1.6, 0.3, 0],
    transition: {
      duration: SORT_DURATION,
      times: [0, 0.16, 0.5, 0.78, 1],
      ease: 'easeInOut',
    },
  },
};

const SortByUp01Icon = forwardRef<SortByUp01IconHandle, SortByUp01IconProps>(
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
            d="M14.9998 7.67356L16.4088 6.187C17.1588 5.39573 17.5338 5.00009 17.9998 5.00009C18.4658 5.00009 18.8408 5.39573 19.5908 6.18701L20.9998 7.67356M17.9998 5.08732L17.9998 9.46241C17.9998 11.6959 17.9998 12.8126 17.553 13.7973C17.1061 14.7821 16.2657 15.5174 14.5849 16.9882L13.9998 17.5001"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={arrowVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M3 6.5C3 5.27489 3 4.66233 3.23842 4.1944C3.44815 3.78279 3.78279 3.44815 4.1944 3.23842C4.66233 3 5.27489 3 6.5 3C7.72511 3 8.33767 3 8.8056 3.23842C9.21721 3.44815 9.55185 3.78279 9.76158 4.1944C10 4.66233 10 5.27489 10 6.5C10 7.72511 10 8.33767 9.76158 8.8056C9.55185 9.21721 9.21721 9.55185 8.8056 9.76158C8.33767 10 7.72511 10 6.5 10C5.27489 10 4.66233 10 4.1944 9.76158C3.78279 9.55185 3.44815 9.21721 3.23842 8.8056C3 8.33767 3 7.72511 3 6.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={itemVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M3 17.5C3 16.2749 3 15.6623 3.23842 15.1944C3.44815 14.7828 3.78279 14.4481 4.1944 14.2384C4.66233 14 5.27489 14 6.5 14C7.72511 14 8.33767 14 8.8056 14.2384C9.21721 14.4481 9.55185 14.7828 9.76158 15.1944C10 15.6623 10 16.2749 10 17.5C10 18.7251 10 19.3377 9.76158 19.8056C9.55185 20.2172 9.21721 20.5519 8.8056 20.7616C8.33767 21 7.72511 21 6.5 21C5.27489 21 4.66233 21 4.1944 20.7616C3.78279 20.5519 3.44815 20.2172 3.23842 19.8056C3 19.3377 3 18.7251 3 17.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={itemVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

SortByUp01Icon.displayName = 'SortByUp01Icon';

export { SortByUp01Icon };
