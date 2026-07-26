'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface UserRemove01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface UserRemove01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the profile recedes slightly as the remove mark closes decisively
const personVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: ['translateX(0px)', 'translateX(-0.7px)', 'translateX(0px)'],
    transition: { duration: 0.42, ease: [0.23, 1, 0.32, 1] },
  },
};

const removeVariants: Variants = {
  normal: { transform: 'rotate(0deg) scale(1)' },
  animate: {
    transform: ['rotate(0deg) scale(0.76)', 'rotate(8deg) scale(1.1)', 'rotate(0deg) scale(1)'],
    transition: { duration: 0.42, delay: 0.04, ease: [0.23, 1, 0.32, 1] },
  },
};

const UserRemove01Icon = forwardRef<UserRemove01IconHandle, UserRemove01IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start('animate'),
        stopAnimation: () => controls.start('normal'),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) controls.start('animate');
        else onMouseEnter?.(e);
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) controls.start('normal');
        else onMouseLeave?.(e);
      },
      [controls, onMouseLeave]
    );

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
