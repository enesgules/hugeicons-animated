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

// preserve Hugeicons' three small resting steam strokes, then hand off to
// three independent S-trails that draw, rise, evaporate, and reset invisibly
const steamBaseVariants: Variants = {
  normal: { opacity: 1, transition: { duration: 0.08 } },
  animate: { opacity: 0 },
};

const steamFlowVariants: Variants = {
  normal: {
    pathLength: 0,
    pathOffset: 0,
    opacity: 0,
    transform: 'translateY(0px)',
    transition: { duration: 0.16, ease: [0.23, 1, 0.32, 1] },
  },
  animate: (i: number) => {
    const duration = i === 0 ? 1.36 : i === 1 ? 1.74 : 1.52;
    const delay = i === 0 ? 0 : i === 1 ? -0.57 : -0.23;
    const rise = i === 0 ? 1.8 : i === 1 ? 2.2 : 1.6;
    const times =
      i === 0
        ? [0, 0.24, 0.38, 0.72, 0.84, 1]
        : i === 1
          ? [0, 0.3, 0.48, 0.76, 0.9, 1]
          : [0, 0.2, 0.34, 0.66, 0.8, 1];

    return {
      pathLength: [0, 1, 1, 0.18, 0, 0],
      pathOffset: [0, 0, 0, 0.82, 1, 0],
      opacity: [0, 1, 0.9, 0.68, 0, 0],
      transform: [
        'translateY(0px)',
        'translateY(0px)',
        'translateY(' + -rise * 0.12 + 'px)',
        'translateY(' + -rise * 0.72 + 'px)',
        'translateY(' + -rise + 'px)',
        'translateY(0px)',
      ],
      transition: {
        duration,
        delay,
        ease: 'linear',
        times,
        repeat: Infinity,
      },
    };
  },
};
const generatedGeometryVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.08 } },
  animate: { opacity: 1, transition: { duration: 0.08 } },
};


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
            d="M11.3089 2.5C10.7622 2.83861 10.0012 4 10.0012 5.5M7.53971 4C7.53971 4 7 4.5 7 5.5M14.0012 4C13.7279 4.1693 13.5 5 13.5 5.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={steamBaseVariants}
            animate={controls}
            initial="normal"
          />
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
          <motion.path
            d="M5.8 6.35C4.1 5.75 4.2 4.65 5.95 4.15C7.5 3.7 7.45 2.55 5.85 2.05C4.45 1.6 4.55 0.75 5.85 0.25"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={steamFlowVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M10.3 6.45C8.2 5.75 8.35 4.55 10.45 3.95C12.35 3.4 12.2 2.1 10.25 1.55C8.55 1.05 8.7 0.05 10.4 -0.45"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={steamFlowVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M14.8 6.35C16.5 5.75 16.4 4.65 14.65 4.15C13.1 3.7 13.15 2.55 14.75 2.05C16.15 1.6 16.05 0.75 14.75 0.25"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={steamFlowVariants}
            custom={2}
            animate={controls}
            initial="normal"
          />
          </motion.g>
        </svg>
      </div>
    );
  }
);

Coffee02Icon.displayName = 'Coffee02Icon';

export { Coffee02Icon };
