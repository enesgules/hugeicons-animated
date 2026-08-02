'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface EyeOffIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface EyeOffIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the privacy slash cuts across first, briefly quieting the eye beneath it
const outerEyeVariants: Variants = {
  normal: { opacity: 1 },
  animate: {
    opacity: [1, 0.68, 1],
    transition: { duration: 0.24, delay: 0.025, ease: [0.23, 1, 0.32, 1] },
  },
};

const pupilVariants: Variants = {
  normal: { opacity: 1 },
  animate: {
    opacity: [1, 0.18, 1],
    transition: { duration: 0.2, delay: 0.035, ease: [0.23, 1, 0.32, 1] },
  },
};

const slashVariants: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [0, 1],
    opacity: [0.55, 1],
    transition: { duration: 0.22, ease: [0.23, 1, 0.32, 1] },
  },
};

const EyeOffIcon = forwardRef<EyeOffIconHandle, EyeOffIconProps>(
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
          d="M6.43385 6.51953C4.22009 7.89049 2.93281 9.86457 2.31858 11.0339C2.10621 11.4382 2.00003 11.6403 2 12.0082C1.99997 12.3761 2.10584 12.5777 2.3176 12.981C3.32862 14.9066 6.16702 19.0195 11.9669 19.0195C14.2454 19.0195 16.0669 18.3848 17.5 17.4972" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={outerEyeVariants}
          animate={controls}
          initial="normal"
        />
        <motion.path
          d="M9.87868 9.87868C9.33579 10.4216 9 11.1716 9 12C9 13.6569 10.3431 15 12 15C12.8284 15 13.5784 14.6642 14.1213 14.1213" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"
          variants={pupilVariants}
          animate={controls}
          initial="normal"
        />
        <motion.path
          d="M2 2L22 22" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={slashVariants}
          animate={controls}
          initial="normal"
        />
        <motion.path
          d="M10 5.14847C10.5934 5.05255 11.224 5 11.8936 5C17.7747 5 20.6528 9.05385 21.6779 10.9517C21.8927 11.3492 22 11.548 22 11.9106C22 12.2733 21.8921 12.4727 21.6765 12.8717C21.3678 13.4428 20.8916 14.2085 20.2167 15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={outerEyeVariants}
          animate={controls}
          initial="normal"
        />
        </svg>
      </div>
    );
  }
);

EyeOffIcon.displayName = 'EyeOffIcon';

export { EyeOffIcon };
