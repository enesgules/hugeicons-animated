'use client';

import type { Easing, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Delete02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Delete02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// Page, as in delete-02: the bin crouches, the lid flips open on its right
// hinge as the bin stretches up, hangs open for a beat, then slams shut. The
// bin squashes from its base under the slam, the lid bounces once on the rim,
// and both settle.
const TRASH_DURATION = 1;
const SNAP: Easing = [0.23, 1, 0.32, 1];
const SLAM: Easing = [0.55, 0, 1, 0.45];

const lidVariants: Variants = {
  normal: { transform: 'translateY(0px) rotate(0deg)' },
  animate: {
    transform: [
      'translateY(0px) rotate(0deg)',
      'translateY(0.3px) rotate(-3deg)',
      'translateY(-1px) rotate(24deg)',
      'translateY(-0.8px) rotate(19deg)',
      'translateY(0px) rotate(-2deg)',
      'translateY(-0.3px) rotate(4deg)',
      'translateY(0px) rotate(-1deg)',
      'translateY(0px) rotate(0deg)',
    ],
    transition: {
      duration: TRASH_DURATION,
      times: [0, 0.12, 0.34, 0.5, 0.6, 0.7, 0.82, 1],
      ease: [SNAP, SNAP, 'easeInOut', SLAM, SNAP, 'easeInOut', 'easeInOut'],
    },
  },
};

const binVariants: Variants = {
  normal: { transform: 'scaleX(1) scaleY(1)' },
  animate: {
    transform: [
      'scaleX(1) scaleY(1)',
      'scaleX(1.02) scaleY(0.96)',
      'scaleX(0.985) scaleY(1.03)',
      'scaleX(1) scaleY(1)',
      'scaleX(1.05) scaleY(0.92)',
      'scaleX(0.985) scaleY(1.03)',
      'scaleX(1.005) scaleY(0.99)',
      'scaleX(1) scaleY(1)',
    ],
    transition: {
      duration: TRASH_DURATION,
      times: [0, 0.12, 0.34, 0.5, 0.6, 0.72, 0.86, 1],
      ease: [SNAP, SNAP, 'easeInOut', SLAM, SNAP, 'easeInOut', 'easeInOut'],
    },
  },
};

const Delete02Icon = forwardRef<Delete02IconHandle, Delete02IconProps>(
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
            style={{ transformBox: 'view-box', originX: 12 / 24, originY: 22 / 24 }}
          />
          <motion.path
            d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={lidVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 20.5 / 24, originY: 5.5 / 24 }}
          />
          <motion.path
            d="M9.5 16.5L9.5 10.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={binVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 12 / 24, originY: 22 / 24 }}
          />
          <motion.path
            d="M14.5 16.5L14.5 10.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={binVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 12 / 24, originY: 22 / 24 }}
          />
        </svg>
      </div>
    );
  }
);

Delete02Icon.displayName = 'Delete02Icon';

export { Delete02Icon };
