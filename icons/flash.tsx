'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface FlashIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FlashIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// while you hover, the storm keeps striking. The strike fires the moment
// you enter — instant response — and the bolt only re-draws during the dark
// beat, where the cut is invisible. One shared 1.9s timeline keeps every
// element in sync.
const svgVariants: Variants = {
  normal: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  animate: {
    //        strike──flash──strike──hold      dark      redraw    settle
    opacity: [1, 0.25, 1, 0.2, 1, 1, 0.3, 0.3, 1],
    scale: [1, 1.1, 1.02, 1.08, 1, 1, 0.97, 0.97, 1],
    transition: {
      duration: 1.9,
      ease: 'easeOut',
      times: [0, 0.05, 0.12, 0.18, 0.26, 0.55, 0.66, 0.78, 0.92],
      repeat: Infinity,
    },
  },
};

// drawn through the strike; vanishes and re-draws inside the dark beat
const boltVariants: Variants = {
  normal: { pathLength: 1, transition: { duration: 0.2 } },
  animate: {
    pathLength: [1, 1, 0, 0, 1, 1],
    transition: {
      duration: 1.9,
      times: [0, 0.64, 0.66, 0.7, 0.85, 1],
      ease: 'easeOut',
      repeat: Infinity,
    },
  },
};

// sparks pop off the tip at the moment of impact, then vanish
const sparkVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.15 } },
  animate: (i: number) => ({
    opacity: [0, 1, 0.8, 0, 0],
    transition: {
      duration: 1.9,
      times: [0, 0.06, 0.14, 0.24, 1],
      ease: 'easeOut',
      repeat: Infinity,
      delay: i * 0.04,
    },
  }),
};

const FlashIcon = forwardRef<FlashIconHandle, FlashIconProps>(
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
            d="M5.22576 11.3294L12.224 2.34651C12.7713 1.64397 13.7972 2.08124 13.7972 3.01707V9.96994C13.7972 10.5305 14.1995 10.985 14.6958 10.985H18.0996C18.8729 10.985 19.2851 12.0149 18.7742 12.6706L11.776 21.6535C11.2287 22.356 10.2028 21.9188 10.2028 20.9829V14.0301C10.2028 13.4695 9.80048 13.015 9.3042 13.015H5.90035C5.12711 13.015 4.71494 11.9851 5.22576 11.3294Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={boltVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M7.6 20.4L6.2 21.6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={sparkVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M14.4 20.6L15.8 21.6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={sparkVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M11.4 23L11.1 24.2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={sparkVariants}
            custom={2}
            animate={controls}
            initial="normal"
          />
        </motion.svg>
      </div>
    );
  }
);

FlashIcon.displayName = 'FlashIcon';

export { FlashIcon };
