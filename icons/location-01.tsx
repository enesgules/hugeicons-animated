'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface Location01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Location01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the pin lifts, drops back onto the map, and the landing draws a ripple
const svgVariants: Variants = {
  normal: { translateY: 0, transition: { duration: 0.3 } },
  animate: {
    translateY: [0, -5, 0, -1.6, 0],
    transition: {
      duration: 0.85,
      times: [0, 0.32, 0.6, 0.8, 1],
      ease: ['easeOut', 'easeIn', 'easeOut', 'easeIn'],
    },
  },
};

// drawn landing ring — invisible at rest, spreads at the moment of touchdown
const rippleVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.2 } },
  animate: {
    opacity: [0, 0.5, 0],
    scale: [0.4, 1.2, 1.7],
    transition: { duration: 0.55, ease: 'easeOut', delay: 0.48 },
  },
};

const Location01Icon = forwardRef<Location01IconHandle, Location01IconProps>(
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
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          overflow="visible"
          variants={svgVariants}
          animate={controls}
          initial="normal"
        >
          <path
            d="M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <motion.ellipse
            cx="12"
            cy="21.7"
            rx="3.5"
            ry="1"
            stroke="currentColor"
            strokeWidth="1"
            variants={rippleVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 21.7px' }}
          />
        </motion.svg>
      </div>
    );
  }
);

Location01Icon.displayName = 'Location01Icon';

export { Location01Icon };
