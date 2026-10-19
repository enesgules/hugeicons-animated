'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Bookmark02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Bookmark02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// The ribbon lifts out of the page, drops back into the binding, squashes on
// landing, and springs to its saved length.
const ribbonVariants: Variants = {
  normal: { transform: 'translateY(0px) scaleY(1)' },
  animate: {
    transform: [
      'translateY(0px) scaleY(1)',
      'translateY(-1.4px) scaleY(1.04)',
      'translateY(2.4px) scaleY(0.88)',
      'translateY(-0.7px) scaleY(1.04)',
      'translateY(0.2px) scaleY(0.99)',
      'translateY(0px) scaleY(1)',
    ],
    transition: {
      duration: 0.72,
      times: [0, 0.22, 0.46, 0.66, 0.84, 1],
      ease: ['easeOut', [0.55, 0, 0.9, 0.45], 'easeOut', 'easeInOut', 'easeInOut'],
    },
  },
};

const Bookmark02Icon = forwardRef<Bookmark02IconHandle, Bookmark02IconProps>(
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
            d="M4 17.9808V9.70753C4 6.07416 4 4.25748 5.17157 3.12874C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.12874C20 4.25748 20 6.07416 20 9.70753V17.9808C20 20.2867 20 21.4396 19.2272 21.8523C17.7305 22.6514 14.9232 19.9852 13.59 19.1824C12.8168 18.7168 12.4302 18.484 12 18.484C11.5698 18.484 11.1832 18.7168 10.41 19.1824C9.0768 19.9852 6.26947 22.6514 4.77285 21.8523C4 21.4396 4 20.2867 4 17.9808Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={ribbonVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 22 / 24 }}
          />
        </svg>
      </div>
    );
  }
);

Bookmark02Icon.displayName = 'Bookmark02Icon';

export { Bookmark02Icon };
