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

// the lead profile nods first, then the two side profiles lean inward and their shoulders follow
const headVariants: Variants = {
  normal: { transform: 'translate(0px, 0px)' },
  animate: (position: number) => ({
    transform:
      position === 0
        ? ['translate(0px, 0px)', 'translate(0px, -0.45px)', 'translate(0px, 0px)']
        : [
            'translate(0px, 0px)',
            `translate(${position * -0.45}px, 0px)`,
            'translate(0px, 0px)',
          ],
    transition: {
      duration: 0.2,
      delay: position === 0 ? 0 : 0.035,
      ease: [0.23, 1, 0.32, 1],
      times: [0, 0.45, 1],
    },
  }),
};

const shoulderVariants: Variants = {
  normal: { transform: 'translate(0px, 0px)' },
  animate: (position: number) => ({
    transform:
      position === 0
        ? ['translate(0px, 0px)', 'translate(0px, 0.25px)', 'translate(0px, 0px)']
        : [
            'translate(0px, 0px)',
            `translate(${position * -0.35}px, 0px)`,
            'translate(0px, 0px)',
          ],
    transition: {
      duration: 0.19,
      delay: position === 0 ? 0.055 : 0.07,
      ease: [0.23, 1, 0.32, 1],
      times: [0, 0.45, 1],
    },
  }),
};

const UserGroupIcon = forwardRef<UserGroupIconHandle, UserGroupIconProps>(
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
          d="M15.5 11C15.5 9.067 13.933 7.5 12 7.5C10.067 7.5 8.5 9.067 8.5 11C8.5 12.933 10.067 14.5 12 14.5C13.933 14.5 15.5 12.933 15.5 11Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={headVariants}
          custom={0}
          animate={controls}
          initial="normal"
        />
        <motion.path
          d="M15.4827 11.3499C15.8047 11.4475 16.1462 11.5 16.5 11.5C18.433 11.5 20 9.933 20 8C20 6.067 18.433 4.5 16.5 4.5C14.6851 4.5 13.1928 5.8814 13.0173 7.65013" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={headVariants}
          custom={1}
          animate={controls}
          initial="normal"
        />
        <motion.path
          d="M10.9827 7.65013C10.8072 5.8814 9.31492 4.5 7.5 4.5C5.567 4.5 4 6.067 4 8C4 9.933 5.567 11.5 7.5 11.5C7.85381 11.5 8.19535 11.4475 8.51727 11.3499" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={headVariants}
          custom={-1}
          animate={controls}
          initial="normal"
        />
        <motion.path
          d="M22 16.5C22 13.7386 19.5376 11.5 16.5 11.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={shoulderVariants}
          custom={1}
          animate={controls}
          initial="normal"
        />
        <motion.path
          d="M17.5 19.5C17.5 16.7386 15.0376 14.5 12 14.5C8.96243 14.5 6.5 16.7386 6.5 19.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={shoulderVariants}
          custom={0}
          animate={controls}
          initial="normal"
        />
        <motion.path
          d="M7.5 11.5C4.46243 11.5 2 13.7386 2 16.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={shoulderVariants}
          custom={-1}
          animate={controls}
          initial="normal"
        />
        </svg>
      </div>
    );
  }
);

UserGroupIcon.displayName = 'UserGroupIcon';

export { UserGroupIcon };
