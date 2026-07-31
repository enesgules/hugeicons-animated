'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface CreditCardIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CreditCardIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the card slides through a reader and its details follow a fraction later
const cardVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: ['translateX(0px)', 'translateX(1.2px)', 'translateX(0px)'],
    transition: { duration: 0.44, ease: [0.23, 1, 0.32, 1] },
  },
};

const detailVariants: Variants = {
  normal: { transform: 'scaleX(1)' },
  animate: {
    transform: ['scaleX(1)', 'scaleX(0.7)', 'scaleX(1)'],
    transition: { duration: 0.38, delay: 0.06, ease: [0.23, 1, 0.32, 1] },
  },
};

const CreditCardIcon = forwardRef<CreditCardIconHandle, CreditCardIconProps>(
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          overflow="visible"
        >
          <motion.path
            d="M2 12C2 8.46252 2 6.69377 3.0528 5.5129C3.22119 5.32403 3.40678 5.14935 3.60746 4.99087C4.86213 4 6.74142 4 10.5 4H13.5C17.2586 4 19.1379 4 20.3925 4.99087C20.5932 5.14935 20.7788 5.32403 20.9472 5.5129C22 6.69377 22 8.46252 22 12C22 15.5375 22 17.3062 20.9472 18.4871C20.7788 18.676 20.5932 18.8506 20.3925 19.0091C19.1379 20 17.2586 20 13.5 20H10.5C6.74142 20 4.86213 20 3.60746 19.0091C3.40678 18.8506 3.22119 18.676 3.0528 18.4871C2 17.3062 2 15.5375 2 12Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={cardVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 12px' }}
          />
          <motion.path
            d="M10 16H11.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={detailVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '10.75px 16px' }}
          />
          <motion.path
            d="M14.5 16L18 16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={detailVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '16.25px 16px' }}
          />
          <motion.path
            d="M2 9H22"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={cardVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 9px' }}
          />
        </svg>
      </div>
    );
  }
);

CreditCardIcon.displayName = 'CreditCardIcon';

export { CreditCardIcon };
