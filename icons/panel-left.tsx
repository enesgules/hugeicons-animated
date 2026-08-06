'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface PanelLeftIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PanelLeftIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const panelVariants: Variants = {
  normal: { transform: 'scaleX(1) scaleY(1)' },
  animate: {
    transform: [
      'scaleX(1) scaleY(1)',
      'scaleX(0.998) scaleY(1)',
      'scaleX(0.992) scaleY(0.997)',
      'scaleX(0.985) scaleY(0.99)',
      'scaleX(0.985) scaleY(0.99)',
      'scaleX(0.994) scaleY(0.996)',
      'scaleX(1) scaleY(0.995)',
      'scaleX(0.998) scaleY(0.999)',
      'scaleX(1) scaleY(1)',
    ],
    transition: {
      duration: 0.72,
      ease: 'linear',
      times: [0, 0.1, 0.22, 0.32, 0.5, 0.66, 0.82, 0.92, 1],
    },
  },
};

// The divider follows the frame's rounded edge as the sidebar closes and reopens.
const dividerVariants: Variants = {
  normal: { d: 'M9 3V21' },
  animate: {
    d: [
      'M9 3V21',
      'M6.8 3.123V20.877',
      'M4.3 4.051V19.949',
      'M3.4 5.456V18.544',
      'M3.4 5.456V18.544',
      'M5.4 3.419V20.581',
      'M8.3 3.02V20.98',
      'M9.25 3V21',
      'M9 3V21',
    ],
    transition: {
      duration: 0.72,
      ease: 'linear',
      times: [0, 0.1, 0.22, 0.32, 0.5, 0.66, 0.82, 0.92, 1],
    },
  },
};

const PanelLeftIcon = forwardRef<PanelLeftIconHandle, PanelLeftIconProps>(
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
            variants={panelVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 12px' }}
          >
            <path
              d="M13 3H11C7.22876 3 5.34315 3 4.17157 4.17157C3 5.34315 3 7.22876 3 11V13C3 16.7712 3 18.6569 4.17157 19.8284C5.34315 21 7.22876 21 11 21H13C16.7712 21 18.6569 21 19.8284 19.8284C21 18.6569 21 16.7712 21 13V11C21 7.22876 21 5.34315 19.8284 4.17157C18.6569 3 16.7712 3 13 3Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <motion.path
              d="M9 3V21"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={dividerVariants}
              animate={controls}
              initial="normal"
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

PanelLeftIcon.displayName = 'PanelLeftIcon';

export { PanelLeftIcon };
