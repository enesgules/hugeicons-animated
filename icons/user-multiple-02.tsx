'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface UserMultiple02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface UserMultiple02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const NOD_LAND = springEase(0.45, 0.35);
// The person behind nods one beat after the person in front.
const NOD_STAGGER = 0.1;

// People nod, shared by every user icon: the shoulders lift for a breath and
// then settle down on their base, the head rides on them and nods forward on
// its neck, and both land with a spring. Each person nods in turn.
const headVariants: Variants = {
  normal: { transform: 'translateY(0px) rotate(0deg)' },
  animate: (order: number) => ({
    transform: [
      'translateY(0px) rotate(0deg)',
      'translateY(-0.28px) rotate(-6deg)',
      'translateY(0.7px) rotate(16deg)',
      'translateY(0px) rotate(0deg)',
    ],
    transition: {
      duration: 0.8,
      delay: order * NOD_STAGGER,
      times: [0, 0.16, 0.4, 1],
      ease: ['easeOut', [0.4, 0, 0.2, 1], NOD_LAND],
    },
  }),
};

const shouldersVariants: Variants = {
  normal: { transform: 'scaleY(1)' },
  animate: (order: number) => ({
    transform: ['scaleY(1)', 'scaleY(1.04)', 'scaleY(0.9)', 'scaleY(1)'],
    transition: {
      duration: 0.8,
      delay: order * NOD_STAGGER,
      times: [0, 0.16, 0.4, 1],
      ease: ['easeOut', [0.4, 0, 0.2, 1], NOD_LAND],
    },
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
            variants={shouldersVariants}
            custom={0}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 9 / 24, originY: 21 / 24 }}
          />
          <motion.path
            d="M17 14C19.7614 14 22 16.2386 22 19C22 20.1046 21.1046 21 20 21H18.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={shouldersVariants}
            custom={1}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 20 / 24, originY: 21 / 24 }}
          />
        </svg>
      </div>
    );
  }
);

UserMultiple02Icon.displayName = 'UserMultiple02Icon';

export { UserMultiple02Icon };
