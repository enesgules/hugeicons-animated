'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Loading03IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Loading03IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// a loading glyph is a wheel, so keep every spoke visible and rotate the set
const loaderVariants: Variants = {
  normal: { transform: 'rotate(0deg)', transition: { duration: 0.18 } },
  animate: {
    transform: 'rotate(360deg)',
    transition: { duration: 0.82, ease: 'linear', repeat: Infinity },
  },
};

const Loading03Icon = forwardRef<Loading03IconHandle, Loading03IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const { handleMouseEnter, handleMouseLeave } = useIconAnimation({
      controls,
      loops: true,
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
          variants={loaderVariants}
          animate={controls}
          initial="normal"
          style={{ transformOrigin: '12px 12px' }}
        >
          <path
            d="M12 3V6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
          <path
            d="M12 18V21"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
          <path
            d="M21 12L18 12"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
          <path
            d="M6 12L3 12"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
          <path
            d="M18.3635 5.63672L16.2422 7.75804"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
          <path
            d="M7.75804 16.2422L5.63672 18.3635"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
          <path
            d="M18.3635 18.3635L16.2422 16.2422"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
          <path
            d="M7.75804 7.75804L5.63672 5.63672"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
        </motion.svg>
      </div>
    );
  }
);

Loading03Icon.displayName = 'Loading03Icon';

export { Loading03Icon };
