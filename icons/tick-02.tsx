'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Tick02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Tick02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the check draws itself with a small pop of confirmation at the end
const svgVariants: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 1, 1.08, 1],
    transition: { duration: 0.5, ease: 'easeOut', times: [0, 0.6, 0.8, 1] },
  },
};

const pathVariants: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [0, 1],
    opacity: 1,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

const Tick02Icon = forwardRef<Tick02IconHandle, Tick02IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const { handleMouseEnter, handleMouseLeave } = useIconAnimation({
      controls,
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
        >
          <motion.path
            d="M5 14L8.5 17.5L19 6.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={pathVariants}
            animate={controls}
            initial="normal"
          />
        </motion.svg>
      </div>
    );
  }
);

Tick02Icon.displayName = 'Tick02Icon';

export { Tick02Icon };
