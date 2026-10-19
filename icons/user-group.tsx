'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface UserGroupIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface UserGroupIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the group cheers together: all three crouch, jump as one, and land with a
// squash. They move as one body so the overlapping heads stay joined.
const groupVariants: Variants = {
  normal: { transform: 'translateY(0%) scaleX(1) scaleY(1)' },
  animate: {
    transform: [
      'translateY(0%) scaleX(1) scaleY(1)',
      'translateY(0%) scaleX(1.06) scaleY(0.9)',
      'translateY(-10%) scaleX(0.97) scaleY(1.05)',
      'translateY(0%) scaleX(1.05) scaleY(0.93)',
      'translateY(-3%) scaleX(1) scaleY(1)',
      'translateY(0%) scaleX(1) scaleY(1)',
    ],
    transition: {
      duration: 0.95,
      ease: ['easeOut', [0.33, 0, 0.2, 1], 'easeIn', 'easeOut', 'easeIn'],
      times: [0, 0.16, 0.4, 0.6, 0.8, 1],
    },
  },
};

const UserGroupIcon = forwardRef<UserGroupIconHandle, UserGroupIconProps>(
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
          variants={groupVariants}
          animate={controls}
          initial="normal"
          style={{ transformOrigin: '50% 81.25%' }}
        >
          <path
            d="M15.5 11C15.5 9.067 13.933 7.5 12 7.5C10.067 7.5 8.5 9.067 8.5 11C8.5 12.933 10.067 14.5 12 14.5C13.933 14.5 15.5 12.933 15.5 11Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M15.4827 11.3499C15.8047 11.4475 16.1462 11.5 16.5 11.5C18.433 11.5 20 9.933 20 8C20 6.067 18.433 4.5 16.5 4.5C14.6851 4.5 13.1928 5.8814 13.0173 7.65013"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M10.9827 7.65013C10.8072 5.8814 9.31492 4.5 7.5 4.5C5.567 4.5 4 6.067 4 8C4 9.933 5.567 11.5 7.5 11.5C7.85381 11.5 8.19535 11.4475 8.51727 11.3499"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M22 16.5C22 13.7386 19.5376 11.5 16.5 11.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M17.5 19.5C17.5 16.7386 15.0376 14.5 12 14.5C8.96243 14.5 6.5 16.7386 6.5 19.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M7.5 11.5C4.46243 11.5 2 13.7386 2 16.5"
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

UserGroupIcon.displayName = 'UserGroupIcon';

export { UserGroupIcon };
