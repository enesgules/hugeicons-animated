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

const ROWS = [
  'M2 3.4C2 2.24173 2.24173 2 3.4 2H20.6C21.7583 2 22 2.24173 22 3.4V4.6C22 5.75827 21.7583 6 20.6 6H3.4C2.24173 6 2 5.75827 2 4.6V3.4Z',
  'M2 11.4C2 10.2417 2.24173 10 3.4 10H20.6C21.7583 10 22 10.2417 22 11.4V12.6C22 13.7583 21.7583 14 20.6 14H3.4C2.24173 14 2 13.7583 2 12.6V11.4Z',
  'M2 19.4C2 18.2417 2.24173 18 3.4 18H20.6C21.7583 18 22 18.2417 22 19.4V20.6C22 21.7583 21.7583 22 20.6 22H3.4C2.24173 22 2 21.7583 2 20.6V19.4Z',
];
const SHORT_ROWS = [
  'M2 3.4C2 2.24173 2.24173 2 3.4 2H10.6C11.7583 2 12 2.24173 12 3.4V4.6C12 5.75827 11.7583 6 10.6 6H3.4C2.24173 6 2 5.75827 2 4.6V3.4Z',
  'M9.5 11.4C9.5 10.2417 9.74173 10 10.9 10H20.6C21.7583 10 22 10.2417 22 11.4V12.6C22 13.7583 21.7583 14 20.6 14H10.9C9.74173 14 9.5 13.7583 9.5 12.6V11.4Z',
  'M2 19.4C2 18.2417 2.24173 18 3.4 18H13.1C14.2583 18 14.5 18.2417 14.5 19.4V20.6C14.5 21.7583 14.2583 22 13.1 22H3.4C2.24173 22 2 21.7583 2 20.6V19.4Z',
];

// Each row pulls in from alternating anchored edges in reading order, then
// springs back to full width. The rows morph, so their rounded ends keep shape.
const rowVariants: Variants = {
  normal: (i: number) => ({
    d: ROWS[i],
    transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] },
  }),
  animate: (i: number) => ({
    d: [ROWS[i], SHORT_ROWS[i], ROWS[i]],
    transition: {
      duration: 0.46,
      delay: i * 0.08,
      times: [0, 0.4, 1],
      ease: ['easeInOut', [0.34, 1.36, 0.64, 1]],
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
          />
        </svg>
      </div>
    );
  }
);

ListViewIcon.displayName = 'ListViewIcon';

export { ListViewIcon };
