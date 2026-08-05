'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface NotificationOff01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface NotificationOff01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// rest-parity: split-source-path

const NOTIFICATION_OFF_TOP_RIGHT =
  'M21 16.2311C21 15.762 20.8136 15.3121 20.4819 14.9803L19.8787 14.3771C19.3161 13.8145 19 13.0514 19 12.2558V9.5C19 5.634 15.866 2.5 12 2.5C10.4497 2.5 9.01706 3.00399 7.85707 3.85707';
const NOTIFICATION_OFF_BOTTOM_LEFT =
  'M4.76887 18C3.79195 18 3 17.208 3 16.2311C3 15.762 3.18636 15.3121 3.51809 14.9803L4.12132 14.3771C4.68393 13.8145 5 13.0514 5 12.2558V9.5C5 8.20839 5.34981 6.99849 5.95987 5.95987';
const NOTIFICATION_TOP_CONTINUATION =
  'M5.95987 5.95987C6.441 5.031 7.077 4.325 7.85707 3.85707';
const NOTIFICATION_RIGHT_CONTINUATION =
  'M21 16.2311C21 17.208 20.208 18 19.2311 18H18';

const OFF_DURATION = 1.12;
const OFF_TIMES = [
  0, 0.05, 0.1, 0.16, 0.24, 0.34, 0.44, 0.56, 0.68, 0.76, 0.82, 0.87,
  0.92, 0.97, 1,
];

const departingSlashVariants: Variants = {
  normal: {
    transform: 'translate(0px, 0px)',
    transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] },
  },
  animate: {
    transform: [
      'translate(0px, 0px)',
      'translate(0.8px, 0.8px)',
      'translate(4px, 4px)',
      'translate(24px, 24px)',
      'translate(24px, 24px)',
      'translate(24px, 24px)',
      'translate(24px, 24px)',
      'translate(24px, 24px)',
      'translate(24px, 24px)',
      'translate(24px, 24px)',
      'translate(24px, 24px)',
      'translate(24px, 24px)',
      'translate(24px, 24px)',
      'translate(24px, 24px)',
      'translate(24px, 24px)',
    ],
    transition: { duration: OFF_DURATION, ease: 'linear', times: OFF_TIMES },
  },
};

const leadingContinuationVariants: Variants = {
  normal: {
    pathLength: 0,
    transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] },
  },
  animate: {
    pathLength: [0, 0, 0, 0.12, 0.62, 1, 1, 1, 1, 1, 0.62, 0.2, 0, 0, 0],
    transition: { duration: OFF_DURATION, ease: 'linear', times: OFF_TIMES },
  },
};

const trailingContinuationVariants: Variants = {
  normal: {
    pathLength: 0,
    transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] },
  },
  animate: {
    pathLength: [0, 0, 0, 0, 0.25, 0.7, 1, 1, 1, 1, 1, 1, 0.8, 0.3, 0],
    transition: { duration: OFF_DURATION, ease: 'linear', times: OFF_TIMES },
  },
};

const arrivingSlashVariants: Variants = {
  normal: {
    transform: 'translate(-24px, -24px)',
    transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] },
  },
  animate: {
    transform: [
      'translate(-24px, -24px)',
      'translate(-24px, -24px)',
      'translate(-24px, -24px)',
      'translate(-24px, -24px)',
      'translate(-24px, -24px)',
      'translate(-24px, -24px)',
      'translate(-24px, -24px)',
      'translate(-24px, -24px)',
      'translate(-24px, -24px)',
      'translate(-24px, -24px)',
      'translate(-18px, -18px)',
      'translate(-9px, -9px)',
      'translate(-3px, -3px)',
      'translate(-0.6px, -0.6px)',
      'translate(0px, 0px)',
    ],
    transition: { duration: OFF_DURATION, ease: 'linear', times: OFF_TIMES },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: { visibility: 'visible', transition: { duration: 0 } },
};

const NotificationOff01Icon = forwardRef<NotificationOff01IconHandle, NotificationOff01IconProps>(
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
          overflow="hidden"
        >
          <path
            d="M15.5 18C15.5 19.933 13.933 21.5 12 21.5C10.067 21.5 8.5 19.933 8.5 18"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M2 2L22 22"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={departingSlashVariants}
            animate={controls}
            initial="normal"
          />
          <path
            d={NOTIFICATION_OFF_TOP_RIGHT}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d={NOTIFICATION_OFF_BOTTOM_LEFT}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M5.95987 5.95987L18 18"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={departingSlashVariants}
            animate={controls}
            initial="normal"
          />
          <path
            d="M18 18H4.76887"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            <motion.path
              d={NOTIFICATION_TOP_CONTINUATION}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={leadingContinuationVariants}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d={NOTIFICATION_RIGHT_CONTINUATION}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={trailingContinuationVariants}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d="M2 2L22 22"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={arrivingSlashVariants}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d="M5.95987 5.95987L18 18"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={arrivingSlashVariants}
              animate={controls}
              initial="normal"
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

NotificationOff01Icon.displayName = 'NotificationOff01Icon';

export { NotificationOff01Icon };
