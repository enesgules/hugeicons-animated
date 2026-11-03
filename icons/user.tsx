'use client';

import type { Transition, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { pathAt, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface UserIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface UserIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// The person hops, as in user-add-01: a small crouch, the head lifts off the
// shoulders, lands with a squash, and settles. The shoulders stretch up and
// squash with it on their fixed base, so the stroke keeps its width.
const SHOULDERS = [
  'M19 20.5C19 16.634 15.866 13.5 12 13.5C8.13401 13.5 5 16.634 5 20.5',
  'M19 20.5C19 16.0817 15.866 12.5 12 12.5C8.13401 12.5 5 16.0817 5 20.5',
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

const UserIcon = forwardRef<UserIconHandle, UserIconProps>(
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
            d="M17 8.5C17 5.73858 14.7614 3.5 12 3.5C9.23858 3.5 7 5.73858 7 8.5C7 11.2614 9.23858 13.5 12 13.5C14.7614 13.5 17 11.2614 17 8.5Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={headVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 12 / 24, originY: 13.5 / 24 }}
          />
          <motion.path
            d="M19 20.5C19 16.634 15.866 13.5 12 13.5C8.13401 13.5 5 16.634 5 20.5"
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

UserIcon.displayName = 'UserIcon';

export { UserIcon };
