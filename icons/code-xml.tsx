'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface CodeXmlIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CodeXmlIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the brackets breathe apart to make room while the slash writes through
const slashVariants: Variants = {
  normal: { pathLength: 1, translateY: 0 },
  animate: {
    pathLength: [0, 1],
    translateY: [-1, 0],
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const bracketVariants: Variants = {
  normal: { translateX: 0, transition: { type: 'spring', duration: 0.4, bounce: 0 } },
  animate: (direction: number) => ({
    translateX: [0, direction * 1.5, direction * 1.5, 0],
    transition: { duration: 0.75, times: [0, 0.22, 0.62, 1], ease: 'easeInOut' },
  }),
};

const CodeXmlIcon = forwardRef<CodeXmlIconHandle, CodeXmlIconProps>(
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
            custom={-1}
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
            custom={1}
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
