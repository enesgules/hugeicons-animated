'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface FlashIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FlashIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// The bolt winds up (rises and tightens), then strikes down along its own
// diagonal with an electric jitter. At the strike, two short zigzag sparks
// jump off the top and bottom tips and burn away before the bolt settles.
const BOLT_DURATION = 0.9;

const boltVariants: Variants = {
  normal: { transform: 'translate(0px, 0px) scale(1)' },
  animate: {
    transform: [
      'translate(0px, 0px) scale(1)',
      'translate(-0.4px, -0.9px) scale(0.9)',
      'translate(0.35px, 0.8px) scale(1.1)',
      'translate(-0.4px, 0.5px) scale(1.06)',
      'translate(0.35px, 0.3px) scale(1.04)',
      'translate(-0.2px, 0.1px) scale(1.02)',
      'translate(0.08px, 0px) scale(0.99)',
      'translate(0px, 0px) scale(1)',
    ],
    transition: {
      duration: BOLT_DURATION,
      ease: ['easeInOut', [0.55, 0, 1, 0.45], 'linear', 'linear', 'linear', 'easeOut', 'easeInOut'],
      times: [0, 0.24, 0.34, 0.41, 0.48, 0.56, 0.72, 1],
    },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: { visibility: 'visible', transition: { duration: 0 } },
};

// each spark is drawn outward from the bolt, then its inner end chases the
// outer end until it burns out at the tip
const sparkVariants: Variants = {
  normal: { pathLength: 0, pathOffset: 0, visibility: 'hidden' },
  animate: {
    pathLength: [0, 0, 1, 0.08, 0, 0],
    pathOffset: [0, 0, 0, 0.92, 1, 1],
    visibility: ['hidden', 'hidden', 'visible', 'visible', 'hidden', 'hidden'],
    transition: {
      duration: BOLT_DURATION,
      ease: ['linear', [0.23, 1, 0.32, 1], [0.4, 0, 0.6, 1], 'linear', 'linear'],
      times: [0, 0.33, 0.43, 0.68, 0.7, 1],
    },
  },
};

const FlashIcon = forwardRef<FlashIconHandle, FlashIconProps>(
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
            <motion.path
              d="M16.8 7.6L19 6.6L17.8 4.9L20.2 3.8"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={sparkVariants}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d="M7.2 16.4L5 17.4L6.2 19.1L3.8 20.2"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={sparkVariants}
              animate={controls}
              initial="normal"
            />
          </motion.g>
          <motion.path
            d="M5.22576 11.3294L12.224 2.34651C12.7713 1.64397 13.7972 2.08124 13.7972 3.01707V9.96994C13.7972 10.5305 14.1995 10.985 14.6958 10.985H18.0996C18.8729 10.985 19.2851 12.0149 18.7742 12.6706L11.776 21.6535C11.2287 22.356 10.2028 21.9188 10.2028 20.9829V14.0301C10.2028 13.4695 9.80048 13.015 9.3042 13.015H5.90035C5.12711 13.015 4.71494 11.9851 5.22576 11.3294Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={boltVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 0.5 }}
          />
        </svg>
      </div>
    );
  }
);

FlashIcon.displayName = 'FlashIcon';

export { FlashIcon };
