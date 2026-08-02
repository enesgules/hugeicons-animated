'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Login01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Login01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the arrow draws back, enters decisively, and the open door yields at contact
const doorVariants: Variants = {
  normal: { transform: 'scaleX(1)' },
  animate: {
    transform: ['scaleX(1)', 'scaleX(1)', 'scaleX(0.965)', 'scaleX(1.008)', 'scaleX(1)'],
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
      times: [0, 0.38, 0.58, 0.8, 1],
    },
  },
};

const arrowVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: [
      'translateX(0px)',
      'translateX(-0.65px)',
      'translateX(1.55px)',
      'translateX(0.16px)',
      'translateX(0px)',
    ],
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
      times: [0, 0.2, 0.56, 0.82, 1],
    },
  },
};

const Login01Icon = forwardRef<Login01IconHandle, Login01IconProps>(
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
          d="M8.00002 8C8.00002 7.42459 8.00002 7.17765 8.04465 6.92457C8.21993 5.93047 8.89355 5.09255 9.83302 4.70001C10.0723 4.60003 10.3559 4.53526 10.9232 4.40573L13.6508 3.78286C17.0405 3.00882 18.7353 2.6218 19.8677 3.51317C21 4.40454 21 6.1257 21 9.56803L21 14.432C21 17.8743 21 19.5955 19.8676 20.4868C18.7353 21.3782 17.0405 20.9912 13.6508 20.2171L10.9232 19.5943C10.3559 19.4647 10.0723 19.4 9.833 19.3C8.89353 18.9074 8.21991 18.0695 8.04462 17.0754C8 16.8224 8 16.5754 8 16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={doorVariants}
          animate={controls}
          initial="normal"
          style={{ transformOrigin: '21px 12px' }}
        />
        <motion.path
          d="M13 9C13 9 16 11.2095 16 12C16 12.7906 13 15 13 15M15.5 12H3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={arrowVariants}
          animate={controls}
          initial="normal"
        />
        </svg>
      </div>
    );
  }
);

Login01Icon.displayName = 'Login01Icon';

export { Login01Icon };
