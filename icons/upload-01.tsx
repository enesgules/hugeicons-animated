'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Upload01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Upload01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the tray loads the arrow like a spring and launches it cleanly upward
const trayVariants: Variants = {
  normal: { y: 0, scaleY: 1 },
  animate: {
    y: [0, 0.7, -0.25, 0],
    scaleY: [1, 0.96, 1.02, 1],
    transition: { duration: 0.52, ease: [0.23, 1, 0.32, 1], times: [0, 0.24, 0.58, 1] },
  },
};

const arrowVariants: Variants = {
  normal: { y: 0 },
  animate: {
    y: [0, 1.5, -2.8, 0],
    transition: { duration: 0.52, ease: [0.23, 1, 0.32, 1], times: [0, 0.22, 0.64, 1] },
  },
};

const Upload01Icon = forwardRef<Upload01IconHandle, Upload01IconProps>(
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
            d="M2.99994 17C2.99994 17.93 2.99994 18.395 3.10216 18.7765C3.37956 19.8117 4.18821 20.6204 5.22348 20.8978C5.60498 21 6.06997 21 6.99994 21L16.9999 21C17.9299 21 18.3949 21 18.7764 20.8978C19.8117 20.6204 20.6203 19.8117 20.8977 18.7765C20.9999 18.395 20.9999 17.93 20.9999 17"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={trayVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 19 / 24 }}
          />
          <motion.path
            d="M16.5 7.49993C16.5 7.49993 13.1858 2.99997 12 2.99996C10.8141 2.99995 7.50002 7.49996 7.50002 7.49996M12 3.99996V16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={arrowVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

Upload01Icon.displayName = 'Upload01Icon';

export { Upload01Icon };
