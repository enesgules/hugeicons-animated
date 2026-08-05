'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Coffee02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Coffee02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

interface SteamMotion {
  duration: number;
  delay: number;
}

const createSteamVariants = ({
  duration,
  delay,
}: SteamMotion): Variants => ({
  normal: {
    visibility: 'visible',
    pathLength: 1,
    pathOffset: 0,
    transform: 'translateY(0px)',
    transition: { duration: 0.14, ease: [0.23, 1, 0.32, 1] },
  },
  animate: {
    pathLength: [1, 0.58, 0.22, 0, 0.14, 0.14, 0.34, 0.6, 1],
    pathOffset: [0, 0, 0, 0, 0.86, 0.86, 0.54, 0.2, 0],
    visibility: ['visible', 'visible', 'visible', 'hidden', 'hidden', 'visible', 'visible', 'visible', 'visible'],
    transform: [
      'translateY(0px)',
      'translateY(-0.35px)',
      'translateY(-0.9px)',
      'translateY(-1.4px)',
      'translateY(0px)',
      'translateY(0px)',
      'translateY(0px)',
      'translateY(0px)',
      'translateY(0px)',
    ],
    transition: {
      duration,
      delay,
      ease: 'linear',
      times: [0, 0.18, 0.32, 0.42, 0.48, 0.54, 0.68, 0.82, 1],
      repeat: Infinity,
    },
  },
});

// rest-parity: split-source-path
// The original combined Hugeicons steam path is split into its three exact
// subpaths so each full resting stroke can rise and taper toward the top,
// evaporate, reappear small at the cup, and grow into the full stroke again.
const leftSteamVariants = createSteamVariants({
  duration: 1.08,
  delay: 0,
});

const centerSteamVariants = createSteamVariants({
  duration: 1.2,
  delay: 0.08,
});

const rightSteamVariants = createSteamVariants({
  duration: 1.12,
  delay: 0.16,
});

const Coffee02Icon = forwardRef<Coffee02IconHandle, Coffee02IconProps>(
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
          <path
            d="M18.2505 10.5H19.6403C21.4918 10.5 22.0421 10.7655 21.9975 12.0838C21.9237 14.2674 20.939 16.8047 17 17.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
          <path
            d="M5.94627 20.6145C2.57185 18.02 2.07468 14.3401 2.00143 10.5001C1.96979 8.8413 2.45126 8.5 4.65919 8.5H15.3408C17.5487 8.5 18.0302 8.8413 17.9986 10.5001C17.9253 14.3401 17.4281 18.02 14.0537 20.6145C13.0934 21.3528 12.2831 21.5 10.9194 21.5H9.08064C7.71686 21.5 6.90658 21.3528 5.94627 20.6145Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M7.53971 4C7.53971 4 7.47974 4.05556 7.39979 4.16667C7.31983 4.27778 7.21988 4.44444 7.13992 4.66667C7.05997 4.88889 7 5.16667 7 5.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={leftSteamVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M11.3089 2.5C11.12667 2.61287 10.92062 2.81716 10.72689 3.09494C10.53316 3.37272 10.35173 3.72398 10.21874 4.1308C10.08576 4.53762 10.0012 5 10.0012 5.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={centerSteamVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M14.0012 4C13.9101 4.05643 13.82404 4.18636 13.74979 4.35302C13.67554 4.51969 13.61309 4.7231 13.56921 4.92651C13.52532 5.12992 13.5 5.33333 13.5 5.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={rightSteamVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

Coffee02Icon.displayName = 'Coffee02Icon';

export { Coffee02Icon };
