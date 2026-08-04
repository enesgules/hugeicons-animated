'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Copy01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Copy01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the front sheet stays anchored while the rear copy redraws behind it
const frontVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(0.975)', 'scale(1.01)', 'scale(1)'],
    transition: { duration: 0.46, ease: [0.23, 1, 0.32, 1] },
  },
};

const backVariants: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [0.15, 1],
    opacity: [0.35, 1],
    transition: { duration: 0.48, delay: 0.06, ease: [0.23, 1, 0.32, 1] },
  },
};

const Copy01Icon = forwardRef<Copy01IconHandle, Copy01IconProps>(
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
            d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={frontVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={backVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

Copy01Icon.displayName = 'Copy01Icon';

export { Copy01Icon };
