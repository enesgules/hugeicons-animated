'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface FavouriteIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FavouriteIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// lub-dub with real squash-and-stretch: on each beat the heart doesn't just
// scale — its lobes bulge outward and the shape swells like a muscle
const HEART_REST =
  'M10.4107 19.9677C7.58942 17.858 2 13.0348 2 8.69444C2 5.82563 4.10526 3.5 7 3.5C8.5 3.5 10 4 12 6C14 4 15.5 3.5 17 3.5C19.8947 3.5 22 5.82563 22 8.69444C22 13.0348 16.4106 17.858 13.5893 19.9677C12.6399 20.6776 11.3601 20.6776 10.4107 19.9677Z';
const HEART_BEAT =
  'M10.3 19.8C7.2 17.6 1.2 12.9 1.2 8.6C1.2 5.6 4 3.2 7 3.2C8.6 3.2 10.1 3.8 12 5.8C13.9 3.8 15.4 3.2 17 3.2C20 3.2 22.8 5.6 22.8 8.6C22.8 12.9 16.8 17.6 13.7 19.8C12.7 20.6 11.3 20.6 10.3 19.8Z';
const HEART_HALF =
  'M10.36 19.88C7.4 17.73 1.6 12.97 1.6 8.65C1.6 5.7 4.05 3.35 7 3.35C8.55 3.35 10.05 3.9 12 5.9C13.95 3.9 15.45 3.35 17 3.35C19.95 3.35 22.4 5.7 22.4 8.65C22.4 12.97 16.6 17.73 13.65 19.88C12.67 20.64 11.33 20.64 10.36 19.88Z';

const heartVariants: Variants = {
  normal: { d: HEART_REST, transition: { duration: 0.3, ease: 'easeOut' } },
  animate: {
    d: [HEART_REST, HEART_BEAT, HEART_REST, HEART_HALF, HEART_REST],
    transition: {
      duration: 0.9,
      ease: 'easeInOut',
      times: [0, 0.18, 0.42, 0.6, 1],
    },
  },
};

const FavouriteIcon = forwardRef<FavouriteIconHandle, FavouriteIconProps>(
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
            d="M10.4107 19.9677C7.58942 17.858 2 13.0348 2 8.69444C2 5.82563 4.10526 3.5 7 3.5C8.5 3.5 10 4 12 6C14 4 15.5 3.5 17 3.5C19.8947 3.5 22 5.82563 22 8.69444C22 13.0348 16.4106 17.858 13.5893 19.9677C12.6399 20.6776 11.3601 20.6776 10.4107 19.9677Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={heartVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

FavouriteIcon.displayName = 'FavouriteIcon';

export { FavouriteIcon };
