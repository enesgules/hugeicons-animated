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

// rows sweep in from the leading edge and align in a quick reading-order cascade
const rowVariants: Variants = {
  normal: { transform: 'translateX(0px)', opacity: 1 },
  animate: (i: number) => ({
    transform: ['translateX(-3px) scaleX(0.86)', 'translateX(0.65px) scaleX(1.03)', 'translateX(0px) scaleX(1)'],
    opacity: [0.4, 1, 1],
    transition: { duration: 0.48, delay: i * 0.07, ease: [0.23, 1, 0.32, 1] },
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
            style={{ transformOrigin: '12px 12px' }}
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
            style={{ transformOrigin: '12px 4px' }}
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
            style={{ transformOrigin: '12px 20px' }}
          />
        </svg>
      </div>
    );
  }
);

ListViewIcon.displayName = 'ListViewIcon';

export { ListViewIcon };
