'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Menu01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Menu01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const MENU_LINES = ['M4 5L20 5', 'M4 12L20 12', 'M4 19L20 19'];
const MENU_SHORT_LINES = ['M4 5L12 5', 'M10 12L20 12', 'M4 19L14 19'];

// Each row pulls in from alternating anchored edges in reading order, then
// springs back to full width. The rows stay attached to their own edge.
const menuLineVariants: Variants = {
  normal: (i: number) => ({
    d: MENU_LINES[i],
    transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] },
  }),
  animate: (i: number) => ({
    d: [MENU_LINES[i], MENU_SHORT_LINES[i], MENU_LINES[i]],
    transition: {
      duration: 0.46,
      delay: i * 0.08,
      times: [0, 0.4, 1],
      ease: ['easeInOut', [0.34, 1.36, 0.64, 1]],
    },
  }),
};

const Menu01Icon = forwardRef<Menu01IconHandle, Menu01IconProps>(
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
            d={MENU_LINES[0]}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={menuLineVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d={MENU_LINES[1]}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={menuLineVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d={MENU_LINES[2]}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={menuLineVariants}
            custom={2}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

Menu01Icon.displayName = 'Menu01Icon';

export { Menu01Icon };
