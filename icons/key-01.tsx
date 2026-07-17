'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface Key01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Key01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the key turns in an unseen lock, holds against the pins, and springs
// back — drawn click ticks flash at the moment it gives
const keyVariants: Variants = {
  normal: { rotate: 0, transition: { duration: 0.3 } },
  animate: {
    rotate: [0, -40, -40, 6, 0],
    transition: {
      duration: 0.9,
      ease: 'easeInOut',
      times: [0, 0.3, 0.5, 0.78, 1],
    },
  },
};

const glintVariants: Variants = {
  normal: { opacity: 1, transition: { duration: 0.3 } },
  animate: {
    opacity: [1, 0.2, 0.2, 1],
    transition: { duration: 0.9, times: [0, 0.3, 0.6, 0.85] },
  },
};

const clickVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.15 } },
  animate: {
    opacity: [0, 0, 1, 0],
    transition: { duration: 0.9, times: [0, 0.5, 0.62, 0.85], ease: 'easeOut' },
  },
};

const Key01Icon = forwardRef<Key01IconHandle, Key01IconProps>(
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
            d="M15.5 14.5C18.8137 14.5 21.5 11.8137 21.5 8.5C21.5 5.18629 18.8137 2.5 15.5 2.5C12.1863 2.5 9.5 5.18629 9.5 8.5C9.5 9.38041 9.68962 10.2165 10.0303 10.9697L2.5 18.5V21.5H5.5V19.5H7.5V17.5H9.5L13.0303 13.9697C13.7835 14.3104 14.6196 14.5 15.5 14.5Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={keyVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '15.5px 8.5px' }}
          />
          <motion.path
            d="M17.5 6.5L16.5 7.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={glintVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M22.6 4.6L23.6 3.6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={clickVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M23.2 8.5H24.6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={clickVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

Key01Icon.displayName = 'Key01Icon';

export { Key01Icon };
