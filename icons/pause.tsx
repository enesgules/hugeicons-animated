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

const PAUSE_DURATION = 0.52;
const PAUSE_TIMES = [0, 0.22, 0.5, 0.76, 1];

// The pair compresses toward the center, releases outward, and settles as one control.
const pauseBarVariants: Variants = {
  normal: {
    transform: 'translate(0px, 0px) scaleY(1)',
    transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] },
  },
  animate: (i: number) => {
    const direction = i === 0 ? 1 : -1;

    return {
      transform: [
        'translate(0px, 0px) scaleY(1)',
        `translate(${direction * 0.8}px, 0.65px) scaleY(0.91)`,
        `translate(${direction * -0.55}px, -0.35px) scaleY(1.045)`,
        `translate(${direction * 0.14}px, 0px) scaleY(0.99)`,
        'translate(0px, 0px) scaleY(1)',
      ],
      transition: {
        duration: PAUSE_DURATION,
        times: PAUSE_TIMES,
        ease: [0.77, 0, 0.175, 1],
      },
    };
  },
};

const PauseIcon = forwardRef<PauseIconHandle, PauseIconProps>(
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
