'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface Cancel01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Cancel01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// a firm headshake — "no", not a pirouette
const svgVariants: Variants = {
  normal: { translateX: 0 },
  animate: {
    translateX: [0, -2.8, 2.8, -1.8, 1.8, -0.8, 0],
    transition: {
      duration: 0.55,
      ease: 'easeInOut',
      times: [0, 0.15, 0.35, 0.55, 0.72, 0.88, 1],
    },
  },
};

const Cancel01Icon = forwardRef<Cancel01IconHandle, Cancel01IconProps>(
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
            d="M18 6L6.00081 17.9992M17.9992 18L6 6.00085"
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

Cancel01Icon.displayName = 'Cancel01Icon';

export { Cancel01Icon };
