'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface SquareLock01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SquareLock01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the shackle pops open, hangs, then clicks shut; the body takes the click
const shackleVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, -2, -2, 0],
    transition: { duration: 0.7, ease: 'easeInOut', times: [0, 0.3, 0.65, 1] },
  },
};

const bodyVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, 0.6, 0],
    transition: { duration: 0.25, ease: 'easeOut', delay: 0.62 },
  },
};

const SquareLock01Icon = forwardRef<
  SquareLock01IconHandle,
  SquareLock01IconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
          d="M4.26781 18.8447C4.49269 20.515 5.87613 21.8235 7.55966 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.879 17.7547 20 16.6376 20 15.5C20 14.3624 19.879 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55966 9.09909C5.87613 9.17649 4.49269 10.485 4.26781 12.1553C4.12104 13.2453 4 14.3624 4 15.5C4 16.6376 4.12104 17.7547 4.26781 18.8447Z"
          stroke="currentColor"
          strokeWidth="1.5"
          variants={bodyVariants}
          animate={controls}
          initial="normal"
        />
        <motion.path
          d="M7.5 9V6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5V9"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          variants={shackleVariants}
          animate={controls}
          initial="normal"
        />
        <motion.path
          d="M12.125 15.5H12M12.25 15.5C12.25 15.6381 12.1381 15.75 12 15.75C11.8619 15.75 11.75 15.6381 11.75 15.5C11.75 15.3619 11.8619 15.25 12 15.25C12.1381 15.25 12.25 15.3619 12.25 15.5Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
          variants={bodyVariants}
          animate={controls}
          initial="normal"
        />
      </svg>
    </div>
  );
});

SquareLock01Icon.displayName = 'SquareLock01Icon';

export { SquareLock01Icon };
