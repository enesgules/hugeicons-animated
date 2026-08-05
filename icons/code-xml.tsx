'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface CodeXmlIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CodeXmlIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const CODE_DURATION = 1.12;
const CODE_TIMES = [
  0, 0.05, 0.1, 0.16, 0.24, 0.34, 0.44, 0.56, 0.68, 0.76, 0.82, 0.87,
  0.92, 0.97, 1,
];

// The source slash clears toward the bottom left, like the established off icons.
const departingSlashVariants: Variants = {
  normal: {
    transform: 'translate(0px, 0px)',
    transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] },
  },
  animate: {
    transform: [
      'translate(0px, 0px)',
      'translate(-0.4px, 0.4px)',
      'translate(-1.4px, 1.4px)',
      'translate(-5px, 5px)',
      'translate(-24px, 24px)',
      'translate(-24px, 24px)',
      'translate(-24px, 24px)',
      'translate(-24px, 24px)',
      'translate(-24px, 24px)',
      'translate(-24px, 24px)',
      'translate(-24px, 24px)',
      'translate(-24px, 24px)',
      'translate(-24px, 24px)',
      'translate(-24px, 24px)',
      'translate(-24px, 24px)',
    ],
    transition: { duration: CODE_DURATION, ease: 'linear', times: CODE_TIMES },
  },
};

// A replacement slash returns from the top right while the brackets stay anchored.
const arrivingSlashVariants: Variants = {
  normal: {
    transform: 'translate(24px, -24px)',
    transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] },
  },
  animate: {
    transform: [
      'translate(24px, -24px)',
      'translate(24px, -24px)',
      'translate(24px, -24px)',
      'translate(24px, -24px)',
      'translate(24px, -24px)',
      'translate(24px, -24px)',
      'translate(24px, -24px)',
      'translate(24px, -24px)',
      'translate(24px, -24px)',
      'translate(24px, -24px)',
      'translate(18px, -18px)',
      'translate(8px, -8px)',
      'translate(1.6px, -1.6px)',
      'translate(-0.65px, 0.65px)',
      'translate(0px, 0px)',
    ],
    transition: { duration: CODE_DURATION, ease: 'linear', times: CODE_TIMES },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: { visibility: 'visible', transition: { duration: 0 } },
};

const CodeXmlIcon = forwardRef<CodeXmlIconHandle, CodeXmlIconProps>(
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
          overflow="hidden"
        >
          <motion.path
            d="M15 4L9 20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={departingSlashVariants}
            animate={controls}
            initial="normal"
          />
          <path
            d="M5.99997 16C5.99997 16 2.00001 13.054 2 12C1.99999 10.9459 6 8 6 8"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M18 8C18 8 22 10.946 22 12C22 13.0541 18 16 18 16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            <motion.path
              d="M15 4L9 20"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={arrivingSlashVariants}
              animate={controls}
              initial="normal"
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

CodeXmlIcon.displayName = 'CodeXmlIcon';

export { CodeXmlIcon };
