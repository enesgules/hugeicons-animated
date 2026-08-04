'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Shield02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Shield02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the shield itself absorbs the impact and passes the force into its core
const shieldVariants: Variants = {
  normal: { transform: 'translateY(0px) scale(1)' },
  animate: {
    transform: ['translateY(0px) scale(1)', 'translateY(0.7px) scale(0.94)', 'translateY(-0.25px) scale(1.05)', 'translateY(0px) scale(1)'],
    transition: { duration: 0.54, ease: [0.23, 1, 0.32, 1] },
  },
};

const shieldCoreVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(0.72)', 'scale(1.2)', 'scale(1)'],
    transition: { duration: 0.5, delay: 0.05, ease: [0.23, 1, 0.32, 1] },
  },
};

const Shield02Icon = forwardRef<Shield02IconHandle, Shield02IconProps>(
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
            d="M18.7088 3.49534C16.8165 2.55382 14.5009 2 12 2C9.4991 2 7.1835 2.55382 5.29116 3.49534C4.36318 3.95706 3.89919 4.18792 3.4496 4.91378C3 5.63965 3 6.34248 3 7.74814V11.2371C3 16.9205 7.54236 20.0804 10.173 21.4338C10.9067 21.8113 11.2735 22 12 22C12.7265 22 13.0933 21.8113 13.8269 21.4338C16.4576 20.0804 21 16.9205 21 11.2371L21 7.74814C21 6.34249 21 5.63966 20.5504 4.91378C20.1008 4.18791 19.6368 3.95706 18.7088 3.49534Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={shieldVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 12px' }}
          />
          <motion.path
            d="M15 11C15 12.6568 13.6569 14 12 14C10.3431 14 9 12.6568 9 11C9 9.34314 10.3431 8 12 8C13.6569 8 15 9.34314 15 11Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={shieldCoreVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 11px' }}
          />
        </svg>
      </div>
    );
  }
);

Shield02Icon.displayName = 'Shield02Icon';

export { Shield02Icon };
