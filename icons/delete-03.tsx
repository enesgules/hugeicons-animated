'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Delete03IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Delete03IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const DELETE_DURATION = 0.9;
const DELETE_LAND = springEase(0.45, 0.35);
const CONTENT_LAND = springEase(0.5, 0.3);

// Delete, shared by every bin: the hinged lid winds down, swings open, holds,
// and slams shut on a spring; the bin squashes when the lid lands.
const lidVariants: Variants = {
  normal: { transform: 'translateY(0px) rotate(0deg)' },
  animate: {
    transform: [
      'translateY(0px) rotate(0deg)',
      'translateY(0.2px) rotate(1deg)',
      'translateY(-2.4px) rotate(-9deg)',
      'translateY(-2.2px) rotate(-8deg)',
      'translateY(0px) rotate(0deg)',
    ],
    transition: {
      duration: DELETE_DURATION,
      times: [0, 0.12, 0.36, 0.5, 1],
      ease: ['easeOut', [0.4, 0, 0.2, 1], 'easeInOut', DELETE_LAND],
    },
  },
};

const binVariants: Variants = {
  normal: { transform: 'translateY(0px) scaleY(1)' },
  animate: {
    transform: [
      'translateY(0px) scaleY(1)',
      'translateY(0px) scaleY(1)',
      'translateY(0.35px) scaleY(0.96)',
      'translateY(0px) scaleY(1)',
    ],
    transition: {
      duration: DELETE_DURATION,
      times: [0, 0.6, 0.68, 1],
      ease: ['linear', 'easeOut', DELETE_LAND],
    },
  },
};

// The contents drop a beat after the lid lands, top line first.
const contentVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: (i: number) => ({
    transform: ['translateY(0px)', 'translateY(0px)', 'translateY(0.9px)', 'translateY(0px)'],
    transition: {
      duration: DELETE_DURATION,
      delay: i * 0.04,
      times: [0, 0.62, 0.72, 1],
      ease: ['linear', 'easeOut', CONTENT_LAND],
    },
  }),
};

const Delete03Icon = forwardRef<Delete03IconHandle, Delete03IconProps>(
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
            d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={binVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 22 / 24 }}
          />
          <motion.path
            d="M9 11.7349H15"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={contentVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M10.5 15.6543H13.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={contentVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M3 5.5H21M16.0555 5.5L15.3729 4.09173C14.9194 3.15626 14.6926 2.68852 14.3015 2.39681C14.2148 2.3321 14.1229 2.27454 14.0268 2.2247C13.5937 2 13.0739 2 12.0343 2C10.9686 2 10.4358 2 9.99549 2.23412C9.89791 2.28601 9.80479 2.3459 9.7171 2.41317C9.32145 2.7167 9.10044 3.20155 8.65842 4.17126L8.05273 5.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={lidVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 18 / 24, originY: 5.5 / 24 }}
          />
        </svg>
      </div>
    );
  }
);

Delete03Icon.displayName = 'Delete03Icon';

export { Delete03Icon };
