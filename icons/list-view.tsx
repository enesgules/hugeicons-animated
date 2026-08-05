'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ListViewIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ListViewIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// Existing rows contract and settle in reading order, alternating their anchored edge.
const rowVariants: Variants = {
  normal: { transform: 'scaleX(1)' },
  animate: (i: number) => ({
    transform: ['scaleX(1)', 'scaleX(0.68)', 'scaleX(1.04)', 'scaleX(0.98)', 'scaleX(1)'],
    transition: {
      duration: 0.44,
      delay: i * 0.06,
      ease: [0.77, 0, 0.175, 1],
      times: [0, 0.28, 0.56, 0.76, 1],
    },
  }),
};

const ListViewIcon = forwardRef<ListViewIconHandle, ListViewIconProps>(
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
            d="M2 11.4C2 10.2417 2.24173 10 3.4 10H20.6C21.7583 10 22 10.2417 22 11.4V12.6C22 13.7583 21.7583 14 20.6 14H3.4C2.24173 14 2 13.7583 2 12.6V11.4Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={rowVariants}
            custom={1}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 22 / 24, originY: 12 / 24 }}
          />
          <motion.path
            d="M2 3.4C2 2.24173 2.24173 2 3.4 2H20.6C21.7583 2 22 2.24173 22 3.4V4.6C22 5.75827 21.7583 6 20.6 6H3.4C2.24173 6 2 5.75827 2 4.6V3.4Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={rowVariants}
            custom={0}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 2 / 24, originY: 4 / 24 }}
          />
          <motion.path
            d="M2 19.4C2 18.2417 2.24173 18 3.4 18H20.6C21.7583 18 22 18.2417 22 19.4V20.6C22 21.7583 21.7583 22 20.6 22H3.4C2.24173 22 2 21.7583 2 20.6V19.4Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={rowVariants}
            custom={2}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 2 / 24, originY: 20 / 24 }}
          />
        </svg>
      </div>
    );
  }
);

ListViewIcon.displayName = 'ListViewIcon';

export { ListViewIcon };
