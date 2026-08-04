'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface NotificationOff01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface NotificationOff01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// a complete bell settles first, then the slash crosses it as a separate action
const slashVariants: Variants = {
  normal: { pathLength: 1 },
  animate: {
    pathLength: [0, 0, 1],
    transition: { duration: 0.52, delay: 0.08, ease: [0.23, 1, 0.32, 1], times: [0, 0.22, 1] },
  },
};

const bellVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: {
    transform: ['rotate(-4deg)', 'rotate(2deg)', 'rotate(0deg)'],
    transition: { duration: 0.34, ease: [0.23, 1, 0.32, 1] },
  },
};

const sourceOffBellVariants: Variants = {
  normal: { opacity: 1, transition: { duration: 0.08 } },
  animate: { opacity: 0, transition: { duration: 0.08 } },
};
const generatedGeometryVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.08 } },
  animate: { opacity: 1, transition: { duration: 0.08 } },
};


const NotificationOff01Icon = forwardRef<NotificationOff01IconHandle, NotificationOff01IconProps>(
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
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
          <motion.g variants={bellVariants} animate={controls} initial="normal" style={{ transformOrigin: '12px 3px' }}>
            <path d="M20 18.5011L18.349 7.93407C17.8603 4.80601 15.166 2.5 12 2.5C8.83398 2.5 6.13971 4.80601 5.65098 7.93407L4 18.5011" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d="M20 18.5C20 16.8431 16.4183 15.5 12 15.5C7.58172 15.5 4 16.8431 4 18.5C4 20.1569 7.58172 21.5 12 21.5C16.4183 21.5 20 20.1569 20 18.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d="M13 18.5H11" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
          </motion.g>
          </motion.g>
          <motion.path
            d="M15.5 18C15.5 19.933 13.933 21.5 12 21.5C10.067 21.5 8.5 19.933 8.5 18"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={sourceOffBellVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M2 2L22 22"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={slashVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 12px' }}
          />
          <motion.path
            d="M21 16.2311C21 15.762 20.8136 15.3121 20.4819 14.9803L19.8787 14.3771C19.3161 13.8145 19 13.0514 19 12.2558V9.5C19 5.634 15.866 2.5 12 2.5C10.4497 2.5 9.01706 3.00399 7.85707 3.85707M4.76887 18C3.79195 18 3 17.208 3 16.2311C3 15.762 3.18636 15.3121 3.51809 14.9803L4.12132 14.3771C4.68393 13.8145 5 13.0514 5 12.2558V9.5C5 8.20839 5.34981 6.99849 5.95987 5.95987L18 18H4.76887Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={sourceOffBellVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

NotificationOff01Icon.displayName = 'NotificationOff01Icon';

export { NotificationOff01Icon };
