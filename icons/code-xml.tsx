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

const CODE_DURATION = 1;

// The brackets part like an opening tag, the slash flips a half turn in the
// gap (a slash looks the same after 180deg), then the brackets snap shut.
const bracketVariants: Variants = {
  normal: { translateX: 0 },
  animate: (side: number) => ({
    translateX: [0, 0.5, -1.6, -1.6, 0.35, 0].map((v) => v * side),
    transition: {
      duration: CODE_DURATION,
      times: [0, 0.12, 0.32, 0.7, 0.86, 1],
      ease: 'easeInOut',
    },
  }),
};

const slashVariants: Variants = {
  normal: { rotate: 0, scale: 1 },
  animate: {
    rotate: [0, 0, -12, 192, 180],
    scale: [1, 1, 0.65, 1, 1],
    transition: {
      rotate: {
        duration: CODE_DURATION,
        times: [0, 0.14, 0.26, 0.66, 0.8],
        ease: ['linear', 'easeOut', 'easeInOut', 'easeInOut'],
      },
      scale: {
        duration: CODE_DURATION,
        times: [0, 0.14, 0.44, 0.72, 1],
        ease: 'easeInOut',
      },
    },
  },
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
          overflow="visible"
        >
          <motion.path
            d="M15 4L9 20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={slashVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M5.99997 16C5.99997 16 2.00001 13.054 2 12C1.99999 10.9459 6 8 6 8"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={bracketVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M18 8C18 8 22 10.946 22 12C22 13.0541 18 16 18 16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={bracketVariants}
            custom={-1}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

CodeXmlIcon.displayName = 'CodeXmlIcon';

export { CodeXmlIcon };
