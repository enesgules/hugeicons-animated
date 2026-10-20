'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface SmartPhone01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SmartPhone01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// An incoming buzz: the whole phone shakes in two quick, decaying bursts with
// a short rest between them, like a vibration alert.
const phoneVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: {
    transform: [
      'rotate(0deg)',
      'rotate(-8deg)',
      'rotate(8deg)',
      'rotate(-6deg)',
      'rotate(4deg)',
      'rotate(0deg)',
      'rotate(0deg)',
      'rotate(-6deg)',
      'rotate(5deg)',
      'rotate(-2deg)',
      'rotate(0deg)',
    ],
    transition: {
      duration: 0.9,
      ease: 'easeInOut',
      times: [0, 0.06, 0.14, 0.22, 0.3, 0.37, 0.5, 0.57, 0.66, 0.76, 0.86],
    },
  },
};

const SmartPhone01Icon = forwardRef<SmartPhone01IconHandle, SmartPhone01IconProps>(
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
          variants={phoneVariants}
          animate={controls}
          initial="normal"
          style={{ transformOrigin: '50% 50%' }}
        >
          <path
            d="M13.5 2H10.5C8.14298 2 6.96447 2 6.23223 2.73223C5.5 3.46447 5.5 4.64298 5.5 7V17C5.5 19.357 5.5 20.5355 6.23223 21.2678C6.96447 22 8.14298 22 10.5 22H13.5C15.857 22 17.0355 22 17.7678 21.2678C18.5 20.5355 18.5 19.357 18.5 17V7C18.5 4.64298 18.5 3.46447 17.7678 2.73223C17.0355 2 15.857 2 13.5 2Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M12.125 19H12M12.25 19C12.25 19.1381 12.1381 19.25 12 19.25C11.8619 19.25 11.75 19.1381 11.75 19C11.75 18.8619 11.8619 18.75 12 18.75C12.1381 18.75 12.25 18.8619 12.25 19Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </motion.svg>
      </div>
    );
  }
);

SmartPhone01Icon.displayName = 'SmartPhone01Icon';

export { SmartPhone01Icon };
