'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Rocket01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Rocket01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// liftoff with engine shudder; the speed lines streak past twice
const shipVariants: Variants = {
  normal: { translateX: 0, translateY: 0 },
  animate: {
    translateX: [0, 0.4, -0.3, 2.2, 0],
    translateY: [0, -0.4, 0.3, -2.2, 0],
    transition: { duration: 0.75, ease: 'easeInOut', times: [0, 0.15, 0.3, 0.6, 1] },
  },
};

const streakVariants: Variants = {
  normal: { translateX: 0, translateY: 0, opacity: 1 },
  animate: (i: number) => ({
    translateX: [0, -2, 0],
    translateY: [0, 2, 0],
    opacity: [1, 0.3, 1],
    transition: { duration: 0.35, ease: 'easeInOut', delay: i * 0.07, repeat: 1 },
  }),
};

const exhaustVariants: Variants = {
  normal: { opacity: 0, scale: 0.4, translateX: 0, translateY: 0 },
  animate: (i: number) => ({
    opacity: [0, 0.9, 0],
    scale: [0.35, 1, 0.55],
    translateX: [0, -2.4 - i * 0.6],
    translateY: [0, 2.4 + i * 0.6],
    transition: {
      duration: 0.55,
      ease: 'easeOut',
      delay: 0.08 + i * 0.12,
      repeat: 1,
    },
  }),
};
const generatedGeometryVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.08 } },
  animate: { opacity: 1, transition: { duration: 0.08 } },
};


const Rocket01Icon = forwardRef<Rocket01IconHandle, Rocket01IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const { handleMouseEnter, handleMouseLeave } = useIconAnimation({
      controls,
      loops: false,
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
            d="M11.8013 6.48949L13.2869 5.00392C14.9596 3.3312 17.1495 2.63737 19.4671 2.52399C20.3686 2.47989 20.8193 2.45784 21.1807 2.81928C21.5422 3.18071 21.5201 3.63143 21.476 4.53289C21.3626 6.8505 20.6688 9.04042 18.9961 10.7131L17.5105 12.1987C16.2871 13.4221 15.9393 13.77 16.1961 15.097C16.4496 16.1107 16.6949 17.0923 15.9578 17.8294C15.0637 18.7235 14.2481 18.7235 13.354 17.8294L6.17058 10.646C5.27649 9.75188 5.27646 8.9363 6.17058 8.04219C6.90767 7.30509 7.88929 7.55044 8.90297 7.80389C10.23 8.06073 10.5779 7.71289 11.8013 6.48949Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={shipVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M2.5 21.5L7.5 16.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={streakVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M8.5 21.5L10.5 19.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={streakVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M2.5 15.5L4.5 13.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={streakVariants}
            custom={2}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M17.125 7H17M17.25 7C17.25 7.13807 17.1381 7.25 17 7.25C16.8619 7.25 16.75 7.13807 16.75 7C16.75 6.86193 16.8619 6.75 17 6.75C17.1381 6.75 17.25 6.86193 17.25 7Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={shipVariants}
            animate={controls}
            initial="normal"
          />
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
          <motion.circle
            cx="6.3"
            cy="17.7"
            r="0.7"
            fill="currentColor"
            variants={exhaustVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.circle
            cx="8.2"
            cy="15.8"
            r="0.5"
            fill="currentColor"
            variants={exhaustVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />
          </motion.g>
        </svg>
      </div>
    );
  }
);

Rocket01Icon.displayName = 'Rocket01Icon';

export { Rocket01Icon };
