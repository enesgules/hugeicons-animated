'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface UserCheck01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface UserCheck01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the profile nods while the confirmation stroke draws and lands beside it
const userVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px)', 'translateY(-1.1px)', 'translateY(0.45px)', 'translateY(0px)'],
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
  },
};

const checkVariants: Variants = {
  normal: { transform: 'scale(1)', pathLength: 1 },
  animate: {
    transform: ['scale(0.72)', 'scale(1.13)', 'scale(0.97)', 'scale(1)'],
    pathLength: [0, 1, 1, 1],
    transition: { duration: 0.5, delay: 0.08, ease: [0.23, 1, 0.32, 1] },
  },
};

const UserCheck01Icon = forwardRef<UserCheck01IconHandle, UserCheck01IconProps>(
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
            d="M15 8C15 5.23858 12.7614 3 10 3C7.23858 3 5 5.23858 5 8C5 10.7614 7.23858 13 10 13C12.7614 13 15 10.7614 15 8Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={userVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '10px 8px' }}
          />
          <motion.path
            d="M3 20C3 16.134 6.13401 13 10 13C11.9587 13 13.7295 13.8045 15 15.101"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={userVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '10px 18px' }}
          />
          <motion.path
            d="M13 18.5C13 18.5 14.3485 19.0067 15 21C15 21 18.1765 16 21 15"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={checkVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '17px 18px' }}
          />
        </svg>
      </div>
    );
  }
);

UserCheck01Icon.displayName = 'UserCheck01Icon';

export { UserCheck01Icon };
