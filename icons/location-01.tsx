'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Location01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Location01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// Match location-add's quick hop and carry the landing ring with the pin.
const pinVariants: Variants = {
  normal: { transform: 'translateY(0px) scaleY(1)' },
  animate: {
    transform: [
      'translateY(0px) scaleY(1)',
      'translateY(-2.6px) scaleY(1.04)',
      'translateY(1.1px) scaleY(0.93)',
      'translateY(-0.35px) scaleY(1.02)',
      'translateY(0px) scaleY(1)',
    ],
    transition: {
      duration: 0.68,
      ease: [0.23, 1, 0.32, 1],
      times: [0, 0.34, 0.58, 0.78, 1],
    },
  },
};

// The ring travels with the pin, then expands when the pin lands.
const rippleVariants: Variants = {
  normal: {
    visibility: 'hidden',
    transform: 'scale(0.55)',
    transition: { duration: 0.15, ease: [0.23, 1, 0.32, 1] },
  },
  animate: {
    visibility: ['hidden', 'hidden', 'visible', 'hidden'],
    transform: ['scale(0.55)', 'scale(0.55)', 'scale(1)', 'scale(1.55)'],
    transition: {
      duration: 0.68,
      ease: [0.23, 1, 0.32, 1],
      times: [0, 0.48, 0.62, 1],
    },
  },
};
const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0.08 } },
  animate: { visibility: 'visible', transition: { duration: 0.08 } },
};

const Location01Icon = forwardRef<Location01IconHandle, Location01IconProps>(
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
          <motion.g
            variants={pinVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 22px' }}
          >
            <path
              d="M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <motion.g
              variants={generatedGeometryVariants}
              animate={controls}
              initial="normal"
            >
              <motion.ellipse
                cx="12"
                cy="21.7"
                rx="3.5"
                ry="1"
                stroke="currentColor"
                strokeWidth="1"
                variants={rippleVariants}
                animate={controls}
                initial="normal"
                style={{ transformOrigin: '12px 21.7px' }}
              />
            </motion.g>
          </motion.g>
        </svg>
      </div>
    );
  }
);

Location01Icon.displayName = 'Location01Icon';

export { Location01Icon };
