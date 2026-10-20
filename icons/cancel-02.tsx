'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Cancel02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Cancel02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// Cancel, as the cross in Circle X: the X winds back small, swings past its
// rest angle a little large, and settles.
const crossVariants: Variants = {
  normal: { transform: 'rotate(0deg) scale(1)' },
  animate: {
    transform: [
      'rotate(0deg) scale(1)',
      'rotate(-10deg) scale(0.82)',
      'rotate(4deg) scale(1.08)',
      'rotate(0deg) scale(1)',
    ],
    transition: { duration: 0.42, ease: [0.23, 1, 0.32, 1] },
  },
};

const Cancel02Icon = forwardRef<Cancel02IconHandle, Cancel02IconProps>(
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
            d="M5.43212 18.5679C6.00828 19.144 6.94243 19.144 7.51859 18.5679L12.0003 14.0863L16.4814 18.5672C17.0573 19.1431 17.9909 19.1434 18.5672 18.5679C19.144 17.9919 19.1443 17.0573 18.5679 16.4809L14.0868 12L18.5679 7.51913C19.1438 6.94326 19.1441 6.0097 18.5686 5.43346C17.9925 4.85669 17.0578 4.85638 16.4814 5.43278L12.0003 9.91365L7.51859 5.4321C6.94243 4.85597 6.00828 4.85597 5.43212 5.4321C4.85596 6.00823 4.85596 6.94232 5.43212 7.51845L9.91387 12L5.43212 16.4816C4.85596 17.0577 4.85596 17.9918 5.43212 18.5679Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={crossVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 0.5 }}
          />
        </svg>
      </div>
    );
  }
);

Cancel02Icon.displayName = 'Cancel02Icon';

export { Cancel02Icon };
