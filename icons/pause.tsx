'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface PauseIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PauseIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the two bars settle like damped audio meters
const pauseBarVariants: Variants = {
  normal: { scaleY: 1, translateY: 0, transition: { type: 'spring', duration: 0.45, bounce: 0 } },
  animate: (i: number) => ({
    scaleY: [1, i === 0 ? 0.72 : 0.88, i === 0 ? 0.92 : 0.68, 1],
    translateY: [0, i === 0 ? 2 : 1, i === 0 ? 0.7 : 2.4, 0],
    transition: { duration: 0.8, times: [0, 0.28, 0.58, 1], ease: 'easeInOut' },
  }),
};

const PauseIcon = forwardRef<PauseIconHandle, PauseIconProps>(
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
            d="M4 7C4 5.58579 4 4.87868 4.43934 4.43934C4.87868 4 5.58579 4 7 4C8.41421 4 9.12132 4 9.56066 4.43934C10 4.87868 10 5.58579 10 7V17C10 18.4142 10 19.1213 9.56066 19.5607C9.12132 20 8.41421 20 7 20C5.58579 20 4.87868 20 4.43934 19.5607C4 19.1213 4 18.4142 4 17V7Z"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={pauseBarVariants}
            custom={0}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '7px 12px' }}
          />
          <motion.path
            d="M14 7C14 5.58579 14 4.87868 14.4393 4.43934C14.8787 4 15.5858 4 17 4C18.4142 4 19.1213 4 19.5607 4.43934C20 4.87868 20 5.58579 20 7V17C20 18.4142 20 19.1213 19.5607 19.5607C19.1213 20 18.4142 20 17 20C15.5858 20 14.8787 20 14.4393 19.5607C14 19.1213 14 18.4142 14 17V7Z"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={pauseBarVariants}
            custom={1}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '17px 12px' }}
          />
        </svg>
      </div>
    );
  }
);

PauseIcon.displayName = 'PauseIcon';

export { PauseIcon };
