'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface MinimizeScreenIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MinimizeScreenIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the active window travels inward toward the smaller frame
const arrowVariants: Variants = {
  normal: { transform: 'translate(0px, 0px)' },
  animate: {
    transform: ['translate(0px, 0px)', 'translate(-1px, 1px)', 'translate(0px, 0px)'],
    transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] },
  },
};

const windowVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(0.96)', 'scale(1)'],
    transition: { duration: 0.27, ease: [0.23, 1, 0.32, 1] },
  },
};

const MinimizeScreenIcon = forwardRef<MinimizeScreenIconHandle, MinimizeScreenIconProps>(
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
            d="M11.4333 16.0659L8.6912 15.9658C8.28365 15.951 7.96094 15.6163 7.96094 15.2084L7.96094 12.5936M13.4609 10.5659L8.41716 15.5843"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={arrowVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '11px 13px' }}
          />
          <motion.path
            d="M22 7C22 8.8856 22 9.8284 21.4142 10.4142C20.8284 11 19.8856 11 18 11H17C15.1144 11 14.1716 11 13.5858 10.4142C13 9.8284 13 8.8856 13 7L13 6C13 4.1144 13 3.1716 13.5858 2.5858C14.1716 2 15.1144 2 17 2L18 2C19.8856 2 20.8284 2 21.4142 2.5858C22 3.1716 22 4.1144 22 6V7Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={windowVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '17.5px 6.5px' }}
          />
          <path
            d="M22 15.5V13.5M10 22H14M2 10L2 14M10.5 2L8.5 2M21.9401 18.5C21.7861 19.5656 21.4865 20.321 20.9037 20.9038C20.321 21.4865 19.5656 21.7861 18.5 21.9401M5.5 21.9401C4.4344 21.7861 3.679 21.4865 3.0963 20.9037C2.5135 20.321 2.2139 19.5656 2.0599 18.5M2.0599 5.5C2.2139 4.4344 2.5135 3.679 3.0963 3.0963C3.679 2.5135 4.4344 2.2139 5.5 2.0599"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    );
  }
);

MinimizeScreenIcon.displayName = 'MinimizeScreenIcon';

export { MinimizeScreenIcon };
