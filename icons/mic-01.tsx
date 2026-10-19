'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Mic01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Mic01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// Mic check: the capsule is tapped and rocks in its yoke like a pendulum.
// It pivots on the yoke's centre, so it never touches the yoke.
const capsuleVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, -18, 13, -8, 4, -1.5, 0],
    transition: {
      duration: 1.05,
      ease: 'easeInOut',
      times: [0, 0.16, 0.36, 0.54, 0.7, 0.85, 1],
    },
  },
};

const Mic01Icon = forwardRef<Mic01IconHandle, Mic01IconProps>(
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
            variants={capsuleVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 11 / 24 }}
          >
            <path
              d="M17 7V11C17 13.7614 14.7614 16 12 16C9.23858 16 7 13.7614 7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M17 7H14M17 11H14"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
            />
          </motion.g>
          <path
            d="M20 11C20 15.4183 16.4183 19 12 19M12 19C7.58172 19 4 15.4183 4 11M12 19V22M12 22H15M12 22H9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    );
  }
);

Mic01Icon.displayName = 'Mic01Icon';

export { Mic01Icon };
