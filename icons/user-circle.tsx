'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface UserCircleIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface UserCircleIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// A real nod, as in user: the head dips forward on its neck and rocks back,
// and the shoulders settle after it.
const headVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, 16, -4, 0],
    transition: { duration: 0.6, ease: 'easeInOut', times: [0, 0.4, 0.7, 1] },
  },
};

// The shoulder ends sit on the ring, so the shoulders settle by squashing
// 0.6 down onto their base instead of sliding through the ring.
const shouldersVariants: Variants = {
  normal: { scaleY: 1 },
  animate: {
    scaleY: [1, 1, 0.9, 1],
    transition: { duration: 0.5, ease: 'easeOut', delay: 0.3 },
  },
};

const UserCircleIcon = forwardRef<UserCircleIconHandle, UserCircleIconProps>(
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
            d="M15.5 10.5C15.5 8.567 13.933 7 12 7C10.067 7 8.5 8.567 8.5 10.5C8.5 12.433 10.067 14 12 14C13.933 14 15.5 12.433 15.5 10.5Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={headVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 13 / 24 }}
          />
          <path
            d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M18 20C18 16.6863 15.3137 14 12 14C8.68629 14 6 16.6863 6 20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={shouldersVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 20 / 24 }}
          />
        </svg>
      </div>
    );
  }
);

UserCircleIcon.displayName = 'UserCircleIcon';

export { UserCircleIcon };
