'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface Search01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Search01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the lens sweeps a small arc, like scanning a page
const svgVariants: Variants = {
  normal: { translateX: 0, translateY: 0, rotate: 0 },
  animate: {
    translateX: [0, -2, 2, 0],
    translateY: [0, 2, -1.5, 0],
    rotate: [0, -4, 4, 0],
    transition: { duration: 0.8, ease: 'easeInOut', times: [0, 0.3, 0.65, 1] },
  },
};

const Search01Icon = forwardRef<Search01IconHandle, Search01IconProps>(
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
        >
          <path
            d="M17 17L21 21"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </motion.svg>
      </div>
    );
  }
);

Search01Icon.displayName = 'Search01Icon';

export { Search01Icon };
