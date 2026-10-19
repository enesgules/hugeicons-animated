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

// The frame stays fixed. The divider nudges right, slides shut into the left
// wall, pauses there with the sidebar collapsed, then springs back open with a
// small overshoot. Its ends follow the frame's rounded corners on the way.
const dividerVariants: Variants = {
  normal: { d: 'M9 3V21' },
  animate: {
    d: [
      'M9 3V21',
      'M9.5 3.003V20.997',
      'M9.452 3.004V20.996',
      'M9.113 3.007V20.993',
      'M8.192 3.028V20.972',
      'M6.4 3.177V20.823',
      'M4.608 3.811V20.189',
      'M3.688 4.805V19.195',
      'M3.348 5.62V18.38',
      'M3.3 5.797V18.203',
      'M3.3 5.797V18.203',
      'M4.953 3.608V20.392',
      'M6.277 3.198V20.802',
      'M7.308 3.075V20.925',
      'M8.082 3.032V20.968',
      'M8.637 3.015V20.985',
      'M9.01 3.009V20.991',
      'M9.235 3.006V20.994',
      'M9.351 3.005V20.995',
      'M9.394 3.004V20.996',
      'M9.4 3.004V20.996',
      'M9 3V21',
    ],
    transition: {
      duration: 1.2,
      ease: 'linear',
      times: [
        0, 0.08, 0.11, 0.14, 0.17, 0.2, 0.23, 0.26, 0.29, 0.32, 0.52, 0.55, 0.58, 0.61, 0.64, 0.67,
        0.7, 0.73, 0.76, 0.79, 0.82, 1,
      ],
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
        </svg>
      </div>
    );
  },
);

PanelLeftIcon.displayName = 'PanelLeftIcon';

export { PanelLeftIcon };
