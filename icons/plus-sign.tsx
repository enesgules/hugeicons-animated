'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface PlusSignIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PlusSignIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// a mark stamping into place: the combined glyph hands off to two
// hand-drawn strokes that each overshoot long, pinch short, and settle
const plusBaseVariants: Variants = {
  normal: { opacity: 1, transition: { duration: 0.2, delay: 0.05 } },
  animate: { opacity: 0, transition: { duration: 0.08 } },
};

const stemVariants: Variants = {
  normal: { d: 'M12 4V20', opacity: 0, transition: { duration: 0.15 } },
  animate: {
    d: ['M12 4V20', 'M12 2.6V21.4', 'M12 4.6V19.4', 'M12 4V20'],
    opacity: 1,
    transition: {
      opacity: { duration: 0.08 },
      d: { duration: 0.5, ease: 'easeInOut', times: [0, 0.32, 0.68, 1] },
    },
  },
};

const armVariants: Variants = {
  normal: { d: 'M20 12H4', opacity: 0, transition: { duration: 0.15 } },
  animate: {
    d: ['M20 12H4', 'M21.4 12H2.6', 'M19.4 12H4.6', 'M20 12H4'],
    opacity: 1,
    transition: {
      opacity: { duration: 0.08 },
      d: { duration: 0.5, ease: 'easeInOut', times: [0, 0.32, 0.68, 1], delay: 0.05 },
    },
  },
};

const PlusSignIcon = forwardRef<PlusSignIconHandle, PlusSignIconProps>(
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
            d="M12 4V20M20 12H4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={plusBaseVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M12 4V20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={stemVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M20 12H4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={armVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

PlusSignIcon.displayName = 'PlusSignIcon';

export { PlusSignIcon };
