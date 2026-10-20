'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface NextIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface NextIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const MEDIA_LAND = springEase(0.5, 0.3);
const MEDIA_DURATION = 0.8;
const MEDIA_TIMES = [0, 0.16, 0.4, 1];

// Media: the triangle compresses back, releases toward the stop bar, and lands
// with a spring; the bar takes the push a moment later.
const triangleVariants: Variants = {
  normal: { transform: 'translateX(0px) scaleX(1) scaleY(1)' },
  animate: {
    transform: [
      'translateX(0px) scaleX(1) scaleY(1)',
      'translateX(-1.4px) scaleX(0.88) scaleY(1.04)',
      'translateX(1.8px) scaleX(1.08) scaleY(0.97)',
      'translateX(0px) scaleX(1) scaleY(1)',
    ],
    transition: {
      duration: MEDIA_DURATION,
      times: MEDIA_TIMES,
      ease: ['easeOut', [0.4, 0, 0.2, 1], MEDIA_LAND],
    },
  },
};

const barVariants: Variants = {
  normal: { translateX: 0 },
  animate: {
    translateX: [0, 0, 1.5, 0],
    transition: {
      duration: MEDIA_DURATION,
      delay: 0.04,
      times: MEDIA_TIMES,
      ease: ['easeOut', [0.4, 0, 0.2, 1], MEDIA_LAND],
    },
  },
};

const NextIcon = forwardRef<NextIconHandle, NextIconProps>(
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
            d="M15.9351 12.6258C15.6807 13.8374 14.327 14.7077 11.6198 16.4481C8.67528 18.3411 7.20303 19.2876 6.01052 18.9229C5.60662 18.7994 5.23463 18.5823 4.92227 18.2876C4 17.4178 4 15.6118 4 12C4 8.38816 4 6.58224 4.92227 5.71235C5.23463 5.41773 5.60662 5.20057 6.01052 5.07707C7.20304 4.71243 8.67528 5.6589 11.6198 7.55186C14.327 9.29233 15.6807 10.1626 15.9351 11.3742C16.0216 11.7865 16.0216 12.2135 15.9351 12.6258Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={triangleVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 10 / 24, originY: 0.5 }}
          />
          <motion.path
            d="M20 5V19"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={barVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

NextIcon.displayName = 'NextIcon';

export { NextIcon };
