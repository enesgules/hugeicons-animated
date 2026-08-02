'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface LinkSquare02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface LinkSquare02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the arrow loads against the window, breaks outward, and the frame absorbs the release
const frameVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(0.985)', 'scale(1.008)', 'scale(1)'],
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
      times: [0, 0.42, 0.72, 1],
    },
  },
};

const arrowVariants: Variants = {
  normal: { transform: 'translate(0px, 0px)' },
  animate: {
    transform: [
      'translate(0px, 0px)',
      'translate(-0.45px, 0.45px)',
      'translate(1.35px, -1.35px)',
      'translate(0.15px, -0.15px)',
      'translate(0px, 0px)',
    ],
    transition: {
      duration: 0.42,
      ease: [0.23, 1, 0.32, 1],
      times: [0, 0.18, 0.56, 0.82, 1],
    },
  },
};

const LinkSquare02Icon = forwardRef<LinkSquare02IconHandle, LinkSquare02IconProps>(
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
          d="M11.0991 3.00012C7.45013 3.00669 5.53932 3.09629 4.31817 4.31764C3.00034 5.63568 3.00034 7.75704 3.00034 11.9997C3.00034 16.2424 3.00034 18.3638 4.31817 19.6818C5.63599 20.9999 7.75701 20.9999 11.9991 20.9999C16.241 20.9999 18.3621 20.9999 19.6799 19.6818C20.901 18.4605 20.9906 16.5493 20.9972 12.8998" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={frameVariants}
          animate={controls}
          initial="normal"
          style={{ transformOrigin: '12px 12px' }}
        />
        <motion.path
          d="M20.556 3.49612L11.0487 13.0586M20.556 3.49612C20.062 3.00151 16.7343 3.04761 16.0308 3.05762M20.556 3.49612C21.05 3.99074 21.0039 7.32273 20.9939 8.02714" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={arrowVariants}
          animate={controls}
          initial="normal"
        />
        </svg>
      </div>
    );
  }
);

LinkSquare02Icon.displayName = 'LinkSquare02Icon';

export { LinkSquare02Icon };
