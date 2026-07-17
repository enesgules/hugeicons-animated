'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface Leaf01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Leaf01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// while you hover, the breeze holds — the leaf sways from its stem and
// drawn wind lines drift through the gap it leans away from
const svgVariants: Variants = {
  normal: { rotate: 0, transition: { duration: 0.4 } },
  animate: {
    rotate: [0, 6, -5, 0],
    transition: { duration: 2, ease: 'easeInOut', repeat: Infinity },
  },
};

const windVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.15 } },
  animate: (i: number) => ({
    opacity: [0, 1, 0],
    translateX: [-3, 2.5],
    transition: {
      duration: 1,
      ease: 'easeInOut',
      repeat: Infinity,
      delay: i * 0.45,
    },
  }),
};

const Leaf01Icon = forwardRef<Leaf01IconHandle, Leaf01IconProps>(
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
          style={{ transformOrigin: '3px 21px' }}
        >
          <path
            d="M7.64584 15.7108C7.23279 14.8966 7 13.9755 7 13C7 9.78484 9.5 7.5 13 7C17.0817 6.4169 18.8333 4.16667 20 3C23.5 16 17 19 13 19C11.9071 19 10.8825 18.7078 10 18.1973"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M3 21C3.5 18 5.45791 16.1355 10 15C13.2167 14.1958 15.4634 12.1791 17 10.0549"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M2 3H6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={windVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M1 6H4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={windVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />
        </motion.svg>
      </div>
    );
  }
);

Leaf01Icon.displayName = 'Leaf01Icon';

export { Leaf01Icon };
