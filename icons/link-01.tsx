'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface Link01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Link01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the chain halves pull apart, then click back together
const lowerVariants: Variants = {
  normal: { translateX: 0, translateY: 0 },
  animate: {
    translateX: [0, -1.4, 0],
    translateY: [0, 1.4, 0],
    transition: { duration: 0.5, ease: 'easeInOut', times: [0, 0.4, 1] },
  },
};

const upperVariants: Variants = {
  normal: { translateX: 0, translateY: 0 },
  animate: {
    translateX: [0, 1.4, 0],
    translateY: [0, -1.4, 0],
    transition: { duration: 0.5, ease: 'easeInOut', times: [0, 0.4, 1] },
  },
};

const Link01Icon = forwardRef<Link01IconHandle, Link01IconProps>(
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
            d="M9.14339 10.691L9.35031 10.4841C11.329 8.50532 14.5372 8.50532 16.5159 10.4841C18.4947 12.4628 18.4947 15.671 16.5159 17.6497L13.6497 20.5159C11.671 22.4947 8.46279 22.4947 6.48405 20.5159C4.50532 18.5372 4.50532 15.329 6.48405 13.3503L6.9484 12.886"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={lowerVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M17.0516 11.114L17.5159 10.6497C19.4947 8.67095 19.4947 5.46279 17.5159 3.48405C15.5372 1.50532 12.329 1.50532 10.3503 3.48405L7.48405 6.35031C5.50532 8.32904 5.50532 11.5372 7.48405 13.5159C9.46279 15.4947 12.671 15.4947 14.6497 13.5159L14.8566 13.309"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={upperVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

Link01Icon.displayName = 'Link01Icon';

export { Link01Icon };
