'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface Menu01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Menu01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// a wave through the stack — each line launches and springs back past zero
const lineVariants: Variants = {
  normal: { translateX: 0 },
  animate: (i: number) => ({
    translateX: [0, 4.5, -1, 0],
    transition: {
      duration: 0.55,
      ease: 'easeInOut',
      times: [0, 0.4, 0.75, 1],
      delay: i * 0.07,
    },
  }),
};

const Menu01Icon = forwardRef<Menu01IconHandle, Menu01IconProps>(
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
            d="M4 5L20 5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={lineVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M4 12L20 12"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={lineVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M4 19L20 19"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={lineVariants}
            custom={2}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

Menu01Icon.displayName = 'Menu01Icon';

export { Menu01Icon };
