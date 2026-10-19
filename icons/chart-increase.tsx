'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ChartIncreaseIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ChartIncreaseIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// The trend retracts toward its base with the arrowhead riding back down the
// curve, turning with it, then shoots up to the tip and overshoots along the
// final heading before it settles. Arrow keyframes are sampled from the curve.
// rest-parity: split-source-path
const TREND_DURATION = 1;
const TREND_TIMES = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

const lineVariants: Variants = {
  normal: { pathLength: 1 },
  animate: {
    pathLength: [1, 0.956, 0.65, 0.344, 0.3, 0.351, 0.71, 1, 1, 1, 1],
    transition: { duration: TREND_DURATION, ease: 'linear', times: TREND_TIMES },
  },
};

const arrowVariants: Variants = {
  normal: { transform: 'translate(0px, 0px) rotate(0deg)' },
  animate: {
    transform: [
      'translate(0px, 0px) rotate(0deg)',
      'translate(0px, 0.75px) rotate(2.7deg)',
      'translate(-1.24px, 5.78px) rotate(30.4deg)',
      'translate(-5.00px, 9.31px) rotate(65.0deg)',
      'translate(-5.68px, 9.61px) rotate(69.0deg)',
      'translate(-4.89px, 9.25px) rotate(64.2deg)',
      'translate(-0.79px, 4.85px) rotate(23.7deg)',
      'translate(-0.01px, -0.52px) rotate(0deg)',
      'translate(-0.02px, -0.90px) rotate(0deg)',
      'translate(-0.01px, -0.45px) rotate(0deg)',
      'translate(0px, 0px) rotate(0deg)',
    ],
    transition: { duration: TREND_DURATION, ease: 'linear', times: TREND_TIMES },
  },
};

const ChartIncreaseIcon = forwardRef<ChartIncreaseIconHandle, ChartIncreaseIconProps>(
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
          <path
            d="M21 21H10C6.70017 21 5.05025 21 4.02513 19.9749C3 18.9497 3 17.2998 3 14V3"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M7.99707 16.999C11.5286 16.999 18.9122 15.5348 18.6979 6.43269"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={lineVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M16.4886 8.04302L18.3721 6.14612C18.5656 5.95127 18.8798 5.94981 19.0751 6.14286L20.9971 8.04302"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={arrowVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 18.6979 / 24, originY: 6.43269 / 24 }}
          />
        </svg>
      </div>
    );
  }
);

ChartIncreaseIcon.displayName = 'ChartIncreaseIcon';

export { ChartIncreaseIcon };
