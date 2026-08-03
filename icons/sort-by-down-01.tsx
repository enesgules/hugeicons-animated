'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface SortByDown01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SortByDown01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the arrow pulls the ordering downward while the values trade visual weight
const arrowVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(-1.8px)', 'translateY(2.2px)', 'translateY(-0.35px)', 'translateY(0px)'],
    transition: { duration: 0.52, ease: [0.23, 1, 0.32, 1], times: [0, 0.48, 0.78, 1] },
  },
};

const valueVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: (i: number) => ({
    transform: ['translateY(0px) scale(1)', i === 0 ? 'translateY(0.7px) scale(1.08)' : 'translateY(-0.7px) scale(0.9)', 'translateY(0px) scale(1)'],
    transition: { duration: 0.46, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] },
  }),
};

const SortByDown01Icon = forwardRef<SortByDown01IconHandle, SortByDown01IconProps>(
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
            d="M15 16.3265L16.409 17.8131C17.159 18.6044 17.534 19 18 19C18.466 19 18.841 18.6044 19.591 17.8131L21 16.3265M18 18.9128L18 14.5377C18 12.3042 18 11.1875 17.5532 10.2028C17.1063 9.21804 16.2659 8.48266 14.585 7.01192L14 6.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={arrowVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '18px 13px' }}
          />
          <motion.path
            d="M3 6.5C3 5.27489 3 4.66233 3.23842 4.1944C3.44815 3.78279 3.78279 3.44815 4.1944 3.23842C4.66233 3 5.27489 3 6.5 3C7.72511 3 8.33767 3 8.8056 3.23842C9.21721 3.44815 9.55185 3.78279 9.76158 4.1944C10 4.66233 10 5.27489 10 6.5C10 7.72511 10 8.33767 9.76158 8.8056C9.55185 9.21721 9.21721 9.55185 8.8056 9.76158C8.33767 10 7.72511 10 6.5 10C5.27489 10 4.66233 10 4.1944 9.76158C3.78279 9.55185 3.44815 9.21721 3.23842 8.8056C3 8.33767 3 7.72511 3 6.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={valueVariants}
            custom={0}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '6.5px 6.5px' }}
          />
          <motion.path
            d="M3 17.5C3 16.2749 3 15.6623 3.23842 15.1944C3.44815 14.7828 3.78279 14.4481 4.1944 14.2384C4.66233 14 5.27489 14 6.5 14C7.72511 14 8.33767 14 8.8056 14.2384C9.21721 14.4481 9.55185 14.7828 9.76158 15.1944C10 15.6623 10 16.2749 10 17.5C10 18.7251 10 19.3377 9.76158 19.8056C9.55185 20.2172 9.21721 20.5519 8.8056 20.7616C8.33767 21 7.72511 21 6.5 21C5.27489 21 4.66233 21 4.1944 20.7616C3.78279 20.5519 3.44815 20.2172 3.23842 19.8056C3 19.3377 3 18.7251 3 17.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={valueVariants}
            custom={1}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '6.5px 17.5px' }}
          />
        </svg>
      </div>
    );
  }
);

SortByDown01Icon.displayName = 'SortByDown01Icon';

export { SortByDown01Icon };
