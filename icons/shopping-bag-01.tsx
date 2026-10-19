'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ShoppingBag01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ShoppingBag01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const SWING_DURATION = 1;
const SWING_TIMES = [0, 0.16, 0.36, 0.54, 0.7, 0.85, 1];

// The bag is picked up and swings from its top like a carried bag; the handle
// lags a beat behind the swing and settles last.
const bagVariants: Variants = {
  normal: { transform: 'translateY(0px) rotate(0deg)' },
  animate: {
    transform: [
      'translateY(0px) rotate(0deg)',
      'translateY(-1.6px) rotate(-9deg)',
      'translateY(-1.2px) rotate(7deg)',
      'translateY(-0.7px) rotate(-4.5deg)',
      'translateY(-0.3px) rotate(2.2deg)',
      'translateY(0px) rotate(-0.8deg)',
      'translateY(0px) rotate(0deg)',
    ],
    transition: { duration: SWING_DURATION, times: SWING_TIMES, ease: 'easeInOut' },
  },
};

const handleVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: [
      'translateX(0px)',
      'translateX(0.9px)',
      'translateX(-0.8px)',
      'translateX(0.5px)',
      'translateX(-0.25px)',
      'translateX(0.08px)',
      'translateX(0px)',
    ],
    transition: {
      duration: SWING_DURATION,
      times: [0, 0.22, 0.42, 0.6, 0.76, 0.9, 1],
      ease: 'easeInOut',
    },
  },
};

const ShoppingBag01Icon = forwardRef<ShoppingBag01IconHandle, ShoppingBag01IconProps>(
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
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          overflow="visible"
          variants={bagVariants}
          animate={controls}
          initial="normal"
          style={{ transformOrigin: '50% 12.5%' }}
        >
          <path
            d="M3.32352 13.0113C3.6739 10.009 4.18586 7.75784 4.66063 6.15851C5.04994 4.84711 5.24459 4.19141 6.04283 3.5957C6.84107 3 7.65697 3 9.28876 3H14.7113C16.3431 3 17.159 3 17.9572 3.5957C18.7554 4.19141 18.9501 4.84711 19.3394 6.15851C19.8142 7.75784 20.3261 10.009 20.6765 13.0113C21.0895 16.5497 21.2959 18.3189 20.1027 19.6594C18.9095 21 16.9758 21 13.1084 21H10.8916C7.02422 21 5.09052 21 3.89731 19.6594C2.70411 18.3189 2.91058 16.5497 3.32352 13.0113Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={handleVariants}
            animate={controls}
            initial="normal"
          />
        </motion.svg>
      </div>
    );
  }
);

ShoppingBag01Icon.displayName = 'ShoppingBag01Icon';

export { ShoppingBag01Icon };
