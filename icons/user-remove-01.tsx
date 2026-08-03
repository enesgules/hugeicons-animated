'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface UserRemove01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface UserRemove01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the profile recoils from a decisive remove mark, then both settle cleanly
const personVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: ['translateX(0px) scale(1)', 'translateX(-1.5px) scale(0.97)', 'translateX(0.35px) scale(1.01)', 'translateX(0px) scale(1)'],
    transition: { duration: 0.54, ease: [0.23, 1, 0.32, 1] },
  },
};

const removeVariants: Variants = {
  normal: { transform: 'rotate(0deg) scale(1)' },
  animate: {
    transform: ['rotate(-10deg) scale(0.58)', 'rotate(12deg) scale(1.2)', 'rotate(-3deg) scale(0.98)', 'rotate(0deg) scale(1)'],
    transition: { duration: 0.5, delay: 0.06, ease: [0.23, 1, 0.32, 1] },
  },
};

const UserRemove01Icon = forwardRef<UserRemove01IconHandle, UserRemove01IconProps>(
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
            d="M14.5 8C14.5 5.23858 12.2614 3 9.5 3C6.73858 3 4.5 5.23858 4.5 8C4.5 10.7614 6.73858 13 9.5 13C12.2614 13 14.5 10.7614 14.5 8Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={personVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '9.5px 8px' }}
          />
          <motion.path
            d="M15.5 21L18.5 18M18.5 18L21.5 15M18.5 18L15.5 15M18.5 18L21.5 21"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={removeVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '18.5px 18px' }}
          />
          <motion.path
            d="M2.5 20C2.5 16.134 5.63401 13 9.5 13C10.775 13 11.9704 13.3409 13 13.9365"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={personVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '9.5px 18px' }}
          />
        </svg>
      </div>
    );
  }
);

UserRemove01Icon.displayName = 'UserRemove01Icon';

export { UserRemove01Icon };
