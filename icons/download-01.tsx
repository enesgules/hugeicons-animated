'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Download01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Download01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const TRANSFER_DURATION = 0.9;
const TRANSFER_TIMES = [0, 0.16, 0.4, 1];
const ARROW_LAND = springEase(0.5, 0.3);
const CONTAINER_LAND = springEase(0.45, 0.35);

// Transfer (download): the arrow winds up, drops into the tray, and springs
// back; the tray squashes on the impact and springs back.
const arrowVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px)', 'translateY(-0.8px)', 'translateY(2.4px)', 'translateY(0px)'],
    transition: {
      duration: TRANSFER_DURATION,
      times: TRANSFER_TIMES,
      ease: ['easeOut', [0.4, 0, 0.2, 1], ARROW_LAND],
    },
  },
};

const containerVariants: Variants = {
  normal: { transform: 'translateY(0px) scale(1, 1)' },
  animate: {
    transform: [
      'translateY(0px) scale(1, 1)',
      'translateY(0px) scale(1, 1)',
      'translateY(0.8px) scale(1.03, 0.95)',
      'translateY(0px) scale(1, 1)',
    ],
    transition: {
      duration: TRANSFER_DURATION,
      times: TRANSFER_TIMES,
      ease: ['linear', 'easeIn', CONTAINER_LAND],
    },
  },
};

const Download01Icon = forwardRef<Download01IconHandle, Download01IconProps>(
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
            d="M2.99969 17.0002C2.99969 17.9302 2.99969 18.3952 3.10192 18.7767C3.37932 19.8119 4.18796 20.6206 5.22324 20.898C5.60474 21.0002 6.06972 21.0002 6.99969 21.0002L16.9997 21.0002C17.9297 21.0002 18.3947 21.0002 18.7762 20.898C19.8114 20.6206 20.6201 19.8119 20.8975 18.7767C20.9997 18.3952 20.9997 17.9302 20.9997 17.0002"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={containerVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 21 / 24 }}
          />
          <motion.path
            d="M16.4998 11.5002C16.4998 11.5002 13.1856 16.0002 11.9997 16.0002C10.8139 16.0002 7.49976 11.5002 7.49976 11.5002M11.9997 15.0002V3.00016"
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

Download01Icon.displayName = 'Download01Icon';

export { Download01Icon };
