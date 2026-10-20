'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ExternalLinkIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ExternalLinkIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const LAUNCH_DURATION = 0.8;
const LAUNCH_TIMES = [0, 0.16, 0.4, 1];
const ARROW_LAND = springEase(0.5, 0.3);
const FRAME_LAND = springEase(0.45, 0.35);

// Launch, shared by the link and share icons: the arrow winds back into the
// frame, darts out of it, and springs back; the frame dips as the arrow loads
// and springs back as it leaves.
const arrowVariants: Variants = {
  normal: { transform: 'translate(0px, 0px)' },
  animate: {
    transform: [
      'translate(0px, 0px)',
      'translate(-0.7px, 0.7px)',
      'translate(2.8px, -2.8px)',
      'translate(0px, 0px)',
    ],
    transition: {
      duration: LAUNCH_DURATION,
      times: LAUNCH_TIMES,
      ease: ['easeOut', [0.4, 0, 0.2, 1], ARROW_LAND],
    },
  },
};

const frameVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(0.95)', 'scale(1.03)', 'scale(1)'],
    transition: {
      duration: LAUNCH_DURATION,
      times: LAUNCH_TIMES,
      ease: ['easeOut', [0.4, 0, 0.2, 1], FRAME_LAND],
    },
  },
};

const ExternalLinkIcon = forwardRef<ExternalLinkIconHandle, ExternalLinkIconProps>(
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
            d="M15 3H18C19.4142 3 20.1213 3 20.5607 3.43934C21 3.87868 21 4.58579 21 6V9M20 4L11 13"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={arrowVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M20 13C20 16.7712 20 18.6569 18.8284 19.8284C17.6569 21 15.7712 21 12 21H11C7.22876 21 5.34315 21 4.17157 19.8284C3 18.6569 3 16.7712 3 13V12C3 8.22876 3 6.34315 4.17157 5.17157C5.34315 4 7.22876 4 11 4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={frameVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

ExternalLinkIcon.displayName = 'ExternalLinkIcon';

export { ExternalLinkIcon };
