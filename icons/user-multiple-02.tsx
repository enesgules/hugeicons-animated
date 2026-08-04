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

// two readable profiles gather toward one another without completing or overlapping
const primaryVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: ['translateX(-0.7px)', 'translateX(0.18px)', 'translateX(0px)'],
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
  },
};

const secondaryVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: ['translateX(0.7px)', 'translateX(-0.18px)', 'translateX(0px)'],
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
  },
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
        </svg>
      </div>
    );
  }
);

UserMultiple02Icon.displayName = 'UserMultiple02Icon';

export { UserMultiple02Icon };
