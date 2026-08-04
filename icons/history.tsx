'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface HistoryIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface HistoryIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the history frame stays fixed while only the minute hand runs backward
const HISTORY_REST = 'M12.9319 7V12L15.9319 14';

const handVariants: Variants = {
  normal: { d: HISTORY_REST },
  animate: {
    d: [
      HISTORY_REST,
      'M12.9319 7V12L15.5319 9.6',
      'M12.9319 7V12L10.3319 9.6',
      'M12.9319 7V12L10.3319 14.4',
      HISTORY_REST,
    ],
    transition: { duration: 0.76, ease: [0.77, 0, 0.175, 1], times: [0, 0.22, 0.48, 0.72, 1] },
  },
};

const HistoryIcon = forwardRef<HistoryIconHandle, HistoryIconProps>(
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
            d="M4.43186 14.9656C5.65759 18.4791 9.00032 21 12.9318 21C17.9024 21 21.9318 16.9706 21.9318 12C21.9318 7.02944 17.9024 3 12.9318 3C9.23111 3 5.83124 5.6756 4.62227 8.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M12.9319 7V12L15.9319 14"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={handVariants}
            animate={controls}
            initial="normal"
          />
          <path
            d="M8.43054 8.74363C8.43054 8.74363 4.74691 9.3026 4.1879 8.7436C3.62888 8.1846 4.18791 4.50098 4.18791 4.50098"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    );
  }
);

HistoryIcon.displayName = 'HistoryIcon';

export { HistoryIcon };
