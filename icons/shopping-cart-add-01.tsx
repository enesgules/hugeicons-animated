'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ShoppingCartAdd01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ShoppingCartAdd01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the plus lands in place while the cart absorbs the weight without crossing it
const wheelVariants: Variants = {
  normal: { transform: 'translateY(0px) scale(1)' },
  animate: {
    transform: ['translateY(0px) scale(1)', 'translateY(-1px) scale(1.14)', 'translateY(0.45px) scale(0.96)', 'translateY(0px) scale(1)'],
    transition: { duration: 0.54, ease: [0.23, 1, 0.32, 1] },
  },
};

const cartVariants: Variants = {
  normal: { transform: 'scaleY(1)' },
  animate: {
    transform: ['scaleY(1)', 'scaleY(0.96)', 'scaleY(1.025)', 'scaleY(1)'],
    transition: { duration: 0.52, ease: [0.23, 1, 0.32, 1] },
  },
};

const plusVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(0.5)', 'scale(1.22)', 'scale(0.96)', 'scale(1)'],
    transition: { duration: 0.5, delay: 0.06, ease: [0.23, 1, 0.32, 1] },
  },
};

const ShoppingCartAdd01Icon = forwardRef<ShoppingCartAdd01IconHandle, ShoppingCartAdd01IconProps>(
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
            d="M10.5 20.25C10.5 20.6642 10.1642 21 9.75 21C9.33579 21 9 20.6642 9 20.25C9 19.8358 9.33579 19.5 9.75 19.5C10.1642 19.5 10.5 19.8358 10.5 20.25Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={wheelVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '9.75px 20.25px' }}
          />
          <motion.path
            d="M19 20.25C19 20.6642 18.6642 21 18.25 21C17.8358 21 17.5 20.6642 17.5 20.25C17.5 19.8358 17.8358 19.5 18.25 19.5C18.6642 19.5 19 19.8358 19 20.25Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={wheelVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '18.25px 20.25px' }}
          />
          <motion.path
            d="M2 3H2.20664C3.53124 3 4.19354 3 4.6255 3.40221C5.05746 3.80441 5.10464 4.46503 5.19902 5.78626L5.45035 9.30496C5.5924 11.2936 5.66342 12.2879 5.96476 13.0961C6.62531 14.8677 8.08229 16.2244 9.89648 16.757C10.7241 17 11.7267 17 13.7317 17C15.8373 17 16.89 17 17.7417 16.7416C19.6593 16.1599 21.1599 14.6593 21.7416 12.7417C21.9426 12.0793 21.9872 11.299 21.9972 10M12.5 6H5.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={cartVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 13px' }}
          />
          <motion.path
            d="M16 6H22M19 9V3"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={plusVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '19px 6px' }}
          />
        </svg>
      </div>
    );
  }
);

ShoppingCartAdd01Icon.displayName = 'ShoppingCartAdd01Icon';

export { ShoppingCartAdd01Icon };
