'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ArrowUp02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ArrowUp02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the head launches upward first; the shaft stretches after it and answers with a smaller echo
const shaftVariants: Variants = {
  normal: { d: 'M12 5.5V19' },
  animate: {
    d: [
      'M12 5.5V19',
      'M12 5.5V14.5',
      'M12 5.5V19',
      'M12 5.5V16.5',
      'M12 5.5V19',
    ],
    transition: { duration: 0.8, ease: 'easeInOut', times: [0, 0.28, 0.55, 0.75, 1], delay: 0.04 },
  },
};

const headVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, -4, 0, -1.8, 0],
    transition: { duration: 0.8, ease: 'easeInOut', times: [0, 0.25, 0.55, 0.75, 1] },
  },
};

const ArrowUp02Icon = forwardRef<ArrowUp02IconHandle, ArrowUp02IconProps>(
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
            d="M12 5.5V19"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={shaftVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={headVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

ArrowUp02Icon.displayName = 'ArrowUp02Icon';

export { ArrowUp02Icon };
