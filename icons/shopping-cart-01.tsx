'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface ShoppingCart01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ShoppingCart01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// while you hover, the cart is mid-dash — rattling over the floor while
// drawn speed lines whip past behind it
const svgVariants: Variants = {
  normal: { rotate: 0, translateY: 0, transition: { duration: 0.3 } },
  animate: {
    rotate: [0, -1.6, 1.2, -0.8, 0],
    translateY: [0, -0.5, 0, -0.3, 0],
    transition: { duration: 0.55, ease: 'easeInOut', repeat: Infinity },
  },
};

// the groceries bounce a beat behind the chassis
const itemsVariants: Variants = {
  normal: { translateY: 0, transition: { duration: 0.3 } },
  animate: {
    translateY: [0, -0.9, 0],
    transition: {
      duration: 0.55,
      ease: 'easeInOut',
      repeat: Infinity,
      delay: 0.08,
    },
  },
};

const speedVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.15 } },
  animate: (i: number) => ({
    opacity: [0, 1, 0],
    translateX: [2, -2.5],
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      repeat: Infinity,
      delay: i * 0.22,
    },
  }),
};

const ShoppingCart01Icon = forwardRef<ShoppingCart01IconHandle, ShoppingCart01IconProps>(
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
          style={{ transformOrigin: '12px 18px' }}
        >
          <path
            d="M10.5 20.25C10.5 20.6642 10.1642 21 9.75 21C9.33579 21 9 20.6642 9 20.25C9 19.8358 9.33579 19.5 9.75 19.5C10.1642 19.5 10.5 19.8358 10.5 20.25Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M19 20.25C19 20.6642 18.6642 21 18.25 21C17.8358 21 17.5 20.6642 17.5 20.25C17.5 19.8358 17.8358 19.5 18.25 19.5C18.6642 19.5 19 19.8358 19 20.25Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M2 3H2.20664C3.53124 3 4.19354 3 4.6255 3.40221C5.05746 3.80441 5.10464 4.46503 5.19902 5.78626L5.45035 9.30496C5.5924 11.2936 5.66342 12.2879 5.96476 13.0961C6.62531 14.8677 8.08229 16.2244 9.89648 16.757C10.7241 17 11.7267 17 13.7317 17C15.8373 17 16.89 17 17.7417 16.7416C19.6593 16.1599 21.1599 14.6593 21.7416 12.7417C22 11.89 22 10.8433 22 8.75C22 8.05222 22 7.70333 21.9139 7.41943C21.72 6.78023 21.2198 6.28002 20.5806 6.08612C20.2967 6 19.9478 6 19.25 6H5.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M16 10V13M11 10V13"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={itemsVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M-2 9.5H0.8"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={speedVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M-2 13.5H-0.2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={speedVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />
        </motion.svg>
      </div>
    );
  }
);

ShoppingCart01Icon.displayName = 'ShoppingCart01Icon';

export { ShoppingCart01Icon };
