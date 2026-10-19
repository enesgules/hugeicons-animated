'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface BatteryFullIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface BatteryFullIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const BATTERY_DURATION = 1.15;
const BARS = [6, 9, 12, 15];

// The cells drain right to left, refill left to right with a springy
// overshoot, and the battery surges once the last cell is full.
const barVariants: Variants = {
  normal: { scaleY: 1, visibility: 'visible' },
  animate: (i: number) => {
    const drain = 0.04 + (BARS.length - 1 - i) * 0.04;
    const fill = 0.36 + i * 0.1;
    return {
      scaleY: [1, 1, 0.1, 0.1, 1.2, 1, 1],
      visibility: ['visible', 'visible', 'hidden', 'hidden', 'visible', 'visible', 'visible'],
      transition: {
        duration: BATTERY_DURATION,
        ease: [0.23, 1, 0.32, 1],
        times: [0, drain, drain + 0.1, fill, fill + 0.1, fill + 0.18, 1],
      },
    };
  },
};

const batteryVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(1)', 'scale(1.06)', 'scale(0.985)', 'scale(1)'],
    transition: {
      duration: BATTERY_DURATION,
      ease: [0.23, 1, 0.32, 1],
      times: [0, 0.76, 0.84, 0.92, 1],
    },
  },
};

const BatteryFullIcon = forwardRef<BatteryFullIconHandle, BatteryFullIconProps>(
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
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          overflow="visible"
          variants={batteryVariants}
          animate={controls}
          initial="normal"
          style={{ transformOrigin: '45.8333% 50%' }}
        >
          <path
            d="M2 12C2 9.17157 2 7.75736 2.87868 6.87868C3.75736 6 5.17157 6 8 6H13C15.8284 6 17.2426 6 18.1213 6.87868C19 7.75736 19 9.17157 19 12C19 14.8284 19 16.2426 18.1213 17.1213C17.2426 18 15.8284 18 13 18H8C5.17157 18 3.75736 18 2.87868 17.1213C2 16.2426 2 14.8284 2 12Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
          <path
            d="M19 9.5L20.0272 9.6712C20.7085 9.78475 21.0491 9.84152 21.3076 10.0067C21.5618 10.1691 21.7612 10.4044 21.8796 10.6819C22 10.964 22 11.3093 22 12C22 12.6907 22 13.036 21.8796 13.3181C21.7612 13.5956 21.5618 13.8309 21.3076 13.9933C21.0491 14.1585 20.7085 14.2153 20.0272 14.3288L19 14.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M6 10V14"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={barVariants}
            custom={0}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 6 / 24, originY: 14 / 24 }}
          />
          <motion.path
            d="M9 10V14"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={barVariants}
            custom={1}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 9 / 24, originY: 14 / 24 }}
          />
          <motion.path
            d="M12 10V14"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={barVariants}
            custom={2}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 12 / 24, originY: 14 / 24 }}
          />
          <motion.path
            d="M15 10V14"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={barVariants}
            custom={3}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 15 / 24, originY: 14 / 24 }}
          />
        </motion.svg>
      </div>
    );
  }
);

BatteryFullIcon.displayName = 'BatteryFullIcon';

export { BatteryFullIcon };
