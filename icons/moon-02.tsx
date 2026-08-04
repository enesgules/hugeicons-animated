'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Moon02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Moon02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const starVariants: Variants = {
  normal: {
    opacity: 0,
    transform: 'scale(0.55)',
    transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] },
  },
  animate: (i: number) => ({
    opacity: [0, 1, 0.35, 1, 0],
    transform: [
      'scale(0.55)',
      'scale(1)',
      'scale(0.78)',
      'scale(1)',
      'scale(0.55)',
    ],
    transition: {
      duration: 1.3,
      ease: [0.77, 0, 0.175, 1],
      repeat: Infinity,
      delay: i * 0.24,
    },
  }),
};
const generatedGeometryVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.08 } },
  animate: { opacity: 1, transition: { duration: 0.08 } },
};

const Moon02Icon = forwardRef<Moon02IconHandle, Moon02IconProps>(
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
            d="M21.5 14.0784C20.3003 14.7189 18.9301 15.0821 17.4751 15.0821C12.7491 15.0821 8.91792 11.2509 8.91792 6.52485C8.91792 5.06986 9.28105 3.69968 9.92163 2.5C5.66765 3.49698 2.5 7.31513 2.5 11.8731C2.5 17.1899 6.8101 21.5 12.1269 21.5C16.6849 21.5 20.503 18.3324 21.5 14.0784Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
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
            <motion.path
              d="M19.3 8.25V9.75M18.55 9H20.05"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="0.9"
              variants={starVariants}
              custom={2}
              animate={controls}
              initial="normal"
              style={{ transformOrigin: '19.3px 9px' }}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

Moon02Icon.displayName = 'Moon02Icon';

export { Moon02Icon };
