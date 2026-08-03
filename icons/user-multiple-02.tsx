'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface UserMultiple02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface UserMultiple02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the cropped secondary profile completes into a whole person, then returns
const primaryVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(0.97)', 'scale(1.015)', 'scale(1)'],
    transition: { duration: 0.68, ease: [0.23, 1, 0.32, 1], times: [0, 0.24, 0.64, 1] },
  },
};

const secondaryVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(1.02)', 'scale(0.985)', 'scale(1)'],
    transition: { duration: 0.68, delay: 0.03, ease: [0.23, 1, 0.32, 1], times: [0, 0.24, 0.64, 1] },
  },
};

const completionVariants: Variants = {
  normal: { pathLength: 0, opacity: 0 },
  animate: (i: number) => ({
    pathLength: [0, 1, 1, 0],
    opacity: [0, 1, 1, 0],
    transition: {
      duration: 0.68,
      delay: i * 0.035,
      ease: [0.23, 1, 0.32, 1],
      times: [0, 0.38, 0.72, 1],
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
            variants={primaryVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '9px 7px' }}
          />
          <motion.path
            d="M15 11C17.2091 11 19 9.20914 19 7C19 4.79086 17.2091 3 15 3"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={secondaryVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '15px 7px' }}
          />
          <motion.path
            d="M11 14H7C4.23858 14 2 16.2386 2 19C2 20.1046 2.89543 21 4 21H14C15.1046 21 16 20.1046 16 19C16 16.2386 13.7614 14 11 14Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={primaryVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '9px 19px' }}
          />
          <motion.path
            d="M17 14C19.7614 14 22 16.2386 22 19C22 20.1046 21.1046 21 20 21H18.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={secondaryVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '18px 19px' }}
          />
          <motion.path
            d="M15 3C12.7909 3 11 4.79086 11 7C11 9.20914 12.7909 11 15 11"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={completionVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M18.5 21H14C12.8954 21 12 20.1046 12 19C12 16.2386 14.2386 14 17 14"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={completionVariants}
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
