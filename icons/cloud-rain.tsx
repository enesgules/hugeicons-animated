'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface CloudRainIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CloudRainIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const cloudVariants: Variants = {
  normal: {
    translateY: 0,
    transition: { duration: 0.24, ease: [0.23, 1, 0.32, 1] },
  },
  animate: {
    translateY: [0, -1, 0],
    transition: {
      duration: 1.6,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

const rainVariants: Variants = {
  normal: {
    pathLength: 1,
    pathOffset: 0,
    visibility: 'visible',
    transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] },
  },
  animate: (i: number) => ({
    pathLength: [1, 1, 0.18, 0, 0, 1, 1],
    pathOffset: [0, 0, 0.82, 1, 0, 0, 0],
    visibility: ['visible', 'visible', 'visible', 'hidden', 'hidden', 'visible', 'visible'],
    transition: {
      duration: 1.2,
      delay: i * 0.18,
      ease: 'linear',
      times: [0, 0.18, 0.46, 0.58, 0.64, 0.88, 1],
      repeat: Infinity,
    },
  }),
};

const CloudRainIcon = forwardRef<CloudRainIconHandle, CloudRainIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const { handleMouseEnter, handleMouseLeave } = useIconAnimation({
      controls,
      loops: true,
      onMouseEnter,
      onMouseLeave,
      ref,
    });

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
            variants={rainVariants}
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
            variants={rainVariants}
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
            variants={rainVariants}
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
