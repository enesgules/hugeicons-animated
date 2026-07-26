'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface NotificationOff01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface NotificationOff01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the bell tries one muted shake before the slash quiets it
const clapperVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: ['translateX(0px)', 'translateX(-0.6px)', 'translateX(0.4px)', 'translateX(0px)'],
    transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] },
  },
};

const slashVariants: Variants = {
  normal: { transform: 'scaleX(1)' },
  animate: {
    transform: ['scaleX(0.84)', 'scaleX(1.04)', 'scaleX(1)'],
    transition: { duration: 0.26, ease: [0.23, 1, 0.32, 1] },
  },
};

const bellVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: {
    transform: ['rotate(0deg)', 'rotate(-2deg)', 'rotate(1deg)', 'rotate(0deg)'],
    transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] },
  },
};

const NotificationOff01Icon = forwardRef<NotificationOff01IconHandle, NotificationOff01IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start('animate'),
        stopAnimation: () => controls.start('normal'),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) controls.start('animate');
        else onMouseEnter?.(e);
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) controls.start('normal');
        else onMouseLeave?.(e);
      },
      [controls, onMouseLeave]
    );

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
            d="M15.5 18C15.5 19.933 13.933 21.5 12 21.5C10.067 21.5 8.5 19.933 8.5 18"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={clapperVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 18px' }}
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
            variants={bellVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 3px' }}
          />
        </svg>
      </div>
    );
  }
);

NotificationOff01Icon.displayName = 'NotificationOff01Icon';

export { NotificationOff01Icon };
