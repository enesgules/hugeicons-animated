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

// the history ring pulls backward while the clock hand races to catch up
const historyVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: {
    transform: ['rotate(0deg)', 'rotate(7deg)', 'rotate(-22deg)', 'rotate(3deg)', 'rotate(0deg)'],
    transition: { duration: 0.62, ease: [0.77, 0, 0.175, 1], times: [0, 0.12, 0.48, 0.76, 1] },
  },
};

const handVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: {
    transform: ['rotate(0deg)', 'rotate(-12deg)', 'rotate(-92deg)', 'rotate(8deg)', 'rotate(0deg)'],
    transition: { duration: 0.62, ease: [0.77, 0, 0.175, 1], times: [0, 0.12, 0.48, 0.76, 1] },
  },
};

const arrowVariants: Variants = {
  normal: { transform: 'translate(0px, 0px)' },
  animate: {
    transform: ['translate(0px, 0px)', 'translate(0.5px, 0.4px)', 'translate(-1.1px, -0.8px)', 'translate(0px, 0px)'],
    transition: { duration: 0.52, ease: [0.23, 1, 0.32, 1] },
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
          <motion.path
            d="M4.43186 14.9656C5.65759 18.4791 9.00032 21 12.9318 21C17.9024 21 21.9318 16.9706 21.9318 12C21.9318 7.02944 17.9024 3 12.9318 3C9.23111 3 5.83124 5.6756 4.62227 8.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={historyVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '13px 12px' }}
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
            style={{ transformOrigin: '12.93px 12px' }}
          />
          <motion.path
            d="M8.43054 8.74363C8.43054 8.74363 4.74691 9.3026 4.1879 8.7436C3.62888 8.1846 4.18791 4.50098 4.18791 4.50098"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={arrowVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '4.5px 8.5px' }}
          />
        </svg>
      </div>
    );
  }
);

HistoryIcon.displayName = 'HistoryIcon';

export { HistoryIcon };
