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

// Growth: the trend line and its arrow dip toward their base, then grow past
// full size and settle. The axes stay fixed.
const trendVariants: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 0.78, 1.1, 0.97, 1],
    transition: {
      duration: 0.72,
      ease: ['easeOut', [0.23, 1, 0.32, 1], 'easeInOut', 'easeOut'],
      times: [0, 0.24, 0.58, 0.8, 1],
    },
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
            d="M7.99707 16.999C11.5286 16.999 18.9122 15.5348 18.6979 6.43269M16.4886 8.04302L18.3721 6.14612C18.5656 5.95127 18.8798 5.94981 19.0751 6.14286L20.9971 8.04302"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={trendVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', transformOrigin: '8px 17px' }}
          />
        </svg>
      </div>
    );
  }
);

ChartIncreaseIcon.displayName = 'ChartIncreaseIcon';

export { ChartIncreaseIcon };
