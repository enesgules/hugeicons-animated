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

// the pin drops into place and the add mark confirms the destination
const pinVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px)', 'translateY(-1px)', 'translateY(0.5px)', 'translateY(0px)'],
    transition: { duration: 0.48, ease: [0.23, 1, 0.32, 1] },
  },
};

const plusVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(0.72)', 'scale(1.14)', 'scale(1)'],
    transition: { duration: 0.4, delay: 0.05, ease: [0.23, 1, 0.32, 1] },
  },
};

const LocationAdd01Icon = forwardRef<LocationAdd01IconHandle, LocationAdd01IconProps>(
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
            d="M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={pinVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 22px' }}
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
        </svg>
      </div>
    );
  }
);

LocationAdd01Icon.displayName = 'LocationAdd01Icon';

export { LocationAdd01Icon };
