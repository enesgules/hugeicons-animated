'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface Mic01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Mic01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// while you hover, it's live — drawn sound arcs broadcast off both sides
// while the mic keeps a small performance bounce
const svgVariants: Variants = {
  normal: { translateY: 0, transition: { duration: 0.3 } },
  animate: {
    translateY: [0, -0.6, 0],
    transition: { duration: 0.6, ease: 'easeInOut', repeat: Infinity },
  },
};

// custom: [direction, delay] — arcs drift outward as they fade
const waveVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.15 } },
  animate: (c: [number, number]) => ({
    opacity: [0, 1, 0],
    translateX: [0, c[0] * 1.6],
    transition: {
      duration: 1.2,
      ease: 'easeOut',
      repeat: Infinity,
      delay: c[1],
    },
  }),
};

const Mic01Icon = forwardRef<Mic01IconHandle, Mic01IconProps>(
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
            d="M17 7V11C17 13.7614 14.7614 16 12 16C9.23858 16 7 13.7614 7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M17 7H14M17 11H14"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
          <path
            d="M20 11C20 15.4183 16.4183 19 12 19M12 19C7.58172 19 4 15.4183 4 11M12 19V22M12 22H15M12 22H9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M4.8 3.2C3.9 4.4 3.4 5.9 3.4 7.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={waveVariants}
            custom={[-1, 0]}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M19.2 3.2C20.1 4.4 20.6 5.9 20.6 7.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={waveVariants}
            custom={[1, 0]}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M2.6 1.4C1.5 2.9 0.9 4.9 0.9 7"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={waveVariants}
            custom={[-1, 0.35]}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M21.4 1.4C22.5 2.9 23.1 4.9 23.1 7"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={waveVariants}
            custom={[1, 0.35]}
            animate={controls}
            initial="normal"
          />
        </motion.svg>
      </div>
    );
  }
);

Mic01Icon.displayName = 'Mic01Icon';

export { Mic01Icon };
