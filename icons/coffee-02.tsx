'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface Coffee02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Coffee02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// while you hover, the cup stays hot. The icon's own steam is one path
// with three lockstep subpaths, so on hover it hands off to three
// independent wisps that each rise on their own clock.
const steamBaseVariants: Variants = {
  normal: { opacity: 1, transition: { duration: 0.3, delay: 0.1 } },
  animate: { opacity: 0, transition: { duration: 0.15 } },
};

const steamVariants: Variants = {
  normal: { opacity: 0, translateY: 0, transition: { duration: 0.2 } },
  animate: (i: number) => ({
    opacity: [0, 1, 1, 0],
    translateY: [0.8, -0.5, i === 1 ? -2.2 : -1.6, i === 1 ? -3.6 : -2.6],
    transition: {
      duration: 1.3 + i * 0.25,
      ease: 'easeOut',
      times: [0, 0.25, 0.7, 1],
      repeat: Infinity,
      delay: i * 0.3,
    },
  }),
};

const Coffee02Icon = forwardRef<Coffee02IconHandle, Coffee02IconProps>(
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
          <path
            d="M18.2505 10.5H19.6403C21.4918 10.5 22.0421 10.7655 21.9975 12.0838C21.9237 14.2674 20.939 16.8047 17 17.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
          <path
            d="M5.94627 20.6145C2.57185 18.02 2.07468 14.3401 2.00143 10.5001C1.96979 8.8413 2.45126 8.5 4.65919 8.5H15.3408C17.5487 8.5 18.0302 8.8413 17.9986 10.5001C17.9253 14.3401 17.4281 18.02 14.0537 20.6145C13.0934 21.3528 12.2831 21.5 10.9194 21.5H9.08064C7.71686 21.5 6.90658 21.3528 5.94627 20.6145Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M11.3089 2.5C10.7622 2.83861 10.0012 4 10.0012 5.5M7.53971 4C7.53971 4 7 4.5 7 5.5M14.0012 4C13.7279 4.1693 13.5 5 13.5 5.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={steamBaseVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M7.53971 4C7.53971 4 7 4.5 7 5.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={steamVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M11.3089 2.5C10.7622 2.83861 10.0012 4 10.0012 5.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={steamVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M14.0012 4C13.7279 4.1693 13.5 5 13.5 5.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={steamVariants}
            custom={2}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

Coffee02Icon.displayName = 'Coffee02Icon';

export { Coffee02Icon };
