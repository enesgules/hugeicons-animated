'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface AlarmClockIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AlarmClockIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// while you hover, the alarm is going off — the whole clock rattles on its
// feet and drawn ring ticks flash beside the bells
const svgVariants: Variants = {
  normal: { rotate: 0, transition: { duration: 0.3 } },
  animate: {
    rotate: [0, -7, 6, -5, 4, -2, 0],
    transition: { duration: 0.6, ease: 'easeInOut', repeat: Infinity },
  },
};

const tickVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.15 } },
  animate: (i: number) => ({
    opacity: [0, 1, 0],
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      repeat: Infinity,
      delay: i * 0.15,
    },
  }),
};

const AlarmClockIcon = forwardRef<AlarmClockIconHandle, AlarmClockIconProps>(
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
          style={{ transformOrigin: '12px 13px' }}
        >
          <path
            d="M20.5 12.5C20.5 17.1944 16.6944 21 12 21C7.30558 21 3.5 17.1944 3.5 12.5C3.5 7.80558 7.30558 4 12 4C16.6944 4 20.5 7.80558 20.5 12.5Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M5.88 18.7031L3.5 21.0031"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M18.14 18.668L20.5 20.998"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M5 3L2 6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M22 6L19 3"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M12 8V12.5L14 14.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M1.5 3.5L0.3 2.9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={tickVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M22.5 3.5L23.7 2.9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={tickVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M3.4 0.8L2.5 -0.2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={tickVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M20.6 0.8L21.5 -0.2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={tickVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />
        </motion.svg>
      </div>
    );
  }
);

AlarmClockIcon.displayName = 'AlarmClockIcon';

export { AlarmClockIcon };
