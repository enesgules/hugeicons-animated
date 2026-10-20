'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface DocumentAttachmentIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface DocumentAttachmentIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PAGE_DURATION = 1;
const PAGE_TIMES = [0, 0.16, 0.4, 1];
const PAGE_LAND = springEase(0.45, 0.35);

// Page, shared by every file and document: the sheet lifts and tips back,
// presses down, and lands on a spring.
const pageVariants: Variants = {
  normal: { transform: 'translateY(0px) rotate(0deg)' },
  animate: {
    transform: [
      'translateY(0px) rotate(0deg)',
      'translateY(-0.8px) rotate(-1deg)',
      'translateY(0.5px) rotate(0.6deg)',
      'translateY(0px) rotate(0deg)',
    ],
    transition: {
      duration: PAGE_DURATION,
      times: PAGE_TIMES,
      ease: ['easeOut', [0.4, 0, 0.2, 1], PAGE_LAND],
    },
  },
};

const MARK_LAND = springEase(0.5, 0.3);

// The text lines retract toward their start as the page presses down, then
// spring back out to full length.
const lineVariants: Variants = {
  normal: { transform: 'scaleX(1)' },
  animate: {
    transform: ['scaleX(1)', 'scaleX(1)', 'scaleX(0.5)', 'scaleX(1)'],
    transition: {
      duration: PAGE_DURATION,
      times: PAGE_TIMES,
      ease: ['linear', [0.4, 0, 0.2, 1], MARK_LAND],
    },
  },
};

const CLIP_SWING = springEase(0.8, 0.45);

// The paperclip winds up, swings hard off the page edge, and a pendulum spring
// brings it back.
const clipVariants: Variants = {
  normal: { transform: 'rotate(0deg) translateY(0px)' },
  animate: {
    transform: [
      'rotate(0deg) translateY(0px)',
      'rotate(4deg) translateY(0px)',
      'rotate(-22deg) translateY(-1px)',
      'rotate(0deg) translateY(0px)',
    ],
    transition: {
      duration: PAGE_DURATION,
      times: PAGE_TIMES,
      ease: ['easeOut', [0.4, 0, 0.2, 1], CLIP_SWING],
    },
  },
};

const DocumentAttachmentIcon = forwardRef<DocumentAttachmentIconHandle, DocumentAttachmentIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const { handleMouseEnter, handleMouseLeave } = useIconAnimation({
      controls,
      loops: false,
      onMouseEnter,
      onMouseLeave,
      ref,
    });

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
            variants={pageVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 0.5 }}
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
            style={{ transformBox: 'view-box', originX: 7.5 / 24, originY: 7 / 24 }}
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
            style={{ transformBox: 'view-box', originX: 7.5 / 24, originY: 0.5 }}
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
            style={{ transformBox: 'view-box', originX: 17.5 / 24, originY: 18 / 24 }}
          />
        </svg>
      </div>
    );
  }
);

DocumentAttachmentIcon.displayName = 'DocumentAttachmentIcon';

export { DocumentAttachmentIcon };
