'use client';

import type { Transition, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { pathAt, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface UserMultiple02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface UserMultiple02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// Each person hops, as in user: a small crouch, the head lifts off the
// shoulders, lands with a squash, and settles, while the body stretches and
// squashes on its fixed base. The person behind hops a beat after the person
// in front.
const HOP_STAGGER = 0.1;

const BODIES = [
  [
    'M11 14H7C4.23858 14 2 16.2386 2 19C2 20.1046 2.89543 21 4 21H14C15.1046 21 16 20.1046 16 19C16 16.2386 13.7614 14 11 14Z',
    'M11 13H7C4.23858 13 2 15.5584 2 18.7143C2 19.9767 2.89543 21 4 21H14C15.1046 21 16 19.9767 16 18.7143C16 15.5584 13.7614 13 11 13Z',
  ],
  [
    'M17 14C19.7614 14 22 16.2386 22 19C22 20.1046 21.1046 21 20 21H18.5',
    'M17 13C19.7614 13 22 15.5584 22 18.7143C22 19.9767 21.1046 21 20 21H18.5',
  ],
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
  animate: (order: number) => ({
    translateY: [0, 0.4, -1.9, 0.45, -0.1, 0],
    scaleY: [1, 0.95, 1.03, 0.93, 1, 1],
    transition: { ...HOP_TRANSITION, delay: order * HOP_STAGGER },
  }),
};

const bodyVariants: Variants = {
  normal: (order: number) => ({ d: BODIES[order][0] }),
  animate: (order: number) => ({
    d: HOP.map((t) => pathAt(BODIES[order], t)),
    transition: { ...HOP_TRANSITION, delay: order * HOP_STAGGER },
  }),
};

const UserMultiple02Icon = forwardRef<UserMultiple02IconHandle, UserMultiple02IconProps>(
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
            d="M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={headVariants}
            custom={0}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 9 / 24, originY: 11 / 24 }}
          />
          <motion.path
            d="M15 11C17.2091 11 19 9.20914 19 7C19 4.79086 17.2091 3 15 3"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={headVariants}
            custom={1}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 15 / 24, originY: 11 / 24 }}
          />
          <motion.path
            d="M11 14H7C4.23858 14 2 16.2386 2 19C2 20.1046 2.89543 21 4 21H14C15.1046 21 16 20.1046 16 19C16 16.2386 13.7614 14 11 14Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={bodyVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M17 14C19.7614 14 22 16.2386 22 19C22 20.1046 21.1046 21 20 21H18.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={bodyVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

UserMultiple02Icon.displayName = 'UserMultiple02Icon';

export { UserMultiple02Icon };
