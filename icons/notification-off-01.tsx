'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
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

const OFF_DURATION = 1.2;
const SLASH_LAND = springEase(0.5, 0.3);

// Slash off, shared by every icon with a slash: the slash winds back and
// shoots off the bottom-right corner, the outline heals across its breaks,
// then a fresh slash darts in from the top-left corner and lands with a
// spring while the breaks reopen where it crosses.
const departingSlashVariants: Variants = {
  normal: { transform: 'translate(0px, 0px)' },
  animate: {
    transform: [
      'translate(0px, 0px)',
      'translate(-0.8px, -0.8px)',
      'translate(24px, 24px)',
      'translate(24px, 24px)',
    ],
    transition: {
      duration: OFF_DURATION,
      times: [0, 0.12, 0.34, 1],
      ease: ['easeOut', 'easeIn', 'linear'],
    },
  },
};

const arrivingSlashVariants: Variants = {
  normal: { transform: 'translate(-24px, -24px)' },
  animate: {
    transform: [
      'translate(-24px, -24px)',
      'translate(-24px, -24px)',
      'translate(1.2px, 1.2px)',
      'translate(0px, 0px)',
    ],
    transition: {
      duration: OFF_DURATION,
      times: [0, 0.6, 0.8, 1],
      ease: ['linear', [0.4, 0, 0.2, 1], SLASH_LAND],
    },
  },
};

// Each continuation draws once the departing slash has passed its break and
// retracts just before the arriving slash reaches it. A zero-length stroke
// with round caps draws a dot, so it is only visible while it has length.
const continuationVariants: Variants = {
  normal: { pathLength: 0, visibility: 'hidden' },
  animate: ([drawn, crossed]: [number, number]) => ({
    pathLength: [0, 0, 1, 1, 0, 0],
    visibility: ['hidden', 'hidden', 'visible', 'visible', 'hidden', 'hidden'],
    transition: {
      duration: OFF_DURATION,
      ease: 'easeOut',
      times: [0, drawn, drawn + 0.08, crossed - 0.015, crossed + 0.015, 1],
    },
  }),
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
              variants={continuationVariants}
              custom={[0.212, 0.653]}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d={NOTIFICATION_RIGHT_CONTINUATION}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={continuationVariants}
              custom={[0.302, 0.699]}
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
