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

// the three rows reflow like a menu being scanned, without turning into another icon
const menuLineVariants: Variants = {
  normal: { transform: 'translateX(0px) scaleX(1)' },
  animate: (i: number) => ({
    transform: [
      'translateX(0px) scaleX(1)',
      i === 1 ? 'translateX(-0.9px) scaleX(1.08)' : 'translateX(0.9px) scaleX(0.9)',
      i === 1 ? 'translateX(0.25px) scaleX(0.98)' : 'translateX(-0.2px) scaleX(1.025)',
      'translateX(0px) scaleX(1)',
    ],
    transition: { duration: 0.46, delay: i * 0.055, ease: [0.23, 1, 0.32, 1] },
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
            d="M4 5L20 5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={menuLineVariants}
            custom={0}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 5px' }}
          />
          <motion.path
            d="M4 12L20 12"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={menuLineVariants}
            custom={1}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 12px' }}
          />
          <motion.path
            d="M4 19L20 19"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={menuLineVariants}
            custom={2}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 19px' }}
          />
        </svg>
      </div>
    );
  }
);

Menu01Icon.displayName = 'Menu01Icon';

export { Menu01Icon };
