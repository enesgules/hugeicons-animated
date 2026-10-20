'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface PreviousIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PreviousIconProps extends HTMLAttributes<HTMLDivElement> {
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
      'translateX(1.4px) scaleX(0.88) scaleY(1.04)',
      'translateX(-1.8px) scaleX(1.08) scaleY(0.97)',
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
    translateX: [0, 0, -1.5, 0],
    transition: {
      duration: MEDIA_DURATION,
      delay: 0.04,
      times: MEDIA_TIMES,
      ease: ['easeOut', [0.4, 0, 0.2, 1], MEDIA_LAND],
    },
  },
};

const PreviousIcon = forwardRef<PreviousIconHandle, PreviousIconProps>(
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
            d="M8.06492 12.6258C8.31931 13.8374 9.67295 14.7077 12.3802 16.4481C15.3247 18.3411 16.797 19.2876 17.9895 18.9229C18.3934 18.7994 18.7654 18.5823 19.0777 18.2876C20 17.4178 20 15.6118 20 12C20 8.38816 20 6.58224 19.0777 5.71235C18.7654 5.41773 18.3934 5.20057 17.9895 5.07707C16.797 4.71243 15.3247 5.6589 12.3802 7.55186C9.67295 9.29233 8.31931 10.1626 8.06492 11.3742C7.97836 11.7865 7.97836 12.2135 8.06492 12.6258Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={triangleVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 14 / 24, originY: 0.5 }}
          />
          <motion.path
            d="M4 4L4 20"
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

PreviousIcon.displayName = 'PreviousIcon';

export { PreviousIcon };
