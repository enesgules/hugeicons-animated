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

// The rewind ring and both hands share one motion curve. A small forward
// anticipation leads into the backward sweep, then every part overshoots and
// settles together. The hour hand turns three times and the minute hand turns
// six times, preserving Clock's 2:1 pace with much more visible rewinding.
// rest-parity: split-source-path
const HISTORY_DURATION = 0.82;
const HISTORY_TIMES = [
  0, 0.06, 0.1, 0.14, 0.21, 0.26, 0.31, 0.36, 0.41, 0.46, 0.51, 0.56, 0.61,
  0.66, 0.71, 0.77, 0.84, 0.91, 1,
];

const frameVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: {
    transform: [
      'rotate(0deg)',
      'rotate(8deg)',
      'rotate(12deg)',
      'rotate(8deg)',
      'rotate(-30deg)',
      'rotate(-60deg)',
      'rotate(-90deg)',
      'rotate(-120deg)',
      'rotate(-150deg)',
      'rotate(-180deg)',
      'rotate(-210deg)',
      'rotate(-240deg)',
      'rotate(-270deg)',
      'rotate(-300deg)',
      'rotate(-330deg)',
      'rotate(-355deg)',
      'rotate(-369deg)',
      'rotate(-366deg)',
      'rotate(-360deg)',
    ],
    transition: {
      duration: HISTORY_DURATION,
      ease: 'linear',
      times: HISTORY_TIMES,
    },
  },
};

const minuteHandVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: {
    transform: [
      'rotate(0deg)',
      'rotate(48deg)',
      'rotate(72deg)',
      'rotate(48deg)',
      'rotate(-180deg)',
      'rotate(-360deg)',
      'rotate(-540deg)',
      'rotate(-720deg)',
      'rotate(-900deg)',
      'rotate(-1080deg)',
      'rotate(-1260deg)',
      'rotate(-1440deg)',
      'rotate(-1620deg)',
      'rotate(-1800deg)',
      'rotate(-1980deg)',
      'rotate(-2130deg)',
      'rotate(-2214deg)',
      'rotate(-2196deg)',
      'rotate(-2160deg)',
    ],
    transition: {
      duration: HISTORY_DURATION,
      ease: 'linear',
      times: HISTORY_TIMES,
    },
  },
};

const hourHandVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: {
    transform: [
      'rotate(0deg)',
      'rotate(24deg)',
      'rotate(36deg)',
      'rotate(24deg)',
      'rotate(-90deg)',
      'rotate(-180deg)',
      'rotate(-270deg)',
      'rotate(-360deg)',
      'rotate(-450deg)',
      'rotate(-540deg)',
      'rotate(-630deg)',
      'rotate(-720deg)',
      'rotate(-810deg)',
      'rotate(-900deg)',
      'rotate(-990deg)',
      'rotate(-1065deg)',
      'rotate(-1107deg)',
      'rotate(-1098deg)',
      'rotate(-1080deg)',
    ],
    transition: {
      duration: HISTORY_DURATION,
      ease: 'linear',
      times: HISTORY_TIMES,
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
            style={{ transformOrigin: '12.9319px 12px' }}
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
            variants={hourHandVariants}
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
