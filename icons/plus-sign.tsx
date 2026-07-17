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

// each arm takes its turn growing — vertical stroke first, then horizontal —
// as if the plus is being built one line at a time
const svgVariants: Variants = {
  normal: { scaleY: 1, scaleX: 1, transition: { duration: 0.25, ease: 'easeOut' } },
  animate: {
    scaleY: [1, 1.3, 1, 1, 1],
    scaleX: [1, 1, 1, 1.3, 1],
    transition: { duration: 0.6, ease: 'easeOut', times: [0, 0.25, 0.5, 0.75, 1] },
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
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          overflow="visible"
          variants={svgVariants}
          animate={controls}
          initial="normal"
        >
          <path
            d="M12 4V20M20 12H4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </motion.svg>
      </div>
    );
  }
);

PlusSignIcon.displayName = 'PlusSignIcon';

export { PlusSignIcon };
