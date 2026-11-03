'use client';

import type { Transition, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { pathAt, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface UserCircleIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface UserCircleIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// The person hops, as in user: a small crouch, the head lifts off the
// shoulders, lands with a squash, and settles. The shoulders stretch and
// squash on their ends, which stay on the ring.
const SHOULDERS = [
  'M18 20C18 16.6863 15.3137 14 12 14C8.68629 14 6 16.6863 6 20',
  'M18 20C18 16.134 15.3137 13 12 13C8.68629 13 6 16.134 6 20',
];

// Height of the hop at each beat: up is positive.
const HOP = [0, -0.4, 0.9, -0.45, 0.06, 0];
const HOP_DURATION = 0.8;
const HOP_TRANSITION: Transition = {
  duration: HOP_DURATION,
  times: [0, 0.14, 0.4, 0.64, 0.82, 1],
  ease: [
    'easeOut',
    [0.23, 1, 0.32, 1],
    [0.55, 0, 1, 0.45],
    [0.23, 1, 0.32, 1],
    'easeInOut',
  ],
};

const headVariants: Variants = {
  normal: { translateY: 0, scaleY: 1 },
  animate: {
    translateY: [0, 0.4, -1.9, 0.45, -0.1, 0],
    scaleY: [1, 0.95, 1.03, 0.93, 1, 1],
    transition: HOP_TRANSITION,
  },
};

const shouldersVariants: Variants = {
  normal: { d: SHOULDERS[0] },
  animate: {
    d: HOP.map((t) => pathAt(SHOULDERS, t)),
    transition: HOP_TRANSITION,
  },
};

const UserCircleIcon = forwardRef<UserCircleIconHandle, UserCircleIconProps>(
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
            d="M15.5 10.5C15.5 8.567 13.933 7 12 7C10.067 7 8.5 8.567 8.5 10.5C8.5 12.433 10.067 14 12 14C13.933 14 15.5 12.433 15.5 10.5Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={headVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 14 / 24 }}
          />
          <path
            d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M18 20C18 16.6863 15.3137 14 12 14C8.68629 14 6 16.6863 6 20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={shouldersVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

UserCircleIcon.displayName = 'UserCircleIcon';

export { UserCircleIcon };
