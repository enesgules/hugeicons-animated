'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface UserIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface UserIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// a real nod — the head dips on its neck, the shoulders settle after
const headVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, 16, -4, 0],
    transition: { duration: 0.6, ease: 'easeInOut', times: [0, 0.4, 0.7, 1] },
  },
};

const bodyVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, 0, 0.6, 0],
    transition: { duration: 0.5, ease: 'easeOut', delay: 0.3 },
  },
};

const UserIcon = forwardRef<UserIconHandle, UserIconProps>(
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
            d="M17 8.5C17 5.73858 14.7614 3.5 12 3.5C9.23858 3.5 7 5.73858 7 8.5C7 11.2614 9.23858 13.5 12 13.5C14.7614 13.5 17 11.2614 17 8.5Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={headVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', transformOrigin: '12px 13.5px' }}
          />
          <motion.path
            d="M19 20.5C19 16.634 15.866 13.5 12 13.5C8.13401 13.5 5 16.634 5 20.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={bodyVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

UserIcon.displayName = 'UserIcon';

export { UserIcon };
