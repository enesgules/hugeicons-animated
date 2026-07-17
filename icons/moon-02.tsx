'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface Moon02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Moon02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the moon doesn't rock — it glows, and stars blink awake in the patch of
// sky its crescent opens onto
const svgVariants: Variants = {
  normal: { scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  animate: {
    scale: [1, 1.05, 1],
    transition: { duration: 2, ease: 'easeInOut', repeat: Infinity },
  },
};

const starVariants: Variants = {
  normal: { opacity: 0, scale: 0.4, transition: { duration: 0.15 } },
  animate: (i: number) => ({
    opacity: [0, 1, 0.3, 1, 0],
    scale: [0.4, 1, 0.8, 1, 0.4],
    transition: {
      duration: 1.8,
      ease: 'easeInOut',
      repeat: Infinity,
      delay: i * 0.6,
    },
  }),
};

const Moon02Icon = forwardRef<Moon02IconHandle, Moon02IconProps>(
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
          style={{ transformOrigin: '12px 12px' }}
        >
          <path
            d="M21.5 14.0784C20.3003 14.7189 18.9301 15.0821 17.4751 15.0821C12.7491 15.0821 8.91792 11.2509 8.91792 6.52485C8.91792 5.06986 9.28105 3.69968 9.92163 2.5C5.66765 3.49698 2.5 7.31513 2.5 11.8731C2.5 17.1899 6.8101 21.5 12.1269 21.5C16.6849 21.5 20.503 18.3324 21.5 14.0784Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M17.5 4.2V6.2M16.5 5.2H18.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1"
            variants={starVariants}
            custom={0}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '17.5px 5.2px' }}
          />
          <motion.circle
            cx="14.5"
            cy="8.5"
            r="0.6"
            fill="currentColor"
            variants={starVariants}
            custom={1}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '14.5px 8.5px' }}
          />
        </motion.svg>
      </div>
    );
  }
);

Moon02Icon.displayName = 'Moon02Icon';

export { Moon02Icon };
