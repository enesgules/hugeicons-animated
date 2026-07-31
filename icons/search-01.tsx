'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Search01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Search01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the lens sweeps, pauses on a find, and quietly zooms in
const svgVariants: Variants = {
  normal: { translateX: 0, translateY: 0, rotate: 0 },
  animate: {
    translateX: [0, -2, -2, 2, 0],
    translateY: [0, 2, 2, -1.5, 0],
    rotate: [0, -4, -4, 4, 0],
    transition: { duration: 0.9, ease: 'easeInOut', times: [0, 0.25, 0.45, 0.7, 1] },
  },
};

const lensVariants: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 1, 1.14, 1.14, 1],
    transition: { duration: 0.9, ease: 'easeInOut', times: [0, 0.25, 0.35, 0.45, 1] },
  },
};

const Search01Icon = forwardRef<Search01IconHandle, Search01IconProps>(
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
          <path
            d="M17 17L21 21"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={lensVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
        </motion.svg>
      </div>
    );
  }
);

Search01Icon.displayName = 'Search01Icon';

export { Search01Icon };
