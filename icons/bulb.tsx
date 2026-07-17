'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface BulbIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface BulbIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the light turns on: the filament draws itself, the bulb pops, and drawn
// rays burst outward and hold their glow while you hover
const svgVariants: Variants = {
  normal: { scale: 1, transition: { duration: 0.3 } },
  animate: {
    scale: [1, 1.05, 1],
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

const filamentVariants: Variants = {
  normal: { pathLength: 1, transition: { duration: 0.3 } },
  animate: {
    pathLength: [0, 1],
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

// rays scale up from the view center, so they read as bursting off the glass
const rayVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.2 } },
  animate: (i: number) => ({
    opacity: [0, 1, 0.75, 1],
    scale: [0.4, 1.15, 1, 1],
    transition: {
      duration: 0.55,
      ease: 'easeOut',
      times: [0, 0.4, 0.7, 1],
      delay: 0.12 + i * 0.05,
    },
  }),
};

const BulbIcon = forwardRef<BulbIconHandle, BulbIconProps>(
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
            d="M5.14286 14C4.41735 12.8082 4 11.4118 4 9.91886C4 5.54539 7.58172 2 12 2C16.4183 2 20 5.54539 20 9.91886C20 11.4118 19.5827 12.8082 18.8571 14"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M14 10C13.3875 10.6432 12.7111 11 12 11C11.2889 11 10.6125 10.6432 10 10"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={filamentVariants}
            animate={controls}
            initial="normal"
          />
          <path
            d="M7.38287 17.0982C7.291 16.8216 7.24507 16.6833 7.25042 16.5713C7.26174 16.3343 7.41114 16.1262 7.63157 16.0405C7.73579 16 7.88105 16 8.17157 16H15.8284C16.119 16 16.2642 16 16.3684 16.0405C16.5889 16.1262 16.7383 16.3343 16.7496 16.5713C16.7549 16.6833 16.709 16.8216 16.6171 17.0982C16.4473 17.6094 16.3624 17.8651 16.2315 18.072C15.9572 18.5056 15.5272 18.8167 15.0306 18.9408C14.7935 19 14.525 19 13.9881 19H10.0119C9.47495 19 9.2065 19 8.96944 18.9408C8.47283 18.8167 8.04281 18.5056 7.7685 18.072C7.63755 17.8651 7.55266 17.6094 7.38287 17.0982Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M15 19L14.8707 19.6466C14.7293 20.3537 14.6586 20.7072 14.5001 20.9866C14.2552 21.4185 13.8582 21.7439 13.3866 21.8994C13.0816 22 12.7211 22 12 22C11.2789 22 10.9184 22 10.6134 21.8994C10.1418 21.7439 9.74484 21.4185 9.49987 20.9866C9.34144 20.7072 9.27073 20.3537 9.12932 19.6466L9 19"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M12 15.5V11"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M12 0.2V-1.6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={rayVariants}
            custom={0}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 10px' }}
          />
          <motion.path
            d="M6.3 4.2L5 2.9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={rayVariants}
            custom={1}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 10px' }}
          />
          <motion.path
            d="M17.7 4.2L19 2.9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={rayVariants}
            custom={2}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 10px' }}
          />
          <motion.path
            d="M3.4 9.9H1.6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={rayVariants}
            custom={3}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 10px' }}
          />
          <motion.path
            d="M20.6 9.9H22.4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={rayVariants}
            custom={4}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 10px' }}
          />
        </motion.svg>
      </div>
    );
  }
);

BulbIcon.displayName = 'BulbIcon';

export { BulbIcon };
