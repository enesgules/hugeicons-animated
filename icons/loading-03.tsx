'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface Loading03IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Loading03IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the glyph is eight radial ticks — so run a real activity chase around
// them instead of rigidly spinning the whole svg
const rayVariants: Variants = {
  normal: { opacity: 1 },
  animate: (i: number) => ({
    opacity: [1, 0.15, 1],
    transition: { duration: 1, ease: 'easeInOut', repeat: Infinity, delay: i * 0.125 },
  }),
};

const Loading03Icon = forwardRef<Loading03IconHandle, Loading03IconProps>(
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
            d="M12 3V6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={rayVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M12 18V21"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={rayVariants}
            custom={4}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M21 12L18 12"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={rayVariants}
            custom={2}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M6 12L3 12"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={rayVariants}
            custom={6}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M18.3635 5.63672L16.2422 7.75804"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={rayVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M7.75804 16.2422L5.63672 18.3635"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={rayVariants}
            custom={5}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M18.3635 18.3635L16.2422 16.2422"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={rayVariants}
            custom={3}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M7.75804 7.75804L5.63672 5.63672"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={rayVariants}
            custom={7}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

Loading03Icon.displayName = 'Loading03Icon';

export { Loading03Icon };
