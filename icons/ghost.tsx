'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface GhostIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface GhostIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// while you hover, it haunts — a weightless bob with shifty eyes that
// glance one way, then the other
const svgVariants: Variants = {
  normal: { translateY: 0, rotate: 0, transition: { duration: 0.3 } },
  animate: {
    translateY: [0, -1.8, 0],
    rotate: [0, -3, 3, 0],
    transition: { duration: 2, ease: 'easeInOut', repeat: Infinity },
  },
};

const eyeVariants: Variants = {
  normal: { translateX: 0, transition: { duration: 0.3 } },
  animate: {
    translateX: [0, -0.9, -0.9, 0.9, 0.9, 0],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      times: [0, 0.15, 0.4, 0.55, 0.85, 1],
      repeat: Infinity,
    },
  },
};

const GhostIcon = forwardRef<GhostIconHandle, GhostIconProps>(
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
          style={{ transformOrigin: '12px 12px' }}
        >
          <path
            d="M12 2C8.20498 2 5.12851 5.13401 5.12851 9V10C2.9875 10 1.91699 10 1.63289 10.4961C1.55535 10.6315 1.51014 10.7836 1.50092 10.9401C1.46717 11.5135 2.35788 12.1184 4.13931 13.3282L4.79658 13.7746C5.00395 13.9154 5.12851 14.1525 5.12851 14.4064C5.12851 18.6002 8.46587 22 12.5827 22H19.7129C19.8323 22 19.892 22 19.9307 21.9969C20.6674 21.9374 21.0779 21.1012 20.6825 20.4651C20.6617 20.4317 20.6259 20.383 20.5543 20.2857C20.4436 20.1354 20.3879 20.0597 20.3355 19.985C19.4192 18.6789 18.9098 17.1221 18.8736 15.5172C18.8715 15.4253 18.8715 15.3311 18.8715 15.1429V14.6686C18.8715 14.5388 18.8715 14.4739 18.8788 14.413C18.9087 14.1661 19.0278 13.9394 19.2129 13.7771C19.2585 13.7372 19.3115 13.7011 19.4176 13.6291L19.8607 13.3282C21.6421 12.1184 22.5328 11.5135 22.4991 10.9401C22.4899 10.7836 22.4447 10.6315 22.3671 10.4961C22.083 10 21.0125 10 18.8715 10V9C18.8715 5.13401 15.795 2 12 2Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M15 10.125V10.25M15.25 10.25C15.25 10.3881 15.1381 10.5 15 10.5C14.8619 10.5 14.75 10.3881 14.75 10.25C14.75 10.1119 14.8619 10 15 10C15.1381 10 15.25 10.1119 15.25 10.25Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={eyeVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M9 10.125V10.25M9.25 10.25C9.25 10.3881 9.13807 10.5 9 10.5C8.86193 10.5 8.75 10.3881 8.75 10.25C8.75 10.1119 8.86193 10 9 10C9.13807 10 9.25 10.1119 9.25 10.25Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={eyeVariants}
            animate={controls}
            initial="normal"
          />
        </motion.svg>
      </div>
    );
  }
);

GhostIcon.displayName = 'GhostIcon';

export { GhostIcon };
