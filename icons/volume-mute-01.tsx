'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface VolumeMute01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface VolumeMute01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// rest-parity: hidden-added-geometry

const speakerVariants: Variants = {
  normal: { transform: 'scaleX(1)' },
  animate: {
    transform: ['scaleX(1)', 'scaleX(0.94)', 'scaleX(1.015)', 'scaleX(1)'],
    transition: { duration: 0.46, ease: [0.23, 1, 0.32, 1] },
  },
};

const muteMarkVariants: Variants = {
  normal: { opacity: 0, pathLength: 0, transform: 'scale(1)' },
  animate: {
    opacity: [0, 1, 1],
    pathLength: [0, 1, 1],
    transform: ['scale(0.72)', 'scale(1.12)', 'scale(1)'],
    transition: { duration: 0.44, delay: 0.04, ease: [0.23, 1, 0.32, 1] },
  },
};

const VolumeMute01Icon = forwardRef<VolumeMute01IconHandle, VolumeMute01IconProps>(
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
          d="M18 14.8135V9.18646C18 6.04126 18 4.46866 17.074 4.0773C16.1481 3.68593 15.0583 4.79793 12.8787 7.02192C11.7499 8.17365 11.1059 8.42869 9.5 8.42869C8.3879 8.42869 7.02749 8.28131 6.33706 9.33566C6 9.85038 6 10.5669 6 12C6 13.4331 6 14.1496 6.33706 14.6643C7.02749 15.7187 8.3879 15.5713 9.5 15.5713C11.106 15.5713 11.7499 15.8264 12.8787 16.9781C15.0583 19.2021 16.1481 20.3141 17.074 19.9227C18 19.5313 18 17.9587 18 14.8135Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={speakerVariants}
          style={{ transformOrigin: '12px 12px' }}
          animate={controls}
          initial="normal"
        />
        <motion.path
          d="M20 9.75L23 14.25M23 9.75L20 14.25"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
          variants={muteMarkVariants}
          style={{ transformOrigin: '21.5px 12px' }}
          animate={controls}
          initial="normal"
        />
        </svg>
      </div>
    );
  }
);

VolumeMute01Icon.displayName = 'VolumeMute01Icon';

export { VolumeMute01Icon };
