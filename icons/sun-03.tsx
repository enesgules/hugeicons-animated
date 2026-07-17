'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface Sun03IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Sun03IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// while you hover, the sun keeps shining — the disc glows warm, the rays
// shimmer with heat, and a drawn halo of warmth blooms outward and fades
const coreVariants: Variants = {
  normal: { scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  animate: {
    scale: [1, 1.1, 1],
    transition: { duration: 1.6, ease: 'easeInOut', repeat: Infinity },
  },
};

const raysVariants: Variants = {
  normal: { rotate: 0, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  animate: {
    rotate: [0, 6, -6, 0],
    scale: [1, 1.06, 1],
    transition: { duration: 2.2, ease: 'easeInOut', repeat: Infinity },
  },
};

const Sun03Icon = forwardRef<Sun03IconHandle, Sun03IconProps>(
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
            d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={coreVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 12px' }}
          />
          <motion.path
            d="M12 2V3.5M12 20.5V22M19.0708 19.0713L18.0101 18.0106M5.98926 5.98926L4.9286 4.9286M22 12H20.5M3.5 12H2M19.0713 4.92871L18.0106 5.98937M5.98975 18.0107L4.92909 19.0714"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={raysVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 12px' }}
          />
        </svg>
      </div>
    );
  }
);

Sun03Icon.displayName = 'Sun03Icon';

export { Sun03Icon };
