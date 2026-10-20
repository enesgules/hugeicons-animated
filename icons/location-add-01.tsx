'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface LocationAdd01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface LocationAdd01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// The pin and add mark hop and settle as one object.
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

// The plus contracts on lift and pulses once when the pin lands.
const plusVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: [
      'scale(1)',
      'scale(0.9)',
      'scale(1.15)',
      'scale(0.97)',
      'scale(1)',
    ],
    transition: {
      duration: 0.68,
      ease: [0.23, 1, 0.32, 1],
      times: [0, 0.34, 0.58, 0.78, 1],
    },
  },
};

const LocationAdd01Icon = forwardRef<LocationAdd01IconHandle, LocationAdd01IconProps>(
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
            <motion.path
              d="M15.5 11H12M12 11H8.5M12 11V14.5M12 11L12 7.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={plusVariants}
              animate={controls}
              initial="normal"
              style={{ transformOrigin: '12px 11px' }}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

LocationAdd01Icon.displayName = 'LocationAdd01Icon';

export { LocationAdd01Icon };
