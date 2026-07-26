'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface DocumentAttachmentIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface DocumentAttachmentIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the document holds steady while the paperclip swings into attachment
const documentVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px)', 'translateY(-0.5px)', 'translateY(0px)'],
    transition: { duration: 0.44, ease: [0.23, 1, 0.32, 1] },
  },
};

const lineVariants: Variants = {
  normal: { transform: 'scaleX(1)' },
  animate: {
    transform: ['scaleX(0.68)', 'scaleX(1.04)', 'scaleX(1)'],
    transition: { duration: 0.38, ease: [0.23, 1, 0.32, 1] },
  },
};

const clipVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: {
    transform: ['rotate(-8deg)', 'rotate(3deg)', 'rotate(0deg)'],
    transition: { duration: 0.46, delay: 0.04, ease: [0.23, 1, 0.32, 1] },
  },
};

const DocumentAttachmentIcon = forwardRef<DocumentAttachmentIconHandle, DocumentAttachmentIconProps>(
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
            d="M20.4999 10.5V10C20.4999 6.22876 20.4999 4.34315 19.3284 3.17157C18.1568 2 16.2712 2 12.4999 2H11.5C7.72883 2 5.84323 2 4.67166 3.17156C3.50009 4.34312 3.50007 6.22872 3.50004 9.99993L3.5 14.5C3.49997 17.7874 3.49996 19.4312 4.40788 20.5375C4.57412 20.7401 4.75986 20.9258 4.96242 21.0921C6.06877 22 7.71249 22 10.9999 22"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={documentVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 12px' }}
          />
          <motion.path
            d="M7.5 7H16.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={lineVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '7.5px 7px' }}
          />
          <motion.path
            d="M7.5 12H13.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={lineVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '7.5px 12px' }}
          />
          <motion.path
            d="M20.5 20L20.5 17C20.5 15.5706 19.1569 14 17.5 14C15.8431 14 14.5 15.5706 14.5 17L14.5 20.5C14.5 21.3284 15.1716 22 16 22C16.8284 22 17.5 21.3284 17.5 20.5V17"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={clipVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '17.5px 18px' }}
          />
        </svg>
      </div>
    );
  }
);

DocumentAttachmentIcon.displayName = 'DocumentAttachmentIcon';

export { DocumentAttachmentIcon };
