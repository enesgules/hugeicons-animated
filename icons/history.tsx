'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface HistoryIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface HistoryIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// Turn, backward for history: the rewind ring and the hour hand wind up
// forward, whip one full turn back a little past rest, and land with a
// spring. The minute hand runs at twice the pace; more turns would strobe.
// rest-parity: split-source-path
const TURN_LAND = springEase(0.45, 0.35);

const frameVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: {
    transform: ['rotate(0deg)', 'rotate(18deg)', 'rotate(-384deg)', 'rotate(-360deg)'],
    transition: {
      duration: 0.8,
      times: [0, 0.15, 0.55, 1],
      ease: ['easeOut', [0.4, 0, 0.2, 1], TURN_LAND],
    },
  },
};

const minuteHandVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: {
    transform: ['rotate(0deg)', 'rotate(36deg)', 'rotate(-768deg)', 'rotate(-720deg)'],
    transition: {
      duration: 0.8,
      times: [0, 0.15, 0.55, 1],
      ease: ['easeOut', [0.4, 0, 0.2, 1], TURN_LAND],
    },
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
          <motion.g
            variants={frameVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 12.9319 / 24, originY: 0.5 }}
          >
            <path
              d="M4.43186 14.9656C5.65759 18.4791 9.00032 21 12.9318 21C17.9024 21 21.9318 16.9706 21.9318 12C21.9318 7.02944 17.9024 3 12.9318 3C9.23111 3 5.83124 5.6756 4.62227 8.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M8.43054 8.74363C8.43054 8.74363 4.74691 9.3026 4.1879 8.7436C3.62888 8.1846 4.18791 4.50098 4.18791 4.50098"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </motion.g>
          <motion.g
            variants={minuteHandVariants}
            animate={controls}
            initial="normal"
            style={{
              transformBox: 'view-box',
              originX: 12.9319 / 24,
              originY: 0.5,
            }}
          >
            <path
              d="M12.9319 7V12"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </motion.g>
          <motion.g
            variants={frameVariants}
            animate={controls}
            initial="normal"
            style={{
              transformBox: 'view-box',
              originX: 12.9319 / 24,
              originY: 0.5,
            }}
          >
            <path
              d="M12.9319 12L15.9319 14"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

HistoryIcon.displayName = 'HistoryIcon';

export { HistoryIcon };
