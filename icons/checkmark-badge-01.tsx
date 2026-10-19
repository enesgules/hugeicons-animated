'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface CheckmarkBadge01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CheckmarkBadge01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// Verified stamp: the badge presses in with a wiggle and pops back while the
// check is struck through again.
const badgeVariants: Variants = {
  normal: { transform: 'rotate(0deg) scale(1)' },
  animate: {
    transform: [
      'rotate(0deg) scale(1)',
      'rotate(-10deg) scale(0.9)',
      'rotate(8deg) scale(1.08)',
      'rotate(-4deg) scale(0.98)',
      'rotate(2deg) scale(1)',
      'rotate(0deg) scale(1)',
    ],
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
      times: [0, 0.18, 0.42, 0.62, 0.8, 1],
    },
  },
};

const checkVariants: Variants = {
  normal: { pathLength: 1 },
  animate: {
    pathLength: [1, 1, 0, 1, 1],
    transition: {
      duration: 0.8,
      ease: ['linear', 'easeIn', [0.23, 1, 0.32, 1], 'linear'],
      times: [0, 0.12, 0.26, 0.62, 1],
    },
  },
};

const CheckmarkBadge01Icon = forwardRef<CheckmarkBadge01IconHandle, CheckmarkBadge01IconProps>(
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
            d="M18.9905 19H19M18.9905 19C18.3678 19.6175 17.2393 19.4637 16.4479 19.4637C15.4765 19.4637 15.0087 19.6537 14.3154 20.347C13.7251 20.9374 12.9337 22 12 22C11.0663 22 10.2749 20.9374 9.68457 20.347C8.99128 19.6537 8.52349 19.4637 7.55206 19.4637C6.76068 19.4637 5.63218 19.6175 5.00949 19C4.38181 18.3776 4.53628 17.2444 4.53628 16.4479C4.53628 15.4414 4.31616 14.9786 3.59938 14.2618C2.53314 13.1956 2.00002 12.6624 2 12C2.00001 11.3375 2.53312 10.8044 3.59935 9.73817C4.2392 9.09832 4.53628 8.46428 4.53628 7.55206C4.53628 6.76065 4.38249 5.63214 5 5.00944C5.62243 4.38178 6.7556 4.53626 7.55208 4.53626C8.46427 4.53626 9.09832 4.2392 9.73815 3.59937C10.8044 2.53312 11.3375 2 12 2C12.6625 2 13.1956 2.53312 14.2618 3.59937C14.9015 4.23907 15.5355 4.53626 16.4479 4.53626C17.2393 4.53626 18.3679 4.38247 18.9906 5C19.6182 5.62243 19.4637 6.75559 19.4637 7.55206C19.4637 8.55858 19.6839 9.02137 20.4006 9.73817C21.4669 10.8044 22 11.3375 22 12C22 12.6624 21.4669 13.1956 20.4006 14.2618C19.6838 14.9786 19.4637 15.4414 19.4637 16.4479C19.4637 17.2444 19.6182 18.3776 18.9905 19Z"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={badgeVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
          />
          <motion.path
            d="M9 12.8929C9 12.8929 10.2 13.5447 10.8 14.5C10.8 14.5 12.6 10.75 15 9.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={checkVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

CheckmarkBadge01Icon.displayName = 'CheckmarkBadge01Icon';

export { CheckmarkBadge01Icon };
