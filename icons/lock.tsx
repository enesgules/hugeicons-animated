'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface LockIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface LockIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// A key turns the lock cylinder: the keyhole presses back a little, turns a
// quarter turn about its round head with a small overshoot, holds, and turns
// back slowly so the close settles softly into the rest pose.
const keyholeVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, 8, -97, -90, -90, 3, 0],
    transition: {
      duration: 1.3,
      times: [0, 0.1, 0.36, 0.44, 0.58, 0.9, 1],
      ease: ['easeOut', [0.5, 0, 0.2, 1], 'easeOut', 'linear', [0.45, 0, 0.3, 1], 'easeInOut'],
    },
  },
};

const LockIcon = forwardRef<LockIconHandle, LockIconProps>(
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
          <path
            d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <motion.path
            d="M12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 13L12 16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={keyholeVariants}
            style={{ transformBox: 'view-box', originX: 12 / 24, originY: 11 / 24 }}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  },
);

LockIcon.displayName = 'LockIcon';

export { LockIcon };
