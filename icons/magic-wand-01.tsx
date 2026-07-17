'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface MagicWand01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MagicWand01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// a flick of the wrist, and the magic keeps happening — the built-in stars
// twinkle in turn while drawn mini-sparkles pop in the empty corners
const wandVariants: Variants = {
  normal: { rotate: 0, transition: { duration: 0.3 } },
  animate: {
    rotate: [0, -14, 8, 0],
    transition: { duration: 0.7, ease: 'easeInOut', times: [0, 0.3, 0.6, 1] },
  },
};

const starVariants: Variants = {
  normal: { scale: 1, rotate: 0, transition: { duration: 0.3 } },
  animate: (i: number) => ({
    scale: [1, 0.3, 1.3, 1],
    rotate: [0, 45, 90, 90],
    transition: {
      duration: 1.1,
      ease: 'easeInOut',
      repeat: Infinity,
      delay: i * 0.4,
    },
  }),
};

const sparkleVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.15 } },
  animate: (i: number) => ({
    opacity: [0, 1, 0],
    scale: [0.4, 1, 0.6],
    transition: {
      duration: 1.1,
      ease: 'easeOut',
      repeat: Infinity,
      delay: 0.2 + i * 0.5,
    },
  }),
};

const MagicWand01Icon = forwardRef<MagicWand01IconHandle, MagicWand01IconProps>(
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
            d="M13.9258 12.7775L11.7775 10.6292C11.4847 10.3364 11.3383 10.19 11.1803 10.1117C10.8798 9.96277 10.527 9.96277 10.2264 10.1117C10.0685 10.19 9.92207 10.3364 9.62923 10.6292C9.33638 10.9221 9.18996 11.0685 9.11169 11.2264C8.96277 11.527 8.96277 11.8798 9.11169 12.1803C9.18996 12.3383 9.33638 12.4847 9.62923 12.7775L11.7775 14.9258M13.9258 12.7775L20.3708 19.2225C20.6636 19.5153 20.81 19.6617 20.8883 19.8197C21.0372 20.1202 21.0372 20.473 20.8883 20.7736C20.81 20.9315 20.6636 21.0779 20.3708 21.3708C20.0779 21.6636 19.9315 21.81 19.7736 21.8883C19.473 22.0372 19.1202 22.0372 18.8197 21.8883C18.6617 21.81 18.5153 21.6636 18.2225 21.3708L11.7775 14.9258M13.9258 12.7775L11.7775 14.9258"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={wandVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '20px 21px' }}
          />
          <motion.path
            d="M17 2L17.2948 2.7966C17.6813 3.84117 17.8746 4.36345 18.2556 4.74445C18.6366 5.12545 19.1588 5.31871 20.2034 5.70523L21 6L20.2034 6.29477C19.1588 6.68129 18.6366 6.87456 18.2556 7.25555C17.8746 7.63655 17.6813 8.15883 17.2948 9.2034L17 10L16.7052 9.2034C16.3187 8.15884 16.1254 7.63655 15.7444 7.25555C15.3634 6.87455 14.8412 6.68129 13.7966 6.29477L13 6L13.7966 5.70523C14.8412 5.31871 15.3634 5.12545 15.7444 4.74445C16.1254 4.36345 16.3187 3.84117 16.7052 2.7966L17 2Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={starVariants}
            custom={0}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '17px 6px' }}
          />
          <motion.path
            d="M6 4L6.22108 4.59745C6.51097 5.38087 6.65592 5.77259 6.94167 6.05834C7.22741 6.34408 7.61913 6.48903 8.40255 6.77892L9 7L8.40255 7.22108C7.61913 7.51097 7.22741 7.65592 6.94166 7.94167C6.65592 8.22741 6.51097 8.61913 6.22108 9.40255L6 10L5.77892 9.40255C5.48903 8.61913 5.34408 8.22741 5.05833 7.94167C4.77259 7.65592 4.38087 7.51097 3.59745 7.22108L3 7L3.59745 6.77892C4.38087 6.48903 4.77259 6.34408 5.05833 6.05833C5.34408 5.77259 5.48903 5.38087 5.77892 4.59745L6 4Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={starVariants}
            custom={1}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '6px 7px' }}
          />
          <motion.path
            d="M3.5 15.5V17.5M2.5 16.5H4.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={sparkleVariants}
            custom={0}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '3.5px 16.5px' }}
          />
          <motion.path
            d="M21 10.5V12.5M20 11.5H22"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={sparkleVariants}
            custom={1}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '21px 11.5px' }}
          />
        </svg>
      </div>
    );
  }
);

MagicWand01Icon.displayName = 'MagicWand01Icon';

export { MagicWand01Icon };
