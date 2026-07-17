'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface CloudRainIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CloudRainIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// while you hover, the shower keeps falling — each drop accelerates,
// dies low, and is reborn above; the cloud drifts on the updraft
const cloudVariants: Variants = {
  normal: { translateY: 0, transition: { duration: 0.3 } },
  animate: {
    translateY: [0, -0.7, 0],
    transition: { duration: 1.8, ease: 'easeInOut', repeat: Infinity },
  },
};

const dropVariants: Variants = {
  normal: { opacity: 1, translateY: 0, transition: { duration: 0.3 } },
  animate: (i: number) => ({
    opacity: [0, 1, 0],
    translateY: [-1.5, 1, 3.5],
    transition: {
      duration: 0.9,
      ease: 'easeIn',
      repeat: Infinity,
      delay: i * 0.28,
    },
  }),
};

const CloudRainIcon = forwardRef<CloudRainIconHandle, CloudRainIconProps>(
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
            d="M17.4776 9.00005C17.485 9.00002 17.4925 9 17.5 9C19.9853 9 22 11.0147 22 13.5C22 15.0602 21.206 16.435 20 17.2422M17.1251 10.5C17.3093 10.0282 17.4303 9.52476 17.4776 9.00005C17.4924 8.83536 17.5 8.66856 17.5 8.5C17.5 5.46243 15.0376 3 12 3C9.12324 3 6.76233 5.20862 6.52042 8.0227M6.52042 8.0227C3.98398 8.26407 2 10.4003 2 13C2 14.6358 2.78555 16.0882 4 17.0004M6.52042 8.0227C6.67826 8.00768 6.83823 8 7 8C7.7111 8 8.38754 8.14845 9 8.41604"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={cloudVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M16 14V19"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={dropVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M8 14V19"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={dropVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M12 16V21"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={dropVariants}
            custom={2}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

CloudRainIcon.displayName = 'CloudRainIcon';

export { CloudRainIcon };
