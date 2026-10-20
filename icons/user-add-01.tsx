'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface UserAdd01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface UserAdd01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the profile gives a buoyant nod and the add mark answers beside it
const personVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px) scale(1)', 'translateY(-1.5px) scale(1.03)', 'translateY(0.5px) scale(0.98)', 'translateY(0px) scale(1)'],
    transition: { duration: 0.56, ease: [0.23, 1, 0.32, 1] },
  },
};

const plusVariants: Variants = {
  normal: { transform: 'rotate(0deg) scale(1)' },
  animate: {
    transform: ['rotate(-16deg) scale(0.5)', 'rotate(5deg) scale(1.2)', 'rotate(-2deg) scale(0.98)', 'rotate(0deg) scale(1)'],
    transition: { duration: 0.5, delay: 0.08, ease: [0.23, 1, 0.32, 1] },
  },
};

const UserAdd01Icon = forwardRef<UserAdd01IconHandle, UserAdd01IconProps>(
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
            variants={personVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '10px 10px' }}
          />
          <motion.path
            d="M17.5 21L17.5 14M14 17.5H21"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={plusVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '17.5px 17.5px' }}
          />
          <motion.path
            d="M3 20C3 16.134 6.13401 13 10 13C11.4872 13 12.8662 13.4638 14 14.2547"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={personVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '10px 18px' }}
          />
        </svg>
      </div>
    );
  }
);

UserAdd01Icon.displayName = 'UserAdd01Icon';

export { UserAdd01Icon };
