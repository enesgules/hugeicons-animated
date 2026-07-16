'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface UserIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface UserIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// a friendly nod — the head bobs first, shoulders follow
const headVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, -1.5, 0],
    transition: { duration: 0.5, ease: 'easeInOut', times: [0, 0.35, 1] },
  },
};

const bodyVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, -0.8, 0],
    transition: { duration: 0.45, ease: 'easeInOut', delay: 0.08 },
  },
};

const UserIcon = forwardRef<UserIconHandle, UserIconProps>(
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
            d="M17 8.5C17 5.73858 14.7614 3.5 12 3.5C9.23858 3.5 7 5.73858 7 8.5C7 11.2614 9.23858 13.5 12 13.5C14.7614 13.5 17 11.2614 17 8.5Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={headVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M19 20.5C19 16.634 15.866 13.5 12 13.5C8.13401 13.5 5 16.634 5 20.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={bodyVariants}
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
