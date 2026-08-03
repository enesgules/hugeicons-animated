'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface InboxIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface InboxIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the tray rises to catch incoming weight, then the whole inbox settles
const inboxVariants: Variants = {
  normal: { transform: 'scaleY(1)' },
  animate: {
    transform: ['scaleY(1)', 'scaleY(1.025)', 'scaleY(0.94)', 'scaleY(1)'],
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1], times: [0, 0.3, 0.58, 1] },
  },
};

const trayVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(-1.6px)', 'translateY(1.15px)', 'translateY(-0.25px)', 'translateY(0px)'],
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1], times: [0, 0.5, 0.78, 1] },
  },
};

const InboxIcon = forwardRef<InboxIconHandle, InboxIconProps>(
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
            d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={inboxVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 18px' }}
          />
          <motion.path
            d="M21.5 13.5H16.5743C15.7322 13.5 15.0706 14.2036 14.6995 14.9472C14.2963 15.7551 13.4889 16.5 12 16.5C10.5111 16.5 9.70373 15.7551 9.30054 14.9472C8.92942 14.2036 8.26777 13.5 7.42566 13.5H2.5"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={trayVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 14px' }}
          />
        </svg>
      </div>
    );
  }
);

InboxIcon.displayName = 'InboxIcon';

export { InboxIcon };
