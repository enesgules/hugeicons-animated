'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Search01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Search01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// The complete magnifier moves closer to the subject, holds the zoom, and returns.
const svgVariants: Variants = {
  normal: { transform: 'translate(0px, 0px) rotate(0deg)' },
  animate: {
    transform: [
      'translate(0px, 0px) rotate(0deg) scale(1)',
      'translate(-0.4px, -0.4px) rotate(-2deg) scale(0.97)',
      'translate(0.6px, 0.6px) rotate(2deg) scale(1.12)',
      'translate(0.75px, 0.75px) rotate(1deg) scale(1.12)',
      'translate(-0.15px, -0.15px) rotate(-0.5deg) scale(1.04)',
      'translate(0px, 0px) rotate(0deg) scale(1)',
    ],
    transition: {
      duration: 0.66,
      ease: [0.77, 0, 0.175, 1],
      times: [0, 0.16, 0.38, 0.55, 0.72, 1],
    },
  },
};

const Search01Icon = forwardRef<Search01IconHandle, Search01IconProps>(
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
          variants={svgVariants}
          animate={controls}
          initial="normal"
          style={{ transformOrigin: '11px 11px' }}
        >
          <path
            d="M17 17L21 21"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z"
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

Search01Icon.displayName = 'Search01Icon';

export { Search01Icon };
