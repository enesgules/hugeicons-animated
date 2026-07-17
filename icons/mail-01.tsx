'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface Mail01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Mail01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// new mail arrives: the envelope drops in and lands, the flap fold
// redraws, and a badge ping fires at the corner — "you've got mail"
const svgVariants: Variants = {
  normal: { translateY: 0, rotate: 0 },
  animate: {
    translateY: [0, -2.5, 0.5, 0],
    rotate: [0, -2, 1, 0],
    transition: { duration: 0.55, ease: 'easeOut', times: [0, 0.3, 0.7, 1] },
  },
};

const flapVariants: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [0, 1],
    opacity: [0.4, 1],
    transition: { duration: 0.45, ease: 'easeOut', delay: 0.12 },
  },
};

const badgeVariants: Variants = {
  normal: { opacity: 0, scale: 0.4 },
  animate: {
    opacity: [0, 1, 1],
    scale: [0.4, 1.3, 1],
    transition: { duration: 0.35, ease: 'easeOut', delay: 0.3, times: [0, 0.6, 1] },
  },
};

const Mail01Icon = forwardRef<Mail01IconHandle, Mail01IconProps>(
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
          <motion.path
            d="M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={flapVariants}
            animate={controls}
            initial="normal"
          />
          <path
            d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.circle
            cx="20.5"
            cy="4"
            r="1.8"
            fill="currentColor"
            variants={badgeVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '20.5px 4px' }}
          />
        </motion.svg>
      </div>
    );
  }
);

Mail01Icon.displayName = 'Mail01Icon';

export { Mail01Icon };
